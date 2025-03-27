function showPopModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

function closePopModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    const popModals = document.querySelectorAll(".pop-modal");
    popModals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
