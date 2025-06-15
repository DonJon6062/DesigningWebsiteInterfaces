//array to hold entries
let entries = [];

//add movies
function addMovie() 
{
    //assign input to variable
    let input = document.getElementById("movieInput").value;
    //verify input
    console.log("Movie added: " + input);
    //prevent empty entries
    if (input.trim() === "") 
    {
        alert("Please Enter a Movie Name.");
        return;
    }
    else
    {
        //add input to array
        entries.push(input);
        //clear movieInput
        document.getElementById("movieInput").value = "";
        //display updated list
        displayMovies();
    }
}

//sort and display movies
function displayMovies() 
{
    //get the list element
    let list = document.getElementById("movieList");
    //sort entries
    entries.sort();
    //clear previous entries
    list.innerHTML = entries.join("<br>");
}

//clear entries
function clearMovies()
{
    //empty array
    entries = [];
    //erase display
    displayMovies();
}