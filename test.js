// Function to open modal 
function openPopModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        document.querySelectorAll(".card-banner, .timer").forEach(el => {
            el.style.display = "none";
        });
    }
}

function closeAllModals() {
    document.querySelectorAll(".pop-modal").forEach(modal => {
        modal.style.display = "none";
    });
    document.body.style.overflow = "auto";


    document.querySelectorAll(".card-banner, .timer").forEach(el => {
        el.style.display = "block";
    });
}


function closePopModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        closeAllModals();
    }
}

window.onclick = function (event) {
    document.querySelectorAll(".pop-modal").forEach(modal => {
        if (event.target === modal) {
            closeAllModals();
        }
    });
};
