var canvas;
var ctx;

var canvasOffset;
var offsetX;
var offsetY;

var isDrawing = false;
var actArea = 1.;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas1 = document.getElementById("canvas1");
ctx1 = canvas1.getContext("2d");
createCanvas1(ctx1,canvas1,2,1);

canvas2 = document.getElementById("canvas2");
ctx2 = canvas2.getContext("2d");
createCanvas2(ctx2,canvas2,2,1);

canvas3 = document.getElementById("canvas3");
ctx3 = canvas3.getContext("2d");
createCanvas3(ctx3,canvas3,2,1);

canvas4 = document.getElementById("canvas4");
ctx4 = canvas4.getContext("2d");
createCanvas4(ctx4,canvas4,2,1);

canvas5 = document.getElementById("canvas5");
ctx5 = canvas5.getContext("2d");
createCanvas4(ctx5,canvas5,2,1);

canvas6 = document.getElementById("canvas6");
ctx6 = canvas6.getContext("2d");
createCanvas4(ctx6,canvas6,2,1);

var myDelta = document.getElementById('myDelta');
var myEpsilon = document.getElementById('myEpsilon');
myDelta.onchange = function(){
	createCanvas4(ctx4,canvas4,myDelta.value/10.,myEpsilon.value/10.);
}
myDelta.oninput = function(){
	createCanvas4(ctx4,canvas4,myDelta.value/10.,myEpsilon.value/10.);
}

myEpsilon.onchange = function(){
	createCanvas4(ctx4,canvas4,myDelta.value/10.,myEpsilon.value/10.);
}
myEpsilon.oninput = function(){
	createCanvas4(ctx4,canvas4,myDelta.value/10.,myEpsilon.value/10.);
}

var myDelta2 = document.getElementById('myDelta2');
var myEpsilon2 = document.getElementById('myEpsilon2');
var allDE = [];
var e;
myDelta2.onchange = function(){
	e = parseFloat(myEpsilon2.value)/10.;
	createCanvas4(ctx5,canvas5,evalUser(myDelta2.value),myEpsilon2.value/10.);
}

myEpsilon2.onchange = function(){
	e = parseFloat(myEpsilon2.value)/10.;
	createCanvas4(ctx5,canvas5,evalUser(myDelta2.value),myEpsilon2.value/10.);
	createRegion(ctx5,canvas5);
}
myEpsilon2.oninput = function(){
	e = parseFloat(myEpsilon2.value)/10.;
	createCanvas4(ctx5,canvas5,evalUser(myDelta2.value),myEpsilon2.value/10.);
	var inDE = false;
	for (var i =0;i<allDE.length;i++){
		if (evalUser(myDelta2.value)==allDE[i][0] && myEpsilon2.value/10.==allDE[i][1]){
			inDE = true;
			break;
		}
	}
	if (!inDE){
		allDE.push([evalUser(myDelta2.value),myEpsilon2.value/10.]);
	}
	createRegion(ctx5,canvas5);
}

var myDelta3 = document.getElementById('myDelta3');
var myEpsilon3 = document.getElementById('myEpsilon3');
var zoom3 = document.getElementById('zoom3');

function change3(){
	e = parseFloat(myEpsilon3.value)/100.;
	createCanvas4(ctx6,canvas6,evalUser(myDelta3.value),myEpsilon3.value/100.);
	xfn = 'Math.pow(x,5)+x';
	drawCurve(ctx6,canvas6,[xcoord(-1*evalUser(myDelta3.value)),ycoord(-1*myEpsilon3.value/100.),xcoord(evalUser(myDelta3.value))-xcoord(-1*evalUser(myDelta3.value)),ycoord(myEpsilon3.value/100.)-ycoord(-1*myEpsilon3.value/100.)]);
	var inDE = false;
	for (var i =0;i<allDE.length;i++){
		if (evalUser(myDelta3.value)==allDE[i][0] && myEpsilon3.value/100.==allDE[i][1]){
			inDE = true;
			break;
		}
	}
	if (!inDE){
		allDE.push([evalUser(myDelta3.value),myEpsilon3.value/100.]);
	}
	createRegion(ctx6,canvas6);
}
zoom3.oninput = function(){
	windowGraph = [-.05*parseFloat(zoom3.value),-.05*parseFloat(zoom3.value),.05*parseFloat(zoom3.value),.05*parseFloat(zoom3.value)];
	change3();
}
myDelta3.onchange = function(){
	e = parseFloat(myEpsilon3.value)/100.;
	createCanvas4(ctx6,canvas6,evalUser(myDelta3.value),myEpsilon3.value/100.);
}

myEpsilon3.onchange = function(){
	e = parseFloat(myEpsilon3.value)/100.;
	createCanvas4(ctx6,canvas6,evalUser(myDelta3.value),myEpsilon3.value/100.);
	xfn = 'Math.pow(x,5)+x';
	drawCurve(ctx6,canvas6,[xcoord(-1*evalUser(myDelta3.value)),ycoord(-1*myEpsilon3.value/100.),xcoord(evalUser(myDelta3.value))-xcoord(-1*evalUser(myDelta3.value)),ycoord(myEpsilon3.value/100.)-ycoord(-1*myEpsilon3.value/100.)]);
	createRegion(ctx6,canvas6);
}
myEpsilon3.oninput = function(){
	change3();	
}

