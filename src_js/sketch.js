//=========================================================================
// DECLARE VARIABLES
//=========================================================================

let statesJSON;
let flagsJSON;
let statesList = [];

let bubbleSize = 40;
let bubbleColorMain = "#259F40";
let bubbleColorClick = "#FF8A00";
let mouseXinBox, mouseYinBox;
var state;

let bgPlate;

// Because P5 Preload is uuuuuuugly
let flagsImagesJSON = {'Bosnia and Herzegovina': {'path': '../data/birthplace_flags/Bosnia_Herzegovina.png'},
                       'Brazil': {'path': '../data/birthplace_flags/Brazil.png'},
                       'Burma': {'path': '../data/birthplace_flags/Myanmar.png'},
                       'Cabo Verde': {'path': '../data/birthplace_flags/CapeVerde.png'},
                       'Cambodia': {'path': '../data/birthplace_flags/Cambodia.png'},
                       'Canada': {'path': '../data/birthplace_flags/Canada.png'},
                       'China': {'path': '../data/birthplace_flags/China.png'},
                       'Colombia': {'path': '../data/birthplace_flags/Colombia.png'},
                       'Cuba': {'path': '../data/birthplace_flags/Cuba.png'},
                       'Dominican Republic': {'path': '../data/birthplace_flags/DominicanRepublic.png'},
                       'Ecuador': {'path': '../data/birthplace_flags/Ecuador.png'},
                       'Egypt': {'path': '../data/birthplace_flags/Egypt.png'},
                       'El Salvador': {'path': '../data/birthplace_flags/ElSalvador.png'},
                       'England': {'path': '../data/birthplace_flags/UnitedKingdom.png'},
                       'Ethiopia': {'path': '../data/birthplace_flags/Ethiopia.png'},
                       'France': {'path': '../data/birthplace_flags/France.png'},
                       'Germany': {'path': '../data/birthplace_flags/Germany.png'},
                       'Guatemala': {'path': '../data/birthplace_flags/Guatemala.png'},
                       'Guyana': {'path': '../data/birthplace_flags/Guyana.png'},
                       'Haiti': {'path': '../data/birthplace_flags/Haiti.png'},
                       'Honduras': {'path': '../data/birthplace_flags/Honduras.png'},
                       'India': {'path': '../data/birthplace_flags/India.png'},
                       'Iran': {'path': '../data/birthplace_flags/Iran.png'},
                       'Iraq': {'path': '../data/birthplace_flags/Iraq.png'},
                       'Italy': {'path': '../data/birthplace_flags/Italy.png'},
                       'Jamaica': {'path': '../data/birthplace_flags/Jamaica.png'},
                       'Japan': {'path': '../data/birthplace_flags/Japan.png'},
                       'Kenya': {'path': '../data/birthplace_flags/Kenya.png'},
                       'Korea': {'path': '../data/birthplace_flags/SouthKorea.png'},
                       'Laos': {'path': '../data/birthplace_flags/Laos.png'},
                       'Lebanon': {'path': '../data/birthplace_flags/Lebanon.png'},
                       'Liberia': {'path': '../data/birthplace_flags/Liberia.png'},
                       'Mexico': {'path': '../data/birthplace_flags/Mexico.png'},
                       'Nepal': {'path': '../data/birthplace_flags/Nepal.png'},
                       'Nicaragua': {'path': '../data/birthplace_flags/Nicaragua.png'},
                       'Nigeria': {'path': '../data/birthplace_flags/Nigeria.png'},
                       'Oceania, n.e.c.': {'path': '../data/birthplace_flags/NewZealand.png'},
                       'Oceania, nec': {'path': '../data/birthplace_flags/NewZealand.png'},
                       'Other Eastern Africa': {'path': '../data/birthplace_flags/Somalia.png'},
                       'Other Middle Africa': {'path': '../data/birthplace_flags/DemocraticRepublicOfTheCongo.png'},
                       'Other South Central Asia': {'path': '../data/birthplace_flags/Mongolia.png'},
                       'Pakistan': {'path': '../data/birthplace_flags/Pakistan.png'},
                       'Peru': {'path': '../data/birthplace_flags/Peru.png'},
                       'Philippines': {'path': '../data/birthplace_flags/Philippines.png'},
                       'Poland': {'path': '../data/birthplace_flags/Poland.png'},
                       'Portugal': {'path': '../data/birthplace_flags/Portugal.png'},
                       'Russia': {'path': '../data/birthplace_flags/Russia.png'},
                       'Somalia': {'path': '../data/birthplace_flags/Somalia.png'},
                       'Taiwan': {'path': '../data/birthplace_flags/Taiwan.png'},
                       'Thailand': {'path': '../data/birthplace_flags/Thailand.png'},
                       'Ukraine': {'path': '../data/birthplace_flags/Ukraine.png'},
                       'United Kingdom': {'path': '../data/birthplace_flags/UnitedKingdom.png'},
                       'Venezuela': {'path': '../data/birthplace_flags/Venezuela.png'},
                       'Vietnam': {'path': '../data/birthplace_flags/Vietnam.png'},
                       'Yemen': {'path': '../data/birthplace_flags/Yemen.png'}}

//=========================================================================
// PRELOAD CODE
//=========================================================================

function preload() {
  statesJSON = loadJSON("./results/statesInfo.json");
  preloadFlags();
  bgPlate = loadImage('../data/bgplate.png');
}



function preloadFlags(){
  var flagKeys = Object.keys(flagsImagesJSON);
  for (let i = 0; i < flagKeys.length; i++) {
    let flagKey = flagKeys[i]
    flagsImagesJSON[flagKey]['image'] = loadImage(flagsImagesJSON[flagKey]['path']);
  }
}

