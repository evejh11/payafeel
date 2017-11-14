//웹페이지 브라우징된후 주소창 사라지기
function hideAddressBar()
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }
 
      setTimeout( function(){ window.scrollTo(0, 0); }, 50 );
  }
}
window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );

var $winW = $(window).width();
var $winH = $(window).height();
var $scrollTop = $(window).scrollTop();

// touch
function lock_touch(e){
    e.preventDefault();
}

//모달레이어팝업
function modalPopup(target){
    $('.modal-content').css("marginTop", 0);
    var $modalContent = $(target).find($('.modal-content'));

    $(target).css({
        'overflow': 'auto'
    }).show().addClass('open');

    var $modalContentH = $(target).find($('.modal-content')).height() + 40;
    var $conPos = ($winH / 2) - ($modalContentH / 2);
    var $vmodal = $(target).hasClass('v2');
    $('#wrapper').css({'overflow' : 'hidden','height' : $winH});
    if( $winH > $modalContentH ){
        document.addEventListener('touchmove', lock_touch);        
        $modalContent.css({marginTop: $conPos});
    }  else if ( $vmodal == true &&  $winH < $modalContentH ) {
        $('#wrapper').css({'overflow' : 'hidden','height' : $winH});
    }  else {
        $modalContent.css({marginTop: 0});
    }

    $("<div class='overlay'></div>").clone().appendTo("#wrapper");
    
    // 퍼블리싱 오류로 로컬에서만 주석처리
    /*if(GLOBAL_FLAG_APP_NEW == "Y") {
    	try {	
	    	if(GLOBAL_MOBILE_OS == "AND") {
	    		window.Android.setDimming(true);
	    	}
	    	else{
	    		window.webkit.messageHandlers.setDimming.postMessage(true);
	    	}
    	}
    	catch(ex) {}
    }*/
    return false;
};

//모달레이어팝업닫기
function modalPopupClose(target){

    document.removeEventListener('touchmove', lock_touch);
    $(target).find($('.modal-content')).css('margin-top',0);
    $(target).hide().removeClass('open');
    $(".overlay").remove();

    $('#wrapper').css({'overflow' : 'visible','height' : 'auto'});
    
    try {
	    if(GLOBAL_FLAG_APP_NEW == "Y") {
	    	if(GLOBAL_MOBILE_OS == "AND") {
	    		window.Android.setDimming(false);
	    	}
	    	else{
	    		window.webkit.messageHandlers.setDimming.postMessage(false);
	    	}
	    }
    }
    catch(ex) {}
};

//드롭다운
function dropdownMenu(e){
    var mbox = $(e).find(".menubox");
    var chk = $(e).hasClass("active");
    if ( chk == false ){
        mbox.show();
        $(e).addClass("active");
        mainH();
    } else {
        mbox.hide();
        $(e).removeClass("active");
        mainH();
    }
};

//드롭다운2 서브
function dropdownMenu2(e){
    var mbox = $(e).find(".menubox");
    var chk = $(e).hasClass("active");
    if ( chk == false ){
        mbox.show();
        $(e).addClass("active");

        $(".beforeAlimAreaIscroll").show();
        
    } else {
        mbox.hide();
        $(".beforeAlimAreaIscroll").hide();
        $(e).removeClass("active");
    }
};

//말풍선 애니메이션
function balloonOpen(e){

    var target = $(e).attr("href");
   
    var winW = $(window).width();
    var winH = $(window).height();

    var lyW = $(target).width();
    var lyH = $(target).height();

    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();

    var eLeft = ((winW - lyW) / 2);
    var eTop = ((winH - lyH) / 2) + scrollTop;

    $(target).css({
        "left": eLeft + "px",
        "top" : eTop + "px"
    });

    if ( !$(e).hasClass("active") ){
        $(target).show();
        setTimeout(function(){$(target).addClass('active');},800);
        setTimeout(function(){$(target).removeClass('active').hide();},1200);
    }

    $(e).toggleClass("active");

};

