let appState = {
    currentUser: null,
    tweets:[
        {
            user: 'anonymous',
            body: null,
            tweetDate: null,
            hashtags: null,
            likes: null,
            id: null,
            
        }
    ]
}
let textField = document.getElementById('text');
const allowedChars = 10;
let count = 0;
let remaindingNumber = 10;

const handleTextField = () => {
    textField.addEventListener('input', function(){
        count++;
        remaindingNumber = allowedChars - count;
        console.log(count, remaindingNumber);
        console.log('user input: ', textField.value);
        renderRemaindingNumber();
    })
}
 
handleTextField();
const renderRemaindingNumber = () => {
    const remaindingChars = document.getElementById('remaindingChars');
    if(remaindingNumber<0){
        remaindingChars.style.color = "red"; 
    }
    remaindingChars.innerHTML = remaindingNumber;
}