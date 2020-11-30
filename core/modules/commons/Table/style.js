import makeStyles from '@material-ui/core/styles/makeStyles';

const colorText = '#536777';
const colorBorder = '#435179';

const useStyles = makeStyles(() => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
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
}));

export default useStyles;
