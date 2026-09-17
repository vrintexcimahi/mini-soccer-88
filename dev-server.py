#!/usr/bin/env python3
"""
Mini Soccer 88 Alpha Sport - Enhanced Dev Server & Isolated Profile Manager
Serves static project files and provides local API endpoints to launch
isolated Chrome/Edge browser instances with dedicated repository profile.
"""

import http.server
import json
import os
import shutil
import socketserver
import subprocess
import sys
import urllib.parse
from pathlib import Path

PORT = 8888
REPO_ROOT = Path(__file__).resolve().parent
PROFILE_DIR = REPO_ROOT / ".dev_browser_profile"


def find_browser():
    candidates = [
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
        Path(os.environ.get("LOCALAPPDATA", "")) / "Google" / "Chrome" / "Application" / "chrome.exe",
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    ]
    for c in candidates:
        if c.is_file():
            return str(c)
    return None


def get_dir_size(path: Path):
    if not path.is_dir():
        return 0
    total = 0
    try:
        for entry in path.rglob("*"):
            if entry.is_file():
                try:
                    total += entry.stat().st_size
                except OSError:
                    pass
    except Exception:
        pass
    return total


def format_size(bytes_val):
    if bytes_val < 1024:
        return f"{bytes_val} B"
    elif bytes_val < 1024 * 1024:
        return f"{bytes_val / 1024:.1f} KB"
    elif bytes_val < 1024 * 1024 * 1024:
        return f"{bytes_val / (1024 * 1024):.1f} MB"
    return f"{bytes_val / (1024 * 1024 * 1024):.2f} GB"


class DevServerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(REPO_ROOT), **kwargs)

    def end_headers(self):
        # Allow cross-origin inside dev environment & ensure freshly loaded scripts
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        if self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def send_json_response(self, data, status_code=200):
        body = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Status endpoint
        if path == "/api/dev-profile/status":
            exists = PROFILE_DIR.is_dir()
            size_bytes = get_dir_size(PROFILE_DIR) if exists else 0
            browser_path = find_browser()
            return self.send_json_response({
                "ok": True,
                "profilePath": str(PROFILE_DIR),
                "profileExists": exists,
                "profileSize": format_size(size_bytes),
                "profileSizeBytes": size_bytes,
                "browserPath": browser_path,
                "browserFound": bool(browser_path),
                "port": PORT
            })

        # Launch browser endpoint (GET or POST)
        if path == "/api/dev-profile/launch":
            return self.handle_launch(query)

        # Fallback to normal static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length) if content_length > 0 else b""
        data = {}
        if post_body:
            try:
                data = json.loads(post_body.decode("utf-8"))
            except Exception:
                pass

        if path == "/api/dev-profile/launch":
            query = {k: [v] for k, v in data.items()}
            return self.handle_launch(query)

        if path == "/api/dev-profile/reset":
            return self.handle_reset()

        return self.send_json_response({"ok": False, "error": "Not Found"}, status_code=404)

    def handle_launch(self, query):
        browser_exe = find_browser()
        if not browser_exe:
            return self.send_json_response({
                "ok": False,
                "error": "Browser Google Chrome atau Microsoft Edge tidak ditemukan di path sistem."
            }, status_code=404)

        target_url = query.get("url", [f"http://localhost:{PORT}/"])[0]
        mode = query.get("mode", ["desktop"])[0]

        # Make sure relative urls get turned into full localhost urls
        if target_url.startswith("/"):
            target_url = f"http://localhost:{PORT}{target_url}"
        elif not target_url.startswith("http"):
            target_url = f"http://localhost:{PORT}/{target_url}"

        PROFILE_DIR.mkdir(parents=True, exist_ok=True)

        cmd = [
            browser_exe,
            f"--user-data-dir={str(PROFILE_DIR)}",
            "--no-first-run",
            "--no-default-browser-check",
            "--disable-features=Translate"
        ]

        if mode == "mobile":
            cmd.append("--window-size=430,932")

        cmd.append(target_url)

        try:
            creationflags = 0
            if sys.platform == "win32":
                creationflags = subprocess.DETACHED_PROCESS

            proc = subprocess.Popen(
                cmd,
                creationflags=creationflags,
                close_fds=(sys.platform != "win32")
            )
            return self.send_json_response({
                "ok": True,
                "message": "Browser profil terpisah berhasil dibuka!",
                "pid": proc.pid,
                "mode": mode,
                "targetUrl": target_url,
                "profilePath": str(PROFILE_DIR)
            })
        except Exception as e:
            return self.send_json_response({
                "ok": False,
                "error": f"Gagal menjalankan browser: {str(e)}"
            }, status_code=500)

    def handle_reset(self):
        if not PROFILE_DIR.is_dir():
            return self.send_json_response({
                "ok": True,
                "message": "Direktori profil masih bersih dan belum dibuat."
            })

        try:
            shutil.rmtree(str(PROFILE_DIR), ignore_errors=False)
            PROFILE_DIR.mkdir(parents=True, exist_ok=True)
            return self.send_json_response({
                "ok": True,
                "message": "Seluruh sesi, cookies, dan data profil pengujian berhasil dibersihkan!"
            })
        except Exception as e:
            # If some files are locked because the browser is currently running
            partial_cleaned = 0
            for item in PROFILE_DIR.iterdir():
                try:
                    if item.is_dir():
                        shutil.rmtree(str(item), ignore_errors=True)
                    else:
                        item.unlink()
                    partial_cleaned += 1
                except Exception:
                    pass
            return self.send_json_response({
                "ok": True,
                "message": "Data profil pengujian dibersihkan sebagian (tutup jendela browser terisolasi untuk pembersihan 100%).",
                "details": str(e)
            })


def run_server(port=PORT):
    # Set custom extensions map
    DevServerHandler.extensions_map.update({
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".json": "application/json",
        ".css": "text/css",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".webmanifest": "application/manifest+json"
    })

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), DevServerHandler) as httpd:
        print(f"Mini Soccer 88 Dev Server running at http://localhost:{port}/")
        print(f"Isolated Browser Profile: {PROFILE_DIR}")
        print("Endpoints active: /api/dev-profile/status, /api/dev-profile/launch, /api/dev-profile/reset")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")


if __name__ == "__main__":
    port_to_use = PORT
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port_to_use = int(sys.argv[1])
    run_server(port_to_use)
