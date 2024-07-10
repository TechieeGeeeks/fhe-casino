import {
  HEIGHT,
  WIDTH,
  ballRadius,
  obstacleRadius,
  sinkWidth,
} from "./constants";
import { Obstacle, Sink, createObstacles, createSinks } from "./objects";
import { pad, unpad } from "./padding";
import { Ball } from "./Ball";

const COLOR_CHANGE_DURATION = 200; // Duration in ms for how long the obstacle should change color
const ORIGINAL_COLOR = "black"; // Original color of the obstacle
const COLLISION_COLOR = "lightpink"; // Color to change to upon collision

const SINK_COLOR_CHANGE_DURATION = 500; // Duration in ms for sink color change animation
const SINK_COLLISION_COLOR = "red"; // Color to change to upon ball collision with sink

export class BallManager {
  constructor(canvasRef, onFinish) {
    this.balls = [];
    this.canvasRef = canvasRef;
    this.ctx = this.canvasRef.getContext("2d");
    this.obstacles = createObstacles().map((obstacle) => ({
      ...obstacle,
      originalRadius: obstacle.radius,
      isGrowing: false,
      growStartTime: null,
    }));
    this.sinks = createSinks().map((sink) => ({
      ...sink,
      isChangingColor: false,
      colorChangeStartTime: null,
    }));
    this.update();
    this.onFinish = onFinish;
  }

  addBall(startX) {
    const newBall = new Ball(
      startX || pad(WIDTH / 2 + 13),
      pad(50),
      ballRadius,
      "#002fa7",
      this.ctx,
      this.obstacles,
      this.sinks,
      (index) => {
        this.balls = this.balls.filter((ball) => ball !== newBall);
        this.triggerSinkColorChange(index); // Trigger sink color change upon collision
        this.onFinish && this.onFinish(index, startX);
      }
    );
    this.balls.push(newBall);
  }

  triggerSinkColorChange(index) {
    const sink = this.sinks[index];
    sink.isChangingColor = true;
    sink.colorChangeStartTime = Date.now();

    // Revert color after a duration
    setTimeout(() => {
      sink.isChangingColor = false;
    }, SINK_COLOR_CHANGE_DURATION);
  }

  drawObstacles() {
    const currentTime = Date.now();

    this.obstacles.forEach((obstacle) => {
      if (obstacle.isChangingColor) {
        const elapsedTime = currentTime - obstacle.colorChangeStartTime;

        if (elapsedTime < COLOR_CHANGE_DURATION) {
          // Calculate color interpolation factor
          const colorInterpolation = elapsedTime / COLOR_CHANGE_DURATION;

          // Interpolate color towards collision color
          const r = Math.round(255 * (1 - colorInterpolation));
          const g = Math.round(182 * (1 - colorInterpolation));
          const b = Math.round(193 * (1 - colorInterpolation));
          const a = colorInterpolation;
          this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
          obstacle.isChangingColor = false;
          this.ctx.fillStyle = ORIGINAL_COLOR;
        }
      } else {
        this.ctx.fillStyle = ORIGINAL_COLOR;
      }

      this.ctx.beginPath();
      this.ctx.arc(
        unpad(obstacle.x),
        unpad(obstacle.y),
        obstacle.radius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.closePath();
    });
  }
  getColor(index) {
    if (index < 3 || index > this.sinks.length - 4) {
      return { background: "#2563EB", color: "white" };
    }
    if (index < 6 || index > this.sinks.length - 7) {
      return { background: "#6692F1", color: "black" };
    }
    if (index < 9 || index > this.sinks.length - 9) {
      return { background: "white", color: "black" };
    }
    return { background: "#7fff00", color: "black" };
  }

  drawSinks() {
    const SPACING = obstacleRadius * 2;

    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];

      // Determine color based on whether it's changing color
      if (sink.isChangingColor) {
        this.ctx.fillStyle = SINK_COLLISION_COLOR;
      } else {
        this.ctx.fillStyle = this.getColor(i).background;
      }

      drawRoundedRect(
        this.ctx,
        sink.x,
        sink.y - sink.height / 2,
        sink.width - SPACING,
        sink.height,
        8
      );
      this.ctx.fill();

      // Stroke the rounded rectangle to create a border
      this.ctx.strokeStyle = "black"; // Adjust border color as needed
      this.ctx.lineWidth = 2; // Adjust border width as needed
      this.ctx.stroke();

      // Fill the text color for multiplier
      this.ctx.fillStyle = this.getColor(i).color;
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(
        sink?.multiplier?.toString() + "x",
        sink.x - 15 + sinkWidth / 2,
        sink.y
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawObstacles();
    this.drawSinks();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }

  update() {
    this.draw();
    this.requestId = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
