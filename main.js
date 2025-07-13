document.getElementById("trackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("trackInput").value.trim();
  const type = document.getElementById("trackType").value;
  const resultBox = document.getElementById("resultBox");
  const mapFrame = document.getElementById("mapFrame");

  resultBox.innerHTML = "⏳ Loading...";
  mapFrame.style.display = "none";

  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ container: input })
    });

    const data = await res.json();

    if (data.error) {
      resultBox.innerHTML = `<p style="color:red;">⚠️ ${data.error}</p>`;
    } else {
      resultBox.innerHTML = `
        <h3>📦 ${data.containerNumber}</h3>
        <p><strong>Status:</strong> ${data.status || "N/A"}</p>
        <p><strong>ETA:</strong> ${data.eta || "N/A"}</p>
        <p><strong>Last Location:</strong> ${data.lastLocation || "N/A"}</p>
      `;
    }

    mapFrame.src = `https://app.shipsgo.com/widget/tracking?container=${input || 'TGHU1234560'}`;
    mapFrame.style.display = "block";
  } catch (err) {
    resultBox.innerHTML = "<p style='color:red;'>❌ Server Error</p>";
    mapFrame.src = "https://app.shipsgo.com/widget/tracking?container=TGHU1234560";
    mapFrame.style.display = "block";
  }
});
