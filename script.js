const quoteContainer =document.getElementById("quote-container");
const twitterBtn = document.getElementById("twitter");
const newQouteBtn = document.getElementById("new-qoute");
const qoute = document.getElementById("qoute");
const author=document.getElementById("author");

let apiQuote = [] ;

// show random qoute from the quote array 
function showNowQuote() {
    const randomNumber = Math.floor(Math.random()*apiQuote.length);
    // check if there is auther
    if (apiQuote[randomNumber].author){ // if there is auther
        author.textContent=(apiQuote[randomNumber].author);
    }else { // if there is no auther
        author.textContent=("Unknown");
    }
    // check if qoute text is long 
    if (apiQuote[randomNumber].text.length>100){
        qoute.classList.add("long-qoute");
    }else {
        qoute.classList.remove("long-qoute");
    }
    qoute.textContent=(apiQuote[randomNumber].text);
}

// fetch quote json 
async function getQuote () {
    const quoteApi ="https://type.fit/api/quotes" ;
    try{
        const responce = await fetch (quoteApi);
        apiQuote = await responce.json();
        // console.log(apiQuote[Math.random()*apiQuote.length]);
        showNowQuote();
    }catch (error) {
        console.log(error);
    }
}

// on load 
getQuote ();