// popular Item
function openbunModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Hide banners & timers
        document.querySelectorAll(".bun-card-banner, .timer, .card-banner").forEach(el => {
            el.style.display = "none";
        });
    }
}

function closeAllModals() {
    document.querySelectorAll(".bun-modal").forEach(modal => {
        modal.style.display = "none";
    });
    document.body.style.overflow = "auto";

    document.querySelectorAll(".bun-card-banner").forEach(el => {
        el.style.display = "block";
    });
}

function closebunModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";

        // Restore banners & timers
        document.querySelectorAll(".bun-card-banner, .timer, .card-banner").forEach(el => {
            el.style.display = "block";
        });
    }
}


window.onclick = function (event) {
    document.querySelectorAll(".bun-modal").forEach(modal => {
        if (event.target === modal) {
            closeAllModals();
        }
    });
};
