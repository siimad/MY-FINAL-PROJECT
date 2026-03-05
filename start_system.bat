@echo off
REM Flood Detection System - Startup Script for Windows
REM This script starts the Flask backend and opens the web interface

setlocal enabledelayedexpansion

echo.
echo ================================================================
echo   FLOOD DETECTION SYSTEM - STARTUP
echo ================================================================
echo.

REM Check if we're in the right directory
if not exist "backend\app.py" (
    echo ERROR: app.py not found in backend directory
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist ".venv\Scripts\activate.bat" (
    echo.
    echo Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install/update dependencies
echo.
echo Installing dependencies...
pip install -q -r backend\requirements.txt

REM Initialize database if needed
if not exist "backend\flood_system.db" (
    echo.
    echo Initializing database...
    cd backend
    python init_db.py
    cd ..
)

REM Start the Flask server
echo.
echo ================================================================
echo   Starting Flask Server...
echo ================================================================
echo.
echo Access the application at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

cd backend
python app.py

pause
