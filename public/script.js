// Advent Calendar Logic
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const currentDate = today.toISOString().split("T")[0];
    const boxes = document.querySelectorAll(".box");
    const centralMessage = document.getElementById("central-message");
    const confettiCanvas = document.getElementById("confetti-canvas");

    // Confetti setup: Using Canvas-Confetti library
    const confetti = confettiCanvas ? confetti.create(confettiCanvas, { resize: true }) : null;

    // Open boxes except December 31 and January 1
    boxes.forEach((box) => {
        const boxDate = box.dataset.date;
        if (boxDate < "2025-12-31" || boxDate > "2026-01-01") {
            box.classList.add("open");
        }
        // Add click event for December 31 and January 1
        if (boxDate === currentDate) {
            box.addEventListener("click", () => {
                box.classList.add("open");
            });
        }
    });

    // Display central message and confetti
    if (confetti) {
        centralMessage.classList.remove("hidden");
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
});
