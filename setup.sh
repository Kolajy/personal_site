#!/usr/bin/env bash
# Setup script for TerminalCV site - run from project root: ./setup.sh
# Gets the TerminalCV theme so you can run hugo server locally

set -e

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$project_root"

theme_path="themes/terminalcv"
if [ -d "$theme_path" ]; then
    echo "Theme already exists at $theme_path"
    echo "Run: hugo server"
    exit 0
fi

mkdir -p themes
echo "Cloning TerminalCV theme..."
if git clone --depth 1 https://github.com/coolapso/hugo-theme-terminalcv.git "$theme_path"; then
    echo "Theme installed at $theme_path"
    echo "Run: hugo server"
else
    echo "Clone failed."
    echo "Download the theme from https://github.com/coolapso/hugo-theme-terminalcv and extract to themes/terminalcv"
    exit 1
fi
