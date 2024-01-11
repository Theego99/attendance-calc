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
        } else if (percent >= 50) {
            var elementsToRemove = document.querySelectorAll("#skull");
            elementsToRemove.forEach(function (element) {
                element.remove();
            });
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
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function triggerSkulls() {
    var skullElement = document.createElement("div");
    skullElement.id = "skull";
    skullElement.innerHTML = "💀";
    skullElement.style.position = "fixed";
    skullElement.style.left = "50%";
    skullElement.style.top = "50%";
    skullElement.style.transform = "translate(-50%, -50%)";
    skullElement.style.fontSize = "1rem";
    document.body.appendChild(skullElement);

    var size = 1;
    skullInterval = setInterval(function () {
        size *= 1.4;
        skullElement.style.fontSize = size + "rem";
        if (size > 300) {
            clearInterval(skullInterval);
            var elementsToRemove = document.querySelectorAll("#skull");
            elementsToRemove.forEach(function (element) {
                element.remove();
            });
            console.log("Skull reached 300px, triggering blood drip...");
            showNewContent();
        }
    }, 100);
}

function clearEffects() {
    if (confettiInterval) clearInterval(confettiInterval);
    if (skullInterval) clearInterval(skullInterval);
}

function showNewContent() {
    var newContent = document.getElementById("new-content");
    newContent.style.display = "block";

    var opacity = 1;
    var fadeInterval = setInterval(function () {
        opacity -= 0.017; // fade speed
        newContent.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fadeInterval);
            newContent.style.display = "none";
            newContent.style.opacity = 1;
        }
    }, 100); // fade frequency
}
