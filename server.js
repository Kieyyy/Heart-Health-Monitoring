const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/patient-history/:interval', (req, res) => {
  const interval = req.params.interval;
  const patientId = 'manuel-garcia';  // Static patient for now
  const folderPath = path.join(__dirname, 'patient-history', patientId, interval);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data folder' });
    }

    const data = files.map(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });

    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
