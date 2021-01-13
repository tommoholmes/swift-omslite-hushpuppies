import makeStyles from '@material-ui/core/styles/makeStyles';

const colorText = '#536777';
const colorBorder = '#435179';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'unset',
            },
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                borderColor: colorBorder,
                color: colorText,
                textTransform: 'capitalize',
            },
        },
        '& .top-item.records-found': {
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                float: 'none',
            },
        },
        '& .boxColumn': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            '& .MuiAutocomplete-root': {
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important',
                },
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter .MuiTextField-root': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    btn: {
        borderRadius: 20,
        background: 'unset',
        boxShadow: 'none',
        textTransform: 'capitalize',
        color: colorText,
        border: '1px solid',
        borderColor: colorBorder,
        '&:hover': {
            background: 'unset',
            boxShadow: 'none',
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    mainTable: {
        overflowX: 'scroll',
    },
}));

export default useStyles;
