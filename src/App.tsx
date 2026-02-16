import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EmployeeMaster = lazy(() => import('./pages/EmployeeMaster'));
const DepartmentMaster = lazy(() => import('./pages/DepartmentMaster'));
const DesignationMaster = lazy(() => import('./pages/DesignationMaster'));
const LocationMaster = lazy(() => import('./pages/LocationMaster'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-5">
        {/* Branded spinner */}
        <div className="relative w-14 h-14 mx-auto">
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <i className="fa-solid fa-cubes text-white text-xs"></i>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Loading</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Please wait...</p>
        </div>
        {/* Shimmer skeleton preview */}
        <div className="w-64 mx-auto space-y-3 pt-2">
          <div className="h-3 rounded-full shimmer"></div>
          <div className="h-3 rounded-full shimmer w-3/4"></div>
          <div className="h-3 rounded-full shimmer w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<LandingPage />} />
                <Route element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee-master" element={<EmployeeMaster />} />
                  <Route path="/departments" element={<DepartmentMaster />} />
                  <Route path="/designations" element={<DesignationMaster />} />
                  <Route path="/locations" element={<LocationMaster />} />
                  <Route path="/payroll" element={<Dashboard />} />
                  <Route path="/vms" element={<Dashboard />} />
                  <Route path="/travel" element={<Dashboard />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
