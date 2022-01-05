const quoteContainer =document.getElementById("quote-container");
const twitterBtn = document.getElementById("twitter");
const newQouteBtn = document.getElementById("new-qoute");
const qoute = document.getElementById("qoute");
const author=document.getElementById("author");
const loader =document.getElementById("loader");

let apiQuote = [] ;

// show loader 
function loading () {
    loader.hidden =false ;
    quoteContainer.hidden=true;
}
// hide loader 
function complete () {
    loader.hidden =true ;
    quoteContainer.hidden=false;
}

// show random qoute from the quote array 
function showNowQuote() {
    loading ();
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
    complete ();
}

// fetch quote json 
async function getQuote () {
    loading ();
    const quoteApi ="https://type.fit/api/quotes" ;
    try{
        const responce = await fetch (quoteApi);
        apiQuote = await responce.json();
        showNowQuote();
    }catch (error) {
        console.log(error);
    }
}


// tweet the qoute
function tweetQuote () {
    const tweetURL = `https://twitter.com/intent/tweet?text=
    ${qoute.textContent} - ${author.textContent}`;
    window.open(tweetURL,"_blank");
}

// event listeners 

twitterBtn.addEventListener ("click",tweetQuote); 
newQouteBtn.addEventListener ("click",showNowQuote); 

// on load 
getQuote ();

