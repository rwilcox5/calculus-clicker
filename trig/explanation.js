random0 = document.getElementById('random0');
randomQ = '';
var nCorrect = [0,0,0,0];
newRandom0(0);


function createProgressBar(width,height,percentGood){
	progressHTML = '<svg width="'+width.toString()+'" height="'+height.toString()+'"><rect width="'+width.toString()+'" height="'+height.toString()+'" style="fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)" />';
	progressHTML += '<rect width="'+(width*percentGood/100).toString()+'" height="'+height.toString()+'" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(255,0,0)" />';
	progressHTML += '</svg>';
	return progressHTML;
}
function newRandom0(ncID,answer=-1){
	if (randomQ !=''){
		if (answer==0 && randomQ=='sin(0)'){
			nCorrect[ncID]++;
		}
		else if (answer==1 && randomQ=='cos(0)'){
			nCorrect[ncID]++;
		}
		else {
			nCorrect[ncID]=0;
		}
	}
	if (Math.random()<.5){
		randomQ = 'sin(0)';
	}
	else {
		randomQ = 'cos(0)';
	}
	buttonHTML = '<br /><button onclick="newRandom0(0,0);">0</button><button onclick="newRandom0(0,1);">1</button><br />';
	
	random0.innerHTML = randomQ+buttonHTML+createProgressBar(200,15,nCorrect[ncID]*10);

	
}



createList('angleList',['0','pi/6','pi/4','pi/3','pi/2'],'angleProgress',1);

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

function checkOrder(theList,eID,orderedList,pID,ncID){
	allSorted = true;
	for (var i =0;i<theList.length;i++){
		if (theList[i][1]!=i){
			allSorted = false;
		}
	}
	if (allSorted){
		nCorrect[ncID]++;
		createList(eID,orderedList,pID,ncID);
	}
}

function createList(eID,orderedList,pID,ncID){
	document.getElementById(eID).innerHTML = '';
	document.getElementById(pID).innerHTML = createProgressBar(200,15,nCorrect[ncID]*10);
	theList = [];
	rand_array = getRandomArray(orderedList.length);
	for(var i=0; i<orderedList.length; i++){
		theList.push([orderedList[rand_array[i]],rand_array[i]]);
	}
	for (useri=0;useri<theList.length;useri++){
		document.getElementById(eID).innerHTML += '<li>'+theList[useri][0]+'</li>';
	}
	var el = document.getElementById(eID);
	var sortable = new Sortable(el, {
		onEnd: function (/**Event*/evt) {
				var oldName = theList[evt.oldIndex];
				theList.splice(evt.oldIndex,1);  // element's old index within old parent
				theList.splice(evt.newIndex,0,oldName);  // element's new index within new parent
				checkOrder(theList,eID,orderedList,pID,ncID);
			},
	});

}





function setClicker(block,spot,eID,matchArray,ncID){
	document.getElementById(eID+block.toString()+'-'+spot.toString()).addEventListener("click", function(){
		if (firstClick[eID][0]>-1){
			if (letters[eID][firstClick[eID][0]][firstClick[eID][1]][1]==letters[eID][block][spot][1]){
				document.getElementById(eID+block.toString()+'-'+spot.toString()).style.background = 'green';
				document.getElementById(eID+firstClick[eID][0].toString()+'-'+firstClick[eID][1].toString()).style.background = 'green';
				matched[eID].push(letters[eID][block][spot][1]);
				firstClick[eID] = [-1,-1];
				if (matched[eID].length==Math.floor(matchArray.length/2)){
					nCorrect[ncID]++;
					createMatching(eID,createMArray(ncID),ncID);
				}
			}
			else{
				document.getElementById(eID+block.toString()+'-'+spot.toString()).style.background = 'red';
				document.getElementById(eID+firstClick[eID][0].toString()+'-'+firstClick[eID][1].toString()).style.background = 'red';
				firstClick[eID] = [-1,-1];
			}
		}
		else{
			for (var i =0;i<nsize[eID];i++){
				for (var ii = 0; ii<nsize[eID];ii++){
					document.getElementById(eID+i.toString()+'-'+ii.toString()).style.background = 'white';
					for (var iii=0;iii<matched[eID].length;iii++){
						if (letters[eID][i][ii][1]==matched[eID][iii]){
							document.getElementById(eID+i.toString()+'-'+ii.toString()).style.background = 'green';
						}
					}
				}

			}
			firstClick[eID] = [block,spot];
			document.getElementById(eID+block.toString()+'-'+spot.toString()).style.background = 'yellow';
		}
	});
}


