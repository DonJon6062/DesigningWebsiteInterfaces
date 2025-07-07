function makeChessboard()
{
    // access element where chessboard goes
    let chessboard = document.getElementById("chessboard");
    // make chessboard; for the 8 rows
    for(let i=0; i<8; i++)
    {
        // for the 8 cols
        for(let j=0;j<8;j++)
        {
            // make squares
            let chessSquare = document.createElement('div');
            // style squares by assigning class to divs
            chessSquare.className = 'chessSquare';
            // check if square is even or odd to see if the color should change
            // if the number is divisible by 0, it's even; 0 is for no remainder
            if((i+j) % 2 == 0)
            {
                chessSquare.style.backgroundColor = "white";
            }
            // add squares to board
            chessboard.appendChild(chessSquare);
        }
    }
}

makeChessboard();