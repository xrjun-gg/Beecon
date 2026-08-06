---
title: Environment Variables
summary: Full environment variable reference
---

All environment variables that Beecon uses for server configuration.

## Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3100` | Server port |
| `Paperclip_BIND` | `loopback` | Reachability preset: `loopback`, `lan`, `tailnet`, or `custom` |
| `Paperclip_BIND_HOST` | (unset) | Required when `Paperclip_BIND=custom` |
| `HOST` | `127.0.0.1` | Legacy host override; prefer `Paperclip_BIND` for new setups |
| `DATABASE_URL` | (embedded) | PostgreSQL connection string |
| `Paperclip_HOME` | `~/.Paperclip` | Base directory for all Paperclip data |
| `Paperclip_INSTANCE_ID` | `default` | Instance identifier (for multiple local instances) |
| `Paperclip_DEPLOYMENT_MODE` | `local_trusted` | Runtime mode override |
| `Paperclip_DEPLOYMENT_EXPOSURE` | `private` | Exposure policy when deployment mode is `authenticated` |
| `Paperclip_API_URL` | (auto-derived) | Paperclip API base URL. When set externally (e.g., via Kubernetes ConfigMap, load balancer, or reverse proxy), the server preserves the value instead of deriving it from the listen host and port. Useful for deployments where the public-facing URL differs from the local bind address. |

## Secrets

| Variable | Default | Description |
|----------|---------|-------------|
| `Paperclip_SECRETS_MASTER_KEY` | (from file) | 32-byte encryption key (base64/hex/raw) |
| `Paperclip_SECRETS_MASTER_KEY_FILE` | `~/.Paperclip/.../secrets/master.key` | Path to key file |
| `Paperclip_SECRETS_STRICT_MODE` | `false` | Require secret refs for sensitive env vars |

## Agent Runtime (Injected into agent processes)

These are set automatically by the server when invoking agents:

| Variable | Description |
|----------|-------------|
| `Paperclip_AGENT_ID` | Agent's unique ID |
| `Paperclip_COMPANY_ID` | Company ID |
| `Paperclip_API_URL` | Paperclip API base URL (inherits the server-level value; see Server Configuration above) |
| `Paperclip_API_KEY` | Short-lived JWT for API auth |
| `Paperclip_RUN_ID` | Current heartbeat run ID |
| `Paperclip_TASK_ID` | Issue that triggered this wake |
| `Paperclip_WAKE_REASON` | Wake trigger reason |
| `Paperclip_WAKE_COMMENT_ID` | Comment that triggered this wake |
| `Paperclip_APPROVAL_ID` | Resolved approval ID |
| `Paperclip_APPROVAL_STATUS` | Approval decision |
| `Paperclip_LINKED_ISSUE_IDS` | Comma-separated linked issue IDs |

## LLM Provider Keys (for adapters)

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (for Claude Code adapter) |
| `OPENAI_API_KEY` | OpenAI API key (for Codex adapter) |
