import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(8),
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
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
    color:"#FFF"
  },
  photo: {
    width: 100,
    height: 100,
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
        clave: '031586',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
          .then(response => {
             if(response.data.status=='true'){
               history.push("/main");
             }else{

             }
             hideLoader();
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error!', error);
    }
  }                                     
  

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
         <img src={logo} className={classes.photo} alt="Logo" />
        <form className={classes.form} noValidate>
          <CssTextField
        className={classes.margin}
        label="Usuario"
        margin="normal"
        fullWidth
        id="custom-css-outlined-input"
      />
      <CssTextField
        className={classes.margin}
        label="Contraseña"
        margin="normal"
        fullWidth
        id="custom-css-outlined-input"
      />
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
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    {loader}
    </>
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