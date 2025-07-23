alter table "public"."properties" drop column "address";

alter table "public"."properties" add column "city" text not null;

alter table "public"."properties" add column "street_address" text not null;


