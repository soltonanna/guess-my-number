'use strict';

/** Get Elements from DOM */
const main = document.querySelector("#main");

const buttonAgain = document.querySelector(".btn.again");
const buttonCheck = document.querySelector(".btn.check");

const checkInput = document.querySelector("#guess");
const guessedNumber = document.querySelector("#guessed-number #number");
const gameMessages = document.querySelector("#game-messages");

let score = 10;
const scoreTxt = document.querySelector("#label-score #score");

let highscore = 0;
const highscoreTxt = document.querySelector("#label-highscore #highscore");

/** Generate number from 1 to 20 */
let secretNumber = Math.floor( ( Math.random() * 20 ) + 1 );

/** Start the game again */
buttonAgain.addEventListener('click', (e)=> {
    e.preventDefault();
    secretNumber = Math.floor( ( Math.random() * 20 ));
    guessedNumber.textContent = "?";
    gameMessages.textContent = "Start guessing..."
    checkInput.value = "";
    scoreTxt.textContent = 10;
    main.classList.remove("win");
});

/** Check the value */
buttonCheck.addEventListener('click', (e)=> {
    e.preventDefault();

    if ( inputValidation(checkInput.value) ) {
        if ( score > 1 ) {
            if ( +checkInput.value > secretNumber ) {
                gameMessages.textContent = `⬆️ Too high.`;
                score--; 
                scoreTxt.textContent = score;
                main.classList.remove("win");
            } 
            else if ( +checkInput.value < secretNumber ) {
                gameMessages.textContent = `⬇️ Too low.`;
                score--; 
                scoreTxt.textContent = score;
                main.classList.remove("win");
            } 
            else if ( +checkInput.value === secretNumber ) {
                gameMessages.textContent = `🎉 Currect Number!!`;
                guessedNumber.textContent = secretNumber;
                secretNumber = Math.floor( ( Math.random() * 20 ));
                main.classList.add("win");

                if ( score > highscore ) {
                    highscore = score;
                    highscoreTxt.textContent = highscore;
                    score = 10;
                }
            }
        } else {
            alert('You lost the game 😞');
            scoreTxt.textContent = 0;
        }
        
    }
    checkInput.value = "";
});

/** Check the game score */
const inputValidation = ( value ) => {
    if ( !value) {
        alert("The input can't be empty.");
        return false;
    } 
    else if ( isNaN(value) ) {
        alert("Please fill the number. No letters or symbols");
        return false;
    } 
    else if ( value < 1 || value > 20 ) {
        alert("The wrong number. Range is 1 - 20 !!");
        return false;
    } 
    return true;
}
