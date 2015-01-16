jQuery(document).ready(function(){
	$objWindow = $(window);
	$('div[data-type="background"]').each(function(){
		var $bgObj = $(this);
		$(window).scroll(function() {
			var yPos = -($objWindow.scrollTop() / $bgObj.data('speed'));

			var coords = '100% '+ yPos + 'px';
            // Animate the background
			 $bgObj.css({ backgroundPosition: coords });

		});

	});
});