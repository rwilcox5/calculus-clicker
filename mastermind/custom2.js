


function myf(rawX,xfn,windowGraph,svgWidth,svgHeight){
	var x = windowGraph[0]+rawX/svgWidth*(windowGraph[2]-windowGraph[0]);
	var y = eval(xfn);
	return svgHeight-(y-windowGraph[1])/(windowGraph[3]-windowGraph[1])*svgHeight;
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

function drawCurve(thisAnswer,xfn,windowGraph,svgWidth,svgHeight){
	allPoints = '';
	for (var i=0;i<svgWidth;i++){
		yVal = myf(i,xfn,windowGraph,svgWidth,svgHeight);
		if (!isNaN(yVal) && isFinite(yVal)){
			allPoints += i.toString()+','+myf(i,xfn,windowGraph,svgWidth,svgHeight).toString()+' ';
		}
	}
	thisAnswer += '<polyline points="'+allPoints+'" style="fill:none;stroke:purple;stroke-width:1" />';
	return thisAnswer;

}

function svgGraph(windowGraph,xfn,svgWidth,svgHeight){
	thisAnswer = '<svg height="'+svgHeight+'" width="'+svgWidth+'">'
	thisAnswer += '<line x1="'+svgWidth/2+'" y1="0" x2="'+svgWidth/2+'" y2="'+svgHeight+'" style="stroke:rgb(55,0,0);stroke-width:1" />';
	thisAnswer += '<line x1="0" y1="'+svgHeight/2+'" x2="'+svgWidth+'" y2="'+svgHeight/2+'" style="stroke:rgb(55,0,0);stroke-width:1" />';
	thisAnswer = drawCurve(thisAnswer,xfn,windowGraph,svgWidth,svgHeight);
	thisAnswer += '</svg>';
	return thisAnswer;
}



nsize = [8,3];
rowi = 0;
correctAnswer = [];
allAnswers = ['linear','quadratic','cubic','logarithmic','exponential','rational','trigonometric'];
allColors = ['gray','yellow','green','aqua','orange','red','blue'];

dragAnswers = [];
for (var i=0;i<8;i++){
	dragAnswers .push([Math.floor(Math.random()*2+1).toString()+'*x+'+Math.floor(Math.random()*3).toString(),'linear']);
	dragAnswers .push([Math.floor(Math.random()*2+1).toString()+'*x*x-'+Math.floor(Math.random()*5).toString(),'quadratic']);
	dragAnswers .push(['x*x*x','cubic']);
	dragAnswers .push(['Math.log(x)','logarithmic']);
	dragAnswers .push(['Math.pow(2,x)','exponential']);
	dragAnswers .push(['1/x','rational']);
	dragAnswers .push(['Math.sin(x)','trigonometric']);
}
for (var i=0;i<dragAnswers.length;i++){
	
	thisAnswer = svgGraph([-5,-5,5,5],dragAnswers[i][0],50,50);
	
	document.getElementById('answerChoices').innerHTML += '<div class="answers" id="'+dragAnswers[i][1]+'">'+thisAnswer+'</div>';
}



function genAnswer(rawValue){
	
	return rawValue;
}


