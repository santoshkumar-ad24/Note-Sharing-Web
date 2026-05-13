// Ad Carousel Controller
class AdCarousel {
    constructor() {
        this.carousel = document.getElementById('adCarousel');
        this.prevBtn = document.querySelector('.ad-nav-prev');
        this.nextBtn = document.querySelector('.ad-nav-next');
        this.dots = document.querySelectorAll('.ad-dot');
        this.items = document.querySelectorAll('.ad-item');
        this.currentIndex = 0;
        this.autoSlideTimer = null;
        this.autoSlideDelay = 10000; // 10 seconds

        this.init();
    }

    

    init() {
        if (!this.carousel) return;

        // Event listeners for navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Event listeners for dot navigation
        this.dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        // Stop auto-slide on manual interaction
        this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());

        // Start auto-slide after initial delay
        setTimeout(() => this.startAutoSlide(), 500);
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
        this.resetAutoSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
        this.resetAutoSlide();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoSlide();
        }
    }

    startAutoSlide() {
        if (this.autoSlideTimer) return;
        this.autoSlideTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideTimer) {
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdCarousel();
});

