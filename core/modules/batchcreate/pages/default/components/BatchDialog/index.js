import * as React from 'react';
// import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '@modules/batchcreate/pages/default/components/BatchDialog/style';
import Button from '@common_button';

const BatchDialog = (props) => {
    const {
        open, handleClose, title, titleChild,
    } = props;
    const classes = useStyles();

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth="true" classes={{ paper: classes.paper }}>
                <DialogTitle classes={{ root: classes.textTitle }}>
                    Batch By
                    {' '}
                    {title}
                    <p className={classes.textTitleChild}>
                        How many
                        {titleChild}
                        {' '}
                        per batch?
                    </p>
                </DialogTitle>
                <DialogContent classes={{ root: classes.content }}>
                    <div className={`${classes.counter} ${classes.counterBtn}`}>
                        <img src="/assets/img/minus.svg" alt="min" />
                    </div>
                    <div className={`${classes.counter} ${classes.counterNumber}`}>0</div>
                    <div className={`${classes.counter} ${classes.counterBtn}`}>
                        <img src="/assets/img/plus.svg" alt="plus" />
                    </div>
                </DialogContent>
                <DialogContent classes={{ root: classes.content }}>
                    <Button className={classes.btn} variant="contained" buttonType="primary-rounded">
                        Create Pick List
                    </Button>
                </DialogContent>
                <DialogContent classes={{ root: classes.content }}>
                    <button
                        type="button"
                        className={classes.textFooter}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Cancel
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BatchDialog;
