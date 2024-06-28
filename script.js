class Bullet {
  constructor(x, y, a) {
    this.div = document.createElement("div");
    this.div.className = "bullet";
    document.getElementById("map").appendChild(this.div);

    this.x = x;
    this.y = y;
    this.a = a;
    this.vx = Math.sin((this.a * Math.PI) / 180) * 10;
    this.vy = -Math.cos((this.a * Math.PI) / 180) * 10;
    this.move();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
  }
}
let bullets = [];

class Rocket {
  constructor(id, x, y) {
    this.id = id;
    this.div = document.getElementById(id);

    this.x = x;
    this.y = y;
    this.a = 0;
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    let maxSpeed = 20;
    if (this.vx > maxSpeed) this.vx = maxSpeed;
    if (this.vy > maxSpeed) this.vy = maxSpeed;
    if (this.vx < -maxSpeed) this.vx = -maxSpeed;
    if (this.vy < -maxSpeed) this.vy = -maxSpeed;

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.99;
    this.vy *= 0.99;

    if (this.x > window.innerWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = window.innerWidth;
    } else if (this.y > window.innerHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = window.innerHeight;
    }
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    this.div.style.transform = `rotate(${this.a}deg)`;
  }

  gas(sign) {
    this.vx += Math.sin((this.a * Math.PI) / 180) * sign;
    this.vy -= Math.cos((this.a * Math.PI) / 180) * sign;
  }

  fire() {
    let offsetX = 45;
    let offsetY = 25;
    let x = this.x + Math.cos((-this.a * Math.PI) / 180) * offsetX;
    let y = this.y - Math.sin((-this.a * Math.PI) / 180) * offsetY;
    let b = new Bullet(x, y, this.a);
    bullets.push(b);
  }
}

let r1 = new Rocket("r1", 200, 200);
let r2 = new Rocket("r2", 300, 400);

setInterval(() => {
  r1.move();
  r2.move();
  bullets.forEach((b) => b.move());
}, 1000 / 60);

window.addEventListener("keydown", handleKeyDown);
let keys = {};

function handleKeyDown(event) {
  keys[event.key] = true;
}

window.addEventListener("keyup", handleKeyUp);

function handleKeyUp(event) {
  keys[event.key] = false;
}

setInterval(() => {
  if (keys["ArrowUp"]) r1.gas(1);
  //   if (keys["ArrowDown"]) r1.gas(-1);
  if (keys["ArrowLeft"]) r1.a += -4;
  if (keys["ArrowRight"]) r1.a += 4;

  if (keys["w"]) r2.gas(1);
  //   if (keys["s"]) r2.gas(-1);
  if (keys["a"]) r2.a += -4;
  if (keys["d"]) r2.a += 4;
}, 1000 / 60);

setInterval(() => {
  if (keys[" "]) r2.fire();
  if (keys["Enter"]) r1.fire();
}, 1000 / 10);
