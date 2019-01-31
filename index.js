kontra.init()

const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

let loop = kontra.gameLoop({
  update() {
    sprites.map( sprite => {
      sprite.update();
      checkBounds(sprite);
    })
  },
  render() {
    sprites.map(sprite => sprite.render());
  }
})

let sprites = [];

const createAsteroid = () => {
  let asteroid = kontra.sprite({
    x: 100,
    y: 100,
    dx: Math.random() * 4 - 2,  // move 2px to the right
    dy: Math.random() * 4 - 2,  // move 2px to the bottom
    render() {
      this.context.strokeStyle = 'white';
      this.context.beginPath();  // start drawing a shape
      this.context.arc(this.x, this.y, 10, 0, Math.PI*2);
      this.context.stroke();     // outline the circle
    }
  });

  sprites.push(asteroid);
}

for (var i = 0; i < 20; i++) {
  createAsteroid();
}

let ship = kontra.sprite({
  x: 300,
  y: 150,
  width: 6,
  rotation: 0,
  render() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(degreesToRadians(this.rotation));

    // draw a right facing triangle
    this.context.beginPath();
     this.context.moveTo(-3, -5);
     this.context.lineTo(12, 0);
     this.context.lineTo(-3, 5);

     this.context.closePath();
     this.context.stroke();
     this.context.restore()
 },
 update() {
   // rotate the ship left or right
    if (kontra.keys.pressed('left')) {
      this.rotation += -4
    }
    else if (kontra.keys.pressed('right')) {
      this.rotation += 4
    }

    const cos = Math.cos(degreesToRadians(this.rotation))
    const sin = Math.sin(degreesToRadians(this.rotation))

    if (kontra.keys.pressed('up')) {
      this.ddx = cos * 0.1;
      this.ddy = cos *0.1;
    }

    this.advance();
 }
})

sprites.push(ship);

const checkBounds = (asteroid) => {
  if (asteroid.x < 0) {
    asteroid.x = kontra.canvas.width
  }
  else if (asteroid.x > kontra.canvas.width) {
    asteroid.x = 0;
  }
  if (asteroid.y < 0) {
    asteroid.y =kontra.canvas.height;
  }
  else if (asteroid.y > kontra.canvas.height) {
    asteroid.y = 0;
  }
}

loop.start();
