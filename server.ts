import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Proxy to partner's backend - Defaulting to provided public URL
  const PARTNER_BACKEND_URL = process.env.BACKEND_URL || "https://kkgq3q14-8000.inc1.devtunnels.ms";

  // Auth Proxies
  app.post("/api/auth/login", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Login proxy error:", error);
      res.status(500).json({ error: "Failed to connect to backend" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Register proxy error:", error);
      res.status(500).json({ error: "Failed to connect to backend" });
    }
  });

  // Data Fetching Proxies
  app.get("/api/requests", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/requests`);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Requests fetch proxy error:", error);
      res.status(500).json({ error: "Failed to fetch requests from backend" });
    }
  });

  app.get("/api/students", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/students`);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Students fetch proxy error:", error);
      res.status(500).json({ error: "Failed to fetch students from backend" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/categories`);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Categories fetch proxy error:", error);
      res.status(500).json({ error: "Failed to fetch categories from backend" });
    }
  });

  app.get("/api/vendors", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/vendors`);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Vendors fetch proxy error:", error);
      res.status(500).json({ error: "Failed to fetch vendors from backend" });
    }
  });

  app.post("/api/updates", async (req, res) => {
    try {
      const response = await fetch(`${PARTNER_BACKEND_URL}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Push update proxy error:", error);
      res.status(500).json({ error: "Failed to connect to backend" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
