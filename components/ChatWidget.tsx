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
          if (window.innerWidth < 768 && newWidth > 100) { // Only center when expanded on mobile
            const maxMobileWidth = window.innerWidth * 0.95;
            newWidth = Math.min(newWidth, maxMobileWidth);
            newHeight = (newHeight / e.data.width) * newWidth; // Maintain aspect ratio
            const leftPos = (window.innerWidth - newWidth) / 2;
            iframe.style.left = leftPos + 'px';
            iframe.style.right = 'auto';
          } else if (window.innerWidth >= 768) {
            iframe.style.left = 'auto';
            iframe.style.right = '20px';
          }
          iframe.style.width = newWidth + 'px';
          iframe.style.height = newHeight + 'px';
          iframe.style.borderRadius = newWidth > 100 ? '24px' : '50px';
          iframe.style.zIndex = '2147483647';
          iframe.style.pointerEvents = 'auto';
        }
      }
    };

    const handleWindowResize = () => {
      const iframe = document.getElementById('chatWidget');
      if (iframe && window.innerWidth < 768 && parseInt(iframe.style.width) > 100) {
        // Re-center if expanded on resize (e.g., orientation change)
        const currentWidth = parseInt(iframe.style.width);
        const leftPos = (window.innerWidth - currentWidth) / 2;
        iframe.style.left = leftPos + 'px';
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleWindowResize);
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