import { useRef, useEffect } from 'react';

export const useCanvas = (canvasWidth, canvasHeight, deps) => {
  const canvasRef = useRef(null);
  const depsArray = deps || [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    
    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.style.backgroundColor = 'black';
      if (canvas && ctx) {
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    };
    if (canvasWidth !== -1 && canvasHeight !== -1) {
      setCanvas();
    }
  }, [canvasWidth, canvasHeight, ...depsArray]);

  return canvasRef;
};