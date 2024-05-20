// src/components/CustomAppBar.tsx
import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

import { AuthContext } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import LogoTitle from './LogoTitle';
import NavButtons from './NavButtons';
import UserMenu from './UserMenu';

import { getNavs } from '../../../pages/Navs';

interface AppBarElement {
    title: string;
    route: string;
}

const CustomAppBar: React.FC = () => {
    const { user, onLogout } = useContext(AuthContext) ?? {};
    const { toggleTheme, mode } = useTheme() ?? {};

    const appBarElements: AppBarElement[] = getNavs(user?.role ?? '');
    console.log(appBarElements);

    const navigate = useNavigate();

    const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleCloseUserMenu();
        setTimeout(() => {
            navigate('/profile');
        }, 100);
    };

    const handleAccountClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleCloseUserMenu();
    };

    const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleCloseUserMenu();
        if (onLogout) {
            onLogout();
        }
        navigate('/');
    };

    const settings = [
        {
            title: 'Profile',
            callback: handleProfileClick,
        },
        {
            title: 'Account',
            callback: handleAccountClick,
        },
        {
            title: 'Logout',
            callback: handleLogoutClick,
        },
    ];


    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="fixed" // 'absolute'| 'fixed'| 'relative'| 'static'| 'sticky'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Box sx={{ padding: '0px 16px' }}>
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                }}>
                    <LogoTitle />
                    {user ? (
                        <NavButtons appBarElements={appBarElements} />
                    ) : null}

                    <Box
                        sx={{
                            gap: 2,
                            display: { xs: 'flex', md: 'flex', justifyContent: 'flex-end' },
                        }}
                    >
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        {!user ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                key="login"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        ) : (
                            <UserMenu
                                user={user}
                                settings={settings}
                                anchorElUser={anchorElUser}
                                handleOpenUserMenu={handleOpenUserMenu}
                                handleCloseUserMenu={handleCloseUserMenu}
                            />
                        )}
                    </Box>

                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default CustomAppBar;
