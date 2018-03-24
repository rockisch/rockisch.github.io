'use strict'

const canvas = document.getElementById("myCanvas");
canvas.style.backgroundColor = "grey";
const ctx = canvas.getContext("2d");

const canvasUl = document.getElementById("projectUl")
const canvasUlStyle = window.getComputedStyle(canvasUl, null);
var canvasUlPadding = canvasUlStyle.getPropertyValue('padding-left');
canvasUlPadding = canvasUlPadding.slice(0, -2);

var width = canvas.offsetWidth;
var height = canvas.offsetHeight;

const angle = Math.PI / 2;
var canvasSizeMult = width / 1160

var len;
var angleChange;
var newLenMult;
var lenLimit;
var lineMaxWidth;
var lineWidthPerLayer;

function setup() {
	len = 130 * canvasSizeMult;
	angleChange = Math.PI / 4;
	newLenMult = .77;
	lenLimit = 10 / canvasSizeMult;
	lineMaxWidth = 30 * canvasSizeMult;
	lineWidthPerLayer = 3.12 * (canvasSizeMult);
}

setup();

window.onresize = () => {
	width = canvas.width=canvasUl.offsetWidth - canvasUlPadding * 2;
	height = canvas.height= 970 * canvasSizeMult;
	canvasSizeMult = width / 1160
	setup();
	ctx.clearRect(0, 0, width, height);
	startBranching(width / 2, height, len, angle, 0);
}

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
	ctx.moveTo(width / 2, height);
	branchCaller(xMoveTo, yMoveTo, len, angle, lineCounter)
}

startBranching(width / 2, height, len, angle, 0);


// Sliders Code
const angleChangeSlider = document.getElementById("angleChange");
const output = document.getElementById("angleChangeOutput");
output.innerHTML = "Angle: 45.0";

angleChangeSlider.oninput = function() {
	angleChange = Math.PI / (this.value / 4);
	output.innerHTML = "Angle: " + (180 / (this.value / 4)).toFixed(1);
	ctx.clearRect(0, 0, width, height);
	startBranching(width / 2, height, len, angle, 0);
}

const lenSlider = document.getElementById("len");
const lenSliderOutput = document.getElementById("lenOutput");
lenSliderOutput.innerHTML = "Lenght: 150.0";

lenSlider.oninput = function() {
	len = this.value * canvasSizeMult;
	lenSliderOutput.innerHTML = "Lenght: " + len.toFixed(1);
	ctx.clearRect(0, 0, width, height);
	startBranching(width / 2, height, len, angle, 0);
}