import React from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface UserMenuProps {
    user: { username: string };
    settings: { title: string, callback: (e: React.MouseEvent<HTMLElement>) => void }[];
    anchorElUser: null | HTMLElement;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleCloseUserMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, settings, anchorElUser, handleOpenUserMenu, handleCloseUserMenu }) => {
    return (
        <Box sx={{ flexGrow: 1, gap: 2, display: { xs: 'flex', md: 'flex', justifyContent: 'flex-end', alignItems: 'center' } }}>
            <Box sx={{ verticalAlign: 'center' }}>
                <Typography style={{ fontWeight: 600, textAlign: 'right', verticalAlign: 'top' }}>
                    Logged in as:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <Typography style={{ fontWeight: 400, fontSize: '0.8em', textAlign: 'left', verticalAlign: 'center' }}>
                        {user.username}
                    </Typography>
                </Box>
            </Box>
            <Tooltip title="Open settings">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={handleOpenUserMenu}>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar />
                    </IconButton>
                    <KeyboardArrowDownIcon />
                </Box>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={setting.callback}>
                        <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;
