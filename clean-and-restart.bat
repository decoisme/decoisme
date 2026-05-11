@echo off
echo ========================================
echo Cleaning and Restarting Development Server
echo ========================================
echo.

echo [1/4] Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] Cleaning .next folder...
if exist .next (
    rmdir /s /q .next
    echo .next folder deleted
) else (
    echo .next folder not found
)

echo [3/4] Cleaning node_modules/.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo Cache deleted
)

echo [4/4] Starting development server...
echo.
echo ========================================
echo Server starting... Press Ctrl+C to stop
echo ========================================
echo.

npm run dev
