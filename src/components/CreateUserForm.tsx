import { useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';

const userUrl = import.meta.env.VITE_USER_URL;

const CreateUserForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
    });

    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setStatus('saving');

        axios.post(`${userUrl}/users/`, {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            is_admin: formData.isAdmin,
        })
            .then(() => setStatus('saved'))
            .catch(() => setStatus('error'));
    };

    return (
        <div>
            <h1> Add User </h1>
        
            <form onSubmit={handleSubmit}>
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
                    Add User
                </button>
                {status === 'saved' && <p>Changes saved.</p>}
                {status === 'error' && <p>Failed to save changes.</p>}
            </form>
        </div>
    );
};

export default CreateUserForm;