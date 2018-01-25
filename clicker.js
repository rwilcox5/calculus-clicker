power = 0;
logs = 0;
correctAnswer = {'power':true,'logexp':true};
autoQArray = {'power':[],'logexp':[]};
waitingFor = {'power':'question','logexp':'question'};
isAutoQuestion = {'power':false,'logexp':false};
isAutoAnswer = {'power':false,'logexp':false};
document.getElementById('gradeButtons').style.display = 'none';

function handle(e,type){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        submitQuestion(type); // Creates Question

    }
}

function isType(type,question,dx){
	if (type=='power'){
		return isPower(question,dx);
	}
	if (type=='logexp'){
		return isLogexp(question,dx);
	}
}

function updateScore(type,chg){
	if (type=='power'){
		power+=chg;
		document.getElementById('power').innerHTML = power;
	}
	if (type=='logexp'){
		logs+=chg;
		document.getElementById('logs').innerHTML = logs;
	}
}

function createAnswer(type,question,dx){
	
	if (Math.random()<.75){
		if (type=='power'){
			answer = powerAnswerC(question,dx);
		}
		else if (type=='logexp'){
			answer = logexpAnswerC(question,dx);
		}
		correctAnswer[type] = true;
	}
	else{
		if (type=='power'){
			answer = powerAnswerW(question,dx);
		}
		else if (type=='logexp'){
			answer = logexpAnswerW(question,dx);
		}
		correctAnswer[type] = false;
	}
	document.getElementById('answer'+type).innerHTML= answer;
	document.getElementById('gradeButtons'+type).style.display = 'inline-block';
}

function submitQuestion(type,question = "N/A"){
	if (question=='N/A'){
		question = document.getElementById('questionInput'+type).value;
	}
	if (isType(type,question,'x')){ // If question is of the correct type
		updateScore(type,1);		
		document.getElementById('questionOutput'+type).innerHTML='What is d/dx of '+question+'?';
		createAnswer(type,question,'x');
		waitingFor[type] = 'grade'; 

	}
	else{
		updateScore(type,-1);
		document.getElementById('questionOutput'+type).innerHTML='Not a valid question';
		waitingFor[type] = 'question';
	}
}

function submitGrade(type,grade){

	if (grade=='correct'){
		if (correctAnswer[type]){updateScore(type,1);}
		else{updateScore(type,-1);}
	}
	else{
		if (correctAnswer[type]){updateScore(type,-1);}
		else{updateScore(type,1);}
	}
	waitingFor[type] = 'question';
}

setInterval(function(){
	var i =0;
	typeArray = ['power','logexp']; 
	for (i=0;i<2;i++){
		type = typeArray[i];
		if (waitingFor[type]=='question' && isAutoQuestion[type] && isAutoAnswer[type]){
			AIAnswer = genA(0,type);
			if (document.getElementById('answer'+type).innerHTML==AIAnswer){
				submitGrade(type,'correct');
			}
			else{
				submitGrade(type,'wrong');
				document.getElementById('answer'+type).innerHTML=AIAnswer;
				correctAnswer[type]=true;
			}
		}
		else if (waitingFor[type]=='question' && isAutoQuestion[type]){

	    	genQ(type,autoQArray[type][autoQArray[type].length-1]); 
		}
	}

}, 5000);

function genQ(type,qarray,testQ=false){
	var i =0;
	autoQ = '';
	numberList = [];
	for (i=0;i<qarray.length;i++){
		partInput = qarray[i];
		if (Array.isArray(partInput)){
			minInt = partInput[0];
			maxInt = partInput[1];
			x = Math.floor(Math.random()*(maxInt-minInt+1))+minInt;
			autoQ += x.toString();
			numberList.push(x);
		}
		else{
			autoQ += partInput;
		}
	}
	if (!testQ){
		submitQuestion(type,autoQ);
	}
	else{
		return [autoQ,numberList];
	}
}

function automate(type){
	autoQArray[type].push([]);
	partInput = document.getElementById('question'+type).value;

	while (partInput.search('{')>-1){
		autoQArray[type][autoQArray[type].length-1].push(partInput.slice(0,partInput.search('{')));
		minInt = parseInt(partInput.slice(partInput.search('{')+1,partInput.search(',')));
		maxInt = parseInt(partInput.slice(partInput.search(',')+1,partInput.search('}')));
		autoQArray[type][autoQArray[type].length-1].push([minInt,maxInt]);
		partInput = partInput.slice(partInput.search('}')+1,partInput.length);
	}
	if (partInput.length>0){
		autoQArray[type][autoQArray[type].length-1].push(partInput);
	}
	isAutoQuestion[type] = true;

	gQuestion = document.getElementById('question'+type).value;
	numberRep = '#';
	nparts = 0;
	while (gQuestion.search('{')>-1 && gQuestion.search('}')>-1 && gQuestion.search(',')>-1){
		nparts++;
		numberRep = '{#'+nparts.toString()+'}';
		gQuestion = gQuestion.slice(0,gQuestion.search('{'))+numberRep+gQuestion.slice(gQuestion.search('}')+1,gQuestion.length);
	}
	nAuto = (autoQArray[type].length-1).toString();
	document.getElementById('autoGrader'+type).innerHTML += '<button class="button" onclick="automateGrade('+nAuto+',\''+type+'\');">Automate</button><button class="button" onclick="autoTest('+nAuto+',\'answer\',\''+type+'\');">Test</button>Question:<span id="questionOutput'+type+nAuto+'">'+gQuestion +'</span>    <span id="questionInput'+type+nAuto+'">'+document.getElementById('question'+type).value+'</span>Answer:<input type="text" id="gAnswer'+type+nAuto+'"><span id="testQuestion'+type+nAuto+'"></span><span id="testAnswer'+type+nAuto+'"></span><br />';

}

