import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Lion as ButtonLoader } from 'react-button-loaders'

const ConfirmDialog = (props) => {

  const { title, children, open, setOpen, onConfirm } = props;
  const [isLoading, setLoading] = React.useState(true)

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <p>
                        {!isLoading && (
                            <button
                                className="btn btn-danger mr-2"
                            >
                                Subscribe
                            </button>
                        )}
                        {isLoading && (
                            <button className="btn btn-danger mr-2" disabled>
                                <i className="fas fa-spinner fa-spin"></i>{" "}
                                Subscribing...
                            </button>
                        )}
                    </p>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;