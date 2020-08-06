import React, {useState} from 'react';  
import './popup.css';  
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from "axios";
import useFullPageLoader from './../hooks/useFullPageLoader';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Popup(props) {  

    const { showpopup, closePopUp } = props;
    const[porcentaje, setPorcentaje] = useState(0);
    let toastId;

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
  
    // const handleUpload = async (file) => {
      
    //     const formData = new FormData();
    //     formData.append("file", file[0]);
    //     axios.post('http://admidgroup.com/api_rest/index.php/api/subirimagen', formData, config)
    //       .then(res => {
    //         toast.done(toastId.current);

    //         closePopUp()
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   };
  
return (  
<div>         
<ToastContainer/>
    <DropzoneDialog
        open={showpopup}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={false}
        dialogTitle={'Subir imagen'}
        cancelButtonText={'CANCELAR'}
        submitButtonText={'ENVIAR'}
        onClose={closePopUp}
        onSave={(files) => {
            handleUpload(files)
          }}
        dropzoneText={'Arrastra la imagen'}
        showPreviewsInDropzone={true}
        maxFileSize={5000000}  />

</div>
);  
}  

export default Popup;