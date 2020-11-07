//=========================================================================
// DECLARE VARIABLES
//=========================================================================
let birthplaceData;
let canvas;

let geodata;
let polygons;


//MAPPA
const key = 'pk.eyJ1IjoibmFuZGluaW5haXIiLCJhIjoiY2tneWc1NnFlMDU1YTJ4cDc4M2s2NWhyayJ9.P5R1kHMYmu4TdQR49pgxMQ'
const mappa = new Mappa('Mapbox', key);
let myMap;


const options = {
    lat: 48.963,
    lng: -115.171,
    zoom: 4,
    studio: true,
    style: 'mapbox://styles/nandininair/ckgyik2hk0zlj19p5t5yf2zsb',
}
  

//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
    birthplaceData = loadJSON('./data/birthplaces.json');
   // geodata = loadJSON('us-states.geojson');
 
 
}

function setup() {
    canvas = createCanvas(1000, 700);

    //for (let i = 0; i < birthplaceData.birthplaces.length; i++) {
    //    console.log(birthplaceData.birthplaces[i].name)
    //}

    /*
    for (let i = 0; i < statesData.features.length; i++) {
        console.log(statesData.features[i].properties.name)
       // console.log(statesData.features[i].geometry.coordinates)
    }
    */
    
    
    
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);

    //polygons = myMap.geoJSON(geodata, 'MultiPolygon')


}




function draw() {
    //background(0);
    clear();
   
    

    const pos = myMap.latLngToPixel(11.396396, 5.076543); 
    fill("yellow");
    ellipse(pos.x, pos.y, 20, 20);
}