//=========================================================================
// SETUP CODE
//=========================================================================


function setup() {
  createCanvas(windowWidth, windowHeight); // From global window sizes

  // Background
  createDataVizBackground();
  
  // Create a list of states from JSON data
  createStatesList();

  // Create a list of state buttons
  createStateButtons();

  // // Finish loading image
  img = flagsImagesJSON['Brazil']['image'];
  img.loadPixels();
  // get color of middle pixel
  c = img.get(img.width / 2, img.height / 2);

  // Console Logs for debugging purposes
  checkStatesJSON();
  checkImagesJSON();

   //tint(255, 127)
   image(bgPlate, -40, -200, 1200, 1200)
}

function createDataVizBackground(){
  background('#FFF8EE');
 



  let header = createElement('h1', "The World at Your Plate");
  header.position(windowWidth/2 - 500, 50);

  let subheader = createElement('h2', "Pick a state");
  subheader.position(windowWidth/2 - 250, 150);

  let title = createElement('h2', "America’s favorite cuisines based on \
  its immigrant population and restaurants");
title.position(50, windowHeight-200);

  let subtitle = createElement('p', "America's is known for it's diversity of people and cuisines.\
                                    Explore how much our favourite types of cuisines match the immigrant \
                                    population in each state.");
  subtitle.position(50, windowHeight-120);
}

function checkStatesJSON() {
  console.log(typeof statesJSON);
  console.log(statesJSON.AK.top1.counts);
  console.log(statesJSON);
  // for (let i = 0; i < statesList.length; i++) {
  //   console.log(statesList[i].stateName)
  //   //console.log(statesList[i].row)
  //   //console.log(statesList[i].col)
  //   console.log(statesList[i].xEllipse)
  //   console.log(statesList[i].yEllipse)
  // }
}

function createStatesList(){  
  let stateKeys = Object.keys(statesJSON);
  for (let i = 0; i < stateKeys.length; i++) {
    let stateKey = stateKeys[i]
    
    // Declare new state object with its info
    var state = new stateBubble2(row=statesJSON[stateKey].row, 
                                 col=statesJSON[stateKey].col,
                                 stateName=stateKey,
                                 stateInfo=statesJSON[stateKey]);
    statesList.push(state);
  }
}

function createStateButtons(){
      // Declare Button
      var stateKeys = Object.keys(statesJSON);
      for (let i = 0; i < stateKeys.length; i++) {
        stateKey = stateKeys[i];
        stateBub = statesList[i];
        stateInfo = statesJSON[stateKey];

        createButton(stateKey)
          .position(stateBub.xEllipse, stateBub.yEllipse)
          //.style('background-color', color(bubbleColorMain))
          .mousePressed(createMousePressedFunction(stateInfo))
          
          
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
    text(info.state_name, windowWidth /2 + 500, 30);
    textSize(20);
    
    // Plot the immigrant population per state
    plotPopulationBars(info)
  
  }
}

function plotPopulationBars(info) {
  let topList = ["top1", "top2", "top3", "top4", "top5", 
                 "top6", "top7", "top8", "top9", "top10"]

  birthplacesPosx = windowWidth - 300;
  birthplacesPosy = 70; 
  textAlign(RIGHT);
  text("Total immigrant population: " + info.total_population, 
                                        birthplacesPosx+200, 50);

                                        image(bgPlate, -40, -200, 1200, 1200)

  for (let i = 0; i < topList.length; i++) {
    
    let population_perc = info[topList[i]].population / info.total_population
    let restaurant_perc = info[topList[i]].counts / info.total_restaurants
    let country = info[topList[i]].country
    let population_count = info[topList[i]].population
    let cuisine_count = info[topList[i]].counts

    // country flag
    img = flagsImagesJSON[country]['image'];
    img.loadPixels();
    image(img, birthplacesPosx, birthplacesPosy+=20, 50, 50);

 

    // country names
    fill(75);
    textSize(12);
    textAlign(CENTER);
    text(country, birthplacesPosx-25, birthplacesPosy+=50, 100,100); 

    // population bars
    fill(bubbleColorClick);
    rect(birthplacesPosx+70, birthplacesPosy-50, population_perc*500, 35);
    noStroke();
   
    rect(birthplacesPosx , birthplacesPosy, 0, 0);
    textAlign(LEFT);
    textSize(12);
    text("population: "+population_count, birthplacesPosx+70, birthplacesPosy); 

    // restaurant bars
    fill(bubbleColorMain);
    //rotate(180, 3.0)
    rect(birthplacesPosx-20, birthplacesPosy-50, restaurant_perc*-200, 30);
    textSize(12);
    textAlign(RIGHT);
    text("restaurants: "+cuisine_count, birthplacesPosx-20, birthplacesPosy); 

    
  }
}

function checkImagesJSON() {
  // console.log(typeof flagsImagesJSON);
  // console.log(flagsImagesJSON['Mexico']['path']);
  // console.log(flagsImagesJSON);

  var flagKeys = Object.keys(flagsImagesJSON);
  for (let i = 0; i < flagKeys.length; i++) {
    let flagKey = flagKeys[i]
    console.log(flagsImagesJSON[flagKey])
  }
}

function loadImagesJSON() {
  var flagKeys = Object.keys(flagsImagesJSON);
  for (let i = 0; i < flagKeys.length; i++) {
    let flagKey = flagKeys[i];
    console.log(flagKey);

    img = flagsImagesJSON['Brazil']['image'];
    img.loadPixels();

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
      let xTranslation = (width-13)*0.003; // For columns of US MAP
      let yTranslation = (height-9)*0.006; // For rows of US MAP      
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

function draw() { 
  
  


}