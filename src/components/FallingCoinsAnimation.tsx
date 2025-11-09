'use client';

import { useState, useEffect } from 'react';

const COIN_COUNT = 15;

const RupeeIcon = () => (
  <span className="text-2xl font-bold text-primary/80">₹</span>
);

const GoldCoin = () => (
  <div className="relative w-7 h-7 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full shadow-lg border-2 border-yellow-600/80 animate-coin-spin">
    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
        <span className="text-sm font-bold text-amber-900/70">₹</span>
    </div>
  </div>
);


type CoinState = {
  id: number;
  landed: boolean;
  style: React.CSSProperties;
};

export default function FallingCoinsAnimation() {
  const [coins, setCoins] = useState<CoinState[]>([]);

  useEffect(() => {
    const initialCoins = Array.from({ length: COIN_COUNT }).map((_, i) => ({
      id: i,
      landed: false,
      style: {
        left: `${Math.random() * 100}%`,
        animationName: 'fall',
        animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s
        animationDelay: `${Math.random() * 5}s`,       // 0s to 5s
        animationTimingFunction: 'linear',
        animationIterationCount: '1',
      },
    }));
    setCoins(initialCoins);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setCoins(prevCoins =>
      prevCoins.map(coin => {
        if (coin.id === id && !coin.landed) {
          return {
            ...coin,
            landed: true,
            style: {
              ...coin.style,
              animationName: 'fade-out-up',
              animationDuration: '1s',
              animationDelay: '0s',
            },
          };
        }
        return coin;
      })
    );

    // After fade out, reset the coin to fall again for a continuous loop
    setTimeout(() => {
        setCoins(prevCoins =>
            prevCoins.map(coin => {
                if (coin.id === id) {
                    return {
                        id: coin.id,
                        landed: false,
                        style: {
                            left: `${Math.random() * 100}%`,
                            animationName: 'fall',
                            animationDuration: `${Math.random() * 3 + 4}s`,
                            animationDelay: `${Math.random() * 2}s`, // shorter delay for loops
                            animationTimingFunction: 'linear',
                            animationIterationCount: '1',
                        },
                    };
                }
                return coin;
            })
        );
    }, 1000); // Must match the fade-out-up animation duration
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="absolute top-[-40px]"
          style={coin.style}
          onAnimationEnd={() => handleAnimationEnd(coin.id)}
        >
          {coin.landed ? <RupeeIcon /> : <GoldCoin />}
        </div>
      ))}
    </div>
  );
}
