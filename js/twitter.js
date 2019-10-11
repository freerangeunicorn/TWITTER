
let appState = {
    currentUser: 'anonymous',
    tweets: [],
}

const textField = document.getElementById('text');
const remainingChars = document.getElementById('remainingChars');
const tweetButton = document.getElementById('tweetButton');
const feedArea = document.getElementById('feed');

const allowedChars = 140;
let count = 0;
let remainingNumber = allowedChars;

//to set the state of 'tweet button' to disable beforehand.
if (textField.value.length == 0) {
    tweetButton.disabled = true;
}

// function for handling user input in Text Area
const handleTextField = () => {
    textField.addEventListener('input', function () {
        count = textField.value.length;
        remainingNumber = allowedChars - count;
        renderRemaindingNumber();
        autosize()
    })
}

// this makes the textfield automatically resize with the content
const autosize = () => {
    var el = textField;
    setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}

// function for display the characters counting to screen
const renderRemaindingNumber = () => {
    if (remainingNumber < 0) {
        remainingChars.style.color = "red";
        tweetButton.disabled = true;
    } else {
        remainingChars.style.color = "";
        tweetButton.disabled = false;
    }
    remainingChars.innerHTML = `${remainingNumber} characters remaining`;
}

//this triggered when tweet button clicked
const handleTweetButton = () => {
    let userInput = textField.value;
    let inputSplitedByWords = userInput.split(' ');
    let tweetHTML = inputSplitedByWords.map(word => word[0] == '#' ? `<a href='#'>${word}</a>` : word ).join(' ');
    
    //save tweet to appState
    saveTweet(appState.currentUser, tweetHTML);
    //render to screen
    renderTweets();
    //clearing text field
    textField.value = '';
    //reset character remaining counter
    remainingChars.innerHTML = `140 characters remaining`;
    //reset tweet button to disabled state while text field is empty
    tweetButton.disabled = true;
}

//save tweet to appState
const saveTweet = (currentUser, tweetBody) => {
    appState.tweets.push({
        user : currentUser,
        body : tweetBody,
        tweetDate : new Date(),
        id : (appState.tweets.length + 1),
        isLiked : false,
    });
}

const renderTweets = () => {
    let HTML = appState.tweets.map(tweet => {
        return `
        <div id="tweetTemplate" class="row container-fluid border p-0 m-0 mb-1">
            <div id="feedAvatar" class="col-1 pt-3 pl-3 pr-0">
                <img src="img/avatar-placeholder.png" alt="avatar-img" width="50" height="auto">
            </div>
            <div id="content" class="col-11 py-2 pl-3 pr-1">
                <div id="text" class="row container m-0 pl-0 pr-3">
                    <div class="row m-0 mb-1 container-fluid p-0">
                        <div id="tweetTitle" class="col-9 pl-0 mt-1">
                            <span><strong>${tweet.user}</strong> @${tweet.user}</span> • <span>${moment(tweet.tweetDate).fromNow()}</span>
                        </div>
                        <div class="col"></div>
                        <div class="col-1 p-0 text-right">
                            <a id="expandBtn" class="faButton text-decoration-none rounded-circle" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                        </div>
                    </div>
                    <p id="tweetBody" class="text-left">${tweet.body}</p>
                </div>

                <div id="contentButton" class="row  m-0">
                    <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                        <a id="commentBtn" class="faButton text-decoration-none mr-2" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                        <a id="retweetBtn" class="faButton text-decoration-none mr-2" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
                        <a id="likeBtn" class="faButton text-decoration-none mr-2" onclick="toggleLike(${tweet.id})">
                        ${tweet.isLiked ? 
                        '<i class="fas fa-heart rounded-circle aria-hidden="true""></i>'
                        : '<i class="far fa-heart rounded-circle"></i>'}</a>
                        <a id="shareBtn" class="faButton text-decoration-none" href="#"><i class="far fa-share-square rounded-circle"></i></a>
                    </div>
                </div>
            </div>
        </div>\n
        `
    }).join('');
    console.log(HTML)
    HTML !== null ? feedArea.innerHTML = HTML : console.log('nothing inside HTML, abort renderTweets');
}
// calling functions
handleTextField();

//toggle like btn
const toggleLike = index => {
    console.log("index", index)
    console.log("tweets", appState.tweets)
    appState.tweets[index - 1].isLiked = !appState.tweets[index - 1].isLiked;
    renderTweets();
  }




