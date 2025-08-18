// var to track total number of rounds
let rounds = 1;
const ROUND_DISPLAY = document.getElementById("spanRound");
//array to track whose turn it is
let playerTurn = ["User", "Brainac", "Coward", "Risk-Taker"];
// variable to track turns taken
let currentTurn = 1;
// the round starts on the latest winner, but baseline is the user
let startingPlayer = 0;
let currentPlayer;
let currentPlayerName;
let winner;
// var to display player turn
const PLAYER_TURN_DISPLAY = document.getElementById("spanPlayerTurn");
// var to display current guess
const GUESS_DISPLAY = document.getElementById("spanGuess");
// min and max vals for dice face
const MIN_FACE_VAL = 1; 
const MAX_FACE_VAL = 6;
// min and max dice count vals
const MIN_DICE_NUM = 1;
const MAX_DICE_NUM = 20;
//variables for the dice number and face value guessed
const BASE_DICE_NUM = 0;
const BASE_FACE_VAL = 0;
let currentDiceNum = 0;
let currentFaceVal = 0;
//master array for all rolled die faces
let allDiceArray = [];
//arrays to hold the individual players' dice
let diceArrayUser = [];
let diceArrayBrainac = [];
let diceArrayCoward = [];
let diceArrayRiskTaker = [];
// number of dice per player
const PLAYER_DICE_NUM = 5;
// track players' points
let pointsUser = 0;
const POINTS_DISPLAY_USER = document.getElementById("spanUserPoints");
let pointsBrainac = 0;
const POINTS_DISPLAY_BRAINIAC = document.getElementById("spanBrainiacPoints");
let pointsCoward = 0;
const POINTS_DISPLAY_COWARD = document.getElementById("spanCowardPoints");
let pointsRiskTaker = 0;
const POINTS_DISPLAY_RISK_TAKER = document.getElementById("spanRiskTakerPoints");
// vars for all dice boards
const DICE_BOARD_USER = document.getElementById("userDiceBoard");
const DICE_BOARD_BRAINAIC = document.getElementById("brainiacDiceBoard");
const DICE_BOARD_COWARD = document.getElementById("cowardDiceBoard");
const DICE_BOARD_RISK_TAKER = document.getElementById("riskTakerDiceBoard");
// vars for all players action statements
const ACTION_USER = document.getElementById("spanUserAction")
const ACTION_BRAINIAC = document.getElementById("spanBrainiacAction");
const ACTION_COWARD = document.getElementById("spanCowardAction");
const ACTION_RISK_TAKER = document.getElementById("spanRiskTakerAction");
// buttons for accusing other players
const ACCUSE_BRAINIAC = document.getElementById("accuseBrainiac");
const ACCUSE_COWARD = document.getElementById("accuseCoward");
const ACCUSE_RISK_TAKER = document.getElementById("accuseRiskTaker");
// vars for user inputs 
const GUESS_DICE_NUM = document.getElementById("inputDiceNum");
const GUESS_FACE_VAL = document.getElementById("inputFaceVal");
const GUESS_BUTTON = document.getElementById("userGuessButton");
// vars for rerolling
let baseRerollAttempts = 5;
let currentRerollAttempts;
const REROLL_CHANCES_DISPLAY = document.getElementById("spanRerollChances");

// basic update function for non variable intense changes
function updateInnerHTML(span, variable)
{
    span.innerHTML = variable;
}

// state guess of opponents (has many vars)
function displayGuess(display, player)
{
    // if it isn't the players' turn, display that they are waiting
    display.innerHTML = player + " guessed " + currentDiceNum + " dice with a value of " + currentFaceVal + ".";
    updateGuess();
}

// display claimed diceNum and faceVal (has many vars)
function updateGuess()
{
    // base statement string
    let baseStatement = currentDiceNum + " dice with a value of " + currentFaceVal + "."
    GUESS_DISPLAY.innerHTML = baseStatement;
}

