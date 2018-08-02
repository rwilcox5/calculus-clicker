
function drakeEval(input_fn){
	if (input_fn.substring(1,5)=='plus'){
		return input_fn.substring(5,input_fn.length-1)+String.fromCharCode(input_fn.charCodeAt(input_fn.length-1)+1);
	}
	else{
		return eval(input_fn);
	}
}


function createDrake(functionID,baseFunction,evalFunction,evalString=false){

	document.getElementById(functionID+'Output').innerHTML = baseFunction;
	dragulaContainers = [document.getElementById(functionID+'Input'),document.getElementById(functionID+'Inputs')]

	var drake = dragula(dragulaContainers,{
		moves: function (el, source, handle, sibling) {
	    	return true; // elements are always draggable by default
	  },
	});
	drake.on('drop', function(el,target,source,sibling){
		if (target.id == functionID+'Input'){
			inputVar =el.innerHTML; 
			document.getElementById(functionID+'Input').innerHTML = inputVar; 
			document.getElementById(functionID+'Output').innerHTML = baseFunction.replace(/x/g,inputVar); 
			if (!isNaN(inputVar) || evalString){
				document.getElementById(functionID+'Eval').innerHTML = '='+drakeEval(evalFunction.replace(/x/g,inputVar)); 
			}
			else{
				document.getElementById(functionID+'Eval').innerHTML = '';
			}
		}
	})
	drake.on('over', function(el,container,source){inputVar =el.innerHTML; if (container.id==functionID+'Input'){container.innerHTML = '';}})
}

function createDrakeEmoji(functionID,baseFunction){

	document.getElementById(functionID+'Output').innerHTML = baseFunction;
	dragulaContainers = [document.getElementById(functionID+'Input'),document.getElementById(functionID+'Inputs')]

	var drake = dragula(dragulaContainers,{
		moves: function (el, source, handle, sibling) {
	    	return true; // elements are always draggable by default
	  },
	});
	drake.on('drop', function(el,target,source,sibling){
		if (target.id == functionID+'Input'){
			inputVar =el.innerHTML; 
			document.getElementById(functionID+'Input').innerHTML = inputVar; 
			document.getElementById(functionID+'Output').innerHTML = baseFunction.replace(/x/g,inputVar); 
			document.getElementById(functionID+'Eval').innerHTML = '';
			for (var i=1;i<10;i++){
				if (baseFunction ==i.toString()+'*x'){
					document.getElementById(functionID+'Eval').innerHTML = '=';
					for (var ii=0;ii<i;ii++){
						document.getElementById(functionID+'Eval').innerHTML += inputVar;
					}
				}
			}
			for (var i=0;i<10;i++){
				if (baseFunction ==i.toString()+'+x'){
					document.getElementById(functionID+'Eval').innerHTML = '=';
					inputDec0 = el.innerHTML.charCodeAt(0);
					inputDec1 = el.innerHTML.charCodeAt(1);

					for (var ii=0;ii<i;ii++){
						document.getElementById(functionID+'Eval').innerHTML = '='+String.fromCharCode(inputDec0)+String.fromCharCode(inputDec1+i);
					}
				}
			}

		}
	})
	drake.on('over', function(el,container,source){inputVar =el.innerHTML; if (container.id==functionID+'Input'){container.innerHTML = '';}})
}

createDrake('function1','x^2','Math.pow(x,2)');
createDrake('function2','x+1','x+1');
createDrake('function5','x+1','1plusx',true);
createDrakeEmoji('function4','4+x');


function createDrakeComp(functionID){
	baseFunction = 'x^2';
	evalFunction = 'Math.pow(x,2)';
	insideFunction = '';
	compFunction = '';
	compExpFunction = '';
	compEvalFunction = '';
	document.getElementById(functionID+'Output').innerHTML = baseFunction;
	dragulaContainers = [document.getElementById(functionID+'Input'),document.getElementById(functionID+'Inputs')]

	var drake = dragula(dragulaContainers,{
		moves: function (el, source, handle, sibling) {
	    	return true; // elements are always draggable by default
	  },
	});
	drake.on('drop', function(el,target,source,sibling){
		if (source.id == functionID+'Inputs'){
			inputVar =el.innerHTML; 
			inputFn = el.getAttribute('name');
			insideFunction = el.innerHTML;
			document.getElementById(functionID+'Input').innerHTML = inputVar; 
			document.getElementById(functionID+'Output').innerHTML = baseFunction.replace(/x/g,'('+inputVar+')'); 
			compFunction = baseFunction.replace(/x/g,'('+inputVar+')'); 
			document.getElementById(functionID+'OutputComp').innerHTML = '='+baseFunction.replace(/x/g,'('+inputFn+')'); 
			compExpFunction = baseFunction.replace(/x/g,'('+inputFn+')');
			compEvalFunction = evalFunction.replace(/x/g,'('+inputFn+')');
			document.getElementById(functionID+'Eval').innerHTML = '';
		}
	})
	drake.on('over', function(el,container,source){inputVar =el.innerHTML; if (container.id==functionID+'Input'){container.innerHTML = '';}})

	dragulaCompContainers = [document.getElementById(functionID+'Input'),document.getElementById(functionID+'InputsComp')]

	var drakeComp = dragula(dragulaCompContainers,{
		moves: function (el, source, handle, sibling) {
	    	return true; // elements are always draggable by default
	  },
	});
	drakeComp.on('drop', function(el,target,source,sibling){
		if (source.id == functionID+'InputsComp'){
			inputValue =el.innerHTML; 
			
			document.getElementById(functionID+'Input').innerHTML = insideFunction.replace(/x/g,inputValue); 
			document.getElementById(functionID+'Output').innerHTML = compFunction.replace(/x/g,inputValue);
			document.getElementById(functionID+'OutputComp').innerHTML = '='+compExpFunction.replace(/x/g,inputValue);
			document.getElementById(functionID+'Eval').innerHTML = '='+eval(compEvalFunction.replace(/x/g,inputValue));

		}
	})

}

createDrakeComp('function3');
