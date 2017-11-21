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

    $("#sidebar").css({
        "min-height" : $(".content").height() + "px"
    });

    $(".blue-bg").css({
        "width" : $("#sidebar").offset().left + "px"
    });

    // ----------------------------

});

$(document).ready(function() {


    var setFooterPositionInterval;
    var contentCoor;
    var footerCoor;

    // ----------------------------

    var parentBLock;
    var dropdownAttr;
    var dropdownBlock;

    var TOP_DROPDOWNMENU_COORD = 50;

    // ----------------------------

    // getFooterPosition();

    getColHeight();

    // ----------------------------

    // $("#sidebar").css({
    //     "height" : $(".content").height() + "px"
    // });

    // ----------------------------

    $(window).resize(function() {

        // $(".wrapper").css({"min-height" : $(window).height() + "px"});

        // if($(".footer").length > 0) {

        //     $(".wrapper").css({"padding-bottom" :  $(".footer").outerHeight(true) + "px"});

        // }

        // -------------------------

        $("#fullH").css({
            "height" : "auto"
        });

        getColHeight();

        // -------------------------

        $("#sidebar").css({
            "min-height" : "auto"
        });

        $("#sidebar").css({
            "min-height" : $(".content").height() + "px"
        });

        $(".blue-bg").css({
            "width" : $("#sidebar").offset().left + "px"
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

            parentBLock = $(this).closest(".dropdown-block-wrapp");

            dropdownAttr = $(this).attr("data-dropdown-link");

            dropdownBlock = parentBLock.find(".dropdown-block[data-dropdown-block = '"+ dropdownAttr +"']");

            if(dropdownBlock.is(":visible")) {

                dropdownBlock.fadeOut(200);

                $(this).removeClass("active");

            } else {

                dropdownBlock.fadeIn(200);

                dropdownBlock.css({"top" : TOP_DROPDOWNMENU_COORD + "px"});

                $(this).addClass("active");

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

                    $(".blue-bg").css({
                        "width" : $("#sidebar").offset().left + "px"
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

                    $(".blue-bg").css({
                        "width" : $("#sidebar").offset().left + "px"
                    });

                });

                parentBLock.addClass("active");

            }

        });

    });


    function getFooterPosition() {

        $(".wrapper").css({"min-height" : $(window).height() + "px"});

        if($(".footer").length > 0) {

            $(".wrapper").css({"padding-bottom" :  $(".footer").outerHeight(true) + "px"});

            setFooterPositionInterval = setInterval(function() {

                contentCoor = $(".content").offset().top + $(".content").height();
                footerCoor = $(".footer").offset().top;

                if( contentCoor != footerCoor ) {

                    $(".wrapper").css({"min-height" : $(window).height() + "px"});

                    $(".wrapper").css({"padding-bottom" :  $(".footer").outerHeight(true) + "px"});

                    clearInterval(setFooterPositionInterval);

                }

            }, 35);

        }

    }

    function getColHeight() {

        $("#fullH").css({
            "height" : $("#fullH").closest(".header-site").height() + "px"
        });

    }


});
