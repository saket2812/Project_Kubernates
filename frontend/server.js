const express = require("express");
const fetch = require('node-fetch'); // Make sure to npm install node-fetch
const app = express();
const PORT = 3000;

// Improved backend URL handling
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Add middleware to handle JSON
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    console.log(`Attempting to connect to backend at: ${BACKEND_URL}`);
    
    const response = await fetch(`${BACKEND_URL}/api/get`, {
      headers: { 'Accept': 'application/json' },
      timeout: 3000
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    const myEnvVar = process.env.MY_VAR || "Default value";

    res.send(`
      <h1>Data from Backend</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <h2>Environment Variable:</h2>
      <p>BACKEND_URL: ${BACKEND_URL}</p>
      <p>MY_VAR: ${myEnvVar}</p>
    `);
  } catch (e) {
    console.error('Full error:', e);
    res.status(500).send(`
      <h1>Connection Error</h1>
      <p>Failed to connect to backend at: ${BACKEND_URL}</p>
      <p>Error details: ${e.message}</p>
      <h2>Troubleshooting:</h2>
      <ul>
        <li>Verify backend service exists: <code>kubectl get svc</code></li>
        <li>Check DNS resolution in pod: <code>kubectl exec -it [POD] -- nslookup backend-service</code></li>
        <li>Test connection from pod: <code>kubectl exec -it [POD] -- curl http://backend-service:5000</code></li>
      </ul>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
  console.log(`Using backend at: ${BACKEND_URL}`);
});