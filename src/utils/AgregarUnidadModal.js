import React, {useState, useRef, useEffect} from 'react';  
import './popup.css';  
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import 'react-toastify/dist/ReactToastify.css';
import {Modal, Button, Form as Formr} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import {InputGroup} from 'react-bootstrap'

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
      cochera:false
    });

    const handleDesarrollo = (event) => {
      setState({ ...form,  ["ndesarrollo"]: event.target.value })
    };

    const handleCheckBox = (event) => {
      setState({ ...form,  ["cochera"]: event.target.checked })
    }

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSimbolo = (event) => {
    setSimbolo(event.target.value);
  };

    var config = {
      idcliente: "74",
        timeout: 7000,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
     }

    const getDesarrollos = async() =>{
      try{
        axios.get('http://admidgroup.com/api_rest/index.php/api/desarrollo')
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
      setLoading(true);
       try{
         axios.post('http://admidgroup.com/api_rest/index.php/api/asignarunidad', {
           idcliente: '74',
           desarrollo: form.ndesarrollo,
           ubicacion: fields.ubicacion,
           unidad: fields.unidad,
           dormitorios: fields.dormitorios,
           m2propios: fields.m2_propios,
           m2comunes: fields.m2_comunes,
           m2total:fields.m2_total,
           cochera:form.cochera,
           headers: {
             'Access-Control-Allow-Origin': '*',
             "Access-Control-Allow-Headers":"X-Requested-With"
            },
           })
          .then(response => {
           console.log(response.data.status);
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
        ubicacion: '',
        unidad: '',
        dormitorios:'',
        m2_propios:'',
        m2_comunes:'',
        m2_total:''
    }}
    innerRef={formRef}
    validationSchema={Yup.object().shape({
        ubicacion: Yup.string()
            .required('Complete este campo'),
        unidad: Yup.string()
            .required('Complete este campo'),
        dormitorios: Yup.string()
            .required('Complete este campo'),
        m2_propios: Yup.string()
            .required('Complete este campo'),
        m2_comunes: Yup.string()
            .required('Complete este campo'), 
       m2_total: Yup.string()
            .required('Complete este campo'),       
    })}
    onSubmit={fields => {
      asignarUnidad(fields)
    }}>
    {({ values, errors, status, touched, handleChange, handleBlur, handleSubmit }) => (
      <div>

    <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
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
          value={values.ubicacion}
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
            <MenuItem value="$">$</MenuItem>
            <MenuItem value="$$">$$</MenuItem>
        </TextField>
      </div>
      <div className={classes.input }>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">{simbolo}</InputAdornment>}
          />
        </FormControl>  
        </div>
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Anticipo"
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
          id="standard-number"
          label="Refuerzo 1"
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
        </div>
        <div className={classes.input }>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Fecha refuerzo 1"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <ErrorMessage name="m2_total" component="div" className="invalid-feedback" />
        </div>        
        </div>
        <div className={classes.rowinput}> 
        <div className={classes.input }>
        <TextField
          id="standard-number"
          label="Refuerzo 2"
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Fecha refuerzo 2"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
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
          className={'form-control' + (errors.unidad && touched.unidad ? ' is-invalid' : '')}
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