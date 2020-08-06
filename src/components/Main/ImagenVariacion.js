import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SimpleImageSlider from "react-simple-image-slider";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop:10,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
       
      {
        img: 'http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionmayo.png',
       title: 'Image',
        author: 'author',
      },
      {
        img: 'http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png',
       title: 'Image',
        author: 'author',
      },
     ];

     const images = [
      { url: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png" },
      { url: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png" },
      { url: "http://admidgroup.com/api_rest/imagenes_variacion_mensual/variacionabril.png" },
  ];
export default function SingleLineGridList() {

  const classes = useStyles();

  return (
    <div>
    <SimpleImageSlider
        width={500}
        height={250}
        images={images}
    />
</div>
  );
}