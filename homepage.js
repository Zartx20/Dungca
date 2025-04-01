// Function to open modal 
function openPopModal(modalId) {
    document.querySelectorAll(".pop-modal").forEach(modal => {
        modal.style.display = "none"; 
    });

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        modal.style.opacity = "1";
        document.body.style.overflow = "hidden";

        // Hide banners & timers
        document.querySelectorAll(".bun-card-banner, .timer, .card-banner").forEach(el => {
            el.style.visibility = "hidden"; 
            el.style.opacity = "0";
        });
    }
}

function closePopModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = "0"; 
        modal.style.transition = "opacity 0.3s"; 

        setTimeout(() => {
            modal.style.display = "none"; 
            document.body.style.overflow = "auto";

            // Restore banners & timers
            document.querySelectorAll(".bun-card-banner, .timer, .card-banner").forEach(el => {
                el.style.visibility = "visible"; 
                el.style.opacity = "1"; 
            });
        }, 300);
    }
}

window.onclick = function (event) {
    document.querySelectorAll(".pop-modal").forEach(modal => {
        if (event.target === modal) {
            closePopModal(modal.id); 
        }
    });
};

$(document).ready(function() {
    console.log("jQuery version:", $.fn.jquery);


    $('.sticky-nav .nav-link').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        const targetSection = $(targetId); // Get section by ID
        
        if (targetSection.length) {
            console.log('Scrolling to section with ID:', targetId);
            
            // Update active class
            $('.sticky-nav .nav-link').removeClass('active');
            $(this).addClass('active');
            
            // Scroll to section
            $('html, body').animate({
                scrollTop: targetSection.offset().top - 60
            }, 800);
        } else {
            console.error('Section not found with ID:', targetId);
        }
    });


    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        $('.product-section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = '#' + $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.sticky-nav .nav-link').removeClass('active');
                $(`.sticky-nav .nav-link[href="${sectionId}"]`).addClass('active');
            }
        });
    });


    $(window).trigger('scroll');

    // ======================
    // Carousel Initialization
    // ======================
    $('#carouselExampleIndicators').carousel({
        interval: 5000,
        pause: "hover",
        wrap: true
    });
    
    $('#carouselExampleIndicators').on('slid.bs.carousel', function () {
        $(this).find('.carousel-item').removeClass('animated');
        $(this).find('.carousel-item.active').addClass('animated');
    }).trigger('slid.bs.carousel');
    
    $('.pokeball-indicators li').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            if (!$(this).hasClass('active')) {
                $(this).css('transform', 'scale(1)');
            }
        }
    );

    // ======================
    // Countdown Timer
    // ======================
    function startCountdown() {
        const timerElement = document.getElementById("eventCountdown");
        
        if (!timerElement) {
            console.error("Error: Could not find element with ID 'eventCountdown'");
            return;
        }

        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);

        function updateTimer() {
            const now = new Date();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                timerElement.textContent = "00:00:00";
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    startCountdown();

    // ======================
    // Product Modal Functionality
    // ======================
    $('.carousel-item, .cta-btn').click(function(e) {
        if ($(e.target).hasClass('cta-btn') || $(e.target).closest('.cta-btn').length) {
            e.stopPropagation();
        }
        
        const activeSlide = $('.carousel-item.active');
        const title = activeSlide.find('h1').text();
        const popupImage = activeSlide.data('popup-image');
        const badgeText = activeSlide.find('.badge').text();
        
        $('#productModal .modal-title').text(title);
        
        let modalContent = `
            <div class="product-image-container mb-4">
                <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                <div class="badge-overlay">${badgeText}</div>
            </div>
            <div class="text-center mt-4">
                <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase</button>
            </div>
        `;

        if (title.includes('Pokemon GO Fest')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Can only be purchased 1 time.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P450.00</span>
                    <span class="discounted-price">P373.15</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">FEATURES</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>x1 Eggs-pedition Access: February</strong></li>
                        <li class="mb-2"><strong>x5 Max Revive</strong></li>
                        <li class="mb-2"><strong>x5 Rare Candy</strong></li>
                        <li class="mb-2"><strong>x3 Premium Battle Pass</strong></li>
                    </ul>
                    <a href="#" class="text-primary">View event details</a>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase Ticket</button>
                </div>
            `;
        }
        else if (title.includes('PokéCoin Bundle')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Special limited-time offer.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P299.00</span>
                    <span class="discounted-price">P249.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">CONTENTS</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>1200 PokéCoins</strong></li>
                        <li class="mb-2"><strong>+100 Bonus PokéCoins</strong></li>
                        <li class="mb-2"><strong>Limited-time exclusive</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Buy PokéCoins</button>
                </div>
            `;
        }
        else if (title.includes('Item Boxes')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Exclusive item collection.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P199.00</span>
                    <span class="discounted-price">P159.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">BOX CONTENTS</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>20 Poké Balls</strong></li>
                        <li class="mb-2"><strong>10 Great Balls</strong></li>
                        <li class="mb-2"><strong>5 Ultra Balls</strong></li>
                        <li class="mb-2"><strong>3 Incense</strong></li>
                        <li class="mb-2"><strong>2 Lucky Eggs</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Get Item Box</button>
                </div>
            `;
        }
        else if (title.includes('Daily Bundles')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">DAILY DEAL</div>
                </div>
                <p class="text-muted mb-3">Available for 24 hours only.</p>
                <div class="price-container mb-4">
                    <span class="discounted-price">P99.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">TODAY'S BUNDLE</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>10 Poké Balls</strong></li>
                        <li class="mb-2"><strong>5 Razz Berries</strong></li>
                        <li class="mb-2"><strong>1 Incense</strong></li>
                        <li class="mb-2"><strong>1 Star Piece</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Get Daily Bundle</button>
                </div>
            `;
        }

        $('#productModal .modal-body').html(modalContent);
        $('#productModal').modal('show');
    });

    // Featured product card click handler
    $('.featured-product-card').click(function(e) {
        if ($(e.target).closest('.purchase-btn').length) {
            return;
        }

        const popupImage = $(this).data('popup-image');
        const title = $(this).find('h3').text();

        $('#productModal .modal-title').text(title);

        const modalContent = `
            <div class="product-image-container mb-4">
                <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                <div class="badge-overlay">FEATURED</div>
            </div>
            <p class="text-muted mb-3">Can only be purchased 1 time.</p>
            <div class="price-container mb-4">
                <span class="original-price">P450.00</span>
                <span class="discounted-price">P373.15</span>
            </div>
            <hr class="my-4">
            <div class="features mb-4">
                <h6 class="text-uppercase font-weight-bold text-muted mb-3">FEATURES</h6>
                <ul class="pl-3 mb-3">
                    <li class="mb-2"><strong>x1 Eggs-pedition Access: February</strong></li>
                    <li class="mb-2"><strong>x5 Max Revive</strong></li>
                    <li class="mb-2"><strong>x5 Rare Candy</strong></li>
                    <li class="mb-2"><strong>x3 Premium Battle Pass</strong></li>
                </ul>
                <a href="#" class="text-primary">View event details</a>
            </div>
            <div class="text-center mt-4">
                <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase Ticket</button>
            </div>
        `;

        $('#productModal .modal-body').html(modalContent);
        $('#productModal').modal('show');
    });

    // Purchase button handler
    $('.purchase-btn').click(function(e) {
        e.stopPropagation();
        $(this).closest('.featured-product-card').trigger('click');
    });
});

