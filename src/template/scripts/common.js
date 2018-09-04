$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');


	var photosItem = $('.photos__item'),
			photosList = $('.photos__list'),
			photosListWrap = $('.photos__list-wrap');

	$(window).on('load resize', function(event) {
		var windowWidth = $(window).width(),
			photosListWidth = 0;

		photosItem.each(function(index, el) {
			var photosItemWidth = $(this).width();

			photosListWidth += photosItemWidth;
		});	

		photosListWrap.width(photosListWidth);

	});


	photosList.perfectScrollbar();


	var reviews = $('.reviews__list');


	reviews.slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: true,
		arrows: false,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]

	})


	var panel = $('.panel'),
			panelClass = 'panel_toggle';


	$(window).on('load scroll', function(event) {
		var windowTop = $(window).scrollTop(),
				panelTop = panel.offset().top;

		if (windowTop > 0) {
			panel.addClass(panelClass);
		} else{
			panel.removeClass(panelClass);
		}
	});


	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function getTimeRemaining(endtime) {
  	var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor((t / 1000) % 60);
	  var minutes = Math.floor((t / 1000 / 60) % 60);
	  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	  var days = Math.floor(t / (1000 * 60 * 60 * 24));

	  return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}


	function initializeClock(id, endtime) {
	  var clock = $('.'+id);
	  var minutesSpan = $('.minutes');
	  var secondsSpan = $('.seconds');

	  function updateClock() {
	    var t = getTimeRemaining(endtime);
	    minutesSpan.html(('0' + t.minutes).slice(-2));
	    secondsSpan.html(('0' + t.seconds).slice(-2));
	    if (t.total <= 0) {
	      clearInterval(timeinterval);
	      minutesSpan.html(('00').slice(-2));
	      secondsSpan.html(('00').slice(-2));
				$('.popup__desc-false').show();
				$('.popup__desc-true').hide();
			} else{
				$('.popup__desc-true').show();
				$('.popup__desc-false').hide();
			}
			console.log(getCookie('deadline'));
	  }

	  updateClock();
	  var timeinterval = setInterval(updateClock, 1000);

	}
	var deadline;
	if (getCookie('deadline')) {
		deadline = getCookie('deadline');
	} else {
		deadline = new Date(Date.parse(new Date()) + (1000 * 60 * 5));
	}
	
	document.cookie = 'deadline=' + deadline;
	initializeClock('share__counts', deadline);

	$(".panel__nav a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top - 100 +"px"}, 1500);
    return false;
	});
});