// advance turns; prevent the turn from being in constantly updatedfrom the update function: every time it returns to the original player, advance currentTurns
function advanceTurn()
{
    // if the current player IS the last player
    if(currentPlayer == playerTurn.length - 1)
    {
        // go back to the beginning of the array (0)
        currentPlayer = 0;
    }
    else
    {
        // go to next player
        currentPlayer++; 
    }
    // if the player is the player that started the round
    if(currentPlayer == startingPlayer)
    {
        // add 1 to the turn count
        currentTurn++;
        // display turn count
        console.log("Turn " + currentTurn);
    }
    // display current player
    console.log(playerTurn[currentPlayer]);
    updateInnerHTML(PLAYER_TURN_DISPLAY, playerTurn[currentPlayer]);
}

//give array a set of random dice, and add the totals to the all array
function rollDice(playerDiceArray, playerDiceBoard)
{
    // ensure array is empty
    while(playerDiceArray.length > 0)
    {
        playerDiceArray.pop();
    }
    //give player a random hand AND add all dice to the all array
    for(i = 0; i < PLAYER_DICE_NUM; i++)
    {
        // generate 5 random values between 1 and 6, then add it to the all array
        let randomNum = Math.floor(Math.random() * (MAX_FACE_VAL - MIN_FACE_VAL + 1)) + MIN_FACE_VAL;
        // place 5 dice with this player
        playerDiceArray.push(randomNum);
        allDiceArray.push(randomNum);
    }
    // organize the numbers for readability
    playerDiceArray.sort();
    // so that when dice are placed in the dice board they are ordered least to most
    playerDiceArray.reverse();
    // create row for the dice to be placed
    let board = playerDiceBoard.insertRow(0);
    // for each dice, place a value
    for(let i = 0; i < PLAYER_DICE_NUM; i++)
    {
        // hide dice for now
        board.insertCell(0).innerHTML = "?";
    }
}

//remove the dice the user previously had from the players' array and the all array
function removeDice(playerDiceArray, diceToRemove)
{
    // thanks to geeksforgeeks for helping me understand splice! this ensures the all array doesn't have values that should be removed.
    const index = playerDiceArray.indexOf(diceToRemove);
    if (index !== -1) {
        playerDiceArray.splice(index, 1);
    };
}

// remove the dice the user previously had from the users' array and the all array, then roll the dice, if the player can still reroll
function reroll()
{
    // as long as the user can reroll and the game hasn't started
    if(currentRerollAttempts > 0 && currentDiceNum == BASE_DICE_NUM && currentFaceVal == BASE_FACE_VAL)
    {
        // delete current data
        DICE_BOARD_USER.deleteRow(0);
        // locate and remove each element from the all and user array
        diceArrayUser.forEach(element => {
            // display dice to remove
            removeDice(allDiceArray, element);
        });
        // to check old values are being removed
        console.log("User Dice: " + diceArrayUser.toString() + "\n" + "User Dice contains " + diceArrayUser.length + " dice." + "\n" + "All Dice: " + allDiceArray.toString() + "\n" + "All Dice contains " + allDiceArray.length + " dice.");
        // give user new dice
        rollDice(diceArrayUser, DICE_BOARD_USER);
        // display new dice
        revealDice(diceArrayUser, DICE_BOARD_USER);
        // to check new values are being given
        console.log("User Dice: " + diceArrayUser.toString() + "\n" + "User Dice contains " + diceArrayUser.length + " dice.");
        // display number of dice in all dice array
        allDiceArray.sort();
        console.log("All Dice: " + allDiceArray.toString() + "\n" + "All Dice contains " + allDiceArray.length + " dice.");
        currentRerollAttempts--;
        updateInnerHTML(REROLL_CHANCES_DISPLAY, currentRerollAttempts);
    }
}

//display dice
function revealDice(playerDice, playerDiceBoard)
{
    playerDiceBoard.deleteRow(0);
    // create row for the dice to be placed
    let board = playerDiceBoard.insertRow(0);
    // for each dice
    for(let i = 0; i < PLAYER_DICE_NUM; i++)
    {
        // place the dice in the board
        board.insertCell(0).innerHTML = playerDice[i];
    }
}

// hide all accuse buttons, then enable the button for the current player
function hideButtons()
{
    // set all buttons to disabled
    ACCUSE_BRAINIAC.style.visibility = 'hidden';
    ACCUSE_COWARD.style.visibility = 'hidden';
    ACCUSE_RISK_TAKER.style.visibility = 'hidden';
    GUESS_BUTTON.style.visibility = 'hidden';
}

