//=========================================================================
// DECLARE VARIABLES
//=========================================================================

let statesInfo;
let statesList = [];

let bubbleSize = 50;
let bubbleColorMain = "#259F40";
let bubbleColorClick = "#FF8A00";


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
  }
}

function createStatesList(){
  let stateKeys = Object.keys(statesInfo);
  for (let i = 0; i < stateKeys.length; i++) {
    let stateKey = stateKeys[i]
    
    // Declare new state object with its info
    var state = new stateBubble2(x=1, y=1,
                                 stateName=stateKey,
                                 stateInfo=statesInfo[stateKey]);
    statesList.push(state);
  }
}

//=========================================================================
// STATE CLASS
//=========================================================================

class stateBubble2 {
  constructor(x, y, stateName, stateInfo) {
      this.x = x;
      this.y = y;
      this.stateName = stateName;
      this.stateInfo = stateInfo;

      // Declare positions of state draw
      this.xEllipse = this.x*bubbleSize*1.07
      this.yEllipse = this.y*bubbleSize*0.9
      this.xText = this.x*bubbleSize*1.07-textWidth(this.stateName)*0.5;
      this.yText = this.y*bubbleSize*0.9+10;
  }
 
  display() {
      fill(this.bubbleColorMain)
      stroke("white");
      ellipse(this.xEllipse, this.yEllipse, bubbleSize, bubbleSize);
      // noStroke();
      text(this.stateName, this.xText, this.yText);
  }
}

//=========================================================================
// DRAW PAGE
//=========================================================================

// function draw() {
//   //DISPLAY STATES
//   for (let i = 0; i < statesList.length; i++) {
//     // states[i].display(mouseX, mouseY);
//     statesList[i].display();
//   }
// }