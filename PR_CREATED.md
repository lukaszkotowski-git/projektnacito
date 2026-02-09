PR not auto-created due to missing GH auth in this environment.

Manual steps to create PR (local):

1. Ensure you are on the feature branch:
   git checkout feat/remove-darkmode-email-phone
2. Push branch (if not pushed):
   git push -u origin feat/remove-darkmode-email-phone
3. Create PR using GitHub CLI:
   gh pr create --title "refactor: remove dark mode; add EmailInput + validations; adjust consult date/time layout" --body "$(cat PR_BODY.md)"

Or open the PR in the browser using:
https://github.com/lukaszkotowski-git/projektnacito/pull/new/feat/remove-darkmode-email-phone

The PR body is prepared in PR_BODY.md
