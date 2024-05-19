import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
    },
};

const customTheme = createTheme(themeOptions);

export default customTheme;
