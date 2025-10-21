'use client'
import React, { RefObject, useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef: RefObject<HTMLCanvasElement> | RefObject<null> = useRef(null);
  useEffect(() => {
    let canvas: HTMLCanvasElement = canvasRef.current!;
    let ctx = canvas.getContext('2d');
    if (!ctx) return; // Check if context is available
    ctx.beginPath()
    ctx.fillStyle = 'red';
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fill();
  }, []);
	return (
		<div >
		  <canvas ref={canvasRef} id="background-canvas" className="fixed h-screen inset-0 -z-20" />
		</div>
  )
}
