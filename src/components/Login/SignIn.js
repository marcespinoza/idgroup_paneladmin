import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../.././/Images/logo_circular.png';
import { withStyles } from '@material-ui/core/styles';
import purple from "@material-ui/core/colors/purple";
import axios from "axios";
import {Redirect} from "react-router-dom";
import useFullPageLoader from './../../hooks/useFullPageLoader';
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.inversionesidgroup.com/">
        InversionesIdGroup
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#323232",
    color:"#FFF",
    borderRadius:20
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom:50
  },
  lottieStyle: {
    width: '340px', margin: 'auto', display: 'block' 
   }
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#323232',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#323232',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#323232',
      },
      '&:hover fieldset': {
        borderColor: '#EBEBEB',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#323232',
      },
    },
  },
})(TextField);


function SignIn(props) {

  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const history = useHistory()

  const getLogin = async() =>{
    try{
      showLoader();
      axios.post('http://admidgroup.com/api_rest/index.php/api/loginusuario', {
        usuario: 'marcespinoza',
        clave: '0315866',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
          .then(response => {
             if(response.data.status===true){
               history.push("/main");
             }else{
             
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
    <Formik
    initialValues={{
        usuario: '',
        clave: '',
    }}
    validationSchema={Yup.object().shape({
        usuario: Yup.string()
            .required('Ingrese su usuario'),
        clave: Yup.string()
            .required('Ingrese su clave'),
    })}
    onSubmit={fields => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
    }}
>
    {({ errors, status, touched }) => (
        <Form>
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
         <img src={logo} className={classes.photo} alt="Logo" />
         <div style={{height:40, width:'400', paddingBottom:'70'}}>

         <Field name="usuario" type="text" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />         
         <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
         </div>
         <div style={{height:40, width:'400', paddingBottom:'70'}}>
         <Field name="clave" type="text" className={'form-control' + (errors.clave && touched.clave ? ' is-invalid' : '')} />
         <ErrorMessage name="clave" component="div" className="invalid-feedback" />
         </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => { getLogin()}}
            className={classes.submit}>
            Iniciar sesión
          </Button>
          <Copyright />
      </div>
    </Container>
    {loader}
    </>
    </Form>
   )}
   </Formik>
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

  export default withStyles(styles)(SignIn)