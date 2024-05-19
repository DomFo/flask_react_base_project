import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CenteredContent } from '../components/ContentLayouts';
import LoginForm from '../components/LoginForm';

import { AuthContext } from '../context/AuthContext';

const LoginPage = CenteredContent;

interface OriginState {
    from: { pathname: string };
}

const Login: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const origin = (location.state as OriginState)?.from?.pathname || '/';

    const handleLogin = async (username: string, password: string, remember_me: boolean) => {
        if (authContext === null) throw new Error('AuthContext is null');
        await authContext.onLogin(username, password, remember_me);
        navigate(origin);
    };

    return (
        <LoginPage>
            <LoginForm handleLogin={handleLogin} />
        </LoginPage >
    );
};

export default Login;