import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5em',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    borderRadius: '12px',
});