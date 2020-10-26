//=========================================================================
// DECLARE VARIABLES
//=========================================================================

var immigrationData;
var stateData = []; // array of state objects. Each object has state name, total immigrants, birthplaces and number of people
let input, button;
let stateDisplayObj;


//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
  birthplaceTable = loadTable('transposed_birthplace.csv', 'csv', 'header'); // the CSV data
}


function setup() { 
  createCanvas(windowWidth, 200);

   
    
   // noCanvas();
    var immigrationData = birthplaceTable.getObject();

    //Putting Ojects in an Array
    for (const [key, value] of Object.entries(immigrationData)) {
      var stateObj = value;
      stateData.push(stateObj);
    }
    
    console.log(stateData);

  //Input field 
    
    input = createInput();
    input.position(190, 90);

    button = createButton('submit');
    button.position(input.x + input.width, 90);
    button.mousePressed(showStateData);

    greeting = createElement('h2', 'Which U.S. state?');
    greeting.position(0, 20);


  // stateDisplayObj = new stateDataDisplay();

  

} 



//BACKGROUND 
function createBackground(){
  background('#D45402');
  fill(0, 0, 100)
  
}


//=========================================================================
// SHOW STATE DATA
//=========================================================================


function showStateData() {

  const typedState = input.value(); //get state from input

  for (let i = 0; i < stateData.length; i++) {
    var stateName = stateData[i].STATE;
    
    if (stateName == typedState) {
      selectedState = stateData[i]

      
      createElement('h2',  'Top 10 birthplaces of immigrants from ' + selectedState.STATE );
      
      
      var ObjSortedByTop10 = Object.entries(selectedState)
                                .sort(([,a],[,b]) => b-a)
                                .slice(2, 12)
                                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      

      stateDisplayObj = new stateDataDisplay( state = selectedState.STATE,
                                              total =  selectedState.Total, 
                                              birthplaces = ObjSortedByTop10);

      for (const [key, value] of Object.entries(ObjSortedByTop10)) {
        
        createP(key +": "+ value);

      }

      createElement('h5',  'Total immigrants: ' + selectedState.Total);

    }

   input.value("");

   
   
  }
}


class stateDataDisplay {
  constructor(state, total, birthplaces) {
    this.state = state;
    this.total = total, 
    this.birthplaces = birthplaces;
    this.x = 50;
    this.y = 50 ;
    this.diameter = random(50, 50);

  }


  display() {
    fill("#ffffff");
    text(this.state);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    
  }
}



//=========================================================================
// DRAW
//=========================================================================



function draw() { 

  createBackground();
  stateDisplayObj.display();
  
  
}
