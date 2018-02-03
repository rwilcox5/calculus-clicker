solutionSteps = [];
allSolutions = ['x+3=2*x','x+3-2*x=0','x-2*x=3','-x=3','x=-3'];

function getRandomArray(arrayLen){
	this_array = [];
	rand_array = [];
	for (var i =0; i<arrayLen;i++){
		this_array.push(i);
	}
	for(var i = 0;i<arrayLen;i++){
		randX = Math.floor(Math.random() * (arrayLen-i));
		rand_array.push(this_array[randX]);
		this_array.splice(randX,1);
		
	}
	return rand_array;
}

function checkOrder(){
	allSorted = true;
	for (var i =0;i<solutionSteps.length;i++){
		if (solutionSteps[i][1]!=i){
			allSorted = false;
		}
	}
	if (allSorted){
		console.log('Correct!');
	}
}
rand_array = getRandomArray(allSolutions.length);
for(var i=0; i<allSolutions.length;i++){
	solutionSteps.push([allSolutions[rand_array[i]],rand_array[i]]);
}

for (useri=0;useri<solutionSteps.length;useri++){
	document.getElementById('solutionList').innerHTML += '<li>'+solutionSteps[useri][0]+'</li>';
}

var el = document.getElementById('solutionList');
var sortable = new Sortable(el, {
	onEnd: function (/**Event*/evt) {
			var oldName = solutionSteps[evt.oldIndex];
			solutionSteps.splice(evt.oldIndex,1);  // element's old index within old parent
			solutionSteps.splice(evt.newIndex,0,oldName);  // element's new index within new parent
			checkOrder();
		},
});