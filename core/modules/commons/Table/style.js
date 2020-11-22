import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
        },
        '& .top-item': {
            display: 'inline-block',
        },
    },
}));

export default useStyles;
