import React, {useState} from 'react';  
import {Modal, Button} from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';


export default function AgregarCuota(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar cuota
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <InputLabel htmlFor="input-with-icon-adornment">Nro. cuota</InputLabel>
                 <Input/>
                 <InputLabel htmlFor="input-with-icon-adornment">Monto</InputLabel>
                 <Input/>
                 <InputLabel htmlFor="input-with-icon-adornment">Variacion mensual</InputLabel>
                 <Input/>
             </Modal.Body>
            <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }