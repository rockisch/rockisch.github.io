const canvas = document.getElementById("testCanvas");
canvas.style.backgroundColor = "white";
const ctx = canvas.getContext("2d");

var image = new Image(500, 500);   // using optional size for image

// load an image of intrinsic size 300x227 in CSS pixels
image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
image.onload = () => {
    ctx.drawImage(image, 50, 50);
}