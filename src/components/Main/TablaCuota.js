import React, {useEffect, useContext, useState} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { AppContext } from './../Main/HeaderMain'

export default function ClientTable() {  

  const [state, setState] = React.useState({
    columns: [
      { title: 'Número', field: 'numero' },
      { title: 'Fecha', field: 'fecha', type: 'numeric' },
      {title: 'Monto', field: 'monto',},
      {title: 'Moneda', field: 'moneda'},
    ],
    
  }); 

  const [data, setData] = ([]);
  const [cuotas, setCuotas] = useState([]);

  const {idcliente, dispatch} = useContext(AppContext);

    const changeInputValue = (newValue) => {
        console.log("nuevo galor"+newValue);
        dispatch({ type: 'UPDATE_INPUT', data: newValue,});
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
            console.log(id_cli.inputText)
             if(response.data.status===true){
               setCuotas(response.data.cuotas)
             }else{
             
             }
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }                                     
  
  useEffect(() => {
    console.log("ESTOY ACTUAIANDO");
    getCuotas(idcliente)
  }, [idcliente]);

  return (
    <MaterialTable
      title="Cuotas"
      columns={state.columns}
      data={cuotas}
      style={{width:'50%', margin:10}}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
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
  );
}
