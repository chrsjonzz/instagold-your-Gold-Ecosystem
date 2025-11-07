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
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="1" dy="2" result="offsetblur"/>
                <feFlood floodColor="rgba(217, 119, 6, 0.4)"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        <g filter="url(#dropShadow)">
            {/* Tail Feathers */}
            <path
                fill="url(#goldGradient)"
                stroke="#B45309"
                strokeWidth="0.5"
                d="M100 110 Q 80 140 70 175 C 90 165, 110 165, 130 175 Q 120 140 100 110 Z"
            />
            <path
                fill="url(#goldGradient)"
                stroke="#B45309"
                strokeWidth="0.5"
                d="M100 115 Q 90 135 85 160 C 95 155, 105 155, 115 160 Q 110 135 100 115 Z"
                opacity="0.8"
            />

            {/* Right Wing */}
            <g className="animate-wing-flap-right" style={{ transformOrigin: '100px 85px' }}>
                <path
                    fill="url(#goldGradient)"
                    stroke="#B45309"
                    strokeWidth="0.5"
                    d="M100 85 C 130 70, 165 90, 185 120 C 150 110, 125 100, 100 85 Z"
                />
                 <path
                    fill="url(#goldGradient)"
                    stroke="#B45309"
                    strokeWidth="0.5"
                    d="M140 95 C 160 105, 180 125, 190 145 C 170 135, 150 125, 140 95 Z"
                    opacity="0.7"
                />
            </g>
            
            {/* Body */}
            <path
                fill="url(#goldGradient)"
                stroke="#B45309"
                strokeWidth="0.5"
                d="M100 55 C 110 75, 115 95, 100 115 C 85 95, 90 75, 100 55 Z"
            />

            {/* Left Wing */}
            <g className="animate-wing-flap-left" style={{ transformOrigin: '100px 85px' }}>
                <path
                    fill="url(#goldGradient)"
                    stroke="#B45309"
                    strokeWidth="0.5"
                    d="M100 85 C 70 70, 35 90, 15 120 C 50 110, 75 100, 100 85 Z"
                />
                 <path
                    fill="url(#goldGradient)"
                    stroke="#B45309"
                    strokeWidth="0.5"
                    d="M60 95 C 40 105, 20 125, 10 145 C 30 135, 50 125, 60 95 Z"
                    opacity="0.7"
                />
            </g>

            {/* Head and Crest */}
            <path
                fill="url(#goldGradient)"
                stroke="#B45309"
                strokeWidth="0.5"
                d="M100 55 C 95 45, 95 35, 100 30 C 105 35, 105 45, 100 55 Z"
            />
            <path
                fill="url(#goldGradient)"
                stroke="#B45309"
                strokeWidth="0.5"
                d="M100 32 C 102 25, 108 22, 112 25 C 108 28, 104 32, 100 32 Z"
            />
            <circle cx="102" cy="42" r="1.5" fill="#B45309" />
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
