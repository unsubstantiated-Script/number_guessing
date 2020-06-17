/*
Game Functions: 
- Player must guess a certain number between a min and max
- Player get sa certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lost
- Let the player choose to play again */

//Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements

const game = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UIguessInput = document.querySelector('#guess-input'),
    UImessage = document.querySelector('.message');

//assigning ui min and max

UIminNum.textContent = min;
UImaxNum.textContent = max;

//Play again event listener
//ToFix: Something's broken here....
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'button-primary play-again') {
        window.location.reload();
    }
});


//Listen for guess
UIguessBtn.addEventListener('click', function () {
    let guess = parseInt(UIguessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red')
    } else {
        //check if won

        if (guess === winningNum) {
            gameOver(true, `${winningNum} is correct, and you win!`)

        } else {
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //game over lost
                gameOver(false, `Game Over Man! Game Over! The correct number was ${winningNum}`)


            } else {
                //game continues - answer wrong
                //change border color
                UIguessInput.style.borderColor = "red";
                //clear input
                UIguessInput.value = '';
                //Tell user wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
            }

        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = "red";
    UIguessInput.disabled = true;
    UIguessInput.style.borderColor = color;
    UImessage.style.color = color;
    setMessage(msg)

    //play again

    UIguessBtn.value = "Play Again?"
    UIguessBtn.className += " play-again"
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setMessage(msg, color) {
    UImessage.style.color = color;
    UImessage.textContent = msg;
}