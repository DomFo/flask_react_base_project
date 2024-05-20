
import React, { useState } from "react";

import { useQuery } from "react-query";
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { User } from "../../types/User";
import { apiGetUsers } from "../../services/backend/Users";

import { UsersTable } from "./UserTable";

import { DeleteUserDialog } from "../../components/DeleteUserDialog";
import { StyledCard } from "../../components/ui/StyledCard";
import { CreateEditUserDialog } from "./CreateEditUserDialog";

export const UsersOverview: React.FC = () => {
    const { data: users, isLoading } = useQuery<User[]>(
        'users',
        apiGetUsers,
        {
            retry: false,
            cacheTime: 1000 * 60 * 15,
            onError: (error) => {
                console.log(error);
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 2,
        });

    console.log(users);

    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const userActions = [
        {
            title: 'Reset Password',
            callback: (user: User) => { console.log('Action "Reset Password" on user ', user) }
        },
        {
            title: 'Send Confirmation Mail',
            callback: (user: User) => { console.log('Action "Send Confirmation Mail" on user ', user) }
        },
    ];


    const handleOpenUserDialog = (selectedUser?: User) => {
        setSelectedUser(selectedUser || null);
        setIsUserDialogOpen(true);
    };

    const handleCloseUserDialog = () => {
        setIsUserDialogOpen(false);
        setSelectedUser(null);
    };


    const handleOpenDeleteUserDialog = (selectedUser: User) => {
        setSelectedUser(selectedUser);
        setIsDeleteUserDialogOpen(true);
    };

    return (
        <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant="h6" component="div">
                    User Management
                </Typography>
                {!isLoading &&
                    <Button variant="outlined" onClick={() => handleOpenUserDialog()}>
                        Add User
                    </Button>
                }
            </Box>

            <CreateEditUserDialog
                open={isUserDialogOpen}
                handleClose={handleCloseUserDialog}
                user={selectedUser || undefined}
            />
            <DeleteUserDialog
                open={isDeleteUserDialogOpen}
                handleClose={() => setIsDeleteUserDialogOpen(false)}
                user={selectedUser || undefined}
            />
            {isLoading ? <CircularProgress /> :
                <UsersTable
                    users={users!}
                    handleOpenUserDialog={handleOpenUserDialog}
                    handleOpenDeleteUserDialog={handleOpenDeleteUserDialog}
                    userActions={userActions}
                />
            }
        </StyledCard>
    );
}

export default UsersOverview;