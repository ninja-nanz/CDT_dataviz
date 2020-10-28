//=========================================================================
// DECLARE VARIABLES
//=========================================================================

var immigrationData;
var stateData = []; // array of state objects. Each object has state name, total immigrants, birthplaces and number of people
let input, button;
let stateDisplayObj;
let birthplacesObj;


//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
  birthplaceTable = loadTable('transposed_birthplace.csv', 'csv', 'header'); // the CSV data
}


function setup() { 
  createCanvas(windowWidth, windowHeight);

   
    
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


    stateDisplayObj = new stateDataDisplay(); //Creating state object for display

    

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
      selectedState = stateData[i];
      
      
      var ObjSortedByTop10 = Object.entries(selectedState)
                                .sort(([,a],[,b]) => b-a)
                                .slice(2, 12)
                                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      

      stateDisplayObj = new stateDataDisplay( state = selectedState.STATE,
                                              total =  selectedState.Total, 
                                              birthplaces = ObjSortedByTop10);

        /*

      // DISPLAY IN HTML  

      createElement('h2',  'Top 10 birthplaces of immigrants from ' + selectedState.STATE );
      for (const [key, value] of Object.entries(ObjSortedByTop10)) {
        
        createP(key +": "+ value);

      }

      createElement('h5',  'Total immigrants: ' + selectedState.Total);
      */
    }
    

   input.value("");

   
   
  }
}


class stateDataDisplay {
  constructor(state, total, birthplaces) {
    this.state = state;
    this.total = total, 
    this.birthplaces = birthplaces;
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);

  }


  display() {
    if (this.state !== undefined) {
      noFill();
      noStroke();
      fill('#ffffff');
      textSize(40);
      text(this.state, 200, 200);
      textSize(20);
      text("Total immigrant population: " + this.total, 200, 230);
      
      birthplacesObj = this.birthplaces

      /*

      Object.entries(this.birthplaces).forEach(([key, value]) => {
          fill('brown');
          ellipse(this.x, this.y, value/5000, value/5000);
          fill('white');
          textSize(20);
          text(`${key}: ${value}`, 200, 400);          

      })
      */

      //console.log(this.birthplaces)
    }
  }

  



}



//=========================================================================
// DRAW
//=========================================================================



function draw() { 

  createBackground();

  stateDisplayObj.display();

  if (birthplacesObj !== undefined) {
  
    Object.entries(birthplacesObj).forEach(([key, value]) => {
      fill('brown');
      ellipse(random(width), random(height), value/5000, value/5000);
      fill('white');
      textSize(20);
      text(`${key}: ${value} `, 200, 400); 
           
    })

  }

  
}
