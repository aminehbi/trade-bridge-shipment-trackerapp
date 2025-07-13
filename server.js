const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

const API_KEY = process.env.API_KEY || "YOUR_API_KEY";
const FALLBACK_CONTAINER = "TGHU1234560";

app.post("/api/track", async (req, res) => {
  const { container } = req.body;
  const containerNumber = container?.trim() || FALLBACK_CONTAINER;

  try {
    const response = await fetch(`https://api.shipsgo.com/v1/tracking?container_number=${containerNumber}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!data || !data.containerNumber) {
      return res.status(404).json({ error: "No data found.", fallback: FALLBACK_CONTAINER });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data from ShipsGo." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
