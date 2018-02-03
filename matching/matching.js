firstClick = [-1,-1];



function updateCell([block,spot],piece){
	if (hideTeams){
		document.getElementById('cell'+block.toString()+spot.toString()).innerHTML='<font color="red">'+piece[0]+'</font><br> ';
	}
	else if (hidePos){
		document.getElementById('cell'+block.toString()+spot.toString()).innerHTML=' <br>'+piece[1];
	}
	else{
		document.getElementById('cell'+block.toString()+spot.toString()).innerHTML='<font color="red">'+piece[0]+'</font><br>'+piece[1];
	}
}

function setClicker(block,spot){
	document.getElementById('cell'+block.toString()+'-'+spot.toString()).addEventListener("click", function(){
		if (firstClick[0]>-1){
			if (letters[firstClick[0]][firstClick[1]][1]==letters[block][spot][1]){
				document.getElementById('cell'+block.toString()+'-'+spot.toString()).style.background = 'yellow';
				matched.push(letters[block][spot][1]);
				firstClick = [-1,-1];
			}
			else{
				document.getElementById('cell'+block.toString()+'-'+spot.toString()).style.background = 'red';
				document.getElementById('cell'+firstClick[0].toString()+'-'+firstClick[1].toString()).style.background = 'red';
				firstClick = [-1,-1];
			}
		}
		else{
			for (var i =0;i<nsize;i++){
				for (var ii = 0; ii<nsize;ii++){
					document.getElementById('cell'+i.toString()+'-'+ii.toString()).style.background = 'white';
					for (var iii=0;iii<matched.length;iii++){
						if (letters[i][ii][1]==matched[iii]){
							document.getElementById('cell'+i.toString()+'-'+ii.toString()).style.background = 'green';
						}
					}
				}

			}
			firstClick = [block,spot];
			document.getElementById('cell'+block.toString()+'-'+spot.toString()).style.background = 'yellow';
		}
	});
}





var nsize = 4;
var matched = [];
letters =  [];
for (i=0;i<nsize;i++){
	letters.push([]);
	for (ii=0;ii<nsize;ii++){
		letters[i].push(['a',(i*nsize+ii)%8]);
	}
}



var i =0; var ii= 0;
for (i=0;i<nsize;i++){
	for (ii=0;ii<nsize;ii++){
		document.getElementById('matching').innerHTML +='<div class="white" id="cell'+i.toString()+'-'+ii.toString()+'">'+letters[i][ii][0]+'</div>';
	}
}
for (i=0;i<nsize;i++){
	for (ii=0;ii<nsize;ii++){
		setClicker(i,ii);
	}
}



