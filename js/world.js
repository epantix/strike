class World {
  bullets = [];
  r1 = new Rocket("r1", 200, 200);
  r2 = new Rocket("r2", 300, 400);

  move = () => {
    this.r1.move();
    this.r2.move();
    this.bullets.forEach((b) => b.move());
  };
}
