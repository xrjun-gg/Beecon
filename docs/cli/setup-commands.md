---
title: Setup Commands
summary: Onboard, run, doctor, and configure
---

Instance setup and diagnostics commands.

## `Paperclipai run`

One-command bootstrap and start:

```sh
pnpm Paperclipai run
```

Does:

1. Auto-onboards if config is missing
2. Runs `Paperclipai doctor` with repair enabled
3. Starts the server when checks pass

Choose a specific instance:

```sh
pnpm Paperclipai run --instance dev
```

## `Paperclipai onboard`

Interactive first-time setup:

```sh
pnpm Paperclipai onboard
```

If Paperclip is already configured, rerunning `onboard` keeps the existing config in place. Use `Paperclipai configure` to change settings on an existing install.

First prompt:

1. `Quickstart` (recommended): local defaults (embedded database, no LLM provider, local disk storage, default secrets)
2. `Advanced setup`: full interactive configuration

Start immediately after onboarding:

```sh
pnpm Paperclipai onboard --run
```

Non-interactive defaults + immediate start (opens browser on server listen):

```sh
pnpm Paperclipai onboard --yes
```

On an existing install, `--yes` now preserves the current config and just starts Paperclip with that setup.

## `Paperclipai doctor`

Health checks with optional auto-repair:

```sh
pnpm Paperclipai doctor
pnpm Paperclipai doctor --repair
```

Validates:

- Server configuration
- Database connectivity
- Secrets adapter configuration, including AWS Secrets Manager non-secret env
  config when selected
- Storage configuration
- Missing key files

## `Paperclipai configure`

Update configuration sections:

```sh
pnpm Paperclipai configure --section server
pnpm Paperclipai configure --section secrets
pnpm Paperclipai configure --section storage
```

`--section secrets` updates the deployment-level provider used as the fallback
for secrets that do not target a specific company vault. Per-company provider
vaults (named instances, default vault selection, multiple vaults per provider,
coming-soon GCP/Vault) live in the board UI under
`Company Settings → Secrets → Provider vaults` and the
`/api/companies/{companyId}/secret-provider-configs` API.

## `Paperclipai env`

Show resolved environment configuration:

```sh
pnpm Paperclipai env
```

This now includes bind-oriented deployment settings such as `Paperclip_BIND` and `Paperclip_BIND_HOST` when configured.

## `Paperclipai allowed-hostname`

Allow a private hostname for authenticated/private mode:

```sh
pnpm Paperclipai allowed-hostname my-tailscale-host
```

## Local Storage Paths

| Data | Default Path |
|------|-------------|
| Config | `~/.Paperclip/instances/default/config.json` |
| Database | `~/.Paperclip/instances/default/db` |
| Logs | `~/.Paperclip/instances/default/logs` |
| Storage | `~/.Paperclip/instances/default/data/storage` |
| Secrets key | `~/.Paperclip/instances/default/secrets/master.key` |

Override with:

```sh
Paperclip_HOME=/custom/home Paperclip_INSTANCE_ID=dev pnpm Paperclipai run
```

Or pass `--data-dir` directly on any command:

```sh
pnpm Paperclipai run --data-dir ./tmp/Paperclip-dev
pnpm Paperclipai doctor --data-dir ./tmp/Paperclip-dev
```
