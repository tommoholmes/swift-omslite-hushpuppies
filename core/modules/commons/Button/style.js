import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const useStyles = makeStyles(() => ({
    container: {
        borderRadius: 7,
        background: colorPurple,
        color: '#FFFFFF',
        letterSpacing: 2,
        '&:hover': {
            background: colorPurple,
        },
    },
    primary: {
        borderRadius: 20,
        background: colorPurple,
        color: '#FFFFFF',
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        '&:hover': {
            background: colorPurple,
        },
    },
    outlined: {
        borderRadius: 20,
        background: 'transparent',
        border: `2px solid ${colorPurple}`,
        color: colorPurple,
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'transparent',
        },
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
