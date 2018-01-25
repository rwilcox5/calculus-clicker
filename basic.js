function fullParen(inputString){
	nopen = 0;
	nclosed =0;
	var i =0;
	if (inputString.length==1){
		return true;
	}
	for (i=0;i<inputString.length;i++){
		if (inputString.charAt(i)=='('){
			nopen++;
		}
		else if (inputString.charAt(i)==')'){
			nclosed++;
		}
		if (nopen==nclosed){
			if (i==inputString.length-1){
				return true;
			}
			else{
				if (parseInt(inputString).toString()==inputString){
					return true;
				}
				else{
					return false;
				}
			}
		}
	}
	return false;
}