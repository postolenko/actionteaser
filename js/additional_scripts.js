(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

		$(".scroll-x").mCustomScrollbar({
			axis:"x"
		});

	});

	$(document).ready(function() {		

		$("select").each(function() {

			$(this).select2({
				minimumResultsForSearch: Infinity
			});

		});

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

		if( $(".selectareaimg-popup").length > 0 ) { 

			$('img#photo').imgAreaSelect({
		        handles: true,
		        onSelectStart: function () {
		        	$(".img-size").addClass("active");
		        },
				onSelectChange: function (img, selection) {
					$("#img_width").text(selection.width);
					$("#img_height").text(selection.height);
					console.log('width: ' + selection.width + '; height: ' + selection.height);
				}
		    });

		}

		if($(".copy_code").length > 0) {

			new Clipboard('.copy_code');

		}
		
		
	});

})(jQuery);

