random0 = document.getElementById('infiniteInput');
randomQ = '';
newRandom0();
function newRandom0(answer=false){
	if (randomQ !=''){
		if (answer){
			console.log('Yes!');
		}
		else {
			console.log('No!');
		}
	}
	buttonHTML = '';
	if (Math.random()<.5){
		randomQ = '\lim_{x->3}^{f(x)}';
		buttonHTML = '<br /><button onclick="newRandom0(true);">Input approaches finite value</button><button onclick="newRandom0(false);">Input approaches infinite value</button>';
	}
	else {
		randomQ = '\lim_{x->\inf}^{f(x)}';
		buttonHTML = '<br /><button onclick="newRandom0(false);">Input approaches finite value</button><button onclick="newRandom0(true);">Input approaches infinite value</button>';
	}
	random0.innerHTML = randomQ+buttonHTML;
}

random1 = document.getElementById('finiteOutput');
randomQ1 = '';
newRandom1();
function newRandom1(answer=false){
	if (randomQ1 !=''){
		if (answer){
			console.log('Yes!');
		}
		else {
			console.log('No!');
		}
	}
	buttonHTML = '';
	if (Math.random()<.333){
		randomQ1 = '\lim_{x->3}^{x^3}';
		buttonHTML = '<br /><button onclick="newRandom1(true);">Approaches Number</button><button onclick="newRandom1(false);">Approaches Number/0</button><button onclick="newRandom1(false);">Indeterminite</button>';
	}
	else if (Math.random()<.5) {
		randomQ1 = '\lim_{x->3}^{3/(x-3)}';
		buttonHTML = '<br /><button onclick="newRandom1(false);">Approaches Number</button><button onclick="newRandom1(true);">Approaches Number/0</button><button onclick="newRandom1(false);">Indeterminite</button>';
	}
	else {
		randomQ1 = '\lim_{x->3}^{(x^2-9)/(x-3)}';
		buttonHTML = '<br /><button onclick="newRandom1(false);">Approaches Number</button><button onclick="newRandom1(false);">Approaches Number/0</button><button onclick="newRandom1(true);">Indeterminite</button>';
	}
	random1.innerHTML = randomQ1+buttonHTML;
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
