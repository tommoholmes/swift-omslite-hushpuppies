import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const borderGray = '#E5E9F1';
const colorBold = '#435179';

const useStyles = makeStyles((theme) => ({
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 36,
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
        margin: 0,
    },
    container: {
        padding: '0 16px',
        paddingTop: 8,
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
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
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
        '&.fieldCenter': {
            marginLeft: 10,
            marginRight: 10,
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(10px, 10px)',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.newLine': {
            maxWidth: 'unset',
            width: '100%',
            display: 'block',
        },
    },
    fieldInput: {
        height: 30,
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: colorBold,
        verticalAlign: 'middle',
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
        '&.status': {
            textTransform: 'capitalize',
        },
    },
}));
export default useStyles;
