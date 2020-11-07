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

let bubblemapObj; // map object
let s = 50; //size 
let hmax = 13; //cols
let vmax = 9; //rows



//=========================================================================
// SETUP CODE
//=========================================================================


function setup() {
  createCanvas(800, 600);
  bubblemapObj = new bubblemap(); 

  
  
 


  
}


//=========================================================================
// BUBBLE MAP CLASS
//=========================================================================



class bubblemap {
    constructor() {
        this.col = 75;
        this.bgcol = 255,0,0,63;
    }

    drawGrid() { //----the map ----//
        translate((width-hmax*s)*0.5, (height-vmax*s)*0.5);
        let counter = 0; //increment states

       for(let y=0; y<vmax; y++) {
            for(let x=0; x<hmax; x++) {
                let c = x + hmax*y;
                if(stateShow[c]==1){
                    if(y%2==0) {
                        fill(this.bgcol);
                        stroke(this.col);
                        ellipse(x*s*1.07, y*s*0.9, s, s);   
                        fill(this.col);
                        noStroke();
                        text(stateNames[counter], x*s*1.07-textWidth(stateNames[counter])*0.5, y*s*0.9+10);
                    } else {
                        fill(this.bgcol);
                        stroke(this.col);
                        ellipse(x*s*1.07+s*0.6, y*s*0.9, s, s);
                        fill(this.col);
                        noStroke();
                        text(stateNames[counter], x*s*1.08+s*0.5-textWidth(stateNames[counter])*0.5, y*s*0.9+3);
                    }
                    counter++;
                    
                }
            }
        }


        
        
    }



    mouseOnBubble(mouseX, mouseY) {
        if (mouseX && mouseY ) {
            
            this.bgcol = "#0066FF"
        }
        
        
    }
  
}



//=========================================================================
// DRAW
//=========================================================================


function draw() {
// background(220);
bubblemapObj.drawGrid();
bubblemapObj.mouseOnBubble(mouseX, mouseY);


}
