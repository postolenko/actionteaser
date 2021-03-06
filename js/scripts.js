var trackerTableName;
var trackerTableWrapp;
var rightCoord;
var multippleVal;
var trakerBtn;

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

    // --------------------------

    $(".traker-table").each(function() {

        parentBlock = $(this).closest(".traker_table_wrapp");

        trakerBtn = parentBlock.find(".tracker-btn");

        if( $(this).find(".right_coord").length > 0 ) {

            rightCoord = $(this).find(".right_coord").position().left + $(this).find(".right_coord").outerWidth();

            trakerBtn.css({
                "left" : rightCoord / $(this).width() * 100 + "%"
            });

        }

    });

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
    var attrForTabLink;
    var activeTabRadio;
    var nextTab;
    var indexActiveTab;

    // ----------------------------

    var popupName;
    var popupBlock;
    var popupBox;

    // ----------------------------

    var checkboxBlock;
    var innersCheckboxes;

    // ----------------------------

    var questionTooltipLeftCoord;
    var questionTooltipTopCoord;
    var tooltipName;
    var addTopOffset = 20;

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

    var inputCh;
    var nameCheckboxes;
    var activeCheckboxes = [];

    // ----------------------------

    var tableHeaderWrapp;
    var tableHeader;
    
    var trakerTable;
    var trakerBtn;
    var rightCoord;
    var multippleVal;
    var trakerBtn;

    // ----------------------------

    var rowsGroupName;
    var rowsGroup;

    // ----------------------------

    getRespParams();

    getTableHeaderPosition();

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;        

        getRespParams();

        getSelectWidth();

        $(".trakers-tables").find(".table-row").css({
            "height" : "auto"
        });

        getTableHeaderPosition();

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

    $(document).scroll(function() {

        getTableHeaderPosition();

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

                    parentBLock.addClass("active");                    

                    rightDropdownCoord = dropdownBlock.offset().left + dropdownBlock.outerWidth();

                    wrapperRightCoord = $(".wrapper").offset().left + $(".wrapper").width();                    

                    if( rightDropdownCoord > wrapperRightCoord) {

                        dropdownBlock.offset({left : (wrapperRightCoord - dropdownBlock.outerWidth()) });

                    } else if( !parentBLock.hasClass("single") ) {

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

    // Tabs 

    $(function() {

        // var tabsParent;
        // var tabParent;
        // var attrForTabLink;
        // var activeTabRadio;
        // var nextTab;
        // var indexActiveTab;

        $(".tabs").each(function() {

            $(this).find(".tab-link").each(function() {

                if( $(this).hasClass("active") ) {

                    indexActiveTab = $(this).index(".tab-link");

                    $(this).click();

                    return false;

                } else {

                    indexActiveTab = 0;

                }

            });

            $(this).find(".tab-link").eq(indexActiveTab).click();
            $(this).find(".tab-link").eq(indexActiveTab).addClass("active");

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

    });


    // Upload File

    $(function() {

        $(".upload_btn").click(function() {

            parentBlock = $(this).closest(".upload-file");

            parentBlock.find("input[type='file']").click();

        });

    });

    $(function() {

        // var questionTooltipLeftCoord;
        // var questionTooltipTopCoord;
        // var tooltipName;
        // var addTopOffset = 20;

        $( ".tooltip-block").bind({
            mouseenter: function() {                

                if( $(this).attr("data-tooltip") ) {

                    tooltipName = $(this).attr("data-tooltip");

                    tooltipDesc = $(".tooltip[data-tooltip-desc = '" + tooltipName + "']");

                } else {

                    tooltipDesc = $(this).find(".tooltip");

                }

                tooltipDesc.attr("style", "display: inline-block;");

                if( $(this).attr("data-tooltip") != false ) {

                    questionTooltipTopCoord = $(this).offset().top - tooltipDesc.height() - $(this).find(".icon-box").height() - addTopOffset;

                } else {

                    questionTooltipTopCoord = undefined;

                }

                questionTooltipLeftCoord = $(this).offset().left - ( $(this).width() + tooltipDesc.width() ) / 2;

                if( questionTooltipLeftCoord + tooltipDesc.outerWidth() >= $(document).width() ) {

                    questionTooltipLeftCoord = $(document).width() - tooltipDesc.outerWidth();

                }

                if( $(this).attr("data-tooltip") != false ) {

                    tooltipDesc.offset({top: questionTooltipTopCoord, left : questionTooltipLeftCoord});

                } else {

                    tooltipDesc.offset({left : questionTooltipLeftCoord});

                }

                

            },
            mouseleave: function() {

                tooltipDesc.attr("style", "display: none;");

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
            }, 300);

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
                        }, 300);

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
            }, 300);

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

        // var inputCh;
        // var nameCheckboxes;
        // var activeCheckboxes = [];

        $(".checkbox-block").click(function() {

            inputCh = $(this).find("input");

            nameCheckboxes = inputCh.attr("name");

            if( $(this).closest(".checkbox-block").hasClass("parent") ) {

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

                if( activeCheckboxes.every(isPositive) == false && 
                    $(".checkbox-block.parent input[ name = '"+ nameCheckboxes +"']").is(":checked")
                    ) {

                        $(".checkbox-block.parent input[ name = '"+ nameCheckboxes +"']").prop("checked", false);

                } else if ( activeCheckboxes.every(isPositive) == true && 
                    !$(".checkbox-block.parent input[ name = '"+ nameCheckboxes +"']").is(":checked")
                    ) {

                        $(".checkbox-block.parent input[ name = '"+ nameCheckboxes +"']").prop("checked", true);

                }

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

    $(function() {

        $(".sliding-btn").click(function() {

            parentBlock = $(this).closest(".sliding_wrapp");

            slidingBlock = parentBlock.find(".sliding-block");

            if(slidingBlock.is(":hidden")) {

                slidingBlock.slideDown(200);

            } else {

                slidingBlock.slideUp(200);

            }

        });

    });

    $(function() {

        $(".sort-arr").click(function() {

            $(this).toggleClass("active");

        });

    });

    $(function() {

        $(".grey-block .close-x").click(function() {

            $(this).closest(".grey-block").fadeOut(250);

        });

    });

    $(function() {

        // var trackerTableName;
        // var trackerTableWrapp;
        // var rightCoord;
        // var multippleVal;
        // var trakerBtn;
        // var trakerTable;

        $(".tracker-btn").click(function() {

            parentBlock = $(this).closest(".traker_table_wrapp");

            trackerTableName = parentBlock.find(".traker-table").attr("data-traker");

            trakerTable = $(".traker-table[data-traker = '"+ trackerTableName +"']");

            rightCoord = trakerTable.find(".right_coord").next(".cell").position().left;

            if(trakerTable.width() > parentBlock.width() ) {

                multippleVal = 100;

                $(this).removeClass("active");

                trakerTable.css({
                    "width" : multippleVal + "%"
                });

            } else {

                multippleVal = parentBlock.width() / rightCoord * 100;

                $(this).addClass("active");

                trakerTable.css({
                    "width" : multippleVal + "%"
                });

                setTimeout(function() {

                    rightCoord = trakerTable.find(".right_coord").next(".cell").position().left;

                    if( rightCoord < parentBlock.width() ) {

                        widthInterval = trakerTable.width() / 100 / ( parentBlock.width() - rightCoord );

                        trakerTable.css({
                            "width" : multippleVal + widthInterval + "%"
                        });

                    }

                }, 500);

            }
            

        });

    });

    $(function() {

        $(".counter-btn").click(function() {

            parentBlock = $(this).closest(".input-counter_wrapp");

            var countVal = parentBlock.find(".counter-input").val();

            if(countVal == "") {

                countVal = 0;

            }

            if( $(this).hasClass("plus-counter") ) {

                countVal++;

            } else if( $(this).hasClass("minus-counter") ) {

                if(countVal <= 0) {

                    countVal = 0;

                } else {

                    countVal--;

                }                

            }

            parentBlock.find(".counter-input").val(countVal);

        });

    });

    $(function() {

        $(".traker-table .ad-table-btn").each(function() {

            rowsGroupName = $(this).attr("data-showrows");
            rowsGroup = $(this).closest(".traker-table").find(".table-row[data-hidderows = '"+ rowsGroupName +"']");

            if( $(this).hasClass("active") ) {

                rowsGroup.css({"display" : "table-row"});

            } else {

                rowsGroup.css({"display" : "none"});

            }

        });

        $(".ad-table-btn").click(function() {

            rowsGroupName = $(this).attr("data-showrows");

            rowsGroup = $(this).closest(".traker-table").find(".table-row[data-hidderows = '"+ rowsGroupName +"']");

            if( $(this).hasClass("active") ) {

                rowsGroup.css({"display" : "none"});
                $(this).removeClass("active");

            } else {

                rowsGroup.css({"display" : "table-row"});
                $(this).addClass("active");

            }

        });

    });

    $(function() {

        // var linkTxt;
        // var respTooltip = $(".resp-tooltip");

        $( ".tooltips a" ).bind({
            mouseenter: function() {
                if( $(".two-cols-templ").hasClass("resp") ) {

                    linkTxt = $( this ).find(".link-txt").text();

                    respTooltip.attr("style", "opacity: 1");

                    respTooltip.text(linkTxt);

                    respTooltip.offset({top: $( this ).offset().top + ( $( this ).outerHeight() - respTooltip.outerHeight() ) / 2 , left : $(".sidebar").offset().left + $(".sidebar").width() + 10});

                }

            },
            mouseleave: function() {
                
                respTooltip.attr("style", "opacity: 0");

            }
        });

    });

    $(function() {

        $(".respmenubtn").click(function() {

            $(".two-cols-templ").toggleClass("resp");
            $(".sidebar_bg").toggleClass("resp");
            $(".two-cols-templ").addClass("flag");
            $(".header-site").toggleClass("resp");

            setTimeout(function() {

                getRespParams();

            }, 400);

        });

    });

    $(function() {

        var commentFormName;
        var commentForm;
        var commentValInput;
        var commentVal;
        var inputComment;

        $(".add-comment").each(function() {

            $(this).css({
                "display" : "none"
            });

        });

        $(".input-val_wrapp").each(function() {

            $(this).css({
                "display" : "none"
            });

        });

        $(".add_comment").click(function(e) {

            e.preventDefault();

            commentFormName = $(this).attr("data-comment-link");

            commentForm = $(".add-comment").filter("[data-formcomment = '"+ commentFormName +"']");

            if( commentForm.is(":hidden") ) {

                $(this).css({
                    "display" : "none"
                });

                commentForm.slideDown(200);

            } else {

                commentForm.slideUp(200);
            }

        });

        $(".add-comment_wrapp .input-val").click(function() {

            parentBlock = $(this).closest(".add-testimonial_wrapp");

            commentFormName = $(this).attr("data-comment-txt");

            commentForm = $(".add-comment").filter("[data-formcomment = '"+ commentFormName +"']");

            inputComment = $(".add-comment[data-formcomment ='"+ commentFormName +"'] .txt-input");

            commentVal = $(this).text();

            $(this).closest(".input-val_wrapp").slideUp(200);

            inputComment.val(commentVal);
            commentForm.slideDown(200);

        });

        $(".add-comment .submit-btn").click(function() {

            parentBlock = $(this).closest(".add-comment");
            commentFormName = parentBlock.attr("data-formcomment");            

            inputComment = $(".add-comment[data-formcomment ='"+ commentFormName +"'] .txt-input");
            commentVal = inputComment.val();

            if( commentVal != "" ) {

                parentBlock.slideUp(100);

                commentValInput = $(".input-val[data-comment-txt = '"+ commentFormName +"']");

                commentValInput.text(commentVal);
                commentValInput.closest(".input-val_wrapp").slideDown(200);

            }

        });

    });

    $(function() {

        $(".close-infobox").click(function() {

            parentBlock = $(this).closest(".info-box-2");

            parentBlock.fadeOut(300);

        });

    });

    function getRespParams() {

        if(!$(".two-cols-templ").hasClass("flag")) {

            if( bodyWidth <= 1280 ) {

                $(".two-cols-templ").addClass("resp");
                $(".sidebar_bg").addClass("resp");
                $(".header-site").addClass("resp");

            } else if( bodyWidth > 1280 ) {

                $(".two-cols-templ").removeClass("resp");
                $(".sidebar_bg").removeClass("resp");
                $(".header-site").removeClass("resp");

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

        if( bodyWidth <= 1280 ) {

            var respSidebarHeight = $(window).height() - $(".header-site").offset().top - $(".header-site").outerHeight() - $(".footer").outerHeight();

            if( $("#sidebarmenu").height() > $(".main_content").height() ) {

                $(".sidebar").css({
                    "height" : respSidebarHeight + "px"
                });

            } else {

                $(".sidebar").css({
                    "height" : "auto"
                });

            }

        } else if( bodyWidth > 1280 ) {

            $(".sidebar").css({
                "height" : "auto"
            });

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

    function isPositive(number) {
        return number == true;
    }

    function getTableHeaderPosition() {

        if( $(".tables_wrapp").length > 0 ) {

            $(".tables_wrapp").each( function() {

                tableHeaderWrapp = $(this).find(".table-header_wrapp");

                tableHeader = $(this).find(".table-header");

                if( $(this).offset().top < $(document).scrollTop() && 
                    ( $(this).offset().top + $(this).height() - $(this).find(".table-header_wrapp").outerHeight(true) ) > $(document).scrollTop()) {
                    
                    tableHeaderWrapp .css({
                        "height" : tableHeader.height() + "px"
                    });

                    $(this).addClass("scrolling");
                    tableHeader.css({
                        "left" : $(this).offset().left + "px",
                        "width" : $(this).width() + "px"
                    });

                } else {

                    $(this).removeClass("scrolling");
                    tableHeader.css({
                        "left" : 0,
                        "width" : "auto"
                    });

                }

            });

        }

    }


});