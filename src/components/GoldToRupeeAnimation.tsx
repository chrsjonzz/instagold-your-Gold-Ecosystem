'use client';

const GoldCoin = ({ style, delay }: { style: React.CSSProperties, delay: string }) => (
    <div className="absolute top-[-40px] animate-fall" style={{ ...style, animationDelay: delay }}>
        <svg width="20" height="20" viewBox="0 0 24 24" className="animate-coin-to-rupee">
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
    <div className="absolute top-0 animate-rupee-show" style={{ ...style, animationDelay: delay }}>
        <svg width="60" height="30" viewBox="0 0 100 50">
            <rect width="100" height="50" rx="5" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="1" />
            <text x="50" y="30" textAnchor="middle" fontSize="16" fill="#00796B" fontWeight="bold">₹</text>
        </svg>
    </div>
);

export default function GoldToRupeeAnimation() {
    return (
        <div className="relative w-full h-[200px] overflow-hidden">
            {[...Array(10)].map((_, i) => {
                const delay = `${i * 0.2}s`;
                const style = { left: `${Math.random() * 90}%` };
                return <GoldCoin key={`coin-${i}`} style={style} delay={delay} />;
            })}
             {[...Array(5)].map((_, i) => {
                const delay = `${2 + i * 0.3}s`;
                const style = { left: `${Math.random() * 70}%`, top: `${Math.random() * 80}%` };
                return <RupeeNote key={`rupee-${i}`} style={style} delay={delay} />;
            })}
        </div>
    );
}
