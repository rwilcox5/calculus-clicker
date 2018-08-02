var canvas;
var ctx;

var canvasOffset;
var offsetX;
var offsetY;

var isDrawing = false;
var actArea = 1.;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

function isFront(xy){
	if (xy[0]>currentBox[0][0] && xy[0]<currentBox[0][0]+currentBox[1][0] && xy[1]>currentBox[0][1] && xy[1]<currentBox[0][1]+currentBox[1][1]){
		return true;
	}
	else{
		return false;
	}
}

function isSide(xy){
	if (xy[0]>currentBox[0][0]+currentBox[1][0] && xy[0]<currentBox[0][0]+currentBox[1][0]+currentBox[2][0] && xy[1]<currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]+currentBox[1][1] && xy[1]>currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]){
		return true;
	}
	else{
		return false;
	}
}

function isTop(xy){
	if (xy[1]<currentBox[0][1] && xy[1]>currentBox[0][1]+currentBox[2][1] && xy[1]>currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0])+currentBox[0][1] && xy[1]<currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]){
		return true;
	}
	else{
		return false;
	}
}

function drawBox(pointsRaw){

	ctx.setLineDash([1, 0]);
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	points5 = [pointsRaw[0],[pointsRaw[0][0]+pointsRaw[1][0],pointsRaw[0][1]],[pointsRaw[0][0]+pointsRaw[1][0],pointsRaw[0][1]+pointsRaw[1][1]],[pointsRaw[0][0],pointsRaw[0][1]+pointsRaw[1][1]],pointsRaw[2]];
	boxDimensions = [Math.round(points5[2][0]-points5[3][0],0),Math.round(Math.pow(pointsRaw[2][0]*pointsRaw[2][0]+pointsRaw[2][1]*pointsRaw[2][1],.5),0),Math.round(points5[2][1]-points5[1][1],0)];



	ctx.beginPath();
	ctx.moveTo(points5[0][0],points5[0][1]);
	ctx.lineTo(points5[1][0],points5[1][1]);
	ctx.lineTo(points5[2][0],points5[2][1]);
	ctx.lineTo(points5[3][0],points5[3][1]);
	ctx.lineTo(points5[0][0],points5[0][1]);
	ctx.stroke();
	ctx.font="italic 12pt Calibri";
	ctx.fillText("l="+(points5[2][0]-points5[3][0]).toFixed(0),(points5[2][0]+points5[3][0])/2-5,points5[2][1]+16);

	ctx.beginPath();
	ctx.moveTo(points5[0][0],points5[0][1]);
	ctx.lineTo(points5[0][0]+points5[4][0],points5[0][1]+points5[4][1]);
	ctx.lineTo(points5[1][0]+points5[4][0],points5[1][1]+points5[4][1]);
	ctx.moveTo(points5[1][0],points5[1][1]);
	ctx.lineTo(points5[1][0]+points5[4][0],points5[1][1]+points5[4][1]);
	ctx.lineTo(points5[2][0]+points5[4][0],points5[2][1]+points5[4][1]);
	ctx.lineTo(points5[2][0],points5[2][1]);
	ctx.stroke();
	ctx.fillText("w="+Math.pow(pointsRaw[2][0]*pointsRaw[2][0]+pointsRaw[2][1]*pointsRaw[2][1],.5).toFixed(0),(points5[1][0]+points5[1][0]+points5[4][0])/2-5,(points5[2][1]+points5[2][1]+pointsRaw[2][1])/2+16);

	ctx.beginPath();
	ctx.moveTo(points5[0][0]+points5[4][0],points5[0][1]+points5[4][1]);
	ctx.lineTo(points5[3][0]+points5[4][0],points5[3][1]+points5[4][1]);
	ctx.lineTo(points5[2][0]+points5[4][0],points5[2][1]+points5[4][1]);
	ctx.moveTo(points5[3][0]+points5[4][0],points5[3][1]+points5[4][1]);
	ctx.lineTo(points5[3][0],points5[3][1]);
	ctx.setLineDash([4, 2]);
	ctx.strokeStyle = 'rgba(0,0,0,.25)';
	ctx.stroke();
	ctx.fillText("h="+(points5[2][1]-points5[1][1]).toFixed(0),points5[1][0]+points5[4][0]+5,(points5[1][1]+pointsRaw[2][1]+points5[2][1]+pointsRaw[2][1])/2);

	ctx.fillText("v="+(boxDimensions[0]*boxDimensions[1]*boxDimensions[2]).toString(),0,16);
	ctx.fillText("c="+(boxDimensions[0]*boxDimensions[1]*boxDimensions[2]).toString(),0,32);

}

