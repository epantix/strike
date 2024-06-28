let world = new World();
window.world = world;

setInterval(world.move, 1000 / 60);

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

window.keys = {};

function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}

setInterval(() => {
  if (keys["ArrowUp"]) world.r1.gas(1);
  //   if (keys["ArrowDown"]) r1.gas(-1);
  if (keys["ArrowLeft"]) world.r1.a += -4;
  if (keys["ArrowRight"]) world.r1.a += 4;

  if (keys["w"]) world.r2.gas(1);
  //   if (keys["s"]) r2.gas(-1);
  if (keys["a"]) world.r2.a += -4;
  if (keys["d"]) world.r2.a += 4;
}, 1000 / 60);

setInterval(() => {
  if (keys[" "]) world.r2.fire();
  if (keys["Enter"]) world.r1.fire();
}, 1000 / 10);
