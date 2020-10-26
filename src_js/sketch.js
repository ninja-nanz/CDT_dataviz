//=========================================================================
// DECLARE VARIABLES
//=========================================================================

var immigrationData;
var stateData = []; // array of state objects. Each object has state name, total immigrants, birthplaces and number of people
let input, button;


//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
  birthplaceTable = loadTable('transposed_birthplace.csv', 'csv', 'header'); // the CSV data
}


function setup() { 
   createCanvas(710, 400);
   
    
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
    input.position(500, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(showState);

    greeting = createElement('h2', 'Which U.S. state?');
    greeting.position(500, 5);


    
} 



//BACKGROUND 
function createBackground(){
  background('#D45402');
  
}


//=========================================================================
// SHOW STATE DATA
//=========================================================================


function showState() {

  const typedState = input.value(); //get state from input

  for (let i = 0; i < stateData.length; i++) {
    var stateName = stateData[i].STATE;
    
    if (stateName == typedState) {
      selectedState = stateData[i]

      
      var sortByTop10 = Object.entries(selectedState)
                                .sort(([,a],[,b]) => b-a)
                                .slice(0, 12)
                                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      for (const [key, value] of Object.entries(sortByTop10)) {
    
        createP(`${key}: ${value}`)

      }


    }

   input.value("");
   
  }


}


//=========================================================================
// DRAW
//=========================================================================



function draw() { 

  createBackground()

  //SHOW STATE

  for (let i = 0; i < stateData.length; i++) {
    
  }
  
}
