import React, {useState} from 'react';  
import './popup.css';  
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from "axios";

function Popup(props) {  

    const { showpopup, closePopUp } = props;
  
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file[0]);
        axios.post('http://admidgroup.com/api_rest/index.php/api/subirimagen', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      };
  
return (  
<div>         
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