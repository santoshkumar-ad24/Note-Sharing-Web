class AdCarousel {
    constructor() {
        this.carousel = document.getElementById('adCarousel');
        this.prevBtn = document.querySelector('.ad-nav-prev');
        this.nextBtn = document.querySelector('.ad-nav-next');
        this.dots = document.querySelectorAll('.ad-dot');
        this.items = document.querySelectorAll('.ad-item');
        this.currentIndex = 0;
        this.autoSlideTimer = null;
        this.autoSlideDelay = 9000;

        this.init();
    }

    init() {
        if (!this.carousel || !this.items.length) return;

        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                this.goToSlide(index);
            });
        });

        this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());

        this.updateCarousel();
        setTimeout(() => this.startAutoSlide(), 500);
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
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
        this.autoSlideTimer = setInterval(() => this.nextSlide(), this.autoSlideDelay);
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

document.addEventListener('DOMContentLoaded', () => {
    new AdCarousel();

    const titleChange = document.getElementById('titleChange');
    const filesName = document.getElementById('filesName');

    titleChange?.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const title = filesName.value;
            if (!title) return alert('Please enter a valid title');

            titleChange.action = `/${title}`;
            titleChange.submit();
        }
    });
});

