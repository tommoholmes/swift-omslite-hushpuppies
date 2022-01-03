import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#e1e1e1';
const colorBorder = '#d8dbe0';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        '& .MuiAccordionDetails-root': {
            display: 'block',
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
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        textAlign: 'end',
        paddingRight: 30,
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
        [theme.breakpoints.down('xs')]: {
            width: 140,
            paddingRight: 10,
        },
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
    fieldRootDesc: {
        [theme.breakpoints.down('xs')]: {
            verticalAlign: 'top',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    labelNote: {
        verticalAlign: 'top',
        marginTop: 10,
    },
    notes: {
        display: 'inline-block',
        marginTop: 10,
    },
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        display: 'inline-flex',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    autocompleteMulti: {
        '& .MuiOutlinedInput-root': {
            height: 'auto',
            paddingTop: 8,
            paddingBottom: 8,
        },
    },
    accordion: {
        '&.Mui-expanded': {
            background: colorGray,
            '& h2': {
                fontWeight: 800,
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
        },
    },
    table: {
        border: '1px solid',
        borderColor: colorBorder,
        backgroundColor: colorGray,
        '& th': {
            padding: '11px 10px',
            textAlign: 'left',
        },
        '& td': {
            padding: '11px 10px',
            width: '100%',
        },
    },
    tableInput: {
        '& input': {
            width: 'auto',
            backgroundColor: '#ffffff',
            padding: 10,
        },
    },
}));

export default useStyles;
