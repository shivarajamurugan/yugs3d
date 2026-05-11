// Carousel Logic
let currentSlide = 0;
const slidesContainer = document.getElementById('carousel-slides');

function autoPlay() {
    const totalSlides = slidesContainer?.children.length;
    if(!totalSlides) return;

    currentSlide = (currentSlide + 1) % totalSlides;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Change slide every 5 seconds
if(slidesContainer) {
    setInterval(autoPlay, 5000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