function changeQuestion(qid,type){
	gQuestion = document.getElementById('question'+type).value;
	numberRep = '#';
	while (gQuestion.search('{')>-1 && gQuestion.search('}')>-1 && gQuestion.search(',')>-1){
		gQuestion = gQuestion.slice(0,gQuestion.search('{'))+numberRep+gQuestion.slice(gQuestion.search('}')+1,gQuestion.length);
	}
	document.getElementById('questionTempOutput'+type).innerHTML = gQuestion;
}


function autoTest(qid,qora,type){
	if (qora=='question'){
		var i = 0;
		partInput = document.getElementById('question'+type).value;
		thisArray = [];

		while (partInput.search('{')>-1){
			thisArray.push(partInput.slice(0,partInput.search('{')));
			minInt = parseInt(partInput.slice(partInput.search('{')+1,partInput.search(',')));
			maxInt = parseInt(partInput.slice(partInput.search(',')+1,partInput.search('}')));
			thisArray.push([minInt,maxInt]);
			partInput = partInput.slice(partInput.search('}')+1,partInput.length);
		}
		if (partInput.length>0){
			thisArray.push(partInput);
		}
		testQ = genQ(type,thisArray,true);

		document.getElementById('questionTest'+type).innerHTML = '\\frac{d}{dx}['+testQ[0]+'] = ???';
	}
	else{
		var i = 0;
		partInput = document.getElementById('questionInput'+type+qid.toString()).innerHTML;
		thisArray = [];

		while (partInput.search('{')>-1){
			thisArray.push(partInput.slice(0,partInput.search('{')));
			minInt = parseInt(partInput.slice(partInput.search('{')+1,partInput.search(',')));
			maxInt = parseInt(partInput.slice(partInput.search(',')+1,partInput.search('}')));
			thisArray.push([minInt,maxInt]);
			partInput = partInput.slice(partInput.search('}')+1,partInput.length);
		}
		if (partInput.length>0){
			thisArray.push(partInput);
		}
		testQ = genQ(type,thisArray,true);

		gAnswer = document.getElementById('gAnswer'+type+qid.toString()).value;
		for (i=0;i<testQ[1].length;i++){
			gAnswer = gAnswer.split('#'+(i+1).toString()).join(testQ[1][i]);
		}
		console.log(gAnswer);
		while (gAnswer.search('{')>-1 && gAnswer.search('}')>-1){
			insidePart = gAnswer.slice(gAnswer.search('{')+1,gAnswer.search('}'));
			insidePart = eval(insidePart);
			gAnswer = gAnswer.slice(0,gAnswer.search('{'))+insidePart+gAnswer.slice(gAnswer.search('}')+1,gAnswer.length);
		}

		document.getElementById('testQuestion'+type+qid.toString()).innerHTML = '\\frac{d}{dx}['+testQ[0]+'] = ';
		document.getElementById('testAnswer'+type+qid.toString()).innerHTML = gAnswer;
	}
}

function automateGrade(qid,type){
	isAutoAnswer = true;
}

function genA(qid,type){
	var i = 0;
	partInput = document.getElementById('questionInput'+type+qid.toString()).innerHTML;
	thisArray = [];

	while (partInput.search('{')>-1){
		thisArray.push(partInput.slice(0,partInput.search('{')));
		minInt = parseInt(partInput.slice(partInput.search('{')+1,partInput.search(',')));
		maxInt = parseInt(partInput.slice(partInput.search(',')+1,partInput.search('}')));
		thisArray.push([minInt,maxInt]);
		partInput = partInput.slice(partInput.search('}')+1,partInput.length);
	}
	if (partInput.length>0){
		thisArray.push(partInput);
	}
	testQ = genQ(type,thisArray,true);
	submitQuestion(type,testQ[0]);

	gAnswer = document.getElementById('gAnswer'+type+qid.toString()).value;
	for (i=0;i<testQ[1].length;i++){
		gAnswer = gAnswer.split('#'+(i+1).toString()).join(testQ[1][i]);
	}
	console.log(gAnswer);
	while (gAnswer.search('{')>-1 && gAnswer.search('}')>-1){
		insidePart = gAnswer.slice(gAnswer.search('{')+1,gAnswer.search('}'));
		insidePart = eval(insidePart);
		gAnswer = gAnswer.slice(0,gAnswer.search('{'))+insidePart+gAnswer.slice(gAnswer.search('}')+1,gAnswer.length);
	}

	return gAnswer;
}