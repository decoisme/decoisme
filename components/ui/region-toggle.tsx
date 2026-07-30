'use client';

import { useState } from 'react';

interface RegionToggleProps {
  onRegionChange?: (region: 'ID' | 'WW') => void;
}

export function RegionToggle({ onRegionChange }: RegionToggleProps) {
  const [region, setRegion] = useState<'ID' | 'WW'>('ID');

  const handleToggle = (newRegion: 'ID' | 'WW') => {
    if (newRegion === region) return;
    
    setRegion(newRegion);
    onRegionChange?.(newRegion);
    
    // Trigger micro-glitch effect on main content
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('region-glitch');
      setTimeout(() => {
        main.classList.remove('region-glitch');
      }, 100);
    }
  };

  return (
    <>
      <div className="flex border border-black rounded-none overflow-hidden">
        <button
          onClick={() => handleToggle('ID')}
          className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 border-r border-black ${
            region === 'ID'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-50'
          }`}
        >
          IDN
        </button>
        <button
          onClick={() => handleToggle('WW')}
          className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 ${
            region === 'WW'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-50'
          }`}
        >
          WWD
        </button>
      </div>

      {/* Micro-glitch effect styles */}
      <style jsx global>{`
        @keyframes rgbSplitGlitch {
          0%, 100% {
            text-shadow: none;
            clip-path: none;
          }
          33% {
            text-shadow: -2px 0 #00FFFF, 2px 0 #FF0000;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          }
          66% {
            text-shadow: 2px 0 #00FFFF, -2px 0 #FF0000;
            clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          }
        }

        .region-glitch {
          animation: rgbSplitGlitch 0.1s linear;
        }

        .region-glitch * {
          animation: rgbSplitGlitch 0.1s linear;
        }
      `}</style>
    </>
  );
}

export function useRegion() {
  const [region, setRegion] = useState<'ID' | 'WW'>('ID');
  return { region, setRegion };
}
