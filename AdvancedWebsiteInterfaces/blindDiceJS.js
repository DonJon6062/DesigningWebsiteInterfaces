//array to track whose turn it is
let playerTurn = ["user", "brainac", "coward", "riskTaker"];
// min and max vals for dice face
let minFaceVal = 1; 
let maxFaceVal = 6;
// min and max dice count vals
let minDiceNum = 1;
let maxDiceNum = 20;
//master array for all rolled die faces
let allDice = [];
// number of dice per player
let playerDiceNum = 5;
//arrays to hold the individual players' dice
let userDice = [];
let brainiacDice = [];
let cowardDice = [];
let riskTakerDice = [];
// track players' points
let userPoints = 0;
let brainiacPoints = 0;
let cowardPoints = 0;
let riskTakerPoints = 0;
//variables for the dice number and face value guessed
let startingDiceNumber = 0;
let startingFaceValue = 0;
let currentDiceNum = 0;
let currentFaceVal = 0;
// variable to track turns taken
let turns = 0;
// var to track total number of rounds
let roundDisplay = document.getElementById("spanRound");
let rounds = 0;
// vars for all dice boards
let brainiacDiceBoard = document.getElementById("brainiacDiceBoard");
let cowardDiceBoard = document.getElementById("cowardDiceBoard");
let riskTakerDiceBoard = document.getElementById("riskTakerDiceBoard");
let userDiceBoard = document.getElementById("userDiceBoard");
// vars for all players action statements
let brainiacAction = document.getElementById("brainiacAction");
let cowardAction = document.getElementById("cowardAction");
let riskTakerAction = document.getElementById("riskTakerAction");
// vars for user inputs 
let userGuessDiceNumber = document.getElementById("diceNumber");
let userGuessFaceValue = document.getElementById("diceFace");
let baseRerollAttempts = 3;
let currentRerollAttempts = 3;
let rerollChances = document.getElementById("rerollChances");
// var to display guess
let guessDisplay = document.getElementById("spanGuess");

// update number of rounds
function roundCount(rounds)
{
    // make rounds display
    roundDisplay.innerHTML = "Round " + rounds;
}

// give players dice, reset turns, rerolls and guess values
function roundStart()
{
    // empty the all array
    for(element in allDice)
    {
        allDice.pop();
    }
    // give all players their fresh dice
    rollDice(brainiacDice, brainiacDiceBoard);
    rollDice(cowardDice, cowardDiceBoard);
    rollDice(riskTakerDice, riskTakerDiceBoard);
    rollDice(userDice, userDiceBoard);
    // reset turns
    turns = 0;
    // reset rerolls
    currentRerollAttempts = baseRerollAttempts;
    // display reroll chances (claiming this is null)
    //rerollChances.innerHTML = currentRerollAttempts;
    // reset guess values
    currentDiceNum = startingDiceNumber;
    currentFaceVal = startingFaceValue;
    // to ensure numbers are generating correctly
    console.log("Brainiac Dice: " + brainiacDice.toString());
    console.log("Coward Dice: " + cowardDice.toString());
    console.log("Risk Taker Dice: " + riskTakerDice.toString());
    console.log("User Dice: " + userDice.toString());
    // sort and print the all array
    allDice.sort();
    console.log("All Dice: " + allDice.toString());
    console.log("All Dice contains " + allDice.length + " dice.")
}

//give array a set of random dice, and add the totals to the all array
function rollDice(playerDice, playerDiceBoard)
{
    // ensure array is empty
    for(i = 0; i < playerDiceNum; i++)
    {
        playerDice.pop();
    }
    //give player a random hand AND add all dice to the all array
    for(i = 0; i < playerDiceNum; i++)
    {
        // generate 20 random values between 1 and 6, then add it to the all array
        let randomNum = Math.floor(Math.random() * (maxFaceVal - minFaceVal + 1)) + minFaceVal;
        // place 5 dice with this player
        playerDice.push(randomNum);
        allDice.push(randomNum);
    }
    playerDice.sort();
    // so that when dice are placed in it's ordered least to most
    playerDice.reverse();
    // create row for the dice to be placed
    let singleDice = playerDiceBoard.insertRow(0);
    // for each dice
    for(let i = 0; i < playerDiceNum; i++)
    {
        // hide dice for now
        singleDice.insertCell(0).innerHTML = "?";
    }
}

//remove the dice the user previously had from the players' array and the all array
function removeDice(diceArray, diceToRemove)
{
    // thanks to geeksforgeeks for helping me understand splice!
    const index = diceArray.indexOf(diceToRemove);
    if (index !== -1) {
        diceArray.splice(index, 1);
    };
}

// remove the dice the user previously had from the users' array and the all array, then roll the dice
function reroll()
{
    // as long as the user can reroll and the game hasn't started
    if(currentRerollAttempts > 0 && currentDiceNum == startingDiceNumber && currentFaceVal == startingFaceValue)
    {
        // delete current data
        userDiceBoard.deleteRow(0);
        // locate and remove each element from the all and user array
        userDice.forEach(element => {
            // display dice to remove
            console.log("Removing " + element);
            removeDice(allDice, element);
        });
        // give user new dice
        rollDice(userDice, userDiceBoard);
        // display new dice
        revealDice(userDice, userDiceBoard);
        // to check new values are being given
        console.log("User Dice: " + userDice.toString());
        console.log("User Dice contains " + userDice.length + " dice.");
        // display number of dice in all dice array
        allDice.sort();
        console.log("All Dice: " + allDice.toString());
        console.log("All Dice contains " + allDice.length + " dice.");
        currentRerollAttempts--;
    }
}

