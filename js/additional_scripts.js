(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

	});

	$(document).ready(function() {

		$("select").select2();

		var inputColorAttr;

		$("input.color").ColorPicker({
			onShow : function(hsb, hex, rgb, el) {
				inputColorAttr = $(this).attr("data-input-color");
			},
			onChange: function(hsb, hex, rgb, el) {
				$("input[data-input-color = '"+inputColorAttr+"']").val("#" + hex);
				$("input[data-input-color = '"+inputColorAttr+"']").attr("style", "background-color: #" + hex +"; border-color: #" + hex);
			},onSubmit: function(hsb, hex, rgb, el) {
				$(el).ColorPickerHide();
			}
		});
		
	});

})(jQuery);

