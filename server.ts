import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Proxy to partner's backend - Defaulting to provided public URL
  let PARTNER_BACKEND_URL = process.env.BACKEND_URL;
  if (!PARTNER_BACKEND_URL || !PARTNER_BACKEND_URL.trim().startsWith("http")) {
    console.warn(`WARNING: Invalid or missing BACKEND_URL ("${PARTNER_BACKEND_URL}"). Falling back to default URL: https://kkgq3q14-8000.inc1.devtunnels.ms`);
    PARTNER_BACKEND_URL = "https://kkgq3q14-8000.inc1.devtunnels.ms";
  }
  // Trim trailing slash to prevent double slash paths (e.g., baseURL//endpoint)
  PARTNER_BACKEND_URL = PARTNER_BACKEND_URL.trim().replace(/\/+$/, "");
  console.log(`Backend proxy configured to route requests to: ${PARTNER_BACKEND_URL}`);

  // Helper for safe proxying via axios to work on ANY Node version (resolving 'fetch is not defined' locally)
  async function proxyFetch(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any,
    res: express.Response
  ) {
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true, // Let all response codes pass through to the frontend
      });
      res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(`Proxy error for ${url}:`, error.message);
      res.status(502).json({
        error: "Failed to connect to partner's backend.",
        message: error.message,
        details: "Make sure your partner's server is running and the tunnel is live.",
      });
    }
  }

  // Specialized proxy helper for GET collection endpoints, returning an empty array [] if offline or missing (404/502)
  // This allows the client application to run flawlessly using built-in high-quality mocks when offline/not-yet-implemented.
  async function proxyDataFetch(url: string, res: express.Response) {
    try {
      const response = await axios({
        url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000, // Keep a responsive timeout
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 404) {
        console.warn(`Partner endpoint not configured or returned 404: ${url}. Delivering empty fallback array [] to client.`);
      } else {
        console.warn(`Partner endpoint unreachable: ${url} (${error.message}). Delivering empty fallback array [] to client.`);
      }
      res.status(200).json([]);
    }
  }

  // Auth Proxies
  app.post("/api/auth/login", (req, res) => {
    proxyFetch(`${PARTNER_BACKEND_URL}/auth/login`, "POST", req.body, res);
  });

  app.post("/api/auth/register", (req, res) => {
    proxyFetch(`${PARTNER_BACKEND_URL}/auth/register`, "POST", req.body, res);
  });

  // Data Fetching Proxies
  app.get("/api/requests", (req, res) => {
    proxyDataFetch(`${PARTNER_BACKEND_URL}/requests`, res);
  });

  app.get("/api/students", (req, res) => {
    proxyDataFetch(`${PARTNER_BACKEND_URL}/students`, res);
  });

  app.get("/api/categories", (req, res) => {
    proxyDataFetch(`${PARTNER_BACKEND_URL}/categories`, res);
  });

  app.get("/api/vendors", (req, res) => {
    proxyDataFetch(`${PARTNER_BACKEND_URL}/vendors`, res);
  });

  app.post("/api/updates", (req, res) => {
    proxyFetch(`${PARTNER_BACKEND_URL}/updates`, "POST", req.body, res);
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
