// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const randomNumber = generateRandomNumber(); // Generate a random 4-digit number as the secret number
    const maxGuesses = 10; // Maximum number of attempts allowed
    let attempts = 0; // Counter to track the number of guesses made

    // Get references to the input field, submit button, and the container for result rows
    const input = document.getElementById("guess-input");
    const button = document.getElementById("submit-button");
    const resultContainer = document.getElementById("result-rows");

    // Add an event listener to enable/disable the button based on input validity
    input.addEventListener("input", () => {
        // Enable the button only if the input is exactly 4 digits and numeric
        button.disabled = input.value.length !== 4 || isNaN(input.value);
    });

    // Add an event listener to handle button clicks (submitting guesses)
    button.addEventListener("click", () => {
        const guess = input.value; // Get the user's guess
        const { correct, misplaced } = compareNumbers(randomNumber, guess); // Compare the guess to the secret number
        addResultRow(guess, correct, misplaced); // Add the result to the result container
        attempts++; // Increment the attempt counter

        // Check if the user has guessed the correct number
        if (correct === 4) {
            alert("Congratulations! You guessed the correct number!");
            endGame(); // End the game if the guess is correct
        } 
        // Check if the user has reached the maximum number of attempts
        else if (attempts >= maxGuesses) {
            alert(`Game Over! The correct number was ${randomNumber}.`);
            endGame(); // End the game if maximum attempts are reached
        }

        // Reset the input field and disable the button for the next guess
        input.value = "";
        button.disabled = true;
        input.focus(); // Refocus on the input field for the next attempt
    });

    // Function to handle end-of-game scenarios
    function endGame() {
        input.disabled = true; // Disable the input field
        button.disabled = true; // Disable the submit button
    }
});

// Function to compare the secret number with the user's guess
function compareNumbers(secret, guess) {
    let correct = 0, misplaced = 0; // Initialize counters for correct and misplaced digits
    const secretArray = secret.split(""); // Convert the secret number to an array
    const guessArray = guess.split(""); // Convert the guess to an array

    // Iterate through each digit in the secret number
    secretArray.forEach((digit, i) => {
        if (digit === guessArray[i]) {
            correct++; // Increment the correct counter if the digit matches and is in the correct position
        } else if (guessArray.includes(digit)) {
            misplaced++; // Increment the misplaced counter if the digit exists in the guess but is in the wrong position
        }
    });

    return { correct, misplaced }; // Return the comparison results
}

// Function to dynamically add a result row to the result container
function addResultRow(guess, correct, misplaced) {
    const row = document.createElement("div"); // Create a new <div> element for the result row
    row.classList.add("result-row"); // Add a CSS class for styling the row
    row.innerHTML = `
        <span>${guess}</span> <!-- Display the user's guess -->
        <span>${correct}</span> <!-- Display the number of correctly placed digits -->
        <span>${misplaced}</span> <!-- Display the number of incorrectly placed digits -->
    `;
    document.getElementById("result-rows").appendChild(row); // Append the row to the result container
}
