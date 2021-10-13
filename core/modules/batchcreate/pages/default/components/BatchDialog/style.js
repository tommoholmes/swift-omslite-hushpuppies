import { makeStyles } from '@material-ui/core/styles';

const textColor = '#435179';
const titleFont = 'normal normal bold 30px/37px Roboto';
const colorPurple = '#BE1F93';
const textFont = 'normal normal normal 14px/17px Roboto';

const useStyles = makeStyles(() => ({
    paper: {
        borderRadius: 16,
    },
    textTitle: {
        padding: '24px 24px 10px 24px',
        textAlign: 'center',
        '& .MuiTypography-h6': {
            font: titleFont,
            color: textColor,
        },
    },
    textTitleChild: {
        font: textFont,
        margin: 0,
        marginTop: 8,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
    },
    counter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px',
        font: titleFont,
    },
    counterNumber: {
        color: textColor,
    },
    counterBtn: {
        cursor: 'pointer',
    },
    btn: {
        borderRadius: 27,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        color: 'white',
        background: colorPurple,
        width: 167,
        height: 55,
        position: 'relative',
        fontSize: 18,
        '@media (max-width: 767px )': {
            width: '100%',
        },
    },
    textFooter: {
        font: textFont,
        textDecoration: 'underline',
        color: colorPurple,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        margin: 12,
    },
}));

export default useStyles;
