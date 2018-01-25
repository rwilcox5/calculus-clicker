var canvas;
var ctx;

var canvasOffset;
var offsetX;
var offsetY;

var isDrawing = false;
var actArea = 1.;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");


function myf(rawX){
	var x = windowGraph[0]+rawX/canvas.width*(windowGraph[2]-windowGraph[0]);
	var y = eval(xfn);
	return (y-windowGraph[1])/(windowGraph[3]-windowGraph[1])*canvas.height;
}

function myRawf(rawX){
	var x = rawX;
	return eval(xfn);
}

function ycoord(rawY){
		return (rawY-windowGraph[1])/(windowGraph[3]-windowGraph[1])*canvas.height;
}
function xcoord(rawX){
	return (rawX-windowGraph[0])/(windowGraph[2]-windowGraph[0])*canvas.width;
}

function drawCurve(ctx,myrect){
	ctx.beginPath();
	ctx.moveTo(0,canvas.height-myf(0));
	actArea = 0;
	for (var i=0;i<canvas.width+1;i++){
		ctx.lineTo(i,canvas.height-myf(i));
		actArea+=myf(i);
		if (canvas.height-myf(i)<Math.min(myrect[1],myrect[1]+myrect[3]) && Math.min(myrect[0],myrect[0]+myrect[2])<i && Math.max(myrect[0],myrect[0]+myrect[2])>i){
			ctx.lineTo(i,Math.min(myrect[1],myrect[1]+myrect[3]));
			ctx.lineTo(i,canvas.height-myf(i));
		}
		if (canvas.height-myf(i)>Math.max(myrect[1],myrect[1]+myrect[3]) && Math.min(myrect[0],myrect[0]+myrect[2])<i && Math.max(myrect[0],myrect[0]+myrect[2])>i){
			ctx.lineTo(i,Math.max(myrect[1],myrect[1]+myrect[3]));
			ctx.lineTo(i,canvas.height-myf(i));
		}
	}
	ctx.stroke();
	ctx.beginPath();

	ctx.arc(xcoord(x0),canvas.height-myf(xcoord(x0)),4,0,2*Math.PI);
	ctx.fill();

}

function updateED(){
	deltaFlex = parseFloat(document.getElementById('delta').value);
	var d = deltaFlex;
	epsilonFlex = eval(document.getElementById('epsilon').value);
	totalEpsilon += epsilonFlex;
	windowGraph = [x0-deltaFlex*3,myRawf(x0)-deltaFlex*3,x0+deltaFlex*3,myRawf(x0)+deltaFlex*3]
	console.log(windowGraph);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(xcoord(x0-deltaFlex),ycoord(myRawf(x0)-epsilonFlex),xcoord(x0+deltaFlex)-xcoord(x0-deltaFlex),ycoord(myRawf(x0)+epsilonFlex)-ycoord(myRawf(x0)-epsilonFlex));
	ctx.stroke();

	drawCurve(ctx,[xcoord(x0-deltaFlex),ycoord(myRawf(x0)-epsilonFlex),xcoord(x0+deltaFlex)-xcoord(x0-deltaFlex),ycoord(myRawf(x0)+epsilonFlex)-ycoord(myRawf(x0)-epsilonFlex)])
	currentRect = [xcoord(x0-deltaFlex),ycoord(myRawf(x0)-epsilonFlex),xcoord(x0+deltaFlex)-xcoord(x0-deltaFlex),ycoord(myRawf(x0)+epsilonFlex)-ycoord(myRawf(x0)-epsilonFlex)];
	if (deltaFlex <.002){
		clearTimeout(intervalDelta);

	}
}
var runDelta = 0;
var intervalDelta;
var totalEpsilon = 0;
function startInterval(){
	totalEpsilon = 0;
	intervalDelta = setInterval(function(){
		document.getElementById('totalEpsilon').innerHTML = totalEpsilon.toFixed(3);
		deltaFlex =1*Math.pow(.994,runDelta);
		document.getElementById('delta').value = deltaFlex.toFixed(3);
		updateED();
		runDelta++;
	}, 25);
}

offsetX = document.getElementById("canvas").offsetLeft;
offsetY = document.getElementById("canvas").offsetTop;

canvas.onmousedown = function (e) {
    handleMouseDown(e);
}
canvas.onmouseup = function(e) {
    handleMouseUp();
}
canvas.onmousemove = function(e) {
    handleMouseMove(e);
}


var startX;
var startY;
var currentRect = [0,0,0,0];
var typeStretch = 'new';

drawCurve(ctx,[0,0,canvas.width,canvas.height]);

function handleMouseUp() {
	isDrawing = false;
	canvas.style.cursor = "default";
	
}


