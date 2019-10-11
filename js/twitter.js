
let appState = {
    currentUser: 'anonymous',
    tweets: [],
}

const textField = document.getElementById('text');
const remainingChars = document.getElementById('remainingChars');
const tweetButton = document.getElementById('tweetButton');
const feedArea = document.getElementById('feed');
let num = 0;

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
    saveTweet(appState.currentUser, userInput);
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
const saveTweet = (currentUser, tweetBody, parentId) => {
    num++;
    appState.tweets.push({
        user : currentUser,
        body : tweetBody,
        tweetDate : new Date(),
        id : num,
        isLiked : false,
        parent : parentId,
        isRetweeted : false
    });
}

const renderTweets = () => {
    let HTML = appState.tweets.map(tweet => {
        if (tweet.parentId === null) {
            console.log('start render tweet, id: ', tweet.id);
            let tweetBodySplitedByWords = tweet.body.split(' ');
            let tweetBodyHTML = tweetBodySplitedByWords.map(word => word[0] == '#' ? `<a href='#'>${word}</a>` : word ).join(' ');
            return `
            <div id="tweet${tweet.id}" class="row container-fluid border p-0 m-0 mb-1">
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
                                <a id="expandBtn" class="faButton text-decoration-none rounded-circle expandBtn" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                            </div>
                        </div>
                        <p id="tweetBody${tweet.id}" class="text-left">${tweetBodyHTML}</p>
                    </div>
    
                    <div id="contentButton" class="row  m-0">
                        <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                            <a id="commentBtn" class="faButton text-decoration-none mr-2 commentBtn" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                            <a id="retweetBtn${tweet.id}" class="faButton text-decoration-none mr-2 retweetBtn" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
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
            return renderreTweet(tweet);
        }
    }).join('');
    console.log(HTML)
    HTML !== null ? feedArea.innerHTML = HTML : console.log('nothing inside HTML, abort renderTweets');
}

// this func in charge of render the retweets
const renderTweets = (tweet) => {
    let parentTweet = appState.tweets.find(t => t.id == tweet.parentId);
    let parentTweetBodyHTML = parentTweet.body.split(' ').map(word => word[0] == '#' ? `<a href='#'>${word}</a>` : word ).join(' ');
    return `
    <div id="tweet${tweet.id}" class="row container-fluid border p-0 m-0 mb-1">
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
                        <a id="expandBtn" class="faButton text-decoration-none rounded-circle expandBtn" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                    </div>
                </div>
                <p id="tweetBody${tweet.id}" class="text-left">
                    
                    <!-- Parent tweet content -->
                    <div id="tweet${parentTweet.id}" class="row container-fluid border p-0 m-0 mb-1">
                        <div id="feedAvatar" class="col-1 pt-3 pl-3 pr-0">
                            <img src="img/avatar-placeholder.png" alt="avatar-img" width="50" height="auto">
                        </div>
                        <div id="content" class="col-11 py-2 pl-3 pr-1">
                            <div id="text" class="row container m-0 pl-0 pr-3">
                                <div class="row m-0 mb-1 container-fluid p-0">
                                    <div id="tweetTitle" class="col-9 pl-0 mt-1">
                                        <span><strong>${parentTweet.user}</strong> @${parentTweet.user}</span> • <span>${moment(parentTweet.tweetDate).fromNow()}</span>
                                    </div>
                                    <div class="col"></div>
                                    <div class="col-1 p-0 text-right">
                                        <a id="expandBtn" class="faButton text-decoration-none rounded-circle expandBtn" href="#"><i class="fas fa-chevron-down rounder-circle"></i></a>
                                    </div>
                                </div>
                                <p id="tweetBody${parentTweet.id}" class="text-left">${parentTweetBodyHTML}</p>
                            </div>
            
                            <div id="contentButton" class="row  m-0">
                                <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                                    <a id="commentBtn" class="faButton text-decoration-none mr-2 commentBtn" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                                    <a id="retweetBtn${parentTweet.id}" class="faButton text-decoration-none mr-2 retweetBtn" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
                                    <a id="likeBtn${parentTweet.id}" class="faButton text-decoration-none mr-2 likeBtn" onclick="toggleLike(${parentTweet.id})">
                                    ${parentTweet.isLiked ? 
                                    '<i class="fas fa-heart rounded-circle aria-hidden="true""></i>'
                                    : '<i class="far fa-heart rounded-circle"></i>'}</a>
                                    <a id="shareBtn" class="faButton text-decoration-none" href="#"><i class="far fa-share-square rounded-circle"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of parent tweet content -->  
                
                </p>
            </div>

            <div id="contentButton" class="row  m-0">
                <div class="col-12 col-md-9 col-lg-5 d-flex justify-content-between p-0">
                    <a id="commentBtn" class="faButton text-decoration-none mr-2 commentBtn" href="#"><i class="far fa-comment rounded-circle"></i>20</a>
                    <a id="retweetBtn${tweet.id}" class="faButton text-decoration-none mr-2 retweetBtn" href="#"><i class="fas fa-retweet rounded-circle"></i>130</a>
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
// calling functions
handleTextField();

