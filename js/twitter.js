// let appState = {
//     currentUser: null,
//     tweets:[
//         {
//             user: 'anonymous',
//             body: null,
//             tweetDate: null,
//             hashtags: null,
//             likes: null,
//             id: null,
            
//         }
//     ]
// }

let textField = document.getElementById('text');
const allowedChars = 10;
let count = 0;
let remaindingChars = 10;

const handleTextField = () => {
    textField.addEventListener('input', function(){
        count++;
        remaindingChars = allowedChars - count;
        console.log(count, remaindingChars);
        console.log('user input: ', textField.value);
    })
}


handleTextField();