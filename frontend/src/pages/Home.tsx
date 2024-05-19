import React from 'react';
import { CenteredContent } from '../components/ContentLayouts';

const HomePage = CenteredContent;

const Home: React.FC = () => {
    return (
        <HomePage>
            <h1>Welcome to the Home Page</h1>
        </HomePage>
    );
};

export default Home;