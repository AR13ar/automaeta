const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birds = [];
let bullets = [];
let score = 0;
let gameOver = false;

// Bird object
class Bird {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 30;
        this.speed = 2 + Math.random() * 2; // Random speed for each bird
    }

    update() {
        this.x -= this.speed; // Move bird left
        if (this.x + this.size < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isHit(bullet) {
        const dist = Math.sqrt((bullet.x - this.x) ** 2 + (bullet.y - this.y) ** 2);
        return dist < this.size;
    }
}

// Bullet object
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = 7;
    }

    update() {
        this.x += this.speed; // Move bullet right
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Initialize birds
function createBirds(num) {
    for (let i = 0; i < num; i++) {
        birds.push(new Bird());
}

// Start the game
function startGame() {
    birds = [];
    bullets = [];
    score = 0;
    createBirds(5);
    gameOver = false;
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    if (gameOver) {
        // Show game over message and redirect
        alert('Game Over! Your score: ' + score);
        window.location.href = 'https://example.com';  // Replace with your desired URL
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Update and draw birds
    birds.forEach(bird => {
        bird.update();
        bird.draw();
    });

    // Update and draw bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // Check if bullet hits bird
        birds.forEach((bird, birdIndex) => {
            if (bird.isHit(bullet)) {
                birds.splice(birdIndex, 1); // Remove bird
                bullets.splice(index, 1); // Remove bullet
                score++;
            }
        });
    });

    // Redraw and check game over
    if (birds.length === 0) {
        gameOver = true;
    }

    requestAnimationFrame(gameLoop);
}

// Shooting event
canvas.addEventListener('click', (e) => {
    if (!gameOver) {
        const bullet = new Bullet(100, e.clientY); // Shoot from left and at mouse position
        bullets.push(bullet);
    }
});

// Start game on page load
startGame();
