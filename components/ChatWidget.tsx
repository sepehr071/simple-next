'use client';

import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'widgetResize') {
        const iframe = document.getElementById('chatWidget');
        if (iframe) {
          let newWidth = e.data.width;
          let newHeight = e.data.height;
          if (window.innerWidth < 768) {
            newWidth = Math.min(newWidth, 320);
            newHeight = (newHeight / e.data.width) * newWidth; // Maintain aspect ratio
          }
          iframe.style.width = newWidth + 'px';
          iframe.style.height = newHeight + 'px';
          iframe.style.borderRadius = newWidth > 100 ? '24px' : '50px';
          iframe.style.pointerEvents = 'auto';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed' as const,
        bottom: '20px',
        right: '20px',
        zIndex: 2147483647,
        pointerEvents: 'auto',
      }}
    >
      <iframe
        id="chatWidget"
        src="https://web-widget-v2-livid.vercel.app/"
        style={{
          border: 'none',
          width: '100px',
          height: '100px',
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto',
        }}
        allow="microphone"
        scrolling="no"
      />
    </div>
  );
}