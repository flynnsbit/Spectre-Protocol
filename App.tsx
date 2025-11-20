import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_GAME_CODE } from './constants';
import { modifyGameCode } from './services/geminiService';

export default function App() {
  const [code, setCode] = useState(INITIAL_GAME_CODE);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // update iframe content when code changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  const handleUpdate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
        const newCode = await modifyGameCode(code, prompt);
        setCode(newCode);
        setPrompt('');
    } catch (e) {
        console.error(e);
        alert('Error updating code. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="h-14 px-4 border-b border-gray-700 flex justify-between items-center bg-gray-800 shrink-0">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <h1 className="text-lg font-bold tracking-wide font-mono text-gray-200">GEMINI GAME STUDIO</h1>
        </div>
        <div className="text-xs font-mono text-gray-400 px-3 py-1 rounded bg-gray-700/50 border border-gray-600">
            Spectre Protocol // Active
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-gray-700 bg-gray-950">
           <div className="flex-1 relative">
               <textarea 
                 className="absolute inset-0 w-full h-full bg-transparent text-gray-300 font-mono p-4 text-sm resize-none focus:outline-none leading-relaxed"
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 spellCheck={false}
               />
           </div>
           
           {/* AI Input Area */}
           <div className="p-4 bg-gray-900 border-t border-gray-700 shrink-0">
             <div className="flex flex-col gap-2">
               <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</label>
               <div className="flex gap-2">
                   <input 
                     type="text" 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && !loading && handleUpdate()}
                     placeholder="E.g., Make the enemies move faster..."
                     className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-gray-200 placeholder-gray-500"
                     disabled={loading}
                   />
                   <button 
                     onClick={handleUpdate}
                     disabled={loading || !prompt.trim()}
                     className="bg-pink-600 hover:bg-pink-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded text-sm font-semibold transition-colors flex items-center gap-2 min-w-[100px] justify-center"
                   >
                     {loading ? (
                         <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                     ) : 'Generate'}
                   </button>
               </div>
             </div>
           </div>
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 bg-black relative">
           <iframe 
             ref={iframeRef}
             title="Game Preview"
             className="w-full h-full border-none block"
             sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
           />
        </div>
      </div>
    </div>
  );
}
