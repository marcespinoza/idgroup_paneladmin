import React, {useState, useRef} from 'react';  
import './popup.css';  
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import useFullPageLoader from '../hooks/useFullPageLoader';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Modal, Button} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles((theme) => ({
  input: {
      marginRight:'10',
      width: '150',
    
  },
}));

function AgregarUnidad(props) {  
    const classes = useStyles();
    const { showpopup, closePopUp } = props;
    const[porcentaje, setPorcentaje] = useState(0);
    const [loading, setLoading] = useState(false);
    let toastId;
    const formRef = useRef();


    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted/10)
        setPorcentaje(percentCompleted/10);
        const progress = progressEvent.loaded / progressEvent.total;
        if(toastId === null){
          toastId = toast('Upload in Progress', {progress: progress});
      } else {
        toast.update(toastId, {progress: progress
        })
      }
      },
      headers: { 'Content-Type': 'multipart/form-data' },

    }
  
    function handleUpload(file){
      const formData = new FormData();
      toastId = null;
      formData.append("file", file[0]);
      axios.request({
        method: "post", 
        url: "http://admidgroup.com/api_rest/index.php/api/subirimagen", 
        data: formData, 
        onUploadProgress: p => {
          let progress = p.loaded / p.total;
  
          // check if we already displayed a toast
          if(toastId === null){
              toastId = toast('Subiendo imagen', {
              progress: progress,
              type: toast.TYPE.INFO,
              position: "bottom-center",
              autoClose: false
            });
          } else {
            toast.update(toastId, {
              progress: progress,
              type: toast.TYPE.INFO,
              position: "bottom-center",
              autoClose: false
            })
          }
        }
      }).then(data => {
        // Upload is done! 
        // The remaining progress bar will be filled up
        // The toast will be closed when the transition end
        toast.done(toastId);
        closePopUp();
        toast.success('Subido correctamente', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    }
  
return (  
<div>
<Formik
    initialValues={{
        ubicacion: '',
        unidad: '',
    }}
    innerRef={formRef}
    validationSchema={Yup.object().shape({
        ubicacion: Yup.string()
            .required('Ingrese su usuario'),
        unidad: Yup.string()
            .required('Ingrese su clave'),
    })}
    onSubmit={fields => {
      //  
    }}
>
    {({ values, errors, status, touched, handleSubmit }) => (
      <div>

    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar unidad
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <TextField
          id="standard-number"
          label="Ubicacion"
          name="ubicacion"
          type="number"
          value={values.ubicacion}
          InputLabelProps={{
            shrink: true,
          }}
          className={'form-control' + (errors.ubicacion && touched.ubicacion ? ' is-invalid' : '')}
        />
        <ErrorMessage name="ubicacion" component="div" className="invalid-feedback" />
        <TextField
          id="standard-number"
          label="Unidad"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
          <TextField
          id="standard-number"
          label="Dormitorios"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
        <TextField
          id="standard-number"
          label="M2 propios"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
        <TextField
          id="standard-number"
          label="M2 comunes"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
        <TextField
          id="standard-number"
          label="Total"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
           </Modal.Body>
           
           <Modal.Footer>
           <button className="button"  disabled={loading} onClick={() => handleSubmit()}>
            {loading && (
             <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}/>
            )}
            {loading && <span>ENVIANDO</span>}
            {!loading && <span>GUARDAR</span>}
            </button>
        </Modal.Footer>
        </Modal>
      
         </div>
        )}
       
        </Formik>
        </div>
);  
}  

export default AgregarUnidad;