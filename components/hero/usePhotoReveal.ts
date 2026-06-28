import { useRef, useEffect, useCallback } from 'react';

// --- usePhotoReveal hook ---
interface UsePhotoRevealOptions {
  src: string;
  width: number;
  height: number;
}

const BRUSH_STAMPS = [
  { dx: 0, dy: 0, r: 55 },
  { dx: 28, dy: -18, r: 38 },
  { dx: -32, dy: 12, r: 42 },
  { dx: 18, dy: 35, r: 35 },
  { dx: -20, dy: -38, r: 30 },
  { dx: 40, dy: 20, r: 28 },
  { dx: -10, dy: 50, r: 25 },
  { dx: 50, dy: -10, r: 22 },
];

export function usePhotoReveal({ src, width, height }: UsePhotoRevealOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement>(null);
  const colorCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement>(null);
  const colorImgRef = useRef<HTMLImageElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  // --- drawGrayscale ---
  const drawGrayscale = useCallback(() => {
    const canvas = grayCanvasRef.current;
    const img = colorImgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = Math.max(
      width / img.naturalWidth,
      height / img.naturalHeight
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offX = (width - drawW) / 2;
    const offY = (height - drawH) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'grayscale(100%)';
    ctx.drawImage(img, offX, offY, drawW, drawH);
    ctx.filter = 'none';
  }, [width, height]);

  // --- drawColorReveal ---
  const drawColorReveal = useCallback(() => {
    const canvas = colorCanvasRef.current;
    const mask = maskRef.current;
    const img = colorImgRef.current;
    if (!canvas || !mask || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = Math.max(
      width / img.naturalWidth,
      height / img.naturalHeight
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offX = (width - drawW) / 2;
    const offY = (height - drawH) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offX, offY, drawW, drawH);

    // Clip by brush mask
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    // Gradient 15% bawah
    const grad = ctx.createLinearGradient(0, height, 0, height * 0.85);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  // --- paintBrush ---
  const paintBrush = useCallback(
    (x: number, y: number) => {
      const mask = maskRef.current;
      if (!mask) return;
      const ctx = mask.getContext('2d');
      if (!ctx) return;

      BRUSH_STAMPS.forEach(({ dx, dy, r }) => {
        const grd = ctx.createRadialGradient(
          x + dx,
          y + dy,
          0,
          x + dx,
          y + dy,
          r
        );
        grd.addColorStop(0, 'rgba(255,255,255,1)');
        grd.addColorStop(0.6, 'rgba(255,255,255,0.8)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      drawColorReveal();
    },
    [drawColorReveal]
  );

  // --- cancelFade ---
  const cancelFade = useCallback(() => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  }, []);

  // --- triggerFade ---
  const triggerFade = useCallback(() => {
    const mask = maskRef.current;
    if (!mask) return;
    const ctx = mask.getContext('2d');
    if (!ctx) return;

    const fade = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      drawColorReveal();

      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      if (pixel[3] > 2) {
        fadeRafRef.current = requestAnimationFrame(fade);
      } else {
        ctx.clearRect(0, 0, width, height);
        drawColorReveal();
        fadeRafRef.current = null;
      }
    };

    fadeRafRef.current = requestAnimationFrame(fade);
  }, [width, height, drawColorReveal]);

  // --- Desktop handlers ---
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      paintBrush(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY
      );
    },
    [width, height, paintBrush]
  );

  const handleMouseEnter = useCallback(() => {
    cancelFade();
  }, [cancelFade]);

  const handleMouseLeave = useCallback(() => {
    triggerFade();
  }, [triggerFade]);

  // --- Mobile handlers ---
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const touch = e.touches[0];
      const rect = wrapper.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      paintBrush(
        (touch.clientX - rect.left) * scaleX,
        (touch.clientY - rect.top) * scaleY
      );
    },
    [width, height, paintBrush]
  );

  const handleTouchStart = useCallback(() => {
    cancelFade();
  }, [cancelFade]);

  const handleTouchEnd = useCallback(() => {
    triggerFade();
  }, [triggerFade]);

  // --- Init mask canvas ---
  useEffect(() => {
    const mask = maskRef.current;
    if (!mask) return;
    mask.width = width;
    mask.height = height;
  }, [width, height]);

  // --- Load image ---
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      colorImgRef.current = img;
      drawGrayscale();
      drawColorReveal();
    };
  }, [src, drawGrayscale, drawColorReveal]);

  return {
    wrapperRef,
    grayCanvasRef,
    colorCanvasRef,
    maskRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
  };
}
