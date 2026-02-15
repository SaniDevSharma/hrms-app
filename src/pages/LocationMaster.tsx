import { useCallback } from 'react';
import { useCrudMaster } from '../hooks/useCrudMaster';
import { useMasterTable } from '../hooks/useMasterTable';
import type { Location } from '../types';
import locationsData from '../data/locations.json';
import GlassCard from '../components/ui/GlassCard';
import MasterToolbar from '../components/ui/MasterToolbar';
import MasterModal from '../components/ui/MasterModal';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import ActionButtons from '../components/ui/ActionButtons';
import EmptyState from '../components/ui/EmptyState';
import FloatingLabelInput from '../components/ui/FloatingLabelInput';
import FloatingLabelSelect from '../components/ui/FloatingLabelSelect';

export default function LocationMaster() {
    const {
        items: locations,
        isModalOpen,
        isEditMode,
        currentItem: currentLocation,
        setCurrentItem: setCurrentLocation,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        closeModal,
    } = useCrudMaster<Location>({
        initialData: locationsData as Location[],
        defaultValues: { status: 'Active', country: 'India' },
    });

    const filterPredicate = useCallback((loc: Location, term: string) => {
        return loc.name.toLowerCase().includes(term.toLowerCase()) ||
            loc.city.toLowerCase().includes(term.toLowerCase());
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginatedData: paginatedLocations,
        filteredData: filteredLocations,
    } = useMasterTable({ data: locations, filterPredicate });

    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <MasterToolbar
                    title="Location Master"
                    subtitle="Manage office locations and branches"
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search locations..."
                    addButtonLabel="Add Location"
                    onAdd={handleAdd}
                />

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Location Name</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">City & State</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedLocations.map((loc) => (
                                <tr key={loc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                    <td className="p-4">
                                        <p className="font-bold text-slate-800 dark:text-white">{loc.name}</p>
                                        <p className="text-xs text-slate-500">{loc.address}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-map-pin text-cyan-500 text-xs"></i>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">{loc.city}, {loc.state}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={loc.status} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <ActionButtons
                                            onEdit={() => handleEdit(loc)}
                                            onDelete={() => handleDelete(loc.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredLocations.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    totalItems={filteredLocations.length}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />

                {filteredLocations.length === 0 && (
                    <EmptyState
                        icon="fa-solid fa-map-location-dot"
                        title="No locations found"
                        message="Try adjusting your search criteria"
                    />
                )}
            </GlassCard>

            <MasterModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditMode ? 'Edit Location' : 'Add New Location'}
            >
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <FloatingLabelInput
                        label="Location Name"
                        value={currentLocation.name || ''}
                        onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
                        required
                    />
                    <FloatingLabelInput
                        label="Address"
                        value={currentLocation.address || ''}
                        onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FloatingLabelInput
                            label="City"
                            value={currentLocation.city || ''}
                            onChange={(e) => setCurrentLocation({ ...currentLocation, city: e.target.value })}
                            required
                        />
                        <FloatingLabelInput
                            label="State"
                            value={currentLocation.state || ''}
                            onChange={(e) => setCurrentLocation({ ...currentLocation, state: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FloatingLabelInput
                            label="Country"
                            value={currentLocation.country || ''}
                            onChange={(e) => setCurrentLocation({ ...currentLocation, country: e.target.value })}
                            required
                        />
                        <FloatingLabelSelect
                            label="Status"
                            value={currentLocation.status || 'Active'}
                            onChange={(e) => setCurrentLocation({ ...currentLocation, status: e.target.value as 'Active' | 'Inactive' })}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all">
                            {isEditMode ? 'Update Location' : 'Save Location'}
                        </button>
                    </div>
                </form>
            </MasterModal>
        </div>
    );
}
