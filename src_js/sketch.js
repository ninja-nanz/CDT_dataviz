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

  // Console Logs for debugging purposes
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
        stateInfo = statesInfo[stateKey];

        createButton(stateKey)
          .position(stateBub.xEllipse, stateBub.yEllipse)
          .style('background-color', color(bubbleColorMain))
          .mousePressed(createMousePressedFunction(stateInfo));
      }
}

function createMousePressedFunction(stateInfo) {
  return function() {fun(stateInfo);}

  function fun(info) {

    // Plot the title of extra info
    background('#FFF8EE');
    noStroke();
    fill(75);
    textSize(30);
    text(info.state_name, windowWidth /2 + 500, 200);
    textSize(20);
    
    // Plot the immigrant population per state
    plotPopulationBars(info)
  
  }
}

function plotPopulationBars(info) {
  let topList = ["top1", "top2", "top3", "top4", "top5", 
                 "top6", "top7", "top8", "top9", "top10"]

  birthplacesPosx = windowWidth - 600;
  birthplacesPosy = 300; 
  textAlign(RIGHT);
  text("Total immigrant population: " + info.total_population, 
                                        birthplacesPosx+200, 250);

  for (let i = 0; i < topList.length; i++) {
    let population_perc = info[topList[i]].population / info.total_population
    let restaurant_perc = info[topList[i]].counts / info.total_restaurants
    let country = info[topList[i]].country
    let population_count = info[topList[i]].population
    let cuisine_count = info[topList[i]].counts

    fill(bubbleColorClick);
    stroke('white');
    // country names
    textSize(16);
    text(country, birthplacesPosx-10, birthplacesPosy+=60); 

    // population bars
    rect(birthplacesPosx+30, birthplacesPosy-=20, population_perc*500, 35);
    //noFill();
    noStroke();
    rect(birthplacesPosx , birthplacesPosy, 0, 0);
    textSize(10);
    text("population: "+population_count, birthplacesPosx+230, birthplacesPosy); 

    // restaurant bars
    fill(bubbleColorMain);
    rect(birthplacesPosx+30, birthplacesPosy+=10, restaurant_perc*200, 30);
    textSize(10);
    text("restaurants: "+cuisine_count, birthplacesPosx+230, birthplacesPosy); 
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

// Position comes in JSON file no need for anything fancy in JS
// Position is defined by position in matrix of names

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

  }
}

//=========================================================================
// DRAW PAGE
//=========================================================================

