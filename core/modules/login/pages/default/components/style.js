import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '768px',
            maxWidth: 1366,
            position: 'relative',
            boxShadow: '0px 2px 10px 0px rgb(195 195 195)',
            MozBoxShadow: '0px 2px 10px 0px rgb(195 195 195)',
            WebkitBoxShadow: '0px 2px 10px 0px rgb(195 195 195)',
        },
    },
    textTitle: {
        fontSize: 24,
        color: '#536777',
        textAlign: 'center',
        marginBottom: 60,
    },
    textInput: {
        paddingLeft: 15,
        width: '100%',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        position: 'relative',
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
        [theme.breakpoints.up('sm')]: {
            width: '49%',
            float: 'right',
        },
    },
    rightImg: {
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.up('sm')]: {
            height: 768,
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
            margin: '0 auto',
        },
    },
    btnLogin: {
        background: colorPurple,
        borderRadius: 7,
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
