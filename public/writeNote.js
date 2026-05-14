
class AdCarousel {
    constructor() {
        this.carousel = document.getElementById('adCarousel');
        this.prevBtn = document.querySelector('.ad-nav-prev');
        this.nextBtn = document.querySelector('.ad-nav-next');
        this.dots = document.querySelectorAll('.ad-dot');
        this.items = document.querySelectorAll('.ad-item');
        this.currentIndex = 0;
        this.autoSlideTimer = null;
        this.autoSlideDelay = 10000;

        this.init();
    }



    init() {
        if (!this.carousel) return;

        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());

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

document.addEventListener('DOMContentLoaded', () => {
    new AdCarousel();
});


const textarea = document.getElementById('note-content');
const statusDiv = document.getElementById('save-status');
let lastSavedContent = textarea.value;
let debounceTimer = null;
let stopNoneBlock;
function updateStatus(state) {
    statusDiv.classList.remove('status-idle', 'status-saving', 'status-error');

    if (state === 'saving') {
        statusDiv.style.display = 'block';
        statusDiv.innerText = "Saving...";
        statusDiv.classList.add('status-saving');
    } else if (state === 'saved') {
        statusDiv.style.display = 'block';
        statusDiv.innerText = "Saved";
        statusDiv.classList.add('status-idle');
        if (stopNoneBlock) clearTimeout(stopNoneBlock);
        stopNoneBlock = setTimeout(() => {
            statusDiv.style.display = 'none';
            stopNoneBlock = null
        }, 1000);

        
    } else if (state === 'error') {
        statusDiv.style.display = 'block';
        statusDiv.innerText = "Error saving!";
        statusDiv.classList.add('status-error');
        if (stopNoneBlock) clearTimeout(stopNoneBlock);
        stopNoneBlock = setTimeout(() => {
            statusDiv.style.display = 'none';
            stopNoneBlock = null
        }, 1000);
    }
}

async function autoSave() {
    const currentContent = textarea.value;

    if (currentContent === lastSavedContent) return;


    try {
        const response = await fetch(`/api/save/${noteTitle}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: currentContent })
        });

        if (response.ok) {
            lastSavedContent = currentContent;
            updateStatus('saved');
        } else {
            updateStatus('error');
        }
    } catch (err) {
        console.error(err);
        updateStatus('error');
    }
}

textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        updateStatus('saving');

        setTimeout(() => {
            autoSave();         
        }, 2000);

    }, 1000);
});

window.addEventListener('blur', autoSave);

