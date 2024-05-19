import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface AppBarElement {
    title: string;
    route: string;
}

interface NavButtonsProps {
    appBarElements: AppBarElement[];
}

const NavButtons: React.FC<NavButtonsProps> = ({ appBarElements }) => {
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;

    return (
        <Box sx={{ flexGrow: 5, display: { xs: 'flex', md: 'flex' } }}>
            {appBarElements.map((page) => (
                <Button
                    key={page.title}
                    sx={{ backgroundColor: (currentRoute === page.route) ? '' : '#272B2F', color: 'black' }}
                    variant="text"
                    onClick={() => navigate(page.route)}
                >
                    {page.title}
                </Button>
            ))}
        </Box>
    );
};

export default NavButtons;
