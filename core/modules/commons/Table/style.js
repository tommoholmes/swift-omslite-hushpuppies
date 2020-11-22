import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
        },
        '& .top-item': {
            display: 'inline-block',
        },
    },
}));

export default useStyles;
