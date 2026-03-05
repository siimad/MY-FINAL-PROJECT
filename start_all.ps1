# PowerShell start script: activates venv, initializes DB, starts backend, opens browser
Write-Host "Activating virtual environment..."
& "${PSScriptRoot}\.venv\Scripts\Activate.ps1"

Write-Host "Initializing database..."
python "${PSScriptRoot}\backend\init_db.py"

Write-Host "Starting backend in a new PowerShell window..."
Start-Process powershell -ArgumentList '-NoExit','-Command','python "${PSScriptRoot}\\backend\\app.py"'

Start-Sleep -Seconds 2
Write-Host "Opening frontend in default browser..."
Start-Process "http://127.0.0.1:5000/"
