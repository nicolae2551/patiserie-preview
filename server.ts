import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const BREVO_API_KEY = process.env.patiseriepreview;

    if (!BREVO_API_KEY) {
      console.error("patiseriepreview secret is not set");
      return res.status(500).json({ error: "Configurație incompletă: Te rugăm să verifici dacă secretul 'patiseriepreview' este configurat corect." });
    }

    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          updateEnabled: true,
          // You can add listIds here if you have a specific list
          // listIds: [2] 
        }),
      });

      if (response.ok) {
        return res.json({ message: "Mulțumim pentru abonare!" });
      } else {
        const errorData = await response.json();
        console.error("Brevo API error:", errorData);
        return res.status(response.status).json({ error: errorData.message || "Failed to subscribe" });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
