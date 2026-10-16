#!/usr/bin/env bash
# Checks the published folders (site/ and demos/) for two common mistakes:
#   1. Absolute paths (href="/...", src="/...", url(/...)) — they break on a project URL.
#   2. Scripts, stylesheets or fonts loaded from another website (CDNs, Google Fonts, trackers).
# Usage: ./scripts/check-site.sh   (exits with an error if anything is found)

set -u
cd "$(dirname "$0")/.."

folders=()
for f in site demos templates; do [ -d "$f" ] && folders+=("$f"); done

problems=0

report() {
  local title="$1" matches="$2"
  if [ -n "$matches" ]; then
    echo "✗ $title"
    echo "$matches" | sed 's/^/    /'
    echo
    problems=1
  fi
}

abs_paths=$(grep -rnE --include='*.html' --include='*.css' \
  '(href|src|action)=["'"'"']/|url\(["'"'"']?/' "${folders[@]}" || true)
report "Absolute paths found (use relative paths like css/style.css instead):" "$abs_paths"

external=$(grep -rnEi --include='*.html' --include='*.css' --include='*.js' \
  '<script[^>]+src=["'"'"']?(https?:)?//|<link[^>]+href=["'"'"']?(https?:)?//[^"'"'"' >]*\.(css|woff2?|ttf|otf)|<link[^>]+rel=["'"'"']?stylesheet[^>]+href=["'"'"']?(https?:)?//|@import[^;]*(https?:)?//|url\(["'"'"']?(https?:)?//|fonts\.googleapis|fonts\.gstatic|googletagmanager|google-analytics' \
  "${folders[@]}" || true)
report "External scripts, stylesheets or fonts found (store them in the repo instead):" "$external"

if [ "$problems" -eq 0 ]; then
  echo "✓ All checks passed (${folders[*]})."
fi
exit "$problems"
