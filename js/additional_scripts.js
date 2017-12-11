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


		// $(".select-date").select2({
		// 	minimumResultsForSearch: Infinity,
		// 	templateResult: formatOption,
		// 	templateSelection: formatOption
		// });

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

		// --- Календарь  ----

		$('.datepicker-here').data({inline: false});
		$('.datepicker-here.inline-datepicker').data({inline: true});

		$('.form-control').datepicker({
			language: "ru",
			todayHighlight: true,
			format: "dd/mm"
		});

		// ------------------

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

			var image = document.getElementById('photo');
			var cropper = new Cropper(image);

		}

		if($(".copy_code").length > 0) {

			new Clipboard('.copy_code');

		}

		// ----------------------------

		var topCoord;
		var leftCoord;
		var chartParent;
		var chartName;
		var chartTooltip;


		if($(".ct-chart").length > 0) {

			var chartBarName;
			var valAttrSal;
			var valAttrImp;
			// var chartParent;
			// var chartName;
			// var chartTooltip;
			var chartLineParent;
			var chartLineIndex;
			// var topCoord;
			// var leftCoord;

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

				chartLineIndex = 0;

				$(".statistic-chart .ct-label.ct-horizontal").each(function() {

					$(this).attr("data-index", chartLineIndex);

					chartLineIndex++;

				});

				$( ".statistic-chart .ct-series line" ).bind({
					mouseenter: function() {
						chartName = $(this).closest(".ct-chart").attr("data-chart");
						chartTooltip = $(".chart-tooltip[data-chart-tooltip = '" + chartName + "']");

						chartTooltip.attr("style" , "display: inline-block;");

						topCoord = $(this).offset().top - chartTooltip.outerHeight();

						leftCoord = $(this).offset().left - chartTooltip.width() / 2;

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

		if($(".chart-line").length > 0) {
			var parentBlock;
			var seriesVals;
			var seriesArr;
			var seriesArrs;

			$(".chart-line").each(function() {

				seriesArr = [];

				parentBlock = $(this).closest(".chart-line_wrapp");

				seriesVals = parentBlock.find(".series");

				for (var index = 0; index < seriesVals.length; index++) {

					seriesArr[index] = seriesVals.eq(index).text().split(', ');

					for (var index2 = 0; index2 < seriesArr[index].length; index2++) {

					  seriesArr[index][index2] = parseInt(seriesArr[index][index2]);

					}

				};

				new Chartist.Line(this, {
					
				  labels: false,
				  fullWidth: true,
				  series: [
				    seriesArr[0],
				    seriesArr[1]
				  ]
				}, {
				  chartPadding: {
				    left: -30
				  }
				},{
					axisY: {
					    offset: 0
					  }
				}, {
				  axisX: {
				  	offset: 0
				  }

				});

			});


			$(".chart-line").click(function() {

				parentBlock = $(this).closest(".chart-line_wrapp");

				labelsVals = parentBlock.find(".labels");

				labelsArr = labelsVals.text().split(', ');

				seriesArr = [];

				parentBlock = $(this).closest(".chart-line_wrapp");

				seriesVals = parentBlock.find(".series");

				for (var index = 0; index < seriesVals.length; index++) {

					seriesArr[index] = seriesVals.eq(index).text().split(', ');

					for (var index2 = 0; index2 < seriesArr[index].length; index2++) {

					  seriesArr[index][index2] = parseInt(seriesArr[index][index2]);

					}

				};

				$("[data-popup-name = 'popup_12'").animate({
					"opacity" : 1
				});

				$("[data-popup-name = 'popup_12'").css({
					"z-index" : 10
				});

				var char_popup = new Chartist.Line(".chart_3", {
					  type: 'line',
					  labels: labelsArr,
					  series: [
					    seriesArr[0],
					    seriesArr[1]
					  ]
					});

				char_popup.on('created', function(data) {

					$(".chart_3 .ct-series").each(function() {

						chartLineIndex = 0;

						$(this).find("line").each(function() {						

							$(this).attr("data-index", chartLineIndex);

							chartLineIndex++;

						});

					});

					chartLineIndex = 0;

					$(".chart_3 .ct-label.ct-horizontal").each(function() {

						$(this).attr("data-index", chartLineIndex);

						chartLineIndex++;

					});

					$( ".chart_3 .ct-series line" ).bind({
						mouseenter: function() {
							chartParent = $(this).closest(".chart_3");
							chartName = chartParent.attr("data-chart");
							chartTooltip = $(".chart-tooltip[data-chart-tooltip = '" + chartName + "']");

							chartTooltip.attr("style" , "display: inline-block;");

							topCoord = $(this).offset().top - chartTooltip.outerHeight(true) - 10;

							leftCoord = $(this).offset().left - chartTooltip.width() / 2;

							chartTooltip.offset({top : topCoord, left : leftCoord});							

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
						}
					});

				});

				popupBox = $(".charts-popup");
				
				if( popupBox.height() < $(window).height() ) {

	                popupBox.css({
	                    "margin-top" : ( $(window).height() - popupBox.height() ) / 2 + "px"
	                });

	            }

			});

		}

	});

})(jQuery);

