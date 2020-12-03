import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '100%',
            position: 'relative',
        },
    },
    textTitle: {
        fontSize: 24,
        color: '#536777',
        textAlign: 'center',
        marginBottom: 60,
    },
    textInput: {
        width: '100%',
    },
    formField: {
        padding: 0,
        paddingBottom: 25,
        position: 'relative',
    },
    headerLogin: {
        [theme.breakpoints.down('xs')]: {
            width: 296,
            margin: '20px auto 0',
        },
    },
    containLeft: {
        [theme.breakpoints.up('sm')]: {
            width: '48%',
            float: 'left',
            marginTop: 26,
            marginLeft: 21,
        },
    },
    containRight: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            width: '49%',
            float: 'right',
            height: '100%',
        },
    },
    rightImg: {
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
        },
    },
    loginContent: {
        maxWidth: 307,
        [theme.breakpoints.up('sm')]: {
            left: '5%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        [theme.breakpoints.up('md')]: {
            left: '9%',
        },
        [theme.breakpoints.up('lg')]: {
            left: '15%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '20% auto',
            maxWidth: 280,
        },
    },
    btnLogin: {
        background: colorPurple,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        '&:hover': {
            background: colorPurple,
        },
    },
    btnLoginText: {
        color: '#FFFFFF',
        padding: '2px 121px',
        letterSpacing: 2,
        fontSize: 20,
    },
    btnTextForgot: {
        display: 'block',
        marginTop: 26,
        textAlign: 'center',
        fontSize: 14,
        color: '#536777',
    },
}));

export default useStyles;
