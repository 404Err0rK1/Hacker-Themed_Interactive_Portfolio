import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Unlock } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  const [showCursor, setShowCursor] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [typedText, setTypedText] = useState('');

  const fullText = 'Welcome to I HateHumans v1.0';

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(onStart, 1500);
  };

  return (
    <div className="font-mono text-green-400 flex flex-col items-center justify-center h-screen bg-black p-4">
      <div className="text-center mb-8">
        <Terminal size={64} className="mb-4 mx-auto" />
        <h1 className="text-4xl mb-4 glitch" data-text={typedText}>
          {typedText}
          {showCursor && <span className="animate-pulse">▋</span>}
        </h1>
        <p className="text-xl mb-8">Your gateway to the digital frontier</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-400 blur opacity-25 animate-pulse"></div>
        <button
          onClick={handleUnlock}
          className="relative px-6 py-3 bg-black text-green-400 border-2 border-green-400 rounded-md hover:bg-green-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          {unlocked ? (
            <Unlock className="inline-block mr-2" />
          ) : (
            <Lock className="inline-block mr-2" />
          )}
          {unlocked ? 'ACCESS GRANTED' : 'UNLOCK SYSTEM'}
        </button>
      </div>

      <div className="text-sm text-gray-500 mt-8">
        <p>© 2035 I hate humans. All rights reserved.</p>
        <p>Warning: Unauthorized access is prohibited</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
