'use client';

import { useState, useEffect } from 'react';
import { tracks } from './tracks';

export default function Home() {
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [displayTrack, setDisplayTrack] = useState<string | null>(null);

  const startRandomization = () => {
    setIsRandomizing(true);
    setCurrentTrack(null);
    
    // Animate through random tracks
    let counter = 0;
    const maxCycles = 20;
    const interval = setInterval(() => {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      setDisplayTrack(randomTrack);
      counter++;
      
      if (counter >= maxCycles) {
        clearInterval(interval);
        const finalTrack = tracks[Math.floor(Math.random() * tracks.length)];
        setCurrentTrack(finalTrack);
        setDisplayTrack(finalTrack);
        setIsRandomizing(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent mb-4">
            Mario Kart
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            Track Randomizer
          </h2>
        </div>

        {/* Randomizer Button */}
        <div className="mb-12">
          <button
            onClick={startRandomization}
            disabled={isRandomizing}
            className={`
              relative overflow-hidden px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95
              ${isRandomizing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
              }
              text-white
            `}
          >
            {isRandomizing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Randomizing...
              </div>
            ) : (
              '🎲 Randomize Track 🎲'
            )}
          </button>
        </div>

        {/* Track Display */}
        <div className="min-h-[200px] flex items-center justify-center">
          {currentTrack || displayTrack ? (
            <div className="space-y-6">
              <div className={`
                text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300
                ${isRandomizing ? 'animate-pulse' : 'animate-bounce'}
              `}>
                🏁
              </div>
              <div className={`
                text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 px-6 py-4 rounded-2xl
                ${isRandomizing 
                  ? 'bg-white/50 dark:bg-gray-800/50 animate-pulse' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                }
                transition-all duration-500
              `}>
                {displayTrack || currentTrack}
              </div>
              {!isRandomizing && currentTrack && (
                <div className="text-lg text-gray-600 dark:text-gray-400 animate-fade-in">
                  Ready to race! 🏎️
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-xl">
              Click the button to randomize a track!
            </div>
          )}
        </div>

        {/* Track Count */}
        <div className="mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-lg">
            {tracks.length} tracks available
          </p>
        </div>
      </div>
    </div>
  );
}
