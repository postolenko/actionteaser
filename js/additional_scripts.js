(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

	});

	$(document).ready(function() {

		$("select").select2();

		$("input.color").ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val("#" + hex);
				$(el).attr("style", "background-color: #" + hex +"; border-color: #" + hex);
				$(el).ColorPickerHide();
			}
		});
		
	});

})(jQuery);

