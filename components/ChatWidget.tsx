'use client';

import { useEffect, useRef } from 'react';

export default function ChatWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let isExpanded = false;

    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'widgetResize') {
        isExpanded = e.data.width > 100;
        let newWidth = e.data.width;
        let newHeight = e.data.height;
        if (window.innerWidth < 768 && isExpanded) {
          // Mobile: Full screen
          iframe.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;border-radius:0;z-index:2147483647;
          `;
          document.body.style.overflow = 'hidden';
        } else if (isExpanded) {
          // Desktop expanded
          iframe.style.cssText = `
            position:fixed;right:20px;bottom:20px;width:${newWidth}px;height:${newHeight}px;border-radius:24px;z-index:2147483647;
          `;
        } else {
          // Collapsed
          iframe.style.cssText = `
            position:fixed;right:20px;bottom:20px;width:100px;height:100px;border-radius:50px;z-index:2147483647;
          `;
          document.body.style.overflow = '';
        }
      } else if (e.data.type === 'widgetClose') {
        document.body.style.overflow = '';
        isExpanded = false;
      }
    };

    const handleWindowResize = () => {
      if (isExpanded && window.innerWidth < 768) {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
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
      ref={iframeRef}
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
      }}
      allow="microphone"
      scrolling="no"
    />
  );
}