// enable button with ID passed through
function enableButton(buttonID)
{
    // set style to visible
    buttonID.style.visibility = 'visible';
}

// check count of dice
function amountOfValue(diceArray, faceValue)
{
    // get amount of passed face value
    return diceArray.filter(x => x === faceValue).length;
};

// give players dice, reset turns, set starting player
function roundStart()
{
    // empty all dice array (doing this in rollDice causes weird errors, but is fine here!)
    allDiceArray = [];
    // reset turns
    currentTurn = 1;
    // hide buttons
    hideButtons();
    // give all players their fresh dice; not in roll dice because that's also called when the user rerolls
    rollDice(diceArrayBrainac, DICE_BOARD_BRAINAIC);
    rollDice(diceArrayCoward, DICE_BOARD_COWARD);
    rollDice(diceArrayRiskTaker, DICE_BOARD_RISK_TAKER);
    rollDice(diceArrayUser, DICE_BOARD_USER);
    // to ensure numbers are generating correctly
    console.log("Brainiac Dice: " + diceArrayBrainac.toString() + "\n" + "Coward Dice: " + diceArrayCoward.toString() + "\n" + "Risk Taker Dice: " + diceArrayRiskTaker.toString() + "\n" + "User Dice: " + diceArrayUser.toString());
    // sort and print the all array
    allDiceArray.sort();
    console.log("All Dice: " + allDiceArray.toString() + "\n" + "All Dice contains " + allDiceArray.length + " dice.")
}

function callout(accuserName)
{
    // string template for evaluation statement
    function baseStatement(name)
    {
        return name + " is correct! There is " + validDice + " " + currentFaceVal + "'s!";
    }
    // var for number of valid dice
    let validDice = amountOfValue(allDiceArray, currentFaceVal);
    revealDice(diceArrayBrainac, DICE_BOARD_BRAINAIC);
    revealDice(diceArrayCoward, DICE_BOARD_COWARD);
    revealDice(diceArrayRiskTaker, DICE_BOARD_RISK_TAKER);
    currentPlayerName = playerTurn[currentPlayer].toString();
    // based on whose turn it is, change who is registered as the player
    if(validDice >= currentDiceNum)
    {
        // check which player gets points; state winner
        if(currentPlayerName == playerTurn[0])
        {
            // display information
            alert(baseStatement(currentPlayerName.toString()));
            winner = 0;
            pointsUser++;
            updateInnerHTML(POINTS_DISPLAY_USER, pointsUser);
        }
        if(currentPlayerName == playerTurn[1])
        {
            // display information
            alert(baseStatement(currentPlayerName.toString()));
            winner = 1;
            pointsBrainac++;
            updateInnerHTML(POINTS_DISPLAY_BRAINIAC, pointsBrainac);
        }
        if(currentPlayerName == playerTurn[2])
        {
            // display information
            alert(baseStatement(currentPlayerName.toString()));
            winner = 2;
            pointsCoward++;
            updateInnerHTML(POINTS_DISPLAY_COWARD, pointsCoward);
        }
        if(currentPlayerName == playerTurn[3])
        {
            // display information
            alert(baseStatement(currentPlayerName.toString()));
            winner = 3;
            pointsRiskTaker++; 
            updateInnerHTML(POINTS_DISPLAY_RISK_TAKER, pointsRiskTaker);
        }
    }
    else
    {
        //check which player gets points; state winner
        if(accuserName == playerTurn[0])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            winner = 0;
            pointsUser++;
            updateInnerHTML(POINTS_DISPLAY_USER, pointsUser);
        }
        if(accuserName == playerTurn[1])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            winner = 1;
            pointsBrainac++;
            updateInnerHTML(POINTS_DISPLAY_BRAINIAC, pointsBrainac);
        }
        if(accuserName == playerTurn[2])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            winner = 2;
            pointsCoward++;
            updateInnerHTML(POINTS_DISPLAY_COWARD, pointsCoward);
        }
        if(accuserName == playerTurn[3])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            winner = 3;
            pointsRiskTaker++; 
            updateInnerHTML(POINTS_DISPLAY_RISK_TAKER, pointsRiskTaker);
        }
    }
    // update round count
    roundCount++;
    updateInnerHTML(ROUND_DISPLAY, roundCount);
    // show whose turn it is, set current player to winner
    currentPlayer = winner;
    currentPlayerName = playerTurn[currentPlayer].toString();
    updateInnerHTML(PLAYER_TURN_DISPLAY, currentPlayerName);
    // reset guess values
    currentDiceNum = BASE_DICE_NUM;
    currentFaceVal = BASE_FACE_VAL;
    roundStart();
}

