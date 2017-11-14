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

		MobileMain.fn.showTopBanner();


		//버튼 이벤트
		MobileMain.fn.addBtnEvent();

		$( window ).on( 'load resize scroll' ,function() {
			MobileMain.fn.setScrollEvent();
		});

		if(GLOBAL_MOBILE_APP == 'APP'){
			if($("#i_sFlagPass").val() != "Y"){
				if($("#i_sFlagPushPop").val() == "N" && IS_LOGIN){
					MobileMain.fn.appPushAgreePop("O");
				}else if($("#i_sFlagRePop").val() == "Y" && IS_LOGIN){
					MobileMain.fn.appPushAgreePop("R");
				}
			}
		}

		var setWidth = $("#hashTag_wrapper1 ul").find("li").size()*87;
		$("#hashTag_wrapper1").width(setWidth);
		$("#hashTag_wrapper2").width(setWidth);

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

		appPushAgreePop : function(flag){
			if(flag == "R"){
				modalPopup("#modalPopupMarketingAgree2");
			}else{
				modalPopup("#modalPopupMarketingAgree");
			}
			$(".btn_agree").unbind("click").click(function(event){
				event.preventDefault();
				MobileMain.fn.goCheckDuplCoupon(flag);
			});
			$(".btn_nonagree").unbind("click").click(function(event){
				event.preventDefault();
				if(flag == "R"){
					modalPopupClose("#modalPopupMarketingAgree2");
				}else{
					modalPopupClose("#modalPopupMarketingAgree");
				}

				showConfirmBox({
					message : "마케팅 수신에 동의하지 않으시는 경우,<br/>이벤트·쿠폰·특가 등 유용한 정보를<br/>실시간으로 받으실 수 없어요.",
					ok_str : "동의하러 가기",
					cancel_str : "확인",
					ok_func : function(){
						if(flag == "R"){
							modalPopup("#modalPopupMarketingAgree2");
						}else{
							modalPopup("#modalPopupMarketingAgree");
						}
					},
					cancel_func : function(){
						MobileMain.fn.goSaveAppPushAgree("N","");
					}
				});
			});
		},
		goCheckDuplCoupon : function(flag){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/app/mobile_app_check_coupon_dupl_ajax.do",
				type : "POST",
				dataType : "json",
				data : {"i_sFlagRepop" : flag},
				success : function(data,textStatus){
					if(data.status == "succ"){
						if(data.object == "already"){
							MobileMain.fn.goSaveAppPushAgree("Y","N",flag);
						}else{
							MobileMain.fn.goSaveAppPushAgree("Y","Y",flag);
						}
					}else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		goSaveAppPushAgree : function(flag, duplcheck, repopflag){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/app/mobile_app_push_agree_save_ajax.do",
				type : "POST",
				dataType : "json",
				data : {"i_sFlagAgree":flag, "i_sFlagRepop" : repopflag},
				success : function(data,textStatus){
					if(data.status == "succ"){
						modalPopupClose("#modalPopupMarketingAgree");
						modalPopupClose("#modalPopupMarketingAgree2");
						if(flag == "Y" && duplcheck == "Y"){
							showMessageBox({
								message : "마케팅 수신동의 감사쿠폰을 지급하였습니다!<br/>알뜰한 쇼핑 되세요!"
							});
						}else if(flag == "Y" && duplcheck == "N"){
							showMessageBox({
								message : "마케팅 수신에 동의하셨습니다.<br/>즐거운 쇼핑 되세요!"
							});
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else{
							showMessageBox({
								message : data.message
							});
						}

					}
				}
			});
		},
		getImage: function(wrap){
			fnImgSrcChange(wrap);
		},
		addBtnEvent : function(){

			$(window).resize(function() {
				MobileMain.fn.checkForViewportChange();
		    });

//			$(".brandList").unbind("click").click(function(event){
//				event.preventDefault();
//
//				alert("ASDF");
//
//
//
//			})

			$(".a_search_tag").unbind("click").click(function(event){
				event.preventDefault();

				var obj = $(this);

				var keyWord = obj.find(".keyWord").text();

				keyWord = keyWord.replace("\#", "");


				modalPopup("#modalPopupSearchForm");
		    	$("#i_sSearchProdKeyword").val(keyWord);
		    	$(".btn_prodSearch").click();

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
				if(IS_LOGIN || IS_LOGIN_SNS){
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

					FB.init({appId:"1532234350418822", status: true, cookie: true});
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
//                if ( topChk ){
//                    $(".m_top").show();
//                }
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

		setEventCurIndex : function(obj){			//공유하기 현재 클릭한 이벤트의 인덱스를 셋팅
			MobileMain.eventIndex = $("article.eventSec .ico_share").index($(obj));
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

		countDown : function(dayoffcd, pars) {
			MobileMain.fn.fnDeadLineInit(dayoffcd,pars);

			pars.timer = setInterval(function() {
				if(pars.stopFlag) {
					clearInterval(pars.timer);
					return ;
				}

				pars.sDate.setSeconds(pars.sDate.getSeconds() + 1);
				MobileMain.fn.fnDeadLineCalc(pars.sDate, pars.eDate, dayoffcd,pars);
			}, 1000);

			if(dayoffcd == "999" || dayoffcd == "") {
				clearInterval(pars.timer);
				pars.h1 = 0;
				pars.h2 = 0;
				pars.m1 = 0;
				pars.m2 = 0;
				pars.s1 = 0;
				pars.s2 = 0;
				MobileMain.fn.fnDeadLineSet(dayoffcd,pars);
				return ;
			}
		},

		fnDeadLineInit : function(dayoffcd,pars) {

			var sTime = pars.sTime;
			var eTime = pars.eTime;

			pars.sDate = new Date();
			pars.eDate = new Date();
			var sDate = pars.sDate;
			var eDate = pars.eDate;
			var timeArr = sTime.split(",");

			sDate.setFullYear(parseInt(timeArr[0]), parseInt(timeArr[1]) - 1, parseInt(timeArr[2]));
			sDate.setHours(parseInt(timeArr[3]), parseInt(timeArr[4]), parseInt(timeArr[5]), 0);

			eDate.setFullYear(parseInt(eTime.substring(0, 4)), parseInt(eTime.substring(4, 6)) - 1, parseInt(eTime.substring(6, 8)));
			eDate.setHours(parseInt(eTime.substring(8, 10)),  parseInt(eTime.substring(10, 12)), 59, 0);

			MobileMain.fn.fnDeadLineCalc(sDate, eDate, dayoffcd,pars);

			pars.eDate = eDate;
			pars.sDate = sDate;
		},

		fnDeadLineCalc : function(sDate, eDate, dayoffcd,pars) {
			var diffDate = eDate - sDate;
			var days = Math.floor((diffDate) / 1000 / 60 / 60 / 24);
			var hours = Math.floor((diffDate) / 1000 / 60 / 60 - (24 * days));
			var hours2 = Math.floor((diffDate) / 1000 / 60 / 60);
			var minutes = Math.floor((diffDate) / 1000 / 60 - (24 * 60 * days) - (60 * hours));
			var seconds = Math.round((diffDate) / 1000 - (24 * 60 * 60 * days) - (60 * 60 * hours) - (60 * minutes));

			if(hours2 < 24) {
				pars.startFlag = true;
			} else {
				pars.startFlag = false;
			}

			if(hours2 > 9) {
				pars.h1 = Math.round(hours2 / 10);
				pars.h2 = hours2 % 10;
			} else {
				pars.h1 = 0;
				pars.h2 = hours2;
			}

			if(minutes > 9) {
				minutes = minutes + "";
				pars.m1 = minutes.substring(0, 1);
				pars.m2 = minutes.substring(1, 2);
			} else {
				pars.m1 = 0;
				pars.m2 = minutes;
			}

			if(seconds > 9) {
				seconds = seconds + "";
				pars.s1 = seconds.substring(0, 1);
				pars.s2 = seconds.substring(1, 2);
			} else {
				pars.s1 = 0;
				pars.s2 = seconds;
			}

			if(diffDate <= 0) {
				pars.stopFlag = true;
				todayOnly.fnReload();
			}

			MobileMain.fn.fnDeadLineSet(dayoffcd,pars);


		}
		, fnDeadLineSet : function(dayoffcd,pars) {

			var bufStr = "";

			bufStr += pars.h1 + '' + pars.h2;
			bufStr += pars.m1 + '' + pars.m2;
			bufStr += pars.s1 + '' + pars.s2;

			$(".deadTime_h_"+dayoffcd).text(pars.h1+''+pars.h2);
			$(".deadTime_m_"+dayoffcd).text(pars.m1+''+pars.m2);
			$(".deadTime_s_"+dayoffcd).text(pars.s1+''+pars.s2);
		}
		, mainTabMove : function(pageNm) {
			var url = "";
			if(pageNm == "brand"){
				url = GLOBAL_WEB_ROOT + "mobile/main_brand_ajax.do";
			} else if(pageNm == "ranking"){
				url = GLOBAL_WEB_ROOT + "mobile/main_ranking_ajax.do";
			} else if(pageNm == "issue"){
				url = GLOBAL_WEB_ROOT + "mobile/main_issue_ajax.do";
			} else if(pageNm == "benefit"){
				url = GLOBAL_WEB_ROOT + "mobile/main_benefit_ajax.do";
			} else {
				location.href = "http://127.0.0.1:8080/mobile/main.do";
				return;
			}

			cmAjax({
				url		: url
				, data  : {}
				, dataType : "html"
				, type : "post"
				, async : false
				, animation : false
				, success : function(html){
					$("#content").html(html);
				}
			});
		}

		/*brandinit : function(){
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
		},*/
		, settingHeight : function(id){			//높이를 재셋팅
			var articleH = $('#'+id).height();
			$('.swipe-wrap').height(articleH);
		}

	}

};
