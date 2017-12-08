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
    var HEADERHEIGHT = 78;
    var topMenuCoord;

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

    var popupName;
    var popupBlock;
    var popupBox;

    // ----------------------------

    var checkboxBlock;
    var innersCheckboxes;

    // ----------------------------

    var questionTolltipLeftCoord;

    // ----------------------------

    var inputCounterSymbols;
    var maxSymbols;
    var inputValTyped;
    var countSymbols;
    var counterSymbols;
    var restSymbols = 0;

    // ----------------------------

    var disabledElementsMame;
    var disabledElements;
    var checkedFlag = false;

    // ----------------------------

    getRespParams();

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        getRespParams();

        getSelectWidth();

        // ---------------

        $(".popup-block").each(function() {

            if( $(this).css("opacity") === "1" ) {

                popupBox = $(this).find(".popup");
                if( popupBox.height() < $(window).height() ) {

                    popupBox.css({
                        "margin-top" : ( $(window).height() - popupBox.height() ) / 2 + "px"
                    });

                }

            }

        });

    });


    $(function() {

        // var parentBLock;
        // var dropdownAttr;
        // var dropdownBlock;

        $(".dropdown-block-wrapp").each(function() {

            if( $(this).find(".dropdown-block").length > 0 ) {

                $(this).find(".dropdown-link").append("<span class='chevron'></span>");

            }

        });


        $(".dropdown-link").click(function(e) {

            e.preventDefault();

            // var HEADERHEIGHT = 78;

            // var topMenuCoord;

            parentBLock = $(this).closest(".dropdown-block-wrapp");

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

                    // if( parentBLock.hasClass("single") ) {

                    //     dropdownBlock.css({
                    //         // "top" : 100 + "%"
                    //         // "bottom" : -3 + "px"
                    //     });

                    //     // dropdownBlock.fade

                    // } else {

                    //     if(parentBLock.closest(".header-site").length > 0) {

                    //         topMenuCoord = $(".header-site").height() - $(this).offset().top - $(".header-site").offset().top - 3;
                        
                    //         dropdownBlock.css({
                    //             // "top" : 100 + "%"
                    //             // "bottom" : -3 + "px"
                    //         });

                    //     } else {

                    //         topMenuCoord = 39;

                    //     }

                    //     // dropdownBlock.css({
                    //     //     "top" : topMenuCoord + "px"
                    //         // "bottom" : -3 + "px"
                    //     // });

                    // }

                    parentBLock.addClass("active");

                    rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

                    wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();                    

                    if( rightDropdownCoord > wrapperRightCoord) {

                        dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

                    } else {

                        var menuItemCenterCoord = parentBLock.offset().left + ( parentBLock.width() / 2 );

                        var dropdownBlockCenterCoord = dropdownBlock.offset().left + ( dropdownBlock.width() / 2 );

                        var centerCoord = menuItemCenterCoord - dropdownBlockCenterCoord;

                        dropdownBlock.css({
                            "left" : centerCoord + "px"
                        });

                    }

                }

            }

        });


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

                        $(this).closest(".dropdown-block-wrapp").removeClass("active");

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

    $(function() {

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

                slidingBlock.slideDown(200);

                $(this).addClass("active");

            } else {

                slidingBlock.slideUp(200);

                $(this).removeClass("active");

            }

        });

        $(".checkboxes-wrapp input[type='checkbox']").click(function() {

            checkboxBlock = $(this).closest(".checkbox-block");            

            if( checkboxBlock.next(".checkboxes-inner").length > 0 ) {

                innersCheckboxes = checkboxBlock.next(".checkboxes-inner");

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

        // var questionTolltipLeftCoord;

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

        // var inputCounterSymbols;
        // var maxSymbols;
        // var inputValTyped;
        // var countSymbols;
        // var counterSymbols;
        // var restSymbols = 0;

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

            popupBox = popupBlock.find(".popup");

            popupBlock.css({
                "z-index" : 10
            });

            popupBlock.animate({
                "opacity" : 1
            }, 400);

            if( popupBox.height() < $(window).height() ) {

                popupBox.css({
                    "margin-top" : ( $(window).height() - popupBox.height() ) / 2 + "px"
                });

            }

        });

        $(this).keydown(function(eventObject){

            if (eventObject.which == 27) {

                $("[data-popup-name]").each(function() {

                    if ( $(this).is(":visible") ) {

                        $(this).animate({
                            "opacity" : 0
                        }, 400);

                        setTimeout(function() {

                            $(this).css({
                                "z-index" : -1
                            });

                        }, 500);

                    }

                });

            }

        });

        $(".close-popup, .popup-bg").click(function() {

            popupBlock = $(this).closest(".popup-block");

            popupBlock.animate({
                "opacity" : 0
            }, 400);

            setTimeout(function() {

                popupBlock.css({
                    "z-index" : -1
                });

            }, 500);

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

    $(function() {

        var inputCh;
        var nameCheckboxes;
        var activeCheckboxes = [];
        var emptyCheckboxes;

        $(".checkbox-block").click(function() {

            inputCh = $(this).find("input");

            nameCheckboxes = inputCh.attr("name");

            if( $(this).hasClass("parent") ) {

                // inputCh = $(this).find("input");

                // nameCheckboxes = inputCh.attr("name");

                if( inputCh.is(":checked") ) {

                    $("input[ name = '"+ nameCheckboxes +"']").each(function() {

                        if( !$(this).is(":checked") ) {

                            $(this).click();

                        }

                    });

                } else {

                    $("input[ name = '"+ nameCheckboxes +"']").each(function() {

                        if( $(this).is(":checked") ) {

                            $(this).click();

                        }

                    });

                }

            } else {

                // if( $("input[ name = '"+ nameCheckboxes +"'].parent").is(":checked") ){

                    activeCheckboxes = [];

                    $("input[ name = '"+ nameCheckboxes +"']").each(function() {

                        if( !$(this).closest(".checkbox-block").hasClass("parent") ) {

                            if( $(this).is(":checked") ) {

                                activeCheckboxes.push(true);

                            } else {

                                activeCheckboxes.push(false);

                            }

                        }

                    });

                    // activeCheckboxes.some(isPositive);

                    // function isPositive(number) {
                    //   return number == false;
                    // }

                    // emptyCheckboxes = activeCheckboxes.some(function(number) {

                    //     return number == false;

                    // });

                    // var parentCheckbox = $(".parent input[ name = '"+ nameCheckboxes +"']");

                    // console.log(nameCheckboxes);

                    // if( emptyCheckboxes == false && parentCheckbox.is("checked") ) {

                    //     parentCheckbox.click();

                    // } else if( !parentCheckbox.is("checked") ) {

                    //     parentCheckbox.click();

                    // }

                    // if( emptyCheckboxes == true ) {

                    //     $("input[ name = '"+ nameCheckboxes +"'].parent").attr("checked", false);

                    // }

                    console.log(emptyCheckboxes);

                // }

            }

        });

    });

    $(function() {

        // var disabledElementsMame;
        // var disabledElements;
        // var checkedFlag = false;

        $("[data-select]").click(function() {

            disabledElementsName = $(this).attr("data-select");

            disabledElements = $("[data-onoff = '"+ disabledElementsName +"']");

            $("[data-select]").each(function() {

                if( $(this).is(":checked") ) {

                    checkedFlag = true;

                    return false;

                } else {

                    checkedFlag = false;

                }

            });

            if( checkedFlag == true ) {

                disabledElements.removeClass("disabled");

            } else {

                disabledElements.addClass("disabled");

            }

        });

    });

    $(function() {

        $(".slide-link").click(function(e) {

            e.preventDefault();

            var slideBLockName = $(this).attr("data-slide-link");

            var slideBLock = $("[data-slide-block = '"+ slideBLockName +"']");

            if( slideBLock.is(":hidden") ) {

                slideBLock.slideDown(200);                
                $(this).removeClass("hidden");

            } else {

                slideBLock.slideUp(200);
                $(this).addClass("hidden");

            }

        });

    });

    function getRespParams() {

        if(!$(".two-cols-templ").hasClass("flag")) {

            if( bodyWidth <= 1280 ) {

                $(".two-cols-templ").addClass("resp");
                $(".sidebar_bg").addClass("resp");
                $(".header-site").addClass("resp-width");

            } else if( bodyWidth > 1280 ) {

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

            parentBlock = $(this).closest(".select-block");

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
