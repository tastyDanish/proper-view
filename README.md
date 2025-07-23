# Proper View

## Supabase

you'll need to start up a new database
`supabase start`

the file supabase/seed.sql will automatically be picked up on first db creation
if not, try applying a `supabase reset` which should pick up the seed script

afterwards, create an .env with the following env variables:

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321

NEXT_PUBLIC_SUPABASE_ANON_KEY={Copy from the supabase start commands output}
```

# creating a new migration file

make updates to the schemas in /supabase/schemas
stop supabase with the command `supabase stop`
run the following to create a migration file:
`supabase db diff -f {migration name}`

start up supabase
`supabase start`
and apply the migration
`supabase migration up`
