---
title: Local Development
summary: Set up Beecon for local development
---

Run Beecon locally with zero external dependencies.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Start Dev Server

```sh
pnpm install
pnpm dev
```

This starts:

- **API server** at `http://localhost:3100`
- **UI** served by the API server in dev middleware mode (same origin)

No Docker or external database required. Beecon uses embedded PostgreSQL automatically.

## One-Command Bootstrap

For a first-time install:

```sh
pnpm Paperclipai run
```

This does:

1. Auto-onboards if config is missing
2. Runs `Paperclipai doctor` with repair enabled
3. Starts the server when checks pass

## Bind Presets In Dev

Default `pnpm dev` stays in `local_trusted` with loopback-only binding.

To open Beecon to a private network with login enabled:

```sh
pnpm dev --bind lan
```

For Tailscale-only binding on a detected tailnet address:

```sh
pnpm dev --bind tailnet
```

Legacy aliases still work and map to the older broad private-network behavior:

```sh
pnpm dev --tailscale-auth
pnpm dev --authenticated-private
```

Allow additional private hostnames:

```sh
pnpm Paperclipai allowed-hostname dotta-macbook-pro
```

For full setup and troubleshooting, see [Tailscale Private Access](/deploy/tailscale-private-access).

## Health Checks

```sh
curl http://localhost:3100/api/health
# -> {"status":"ok"}

curl http://localhost:3100/api/companies
# -> []
```

## Safe Worktree Bootstrap for Local Agent Runs

For safer parallel local experiments, initialize a dedicated worktree instance instead of reusing your main checkout:

```sh
pnpm Paperclipai worktree:make local-lab --seed-mode minimal
cd ~/Paperclip-local-lab
pnpm Paperclipai worktree env                       # inspect generated env exports
eval "$(pnpm Paperclipai worktree env)"             # bash/zsh
pnpm Paperclipai run
pnpm Paperclipai doctor
```

If the experiment gets noisy, repair or reseed the worktree without touching the main branch:

```sh
pnpm Paperclipai worktree repair --branch Paperclip-local-lab
pnpm Paperclipai worktree reseed --from . --to Paperclip-local-lab
```

When done, shut it down and remove the isolated state explicitly:

```sh
pnpm Paperclipai worktree:cleanup local-lab --force
```

## Reset Dev Data

To wipe local data and start fresh:

```sh
rm -rf ~/.Paperclip/instances/default/db
pnpm dev
```

## Data Locations

| Data | Path |
|------|------|
| Config | `~/.Paperclip/instances/default/config.json` |
| Database | `~/.Paperclip/instances/default/db` |
| Storage | `~/.Paperclip/instances/default/data/storage` |
| Secrets key | `~/.Paperclip/instances/default/secrets/master.key` |
| Logs | `~/.Paperclip/instances/default/logs` |

Override with environment variables:

```sh
Paperclip_HOME=/custom/path Paperclip_INSTANCE_ID=dev pnpm Paperclipai run
```
