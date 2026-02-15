import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy-loaded pages for code splitting
const Login = lazy(() => import('./pages/Login'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EmployeeMaster = lazy(() => import('./pages/EmployeeMaster'));
const DepartmentMaster = lazy(() => import('./pages/DepartmentMaster'));
const DesignationMaster = lazy(() => import('./pages/DesignationMaster'));
const LocationMaster = lazy(() => import('./pages/LocationMaster'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<LandingPage />} />
              <Route element={<DashboardLayout />}>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
