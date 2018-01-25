money = 100;


function setClicker(block,spot){
	document.getElementById('cell'+block.toString()+'-'+spot.toString()).addEventListener("click", function(){
		myAnswer = letters[block][spot];
		if (answerCard[block][spot]!=''){
			document.getElementById('question').innerHTML=answerCard[block][spot];
			document.getElementById('answer').innerHTML=letters[block][spot];
		}
		else{
			answerCard[block][spot]=listQ[correctAnswer];
			if (myAnswer==listA[correctAnswer]){
				bingoCard[block][spot]=1;
				document.getElementById('cell'+block.toString()+'-'+spot.toString()).style.background='red';
				chkBingo();
				newFunction();

			}
			else {
				document.getElementById('cell'+block.toString()+'-'+spot.toString()).style.background='red';
				newFunction();
			}
		}

	});
}

function newFunction(){
	x = Math.floor(Math.random()*12)
	document.getElementById('function').innerHTML = listQ[x];
	correctAnswer = x;
}

function chkBingo(){
	for (var i=0;i<5;i++){
		if (bingoCard[i][0]+bingoCard[i][1]+bingoCard[i][2]+bingoCard[i][3]+bingoCard[i][4]==5){
			console.log('Bingo!');
		}
		if (bingoCard[0][i]+bingoCard[1][i]+bingoCard[2][i]+bingoCard[3][i]+bingoCard[4][i]==5){
			console.log('Bingo!');
		}
	}
	if (bingoCard[0][0]+bingoCard[1][1]+bingoCard[2][2]+bingoCard[3][3]+bingoCard[4][4]==5){
		console.log('Bingo!');
	}
	if (bingoCard[0][4]+bingoCard[1][3]+bingoCard[2][2]+bingoCard[3][1]+bingoCard[4][0]==5){
		console.log('Bingo!');
	}
}

function createBoard(listQ,listA){
	availFunctions = [3,3,3,3,3,3,3,3,3,3,3,3];
	letters = [[],[],[],[],[]];
	for (var i=0;i<5;i++){
		for (var ii=0;ii<5;ii++){
			keepRand = true;
			while (keepRand){
				x = Math.floor(Math.random()*12);
				if (availFunctions[x]>0){
					fnA = listA[x];
					letters[i].push(fnA);
					availFunctions[x]-=1;
					keepRand = false;
				}
			}
		}
	}
	return letters;
}

listQ = ["x^3","x^4","x^5","x^6","x^7","x^4","x^5","x^6","x^7","x^4","x^5","x^6"];
listA = ["3x^2","4x^3","5x^4","6x^5","7x^6","4x^3","5x^4","6x^5","7x^6","4x^3","5x^4","6x^5"];

answerCard = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
letters = createBoard(listQ,listA);


nsize = 5;

var i =0; var ii= 0;
for (i=0;i<nsize;i++){
	for (ii=0;ii<nsize;ii++){
		document.getElementById('bingo').innerHTML +='<div class="white" id="cell'+i.toString()+'-'+ii.toString()+'">'+letters[i][ii]+'</div>';
	}
}
document.getElementById('cell2-2').innerHTML ='Free Space';


for (i=0;i<nsize;i++){
	for (ii=0;ii<nsize;ii++){
		setClicker(i,ii);
	}
}
correctAnswer = 0;
newFunction();

bingoCard = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];




