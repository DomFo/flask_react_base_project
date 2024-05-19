import React, { ReactNode } from 'react';
import { styled } from '@mui/system';

interface ContentProps {
    centered?: boolean;
}

const Content = styled('main', {
    shouldForwardProp: (prop) => prop !== 'centered',
})<ContentProps>(({ centered }) => ({
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: centered ? 'center' : 'flex-start',
    alignItems: centered ? 'center' : 'flex-start',
}));

interface ChildrenProps {
    children: ReactNode;
}

export const CenteredContent: React.FC<ChildrenProps> = ({ children }) => <Content centered>{children}</Content>;
export const TopLeftContent: React.FC<ChildrenProps> = ({ children }) => <Content>{children}</Content>;