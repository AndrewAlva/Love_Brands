window.onload = function(){
	Site.is_loading = false;
	$('#loader').addClass('lb_crystal');
	setTimeout(function(){$('#loader').addClass('lb_hide');},800);
}


$(document).ready(function() {
	Site.init();
});



var initQuery = window.location.search;

var Site = {
	is_loading: true,

	loading_dots: [],

	init: function(){
		if (initQuery == "") {
			$('#yield').load('sections/team.html');
		};

		Site.loading_dots = $('.isoDots');
		Site.loading(0);
	},

	loading: function(dotCount){
		var interval = 700;
		if (Site.is_loading) {
			if (dotCount < Site.loading_dots.length){
				$('#dot-'+ dotCount).removeClass('active');
				dotCount += 1;
				$('#dot-'+ dotCount).addClass('active');


				if(dotCount == Site.loading_dots.length){
					dotCount = 0;
					$('.isoDots').removeClass('active');
					$('#dot-' + dotCount).addClass('active');
				};

				setTimeout(function(){
					Site.loading(dotCount);
				}, interval);

			};
		};
	}
}
