import { gravity, horizontalFriction, verticalFriction } from "./constants";
import { Obstacle, Sink } from "./objects";
import { pad, unpad } from "./padding";

export class Ball {
  constructor(x, y, radius, color, ctx, obstacles, sinks, onFinish) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.ctx = ctx;
    this.obstacles = obstacles;
    this.sinks = sinks;
    this.onFinish = onFinish;
    this.collisionSound = "/ting.mp3";
  }

  playCollisionSound() {
    const audio = new Audio(this.collisionSound);
    audio.play();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.strokeStyle = "black"; // Border color
    this.ctx.lineWidth = 2; // Border width
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Collision with obstacles
    this.obstacles.forEach((obstacle) => {
      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if (dist < pad(this.radius + obstacle.radius)) {
        this.handleObstacleCollision(obstacle);
      }
    });

    // Collision with sinks
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      if (
        unpad(this.x) > sink.x - sink.width / 2 &&
        unpad(this.x) < sink.x + sink.width / 2 &&
        unpad(this.y) + this.radius > sink.y - sink.height / 2
      ) {
        this.vx = 0;
        this.vy = 0;
        this.onFinish(i);
        break;
      }
    }
  }

  handleObstacleCollision(obstacle) {
    this.playCollisionSound();
  
    // Trigger obstacle color change
    obstacle.isChangingColor = true;
    obstacle.colorChangeStartTime = Date.now();
  
    // Calculate collision angle
    const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
    // Reflect velocity
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    this.vx = Math.cos(angle) * speed * horizontalFriction;
    this.vy = Math.sin(angle) * speed * verticalFriction;
  
    // Adjust position to prevent sticking
    const overlap =
      this.radius +
      obstacle.radius -
      unpad(Math.hypot(this.x - obstacle.x, this.y - obstacle.y));
    this.x += pad(Math.cos(angle) * overlap);
    this.y += pad(Math.sin(angle) * overlap);
  }
  
}
