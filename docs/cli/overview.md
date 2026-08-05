---
title: CLI Overview
summary: CLI installation and setup
---

The Paperclip CLI handles instance setup, diagnostics, and control-plane operations.

## Usage

```sh
pnpm Paperclipai --help
```

## Global Options

All commands support:

| Flag | Description |
|------|-------------|
| `--data-dir <path>` | Local Paperclip data root (isolates from `~/.Paperclip`) |
| `--api-base <url>` | API base URL |
| `--api-key <token>` | API authentication token |
| `--context <path>` | Context file path |
| `--profile <name>` | Context profile name |
| `--json` | Output as JSON |

Company-scoped commands also accept `--company-id <id>`.

For clean local instances, pass `--data-dir` on the command you run:

```sh
pnpm Paperclipai run --data-dir ./tmp/Paperclip-dev
```

## Context Profiles

Store defaults to avoid repeating flags:

```sh
# Set defaults
pnpm Paperclipai context set --api-base http://localhost:3100 --company-id <id>

# View current context
pnpm Paperclipai context show

# List profiles
pnpm Paperclipai context list

# Switch profile
pnpm Paperclipai context use default
```

To avoid storing secrets in context, use an env var:

```sh
pnpm Paperclipai context set --api-key-env-var-name Paperclip_API_KEY
export Paperclip_API_KEY=...
```

Secret operations are available under `Paperclipai secrets`:

```sh
pnpm Paperclipai secrets declarations --company-id <company-id> --kind secret
pnpm Paperclipai secrets create --company-id <company-id> --name anthropic-api-key --value-env ANTHROPIC_API_KEY
pnpm Paperclipai secrets link --company-id <company-id> --name prod-stripe-key --provider aws_secrets_manager --external-ref <provider-ref>
pnpm Paperclipai secrets doctor --company-id <company-id>
pnpm Paperclipai secrets migrate-inline-env --company-id <company-id> --apply
```

Context is stored at `~/.Paperclip/context.json`.

## Command Categories

The CLI has two categories:

1. **[Setup commands](/cli/setup-commands)** — instance bootstrap, diagnostics, configuration
2. **[Control-plane commands](/cli/control-plane-commands)** — issues, agents, approvals, activity
