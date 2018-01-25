function isPower(question,dx){
	if (question.substring(0,dx.length)==dx && question.substring(dx.length,dx.length+1)=='^' && fullParen(question.substring(dx.length+1,question.length))){
		return true;
	}
	return false;
}

function powerAnswerC(question,dx){
	return question.substring(dx.length+1,question.length)+dx+'^'+(parseInt(question.substring(dx.length+1,question.length))-1).toString();

}

function powerAnswerW(question,dx){
	return question.substring(dx.length+1,question.length)+dx+'^'+(parseInt(question.substring(dx.length+1,question.length))+1).toString();

}