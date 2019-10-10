let appState = {
    
    currentUser: null,
    tweets:[
        {
            id: 0,
            user: 'anonymous',
            body: null,
            tweetDate: null,
            hashtags: null,
            isLiked: false,
            likeCount: 0,   
        }
    ]
}

function toggle(index) {
    tweets[index].isLiked = !tweets[index].isLiked;
    renderTweets();
  }

// add in render 

// <button class="faButton text-decoration-none mr-2" 
//             onclick=toggle(${index})>${tweet.isLiked
//               ? '<i class="fa fa-heart rounded-circle" aria-hidden="true"></i>'
//               : '<i class="far fa-heart rounded-circle"></i>'
//               }
//  </button>

function renderTweets(appState) {
    
}