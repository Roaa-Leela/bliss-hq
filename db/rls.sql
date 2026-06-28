-- Row-Level Security for Bliss HQ. Mirror these scoping rules in PowerSync sync rules.
-- Roles come from profiles.role; property access via owner/manager/assignment.

create or replace function app_role() returns user_role language sql stable as $$
  select role from profiles where id = auth.uid()
$$;

create or replace function can_access_property(pid uuid) returns boolean language sql stable as $$
  select case
    when app_role() = 'admin' then true
    else exists (
      select 1 from properties p
      where p.id = pid and (
        p.manager_id = auth.uid()
        or p.owner_id = auth.uid()
        or exists (select 1 from caretaker_assignments ca where ca.property_id = p.id and ca.caretaker_id = auth.uid())
      )
    )
  end
$$;

-- Profiles
alter table profiles enable row level security;
create policy profiles_read on profiles for select using (id = auth.uid() or app_role() = 'admin' or app_role() = 'manager');
create policy profiles_update_self on profiles for update using (id = auth.uid());

-- Properties
alter table properties enable row level security;
create policy properties_read on properties for select using (can_access_property(id));
create policy properties_write on properties for all using (app_role() in ('admin','manager')) with check (app_role() in ('admin','manager'));

-- Rooms
alter table rooms enable row level security;
create policy rooms_all on rooms for all using (can_access_property(property_id)) with check (can_access_property(property_id));

-- Assignments
alter table caretaker_assignments enable row level security;
create policy assign_read on caretaker_assignments for select using (caretaker_id = auth.uid() or can_access_property(property_id));
create policy assign_write on caretaker_assignments for all using (app_role() in ('admin','manager')) with check (app_role() in ('admin','manager'));

-- Templates & items (shared catalogue: all authenticated read; admin/manager write)
alter table checklist_templates enable row level security;
create policy tpl_read on checklist_templates for select using (auth.uid() is not null);
create policy tpl_write on checklist_templates for all using (app_role() in ('admin','manager')) with check (app_role() in ('admin','manager'));

alter table checklist_items enable row level security;
create policy item_read on checklist_items for select using (auth.uid() is not null);
create policy item_write on checklist_items for all using (app_role() in ('admin','manager')) with check (app_role() in ('admin','manager'));

alter table property_checklists enable row level security;
create policy pc_all on property_checklists for all using (can_access_property(property_id)) with check (can_access_property(property_id));

-- Runs & responses
alter table checklist_runs enable row level security;
create policy runs_all on checklist_runs for all using (can_access_property(property_id)) with check (can_access_property(property_id));

alter table run_responses enable row level security;
create policy resp_all on run_responses for all
  using (exists (select 1 from checklist_runs r where r.id = run_id and can_access_property(r.property_id)))
  with check (exists (select 1 from checklist_runs r where r.id = run_id and can_access_property(r.property_id)));

-- Media
alter table media_assets enable row level security;
create policy media_all on media_assets for all using (can_access_property(property_id)) with check (can_access_property(property_id));

-- Issues
alter table issues enable row level security;
create policy issues_all on issues for all using (can_access_property(property_id)) with check (can_access_property(property_id));

-- Vendors (shared directory: authenticated read; admin/manager write)
alter table vendors enable row level security;
create policy vendors_read on vendors for select using (auth.uid() is not null);
create policy vendors_write on vendors for all using (app_role() in ('admin','manager')) with check (app_role() in ('admin','manager'));

-- Inventory & laundry
alter table inventory_items enable row level security;
create policy inv_all on inventory_items for all using (can_access_property(property_id)) with check (can_access_property(property_id));

alter table laundry_dispatch enable row level security;
create policy laundry_all on laundry_dispatch for all using (can_access_property(property_id)) with check (can_access_property(property_id));

-- Audit (admin read; insert by anyone authenticated via app)
alter table audit_log enable row level security;
create policy audit_read on audit_log for select using (app_role() = 'admin');
create policy audit_insert on audit_log for insert with check (auth.uid() is not null);
