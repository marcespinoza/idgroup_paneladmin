import React, {useEffect, useContext, useState} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { AppContext } from './../Main/HeaderMain'
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import AgregarCuotaModal from './../../utils/AgregarCuotaModal'

export default function ClientTable() {  

  const [data, setData] = ([]);
  const [cuotas, setCuotas] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Número', field: 'numero', width:'50'},
      { title: 'Fecha', field: 'fecha', type: 'numeric' ,width:'50' },
      {title: 'Monto', field: 'monto', width:'50',  currencySetting: { 34: "hhh" }, },
      {title: 'Moneda', field: 'moneda', width:'50' },
    ],
    
  }); 
  const {idcliente, dispatch} = useContext(AppContext);

    const changeInputValue = (newValue) => {
        console.log("nuevo galor"+newValue);
        dispatch({ type: 'UPDATE_INPUT', data: newValue,});
    };

    const checkIfEmpty = () => {
      if(cuotas.length===0){
        alert("Selecicone cliente");
      }
    };

  const getCuotas = async(id_cli) =>{
    try{
      axios.post('http://admidgroup.com/api_rest/index.php/api/cuotasporcliente', {
        idcliente: id_cli.inputText,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
          .then(response => {
             if(response.data.status===true){
               setCuotas(response.data.cuotas)
             }else{
             
             }
             console.log(response.data.cuotas);

            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }                                     
  
  useEffect(() => {
    getCuotas(idcliente)
  }, [idcliente]);

  return (
    <div style={{flexDirection:'column', width:'100%'}}>
    <Button
    variant="contained"
    color="default"
    style={{margin:'10'}}
    onClick={() => checkIfEmpty()}
    startIcon={<Add />}>
    Cuota
  </Button>
  <AgregarCuotaModal show={modalShow} onHide={() => setModalShow(false)}/>
    <MaterialTable
      title="Cuotas"
      columns={state.columns}
      data={cuotas}
      style={{width:'100%', margin:10}}
      editable={{
      
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
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
        Edit: Editar
      }}
    />
    </div >
  );
}
