var specialparam = {
	i_iNowSpPageNo		: parseInt($('#i_iNowSpPageNo').val() || "1", 10),
	i_iPageSpSize		: parseInt($('#i_iPageSpSize').val() || "2", 10),
	i_iTotalSpPageCnt	: parseInt($('#i_iTotalSpPageCnt').val() || "1", 10),
	i_iSpRecordCnt		: parseInt($('#i_iSpRecordCnt').val() || "1", 10),
};

var bannerParam = {
		i_iNowBnPageNo		: parseInt($('#i_iNowBnPageNo').val() || "1", 10),
		i_iPageBnSize		: parseInt($('#i_iPageBnSize').val() || "2", 10),
		i_iTotalBnPageCnt	: parseInt($('#i_iTotalBnPageCnt').val() || "1", 10),
		i_iBnRecordCnt		: parseInt($('#i_iBnRecordCnt').val() || "1", 10),
};

var tochancnt = 0;
var prdbanner;
var bnrcnt  = 0;
var tochan;
var mainbanner;
var rankingSwipe = false;
/**
 * 모바일 메인화면의 이벤트 처리를 위한 Javascript
 */
var	MobileMain = {
	name : "MobileMain",

	isRankingShow	: false,
	isBestPriceShow	: false,
	isFirstVisited	: true,

	isSec1Loaded	: false,
	isSec2Loaded	: false,
	isSec3Loaded	: false,
	isSec4Loaded	: false,
	isSec5Loaded	: false,
	isSec6Loaded	: false,

	isLoadingSpacialPrdList	: false,		//스페셜 기프트에 페이지되고 있는지
	isLoadingProductBanner : false,

	brandiscroller	: null,
	eventIndex		: -1,
	arr_image_wrap : undefined,

	init : function() {
		
		MobileMain.arr_image_wrap = $(".main_SecLoad");
		
		MobileMain.fn.setShowApmallJoin();
		
		if(GLOBAL_MOBILE_APP != 'APP'){
			MobileMain.fn.setShowAppDownload();
		}
		
		var userAgent = navigator.userAgent.toLowerCase();
		
		if(userAgent.indexOf('apmall')>=0){
			if(userAgent.indexOf("'ver':'1.7'") >= 0){
				if(confirm("버전 업데이트가 필요합니다.\n 앱스토어로 이동합니다.")){
					location.href = 'https://itunes.apple.com/kr/app/id662044174?mt=8';
				}
			}
		}
		if(GLOBAL_MOBILE_APP == 'APP'){
			MobileMain.fn.showTopBanner();
		}
		
		// 메인 서브메뉴를 보여준다.
		$('nav.gnbmenu').show();

		// 메인화면 Swipe 설정
		MobileMain.fn.setMainSwipe();

		//버튼 이벤트
		MobileMain.fn.addBtnEvent();
		
		// 투데이 딜/사은품 탭 처리
		MobileMain.fn.setTodayTab();
		
		// 랭킹 탭 처리
		//MobileMain.fn.setRankingTab();
		
		// 브랜드 탭 처리
		//MobileMain.fn.setBrandScroll();
		MobileMain.fn.setRealtimeRanking();
		MobileMain.fn.checkForViewportChange();
		
		$( window ).on( 'load resize scroll' ,function() {
			MobileMain.fn.setScrollEvent();
		});
		
		var state = window.getComputedStyle(document.body,':before').content;
		if (state == "\"tablet\"") {
			$(".btn_extend").hide();
			$(".realtime_tabmenu").css("padding-right","0");
			MobileMain.fn.realtimeCollapse();
			$(".btn_realtimeClose").hide();
			//MobileMain.fn.realtimeDropdown();
		} else {
			MobileMain.fn.realtimeDropdown();
			$(".btn_extend").show();
			$(".realtime_tabmenu").css("padding-right","38px");
			
			$(".btn_realtimeClose").show();
		}
		$(window).resize(function() {
			var state = window.getComputedStyle(document.body,':before').content;
			this.lastState = this.lastState || "";
			if (state != this.lastState) {
				if (state == "\"tablet\"") {
					$(".btn_extend").hide();
					$(".realtime_tabmenu").css("padding-right","0");
					MobileMain.fn.realtimeCollapse();
					$(".btn_realtimeClose").hide();
					//MobileMain.fn.realtimeDropdown();
				} else {
					MobileMain.fn.realtimeDropdown();
					$(".btn_extend").show();
					$(".realtime_tabmenu").css("padding-right","38px");
					
					$(".btn_realtimeClose").show();
				}
				this.lastState = state;
			}
	    });
	},

	fn : {
		setScrollEvent : function () {
			var win_scroll_top = $(window).scrollTop();
			var win_height = $(window).height();
			var top_gap = 300;
			var target_top = win_scroll_top + win_height + top_gap;
			var arr_image_wrap = MobileMain.arr_image_wrap;

			var arr_wrap = arr_image_wrap;
			var len = arr_wrap.length;

			for(var i=0; i<len; i++){
				var top = arr_wrap.eq(i).offset().top;
				if(!arr_wrap.eq(i).hasClass("img_load_complete")){
					if (target_top > top) {
						MobileMain.fn.getImage(arr_wrap.eq(i));
						arr_wrap.eq(i).addClass("img_load_complete");
						
						
						var dev_today = arr_wrap.eq(i).find(".todayChanceSlide");
						var dev_banner = arr_wrap.eq(i).find(".nowBannerImg");
						
						if (dev_today.length > 0) {
							
							var dev_today_id = dev_today.eq(0).attr("id");
							
							new Swipe(document.getElementById(dev_today_id), {
								continuous: true,
								stopPropagation: true,
								callback: function(event, element) {
									$("#" + dev_today_id +">.today_chance_nav>span").removeClass("active").eq(event).addClass("active");
								}
							});
						}
						
//						if (dev_banner.length > 0) {
//							
//							var dev_banner_id = dev_banner.eq(0).attr("id");
//							
//							new Swipe(document.getElementById(dev_banner_id), {
//								continuous: true,
//								stopPropagation: true,
//								callback: function(event, element) {
//									$("#" + dev_banner_id +">.nowBanner-nav>span").removeClass("active").eq(event).addClass("active");
//								}
//							});
//						}
					}
				}
				MobileMain.fn.mainH();
			}
		},
		getImage: function(wrap){
			fnImgSrcChange(wrap);
		},
		addBtnEvent : function(){
			
			$(window).resize(function() {
				MobileMain.fn.checkForViewportChange();
		    });
			
			$(".btn_cart").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_cart").index($(this));
				var productcd = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd = $("input[name='i_arrOptioncd']").eq(idx).val();
				var solopack = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				
				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];
				
				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						var target = "#balloonBasket";
						   
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
					    
					    $(target).show();
					    setTimeout(function(){$(target).addClass("active");}, 800);
					    setTimeout(function(){$(target).removeClass('active').hide();},1200);
					}
				});
			});
			$(".btn_cart2").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_cart2").index($(this));
				var productcd = $(".span_productcd_spec").eq(idx).text();
				var optioncd = $(".span_optioncd_spec").eq(idx).text();
				var solopack = $(".span_flagsolopack_spec").eq(idx).text();
				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];
				
				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						var target = "#balloonBasket";
						   
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
					    
					    $(target).show();
					    setTimeout(function(){$(target).addClass("active");}, 800);
					    setTimeout(function(){$(target).removeClass('active').hide();},1200);
					}
				});
			});
			
			$(".btn_nowBuy").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_nowBuy").index($(this));
				var productcd = $(".span_productcd_spec").eq(idx).text();
				var optioncd = $(".span_optioncd_spec").eq(idx).text();
				var solopack = $(".span_flagsolopack_spec").eq(idx).text();
				if(IS_LOGIN){
					var list = [{
						productcd : productcd
						, optioncd : optioncd
						, cnt : 1
						, flagSoloPack : solopack
					}];
					
					MobileBodyStart.addUserCart({
						list : list
						, callback : function(){
							location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
						,ok_str  : "로그인 구매"
						,ok_func : function(){
							MobileBodyStart.goLogin();
						}
						,cancel_str : "비로그인 구매"
						,cancel_func : function(){
							var list = [{
								productcd : productcd
								, optioncd : optioncd
								, cnt : 1
								, flagSoloPack : solopack
							}];
							
							MobileBodyStart.addUserCart({
								list : list
								, callback : function(){
									location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
								}
							});
						}
					});

				}
				
			});
			/* 이벤트 버튼 셋 start */
			$(document).on("click",".ico_like",function(event){			//
				event.preventDefault();
				var eve_index = $("article.eventSec .ico_like").index($(this));
				MobileMain.fn.addLike(eve_index);
			});
			
			$(document).on("click",".ico_comment",function(event){
				event.preventDefault();
				var eve_index = $("article.eventSec .ico_comment").index($(this));
				var $div_eve = $("article.eventSec .evtDetail").eq(eve_index);
				var i_sEventcd = $("a",$div_eve).attr('id');
				document.location.href = GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+i_sEventcd;
			});
			
			$(document).on("click",".ico_comment",function(event){
				event.preventDefault();
				var eve_index = $("article.eventSec .ico_comment").index($(this));
				var $div_eve = $("article.eventSec .evtDetail").eq(eve_index);
				var i_sEventcd = $("a",$div_eve).attr('id');
				document.location.href = GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+i_sEventcd;
			});
			
			$("#modalPopupEvtShare .popupEvtShare #btn_facebook").click(function(event){		//페이스북 현재 정확한 구현 안됨(링크 오류)
				event.preventDefault();
				var eve_index = MobileMain.eventIndex;
				var $div_eve = $("article.eventSec .evtDetail").eq(eve_index);
				
				var i_sEventnm = $(".ttl",$div_eve).html();
				var i_sSnsTitle = $(".txt",$div_eve).html();
				var i_sEventcd = $("a",$div_eve).attr('id');
				var shareCon = $(".ico_share").attr("id");
				var i_sImgPath = shareCon.split(",")[0];
				var i_sDesc = shareCon.split(",")[1];
				
				if(GLOBAL_MOBILE_APP == 'APP'){

					if(GLOBAL_MOBILE_OS == 'iOS'){
						window.location = "apjscall://jsFaceBookFeed?i_sSnsTitle="+i_sSnsTitle+"&i_sSnsUrl=http:\\www.apmall.co.kr/mobile/main.do&i_sEventnm="+i_sEventnm;
					}else{
						window.aMain.jsFaceBookFeed(i_sSnsTitle, "http://dev.amorepacificmall.co.kr/mobile/main.do",i_sEventnm);
					}
					
				}else{
					
					FB.init({appId:"1470496703186293", status: true, cookie: true});
					//113774305459557
					FB.ui ({
						method: "feed",
						name:i_sSnsTitle,
						link: GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+i_sEventcd,
						picture:i_sImgPath,
						description:i_sDesc,
					},	function(response) {
						if(response && response.post_id){
							self.close();
						}
					}
					);
				}

			});
			
			$("#modalPopupEvtShare .popupEvtShare #btn_kakao").click(function(event){		//카카오톡
				event.preventDefault();
				
				var eve_index = MobileMain.eventIndex;
				var $div_eve = $("article.eventSec .evtDetail").eq(eve_index);
				var i_sEventcd = $("a",$div_eve).attr('id');
				var i_sEventnm = $(".ttl",$div_eve).html();
				var i_sSnsTitle = $(".txt",$div_eve).html();
				var shareCon = $(".ico_share").attr("id");
				var i_sImgPath = shareCon.split(",")[0];
				var i_sDesc = shareCon.split(",")[1];
				
				kakao.link("talk").send({
					msg : i_sSnsTitle,
					url : GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+i_sEventcd,
					appid : GLOBAL_WEB_URL+"mobile/",
					appver : "1.0",
					appname : "["+i_sDesc+"]",
					type : "link"
				});
			});
			
			$(".topBannerArea .btn_appDownClose").click(function(){
                var topChk = $(".topBannerArea").find(".m_top");
                $(".appDownBanner").remove();
                if ( topChk ){
                    $(".m_top").show();
                }
                return false; 
            });
            $(".topBannerArea .m_top .btnClose").click(function(){
                $(".m_top").slideUp(100);
                return false;
            });
			/* 이벤트 버튼 셋 end */
		},
		showTopBanner : function(){
			var bannerWrap = $("#topBanner");
			var bnr_imgcd = bannerWrap.find(".span_banner_imagecd").text();
			var comment3  = bannerWrap.find(".span_comment3").text();
			
			if(bannerWrap == undefined || bannerWrap.length == 0){
				return;
			}
			if($.cookie(bnr_imgcd) == 1){
				return;
			}
			
			bannerWrap.show();
			
			$(".btnClose", bannerWrap).click(function(){
				bannerWrap.hide();
				bannerWrap.height(0);
				
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
		},
		/**
		 * 좋아요 기능 
		 * */
		addLike :  function(eve_index){
			
			var $div_evt = $("article.eventSec .evtDetail").eq(eve_index);
			var $div_soc = $("article.eventSec .socialList").eq(eve_index);
			var i_sEventcd = $("a",$div_evt).attr('id');
			
			var frm = $("form[name='frm']");
			var isLogin = $("input[name='isLogin']",frm).val();
			if(isLogin == 'N'){
				showConfirmBox({
					message : "로그인 하시면 서비스 이용이 가능하세요!",
					ok_func : function(){
						$("form[name='frm']").attr("action",GLOBAL_WEB_URL+"mobile/mbr/mobile_mbr_member_login.do").submit();
					}
				});
			}
			else{
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_view_ajax.do",
				type : "POST",
				dataType : "json",
				data : {"i_sEventcd":i_sEventcd , "i_sFlagAction" : "UL"},
				animation : false,
				success : function(data,textStatus,jqXHR){
							if(data.status=='succ'){
								if(data.object == "like") {
									var like_cnt = parseInt($(".ico_like > span",$div_soc).html(),10);
									$(".ico_like > span",$div_soc).html(like_cnt+1);
									balloonOpen($(".ico_like").eq(eve_index));	
									$(".ico_like",$div_soc).addClass("active");
								} else {
									var like_cnt = parseInt($(".ico_like > span",$div_soc).html(),10);
									$(".ico_like > span",$div_soc).html(like_cnt-1);
									$(".ico_like",$div_soc).removeClass("active");
								}						
							}
							else if(data.status == 'isNotLogin'){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									$("form[name='frm']").attr("action",GLOBAL_WEB_URL+"mobile/mbr/mobile_mbr_member_login.do").submit();
									}
								});
							}
							else{
								showMessageBox({
									message :  data.message
								});
							}
						}
				});
			}
		},
		/**
		 * 앱 실행/다운로드 배너 노출 처리
		 */
		setShowAppDownload : function() {
			// 새로운 세션으로 메인 접속 시마다 앱 실행/다운로드 배너를 보여준다.
			if ("Y" == $('#isAccessed').val()) {
				if ("closed" != getCookie("appDownBanner")) {
					$('.appDownBanner',".topBannerArea").show();

					$('.btn_appDownClose').click(function() {
						$('.appDownBanner').slideUp(100);
						setCookie("appDownBanner", "closed", 1);
					});
				}
			} else {
				$('.appDownBanner',".topBannerArea").show();

				$('.btn_appDownClose').click(function() {
					$('.appDownBanner').slideUp(100);
					setCookie("appDownBanner", "closed", 1);
				});
			}
		},
		/**
		 * 최초 접속시 AP몰 즐기기 레이어팝업을 보여준다.
		 */
		setShowApmallJoin : function() {
			MobileMain.isFirstVisited	= "visited" != getCookie("apmallVisited");

			if (MobileMain.isFirstVisited) {
				if(GLOBAL_MOBILE_APP == 'APP'){
					if(GLOBAL_MOBILE_OS == 'iOS'){
						window.location="apjscall://hideMenuBar";
					}
				}
				
				$('.appDownBanner').hide();
				//modalPopup('#modalPopupApmallJoin');

				window.apmallJoinSwipe	= new Swipe(document.getElementById('apmallJoinSwipe'), {
					startSlide: 0,
					continuous: false,
					stopPropagation: true,
					callback: function(event, element) {
						$(".apmallJoin-nav > span").removeClass().eq(event).addClass("active");
						$(".modal-wrap").stop().animate({scrollTop:0},0);
					}
				});
			}
		},
		/**
		 * 메인화면 Swipe 설정
		 */
		setMainSwipe : function() {
			window.mainSwipe	= new Swipe(document.getElementById('mainSwipe'), {
				continuous: true,
				callback: function(index, element) {
					var	wrapper	= $(".swipe-wrap");
					var	posi	= mainSwipe.getPos();
					var	hoehe	= $("#article"+posi).height();

					wrapper.height(hoehe);
					$(".gnbmenu ul li").removeClass().eq(index).addClass("active");
					
					window.scrollTo(0, $("header").offset().top);//tab을 옮길때마다 맨위를 보게 함
					
					if (true == $(".gnbmenu ul li").eq(0).hasClass("active")) {			//지금 tab을 선택
						
						//지금탭 선택시 기존에 로드된 리스트가 삭제 되므로 길이를 조정
						var	hoehe	= $("#article"+posi).height();
						wrapper.height(hoehe);
						
						try {
							ga('send', {'hitType': 'pageview', 'page': '/mobile/main.do?tab=now', 'title': '메인 - 지금'});
						} catch (e) {}
					}
					else if (true == $(".gnbmenu ul li").eq(1).hasClass("active")) {			//스페셜 기프트 tab을 선택
						if(MobileMain.isSec2Loaded	!= true){
							MobileMain.fn.getSpecialList(1);
						}
						try {
							ga('send', {'hitType': 'pageview', 'page': '/mobile/main.do?tab=sc', 'title': '메인 - 스페셜 기프트'});
						} catch (e) {}
					}
					else if (true == $(".gnbmenu ul li").eq(2).hasClass("active")) {			//이벤트 tab을 선택
						if(MobileMain.isSec3Loaded	!= true){
							MobileMain.fn.setEventlList();
						}
						try {
							ga('send', {'hitType': 'pageview', 'page': '/mobile/main.do?tab=event', 'title': '메인 - 이벤트'});
						} catch (e) {}
					}
					else if (true == $(".gnbmenu ul li").eq(3).hasClass("active")) {				//rankingmenu에 오면 counter 실행
						if(MobileMain.isSec4Loaded	!= true){
							MobileMain.fn.setRankingTab();
							MobileMain.fn.setRankingList();
							
						}
						try {
							ga('send', {'hitType': 'pageview', 'page': '/mobile/main.do?tab=rank', 'title': '메인 - 랭킹'});
						} catch (e) {}
					}
					else if (true == $(".gnbmenu ul li").eq(4).hasClass("active")) {			//brand tab을 선택
						MobileMain.fn.brandinit();
						try {
							ga('send', {'hitType': 'pageview', 'page': '/mobile/main.do?tab=brand', 'title': '메인 - 브랜드'});
						} catch (e) {}
					}

					// mainContainer 리사이즈시 높이값 설정
					$(window).load(function(){
						var	hoehe	= $("#article"+posi).height();
						wrapper.height(hoehe);
					});
				}
			});

			//gnb메뉴 클릭시
			var	$gnbMenuItem	= $(".gnbmenu li a");
			$gnbMenuItem.unbind("click").click(function(event) {
				event.preventDefault();
				$(window).unbind("scroll");
				var	$gnbmenuIdx	= $gnbMenuItem.index(this);
				mainSwipe.slide($gnbmenuIdx, 300);
				return false;
			});
		},
		/**
		 * 메인 컨텐츠의 높이값
		 */
		mainH : function() {
			if ('undefined' == typeof(mainSwipe)) {
				return;
			}

			var	wrapper	= $(".swipe-wrap");
			var	posi	= mainSwipe.getPos();
			var	hoehe	= $("#article"+posi).height();

			wrapper.height(hoehe);
		},
		dropdownMenu : function(e) {
			var mbox = $(e).find(".menubox");
		    var chk = $(e).hasClass("active");
		    if ( chk == false ){
		        mbox.show();
		        $(e).addClass("active");
		        MobileMain.fn.mainH();
		    } else {
		        mbox.hide();
		        $(e).removeClass("active");
		        MobileMain.fn.mainH();
		    }
		},
		/**
		 * 실시간 랭킹 슬라이드 설정
		 */
		setRealtimeRanking : function() {
			
				var	$btnExtend			= $(".btn_extend");

				var	$realtimeSwipeNav	= $(".realtimeSwipe_nav > span");
				var	$realtimeTab		= $(".realtime_tabmenu ul li");
				var	$realtimeTabItem	= $(".realtime_tabmenu ul li a");
				/*
				window.realtimeSwipe	= new Swipe(document.getElementById('realtimeSwipe'), {
					continuous: false,
					stopPropagation: true,
					callback: function(event, element) {
						$realtimeSwipeNav.removeClass("active").eq(event).addClass("active");
						if ((event == 0) || (event == 1) || (event == 2) || (event == 3)) {
							$realtimeTab.removeClass("active").eq(0).addClass("active");
						} else if ((event == 4) || (event == 5)||(event == 6) || (event == 7)) {
							$realtimeTab.removeClass("active").eq(1).addClass("active");
						}
					}
				});
				*/
				 $('#vticker').vTicker('init', {
	                 speed: 450, 
	                 paddingRight:30});
				 
				$btnExtend.unbind("click").click(MobileMain.fn.realtimeCollapse);

				$(".btn_realtimeClose").unbind("click").click(function(event) {
					event.preventDefault();
					MobileMain.fn.realtimeDropdown();
					return false;
				});

//				$realtimeTabItem.unbind("click").click(function(event) {
//					event.preventDefault();
//					var	$i	= $(".realtime_tabmenu li a").index(this);
//
//					if ($i == 0) {
//						realtimeSwipe.slide(0, 270);
//						$realtimeSwipeNav.removeClass("active").eq(0).addClass("active");
//						$realtimeTab.removeClass("active").eq(0).addClass("active");
//					} else if ($i == 1) {
//						realtimeSwipe.slide(4, 270);
//						$realtimeSwipeNav.removeClass("active").eq(4).addClass("active");
//						$realtimeTab.removeClass("active").eq(1).addClass("active");
//					}
//
//					return false;
//				});
		},
		/**
		 * 실시간 랭킹 슬라이드 접기
		 */
		realtimeDropdown : function() {
			var	$btnExtend		= $(".btn_extend");
			var	$realtimeSlide	= $(".realtime_slide");

			$btnExtend.removeClass("active");
			$(".realtime_head").show();
			$('#vticker').vTicker('pause',false);

			$realtimeSlide.stop().animate({height:"0px"}, 0, function() {
				MobileMain.fn.mainH();
			});
		},

		/**
		 * 실시간 랭킹 슬라이드 펼치기
		 */
		realtimeCollapse : function() {
			var	$realtimeSlide	= $(".realtime_slide");
			var	chk				= $(".btn_extend").hasClass("active");

			if (chk == false) {
				$('#vticker').vTicker('pause',true);
				$(".btn_extend").addClass("active");
				$(".realtime_head").hide();

				//var	h	= $(".realtime_tabmenu").offset().top;
				$realtimeSlide.stop().animate({height:"207px"}, 0, function() {
					MobileMain.fn.mainH();
				});

				//$("html, body").stop().animate({scrollTop:h}, 0, function() {
				//	$realtimeSlide.stop().animate({height:"277px"}, 0, function() {
				//		MobileMain.fn.mainH();
				//	});
				//}); 
				
				if(!rankingSwipe){
					var	$realtimeSwipeNav	= $(".realtimeSwipe_nav > span");
					var	$realtimeTab		= $(".realtime_tabmenu ul li");
					var	$realtimeTabItem	= $(".realtime_tabmenu ul li a");
					window.realtimeSwipe	= new Swipe(document.getElementById('realtimeSwipe'), {
						continuous: false,
						stopPropagation: true,
						callback: function(event, element) {
							$realtimeSwipeNav.removeClass("active").eq(event).addClass("active");
							if ((event == 0) || (event == 1) || (event == 2) || (event == 3)) {
								$realtimeTab.removeClass("active").eq(0).addClass("active");
							} else if ((event == 4) || (event == 5)||(event == 6) || (event == 7)) {
								$realtimeTab.removeClass("active").eq(1).addClass("active");
							}
						}
					});
					
					$realtimeTabItem.unbind("click").click(function(event) {
						event.preventDefault();
						var	$i	= $(".realtime_tabmenu li a").index(this);

						if ($i == 0) {
							realtimeSwipe.slide(0, 270);
							$realtimeSwipeNav.removeClass("active").eq(0).addClass("active");
							$realtimeTab.removeClass("active").eq(0).addClass("active");
						} else if ($i == 1) {
							realtimeSwipe.slide(4, 270);
							$realtimeSwipeNav.removeClass("active").eq(4).addClass("active");
							$realtimeTab.removeClass("active").eq(1).addClass("active");
						}

						return false;
					});
					rankingSwipe = true;
				}
			} else {
				MobileMain.fn.realtimeDropdown();
			}

			return false;
		},

		/**
		 * 투데이 딜/사은품 탭 처리
		 */
		setTodayTab : function() {
			var	$tabCate	= $(".todayEvent .tab_cate"); 
			var	$tabCont	= $(".todayEvent .tab_cont");

			$tabCate.click(function() {
				var	$idxTab	= $tabCate.index(this);
				if($(this).attr("id") != "tochan"){
					$("#tochan_more").hide();
					$("#today_chance_nav").hide();
				}else{
					$("#tochan_more").show();
					$("#today_chance_nav").show();
				}
				$tabCont.hide().eq($idxTab).show();
				
				$tabCate.removeClass("active").eq($idxTab).addClass("active");

				return false;
			});
		},

		/**
		 * 랭킹 탭 처리
		 */
		setRankingTab : function() {
			var	$tabCate	= $(".priceBestTab .tab_cate"); 
			var	$tabCont	= $(".priceBestTab .tab_cont");

			$tabCate.click(function(e) {
				var	$idxTab	= $tabCate.index(this);

				$tabCont.hide().eq($idxTab).show();
				$tabCate.removeClass("active").eq($idxTab).addClass("active");
				MobileMain.fn.mainH();

				return false;
			});

			$(".realtimeraking .ranki").hide();

			$(".btn_rankingten").click(function(e) {
				$(this).hide();
				$(this).prev().find($(".realtimeraking .ranki")).show();
				MobileMain.fn.mainH();

				return false;
			});
		},

		/**
		 * 브랜드 탭 스크롤 처리
		 */
		setBrandScroll : function() {
			MobileMain.fn.scrollWidth();

			MobileMain.brandiscroller	= new iScroll('brandiscroller', {
				zoom:false,
				momentum: true,
				vScroll:false,
				hScrollbar:false,
				onBeforeScrollStart:function(e){
					e.preventDefault();
					e.stopPropagation();
					$("#brandiscroller").addClass("in");
				}
			});

			$(".brandList li a").click(function() {
				$(".brandList li").removeClass();
				$(this).parent().addClass("active");
				
				MobileMain.fn.brandList();		//브랜드 리스트를 가져온다
				
				return false;
			});
		},

		/**
		 * iscroll 가로값 체크
		 */
		scrollWidth : function() {
			var	aw	= 0;

			$(".brandList li").each(function() {
				var	$eW	= $(this).width();
				aw	= aw + $eW;
			});

			$('.brandList').css('width', aw);
		},

		checkForViewportChange : function(){
			var state = window.getComputedStyle(document.body,':before').content;
			this.lastState = this.lastState || "";
			if (state != this.lastState) {
				if (state == "tablet") {
					
					$(".btn_extend").hide();
					$(".realtime_tabmenu").css("padding-right","0");
					MobileMain.fn.realtimeCollapse();
					$(".btn_realtimeClose").hide();
					//MobileMain.fn.realtimeDropdown();
				} else {
					MobileMain.fn.realtimeDropdown();
					$(".btn_extend").show();
					$(".realtime_tabmenu").css("padding-right","38px");
					
					$(".btn_realtimeClose").show();
				}
				this.lastState = state;
			}
		},
		// 지금 가장 인기 많은 상품
		setNowHotItem : function (rank_list) {
			
			var $section = $("section.nowhotItem");
			var $ul = $(".prodAlbumType>ul",$section);
			
			// 실시간 판매순위
			if (rank_list != undefined) {
				var len 		= rank_list.length;
				
				for (var i = 0; i < len; i++) {
					
					var $li = $("li",$ul).eq(0).clone(true);
					
					$(".prod_link",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+rank_list[i].v_productcd);
					var tagcd = "";
					if(rank_list[i].v_labelcd != undefined && rank_list[i].v_labelcd != ""){
						tagcd = "la" + rank_list[i].v_labelcd;
						$(".thumbImg>.ico_label",$li).show();
					}else{
						$(".thumbImg>.ico_label",$li).hide();
					}
					var tagnm = "";
					if(rank_list[i].v_tagnm != undefined && rank_list[i].v_tagnm != null){
						var tagnm_ori = rank_list[i].v_tagnm.split(" ");
						for ( var j = 0; j < tagnm_ori.length; j++) {
							tagnm += "<em>"+tagnm_ori[j]+"</em>";
						}
					}
					$(".thumbImg>.ico_label",$li).addClass(tagcd);
					$(".thumbImg>.ico_label",$li).html(tagnm);
					
					var img_path = rank_list[i].v_img_web_path || "";
					
					if (img_path.indexOf("_155") > -1) {
						img_path = img_path.replace("_155", "_356");
					}
					
					$(".thumbImg>img",$li).attr("src", img_path);

					$(".brandNm",$li).html(rank_list[i].v_brandnm);
					$(".prodNm",$li).html(rank_list[i].v_productnm);
					
					var n_list_price = rank_list[i].n_list_price;
					var n_price = rank_list[i].n_price;
					if(n_price < n_list_price){
						$(".sale",$li).html("<em>"+SetNumComma(n_list_price)+"</em>원");
					}else{
						$(".sale",$li).remove();
					}
					$(".price",$li).html("<em>"+SetNumComma(n_price)+"</em>원");
					
					$(".gradeType",$li).addClass("grade0"+parseInt(rank_list[i].n_single_point));
					$(".gradeType>span",$li).html(rank_list[i].n_single_point);
					$(".replyCount",$li).html("("+rank_list[i].n_review_cnt+")");
					
					if(rank_list[i].v_statuscd == "0002") {
						$(".stateArea",$li).attr("style","display:");
					}else{
						$(".stateArea",$li).attr("style","display:none;");
					}
					
					$($li).appendTo($ul);
				}
				$("li",$ul).eq(0).remove();
				for(var i=0;i<len;i++){
					if(i < 6) {
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					} else {
						$("li",$ul).eq(i).removeClass("active");
						$("li",$ul).eq(i).attr("style","display:none;");
					}
				}
				
				$("section.nowhotItem>.btn_more").unbind("click").click(function(event){		//지금 가장 인기많은 상품 더보기
					event.preventDefault();
					var $section = $("section.nowhotItem");
					var $ul = $(".prodAlbumType>ul",$section);
					var cnt = 0;
					$("li",$ul).each(function(){
						if($(this).hasClass("active")){
							cnt++;
						}
					});
					cnt = (cnt/6)+1;
					$("li",$ul).hide();
					$("li",$ul).eq(i).removeClass("active");
					for(var i=0;i<6*cnt;i++){
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					}
					if(cnt < 5 && (6*cnt) < len){
						$(".btn_more>",$section).show();
					}else{
						$(".btn_more>",$section).hide();
					}
					
					MobileMain.fn.mainH();
				});
			}
		},
		setLatelyRecomItem : function(list) {

			var $section = $("section.recomSec");
			var $ul = $(".prodAlbumType>ul",$section);
			// 실시간 판매순위
			if (list != undefined && list.length > 0) {
				var len 		= list.length;
				
				for (var i = 0; i < len; i++) {
					
					var $li = $("li",$ul).eq(0).clone(true);
					
					$(".prod_link",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+list[i].v_productcd);
					var tagcd = "";
					var tagnm = "";
					var banner = list[i].v_banner;
					if(banner != undefined && banner != ""){
						tagcd = "la" + banner.split(",")[2];
						
						if(banner.split(",")[1].length == 2) {
							tagnm = "<em>"+banner.split(",")[1]+"</em>";
						} else {
							tagnm = "<em>"+banner.split(",")[1].substring(0,2)+"</em><em>"+banner.split(",")[1].substring(2,4)+"</em>";
						}
						
						$(".thumbImg>.ico_label",$li).addClass(tagcd);
						$(".thumbImg>.ico_label",$li).html(tagnm);
						$(".thumbImg>.ico_label",$li).show();
					}else{
						$(".thumbImg>.ico_label",$li).hide();
					}
					
					$(".thumbImg>img",$li).attr("src",list[i].v_img_path);

					$(".brandNm",$li).html(list[i].v_brandnm);
					$(".prodNm",$li).html(getByteString(list[i].v_productnm, 14));
					
					var n_list_price = list[i].n_list_price;
					var n_price = list[i].n_price;
					if(n_price < n_list_price){
						$(".sale",$li).html("<em>"+SetNumComma(n_list_price)+"</em>원");
					}else{
						$(".sale",$li).remove();
					}
					$(".price",$li).html("<em>"+SetNumComma(n_price)+"</em>원");
					
					$(".gradeType2",$li).addClass("grade0"+parseInt(list[i].n_single_point));
					$(".gradeType2>span",$li).html(list[i].n_single_point);
					$(".replyCount",$li).html("("+list[i].n_review_cnt+")");
					
					if(list[i].v_statuscd == "0002") {
						$(".stateArea",$li).attr("style","display:");
					}else{
						$(".stateArea",$li).attr("style","display:none;");
					}
					
					$($li).appendTo($ul);
				}
				$("li",$ul).eq(0).remove();
				for(var i=0;i<len;i++){
					if(i < 3) {
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					} else {
						$("li",$ul).eq(i).removeClass("active");
						$("li",$ul).eq(i).attr("style","display:none;");
					}
				}
				
				$("section.recomSec>.btn_more").unbind("click").click(function(event){		//지금 가장 인기많은 상품 더보기
					event.preventDefault();
					var $section = $("section.recomSec");
					var $ul = $(".prodAlbumType>ul",$section);
					var cnt = 0;
					$("li",$ul).each(function(){
						if($(this).hasClass("active")){
							cnt++;
						}
					});
					cnt = (cnt/3)+1;
					$("li",$ul).hide();
					$("li",$ul).eq(i).removeClass("active");
					for(var i=0;i<3*cnt;i++){
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					}
					if(cnt < 3 && cnt < len){
						$(".btn_more>",$section).show();
					}else{
						$(".btn_more>",$section).hide();
					}
					
					MobileMain.fn.mainH();
				});
				
				$(".recomSec").show();
			} else {
				$(".recomSec").hide();
			}
		},
		setUserRecomItem : function(list) {
			var $section = $("section.userRecomSec");
			var $ul = $(".prodAlbumType>ul",$section);
			// 실시간 판매순위
			if (list != undefined && list.length > 0) {
				var len 		= list.length;
				
				for (var i = 0; i < len; i++) {
					
					var $li = $("li",$ul).eq(0).clone(true);
					
					$(".prod_link",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+list[i].v_productcd);
					var tagcd = "";
					var tagnm = "";
					var banner = list[i].v_banner;
					if(banner != undefined && banner != ""){
						tagcd = "la" + banner.split(",")[2];
						
						if(banner.split(",")[1].length == 2) {
							tagnm = "<em>"+banner.split(",")[1]+"</em>";
						} else {
							tagnm = "<em>"+banner.split(",")[1].substring(0,2)+"</em><em>"+banner.split(",")[1].substring(2,4)+"</em>";
						}
						
						$(".thumbImg>.ico_label",$li).addClass(tagcd);
						$(".thumbImg>.ico_label",$li).html(tagnm);
						$(".thumbImg>.ico_label",$li).show();
					}else{
						$(".thumbImg>.ico_label",$li).hide();
					}
					
					$(".thumbImg>img",$li).attr("src",list[i].v_img_path);

					$(".brandNm",$li).html(list[i].v_brandnm);
					$(".prodNm",$li).html(getByteString(list[i].v_productnm, 14));
					
					var n_list_price = list[i].n_list_price;
					var n_price = list[i].n_price;
					if(n_price < n_list_price){
						$(".sale",$li).html("<em>"+SetNumComma(n_list_price)+"</em>원");
					}else{
						$(".sale",$li).remove();
					}
					$(".price",$li).html("<em>"+SetNumComma(n_price)+"</em>원");
					
					$(".gradeType2",$li).addClass("grade0"+parseInt(list[i].n_single_point));
					$(".gradeType2>span",$li).html(list[i].n_single_point);
					$(".replyCount",$li).html("("+list[i].n_review_cnt+")");
					
					if(list[i].v_statuscd == "0002") {
						$(".stateArea",$li).attr("style","display:");
					}else{
						$(".stateArea",$li).attr("style","display:none;");
					}
					
					$($li).appendTo($ul);
				}
				$("li",$ul).eq(0).remove();
				for(var i=0;i<len;i++){
					if(i < 3) {
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					} else {
						$("li",$ul).eq(i).removeClass("active");
						$("li",$ul).eq(i).attr("style","display:none;");
					}
				}
				
				$("section.userRecomSec>.btn_more").unbind("click").click(function(event){		//지금 가장 인기많은 상품 더보기
					event.preventDefault();
					var $section = $("section.userRecomSec");
					var $ul = $(".prodAlbumType>ul",$section);
					var cnt = 0;
					$("li",$ul).each(function(){
						if($(this).hasClass("active")){
							cnt++;
						}
					});
					cnt = (cnt/3)+1;
					$("li",$ul).hide();
					$("li",$ul).eq(i).removeClass("active");
					for(var i=0;i<3*cnt;i++){
						$("li",$ul).eq(i).addClass("active");
						$("li",$ul).eq(i).attr("style","display:;");
					}
					if(cnt < 3 && cnt < len){
						$(".btn_more>",$section).show();
					}else{
						$(".btn_more>",$section).hide();
					}
					
					MobileMain.fn.mainH();
				});
				
				$(".userRecomSec").show();
			} else {
				$(".userRecomSec").hide();
			}
		},
		getSpecialList : function(i_iNowSpPageNo){
			
			specialparam.i_iNowSpPageNo  = i_iNowSpPageNo;
			
			MobileCommon.ajax({	
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_main_special_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: specialparam,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileMain.fn.setSpecialList(data.object.specialmap);
						MobileMain.isSec2Loaded	= true;						//스페셜 기프트 tab은 로드 끝
						MobileMain.fn.settingHeight('article1');
						hideScrollLoadingBox();
					}else {
						alert(data.message);
					}
					MobileMain.isLoadingSpacialPrdList = false;
				}
			,error : function(){
				MobileMain.isLoadingSpacialPrdList = false;
			} 
			});	
			
		},
		
		setSpecialList : function(Tot_obj){
			
			var page = Tot_obj.page;
			
			$('#i_iNowSpPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalSpPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iSpRecordCnt').val(page.i_iRecordCnt);
			
			specialparam.i_iNowPage = page.i_iNowPageNo;
			specialparam.i_iTotalSpPageCnt = page.i_iTotalPageCnt;
			specialparam.i_iSpRecordCnt = page.i_iRecordCnt;
			
			var $specialSec = $(".onlyApamllProdBox");
			var spMstList= Tot_obj.spMstList;
			var spSubList= Tot_obj.spSubList;
			var sp_cnt = spMstList.length;
			
			for ( var i = 0; i < sp_cnt; i++) {
				var $section = $specialSec.eq(0).clone(true);
				
				$section.removeClass("initProd");
				var $prodView = $(".prodView",$section);		//본품
				
				
				$("a",$prodView).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+spMstList[i].v_productcd);
//				$(".detailTxt",$prodView).html(spMstList[i].v_comment);
				var prodnm = spMstList[i].v_brandnm != undefined && spMstList[i].v_brandnm != "" ? "["+ spMstList[i].v_brandnm + "] " + spMstList[i].v_productnm : spMstList[i].v_productnm;
				$(".prodNm",$prodView).html(prodnm);
				$(".em_ico_like",$prodView).text(spMstList[i].n_vote_cnt);
				
				// gypark - 스페셜 기프트에서 좋아요 (하트) 수가 0이면 안보이게 해달라며..ㅎ
				/*if(spMstList[i].n_vote_cnt > 0){
					$(".info_like").show();
				}else{
					$(".info_like").hide();
				}*/
				
				/*var tagcd = "";
				if(spMstList[i].v_labelcd != undefined && spMstList[i].v_labelcd != ""){
					tagcd = "la" + spMstList[i].v_labelcd;
					$(".ico_label",$prodView).show();
				}else{
					$(".ico_label",$prodView).hide();
				}
				var tagnm = "";
				if(spMstList[i].v_tagnm != undefined && spMstList[i].v_tagnm != null){
					var tagnm_ori = spMstList[i].v_tagnm.split(" ");
					for ( var j = 0; j < tagnm_ori.length; j++) {
						tagnm += "<em>"+tagnm_ori[j].substring(0,2)+"</em>";
						tagnm += "<em>"+tagnm_ori[j].substring(2,4)+"</em>";
					}
				}
				$(".ico_label",$prodView).addClass(tagcd);
				$(".ico_label",$prodView).html(tagnm);*/
				
				var specialImg = spMstList[i].v_img_path_over == undefined ? "" : spMstList[i].v_img_path_over;
				
				$(".span_productcd_spec",$section).text(spMstList[i].v_productcd);
				$(".span_thumbnail_spec",$section).text(specialImg);
				$(".span_productnm_spec",$section).text(spMstList[i].v_productnm);
				$(".span_description_spec",$section).text(spMstList[i].v_comment);
				$(".span_optioncd_spec",$section).text(spMstList[i].v_optioncd);
				$(".span_flagsolopack_spec",$section).text(spMstList[i].v_flag_solopack);
				
				$(".thumbImg>img",$prodView).attr("src", specialImg);
				$(".thumbImg>img", $prodView).css({"width":"120px", "height" : "120px"});
				
				$(".thumbImg>img", $prodView).attr("onerror", "fnNoImage(this);");
				
				var n_list_price = spMstList[i].n_list_price;
				var n_price = spMstList[i].n_price;
				if(n_price < n_list_price){
					$(".sale",$prodView).html("<em>"+SetNumComma(n_list_price)+"</em>원");
				}else{
					$(".sale",$prodView).remove();
				}
				$(".price",$prodView).html("<em>"+SetNumComma(n_price)+"</em>원");
				
//				$(".gradeType",$prodView).addClass("grade0"+parseInt(spMstList[i].n_single_point));
//				$(".gradeType>span",$prodView).html("평점 "+spMstList[i].n_single_point);
				
				$(".basket", $section).attr("productcd", spMstList[i].v_productcd);
				$(".basket", $section).attr("optioncd", spMstList[i].v_optioncd);
				
				$(".btn_prodShare", $section).attr("productnm", prodnm);
				$(".btn_prodShare", $section).attr("id", prodnm + "," + GLOBAL_WEB_URL+"shop/shop_prd_direct_view.do?i_sProductcd="+spMstList[i].v_productcd+","+specialImg+","+spMstList[i].v_comment);
				
				var giftcnt = 0;
				if(spSubList != null && spSubList.length > 0){
					var $giftView = $(".giftView",$section);		//사은품
					$("ul li",$giftView).not(":first").remove();
					var arrspan = [];
					arrspan.push("<span class='span_hide arrgiftprd' id='"+spMstList[i].v_productcd+"'>");
					for ( var j = 0; j < spSubList.length; j++) {
						var sub_obj = spSubList[j];
						if(sub_obj.v_productcd == spMstList[i].v_productcd){
								giftcnt ++ ;
								
								arrspan.push("<span class='span_hide i_arrthumbImg'>"+sub_obj.v_img_path+"</span>");
								arrspan.push("<span class='span_hide i_arrBrandNm'>"+sub_obj.v_brandnm+"</span>");
								arrspan.push("<span class='span_hide i_arrProductnm'>"+sub_obj.v_productnm+"</span>");
								arrspan.push("<span class='span_hide i_arrMl'>"+sub_obj.n_cnt+"</span>");
								var $sub = $("ul>li",$giftView).eq(0).clone(true);
								
								$sub.attr("style","display:''");
								
								$(".thumbImg>img",$sub).attr("src",sub_obj.v_img_path);
								
								$(".brandNm",$sub).html(sub_obj.v_brandnm);
								$(".prodNm",$sub).html(getByteString(sub_obj.v_productnm,13));
								$(".ml",$sub).html(sub_obj.n_cnt+"개");
								
								$sub.appendTo($("ul",$giftView));
						}
					}
					arrspan.push("</span>");
					$(arrspan.join("\n")).appendTo($section);
					if(giftcnt <= 3){
						$(".more_spcGift",$section).hide();
					}
				}
				
				
				var spcGift = $('.onlyApamllProdBox a.more_spcGift');
        		var specialGiftSec = $('.onlyApamllProdBox .giftView');
        		$(spcGift).click(function(){
        			var idx = $(spcGift).index($(this));
        			if(specialGiftSec.eq(idx).hasClass('open') == false){
            			$(specialGiftSec).eq(idx).addClass('open');
            			$(this).text('닫기');
        			}else{
        				$(specialGiftSec).eq(idx).removeClass('open');
            			$(this).text('더 보기');
        			}
        		});
        		$(".more_spcGift").unbind("click").click(function(event){
        			event.preventDefault();
        			
        			var idx = $(".more_spcGift").index($(this));
        			var $gift = $(".arrgiftprd").eq(idx);
        			var len   = $(".i_arrProductnm",$gift).size();
        			var arrgift = [];
        			$("#moreGift").html("");
        			for(var i=0; i<len; i++){
        				arrgift.push("<li>");
        				arrgift.push("	<div class='thumbImg'>");
        				arrgift.push("		<img src='"+$(".i_arrthumbImg",$gift).eq(i).text()+"'>");
        				arrgift.push("	</div>");
        				arrgift.push("	<div class='prodDetail'>");
        				arrgift.push("		<p class='brandNm'>"+$(".i_arrBrandNm",$gift).eq(i).text()+"</p>");
        				arrgift.push("		<p class='prodNm'>"+$(".i_arrProductnm",$gift).eq(i).text()+"</p>");
        				arrgift.push("		<p class='ml'>"+$(".i_arrMl",$gift).eq(i).text()+" 개</p>");
        				arrgift.push("	</div>");
        			}
        			$(arrgift.join("\n")).appendTo("#moreGift");
        			
        			modalPopup("#modalPopupSpcGift");
        			
        		});
				$(".btn_prodShare", $section).unbind("click").click(function(event) {
					var idx = $(".btn_prodShare").index($(this));
					
					var productcd = $(".span_productcd_spec").eq(idx).text();
					var thumbnail = $(".span_thumbnail_spec").eq(idx).text();
					var productnm = $(".span_productnm_spec").eq(idx).text();
					var description = $(".span_description_spec").eq(idx).text();
					
					/*$(".p_txtProdShare", "#modalPopupSpecialShare").text(productnm + " 공유");*/
					modalPopup("#modalPopupEvtShare");
					$(".kakaostory_share").click(function(event){
//						Kakao.init('8218ce208f43a5737824a66dc103d2c3');
           		    	Kakao.Story.share({
					        url: 'http://www.amorepacificmall.com/mobile/shop/mobile_shop_product_detail.do?i_sProductcd='+productcd,
					        text: '[APmall]  "아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)"'
					    });
           		    });
                    try{
                    	Kakao.init('8218ce208f43a5737824a66dc103d2c3');
       				   // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
               		    Kakao.Link.createTalkLinkButton({
               		      container: '#kakao-link-btn',
               		      label: '[아모레퍼시픽몰] 스페셜 기프트 '+productnm,
               		      image: {
               		        src: thumbnail,
               		        width: '155',
               		        height: '155'
               		      },
               		      webButton: {
               		        text: description,
               		        url: 'http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd='+productcd // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
               		      }
               		    });
               		    
                      }catch(e){} 
                      
                      $(".btn_url").unbind("click").click(function(event){
	          	        	event.preventDefault();
	          	        	$("#i_sCopyUrl").val("http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd);
	          	        	modalPopupClose("#modalPopupEvtShare");
	          	        	modalPopup("#modalPopupCopyUrl");
	          	        	document.getElementById("i_sCopyUrl").focus();
	          	    		document.getElementById("i_sCopyUrl").select();
          	        	});
                      $(".btn_pinit").unbind("click").click(function(event) {
	          				event.preventDefault();
	          				var arrPars = new Array();
	          				arrPars.push("url=" + encodeURI("http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd=")+productcd);
	          				arrPars.push("media=" + encodeURI(thumbnail));
	          				arrPars.push("description=" + "[아모레퍼시픽몰] "+encodeURI(productnm));
	          				
	          				window.open("//pinterest.com/pin/create/button/?" + arrPars.join("&"));
          				});
                      $(".btn_fb").unbind("click").click(function(event){
          				event.preventDefault();
          				var rvo = {
          					 name : name
          					 ,link : GLOBAL_WEB_URL+"shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd
          					,picture : thumbnail
          					,description : description
          				};
          				
          				MobileBodyStart.facebookShare(rvo,"Y");
          				
          			});
				});
				//$section.insertBefore($("article.specialSec>footer"));
				$section.appendTo($(".div_onlyApmallProd"));
			}
			
			if($specialSec.eq(0).hasClass("initProd")){
				$specialSec.eq(0).remove();
			}
			
			//스페셜 기프트 스크롤처리
			MobileMain.fn.addScrollEvent();
			
			MobileMain.isSec2Loaded	= true;						//스페셜 기프트 tab은 로드 끝
			
			MobileMain.fn.settingHeight('article1');
		},
		
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {
			var $box = $(".onlyApamllProdBox");
			$(window).bind("scroll", function(event) {
				if(!MobileMain.isLoadingSpacialPrdList && $(window).scrollTop() >=( $(document).height() - $(window).height() - 292) && 
						parseInt(specialparam.i_iNowSpPageNo) < parseInt(specialparam.i_iTotalSpPageCnt) && parseInt(specialparam.i_iSpRecordCnt) > $box.size() &&
						$box.size() > 0) {

					if(MobileMain.isLoadingSpacialPrdList){
						return;
					}
					
					MobileMain.isLoadingSpacialPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea_Only"));
					
					var PageNo = specialparam.i_iNowSpPageNo;
					specialparam.i_iNowSpPageNo = parseInt(PageNo) + 1;
					
					setTimeout(function() {
						MobileMain.fn.getSpecialList(specialparam.i_iNowSpPageNo);
					}, 1000);
				}
			});
		},
		
		addbasket : function(v_productcd,v_optioncd){
			var list = [{
				productcd : v_productcd
				, optioncd : v_optioncd
				, cnt : 1
			}];

			MobileBodyStart.addUserCart({
				list : list
				, callback : function(){
				}
			});
		},
		
		setEventlList : function(){
			
			MobileCommon.ajax({	
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_main_event_event_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: null,
				animation	: false,
				success		: function (data, textStatus) {
					//이벤트 리스트
					if ("succ" == data.status) {
//						MobileMain.fn.setRankingList();
					
						//$("article.eventSec>ul").hide();
				 		var eventList= data.object.event_List;
						var event_cnt = eventList.length;
						var html = "";
						for(var i=0;i<event_cnt; i++){
							var comment = "";
							
							if(eventList[i].v_evt_comment != undefined && eventList[i].v_evt_comment != ""){
								comment = eventList[i].v_evt_comment;
							}
							html 	+=	"<li>"
									+		"<div class=\"evtDetail\">"
									+			"<a href=\""+GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+eventList[i].v_eventcd+"\" id=\""+eventList[i].v_eventcd+"\">"
									+				"<img src=\""+eventList[i].v_mobile_img_path+"\" alt=\"\"/>"
									+				"<div class=\"ttlbox\">"
									+					"<p class=\"ttl\">"+eventList[i].v_eventnm+"</p>"
									+					"<p class=\"txt\">"+comment+"</p>"
									+				"</div>"
									+			"</a>"
									+		"</div>"
									+		"<div class=\"socialList\"> "
									+			"<a href=\"#balloonLike\" class=\"ico_like ";
							if(eventList[i].v_flag_myvote != null && eventList[i].v_flag_myvote == 'Y'){
								html 	+=	"active";
							}
							html 	+=				"\"><span>"+eventList[i].n_vote_cnt+"</span></a>";
							if(eventList[i].v_flag_reply =='Y' && eventList[i].v_flag_reply != null){
								html	+=			"<a href=\"#none\" class=\"ico_comment\"><span><em>댓글 </em>"+SetNumComma(eventList[i].comment_reply_cnt)+"</span></a>";
							}
							html	+=			"<a href=\"#none\" class=\"ico_share\" style=\"display:none;float:right;\" id="+eventList[i].v_mobile_img_path+","+eventList[i].v_evt_comment+" onclick=\"modalPopup('#modalPopupEvtShare');MobileMain.fn.setEventCurIndex(this);return false;\"><span>공유하기</span></a>"
									+		"</div>"
									+	"</li>";
						}
						$("article.eventSec>ul").html(html);
						
						MobileMain.isSec3Loaded	= true;						//이벤트 tab은 로드 끝
						setTimeout(function(){MobileMain.fn.settingHeight('article2');},250);
						setTimeout(function(){$("article.eventSec>ul").show();},245);
						
					}else {
						alert(data.message);
					}
				}
			});	
			
		},
		
		setEventCurIndex : function(obj){			//공유하기 현재 클릭한 이벤트의 인덱스를 셋팅
			MobileMain.eventIndex = $("article.eventSec .ico_share").index($(obj));
		},
		
		setRankingList : function(){
			
			var $rankingSec = $("article.rankingSec");
			var $left_ul = $(".fl>.maincontSec>.rankingList>ul",$rankingSec);	//왼쪽section
			var $right = $(".fr>.maincontSec>.tab_wrap",$rankingSec);
			var $right_prc3 = $("#prc3>.rankingList>ul",$right);
			var $right_prc5 = $("#prc5>.rankingList>ul",$right);
			var $right_prc7 = $("#prc7>.rankingList>ul",$right);
			var $right_prc7u = $("#prc7u>.rankingList>ul",$right);
			
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_main_ranking_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: null,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
//						MobileMain.fn.brandinit();
					
						var rtList = data.object.realtimeView;
						var p3List = data.object.prc30000;
						var p5List = data.object.prc50000;
						var p7List = data.object.prc70000;
						var p7uList = data.object.prc70000up;
						
						//왼쪽 지금 가장 많이 보고 있는 상품 top 10부터 시작
						var rt_cnt = rtList.length;
//						$("li",$left_ul).each(function(index){
//							if(index != 0){
//								$("li",$left_ul).eq(1).remove();
//							}
//						});
						if(rt_cnt>10){
							rt_cnt = 10;
						}
						
						for(var i=0;i<rt_cnt; i++){
							var $left_li = $("li",$left_ul).eq(0).clone(true);
							var i_nRanking = rtList[i].n_ranking;
							var rank_label_class = "";
							if(i_nRanking < 6){
								
								$left_li.attr("style","display:;");		//처음에는 처음것만 보여짐
								if(i_nRanking == 2 || i_nRanking == 3){
									rank_label_class = "rank"+i_nRanking+" rankfl";
								}else{
									rank_label_class = "rank"+i_nRanking;
								}
								if(i_nRanking < 4){
									$(".ico_ranking",$left_li).html("<img src=\""+GLOBAL_MOBILE_IMG_URL+"common/img_digit.png\" alt=\"\" />");
									$(".ico_ranking",$left_li).attr("id","counter"+i_nRanking);
								}else{
									$(".thumbImg",$left_li).insertAfter($(".prodDetail",$left_li));
									$(".ico_ranking",$left_li).addClass("v2");
									$(".ico_ranking",$left_li).html("<em>"+i_nRanking+"</em>th");
								}
								$(".brandNm",$left_li).html(rtList[i].v_brandnm);
								$(".prodNm",$left_li).html(rtList[i].v_productnm);
								
								var img_path = rtList[i].v_img_path || "";

								if (img_path.indexOf("_155") > -1) {
									img_path = img_path.replace("_155", "_356");
								}
								
								$(".thumbImg>img",$left_li).attr("src",img_path);
							}else{
								rank_label_class = "ranki";
								
								$(".ico_ranking",$left_li).html("<em>"+i_nRanking+"</em>th");
								$(".prodEvalu",$left_li).remove();		//평점
								$(".thumbImg",$left_li).remove();
								
								$(".prodDetail>.brandNm",$left_li).remove();
								var html = "<span class=\"brandNm\">"+rtList[i].v_brandnm+"</span> ";
								html += rtList[i].v_productnm;
								$(".prodNm",$left_li).html(html);
								
							}
							
							$left_li.addClass(rank_label_class);
							
							$("a",$left_li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+rtList[i].v_productcd);
							
							if(i_nRanking == 1){		//1등일때
								var nRank = rtList[i].n_ranking;
								var pRank = rtList[i].n_pre_ranking;
								if(pRank == 0){				//이전 랭크가 0일때
									$(".rank_num>.ico",$left_li).addClass("ico_new2");
									$(".rank_num>.ico_new2",$left_li).removeClass("ico");
									$(".rank_num>.ico_new2",$left_li).html("<img src=\"/images/common/ico_new2.png\" alt=\"new\">");
								}else if(nRank > pRank){		//현재 랭크가 더 낮을떼
									$(".rank_num>.ico",$left_li).addClass("down");
									$(".rank_num>.ico",$left_li).html("하강");
									$(".rank_num>.num",$left_li).html(parseInt(nRank - pRank,10));
								}else if(nRank < pRank){
									$(".rank_num>.ico",$left_li).addClass("up");
									$(".rank_num>.ico",$left_li).html("상승");
									$(".rank_num>.num",$left_li).html(parseInt(pRank - nRank,10));
								}else{							//랭크가 현재와 같을때
									$(".rank_num>.ico",$left_li).addClass("same");
								}
							}else{
								$(".rank_num",$left_li).hide();
							}
							
							var i_nListPrice = rtList[i].n_list_price;
							var i_nPrice = rtList[i].n_price;
							$(".sale",$left_li).html("<em>"+SetNumComma(i_nListPrice)+"</em>원");
							$(".price",$left_li).html("<em>"+SetNumComma(i_nPrice)+"</em>원");
							if(i_nListPrice <= i_nPrice){
								$(".sale",$left_li).remove();
							}
							
							$(".gradeType",$left_li).addClass("grade0"+parseInt(rtList[i].n_single_point));
							$(".gradeType>span",$left_li).html("평점 "+rtList[i].n_single_point);
							
							$left_li.appendTo($left_ul);
						}
						$("li",$left_ul).eq(0).remove();
						
						if(rt_cnt < 6){
							$(".btn_more",$left_ul.parent().parent()).remove();
						}
						
						$(".btn_more",$left_ul).click(function(event){
							$("li",$left_ul).attr("style","display:;");		//모두 보기
						});
						//왼쪽 지금 가장 많이 보고 있는 상품 top 10 끝

						//오른쪽 지금 가장 많이 보고 있는 상품 top 10 시작
						MobileMain.fn.setRanking(p3List,$right_prc3);
						MobileMain.fn.setRanking(p5List,$right_prc5);
						MobileMain.fn.setRanking(p7List,$right_prc7);
						MobileMain.fn.setRanking(p7uList,$right_prc7u);
						//오른쪽 지금 가장 많이 보고 있는 상품 top 10 끝
						
						MobileMain.isSec4Loaded	= true;						//랭킹 tab은 로드 끝
						
						MobileMain.fn.settingHeight('article3');
						
						if (!MobileMain.isRankingShow) {
							$('#counter1').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:800,
								stopDigit:1,
								startDigit:5
							});
							$('#counter2').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:1200,
								stopDigit:2,
								startDigit:7
							});
							$('#counter3').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:1600,
								stopDigit:3,
								startDigit:8
							});

							MobileMain.isRankingShow	= true;
						}
					}else {
						alert(data.message);
					}
				}
			});
			
		},
		
		setRanking : function(obj_list,$html){
			var rt_cnt = obj_list.length;
			
//			$("li",$html).each(function(index){
//				if(index != 0){
//					$("li",$html).eq(1).remove();
//				}
//			});
			if(rt_cnt>10){
				rt_cnt = 10;
			}
			for(var i=0;i<rt_cnt; i++){
				var $li = $("li",$html).eq(0).clone(true);
				var i_nRanking = obj_list[i].n_ranking;
				var rank_label_class = "";
				
				var num_end = "";
				if(i_nRanking == 1) {
					num_end = "st";
				} else if(i_nRanking == 2 ) {
					num_end = "nd";
				} else if(i_nRanking == 3) {
					num_end = "rd";
				} else {
					num_end ="th";
				}
				
				$(".ico_ranking",$li).html("<em>"+i_nRanking+"</em>"+num_end);
				
				if(i_nRanking < 6){
					$li.attr("style","display:;");		//처음에는 처음것만 보여짐
					if(i_nRanking == 2 || i_nRanking == 3){
						rank_label_class = "rank"+i_nRanking+" rankfl";
					}else{
						rank_label_class = "rank"+i_nRanking;
					}
					
					if(i_nRanking < 4){
						$(".ico_ranking",$li).attr("id","counter"+i_nRanking);
					}else{
						$(".thumbImg",$li).insertAfter($(".prodDetail",$li));
						$(".ico_ranking",$li).addClass("v2");
					}
					$(".brandNm",$li).html(obj_list[i].v_brandnm);
					$(".prodNm",$li).html(obj_list[i].v_productnm);
					
					var img_path = obj_list[i].v_img_path || "";
					
					if (img_path.indexOf("_155") > -1) {
						img_path = img_path.replace("_155", "_356");
					}
					$(".thumbImg>img",$li).attr("src",img_path);
				}else{
					rank_label_class = "ranki";
					$(".prodEvalu",$li).remove();		//평점
					$(".thumbImg",$li).remove();
					
					$(".prodDetail>.brandNm",$li).remove();
					var html = "<span class=\"brandNm\">"+obj_list[i].v_brandnm+"</span> ";
					html += obj_list[i].v_productnm;
					$(".prodNm",$li).html(html);
					
				}
				
				$li.addClass(rank_label_class);
				
				$("a",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+obj_list[i].v_productcd);
				
				if(i_nRanking == 1){		//1등일때
					var nRank = obj_list[i].n_ranking;
					var pRank = obj_list[i].n_pre_ranking;
					if(pRank == 0){				//이전 랭크가 0일때
						$(".rank_num>.ico",$li).addClass("ico_new2");
						$(".rank_num>.ico_new2",$li).removeClass("ico");
						$(".rank_num>.ico_new2",$li).html("<img src=\"/images/common/ico_new2.png\" alt=\"new\">");
					}else if(nRank > pRank){		//현재 랭크가 더 낮을떼
						$(".rank_num>.ico",$li).addClass("up");
						$(".rank_num>.ico",$li).html("하강");
						$(".rank_num>.num",$li).html(parseInt(nRank - pRank,10));
					}else if(nRank < pRank){
						$(".rank_num>.ico",$li).addClass("down");
						$(".rank_num>.ico",$li).html("상승");
						$(".rank_num>.num",$li).html(parseInt(pRank - nRank,10));
					}else{							//랭크가 현재와 같을때
						$(".rank_num>.ico",$li).addClass("same");
					}
				}else{
					$(".rank_num",$li).hide();
				}
				
				var i_nListPrice = obj_list[i].n_list_price;
				var i_nPrice = obj_list[i].n_price;
				$(".sale",$li).html("<em>"+SetNumComma(i_nListPrice)+"</em>원");
				$(".price",$li).html("<em>"+SetNumComma(i_nPrice)+"</em>원");
				if(i_nListPrice <= i_nPrice){
					$(".sale",$li).remove();
				}
				
				$(".gradeType",$li).addClass("grade0"+parseInt(obj_list[i].n_single_point));
				$(".gradeType>span",$li).html("평점 "+obj_list[i].n_single_point);
				
				$li.appendTo($html);
			}
			$("li",$html).eq(0).remove();
			
			if(rt_cnt < 6){
				$(".btn_more",$html.parent().parent()).remove();
			}
			
			$(".btn_more",$html).click(function(event){
				$("li",$html).attr("style","display:;");		//모두 보기
			});
		},
		
		brandList : function() {
			
			var id = $(".brandList li.active").find("img").attr("id");
			var name = $(".brandList li.active").find("img").attr("alt");
			
			// bland 로딩
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_shop_product_list_main_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {"i_sBrandcd":id, "i_iStartRownum":1,"i_iEndRownum":6},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						var	list	= data.object.shopprd.list;
						var	stlist	= data.object.shopprd.stlist;
						var	cnt	= list.length;
						$('section.brand>h1.title>span').html(name);
						$('#brandlanding>a>span').html(name);
						$('#brandlanding>a').attr('href',GLOBAL_WEB_ROOT+'mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd='+id);

						
						if (cnt > 0) {
							var	html	= "";

							for (var i = 0; i < list.length; i++) {
								var saleArea = list[i].n_list_price != list[i].n_price ? "<span class=\"sale\"><em>"+SetNumComma(list[i].n_list_price)+"</em> 원</span><br/>" : "";
								html	+= "<li>"
											+ "<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+list[i].v_productcd+"\">"
												+ "<div class=\"thumbImg\">"
													+ "<img src=\""+list[i].v_img_path+"\" alt=\"\" onerror=\"fnNoImage(this)\"/>"
												+ "</div>"
												+ "<div class=\"prodDetail\">"
													+ "<p class=\"brandNm ellipsis\">"+list[i].v_brandnm+"</p>"
													+ "<p class=\"prodNm\">"+subStrChangStr(list[i].v_productnm,12,"...")+"</p>"
													+ "<p class=\"priceZone\">"
														+ saleArea
														+ "<span class=\"price\"><em>"+SetNumComma(list[i].n_price)+"</em> 원</span> "
													+ "</p>"
													+ "<div class=\"prodEvalu\">"
														+ "<span class=\"gradeType2 grade0"+parseInt(list[i].n_single_point)+"\"><span class=\"hide\">"+list[i].n_single_point+"</span></span>"
														+ "<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+list[i].n_review_cnt+")</span>"
													+ "</div>"
												+ "</div>"
											+ "</a>"
										+ "</li>";
							}

							$('section.brand>div.new_brand').html("<ul>" + html + "</ul>");
						} else {
							$('section.brand>div.new_brand').html("<ul><li>상품이 존재하지 않습니다.</li></ul>");
						}

						var	st_cnt	= stlist.length;
						$('section.steadybrand>h1.title>span').html(name);
						var $ul = $('section.steadybrand>div.prodAlbumType>ul');
						if (st_cnt > 0) {
							$(".steady_prod_list",$ul).show();
							$(".steady_prod_nolist",$ul).hide();
							$("li.steady_prod_list",$ul).each(function(index){
								$("li.steady_prod_list",$ul).eq(1).remove();
							});
							
							for (var i = 0; i < st_cnt; i++) {
								var $li = null;
								if(i == 0){
									$li = $("li",$ul).eq(0);
								}else{
									$li = $("li",$ul).eq(0).clone(true);
								}
								$("a",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+stlist[i].v_productcd);
								$(".thumbImg>img",$li).attr("src",stlist[i].v_img_path);
								
								$(".brandNm",$li).html(stlist[i].v_brandnm);
								$(".prodNm",$li).html(getByteString(stlist[i].v_productnm, 12));
								$(".price",$li).html("<em>"+SetNumComma(stlist[i].n_price)+"</em> 원");
								
								if(stlist[i].n_list_price != stlist[i].n_price) {
									$(".sale",$li).html("<em>"+SetNumComma(stlist[i].n_list_price)+"</em> 원");
									$(".sale",$li).show();
								}else{
									$(".sale",$li).hide();
								}
								
								$(".gradeType2",$li).addClass("grade0"+parseInt(stlist[i].n_single_point));
								$(".gradeType2>span",$li).html(stlist[i].n_single_point);
								$(".replyCount",$li).html("("+stlist[i].n_review_cnt+")");
								
								if(i != 0){
									$li.appendTo($ul);
								}
							}
							
							$(".steady_prod_nolist",$ul).hide();
						} else {
							$(".steady_prod_list",$ul).hide();
							$(".steady_prod_nolist",$ul).show();
						}
						
					} else {
						alert(data.message);
					}
					
					MobileMain.isSec5Loaded	= true;						//brand tab은 로드 끝
					
					MobileMain.fn.settingHeight('article4');
				}
			});
			
		},
		// 
		brandinit : function(){
			if(MobileMain.isSec5Loaded	!= true){			//brand tab이 처음일때
				
				MobileMain.fn.setBrandScroll();

				var brand_cnt = $(".brandList li").length;
				var ran_index = Math.random()*brand_cnt;
				var brand_index = Math.floor(ran_index);
				
				$(".brandList li a").eq(brand_index).click();		//브랜드 선택
				
				var	aw	= 0;
				$(".brandList li").each(function(index) {
					if( index > 2 && index < brand_index){
						var	$eW	= $(this).width();
						aw	= aw + $eW;
					}
				});
				MobileMain.brandiscroller.scrollTo(-aw, 0, 100);		//선택 된 브랜드가 가운데에 올수 있게 옮김
			}
		},
		settingHeight : function(id){			//높이를 재셋팅
			var articleH = $('#'+id).height();
			$('.swipe-wrap').height(articleH);
		}
		
	}
	
};
