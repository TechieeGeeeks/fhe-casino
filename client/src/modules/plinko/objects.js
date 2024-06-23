import {
  HEIGHT,
  NUM_SINKS,
  WIDTH,
  obstacleRadius,
  sinkWidth,
} from "./constants";
import { pad } from "./padding";

const MULTIPLIERS = {
  1: 1.4,
  2: 1.2,
  3: 1.1,
  4: 1,
  5: 0.5,
  6: 1,
  7: 1.1,
  8: 1.2,
  9: 1.4,
};

export const createObstacles = () => {
  const obstacles = [];
  const rows = 10;
  for (let row = 2; row < rows; row++) {
    const numObstacles = row + 1;
    const y = 0 + row * 35;
    const spacing = 40;
    for (let col = 0; col < numObstacles; col++) {
      const x = WIDTH / 2 - spacing * (row / 2 - col);
      obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
    }
  }
  return obstacles;
};

export const createSinks = () => {
  const sinks = [];
  const SPACING = obstacleRadius * 2;

  for (let i = 0; i < NUM_SINKS; i++) {
    const x =
      WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - SPACING * 1.5;
    const y = HEIGHT - 435;
    const width = sinkWidth;
    const height = width;
    sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i + 1] });
  }

  return sinks;
};
