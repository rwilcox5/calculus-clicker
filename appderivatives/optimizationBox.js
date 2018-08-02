
createCanvasBox('canvas1');
createCanvasBox('canvas2');
function createCanvasBox(canvasID){
	var canvas;
	var ctx;
	canvas = document.getElementById(canvasID);
	ctx = canvas.getContext("2d");

	
	var canvasOffset;
	var offsetX;
	var offsetY;
	var isDrawing = false;
	var actArea = 1.;
	var startX;
	var startY;
	var stretch = '';
	var startBox1;
	var startBox2;
	var startBox3;
	var startBox4;
	var startBox5;
	var startBox6;
	currentBox = [[50,100],[lengthBoxInitial,heightBoxInitial],[widthBoxInitial/Math.pow(2,.5),-1*widthBoxInitial/Math.pow(2,.5)]];
	drawBox(currentBox,ctx,canvas);
	offsetX = canvas.offsetLeft;
	offsetY = canvas.offsetTop;

	canvas.onmousedown = function (e) {
		canvas.style.cursor = "crosshair";	
	    returnArray = handleMouseDown(e.clientX,e.clientY,offsetX,offsetY,currentBox);
	    startX = returnArray[0];
		startY = returnArray[1];
		startBox1 = returnArray[2];
		startBox2 = returnArray[3];
		startBox3 = returnArray[4];
		startBox4 = returnArray[5];
		startBox5 = returnArray[6];
		startBox6 = returnArray[7];
		isDrawing = returnArray[8];
		stretch = returnArray[9];
	}
	canvas.onmouseup = function(e) {
	    isDrawing = false;
		canvas.style.cursor = "default";
	}
	canvas.onmousemove = function(e) {
	    currentBox = handleMouseMove(e.clientX,e.clientY,offsetX,offsetY,isDrawing,stretch,currentBox,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,ctx,canvas,startX,startY);
	}
	canvas.ontouchstart = function(e) {
		canvas.style.cursor = "crosshair";	
		returnArray = touchDown(e,offsetX,offsetY,currentBox);
		startX = returnArray[0];
		startY = returnArray[1];
		startBox1 = returnArray[2];
		startBox2 = returnArray[3];
		startBox3 = returnArray[4];
		startBox4 = returnArray[5];
		startBox5 = returnArray[6];
		startBox6 = returnArray[7];
		isDrawing = returnArray[8];
		stretch = returnArray[9];
	}
	canvas.ontouchmove = function(e) {
		currentBox = touchMove(e,offsetX,offsetY,isDrawing,stretch,currentBox,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,ctx,canvas,startX,startY);
	}
	canvas.ontouchend = function() {
		isDrawing = false;
		canvas.style.cursor = "default";
	}
}






function ltoh(length,startBox3,startBox4){
	oldLength = startBox3;
	trueHeight = volumeBox/(oldLength+length)/ltow(oldLength+length)/Math.pow(2,.5);
	oldHeight = startBox4;
	diffHeight = trueHeight-oldHeight;
	return -1*diffHeight;
}

function wtoh(width,startBox4,startBox5){
	oldWidth = startBox5*Math.pow(2,.5);
	trueHeight = volumeBox/(oldWidth+width*Math.pow(2,.5))/wtol(oldWidth+width*Math.pow(2,.5))*Math.pow(2,.5);
	oldHeight = startBox4;
	diffHeight = trueHeight-oldHeight;
	return -1*diffHeight;
}

function ltow(length){
	return length*lwConstraint/Math.pow(2,.5);
}
function wtol(width){
	return width/lwConstraint*Math.pow(2,.5);
}

function touchDown(e,offsetX,offsetY,currentBox) {
    if (!e)
        var e = event;
    e.preventDefault();
    return handleMouseDown(e.targetTouches[0].pageX,e.targetTouches[0].pageY,offsetX,offsetY,currentBox);

}
function touchMove(e,offsetX,offsetY,isDrawing,stretch,currentBox,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,ctx,canvas,startX,startY){
	if (!e)
        var e = event;
    e.preventDefault();
    return handleMouseMove(e.targetTouches[0].pageX,e.targetTouches[0].pageY,offsetX,offsetY,isDrawing,stretch,currentBox,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,ctx,canvas,startX,startY);
}

