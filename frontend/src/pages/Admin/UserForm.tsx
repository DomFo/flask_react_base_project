import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { StyledForm, StyledFormErrorLabel } from '../../components/form/StyledForm';


import { User, UserRole } from '../../types/User';

import { DropDownFromEnum } from '../../components/form/DropDownFromEnum';
import { FormHandles } from './CreateEditUserDialog';
import { TextInput } from '../../components/form/TextInput';
import { apiCreateUser, apiUpdateUser } from '../../services/backend/Users';



interface UserFormProps {
    user?: User;
    setRole: React.Dispatch<React.SetStateAction<UserRole>>;
}


export const UserForm = forwardRef<FormHandles, UserFormProps>(({ user, setRole }, ref) => {
    const queryClient = useQueryClient();
    const hasSubmitted = useRef(false);

    // form states
    const [username, setUsername] = useState(user ? user.username : '');
    const role = UserRole.USER;


    // error states
    const [usernameError, setUsernameError] = useState('');
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
        } else {
            // Reset to defaults when user is not provided
            setUsername('');
        }
    }, [user]);

    useImperativeHandle(ref, () => ({
        handleSubmit: () => {
            onSubmit();
        }
    }));

    const addUserMutation = useMutation(apiCreateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const updateUserMutation = useMutation(apiUpdateUser as (user: Partial<User>) => Promise<void>, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const clearForm = () => {
        setUsername('');
        setUsernameError('');
        setFormError('');
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onSubmit = async () => {
        hasSubmitted.current = true;
        console.log("email: ", username);
        console.log("role: ", role);

        const userData = {
            email: username,
            role: role,
        };
        try {
            if (user) {
                await updateUserMutation.mutateAsync(userData);
            } else {
                await addUserMutation.mutateAsync(userData);
            }
            clearForm();
        } catch (error: any) {
            if (error instanceof Error) {
                if (error.message.toLowerCase().includes("email" && "exists")) {
                    setUsernameError(error.message);
                }
                else {
                    setFormError(error.message);
                }
                return;
            }
        }
    };

    return (
        <StyledForm noValidate>
            {formError && <StyledFormErrorLabel>{formError}</StyledFormErrorLabel>}
            <DropDownFromEnum
                value={role}
                label='Role'
                setValue={setRole}
                options={UserRole}

            />
            <TextInput
                required={user ? false : true}
                disabled={user ? true : false}
                error={usernameError ? true : false}
                helperText={usernameError}
                onChange={handleUsernameChange}
                value={username}
            />
        </StyledForm>
    );
});