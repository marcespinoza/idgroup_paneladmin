import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

function ConfirmDialog (props) {

  const { title, idunidad, open, children, setOpen, onConfirm, eliminando, onCancel, idU } = props;
  const [isLoading, setLoading] = React.useState(false)

  const deleteUnidad = () => {
    setLoading(true)
    try{
      axios.post('https://admidgroup.com/api_rest/index.php/api/eliminarunidad', {
        idunidad: idU,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
      })
          .then(response => {
            if(response.data.status){
              setLoading(false)
              onCancel()
            }
            })
          .catch(error => {
              console.error('There was an error!', error);
              setLoading(false)
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }

  return (
    <Dialog 
      open={open}
    //  aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
      <button  className="btn btn-secondary mr-2" onClick={onCancel}>
             NO
      </button>
      {!isLoading && (<button className="btn btn-danger mr-2" onClick={()=>deleteUnidad()}>
                            ELIMINAR
      </button>)}{isLoading && (<button className="btn btn-danger mr-2" disabled>
            <i className="fas fa-spinner fa-spin"></i>{" "}
                ELIMINANDO... </button>)}
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;