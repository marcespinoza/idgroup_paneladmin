import React, {useState, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TablaCliente from './TablaCliente';
import TablaCuota from './TablaCuota';
import CardDetalle from './CardDetalle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Popup from './../../utils/Popup'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const AppContext = React.createContext();

const initialState = {
  inputText: '',
};

function reducer(state, action) {
  switch (action.type) {
      case 'UPDATE_INPUT':
        return {
          inputText: action.data,
      };

      default:
        return {
          inputText: action.data,
      };
  }
}

export default function ButtonAppBar() {

  const classes = useStyles();
  const [cliente, setIdCliente] = useState("");
  const[showpopup, setShowpopup] = useState(false)
  const showPopUp = () => {
    setShowpopup(true);
  };
  const closePopUp = () => {
    console.log('CERRAR POPUP');
    setShowpopup(false);
  };
  
const [idcliente, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:'#20b1e8'}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Panel de administración
          </Typography>
          <IconButton color="primary" aria-label="upload picture" onClick={showPopUp} component="span">
          <PhotoCamera />
        </IconButton>
          <Button color="inherit" >Cerrar sesión</Button>
        </Toolbar>        
      </AppBar>
      <AppContext.Provider value={{ idcliente, dispatch }}>
      <TablaCliente/>
      <div style={{display:'flex', flexDirection:'row', margin:10}}>
        <TablaCuota/>
        <CardDetalle/>
        {showpopup ?  
        <Popup closePopUp={closePopUp} showpopup={showpopup} /> : null}
      </div>
      </AppContext.Provider>
      <div style={{flexDirection:'row'}}>
      </div>
    </div>
  );
}
