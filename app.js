const WEBHOOK_URL = 'http://localhost:5678/webhook-test/start-proces';
const PRICING = {
    cito: { "Kuchnia": 500, "Jadalnia w aneksie": 250, "Jadalnia": 400, "Przedsionek": 300, "Salon": 600, "Biuro": 450, "Pokój gościnny": 450, "Klatka schodowa": 350, "Łazienka": 550, "Garderoba": 300, "Sypialnia": 500, "Korytarz": 250, "Pomieszczenie gospodarcze": 250 },
    electricPerM2: 15,
    premium: { basePerM2: 150, kitchenFlat: 2500, bathFlat: 2500 }
};

let selectedRoomsCito = {};
let currentPackage = '';
let currentPrice = 0;

function initRooms() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(PRICING.cito).forEach(room => {
        const card = document.createElement('div');
        card.className = "card-choice p-5 rounded-3xl flex flex-col justify-between shadow-sm";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-sm font-semibold">${room}</span>
                    <span class="text-[10px] text-[#8C7E6A] uppercase font-bold tracking-wider">${PRICING.cito[room]} zł / szt.</span>
                </div>
                <input type="checkbox" onchange="toggleRoomCito('${room}', this)" class="h-5 w-5 rounded border-gray-300 text-[#8C7E6A] cursor-pointer">
            </div>
            <div id="counter-${room}" class="hidden mt-4 flex items-center gap-3 bg-white border border-[#E5DED4] rounded-xl p-1 w-fit">
                <button onclick="updateCountCito('${room}', -1)" class="w-8 h-8 flex items-center justify-center rounded-lg font-bold">-</button>
                <span id="val-${room}" class="text-sm font-bold w-4 text-center">1</span>
                <button onclick="updateCountCito('${room}', 1)" class="w-8 h-8 flex items-center justify-center rounded-lg font-bold">+</button>
            </div>`;
        grid.appendChild(card);
    });
}

function goToMain() { resetState(); showView('main'); }
function showView(viewId) {
    document.querySelectorAll('main').forEach(v => v.classList.add('hidden'));
    document.getElementById(`view-${viewId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetState() {
    selectedRoomsCito = {};
    document.querySelectorAll('#rooms-grid input[type="checkbox"]').forEach(cb => { cb.checked = false; cb.parentElement.parentElement.classList.remove('active'); });
    document.querySelectorAll('[id^="counter-"]').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('[id^="val-"]').forEach(v => v.innerText = '1');
    document.getElementById('electric-project').checked = false;
    document.getElementById('electric-m2').value = '';
    document.getElementById('electric-input-wrap').classList.add('hidden');
    document.getElementById('premium-total-m2').value = '';
    document.getElementById('premium-kitchen-m2').value = '';
    document.getElementById('premium-bath-m2').value = '';
    document.getElementById('final-form').reset();
    document.getElementById('consult-form').reset();
    document.getElementById('final-file-name').innerText = "Wymagany rzut nieruchomości";
    document.getElementById('consult-file-name').innerText = "Kliknij lub przeciągnij plik tutaj";
    calculateTotalCito(); calculateTotalPremium();
    currentPrice = 0; currentPackage = '';
}

function toggleRoomCito(room, checkbox) {
    const counter = document.getElementById(`counter-${room}`);
    if (checkbox.checked) { selectedRoomsCito[room] = 1; counter.classList.remove('hidden'); checkbox.parentElement.parentElement.classList.add('active'); }
    else { delete selectedRoomsCito[room]; counter.classList.add('hidden'); checkbox.parentElement.parentElement.classList.remove('active'); }
    calculateTotalCito();
}

function updateCountCito(room, delta) {
    selectedRoomsCito[room] = Math.max(1, (selectedRoomsCito[room] || 1) + delta);
    document.getElementById(`val-${room}`).innerText = selectedRoomsCito[room];
    calculateTotalCito();
}

function calculateTotalCito() {
    let total = 0;
    Object.keys(selectedRoomsCito).forEach(room => total += selectedRoomsCito[room] * PRICING.cito[room]);
    if (document.getElementById('electric-project').checked) {
        document.getElementById('electric-input-wrap').classList.remove('hidden');
        total += (parseFloat(document.getElementById('electric-m2').value) || 0) * PRICING.electricPerM2;
    } else { document.getElementById('electric-input-wrap').classList.add('hidden'); }
    currentPrice = total;
    document.getElementById('total-price-cito').innerText = total.toLocaleString();
    document.getElementById('next-btn-cito').disabled = total === 0;
}

function calculateTotalPremium() {
    const totalM2 = parseFloat(document.getElementById('premium-total-m2').value) || 0;
    let total = totalM2 * PRICING.premium.basePerM2;
    if (parseFloat(document.getElementById('premium-kitchen-m2').value) > 0) total += PRICING.premium.kitchenFlat;
    if (parseFloat(document.getElementById('premium-bath-m2').value) > 0) total += PRICING.premium.bathFlat;
    currentPrice = total;
    document.getElementById('total-price-premium').innerText = total.toLocaleString();
    document.getElementById('next-btn-premium').disabled = totalM2 <= 0;
}

function goToFinalStep(pkg) {
    currentPackage = pkg;
    document.getElementById('summary-package-name').innerText = pkg === 'cito' ? 'Pakiet na Cito' : 'Pakiet Premium';
    document.getElementById('final-summary-price').innerText = currentPrice.toLocaleString();
    showView('final-step');
}

function goBackFromFinal() { showView(currentPackage + '-config'); }

// PLIKI
if (document.getElementById('final-file')) document.getElementById('final-file').onchange = e => document.getElementById('final-file-name').innerText = e.target.files[0]?.name || "Wymagany rzut";
if (document.getElementById('consult-file')) document.getElementById('consult-file').onchange = e => document.getElementById('consult-file-name').innerText = e.target.files[0]?.name || "Załącz rzut";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

async function sendData(payload, btn) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            alert("Sukces! Zgłoszenie zostało wysłane.");
            goToMain();
        } else { throw new Error("Błąd serwera"); }
    } catch (err) {
        alert("Nie udało się połączyć z serwerem. Sprawdź czy Webhook działa.");
    } finally {
        btn.innerText = payload.packageType === 'consult' ? "Poproś o termin" : "Wyślij zgłoszenie";
        btn.disabled = false;
    }
}

