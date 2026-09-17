# =====================================================================
#   MINI SOCCER 88 ALPHA SPORT - DEVELOPER TESTING BROWSER LAUNCHER
#   Mode: Profil Browser Terisolasi (Decoupled dari Sesi Utama)
#   Penyimpanan Profil: <repo>\.dev_browser_profile
# =====================================================================

param (
    [string]$Url = "http://localhost:8888/",
    [switch]$Mobile,
    [switch]$ResetProfile
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$profileDir = Join-Path $scriptDir ".dev_browser_profile"

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "  MINI SOCCER 88 ALPHA SPORT - ISOLATED TESTING BROWSER" -ForegroundColor Yellow
Write-Host "  Profil: $profileDir" -ForegroundColor White
Write-Host "=====================================================================" -ForegroundColor Cyan

if ($ResetProfile) {
    if (Test-Path $profileDir) {
        Write-Host "[INFO] Menghapus data sesi lama di .dev_browser_profile..." -ForegroundColor Yellow
        try {
            Remove-Item -Recurse -Force $profileDir -ErrorAction Stop
            Write-Host "[OK] Direktori profil berhasil direset dan bersih!" -ForegroundColor Green
        } catch {
            Write-Warning "Gagal menghapus profil secara total (mungkin ada tab browser yang masih terbuka). Silakan tutup jendela browser terisolasi terlebih dahulu."
        }
    } else {
        Write-Host "[INFO] Direktori profil belum ada, siap dibuat baru." -ForegroundColor Gray
    }
}

if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    Write-Host "[OK] Direktori profil baru dibuat: $profileDir" -ForegroundColor Green
}

# Locate Browser
$browserExe = $null
$candidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

foreach ($c in $candidates) {
    if (Test-Path $c) {
        $browserExe = $c
        break
    }
}

if (-not $browserExe) {
    Write-Error "Browser Google Chrome atau Microsoft Edge tidak ditemukan di path standar!"
    return
}

$browserArgs = @(
    "--user-data-dir=`"$profileDir`"",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-features=Translate"
)

if ($Mobile) {
    $browserArgs += "--window-size=430,932"
    Write-Host "[MODE] Tampilan Mobile Mandiri (430 × 932 px)" -ForegroundColor Magenta
} else {
    Write-Host "[MODE] Tampilan Desktop Standar" -ForegroundColor Magenta
}

$browserArgs += "`"$Url`""

Write-Host "[BROWSER] $browserExe" -ForegroundColor Green
Write-Host "[TARGET]  $Url" -ForegroundColor Green
Write-Host "`nMenjalankan browser... Sesi login Superadmin Anda aman dari interferensi!`n" -ForegroundColor Yellow

Start-Process -FilePath $browserExe -ArgumentList ($browserArgs -join " ")
