@echo off
REM Start script for Windows (cmd)
SETLOCAL

REM Activate virtual environment (batch activation)
call "%~dp0\.venv\Scripts\activate.bat"

REM Initialize database
echo Initializing database...
python "%~dp0backend\init_db.py"

REM Start backend in a new window
echo Starting backend in a new window...
start "FloodBackend" cmd /k "python "%~dp0backend\app.py""

REM Give backend a moment to start, then open browser
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:5000/"

ENDLOCAL
