//shortcut to scorecard
let spnScore = document.getElementById("spanScore");
// make global updates to all elements of .hole class
let divHoles = document.querySelectorAll("hole");
// keep track of score
let score = 0;
// keep track of last hole clicked
let lastHoleClicked;
// keep track of the time
let timeOut = false;

// start game
function startGame()
{
    // reset score
    score = 0;
    // show updated value
    spnScore.textContent = score;
    // reset time up to false so the user has time to play
    timeOut = false;
    // release the moles
    popUp();
    // set game length
    setTimeout(function()
        //stop game 
        {
            timeOut = true;
        }, // each round lasts 10 seconds
        10000);
}

// generate random intervals for the 'moles' to pop up
function randomizeTime(min, max)
{
    // return a random amount of time based on the min and max; add min at the end to ensure the number is in range
    return Math.floor((Math.random()*(max-min))+min);
}

// pick a random hole
function randomHoleSelect(holes)
{
    // generate a random number
    let randomNumber = Math.floor(Math.random()*holes.length);
    // shortcut to selected hole
    let selectedHole = holes[randomNumber];
    // prevent same hole from going twice
    if(selectedHole == lastHoleClicked)
    {
        return randomHoleSelect(holes);
    }
    // track latest hole
    lastHoleClicked = selectedHole;
    // select hole
    return selectedHole;
}

// make mole appear
function popUp()
{
    // min and max time
    let time = randomizeTime(400, 1000);
    // get hole
    let hole = randomHoleSelect(divHoles);
    // add mole
    hole.classList.add("mole");
    // make mole dissapear after awhile
    setTimeOut(function()
    {
        hole.classList.remove("mole");
        // if the time is not up, reveal another mole
        if(!timeUp)
        {
            popUp();
        };
    }, 
    time);
}