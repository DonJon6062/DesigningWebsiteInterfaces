let crossWords = new Array("amber", "cafe", "dandelion", "olo", "orange", "navy", "rust", "turquoise");

function makeCrossword(rows, cols)
{
    // make a table
    let table = document.getElementById("crosswordTable");
    for (let i = 0; i < rows; i++)
    {
        // make tr equal to passed rows
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++)
        {
            // make td equal to passed cols
            let td = document.createElement("td");
            tr.appendChild(td);
        }
        //add row to table
        table.appendChild(tr);
    }
}

function placeWords(startRow, startCol, wordIndex, direction, table, showAnswer, clueNum)
{
    // get word
    let word = crossWords[wordIndex];
    // place word
    for(let i = 0; i < word.length; i++)
    {
        let rowIndex = 0;
        let colIndex = 0;
        // stay in row for word
        if(direction == "across")
        {
            rowIndex = startRow;
            colIndex = startCol + i;
        }
        // stay in col for word
        else
        {
            rowIndex = startRow + i;
            colIndex = startCol;
        }
        // make shortcut to words' area
        let tr = table.rows[rowIndex];
        let td = tr.cells[colIndex];
        // place number that correlates to word 
        if(i == 0)
        {
            let number = document.createElement("span");
            number.textContent = clueNum;
            number.className = "clueNum";
            td.appendChild(number);
        }
        if(!td.querySelector("input"))
        {
            let input = document.createElement("input");
            // specify it's for text
            input.setAttribute("type", "text");
            // set valid input length to 1
            input.setAttribute("maxlength", "1");
            if(showAnswer)
            {
                input.value = word[i].toUpperCase();
            }
            td.appendChild(input);
        }
    }
}

function revealAmber()
{
    // place the word turquoise at the end of the text
    document.getElementById("amber").innerHTML += " Amber";
}
function revealCafe()
{
    // place the word turquoise at the end of the text
    document.getElementById("cafe").innerHTML += " Cafe";
}
function revealDandelion()
{
    // place the word turquoise at the end of the text
    document.getElementById("dandelion").innerHTML += " Dandelion";
}
function revealOlo()
{
    // place the word turquoise at the end of the text
    document.getElementById("olo").innerHTML += " Olo";
}
function revealOrange()
{
    // place the word turquoise at the end of the text
    document.getElementById("orange").innerHTML += " Orange";
}
function revealNavy()
{
    // place the word turquoise at the end of the text
    document.getElementById("navy").innerHTML += " Navy";
}
function revealRust()
{
    // place the word turquoise at the end of the text
    document.getElementById("rust").innerHTML += " Rust";
}
function revealTurquoise()
{
    // place the word turquoise at the end of the text
    document.getElementById("turquoise").innerHTML += " Turquoise";
}

makeCrossword(12, 12);

let table = document.getElementById("crosswordTable");
// dandelion
placeWords(0, 9, 2, "down", table, false, 4);
// orange
placeWords(3, 3, 4, "down", table, false, 1);
// olo
placeWords(2, 6, 3, "down", table, false, 3);
// rust
placeWords(8, 4, 6, "down", table, false, 2);
// turqouise
placeWords(4, 1, 7, "across", table, false, 2);
// amber
placeWords(8, 0, 0, "across", table, false, 4);
// navy
placeWords(6, 3, 5, "across", table, false, 3);
// cafe
placeWords(1, 8, 1, "across", table, false, 1);