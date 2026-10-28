
// Stato dei nodi domotici simulati
let tempValue = 21.5;
let lightState = false;

// Funzione per aggiornare e formattare i Log nel Gateway
function addLog(message) {
    const consoleBox = document.getElementById('console-logs');
    const timestamp = new Date().toLocaleTimeString();
    const newLog = document.createElement('p');
    newLog.innerHTML = `[${timestamp}] ${message}`;
    consoleBox.appendChild(newLog);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// Controllo Nodi
function toggleTemperature() {
    tempValue = parseFloat((tempValue + 0.5).toFixed(1));
    if (tempValue > 26) tempValue = 18.0; // Reset
    
    document.getElementById('temp-val').innerText = `${tempValue} °C`;
    addLog(`[NODE_TEMP] Aggiornamento temperatura inviato: ${tempValue} °C`);
}

function toggleLight() {
    lightState = !lightState;
    const statusText = lightState ? "ON (Accesa)" : "OFF (Spenta)";
    document.getElementById('light-status').innerText = statusText;
    
    addLog(`[NODE_ACTUATOR] Comando eseguito. Relè luce: ${statusText}`);
}

function triggerMotion() {
    const statusBox = document.getElementById('motion-status');
    statusBox.innerText = "MOVIMENTO RILEVATO!";
    statusBox.style.color = "#f87171";
    
    addLog(`<span style="color:#f87171;">[ALARM] Sensore Presenza attivato nel Soggiorno!</span>`);
    
    // Auto-reset dopo 3 secondi
    setTimeout(() => {
        statusBox.innerText = "Nessun movimento";
        statusBox.style.color = "inherit";
        addLog(`[NODE_MOTION] Stato ripristinato: Nessun movimento.`);
    }, 3000);
}

// Highlight automatico nel menu di navigazione allo scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
