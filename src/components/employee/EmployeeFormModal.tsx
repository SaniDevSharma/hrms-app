import { useState } from 'react';
import type { Employee } from '../../types';
import GlassCard from '../ui/GlassCard';
import FloatingLabelInput from '../ui/FloatingLabelInput';
import FloatingLabelSelect from '../ui/FloatingLabelSelect';

interface EmployeeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Partial<Employee>;
    setEmployee: React.Dispatch<React.SetStateAction<Partial<Employee>>>;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fa-regular fa-id-card' },
    { id: 'personal', label: 'Personal', icon: 'fa-solid fa-user' },
    { id: 'address', label: 'Address', icon: 'fa-solid fa-map-location-dot' },
    { id: 'professional', label: 'Professional', icon: 'fa-solid fa-briefcase' },
    { id: 'bank', label: 'Bank & Statutory', icon: 'fa-solid fa-building-columns' },
];

export default function EmployeeFormModal({
    isOpen,
    onClose,
    employee,
    setEmployee,
    onSubmit,
    isEditMode,
}: EmployeeFormModalProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [isPIIVisible, setIsPIIVisible] = useState(false);

    const handleTogglePII = () => {
        if (!isPIIVisible) {
            const confirmed = confirm(
                '⚠️ WARNING: You are about to reveal sensitive PII data.\n\n' +
                'This action is logged for compliance purposes.\n' +
                'Ensure you are authorized to view this information.\n\n' +
                'Do you want to proceed?'
            );
            if (!confirmed) return;
        }
        setIsPIIVisible(!isPIIVisible);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <GlassCard className="w-full max-w-6xl max-h-[90vh] flex flex-col relative z-10 animate-slide-up overflow-hidden !p-0">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                            {isEditMode ? 'Edit Employee Details' : 'Onboard New Employee'}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {isEditMode ? `Updating record for ${employee.employeeId}` : 'Fill in the information below'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleTogglePII}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isPIIVisible
                                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                }`}
                        >
                            <i className={`fa-solid ${isPIIVisible ? 'fa-eye-slash' : 'fa-lock'} mr-2`}></i>
                            {isPIIVisible ? 'Hide Sensitive Data' : 'Reveal Sensitive Data'}
                        </button>
                        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-20 sm:w-64 bg-slate-50/50 dark:bg-slate-800/30 border-r border-slate-100 dark:border-slate-700 p-2 sm:p-4 space-y-2 overflow-y-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                                    ? 'bg-white dark:bg-slate-700 text-cyan-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                title={tab.label}
                            >
                                <i className={`${tab.icon} w-5 text-center text-lg sm:text-base`}></i>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white/40 dark:bg-slate-900/20">

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                                    <div className="relative group">
                                        <img src={employee.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-700 shadow-xl transition-transform group-hover:scale-105" />
                                        <button type="button" className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity backdrop-blur-[2px]">
                                            <i className="fa-solid fa-camera text-xl"></i>
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FloatingLabelInput
                                                label="Employee ID"
                                                value={employee.employeeId || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, employeeId: e.target.value })}
                                                required
                                            />
                                            <FloatingLabelSelect
                                                label="Status"
                                                value={employee.status || 'Active'}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployee({ ...employee, status: e.target.value as 'Active' | 'Inactive' })}
                                                options={[
                                                    { value: 'Active', label: 'Active' },
                                                    { value: 'Inactive', label: 'Inactive' }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FloatingLabelInput
                                        label="Full Name"
                                        icon="fa-regular fa-user"
                                        value={employee.name || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, name: e.target.value })}
                                        required
                                    />
                                    <FloatingLabelInput
                                        label="Email Address"
                                        icon="fa-regular fa-envelope"
                                        type="email"
                                        value={employee.email || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, email: e.target.value })}
                                        required
                                        masked={!isPIIVisible}
                                    />
                                    <FloatingLabelSelect
                                        label="Department"
                                        icon="fa-regular fa-building"
                                        value={employee.department || ''}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployee({ ...employee, department: e.target.value })}
                                        required
                                        options={[
                                            { value: 'Engineering', label: 'Engineering' },
                                            { value: 'Product', label: 'Product' },
                                            { value: 'Marketing', label: 'Marketing' },
                                            { value: 'Human Resources', label: 'Human Resources' },
                                            { value: 'Sales', label: 'Sales' },
                                            { value: 'Design', label: 'Design' }
                                        ]}
                                    />
                                    <FloatingLabelInput
                                        label="Designation"
                                        icon="fa-solid fa-briefcase"
                                        value={employee.role || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, role: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Personal Tab */}
                        {activeTab === 'personal' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
                                    <i className="fa-solid fa-user-circle text-cyan-500"></i> Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FloatingLabelInput
                                        label="Date of Birth"
                                        type="date"
                                        value={employee.dob || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, dob: e.target.value })}
                                        masked={!isPIIVisible}
                                    />
                                    <FloatingLabelSelect
                                        label="Gender"
                                        value={employee.gender || ''}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployee({ ...employee, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                                        options={[
                                            { value: 'Male', label: 'Male' },
                                            { value: 'Female', label: 'Female' },
                                            { value: 'Other', label: 'Other' }
                                        ]}
                                    />
                                    <FloatingLabelSelect
                                        label="Marital Status"
                                        value={employee.maritalStatus || ''}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployee({ ...employee, maritalStatus: e.target.value as 'Single' | 'Married' | 'Divorced' })}
                                        options={[
                                            { value: 'Single', label: 'Single' },
                                            { value: 'Married', label: 'Married' },
                                            { value: 'Divorced', label: 'Divorced' }
                                        ]}
                                    />
                                    <FloatingLabelInput
                                        label="Blood Group"
                                        value={employee.bloodGroup || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, bloodGroup: e.target.value })}
                                    />
                                    <FloatingLabelInput
                                        label="Father's Name"
                                        value={employee.fatherName || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, fatherName: e.target.value })}
                                        masked={!isPIIVisible}
                                    />
                                    <FloatingLabelInput
                                        label="Phone Number"
                                        type="tel"
                                        icon="fa-solid fa-phone"
                                        value={employee.phone || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, phone: e.target.value })}
                                        masked={!isPIIVisible}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Address Tab */}
                        {activeTab === 'address' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-map-pin text-cyan-500"></i> Current Address
                                    </h3>
                                    <div className="relative">
                                        {!isPIIVisible ? (
                                            <div className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 flex items-center h-[98px]">
                                                ••••••••••••••••••••••••
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={3}
                                                value={employee.currentAddress || ''}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmployee({ ...employee, currentAddress: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                                                placeholder="Enter full address including street, city, state and zip code..."
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-house text-cyan-500"></i> Permanent Address
                                    </h3>
                                    <div className="relative">
                                        {!isPIIVisible ? (
                                            <div className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 flex items-center h-[98px]">
                                                ••••••••••••••••••••••••
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={3}
                                                value={employee.permanentAddress || ''}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmployee({ ...employee, permanentAddress: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                                                placeholder="Enter full address including street, city, state and zip code..."
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Professional Tab */}
                        {activeTab === 'professional' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
                                    <i className="fa-solid fa-briefcase text-cyan-500"></i> Work Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FloatingLabelInput
                                        label="Date of Joining"
                                        type="date"
                                        value={employee.joinDate || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, joinDate: e.target.value })}
                                    />
                                    <FloatingLabelSelect
                                        label="Employment Type"
                                        value={employee.employmentType || ''}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployee({ ...employee, employmentType: e.target.value as 'Full-time' | 'Contract' | 'Intern' })}
                                        options={[
                                            { value: 'Full-time', label: 'Full-time' },
                                            { value: 'Contract', label: 'Contract' },
                                            { value: 'Intern', label: 'Intern' }
                                        ]}
                                    />
                                    <FloatingLabelInput
                                        label="Reporting Manager ID"
                                        value={employee.managerId || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, managerId: e.target.value })}
                                    />
                                    <FloatingLabelInput
                                        label="Work Location"
                                        icon="fa-solid fa-location-dot"
                                        value={employee.location || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, location: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Bank Tab */}
                        {activeTab === 'bank' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-file-invoice text-cyan-500"></i> Statutory Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FloatingLabelInput
                                            label="PAN Number"
                                            value={employee.pan || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, pan: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="Aadhar Number"
                                            value={employee.aadhar || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, aadhar: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="UAN"
                                            value={employee.uan || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, uan: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="PF Number"
                                            value={employee.pfNumber || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, pfNumber: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-building-columns text-cyan-500"></i> Bank Account Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FloatingLabelInput
                                            label="Bank Name"
                                            value={employee.bankName || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, bankName: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="Account Number"
                                            value={employee.accountNumber || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, accountNumber: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="IFSC Code"
                                            value={employee.ifscCode || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, ifscCode: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                        <FloatingLabelInput
                                            label="Branch Name"
                                            value={employee.branchName || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, branchName: e.target.value })}
                                            masked={!isPIIVisible}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-3 z-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-xl font-bold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
                    >
                        {isEditMode ? 'Update Employee' : 'Save Employee'}
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
