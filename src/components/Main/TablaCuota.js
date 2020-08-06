import React, {useEffect, useContext, useState} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './../Main/HeaderMain'
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import AgregarCuotaModal from './../../utils/AgregarCuotaModal'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Row, Col, Container} from 'react-bootstrap'
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  cardrow: {
    flex:1,
    flexDirection:'column'
  },
  itemcardtitle:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',     
      fontFamily:'roboto_black'   
  },
  itemcard:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }
}));

export default function ClientTable() {  

  const classes = useStyles();
  const [data, setData] = ([]);
  const [cuotas, setCuotas] = useState([]);
  const [numeroCuota, setNumeroCuota] = useState('');
  const [variacion, setVariacion] = useState('');
  const [moneda, setMoneda] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [unidad, setUnidad]= useState({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
  const [state, setState] = React.useState({
    columns: [
      {title: 'Número', field: 'numero', width:'50'},
      {title: 'Fecha', field: 'fecha', type: 'numeric' ,width:'50' },
      {title: 'Monto', field: 'monto', width:'50',  currencySetting: { 34: "hhh" }, },
      {title: 'Moneda', field: 'moneda', width:'50' },
    ],
    
  }); 
  const {idcliente, dispatch} = useContext(AppContext);
  
    const changeInputValue = (newValue) => {
        dispatch({ type: 'UPDATE_INPUT', data: newValue,});
    };

    
    const checkIfEmpty = () => {
      if(cuotas.length===0 && idcliente.inputText===''){
        toast.error('Seleccione un cliente antes de agregar una cuota', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      }else{
        setModalShow(true)
      }
    };

    let unidadfuncional = "http://admidgroup.com/api_rest/index.php/api/unidadporcliente";
    let cuota = "http://admidgroup.com/api_rest/index.php/api/cuotasporcliente";
    let variacionmensual = "http://admidgroup.com/api_rest/index.php/api/variacion";
    
    var config = {
      idcliente: idcliente.inputText,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },}
    
  const requestOne = axios.post(unidadfuncional, config);
  const requestTwo = axios.post(cuota, config);
  const requestThree = axios.get(variacionmensual);
  

  const getCuotas = async(id_cli) =>{
    setUnidad({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
    setCuotas([]);
    axios.all([requestOne, requestTwo, requestThree])
  .then(
    axios.spread((...responses) => {
      setUnidad(responses[0].data.unidad[0])
      setCuotas(responses[1].data.cuotas)    
      setNumeroCuota(parseInt(responses[1].data.cuotas[0].total)+1);
      setVariacion(responses[2].data.variaciones[0].valor);
      setMoneda(responses[1].data.cuotas[0].moneda)
    })
  )
  .catch(errors => {
    // react on errors.
    console.error("ERRORES "+errors);
  });
  }                                     
  
  useEffect(() => {
    getCuotas(idcliente)
  }, [idcliente]);

  return (
    <div style={{flexDirection:'column', width:'100%'}}>
  
  <ToastContainer/> 
  <AgregarCuotaModal idcliente={idcliente.inputText} numerocuota={numeroCuota} moneda={moneda} variacion={variacion} show={modalShow} onHide={() => setModalShow(false)}/>
  <MaterialTable
      title="Cuotas"
      columns={state.columns}
      data={cuotas}
      style={{ margin:10}}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new row")
        }
      ]}
        editable={{  
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      onRowClick={(event, rowData) => console.log({idcliente})
      }
      localization={{
        toolbar: {
          searchPlaceholder: "Buscar",
        },
        pagination: {
          labelRowsSelect:'filas',
          labelDisplayedRows:	'{from}-{to} de {count}'
         },     
         header : {
          actions: ''
       },    
       body:{
        emptyDataSourceMessage:"No hay registros para mostrar",

       }
      }}
      options={{
        pageSize:3,
         headerStyle: {
          backgroundColor: '#323232',
          fontFamily:'Roboto',
          fontWeight: 900,
          color:'#DCDCDC'
      }
      }}
      icons={{ 
        Delete: Eliminar,
      }}
    />
     <Card border="dark"  style={{margin:10}}>
  <Row style={{backgroundColor:'#20b1e8'}}>
    <Col className={classes.itemcardtitle}>UBICACION </Col>
    <Col className={classes.itemcardtitle}>UNIDAD </Col>
    <Col className={classes.itemcardtitle}>DORMITORIOS </Col>
    <Col className={classes.itemcardtitle}>M2 PROPIOS </Col>
    <Col className={classes.itemcardtitle}>M2 COMUNES </Col>
    <Col className={classes.itemcardtitle}>TOTAL M2 </Col>
  </Row>
  <Row >
    <Col className={classes.itemcard}>{unidad.ubicacion}</Col>
    <Col className={classes.itemcard}>{unidad.unidad}</Col>
    <Col className={classes.itemcard}>{unidad.dormitorios}</Col>
    <Col className={classes.itemcard}>{unidad.m2_propios}</Col>
    <Col className={classes.itemcard}>{unidad.m2_comunes}</Col>
    <Col className={classes.itemcard}>{unidad.total_m2}</Col>
  </Row>
  </Card>
    <Button
    variant="contained"
    color="primary"
    style={{
      backgroundColor: "#20b1e8",
      margin:'10',
    }}
    onClick={() => checkIfEmpty()}
    startIcon={<Add />}>
    Cuota
  </Button>
    </div >
  );
}
