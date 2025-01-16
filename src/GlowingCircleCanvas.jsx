import React, { useEffect, useRef } from 'react';

const GlowingCircleCanvas = () => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size
    const color = function (x, y, r, g, b) {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.fillRect(x, y, 10, 10);
    }
    const R = function (x, y, time) {
      return (Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time)));
    }

    const G = function (x, y, time) {
      return (Math.floor(192 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300)));
    }

    const B = function (x, y, time) {
      return (Math.floor(192 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
    }

    const startAnimation = function () {
      const time = timeRef.current;

      for (let x = 0; x <= 30; x++) {
        for (let y = 0; y <= 30; y++) {
          color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
        }
      }
      timeRef.current = time + 0.01;

      requestAnimationFrame(startAnimation);
    }

    startAnimation();
  }, []);

  return (
    <canvas ref={canvasRef} width="32px" height="32px" />
  );
};

export default GlowingCircleCanvas;