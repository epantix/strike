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
