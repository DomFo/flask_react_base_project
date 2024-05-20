import React from "react";

import { Typography, IconButton, Tooltip, Menu, MenuItem, Box } from '@mui/material';
import { Create, DeleteOutline, MoreVert } from "@mui/icons-material";


interface EditButtonProps {
    onClick: () => void;
}
export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    return (
        <Tooltip title="Edit">
            <IconButton
                color="primary"
                onClick={onClick}
            >
                <Create />
            </IconButton>
        </Tooltip>
    );
}

interface DeleteButtonProps {
    onClick: () => void;
    disabled?: boolean;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disabled = false }) => {
    return (
        <Tooltip title="Delete">
            <span>
                <IconButton
                    color="error"
                    onClick={onClick}
                    disabled={disabled}
                >
                    <DeleteOutline />
                </IconButton>
            </span>
        </Tooltip>
    );
}

export interface MoreActionsProps {
    title: string;
    callback: (object: any) => void;
}

interface MoreActionsButtonProps {
    moreActions: MoreActionsProps[];
    object: any;
}
export const MoreActionsButton: React.FC<MoreActionsButtonProps> = ({ moreActions, object }) => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenActionsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseActionsMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box>
            <Tooltip title="More Actions">
                <IconButton
                    color="primary"
                    onClick={(e) => handleOpenActionsMenu(e)}
                >
                    <MoreVert />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseActionsMenu}
            >
                {moreActions.map((action, index) => (
                    <MenuItem key={index}
                        onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                            e.preventDefault();
                            action.callback(object);
                            handleCloseActionsMenu();
                        }}>
                        <Typography textAlign="center">{action.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}