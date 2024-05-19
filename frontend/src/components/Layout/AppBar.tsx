import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Switch } from '@mui/material';


interface AppBarElement {
    title: string;
    route: string;
}


const CustomAppBar: React.FC = () => {

    const { user, onLogout } = useContext(AuthContext) ?? {};
    const { toggleTheme, mode } = useTheme() ?? {};



    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;

    const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleCloseUserMenu();
        setTimeout(() => {
            navigate("/profile");
        }, 100);  // TODO: Get to the root cause of why the appbar and authprovider are re-rendering multiple times
    }

    const handleAccountClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("Account clicked");
        handleCloseUserMenu();
    }
    const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleCloseUserMenu();
        if (onLogout) {
            onLogout();
        }
        navigate("/");
    }

    const settings = [
        {
            title: "Profile",
            callback: handleProfileClick
        },
        {
            title: "Account",
            callback: handleAccountClick
        },
        {
            title: "Logout",
            callback: handleLogoutClick
        }];

    const appBarElements: AppBarElement[] = []

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        console.log('close')
        setAnchorElUser(null);
        console.log('closed')
    };

    return (
        <AppBar position="fixed"  // 'absolute'| 'fixed'| 'relative'| 'static'| 'sticky'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box sx={{ padding: '0px 16px' }}>
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        onClick={() => { navigate('/'); }}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'flex' },
                            justifyContent: 'flex-start',
                            gap: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 36,
                                width: 36,
                                maxHeight: { xs: 192, md: 192 },
                                maxWidth: { xs: 192, md: 192 },
                            }}
                            alt="ICON"
                            src="/vite.svg"
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                        >
                            Flask + React + Vite Base App
                        </Typography>
                    </Box>
                    {user ?
                        <Box sx={{ flexGrow: 5, display: { xs: 'flex', md: 'flex' } }}>
                            {appBarElements.map((page) => (
                                <Button
                                    sx={{ backgroundColor: (currentRoute === page.route) ? '' : '#272B2F', color: 'black' }}
                                    variant='text'
                                    key={page.title}
                                    onClick={() => {
                                        navigate(page.route);
                                    }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box> : null}
                    {
                        !user ?
                            <Box sx={{
                                flexGrow: 1,
                                gap: 2,
                                display: { xs: 'flex', md: 'flex', justifyContent: 'flex-end' }
                            }}>
                                <Switch
                                    checked={mode === 'dark'}
                                    onChange={toggleTheme}
                                    inputProps={{ 'aria-label': 'controlled' }} />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    key="login"
                                    onClick={() => {
                                        navigate('/login');
                                    }}>
                                    Login
                                </Button>
                            </Box>
                            : <Box sx={{ flexGrow: 1, gap: 2, display: { xs: 'flex', md: 'flex', justifyContent: 'flex-end', alignItems: 'center' } }}>
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
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                                        onClick={(e) => { handleOpenUserMenu(e) }}>
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
                    }
                </Toolbar >
            </Box >
        </AppBar >
    );
}
export default CustomAppBar;