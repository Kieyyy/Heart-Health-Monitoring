
const fs = require('fs');
const path = require('path');

function getPatientData(patientId, interval, date) {
  const folderPath = path.join(__dirname, 'patient-history', patientId, interval);
  const files = fs.readdirSync(folderPath);
  
  return files.filter(file => file.includes(date)).map(file => {
    const data = fs.readFileSync(path.join(folderPath, file), 'utf-8');
    return JSON.parse(data);
  });
}

const patientRecords = getPatientData('manuel-garcia', 'history-1hr', '2024-11-24');
console.log(patientRecords);
