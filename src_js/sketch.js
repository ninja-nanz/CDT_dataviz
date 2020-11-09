//=========================================================================
// DECLARE VARIABLES
//=========================================================================

let statesInfo;
let statesList = [];

let bubbleSize = 50;
let bubbleColorMain = "#259F40";
let bubbleColorClick = "#FF8A00";
let mouseXinBox, mouseYinBox;

//=========================================================================
// SETUP CODE
//=========================================================================

function preload() {
  statesInfo = loadJSON("./results/statesInfo.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // From global window sizes

  // Background
  createDataVizBackground();
  
  // Create a list of states from JSON data
  createStatesList();

  // Create a list of state buttons
  createStateButtons();

  checkStatesInfo();
}

function createDataVizBackground(){
  background('#FFF8EE');

  let title = createElement('h1', "What is America's favorite cuisine?");
  title.position(50, windowHeight-240);

  let subtitle = createElement('p', "America's is known for it's diversity of people and cuisines.\
                                    Explore how much our favourite types of cuisines match the immigrant \
                                    population in each state.");
  subtitle.position(50, windowHeight-120);
}

function checkStatesInfo() {
  console.log(typeof statesInfo);
  console.log(statesInfo.AK.top1.counts);
  console.log(statesInfo);
  for (let i = 0; i < statesList.length; i++) {
    console.log(statesList[i].stateName)
    //console.log(statesList[i].row)
    //console.log(statesList[i].col)
    console.log(statesList[i].xEllipse)
    console.log(statesList[i].yEllipse)
  }
}

function createStatesList(){  
  let stateKeys = Object.keys(statesInfo);
  for (let i = 0; i < stateKeys.length; i++) {
    let stateKey = stateKeys[i]
    
    // Declare new state object with its info
    var state = new stateBubble2(row=statesInfo[stateKey].row, 
                                 col=statesInfo[stateKey].col,
                                 stateName=stateKey,
                                 stateInfo=statesInfo[stateKey]);
    statesList.push(state);
  }
}

function createStateButtons(){
      // Declare Button
      var stateKeys = Object.keys(statesInfo);
      for (let i = 0; i < stateKeys.length; i++) {
        stateKey = stateKeys[i];
        stateBub = statesList[i];

        createButton(stateKey)
          .position(stateBub.xEllipse, stateBub.yEllipse)
          .style('background-color', color(bubbleColorMain))
          .mousePressed(createMousePressedFunction(stateKey));
      }
}

function createMousePressedFunction(stateKey) {
  return function() {fun(stateKey);}

  function fun(value) {
    console.log(value)
  }
}

//=========================================================================
// STATE CLASS
//=========================================================================

// US MAP matrix
// let stateShow = [1,0,0,0,0,0,0,0,0,0,0,0,1,
//                  0,0,0,0,0,0,0,0,0,0,1,1,0,
//                  0,1,1,1,1,1,0,1,0,1,1,1,0,
//                  0,1,1,1,1,1,1,1,1,1,1,0,0,
//                  0,1,1,1,1,1,1,1,1,1,0,0,0,
//                  0,1,1,1,1,1,1,1,1,0,0,0,1,
//                  0,0,0,1,1,1,1,1,1,0,0,0,0,
//                  0,0,0,1,0,0,0,1,0,0,0,0,0,
//                  1,0,0,0,0,0,0,0,1,0,0,0,0];

// MAP defines row and col positions parsed with python
// stateShow = np.array([["AK","NA","NA","NA","NA","NA","NA","NA","NA","NA","NA","NA","ME"],
//                       ["NA","NA","NA","NA","NA","NA","NA","NA","NA","NA","VT","NH","NA"],
//                       ["NA","WA", "MT", "ND", "MN", "WI","NA","MI","NA","NY", "MA", "RI","NA"],
//                       ["NA","ID", "WY", "SD", "IA", "IL", "IN", "OH","PA", "NJ", "CT","NA","NA"],
//                       ["NA","OR", "NV", "CO", "NE", "MO", "KY", "WV","MD", "DE","NA","NA","NA"],
//                       ["NA","CA", "AZ", "UT", "KS", "AR", "TN", "VA", "NC","NA","NA","NA","DC"],
//                       ["NA","NA","NA","NM", "OK", "LA", "MS", "AL", "SC","NA","NA","NA","NA"],
//                       ["NA","NA","NA","TX","NA","NA","NA","GA","NA","NA","NA","NA","NA"],
//                       ["HI","NA","NA","NA","NA","NA","NA","NA","FL","NA","NA","NA","NA"]])


class stateBubble2 {
  constructor(row, col, stateName, stateInfo) {
      this.col = col;
      this.row = row;
      this.bubbleColor = bubbleColorMain;

      // Define x and y with window parameters
      let xTranslation = (width-13)*0.001; // For columns of US MAP
      let yTranslation = (height-9)*0.004; // For rows of US MAP      
      this.x = (col*1.2) + xTranslation;
      this.y = (row*1.2) + yTranslation;

      this.stateName = stateName;
      this.stateInfo = stateInfo;

      // Declare positions of state draw
      this.xEllipse = this.x*bubbleSize*1.07
      this.yEllipse = this.y*bubbleSize*0.9
      this.xText = this.x*bubbleSize*1.07-textWidth(this.stateName)*0.5;
      this.yText = this.y*bubbleSize*0.9+10;

      // Declare Button
      // this.button = createButton(this.stateName);
      // this.button.position(this.xEllipse, this.yEllipse);
      // this.button.style('background-color', color(bubbleColorMain));
      // this.button.mousePressed(this.displayStateInfo);
  }
 
  // display() {
  //     fill(this.bubbleColor)
  //     stroke("white");
  //     ellipse(this.xEllipse+32, this.yEllipse+23, bubbleSize, bubbleSize);
  //     noStroke();
  //     // text(this.stateName, this.xText, this.yText);
  // }

  displayStateInfo(){
    //this.bubbleColor = bubbleColorClick;
    //text("AQUI AQUI AQUI", 60, 100);
    console.log("this.stateName", this.stateName)
    text(this.stateName, 60, 110);
    // button.style('background-color', 'red')
  }
}

//=========================================================================
// DRAW PAGE
//=========================================================================

// function draw() {
//   //DISPLAY STATES
//   for (let i = 0; i < statesList.length; i++) {
//     statesList[i].display();
//   }
// }
