'use client';

const GoldCoin = ({ style, delay }: { style: React.CSSProperties, delay: string }) => (
    <div className="absolute top-0 animate-fall" style={{ ...style, animationDelay: delay }}>
        <svg width="20" height="20" viewBox="0 0 24 24" className="animate-coin-to-rupee" style={{ animationDelay: delay }}>
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFD700' }} />
                    <stop offset="100%" style={{ stopColor: '#FFA500' }} />
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="1" />
            <text x="12" y="15" textAnchor="middle" fontSize="8" fill="#8B4513" fontWeight="bold">₹</text>
        </svg>
    </div>
);

const RupeeNote = ({ style, delay }: { style: React.CSSProperties, delay: string }) => (
    <div className="absolute bottom-0 animate-rupee-show" style={{ ...style, animationDelay: delay }}>
        <svg width="60" height="30" viewBox="0 0 100 50">
            <rect width="100" height="50" rx="5" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="1" />
            <text x="50" y="30" textAnchor="middle" fontSize="16" fill="#00796B" fontWeight="bold">₹</text>
        </svg>
    </div>
);

export default function GoldToRupeeAnimation() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[9999]">
            {[...Array(15)].map((_, i) => {
                const coinDelay = `${i * 0.15}s`;
                const coinStyle = { left: `${Math.random() * 95}%` };
                return <GoldCoin key={`coin-${i}`} style={coinStyle} delay={coinDelay} />;
            })}
             {[...Array(8)].map((_, i) => {
                const rupeeDelay = `${1.5 + i * 0.2}s`;
                const rupeeStyle = { left: `${Math.random() * 90}%` };
                return <RupeeNote key={`rupee-${i}`} style={rupeeStyle} delay={rupeeDelay} />;
            })}
        </div>
    );
}