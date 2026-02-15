import { useState } from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: string;
    error?: string;
    masked?: boolean;
}

export default function FloatingLabelInput({ label, icon, error, masked, className = '', ...props }: FloatingLabelInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                {label} {props.required && <span className="text-red-400">*</span>}
            </label>
            <div className={`
                relative flex items-center
                bg-slate-50 dark:bg-slate-800/50 
                border rounded-xl transition-all duration-200
                ${error
                    ? 'border-red-300 dark:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20'
                }
            `}>
                {icon && (
                    <div className={`pl-4 text-slate-400 transition-colors ${isFocused ? 'text-cyan-500' : ''}`}>
                        <i className={icon}></i>
                    </div>
                )}
                <input
                    {...props}
                    type={masked ? 'password' : props.type}
                    className={`
                        w-full bg-transparent outline-none
                        text-slate-800 dark:text-white font-medium
                        placeholder-slate-400
                        ${icon ? 'pl-3 pr-4' : 'px-4'} py-2.5
                    `}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
        </div>
    );
}
