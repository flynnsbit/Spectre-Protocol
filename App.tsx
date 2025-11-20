import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_GAME_CODE } from './constants';

export default function App() {
  const [code] = useState(INITIAL_GAME_CODE);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe content on mount
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
       <iframe 
         ref={iframeRef}
         title="Spectre Protocol"
         className="w-full h-full border-none block"
         sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
         allow="autoplay; fullscreen"
       />
    </div>
  );
}