// brainiac code
function brainiacGuess()
{
    // The Brainiac will attempt to guess using their lowest frequency dice number.
    revealDice(diceArrayBrainac, DICE_BOARD_BRAINAIC);
    // place array in order
    diceArrayBrainac.sort();
    // guess 1-3 more than the smallest value in hand
    let varience = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    // if this player is starting (as shown by the starting variables being 0), guess (least frequent die) thrice
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // get smallest value in array
        let smallestValue = diceArrayBrainac[0];
        // get amount of smallest value
        let smallestValueAmount = amountOfValue(diceArrayBrainac, smallestValue);
        // update values
        currentDiceNum = smallestValueAmount + varience;
        currentFaceVal = smallestValue;
    }
    else
    {
        // check if current face value is in array
        if(diceArrayBrainac.includes(currentFaceVal))
        {
            // get amount of the value
            let frequency = amountOfValue(diceArrayBrainac, currentFaceVal);
            // increase the value by how many they see and a random number; add current number to keep it valid.
            currentDiceNum = currentDiceNum + frequency;
        }
        else
        {
            // increase the face value if possible
            if(currentFaceVal < 6)
            {
                currentFaceVal++;
                currentDiceNum = varience;
            }
            else
            {
                currentDiceNum = currentDiceNum + varience;
            }
        }
    }
    displayGuess(ACTION_BRAINIAC, playerTurn[1]);
    hideButtons();
    enableButton(ACCUSE_BRAINIAC);
    updateGuess();
}

function brainacCallout()
{
    // if more than 8 die is claimed
    if(currentDiceNum > 8)
    {
        // call out next player
        currentPlayerName = playerTurn[currentPlayer].toString();
        alert("Brainiac called out " + currentPlayerName + "!");
        callout(playerTurn[1]);
    }
}

// coward code
function cowardGuess()
{
    // if this player is starting (as shown by the starting variables being 0), guess 1,1
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // this players' base guess
        currentDiceNum = 1;
        currentFaceVal = 1;
    }
    else
    {
        // otherwise, add 1 to either value, randomly (as long as it would still be valid)
        if(currentFaceVal < 6)
        {
            // 50/50 between adding 1 to either value
            let randomNum = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            if(randomNum == 1)
            {
                // add 1 to current diceNum
                currentDiceNum++;
            }
            else
            {
                // add 1 to current faceVal
                currentFaceVal++;
            }
        }
        else
        {
            currentDiceNum++;
        }
    }
    displayGuess(ACTION_COWARD, playerTurn[2]);
    hideButtons();
    enableButton(ACCUSE_COWARD);
    updateGuess();
}

function cowardCallout()
{
    // if more than 6 turns have passed and it is NOT their turn
    if(currentTurn > 6)
    {
        // callout current player
        currentPlayerName = playerTurn[currentPlayer].toString();
        alert("Coward called out " + currentPlayerName + "!");
        callout(playerTurn[2]);
    }
}

// risk taker code
function riskTakerGuess()
{
    // if this player is starting (as shown by the starting variables being 0), guess 3,4
    if(currentDiceNum == 0 && currentFaceVal == 0)
    {
        // this players' base guess
        currentDiceNum = 3;
        currentFaceVal = 4;
    }
    else
    {
        // otherwise, raise face by 2 until max, then dice number by 2 until round ends
        if(currentFaceVal < 6)
        {
            currentFaceVal += 2;
            if(currentFaceVal > 6)
            {
                currentFaceVal = 6;
            }
        }
        else
        {
            // add 2 to the current dice number
            currentDiceNum += 2;
        }
    }
    displayGuess(ACTION_RISK_TAKER, playerTurn[3]);
    hideButtons();
    enableButton(ACCUSE_RISK_TAKER);
    updateGuess();
}