// Function to toggle profile menu
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('show');
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu = document.getElementById('profileMenu');
    
    if (!profileDropdown.contains(event.target) && profileMenu.classList.contains('show')) {
        profileMenu.classList.remove('show');
    }
});

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate and format Player ID
function generatePlayerId() {
    let id = '';
    for (let i = 0; i < 12; i++) {
        id += getRandomNumber(0, 9);
    }
    // Format the ID as #### #### ####
    return id.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// Set the Player ID when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const displayPlayerId = document.getElementById('displayPlayerId');
    if (displayPlayerId) {
        displayPlayerId.textContent = generatePlayerId();
    }

    // Initialize PokéCoins carousel
    const carousel = document.querySelector(".pokecoin-carousel");
    const prevBtn = document.querySelector(".pokecoin-carousel-btn.left");
    const nextBtn = document.querySelector(".pokecoin-carousel-btn.right");

    if (carousel) {
        carousel.style.transform = "translateX(0)";
        carousel.setAttribute('data-position', '0');

        // Add click event listeners to the buttons
        prevBtn.addEventListener("click", () => scrollPokecoinCarousel(-1));
        nextBtn.addEventListener("click", () => scrollPokecoinCarousel(1));
    }

    // PokéCoins Modal Functionality
    const modal = document.querySelector(".pokecoin-modal");

    // Add click event to each PokéCoin item
    document.querySelectorAll(".pokecoin-carousel-item").forEach(item => {
        item.addEventListener("click", function() {
            const title = item.querySelector(".pokecoin-title").textContent;
            const price = item.querySelector(".pokecoin-price").textContent;
            const bonusInfo = item.querySelector(".pokecoin-bonus-info").innerHTML;
            const image = item.querySelector("img").src;

            // Update modal content
            const modalContent = document.querySelector(".pokecoin-modal-content");
            modalContent.innerHTML = `
                <span class="pokecoin-close">&times;</span>
                <img src="${image}" alt="${title}" style="width: 150px; margin-bottom: 15px;">
                <h2 style="color: #333; margin-bottom: 10px;">${title}</h2>
                <p style="color: #ff1493; font-size: 24px; font-weight: bold; margin: 15px 0;">${price}</p>
                <div style="background: linear-gradient(90deg, #8a2be2, #ff1493); color: white; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    ${bonusInfo}
                </div>
                <button class="pokecoin-buy-now" style="margin-top: 15px;">Buy Now</button>
            `;

            // Show modal
            modal.classList.add("show");
        });
    });

    // Close modal when clicking the close button
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("pokecoin-close")) {
            modal.classList.remove("show");
        }
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Function to scroll the PokéCoins carousel
function scrollPokecoinCarousel(direction) {
    const carousel = document.querySelector(".pokecoin-carousel");
    const carouselItems = document.querySelectorAll(".pokecoin-carousel-item");
    const itemWidth = carouselItems[0].offsetWidth + 30; // Include the gap (30px)
    const totalItems = carouselItems.length;
    const itemsPerView = 3; 
    const scrollItems = 3; 
    
    let currentPosition = parseInt(carousel.getAttribute('data-position') || '0');
    
    const maxScrollPosition = (totalItems - itemsPerView) * itemWidth;
    
    if (direction === 1) { // Scroll right
        currentPosition += (itemWidth * scrollItems);
        // Only stop if we've reached or exceeded the maximum scroll position
        if (currentPosition >= maxScrollPosition) {
            currentPosition = maxScrollPosition;
        }
    } else if (direction === -1) { // Scroll left
        currentPosition -= (itemWidth * scrollItems);
        if (currentPosition < 0) {
            currentPosition = 0;
        }
    }
    
    // Store the current position
    carousel.setAttribute('data-position', currentPosition.toString());
    
    // Apply the transform with smooth transition
    carousel.style.transition = 'transform 0.4s ease-in-out';
    carousel.style.transform = `translateX(-${currentPosition}px)`;
}

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
