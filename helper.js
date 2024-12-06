// helper.js
// Generate a random number function
function generateRandomNumber() {
    return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}
