// createFolders.js
const fs = require('fs');
const path = require('path');

// Function to create patient history folders for different intervals
function createPatientHistoryFolders(patientId) {
  const baseDir = path.join(__dirname, 'patient-history', patientId);

  const timeIntervals = ['history-1hr', 'history-5hr', 'history-1day', 'history-1week'];

  timeIntervals.forEach(interval => {
    const dirPath = path.join(baseDir, interval);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// Example usage for patient "manuel-garcia"
createPatientHistoryFolders('manuel-garcia');
