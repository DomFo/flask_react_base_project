import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, Button, DialogTitle, DialogContent } from '@mui/material';

import { User, UserRole } from '../../types/User';

import { UserForm } from './UserForm';


export interface FormHandles {
    handleSubmit: () => void;
}

interface UserDialogProps {
    open: boolean;
    handleClose: () => void;
    user?: User;
}

export const CreateEditUserDialog: React.FC<UserDialogProps> = ({ open, handleClose, user }) => {
    const [role, setRole] = useState<UserRole>(user ? user.role : UserRole.USER);

    const userFormRef = React.useRef<FormHandles>(null);

    useEffect(() => {
        if (user) {
            setRole(user.role || UserRole.USER);
        } else {
            setRole(UserRole.USER);
        }
    }, [user]);


    const onClose = () => {
        setRole(UserRole.USER);
        handleClose();
    };

    const renderForm = () => {
        return <UserForm ref={userFormRef} user={user} setRole={setRole} />;
    }

    const handleSubmit = () => {
        if (role === UserRole.USER && userFormRef.current) {
            userFormRef.current.handleSubmit();
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {user ? "Edit User" : "Create User"}
            </DialogTitle>
            <DialogContent>
                {renderForm()}
                < DialogActions >
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="success"> {user ? "Save" : "Create"} </Button>
                </DialogActions>
            </DialogContent>
        </Dialog >
    );
};