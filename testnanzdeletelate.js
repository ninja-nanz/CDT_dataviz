var immigrationData;
var stateData = []; // array of state objects. Each object has state name, total immigrants, birthplaces and number of people

function preload() {
  //let q = "immigration";
  //let apikey = "HeFa7GwC4X0IXFTFUmXpA1z9OtJ97V3i"; //nanz's API key
  
  //let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q +"&api-key=" + apikey;
  //loadJSON(url, gotData);

  birthplaceTable = loadTable('transposed_birthplace.csv', 'csv', 'header');


}

function setup() { 
  noCanvas();
  var immigrationData = birthplaceTable.getObject();
  //console.log(immigrationData);


  for (const [key, value] of Object.entries(immigrationData)) {
    var stateObj = value;

    
    /*
    for (const [key, value] of Object.entries(stateObj)) {

    
      createP(`${key}: ${value}`);

      //console.log(`${key}: ${value}`);

    }

    createP ("------");
    */
    stateData.push(stateObj);


  }
  
  console.log(stateData);

  for (let i = 0; i < stateData.length; i++) {
    var stateName = stateData[i].STATE;
    var totalImmigrants = stateData[i].Total;
    createElement('h3', stateName);
    createP(totalImmigrants);
  }

} 

/*
function displayData(data) {
    var places = immigrationData
 
   console.log('hi' + places);

  for (let i = 0; i < places.length; i++) {
    createP(places[i]);
  }

}


/*
function gotData(data) {
  let articles = data.response.docs;
  print(articles.length);
  for (let i = 0; i < articles.length; i++) {
    createElement('h3', articles[i].headline.main);
    createP("pub_date: "+articles[i].pub_date+"<br>"+
            "web_url: "+articles[i].web_url+"<br>"+
            "word_count: "+articles[i].word_count+"<br>"+
           articles[i].snippet);
  }
}
*/

function draw() { 
  background(220);
}
