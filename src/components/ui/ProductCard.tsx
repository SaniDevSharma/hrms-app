import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    stagger?: number;
}

export default function ProductCard({ product, stagger }: ProductCardProps) {
    return (
        <Link
            to={product.route}
            className={`group glass-card rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-slide-up ${stagger ? `stagger-${stagger}` : ''}`}
            style={stagger ? { opacity: 0 } : undefined}
        >
            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fa-solid ${product.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {product.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {product.description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:gap-3 transition-all">
                <span>Open Module</span>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        </Link>
    );
}
