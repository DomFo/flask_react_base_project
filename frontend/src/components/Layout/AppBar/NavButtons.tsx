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
    console.log(currentRoute);

    return (
        <Box sx={{
            gap: 1,
            flexGrow: 5,
            display: { xs: 'flex', md: 'flex' }
        }}>
            {appBarElements.map((page) => (
                <Button
                    key={page.title}
                    sx={{
                        fontWeight: currentRoute === page.route ? 900 : 'inherit',
                    }}
                    variant='text'
                    color={currentRoute === page.route ? "secondary" : "inherit"}
                    onClick={() => navigate(page.route)}
                >
                    {page.title}
                </Button>
            ))}
        </Box>
    );
};

export default NavButtons;
