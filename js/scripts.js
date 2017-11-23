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
    var TOP_DROPDOWNMENU_COORD = 43;

    // ----------------------------

    var linkTxt;
    var respTooltip = $(".resp-tooltip");

    // ----------------------------

    var resizeFlag = false;

    getRespParams();

    // if(bodyWidth <= 1200) {

    //     $(".header-site").addClass("animation_none");
    //     $(".sidebar").addClass("animation_none");
    //     $(".main_content").addClass("animation_none");

    //     setTimeout(function() {

    //         $(".header-site").removeClass("animation_none");
    //         $(".sidebar").removeClass("animation_none");
    //         $(".main_content").removeClass("animation_none");

    //     }, 700);

    // }

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        // -------------------------

        // $("#fullH").css({
        //     "height" : "auto"
        // });

        // -------------------------

        $("#sidebar").css({
            "min-height" : "auto"
        });

        $("#sidebar").css({
            "min-height" : $(".content").height() + "px"
        });

        // -------------------------

        // if(bodyWidth <= 1200 && !$(".sidebar").hasClass("hidden")) {

        //     $(".header-site").addClass("animation_none");
        //     $(".sidebar").addClass("animation_none");
        //     $(".main_content").addClass("animation_none");

        //     setTimeout(function(){

        //         $(".header-site").removeClass("animation_none");
        //         $(".sidebar").removeClass("animation_none");
        //         $(".main_content").removeClass("animation_none");

        //     }, 700);

        // }

        getRespParams();

    });


    $(function() {

        // var parentBLock;
        // var dropdownAttr;
        // var dropdownBlock;

        // var TOP_DROPDOWNMENU_COORD = 50;

        $(".dropdown-block-wrapp").each(function() {

            if( $(this).find(".dropdown-block").length > 0 ) {

                $(this).find(".dropdown-link").append("<span class='chevron'></span>");

            }

        });


        $(".dropdown-link").click(function(e) {

            e.preventDefault();

            parentBLock = $(this).closest(".dropdown-block-wrapp");

            // dropdownAttr = $(this).attr("data-dropdown-link");

            if( parentBLock.find(".dropdown-block").length > 0 ) {

                dropdownBlock = parentBLock.find(".dropdown-block");

                if(dropdownBlock.is(":visible")) {

                    dropdownBlock.fadeOut(200);                    

                    parentBLock.removeClass("active");

                    if( dropdownBlock.width() > parentBLock.width() ) {

                        setTimeout(function() {

                            dropdownBlock.css({
                                "left" : 0 + "px"
                            });                            

                        }, 300);

                    }                    

                } else {

                    dropdownBlock.fadeIn(200);

                    dropdownBlock.css({ "top" : TOP_DROPDOWNMENU_COORD + "px"});

                    parentBLock.addClass("active");

                    rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

                    wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();                    

                    if( rightDropdownCoord > wrapperRightCoord) {

                        dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

                    } else {

                        var menuItemCenterCoord = parentBLock.offset().left + ( parentBLock.width() / 2 );

                        var dropdownBlockCenterCoord = dropdownBlock.offset().left + ( dropdownBlock.width() / 2 );

                        var centerCoord = menuItemCenterCoord - dropdownBlockCenterCoord;

                        // dropdownBlock.offset({left : centerCoord });

                        dropdownBlock.css({
                            "left" : centerCoord + "px"
                        });

                    }

                }

            }

        });


        // $(".dropdown-block-wrapp").hover(function() {

        //     dropdownBlock = $(this).find(".dropdown-block");

        //     rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

        //     wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();

        //     if( rightDropdownCoord > wrapperRightCoord) {

        //         dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

        //     }

        // });


        $(this).keydown(function(eventObject){

            if (eventObject.which == 27) {

                $(".dropdown-block").each(function() {

                    if ( $(this).is(":visible") ) {

                        $(this).fadeOut(200);

                        $(this).closest(".dropdown-block-wrapp").removeClass("active");
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

                        $(this).fadeOut(200);

                        hide_element.closest(".dropdown-block-wrapp").removeClass("active");

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

            if( dropdownBlock.is(":hidden") ) {

                $(".menu-dropdown-item").each(function() {

                    if( $(this).hasClass("active") ) {

                        $(this).find(".menu-dropdown").slideUp(200);

                        $(this).removeClass("active");

                    }

                });

                dropdownBlock.slideDown(400, function() {

                    $("#sidebar").css({
                        "min-height" : "auto"
                    });

                    $("#sidebar").css({
                        "min-height" : $(".content").height() + "px"
                    });

                });

                parentBLock.addClass("active");

            } else if(dropdownBlock.is(":visible")) {

                dropdownBlock.slideUp(200, function() {

                    $("#sidebar").css({
                        "min-height" : "auto"
                    });

                    $("#sidebar").css({
                        "min-height" : $(".content").height() + "px"
                    });

                });

                parentBLock.removeClass("active");

            }

        });

    });

    $(function() {

        $(".respmenubtn").click(function() {

            $(".sidebar").toggleClass("hidden");
            $(".main_content").toggleClass("fullwidth");
            $(".header-site").toggleClass("resp-width");
            // $(".logo").toggleClass("resp-logo");

        });

    });

    // var linkTxt;
    // var respTooltip = $(".resp-tooltip");

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

        // if(bodyWidth <= 1200 && resizeFlag == true) {
        if(bodyWidth <= 1200) {

            $(".sidebar").addClass("hidden");
            $(".main_content").addClass("fullwidth");
            $(".header-site").addClass("resp-width");

            // resizeFlag = false;

        }
        //  else if( $(".sidebar").hasClass("hidden") ) {

        //     return true;

        // } else {

        //     resizeFlag = true;

        // }

        $(".header-site").addClass("animation_none");
        $(".sidebar").addClass("animation_none");
        $(".main_content").addClass("animation_none");

        setTimeout(function(){

            $(".header-site").removeClass("animation_none");
            $(".sidebar").removeClass("animation_none");
            $(".main_content").removeClass("animation_none");

        }, 700);

    }


});
