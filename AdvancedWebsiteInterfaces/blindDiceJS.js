// var to track total number of rounds
let roundCount = 1;
const roundDisplay = document.getElementById("spanRound");
//array to track whose turn it is
let playerTurn = ["User", "Brainiac", "Coward", "Risk-Taker"];
// variable to track turns taken
let currentTurn = 1;
// the round starts on the latest winner, but baseline is the user
let startingPlayer = 0;
let currentPlayer;
let currentPlayerName;
// let winner;
// var to display player turn
const playerTurnDisplay = document.getElementById("spanPlayerTurn");
// var to display current guess
const guessDisplay = document.getElementById("spanGuess");
// min and max vals for dice face
const minFaceVal = 1; 
const maxFaceVal = 6;
// min and max dice count vals
const minDiceNum = 1;
const maxDiceNum = 20;
//variables for the dice number and face value guessed
const baseDiceNum = 0;
const baseFaceVal = 0;
let currentDiceNum;
let currentFaceVal;
//master array for all rolled die faces
let allDiceArray = [];
//arrays to hold the individual players' dice
let diceArrayUser = [];
let diceArrayBrainiac = [];
let diceArrayCoward = [];
let diceArrayRiskTaker = [];
// number of dice per player
const playerDiceNum = 5;
// track players' points
let pointsUser = 0;
const pointsDisplayUser = document.getElementById("spanUserPoints");
let pointsBrainiac = 0;
const pointsDisplayBrainiac = document.getElementById("spanBrainiacPoints");
let pointsCoward = 0;
const pointsDisplayCoward = document.getElementById("spanCowardPoints");
let pointsRiskTaker = 0;
const pointsDisplayRiskTaker = document.getElementById("spanRiskTakerPoints");
// vars for all dice boards
const diceBoardUser = document.getElementById("userDiceBoard");
const diceBoardBrainiac = document.getElementById("brainiacDiceBoard");
const diceBoardCoward = document.getElementById("cowardDiceBoard");
const diceBoardRiskTaker = document.getElementById("riskTakerDiceBoard");
// vars for all players action statements
const actionUser = document.getElementById("spanUserAction")
const actionBrainiac = document.getElementById("spanBrainiacAction");
const actionCoward = document.getElementById("spanCowardAction");
const actionRiskTaker = document.getElementById("spanRiskTakerAction");
// buttons for accusing other players
const calloutBrainiacButton = document.getElementById("calloutBrainiac");
const calloutCowardButton = document.getElementById("calloutCoward");
const calloutRiskTakerButton = document.getElementById("calloutRiskTaker");
// buttons to pass on calling out opponents
const passBrainiacButton = document.getElementById("passBrainiac");
const passCowardButton = document.getElementById("passCoward");
const passRiskTakerButton = document.getElementById("passRiskTaker");
// vars for user inputs 
const guessDiceNum = document.getElementById("inputDiceNum");
const guessFaceVal = document.getElementById("inputFaceVal");
const guessSubmitButton = document.getElementById("userGuessButton");
// vars for rerolling
let baseRerollAttempts = 5;
let currentRerollAttempts;
const rerollChancesDisplay = document.getElementById("spanRerollChances");
// points based win or nah
let winCondition = document.getElementsByName("endlessToggle");

// basic update function for non variable intense inner HTML changes
function updateInnerHTML(span, variable)
{
    span.innerHTML = variable;
}

// change all variables to defaults (for restarting the game)
function resetData()
{
    // reset rerolls
    currentRerollAttempts = baseRerollAttempts;
    // reset guess values
    currentDiceNum = baseDiceNum;
    currentFaceVal = baseFaceVal;
    // set startingPlayer to user, set currentPlayer to startingPlayer
    currentPlayer = startingPlayer;
    currentPlayerName = playerTurn[currentPlayer].toString();
    // display reroll chances
    updateInnerHTML(rerollChancesDisplay, currentRerollAttempts);
    // reset and show current round
    roundCount = 1;
    updateInnerHTML(roundDisplay, roundCount);
    // show whose turn it is
    updateInnerHTML(playerTurnDisplay, currentPlayerName);
    // reset and display points
    pointsUser = 0;
    pointsBrainiac = 0;
    pointsCoward = 0;
    pointsRiskTaker = 0;
    updateInnerHTML(pointsDisplayUser, pointsUser);
    updateInnerHTML(pointsDisplayBrainiac, pointsBrainiac);
    updateInnerHTML(pointsDisplayCoward, pointsCoward);
    updateInnerHTML(pointsDisplayRiskTaker, pointsRiskTaker);
}

