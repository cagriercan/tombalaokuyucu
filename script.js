let interval;
let numbers = [];
let speed = 3000; // 🚀 Başlangıç hızı artık 3 saniye
const numberDisplay = document.getElementById("numberDisplay");
const historyDiv = document.getElementById("history");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const restartBtn = document.getElementById("restartBtn"); // 🆕 Yeniden Başlat Butonu
const speedUpBtn = document.getElementById("speedUpBtn");
const slowDownBtn = document.getElementById("slowDownBtn");
const speedDisplay = document.getElementById("speedDisplay");

// Hız göstergesini güncelleme fonksiyonu
function updateSpeedDisplay() {
    speedDisplay.textContent = (speed / 1000).toFixed(1);
}

function speakNumber(num) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance();

        utterance.lang = "tr-TR"; // Türkçe dili seçildi
        utterance.rate = 1; // Normal hızda konuş
        utterance.pitch = 1; // Ses tonunu dengeli yap
        utterance.volume = 1; // Ses seviyesini tam yap

        // 📌 iPhone için özel Türkçe ses seçimi
        let voices = speechSynthesis.getVoices();
        let turkishVoice = voices.find(voice => voice.lang === "tr-TR");

        if (turkishVoice) {
            utterance.voice = turkishVoice; // En iyi Türkçe sesi seç
        }

        // 📌 Sayıları daha doğru okutmak için TEK TEK okutuyoruz
        let numStr = num.toString().split("").join(" ");
        utterance.text = numStr; // Örneğin 45 yerine "4 5" olarak okur

        speechSynthesis.speak(utterance);
    }
}

    }
}

function startDraw() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); 
    }

    if (interval) {
        clearInterval(interval);
    }

    drawNumber(); // 🚀 Başlat tuşuna basınca hemen sayı çekecek

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

// 🆕 Yeniden Başlat Butonu - Çekilişi Sıfırlayıp Tekrar Başlatır
restartBtn.addEventListener("click", () => {
    clearInterval(interval);
    numbers = []; // Çekilen numaraları sıfırla
    historyDiv.innerHTML = ""; // Geçmişi temizle
    numberDisplay.textContent = "0"; // Sayıyı sıfırla
    speed = 3000; // 🚀 Hızı tekrar 3 saniyeye getir
    updateSpeedDisplay(); // Hız göstergesini güncelle
    startDraw(); // Yeniden başlat
});

speedUpBtn.addEventListener("click", () => {
    if (speed > 1000) { // Minimum hız 1 saniye
        speed -= 1000;
        updateSpeedDisplay();
        restartDraw();
    }
});

slowDownBtn.addEventListener("click", () => {
    if (speed < 10000) { // Maksimum hız 10 saniye
        speed += 1000;
        updateSpeedDisplay();
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
