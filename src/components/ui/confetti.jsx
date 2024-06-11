import confetti from "canvas-confetti";

const Confetti = (options) => {
  if (
    options.disableForReducedMotion &&
    window.matchMedia("(prefers-reduced-motion)").matches
  ) {
    return;
  }

  const confettiInstance = options.canvas
    ? confetti.create(options.canvas, {
        resize: options.resize ?? true,
        useWorker: options.useWorker ?? true,
      })
    : confetti;

  confettiInstance({
    ...options,
  });
};

Confetti.shapeFromPath = (options) => {
  return confetti.shapeFromPath({ ...options });
};

Confetti.shapeFromText = (options) => {
  return confetti.shapeFromText({ ...options });
};

export { Confetti };
