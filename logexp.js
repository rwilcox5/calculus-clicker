function isLogexp(question,dx){
	if (question[0]==dx && question[1]=='^'){
		return true;
	}
	return false;
}

function logexpAnswerC(question,dx){
	
	return question;

}

function logexpAnswerW(question,dx){
	return question+'W';

}