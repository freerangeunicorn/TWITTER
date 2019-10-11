buttons : btn-primary, rounded-pill
hover, button, links active color: #1calf1 or rgb(281,161,241)
main text: black
subtext: gray, #949494 or rgb(148,148,148)
gray background color : #f6f8fa or rgb(246,248,250)


Required User Stories

Hai did:
- [x] The user should be able to enter a message into a text field. Hai/Huy
- [x] The user should be able to press "Tweet" and see the message pop in below the text box. Hai/Huy
- [x] The user should see a "count" that displays how many more characters the user has remaining, counting down from 140. Hai/Huy
- [x] Upon tweeting, the characters remaining text should reset back to 140, and the field should be cleared. Hai/Huy
- [x] The application should disallow text of greater than 140 characters. Hai/Huy
- [x] The user should be able to "Retweet". Clicking Retweet immediately inserts a copy of that tweet below the original tweet.Hai/Huy
- [x] The user should be able to "Like". When "Like" is clicked, the text should change to "Unlike". Mai/Phong When "Unlike" is clicked, the text should change to "Like". Alternatively, use a heart icon (colored or not colored). Mai/Phong
- [x] When a "Liked" tweet is retweeted, the new tweet should not be liked. 
- [x] Each tweet has an optional hashtag. The hashtag should be linked with an anchor tag. 
- [x] The user should be able to delete a tweet.

Optional Stories
- [ ]Download and upload the list of tweets using the myjson api, as shown in class.
- [x]Users can mention other users. Any string that starts with @username will be highlighted in blue.
- [ ]The user can click on a hashtag, and only other tweets with that hashtag are shown.
- [x]When the user deletes a tweet, all retweets should be deleted.
- [ ]Any tweet with an image URL will have the image automatically expanded in the tweet.


### things to improve:

#### functions
* change order of tweets by newest first
* API Myjson may not be able to save html syntax (tweet.body) -> might need to save only the tweet plain-text content to tweet.body and find a way to deploy

#### design
* responsive optimized