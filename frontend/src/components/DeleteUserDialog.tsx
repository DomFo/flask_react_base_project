import React from "react";
import { User } from "../types/User";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useMutation, useQueryClient } from "react-query";
import { apiDeleteUser } from "../services/backend/Users";



interface DeleteUserDialogProps {
    open: boolean;
    handleClose: () => void;
    user?: User;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, handleClose, user }) => {

    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation(apiDeleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const onClose = () => {
        handleClose();
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user) {
                await deleteUserMutation.mutateAsync(user.id);
            }
        } catch (error: any) {
            return;
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Delete User"}</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit} noValidate>
                    <p>Are you sure you want to delete this user?</p>
                    <p>{user?.username}</p>
                    <p>This cannot be undone!</p>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" color="error">Delete</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};