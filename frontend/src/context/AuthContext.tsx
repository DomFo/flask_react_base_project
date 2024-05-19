import React, { ReactNode, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiLogin, apiLogout, apiGetUserSession } from '../services/backend/UserAuth';
import { User } from '../types/User';


interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    onLogin: (email: string, password: string, remember_me: boolean) => Promise<void>;
    onLogout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();


    const { data: user, isLoading, isError } = useQuery<User | null>(
        ['userSession'],
        apiGetUserSession,
        {
            retry: false,
            cacheTime: 1000 * 60 * 15,
            onError: (error) => {
                console.log(error);
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 2,
        });



    const handleLogin = async (email: string, password: string, remember_me: boolean) => {
        const user = await apiLogin(email, password, remember_me);
        queryClient.setQueryData('userSession', user);
        console.log('logged in as', user);
    };

    const handleLogout = async () => {
        console.log('logging out');
        await apiLogout();
        queryClient.setQueryData('userSession', null);
    };

    const value = useMemo(() => ({
        user: user || null,
        isLoading,
        isError,
        onLogin: handleLogin,
        onLogout: handleLogout,
    }), [user, isLoading, isError, handleLogin, handleLogout]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };