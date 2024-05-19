import React from 'react';
import { CenteredContent } from '../components/ContentLayouts';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = CenteredContent;

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <HomePage>
            <h1>Welcome to the Home Page</h1>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/login');
            }}>Login</Button>
        </HomePage>
    );
};

export default Home;