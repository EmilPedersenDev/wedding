-- Databaslintern flaggar funktioner utan fast search_path (function_search_path_mutable) —
-- utan den kan en anropare med skrivrätt på schemat skugga ett objekt funktionen använder.
-- set_updated_at() refererar inga tabeller, men fixera ändå enligt best practice.
alter function public.set_updated_at() set search_path = '';
