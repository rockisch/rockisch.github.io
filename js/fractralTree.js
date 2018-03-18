var canvas = document.getElementById("myCanvas");
var width = canvas.offsetWidth;
var heigth = canvas.offsetHeight;
canvas.style.backgroundColor = "grey";

var ctx = canvas.getContext("2d");

var len = 130;
var angle = Math.PI / 2;
var angleChange = Math.PI / 6;
var newLenMult = 0.75
var lenLimit = 20;
var lineMaxWidth = 30;
var lineWidthPerLayer = 3;
var lineCounter = 0;

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
	console.log(`${newLineCounter}: Width: ${ctx.lineWidth}`);
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
	
	console.log(`${lineCounter}: Width: ${ctx.lineWidth}`);
	if (len > lenLimit) {
		branchCaller(xLineTo, yLineTo, newLen, newAngle, newLineCounter)
	}
}



branchCaller(width / 2, heigth, len, angle, 0)
