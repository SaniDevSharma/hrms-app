import keycloak from '../keycloak';

const API_BASE_URL = 'http://localhost:8080/api'; // TODO: Replace with your actual API base URL

/**
 * Creates headers with Keycloak Bearer token for authenticated API calls.
 */
function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (keycloak.token) {
        headers['Authorization'] = `Bearer ${keycloak.token}`;
    }

    return headers;
}

/**
 * Refreshes Keycloak token if it's about to expire (within 30 seconds).
 * Call this before every API request.
 */
async function ensureFreshToken(): Promise<void> {
    try {
        await keycloak.updateToken(30); // Refresh if expiring within 30s
    } catch {
        // Token refresh failed — redirect to login
        keycloak.login();
    }
}

/**
 * Generic GET request with Keycloak auth.
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
    await ensureFreshToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`GET ${endpoint} failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Generic POST request with Keycloak auth.
 */
export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
    await ensureFreshToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`POST ${endpoint} failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Generic PUT request with Keycloak auth.
 */
export async function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
    await ensureFreshToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`PUT ${endpoint} failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Generic DELETE request with Keycloak auth.
 */
export async function apiDelete(endpoint: string): Promise<void> {
    await ensureFreshToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`DELETE ${endpoint} failed: ${response.status} ${response.statusText}`);
    }
}
