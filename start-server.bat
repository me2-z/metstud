@echo off
title MetStud Launcher
cd /d "%~dp0"

echo.
echo 🚀 Starting MetStud Server...
echo.

:: Start server in background (minimized)
start "MetStud Server" /min cmd /c "cd backend && npm start"

:: Wait for server to start (6 seconds)
timeout /t 6 /nobreak >nul

echo.
echo 🌐 Opening MetStud in your browser...
start "" "http://localhost:3000"

echo.
echo ✅ Done! Server is running (minimized window).
echo    Your website is now open in the browser.
echo.
echo 💡 To stop: Close the minimized "MetStud Server" window.
pause