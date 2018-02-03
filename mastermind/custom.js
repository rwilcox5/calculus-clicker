nsize = [8,3];
rowi = 0;
correctAnswer = [];
allAnswers = ['0','1/2','sqrt(2)/2','sqrt(3)/2','1','-1/2','-sqrt(2)/2','-sqrt(3)/2','-1'];
allColors = ['gray','yellow','green','aqua','orange','red','blue','purple','brown'];


function sinnd(numerator,denom){
	if (numerator<0){
		numerator = numerator-2*denom*Math.floor(numerator/denom);
	}
	if (denom==1){
		return '0';
	}
	else if (denom==2){
		if (numerator%4==1){
			return '1';
		}
		else if (numerator%4==3){
			return '-1';
		}
	}
	else if (denom==3){
		if (numerator%6==1 || numerator%6==2){
			return 'sqrt(3)/2';
		}
		else if (numerator%6==4 || numerator%6==5){
			return '-sqrt(3)/2';
		}
	}
	else if (denom==4){
		if (numerator%8==1 || numerator%8==3){
			return 'sqrt(2)/2';
		}
		else if (numerator%8==5 || numerator%8==7){
			return '-sqrt(2)/2';
		}
	}
	else if (denom==6){
		if (numerator%12==1 || numerator%12==5){
			return '1/2';
		}
		else if (numerator%12==7 || numerator%12==11){
			return '-1/2';
		}
	}
	return 'Unknown';
}
function cosnd(numerator,denom){
	if (numerator<0){
		numerator = numerator-2*denom*Math.floor(numerator/denom);
	}
	if (denom==1){
		if (numerator%2==0){
			return '1';
		}
		else if (numerator%2==1){
			return '-1';
		}
	}
	else if (denom==2){
		return '0';
	}
	else if (denom==3){
		if (numerator%6==1 || numerator%6==5){
			return '1/2';
		}
		else if (numerator%6==4 || numerator%6==2){
			return '-1/2';
		}
	}
	else if (denom==4){
		if (numerator%8==1 || numerator%8==7){
			return 'sqrt(2)/2';
		}
		else if (numerator%8==5 || numerator%8==3){
			return '-sqrt(2)/2';
		}
	}
	else if (denom==6){
		if (numerator%12==1 || numerator%12==11){
			return 'sqrt(3)/2';
		}
		else if (numerator%12==7 || numerator%12==5){
			return '-sqrt(3)/2';
		}
	}
	return 'Unknown';
}

function genAnswer(rawValue){
	numerator = 1;
	denom = 1;
	if (rawValue[4]=='0'){
		numerator = 0;
	}
	else{
		for (var ii=5;ii<rawValue.length-2;ii++){
			if (rawValue[ii]=='p'){
				if (rawValue.substring(4,ii)=='-'){
					numerator = -1;
				}
				else{
					numerator = parseInt(rawValue.substring(4,ii));
				}
				
			}
			if (rawValue[ii-1]=='i' && rawValue[ii]=='/'){
				denom = parseInt(rawValue.substring(ii+1,rawValue.length-1));
			}

		}
	}
	trueValue = 'Unknown';
	if (rawValue.substring(0,4)=='sin('){
		trueValue = sinnd(numerator,denom);
	}
	if (rawValue.substring(0,4)=='cos('){
		trueValue = cosnd(numerator,denom);
	}
	return trueValue;
}