'use client';

import { useEffect, useState } from 'react';

type Offender = {
  tag: string;
  className: string;
  left: number;
  right: number;
  width: number;
  path: string;
};

export function OverflowDebugger() {
  const [offenders, setOffenders] = useState<Offender[]>([]);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const scan = () => {
      const docWidth = document.documentElement.clientWidth;
      setViewportWidth(docWidth);

      const all = document.querySelectorAll('*');
      const found: Offender[] = [];

      all.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1 || rect.left < -1) {
          // Bangun "path" singkat biar gampang cari elemennya di kode
          let path = el.tagName.toLowerCase();
          if (el.id) path += `#${el.id}`;
          if (el.className && typeof el.className === 'string') {
            path += `.${el.className.split(' ').slice(0, 2).join('.')}`;
          }

          found.push({
            tag: el.tagName,
            className: typeof el.className === 'string' ? el.className : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            path,
          });
        }
      });

      // Urutkan dari yang paling parah overflow-nya
      found.sort(
        (a, b) => Math.abs(b.right - docWidth) - Math.abs(a.right - docWidth)
      );
      setOffenders(found.slice(0, 15)); // Ambil 15 teratas biar gak kebanyakan
    };

    // Scan setelah render selesai + animasi Framer Motion settle
    const timer = setTimeout(scan, 1500);
    window.addEventListener('resize', scan);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', scan);
    };
  }, []);

  if (offenders.length === 0) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          right: 10,
          zIndex: 999999,
          background: 'rgba(0,150,0,0.95)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: 8,
          fontSize: 12,
          fontFamily: 'monospace',
        }}
      >
        ✅ Tidak ada elemen overflow (viewport: {viewportWidth}px)
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        left: 10,
        right: 10,
        maxHeight: '50vh',
        overflowY: 'auto',
        zIndex: 999999,
        background: 'rgba(0,0,0,0.95)',
        color: '#91ff02',
        padding: '10px',
        borderRadius: 8,
        fontSize: 11,
        fontFamily: 'monospace',
        lineHeight: 1.5,
      }}
    >
      <div style={{ color: 'white', marginBottom: 6 }}>
        ⚠️ Viewport: {viewportWidth}px — {offenders.length} elemen overflow:
      </div>
      {offenders.map((o, i) => (
        <div
          key={i}
          style={{
            marginBottom: 8,
            borderBottom: '1px solid #333',
            paddingBottom: 6,
          }}
        >
          <div style={{ color: '#ff6b6b' }}>
            {i + 1}. {o.path}
          </div>
          <div>
            left: {o.left} | right: {o.right} | width: {o.width}
          </div>
        </div>
      ))}
    </div>
  );
}
