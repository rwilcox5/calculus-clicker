userRank = [];
for (useri=0;useri<5;useri++){
	userRank.push(useri.toString());
}
for (useri=0;useri<userRank.length;useri++){
	document.getElementById('limitList').innerHTML += '<li>'+userRank[useri]+'</li>';
}



var el = document.getElementById('limitList');
var sortable = new Sortable(el, {
	onEnd: function (/**Event*/evt) {
			var oldName = userRank[evt.oldIndex];
			userRank.splice(evt.oldIndex,1);  // element's old index within old parent
			userRank.splice(evt.newIndex,0,oldName);  // element's new index within new parent
			console.log(userRank);
		},
		});