-- Enable the uuid-ossp extension for UUID generation
create extension if not exists "uuid-ossp";

create table agents (
  id uuid primary key default uuid_generate_v4(),
  name text not null
);


create table properties (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  title text not null,
  price numeric(12,2) not null,
  street_address text not null,
	city text not null,
  bedrooms integer not null,
  bathrooms float not null,
  description text,
  status text not null check (status in ('active', 'pending', 'sold')),
  foreign key (agent_id) references agents(id)
);

-- Trigger function to update updated_at on row update
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_set_updated_at
before update on properties
for each row
execute procedure set_updated_at();


create table inquiries (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null,
  property_id uuid not null,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  foreign key (agent_id) references agents(id),
  foreign key (property_id) references properties(id)
);