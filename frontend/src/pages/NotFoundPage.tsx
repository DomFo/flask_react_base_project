import React from 'react';
import { CenteredContent } from '../components/ContentLayouts';

const HomePage = CenteredContent;

const Home: React.FC = () => {
    return (
        <HomePage>
            <h1>Oh no! How did we end up here?</h1>
            <p>Sorry, we couldn't find the page you were looking for.</p>
        </HomePage>
    );
};

export default Home;