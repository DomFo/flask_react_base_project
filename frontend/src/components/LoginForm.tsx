import React, { useState } from 'react'
import { styled, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

import { Link } from './ui/Link';
import { TextInput, PasswordInput } from './form/TextInput';

import { StyledFormCard, StyledFormErrorLabel, StyleFormLabel, FormSubmitButton } from './form/StyledForm';

const StyledLoginForm = styled('form')({
    gap: '1em',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',
    width: 300,

});


interface LoginFormProps {
    handleLogin: (username: string, password: string, remember_be: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember_me, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loginButtonText, setLoginButtonText] = useState('Log In');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoginButtonText('Logging in...');
        try {
            await handleLogin(username, password, remember_me);
            setLoginButtonText('Log In');
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message); // This will log the error message string
                setError(err.message);
            } else {
                console.log(err); // If err is not an instance of Error, log the entire thing
                setError('An unexpected error occurred');
            }
            setLoginButtonText('Log In');
        }
        setLoading(false);
    };

    return (
        <StyledFormCard>
            <StyledLoginForm
                onSubmit={(e) => onSubmit(e)}
                noValidate
            >
                <StyleFormLabel >Login</StyleFormLabel>
                {error &&
                    <StyledFormErrorLabel>
                        {error}
                    </StyledFormErrorLabel>}
                <FormGroup>
                    <TextInput
                        label="Username"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <PasswordInput
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember_me}
                                onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Remember me" />
                </FormGroup>
                <FormSubmitButton disabled={loading}>{loginButtonText}</FormSubmitButton>
                <Link sx={{ textAlign: 'left', marginTop: '1em', fontWeight: 400 }} to="/password-reset">Forgot Password?</Link>
            </StyledLoginForm>
        </StyledFormCard>
    )
}

export default LoginForm