'use strict';

const canvas = document.getElementById("myCanvas");
var width = canvas.offsetWidth;
var heigth = canvas.offsetHeight;
canvas.style.backgroundColor = "grey";
const ctx = canvas.getContext("2d");

const angle = Math.PI / 2;

var len = 150;
var angleChange = Math.PI / 4;
var newLenMult = 0.75;
var lenLimit = 10;
var lineMaxWidth = 30;
var lineWidthPerLayer = 3;

// Actual drawing code. Will move to the place the last line was drawn, and then will drawn a line with the specified angle
function branch(xMoveTo, yMoveTo, len, angle, lineCounter, angleBool) {
	var newLineCounter = lineCounter + 1;
	ctx.lineWidth = lineMaxWidth - (newLineCounter * lineWidthPerLayer);
	var xLineTo = xMoveTo + (Math.cos(angle) * len);
	var yLineTo = yMoveTo - (Math.sin(angle) * len);
	ctx.lineTo(xLineTo, yLineTo);
	ctx.stroke();
	
	len = len * newLenMult;
	angle = angle + angleChange * angleBool;

	if (len > lenLimit) {
		branchCaller(xLineTo, yLineTo, len, angle, newLineCounter);
	}
}

// Will call the branch code 2 times with different mirrored angles to do the binary tree
function branchCaller(xMoveTo, yMoveTo, len, angle, lineCounter) {
	branch(xMoveTo, yMoveTo, len, angle, lineCounter, 1);
	branch(xMoveTo, yMoveTo, len, angle, lineCounter, -1);
	ctx.beginPath(xMoveTo, yMoveTo);
}

// Moving to the start point and starting branching proccess
// I created a separated function for this so that I don't need to call moveTo in every branch interaction
function startBranching(xMoveTo, yMoveTo, len, angle, lineCounter) {
	ctx.moveTo(width / 2, heigth);
	branchCaller(xMoveTo, yMoveTo, len, angle, lineCounter)
}

startBranching(width / 2, heigth, len, angle, 0);


// Sliders Code
const angleChangeSlider = document.getElementById("angleChange");
const output = document.getElementById("angleChangeOutput");
output.innerHTML = "Angle: 45.0";

angleChangeSlider.oninput = function() {
	angleChange = Math.PI / (this.value / 4);
	output.innerHTML = "Angle: " + (180 / (this.value / 4)).toFixed(1);
	ctx.clearRect(0, 0, width, heigth);
	startBranching(width / 2, heigth, len, angle, 0);
}

const lenSlider = document.getElementById("len");
const lenSliderOutput = document.getElementById("lenOutput");
lenSliderOutput.innerHTML = "Lenght: 150";

lenSlider.oninput = function() {
	len = this.value;
	lenSliderOutput.innerHTML = "Lenght: " + len;
	ctx.clearRect(0, 0, width, heigth);
	startBranching(width / 2, heigth, len, angle, 0);
}