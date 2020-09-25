const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

//show loader
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;

}
//hide loading
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true
    }
}
//get quote from API
async function getQuote(){
    showLoadingSpinner()
    const proxyUrl='https://cors-anywhere.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response=await fetch(proxyUrl+apiUrl);
        const data=await response.json();
        //author blank or not
        if(data.quoteAuthor===''){
            authorText.innerText='Unknow'
        }else{
            authorText.innerText=data.quoteAuthor;
        }
        //reduce font-size for long quote
        if(data.quoteText.length>50){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText=data.quoteText;
        //stop loader show quote
        removeLoadingSpinner()
    }catch(error){
        getQuote();
        console.log('no quote  anymore',error)
    }
}

//twitter
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'_blank')
}
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
//on load
 getQuote()