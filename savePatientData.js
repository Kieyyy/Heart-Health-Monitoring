
const fs = require('fs');
const path = require('path');


function savePatientData(patientId, interval, data) {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp.split('T')[0]}_${timestamp.split('T')[1].split('.')[0]}.json`;
  const folderPath = path.join(__dirname, 'patient-history', patientId, interval);
  const filePath = path.join(folderPath, fileName);

  const dataToSave = {
    timestamp: timestamp,
    heartRate: data.heartRate,
    temperature: data.temperature,
    oxygenSaturation: data.oxygenSaturation,
    bloodPressure: data.bloodPressure,
    notes: data.notes || 'No notes'
  };

  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
}


const patientData = {
  heartRate: 85,
  temperature: 36.7,
  oxygenSaturation: 98,
  bloodPressure: "120/70",
  notes: "Normal readings"
};

savePatientData('jm-galvero', 'history-1hr', patientData); 
