import React, {useEffect, useContext, useState} from 'react';
import Card from '@material-ui/core/Card';
import ImageUploader from "react-images-upload";
import { makeStyles } from '@material-ui/core/styles';
import {Row, Col, Container} from 'react-bootstrap'
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

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.raw);
    axios.post('http://admidgroup.com/api_rest/index.php/api/subirimagen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return(
      <div style={{width:'50%', margin:'10'}}>
        <Card>
  <Row style={{backgroundColor:'#20b1e8'}}>
    <Col className={classes.itemcard}>UBICACION </Col>
    <Col className={classes.itemcard}>UNIDAD </Col>
    <Col className={classes.itemcard}>DORMITORIOS </Col>
    <Col className={classes.itemcard}>M2 PROPIOS </Col>
    <Col className={classes.itemcard}>M2 COMUNES </Col>
    <Col className={classes.itemcard}>TOTAL M2 </Col>
  </Row>
  <Row >
    <Col className={classes.itemcard}>2 </Col>
    <Col className={classes.itemcard}>202 </Col>
    <Col className={classes.itemcard}>2</Col>
    <Col className={classes.itemcard}>0</Col>
    <Col className={classes.itemcard}>0 </Col>
    <Col className={classes.itemcard}>99.42</Col>
  </Row>
  </Card>
  <ImageVariacion/>
  </div>
  );

  

}