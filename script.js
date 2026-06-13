/* ==========================================================================
   YUGS 3D GLOBAL APPLICATION ENGINE - STABLE RESPONSIVE VERSION
   ========================================================================== */

// 1. MOBILE RESPONSIVE HAMBURGER INTERACTION CONTROL
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("open");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mobileLinks = document.querySelectorAll(".nav-links a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            const navLinks = document.querySelector(".nav-links");
            const menuToggle = document.querySelector(".menu-toggle");
            if (navLinks && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
                menuToggle.classList.remove("open");
            }
        });
    });
    
    updateCartDisplayCount();
    initializeHeroCarousel();
});

// 2. HERO SLIDESHOW AUTOPLAY CAROUSEL RUNTIME
function initializeHeroCarousel() {
    const slides = document.querySelectorAll(".hero .slide");
    const track = document.querySelector(".hero .carousel");
    if (!track || slides.length <= 1) return;

    let currentSlide = 0;
    track.style.transition = "transform 1s cubic-bezier(0.77, 0.2, 0.05, 1)";

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

// 3. SHOPPING CART LOCALSTORAGE HANDLERS WITH POPUP SYSTEM
function updateCart(productName, price, productImage) {
    let cart = JSON.parse(localStorage.getItem('yugs_cart')) || [];

    cart.push({
        name: productName,
        price: parseInt(price),
        image: productImage || './images/img-1.jpeg'
    });

    localStorage.setItem('yugs_cart', JSON.stringify(cart));
    updateCartDisplayCount();
    showPopupNotification(productName);
}

function updateCartDisplayCount() {
    const cart = JSON.parse(localStorage.getItem('yugs_cart')) || [];
    const countElement = document.getElementById('count');
    const mobileBadge = document.getElementById('cart-count');
    
    if (countElement) countElement.innerText = cart.length;
    if (mobileBadge) mobileBadge.innerText = cart.length;
}

// 4. TOAST POPUP NOTIFICATION ENGINE
function showPopupNotification(productName) {
    let container = document.getElementById('toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = "position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-popup';
    toast.innerHTML = `🛒 <span>${productName} added to cart!</span>`;

    container.appendChild(toast);

    setTimeout(() => { toast.classList.add('show'); }, 50);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => { toast.remove(); });
    }, 3000);
}

// 5. PORTFOLIO GRID HORIZONTAL TRANSITION RUNTIME
let horizontalScrollIndex = 0;

function movePortfolio(direction) {
    const track = document.getElementById('portfolio-track');
    const items = document.querySelectorAll('.portfolio-item');
    if (!track || items.length === 0) return;
    
    const elementCount = items.length;
    let windowBreakpointFactor = 3; 
    
    if (window.innerWidth <= 768) {
        windowBreakpointFactor = 1; 
    } else if (window.innerWidth <= 992) {
        windowBreakpointFactor = 2; 
    }
    
    const limitBoundary = elementCount - windowBreakpointFactor;
    horizontalScrollIndex += direction;
    
    if (horizontalScrollIndex < 0) horizontalScrollIndex = 0;
    if (horizontalScrollIndex > limitBoundary) horizontalScrollIndex = limitBoundary;
    
    const visualStepShift = horizontalScrollIndex * (100 / windowBreakpointFactor);
    track.style.transform = `translateX(-${visualStepShift}%)`;
}


// ==========================================================================
    // MODAL WINDOW INTERACTIVE CONTROLLERS
    // ==========================================================================
    function openProductModal(name, price, imgUrl) {
        document.getElementById("modal-product-name").innerText = name;
        document.getElementById("modal-product-price").innerText = "₹" + price;
        document.getElementById("modal-product-img").src = imgUrl;
        
        const modal = document.getElementById("quickview-modal");
        modal.style.display = "flex";
    }

    function closeProductModal() {
        document.getElementById("quickview-modal").style.display = "none";
    }
