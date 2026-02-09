import { type ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
    stagger?: number;
}

export default function GlassCard({ children, className = '', animate = true, stagger }: GlassCardProps) {
    return (
        <div
            className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 ${animate ? 'animate-slide-up' : ''} ${stagger ? `stagger-${stagger}` : ''} ${className}`}
        >
            {children}
        </div>
    );
}
