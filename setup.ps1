# Setup script for TerminalCV site - run from project root: .\setup.ps1
# Gets the TerminalCV theme so you can run hugo server locally

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$themePath = Join-Path "themes" "terminalcv"
if (Test-Path $themePath) {
    Write-Host "Theme already exists at $themePath"
    Write-Host "Run: hugo server"
    exit 0
}

if (-not (Test-Path "themes")) {
    New-Item -ItemType Directory -Path "themes" -Force | Out-Null
}

Write-Host "Cloning TerminalCV theme..."
try {
    git clone --depth 1 https://github.com/coolapso/hugo-theme-terminalcv.git $themePath
    if ($LASTEXITCODE -ne 0) { throw "git clone failed with exit code $LASTEXITCODE" }
    Write-Host "Theme installed at $themePath"
    Write-Host "Run: hugo server"
} catch {
    Write-Host "Clone failed: $_"
    Write-Host "Download the theme from https://github.com/coolapso/hugo-theme-terminalcv and extract to themes/terminalcv"
    exit 1
}
