# Beecon MCP Server

Model Context Protocol server for Beecon.

This package is a thin MCP wrapper over the existing Beecon REST API. It does
not talk to the database directly and it does not reimplement business logic.

## Authentication

The server reads its configuration from environment variables:

- `Paperclip_API_URL` - Paperclip base URL, for example `http://localhost:3100`
- `Paperclip_API_KEY` - bearer token used for `/api` requests
- `Paperclip_COMPANY_ID` - optional default company for company-scoped tools
- `Paperclip_AGENT_ID` - optional default agent for checkout helpers
- `Paperclip_RUN_ID` - optional run id forwarded on mutating requests

## Usage

```sh
npx -y @Paperclipai/mcp-server
```

Or locally in this repo:

```sh
pnpm --filter @Paperclipai/mcp-server build
node packages/mcp-server/dist/stdio.js
```

## Tool Surface

Read tools:

- `PaperclipMe`
- `PaperclipInboxLite`
- `PaperclipListAgents`
- `PaperclipGetAgent`
- `PaperclipListIssues`
- `PaperclipGetIssue`
- `PaperclipGetHeartbeatContext`
- `PaperclipListComments`
- `PaperclipGetComment`
- `PaperclipListIssueApprovals`
- `PaperclipListDocuments`
- `PaperclipGetDocument`
- `PaperclipListDocumentRevisions`
- `PaperclipListProjects`
- `PaperclipGetProject`
- `PaperclipGetIssueWorkspaceRuntime`
- `PaperclipWaitForIssueWorkspaceService`
- `PaperclipListGoals`
- `PaperclipGetGoal`
- `PaperclipListApprovals`
- `PaperclipGetApproval`
- `PaperclipGetApprovalIssues`
- `PaperclipListApprovalComments`

Write tools:

- `PaperclipCreateIssue`
- `PaperclipUpdateIssue`
- `PaperclipCheckoutIssue`
- `PaperclipReleaseIssue`
- `PaperclipAddComment`
- `PaperclipSuggestTasks`
- `PaperclipAskUserQuestions`
- `PaperclipRequestConfirmation`
- `PaperclipUpsertIssueDocument`
- `PaperclipRestoreIssueDocumentRevision`
- `PaperclipControlIssueWorkspaceServices`
- `PaperclipCreateApproval`
- `PaperclipLinkIssueApproval`
- `PaperclipUnlinkIssueApproval`
- `PaperclipApprovalDecision`
- `PaperclipAddApprovalComment`

Escape hatch:

- `PaperclipApiRequest`

`PaperclipApiRequest` is limited to paths under `/api` and JSON bodies. It is
meant for endpoints that do not yet have a dedicated MCP tool.
