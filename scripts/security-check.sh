#!/usr/bin/env bash
# Security checks before production build: risky patterns and transport hygiene.

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"
FAIL=0

echo "Security check..."

# No eval or Function constructor in authored source
if find ./src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec grep -l -E 'eval\s*\(|new\s+Function\s*\(' {} \; 2>/dev/null | grep -q .; then
  echo "  FAIL: eval or new Function found in src/"
  FAIL=1
else
  echo "  OK: No eval/new Function in src/"
fi

# No dangerouslySetInnerHTML (XSS footgun unless strictly sanitized server-side)
if find ./src -type f -name '*.tsx' -exec grep -l 'dangerouslySetInnerHTML' {} \; 2>/dev/null | grep -q .; then
  echo "  FAIL: dangerouslySetInnerHTML found in src/"
  FAIL=1
else
  echo "  OK: No dangerouslySetInnerHTML in src/"
fi

# External links in static HTML/TSX: target=_blank must pair with rel for tab-nabbing mitigation
BAD=0
BAD_FILE=""
while IFS= read -r f; do
  if grep -q 'target="_blank"' "$f" && ! grep -Eq 'rel="[^"]*(noopener|noreferrer)' "$f"; then
    BAD=1
    BAD_FILE="$f"
    break
  fi
done < <(find . \( -name '*.html' -o -name '*.tsx' \) -not -path './dist/*' -not -path './node_modules/*' 2>/dev/null)
if [ $BAD -eq 1 ]; then
  echo "  FAIL: target=_blank without rel=noopener/noreferrer in $BAD_FILE"
  FAIL=1
else
  echo "  OK: External links in HTML/TSX use rel=noopener where needed"
fi

# No obvious secrets in repo
if find ./src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec grep -l -i -E 'password\s*=\s*["'"'"'][^"'"'"']+["'"'"']|api[_-]?key\s*=\s*["'"'"']|secret\s*=\s*["'"'"']' {} \; 2>/dev/null | grep -q .; then
  echo "  FAIL: Possible hardcoded secret found"
  FAIL=1
else
  echo "  OK: No obvious hardcoded secrets in src/"
fi

# No mixed-content asset URLs in the HTML entry (HTTPS site must not pull active HTTP content)
if [ -f index.html ]; then
  if grep -E '(href|src|content)=["'"'"']http://|url\s*\(\s*["'"'"']?http://' index.html 2>/dev/null | grep -v -E 'xmlns|xlink:href'; then
    echo "  FAIL: index.html contains http:// resource URL"
    FAIL=1
  else
    echo "  OK: index.html has no http:// resource URLs"
  fi
fi

if [ $FAIL -eq 1 ]; then
  echo "Security check failed."
  exit 1
fi
echo "Security check passed."
exit 0
