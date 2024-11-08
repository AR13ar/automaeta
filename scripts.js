alert("JavaScript is running!");
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let boxes = [];
let gameOver = false;

// Box object
class Box {
    constructor(url, imageUrl, text) {
        this.x = 400 //Math.random() * (canvas.width - 160);
        this.y = 250//Math.random() * (canvas.height - 160);
        this.size = 80;
        this.dx = 1 + Math.random() * 2; // Horizontal speed
        this.dy = 1 + Math.random() * 2; // Vertical speed
        this.url = url;
        this.imageUrl = imageUrl;
        this.text = text;
    }

    update() {
        // Update position based on speed
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off the right or left edges
        if (this.x + this.size > canvas.width || this.x < 0) {
            this.dx *= -1; // Reverse horizontal direction
        }

        // Bounce off the top or bottom edges
        if (this.y + this.size > canvas.height || this.y < 0) {
            this.dy *= -1; // Reverse vertical direction
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
    boxes.push(new Box("https://example.com", "Images/img_1", "Box 1"));
    boxes.push(new Box("https://example2.com", "Images/img_2", "Box 2"));
    boxes.push(new Box("https://example3.com", "Images/img_3", "Box 3"));
    boxes.push(new Box("https://example4.com", "Images/img_4", "Box 4"));
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
