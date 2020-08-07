import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import './../../App.css'


import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop:10,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

     const images = [
      { source: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png" },
      { source: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png" },
      { source: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionmayo.png" },
  ];
export default function SingleLineGridList() {

  const classes = useStyles();
  var imagen = [];
  const [imagenes, setImagenes] = useState([]);

  const getVariacionimagenes = async() =>{
    try{
      axios.get('http://admidgroup.com/api_rest/index.php/api/getimages')
          .then(response => {             
                
                Object.keys(response.data.variaciones).forEach(key => imagen.push({source: response.data.variaciones[key]}))
                setImagenes(imagen)
                console.log(imagen)
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }  
  

  useEffect(() => {
    if(imagen!=imagenes){
    getVariacionimagenes()}
  },[]);  

  return (
    <div>
     <AwesomeSlider style={{width:'45%', height:'30%'}} media={imagenes} >
  </AwesomeSlider>
</div>
  );
}