currentBox = [[50,100],[50,50],[25,-25]];
drawBox(currentBox);
offsetX = document.getElementById("canvas").offsetLeft;
offsetY = document.getElementById("canvas").offsetTop;

canvas.onmousedown = function (e) {
    handleMouseDown(e.clientX,e.clientY);
}
canvas.onmouseup = function(e) {
    handleMouseUp();
}
canvas.onmousemove = function(e) {
    handleMouseMove(e.clientX,e.clientY);
}
canvas.addEventListener("touchstart", touchDown, false);
canvas.addEventListener("touchmove", touchMove, true);
canvas.addEventListener("touchend", touchUp, false);


var startX;
var startY;
var stretch = '';
var startBox1;
var startBox2;
var startBox3;
var startBox4;
var startBox5;
var startBox6;


function handleMouseUp() {
	isDrawing = false;
	canvas.style.cursor = "default";
	

}
function ltow(length){
	lwConstraint = .7;
	return length*lwConstraint/Math.pow(2,.5);
}
function ltoh(length){
	volume = 87500;
	oldLength = startBox3;
	trueHeight = volume/(oldLength+length)/ltow(oldLength+length)/Math.pow(2,.5);
	oldHeight = startBox4;
	diffHeight = trueHeight-oldHeight;
	console.log(trueHeight,oldHeight);
	return -1*diffHeight;
}

function handleMouseMove(eX,eY) {
	if (isDrawing) {
		var mouseX = parseInt(eX - offsetX);
		var mouseY = parseInt(eY - offsetY);	
		if (stretch=='front'){  //Changes width of box
			maxDiff = Math.max(startX-mouseX,mouseY-startY);
			currentBox[0][0]= startBox1-maxDiff;
			currentBox[0][1]= startBox2+maxDiff;
			currentBox[2][0]= startBox5+maxDiff;
			currentBox[2][1]= startBox6-maxDiff;
		}
		if (stretch=='side'){ //Changes length of box
			maxDiff = mouseX-startX;
			currentBox[1][0]= startBox3+maxDiff;

			lwDiff = ltow(maxDiff);
			currentBox[0][0]= startBox1-lwDiff;
			currentBox[0][1]= startBox2+lwDiff;
			currentBox[2][0]= startBox5+lwDiff;
			currentBox[2][1]= startBox6-lwDiff;

			lhDiff = ltoh(maxDiff);
			currentBox[0][1]= startBox2+lhDiff;
			currentBox[1][1]= startBox4-lhDiff;
		}
		if (stretch=='top'){ //Changes height of box
			maxDiff = mouseY-startY;
			currentBox[0][1]= startBox2+maxDiff;
			currentBox[1][1]= startBox4-maxDiff;
		}
					
	drawBox(currentBox);			
	}
}

function handleMouseDown(eX,eY) {
	canvas.style.cursor = "crosshair";		
	
	startX = parseInt(eX - offsetX);
	startY = parseInt(eY - offsetY);

	if (isFront([startX,startY])){
		stretch = 'front';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
	if (isSide([startX,startY])){
		stretch = 'side';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
	if (isTop([startX,startY])){
		stretch = 'top';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
}

function touchDown(e) {
    if (!e)
        var e = event;
    e.preventDefault();
    handleMouseDown(e.targetTouches[0].pageX,e.targetTouches[0].pageY)
}
function touchMove(e){
	if (!e)
        var e = event;
    e.preventDefault();
    handleMouseMove(e.targetTouches[0].pageX,e.targetTouches[0].pageY)
}
function touchUp(){
	isDrawing = false;
	canvas.style.cursor = "default";
}