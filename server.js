// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get patient history based on the selected interval
app.get('/api/patient-history/:interval', (req, res) => {
  const interval = req.params.interval;
  const patientId = 'manuel-garcia';  // Static patient for now
  const folderPath = path.join(__dirname, 'patient-history', patientId, interval);

  // Read the files from the selected interval folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data folder' });
    }

    const data = files.map(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });

    res.json(data); // Return the data as JSON
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
