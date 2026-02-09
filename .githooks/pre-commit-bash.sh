#!/usr/bin/env bash
# Pre-commit hook (Bash) - branch name validation (macOS / Linux)
LC_ALL=C
local_branch="$(git rev-parse --abbrev-ref HEAD)"
valid_branch_regex="^(feature|bugfix|update|release)\/[a-z0-9._-]+$"
standard_branches="develop HEAD"

echo "RUNNING PRE-COMMIT SCRIPT (Bash)"

if [[ " $standard_branches " =~ " $local_branch " ]]; then
  exit 0
fi
if [[ $local_branch =~ $valid_branch_regex ]]; then
  exit 0
fi

echo "There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex"
echo "Your commit will be rejected. You should rename your branch to a valid name and try again."
echo "Current branch: $local_branch"
exit 1
