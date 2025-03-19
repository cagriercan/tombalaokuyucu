let interval;
let numbers = [];
const numberDisplay = document.getElementById("numberDisplay");
const historyDiv = document.getElementById("history");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function speakNumber(num) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.lang = "tr-TR";
        speechSynthesis.speak(utterance);
    } else {
        alert("Tarayıcınız metin okuma özelliğini desteklemiyor.");
    }
}

startBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Önceki okuma iptal edilir
    }

    interval = setInterval(() => {
        let num;
        do {
            num = Math.floor(Math.random() * 90) + 1;
        } while (numbers.includes(num));

        numbers.push(num);
        numberDisplay.textContent = num;
        speakNumber(num); // **Kullanıcı etkileşimi sonrası çalışır**

        historyDiv.innerHTML += `<span>${num}</span> `;
        if (numbers.length === 90) clearInterval(interval);
    }, 2000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    speechSynthesis.cancel();
});