function createMArray(maID){
	if (maID==2){
		allValues = ['0','1/2','sqrt(2)/2','sqrt(3)/2','1'];
		allMatchQ = [['sin(0)','cos(pi/2)'],['sin(pi/6)','cos(pi/3)'],['sin(pi/4)','cos(pi/4)'],['sin(pi/3)','cos(pi/6)'],['sin(pi/2)','cos(0)']];
		matchArray = [];
		notIN = Math.floor(Math.random()*5);
		console.log(notIN);
		for (var i=0;i<5;i++){
			if (i!=notIN){
				matchArray.push([allValues[i],i]);
				matchArray.push([allMatchQ[i][Math.floor(Math.random()*2)],i]);
			}
			else{
				matchArray.push([allValues[i],i]);
			}
		}
	}
	else if (maID==3){
		allValues = ['0','1/2','sqrt(2)/2','sqrt(3)/2','1'];
		allMatchQ = [[1,2],[6,3],[4,4],[3,6],[2,1]];
		matchArray = [];
		notIN = Math.floor(Math.random()*5);
		console.log(notIN);
		for (var i=0;i<5;i++){
			if (i!=notIN){
				
				if (Math.floor(Math.random()*2)==0){
					if (Math.floor(Math.random()*2)==0){
						c = Math.floor(Math.random()*11-5);
						matchArray.push(['sin('+(c*allMatchQ[i][0]-1).toString()+'pi/'+allMatchQ[i][0].toString()+')',i]);
						if (c%2==1){
							matchArray.push([allValues[i],i]);
						}
						else{
							matchArray.push(['-'+allValues[i],i]);
						}
					}
					else{
						c = Math.floor(Math.random()*11-5);
						matchArray.push(['sin('+(c*allMatchQ[i][0]+1).toString()+'pi/'+allMatchQ[i][0].toString()+')',i]);
						if (c%2==0){
							matchArray.push([allValues[i],i]);
						}
						else{
							matchArray.push(['-'+allValues[i],i]);
						}
					}
				}
				else{
					if (Math.floor(Math.random()*2)==0){
						c = Math.floor(Math.random()*11-5);
						matchArray.push(['cos('+(c*allMatchQ[i][1]-1).toString()+'pi/'+allMatchQ[i][1].toString()+')',i]);
						if (c%2==0){
							matchArray.push([allValues[i],i]);
						}
						else{
							matchArray.push(['-'+allValues[i],i]);
						}
					}
					else{
						c = Math.floor(Math.random()*11-5);
						matchArray.push(['cos('+(c*allMatchQ[i][1]+1).toString()+'pi/'+allMatchQ[i][1].toString()+')',i]);
						if (c%2==0){
							matchArray.push([allValues[i],i]);
						}
						else{
							matchArray.push(['-'+allValues[i],i]);
						}
					}
				}
				
			}
			else{
				matchArray.push([allValues[i],i]);
			}
		}
	}
	return matchArray;
}

firstClick = {'first':[-1,-1],'second':[-1,-1]};
var nsize = {'first':3,'second':3};
var matched = {'first':[],'second':[]};
var letters = {'first':[],'second':[]};



createMatching('first',createMArray(2),2);
createMatching('second',createMArray(3),3);

