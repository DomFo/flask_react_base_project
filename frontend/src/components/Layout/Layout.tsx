import React, { Suspense } from 'react';
import { Outlet } from "react-router-dom";
import { styled } from '@mui/system';
import { Paper } from '@mui/material';

import CustomAppBar from './AppBar';
import PageLoadSuspense from '../PageLoadSuspense';




const AppLayout = styled(Paper)({
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
});



const Layout: React.FC = () => {
    return (
        <AppLayout>
            <CustomAppBar />
            <Suspense fallback={<PageLoadSuspense />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
};

export default Layout;