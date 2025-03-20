let interval;
let numbers = [];
let drawInterval = 3000; // Varsayılan süre: 3 saniye
const numberDisplay = document.getElementById("numberDisplay");
const historyDiv = document.getElementById("history");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const speedUpBtn = document.getElementById("speedUp");
const slowDownBtn = document.getElementById("slowDown");
const speedDisplay = document.getElementById("speedDisplay");

// Sesli okuma fonksiyonu
function speakNumber(num) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.lang = "tr-TR";
        speechSynthesis.speak(utterance);
    } else {
        alert("Tarayıcınız metin okuma özelliğini desteklemiyor.");
    }
}

// Yeni sayı çekme fonksiyonu
function drawNumber() {
    if (numbers.length === 90) {
        clearInterval(interval);
        alert("Tüm sayılar çekildi!");
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

// Çekilişi başlat
startBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    if (interval) {
        clearInterval(interval);
    }

    numbers = [];
    historyDiv.innerHTML = "";

    drawNumber();
    interval = setInterval(drawNumber, drawInterval);
});

// Çekilişi durdur
stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    speechSynthesis.cancel();
});

// Hızlandırma butonu (Minimum 1 saniye)
speedUpBtn.addEventListener("click", () => {
    if (drawInterval > 1000) {
        drawInterval -= 1000;
        speedDisplay.textContent = `${drawInterval / 1000} saniye`;
        restartDraw();
    }
});

// Yavaşlatma butonu (Maksimum 10 saniye)
slowDownBtn.addEventListener("click", () => {
    if (drawInterval < 10000) {
        drawInterval += 1000;
        speedDisplay.textContent = `${drawInterval / 1000} saniye`;
        restartDraw();
    }
});

// Çekilişi yeni süreyle başlatma
function restartDraw() {
    if (interval) {
        clearInterval(interval);
        interval = setInterval(drawNumber, drawInterval);
    }
}