function handleMouseMove(e) {
	if (isDrawing) {
		if (typeStretch =='new'){
			var mouseX = parseInt(e.clientX - offsetX);
			var mouseY = parseInt(e.clientY - offsetY);	

			if (epsilonFixed>0){
				mouseY = canvas.height-myf(xcoord(x0))+ycoord(epsilonFixed);
				startY = canvas.height-myf(xcoord(x0))-ycoord(epsilonFixed);
			}
			if (deltaFixed>0){
				mouseX = xcoord(x0+deltaFixed);
				startX = xcoord(x0-deltaFixed);
			}
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(startX, startY, mouseX-startX, mouseY-startY);
			ctx.stroke();

			drawCurve(ctx,[startX, startY, mouseX-startX, mouseY-startY]);
			if (mouseX>startX){
				currentRect = [startX,startY, mouseX-startX, mouseY-startY];
			}
			else{
				currentRect = [mouseX,startY, startX-mouseX, mouseY-startY];
			}
			if (mouseY<startY){
				currentRect[1]=mouseY;
				currentRect[3]=startY-mouseY;
			}


		}
		else if (typeStretch =='down'){
			var mouseY = parseInt(e.clientY - offsetY);				

			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(currentRect[0], currentRect[1], currentRect[2], mouseY-currentRect[1]);
			ctx.stroke();

			drawCurve(ctx,[currentRect[0], currentRect[1], currentRect[2], mouseY-currentRect[1]]);
			currentRect[3]=mouseY-currentRect[1];
			if (mouseY<currentRect[1]){
				currentRect[3]=currentRect[1]-mouseY;
				currentRect[1]=mouseY;
			}
		}
		else if (typeStretch =='up'){
			var mouseY = parseInt(e.clientY - offsetY);				

			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(currentRect[0], mouseY, currentRect[2], currentRect[1]-mouseY+currentRect[3]);
			ctx.stroke();

			drawCurve(ctx,[currentRect[0], mouseY, currentRect[2], currentRect[1]-mouseY+currentRect[3]]);
			currentRect = [currentRect[0], mouseY, currentRect[2], currentRect[1]-mouseY+currentRect[3]];
			if (0>currentRect[3]){
				currentRect[1]=currentRect[1]+currentRect[3];
				currentRect[3]=-1*currentRect[3];
				
			}
		}
		else if (typeStretch =='right'){
			var mouseX = parseInt(e.clientX - offsetX);				

			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(currentRect[0], currentRect[1], mouseX-currentRect[0], currentRect[3]);
			ctx.stroke();

			drawCurve(ctx,[currentRect[0], currentRect[1], mouseX-currentRect[0], currentRect[3]]);
			currentRect[2]=mouseX-currentRect[0];
			if (mouseX<currentRect[0]){
				currentRect[2]=currentRect[0]-mouseX;
				currentRect[0]=mouseX;
			}
		}
		else if (typeStretch =='left'){
			var mouseX = parseInt(e.clientX - offsetX);				

			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.rect(mouseX, currentRect[1], currentRect[0]-mouseX+currentRect[2], currentRect[3] );
			ctx.stroke();

			drawCurve(ctx,[mouseX, currentRect[1], currentRect[0]-mouseX+currentRect[2], currentRect[3]]);
			currentRect = [mouseX, currentRect[1], currentRect[0]-mouseX+currentRect[2], currentRect[3]];
			if (0>currentRect[2]){
				currentRect[0]=currentRect[0]+currentRect[2];
				currentRect[2]=-1*currentRect[2];
				
			}
		}

		
	}
}

function handleMouseDown(e) {
	canvas.style.cursor = "crosshair";		
	
	mX = parseInt(e.clientX - offsetX);
	mY = parseInt(e.clientY - offsetY);
	if (mX>currentRect[0] && mX<currentRect[0]+currentRect[2] && mY>currentRect[1] && mY<currentRect[1]+currentRect[3]){
		slope1 = (currentRect[3])/(currentRect[2]);
		slope2 = -1*(currentRect[3])/(currentRect[2]);
		if (mY>slope1*(mX-currentRect[0])+currentRect[1] && mY>slope2*(mX-currentRect[0])+currentRect[1]+currentRect[3] ){
			typeStretch = 'down';
		}
		else if (mY>slope1*(mX-currentRect[0])+currentRect[1] && mY<slope2*(mX-currentRect[0])+currentRect[1]+currentRect[3] ){
			typeStretch = 'left';
		}
		else if (mY<slope1*(mX-currentRect[0])+currentRect[1] && mY<slope2*(mX-currentRect[0])+currentRect[1]+currentRect[3] ){
			typeStretch = 'up';
		}
		else{
			typeStretch = 'right';
		}
		if (epsilonFixed > 0){
			if (mX<currentRect[0]+currentRect[2]/2){
				typeStretch = 'left';
			}
			else{
				typeStretch = 'right';
			}
		}
		if (deltaFixed > 0){
			if (mY<currentRect[1]+currentRect[3]/2){
				typeStretch = 'up';
			}
			else{
				typeStretch = 'down';
			}
		}

	}
	else{
		typeStretch = 'new';
	}
	isDrawing = true;
	startX = mX;
	startY = mY;
}