// verify whether or not the guess is valid
function validGuess(currentDiceNum, currentFaceVal, playerFaceVal, playerDiceNum)
{    
    // verify whether or not a guess is valid
    let isValidGuess = false;
    // check guess is within limits of reality (dice rolls are 1-6, there are a total of 20 dice)
    if(playerFaceVal > currentFaceVal && playerFaceVal <= maxFaceVal && playerFaceVal >= minFaceVal || playerDiceNum > currentDiceNum && playerDiceNum <= maxDiceNum && playerDiceNum >= minDiceNum) 
    {
        isValidGuess = true; 
        currentDiceNum = playerDiceNum;
        currentFaceVal = playerFaceVal;
        return isValidGuess;
    }
    else
    {
        return isValidGuess;
    } 
}

//display dice
function revealDice(playerDice, playerDiceBoard)
{
    playerDiceBoard.deleteRow(0);
    // create row for the dice to be placed
    let singleDice = playerDiceBoard.insertRow(0);
    // for each dice
    for(let i = 0; i < playerDiceNum; i++)
    {
        // place the dice in the board
        singleDice.insertCell(0).innerHTML = playerDice[i];
    }
}

function roundEnd(currentDiceNum, currentFaceVal, accusingPlayer, currentPlayer)
{
    // var for number of valid dice
    let validDice = 0;
    allDice.forEach(element => {
        // count dice of correct value
        if(element == currentFaceVal)
        {
            validDice++;
        }
    });
    revealDice(brainiacDice, brainiacDiceBoard);
    revealDice(cowardDice, cowardDiceBoard);
    revealDice(riskTakerDice, riskTakerDiceBoard);
    // if there are more or equal valid dice
    if(validDice >= currentDiceNum)
    {
        // the current player is correct if there are enough dice of the value
        alert(currentPlayer.toUppercase() + " is correct!");
        let playerPoint = currentPlayer + "Points";
        playerPoint ++;
    }
    // or they lose
    else
    {
        // the accusing player is correct if there are not enough valid dice
        alert(accusingPlayer.toUppercase() + " is correct!");
        let playerPoint = accusingPlayer + "Points";
        playerPoint ++;
    }
    // check whether or not the current guess is correct
    rounds++;
    roundCount(rounds);
}

function brainiacGuess()
{
    // The Brainiac will attempt to guess using their lowest frequency dice number. They will call out another player if they claim 8 or more dice are the same face value.
    // if this player is starting (as shown by the starting variables being 0), guess (least frequent die), 2
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // this players' base guess
        brainiacDice.filter();
    }
    // if not, raise dice num by 1 and, if possible, the next valid face value they see
}

function cowardGuess()
{
    // The Coward will baseline guess one dice with a value of one. Their guess will increase dice number before face value, in increments of one. They will only call out another player after five turns without claims have passed, regardless of what the guess is.
    // if this player is starting (as shown by the starting variables being 0), guess 1,1
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // this players' base guess
        currentDiceNum = 1;
        currentFaceVal = 1;
        return [1,1];
    }
    // otherwise, add 1 to either value
}

function riskTakerGuess()
{
    // The Risk-Taker has a baseline guess of three dice with a value of four. They will increase the face value by 2 until it's at 6, at which point it will do the same for the dice number. They have a 1/10 chance after the third turn to call out any opponent.
    // if this player is starting (as shown by the starting variables being 0), guess 3,4
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // this players' base guess
        currentDiceNum = 3;
        currentFaceVal = 4;
        return [3,4];
    }
    // otherwise, raise face by 2 until max, then dice number by 2 until round ends
    if(currentFaceVal < 6)
    {
        let riskTakerFaceGuess = currentFaceVal + 2;
        if(riskTakerFaceGuess > 6)
        {
            riskTakerFaceGuess = 6;
        }
        // return adjusted face value
        return [currentDiceNum, riskTakerFaceGuess];
    }
    else
    {
        // add 2 to the current dice number
        let riskTakerDiceNumGuess = currentDiceNum + 2;
        // return adjusted dice number
        return [riskTakerDiceNumGuess, currentFaceVal];
    }
}

function userCallout(currentPlayer)
{
    // call out next player
    alert("User called out " + currentPlayer + "!");
    roundEnd(currentDiceNum, currentFaceVal, playerTurn[0], currentPlayer);
}

function brainacCallout(currentPlayer)
{
    // if more than 8 die is claimed
    if(currentDiceNum > 8)
    {
        // call out next player
        alert("Brainiac called out " + currentPlayer + "!");
        roundEnd(currentDiceNum, currentFaceVal, playerTurn[1], currentPlayer);
    }
}

function cowardCallout(currentPlayer)
{
    // if more than 5 turns have passed
    if(turns > 5)
    {
        // callout current player
        alert("Coward called out " + currentPlayer + "!");
        roundEnd(currentDiceNum, currentFaceVal, playerTurn[2], currentPlayer);
    }
}

function riskTakerCallout(currentPlayer)
{
    // if more than 3 turns have passed
    if(turns > 3)
    {
        // generate a random number to decide if the callout happens
        let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        if(randomNum = 5)
        {
            // callout current player
            alert("Risk Taker called out " + currentPlayer + "!");
            roundEnd(currentDiceNum, currentFaceVal, playerTurn[3], currentPlayer);
        }
    }
}

function startGame()
{
    revealDice(userDice, userDiceBoard);
    roundCount(rounds);
}

roundStart();
startGame();