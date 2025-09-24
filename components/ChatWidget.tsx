'use client';

import { useEffect, useRef } from 'react';

export default function ChatWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let isExpanded = false;

    const setStyles = (expanded: boolean, width: number, height: number) => {
      if (window.innerWidth < 768 && expanded) {
        iframe.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;border-radius:0;z-index:2147483647;`;
        document.body.style.overflow = 'hidden';
      } else if (expanded) {
        iframe.style.cssText = `position:fixed;right:20px;bottom:20px;width:${width}px;height:${height}px;border-radius:24px;z-index:2147483647;`;
      } else {
        iframe.style.cssText = `position:fixed;right:20px;bottom:20px;width:100px;height:100px;border-radius:50px;z-index:2147483647;`;
        document.body.style.overflow = '';
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'widgetResize') {
        isExpanded = e.data.width > 100;
        setStyles(isExpanded, e.data.width, e.data.height);
      } else if (e.data.type === 'widgetClose') {
        document.body.style.overflow = '';
        isExpanded = false;
        setStyles(false, 100, 100);
      }
    };

    const handleResize = () => isExpanded && setStyles(true, parseInt(iframe.style.width) || 100, parseInt(iframe.style.height) || 100);

    window.addEventListener('message', handleMessage);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleResize);
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