-- Bliss HQ Phase 1 schema (Modules 1-3 + inventory/vendor groundwork for Phase 2).
-- Target: Supabase Postgres. profiles.id references auth.users(id).
-- This file is validated against a clean Postgres in CI/local before go-live.

create extension if not exists pgcrypto;

-- ---------- Enums ----------
do $$ begin
  create type user_role as enum ('admin','manager','caretaker','owner');
exception when duplicate_object then null; end $$;
do $$ begin
  create type room_type as enum ('bedroom','bathroom','living','dining','kitchen','pool','outdoor','safety','utility');
exception when duplicate_object then null; end $$;
do $$ begin
  create type template_type as enum ('pre_checkin','post_stay','daily','weekly','monthly','adhoc');
exception when duplicate_object then null; end $$;
do $$ begin
  create type run_status as enum ('in_progress','submitted','approved','rejected');
exception when duplicate_object then null; end $$;
do $$ begin
  create type issue_status as enum ('open','in_progress','resolved');
exception when duplicate_object then null; end $$;
do $$ begin
  create type issue_category as enum ('cleaning','damage','missing','maintenance','electronic','consumable');
exception when duplicate_object then null; end $$;
do $$ begin
  create type severity as enum ('low','medium','high');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ownership as enum ('pm','ct','vd','own');
exception when duplicate_object then null; end $$;

-- ---------- updated_at helper ----------
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end $$ language plpgsql;

-- ---------- People ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text unique,
  role user_role not null default 'caretaker',
  languages text[] not null default '{en}',
  aadhaar_ref text,                       -- offline e-KYC reference id only, never the number
  created_at timestamptz not null default now()
);

-- ---------- Properties & rooms ----------
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  location text,
  bhk int,
  has_pool boolean not null default false,
  guest_capacity int,
  owner_id uuid references profiles(id),
  manager_id uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_prop_upd before update on properties for each row execute function set_updated_at();

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  type room_type not null,
  name text not null,
  sort int not null default 0
);
create index if not exists idx_rooms_property on rooms(property_id);

create table if not exists caretaker_assignments (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  caretaker_id uuid not null references profiles(id) on delete cascade,
  is_primary boolean not null default true,
  unique (property_id, caretaker_id)
);
create index if not exists idx_assign_caretaker on caretaker_assignments(caretaker_id);

-- ---------- Checklist templates & items ----------
create table if not exists checklist_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type template_type not null,
  is_master boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists checklist_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id) on delete cascade,
  room_type room_type,                    -- null = fixed section (kitchen/pool/etc handled by type too)
  text_en text not null,
  text_hi text,
  text_te text,
  requires_photo boolean not null default false,
  sort int not null default 0
);
create index if not exists idx_items_template on checklist_items(template_id);

create table if not exists property_checklists (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  template_id uuid not null references checklist_templates(id),
  active boolean not null default true,
  unique (property_id, template_id)
);

-- ---------- Runs, responses, media ----------
create table if not exists checklist_runs (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  template_id uuid not null references checklist_templates(id),
  status run_status not null default 'in_progress',
  caretaker_id uuid references profiles(id),
  guest_name text,
  guest_count int,
  booking_ref text,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz
);
create index if not exists idx_runs_property on checklist_runs(property_id);

create table if not exists run_responses (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references checklist_runs(id) on delete cascade,
  room_id uuid references rooms(id),
  item_id uuid not null references checklist_items(id),
  passed boolean,
  remark text,
  created_at timestamptz not null default now()
);
create index if not exists idx_resp_run on run_responses(run_id);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  run_response_id uuid references run_responses(id) on delete cascade,
  issue_id uuid,
  storage_path text not null,
  thumb_path text,
  taken_at timestamptz,
  lat double precision,
  lng double precision,
  retain_until date,                      -- drives the tiered retention policy
  created_at timestamptz not null default now()
);
create index if not exists idx_media_property on media_assets(property_id);

-- ---------- Issues ----------
create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  phone text,
  whatsapp text,
  service_type text,
  area text,
  rate text,
  rating int,
  notes text
);

create table if not exists issues (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  room_id uuid references rooms(id),
  run_id uuid references checklist_runs(id),
  category issue_category not null default 'maintenance',
  severity severity not null default 'medium',
  description text,
  status issue_status not null default 'open',
  owner_role ownership not null default 'pm',
  assigned_vendor_id uuid references vendors(id),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists idx_issues_property on issues(property_id);
alter table media_assets drop constraint if exists media_issue_fk;
alter table media_assets add constraint media_issue_fk foreign key (issue_id) references issues(id) on delete set null;

-- ---------- Inventory & laundry (groundwork) ----------
create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  category text not null,
  name_en text not null,
  name_hi text,
  name_te text,
  brand text,
  unit text,
  must_have_qty numeric,
  current_stock numeric,
  condition text,
  last_serviced date,
  suggested_brand text,
  reorder boolean not null default false
);
create index if not exists idx_inv_property on inventory_items(property_id);

create table if not exists laundry_dispatch (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  run_id uuid references checklist_runs(id),
  item_name text not null,
  qty int not null default 0,
  sent_at timestamptz not null default now()
);

-- ---------- Audit ----------
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity text not null,
  entity_id uuid,
  meta jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_audit_entity on audit_log(entity, entity_id);
