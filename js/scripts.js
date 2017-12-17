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

    var innerTable;
    var tableRow;
    var countTableRow;
    var heightsArr = [];
    var maxHeightsArr = [];

    // ----------------------------

    getRespParams();

    getTablesParams();

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;        

        getRespParams();

        getSelectWidth();

        $(".trakers-tables").find(".table-row").css({
            "height" : "auto"
        });

        getTablesParams();

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

                    indexActiveTab = $(this).index();

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

        // $(".checkboxes-wrapp input[type='checkbox']").click(function() {

        //     parentBlock = $(this).closest(".checkboxes-wrapp");

        //     checkboxBlock = $(this).closest(".checkbox-block");

        //     // if( checkboxBlock.next(".checkboxes-inner").length > 0 ) {

        //     if( checkboxBlock.next(".checkboxes-inner").length > 0 && $(this).is(":checked") ) {

        //         innersCheckboxes = parentBlock.find(".checkboxes-inner");

        //         // if( $(this).is(":checked") ) {

        //             // innersCheckboxes.find("input").each(function() {

        //             //     if( !$(this).is(":checked") ) {

        //             //         $(this).click();

        //             //     }

        //             // });

        //         // }

        //         //  else {

        //         //     innersCheckboxes.find("input[type = 'checkbox']").each(function() {

        //         //         if( $(this).is(":checked") ) {

        //         //             $(this).click();

        //         //         }

        //         //     });

        //         // }

        //     } else {

        //         activeCheckboxes = [];

        //         // parentBlock.find(".checkboxes-inner input[type='checkbox']").each(function() {

        //         //     if( $(this).is(":checked") ) {

        //         //         activeCheckboxes.push(true);

        //         //     } else {

        //         //         activeCheckboxes.push(false);

        //         //     }

        //         // });

        //         // for( var checkboxIndex = 0; checkboxIndex <= activeCheckboxes.length - 1; checkboxIndex++) {

        //         //     if( activeCheckboxes[checkboxIndex] == true) {

        //         //         emptyCheckboxes = false;

        //         //         return true;

        //         //     } else {

        //         //         emptyCheckboxes = true;

        //         //     }

        //         // }

        //         // if( emptyCheckboxes == true && 
        //         //     parentBlock.find(".checkbox-block.parent input").is(":checked")
        //         //     ) {

        //         //     parentBlock.find(".checkbox-block.parent input").click();

        //         // }

        //     }

        // });

    });


    // Upload File

    $(function() {

        $(".upload_btn").click(function() {

            parentBlock = $(this).closest(".upload-file");

            parentBlock.find("input[type='file']").click();

        });

    });

    $(function() {

        var questionTooltipLeftCoord;
        var questionTooltipTopCoord;
        var tooltipName;
        var addTopOffset = 20;

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

                // console.log( activeCheckboxes.every(isPositive) );
                // console.log( activeCheckboxes.some(isPositive) );

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

        $(".tracker-btn").click(function() {
            
            parentBlock = $(this).closest(".trakers-tables");

            parentBlock.toggleClass("active");

            if( parentBlock.hasClass("active") ) {

                $(this).addClass("active");

            } else {

                $(this).removeClass("active");

            }

            setTimeout(function() {

                innerTable = parentBlock.find(".inner-table");

                for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                    tableRow = innerTable.eq(indexInnerTable).find(".table-row");

                    countTableRow = tableRow.length - 1;

                    heightsArr[indexInnerTable] = [];

                    for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                        heightsArr[indexInnerTable][indexRow] = innerTable.eq(indexInnerTable).find(".table-row").eq(indexRow).height();

                    }

                }

                for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                    maxHeightsArr[indexRow] = [];

                    for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                        maxHeightsArr[indexRow][indexInnerTable] = heightsArr[indexInnerTable][indexRow];

                    }

                }

                for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                    for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                        innerTable.find(".table-row:eq("+ indexRow +")").css({

                            "height" : Math.max.apply(null, maxHeightsArr[indexRow] ) + "px"

                        });

                    }

                }

            }, 500);

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

        var addTableBtn;
        var slidingTable;     

        $(".sliding-tables").each(function() {

            addTableBtn = $(this).find(".ad-table-btn");
            slidingTable = $(this).find(".sliding-table");

            if( $(this).hasClass("active") ) {

                slidingTable.slideDown(200);
                addTableBtn.addClass("active");

            } else {

                slidingTable.slideUp(200);
                addTableBtn.removeClass("active");

            }

        });

        $(".ad-table-btn").click(function() {

            parentBlock = $(this).closest(".sliding-tables");

            slidingTable = parentBlock.find(".sliding-table");

            if(slidingTable.is(":hidden")) {

                slidingTable.slideDown(200);

                parentBlock.addClass("active");

                $(this).addClass("active");

            } else {

                slidingTable.slideUp(200);

                parentBlock.removeClass("active");

                $(this).removeClass("active");

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

    function getTablesParams() {

        // var innerTable;
        // var tableRow;
        // var countTableRow;

        // var heightsArr = [];
        // var maxHeightsArr = [];

        for( var indexTablesTrakers = 0; indexTablesTrakers <= $(".trakers-tables").length - 1; indexTablesTrakers++ ) {

            innerTable = $(".trakers-tables").eq(indexTablesTrakers).find(".inner-table");

            for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                tableRow = innerTable.eq(indexInnerTable).find(".table-row");

                countTableRow = tableRow.length - 1;

                heightsArr[indexInnerTable] = [];

                for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                    heightsArr[indexInnerTable][indexRow] = innerTable.eq(indexInnerTable).find(".table-row").eq(indexRow).height();

                }

            }

            for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                maxHeightsArr[indexRow] = [];

                for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                    maxHeightsArr[indexRow][indexInnerTable] = heightsArr[indexInnerTable][indexRow];

                }

            }

            for( var indexInnerTable = 0; indexInnerTable <= innerTable.length - 1; indexInnerTable++ ) {

                for( var indexRow = 0; indexRow <= countTableRow; indexRow++ ) {

                    innerTable.find(".table-row:eq("+ indexRow +")").css({

                        "height" : Math.max.apply(null, maxHeightsArr[indexRow] ) + "px"

                    });

                }

            }

        }

    }

});