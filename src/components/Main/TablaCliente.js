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
      {title: 'IdCliente', field: 'id_cliente', hidden:true },
      {title: 'Unidad', field: 'dpto'},     
      {title: 'Apellido', field: 'apellido' },
      {title: 'Nombre', field: 'nombre' },
      {title: 'Documento', field: 'documento', type: 'numeric' },
      {title: 'Direccion', field: 'direccion',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
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
  
  const changeInputValue = (newValue) => {console.log("valor"+newValue);
    dispatch({ type: 'MARCELO', data: newValue,});
};


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
      onRowClick={(event, rowData) =>
       changeInputValue(rowData.id_cliente)
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
        Edit: Editar
      }}
    />
  );
}
