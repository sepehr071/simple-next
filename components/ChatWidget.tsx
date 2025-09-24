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
            const maxMobileWidth = window.innerWidth * 0.95;
            newWidth = Math.min(newWidth, maxMobileWidth);
            newHeight = (newHeight / e.data.width) * newWidth; // Maintain aspect ratio
          }
          iframe.style.width = newWidth + 'px';
          iframe.style.height = newHeight + 'px';
          iframe.style.borderRadius = newWidth > 100 ? '24px' : '50px';
          iframe.style.zIndex = '2147483647';
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
    <iframe
      id="chatWidget"
      src="https://web-widget-v2-livid.vercel.app/"
      style={{
        border: 'none',
        position: 'fixed' as const,
        bottom: '20px',
        right: '20px',
        width: '100px',
        height: '100px',
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        zIndex: 2147483647,
        pointerEvents: 'auto',
      }}
      allow="microphone"
      scrolling="no"
    />
  );
}