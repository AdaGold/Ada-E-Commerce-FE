import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../Hooks/useAuth';

const userUrl = import.meta.env.VITE_USER_URL;

const UserForm = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        isAdmin: user?.isAdmin ?? false,
    });

    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('saving');

        axios.put(`${userUrl}/users/${user?.id}`, {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            is_admin: formData.isAdmin,
        })
            .then(() => setStatus('saved'))
            .catch(() => setStatus('error'));
    };

    if (!user) return <p>No user logged in.</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID</label>
                <input type="text" value={user.id} disabled />
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                    Admin
                </label>
            </div>
            <button type="submit" disabled={status === 'saving'}>
                {status === 'saving' ? 'Saving...' : 'Update'}
            </button>
            {status === 'saved' && <p>Changes saved.</p>}
            {status === 'error' && <p>Failed to save changes.</p>}
        </form>
    );
};

export default UserForm;
