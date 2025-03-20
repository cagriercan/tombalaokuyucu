let interval;
let numbers = [];
let speed = 1000; // Başlangıç hızı 1 saniye
const numberDisplay = document.getElementById("numberDisplay");
const historyDiv = document.getElementById("history");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const speedUpBtn = document.getElementById("speedUpBtn");
const slowDownBtn = document.getElementById("slowDownBtn");
const speedDisplay = document.getElementById("speedDisplay"); // Hız göstergesi

// Hız göstergesini güncelleme fonksiyonu
function updateSpeedDisplay() {
    speedDisplay.textContent = (speed / 1000).toFixed(1); // Milisaniyeyi saniyeye çevir
}

function speakNumber(num) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.lang = "tr-TR";
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    } else {
        alert("Tarayıcınız metin okuma özelliğini desteklemiyor.");
    }
}

function startDraw() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); 
    }

    if (interval) {
        clearInterval(interval); // Önceki intervalı temizle
    }

    drawNumber(); // İlk sayıyı hemen çeksin

    interval = setInterval(drawNumber, speed);
}

function drawNumber() {
    if (numbers.length === 90) {
        clearInterval(interval);
        return;
    }

    let num;
    do {
        num = Math.floor(Math.random() * 90) + 1;
    } while (numbers.includes(num));

    numbers.push(num);
    numberDisplay.textContent = num;
    speakNumber(num);

    historyDiv.innerHTML += `<span>${num}</span> `;
}

startBtn.addEventListener("click", () => {
    startDraw();
});

stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    speechSynthesis.cancel();
});

speedUpBtn.addEventListener("click", () => {
    if (speed > 1000) { // Minimum hız 1 saniye
        speed -= 1000;
        updateSpeedDisplay(); // Hız göstergesini güncelle
        restartDraw();
    }
});

slowDownBtn.addEventListener("click", () => {
    if (speed < 10000) { // Maksimum hız 10 saniye
        speed += 1000;
        updateSpeedDisplay(); // Hız göstergesini güncelle
        restartDraw();
    }
});

function restartDraw() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    startDraw();
}

// İlk başta hızı gösterelim
updateSpeedDisplay();
