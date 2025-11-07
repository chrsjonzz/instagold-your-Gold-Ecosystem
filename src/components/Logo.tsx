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
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
             <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                    result="glow"
                />
                <feComposite in="glow" in2="SourceGraphic" operator="over" />
            </filter>
        </defs>
        <g transform="translate(5, 5)" filter="url(#logoGlow)">
            {/* Body and Head */}
            <path 
                fill="url(#goldGradient)"
                d="M55.2,42.5c-3.8-3.8-6-8.2-6.2-13.2c-0.2-5,1.6-9.8,5-13.2c1.9-1.9,4.4-3,7-3.2c2.1-0.2,4.2,0.3,6.1,1.4
                c1.9,1.1,3.4,2.8,4.4,4.8c1,2,1.5,4.2,1.3,6.3c-0.2,2.6-1.3,5.1-3.2,7s-4.4,3-7,3.2C59.2,42.5,57.1,42.2,55.2,42.5z"
            />
            {/* Beak */}
             <path
                fill="url(#goldGradient)"
                d="M75,18.5c0.6,0,1.2-0.2,1.7-0.6c1.1-0.8,1.4-2.3,0.6-3.4l0,0c-0.8-1.1-2.3-1.4-3.4-0.6c-0.5,0.4-0.9,0.9-1.1,1.5
                c-0.3,0.6-0.3,1.3-0.1,1.9C73.1,18,74,18.5,75,18.5z"
            />
            {/* Tail */}
            <path
                fill="url(#goldGradient)"
                d="M55,42.5 C 50 55, 45 75, 50 85 C 55 95, 65 90, 60 80 C 55 70, 58 55, 55 42.5z"
            />
             <path
                fill="url(#goldGradient)"
                d="M58,45.5 C 53 58, 48 78, 53 88 C 58 98, 68 93, 63 83 C 58 73, 61 58, 58 45.5z"
            />
             {/* Wings */}
            <path
                fill="url(#goldGradient)"
                d="M50,30 C 40 20, 20 10, 10 15 C 0 20, 15 35, 25 45 C 35 55, 45 40, 50 30z"
            />
            <path
                fill="url(#goldGradient)"
                d="M48,32 C 38 22, 18 12, 8 17 C -2 22, 13 37, 23 47 C 33 57, 43 42, 48 32z"
            />
            <path
                fill="url(#goldGradient)"
                d="M46,34 C 36 24, 16 14, 6 19 C -4 24, 11 39, 21 49 C 31 59, 41 44, 46 34z"
            />
            <path
                fill="url(#goldGradient)"
                d="M44,36 C 34 26, 14 16, 4 21 C -6 26, 9 41, 19 51 C 29 61, 39 46, 44 36z"
            />
            <path
                fill="url(#goldGradient)"
                d="M42,38 C 32 28, 12 18, 2 23 C -8 28, 7 43, 17 53 C 27 63, 37 48, 42 38z"
            />
             {/* Sparkles */}
            <path fill="#FDE047" d="M30 55 l 2 -4 l 2 4 l -4 -2 z" />
            <path fill="#FDE047" d="M25 60 l 1 -3 l 1 3 l -2 -1.5 z" />
            <path fill="#FDE047" d="M35 50 l 1.5 -3 l 1.5 3 l -3 -1.5 z" />
        </g>
    </svg>
);


export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2 text-2xl font-bold font-headline text-primary", className)}>
            <PhoenixIcon className="h-10 w-10" />
            <span>InstaGold</span>
        </div>
    );
};
