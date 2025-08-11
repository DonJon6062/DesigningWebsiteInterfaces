checkerboardPieces = [
    [null, 'w', null, 'w', null, 'w', null, 'w'], 
    ['w', null, 'w', null, 'w', null, 'w', null],
    [null, 'w', null, 'w', null, 'w', null, 'w'], 
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 'b', null, 'b', null, 'b', null, 'b'],
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, 'b', null, 'b', null, 'b', null, 'b']
]

function makeCheckerboard()
{
    // access element where checkerboard goes
    let checkerboard = document.getElementById("checkerboard");
    // make checkerboard; for the 8 rows
    for(let i=0; i<8; i++)
    {
        // for the 8 cols
        for(let j=0;j<8;j++)
        {
            // make squares
            let checkerSquare = document.createElement('div');
            // style squares by assigning class to divs
            checkerSquare.className = 'checkerSquare';
            // check if square is even or odd to see if the color should change
            // if the number is divisible by 0, it's even; 0 is for no remainder
            if((i+j) % 2 == 0)
            {
                checkerSquare.style.backgroundColor = "white";
            }
            // add squares to board
            checkerboard.appendChild(checkerSquare);

            if(checkerboardPieces[i][j])
            {
                // input piece num, css class and square
                createPiece("piece" + i + j, "checkerPiece-" + checkerboardPieces[i][j], checkerSquare);
            }
        }
    }
}

function createPiece(id, pieceClass, pieceSquare)
{
    // create div
    var newPiece = document.createElement('div');
    newPiece.setAttribute("id", id);
    // assign base class to piece
    newPiece.classList.add("checkerPiece");
    // use value passed to make piece of correct color
    newPiece.classList.add(pieceClass);
    // verify class is being assigned
    console.log(pieceClass);
    // place piece on square
    pieceSquare.appendChild(newPiece);
}

makeCheckerboard();