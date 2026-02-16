import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import keycloak from '../keycloak';
import type { KeycloakProfile } from 'keycloak-js';

interface AuthContextType {
    isAuthenticated: boolean;
    user: KeycloakProfile | undefined;
    token: string | undefined;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<KeycloakProfile | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                console.log('Initializing Keycloak...');
                const authenticated = await keycloak.init({
                    onLoad: 'login-required',
                    pkceMethod: 'S256',
                    checkLoginIframe: false,
                });

                console.log('Keycloak init success. Authenticated:', authenticated);
                setIsAuthenticated(authenticated);
                setToken(keycloak.token);

                if (authenticated) {
                    const profile = await keycloak.loadUserProfile();
                    setUser(profile);
                    console.log('User profile loaded:', profile);
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
            } finally {
                setLoading(false);
            }
        };

        initKeycloak();
    }, []);

    const login = () => {
        keycloak.login();
    };

    const logout = () => {
        keycloak.logout({ redirectUri: window.location.origin });
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
