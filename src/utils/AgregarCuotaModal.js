import React, {useState} from 'react';  
import {Modal, Button, Form, Col, InputGroup, FormControl} from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import moment from "moment";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    input: {
      display:'flex',
      flexDirection:'column',
      margin:5,
      width:140
    }
  }));


export default function AgregarCuota(props) {

 const classes = useStyles();
 const [fecha, setFecha] = useState(moment().format("YYYY-MM-DD"));
 const [monto, setMonto] = useState('');
 const [idcli, setIdCli] = useState(0);
 const [checkAdelanto, setCheckAdelanto] = useState(false);
 const [loading, setLoading] = useState(false);
 const [emptyInput, setEmptyInput] = useState(true)
 const [adelanto, setAdelanto] = useState(0)
 const [observacion, setObservacion] = useState("")

 const handleAdelanto = (event) => {
  setCheckAdelanto(!checkAdelanto)
  if(checkAdelanto){
    setAdelanto(0)
    setObservacion('')
  }else{
    setAdelanto(1)
    setObservacion('ADELANTO')
  }
};

const handleMonto = (event) => {
  if(event.target.value===""){
    setEmptyInput(true)
    setMonto(event.target.value)
  }else{
    setEmptyInput(false)
    setMonto(event.target.value)
  }
};
const handleObservacion = (event) => {
  setObservacion(event.target.value)
};

 const agregarCuota = async(id_cli) =>{
   setLoading(true);
    try{
      axios.post('http://admidgroup.com/api_rest/index.php/api/agregarcuota', {
        idcliente: props.idcliente,
        fecha: fecha,
        nrocuota: props.numerocuota,
        monto: monto,
        moneda: props.moneda,
        adelanto:adelanto,
        variacion_mensual: props.variacion,
        observacion: observacion,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
       .then(response => {
        console.log(response.data);
          if(response.data.status){
               props.onHide()
               console.log(response.data.status);
             }else{
             }
             setLoading(false);
            }
            )
        .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }   
    return (        
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar cuota
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>  
        <Form.Row className="align-items-center">
        <Col xs="auto">
      <Form.Check
        type="checkbox"
        className="mb-2"
        label="Adelanto"
        onChange={handleAdelanto}
      />
    </Col>
    <Col xs="auto">
      <Form.Control
        className="mb-2"
        name="observacion"
        value={observacion}
        placeholder="Observacion"
        onChange={handleObservacion}
      />
    </Col>
    
  </Form.Row>
            <div style={{flexDirection:'row', display:'flex'}}>
                <div className={classes.input}>
                 <InputLabel htmlFor="input-with-icon-adornment">Nro. cuota</InputLabel>
                 <Input value={props.numerocuota}/>
                 </div>
                 <div className={classes.input}>
                 <InputLabel htmlFor="input-with-icon-adornment">Moneda</InputLabel>
                 <Input value= {props.moneda == '0'? '$$': '$' } onChange={(evt) => {setMonto(evt.target.value); }}/>
                 </div>
                 <div className={classes.input}>
                 <InputLabel htmlFor="input-with-icon-adornment">Monto</InputLabel>
                 <Input error={emptyInput}  value={monto} onChange={(evt) => {handleMonto(evt) }}  aria-describedby="component-error-text"/>
                 {emptyInput ? (
                 <FormHelperText error id="component-error-text">* Obligatorio</FormHelperText>
                  ) : <div  style={{visibility:'hidden'}}>error</div>}              
                 </div>
                 <div className={classes.input}>
                 <InputLabel htmlFor="input-with-icon-adornment">Fecha</InputLabel>
                 <Input value={fecha}/>
                 </div>
                 <div className={classes.input}>
                 <InputLabel htmlFor="input-with-icon-adornment">Variacion mensual</InputLabel>
                 <Input value={props.variacion}/>
                 </div>
             </div>
             </Modal.Body>
            <Modal.Footer>
           <button className="button" onClick={agregarCuota} disabled={loading}>
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
    );
  }