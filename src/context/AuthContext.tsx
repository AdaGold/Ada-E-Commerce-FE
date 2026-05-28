import { useState } from 'react';
import axios from 'axios';
import type { User } from '../types.ts';
import { AuthContext } from '../Hooks/useAuth.ts';
import { useCart } from '../Hooks/useCart.ts';

const userUrl = import.meta.env.VITE_USER_URL;


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { clearCart } = useCart();

    const login = (email: string): Promise<void> => {
        return axios.get(`${userUrl}/users/email`, { params: { email } })
            .then(({ data }) => {
                const fetchedUser = data;
                setUser({
                    id: String(fetchedUser.id),
                    firstName: fetchedUser.first_name,
                    lastName: fetchedUser.last_name,
                    email: fetchedUser.email,
                    isAdmin: fetchedUser.is_admin // Map snake_case to camelCase
                });
            })
    };
    
    const logout = () => {
        setUser(null);
        clearCart();
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

