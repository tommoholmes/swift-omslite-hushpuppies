import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        padding: '17px 0',
        borderBottom: '1px solid #DDE1EC',
    },
    btn: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        color: colorPurple,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '0 10px',
        '&:hover': {
            background: 'transparent',
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
    },
    orderLabel: {
        fontFamily: font,
        display: 'block',
    },
    contentLeft: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
    },
    grandTotal: {
        fontFamily: font,
        fontWeight: 'bold',
    },
}));

export default useStyles;
