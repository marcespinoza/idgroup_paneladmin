import React, {useState} from 'react';  
import {Modal, Button} from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import moment from "moment";
import ButtonLoader from './../utils/ButtonLoader'


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
 const [buttonState, setState] = useState('');
 const [loading, setLoading] = useState(false);

 const agregarCuota = async(id_cli) =>{
   setLoading(true);
    try{
      axios.post('http://admidgroup.com/api_rest/index.php/api/agregarcuota', {
        idcliente: props.idcliente,
        fecha: fecha,
        nrocuota: "6",
        monto: monto,
        moneda: "1",
        variacion_mensual: "12.5",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
       .then(response => {
          if(response.data.status===true){
              
             }else{
             }
             console.log(response.data.cuotas);
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
                 <Input value={monto} onChange={(evt) => {setMonto(evt.target.value); }}/>
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