function handleMouseDown(eX,eY,offsetX,offsetY,currentBox) {
		
	
	startX = parseInt(eX - offsetX);
	startY = parseInt(eY - offsetY);

	if (isFront([startX,startY],currentBox)){
		stretch = 'front';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
	else if (isSide([startX,startY],currentBox)){
		stretch = 'side';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
	else if (isTop([startX,startY],currentBox)){
		stretch = 'top';
		isDrawing = true;
		startBox1 = currentBox[0][0];
		startBox2 = currentBox[0][1];
		startBox3 = currentBox[1][0];
		startBox4 = currentBox[1][1];
		startBox5 = currentBox[2][0];
		startBox6 = currentBox[2][1];
	}
	else {
		isDrawing = false;
		stretch='';
	}
	return [startX,startY,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,isDrawing,stretch];
}

function handleMouseMove(eX,eY,offsetX,offsetY,isDrawing,stretch,currentBox,startBox1,startBox2,startBox3,startBox4,startBox5,startBox6,ctx,canvas,startX,startY) {
	if (isDrawing) {
		var mouseX = parseInt(eX - offsetX);
		var mouseY = parseInt(eY - offsetY);	
		if (stretch=='front'){  //Changes width of box
			maxDiff = Math.max(startX-mouseX,mouseY-startY);
			currentBox[0][0]= startBox1-maxDiff;
			currentBox[0][1]= startBox2+maxDiff;
			currentBox[2][0]= startBox5+maxDiff;
			currentBox[2][1]= startBox6-maxDiff;

			wlDiff = wtol(maxDiff);
			currentBox[1][0]= startBox3+wlDiff;

			whDiff = wtoh(maxDiff,startBox4,startBox5);
			currentBox[0][1]= startBox2+whDiff;
			currentBox[1][1]= startBox4-whDiff;

		}
		if (stretch=='side'){ //Changes length of box
			maxDiff = mouseX-startX;
			currentBox[1][0]= startBox3+maxDiff;

			lwDiff = ltow(maxDiff);
			currentBox[0][0]= startBox1-lwDiff;
			currentBox[0][1]= startBox2+lwDiff;
			currentBox[2][0]= startBox5+lwDiff;
			currentBox[2][1]= startBox6-lwDiff;

			lhDiff = ltoh(maxDiff,startBox3,startBox4);
			currentBox[0][1]= startBox2+lhDiff;
			currentBox[1][1]= startBox4-lhDiff;
		}
		if (stretch=='top'){ //Changes height of box
			maxDiff = mouseY-startY;
			currentBox[0][1]= startBox2+maxDiff;
			currentBox[1][1]= startBox4-maxDiff;
		}
					
	drawBox(currentBox,ctx,canvas);			
	}
	return currentBox;
}

function isFront(xy,currentBox){
	if (xy[0]>currentBox[0][0] && xy[0]<currentBox[0][0]+currentBox[1][0] && xy[1]>currentBox[0][1] && xy[1]<currentBox[0][1]+currentBox[1][1]){
		return true;
	}
	else{
		return false;
	}
}

function isSide(xy,currentBox){
	if (xy[0]>currentBox[0][0]+currentBox[1][0] && xy[0]<currentBox[0][0]+currentBox[1][0]+currentBox[2][0] && xy[1]<currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]+currentBox[1][1] && xy[1]>currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]){
		return true;
	}
	else{
		return false;
	}
}

function isTop(xy,currentBox){
	if (xy[1]<currentBox[0][1] && xy[1]>currentBox[0][1]+currentBox[2][1] && xy[1]>currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0])+currentBox[0][1] && xy[1]<currentBox[2][1]/currentBox[2][0]*(xy[0]-currentBox[0][0]-currentBox[1][0])+currentBox[0][1]){
		return true;
	}
	else{
		return false;
	}
}

function drawBox(pointsRaw,ctx,canvas){

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
	ctx.fillText("c="+myCost(boxDimensions[0],boxDimensions[1],boxDimensions[2]).toString(),0,32);

}