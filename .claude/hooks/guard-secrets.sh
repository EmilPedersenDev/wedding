#!/usr/bin/env bash
# PreToolUse guard: refuse to let any tool touch this repo's credential files.
#
# .env, supabase/.env.local and .mcp.json all hold live secrets (Turnstile secret,
# IP salt, a GitHub PAT). They are gitignored, but nothing otherwise stops a tool
# call from reading them straight into a transcript. .env.example is deliberately
# allowed through — it documents the key names without the values.
#
# Contract: print a PreToolUse deny decision on stdout, or print nothing at all.
# Silence means "no opinion" and the normal permission flow continues.
set -euo pipefail

payload=$(cat)
target=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_input.command // ""')

# `.env` must not match `.env.example`, hence the trailing "not a dot" class.
# For Bash this greps the command string: it catches `cat .env`, not an obfuscated
# equivalent. A guardrail, not a sandbox.
if printf '%s' "$target" | grep -qE '\.mcp\.json|\.env\.local|\.env\.keys|\.env([^.a-zA-Z0-9]|$)'; then
  jq -n --arg t "$target" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: ("guard-secrets hook: `\($t)` refers to a credential file (Turnstile secret, IP salt, GitHub PAT). Read .env.example for the key names, or ask the user for a value.")
    }
  }'
fi

exit 0
