#!/usr/bin/env bash
# Deploy dist/ to an SMB share (e.g. /Volumes/data/websites/gorfmusic.com).
# SSL is not configured here: it is handled on the server by nginx. Ensure the server
# has an nginx vhost with HTTPS and HTTP→HTTPS redirect; see nginx/gorfmusic.com.conf.
# Set SMB_MOUNT (path to already-mounted share) or SMB_URL (e.g. //user@host/share).
# Optional: SMB_PASSWORD, SMB_MOUNT_POINT (where to mount if using SMB_URL).

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"
DIST=dist
MOUNTED=

if [ ! -d "$DIST" ]; then
  echo "Run 'make build' first (or 'make deploy' to build and deploy)."
  exit 1
fi

if [ -f .deploy-env ]; then
  set -a
  # shellcheck source=/dev/null
  source .deploy-env
  set +a
fi

if [ -n "$SMB_MOUNT" ]; then
  DEST="$SMB_MOUNT"
  echo "Deploying to mounted path: $DEST"
elif [ -n "$SMB_URL" ]; then
  MNT="${SMB_MOUNT_POINT:-/Volumes/gorfmusic-deploy}"
  if [ -d "$MNT" ] && mount | grep -q "$MNT"; then
    echo "Unmounting existing $MNT..."
    umount "$MNT" 2>/dev/null || true
  fi
  mkdir -p "$MNT"
  echo "Mounting $SMB_URL to $MNT..."
  if [ -n "$SMB_PASSWORD" ]; then
    echo "$SMB_PASSWORD" | mount_smbfs -o password=STDIN "$SMB_URL" "$MNT"
  else
    mount_smbfs "$SMB_URL" "$MNT"
  fi
  MOUNTED=1
  DEST="$MNT"
  echo "Deploying to $DEST"
else
  echo "Set SMB_MOUNT or SMB_URL (and optionally SMB_PASSWORD) in environment or .deploy-env"
  echo "  SMB_MOUNT=/Volumes/gorfmusic   # already-mounted share"
  echo "  SMB_URL=//user@host/share      # mount and deploy"
  exit 1
fi

rsync -av --delete "$DIST/" "$DEST/"
echo "Deploy complete."

if [ -n "$MOUNTED" ]; then
  echo "Unmounting $MNT..."
  umount "$MNT"
  rmdir "$MNT" 2>/dev/null || true
fi
