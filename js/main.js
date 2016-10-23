$(document).ready(function() {
	Site.init();
});

var initQuery = window.location.search;

var Site = {
	init: function(){
		if (initQuery == "") {
			$('#yield').load('sections/contact.html');
		};
	}
}
