//=========================================================================
// DECLARE VARIABLES
//=========================================================================

let stateNames = ["AK", "ME", "VT", "NH", "WA", "MT", "ND", "MN", "WI", "MI", "NY", "MA", "RI", "ID", "WY", "SD", "IA", "IL", "IN", "OH", "PA", "NJ", "CT", "OR", "NV", "CO", "NE", "MO", "KY", "WV", "MD", "DE", "CA", "AZ", "UT", "KS", "AR", "TN", "VA", "NC", "DC", "NM", "OK", "LA", "MS", "AL", "SC", "TX", "GA", "HI", "FL"];

let stateShow = [1,0,0,0,0,0,0,0,0,0,0,0,1,
                 0,0,0,0,0,0,0,0,0,0,1,1,0,
                 0,1,1,1,1,1,0,1,0,1,1,1,0,
                 0,1,1,1,1,1,1,1,1,1,1,0,0,
                 0,1,1,1,1,1,1,1,1,1,0,0,0,
                 0,1,1,1,1,1,1,1,1,0,0,0,1,
                 0,0,0,1,1,1,1,1,1,0,0,0,0,
                 0,0,0,1,0,0,0,1,0,0,0,0,0,
                 1,0,0,0,0,0,0,0,1,0,0,0,0];


//let bubblemapObj; // map object
let eachStateBubbleObj // 
let bubblesArr = []; //array of all bubble
let s = 50; //size 
let hmax = 13; //cols
let vmax = 9; //rows
let counter = 0;


//=========================================================================
// SETUP CODE -> CALLED ON SKETCH.JS
//=========================================================================


function setup() {
  createCanvas(800, 600);
  bubblemapObj = new bubbleMap(); 
  bubblemapObj.drawGrid();


}


//=========================================================================
// BUBBLE MAP CLASS
//=========================================================================



class bubbleMap {
    constructor() {
         
 
    }

    

    drawGrid() {
        translate((width-hmax*s)*.17, (height-vmax*s)*0.3);
        
        
        for(let y=0; y<vmax; y++) {
          for(let x=0; x<hmax; x++) {
            let c = x + hmax*y;
            if(stateShow[c]==1){
              if(y%2==0) {
                eachStateBubbleObj = new  stateBubble(x,y, stateNames[counter]);
                eachStateBubbleObj.display();
                
                
                
              } else {
               
                eachStateBubbleObj = new  stateBubble(x,y,this.col);
                eachStateBubbleObj.display()
                
              }
              counter++;
              bubblesArr.push(eachStateBubbleObj)
              
            }
          }
        }
    }
     
    
}



class stateBubble {
    constructor(x, y, stateName) {
        this.x = x;
        this.y = y;
        this.col = "#259F40";
        this.stateName = stateName;
    }   
   

    display() {
        fill(this.col)
        stroke("white");
        ellipse(this.x*s*1.07, this.y*s*0.9, s, s);   
        fill(75);
        noStroke();
        text(stateNames[counter], this.x*s*1.07-textWidth(stateNames[counter])*0.5, this.y*s*0.9+10);

    }      

    clicked() {

    
      this.col = "#FF8A00"

    }

    
}

function mousePressed() {
    for (var i = 0; i < bubblesArr.length; i++ ){
        bubblesArr[i].clicked();
    }
    
}

//=========================================================================
// DRAW
//=========================================================================


function draw() {
// background(220);






}
