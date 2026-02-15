import { useState, useCallback } from 'react';
import { useCrudMaster } from '../hooks/useCrudMaster';
import { useMasterTable } from '../hooks/useMasterTable';
import type { Employee } from '../types';
import employeesData from '../data/employees.json';
import GlassCard from '../components/ui/GlassCard';
import MasterToolbar from '../components/ui/MasterToolbar';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import ActionButtons from '../components/ui/ActionButtons';
import EmptyState from '../components/ui/EmptyState';
import EmployeeFormModal from '../components/employee/EmployeeFormModal';

export default function EmployeeMaster() {
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

    const {
        items: employees,
        isModalOpen,
        isEditMode,
        currentItem: currentEmployee,
        setCurrentItem: setCurrentEmployee,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        closeModal,
    } = useCrudMaster<Employee>({
        initialData: employeesData as Employee[],
        defaultValues: {
            status: 'Active',
            avatar: `https://ui-avatars.com/api/?name=New+Employee&background=random`,
        },
    });

    const filterPredicate = useCallback((employee: Employee, term: string) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(term.toLowerCase()) ||
            employee.email.toLowerCase().includes(term.toLowerCase()) ||
            employee.role.toLowerCase().includes(term.toLowerCase()) ||
            employee.employeeId.toLowerCase().includes(term.toLowerCase());

        const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;

        return matchesSearch && matchesStatus;
    }, [statusFilter]);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginatedData: paginatedEmployees,
        filteredData: filteredEmployees,
    } = useMasterTable({ data: employees, filterPredicate });

    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <MasterToolbar
                    title="Employee Master"
                    subtitle="Manage your organization's workforce"
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search employees..."
                    addButtonLabel="Add Employee"
                    onAdd={handleAdd}
                >
                    <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                        {(['All', 'Active', 'Inactive'] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setStatusFilter(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${statusFilter === filter
                                    ? 'bg-white dark:bg-slate-700 text-cyan-600 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </MasterToolbar>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role & Dept</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedEmployees.map((employee) => (
                                <tr key={employee.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-200">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-700 shadow-md group-hover:scale-105 transition-transform" />
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center ${employee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                                                    }`}>
                                                    <i className="fa-solid fa-check text-[8px] text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{employee.name}</p>
                                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded inline-block mt-1">{employee.employeeId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <p className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                                <i className="fa-solid fa-briefcase text-cyan-500/50 text-xs"></i>
                                                {employee.role}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                <i className="fa-solid fa-building text-slate-400 text-xs"></i>
                                                {employee.department}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                <i className="fa-solid fa-phone text-slate-400 text-xs"></i>
                                                ******
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                <i className="fa-solid fa-envelope text-slate-400 text-xs"></i>
                                                ******
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={employee.status} />
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">
                                            {new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-0.5">
                                            {employee.location}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <ActionButtons
                                            onEdit={() => handleEdit(employee)}
                                            onDelete={() => handleDelete(employee.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredEmployees.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    totalItems={filteredEmployees.length}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />

                {filteredEmployees.length === 0 && (
                    <EmptyState
                        icon="fa-solid fa-users-slash"
                        title="No employees found"
                        message="Try adjusting your search or filters"
                    />
                )}
            </GlassCard>

            <EmployeeFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                employee={currentEmployee}
                setEmployee={setCurrentEmployee}
                onSubmit={handleSubmit}
                isEditMode={isEditMode}
            />
        </div>
    );
}