// display a standby message for all players (NOT user)
function allWaiting()
{
    // display all players as waiting
    let fillerTxt = "Waiting...";
    updateInnerHTML(actionBrainiac, fillerTxt);
    updateInnerHTML(actionCoward, fillerTxt);
    updateInnerHTML(actionRiskTaker, fillerTxt);
    // set userText to nothing
    let nullTxt = "";
    updateInnerHTML(actionUser, nullTxt);
}

// hide all callout buttons, then enable the button for the current player
function hideButtons()
{
    // set all buttons to disabled
    calloutBrainiacButton.style.visibility = 'hidden';
    passBrainiacButton.style.visibility = 'hidden';
    calloutCowardButton.style.visibility = 'hidden';
    passCowardButton.style.visibility = 'hidden';
    calloutRiskTakerButton.style.visibility = 'hidden';
    passRiskTakerButton.style.visibility = 'hidden';
    guessSubmitButton.style.visibility = 'hidden';
}

// enable button with ID passed through
function enableButton(buttonID)
{
    // set style to visible
    buttonID.style.visibility = 'visible';
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
    guessDisplay.innerHTML = baseStatement;
}

// allow current player to act
function playerAction()
{
    // hide all buttons
    hideButtons();
    // current player goes
    if(currentPlayer == 0)
    {
        // allow user to guess
        enableButton(guessSubmitButton);
    }
    if(currentPlayer == 1)
    {
        // brainiac guesses
        console.log("Brainiac is guessing!");
        brainiacGuess();
    }
    if(currentPlayer == 2)
    {
        // coward guesses
        console.log("Coward is guessing!");
        cowardGuess();
    }
    if(currentPlayer == 3)
    {
        // risk taker guesses
        console.log("Risk Taker is guessing!");
        riskTakerGuess();
    }
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
    updateInnerHTML(playerTurnDisplay, playerTurn[currentPlayer]);
    // current player goes
    playerAction();
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
    for(i = 0; i < playerDiceNum; i++)
    {
        // generate 5 random values between 1 and 6, then add it to the all array
        let randomNum = Math.floor(Math.random() * (maxFaceVal - minFaceVal + 1)) + minFaceVal;
        // place 5 dice with this player
        playerDiceArray.push(randomNum);
        allDiceArray.push(randomNum);
    }
    // organize the numbers for readability
    playerDiceArray.sort();
    // so that when dice are placed in the dice board they are ordered least to most
    playerDiceArray.reverse();
    while (playerDiceBoard.rows.length > 0) 
    {
        playerDiceBoard.deleteRow(0);
    }
    // create row for the dice to be placed
    let board = playerDiceBoard.insertRow(0);
    // for each dice, place a value
    for(let i = 0; i < playerDiceNum; i++)
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
    if(currentRerollAttempts > 0 && currentDiceNum == baseDiceNum && currentFaceVal == baseFaceVal)
    {
        // delete current data
        diceBoardUser.deleteRow(0);
        // locate and remove each element from the all and user array
        diceArrayUser.forEach(element => {
            // display dice to remove
            removeDice(allDiceArray, element);
        });
        // give user new dice
        rollDice(diceArrayUser, diceBoardUser);
        // display new dice
        revealDice(diceArrayUser, diceBoardUser);
        // display number of dice in all dice array
        allDiceArray.sort();
        currentRerollAttempts--;
        updateInnerHTML(rerollChancesDisplay, currentRerollAttempts);
    }
}

