import { createTheme, ThemeOptions } from '@mui/material/styles';

const mainAccent = 'rgb(23, 34, 41)'
const secondaryAccent = 'rgb(120, 151, 170)'
const light = 'rgb(221, 235, 240)'
const dark = 'rgb(23,34,41)'


const themeOptions: ThemeOptions = {
    // typography: {
    //     fontFamily: 'Roboto',
    // },
    palette: {
        primary: {
            main: mainAccent,
        },
        text: {
            primary: light,
            secondary: secondaryAccent,
        },
        background: {
            default: dark,
            paper: dark,
        },
        success: {
            main: light,
        }
    },
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: light,
        //             color: light
        //         },
        //     },
        // },
        // MuiCssBaseline: {
        //     styleOverrides: {
        //         '*::-webkit-scrollbar': {
        //             width: '8px',
        //         },
        //         '*::-webkit-scrollbar-track': {
        //             background: 'rgba(255, 255, 255, 0.1)',
        //         },
        //         '*::-webkit-scrollbar-thumb': {
        //             backgroundColor: 'rgba(155, 155, 155, 0.5)',
        //             borderRadius: '4px',
        //             border: '2px solid transparent',
        //         },
        //         '*': {
        //             scrollbarWidth: 'thin',
        //             scrollbarColor: 'rgba(155, 155, 155, 0.5) rgba(255, 255, 255, 0.1)',
        //         },
        //     },
        // },
        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: mainAccent,
        //         },
        //     },
        // },
        // MuiInputBase: {
        //     styleOverrides: {
        //         root: {
        //             background: light,
        //             borderRadius: '5px',
        //             variant: "outlined",
        //             color: light,
        //         },
        //     },
        // },
        // MuiInputLabel: {
        //     styleOverrides: {
        //         root: {
        //             color: light,
        //             '&.Mui-focused': {
        //                 color: light,
        //             },
        //             '&.MuiInputLabel-shrink': {
        //                 color: light,
        //             },
        //         },
        //     },
        // },
        // MuiOutlinedInput: {
        //     styleOverrides: {
        //         root: {
        //             '& .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: light,
        //             },
        //             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: light,
        //             },
        //             '&.Mui-focused.MuiInputLabel-shrink + .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: light,
        //             },
        //         },
        //     },
        // },
    }
};

const customTheme = createTheme(themeOptions);

export default customTheme;