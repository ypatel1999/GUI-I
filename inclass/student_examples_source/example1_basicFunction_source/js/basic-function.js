// Create a variable called msg to hold a new message
var msg = 'Sign up to recieve our newsletter for 10% off';

// Create a function to update the content of the element whose id attribute has a value of message
function updateMessage() {
document.getElementById('message').innerHTML = msg;
}

// Call the function
updateMessage();
