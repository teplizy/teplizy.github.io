$(document).ready(function() {
	// "use strict";
	
	var scrollSpeed = 1000;

	//stickey header
	$(window).scroll(function() {
		var windscroll = $(window).scrollTop();
		if (windscroll >= 100) {
			$('#warp .section').each(function(i) {
				if ($(this).position().top <= windscroll + 150) {
					$('.navbar-nav li.active').removeClass('active');
					$('.navbar-nav li').eq(i).addClass('active');
				}
			});
		} else {
			$('.navbar-nav').removeClass('');
			$('.navbar-nav li.active').removeClass('active');
			$('.navbar-nav li:first').addClass('active');
		}
	}).scroll();

	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();	
		if (scroll >= 40) {
			$(".subMenu").addClass("smallheader");
		}
		else {
			$(".subMenu").removeClass("smallheader");
		}

		$('.skillbar').each(function(){
			$(this).find('.skillbar-bar').animate({
				width: $(this).attr('data-percent')
			},6000);
		});
	});

	$("img.lazy").lazyload();

	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('#banner').parallax("50%", 0.3);
	$('#intro').parallax("50%", 0.3);
	$('#second').parallax("65%", 0.3);
	$('.bg').parallax("50%", 0.4);
	$('#third').parallax("60%", 0.0);

	// cache container
	var container = $('div[id*=portfolio-items-wrap]');
	var container_other = $('div[id*=items-wrap]');

	container.isotope({
	    animationEngine: 'best-available',
	    animationOptions: {
	        duration: 200,
	        queue: false
	    },
	    layoutMode: 'fitRows'
	});

	container_other.isotope({
	    animationEngine: 'best-available',
	    animationOptions: {
	        duration: 200,
	        queue: false
	    },
	    layoutMode: 'fitRows'
	});

	$('#filters a').click(function () {
	    $('#filters a').removeClass('active');
	    $(this).addClass('active');
	    var selector = $(this).attr('data-filter');
	    container.isotope({
	        filter: selector
	    });
	    setProjects();
	    return false;
	});

	function columnsWidth() {
	    var winWidth = $(window).width(),
	        columns = 1;

	    if (winWidth > 1200) {
	        columns = 4;
	    } else if (winWidth > 900) {
	        columns = 4;
	    } else if (winWidth > 600) {
	        columns = 3;
	    } else if (winWidth > 300) {
	        columns = 1;
	    }

	    return columns;
	}

	function setColumns() {
	    var winWidth = $(window).width(),
	        columns = columnsWidth(),
	        postWidth = Math.floor(winWidth / columns);

	    container.find('.portfolio-item').each(function () {
	        $(this).css({
	            width: postWidth + 'px'
	        });
	    });
	    container_other.find('.portfolio-item').each(function () {
	        $(this).css({
	            width: postWidth + 'px'
	        });
	    });
	}

	function setProjects() {
	    setColumns();
	    container.isotope('layout');
	    container_other.isotope('layout');
	}

	container.imagesLoaded(function () {
	    setColumns();
	});
	container_other.imagesLoaded(function () {
	    setColumns();
	});

	$(window).bind('resize', function () {
	    setProjects();
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.animate').appear();
	$(document.body).on('appear', '.animate', function(e, $affected) {
		var fadeDelayAttr;
		var fadeDelay;
		$(this).each(function(){
			if ($(this).data("delay")) {
				fadeDelayAttr = $(this).data("delay")
				fadeDelay = fadeDelayAttr;				
			} else {
				fadeDelay = 0;
			}			
			$(this).delay(fadeDelay).queue(function(){
				$(this).addClass('animated').clearQueue();
			});			
		});			
	});

	//navigation menu on mobile hide
	$(".navbar-default .navbar-nav > li > a").click(function(){
		$(".navbar-collapse").removeClass('in');
	});

	$('.subMenu').smint({ 'scrollSpeed': scrollSpeed });
	$('.carousel').carousel({ interval: 2000 });

	$('ul.da-thumbs > li').hoverdir();

	$("#submit_btn").click(function() { 
		//get input field values
		var user_name       = $('input[name=name]').val(); 
		var user_email      = $('input[name=email]').val();
		var user_message    = $('textarea[name=message]').val();

		//simple validation at client's end
		//we simply change border color to red if empty field using .css()
		var proceed = true;
		if (user_name=="") { 
			$('input[name=name]').css('border-color','red'); 
			proceed = false;
		}
		if (user_email=="") { 
			$('input[name=email]').css('border-color','red'); 
			proceed = false;
		}
		if (user_message=="") {  
			$('textarea[name=message]').css('border-color','red'); 
			proceed = false;
		}

		//everything looks good! proceed...
		if (proceed) {
			yaCounter35936910.reachGoal('write_f');

			//data to be sent to server
			post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};

			//Ajax post data to server
            $.ajax({
                type: "POST",
                url: 'https://api.teplizy-irkutska.ru/',
                crossDomain: false,
                data: post_data,
				dataType: 'json',
                success: function(response) {
                    if (response.type == 'error') {
                        output = '<div class="error">'+response.text+'</div>';
                    } else {
                        output = '<div class="success">'+response.text+'</div>';
                        $('#contact_form input').val('');
                        $('#contact_form textarea').val('');
                    }
                    $('#result').hide().html(output).slideDown();
                }
            });
		}
	});

	$("#contact_form input, #contact_form textarea").keyup(function() { 
	    $("#contact_form input, #contact_form textarea").css('border-color',''); 
	    $("#result").slideUp();
	});

	$('.fancybox').fancybox({
		width 	 : 960,
		minWidth : 960,
		maxWidth : 960
	});

	$('.tel').fancybox({
		scrolling   : 'no'
	});

	$('.map-address').fancybox({
		maxWidth    : 640,
		maxHeight   : 400,
		fitToView   : false,
		width       : '70%',
		height      : '70%',
		autoSize    : false,
		closeClick  : false,
		openEffect  : 'none',
		closeEffect : 'none',
		scrolling   : 'no'
	});
	
	$('#demo1').skdslider({'delay':10000, 'animationSpeed': 1000,'showNextPrev':true,'showPlayButton':true,'autoSlide':true,'animationType':'sliding'});

	$('body').queryLoader2({
		barColor: '#aecb06',
		backgroundColor: '#676767',
		barHeight: 3,
		percentage: true
	});

	if (screen.width < 720 ){
		$('div, img, input, textarea, button, a').removeClass('animate'); // to remove transition
	}

	$('#inputPhone').inputmask({
		mask: '+7 (999) 999-99-99',
		oncomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-error')) {
				formGroup.removeClass('has-error');
			}
			formGroup.addClass('has-success');
		},
		onincomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-success')) {
				formGroup.addClass('has-success');
			}
			formGroup.addClass('has-error');
		}
	});

	$('#inputEmail').inputmask({
		alias: "email",
		oncomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-error')) {
				formGroup.removeClass('has-error');
			}
			formGroup.addClass('has-success');
		},
		onincomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-success')) {
				formGroup.addClass('has-success');
			}
			formGroup.addClass('has-error');
		}
	});

	$('#inputName, #inputSuname, #inputMidname').inputmask({
		mask: 'ft{1,50}',
		greedy: false,
		definitions: {
			'f': {
				validator: "[А-Яа-яЁё]",
				cardinality: 1
			},
			't': {
				validator: "[А-Яа-яЁё \-()]",
				cardinality: 1
			}
		},
		oncomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-error')) {
				formGroup.removeClass('has-error');
			}
			formGroup.addClass('has-success');
		},
		onincomplete: function () {
			var formGroup = $(this).parent().parent();
			if (formGroup.hasClass('has-success')) {
				formGroup.addClass('has-success');
			}
			formGroup.addClass('has-error');
		}
	}).on('input', function () {
		var userName = $(this).val();
		userName = userName.replace(/[А-Яа-яЁё]\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		});
		$(this).val(userName);
	});

	$('#cuponForm input').keyup(function () {
		var empty = false;
		$('#cuponForm input').each(function () {
			if ($(this).val() == '') {
				empty = true;
			}
		});
		if (empty) {
			$("#cuponForm").find('button').attr('disabled', 'disabled');
		} else {
			$("#cuponForm").find('button').removeAttr('disabled');
		}
	});

	$('.goto').click(function (e) {
		$.fancybox.close();
		var selectorHeight = $('.smint').height();
		var id = $(this).attr('id');
		var goTo =  $('div.'+ id).offset().top -selectorHeight;
		$("html, body").animate({ scrollTop: goTo }, scrollSpeed);
		e.preventDefault();
	});

	/* News trimming */
	var pressroom = $('.pressroom .container .row'),
		news_title = pressroom.find('div[class*=com-sec] span.title a'),
		press_img = pressroom.find('div[class*=com-sec] div.press-img a'),
		right_text = pressroom.find('div[class*=com-sec] div.right-text p'),
		left_text = pressroom.find('div[class*=com-sec] div.left-text p');
	right_text.each(function () {
		console.log('Right text length: ' + right_text.text().length);
	});
	left_text.each(function () {
		console.log('Left text length: ' + left_text.text().length);
	});
});