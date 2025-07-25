# Proper View

A Next.js application powered by Supabase for property management and agent dashboards.

---

## Prerequisites

- **Supabase CLI**: [Install instructions](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=macos#installing-the-supabase-cli)
- **Docker**: [Install Docker Desktop](https://docs.docker.com/desktop/)
- **Node.js & npm**: Ensure you have Node.js (v16+) and npm installed.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd proper-view
```

### 2. Start Supabase

Start the local Supabase development environment (requires Docker):

```sh
supabase start
```

- On first run, the database will be seeded automatically using `supabase/seed.sql`.
- If the seed does not run, use `supabase reset` to reinitialize and apply the seed script.

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<copy-from-supabase-start-output>
```

- You can also retrieve the anon key by running `supabase status`.

### 4. Database Migrations

To create a new migration after updating schemas in `/supabase/schemas`:

1. Stop Supabase:
   ```sh
   supabase stop
   ```
2. Generate a migration file:
   ```sh
   supabase db diff -f <migration-name>
   ```
3. Restart Supabase and apply migrations:
   ```sh
   supabase start
   supabase migration up
   ```

---

## Running the App

Once Supabase is running and the database is seeded, start the development server:

```sh
npm run dev
```

Visit [http://localhost:3000/](http://localhost:3000/) in your browser to view the app.

---

## Common Commands

- **Start Supabase:** `supabase start`
- **Stop Supabase:** `supabase stop`
- **Reset Supabase:** `supabase reset`
- **Check Supabase status:** `supabase status`
- **Run migrations:** `supabase migration up`

---
