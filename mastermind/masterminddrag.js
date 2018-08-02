


for (var i=0;i<allAnswers.length;i++){
	document.getElementById('key').innerHTML += '<div class="key" style="background-color:'+allColors[i]+';">'+allAnswers[i]+'</div>'
}
for (var i =0;i<nsize[1];i++){
	notin = false;
	while (!notin){
		notin = true;
		x = Math.floor(Math.random()*allAnswers.length);
		for (var ii=0;ii<correctAnswer.length;ii++){
			if (correctAnswer[ii]==allAnswers[x]){
				notin = false;
			}
		}
		if (notin){
			correctAnswer.push(allAnswers[x]);
		}
	}
}


var i =0; var ii= 0;
for (ii=0;ii<nsize[1];ii++){
	document.getElementById('bingo').innerHTML +='<div class="white" id="cell0-'+ii.toString()+'"></div>';
}

document.getElementById('bingo').innerHTML +='<div class="pegs" id="pegs0"></div>';

for (i=1;i<nsize[0];i++){
	for (ii=0;ii<nsize[1];ii++){
		document.getElementById('bingo').innerHTML +='<div class="white" id="cell'+i.toString()+'-'+ii.toString()+'">'+''+'</div>';
	}
	document.getElementById('bingo').innerHTML +='<div class="pegs" id="pegs'+i.toString()+'"></div>';
}


dragulaContainers = [document.getElementById('answerChoices')];
for (var i=0;i<nsize[1];i++){
	dragulaContainers.push(document.getElementById('cell'+'0'+'-'+i.toString()));
}

var drake = dragula(dragulaContainers,{
	moves: function (el, source, handle, sibling) {
		if (el.className === 'white'){
			return false;
		}
		else{
    		return true; // elements are always draggable by default
		}
  },
});

boardAnswers = {};
drake.on('drop', function(el,target,source,sibling){boardAnswers[target.id]=el;})

function updateBoard(){
	var i =0; var ii = 0;
	drake.containers.splice(1,nsize[1]);
	for (var i=0;i<nsize[1];i++){
		drake.containers.push(document.getElementById('cell'+rowi.toString()+'-'+i.toString()));
	}

}



function submitGuess(){
	myguess = [];
	for (var i=0;i<nsize[1];i++){

		if (typeof boardAnswers['cell'+rowi.toString()+'-'+i.toString()] === "undefined"){
			rawValue = 'Unknown';
		}
		else{
			rawValue = boardAnswers['cell'+rowi.toString()+'-'+i.toString()].id;
		}
		myguess.push(genAnswer(rawValue));
	}
	pegDiv = [];
	for (var i=0;i<nsize[1];i++){
		myColor = 'white';
		for (var ii =0;ii<allColors.length;ii++){
			if (myguess[i]==allAnswers[ii]){
				myColor = allColors[ii];
			}
		}
		document.getElementById('cell'+rowi.toString()+'-'+i.toString()).style.background = myColor;
		if (myguess[i]==correctAnswer[i]){
			pegDiv.push('B');
		}
		else{
			foundMatch = false;
			for (var ii=0;ii<nsize[1];ii++){
				if (myguess[i]==correctAnswer[ii]){
					pegDiv.push('W');
					foundMatch = true;
				}
			}
			if (!foundMatch){
				pegDiv.push('_');
				
			}
		}
	}
	for (var i=0;i<nsize[1];i++){
		if (pegDiv[i]=='B'){
			document.getElementById('pegs'+rowi.toString()).innerHTML += 'B';
		}
	}
	for (var i=0;i<nsize[1];i++){
		if (pegDiv[i]=='W'){
			document.getElementById('pegs'+rowi.toString()).innerHTML += 'W';
		}
	}
	for (var i=0;i<nsize[1];i++){
		if (pegDiv[i]=='_'){
			document.getElementById('pegs'+rowi.toString()).innerHTML += '_';
		}
	}
	
	rowi++;
	updateBoard();
}





