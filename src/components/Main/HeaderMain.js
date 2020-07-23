import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TablaCliente from './TablaCliente';
import TablaCuota from './TablaCuota';
import { FormLabel } from '@material-ui/core';

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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ID Group
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>        
      </AppBar>
      <TablaCliente/>
      <TablaCuota/>
      <view style={{flexDirection:'row'}}>
      <FormLabel>Hola</FormLabel>
      <FormLabel>Hola</FormLabel>
      </view>
    </div>
  );
}
