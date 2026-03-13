#!/usr/bin/env bash
# Validate the current branch against OpenSpec changes.
#
# Active change branch  (e.g. setup-library):
#   - openspec/changes/<branch>/ must exist.
#
# Archive branch  (e.g. setup-library-archive):
#   - Branch must end with "-archive".
#   - Derived change name (strip "-archive" suffix) must exist under
#     openspec/changes/archive/ as a directory matching *-<name>.
#   - All staged files must be under openspec/ (no code changes allowed).
set -e

BRANCH=$(git branch --show-current 2>/dev/null || true)
if [ -z "$BRANCH" ]; then
  # Detached HEAD (e.g. in CI or after checkout of a commit); skip check
  exit 0
fi

# ── Archive branch ──────────────────────────────────────────────────────────
if [[ "$BRANCH" == *-archive ]]; then
  CHANGE_NAME="${BRANCH%-archive}"

  # Look for any directory under openspec/changes/archive/ ending with -<name>
  ARCHIVE_MATCH=$(find openspec/changes/archive -maxdepth 1 -type d -name "*-${CHANGE_NAME}" 2>/dev/null | head -n 1)
  if [ -z "$ARCHIVE_MATCH" ]; then
    echo "Branch '$BRANCH' is an archive branch but no archived change matching '*-${CHANGE_NAME}' was found under openspec/changes/archive/."
    echo "Archive the change first (e.g. run 'openspec archive ${CHANGE_NAME}') before committing on this branch."
    exit 1
  fi

  # Enforce that every staged file is under openspec/
  BAD_FILES=$(git diff --cached --name-only | grep -v '^openspec/' || true)
  if [ -n "$BAD_FILES" ]; then
    echo "Archive branch '$BRANCH' may only contain changes to files under openspec/."
    echo "The following staged files are not allowed:"
    echo "$BAD_FILES" | sed 's/^/  /'
    exit 1
  fi

  echo "✓ Archive branch '$BRANCH' matches archived change '$ARCHIVE_MATCH' and all staged files are under openspec/."
  exit 0
fi

# ── Active change branch ─────────────────────────────────────────────────────
if [ ! -d "openspec/changes/$BRANCH" ]; then
  echo "Branch '$BRANCH' must match an OpenSpec change. Create openspec/changes/$BRANCH/ (e.g. run 'openspec new change $BRANCH') or switch to a branch that matches an existing change."
  exit 1
fi

echo "✓ Branch '$BRANCH' matches OpenSpec change openspec/changes/$BRANCH/."
exit 0
