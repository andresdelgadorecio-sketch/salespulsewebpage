-- Crear tabla de suscripciones vinculada a perfiles
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  lemon_squeezy_id text unique, -- ID de la suscripción en LS
  order_id text,
  customer_id text,
  variant_id text, -- Identifica si es Solo, Growth o Command
  status text, -- active, trialling, cancelled, etc.
  renews_at timestamp with time zone,
  ends_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Habilitar RLS (Seguridad)
alter table public.subscriptions enable row level security;

create policy "Users can view own subscription" 
on public.subscriptions for select 
using (auth.uid() = user_id);
