/**
 * 모바일 header의 이벤트 처리를 위한 Javascript
 */
var MobileHeader = {
	name : "MobileHeader",
	boldIndex : "",
	init : function() {
		
		boldIndex = $("input[name='i_sBoldIndex']").val();
		
		MobileHeader.setGnbSwipe();
		MobileHeader.addBtnEvent();
		var m_wel_cookie = $.cookie('m_welcome');
		if(m_wel_cookie == undefined || m_wel_cookie == ''){
			$(".m_welcome_top").show();
		}
		
		var targetflag = $("input[name='i_sTargetFlag']").val();
		if(targetflag != undefined && targetflag == "Y"){
			var m_newtarget = $.cookie("m_newtarget_popup");
			if(m_newtarget != undefined && m_newtarget == 1){
				var juyo_h = $(".juyo").height();
				
				$(".juyo").css("height","0");
				$(".all_popup_type").css("display","none");
				return ;
			}else{
//				all_popup_pos();
			}
		}else{
			$(".juyo").css("height","0");
			$(".all_popup_type").css("display","none");
		}
		
	   if($('.modal-wrap').hasClass('newCustomer')){
       		$('.overlay').css('display','none');
       }
	},
	addBtnEvent : function() {
		
//		swipe다음버튼
		$(".btn_next").unbind("click").click(function(){
			window.gnbSwipe.next();
		}),
		
//		bold, 클릭한페이지 세팅
		$(".a_event_link").unbind("click").click(function(){
							
			var links = $(".a_event_link");
			var newBoldIndex = links.index($(this));
			var size = links.length;
			
			var eventUrl = $(".i_sEventUrl").eq(newBoldIndex).val();
			
			var url = GLOBAL_WEB_URL + eventUrl + "&i_sBoldIndex=" + newBoldIndex;
			
			if (newBoldIndex == 0 || newBoldIndex == 1){
				url = GLOBAL_WEB_URL + eventUrl + "?i_sBoldIndex=" + newBoldIndex;
			}
			if(eventUrl != "" && eventUrl.indexOf("?")==-1){
				url = GLOBAL_WEB_URL + eventUrl + "?i_sBoldIndex=" + newBoldIndex;
			}
			
			location.href = url;
		});
		
		$("#getit").unbind("click").click(function(event){
			event.preventDefault();
			if(IS_LOGIN_SNS){
				showConfirmBox({
					message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
					, ok_func: function(){
						document.frm_login.submit();
					}
					, cancel_func: function(){
						return ;
					}
				});
			}else{
				location.href= GLOBAL_WEB_ROOT + "mobile/sale/mobile_sale_getit_coupon.do";
			}
		});
			
		$("#clubap").unbind("click").click(function(event){
			event.preventDefault();
			if(IS_LOGIN_SNS){
				showConfirmBox({
					message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
					, ok_func: function(){
						document.frm_login.submit();
					}
					, cancel_func: function(){
						return ;
					}
				});
			}else{
				location.href= GLOBAL_WEB_ROOT + "mobile/sale/mobile_sale_clubap_main.do";
			}
		});	
		
		$("#brstore").unbind("click").click(function(event){ 
			event.preventDefault();
			if(IS_LOGIN_SNS){
				showConfirmBox({
					message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func: function(){
							document.frm_login.submit();
						}
				, cancel_func: function(){
					return ;
				}
				});
			}else{
				location.href= GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_br_store.do";
			}
		});	
		
		$(".m_welcome_top .btnClose").unbind("click").click(function(event){
			event.preventDefault();
			$(".m_welcome_top").slideUp(100);
			
			var bannerWrap = $("#topBanner");
			bannerWrap.hide();
			bannerWrap.height(0);
			
			var bnr_imgcd = bannerWrap.find(".span_banner_imagecd").text();
			var comment3  = bannerWrap.find(".span_comment3").text();
			
			if(comment3 == "DAY_1") {//하루, 일주일, 한달에 맞춰서 쿠키에 값을 넣어줌
				$.cookie(bnr_imgcd, 1, {path:'/', expires:1});
			}
			else if(comment3 == "WEEK_1") {
				$.cookie(bnr_imgcd, 1, {path:'/', expires:7});
			}
			else if(comment3 == "MONTH_1") {
				$.cookie(bnr_imgcd, 1, {path:'/', expires:30});
			}
			return false;
			
		});
		
		$(".coupon_get").unbind("click").click(function(event){
			event.preventDefault();
			
			$(".all_popup_type").css("display","none");
			$(".all_popup_type2").css("display", "block");
			var juyo_h2 = $(".juyo2").height();
			$(".all_popup_type2").css("margin-top", -juyo_h2/2);
			
		});
		
		$(".oneday_stop").unbind("click").click(function(event){
			event.preventDefault();
			$.cookie("m_newtarget_popup", 1, {path:'/', expires:1});
			$(".all_popup_type").css("display","none");
		});
		
		$(".popClose").unbind("click").click(function(event){
			event.preventDefault();
			if($.cookie("m_newtarget_popup") == 1){
				return;
			}else{
				$.cookie("m_newtarget_popup", 1, {path:'/', expires:1});
			}
		});
		
		$(".go_coupon").unbind("click").click(function(event){
			event.preventDefault();
			$.cookie("m_newtarget_popup", 1, {path:'/', expires:1});
			location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
		});
		
		 $(".all_popup_close").unbind("click").click(function(){
		 	$(".all_popup_type").css("display","none");
		 	if($.cookie("m_newtarget_popup") == 1){
				return;
			}else{
				$.cookie("m_newtarget_popup", 1, {path:'/', expires:1});
			}
		 });
		 
		 $(".all_popup_close2").unbind("click").click(function(){
		 	$(".all_popup_type2").css("display","none");
		 	if($.cookie("m_newtarget_popup") == 1){
				return;
			}else{
				$.cookie("m_newtarget_popup", 1, {path:'/', expires:1});
			}
		 });
	},
	setGnbSwipe : function() {
		
		var links = $(".a_event_link");
		
		links.removeClass("on");
		links.eq(boldIndex).addClass("on");
		
		if(boldIndex != 'undefined' || boldIndex != ''){
			boldIndex = ((boldIndex / 2) - 1) < 0 ? 0 : (boldIndex / 2) - 1 
		}
		
		window.gnbSwipe = new Swipe(document.getElementById('gnbSwipe'), {
			continuous : true,
			stopPropagation : true,
			startSlide : boldIndex
		});
	}
};