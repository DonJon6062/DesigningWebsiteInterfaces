document.getElementById("jsLink").textContent = "This is the basic screen. My name is Don Jones. My school email is donjones/@uat.edu. I will be graduating May 2026. This is Javascript, however!";

//make array for images
let arrImages = ["./Images/casualSona.png", "./Images.dogEatingBetter.gif", "./Images.Dummy.png", "./Images.Sona.png"];

// firt index is 0
let currentSlide = 0;

// display selected image
function displayImage(imgLocation) {
    // shortcut to access html ing element
    let img = document.getElementById("imgSlide");
    // get from array correct index
    img.src = arrImages[imgLocation];
}