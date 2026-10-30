#!/bin/bash
# Ежедневная синхронизация объектов myhome -> oksana-batumi.com (запускается launchd)
export PATH="/Users/mac/.npm-global/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
export LC_CTYPE=UTF-8
cd "/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/DEMO/Estate/oksana-batumi" || exit 1
echo "=== $(date '+%Y-%m-%d %H:%M') ==="
node scripts/myhome/sync.mjs
