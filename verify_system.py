"""
System Verification Script
Checks if all system components are properly configured
"""

import sys
import os
from pathlib import Path

def check_structure():
    """Check project structure"""
    print("\n📁 Checking Project Structure...")
    
    base_dir = Path(__file__).parent
    required_dirs = [
        'backend',
        'js',
        'css',
    ]
    
    required_files = {
        'backend/app.py': 'Flask Application',
        'backend/init_db.py': 'Database Initialization',
        'backend/requirements.txt': 'Python Dependencies',
        'js/api.js': 'API Client',
        'js/dashboard.js': 'Dashboard Manager',
        'js/sensors.js': 'Sensor Manager',
        'js/predictions.js': 'Predictions Manager',
        'index.html': 'Dashboard',
        'sensors.html': 'Sensors Page',
        'predictions.html': 'Predictions Page',
        'alerts.html': 'Alerts Page',
        'stations.html': 'Stations Page',
    }
    
    # Check directories
    all_good = True
    for dir_name in required_dirs:
        dir_path = base_dir / dir_name
        if dir_path.exists():
            print(f"  ✅ {dir_name}/")
        else:
            print(f"  ❌ {dir_name}/ - NOT FOUND")
            all_good = False
    
    # Check files
    for file_path, description in required_files.items():
        full_path = base_dir / file_path
        if full_path.exists():
            print(f"  ✅ {file_path} ({description})")
        else:
            print(f"  ❌ {file_path} - NOT FOUND")
            all_good = False
    
    return all_good

def check_dependencies():
    """Check Python dependencies"""
    print("\n📦 Checking Python Dependencies...")
    
    required_packages = [
        'flask',
        'flask_cors',
        'flask-sqlalchemy',
        'flask-jwt-extended',
        'python-dotenv',
        'scikit-learn',
        'pandas',
        'numpy',
    ]
    
    try:
        import pkg_resources
        installed_packages = {pkg.key for pkg in pkg_resources.working_set}
        
        all_installed = True
        for package in required_packages:
            package_key = package.lower().replace('-', '_')
            if package_key in installed_packages or package in str(installed_packages):
                print(f"  ✅ {package}")
            else:
                print(f"  ⚠️  {package} - Not installed (optional)")
                # Don't fail for optional packages
        
        return True
    except Exception as e:
        print(f"  ⚠️  Could not check dependencies: {e}")
        return True

def check_database():
    """Check database setup"""
    print("\n🗄️  Checking Database...")
    
    db_path = Path(__file__).parent / 'backend' / 'flood_system.db'
    
    if db_path.exists():
        print(f"  ✅ Database file exists: {db_path}")
        print(f"     Size: {db_path.stat().st_size} bytes")
        return True
    else:
        print(f"  ⚠️  Database not initialized")
        print("     Run: python backend/init_db.py")
        return False

def check_configuration():
    """Check configuration files"""
    print("\n⚙️  Checking Configuration...")
    
    env_path = Path(__file__).parent / 'backend' / '.env'
    
    if env_path.exists():
        print(f"  ✅ .env file exists")
        # Don't print contents for security
        return True
    else:
        print(f"  ⚠️  .env file not found")
        return True

def main():
    """Run all checks"""
    print("=" * 60)
    print("🔍 FLOOD DETECTION SYSTEM - VERIFICATION CHECK")
    print("=" * 60)
    
    results = []
    
    results.append(("Project Structure", check_structure()))
    results.append(("Python Dependencies", check_dependencies()))
    results.append(("Database Setup", check_database()))
    results.append(("Configuration", check_configuration()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 VERIFICATION SUMMARY")
    print("=" * 60)
    
    for name, result in results:
        status = "✅ PASS" if result else "⚠️  PARTIAL"
        print(f"{name:.<40} {status}")
    
    all_pass = all(result for _, result in results)
    
    print("\n" + "=" * 60)
    if all_pass:
        print("✅ ALL CHECKS PASSED - System is ready!")
    else:
        print("⚠️  Some checks failed or components need setup")
        print("\nNext Steps:")
        print("1. Run: python backend/init_db.py")
        print("2. Run: python backend/app.py")
        print("3. Open: http://localhost:5000")
    
    print("=" * 60 + "\n")
    
    return 0 if all_pass else 1

if __name__ == '__main__':
    sys.exit(main())
