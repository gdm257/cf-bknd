## Overview

Bootstrap [bknd](https://github.com/bknd-io/bknd) on Cloudflare Workers with D1 database and R2 storage.

## Prerequisites

- pnpm package manager
- Cloudflare account with Workers, D1, and R2 enabled

If you're using a D1 database, make sure to create a D1 database in your Cloudflare account and update the database configuration in `wrangler.toml`:

```bash
npx wrangler d1 create bknd
```

For R2 storage, create a bucket:

```bash
npx wrangler r2 bucket create bknd
```

## Deployment

### Option 1: Wrangler CLI (Manual)

```bash
pnpm deploy
```

### Option 2: GitHub Actions (CI/CD)

The project includes automated deployment via GitHub Actions. Deployment is triggered automatically when:

- Code is pushed to the `main` branch
- Manual dispatch from the Actions tab

**Setup required:**

1. [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with "Edit Cloudflare Workers" permissions
2. Add the following secrets to your repository (GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret):
  - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
  - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID (found in Cloudflare dashboard sidebar)

## Development

```bash
pnpm install
pnpm predev
pnpm dev
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm deploy` - Deploy to production
- `pnpm typegen` - Generate TypeScript types
- `pnpm bknd-typegen` - Generate bknd-specific types
