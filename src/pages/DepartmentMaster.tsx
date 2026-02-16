import { useState, useEffect, useCallback } from 'react';
import { useMasterTable } from '../hooks/useMasterTable';
import type { Department } from '../types';
import {
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} from '../services/departmentService';
import GlassCard from '../components/ui/GlassCard';
import MasterToolbar from '../components/ui/MasterToolbar';
import MasterModal from '../components/ui/MasterModal';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import ActionButtons from '../components/ui/ActionButtons';
import EmptyState from '../components/ui/EmptyState';
import FloatingLabelInput from '../components/ui/FloatingLabelInput';
import FloatingLabelSelect from '../components/ui/FloatingLabelSelect';

const DEFAULT_DEPARTMENT: Partial<Department> = { status: 'Active', employeeCount: 0 };

export default function DepartmentMaster() {
    // ─── Data State ─────────────────────────────────────────
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // ─── Modal State ────────────────────────────────────────
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentDept, setCurrentDept] = useState<Partial<Department>>(DEFAULT_DEPARTMENT);

    // ─── Fetch departments from API on mount ────────────────
    const loadDepartments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDepartments();
            setDepartments(data);
        } catch (err) {
            console.error('Failed to load departments:', err);
            setError(err instanceof Error ? err.message : 'Failed to load departments');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDepartments();
    }, [loadDepartments]);

    // ─── CRUD Handlers ──────────────────────────────────────
    const handleAdd = () => {
        setIsEditMode(false);
        setCurrentDept({ ...DEFAULT_DEPARTMENT });
        setIsModalOpen(true);
    };

    const handleEdit = (dept: Department) => {
        setIsEditMode(true);
        setCurrentDept({ ...dept });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;
        try {
            await deleteDepartment(id);
            setDepartments(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error('Failed to delete department:', err);
            alert('Failed to delete department. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEditMode && currentDept.id) {
                const updated = await updateDepartment(currentDept.id, currentDept);
                setDepartments(prev =>
                    prev.map(d => (d.id === currentDept.id ? updated : d))
                );
            } else {
                const { id: _id, ...body } = currentDept as Department;
                const created = await createDepartment(body);
                setDepartments(prev => [...prev, created]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Failed to save department:', err);
            alert('Failed to save department. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const closeModal = () => setIsModalOpen(false);

    // ─── Table helpers ──────────────────────────────────────
    const filterPredicate = useCallback((dept: Department, term: string) => {
        return dept.name.toLowerCase().includes(term.toLowerCase()) ||
            dept.headOfDepartment.toLowerCase().includes(term.toLowerCase());
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginatedData: paginatedDepartments,
        filteredData: filteredDepartments,
    } = useMasterTable({ data: departments, filterPredicate });

    // ─── Render ─────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <MasterToolbar
                    title="Department Master"
                    subtitle="Manage organizational departments"
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search departments..."
                    addButtonLabel="Add Department"
                    onAdd={handleAdd}
                />

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center space-y-4">
                            <div className="relative w-12 h-12 mx-auto">
                                <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-slate-700"></div>
                                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-500 animate-spin"></div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Loading departments...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Failed to load departments</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{error}</p>
                            </div>
                            <button
                                onClick={loadDepartments}
                                className="px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded-xl transition-all"
                            >
                                <i className="fa-solid fa-rotate-right mr-2"></i>Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                {!loading && !error && (
                    <>
                        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Department Name</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Head of Dept</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Employees</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {paginatedDepartments.map((dept) => (
                                        <tr key={dept.id} className="table-row-hover hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                                                        <i className="fa-solid fa-building text-xs"></i>
                                                    </div>
                                                    <span className="font-bold text-slate-800 dark:text-white">{dept.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                                        {dept.headOfDepartment.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-slate-600 dark:text-slate-300">{dept.headOfDepartment}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                                                {dept.employeeCount} Members
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge status={dept.status} />
                                            </td>
                                            <td className="p-4 text-right">
                                                <ActionButtons
                                                    onEdit={() => handleEdit(dept)}
                                                    onDelete={() => handleDelete(dept.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredDepartments.length / itemsPerPage)}
                            onPageChange={setCurrentPage}
                            totalItems={filteredDepartments.length}
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={setItemsPerPage}
                        />

                        {filteredDepartments.length === 0 && (
                            <EmptyState
                                icon="fa-solid fa-building"
                                title="No departments found"
                                message="Try adjusting your search criteria"
                            />
                        )}
                    </>
                )}
            </GlassCard>

            <MasterModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditMode ? 'Edit Department' : 'Add New Department'}
            >
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <FloatingLabelInput
                        label="Department Name"
                        value={currentDept.name || ''}
                        onChange={(e) => setCurrentDept({ ...currentDept, name: e.target.value })}
                        required
                    />
                    <FloatingLabelInput
                        label="Head of Department"
                        value={currentDept.headOfDepartment || ''}
                        onChange={(e) => setCurrentDept({ ...currentDept, headOfDepartment: e.target.value })}
                        required
                    />
                    <FloatingLabelInput
                        label="Estimated Employee Count"
                        type="number"
                        value={currentDept.employeeCount?.toString() || ''}
                        onChange={(e) => setCurrentDept({ ...currentDept, employeeCount: parseInt(e.target.value) || 0 })}
                    />
                    <FloatingLabelSelect
                        label="Status"
                        value={currentDept.status || 'Active'}
                        onChange={(e) => setCurrentDept({ ...currentDept, status: e.target.value as 'Active' | 'Inactive' })}
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving && <i className="fa-solid fa-spinner animate-spin text-xs"></i>}
                            {isEditMode ? 'Update Department' : 'Save Department'}
                        </button>
                    </div>
                </form>
            </MasterModal>
        </div>
    );
}
