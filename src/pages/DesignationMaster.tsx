import { useCallback } from 'react';
import { useCrudMaster } from '../hooks/useCrudMaster';
import { useMasterTable } from '../hooks/useMasterTable';
import type { Designation } from '../types';
import designationsData from '../data/designations.json';
import GlassCard from '../components/ui/GlassCard';
import MasterToolbar from '../components/ui/MasterToolbar';
import MasterModal from '../components/ui/MasterModal';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import ActionButtons from '../components/ui/ActionButtons';
import EmptyState from '../components/ui/EmptyState';
import FloatingLabelSelect from '../components/ui/FloatingLabelSelect';
import FloatingLabelInput from '../components/ui/FloatingLabelInput';

export default function DesignationMaster() {
    const {
        items: designations,
        isModalOpen,
        isEditMode,
        currentItem: currentDesig,
        setCurrentItem: setCurrentDesig,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        closeModal,
    } = useCrudMaster<Designation>({
        initialData: designationsData as Designation[],
        defaultValues: { status: 'Active' },
    });

    const filterPredicate = useCallback((desig: Designation, term: string) => {
        return desig.name.toLowerCase().includes(term.toLowerCase()) ||
            desig.department.toLowerCase().includes(term.toLowerCase());
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginatedData: paginatedDesignations,
        filteredData: filteredDesignations,
    } = useMasterTable({ data: designations, filterPredicate });

    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <MasterToolbar
                    title="Designation Master"
                    subtitle="Manage employee designations and roles"
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search designations..."
                    addButtonLabel="Add Designation"
                    onAdd={handleAdd}
                />

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Designation</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Department</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Level</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedDesignations.map((desig) => (
                                <tr key={desig.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                                <i className="fa-solid fa-briefcase text-xs"></i>
                                            </div>
                                            <span className="font-bold text-slate-800 dark:text-white">{desig.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                                        {desig.department}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            {desig.level}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={desig.status} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <ActionButtons
                                            onEdit={() => handleEdit(desig)}
                                            onDelete={() => handleDelete(desig.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredDesignations.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    totalItems={filteredDesignations.length}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />

                {filteredDesignations.length === 0 && (
                    <EmptyState
                        icon="fa-solid fa-briefcase"
                        title="No designations found"
                        message="Try adjusting your search criteria"
                    />
                )}
            </GlassCard>

            <MasterModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditMode ? 'Edit Designation' : 'Add New Designation'}
            >
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <FloatingLabelInput
                        label="Designation Name"
                        value={currentDesig.name || ''}
                        onChange={(e) => setCurrentDesig({ ...currentDesig, name: e.target.value })}
                        required
                    />
                    <FloatingLabelSelect
                        label="Department"
                        value={currentDesig.department || ''}
                        onChange={(e) => setCurrentDesig({ ...currentDesig, department: e.target.value })}
                        options={[
                            { value: 'Engineering', label: 'Engineering' },
                            { value: 'Product Management', label: 'Product Management' },
                            { value: 'Human Resources', label: 'Human Resources' },
                            { value: 'Marketing', label: 'Marketing' },
                        ]}
                    />
                    <FloatingLabelSelect
                        label="Level"
                        value={currentDesig.level || ''}
                        onChange={(e) => setCurrentDesig({ ...currentDesig, level: e.target.value })}
                        options={[
                            { value: 'Intern', label: 'Intern' },
                            { value: 'Junior', label: 'Junior' },
                            { value: 'Associate', label: 'Associate' },
                            { value: 'Senior', label: 'Senior' },
                            { value: 'Lead', label: 'Lead' },
                            { value: 'Manager', label: 'Manager' },
                            { value: 'Director', label: 'Director' },
                        ]}
                    />
                    <FloatingLabelSelect
                        label="Status"
                        value={currentDesig.status || 'Active'}
                        onChange={(e) => setCurrentDesig({ ...currentDesig, status: e.target.value as 'Active' | 'Inactive' })}
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all">
                            {isEditMode ? 'Update Designation' : 'Save Designation'}
                        </button>
                    </div>
                </form>
            </MasterModal>
        </div>
    );
}
