jQuery(function($){
    $(".selectList ul").show();
    $(".selectList .myValue span.tit").css("display","inline-block").show();
    // Common
    var select_root = $('div.selectList');
    var select_value = $('.myValue');
    var select_a = $('div.selectList>ul>li>a');
    var select_input = $('div.selectList>ul>li>input[type=radio]');
    var select_input_renew = $('div.gnb_grphd>ul>li>input[type=radio]');
    var select_label = $('div.selectList>ul>li>label');
    var toggle_over = false;

    //(2017 모바일웹 리뉴얼)
    var select_root_renew = $('div.gnb_grphd');
    var select_value_renew = $('#myValue');
    var select_a_renew = $('div.gnb_grphd>ul>li>a');
    var select_input_renew = $('div.gnb_grphd>ul>li>input[type=radio]');
    var select_label_renew = $('div.gnb_grphd>ul>li>label');

    var winH = $(window).height();
    var iListH = $(".iList").height();

    // Radio Default Value
    $('div.myValue').each(function(){
        var default_value = $(this).next('.iList').find('input[checked]').next('label').text();
        $(this).find('.tit').append(default_value);
    });

    // Radio Default Value (2017 모바일웹 리뉴얼)
    $('#myValue').each(function(){
        var default_value = $(this).next('.nav_mcate').find('input[checked]').next('label').text();
        $(this).find('#myTitle').append(default_value);
    });
    
    // Radio Default Value (2017 모바일웹 리뉴얼)
    $('#categoryValue').each(function(){
        var default_value = $(this).next('.coltype').find('input[checked]').next().next('p').text();
        $(this).find('#categoryTitle').append(default_value);
    });

    // Line
    select_value.bind('focusin',function(){$(this).addClass('outLine');});
    select_value.bind('focusout',function(){$(this).removeClass('outLine');});
    select_input.bind('focusin',function(){$(this).parents('div.selectList').children('div.myValue').addClass('outLine');});
    select_input.bind('focusout',function(){$(this).parents('div.selectList').children('div.myValue').removeClass('outLine');});


    // Show
    function show_option(){
        $(this).parents('div.selectList:first').toggleClass('open');
        var chk = $(this).hasClass("open");

        if ( toggle_over == false){
            toggle_over = true;
            $("<div class='overlay2'></div>").clone().appendTo("#container");

            var ovH = $(".overlay2").height();
            var cconH = $("#container").height() - 40;
            $(".overlay2").css("height",cconH);

            if ( winH < iListH ){
                $("#wrapper, #wrap").css({
                    "overflow":"hidden",
                    "height":"auto"
                });
            }
        } else {
            toggle_over = false;
            $(".overlay2").remove();
            $("#wrapper, #wrap").animate({scrollTop:0},0);
            $("#wrapper, #wrap").css({
                "overflow":"hidden",
                "height":"auto"
            });
        }
    }

    // Hover
    function i_hover(){
        $(this).parents('ul:first').children('li').removeClass('hover');
        $(this).parents('li:first').toggleClass('hover');
    }

    // Hide
    function hide_option(){
        var t = $(this);
        setTimeout(function(){
            t.parents('div.selectList:first').removeClass('open');
            $(".overlay2").remove();
            $("#wrapper, #wrap").animate({scrollTop:0},0);
            $("#wrapper, #wrap").css({
                "overflow":"hidden",
                "height":"auto"
            });
            toggle_over = false;
        }, 1);
    }

    // Set Input
    function set_label(){
        var v = $(this).next('label').text();
        $(this).parents('ul:first').prev('.myValue').find('.tit').text('').append(v);
        $(this).parents('ul:first').prev('.myValue').addClass('selected');
    }

    // Set Input (2017 모바일웹 리뉴얼)
    function set_label_renew(){
        var v = $(this).next('label').text();
        $(this).parents('ul:first').prev('#myValue').find('#myTitle').text('').append(v);
        $(this).parents('ul:first').prev('#myValue').addClass('selected');
    }

    // Set Anchor
    function set_anchor(){
        var v = $(this).text();
        $(this).parents('ul:first').prev('.myValue').find('.tit').text('').append(v);
        $(this).parents('ul:first').prev('.myValue').addClass('selected');
    }

    // Set Anchor
    function set_anchor(){
        var v = $(this).text();
        $(this).parents('ul:first').prev('.myValue').find('.tit').text('').append(v);
        $(this).parents('ul:first').prev('.myValue').addClass('selected');
    }

    // Anchor Focus Out
    $('*:not("div.selectList a")').focus(function(){
        $('.aList').parent('.select').removeClass('open');
    });

    select_value.click(show_option);
    select_root.find('ul').css('position','absolute');
    select_root.removeClass('open');
    select_root.mouseleave(function(){$(this).removeClass('open'); $(".overlay2").remove(); toggle_over = false;});
    select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
    select_input.change(set_label).focus(set_label);
    select_input_renew.change(set_label_renew).focus(set_label_renew);
    select_label.hover(i_hover).click(hide_option);

    // Form Reset
    $('input[type="reset"], button[type="reset"]').click(function(){
        $(this).parents('form:first').find('.myValue').each(function(){
            var origin = $(this).next('ul:first').find('li:first label').text();
            $(this).text(origin).removeClass('selected');
        });
    });

});
