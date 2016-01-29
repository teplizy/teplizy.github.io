(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

	$.fn.countTo.defaults = {
		from: 0,  // the number the element should start at
		to: 100,  // the number the element should end at
		speed: 1000,  // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,  // the number of decimal places to show
		onUpdate: null,  // callback method for every time the element is updated,
		onComplete: null,  // callback method for when the element finishes updating
	};
})(jQuery);
		
jQuery(function($) {
	$('#counters').waypoint(function(direction) {
		var startTime = new Date(2015, 1, 12);
		var today = new Date();
		var month = today.getMonth(),
			k1, k2;
		switch(month) {
			case (0):
			case (1):
				k1 = 3;
				k2 = 3500;
				break;
			case (2):
				k1 = 8;
				k2 = 3500;
				break;
			case (3):
			case (4):
				k1 = 15;
				k2 = 3500;
				break;
			case (5):
				k1 = 8;
				k2 = 2000;
				break;
			case (6):
			case (7):
				k1 = 3;
				k2 = 2000;
				break;
			case (8):
				k1 = 8;
				k2 = 2000;
				break;
			case (9):
			case (10):
				k1 = 10;
				k2 = 2000;
				break;
			case (11):
				k1 = 1;
				k2 = 2000;
				break;
		}
		var diffDays = ((today.getTime() - startTime.getTime()) / (1000*60*60*24));
		$('.timer1').countTo({
			from: 0,
			to: 15800 + (diffDays * k1),
			speed: 1000,
			refreshInterval: 50
		});
		$('.timer2').countTo({
			visible: true,
			from: 0,
			to: 8000 + (diffDays * k1),
			speed: 1000,
			refreshInterval: 50
		});
		$('.timer3').countTo({
			from: 0,
			to: 1900000 + (diffDays * k2),
			speed: 1000,
			refreshInterval: 50
		});
		
		}, {
		offset: function() {
			return $.waypoints('viewportHeight') - $(this).height() + 100;
		}
	});
});(jQuery);
