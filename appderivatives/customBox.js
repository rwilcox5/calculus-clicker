var volumeBox = 87500;
var lengthBoxInitial = 50;
var heightBoxInitial = 50;
var widthBoxInitial = 35;
var lwConstraint = .7;

function myCost(length,width,height){
	return length*width*2+length*height*2+width*height*2;
}