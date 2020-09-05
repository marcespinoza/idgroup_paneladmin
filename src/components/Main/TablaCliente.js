import React, {useEffect, useState, useContext} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { AppContext } from './../Main/HeaderMain'

export default function TablaCuota()  { 

  useEffect(() => {
    getClientes()
  },[]);

  const [state, setState] = React.useState({
    columns: [
      {title: 'IdUnidad', field: 'id_unidad', hidden:true },
      {title: 'IdCliente', field: 'id_cliente', hidden:true },
      {title: 'Desarrollo', field: 'desarrollo'},    
      {title: 'Unidad', field: 'dpto'},     
      {title: 'Apellido', field: 'apellido' },
      {title: 'Nombre', field: 'nombre' },
      {title: 'Documento', field: 'documento', type: 'numeric' },
      {title: 'Direccion', field: 'direccion'},
      {title: 'Telefono', field: 'telefono'},
      {title: 'Fecha nacimiento', field: 'fecha_nacimiento'},
      {title: 'Interes', field: 'interes'},
      {title: 'Ocupacion', field: 'ocupacion'},
      {title: 'Correo', field: 'correo'},
    ],
  });

  const [clientes, setClientes] = useState([]);
  const [loader, setLoader]=useState(false);
  const {idcliente, dispatch} = useContext(AppContext);
  const [selectedRow, setSelectedRow] = useState(null);


  const getClientes = async() =>{
    setLoader(true)
    try{
      axios.get('http://admidgroup.com/api_rest/index.php/api/clientes')
          .then(response => {             
              setClientes(response.data.clientes)
              setLoader(false);
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
      setLoader(false);
    }
  }            
  
  const changeInputValue = (newValue) => {
    dispatch({ type: 'MARCELO', data: newValue,});
};

const wrapperFunction = (rowData) => {
  changeInputValue(rowData)
  setSelectedRow(rowData.id_cliente + rowData.id_unidad)
}

const handleRowDelete = (oldData, resolve) => {
  try{
      axios.post('http://admidgroup.com/api_rest/index.php/api/eliminarcliente', {
        idcliente: oldData.id_cliente,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers":"X-Requested-With"
         },
        })
       .then(response => {           
          if(response.data.status){  
            getClientes()            
          }else{

          }       
          resolve()   
          }
        )
        .catch(error => {
              console.error('There was an error!', error);
              resolve()
        });
    }catch(error){
      console.error('There was an error two!', error);
    }    
}

  return (
    <MaterialTable
      title="Clientes"
      columns={state.columns}
      style={{margin:10}}
      isLoading={loader}
      data={clientes}
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
            handleRowDelete(oldData, resolve)
          })
      }}
      onRowClick={(event, rowData) =>
        wrapperFunction(rowData)
      }
      localization={{
        toolbar: {
          searchPlaceholder: "Buscar",
        },
        pagination: {
          labelRowsSelect:'filas',
          labelDisplayedRows:	'{from}-{to} de {count}'
        },
        body:{
          emptyDataSourceMessage:"No hay registros para mostrar",  
          editRow:{
            deleteText:"Seguro que desea eliminar este cliente?"
          }, 
         }        
      }}
      options={{
        pageSize:3,
         headerStyle: {
        backgroundColor: '#323232',
        fontFamily:'Roboto',
        fontWeight: 900,
        color:'#DCDCDC'
      },
      rowStyle: rowData => ({
        backgroundColor: (selectedRow === rowData.id_cliente + rowData.id_unidad) ? '#EEE' : '#FFF'
      })
      }}
      icons={{ 
        Delete: Eliminar,
        Edit: Editar
      }}
    />
  );
}
