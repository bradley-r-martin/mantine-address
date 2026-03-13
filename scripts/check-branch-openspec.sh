#!/usr/bin/env bash
# Exit 0 if current branch name matches a directory under openspec/changes/; else exit 1.
set -e
BRANCH=$(git branch --show-current 2>/dev/null || true)
if [ -z "$BRANCH" ]; then
  # Detached HEAD (e.g. in CI or after checkout of a commit); skip check
  exit 0
fi
if [ ! -d "openspec/changes/$BRANCH" ]; then
  echo "Branch '$BRANCH' must match an OpenSpec change. Create openspec/changes/$BRANCH/ (e.g. run 'openspec new change $BRANCH') or switch to a branch that matches an existing change."
  exit 1
fi
exit 0
