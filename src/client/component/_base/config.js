export const baseprefix = 'cine';

export const componentNames = {
    Button: `${baseprefix}-btn`,
    Card: `${baseprefix}-card`,
    Modal: `${baseprefix}-modal`,
    Drawer: `${baseprefix}-drawer`,
    Navigation: `${baseprefix}-navigation`,
    FloatingBox: `${baseprefix}-floating-box`,
    Mask: `${baseprefix}-mask`,
    Panel: `${baseprefix}-panel`,
    Toast: `${baseprefix}-toast`,
    Icon: `${baseprefix}-icon`,
};

export const fontRatio = 5;

export const cTheme = {
    palette: {
        primary: {
            light: '#ff4400',
            main: '#ff4400',
            dark: '#ff4400',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            dark: '#ffcc00',
        },
    },
    layout: {
        Panel: {
            gap: {
                small: '10px',
                normal: '20px',
            },
        },
        Card: {
            gap: {
                normal: '5px',
                large: '10px',
            },
        },
    },
    typography: {
        fontRatio: 5,
    },
};
