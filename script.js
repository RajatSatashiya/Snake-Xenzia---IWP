const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.background = "black";

let hue = 0;
function drawHead() {
  console.log(" I Was called");
  ctx.fillStyle = "white";
  ctx.fillRect(100, 200, 20, 20);
}
drawHead();

class Food {
  constructor() {
    this.x = Math.random() * 480 + 20;
    this.y = Math.random() * 480 + 20;
    this.color = "hsl(" + hue + ",100%,50%)";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Bot {
  constructor(ix, iy) {
    this.x = ix;
    this.y = iy;
    this.color = "#6ab0de";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 20, 20);
  }
}
class Snake {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.speedX = 5;
    this.speedY = 0;
    this.body = [];
    this.color = "#6ab0de";
  }
  goRight() {
    this.speedX = 5;
    this.speedY = 0;
  }
  goLeft() {
    this.speedX = -5;
    this.speedY = 0;
  }
  goUP() {
    this.speedX = 0;
    this.speedY = -5;
  }
  goDown() {
    this.speedX = 0;
    this.speedY = 5;
  }
  update() {
    console.log("lol");
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    if (this.body.length < 1) return;
    this.body[0].x = this.x;
    this.body[0].y = this.y;
  }
  updateLength() {
    const len = this.body.length;
    if (len == 0) {
      this.body.push(new Bot(this.x, this.y));
    } else {
      this.body.push(new Bot(this.body[len - 1].x, this.body[len - 1].y));
    }
    console.log("updated");
  }
  draw() {
    ctx.fillStyle = this.color;
    this.x += this.speedX;
    this.y += this.speedY;
    this.y %= 500;
    if (this.x < 0) this.x = 500;
    if (this.x > 500) this.x = 0;
    if (this.y < 0) this.y = 500;
    if (this.y > 500) this.y = 0;
    ctx.fillRect(this.x, this.y, 20, 20);
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].color = this.color;
      this.body[i].draw();
    }
  }
}
const s = new Snake();
let pizza = new Food();
let burger = new Food();
let fries = new Food();

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    s.goUP();
  }
  if (e.key == "ArrowDown") {
    s.goDown();
  }
  if (e.key == "ArrowLeft") {
    s.goLeft();
  }
  if (e.key == "ArrowRight") {
    s.goRight();
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let dist1 = Math.sqrt(
    (s.x - pizza.x) * (s.x - pizza.x) + (s.y - pizza.y) * (s.y - pizza.y)
  );
  let dist2 = Math.sqrt(
    (s.x - burger.x) * (s.x - burger.x) + (s.y - burger.y) * (s.y - burger.y)
  );
  let dist3 = Math.sqrt(
    (s.x - fries.x) * (s.x - fries.x) + (s.y - fries.y) * (s.y - fries.y)
  );
  if (dist1 < 20) {
    s.updateLength();
    hue += 20;
    s.color = pizza.color;
    pizza = new Food();
  }
  if (dist2 < 20) {
    s.updateLength();
    hue += 10;
    s.color = burger.color;
    burger = new Food();
  }
  if (dist3 < 20) {
    s.updateLength();
    hue += 20;
    s.color = fries.color;
    fries = new Food();
  }
  pizza.draw();
  burger.draw();
  fries.draw();
  s.draw();
  s.update();

  requestAnimationFrame(animate);
}
animate();
