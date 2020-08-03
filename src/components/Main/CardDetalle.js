import React, {useEffect, useContext, useState} from 'react';
import ImageUploader from "react-images-upload";
import { makeStyles } from '@material-ui/core/styles';
import ImageVariacion from './../Main/ImagenVariacion'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    cardrow: {
      flex:1,
      flexDirection:'column'
    },
    itemcardtitle:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',        
    },
    itemcard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
  }));

export default function CardDetalle() {  

  const classes = useStyles();
  const handleOnDragStart = (e) => e.preventDefault()
  const [pictures, setPictures] = useState([]);

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  


  return(
      <div style={{width:'50%', margin:'10'}}>
  
  <ImageVariacion/>
  </div>
  );

  

}