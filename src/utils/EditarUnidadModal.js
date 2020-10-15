import React, {useState, useRef, useEffect} from 'react';  
import './popup.css';  
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import 'react-toastify/dist/ReactToastify.css';
import {Modal, Button, Form as Formr} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles'
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';

 
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  input: {
      marginRight:'10',
      marginBottom:'10',
      width: '150',    
  },
  rowinput:{
    display:'flex', 
    flexDirection:'row'
  }
}));

function AgregarUnidad(props) {  
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const [simbolo, setSimbolo] = useState('')
    const [desarrollo, setDesarrollo] = useState([]);
    const [form, setState] = useState({
      ndesarrollo:'',
      ubicacion: '',
      unidad: '',
      dormitorios:'',
      m2_propios:'',
      m2_comunes:'',
      m2_total:'',
      moneda:'',
      valor_cuota:'',
      anticipo:'',
      valor_total:'',
      refuerzo1:'',
      fecha_refuerzo1:'',
      refuerzo2:'',
      fecha_refuerzo2:'',      
      cochera:'',
    });

    const handleDesarrollo = (event) => {
      setState({ ...form,  ["ndesarrollo"]: event.target.value })
    };

  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSimbolo = (event) => {
    setSimbolo(event.target.value);
  };

  const handlePorcentajeAnticipo = (evt)=>{
    let ref1 = (evt.target.value * Number(formRef.current.values.valor_total))/100 
    setState({ ...form,  ["anticipo"]: ref1 })
  }

  const handlePorcentaje1 = (evt)=>{
    let ref1 = (evt.target.value * Number(formRef.current.values.valor_total))/100 
    setState({ ...form,  ["refuerzo1"]: ref1 })
  }

  const handlePorcentaje2 = (evt)=>{
    let ref1 = (evt.target.value * Number(formRef.current.values.valor_total))/100 
    setState({ ...form,  ["refuerzo2"]: ref1 })
  }

  const handleValorTotal = (evt)=>{
    let value = evt.target.value
    let porc1 = (value * Number(formRef.current.values.porcentaje1))/100 
    let porc2 = (value * Number(formRef.current.values.porcentaje2))/100 
    let porc3 = (value * Number(formRef.current.values.porcentaje_anticipo))/100 
    setState({ ...form,  ["refuerzo1"]: porc1,  ["refuerzo2"]: porc2 ,  ["anticipo"]: porc3 })
  }

    const getDesarrollos = async() =>{
      try{
        axios.get('https://admidgroup.com/api_rest/index.php/api/desarrollo')
            .then(response => {
              console.log(response.data.desarrollos[0].nombre)
                setDesarrollo(response.data.desarrollos)
                setState({ ...form,  ["ndesarrollo"]: response.data.desarrollos[0].nombre })
              })
            .catch(error => {
                console.error('There was an error!', error);
          });
      }catch(error){
        console.error('There was an error two!', error);
      }
    }  


    const asignarUnidad = async(fields) =>{
      console.log(fields.fecha_refuerzo1)
      setLoading(true);
       try{
         axios.post('https://admidgroup.com/api_rest/index.php/api/asignarunidad', {
           idcliente: props.idcliente,
           desarrollo: form.ndesarrollo,
           ubicacion: fields.ubicacion,
           unidad: fields.unidad,
           dormitorios: fields.dormitorios,
           m2propios: fields.m2_propios,
           m2comunes: fields.m2_comunes,
           m2total:fields.m2_total,
           moneda: simbolo,
           valor_total:fields.valor_total,
           valor_cuota: fields.valor_cuota,
           cant_cuotas: fields.cant_cuotas,
           anticipo:form.anticipo,
           porcentaje_anticipo:fields.porcentaje_anticipo,
           refuerzo1: form.refuerzo1,
           fecha_refuerzo1:fields.fecha_refuerzo1,
           porcentaje_refuerzo1: fields.porcentaje1,
           refuerzo2:form.refuerzo2,
           fecha_refuerzo2:fields.fecha_refuerzo2,    
           porcentaje_refuerzo2: fields.porcentaje2,       
           cochera:fields.cochera,
           headers: {
             'Access-Control-Allow-Origin': '*',
             "Access-Control-Allow-Headers":"X-Requested-With"
            },
           })
          .then(response => {
           console.log(response);

             if(response.data.status){
                  props.onHide()
                  console.log(response.data.status);
                }else{

                }

               }
            )
           .catch(error => {
                 console.error('There was an error!', error);
           });
       }catch(error){
         console.error('There was an error two!', error);
         setLoading(false)
       }
     } 

    useEffect(() => {
      getDesarrollos()
    },[]);
   
  
return (  
<div>
<Formik
    initialValues={{
        ubicacion: "22",
        unidad: props.unidad.unidad,
        dormitorios:props.unidad.dormitorios,
        m2_propios:props.unidad.m2_propios,
        m2_comunes:'25',
        m2_total:'',
        moneda:'',
        valor_total:'',
        valor_cuota:'',
        cant_cuotas:'',
        anticipo:'',
        porcentaje_anticipo:'',
        refuerzo1:'',
        fecha_refuerzo1:'',
        porcentaje1:'',
        refuerzo2:'',
        fecha_refuerzo2:'',
        porcentaje2:'',
        cochera:''
    }}
    innerRef={formRef}
    validationSchema={Yup.object().shape({
        ubicacion: Yup.string()
            .required('Obligatorio'),
        unidad: Yup.string()
            .required('Obligatorio'),
        dormitorios: Yup.string()
            .required('Obligatorio'),
       valor_cuota: Yup.string()
            .required('Obligatorio'),      
       cant_cuotas: Yup.string()
            .required('Obligatorio'),
       anticipo: Yup.string(),
       refuerzo1: Yup.string(),
       fecha_refuerzo1:Yup
       .date()
       .required("Obligatorio"),
       refuerzo2: Yup.string(),
       fecha_refuerzo2:Yup
       .date()
       .required("Obligatorio"),
       cochera:Yup.number()
       .integer()
       .default(11) 
       .nullable(true)                                        
    })}
    onSubmit={fields => {
      asignarUnidad(fields)
    }}>
    {({ values, errors, status, touched, handleChange, handleBlur, handleSubmit , setFieldValue}) => (
      <div>

    <Modal
        {...props}
      //  aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar unidad
          </Modal.Title>
        </Modal.Header>        
        <Modal.Body>
          <div className={classes.input}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Desarrollo
        </InputLabel>
        <NativeSelect
          onChange={handleDesarrollo}
          defaultValue={form.ndesarrollo}
          inputProps={{
            name: 'ndesarrollo',
          }}
          value={form.ndesarrollo} >
          {desarrollo.map((e, key) => {
            return <option key={key} value={e.nombre}>{e.nombre}</option>;
          })}
        </NativeSelect>
        </div>
        <div className={classes.rowinput}>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Ubicacion"
          name="ubicacion"
          type="number"
          value={parseInt(values.ubicacion)}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={ 'form-control' + (errors.ubicacion && touched.ubicacion ? ' is-invalid' : '')}
        />
        <ErrorMessage name="ubicacion" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Unidad"
          type="number"
          name="unidad"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0} }}
          className={'form-control' + (errors.unidad && touched.unidad ? ' is-invalid' : '')}
        />
        <ErrorMessage name="unidad" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
          <TextField
          id="standard-number"
          label="Dormitorios"
          type="number"
          name="dormitorios"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0} }}
          className={'form-control' + (errors.dormitorios && touched.dormitorios ? ' is-invalid' : '')}
        />
        <ErrorMessage name="unidad" component="div" className="invalid-feedback" />
        </div>
        </div>
        <div className={classes.rowinput}>        
        <div className={classes.input }>
        
        <TextField
          id="standard-number"
          label="M2 propios"
          name="m2_propios"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={ 'form-control' + (errors.m2_propios && touched.m2_propios ? ' is-invalid' : '')}
        />
        <ErrorMessage name="m2_propios" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="M2 comunes"
          type="number"
          name="m2_comunes"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.m2_comunes && touched.m2_comunes ? ' is-invalid' : '')}
        />
        <ErrorMessage name="m2_comunes" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Total"
          type="number"
          name="m2_total"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.m2_total && touched.m2_total ? ' is-invalid' : '')}
        />
        <ErrorMessage name="m2_total" component="div" className="invalid-feedback" />
        </div>        
        </div>
        <div className={classes.rowinput}>   
        <div className={classes.input }>
        <TextField
          select
          style={{width:100}}
          label="Moneda"
          onChange={handleSimbolo}
           >
            <MenuItem value="0">$</MenuItem>
            <MenuItem value="1">USD</MenuItem>
        </TextField>
      </div>
      <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Valor total"
          type="number"
          name="valor_total"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => {handleChange(evt); handleValorTotal(evt)}}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.valor_total && touched.valor_total ? ' is-invalid' : '')}
        />
        <ErrorMessage name="valor_total" component="div" className="invalid-feedback" />
        </div>                 
        </div>
        <div className={classes.rowinput}>   
      <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Valor cuota"
          type="number"
          name="valor_cuota"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.valor_cuota && touched.valor_cuota ? ' is-invalid' : '')}
        />
        <ErrorMessage name="valor_cuota" component="div" className="invalid-feedback" />
        </div>  
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Cant. cuotas"
          type="number"
          name="cant_cuotas"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.cant_cuotas && touched.cant_cuotas ? ' is-invalid' : '')}
        />
        <ErrorMessage name="cant_cuotas" component="div" className="invalid-feedback" />
        </div>        
        </div>
        <div className={classes.rowinput}>         
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Anticipo"
          type="number"
          name="anticipo"
          value={form.anticipo}
          disabled={true}
          InputLabelProps={{
            shrink: true,
          }}
          value={form.anticipo}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.anticipo && touched.anticipo ? ' is-invalid' : '')}
        />
        <ErrorMessage name="anticipo" component="div" className="invalid-feedback" />
        </div>  
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Porcentaje"
          type="number"
          name="porcentaje_anticipo"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => {handleChange(evt); handlePorcentajeAnticipo(evt)}}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.porcentaje_anticipo && touched.porcentaje_anticipo ? ' is-invalid' : '')}
        />
        <ErrorMessage name="porcentaje_anticipo" component="div" className="invalid-feedback" />
        </div>       
        </div>
        <div className={classes.rowinput}>   
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Refuerzo 1"
          type="number"
          name="refuerzo1"
          disabled={true}
          value={form.refuerzo1}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.refuerzo1 && touched.refuerzo1 ? ' is-invalid' : '')}
        />
        <ErrorMessage name="refuerzo1" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Porcentaje"
          type="number"
          name="porcentaje1"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => {handleChange(evt); handlePorcentaje1(evt)}}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.porcentaje1 && touched.porcentaje1 ? ' is-invalid' : '')}
        />
        <ErrorMessage name="porcentaje1" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  m={-10}
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  name="fecha_refuerzo1"
                  value={values.fecha_refuerzo1}
                  clearable
                  helperText={false}
                  error={false}
                  label="FECHA"
                  onChange={value => setFieldValue("fecha_refuerzo1", value)}
                  // KeyboardButtonProps={{
                  //   "aria-label": "change date"
                  // }}
                  InputLabelProps={{ shrink: true }}
                  className={'form-control' + (errors.fecha_refuerzo1 && touched.fecha_refuerzo1 ? ' is-invalid' : '')}
                />
              </MuiPickersUtilsProvider>
        <ErrorMessage name="fecha_refuerzo1" component="div" className="invalid-feedback" />
        </div>        
        </div>
        <div className={classes.rowinput}> 
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Refuerzo 2"
          type="number"
          disabled={true}
          name="refuerzo2"
          helperText={''}
          value={form.refuerzo2}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.refuerzo2 && touched.refuerzo2 ? ' is-invalid' : '')}
        />
        <ErrorMessage name="refuerzo2" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Porcentaje"
          type="number"
          name="porcentaje2"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={evt => {handleChange(evt);handlePorcentaje2(evt)}}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0 } }}
          className={'form-control' + (errors.porcentaje2 && touched.porcentaje2 ? ' is-invalid' : '')}
        />
        <ErrorMessage name="porcentaje2" component="div" className="invalid-feedback" />
        </div>
        <div className={classes.input }>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                m={-10}
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  name="fecha_refuerzo2"
                  value={values.fecha_refuerzo2}
                  helperText={false}
                  error={false}
                  clearable
                  label="FECHA"
                    onChange={value => setFieldValue("fecha_refuerzo2", value)}
                  // KeyboardButtonProps={{
                  //   "aria-label": "change date"
                  // }}
                  InputLabelProps={{ shrink: true }}
                  className={'form-control' + (errors.fecha_refuerzo2 && touched.fecha_refuerzo2 ? ' is-invalid' : '')}
                />
              </MuiPickersUtilsProvider>
        <ErrorMessage name="fecha_refuerzo2" component="div" className="invalid-feedback" />
        </div>        
        </div>
        <div className={classes.rowinput}>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Nro. cochera"
          type="number"
          name="cochera"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{ inputProps: { min: 0} }}
          className={'form-control' + (errors.cochera && touched.cochera ? ' is-invalid' : '')}
        />
        </div>
        </div>
           </Modal.Body>           
           <Modal.Footer>
           <button className="button" type='button' disabled={loading} onClick={() => handleSubmit()}>
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