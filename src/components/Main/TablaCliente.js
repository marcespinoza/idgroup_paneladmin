import React from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'


export default function TablaCuota() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Apellido', field: 'name' },
      { title: 'Nombre', field: 'surname' },
      { title: 'Documento', field: 'birthYear', type: 'numeric' },
      {title: 'Direccion', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Telefono', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Fecha nacimiento', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Interes', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Ocupacion', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Correo', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
      { name: 'Marcelo', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Juan',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
      { name: 'Roberto', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    ],
  });

  return (
    <MaterialTable
      title="Clientes"
      columns={state.columns}
      style={{margin:10}}
      data={state.data}
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
        console.log(
          "Dropped column from " + rowData.name 
        )
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
