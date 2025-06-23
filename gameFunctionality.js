// get input from all fields
function confirm()
{
    //access input fields
    let username = document.getElementById("nameInput").value;
    let health = document.getElementById("hpInput").value;
    let attack = document.getElementById("atkInput").value;
    let ability = document.getElementById("abilityInput").value;

    //verify
    if(username.trim() === ""||ability.trim() === "")
    {
        alert("Please fill all entries.");
        return;
    }
    if(parseInt(health) <= 0 || parseInt(attack) <= 0|| isNaN(parseInt(health)) || isNaN(parseInt(attack)))
    {
        alert("Please enter valid numbers for health and attack.");
        return;
    }
    //log input
    console.log("Username: " + username + "Health: " + health + "Attack: " + attack + "Ability: " + ability);

    //display
    let stats = document.getElementById("stats");
    stats.innerHTML = 'Name: ' + username + '<br>'+'Health: ' + health + '<br>' +'Attack: ' + attack + '<br>' + 'Ability: ' + ability+'<br>' + 'Stat Total: ' + (parseInt(health) + parseInt(attack)) + '<br>';
}