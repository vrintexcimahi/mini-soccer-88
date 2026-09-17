@echo off
chcp 65001 >nul
title Mini Soccer 88 - Isolated Developer Browser Launcher

echo =====================================================================
echo   MINI SOCCER 88 ALPHA SPORT - DEVELOPER TESTING BROWSER
echo   Mode: Profil Browser Terisolasi (Decoupled dari Sesi Utama)
echo   Penyimpanan Profil: %~dp0.dev_browser_profile
echo =====================================================================
echo.

set "PROFILE_DIR=%~dp0.dev_browser_profile"
set "TARGET_URL=http://localhost:8888/"
set "EXTRA_FLAGS="

:: Check if first argument is a URL
if not "%~1"=="" (
    if "%~1"=="--mobile" (
        set "EXTRA_FLAGS=--window-size=430,932"
        if not "%~2"=="" set "TARGET_URL=%~2"
    ) else if "%~1"=="-m" (
        set "EXTRA_FLAGS=--window-size=430,932"
        if not "%~2"=="" set "TARGET_URL=%~2"
    ) else (
        set "TARGET_URL=%~1"
        if "%~2"=="--mobile" set "EXTRA_FLAGS=--window-size=430,932"
        if "%~2"=="-m" set "EXTRA_FLAGS=--window-size=430,932"
    )
)

:: Ensure profile directory exists
if not exist "%PROFILE_DIR%" (
    echo [INFO] Membuat direktori profil baru di: %PROFILE_DIR%
    mkdir "%PROFILE_DIR%"
)

:: Locate Chrome executable
set "BROWSER_EXE="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXE=%LocalAppData%\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) else if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXE=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

if "%BROWSER_EXE%"=="" (
    echo [ERROR] Google Chrome atau Microsoft Edge tidak ditemukan di path standar!
    echo Silakan buka browser Anda secara manual dengan parameter:
    echo chrome.exe --user-data-dir="%PROFILE_DIR%" "%TARGET_URL%"
    pause
    exit /b 1
)

echo [OK] Browser Ditemukan: %BROWSER_EXE%
echo [OK] Membuka URL: %TARGET_URL%
echo [OK] User Data Dir: %PROFILE_DIR%
if not "%EXTRA_FLAGS%"=="" echo [OK] Flag Tambahan: %EXTRA_FLAGS%
echo.
echo Menjalankan browser terisolasi... Sesi login Superadmin Anda di browser utama tetap AMAN.
echo.

start "" "%BROWSER_EXE%" --user-data-dir="%PROFILE_DIR%" --no-first-run --no-default-browser-check --disable-features=Translate %EXTRA_FLAGS% "%TARGET_URL%"

exit /b 0
