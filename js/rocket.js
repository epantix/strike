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
    window.world.bullets.push(b);
  }
}
