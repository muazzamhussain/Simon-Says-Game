let userSeq = []; // Stores the user's input sequence (Array)
let gameSeq = []; // Stores the game's generated sequence (Array)
let btns = ["yellow", "red", "green", "blue"]; // Array of button colors
let started = false; // Boolean flag to check if the game has started
let level = 0; // Number variable to track the game level
let highScore = 0; // to track highest score.

let h2 = document.querySelector("h2"); // Selects the first <h2> element in the document

// Event listener to start the game when a key is pressed
document.addEventListener("keyup", function () { 
  // 'document' represents the webpage, 'addEventListener' attaches an event listener
  if (started == false) { // 'if' is a conditional statement that checks if the game hasn't started
    console.log("game started."); // 'console.log()' prints messages to the browser console
    started = true; // Change game state to started
    levelUp(); // Call the function to start the game
  }
});

// Function to create a flashing effect for the game-generated sequence
function gameFlash(btn) { // 'function' defines a reusable block of code
  btn.classList.add("game-flash"); // 'classList.add()' adds a CSS class to an element
  setTimeout(function () { // 'setTimeout()' executes code after a delay (in milliseconds)
    btn.classList.remove("game-flash"); // 'classList.remove()' removes the added class after 500ms
  }, 500);
}

// Function to create a flashing effect when the user clicks a button
function userFlash(btn) {
  btn.classList.add("user-flash");
  setTimeout(function () {
    btn.classList.remove("user-flash");
  }, 500);
}

// Function to progress the game to the next level
function levelUp() {
  userSeq = []; // Reset user sequence for the new level
  level++; // Increment the level by 1
  h2.innerText = `Level ${level}`; // Template literal (backticks) used for dynamic text replacement

  let randIdx = Math.floor(Math.random() * 4); // 'Math.random()' generates a random number, 'Math.floor()' rounds it down
  let randCol = btns[randIdx]; // Select a random color from the array
  let randBtn = document.querySelector(`.${randCol}`); // Select button using class selector ('.colorName')
  gameSeq.push(randCol); // 'push()' adds an element to the end of an array
  console.log(gameSeq); // Log the game sequence for debugging
  gameFlash(randBtn); // Call function to create flash effect for the game button
}

// Function to handle button clicks by the user
function btnPress() {
  let btn = this; // 'this' refers to the element that triggered the function
  userFlash(btn); // Call function to create a flash effect for user interaction
  userSeq.push(btn.getAttribute("id")); // 'getAttribute("id")' retrieves the ID of the clicked button
  console.log(userSeq);

  checkAns(userSeq.length - 1); // Calls function to check if user input is correct
}

// Add event listeners to all buttons so they can be clicked
let allBtns = document.querySelectorAll(".btn"); // 'querySelectorAll()' selects all elements with the class 'btn'
for (btn of allBtns) { // 'for...of' loop iterates through each button
  btn.addEventListener("click", btnPress); // Attach click event listener to each button
}

// Function to check the user's input against the game sequence This function checks only the last added index 
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) { // '===' is a strict comparison operator (checks both value & type)
    if (userSeq.length == gameSeq.length) { // If user has completed the sequence correctly
      setTimeout(levelUp, 1000); // Move to the next level after 1 second
    }
  } else { // 'else' executes if the condition is false
    if(level > highScore){
      highScore = level;
    }
    h2.innerHTML = `Game Over. Your score was ${level}.<br> Highest score is ${highScore} <br> Press any key to restart.`; // 'innerHTML' changes the content of an HTML element
    document.querySelector("body").style.backgroundColor = "red"; // Change background color using 'style'
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white"; // Reset background color after 600ms
    },600);
    reset(); // Call reset function to restart the game
  }
}

// Function to reset the game when the user loses
function reset() {
  started = false; // Reset game state to not started
  gameSeq = []; // Clear game sequence array
  userSeq = []; // Clear user sequence array
  level = 0; // Reset level to zero
}