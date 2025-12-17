// ui/app.js

// 1. Pobieranie listy sensorów do selecta
async function loadSensors() {
    // Ponieważ UI jest serwowane z tego samego portu co Node-RED,
    // używamy ścieżek relatywnych.
    const response = await fetch('api/entities'); 
    const entities = await response.json();
    
    // ... tutaj twoja logika filtrowania sensorów i dodawania do HTML ...
}

// 2. Zapisywanie pracownika
async function saveEmployee(data) {
    await fetch('api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}