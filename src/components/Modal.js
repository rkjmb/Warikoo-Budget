import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(0.5)
    },
    dialogContent: {
        padding: 0
    }
}))

const Modal = ({ onClose, open, content, maxWidth = 'md', title = "Some amazing Title" }) => {
    const classes = useStyles();
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />
    })

    return (
        <Dialog
            fullWidth
            maxWidth={maxWidth}
            onClose={onClose}
            open={open}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                {onClose ? (
                    <IconButton color="primary" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>

                ) : null}
                {title}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
