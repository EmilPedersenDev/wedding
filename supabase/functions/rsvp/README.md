# `rsvp` edge function

Backend for the wedding site's OSA form. Public and unauthenticated by design — anyone can reach
this endpoint, so it validates, verifies a captcha, rate-limits, and only then writes to Postgres
using the service role key. RLS is enabled on both `rsvp` and `rsvp_rate_limit` with **no
policies**, so this function is the only write path; there is no anon insert to weaken.

Pipeline (short-circuits on the first failure): honeypot → Turnstile → per-IP rate limit → zod
validation → insert. See `index.ts` for the exact order and `schema.ts` for validation rules.

## Required secrets

| Name | Purpose |
|---|---|
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret key, verified against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. |
| `IP_SALT` | Random string mixed into the submitter's IP before SHA-256 hashing. Set once and leave it alone — rotating it resets every rate-limit window and makes existing `submitted_ip_hash` values impossible to correlate with future ones. |
| `ALLOWED_ORIGINS` | Comma-separated list of origins allowed to call this function (CORS). No wildcard. |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are **reserved** names that Supabase injects
automatically for every edge function — you cannot and must not set them yourself with
`supabase secrets set`.

## Configure production

```bash
supabase secrets set \
  TURNSTILE_SECRET=<your-turnstile-secret> \
  IP_SALT=$(openssl rand -hex 32) \
  ALLOWED_ORIGINS=https://<production-domain>
```

Deploy the function:

```bash
supabase functions deploy rsvp
```

## Run locally

Requires Docker running and the Supabase CLI. `supabase functions serve` reads
`supabase/functions/.env` by **default, not** `supabase/.env.local` — always pass `--env-file`
explicitly, otherwise secrets silently come up empty and every request 500s:

```bash
supabase start
supabase functions serve rsvp --env-file supabase/.env.local --no-verify-jwt
```

(`--no-verify-jwt` is belt-and-suspenders alongside the `verify_jwt = false` already set for this
function in `supabase/config.toml` — the browser sends no `Authorization` header by design.)

`supabase/.env.local` ships with Cloudflare's official test key pair so the pipeline is exercisable
without a real Turnstile account:

- `1x0000000000000000000000000000000AA` — always passes.
- `2x0000000000000000000000000000000AA` — always fails (use this to test the `captcha` response).

Swap in real keys to test end-to-end against your actual Turnstile widget/site key pair.

## Debug in VS Code

`supabase/config.toml`'s `[edge_runtime]` section already sets `inspector_port = 8083`. Serve with
the inspector active instead of the plain command above:

```bash
npm run functions:serve:debug
```

(`--inspect-mode brk` — the worker pauses on the first line of `index.ts` until a debugger attaches.
Use `npm run functions:serve` for a normal, non-paused run.)

Then run **Attach to rsvp edge function** from the Run and Debug panel (`.vscode/launch.json`) —
it's a Node-protocol attach on port 8083, which works because Deno's inspector speaks the same V8
inspector protocol. Breakpoints set in `index.ts` or `schema.ts` will bind once attached; trigger
one with any of the curl requests below.

## Example requests

Replace `$URL` with `http://127.0.0.1:54321/functions/v1/rsvp` locally, or the deployed function
URL in production. All requests need `Origin: http://localhost:3000` (or your production origin)
to get a CORS-allowed response — a plain curl without that header still gets a JSON response, it
just won't carry `Access-Control-Allow-Origin`.

```bash
# Valid submission
curl -i -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","attending":true,"num_of_guests":2,
       "allergies_and_special_food":"","other_information":"","website":"",
       "turnstile_token":"XXXX.DUMMY.TOKEN.XXXX"}'
# -> 200 {"ok":true}

# Honeypot filled — silent no-op, still 200
curl -i -X POST "$URL" -H "Content-Type: application/json" -H "Origin: http://localhost:3000" \
  -d '{"name":"Bot","email":"bot@example.com","attending":true,"num_of_guests":1,"website":"http://spam.example"}'
# -> 200 {"ok":true}, no row written

# Missing captcha token, real secret configured
curl -i -X POST "$URL" -H "Content-Type: application/json" -H "Origin: http://localhost:3000" \
  -d '{"name":"Ada","email":"ada2@example.com","attending":true,"num_of_guests":1,"website":""}'
# -> 403 {"ok":false,"code":"captcha"}

# Oversized field
curl -i -X POST "$URL" -H "Content-Type: application/json" -H "Origin: http://localhost:3000" \
  -d "{\"name\":\"$(python3 -c 'print("A"*101)')\",\"email\":\"ada3@example.com\",\"attending\":true,\"num_of_guests\":1,\"website\":\"\",\"turnstile_token\":\"XXXX.DUMMY.TOKEN.XXXX\"}"
# -> 400 {"ok":false,"code":"invalid","fields":{"name":"too_long"}}

# Duplicate email (submit the first curl again)
# -> 409 {"ok":false,"code":"duplicate"}
```

## Troubleshooting

- **Browser reports a generic network/CORS error, no response body visible in DevTools** — check
  `ALLOWED_ORIGINS` first. The function returns `204`/JSON either way, but omits
  `Access-Control-Allow-Origin` for origins not on the list, which the browser then blocks locally.
- **Every request 401s** — `verify_jwt` reverted to its default `true` somewhere, or
  `--no-verify-jwt` was dropped from the local serve command.
- **Withdrawing/removing a submission** — never hard-delete. Soft-delete instead, which also frees
  the email address for a future re-submission:
  ```sql
  update public.rsvp set deleted_at = now() where lower(email) = 'someone@example.com';
  ```
