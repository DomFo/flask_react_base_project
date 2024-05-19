import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoTitle: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate('/')}
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
    );
};

export default LogoTitle;
