import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const useStyles = makeStyles(() => ({
    primary: {
        borderRadius: 7,
        background: colorPurple,
        color: '#FFFFFF',
        letterSpacing: 2,
        '&:hover': {
            background: colorPurple,
        },
    },
    outlined: {
        borderRadius: 7,
        background: 'transparent',
        border: `1px solid ${colorPurple}`,
        padding: '5px 16px',
        color: colorPurple,
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'transparent',
        },
    },
    rounded: {
        borderRadius: 20,
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
    },
    buttonText: {
        background: 'none',
        color: colorPurple,
        fontWeight: 600,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        textDecoration: 'underline',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: colorPurple,
            textDecoration: 'underline',
        },
    },
    link: {
        background: 'none',
        color: '#536777',
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: '#000000',
        },
    },
}));

export default useStyles;
