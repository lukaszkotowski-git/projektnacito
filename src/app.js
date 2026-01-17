const API_URL = window.__APP_CONFIG__?.API_URL || '/api/submissions';
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
    const electricCheckbox = document.getElementById('electric-project');
    if (electricCheckbox) electricCheckbox.checked = false;
    const electricM2 = document.getElementById('electric-m2');
    if (electricM2) electricM2.value = '';
    const electricWrap = document.getElementById('electric-input-wrap');
    if (electricWrap) electricWrap.classList.add('hidden');
    const premiumTotal = document.getElementById('premium-total-m2'); if (premiumTotal) premiumTotal.value = '';
    const premiumKitchen = document.getElementById('premium-kitchen-m2'); if (premiumKitchen) premiumKitchen.value = '';
    const premiumBath = document.getElementById('premium-bath-m2'); if (premiumBath) premiumBath.value = '';
    const finalForm = document.getElementById('final-form'); if (finalForm) finalForm.reset();
    const consultForm = document.getElementById('consult-form'); if (consultForm) consultForm.reset();
    const finalFileName = document.getElementById('final-file-name'); if (finalFileName) finalFileName.innerText = "Wymagany rzut nieruchomości";
    const consultFileName = document.getElementById('consult-file-name'); if (consultFileName) consultFileName.innerText = "Kliknij lub przeciągnij plik tutaj";
    calculateTotalCito(); calculateTotalPremium();
    currentPrice = 0; currentPackage = '';
}

function toggleRoomCito(room, checkbox) {
    const counter = document.getElementById(`counter-${room}`);
    if (checkbox.checked) { selectedRoomsCito[room] = 1; if (counter) counter.classList.remove('hidden'); checkbox.parentElement.parentElement.classList.add('active'); }
    else { delete selectedRoomsCito[room]; if (counter) counter.classList.add('hidden'); checkbox.parentElement.parentElement.classList.remove('active'); }
    calculateTotalCito();
}

function updateCountCito(room, delta) {
    selectedRoomsCito[room] = Math.max(1, (selectedRoomsCito[room] || 1) + delta);
    const val = document.getElementById(`val-${room}`); if (val) val.innerText = selectedRoomsCito[room];
    calculateTotalCito();
}

function calculateTotalCito() {
    let total = 0;
    Object.keys(selectedRoomsCito).forEach(room => total += selectedRoomsCito[room] * PRICING.cito[room]);
    const electricCheckbox = document.getElementById('electric-project');
    if (electricCheckbox && electricCheckbox.checked) {
        const electricWrap = document.getElementById('electric-input-wrap'); if (electricWrap) electricWrap.classList.remove('hidden');
        const electricM2 = parseFloat(document.getElementById('electric-m2')?.value) || 0;
        total += electricM2 * PRICING.electricPerM2;
    } else { const electricWrap = document.getElementById('electric-input-wrap'); if (electricWrap) electricWrap.classList.add('hidden'); }
    currentPrice = total;
    const totalEl = document.getElementById('total-price-cito'); if (totalEl) totalEl.innerText = total.toLocaleString();
    const nextBtn = document.getElementById('next-btn-cito'); if (nextBtn) nextBtn.disabled = total === 0;
}

function calculateTotalPremium() {
    const totalM2 = parseFloat(document.getElementById('premium-total-m2')?.value) || 0;
    let total = totalM2 * PRICING.premium.basePerM2;
    if (parseFloat(document.getElementById('premium-kitchen-m2')?.value) > 0) total += PRICING.premium.kitchenFlat;
    if (parseFloat(document.getElementById('premium-bath-m2')?.value) > 0) total += PRICING.premium.bathFlat;
    currentPrice = total;
    const totalEl = document.getElementById('total-price-premium'); if (totalEl) totalEl.innerText = total.toLocaleString();
    const nextBtn = document.getElementById('next-btn-premium'); if (nextBtn) nextBtn.disabled = totalM2 <= 0;
}

function goToFinalStep(pkg) {
    currentPackage = pkg;
    const summaryName = document.getElementById('summary-package-name'); if (summaryName) summaryName.innerText = pkg === 'cito' ? 'Pakiet na Cito' : 'Pakiet Premium';
    const finalPrice = document.getElementById('final-summary-price'); if (finalPrice) finalPrice.innerText = currentPrice.toLocaleString();
    showView('final-step');
}

function goBackFromFinal() { showView(currentPackage + '-config'); }

if (document.getElementById('final-file')) document.getElementById('final-file').onchange = e => { const el = document.getElementById('final-file-name'); if (el) el.innerText = e.target.files[0]?.name || "Wymagany rzut"; };
if (document.getElementById('consult-file')) document.getElementById('consult-file').onchange = e => { const el = document.getElementById('consult-file-name'); if (el) el.innerText = e.target.files[0]?.name || "Załącz rzut"; };

async function submitForm(formData, btn, originalText) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (response.ok) { alert("Sukces! Zgłoszenie zostało wysłane."); goToMain(); }
        else { const errorMsg = result.details ? result.details.join(', ') : result.error; alert("Błąd: " + errorMsg); }
    } catch (err) { alert("Nie udało się połączyć z serwerem. Spróbuj ponownie później."); }
    finally { if (btn) { btn.innerText = originalText; btn.disabled = false; } }
}

if (document.getElementById('final-form')) {
    document.getElementById('final-form').onsubmit = async e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn?.innerText || 'Wyślij zgłoszenie';
        if (btn) { btn.innerText = "Wysyłanie..."; btn.disabled = true; }

        const file = document.getElementById('final-file')?.files[0];
        const data = {
            packageType: currentPackage,
            userName: document.getElementById('user-name')?.value,
            userPhone: document.getElementById('user-phone')?.value,
            estimatedPrice: currentPrice,
            details: currentPackage === 'cito' ? {
                rooms: selectedRoomsCito,
                electricProject: document.getElementById('electric-project')?.checked,
                electricM2: parseFloat(document.getElementById('electric-m2')?.value) || 0
            } : {
                totalM2: parseFloat(document.getElementById('premium-total-m2')?.value),
                kitchenM2: parseFloat(document.getElementById('premium-kitchen-m2')?.value),
                bathM2: parseFloat(document.getElementById('premium-bath-m2')?.value)
            }
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) formData.append('attachment', file);

        await submitForm(formData, btn, originalText);
    };
}

if (document.getElementById('consult-form')) {
    document.getElementById('consult-form').onsubmit = async e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn?.innerText || 'Poproś o termin';
        if (btn) { btn.innerText = "Wysyłanie..."; btn.disabled = true; }

        const file = document.getElementById('consult-file')?.files[0];
        const data = {
            packageType: 'consult',
            userName: document.getElementById('consult-name')?.value,
            userPhone: document.getElementById('consult-phone')?.value,
            rate: "200 zł / h"
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) formData.append('attachment', file);

        await submitForm(formData, btn, originalText);
    };
}

window.addEventListener('DOMContentLoaded', () => { initRooms(); document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible')); });

export { initApp as initApp }

function initApp() { initRooms(); }
