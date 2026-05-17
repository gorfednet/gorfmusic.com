# Security policy

## Supported versions

This repository tracks the **live gorfmusic.com website**. Fixes for security-relevant dependency issues are applied on the default branch (`main`) as they are identified.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for undisclosed security problems.

Instead, email project maintainers with:

- A short description of the issue and its impact
- Steps to reproduce (or a proof-of-concept), if possible
- Any affected URLs or deployment assumptions you inferred

Use contact channels already published on [gorfmusic.com/contact](https://gorfmusic.com/contact) or, if you have a direct maintainer email for `gorfed.net` / this org, send it there with subject prefix `[security] gorfmusic.com`.

## Secrets

This site should never require committing credentials. If you find accidental leakage of tokens, deployment keys, or personal data in git history, treat it as urgent and report it using the same private channel.
