import React, { ChangeEvent, useState } from 'react';
import { styled } from '@mui/system';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export const TextInput = styled(TextField)({
    minWidth: '250px',
    maxWidth: '350px',
    borderRadius: '5px',
    paddingBottom: '10px',
    boxShadow: "0 0 0 0px transparent inset",
    '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
    },
    '& input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
    },
});


interface PasswordInputProps {
    label?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => {  // Destructure toggable from props
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <TextInput
            type={showPassword ? 'text' : 'password'}
            label={label || 'Password'}
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>)
            }}
        />
    );
};