//display dice
function revealDice(playerDice, playerDiceBoard)
{
    while (playerDiceBoard.rows.length > 0) 
    {
    playerDiceBoard.deleteRow(0);
    }
    // create row for the dice to be placed
    let board = playerDiceBoard.insertRow(0);
    // for each dice
    for(let i = 0; i < playerDiceNum; i++)
    {
        // place the dice in the board
        board.insertCell(0).innerHTML = playerDice[i];
    }
}

// give players dice, reset turns, set starting player
function roundStart()
{
    // empty all dice array (doing this in rollDice causes weird errors, but is fine here!)
    allDiceArray = [];
    // reset turns
    currentTurn = 1;
    // give all players their fresh dice; not in roll dice because that's also called when the user rerolls
    rollDice(diceArrayBrainiac, diceBoardBrainiac);
    rollDice(diceArrayCoward, diceBoardCoward);
    rollDice(diceArrayRiskTaker, diceBoardRiskTaker);
    rollDice(diceArrayUser, diceBoardUser);
    // show user their dice
    revealDice(diceArrayUser, diceBoardUser);
    // sort and print the all array
    allDiceArray.sort();
}

// check count of dice
function amountOfValue(diceArray, faceValue)
{
    // get amount of passed face value
    return diceArray.filter(x => x === faceValue).length;
};

// reveal all dice, get amount of dice of the current face value, give points (currentPlayerName is assigned in all callout functions)
function callout(accuserName)
{
    // hide all buttons
    hideButtons();
    // string template for evaluation statement; function for parameter
    function baseStatement(name)
    {
        return name + " is correct! There is " + validDice + " " + currentFaceVal + "'s!";
    }
    // var for number of valid dice
    let validDice = amountOfValue(allDiceArray, currentFaceVal);
    revealDice(diceArrayBrainiac, diceBoardBrainiac);
    revealDice(diceArrayCoward, diceBoardCoward);
    revealDice(diceArrayRiskTaker, diceBoardRiskTaker);
    // based on whose turn it is, change who is registered as the player
    if(validDice >= currentDiceNum)
    {
        // check which player gets points; state winner
        if(currentPlayerName == playerTurn[0])
        {
            // display information
            alert(baseStatement(currentPlayerName));
            console.log(baseStatement(currentPlayerName));
            currentPlayer = 0;
            pointsUser++;
            updateInnerHTML(pointsDisplayUser, pointsUser);
        }
        if(currentPlayerName == playerTurn[1])
        {
            // display information
            alert(baseStatement(currentPlayerName));
            console.log(baseStatement(currentPlayerName));
            currentPlayer = 1;
            pointsBrainiac++;
            updateInnerHTML(pointsDisplayBrainiac, pointsBrainiac);
        }
        if(currentPlayerName == playerTurn[2])
        {
            // display information
            alert(baseStatement(currentPlayerName));
            console.log(baseStatement(currentPlayerName));
            currentPlayer = 2;
            pointsCoward++;
            updateInnerHTML(pointsDisplayCoward, pointsCoward);
        }
        if(currentPlayerName == playerTurn[3])
        {
            // display information
            alert(baseStatement(currentPlayerName));
            console.log(baseStatement(currentPlayerName));
            currentPlayer = 3;
            pointsRiskTaker++; 
            updateInnerHTML(pointsDisplayRiskTaker, pointsRiskTaker);
        }
    }
    else
    {
        //check which player gets points; state winner
        if(accuserName == playerTurn[0])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            console.log(baseStatement(accuserName.toString()));
            currentPlayer = 0;
            pointsUser++;
            updateInnerHTML(pointsDisplayUser, pointsUser);
        }
        if(accuserName == playerTurn[1])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            console.log(baseStatement(accuserName.toString()));
            currentPlayer = 1;
            pointsBrainiac++;
            updateInnerHTML(pointsDisplayBrainiac, pointsBrainiac);
        }
        if(accuserName == playerTurn[2])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            console.log(baseStatement(accuserName.toString()));
            currentPlayer = 2;
            pointsCoward++;
            updateInnerHTML(pointsDisplayCoward, pointsCoward);
        }
        if(accuserName == playerTurn[3])
        {
            // display information
            alert(baseStatement(accuserName.toString()));
            console.log(baseStatement(accuserName.toString()));
            currentPlayer = 3;
            pointsRiskTaker++; 
            updateInnerHTML(pointsDisplayRiskTaker, pointsRiskTaker);
        }
    }
    // show whose turn it is, set current player to winner
    currentPlayerName = playerTurn[currentPlayer].toString();
    if(winCondition[0].checked)
    {
        console.log("This is a first to 5.");
        // check if points are at 5 or not
        if(pointsBrainiac >= 5 || pointsCoward >= 5 || pointsRiskTaker >= 5 || pointsUser >= 5)
        {
            // declare winner and start game over
            alert(currentPlayerName + " has won. Congrats!");
            startGame();
        }
        else
        {
            // update round count
            roundCount++;
            updateInnerHTML(roundDisplay, roundCount);
            // reset guess values
            currentDiceNum = baseDiceNum;
            currentFaceVal = baseFaceVal;
            updateGuess();
            // reset turns
            currentTurn = 1;
            // display all players as on standby
            allWaiting();
            // give new starting dice
            roundStart();
            // show whose turn it is, set current player to winner);
            updateInnerHTML(playerTurnDisplay, currentPlayerName);
            // allow player to act
            playerAction();
        }
    }
    else
    {
        console.log("This is endless.");
        // tally up points and let winner go, update round count
        roundCount++;
        updateInnerHTML(roundDisplay, roundCount);
        // reset guess values
        currentDiceNum = baseDiceNum;
        currentFaceVal = baseFaceVal;
        updateGuess();
        // reset turns
        currentTurn = 1;
        // display all players as on standby
        allWaiting();
        // give new starting dice
        roundStart();
        // show whose turn it is, set current player to winner;
        updateInnerHTML(playerTurnDisplay, currentPlayerName);
        // allow player to act
        playerAction();
    }
}

