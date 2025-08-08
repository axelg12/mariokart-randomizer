'use client';

import { useState, useEffect } from 'react';
import { tracks } from './tracks';

export default function Home() {
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [currentTracks, setCurrentTracks] = useState<string[]>([]);
  const [displayTracks, setDisplayTracks] = useState<string[]>([]);

  const startRandomization = () => {
    setIsRandomizing(true);
    setCurrentTracks([]);

    // Animate through random tracks
    let counter = 0;
    const maxCycles = 25;
    const interval = setInterval(() => {
      // Generate 4 random tracks for display
      const randomTracks = [];
      for (let i = 0; i < 4; i++) {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        randomTracks.push(randomTrack);
      }
      setDisplayTracks(randomTracks);
      counter++;

      if (counter >= maxCycles) {
        clearInterval(interval);
        // Generate final 4 unique tracks
        const finalTracks = [];
        const usedIndices = new Set();
        while (finalTracks.length < 4) {
          const randomIndex = Math.floor(Math.random() * tracks.length);
          if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            finalTracks.push(tracks[randomIndex]);
          }
        }
        setCurrentTracks(finalTracks);
        setDisplayTracks(finalTracks);
        setIsRandomizing(false);
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full text-center px-2">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent mb-2 sm:mb-4">
            Mario Kart
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            Track Randomizer
          </h2>
        </div>

        {/* Randomizer Button */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={startRandomization}
            disabled={isRandomizing}
            className={`
              relative overflow-hidden px-8 sm:px-12 py-4 sm:py-6 rounded-full text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation
              ${
                isRandomizing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
              }
              text-white min-h-[60px] sm:min-h-[80px]
            `}
          >
            {isRandomizing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Randomizing...
              </div>
            ) : (
              '🎲 Randomize 4 Tracks 🎲'
            )}
          </button>
        </div>

        {/* Track Display */}
        <div className="min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          {currentTracks.length > 0 || displayTracks.length > 0 ? (
            <div className="space-y-4 sm:space-y-6 w-full">
              <div
                className={`
                  text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 text-center
                  ${isRandomizing ? 'animate-pulse' : 'animate-bounce'}
                `}
              >
                🏁
              </div>

              {/* Track Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
                {(displayTracks.length > 0 ? displayTracks : currentTracks).map((track, index) => (
                  <div
                    key={`${track}-${index}`}
                    className={`
                      text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 px-3 sm:px-4 py-2 sm:py-3 rounded-xl
                      ${
                        isRandomizing
                          ? 'bg-white/50 dark:bg-gray-800/50 animate-pulse'
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      }
                      transition-all duration-500
                    `}
                  >
                    {track}
                  </div>
                ))}
              </div>

              {!isRandomizing && currentTracks.length > 0 && (
                <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400 animate-fade-in">
                  Choose your track! 🏎️
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl">
              Click the button to randomize 4 tracks!
            </div>
          )}
        </div>

        {/* Track Count */}
        <div className="mt-8 sm:mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-base sm:text-lg">{tracks.length} tracks available</p>
        </div>
      </div>
    </div>
  );
}
