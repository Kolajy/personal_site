#!/usr/bin/env bash
# Minimal build script for Vercel: installs Hugo and builds the site.
# For full Hugo+Vercel setup see https://gohugo.io/host-and-deploy/host-on-vercel/

set -euo pipefail
HUGO_VERSION=0.139.4

echo "Installing Hugo ${HUGO_VERSION}..."
curl -sL -o hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
mkdir -p "${HOME}/.local/hugo"
tar -C "${HOME}/.local/hugo" -xzf hugo.tar.gz
rm hugo.tar.gz
export PATH="${HOME}/.local/hugo:${PATH}"

# Ensure theme is present (submodule or clone)
if [ ! -d "themes/terminalcv" ]; then
  echo "Fetching TerminalCV theme..."
  git clone --depth 1 https://github.com/coolapso/hugo-theme-terminalcv.git themes/terminalcv
fi

echo "Building site..."
hugo --gc --minify
