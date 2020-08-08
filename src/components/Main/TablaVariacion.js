import React, {useEffect, useState, useRef} from 'react';
import MaterialTable from 'material-table';
import {Editar, Eliminar} from './../../utils/Icons.js'
import axios from "axios";
import { AppContext } from './../Main/HeaderMain'

export default function TablaVariacion()  { 

  const [variacion, setVariacion] = useState([]);
  const [loader, setLoader]=useState(false);
  const ref = useRef();

  useEffect(() => {
    getVariacion()
  
  },[]);


  const [state, setState] = React.useState({
    columns: [
      {title: 'IdVariacion', field: 'id_variacion', hidden:true },
      {title: 'Variacion', field: 'valor'},
      {title: 'Mes', field: 'mes',  lookup: { 1: "ENERO", 2: "FEBRERO", 3: "MARZO" , 4: "ABRIL", 5: "MAYO", 6: "JUNIO" , 7: "JULIO"
      , 8: "AGOSTO", 9: "SEPTIEMBRE", 10: "OCTUBRE", 11: "NOVIEMBRE", 12: "DICIEMBRE"}},
      {title: 'Año', field: 'anio',lookup: { 1: "2020", 2: "2021", 3:"2022",4:"2023", 5:"2024", 6:"2025"} },
    ],
  });


  const getVariacion = async() =>{
    setLoader(true);
    try{
      axios.get('http://admidgroup.com/api_rest/index.php/api/variacion')
          .then(response => {
              setVariacion(response.data.variaciones)
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
  
  const handleRowDelete = (oldData, resolve) => {
    
    try{
        axios.post('http://admidgroup.com/api_rest/index.php/api/eliminarvariacion', {
          idvariacion: oldData.id_variacion,
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers":"X-Requested-With"
           },
          })
         .then(response => {
             console.log("ELIMInarcii "+response.data.status)
            if(response.data.status===true){              

               }else{
            }
            getVariacion()
            resolve()
            }
          )
          .catch(error => {
                console.error('There was an error!', error);
          });
      }catch(error){
        console.error('There was an error two!', error);
      }    
  }


     

  const handleRowAdd = (newData, resolve) => {
    try{
        axios.post('http://admidgroup.com/api_rest/index.php/api/agregarvariacion', {
          valor: newData.valor,
          mes: newData.mes,
          anio: newData.anio,
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers":"X-Requested-With"
           },
          })
         .then(response => {
            if(response.data.status===true){
              
 
               }else{
            }
            //  dataToAdd.push(newData);
            //  setVariacion([]);
             getVariacion()
             resolve()
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
    <MaterialTable
      title="Variación mensual"
      columns={state.columns}
      style={{margin:10}}
      data={variacion}
      isLoading={loader}
      editable={{
        onRowAdd: (newData) =>
        new Promise((resolve) => {
            handleRowAdd(newData, resolve)
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
            handleRowDelete(oldData, resolve)
          }),
      }}
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
              deleteText:"Seguro que desea eliminar?"
            }, 
            addTooltip:"Agregar variación"
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
