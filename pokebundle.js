document.addEventListener("DOMContentLoaded", function () {
    var modal1 = document.getElementById("Promodal1");
    var btn1 = document.getElementById("PopenModal1");

    var modal2 = document.getElementById("Promodal2");
    var btn2 = document.getElementById("PopenModal2");

    var modal3 = document.getElementById("Promodal3");
    var btn3 = document.getElementById("PopenModal3");

    var closeBtn1 = document.querySelector("#Promodal1 .pclose");
    var closeBtn2 = document.querySelector("#Promodal2 .pclose");
    var closeBtn3 = document.querySelector("#Promodal3 .pclose");

    // Modal 1
    btn1.onclick = function () {
        modal1.style.display = "block";
    };
    closeBtn1.onclick = function () {
        modal1.style.display = "none";
    };

    // Modal 2
    btn2.onclick = function () {
        modal2.style.display = "block";
    };
    closeBtn2.onclick = function () {
        modal2.style.display = "none";
    };

    // Modal 3
    btn3.onclick = function () {
        modal3.style.display = "block";
    };
    closeBtn3.onclick = function () {
        modal3.style.display = "none";
    };

    // Close modals when clicking outside
    window.onclick = function (event) {
        if (event.target === modal1) {
            modal1.style.display = "none";
        } else if (event.target === modal2) {
            modal2.style.display = "none";
        } else if (event.target === modal3) {
            modal3.style.display = "none";
        }
    }
});

document.getElementById("promoButton").addEventListener("click", function() {
});
