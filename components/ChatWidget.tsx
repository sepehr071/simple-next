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
        const newWidth = e.data.width;
        const newHeight = e.data.height;
        if (isExpanded) {
          if (window.innerWidth < 768) {
            // Mobile: full width, partial height (like bottom sheet)
            iframe.style.cssText = `
              position:fixed;left:0;right:0;bottom:0;
              width:100%;height:80%; /* adjust height % as needed */
              border-radius:24px 24px 0 0; /* rounded top corners */
              z-index:2147483647;
            `;
            document.body.style.overflow = 'hidden';
          } else {
            // Desktop expanded
            iframe.style.cssText = `
              position:fixed;right:20px;bottom:20px;width:${newWidth}px;height:${newHeight}px;border-radius:24px;z-index:2147483647;
            `;
          }
        } else {
          // Collapsed (mobile & desktop same)
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

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
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