// Класс Bullet представляет собой объект пули
class Bullet {
  // Конструктор принимает координаты x и y, а также угол a
  constructor(x, y, a) {
    // Создаем новый элемент div для пули
    this.div = document.createElement("div");
    // Устанавливаем класс "bullet" для стилизации пули
    this.div.className = "bullet";
    // Добавляем элемент div в элемент с id "map"
    document.getElementById("map").appendChild(this.div);

    // Устанавливаем начальные координаты и угол пули
    this.x = x;
    this.y = y;
    this.a = a;
    // Вычисляем начальные скорости пули по осям x и y
    this.vx = Math.sin((this.a * Math.PI) / 180) * 10;
    this.vy = -Math.cos((this.a * Math.PI) / 180) * 10;
    // Вызываем метод move() для начала движения пули
    this.move();
  }

  // Метод move() обновляет координаты пули и обновляет их на экране
  move() {
    // Обновляем координаты пули с учетом скоростей по осям x и y
    this.x += this.vx;
    this.y += this.vy;

    // Обновляем позицию элемента div на экране
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
  }
}
let bullets = [];

/**
 * Класс Rocket представляет ракету в игре.
 * @class
 */
class Rocket {
  /**
   * Создает экземпляр класса Rocket.
   * @constructor
   * @param {string} id - Идентификатор элемента ракеты.
   * @param {number} x - Координата X ракеты.
   * @param {number} y - Координата Y ракеты.
   */
  constructor(id, x, y) {
    this.id = id;
    this.div = document.getElementById(id);

    this.x = x;
    this.y = y;
    this.a = 0;
    this.vx = 0;
    this.vy = 0;
  }

  /**
   * Перемещает ракету на основе текущей скорости.
   */
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

  /**
   * Увеличивает или уменьшает скорость ракеты в зависимости от знака.
   * @param {number} sign - Знак (+1 или -1) для увеличения или уменьшения скорости.
   */
  gas(sign) {
    this.vx += Math.sin((this.a * Math.PI) / 180) * sign;
    this.vy -= Math.cos((this.a * Math.PI) / 180) * sign;
  }

  /**
   * Создает и добавляет пулю в массив пуль.
   */
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
