import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen clean-bg transition-colors duration-300">
            {/* Animated Background Blobs */}
            <div className="blob bg-cyan-300 dark:bg-cyan-800 w-[500px] h-[500px] rounded-full -top-20 -left-20"></div>
            <div className="blob bg-indigo-300 dark:bg-indigo-800 w-[600px] h-[600px] rounded-full top-1/3 -right-40" style={{ animationDelay: '2s' }}></div>
            <div className="blob bg-purple-300 dark:bg-purple-800 w-[400px] h-[400px] rounded-full bottom-20 left-1/4" style={{ animationDelay: '4s' }}></div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="w-full px-4 md:px-6 py-8 max-w-[1600px] mx-auto relative z-10">
                <Outlet />
            </main>
        </div>
    );
}
