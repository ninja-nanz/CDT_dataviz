function preload() {
  let q = "immigration";
  let apikey = "HeFa7GwC4X0IXFTFUmXpA1z9OtJ97V3i"; //nanz's API key
  
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q +"&api-key=" + apikey;
  loadJSON(url, gotData);
}

function setup() { 
  noCanvas();
} 

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

function draw() { 
  background(220);
}
