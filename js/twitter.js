
let appState = {
    currentUser: 'anonymous',
    tweets: [],
}

const textField = document.getElementById('text');
const remainingChars = document.getElementById('remainingChars');
const tweetButton = document.getElementById('tweetButton');
const feedArea = document.getElementById('feed');
let num = 0;

//call API
async function getApi(){ 
    let response = await fetch('https://api.myjson.com/bins/17rdla');
    let user = await response.json();
    // appState = JSON.parse(user)
    // console.log(user, typeof(user));
    appState = user;
    // console.log("appstate", appState)
    renderTweets(appState.tweets)
}



// there blow belong to character count
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
    
    //save tweet to appState
    saveTweet(appState.currentUser, userInput, null);
    //render to screen
    renderTweets(appState.tweets);
    //clearing text field
    textField.value = '';
    //reset character remaining counter
    remainingChars.innerHTML = `140 characters remaining`;
    //reset tweet button to disabled state while text field is empty
    tweetButton.disabled = true;
}

//save tweet to appState
const saveTweet = (currentUser, tweetBody, parentId ) => {
    num++;
    appState.tweets.push({
        user : currentUser,
        body : tweetBody,
        tweetDate : new Date(),
        id : num,
        isLiked : false,
        parent : parentId,
        isRetweeted : false,
    });
}

const renderTweets = (arr) => {
    let HTML = arr.map(tweet => {
        if (tweet.parent === null) {
            // console.log('start render tweet, id: ', tweet.id);
            let tweetBodyHTML = tweet.body.split(' ').map(word => {
                console.log(word.slice(0,3));
                if (word[0] == '#' || word[0] == '@'){
                    return `<a href='#' onclick="findHastag('${word}')">${word}</a>`;
                } else if (word.slice(0, 4) == 'http'){
                    console.log("http", word);
                    return `<img src="${word}" alt="this is ur picture hehe" class="img-add"></img>`;
                } return word}).join(' ');
            
            return `
            <div id="tweet${tweet.id}" class="row container-fluid border p-0 m-0 mb-1">
                <div id="feedAvatar" class="col-1 pt-3 pl-3 pr-0">
                    <img src="images/avatar-placeholder.png" class="avatarLee" alt="avatar-img" width="50" height="auto">
                </div>
                <div id="content" class="col-11 py-2 pl-3 pr-1">
                    <div id="text" class="row container m-0 pl-0 pr-3">
                        <div class="row m-0 mb-1 container-fluid p-0">
                            <div id="tweetTitle" class="col-9 pl-0 mt-1">
                                <span><strong>${tweet.user}</strong> @${tweet.user}</span> • <span>${moment(tweet.tweetDate).fromNow()}</span>
                            </div>
                            <div class="col"></div>
                            <div class="col-1 p-0 text-right">
                                <a id="expandBtn" class="faButton text-decoration-none rounded-circle expandBtn" onclick="deleteTweet(${tweet.id})" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                            </div>
                        </div>
                        <p id="tweetBody${tweet.id}" class="text-left">${tweetBodyHTML}</p>
                    </div>
    
                    <div id="contentButton" class="row  m-0">
                        <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                            <a id="commentBtn" class="faButton text-decoration-none mr-2 commentBtn" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                            <a id="retweetBtn${tweet.id}" class="faButton text-decoration-none mr-2 retweetBtn" onclick="retweet(${tweet.id})" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
                            <a id="likeBtn${tweet.id}" class="faButton text-decoration-none mr-2 likeBtn" onclick="toggleLike(${tweet.id})">
                            ${tweet.isLiked ? 
                            '<i class="fas fa-heart rounded-circle aria-hidden="true""></i>'
                            : '<i class="far fa-heart rounded-circle"></i>'}</a>
                            <a id="shareBtn" class="faButton text-decoration-none" href="#"><i class="far fa-share-square rounded-circle"></i></a>
                        </div>
                    </div>
                </div>
            </div>\n
            `
        } else {
            console.log('start render retweet, id: ', tweet.id);
            return renderReTweet(tweet);
        }
    }).join('');
    // console.log(HTML)
    HTML !== null ? feedArea.innerHTML = HTML : console.log('nothing inside HTML, abort renderTweets');
}