function evalUser(user_input){
	return eval(user_input.replace('min','Math.min'));
}
function createRegion(ctx,canvas){
	allDE.sort(function(a, b) {
	  return a[0] - b[0];
	});
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,ycoord(allDE[0][1]));
	for (var i =0;i<allDE.length;i++){
		ctx.lineTo(xcoord(allDE[i][0]),ycoord(allDE[i][1]));
	}
	ctx.lineTo(xcoord(allDE[allDE.length-1][0]),canvas.height);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(canvas.width/2,canvas.height-ycoord(allDE[0][1]));
	for (var i =0;i<allDE.length;i++){
		ctx.lineTo(xcoord(allDE[i][0]),canvas.height-ycoord(allDE[i][1]));
	}
	ctx.lineTo(xcoord(allDE[allDE.length-1][0]),0);
	ctx.lineTo(canvas.width/2,0);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(canvas.width/2,canvas.height-ycoord(allDE[0][1]));
	for (var i =0;i<allDE.length;i++){
		ctx.lineTo(canvas.width-xcoord(allDE[i][0]),canvas.height-ycoord(allDE[i][1]));
	}
	ctx.lineTo(canvas.width-xcoord(allDE[allDE.length-1][0]),0);
	ctx.lineTo(canvas.width/2,0);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(canvas.width/2,ycoord(allDE[0][1]));
	for (var i =0;i<allDE.length;i++){
		ctx.lineTo(canvas.width-xcoord(allDE[i][0]),ycoord(allDE[i][1]));
	}
	ctx.lineTo(canvas.width-xcoord(allDE[allDE.length-1][0]),canvas.height);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.fill();
}
function createCanvas1(ctx,canvas,delta,epsilon){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.moveTo(canvas.width/2,canvas.height);
	ctx.lineTo(canvas.width/2,0);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,4,0,2*Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.setLineDash([4, 2]);
	ctx.moveTo(xcoord(delta),canvas.height);
	ctx.lineTo(xcoord(delta),0);
	ctx.moveTo(xcoord(-1*delta),canvas.height);
	ctx.lineTo(xcoord(-1*delta),0);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = 'rgba(200, 125, 80, .1)';
	ctx.moveTo(xcoord(delta),canvas.height);
	ctx.lineTo(xcoord(delta),0);
	ctx.lineTo(xcoord(-1*delta),0);
	ctx.lineTo(xcoord(-1*delta),canvas.height);
	
	ctx.fill();
}

function createCanvas2(ctx,canvas,delta,epsilon){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.moveTo(canvas.width/2,canvas.height);
	ctx.lineTo(canvas.width/2,0);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,4,0,2*Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.setLineDash([4, 2]);
	ctx.moveTo(0,ycoord(epsilon));
	ctx.lineTo(canvas.width,ycoord(epsilon));
	ctx.moveTo(0,ycoord(-1*epsilon));
	ctx.lineTo(canvas.width,ycoord(-1*epsilon));
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = 'rgba(200, 125, 80, .1)';
	ctx.moveTo(0,ycoord(epsilon));
	ctx.lineTo(canvas.width,ycoord(epsilon));
	ctx.lineTo(canvas.width,ycoord(-1*epsilon));
	ctx.lineTo(0,ycoord(-1*epsilon));
	
	
	ctx.fill();
}

function createCanvas3(ctx,canvas,delta,epsilon){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.moveTo(canvas.width/2,canvas.height);
	ctx.lineTo(canvas.width/2,0);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,4,0,2*Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.setLineDash([4, 2]);
	ctx.moveTo(xcoord(-1*delta),0)
	ctx.lineTo(xcoord(-1*delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),0);
	ctx.moveTo(xcoord(delta),canvas.height)
	ctx.lineTo(xcoord(delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),canvas.height);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = 'rgba(0, 5, 0, .3)';
	ctx.moveTo(xcoord(-1*delta),0)
	ctx.lineTo(xcoord(-1*delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),0);
	ctx.fill()
	ctx.beginPath();
	ctx.moveTo(xcoord(delta),canvas.height)
	ctx.lineTo(xcoord(delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),canvas.height);
	ctx.fill();
}

function createCanvas4(ctx,canvas,delta,epsilon){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.moveTo(canvas.width/2,canvas.height);
	ctx.lineTo(canvas.width/2,0);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,4,0,2*Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.setLineDash([4, 2]);
	ctx.moveTo(xcoord(-1*delta),0)
	ctx.lineTo(xcoord(-1*delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),0);
	ctx.moveTo(xcoord(delta),canvas.height)
	ctx.lineTo(xcoord(delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),canvas.height);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = 'rgba(0, 5, 0, .3)';
	ctx.moveTo(xcoord(-1*delta),0)
	ctx.lineTo(xcoord(-1*delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),ycoord(-1*epsilon));
	ctx.lineTo(xcoord(delta),0);
	ctx.fill()
	ctx.beginPath();
	ctx.moveTo(xcoord(delta),canvas.height)
	ctx.lineTo(xcoord(delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),ycoord(epsilon));
	ctx.lineTo(xcoord(-1*delta),canvas.height);
	ctx.fill();
}
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

function drawCurve(ctx,canvas,myrect){
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


}

function updateED(){
	deltaFlex = parseFloat(document.getElementById('delta').value);
	var d = deltaFlex;
	epsilonFlex = evalUser(document.getElementById('epsilon').value);
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
