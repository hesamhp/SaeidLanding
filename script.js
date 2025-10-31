// Simple Gym Landing Page - Simple Fade Animations Only
class ModernGymSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        
        this.autoSlideInterval = null;
        this.autoSlideDelay = 6000; // 6 seconds
        
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.bindSimpleEvents();
        this.startAutoSlide();
        this.updateIndicators();
        this.preloadImages();
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }
    
    bindSimpleEvents() {
        // Simple button events
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        // Simple indicator events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Simple touch events
        this.addSimpleTouchEvents();
    }
    
    addSimpleTouchEvents() {
        const slider = document.querySelector('.hero-slider');
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index < 0 || index >= this.totalSlides) {
            return;
        }
        
        this.isTransitioning = true;
        
        // Simple fade transition
        this.slides[this.currentSlide].style.opacity = '0';
        
        setTimeout(() => {
            this.slides[this.currentSlide].classList.remove('active');
            this.slides[this.currentSlide].style.opacity = '';
            
            this.currentSlide = index;
            this.slides[this.currentSlide].classList.add('active');
            
            // Fade in new slide
            this.slides[this.currentSlide].style.opacity = '1';
            
            this.updateIndicators();
            this.pauseAutoSlide();
            this.startAutoSlide();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
        }, 300);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
                indicator.style.transform = 'scale(1.4)';
            } else {
                indicator.classList.remove('active');
                indicator.style.transform = 'scale(1)';
            }
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, this.autoSlideDelay);
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    preloadImages() {
        this.slides.forEach(slide => {
            const bgImage = slide.style.backgroundImage;
            if (bgImage) {
                const url = bgImage.slice(4, -1).replace(/['"]/g, '');
                const img = new Image();
                img.src = url;
            }
        });
    }
    
    handleResize() {
        // Recalculate any dimensions if needed
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize simple slider
    const slider = new ModernGymSlider();
    
    console.log('باشگاه ورزشی - صفحه بارگذاری شد!');
});