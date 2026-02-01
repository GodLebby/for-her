let currentIndex = 0;

function startStory() {
    document.getElementById('bgMusic').play();
    document.getElementById('overlay').style.opacity = '0';
    setTimeout(() => { 
        document.getElementById('overlay').style.display = 'none';
        updateSlidePosition(); // Initial center
    }, 1000);
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    updateSlidePosition();
}

function updateSlidePosition() {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const windowWidth = window.innerWidth;
    
    // Get current slide info
    const currentSlide = slides[currentIndex];
    const slideWidth = currentSlide.offsetWidth;
    const slideLeft = currentSlide.offsetLeft;

    // GOLDEN MATH: Center of screen - slide's left edge - half slide width
    const offset = (windowWidth / 2) - slideLeft - (slideWidth / 2);
    
    track.style.transform = `translateY(-50%) translateX(${offset}px)`;

    // Update opacity/scale
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
    });
}

// Recalculate if screen is rotated or resized
window.addEventListener('resize', updateSlidePosition);

// Generate Hearts
const container = document.getElementById('heart-container');
for (let i = 0; i < 25; i++) {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    heart.style.color = ['#ff85a1', '#6b4c9a'][Math.floor(Math.random() * 2)];
    container.appendChild(heart);
}

function updateTimer() {
    const startDate = new Date("2022-02-07"); // Put your actual start date here
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateTimer, 1000);