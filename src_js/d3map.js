// port of https://bl.ocks.org/mbostock/3048450 into p5.js
var canvas

function setup() {

    var width = 790,
      height = 490;
  
    //create canvas
    createCanvas(width, height);
  
    canvas = createCanvas(width, height);
  
    //initialize a d3 projection. Set the scaling to 1/1000 and center it to the center of canvas.
    var projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);
  
    //get canvas context. d3 uses that to draw on canvas
    var context = canvas.getContext("2d");
  
    //create a path generator using the projection and context above.
    var pathGen = d3.geo.path().projection(projection).context(context);
  
  
    //topojson file containing map data
    var topojsonUrl = 'https://lenses-cors.herokuapp.com/https://bl.ocks.org/mbostock/raw/4090846/us.json';
    
    //load json file
    d3.json(topojsonUrl, function(error, us) {
      
      /*
        This d3 line does all the magic. It tels path-generator to draw all the states in the json file (e.g. us.objects.states). But first convert topojson to geojson using topojson function.
      */
      pathGen(topojson.feature(us, us.objects.states));
      
      //sets the colors. context.fillStyle/context.strokeStyle is the native js way of doing that but here the more familiar p5 command is being used
      fill('#CC0');
      stroke('#FFF');
      //context.fillStyle = '#CC0';
      //context.strokeStyle = '#FFF';
  
      //this tells d3 canvas path-generator to draw area and borders with colors above.
      context.fill();
      context.stroke();
      
  
      //now lets add some cities to the map
      var cities = [
        {name: 'Denver, CO',coords: [-104.9903, 39.7392]},
        {name: 'Chicago, IL',coords: [-87.6847, 41.8369]},
        {name: 'Los Angeles, CA', coords: [-118.25, 34.05]}
      
      ];
  
      for (var i = 0; i < cities.length; i++) {
        
        //convert lat/lang coordinates to canvas coordinates using the same projection
        var canvasCoords = projection(cities[i].coords);
        noStroke();
        fill('#000');
  
        push();
        translate(canvasCoords[0], canvasCoords[1]);
        
        ellipse(0, 0, 10, 10);
        text(cities[i].name, 7, 5);
        
        pop();
  
      }
  
    });
  
  }