// other players evaluate if their callout is valid (can't call out themselves, extra parameters within their dedicated callout function)
function opponentCallouts()
{
    // finite state machines evaluate if they should call someone out or not
    if(currentPlayer != 1)
    {
        brainiacCallout();
    }
    if(currentPlayer != 2)
    {
        cowardCallout();
    }
    if(currentPlayer != 3)
    {
        riskTakerCallout();
    }
    // advance turn
    advanceTurn();
}

// brainiac code
function brainiacGuess()
{
    // place array in order
    diceArrayBrainiac.sort();
    // guess 1-3 more than the smallest value in hand
    let varience = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    // if this player is starting (as shown by the starting variables being 0), guess (least frequent die) thrice
    if(currentDiceNum == baseDiceNum && currentFaceVal == baseFaceVal)
    {
        // get smallest value in array
        let smallestValue = diceArrayBrainiac[0];
        // get amount of smallest value
        let smallestValueAmount = amountOfValue(diceArrayBrainiac, smallestValue);
        // update values
        currentDiceNum = smallestValueAmount + varience;
        currentFaceVal = smallestValue;
    }
    else
    {
        // check if current face value is in array
        if(diceArrayBrainiac.includes(currentFaceVal))
        {
            // get amount of the value
            let frequency = amountOfValue(diceArrayBrainiac, currentFaceVal);
            // increase the value by how many they see and a random number; add current number to keep it valid.
            currentDiceNum = currentDiceNum + frequency;
        }
        else
        {
            // increase the face value if possible
            if(currentFaceVal < maxFaceVal)
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
    displayGuess(actionBrainiac, playerTurn[1]);
    hideButtons();
    enableButton(calloutBrainiacButton);
    enableButton(passBrainiacButton);
    updateGuess();
}

function brainiacCallout()
{
    // if more than 8 die is claimed
    if(currentDiceNum >= 7)
    {
        // ensure name is correct
        currentPlayerName = playerTurn[currentPlayer].toString();
        // call out next player
        alert("Brainiac called out " + currentPlayerName + "!");
        callout(playerTurn[1]);
    }
}

// coward code
function cowardGuess()
{
    // if this player is starting (as shown by the starting variables being 0), guess 1,1
    if(currentDiceNum == baseDiceNum && currentFaceVal == baseFaceVal)
    {
        // this players' base guess
        currentDiceNum = 1;
        currentFaceVal = 1;
    }
    else
    {
        // otherwise, add 1 to either value, randomly (as long as it would still be valid)
        if(currentFaceVal < maxFaceVal)
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
            // add 1 to current diceNum
            currentDiceNum++;
        }
    }
    displayGuess(actionCoward, playerTurn[2]);
    hideButtons();
    enableButton(calloutCowardButton);
    enableButton(passCowardButton);
    updateGuess();
}

function cowardCallout()
{
    // if more than 5 turns have passed and it is NOT their turn
    if(currentTurn > 5)
    {
        // update currentPlayerName
        currentPlayerName = playerTurn[currentPlayer].toString();
        // callout current player
        alert("Coward called out " + currentPlayerName + "!");
        callout(playerTurn[2]);
    }
}

// risk taker code
function riskTakerGuess()
{
    // if this player is starting (as shown by the starting variables being 0), guess 3,4
    if(currentDiceNum == baseDiceNum && currentFaceVal == baseFaceVal)
    {
        // this players' base guess
        currentDiceNum = 3;
        currentFaceVal = 4;
    }
    else
    {
        // otherwise, raise face by 2 until max, then dice number by 2 until round ends
        if(currentFaceVal < maxFaceVal)
        {
            currentFaceVal += 2;
            if(currentFaceVal > maxFaceVal)
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
    displayGuess(actionRiskTaker, playerTurn[3]);
    hideButtons();
    enableButton(calloutRiskTakerButton);
    enableButton(passRiskTakerButton);
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
            // update currentPlayerName
            currentPlayerName = playerTurn[currentPlayer].toString();
            // callout current player
            alert("Risk Taker called out " + currentPlayerName + "!");
            callout(playerTurn[3]);
        }
    }
}

// user guess is passed and displayed
function userGuess()
{
    // get inputs
    if(parseInt(guessDiceNum.value) > currentDiceNum && parseInt(guessDiceNum.value) >= 1 || parseInt(guessFaceVal.value) > currentFaceVal && parseInt(guessFaceVal.value) >= 1)
    {
        // update values and display the new guess, <<ensure>> this is an int
        currentDiceNum = parseInt(guessDiceNum.value);
        currentFaceVal = parseInt(guessFaceVal.value);
        // display new info
        displayGuess(actionUser, playerTurn[0]);
        updateGuess();
        hideButtons();
        opponentCallouts();
    }
    else
    {
        // prompt the user to enter a valid option
        alert("You must increase the amount or the face value of dice guesssed!");
    }
}

// allow the user to call out the current player
function userCallout()
{
    // get id of button (the only button on <<hopefully>> as hideButton is called so, so often)
    if(calloutBrainiacButton.style.visibility = 'visible')
    {
        currentPlayerName = playerTurn[1].toString();
    }
    if(calloutCowardButton.style.visibility = 'visible')
    {
        currentPlayerName = playerTurn[2].toString();
    }
    if(calloutRiskTakerButton.style.visibility = 'visible')
    {
       currentPlayerName = playerTurn[3].toString(); 
    }
    // call out next player
    alert("User called out " + currentPlayerName + "!");
    callout(playerTurn[0]);
}

function startGame()
{
    // reset data
    resetData();
    // hide all buttons
    hideButtons();
    // display all players as on standby
    allWaiting();
    // give starting dice
    roundStart();
    // show current guess
    updateGuess();
    // display turn and player
    console.log("Turn " + currentTurn + "\n" + currentPlayerName);
    // allow player to act
    playerAction();
}

// start the game
startGame();