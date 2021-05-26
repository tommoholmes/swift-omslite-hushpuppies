import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorBlue = '#321fdb';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
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
        boxShadow: 'none',
        border: '1px solid',
        height: 36,
        width: 150,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '0 10px',
        marginTop: 20,
        float: 'right',
        [theme.breakpoints.down('xs')]: {
            width: 50,
            marginRight: 18,
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
    spanLabel: {
        display: 'block',
        fontWeight: 700,
    },
    contentLeft: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
    },
    contentRight: {
        width: '100%',
        '& tr td:nth-child(3)': {
            [theme.breakpoints.up('sm')]: {
                width: '10%',
            },
            [theme.breakpoints.up('md')]: {
                width: '17%',
            },
        },
        '& tr td:first-child, tr td:nth-child(4)': {
            paddingRight: 8,
        },
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
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
    link: {
        color: colorBlue,
        fontWeight: 700,
        '&:hover': {
            textDecorationLine: 'underline',
        },
    },
}));

export default useStyles;
