// --- KONFIGURACJA ---
const API_BASE = ''; // Relatywna ścieżka, Node-RED serwuje pod rootem

// --- STANY ---
let employees = [];
let availableSensors = [];
let monitorInterval = null;

// --- DOM ELEMENTS ---
const dashboard = document.getElementById('dashboard');
const modal = document.getElementById('modal');
const sensorsList = document.getElementById('sensors-list');

// --- START APP ---
document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    startMonitoring();
    
    // Obsługa Modala
    document.getElementById('add-btn').addEventListener('click', openAddModal);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('save-btn').addEventListener('click', saveEmployee);
});

// --- API CALLS ---

async function loadEmployees() {
    try {
        const res = await fetch(`${API_BASE}/api/employees`);
        employees = await res.json();
        renderDashboard(); // Renderujemy pusty szkielet lub stare dane
    } catch (e) {
        console.error("Błąd ładowania pracowników:", e);
    }
}

async function loadSensors() {
    sensorsList.innerHTML = "Ładowanie...";
    try {
        const res = await fetch(`${API_BASE}/api/sensors`); // Node-RED musi mieć ten endpoint
        availableSensors = await res.json();
        renderSensorsList();
    } catch (e) {
        sensorsList.innerHTML = "Błąd pobierania sensorów.";
    }
}

// --- MONITORING (Real-time updates) ---
function startMonitoring() {
    // Pierwsze pobranie od razu
    fetchMonitorData();
    // Potem co 2 sekundy
    monitorInterval = setInterval(fetchMonitorData, 2000);
}

async function fetchMonitorData() {
    try {
        const res = await fetch(`${API_BASE}/api/monitor`);
        const data = await res.json();
        updateDashboard(data);
    } catch (e) {
        console.warn("Błąd monitoringu:", e);
    }
}

// --- RENDEROWANIE ---

function renderDashboard() {
    dashboard.innerHTML = '';
    
    if (employees.length === 0) {
        dashboard.innerHTML = '<div style="padding:20px; color:#aaa">Brak pracowników. Dodaj kogoś!</div>';
        return;
    }

    employees.forEach((emp, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `emp-card-${emp.name}`; // ID do łatwej aktualizacji
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-name">${emp.name}</div>
                <button class="delete-btn" onclick="deleteEmployee(${index})">
                    <span class="mdi mdi-delete"></span>
                </button>
            </div>
            
            <div class="status-badge status-absent" id="status-badge-${emp.name}">
                <span class="mdi mdi-account-off" id="status-icon-${emp.name}"></span>
                <span id="status-text-${emp.name}">Nieznany</span>
            </div>
            
            <div class="stats-row">
                <div>
                    <span class="big-time" id="time-${emp.name}">0</span>
                    <span class="unit">MINUT DZIŚ</span>
                </div>
            </div>

            <div class="sensors-grid" id="sensors-${emp.name}">
                </div>
        `;
        dashboard.appendChild(card);
    });
}

function updateDashboard(monitorData) {
    monitorData.forEach(data => {
        // Status
        const badge = document.getElementById(`status-badge-${data.name}`);
        const icon = document.getElementById(`status-icon-${data.name}`);
        const text = document.getElementById(`status-text-${data.name}`);
        const time = document.getElementById(`time-${data.name}`);
        const sensorGrid = document.getElementById(`sensors-${data.name}`);

        if (!badge) return; // Karta mogła zostać usunięta

        // Aktualizacja wyglądu statusu
        if (data.status === 'Pracuje') {
            badge.className = 'status-badge status-working';
            icon.className = 'mdi mdi-laptop';
        } else {
            badge.className = 'status-badge status-absent';
            icon.className = 'mdi mdi-sleep';
        }
        text.innerText = data.status;
        time.innerText = Math.round(data.work_time || 0);

        // Aktualizacja mini-kafelków sensorów
        if (data.measurements) {
            sensorGrid.innerHTML = data.measurements.map(m => `
                <div class="sensor-chip" title="${m.label}">
                    <span class="mdi mdi-flash"></span> ${m.value} ${m.unit || ''}
                </div>
            `).join('');
        }
    });
}

// --- MODAL & FORMS ---

function openAddModal() {
    modal.classList.remove('hidden');
    loadSensors(); // Odśwież listę przy otwarciu
}

function closeModal() {
    modal.classList.add('hidden');
    document.getElementById('emp-name').value = '';
    document.getElementById('emp-threshold').value = '20';
}

function renderSensorsList() {
    sensorsList.innerHTML = '';
    availableSensors.forEach(sensor => {
        const div = document.createElement('div');
        div.className = 'sensor-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" value="${sensor.id}" class="sensor-checkbox">
                <strong>${sensor.main_label}</strong> <small>(${sensor.id})</small>
            </label>
        `;
        sensorsList.appendChild(div);
    });
}

async function saveEmployee() {
    const name = document.getElementById('emp-name').value;
    const threshold = document.getElementById('emp-threshold').value;
    const checkboxes = document.querySelectorAll('.sensor-checkbox:checked');
    const selectedSensors = Array.from(checkboxes).map(cb => cb.value);

    if (!name) return alert("Podaj imię!");

    const payload = {
        name: name,
        threshold: threshold,
        sensors: selectedSensors
    };

    try {
        await fetch(`${API_BASE}/api/employees`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        closeModal();
        loadEmployees(); // Przeładuj listę
    } catch (e) {
        alert("Błąd zapisu: " + e);
    }
}

window.deleteEmployee = async function(index) {
    if(!confirm("Czy na pewno usunąć tego pracownika?")) return;
    
    try {
        await fetch(`${API_BASE}/api/employees/${index}`, { method: 'DELETE' });
        loadEmployees();
    } catch (e) {
        alert("Błąd usuwania");
    }
}