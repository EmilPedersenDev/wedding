-- RSVP-formuläret: rsvp-tabellen och dess tillhörande rate-limit-tabell.
-- Endast service_role skriver hit (via edge-funktionen supabase/functions/rsvp);
-- RLS är på för båda tabellerna utan några policies, så anon/authenticated har ingen väg in.

create table public.rsvp (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  attending boolean not null,
  num_of_guests integer not null,
  allergies_and_special_food text,
  other_information text,

  -- Missbruksforensik, inte personuppgifter i klartext.
  submitted_ip_hash text,
  user_agent text,

  created_at timestamptz not null default now(),
  updated_at timestamptz,
  -- Mjuk radering — anmälningar tas aldrig bort på riktigt, bara markeras.
  deleted_at timestamptz,

  constraint rsvp_name_len      check (char_length(name) between 1 and 100),
  constraint rsvp_email_len     check (char_length(email) between 3 and 254),
  constraint rsvp_allergies_len check (allergies_and_special_food is null or char_length(allergies_and_special_food) <= 500),
  constraint rsvp_other_len     check (other_information is null or char_length(other_information) <= 1000),
  constraint rsvp_guests_range  check (num_of_guests >= 0 and num_of_guests <= 10),
  constraint rsvp_ua_len        check (user_agent is null or char_length(user_agent) <= 512)
);

comment on table public.rsvp is 'Svar på bröllopets OSA-formulär. Skrivs endast av edge-funktionen rsvp via service_role.';

-- Mjuk dedupe: en aktiv anmälan per e-postadress. En soft-deletad rad frigör adressen igen,
-- så funktionen kan fånga en 23505-konflikt och svara vänligt i stället för att skriva dubbletter.
create unique index rsvp_email_unique_active
  on public.rsvp (lower(email))
  where deleted_at is null;

create index rsvp_created_at_idx on public.rsvp (created_at desc);

alter table public.rsvp enable row level security;
revoke all on public.rsvp from anon, authenticated;
-- Nya tabeller är inte längre auto-exponerade för Data API-roller (inte ens service_role) om
-- inte explicit grant ges — RLS-bypass och tabellrättigheter är två separata mekanismer.
-- Utan den här raden nekar PostgREST även service_role med "permission denied".
grant select, insert, update on public.rsvp to service_role;
grant usage on sequence public.rsvp_id_seq to service_role;

-- Rate-limiting per hashad IP. En rad per försök som når fram till valideringssteget.
create table public.rsvp_rate_limit (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

comment on table public.rsvp_rate_limit is 'Ett-rad-per-försök-logg som edge-funktionen rsvp använder för att begränsa antal OSA-försök per IP och timme.';

create index rsvp_rate_limit_lookup on public.rsvp_rate_limit (ip_hash, created_at desc);

alter table public.rsvp_rate_limit enable row level security;
revoke all on public.rsvp_rate_limit from anon, authenticated;
grant select, insert, delete on public.rsvp_rate_limit to service_role;
grant usage on sequence public.rsvp_rate_limit_id_seq to service_role;
