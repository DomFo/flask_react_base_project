import React from 'react';
import { CircularProgress } from '@mui/material';
import { CenteredContent } from './ContentLayouts';

const PageLoadSuspense: React.FC = () => {
    return (
        <CenteredContent>
            <CircularProgress />
        </CenteredContent>
    );
};

export default PageLoadSuspense;