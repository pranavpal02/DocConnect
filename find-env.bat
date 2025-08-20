@echo off
echo 🔍 Finding .env file...
echo.

echo Searching in current directory...
if exist ".env" (
    echo ✅ Found .env in current directory!
    echo File: %CD%\.env
) else (
    echo ❌ No .env in current directory
)

echo.
echo Searching in parent directory...
cd ..
if exist ".env" (
    echo ✅ Found .env in parent directory!
    echo File: %CD%\.env
) else (
    echo ❌ No .env in parent directory
)

echo.
echo Searching for any .env files...
dir /s /a .env 2>nul
if %errorlevel% neq 0 (
    echo No .env files found in subdirectories
)

echo.
echo 💡 Tips:
echo - .env files are often hidden
echo - Check if "Hidden items" is checked in File Explorer
echo - Look in both backend and root project folders
echo.

pause 