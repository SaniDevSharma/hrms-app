import { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface FloatingLabelSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    icon?: string;
    masked?: boolean;
    error?: string;
}

export default function FloatingLabelSelect({ label, options, icon, error, masked, className = '', ...props }: FloatingLabelSelectProps) {
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
                {masked ? (
                    <div className={`
                         w-full bg-transparent outline-none
                         text-slate-800 dark:text-white font-medium
                         ${icon ? 'pl-3 pr-4' : 'px-4'} py-2.5 flex items-center
                    `}>
                        ••••••••
                    </div>
                ) : (
                    <select
                        {...props}
                        className={`
                            w-full bg-transparent outline-none
                            text-slate-800 dark:text-white font-medium
                            appearance-none cursor-pointer
                            focus:bg-white dark:focus:bg-slate-800
                            ${icon ? 'pl-3 pr-10' : 'px-4 pr-10'} py-2.5
                        `}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                    >
                        <option value="" disabled>Select {label}</option>
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                )}
                {!masked && (
                    <div className="absolute right-4 pointer-events-none text-slate-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
        </div>
    );
}
