import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Projection } from 'ol/proj';
import XYZ from 'ol/source/XYZ.js';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';


//projection 
const projection =new Projection({
  axisOrientation:'neu',
  global:false,
  units:'m',
  code:"EPSG:3857"
})

const osmlayer=new TileLayer({
  source:new OSM(),
  name:"OSM"

})
const googlesatellite = new TileLayer({
  source: new XYZ({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  }),
  visible: true,
  name: "Google Satellite",
});
//ortho
const ortho=new TileLayer({
  source:new TileWMS({
    url:"https://reservemyplot.com:4433/geoserver/sanquelim/wms?service=WMS&version=1.1.0&request=GetMap&layers=sanquelim%3Akodal_wetland_clippedcog&bbox=392416.7748%2C1721386.1589%2C392724.5209%2C1721796.8454&width=575&height=768&srs=EPSG%3A32643&styles=&format=application/openlayers",
    params:{"LAYERS":"sanquelim:kodal_wetland_clippedcog","VERSION":"1.1.1","FORMAT":"image/png"}

  }),
  name:"Orthophoto"
})

  //the vector layers 
  //waterbody

  const waterbody =new ImageLayer({
      source:new ImageWMS({
        url:"https://reservemyplot.com:4433/geoserver/sanquelim/wms?service=WMS&version=1.1.0&request=GetMap&layers=sanquelim%3Awaterbody&bbox=392551.8024244127%2C1721448.4889824511%2C392654.01513571176%2C1721632.3804492974&width=426&height=768&srs=EPSG%3A32643&styles=&format=application/openlayers",
        params:{"LAYERS":"sanquelim:waterbody","VERSION":"1.1.1","FORMAT":"image/png"}

      }),
      name:"Waterbody"
  })

  const buffer=new ImageLayer({
    source:new ImageWMS({
      url:"https://reservemyplot.com:4433/geoserver/sanquelim/wms?service=WMS&version=1.1.0&request=GetMap&layers=sanquelim%3Abuffer&bbox=392500.6879197554%2C1721397.7543982894%2C392702.6756694525%2C1721686.1292712002&width=537&height=768&srs=EPSG%3A32643&styles=&format=application/openlayers",
      params:{"LAYERS":"sanquelim:buffer","VERSION":"1.1.1","FORMAT":"image/png"}

    }),
    name:"Buffer Zone"
  })



  
  // Adjust zoom levels based on device width
  const isMobile = window.innerWidth <= 600; // Adjust this breakpoint as needed
  const zoomLevel = isMobile ? 17 : 18; // Zoom level for mobile and desktop
  
  // Configure the View
  const view = new View({
    center: [8237467.55,1754917.33],
    zoom: zoomLevel,
    projection: projection,
  });
  
  // Use the 'view' object in your OpenLayers map initialization
  

const map = new Map({
  target: 'map',
  layers: [googlesatellite,osmlayer,ortho,waterbody,buffer
    
  ],
  view:view
 

});
$('#map').data('map',map);