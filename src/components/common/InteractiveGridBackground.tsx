import React, { useRef, useEffect } from 'react';

export interface InteractiveGridBackgroundProps {
  /** Grid cell spacing in px (default 28) */
  gridSpacing?: number;
  /** Size of dashes or plus marks in px (default 4) */
  dashLength?: number;
  /** Radius around mouse where particles react (default 120px) */
  interactionRadius?: number;
  /** Maximum pixel deflection away from cursor (default 18) */
  maxDeflection?: number;
  /** Theme preset for automatic color selection */
  theme?: 'navy' | 'maroon' | 'light' | 'dark';
  /** Custom base stroke color */
  baseColor?: string;
  /** Custom active/hover highlight color */
  activeColor?: string;
  /** Additional container classes */
  className?: string;
}

interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  opacity: number;
}

export const InteractiveGridBackground: React.FC<InteractiveGridBackgroundProps> = ({
  gridSpacing = 26,
  dashLength = 4,
  interactionRadius = 120,
  maxDeflection = 16,
  theme = 'light',
  baseColor,
  activeColor,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute theme colors
  const resolvedBaseColor =
    baseColor ||
    (theme === 'navy'
      ? 'rgba(255, 255, 255, 0.12)'
      : theme === 'maroon'
      ? 'rgba(255, 255, 255, 0.14)'
      : theme === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(18, 48, 74, 0.09)');

  const resolvedActiveColor =
    activeColor ||
    (theme === 'navy'
      ? 'rgba(255, 215, 0, 0.85)' // Gold glow for Navy
      : theme === 'maroon'
      ? 'rgba(255, 255, 255, 0.85)' // Bright White for Maroon
      : theme === 'dark'
      ? 'rgba(99, 179, 237, 0.85)' // Cyan glow
      : 'rgba(29, 96, 161, 0.75)'); // Institutional Blue for light

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    let points: GridPoint[] = [];

    const initPoints = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      points = [];

      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;

      for (let r = -1; r <= rows; r++) {
        for (let c = -1; c <= cols; c++) {
          const baseX = c * gridSpacing;
          const baseY = r * gridSpacing;
          points.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            targetX: baseX,
            targetY: baseY,
            opacity: 0.35,
          });
        }
      }
    };

    initPoints();

    // Mouse coordinates relative to container
    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isActive = false;
    };

    // Attach mouse listeners to window for smooth tracking across child elements
    const parentContainer = container.parentElement || container;
    parentContainer.addEventListener('mousemove', handleMouseMove as any);
    parentContainer.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      initPoints();
    });
    resizeObserver.observe(container);

    // Animation Render Loop (60fps)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dLen = dashLength;
      const halfDash = dLen / 2;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (mouse.isActive) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < interactionRadius && dist > 0) {
            // Deflect away from mouse
            const force = (1 - dist / interactionRadius) * maxDeflection;
            const angle = Math.atan2(dy, dx);

            pt.targetX = pt.baseX + Math.cos(angle) * force;
            pt.targetY = pt.baseY + Math.sin(angle) * force;
            // Increase opacity and brightness when near cursor
            pt.opacity = 0.35 + (1 - dist / interactionRadius) * 0.65;
          } else {
            pt.targetX = pt.baseX;
            pt.targetY = pt.baseY;
            pt.opacity += (0.35 - pt.opacity) * 0.05;
          }
        } else {
          pt.targetX = pt.baseX;
          pt.targetY = pt.baseY;
          pt.opacity += (0.35 - pt.opacity) * 0.05;
        }

        // Smooth spring physics (lerp)
        pt.x += (pt.targetX - pt.x) * 0.12;
        pt.y += (pt.targetY - pt.y) * 0.12;

        // Render subtle modern cross / dash particle
        const isHovered = pt.opacity > 0.45;
        ctx.strokeStyle = isHovered ? resolvedActiveColor : resolvedBaseColor;
        ctx.lineWidth = isHovered ? 1.5 : 1;

        // Horizontal dash
        ctx.beginPath();
        ctx.moveTo(pt.x - halfDash, pt.y);
        ctx.lineTo(pt.x + halfDash, pt.y);
        ctx.stroke();

        // Vertical tick
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y - halfDash);
        ctx.lineTo(pt.x, pt.y + halfDash);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      parentContainer.removeEventListener('mousemove', handleMouseMove as any);
      parentContainer.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [
    gridSpacing,
    dashLength,
    interactionRadius,
    maxDeflection,
    resolvedBaseColor,
    resolvedActiveColor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
