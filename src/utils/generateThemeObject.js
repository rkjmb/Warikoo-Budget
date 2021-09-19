export default function generteThemeObject(
    mode = 'light',
    pColor = '#f77f00',
    sColor = '#003049'
) {
    const isDarkMode = mode === 'dark';
    return {
        direction: 'ltr',
        typography: {
            fontFamily: [
                '"Poppins"',
                '"Segoe UI"',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"sans-serif"',
            ].join(','),
        },
        palette: {
            type: mode,
            background: {
                eproof: { workSpace: isDarkMode ? "#181921" : "#E8E9ED" }
            },
            primary: {
                main: pColor,
            },
            secondary: {
                main: sColor,
            },
        },
    }
}
