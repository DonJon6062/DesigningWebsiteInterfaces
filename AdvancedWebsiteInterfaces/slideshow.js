//make array for images
let arrImages = ["./Images/wikimediaAngleCube.png", "./Images/wikimediaEndlessCube.png", "./Images/wikimediaPenroseTriangle.png", "./Images/wikimediaDistance.jpg"];
// first index is 0
let currentSlide = 0;

// display selected image
function displayImage(imgLocation) {
    // shortcut to access html ing element
    let img = document.getElementById("imgSlide");
    // get from array correct index
    img.src = arrImages[imgLocation];
}

// function to go to next image
function nextSlide() {
    // increase index
    currentSlide++;
    // if index is greater than array length, reset to 0
    if (currentSlide >= arrImages.length) {
        currentSlide = 0;
    }
    // display image
    displayImage(currentSlide);
}
            
 // function to go to previous image
function prevSlide() {
    // decrease index
    currentSlide--;
    // if index is less than 0, reset to last index
    if (currentSlide < 0) {
        currentSlide = arrImages.length - 1;
    }
    // display image
    displayImage(currentSlide);
}

// Initial display of the first image
displayImage(currentSlide); 