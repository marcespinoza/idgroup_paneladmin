import React, {useEffect, useContext, useState} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './../Main/HeaderMain'
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button'
import AgregarCuotaModal from './../../utils/AgregarCuotaModal'
import AgregarUnidadModal from '../../utils/AgregarUnidadModal'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Row, Col, Container} from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import ConfirmDialog from './../../utils/ConfirmDialog'

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
  const [loader, setLoader] = useState(false);
  const [cuotas, setCuotas] = useState([]);
  const [numeroCuota, setNumeroCuota] = useState('');
  const [variacion, setVariacion] = useState('');
  const [moneda, setMoneda] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalUnidadShow, setModalUnidadShow] = useState(false);
  const [unidad, setUnidad]= useState({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
  const [montoCuota, setMontoCuota] = useState('');
  const {datacliente, dispatch} = useContext(AppContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const[modalEliminar, setModalEliminar]= useState(false)

  const [state, setState] = React.useState({
    columns: [
      {title: 'IdCuota', field: 'id_cuota', hidden:true},
      {title: 'Adelanto', field: 'adelanto', hidden:true},
      {title: 'Número', field: 'numero', width:'50'},
      {title: 'Observación', field: 'observacion',  width:'50'},
      {title: 'Fecha', field: 'fecha', type: 'numeric' ,width:'50' },
      {title: 'Monto', field: 'monto', width:'50',  },
      {title: 'Moneda', field: 'moneda', width:'50' },
    ],
    
  }); 
  
    const changeInputValue = (newValue) => {
        dispatch({ type: 'UPDATE_INPUT', data: newValue,});
    };

    
    const checkIfEmpty = (e, param) => {
      if(cuotas.length===0 && datacliente.idCliente===''){
        toast.error('Seleccione un cliente antes de agregar una cuota', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      }else{
        //----Verifico que boton fue presionado----//
        if(param==='unidad'){
          setModalUnidadShow(true)  
        }else if(param==='eliminarunidad'){
          onShowEliminar(true)
        }else{
          setMontoCuota(cuotas.slice(0, cuotas.length)[cuotas.length-1].monto)
          setModalShow(true) 
        }
      }
    };

    const onHideUpdate = () =>{
      setModalShow(false)
      getCuotas2()
    }

    const onHideUnidadUpdate = () =>{
      setModalUnidadShow(false)
    }

    const onHideEliminar = () =>{
      setModalEliminar(false)
    }

    const onShowEliminar = () =>{
      setModalEliminar(true)
    }

    let unidadfuncional = "http://admidgroup.com/api_rest/index.php/api/unidadporcliente";
    let cuota = "http://admidgroup.com/api_rest/index.php/api/cuotasporcliente";
    let variacionmensual = "http://admidgroup.com/api_rest/index.php/api/variacion";
    
    var config2 = {
       idunidad: datacliente.idUnidad,
         headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
       },}     
    
    const requestOne = axios.post(unidadfuncional, config2);
    const requestTwo = axios.post(cuota, config2);
    const requestThree = axios.get(variacionmensual);
  

  const getCuotas = async(id_cli) =>{
    setLoader(true);
    setUnidad({ubicacion:'-', unidad:'-', dormitorios:'-', m2_propios:'-', m2_comunes:'-',total_m2:'-'});
    setCuotas([]);
    axios.all([requestOne, requestTwo, requestThree])
  .then(
    axios.spread((...responses) => {
      setUnidad(responses[0].data.unidad[0])
      setCuotas(responses[1].data.cuotas) 
      if(responses[1].data.cuotas[0].total==0){
        console.log("cuota 0")
        setCuotas([{id_cuota:'', adelanto:'',fecha:'', observacion:'Cuota inicial',numero:'-', monto:responses[1].data.cuotas[0].monto, moneda:responses[1].data.cuotas[0].moneda}]);
      } 
      setNumeroCuota(parseInt(responses[1].data.cuotas[0].total)+1);
      setVariacion(responses[2].data.variaciones[0].valor);
      setMoneda(responses[1].data.cuotas[0].moneda)
      setLoader(false);
    })
  )
  .catch(errors => {
    setLoader(false);
  });
  }  
  
  const getCuotas2 = async() =>{
    setLoader(true);
    try{
      axios.post('http://admidgroup.com/api_rest/index.php/api/cuotasporcliente', config2)
          .then(response => {
            if(response.data.status){
              setCuotas(response.data.cuotas)
              setNumeroCuota(parseInt(response.data.cuotas[0].total)+1);
            }
              setLoader(false);
            })
          .catch(error => {
              console.error('There was an error!', error);
              setLoader(false);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }  

  
  
  useEffect(() => {
    if(datacliente.idUnidad!=null){
      getCuotas(datacliente)
    }    
  }, [datacliente]);

  const handleRowDelete = (oldData, resolve) => {
    try{
        axios.post('http://admidgroup.com/api_rest/index.php/api/eliminarcuota', {
          idcuota: oldData.id_cuota,
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers":"X-Requested-With"
           },
          })
         .then(response => {
             
            if(response.data.status){              
              getCuotas2()
              resolve()
            }else{

            }          
            }
          )
          .catch(error => {
                console.error('There was an error!', error);
          });
      }catch(error){
        console.error('There was an error two!', error);
      }    
  }


  return (
  <div style={{flexDirection:'column', width:'100%'}}>  
  <ToastContainer/> 
  <AgregarCuotaModal idunidad={datacliente.idUnidad} numerocuota={numeroCuota} montocuota={montoCuota} moneda={moneda} variacion={variacion} show={modalShow} onHide={() => onHideUpdate()}/>
  <AgregarUnidadModal show={modalUnidadShow} onHide={() => onHideUnidadUpdate()}/>
  <ConfirmDialog
    title="Eliminar?"
    open={modalEliminar}
    setOpen={false}
    onConfirm={false}
    onCancel={() => onHideEliminar()} 
    idU={datacliente.idUnidad}>
    Seguro que desea eliminar esta unidad?
  </ConfirmDialog>
   <MaterialTable
      title="Cuotas"
      columns={state.columns}
      data={cuotas}
      isLoading={loader}
      style={{ margin:10}}
        editable={{  
        isDeleteHidden: rowData => rowData.numero === '-',
        onRowDelete: (oldData) =>
        new Promise((resolve) => {
          handleRowDelete(oldData, resolve)
        })
      }}
      onRowClick={(event, rowData) => console.log({datacliente})
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
        editRow:{
          deleteText:"Seguro que desea eliminar?"
        }, 
       }
      }}
      onRowClick={((evt, selectedRow) => console.log(selectedRow.adelanto))}
      options={{
        pageSize:3,
         headerStyle: {
          backgroundColor: '#323232',
          fontFamily:'Roboto',
          fontWeight: 900,
          color:'#DCDCDC'
      },
      rowStyle: rowData => ({
        backgroundColor: (rowData.adelanto === "1") ? '#C0FF9A' : '#FFF'
      })
      }}
      icons={{ 
        Delete: Eliminar,        
      }}
    />
      {loader}
  <Card border="dark" style={{margin:10}}>
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
  <Row style={{backgroundColor:'#20b1e8'}}>
    <Col className={classes.itemcardtitle}>ANTICIPO</Col>
    <Col className={classes.itemcardtitle}>1° REFUERZO</Col>
    <Col className={classes.itemcardtitle}>FECHA</Col>
    <Col className={classes.itemcardtitle}>2° REFUERZO</Col>
    <Col className={classes.itemcardtitle}>FECHA</Col>
    <Col className={classes.itemcardtitle}>NRO. COCHERA</Col>
  </Row>
  <Row >
    <Col className={classes.itemcard}>{unidad.anticipo}</Col>
    <Col className={classes.itemcard}>{unidad.refuerzo1}</Col>
    <Col className={classes.itemcard}>{unidad.fecha_refuerzo1}</Col>
    <Col className={classes.itemcard}>{unidad.refuerzo2}</Col>
    <Col className={classes.itemcard}>{unidad.fecha_refuerzo2}</Col>
    <Col className={classes.itemcard}>{unidad.cochera}</Col>
  </Row>
  </Card>
    <Button
    variant="contained"
    color="primary"
    id="cuota"
    style={{
      backgroundColor: "#20b1e8",
      margin:'10',
    }}
    onClick={() => checkIfEmpty()}
    startIcon={<Add />}>
    Cuota
  </Button>
  <Button
    variant="contained"
    color="primary"
    id="unidad"
    style={{
      backgroundColor: "#20b1e8",
      margin:'10',
    }}
    onClick={(event) => checkIfEmpty(event, 'unidad')}
    startIcon={<Add />}>
    Unidad funcional
  </Button>
  <Button
    variant="contained"
    color="secondary"
    id="unidad"
    style={{
      backgroundColor: "#DC004E",
      margin:'10',
    }}
    onClick={(event) => checkIfEmpty(event, 'eliminarunidad')}
    startIcon={<Delete />}>
    Unidad funcional
  </Button>
    </div >
  );
}
