import React from 'react';
import MaterialTable from 'material-table';
import Camera from './../../utils/icons.js'




export default function ClientTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Fecha', field: 'name' , 
      // cellStyle: {
      //   backgroundColor: '#039be5',
      //   color: '#FFF'
      // },
     
    },
      { title: 'Monto', field: 'surname' },
      { title: 'Cotizacion', field: 'birthYear', type: 'numeric' },
      {title: 'Refuerzo 1', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
      {title: 'Refuerzo 2', field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
      { name: 'Marcelo', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Juan',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
      { name: 'Roberto', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Ricardo',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
      { name: 'Sebastian', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Pedro',  surname: 'Baran',  birthYear: 2017,  birthCity: 34,},
    ],
  });

  return (
    <MaterialTable
      title="Cuotas"
      columns={state.columns}
      data={state.data}
      style={{width:'50%'}}
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
        backgroundColor: '#81CCFE',
        fontFamily:'Roboto',
        fontWeight: 900,
        color:'#717171'
      }
      }}
      icons={{ 
        Add: Camera 
      }}
    />
  );
}
