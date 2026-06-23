import subprocess
import sys
import os
import time

def run_servers():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    print("==================================================")
    print("   SUKHWAL AUTO SERVICES - SERVER DEVELOPMENT RUNNER   ")
    print("==================================================")
    
    # 1. Start backend FastAPI
    print("\n[BACKEND] Starting FastAPI Server (Uvicorn) on http://localhost:8000...")
    # We run 'python -m uvicorn app.main:app' to ensure uvicorn runs within the current virtualenv/environment
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=backend_dir
    )
    
    # Give the backend a brief moment to start
    time.sleep(1.5)
    
    # 2. Start frontend Vite
    print("[FRONTEND] Starting Vite React Server on http://localhost:5173...")
    # On Windows, npm must be invoked as 'npm.cmd' via subprocess
    npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )
    
    print("\n==================================================")
    print("  SUCCESS: Both backend and frontend are running!")
    print("  - Backend API Docs: http://localhost:8000/docs")
    print("  - Frontend App:     http://localhost:5173")
    print("  Press Ctrl+C in this terminal to shut down both servers.")
    print("==================================================\n")
    
    try:
        while True:
            # Keep running and check if either process crashed
            if backend_proc.poll() is not None:
                print("\n[ERROR] Backend process terminated unexpectedly.")
                break
            if frontend_proc.poll() is not None:
                print("\n[ERROR] Frontend process terminated unexpectedly.")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[INFO] Shutdown request received (Ctrl+C)...")
    finally:
        # Clean shutdown of both processes
        print("[INFO] Terminating backend server...")
        backend_proc.terminate()
        print("[INFO] Terminating frontend server...")
        frontend_proc.terminate()
        
        # Wait for processes to exit
        backend_proc.wait()
        frontend_proc.wait()
        print("[INFO] Both servers stopped. Clean shutdown completed.")

if __name__ == "__main__":
    run_servers()
