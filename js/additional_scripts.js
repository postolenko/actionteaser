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


		$(".select-date").select2({
			minimumResultsForSearch: Infinity,
			templateResult: formatOption,
			templateSelection: formatOption
		});

		function formatOption (opt) {

			if (!opt.id) { return opt.text; }

				var optimage = $(opt.element).attr('data-img-url');

				if(!optimage) {

					return opt.text;

				} else {

				var $opt = $(
					'<span class="select-tmpl"> \
					<span class="col col-1"> \
					<span class="img-box"><img src="'+ optimage +'"></span> \
					</span>\
					<span class="col-2">  ' + opt.text + '</span>\
					</span>'
				);

				return $opt;

			}

		};

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


		if($(".ct-chart").length > 0) {

			var chartBarName;
			var valAttrSal;
			var valAttrImp;
			var chartParent;
			var chartName;
			var chartTooltip;
			var chartLineParent;
			var chartLineIndex;

			var chart = new Chartist.Bar('.ct-chart', {
			  labels: ['RU', 'UA', 'KZ', 'US', 'AZ', 'BY', 'CH', 'Остальные'],
			  series: [
			  	[3000, 4000, 3000, 8000, 3000, 5000, 3000, 9000],
			    [13400, 12400, 13400, 13400, 13400, 11400, 10400, 10000]
			  ]
			},{
			 	seriesBarDistance: 50
			},{
				axisY: {
				    offset:  30
				  }
			});

			chart.on('draw', function(data) {

				$(".statistic-chart").find(".ct-vertical").eq(0).css({
					"opacity" : 1
				});				

				$(".statistic-chart").find(".ct-horizontal").eq(0).css({
					"opacity" : 1
				});

				$(".statistic-chart .ct-series").each(function() {

					chartLineIndex = 0;

					$(this).find("line").each(function() {						

						$(this).attr("data-index", chartLineIndex);

						chartLineIndex++;

					});

				});

				$(".statistic-chart .ct-series").each(function() {

					chartLineIndex = 0;

					$(this).find("line").each(function() {						

						$(this).attr("data-index", chartLineIndex);

						chartLineIndex++;

					});

				});

				chartLineIndex = 0;

				$(".statistic-chart .ct-label.ct-horizontal").each(function() {

					$(this).attr("data-index", chartLineIndex);

					chartLineIndex++;

				});

				$( ".statistic-chart line" ).bind({
					mouseenter: function() {
						chartName = $(this).closest(".ct-chart").attr("data-chart");
						chartTooltip = $(".chart-tooltip[data-chart-tooltip = '" + chartName + "']");

						chartTooltip.attr("style" , "display: block;");

						var topCoord = $(this).offset().top - chartTooltip.outerHeight();

						var leftCoord = $(this).offset().left - chartTooltip.width() / 2;

						chartTooltip.offset({top : topCoord, left : leftCoord});

						chartParent = $(this).closest(".statistic-chart");

						chartLineIndex = $(this).attr("data-index");

						chartBarName = chartParent.find(".ct-label.ct-horizontal[data-index = '" + chartLineIndex + "']").text();

						valAttrSal = chartParent.find(".ct-series-a line[data-index = '" + chartLineIndex + "']").attr("ct:value");

						valAttrImp = chartParent.find(".ct-series-b line[data-index = '" + chartLineIndex + "']").attr("ct:value");

						chartTooltip.find(".cht-title").text(chartBarName);
						chartTooltip.find(".salval").text(valAttrSal);
						chartTooltip.find(".impval").text(valAttrImp);
					},
					mouseleave: function() {
						chartTooltip.attr("style" , "display: none;");

						chartTooltip.offset({top : topCoord, left : leftCoord});
					}
				});

			});

		}		
		
	});

})(jQuery);

