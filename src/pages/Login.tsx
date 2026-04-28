import { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm';
import '../css/Login.css';

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        login(email)
            .then(() => navigate('/home'))
            .catch(() => setError('User not found. Try again!'));
    };

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    // eslint-disable-next-line
    }, [user]);

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button onClick={handleLogin}>Login</button>
                <CreateUserForm />
            </div>
        </div>
    );
};

export default Login;