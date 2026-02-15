import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductCard } from '../../data/landingPageData';

export default function ProductCardComponent({ product, index }: { product: ProductCard; index: number }) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % product.images.length);
        }, 4000 + index * 500);
        return () => clearInterval(interval);
    }, [product.images.length, index]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`glass-card rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden group relative`}
        >
            <div className="card-gradient absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"></div>

            {/* Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 relative">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`card-icon h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br ${product.color} rounded-xl sm:rounded-2xl text-white flex items-center justify-center shadow-lg ${product.shadowColor} transition-transform duration-300`}>
                        <i className={`${product.icon} text-base sm:text-xl`}></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">{product.name}</h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{product.subtitle}</p>
                    </div>
                </div>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[9px] sm:text-[10px] font-bold rounded-full uppercase">Active</span>
            </div>

            {/* Image Slider */}
            <div className="relative w-full h-36 sm:h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="slides w-full h-full">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={activeSlide}
                            src={product.images[activeSlide]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute w-full h-full object-cover`}
                            alt={product.name}
                            loading="lazy"
                        />
                    </AnimatePresence>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <Link
                    to={product.route}
                    className="absolute inset-0 flex items-end justify-center pb-4 sm:pb-6 opacity-0 group-hover:opacity-100 sm:transition-all sm:duration-300 z-20"
                >
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 sm:px-8 py-2 sm:py-3 bg-gradient-to-r ${product.color} text-white rounded-full text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2`}
                    >
                        <span>Launch App</span> <i className="fa-solid fa-arrow-right"></i>
                    </motion.span>
                </Link>
                {/* Mobile tap indicator */}
                <Link
                    to={product.route}
                    className="sm:hidden absolute bottom-2 right-2 h-8 w-8 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-lg z-20"
                >
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 dark:text-slate-300"></i>
                </Link>
            </div>

            {/* Features */}
            <div className="p-4 sm:p-6 flex-grow relative">
                <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 mb-2 sm:mb-3 font-bold uppercase tracking-widest">Key Features</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.features.map((feature) => (
                        <span key={feature.label} className={`feature-card px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg ${feature.bgClass} ${feature.textClass} text-[10px] sm:text-xs font-semibold border`}>
                            {feature.label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
