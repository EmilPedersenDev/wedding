-- rsvp.updated_at hade ingen skrivväg (edge-funktionen bara insertar). Håll den
-- aktuell automatiskt vid framtida uppdateringar, t.ex. mjuk radering (deleted_at)
-- eller manuell rättning av en inskickad rad.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rsvp_set_updated_at
  before update on public.rsvp
  for each row
  execute function public.set_updated_at();
