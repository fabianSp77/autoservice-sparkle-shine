create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  vehicle text not null,
  service text not null,
  requested_date date,
  requested_time text,
  message text,
  status text not null default 'new'
);

alter table public.booking_requests enable row level security;

create index booking_requests_created_at_idx on public.booking_requests (created_at desc);