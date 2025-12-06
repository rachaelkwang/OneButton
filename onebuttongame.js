

let dino;
let groundY;
let gravity = 1;
let obstacles = [];
let score = 0;
let gameOver = false;



function setup() {
  createCanvas(800, 400);
  groundY = height - 50;
  dino = new Dino();
  textSize(24);
  textAlign(LEFT, TOP);
}

function draw() {
  background(255);

  // Ground 
  stroke(0);
  line(0, groundY, width, groundY);


  dino.update();
  dino.show();


  if (frameCount % 90 === 0) {
    obstacles.push(new Obstacle());
  }
  
  

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].hits(dino)) {
      gameOver = true;
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }


  fill(0);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);


  if (gameOver) {
   textSize(48);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 20);
    noLoop();
  }
}

function keyPressed() {
  if (key === ' ' && !gameOver) {
    dino.jump();
  } else if (key === ' ' || key === 'r' && gameOver) {
    resetGame();
  }
}

function resetGame() {
  obstacles = [];
  score = 0;
  gameOver = false;
  dino = new Dino();
  textSize(24);
  textAlign(LEFT, TOP);
  loop();
}


class Dino {
  constructor() {
    this.r = 50; 
    this.x = 80;
    this.y = groundY - this.r;
    this.vy = 0;
  }

  jump() {
    if (this.y === groundY - this.r) {
      this.vy = -18;
    }
  }

  update() {
    this.y += this.vy;
    this.vy += gravity;
    this.y = constrain(this.y, 0, groundY - this.r);
  }

  show() {
    stroke(0);
    strokeWeight(3);

    let headSize = 20;
    let bodyY = this.y + 20;

    // Head
    fill(255);
    ellipse(this.x + 15, this.y, headSize, headSize);

    // Body
    line(this.x + 15, this.y + headSize / 2, this.x + 15, bodyY + 15);

    // Arms
    line(this.x + 15, this.y + 20, this.x, this.y + 30);
    line(this.x + 15, this.y + 20, this.x + 30, this.y + 30);

    // Legs
    line(this.x + 15, bodyY + 15, this.x, this.y + this.r);
    line(this.x + 15, bodyY + 15, this.x + 30, this.y + this.r);
  }
}


class Obstacle {
  constructor() {
    this.w = random(20, 40);
    this.h = random(30, 50);
    this.x = width;
    this.y = groundY - this.h;
    this.speed = 8;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(120, 50, 50);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(dino) {

    let dinoX = dino.x;
    let dinoY = dino.y;
    let dinoW = 30;
    let dinoH = dino.r;

    return (dinoX < this.x + this.w &&
            dinoX + dinoW > this.x &&
            dinoY < this.y + this.h &&
            dinoY + dinoH > this.y);
  }
}