if (document.getElementById('final-form')) {
    document.getElementById('final-form').onsubmit = async e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "Wysyłanie..."; btn.disabled = true;

        const file = document.getElementById('final-file').files[0];
        const payload = {
            packageType: currentPackage,
            userName: document.getElementById('user-name').value,
            userPhone: document.getElementById('user-phone').value,
            estimatedPrice: currentPrice,
            attachment: file ? { fileName: file.name, base64Content: await toBase64(file) } : null,
            details: currentPackage === 'cito' ? {
                rooms: selectedRoomsCito,
                electricProject: document.getElementById('electric-project').checked,
                electricM2: parseFloat(document.getElementById('electric-m2').value) || 0
            } : {
                totalM2: parseFloat(document.getElementById('premium-total-m2').value),
                kitchenM2: parseFloat(document.getElementById('premium-kitchen-m2').value),
                bathM2: parseFloat(document.getElementById('premium-bath-m2').value)
            }
        };
        await sendData(payload, btn);
    };
}

if (document.getElementById('consult-form')) {
    document.getElementById('consult-form').onsubmit = async e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "Wysyłanie..."; btn.disabled = true;

        const file = document.getElementById('consult-file').files[0];
        const payload = {
            packageType: 'consult',
            userName: document.getElementById('consult-name').value,
            userPhone: document.getElementById('consult-phone').value,
            rate: "200 zł / h",
            attachment: file ? { fileName: file.name, base64Content: await toBase64(file) } : null
        };
        await sendData(payload, btn);
    };
}

window.addEventListener('DOMContentLoaded', () => { initRooms(); document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible')); });
