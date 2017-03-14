"use strict";

// ACCORDION
$('.accordion-heading').click(function() {
	$(this).parent().toggleClass('accordion-item-active');
});