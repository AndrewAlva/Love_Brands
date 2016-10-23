window.onload = function(){
	Site.is_loading = false;
	$('#loader').addClass('lb_crystal');
	setTimeout(function(){$('#loader').addClass('lb_hide');},800);
}


$(document).ready(function() {
	Site.init();
	Story_Slider.init();
});



var initQuery = window.location.search;

var Site = {
	is_loading: true,

	loading_dots: [],

	init: function(){
		// if (initQuery == "") {
		// 	$('#yield').load('sections/team.html');
		// };

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

function removeVideo(){
	$('#videoWrapper').addClass('lb_crystal');
	setTimeout(function(){$('#videoWrapper').remove();},800);
}

var Story_Slider = {

	// Flag to prevent overlapping transitions between sections
	canScroll: true,

	// Set the array with all the screens to manipulate
	screens: [],

	// Set the slider main navigators objects
	navDots: [],

	// Declare current active section variable
	sectionActive: 0,

	// Duration of transition timing animations
	duration: 500,

	// Detect if background is black or white, 0 = black (OFF) and 1 = white (ON)
	background: 0,
	blackSlides: [0],
	whiteSlides: [1],

	// Hide the loading screen
	loaded: function(){
		
	},

	// Initiate function
	init: function(){
		// Init the array of section screens to slide
		Story_Slider.screens = $('#storySlider').find('.slides');
		// Init the array of main navigators
		Story_Slider.navDots = $('#storySlider').find('.sliderDots');

	},

	// Go prev section, only if there is a prev section to go
	prev: function(){
		var index = Story_Slider.sectionActive - 1;
		if (index < 0) {
			Story_Slider.goTo((Story_Slider.screens.length - 1));
		} else {
			Story_Slider.goTo(index);
		};
	},

	// Go next section, only if there is a next section to go
	next: function(){
		var index = Story_Slider.sectionActive + 1;
		if (index >= Story_Slider.screens.length) {
			Story_Slider.goTo(0);
		} else {
			Story_Slider.goTo(index);
		};
	},

	// Navigation function
	goTo: function(index){
		// Change of section only after any transition ends
		if (Story_Slider.canScroll && Story_Slider.sectionActive != index) {
			// Turn on the flag to prevent overlapping section transitions
			Story_Slider.canScroll = false;

			// Set the new background state
			if (Story_Slider.blackSlides.indexOf(index) != -1 ) {
				$('#storySlider').removeClass('whiteSlide');
				$('#storySlider').addClass('blackSlide');

			} else if (Story_Slider.whiteSlides.indexOf(index) != -1 ){
				$('#storySlider').removeClass('blackSlide');
				$('#storySlider').addClass('whiteSlide');
			};

			// Set the new header navigator style
			$('#mbrtWrap').removeClass('storyYield-' + Story_Slider.sectionActive);
			$('#mbrtWrap').addClass('storyYield-' + index);

			// Declare variables to define the direction of the animations
			var currentSectionMove;
			var newSectionMove;
			// Detect if user is going to the Next or prev section, 
			// sectionActive < index means Next
			if (Story_Slider.sectionActive < index){
				currentSectionMove = 'left';
				newSectionMove = 'right';
			} else if (Story_Slider.sectionActive > index){
				currentSectionMove = 'right';
				newSectionMove = 'left';
			};

			// Move the current section outside the space
			$('#storySlide-' + Story_Slider.sectionActive).addClass(currentSectionMove);
			// Set the new section in position to enter
			$('#storySlide-' + index).addClass(newSectionMove);
			$('#storySlide-' + index).addClass('activeSlide');

			// Update active right nav bar
			Story_Slider.setNavDots(index);

			// Make a tiny pause(100ms) until the new section is in position
			setTimeout(function(){
				// Move the new section to show it
				$('#storySlide-' + index).removeClass(newSectionMove);
				// Wait untill the new section is in position, 
				// then disappear the old current section, 
				// update the sectionActive var and 
				// turn on the 'canScroll' flag again
				setTimeout(function(){
					$('#storySlide-' + Story_Slider.sectionActive).removeClass('activeSlide');
					$('#storySlide-' + Story_Slider.sectionActive).removeClass(currentSectionMove);
					

					Story_Slider.setStates(index);
					Story_Slider.canScroll = true;

				}, (Story_Slider.duration));

			},100);

		};
	},

	// Update ['sectionActive var', 'URL search value'] 
	// according to goTo() function
	setStates: function(index){
		Story_Slider.sectionActive = index;
	},

	setNavDots: function(index){
		$(Story_Slider.navDots[Story_Slider.sectionActive]).removeClass('active');
		$(Story_Slider.navDots[index]).addClass('active');
	}
}

//// STORY SLIDER INTERACTION

	$('#storyWrapper').on('click', '.mbrt-previous', function(event) {
		event.preventDefault();
		Story_Slider.prev();
	});
	$('#storyWrapper').on('click', '.mbrt-next', function(event) {
		event.preventDefault();
		Story_Slider.next();
	});


	// THIS LISTENER WILL BE WORKING ON '.NAV BAR' ELEMENTS
	$('#storyWrapper').on('click', '.sliderDots', function(event) {
		event.preventDefault();
		Story_Slider.goTo($(this).data('slidetogo'));
	});








