import { apiGet, apiPost, apiPut, apiDelete } from './api';
import type { Department } from '../types';

const ENDPOINT = '/departments'; // TODO: Replace with your actual endpoint

/**
 * Fetch all departments from the API.
 */
export async function fetchDepartments(): Promise<Department[]> {
    return apiGet<Department[]>(ENDPOINT);
}

/**
 * Create a new department.
 */
export async function createDepartment(department: Omit<Department, 'id'>): Promise<Department> {
    return apiPost<Department>(ENDPOINT, department);
}

/**
 * Update an existing department.
 */
export async function updateDepartment(id: string, department: Partial<Department>): Promise<Department> {
    return apiPut<Department>(`${ENDPOINT}/${id}`, department);
}

/**
 * Delete a department by ID.
 */
export async function deleteDepartment(id: string): Promise<void> {
    return apiDelete(`${ENDPOINT}/${id}`);
}
