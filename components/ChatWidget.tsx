'use client';

import { useEffect, useState } from 'react';

export default function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'widgetResize') {
        setIsExpanded(e.data.width > 100);
        const iframe = document.getElementById('chatWidget');
        if (iframe) {
          let newWidth = e.data.width;
          let newHeight = e.data.height;
          if (window.innerWidth < 768 && isExpanded) {
            const maxMobileWidth = window.innerWidth * 0.95;
            newWidth = Math.min(newWidth, maxMobileWidth);
            newHeight = (newHeight / e.data.width) * newWidth; // Maintain aspect ratio
            iframe.style.left = 'auto';
            iframe.style.right = '2.5%';
            iframe.style.bottom = '20px';
          } else {
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
      if (iframe) {
        if (isExpanded && window.innerWidth < 768) {
          const currentWidth = parseInt(iframe.style.width) || 100;
          const maxMobileWidth = window.innerWidth * 0.95;
          let newWidth = Math.min(currentWidth, maxMobileWidth);
          let currentHeight = parseInt(iframe.style.height) || 100;
          let newHeight = (currentHeight / currentWidth) * newWidth;
          iframe.style.width = newWidth + 'px';
          iframe.style.height = newHeight + 'px';
          iframe.style.left = 'auto';
          iframe.style.right = '2.5%';
          iframe.style.bottom = '20px';
        } else if (!isExpanded) {
          iframe.style.left = 'auto';
          iframe.style.right = '20px';
        }
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isExpanded]);

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