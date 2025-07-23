# Proper View

## Supabase

you'll need to start up a new database
`supabase start`

afterwards, create an .env with the following env variables:

```
SUPABASE_URL=http://127.0.0.1:54321

ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
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
