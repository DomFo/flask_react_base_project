import React, { useState } from "react";

import { Box, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { User } from "../../types/User";
import { EditButton, DeleteButton, MoreActionsProps, MoreActionsButton } from "../../components/ui/ActionButtons";

interface UserDialogProps {
    users: User[];
    handleOpenUserDialog: (user?: User) => void;
    handleOpenDeleteUserDialog: (user: User) => void;
    userActions: MoreActionsProps[];
}

export const UsersTable: React.FC<UserDialogProps> = ({ users, handleOpenUserDialog, handleOpenDeleteUserDialog, userActions }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
        <TableContainer
            sx={{ textAlign: 'left' }}
        >
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={20}>User</TableCell>
                        <TableCell width={10}>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                    ).map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Avatar alt="User Avatar" />
                            </TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell align="right">
                                <Box display='flex' justifyContent={"flex-end"}>
                                    <EditButton onClick={() => handleOpenUserDialog(user)} />
                                    <DeleteButton onClick={() => handleOpenDeleteUserDialog(user)} />
                                    <MoreActionsButton object={user} moreActions={userActions} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={7} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}