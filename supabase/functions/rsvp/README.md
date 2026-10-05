# `rsvp` edge function

Backend for the wedding site's OSA form. Public and unauthenticated by design — anyone can reach
this endpoint, so it validates and only then writes to Postgres using the service role key. RLS is
enabled on `rsvp` with **no policies**, so this function is the only write path; there is no anon
insert to weaken.

Pipeline: zod validation → insert. See `schema.ts` for validation rules. There is deliberately no
captcha, honeypot or rate limit: the site is unindexed and only shared with invited guests, and
each of those was a way for a real guest's submission to fail. Junk rows, if any ever appear, are
soft-deleted by hand (see Troubleshooting).

## Required secrets

| Name | Purpose |
|---|---|
| `ALLOWED_ORIGINS` | Comma-separated list of origins allowed to call this function (CORS). No wildcard. |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are **reserved** names that Supabase injects
automatically for every edge function — you cannot and must not set them yourself with
`supabase secrets set`.

## Configure production

```bash
supabase secrets set ALLOWED_ORIGINS=https://<production-domain>
```

Deploy the function:

```bash
supabase functions deploy rsvp
```

## Run locally

Requires Docker running and the Supabase CLI. `supabase functions serve` reads
`supabase/functions/.env` by **default, not** `supabase/.env.local` — always pass `--env-file`
explicitly, otherwise `ALLOWED_ORIGINS` silently comes up empty and falls back to
`http://localhost:3000`:

```bash
supabase start
supabase functions serve rsvp --env-file supabase/.env.local --no-verify-jwt
```

(`--no-verify-jwt` is belt-and-suspenders alongside the `verify_jwt = false` already set for this
function in `supabase/config.toml` — the browser sends no `Authorization` header by design.)

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
       "allergies_and_special_food":"","other_information":""}'
# -> 200 {"ok":true}

# Oversized field
curl -i -X POST "$URL" -H "Content-Type: application/json" -H "Origin: http://localhost:3000" \
  -d "{\"name\":\"$(python3 -c 'print("A"*101)')\",\"email\":\"ada3@example.com\",\"attending\":true,\"num_of_guests\":1}"
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
