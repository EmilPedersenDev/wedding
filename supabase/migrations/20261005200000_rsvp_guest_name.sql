-- OSA-formuläret frågar inte längre efter antal personer, utan efter namnet på en eventuell gäst
-- (respektive). num_of_guests behålls för redan inskickade svar men skrivs inte längre, och görs
-- nullbar så att den nya edge-funktionen kan inserta utan den. Måste köras innan den nya
-- funktionen deployas — den skriver guest_name, som annars inte finns.

alter table public.rsvp add column guest_name text;

alter table public.rsvp
  add constraint rsvp_guest_name_len check (guest_name is null or char_length(guest_name) between 1 and 100);

alter table public.rsvp alter column num_of_guests drop not null;
