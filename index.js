var Word = require('./word.js');
var inquirer = require('inquirer');

var letters = 'abcdefghijklmnopqrstuvwxyz';

var bandNames = ['nofx' , 'nirvana', 'hole', 'creed', 'the rolling stones', 'david bowie', 'pixies' , 'cure', 'morrissey', 'the shins'];

var randomIndex = Math.floor(Math.random() * bandNames.length);

var selectedWord = bandNames[randomIndex];

//pass word into word constructor
passedWord = new Word(selectedWord);

var newWord = false;

var wrongLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function gamePlay() {

   //generates new word for Word constructor
   if (newWord) {
       //selects random newBands array
       var randomIndex = Math.floor(Math.random() * bandNames.length);
       var selectedWord = bandNames[randomIndex];

       // passes
       passedWord = new Word(selectedWord);

       var newWord = false;
   }
   var wordComplete = [];
   passedWord.objArray.forEach(complete);

   if (wordComplete.includes(false)) {
       inquirer
           .prompt([
               {
                   type: 'input',
                   message: 'Guess a letter between A-Z',
                   name: 'userinput'
               }
           ])
           .then(function (input) {
               if (!letters.includes(input.userinput) || input.userinput.length > 1) {
                   console.log('\nTry Again\n');
                   gamePlay();
               } else {
// already guessed letter or you hit enter without a guessing 
                   if (wrongLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                       console.log("\nAlready Guessed or Nothing Entered\n");
                       gamePlay();
                   } else {
                   var checkArray = [];

                   passedWord.userGuess(input.userinput);

                   passedWord.objArray.forEach(wordCheck);

                       if (checkArray.join('') === wordComplete.join('')) {
                           console.log('\nWrong\n');

                           wrongLetters.push(input.userinput);
                           guessesLeft--;
                       } else {
                           console.log('Correct');

                           correctLetters.push(input.userinput);
                       }
                       passedWord.log();
                       //  guesses left
                       console.log('Guesses Left: ', guessesLeft + '\n');
                    //    shows letters you have guessed 
                       console.log('Letters Guessed: ', wrongLetters.join('') + '\n');

                       if (guessesLeft > 0) {
                           gamePlay();
                       } else {
                           console.log('Lost');

                           restartGame();
                       }

                       function wordCheck(key) {
                           checkArray.push(key.guessed);
                       }
               }
           }
       })
} else {
   console.log('You Win');

   restartGame();
}

function complete(key) {
   wordComplete.push(key.guessed);
}
}
// function to restart game that includes inquire prompts 
function restartGame() {
   inquirer
       .prompt([
           {
               type: 'list',
               message: 'Would you like to',
               choices: ['play again', 'exit'],
               name: 'restart'
           }
       ])
       .then(function (input) {
           if (input.restart === 'Play Again') {
               newWord = true;
               wrongLetters = [];
               correctLetters = [];
               guessesLeft = 10;
               gamePlay();
           } else {
               return
           }
       })
}

gamePlay();