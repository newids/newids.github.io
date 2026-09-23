# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The GitHub Pages **user site** for `newids` (served at https://newids.github.io/). It is a Jekyll site using the
`jekyll-theme-cayman` theme, built by GitHub Pages itself on every push to `master`. There is no local build
tooling (no Gemfile, no package.json, Jekyll is not installed locally) and no tests.

Deploy = push to `master`, then check https://newids.github.io/ after GitHub Pages rebuilds.

## Files

- `index.md` — the landing page. A link hub pointing to other GitHub Pages **project** sites under the same
  account (`newids.github.io/<repo>/`). Content is in Korean.
- `README.md` — GitHub-facing copy of the same links. When adding a link to `index.md`, add it here too.
- `_config.yml` — only sets the theme.
- `mac` — a plain POSIX `sh` script, deliberately extensionless so it is served raw at
  `https://newids.github.io/mac`. It is a short-URL alias used as
  `curl -fsSL newids.github.io/mac | sh [-s -- <args>]` and just forwards all arguments to
  `iMac-setup.sh`, fetched from `https://newids.github.io/imac-setup/` first and from the
  `newids/codyssey-imac` repo (raw.githubusercontent.com) as a fallback. The real setup logic lives
  in `codyssey-imac` and is synced into `imac-setup`, not here.

## Constraints

- Never add YAML front matter to `mac`; Jekyll would then process it instead of copying it verbatim, and the
  `curl | sh` entry point would break. Keep it `sh`-compatible (no bash-isms).
- Any new raw-served helper file must follow the same pattern: no extension, no front matter, no leading
  underscore (Jekyll ignores `_`-prefixed files).
- `.serena/` is local tooling state and is untracked; do not commit it.
