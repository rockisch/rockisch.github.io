var canvas = document.getElementById("myCanvas");
var width = canvas.offsetWidth;
var heigth = canvas.offsetHeight;
canvas.style.backgroundColor = "grey";

var ctx = canvas.getContext("2d");

var len = 150;
var angle = Math.PI / 2;
var angleChange = Math.PI / 4;
var newLenMult = 0.75
var lenLimit = 10;
var lineMaxWidth = 30;
var lineWidthPerLayer = 3;
var lineCounter = 0;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	output.innerHTML = this.value / 4;
	angleChange = Math.PI / (this.value / 4);
	ctx.clearRect(0, 0, width, heigth)
	branchCaller(width / 2, heigth, len, angle, 0)
}

var slider2 = document.getElementById("len");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
	output2.innerHTML = this.value / 4;
	len = this.value;
	ctx.clearRect(0, 0, width, heigth)
	branchCaller(width / 2, heigth, len, angle, 0)
}

function branchCaller(xMoveTo, yMoveTo, len, angle, lineCounter) {
	newLineCounter = lineCounter + 1;
	ctx.lineWidth = lineMaxWidth - (newLineCounter * lineWidthPerLayer);
	ctx.moveTo(xMoveTo, yMoveTo);
	xLineTo = xMoveTo + (Math.cos(angle) * len);
	yLineTo = yMoveTo - (Math.sin(angle) * len);
	ctx.lineTo(xLineTo, yLineTo);
	ctx.stroke();
	
	newLen = len * newLenMult;
	newAngle = angle + angleChange;

	if (len > lenLimit) {
		branchCaller(xLineTo, yLineTo, newLen, newAngle, newLineCounter)
	}
	
	newLineCounter = lineCounter + 1;
	ctx.lineWidth = lineMaxWidth - (newLineCounter * lineWidthPerLayer);
	ctx.beginPath(xMoveTo, yMoveTo);
	xLineTo = xMoveTo + (Math.cos(angle) * len);
	yLineTo = yMoveTo - (Math.sin(angle) * len);
	ctx.lineTo(xLineTo, yLineTo);
	ctx.stroke();

	newLen = len * newLenMult;
	newAngle = angle - angleChange;

	if (len > lenLimit) {
		branchCaller(xLineTo, yLineTo, newLen, newAngle, newLineCounter)
	}
}

branchCaller(width / 2, heigth, len, angle, 0)
