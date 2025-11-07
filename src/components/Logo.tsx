import { cn } from "@/lib/utils";

const PhoenixIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className={cn("overflow-visible", className)}
        {...props}
    >
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
        </defs>
        
        {/* Body and Tail */}
        <path 
            fill="url(#goldGradient)" 
            d="M100 55 C 110 70, 115 90, 100 120 C 85 90, 90 70, 100 55"
        />
        <path 
            fill="url(#goldGradient)" 
            d="M100 120 C 90 140, 80 155, 70 170 C 90 165, 110 165, 130 170 C 120 155, 110 140, 100 120"
            style={{
                filter: 'drop-shadow(0 2px 4px rgba(217, 119, 6, 0.4))'
            }}
        />

        {/* Head */}
        <path 
            fill="url(#goldGradient)" 
            d="M100 55 C 95 45, 95 35, 100 30 C 105 35, 105 45, 100 55"
        />
        <circle cx="100" cy="30" r="3" fill="#D97706"/>


        {/* Left Wing - Animated */}
        <g className="animate-wing-flap-left" style={{ transformOrigin: '100px 80px' }}>
            <path 
                fill="url(#goldGradient)"
                d="M100 80 C 70 70, 40 90, 20 120 C 50 110, 75 100, 100 80"
            />
            <path 
                fill="url(#goldGradient)"
                d="M60 95 C 40 100, 20 120, 10 140 C 30 130, 50 120, 60 95"
                 style={{
                    opacity: 0.8
                }}
            />
        </g>

        {/* Right Wing - Animated */}
        <g className="animate-wing-flap-right" style={{ transformOrigin: '100px 80px' }}>
            <path 
                fill="url(#goldGradient)"
                d="M100 80 C 130 70, 160 90, 180 120 C 150 110, 125 100, 100 80"
            />
             <path 
                fill="url(#goldGradient)"
                d="M140 95 C 160 100, 180 120, 190 140 C 170 130, 150 120, 140 95"
                style={{
                    opacity: 0.8
                }}
            />
        </g>
    </svg>
);


export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-1 text-2xl font-bold font-headline text-primary", className)}>
            <PhoenixIcon className="h-12 w-12" />
            <span>InstaGold</span>
        </div>
    );
};
