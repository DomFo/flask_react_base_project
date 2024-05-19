import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)(() => ({
    fontWeight: 800,
    textDecoration: 'underline',
    color: 'inherit',
    '&:visited': {
        color: 'inherit',
    },
    '&:hover': {
        textDecoration: 'none',
    },
}));