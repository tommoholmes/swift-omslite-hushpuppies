import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
        },
    },
}));

export default useStyles;
