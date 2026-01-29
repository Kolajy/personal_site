# Setup script for TerminalCV site - run this to get the theme
# Run from project root: .\setup.ps1

$themePath = "themes/terminalcv"
if (Test-Path $themePath) {
    Write-Host "Theme already exists at $themePath"
    exit 0
}

New-Item -ItemType Directory -Path "themes" -Force | Out-Null
Write-Host "Cloning TerminalCV theme..."
git clone https://github.com/coolapso/hugo-theme-terminalcv.git $themePath
if ($LASTEXITCODE -eq 0) {
    Write-Host "Theme installed. Run: hugo server"
} else {
    Write-Host "Clone failed. You can download the theme from https://github.com/coolapso/hugo-theme-terminalcv and extract to themes/terminalcv"
}
