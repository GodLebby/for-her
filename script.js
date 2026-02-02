let currentIndex = 0;
const slideHeight = 550;

function startStory() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.currentTime = 8; 
    bgMusic.volume = 0.05; // 5% quiet background volume
    bgMusic.play();
    
    document.getElementById('overlay').style.opacity = '0';
    setTimeout(() => { 
        document.getElementById('overlay').style.display = 'none';
        updateGallery();
    }, 800);
}

function moveGallery(direction) {
    const slides = document.querySelectorAll('.slide');
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    updateGallery();
}

function updateGallery() {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const upBtn = document.querySelector('.nav-btn.up');

    // Hides up arrow on first photo (index 0)
    if (currentIndex === 0) {
        upBtn.classList.add('btn-hidden');
    } else {
        upBtn.classList.remove('btn-hidden');
    }

    const offset = currentIndex * -slideHeight;
    track.style.transform = `translateY(${offset}px)`;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
    });
}

function updateTimer() {
    // START DATE: February 7, 2022
    const startDate = new Date("2022-02-07T00:00:00"); 
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// PURPLE AND PINK DRIFTING HEARTS
function createHearts() {
    const container = document.getElementById('heart-container');
    const colors = ['#ff85a1', '#6b4c9a', '#fce1e4', '#e2d1f9']; 
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        
        // This specific string forces iPhone to show purple/pink text, not red emoji
        heart.innerHTML = '&#x2665;&#xFE0E;'; 
        
        heart.style.left = Math.random() * 100 + 'vw';
        
        // GENTLE DRIFT SPEED: 8s to 13s duration
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(heart);
    }
}

// Run initial logic
setInterval(updateTimer, 1000);
createHearts();