function createMatching(eID,matchArray,ncID){
	firstClick[eID]=[-1,-1];
	nsize[eID]=3;
	matched[eID]=[];
	letters[eID]=[];
	document.getElementById('matching'+eID).innerHTML = '';
	sortThis = getRandomArray(nsize[eID]*nsize[eID]);
	for (i=0;i<nsize[eID];i++){
		letters[eID].push([]);
		for (ii=0;ii<nsize[eID];ii++){
			letters[eID][i].push(matchArray[sortThis[i*nsize[eID]+ii]]);
		}
	}

	var i =0; var ii= 0;
	for (i=0;i<nsize[eID];i++){
		for (ii=0;ii<nsize[eID];ii++){
			document.getElementById('matching'+eID).innerHTML +='<div class="white" id="'+eID+i.toString()+'-'+ii.toString()+'">'+letters[eID][i][ii][0]+'</div>';
		}
	}
	for (i=0;i<nsize[eID];i++){
		for (ii=0;ii<nsize[eID];ii++){
			setClicker(i,ii,eID,matchArray,ncID);
		}
	}
	document.getElementById('matchingP'+eID).innerHTML = createProgressBar(200,15,nCorrect[ncID]*10);
}


var rotationSnap = 90;
Draggable.create("#knob", {
    type:"rotation", //instead of "x,y" or "top,left", we can simply do "rotation" to make the object spinnable! 
//Keep track of number of times around the circle
   liveSnap:function(endValue) { 
        //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        angleNum = Math.round(endValue/15)*-1;

        if (angleNum%12==1 || angleNum%12==5 || angleNum%12==7 || angleNum%12==11 || angleNum%12==-1 || angleNum%12==-5 || angleNum%12==-7 || angleNum%12==-11){
        	if (endValue%30>15 || (endValue<0 && endValue%30>-15)){
        		angleNum -=1;
        	}
        	else{
        		angleNum +=1;
        	}
        }
        if (angleNum%12==2 || angleNum%12==10 || angleNum%12==-2 || angleNum%12==-10){
        	document.getElementById('knobInfo').innerHTML = (angleNum/2).toString()+'pi/6';
        }
        else if (angleNum%12==3 || angleNum%12==9 || angleNum%12==-3 || angleNum%12==-9){
        	document.getElementById('knobInfo').innerHTML = (angleNum/3).toString()+'pi/4';
        }
        else if (angleNum%12==4 || angleNum%12==8 || angleNum%12==-4 || angleNum%12==-8){
        	document.getElementById('knobInfo').innerHTML = (angleNum/4).toString()+'pi/3';
        }
        else if (angleNum%12==6 || angleNum%12==-6){
        	document.getElementById('knobInfo').innerHTML = (angleNum/6).toString()+'pi/2';
        }
        else if (angleNum%12==0){
        	document.getElementById('knobInfo').innerHTML = (angleNum/12).toString()+'pi';
        }

        
        endValue = endValue-Math.floor(endValue/360)*360;
        if (endValue%180<15){
        	return 0+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<37.5){
        	return 30+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<52.5){
        	return 45+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<75){
        	return 60+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<105){
        	return 90+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<127.5){
        	return 120+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<142.5){
        	return 135+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<165){
        	return 150+Math.floor(endValue/180)*180;
        }
        else if (endValue%180<180){
        	return 180+Math.floor(endValue/180)*180;
        }
        else {

        	return Math.round(endValue / rotationSnap) * rotationSnap;
    	}

    }
});


var gridWidth = 200;
var gridHeight = 200;
Draggable.create(".box", {
    type:"x,y",
    edgeResistance:0.65,
    bounds:"#tossContainer",
    liveSnap:false,
    onDragEnd: function(){
    	xq = Math.floor(this.x/gridWidth);
    	yq = Math.floor(this.y/gridHeight);
    	if (xq==1 && yq==0){
    		console.log('q1');
    	}
    	if (xq==0 && yq==0){
    		console.log('q2');
    	}
    	if (xq==0 && yq==1){
    		console.log('q3');
    	}
    	if (xq==1 && yq==1){
    		console.log('q4');
    	}
    }
});
