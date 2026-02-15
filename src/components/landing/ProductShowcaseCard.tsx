import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ProductShowcase } from '../../data/landingPageData';

export default function ProductShowcaseCard({ product }: { product: ProductShowcase }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: product.reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 overflow-hidden relative group"
        >
            <div className={`absolute ${product.reverse ? 'top-0 left-0 -translate-x-1/2' : 'top-0 right-0 translate-x-1/2'} -translate-y-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-br ${product.color}/10 rounded-full blur-3xl`}></div>
            <div className={`flex flex-col ${product.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-4 sm:gap-6 lg:gap-8 relative z-10`}>
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className={`float-animation h-11 w-11 sm:h-14 sm:w-14 bg-gradient-to-br ${product.color} rounded-xl sm:rounded-2xl text-white flex items-center justify-center shadow-lg ${product.shadowColor}`}>
                            <i className={`${product.icon} text-lg sm:text-2xl`}></i>
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{product.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed">{product.description}</p>
                    <Link to={product.route} className={`inline-flex items-center gap-2 ${product.textColor} text-sm sm:text-base font-bold hover:underline active:scale-95 transition-transform`}>
                        Launch App <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className="lg:w-2/3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                        {product.features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="bg-white/60 dark:bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                            >
                                <i className={`fa-solid ${feature.icon} ${product.featureColor} text-base sm:text-lg lg:text-xl mb-1 sm:mb-2`}></i>
                                <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">{feature.title}</h4>
                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