// this func in charge of render the retweets
const renderReTweet = (tweet) => {
    let parentTweet = appState.tweets.find(t => t.id == tweet.parent);
    // console.log("prent tweet",parentTweet)
    let parentTweetBodyHTML = parentTweet.body.split(' ').map(word => word[0] == '#' || word[0] == '@' ? `<a href='#' onclick="findHastag(${word})">${word}</a>` : word ).join(' ');
    return `
    <div id="tweet${tweet.id}" class="row container-fluid border p-0 m-0 mb-1">
        <div id="feedAvatar" class="col-1 pt-3 pl-3 pr-0">
            <img src="images/avatar-placeholder.png" class="avatarLee" alt="avatar-img" width="50" height="auto">
        </div>
        <div id="content" class="col-11 py-2 pl-3 pr-1">
            <div id="text" class="row container m-0 pl-0 pr-3">
                <div class="row m-0 mb-1 container-fluid p-0">
                    <div id="tweetTitle" class="col-9 pl-0 mt-1">
                        <span><strong>${tweet.user}</strong> @${tweet.user}</span> • <span>${moment(tweet.tweetDate).fromNow()}</span>
                    </div>
                    <div class="col"></div>
                    <div class="col-1 p-0 text-right">
                        <a id="expandBtn" class="faButton text-decoration-none rounded-circle expandBtn" onclick="deleteTweet(${tweet.id})" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                    </div>
                </div>
                <p id="tweetBody${tweet.id}" class="text-left">
                    
                    <!-- Parent tweet content -->
                    <div id="tweet${parentTweet.id}" class="row container-fluid border p-0 m-0 mb-1">
                        <div id="feedAvatar" class="col-1 pt-3 pl-3 pr-0">
                            <img src="images/avatar-placeholder.png" class="avatarLee" alt="avatar-img" width="50" height="auto">
                        </div>
                        <div id="content" class="col-11 py-2 pl-3 pr-1">
                            <div id="text" class="row container m-0 pl-0 pr-3">
                                <div class="row m-0 mb-1 container-fluid p-0">
                                    <div id="tweetTitle" class="col-9 pl-0 mt-1">
                                        <span><strong>${parentTweet.user}</strong> @${parentTweet.user}</span> • <span>${moment(parentTweet.tweetDate).fromNow()}</span>
                                    </div>
                                    <div class="col"></div>
                                    
                                </div>
                                <p id="tweetBody${parentTweet.id}" class="text-left">${parentTweetBodyHTML}</p>
                            </div>
                        </div>
                    </div>
                    <!-- End of parent tweet content -->  
                
                </p>
            </div>

            <div id="contentButton" class="row  m-0">
                <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                    <a id="commentBtn" class="faButton text-decoration-none mr-2 commentBtn" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                    <a id="retweetBtn${tweet.id}" class="faButton text-decoration-none mr-2" onclick="retweet(${tweet.id})" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
                    <a id="likeBtn${tweet.id}" class="faButton text-decoration-none mr-2 likeBtn" onclick="toggleLike(${tweet.id})">
                    ${tweet.isLiked ? 
                    '<i class="fas fa-heart rounded-circle aria-hidden="true""></i>'
                    : '<i class="far fa-heart rounded-circle"></i>'}</a>
                    <a id="shareBtn" class="faButton text-decoration-none" href="#"><i class="far fa-share-square rounded-circle"></i></a>
                </div>
            </div>
        </div>
    </div>\n
    `
}


//toggle like btn
const toggleLike = index => {
    const currentTweet = appState.tweets.find(tweet => tweet.id == index);
    currentTweet.isLiked = !currentTweet.isLiked;
    const likeBtn = document.getElementById(`likeBtn${index}`);
    currentTweet.isLiked ? likeBtn.innerHTML = '<i class="fas fa-heart rounded-circle aria-hidden="true""></i>' : likeBtn.innerHTML = '<i class="far fa-heart rounded-circle"></i>';
}

//retweet btn
const retweet = id => {
    const parentTweet = appState.tweets.find(tweet => tweet.id == id)
    parentTweet.isRetweeted = true;
    let tweetedBody = parentTweet.body
    // console.log("body", tweetedBody)
    saveTweet(appState.currentUser, tweetedBody, id);
    // console.log(appState)
    renderTweets(appState.tweets);
}

//delete function
const deleteTweet = (id) =>{
    appState.tweets = appState.tweets.filter(tweet=>{return tweet.parent != id});
    console.log(appState.tweets,"don't have retweet")
    appState.tweets = appState.tweets.filter(tweet => { return tweet.id != id});
    console.log(appState,"deleted");
    renderTweets(appState.tweets);
}

//add hastag find
const findHastag = (hastag) => {
    console.log("hastag", hastag)
    let hasHastag = appState.tweets.filter(twit => {
        
        return twit.body.includes(hastag);
        })
    console.log("hasHagtag", hasHastag)
    document.getElementById("refresh").innerHTML= `${hastag} x`;
    renderTweets(hasHastag);
}

// calling functions
handleTextField();
getApi();