//스핀
$.fn.spin = function(opts) {
    this.each(function() {
        var $this = $(this),
            spinner = $this.data('spinner');

        if (spinner) spinner.stop();
        if (opts !== false) {
          opts = $.extend({color: $this.css('color')}, opts);
          spinner = new Spinner(opts).spin(this);
          $this.data('spinner', spinner);
        }
    });
    return this;
};
$(function() {
    var opts = {
        lines: 12, // The number of lines to draw
        length: 4, // The length of each line
        width: 2, // The line thickness
        radius: 4, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: -1, // 1: clockwise, -1: counterclockwise
        color: '#73829c', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    $(".spinner").show().spin(opts);
    
    
});

//input , 버튼 활성화
$(function() {
    $('.inputBar input[type=text], .srchBar input[type=text]').keyup(function() {
       if ( $(this).val() == "" ){
            $(this).next('span').removeClass("active");
            $(this).next('button').removeClass("active").attr("disabled","disabled");
       } else {
            $(this).next('span').addClass("active");
            $(this).next('button').addClass("active").removeAttr("disabled");
       }
    });

    //통합검색레이어팝업
    $('.srchBox input[type=search]').keyup(function() {
       if ( $(this).val() == "" ){
            $(this).next('button').removeClass("active").attr("disabled","disabled");
       } else {
            $(this).next('button').addClass("active").removeAttr("disabled");
       }
    });

    //사진올리기
    $('.textareaTy2 textarea').keyup(function() {
       if ( $(this).val() == "" ){
            $(this).next().next('button.btn_submit').removeClass("active").attr("disabled","disabled");
       } else {
            $(this).next().next('button.btn_submit').addClass("active").removeAttr("disabled");
       }
    });

    //평가 range
	$('.rangeTy input[type="range"]').change(function () {
		var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'))*5;
		$(this).removeClass();
		$(this).addClass('grade-0'+ val);
	});

    //댓글쓰기
    $(".btn_commentWrite").click(function(){
        $(".cmtWriteBox").show();
        return false;
    });
 });

$(document).ready(function(){
    
    //아코디언
    var $accotit = $("#accoTab > .tit");
    var $accoCont = $("#accoTab .contView");

    $accoCont.css("display","none");
    $accoCont.eq(0).show().addClass('active');
    $accotit.eq(0).addClass("active");
    $accotit.click(function(){
    	console.log("1233");
    	
        if ( $("+.contView", this).css("display") == "none"){
            $("+.contView", this).show();
            //var $objOffet = $(this).offset().top;
            //$("html,body").stop().animate({scrollTop:$objOffet},0);
            
            $(this).addClass("active");
        } else {
            $("+.contView", this).hide();
            console.log($(this));
            $(this).removeClass("active");
            console.log($(this).attr("class"));
        }

        //vip 안에 slide
//        var viptit = $(this).hasClass("vipChancetit");
//        if ( viptit == true) {
//            window.vipChanceSwipe = new Swipe(document.getElementById('vipChanceSwipe'), {
//                continuous: true,
//                stopPropagation: true,
//                callback: function(event, element) {
//                    $(".vipChance-nav > span").removeClass().eq(event).addClass("active");
//                }
//            });
//        }
        return false;
    }); 
    
    //프로파일 풍선말
    $(".btn_beautyProfile").click(function(){
        $(this).parents(".userInfoArea").find(".beautyProfileArea").show();
        return false;
    });
    $(".beautyProfileArea a.btnClose").click(function(){
        $(".beautyProfileArea").hide();
        return false;
    });
});

$(window).resize(function(){

    //모달레이어팝업
	$winW = $(window).width();
	$winH = $(window).height();
	var $modalCon = $('.modal-wrap');
	var $modalConH = $('.modal-wrap.open').find('.modal-content').height();
	var $conPos = ($winH / 2) - ($modalConH / 2);
    

		if( $modalCon.hasClass('open') && $winH > $modalConH ){
			document.addEventListener('touchmove', lock_touch);
			$modalCon.find('.modal-content').css({marginTop: $conPos});
		}  else {
			document.removeEventListener('touchmove', lock_touch);
			$modalCon.find('.modal-content').css({marginTop: 0});
		}
});


$(window).scroll(function(){
    //topbtn
    var $scrollT = $(window).scrollTop(); 
    if ( $scrollT > $winH ) {
        $(".topBtn").show();
    } else {
        $(".topBtn").hide();
    }
    
    /* if(GLOBAL_MOBILE_APP != ""){
    	$(".topBtn").hide();
    } */
    
    
    
});
$(".topBtn").click(function(){
    $("html,body").animate({scrollTop:0},0);
    return false;
});

