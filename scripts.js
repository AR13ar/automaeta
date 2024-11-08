alert("JavaScript is running!");
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let boxes = [];
let gameOver = false;

// Box object
class Box {
    constructor(url, imageUrl, text) {
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 80;
        this.speed = 1 + Math.random() * 2;
        this.url = url;
        this.imageUrl = imageUrl;
        this.text = text;
    }

    update() {
        this.x -= this.speed; // Move box leftward
        if (this.x + this.size < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        const img = new Image();
        img.src = this.imageUrl;
        ctx.drawImage(img, this.x, this.y, this.size, this.size);

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(this.x, this.y + this.size - 20, this.size, 20);

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(this.text, this.x + 5, this.y + this.size - 5);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.size &&
               mouseY >= this.y && mouseY <= this.y + this.size;
    }
}

// Initialize boxes with URLs and image URLs
function createBoxes() {
    boxes.push(new Box("https://example.com", "https://via.placeholder.com/80?text=Box+1", "Box 1"));
    boxes.push(new Box("https://example2.com", "https://via.placeholder.com/80?text=Box+2", "Box 2"));
    boxes.push(new Box("https://example3.com", "https://via.placeholder.com/80?text=Box+3", "Box 3"));
    boxes.push(new Box("https://example4.com", "https://via.placeholder.com/80?text=Box+4", "Box 4"));
}

// Game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Update and draw each box
    boxes.forEach(box => {
        box.update();
        box.draw();
    });

    requestAnimationFrame(gameLoop);
}

// Handle clicking on the canvas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if any box was clicked
    boxes.forEach(box => {
        if (box.isClicked(mouseX, mouseY)) {
            window.open(box.url, '_blank'); // Open URL in a new tab
        }
    });
});

// Start game
createBoxes();
gameLoop();
