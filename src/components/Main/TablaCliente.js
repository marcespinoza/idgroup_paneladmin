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
      { title: 'IdCliente', field: 'id_cliente', hidden:true },
      { title: 'Apellido', field: 'apellido' },
      { title: 'Nombre', field: 'nombre' },
      { title: 'Documento', field: 'documento', type: 'numeric' },
      {title: 'Direccion', field: 'direccion',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Telefono', field: 'telefono'},
      {title: 'Fecha nacimiento', field: 'fecha_nacimiento'},
      {title: 'Interes', field: 'interes'},
      {title: 'Ocupacion', field: 'ocupacion'},
      {title: 'Correo', field: 'ocupacion'},
      {title: 'Correo', field: 'correo' },
      {title: 'Correo', field: 'clave'},
    ],
    // data: [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   { name: 'Zerya Betül',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
    //   { name: 'Marcelo', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   { name: 'Juan',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
    //   { name: 'Roberto', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    // ],
  });

  const [clientes, setClientes] = useState([]);
  const {idcliente, dispatch} = useContext(AppContext);

  const getClientes = async() =>{
    try{
      axios.get('http://admidgroup.com/api_rest/index.php/api/clientes')
          .then(response => {
             
              setClientes(response.data.clientes)
             
            })
          .catch(error => {
              console.error('There was an error!', error);
        });
    }catch(error){
      console.error('There was an error two!', error);
    }
  }            
  
  const changeInputValue = (newValue) => {
    dispatch({ type: 'MARCELO', data: newValue,});
};

  return (
    <MaterialTable
      title="Clientes"
      columns={state.columns}
      style={{margin:10}}
      data={clientes}
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
