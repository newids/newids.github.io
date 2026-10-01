# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The GitHub Pages **user site** for `newids` (served at https://newids.github.io/). It is a Jekyll site using the
`jekyll-theme-cayman` theme, built by GitHub Pages itself on every push to `master`. There is no local build
tooling (no Gemfile, no package.json, Jekyll is not installed locally) and no tests.

Deploy = push to `master`, then check https://newids.github.io/ after GitHub Pages rebuilds.

## Files

- `index.html` — the landing page, a hand-written index of the account's public repos grouped into numbered
  sections (최근 작업 · e-book · Codyssey 미션 · 도구 · 기획 · 실험 · 아카이브). Static HTML + CSS, no JS,
  no build; entries are numbered sequentially in document order, so renumber after inserting one. Content is
  in Korean. When repos change, re-check with `gh repo list newids --visibility public` and update the entries,
  the masthead counts, and the "갱신" date (in the footer) together. Colors are oklch role tokens on `:root`;
  dark mode is `prefers-color-scheme` plus a `data-theme` override. Both blocks must stay in sync, and every
  text/background pair was measured (WCAG + APCA) before shipping, so re-measure if you change a token.
- `theme.js` — the only script: the 라이트·다크·시스템 toggle in the masthead. Loaded blocking in `<head>` so
  the stored choice applies before first paint; it reads/writes `localStorage` inside try/catch.
- `README.md` — GitHub-facing summary with the main links. Keep it in sync with `index.html`.
- `_config.yml` — only sets the theme.
- `mac` — a plain POSIX `sh` script, deliberately extensionless so it is served raw at
  `https://newids.github.io/mac`. It is a short-URL alias used as
  `curl -fsSL newids.github.io/mac | sh [-s -- <args>]` and just forwards all arguments to
  `iMac-setup.sh`, fetched from `https://newids.github.io/imac-setup/` first and from the
  `newids/codyssey-imac` repo (raw.githubusercontent.com) as a fallback. The real setup logic lives
  in `codyssey-imac` and is synced into `imac-setup`, not here.
- `iMac4newid` — same pattern, forwarding to `iMac4newids.sh` (the personal variant: 세벌식 최종 only, plus
  hot corners, zsh, ssh keys, git, Terminal profile, Claude Code). Note the URL has no trailing `s`.

## Constraints

- Never add YAML front matter to `mac` or `iMac4newid`; Jekyll would then process it instead of copying it verbatim, and the
  `curl | sh` entry point would break. Keep it `sh`-compatible (no bash-isms).
- Any new raw-served helper file must follow the same pattern: no extension, no front matter, no leading
  underscore (Jekyll ignores `_`-prefixed files).
- `.serena/` is local tooling state and is untracked; do not commit it.
