$(window).load(function() {

    // ----------------------------

    $(".menu-dropdown-item").each(function() {

        if( $(this).hasClass("active") ) {

            $(this).find(".menu-dropdown").css({
                "display" : "block"
            });

        } else {

            $(this).find(".menu-dropdown").css({
                "display" : "none"
            });

        }

    });

    $(".sidebar").css({
        "min-height" : $(".content").height() + "px"
    });

    // ----------------------------

});

$(document).ready(function() {

    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

    // ----------------------------

    var parentBLock;
    var dropdownAttr;
    var dropdownBlock;
    var rightDropdownCoord;
    var wrapperRightCoord;

    // ----------------------------

    getRespParams();

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        // -------------------------

        $("#fullH").css({
            "height" : "auto"
        });

        // -------------------------

        $("#sidebar").css({
            "min-height" : "auto"
        });

        $("#sidebar").css({
            "min-height" : $(".content").height() + "px"
        });

        // -------------------------

    });


    $(function() {

        // var parentBLock;
        // var dropdownAttr;
        // var dropdownBlock;

        // var TOP_DROPDOWNMENU_COORD = 50;

        $(".dropdown-link").click(function(e) {

            e.preventDefault();

            // parentBLock = $(this).closest(".dropdown-block-wrapp");

            // dropdownAttr = $(this).attr("data-dropdown-link");

            // dropdownBlock = parentBLock.find(".dropdown-block[data-dropdown-block = '"+ dropdownAttr +"']");

            // if(dropdownBlock.is(":visible")) {

            //     dropdownBlock.fadeOut(200);

            //     $(this).removeClass("active");

            // } else {

            //     dropdownBlock.fadeIn(200);

            //     $(this).addClass("active");

            //     rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

            //     wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();

            //     if( rightDropdownCoord > wrapperRightCoord) {

            //         dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

            //     }

            // }

        });


        $(".dropdown-block-wrapp").hover(function() {

            dropdownBlock = $(this).find(".dropdown-block");

            rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

            wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();

            if( rightDropdownCoord > wrapperRightCoord) {

                dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

            }

        });


        $(this).keydown(function(eventObject){

            if (eventObject.which == 27) {

                $(".dropdown-block").each(function() {

                    dropdownAttr = $(this).attr("data-dropdown-block");

                    if ( $(this).is(":visible") ) {

                        $(this).fadeOut(200);

                        $(".dropdown-link[data-dropdown-link = '" + dropdownAttr + "']").removeClass("active");
                    }
                    
                });

                if( $("#sidebar").hasClass("active") && bodyWidth <= 1000) {

                    $("#sidebar").animate({
                        "left" : -100 + "%"
                    }, 200);

                    $("#sidebar").removeClass("active")

                }

            }

        });

        $(document).mouseup(function (e){

            hide_element = $(".dropdown-block");

            if (!hide_element.is(e.target)

                && hide_element.has(e.target).length === 0) {

                $(".dropdown-block").each(function() {

                    if ( $(this).is(":visible") ) {

                        dropdownAttr = $(this).attr("data-dropdown-block");

                        $(this).fadeOut(200);

                        $(".dropdown-link[data-dropdown-link = '" + dropdownAttr + "']").removeClass("active");

                    }

                });

            }

        });

    });


    $(function() {

        $(".menu-item-header").click(function(e) {

            e.preventDefault();

            parentBLock = $(this).closest(".menu-dropdown-item");

            dropdownBlock = parentBLock.find(".menu-dropdown");

            if(dropdownBlock.is(":visible")) {

                dropdownBlock.slideUp(200, function() {

                    $("#sidebar").css({
                        "min-height" : "auto"
                    });

                    $("#sidebar").css({
                        "min-height" : $(".content").height() + "px"
                    });

                });

                parentBLock.removeClass("active");

            } else {

                dropdownBlock.slideDown(200, function() {

                    $("#sidebar").css({
                        "min-height" : "auto"
                    });

                    $("#sidebar").css({
                        "min-height" : $(".content").height() + "px"
                    });

                });

                parentBLock.addClass("active");

            }

        });

    });

    $(function() {

        $(".respmenubtn").click(function() {

            $(".sidebar").toggleClass("hidden");
            $(".main_content").toggleClass("fullwidth");
            $(".header-site").toggleClass("resp-width");

        });

    });

    var linkTxt;
    var respTooltip = $(".resp-tooltip");

    $( ".tooltips a" ).bind({
        mouseenter: function() {
            if( $(".sidebar").hasClass("hidden") ) {

                linkTxt = $( this ).find(".link-txt").text();

                respTooltip.attr("style", "opacity: 1");

                respTooltip.text(linkTxt);

                respTooltip.offset({top: $( this ).offset().top + ( $( this ).outerHeight() - respTooltip.outerHeight() ) / 2 , left : $(".sidebar").offset().left + $(".sidebar").width() + 10});

            }

        },
        mouseleave: function() {

            if( $(".sidebar").hasClass("hidden") ) {
            
                respTooltip.attr("style", "opacity: 0");

            }

        }
    });


    function getRespParams() {

        if(bodyWidth <= 1200) {

            $(".sidebar").addClass("hidden");
            $(".main_content").addClass("fullwidth");
            $(".header-site").addClass("resp-width");

        }

    }


});
