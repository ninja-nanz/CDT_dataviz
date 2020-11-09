//=========================================================================
// DECLARE VARIABLES
//=========================================================================

var immigrationData;
var stateData = []; // array of state objects. Each object has state name, total immigrants, birthplaces and number of people
var flagData = [];
let input, button;
let stateDisplayObj;
let birthplacesObj;
let birthplacesPosx;
let birthplacesPosy;
var ObjSortedByTop10;
let ballfill = ['#0A2B49','#0A2B49','#0E3C5E','#206F96','#4EAACE','#80D0C7','#42B29F','#308474','#124C41','#083F35','#0B231E']

let bubblemapObj;
let bg;



//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
  birthplaceTable = loadTable('./data/transposed_birthplace.csv', 'csv', 'header'); // the CSV data
  flagJSON = loadJSON('./data/birthplaces.json');
  stateCompleteInfo = loadJSON('./results/final_json.txt');
  //bg = loadImage("./data/plainplate.png");
}



function setup() { 
  createCanvas(windowWidth, windowHeight);
  


  //Putting Data in Arrays

    //Putting Objects in an Array from CSV
    var immigrationData = birthplaceTable.getObject();
    for (const [key, value] of Object.entries(immigrationData)) {
      var stateObj = value;
      stateData.push(stateObj);
    }
    
    //FLAG Objects in Array from JSON
     for (const [key, value] of Object.entries(flagJSON)) {
      var birthplacecountryObj = value;
      flagData.push(birthplacecountryObj)
    }

    


  //Input field to Type state
    
    input = createInput();
    input.position(windowWidth /2 - 400, 20);

    button = createButton('submit');
    button.position(input.x + input.width+10, 20);
    button.mousePressed(showStateData);

    greeting = createElement('h2', 'Which U.S. state?');
    greeting.position(windowWidth /2 - 600, 20);


    stateDisplayObj = new stateDataDisplay(); //Creating state object for display

  //Text
    let title = createElement('h1', "What is America's favorite cuisine?");
    title.position(50, windowHeight-240);

    let subtitle = createElement('p', "America's is known for it's diversity of people and cuisines. Explore how much our favourite types of cuisines match the immigrant population in each state");
    subtitle.position(50, windowHeight-120);


} 

//BACKGROUND 
function createBackground(){

  background('#FFF8EE');
  

  
  //Display Bubble Map
  bubblemapObj = new bubbleMap(); 
  bubblemapObj.drawGrid();


  


  


}

//=========================================================================
// SHOW EACH STATES DATA
//=========================================================================

function showStateData() {

  const typedState = input.value(); //get state name from input

  for (let i = 0; i < stateData.length; i++) {
    var stateName = stateData[i].STATE;
    
    if (stateName == typedState) {
      selectedState = stateData[i];
      
      ObjSortedByTop10 = Object.entries(selectedState)
                                .sort(([,a],[,b]) => b-a)
                                .slice(2, 12)
                                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      stateDisplayObj = new stateDataDisplay( state = selectedState.STATE,
                                              total =  selectedState.Total, 
                                              birthplaces = ObjSortedByTop10);

    }

   input.value(""); //clears input field

  }
}

class stateDataDisplay {
  constructor(state, total, birthplaces) {
    this.state = state;
    this.total = total;
    this.birthplaces = birthplaces; //obj
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);

  }

  display() {
    if (this.state !== undefined) {
      noFill();
      noStroke();
      fill(75);
      textSize(30);
      text(this.state, windowWidth /2 - 500, 0);
      textSize(20);
      text("Total immigrant population: " + this.total, windowWidth /2 - 500, 20);
      
      birthplacesObj = this.birthplaces;
      birthplacesPosx = windowWidth - 600;
      birthplacesPosy = 0; 

    }
  }
}

//=========================================================================
// DRAW
//=========================================================================

function draw() { 

  createBackground();

  let c=0; // color increment

  if (birthplacesObj !== undefined) {
    fill(75);
    textSize(16);
    text("COUNTRY", birthplacesPosx, birthplacesPosy); 
  
    Object.entries(birthplacesObj).forEach(([key, value]) => {
      fill(75);
      textSize(16);
      text(`${key} \n${value} `, birthplacesPosx, birthplacesPosy+=40); 

      
      for (let i = 0; i < flagData.length; i++) { //NOT SHOWING IMAGE :()
        if (key == flagData[i].name) {

          flagimg = loadImage(flagData[i].flagURL)
          
          image(flagimg, 10, 10, 50, 50 )
        }
      } 


      
      for (let i = 0; i < 1; i++) {
        c+=1
        fill(ballfill[c]);
        stroke('white');
        rect(birthplacesPosx+ 170, birthplacesPosy-=15, value/3000, 35)
        noFill();
        noStroke();
        rect(birthplacesPosx , birthplacesPosy+=35, 0, 0)
       // ellipse(birthplacesPosx + 200, birthplacesPosy+=20, sqrt(value)/10, sqrt(value)/10);
      }

    })
  }

  stateDisplayObj.display();


   
 

  
}
