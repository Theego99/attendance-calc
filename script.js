var confettiInterval;
var skullInterval;

function calculatePercent() {
    clearEffects();
    let total = document.getElementById("total").value;
    let missed = document.getElementById("missed").value;
    let late = document.getElementById("late").value;

    late = Math.trunc(late / 3);
    missed = parseInt(missed) + late;

    if (total > 0) {
        let percent = 100 - (100 / total * missed);
        document.getElementById("result").innerHTML = percent.toFixed(2) + "%";

        if (percent >= 80) {
            triggerFireworks();
        } else if (percent < 50) {
            triggerSkulls();
        }
    } else {
        document.getElementById("result").innerHTML = "Total must be greater than 0";
    }
}

function triggerFireworks() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    confettiInterval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(confettiInterval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function triggerSkulls() {
    var skullElement = document.createElement("div");
    skullElement.innerHTML = "💀";
    skullElement.style.position = "fixed";
    skullElement.style.left = "50%";
    skullElement.style.top = "50%";
    skullElement.style.transform = "translate(-50%, -50%)";
    skullElement.style.fontSize = "1rem";
    document.body.appendChild(skullElement);

    var size = 1;
    skullInterval = setInterval(function () {
        size *= 1.3;
        skullElement.style.fontSize = size + "rem";

        if (size > 300) {
            clearInterval(skullInterval);
            document.body.removeChild(skullElement);
            // createBloodSplash(window.innerWidth / 2, window.innerHeight / 2);  
        }
    }, 100);
}

function clearEffects() {
    if (confettiInterval) clearInterval(confettiInterval);
    if (skullInterval) clearInterval(skullInterval);

    // Remove any existing skull elements
    var existingSkulls = document.querySelectorAll("div");
    existingSkulls.forEach(function (skull) {
        if (skull.innerHTML === "💀") {
            document.body.removeChild(skull);
        }
    });
}






