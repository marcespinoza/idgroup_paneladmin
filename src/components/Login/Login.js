import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../.././/Images/logo_circular.png';
import { withStyles } from '@material-ui/core/styles';
import purple from "@material-ui/core/colors/purple";
import axios from "axios";
import { shadows } from '@material-ui/system';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import { Box } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    height:'100vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo:{
     margin:'auto'
  } ,
  photo: {
    width: 100,
    height: 100,
  },
   loginbutton: {
    backgroundColor:"#000000",
    color:"#FFF",
    borderRadius:20,
    outline: 'none',
    boxshadow: 'none',
  },
  passwordicon:{
    position: 'absolute',
  top: 20,
  right: 5,
}
  
}));


function Login() {

  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [showlabel, setLabel] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [opacidad, setOpacidad] = useState(0);
  const history = useHistory()
  const formRef = useRef();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const input = (event) => {
      if (event.key === 'Enter') {
        console.log(formRef.current)
        formRef.current.handleSubmit()
      
    }
  }

  const getLogin = async(datoslogin) =>{
    try{
      showLoader();
      axios.post('https://admidgroup.com/api_rest/index.php/api/loginusuario', {
        usuario: datoslogin.usuario,
        clave: datoslogin.clave,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
          .then(response => {
             if(response.data.status===true){
               history.push("/main");
             }else{
              setOpacidad(100)
             }
             hideLoader();
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }              

  return (
    <div style={{backgroundImage:"url('./arq.jpg')" , backgroundSize:'cover'}}>
    <Formik
    initialValues={{
        usuario: '',
        clave: '',
    }}
    innerRef={formRef}
    validationSchema={Yup.object().shape({
        usuario: Yup.string()
            .required('Ingrese su usuario'),
        clave: Yup.string()
            .required('Ingrese su clave'),
    })}
    onSubmit={fields => {
       getLogin(fields)
    }}
>
    {({ values, errors, handleChange, touched, handleSubmit }) => (
          <>

    <Form>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      <Card  style={{padding:20}}>
        <CardContent>
          <Box display="flex"  alignItems="center" justifyContent="center" paddingBottom="50">
            <img src={logo} className={classes.photo} />
         </Box>
         <div style={{height:40, width:'100%', paddingBottom:'70'}}>

         <Input name="usuario" type="text" placeholder="Usuario"           onChange={handleChange}
         className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />         
         <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
         </div>
         <div style={{height:40, width:'100%', paddingBottom:'70'}}>
           <div>
         <Input name="clave" onKeyDown={(evt)=>input(evt)}   placeholder="Clave"  
                   onChange={handleChange}

         className={'form-control' + (errors.clave && touched.clave ? ' is-invalid' : '')} 
         type={showPassword ? 'text' : 'password'}
         endAdornment={
          <InputAdornment position="end">
            <IconButton
             // aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"

            >
              {showPassword ? <VisibilityOff /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
         />
         </div>
         <ErrorMessage name="clave" component="div" className="invalid-feedback" />
         </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          /> */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleSubmit()}
            className={classes.loginbutton}>
            Iniciar sesión
          </Button>
          <Box display="flex"  alignItems="center" justifyContent="center" >
          <label style={{ color:'red',
          fontFamily:'roboto_light',
           fontSize:'15',
           padding:'10',
           height:'auto',
           opacity:opacidad}}>
           USUARIO/CLAVE INCORRECTO/A
        </label>
        </Box>
          {/* <Copyright /> */}
          </CardContent>
          </Card>

      </div>
    </Container>
    {loader}
    </Form>
        </>

   )}
   </Formik>
   </div> 
  );
}

const styles = theme => ({
    root: {
      "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
        borderColor: purple[500]
      }
    },
    disabled: {},
    focused: {},
    error: {},
    notchedOutline: {}
  });

  export default withStyles(styles)(Login)