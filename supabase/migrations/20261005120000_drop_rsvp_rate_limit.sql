-- Rate-limitingen i edge-funktionen rsvp är borttagen, så tabellen har ingen läsare eller
-- skrivare kvar. Får köras först när den nya funktionen är deployad — den gamla läser
-- tabellen på varje inskick och svarar 500 om den saknas.
drop table public.rsvp_rate_limit;
