@echo off
title ElectroLearn 3D - BEEE Learning Platform
color 0E

echo ========================================================
echo   ElectroLearn 3D - Basic Electrical and Electronics
echo ========================================================
echo.
echo Starting ElectroLearn 3D...
echo.

if exist "ElectroLearn-3D.exe" (
    start "" "ElectroLearn-3D.exe"
    exit /b
)

if not exist "dist\index.html" (
    echo Building production package...
    call npm run build
)

echo Starting local preview server...
start "" http://127.0.0.1:5173/
call npm run preview -- --port 5173 --host 127.0.0.1
pause
