let currentIndex = 0;
let autoInterval = null;

const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

// Update slider position and active dot state
function updateSlider(index) {
    if (index >= slides.length) {
        currentIndex = 0; // Wrap around to first slide
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Wrap around to last slide
    } else {
        currentIndex = index;
    }

    // Move track along X-axis
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot indicator
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Next button click listener
nextBtn.addEventListener('click', () => {
    updateSlider(currentIndex + 1);
});

// Previous button click listener
prevBtn.addEventListener('click', () => {
    updateSlider(currentIndex - 1);
});

// Indicator dots click listeners
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateSlider(index);
    });
});

// Start auto-slide timer
function startAutoSlide() {
    stopAutoSlide();
    autoInterval = setInterval(() => {
        updateSlider(currentIndex + 1);
    }, 3000);
}

// Stop auto-slide timer
function stopAutoSlide() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
}

// Pause auto-slide when mouse hovers over the slider container
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        stopAutoSlide(); // Image stays on screen while mouse hovers
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide(); // Auto-play resumes when mouse leaves
    });
}

// Initialize auto-play
startAutoSlide();