import { cn } from "@/lib/utils";

const PhoenixIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      {...props}
    >
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD700' }} />
                <stop offset="100%" style={{ stopColor: '#F5B000' }} />
            </linearGradient>
            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path
            fill="url(#goldGradient)"
            filter="url(#logoGlow)"
            d="M 85,50 A 35,35 0 1 1 50,15 H 60 L 70,25 L 60,35 H 50 V 50 H 75"
            stroke="url(#goldGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="15s"
                repeatCount="indefinite"
            />
        </path>
        <path
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            d="M 85,50 A 35,35 0 1 1 50,15 H 60 L 70,25 L 60,35 H 50 V 50 H 75"
        />
    </svg>
);


export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2 text-2xl font-bold font-headline text-primary", className)}>
            <PhoenixIcon className="h-10 w-10 text-glow" />
            <span>InstaGold</span>
        </div>
    );
};
