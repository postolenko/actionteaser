$(window).load(function() {

    $("select").each(function() {

        var parentBlock = $(this).closest(".select-block");

        parentBlock.find(".select2-container").css({
            "width" : parentBlock.width() + "px"
        });

    });

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

    // $(".sidebar").css({
    //     "min-height" : $(".content").height() + "px"
    // });

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
    // var TOP_DROPDOWNMENU_COORD = 43;

    // ----------------------------

    var linkTxt;
    var respTooltip = $(".resp-tooltip");

    // ----------------------------

    var resizeFlag = false;

    // ----------------------------

    var tabsParent;
    var tabParent;
    var tabLink;
    var attrForTabLink;
    var activeTabRadio;
    var nextTab;
    var activeTabs = [];
    var activeFlag = true;

    // ----------------------------

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

        // $("#sidebar").css({
        //     "min-height" : "auto"
        // });

        // $("#sidebar").css({
        //     "height" : $(".content").height() + "px"
        // });

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

        getSelectWidth();

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

            var HEADERHEIGHT = 78;

            var topMenuCoord;

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

                    topMenuCoord = $(".header-site").height() - $(this).offset().top - $(".header-site").offset().top - 3;
 
                    console.log($(this).offset().top + "  " + $(".header-site").offset().top +"   "+ ( $(this).offset().top -  $(".header-site").offset().top )  + "   " + (HEADERHEIGHT - ( $(this).offset().top - $(".header-site").offset().top )) );

                    // dropdownBlock.offset({top : topMenuCoord});

                    dropdownBlock.css({
                        "top" : topMenuCoord + "px"
                    });

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

            $(".two-cols-templ").toggleClass("resp");
            $(".sidebar_bg").toggleClass("resp");
            $(".two-cols-templ").addClass("flag");
            $(".header-site").toggleClass("resp-width");

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

    // Tabs 

    $(function() {

        // var tabsParent;
        // var tabParent;
        // var tabLink;
        // var attrForTabLink;
        // var activeTabRadio;
        // var nextTab;
        // var activeTabs = [];
        // var activeFlag = true;

        $(".tabs").each(function() {

            $(this).find(".radio-tab").each(function() {                

                if( $(this).attr("checked") ) {

                    tabsParent = $(this).closest(".tabs");
                    attrForTabLink = $(this).attr("id");
                    tabsParent.find(".tab-link[for = '"+ attrForTabLink +"']").addClass("active");
                    activeFlag = true;

                } else {

                    activeFlag = false;

                }                

            });

            if(activeFlag == true) {

                activeTabs.push( $(this).index(".tabs") );

            } else {

                activeTabs.push( false );

            }

        });


        $(".tabs").each(function() {

            if( activeTabs[$(this).index(".tabs")] !== $(this).index(".tabs") ) {

                $(this).find(".tab-link:eq(0)").addClass("active");

                activeTabRadio = $(this).find(".radio-tab").eq(0);

                activeTabRadio.prop("checked", true);

            }

        });


        $(".tab-link").click(function (e) {

            if( $(this).hasClass("active") ) {

                e.preventDefault();

            } else {

                tabsParent = $(this).closest(".tabs");
                attrForTabLink = $(this).attr("for");
                activeTabRadio = tabsParent.find(".radio-tab[id = '"+ attrForTabLink +"']");
                activeTabRadio.prop("checked", true);

                tabsParent.find(".tab-link").each(function () {
                    
                    if( $(this).hasClass("active") ) {

                        $(this).removeClass("active")

                    }

                });

                $(this).addClass("active");

            }

        });


        $(".next_tab").click(function(e) {

            e.preventDefault();

            tabParent = $(this).closest(".tab-wrapp");
            attrForTabLink = tabParent.find(".radio-tab").attr("id");
            tabsParent = tabParent.closest(".tabs");
            
            activeTabRadio = tabsParent.find(".tab-link[for = '"+ attrForTabLink +"']");
            nextTab = activeTabRadio.next(".tab-link");
            nextTab.click();


        });

    });

    // Checkboxes

    $(function() {

        $(".checkboxes-wrapp").each(function() {

            slidingBlock = $(this).find(".checkboxes-inner");

            if( $(this).hasClass("active") && slidingBlock.is(":hidden")) {

                slidingBlock.slideDown(30);

            } else {

                slidingBlock.slideUp(30);

            }

        });

        $(".checkboxes-btn").click(function() {

            parentBLock = $(this).closest(".checkboxes-wrapp");

            slidingBlock = parentBLock.find(".checkboxes-inner");

            if( slidingBlock.is(":hidden") ) {

                slidingBlock.slideDown(200, function() {



                });

                $(this).addClass("active");

            } else {

                slidingBlock.slideUp(200);

                $(this).removeClass("active");

            }

        });

        $(".checkboxes-wrapp input[type='checkbox']").click(function() {

            var checkboxBlock = $(this).closest(".checkbox-block");            

            if( checkboxBlock.next(".checkboxes-inner").length > 0 ) {

                var innersCheckboxes = checkboxBlock.next(".checkboxes-inner");

                if( $(this).is(":checked") ) {

                    innersCheckboxes.find("input[type = 'checkbox']").each(function() {

                        if( !$(this).is(":checked") ) {

                            $(this).click();

                        }

                    });

                } else {

                    innersCheckboxes.find("input[type = 'checkbox']").each(function() {

                        if( $(this).is(":checked") ) {

                            $(this).click();

                        }

                    });

                }

            }

        });

    });


    // Upload File

    $(function() {

        $(".upload_btn").click(function() {

            parentBlock = $(this).closest(".upload-file");

            parentBlock.find("input[type='file']").click();

        });

    });

    $(function() {

        var questionTolltipLeftCoord;

        $( ".tooltip-block").bind({
            mouseenter: function() {                

                $(this).find(".tooltip").attr("style", "display: block;");

                questionTolltipLeftCoord = $(this).offset().left - ( $(this).width() / 2 + $(this).find(".tooltip").width() / 2) ;

                $(this).find(".tooltip").offset({left : questionTolltipLeftCoord});

            },
            mouseleave: function() {

                $(this).find(".tooltip").attr("style", "display: none;");

            }
        });

    });

    $(function() {

        var inputCounterSymbols;
        var maxSymbols;
        var inputValTyped;
        var countSymbols;
        var counterSymbols;
        var restSymbols = 0;

        $(".symbol_count").each(function() {

            inputCounterSymbols = $(this).attr("data-input-symbols");

            maxSymbols = parseInt( $(this).attr("data-maxsymbols") );

            counterSymbols = $(".count-symbols").filter("[data-countinputsymbols = '" + inputCounterSymbols + "']");

            counterSymbols.text( maxSymbols );

        });

        $(".symbol_count").keyup(function() {

            inputCounterSymbols = $(this).attr("data-input-symbols");

            maxSymbols = parseInt( $(this).attr("data-maxsymbols") );

            inputValTyped = $(this).val();

            countSymbols =  inputValTyped.length;

            counterSymbols = $(".count-symbols").filter("[data-countinputsymbols = '" + inputCounterSymbols + "']");

            restSymbols = maxSymbols - countSymbols;

            counterSymbols.text( restSymbols );

            if( restSymbols < 0 ) {

                $(this).val( inputValTyped.slice(0, maxSymbols) );

                counterSymbols.text( 0 );

            }

        });

    });


    $(function() {

        $(".show_popup").click(function(e) {

            e.preventDefault();

            popupName = $(this).attr("data-popup");
            popupBlock = $("[data-popup-name = '"+ popupName +"']");

            popupBlock.fadeIn(300);

        });

         $(this).keydown(function(eventObject){

            if (eventObject.which == 27) {

                $("[data-popup-name]").each(function() {

                    if ( $(this).is(":visible") ) {

                        if( $(".selectareaimg-popup").length > 0 ) {      

                            $('img#photo').imgAreaSelect({
                                 hide: true
                            });

                        }

                        $(this).fadeOut(300);

                    }

                });

            }

        });

        $(".close-popup, .popup-bg").click(function() {

            popupBlock = $(this).closest(".popup-block");

            if( $(".selectareaimg-popup").length > 0 ) {            

                $('img#photo').imgAreaSelect({
                     hide: true
                });

            }

            popupBlock.fadeOut(300);

        });

    });


    $(function() {

        $(".copy_code").click(function(e) {

            e.preventDefault();

        });

    });

    $(function() {

        $(".fancy_link").click(function(e) {

            e.preventDefault();

            var imageAttr = $(this).attr("data-image");

            $("[data-fancy-image = '"+ imageAttr +"'").click();

        });

    });

    function getRespParams() {

        if(!$(".two-cols-templ").hasClass("flag")) {

            if( bodyWidth <= 1200 ) {

                $(".two-cols-templ").addClass("resp");
                $(".sidebar_bg").addClass("resp");
                $(".header-site").addClass("resp-width");

            } else if( bodyWidth > 1200 ) {

                $(".two-cols-templ").removeClass("resp");
                $(".sidebar_bg").removeClass("resp");
                $(".header-site").removeClass("resp-width");

            }

            $(".header-site").addClass("animation_none");
            $(".sidebar_bg").addClass("animation_none");
            $(".two-cols-templ").addClass("animation_none");

            setTimeout(function(){

                $(".header-site").removeClass("animation_none");
                $(".sidebar_bg").removeClass("animation_none");
                $(".two-cols-templ").removeClass("animation_none");

            }, 700);

        }        

    }

    function getSelectWidth() {

        $("select").each(function() {

            var parentBlock = $(this).closest(".select-block");

            // parentBlock.css({
            //     "width" : "auto"
            // });

            setTimeout(function(){

                parentBlock.find(".select2-container").css({
                    "width" : "auto"
                });

                parentBlock.find(".select2-container").css({
                    "width" : parentBlock.width() + "px"
                });

            } , 300);

        });

    }


});
