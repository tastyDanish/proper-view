create table "public"."agents" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null
);


create table "public"."inquiries" (
    "id" uuid not null default uuid_generate_v4(),
    "agent_id" uuid not null,
    "property_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "email" text not null,
    "phone" text not null,
    "message" text not null
);


create table "public"."properties" (
    "id" uuid not null default uuid_generate_v4(),
    "agent_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "title" text not null,
    "price" numeric(12,2) not null,
    "address" text not null,
    "bedrooms" integer not null,
    "bathrooms" integer not null,
    "description" text,
    "status" text not null
);


CREATE UNIQUE INDEX agents_pkey ON public.agents USING btree (id);

CREATE UNIQUE INDEX inquiries_pkey ON public.inquiries USING btree (id);

CREATE UNIQUE INDEX properties_pkey ON public.properties USING btree (id);

alter table "public"."agents" add constraint "agents_pkey" PRIMARY KEY using index "agents_pkey";

alter table "public"."inquiries" add constraint "inquiries_pkey" PRIMARY KEY using index "inquiries_pkey";

alter table "public"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "public"."inquiries" add constraint "inquiries_agent_id_fkey" FOREIGN KEY (agent_id) REFERENCES agents(id) not valid;

alter table "public"."inquiries" validate constraint "inquiries_agent_id_fkey";

alter table "public"."inquiries" add constraint "inquiries_property_id_fkey" FOREIGN KEY (property_id) REFERENCES properties(id) not valid;

alter table "public"."inquiries" validate constraint "inquiries_property_id_fkey";

alter table "public"."properties" add constraint "properties_agent_id_fkey" FOREIGN KEY (agent_id) REFERENCES agents(id) not valid;

alter table "public"."properties" validate constraint "properties_agent_id_fkey";

alter table "public"."properties" add constraint "properties_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'pending'::text, 'sold'::text]))) not valid;

alter table "public"."properties" validate constraint "properties_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."agents" to "anon";

grant insert on table "public"."agents" to "anon";

grant references on table "public"."agents" to "anon";

grant select on table "public"."agents" to "anon";

grant trigger on table "public"."agents" to "anon";

grant truncate on table "public"."agents" to "anon";

grant update on table "public"."agents" to "anon";

grant delete on table "public"."agents" to "authenticated";

grant insert on table "public"."agents" to "authenticated";

grant references on table "public"."agents" to "authenticated";

grant select on table "public"."agents" to "authenticated";

grant trigger on table "public"."agents" to "authenticated";

grant truncate on table "public"."agents" to "authenticated";

grant update on table "public"."agents" to "authenticated";

grant delete on table "public"."agents" to "service_role";

grant insert on table "public"."agents" to "service_role";

grant references on table "public"."agents" to "service_role";

grant select on table "public"."agents" to "service_role";

grant trigger on table "public"."agents" to "service_role";

grant truncate on table "public"."agents" to "service_role";

grant update on table "public"."agents" to "service_role";

grant delete on table "public"."inquiries" to "anon";

grant insert on table "public"."inquiries" to "anon";

grant references on table "public"."inquiries" to "anon";

grant select on table "public"."inquiries" to "anon";

grant trigger on table "public"."inquiries" to "anon";

grant truncate on table "public"."inquiries" to "anon";

grant update on table "public"."inquiries" to "anon";

grant delete on table "public"."inquiries" to "authenticated";

grant insert on table "public"."inquiries" to "authenticated";

grant references on table "public"."inquiries" to "authenticated";

grant select on table "public"."inquiries" to "authenticated";

grant trigger on table "public"."inquiries" to "authenticated";

grant truncate on table "public"."inquiries" to "authenticated";

grant update on table "public"."inquiries" to "authenticated";

grant delete on table "public"."inquiries" to "service_role";

grant insert on table "public"."inquiries" to "service_role";

grant references on table "public"."inquiries" to "service_role";

grant select on table "public"."inquiries" to "service_role";

grant trigger on table "public"."inquiries" to "service_role";

grant truncate on table "public"."inquiries" to "service_role";

grant update on table "public"."inquiries" to "service_role";

grant delete on table "public"."properties" to "anon";

grant insert on table "public"."properties" to "anon";

grant references on table "public"."properties" to "anon";

grant select on table "public"."properties" to "anon";

grant trigger on table "public"."properties" to "anon";

grant truncate on table "public"."properties" to "anon";

grant update on table "public"."properties" to "anon";

grant delete on table "public"."properties" to "authenticated";

grant insert on table "public"."properties" to "authenticated";

grant references on table "public"."properties" to "authenticated";

grant select on table "public"."properties" to "authenticated";

grant trigger on table "public"."properties" to "authenticated";

grant truncate on table "public"."properties" to "authenticated";

grant update on table "public"."properties" to "authenticated";

grant delete on table "public"."properties" to "service_role";

grant insert on table "public"."properties" to "service_role";

grant references on table "public"."properties" to "service_role";

grant select on table "public"."properties" to "service_role";

grant trigger on table "public"."properties" to "service_role";

grant truncate on table "public"."properties" to "service_role";

grant update on table "public"."properties" to "service_role";

CREATE TRIGGER trigger_set_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION set_updated_at();