function riskTakerCallout()
{
    // if more than 2 turns have passed
    if(currentTurn > 2)
    {
        // generate a random number between 1 and 5 to decide if the callout happens
        let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        if(randomNum == 5)
        {
            // callout current player
            currentPlayerName = playerTurn[currentPlayer].toString();
            alert("Risk Taker called out " + currentPlayerName + "!");
            callout(playerTurn[3]);
        }
    }
}

// user guess is passed and displayed
function userGuess()
{
    // get inputs
    if(GUESS_DICE_NUM.value > currentDiceNum && GUESS_DICE_NUM.value >= 1 || GUESS_FACE_VAL.value > currentFaceVal && GUESS_FACE_VAL.value >= 1)
    {
        // update values and display the new guess, ensure this is an int
        currentDiceNum = parseInt(GUESS_DICE_NUM.value);
        currentFaceVal = parseInt(GUESS_FACE_VAL.value);
        // display new info
        displayGuess(ACTION_USER, playerTurn[0]);
        updateGuess();
        // let the opponents choose if they want to guess or not
        riskTakerCallout();
        brainacCallout();
        cowardCallout();
    }
    else
    {
        // prompt the user to enter a valid option
        alert("You must increase the amount or the face value of dice guesssed!");
    }
}

// allow the user to call out the current player(NOT themself)
function userCallout()
{
    // call out next player
    currentPlayerName = playerTurn[currentPlayer].toString();
    alert("User called out " + currentPlayerName + "!");
    callout(playerTurn[0]);
}

// loop through turns
function gameloop(player)
{
    // get current player and run their guess code, or enable/disable user guesses
    if(player == playerTurn[0])
    {
        // allow user to guess
        enableButton(GUESS_BUTTON);
    }
    if(player == playerTurn[1])
    {
        // brainiac guesses, other players evaluate
        brainiacGuess();
        riskTakerCallout();
        cowardCallout();
    }
    if(player == playerTurn[2])
    {
        // coward guesses, other players evaluate
        cowardGuess();
        riskTakerCallout();
        brainacCallout();
    }
    if(player == playerTurn[3])
    {
        // risk taker guesses, other players evaluate
        riskTakerGuess();
        brainacCallout();
        cowardCallout();
    }
}

function blindDice()
{
    console.log("Game Start!")
    // five rounds
    while(pointsUser < 5 && pointsBrainac < 5 && pointsCoward < 5 && pointsRiskTaker < 5)
    {
        // allow current player to guess
        gameloop(currentPlayerName);
        advanceTurn();
    }
}

function startGame()
{
    // reset rerolls
    currentRerollAttempts = baseRerollAttempts;
    // reset guess values
    currentDiceNum = BASE_DICE_NUM;
    currentFaceVal = BASE_FACE_VAL;
    // set startingPlayer to user, set currentPlayer to startingPlayer
    //startingPlayer;
    currentPlayer = startingPlayer;
    currentPlayerName = playerTurn[currentPlayer].toString();
    // display reroll chances
    updateInnerHTML(REROLL_CHANCES_DISPLAY, currentRerollAttempts);
    // show current round
    updateInnerHTML(ROUND_DISPLAY, roundCount);
    // show whose turn it is
    updateInnerHTML(PLAYER_TURN_DISPLAY, currentPlayerName);
    // reset and display points
    pointsUser = 0;
    pointsBrainac = 0;
    pointsCoward = 0;
    pointsRiskTaker = 0;
    updateInnerHTML(POINTS_DISPLAY_USER, pointsUser);
    updateInnerHTML(POINTS_DISPLAY_BRAINIAC, pointsBrainac);
    updateInnerHTML(POINTS_DISPLAY_COWARD, pointsCoward);
    updateInnerHTML(POINTS_DISPLAY_RISK_TAKER, pointsRiskTaker);
    // give starting dice
    roundStart();
    // show user their dice
    revealDice(diceArrayUser, DICE_BOARD_USER);
    // show current guess
    updateGuess();
    console.log("Turn " + currentTurn + "\n" + currentPlayerName);
}

// start the game
startGame();