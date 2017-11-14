/**
 * 자바스크립트가 로드될 때까지 기다린 후, 화면제어 로직을 처리하는 스크립트의 init 함수를 호출한다.
 */
(function($) {
	var	ScriptInvoker	= function(scriptName) {
		this.scriptName	= scriptName;	// 실행할 스크립트 객체명
		this.timeVar	= undefined;	// timeout 이벤트의 참조 변수
		this.attrValue	= undefined;	// 객체에 전달할 데이터 값
		this.attrName;					// 객체에 생성할 데이터

		/**
		 * script에 전달할 데이터를 설정한다.
		 * @param attrName  변수명
		 * @param attrValue 데이터, Object, string, int 등
		 */
		this.setAttribute	= function(attrName, attrValue) {
			this.attrName	= attrName;
			this.attrValue	= attrValue;
		};

		/**
		 * script의 init를 호출한다.
		 */
		this.invoke	= function() {
			var	self	= this;

			this.timeVar	= setTimeout(function() {
				var	func	= window[self.scriptName];

				if (func) {
					if (self.attrName) {
						func[self.attrName]	= self.attrValue;
					}

					func.init();
					self.clearTime();
				} else {
					self.invoke();
				}
			});
		};

		/**
		 * 타임아웃을 해제한다.
		 */
		this.clearTime	= function() {
			clearTimeout(this.timeVar);
		};
	};

	var	invoker	= {
		/**
		 * Javascript가 로드될 때까지 기다린 후 javascript object가 유효하면 script의 init function을 호출한다.
		 * 화면개발가이드 참조
		 * 
		 * @param scriptName  javascript 객체이름
		 * @param varName  객체에 추가할 변수이름
		 * @param jsonStr 객체에 담을 변수, Object or primitive type
		 */
		invoke : function(scriptName, varName, jsonStr) {
			var	invoker	= new ScriptInvoker(scriptName);
			invoker.setAttribute(varName, jsonStr);
			invoker.invoke();
		}
	};

	window.invoker	= invoker;
})(jQuery);

/**
 * 모바일 화면의 공통 이벤트 처리를 위한 Javascript
 */
var parameter_search = {
	i_iNowPageNo : "",
	i_sKeyword : "",
	i_iRecordCnt : "",
	pageStack : [],
	i_sFlagEventSearch : "Y"
};
var	MobileCommon = {
	name : "MobileCommon",
	sideiscroll : null,

	init : function() {
		// 팝업 화면의 경우에는 메뉴/풋터 등이 없다.
		if (-1 < location.href.indexOf("_pop.do")) {
			return;
		}

		// 사이드 메뉴 초기 크기 설정
		var	$winH	= $(window).height();

		$("#sideiscroll").css("height", $winH);
		$("#sideMenu").css("height", $winH);

		// 사이드 메뉴 스크롤 설정
		MobileCommon.sideiscroll	= new iScroll("sideiscroll", {
			hScroll:false,
			vScrollbar:false,
			zoom:false,
			click:true,
			tap:true,
			preventGhostClick: true,
			onBeforeScrollStart: function (event) {	
				if ($(event.target).is("a")) {
					return false;
				} else {
					event.preventDefault();
				}
			}
		});

		document.addEventListener('DOMContentLoaded', MobileCommon.sideiscroll, false);

		// 사이드메뉴 새로고침
		$(window).resize(function() {
			var	$winH	= $(window).height();

			$("#sideiscroll").css("height", $winH);
			$("#sideMenu").css("height", $winH);

			MobileCommon.sideiscroll.refresh();
		});

		// APMall 즐기기 버튼 클릭시
		$('.btn_apmallJoin').click(function() {
			setTimeout(function() {
				if (0 < $.find('.appDownBanner').length) {
					$('.appDownBanner').hide();
				}
				modalPopup('#modalPopupApmallJoin');

				$(".apmallJoin-nav > span").removeClass().eq(0).addClass("active");

				window.apmallJoinSwipe	= new Swipe(document.getElementById('apmallJoinSwipe'), {
					startSlide: 0,
					continuous: false,
					stopPropagation: true,
					callback: function(event, element) {
						$(".apmallJoin-nav > span").removeClass().eq(event).addClass("active");
						$(".modal-wrap").stop().animate({scrollTop:0},0);
					}
				});
			}, 200);			
			MobileCommon.fn.sideMenuClose();
		});

		// 레이어 검색 버튼 클릭시
		$(".btn_srch").unbind("click").click(function(event) {
			event.preventDefault();
			
			$('#vticker').vTicker('pause',true);

			window.layerRealtimeSwipe	= new Swipe(document.getElementById('layerRealtimeSwipe'), {
				continuous: false,
				stopPropagation: true,
				callback: function(event, element) {
					$(".layerRealtimeSwipe-nav > span").removeClass().eq(event).addClass("active");
				}
			});
			
			modalPopup('#modalPopupSearchForm');
			
			$(".input_srch").focus();
			
			$(".btn_prodSearchClose").unbind("click").click(function(event) {
				event.preventDefault();
				var divpopup = $(".popupSearchForm");
				$("#i_sSearchProdKeyword",divpopup).val("");
				$("#i_iNowPageNoSearch",divpopup).val("1");
				$("#i_iTotalPageCntSearch",divpopup).val("1");
				
				$(".div_resultArea",divpopup).hide();
				$(".div_resultNonArea",divpopup).hide();
				
				$(".li_prodSearch",divpopup).not(":first").remove();
				
				$('#vticker').vTicker('pause',false);
				modalPopupClose('#modalPopupSearchForm');
			});
			
		});
		
		$(".btn_prodSearch").unbind("click").click(function(event) {
			event.preventDefault();
			
			var keyword = $("#i_sSearchProdKeyword").val();
			
			if(keyword.length >= 2 || keyword == "려") {
				$(".li_prodSearch").not(":first").remove();
				parameter_search.pageStack = new Array();
				parameter_search.i_iNowPageNo = 1;
				parameter_search.i_iTotalPageCnt = 1;
				MobileCommon.fn.searchProduct(1);
				
				try{
					rblc.op('setVar','cuid','a3ef5e12-d59b-4807-a18f-8a715b6b4838');
					  if (GLOBAL_MOBILE_APP == 'APP') {
							if (GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS') {
								rblc.op('setVar','device','MI');
							} else if (GLOBAL_MOBILE_OS == 'AND') {
								rblc.op('setVar','device','MA');
							}
					  }else{
						  rblc.op('setVar','device','MW');
					  }
					  rblc.op('setVar','searchTerm',keyword);
					  rblc.op('track','search');	
				}catch(e){}
				
				modalPopupClose("#modalPopupSearchForm");
				modalPopup("#modalPopupSearchForm");
			} else {
				showMessageBox({
					message : "키워드를 2자 이상 입력해주세요."
					, close : function() {
						modalPopup('#modalPopupSearchForm');
						$("#i_sSearchProdKeyword").focus();
					}
				});
			}
		});
		
		// 레이어 검색 토글(펼치기/접기) 버튼 클릭시
		$(".btn_srchExtend").click(function() {
			var	layerRealBox	= $(".layerRealtimeBox");
			var	chk				= layerRealBox.hasClass("active");

			if (false == chk) {
				$(".layerRealtimeSwipe").show();
				layerRealBox.addClass("active");
			} else {
				$(".layerRealtimeSwipe").hide();
				layerRealBox.removeClass("active");
			}

			window.layerRealtimeSwipe	= new Swipe(document.getElementById('layerRealtimeSwipe'), {
				continuous: false,
				stopPropagation: true,
				callback: function(event, element) {
					$(".layerRealtimeSwipe-nav > span").removeClass().eq(event).addClass("active");
				}
			});

			return false;
		});

		$(".input_srch").focus(function(){
			$(".head > p.ttl").css("color","#888");
		});

		// 하단 사이트메뉴 클릭시 동작
		$(".siteMenu ul li a").click(function() {
			var	cntSiteMenu		= $(".siteMenu ul li a").length;
			
//			예전메인이 슬라이드로 돌아갈때 각각의 푸터사용때문
//			if (-1 < location.href.indexOf("/mobile/main.do")) {
//				cntSiteMenu		= Math.round(cntSiteMenu / 5);
//			}
			
			var	idxOrgMenu		= $(".siteMenu ul li a").index(this);
			var	idxSiteMenu		= $(".siteMenu ul li a").index(this) % cntSiteMenu;
			var	idxSiteMenuTab	= Math.floor(idxOrgMenu / cntSiteMenu);
			var	siteMenutabTop	= $(".siteMenuTab:eq(" + idxSiteMenuTab + ")").offset().top;

			$(".siteMenuBox").show().addClass("active");

			var	viewH	= 0;
			var	chk		= $(this).parent().hasClass("active");

			if (false == chk) {
				
				$(".siteMenuBox .view").hide();
				$(".siteMenu ul li").removeClass("active");

				for (var i = idxSiteMenu; i < cntSiteMenu * 5; i += cntSiteMenu) {
					$(".siteMenuBox .view").eq(i).show();
					$(".siteMenu ul li").eq(i).addClass("active");
				}

				viewH	= $(".siteMenuBox .view").eq(idxOrgMenu).height(); //클릭한 자신의 view 높이
			} else {
				
				for (var i = idxSiteMenu; i < cntSiteMenu * 5; i += cntSiteMenu) {
					$(".siteMenuBox .view").eq(i).hide();
				}
				$(this).parent().removeClass("active");
				MobileCommon.fn.siteMenuClose();

				return false;
			}

			$(".siteMenuTab").css("padding-top", viewH + 53);
			$("html, body").delay(0).animate({scrollTop: siteMenutabTop + 'px'}, 0);
			MobileCommon.fn.mainH();

			return false;
		});

		$(".btn_siteMenuBox").click(function(){
			MobileCommon.fn.siteMenuClose();
			return false;
		});
		
		$(".page_info > .btn_back").click(function(event) {
			event.preventDefault();
			history.back(-1);
		});

		$(document).on("click", ".btn_mobile_detail", function(event){
			event.preventDefault();
			MobileBodyStart.goProductDetail($(this).attr("id"));
		});

		$(document).on("click", ".btn_mobile_list", function(event){
			event.preventDefault();
			var id			= $(this).attr("id");
			var categoryCd1	= ""; 
			var categoryCd2	= "";

			if (typeof id != "undefined") {
				var category	= id.split(";");
				categoryCd1		= category[0];
				if (category.length > 1) {
					categoryCd2		= category[1];
				}
			}

			MobileBodyStart.goProductList(categoryCd1, categoryCd2);
		});

		// 사이드 메뉴용 카테고리 메뉴 조회영역 설정
		this.fn.setCategory();
	},
	isLoadingPrdList : false,
	fn : {
		/**
		 * 사이드 메뉴용 카테고리 메뉴 조회영역 설정
		 */
		setCategory : function() {
			var	$depth2				= $(".depth2");
			var	$sideCategoryItem	= $(".categoryMenu ul > li > a");
			var	$sideCategory		= $(".categoryMenu ul > li");

			$sideCategoryItem.unbind("click").click(function(event) {
				event.preventDefault();
				var	chk	= $(this).parent().hasClass("active");

				if (false == chk) {
					$(this).next($depth2).show();
					$(this).parent().addClass("active");
				} else {
					$(this).next($depth2).hide();
					$(this).parent().removeClass("active");
				}

				MobileCommon.sideiscroll.refresh();

				return false;
			});
		},

		/**
		 * 사이드 메뉴 열기
		 */
		sideMenuOpen : function() {

			if(GLOBAL_MOBILE_APP == 'APP'){
				if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
					window.location="apjscall://jsOpenSideMenu";
				}else if (GLOBAL_MOBILE_OS == 'AND') {
					window.aMain.jsOpenSiedMenu();
				}
			
			}else{
				var	$winH	= $(window).height();
	
				$("#sideMenu").css("height", $winH);
				$("#sideiscroll").css("height", $winH);
	
				$("#wrapper").addClass("sideMenuOpen");
				$(".btn_sideMenuClose").addClass("in");
	
				$("<div class='overlay'></div>").clone().appendTo("#wrap");
				document.addEventListener('touchmove', lock_touch);
			}
		},

		/**
		 * 사이드 메뉴 닫기
		 */
		sideMenuClose : function() {
			
			$("#wrapper").removeClass("sideMenuOpen");
			$(".btn_sideMenuClose").removeClass("in");
			$(".overlay").remove();

			document.removeEventListener('touchmove', lock_touch);

			if(GLOBAL_MOBILE_APP == 'APP'){
				if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
					window.location="apjscall://showMenuBar";
				}
			}
			
			return false;
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
			
		/**
		 * APMall 즐기기 닫기 처리
		 */
		closeApmallJoin : function() {
			if(GLOBAL_MOBILE_APP != 'APP'){
				if (0 < $.find('.appDownBanner').length) {
					MobileMain.fn.setShowAppDownload();
				};
			}else{
				if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
					window.location="apjscall://showMenuBar";
				}else{
					
				}
			}

			setCookie('apmallVisited', 'visited', 999999);
			modalPopupClose('#modalPopupApmallJoin');
			apmallJoinSwipe.kill();
		},

		/**
		 * 하단 사이트 메뉴 숨김
		 */
		siteMenuClose : function() {
			$(".siteMenuTab").css("padding-top","0");
			$(".siteMenuBox").hide().removeClass("active");
			$(".siteMenu ul li ").removeClass("active");

			MobileCommon.fn.mainH();
		},

		/**
		 * 모바일 앱 다운로드
		 */
		appDownload : function() {
			alert("준비중입니다.");
		},

		/**
		 * 로그아웃 처리
		 */
		logout : function(obj) {
			MobileCommon.ajax({
				url			: "/mobile/mbr/mobile_mbr_member_logout_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
    					if(GLOBAL_MOBILE_APP == 'APP'){
    						if(GLOBAL_FLAG_APP_NEW != 'Y'){
	    						if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
	    							window.location="apjscall://jsReloadAppDeviceConfDataWithUrlMain";
	    						}else if(GLOBAL_MOBILE_OS == 'AND'){
	    							window.aMain.jsReloadAppDeviceConfData();
	    						}
    						}
    						else {
    							if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){

    							}else if(GLOBAL_MOBILE_OS == 'AND'){
    								window.Android.logoutFromWebpage();
    							}
    						}
    					}else{
    						location.href	= "/mobile/main.do";
    					}
						$(obj).attr('href', '/mobile/mbr/mobile_mbr_member_login.do').text('로그인');
					} else {
						alert(data.message);
					}
				}
			});
		},
		pricegiftEvent : function(){
			MobileCommon.ajax({
				url			: "/mobile/event/mobile_event_check_pricegift_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
    					location.href=GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd"+data.object;
					} else {
						alert(data.message);
					}
				}
			});
		},
		nickname : function(nicknm){
			var frm = $("form[name='frm_common']");
			var url = "";
			if(nicknm == ""){
				url = GLOBAL_WEB_URL +"mobile/mbr/mobile_mbr_nickname_reg.do";
			} else{
				url = GLOBAL_WEB_URL +"mobile/mbr/mobile_mbr_nickname_mod.do";
			}
			if (GLOBAL_FLAG_APP_NEW == "Y") {
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						MobileBodyStart.setLoginUserInfo();
					}
					else {
						window.webkit.messageHandlers.requestUserInfo.postMessage(null);
					}
				}catch(e){
					console.log(e);
				}
				var arrParam = [];
				if(GLOBAL_LOGIN_KEY != "") {
					$("input[name='i_sLoginKey']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					$("input[name='i_sLoginType']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				$("input[name='i_sDeviceNum']", frm).remove();
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
				$(arrParam.join("")).appendTo(frm);
			}
			frm.prop("action", url);
			frm.submit();
		},
		
		appOpenApMallJoin : function(obj) {
			
			setTimeout(function() {

				modalPopup('#modalPopupApmallJoin');
				
				$(".apmallJoin-nav > span").removeClass().eq(0).addClass("active");

				window.apmallJoinSwipe	= new Swipe(document.getElementById('apmallJoinSwipe'), {
					startSlide: 0,
					continuous: false,
					stopPropagation: true,
					callback: function(event, element) {
						$(".apmallJoin-nav > span").removeClass().eq(event).addClass("active");
						$(".modal-wrap").stop().animate({scrollTop:0},0);
					}
				});
			}, 200);
			

		},
		searchProduct : function(i_iNowPageNo) {
			parameter_search.i_iNowPageNo  = i_iNowPageNo;
			$("#i_iNowPageNoSearch").val(i_iNowPageNo);
			
			parameter_search.i_sKeyword = $("#i_sSearchProdKeyword").val();
			if(i_iNowPageNo > 1){
				parameter_search.i_sFlagEventSearch = "N";
			}
			 
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "comm/comm_prod_search_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter_search,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileCommon.isLoadingPrdList = false;
						if(parameter_search.i_sFlagEventSearch == "Y"){
							MobileCommon.fn.setSearchEvent(data.object);
						}
						MobileCommon.fn.setSearchProduct(data.object);
						
						var shop = data.object.searchList;
						
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter_search.pageStack)) == -1) {
							parameter_search.pageStack.push(shop.page.i_iNowPageNo);
						}
						$(".input_srch").blur();
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setSearchEvent : function(object){
			var evtList = object.searchList.evtlistsearch;
			$("#evtSearchul").html("");
			if(evtList != undefined && evtList.length >0){
				for(var i=0; i<evtList.length; i++){
					var arrHtml = [];
					arrHtml.push("<li>");
					arrHtml.push("	<a href='"+GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+evtList[i].v_eventcd+"'>");
					arrHtml.push("		<img src='"+evtList[i].v_mobile_img_path+"' alt=''/>");
					arrHtml.push("	</a>");
					arrHtml.push("</li>");
					$(arrHtml.join("\n")).appendTo("#evtSearchul");
				}
			}
			
		},
		setSearchProduct : function(object) {
			var searchList = object.searchList;
			var list = searchList.list;
			var page = searchList.page;
			var evtList = object.searchList.evtlistsearch;
			var smartList = object.searchList.smartOfferList;
			var searchListYn = "N";
			
			$("#i_iNowPageNoSearch").val(page.i_iNowPageNo);
			$("#i_iTotalPageCntSearch").val(page.i_iTotalPageCnt);
			$("#i_iRecordCntSearch").val(page.i_iRecordCnt);
			
			if(parameter_search.i_iNowPageNo == 1){
				try{
					goFacebookPixel();
				}catch(e){}
			}
			
			parameter_search.i_iNowPageNo = page.i_iNowPageNo;
			parameter_search.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter_search.i_iRecordCnt = page.i_iRecordCnt;
			
			$(".p_srchKeyword>span").text("\"" + $("#i_sSearchProdKeyword").val() + "\"");
			
			
			if(smartList != undefined && smartList.length > 0) {
				for(var i=0; i< smartList.length ; i++) {
					var searchRow = smartList[i];
					
					var li = $(".li_prodSearch").eq(0).clone(false);
					
					if(searchRow.n_list_price != searchRow.n_price) {
						var salePer = parseInt((parseInt(searchRow.n_list_price) - parseInt(searchRow.n_price)) / parseInt(searchRow.n_list_price) * 100);
						$(".ico_label>em", li).eq(0).text(salePer);
						
						$(".sale>em", li).text(SetNumComma(searchRow.n_list_price));
						$(".price>em", li).text(SetNumComma(searchRow.n_price));
					} else {
						$(".ico_label", li).remove();
						if(searchRow.v_flag_beauty == "Y"){
							$(".price", li).html("");
							$(".price", li).css("color","#ea5279");
							$(".price", li).html("<em style='color:#ea5279;'>"+SetNumComma(searchRow.n_price)+"</em>P");
						}else{
							$(".price>em", li).text(SetNumComma(searchRow.n_price));
						}
						
						$(".sale", li).remove();
					}
					
					$(".thumbImg>img", li).attr("src", searchRow.v_img_path);
					$(".thumbImg>img", li).css({"width":"140px", "height":"140px"});
					$(".thumbImg>img", li).attr("onerror", "fnNoImage(this)");
					
					if(searchRow.v_brandnm != undefined && searchRow.v_brandnm != '') {
						$(".prodDetail>.brandNm", li).text(searchRow.v_brandnm);
					} else {
						$(".prodDetail>.brandNm", li).remove();
					}
					
					$(".prodDetail>.prodNm", li).text(searchRow.v_productnm);
					
					$(".gradeType", li).addClass("grade0"+Math.round(searchRow.n_single_point));
					$(".replyCount>em", li).text(searchRow.n_review_cnt);
					
					if(searchRow.v_statuscd != "0002") {
						$(".stateArea", li).remove();
					}
					
					$("a", li).attr("href", GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+searchRow.v_productcd+"&clickUrl="+searchRow.v_clickurl);
					$("a", li).attr("onclick", "searchClickTagEvent('"+$("#i_sSearchProdKeyword").val()+"','"+searchRow.v_productcd+"','MOBILE')");
					li.appendTo($(".ul_prodSearch")).show();
				}
				$(".recommendTtl").show();
				$(".recommendTtl").text(smartList[0].v_scenariocomment);
				$(".div_resultArea").show();
				$(".div_resultNonArea").hide();
				searchListYn = "Y";
			} else {
				$(".recommendTtl").hide();
			}
			
			if(list != undefined && list.length > 0) {
				
				for(var i=0; i<list.length; i++) {
					var searchRow = list[i];
					
					var li = $(".li_prodSearch").eq(0).clone(false);
					
					if(searchRow.n_list_price != searchRow.n_price) {
						var salePer = parseInt((parseInt(searchRow.n_list_price) - parseInt(searchRow.n_price)) / parseInt(searchRow.n_list_price) * 100);
						$(".ico_label>em", li).eq(0).text(salePer);
						
						$(".sale>em", li).text(SetNumComma(searchRow.n_list_price));
						$(".price>em", li).text(SetNumComma(searchRow.n_price));
					} else {
						$(".ico_label", li).remove();
						if(searchRow.v_flag_beauty == "Y"){
							$(".price", li).html("");
							$(".price", li).css("color","#ea5279");
							$(".price", li).html("<em style='color:#ea5279;'>"+SetNumComma(searchRow.n_price)+"</em>P");
						}else{
							$(".price>em", li).text(SetNumComma(searchRow.n_price));
						}
						
						$(".sale", li).remove();
					}
					
					$(".thumbImg>img", li).attr("src", searchRow.v_img_path);
					$(".thumbImg>img", li).css({"width":"140px", "height":"140px"});
					$(".thumbImg>img", li).attr("onerror", "fnNoImage(this)");
					
					if(searchRow.v_brandnm != undefined && searchRow.v_brandnm != '') {
						$(".prodDetail>.brandNm", li).text(searchRow.v_brandnm);
					} else {
						$(".prodDetail>.brandNm", li).remove();
					}
					
					$(".prodDetail>.prodNm", li).text(searchRow.v_productnm);
					
					$(".gradeType", li).addClass("grade0"+Math.round(searchRow.n_single_point));
					$(".replyCount>em", li).text(searchRow.n_review_cnt);
					
					if(searchRow.v_statuscd != "0002") {
						$(".stateArea", li).remove();
					}
					
					$("a", li).attr("href", GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+searchRow.v_productcd);
					$("a", li).attr("onclick", "searchClickTagEvent('"+$("#i_sSearchProdKeyword").val()+"','"+searchRow.v_productcd+"','MOBILE')");
					li.appendTo($(".ul_prodSearch")).show();
				}
				
				$(".div_resultArea").show();
				$(".div_resultNonArea").hide();
				searchListYn = "Y";
				
				//tagging
				try {
					PAGE_TAG.SEARCH_RES_2 = $("#i_sSearchProdKeyword").val();
					s.prop7		= PAGE_TAG.SEARCH_RES_2;
					s.prop6  = "";
					s.events	= "event2";
					void(s.tl());
					//SmartOffer - 개인화 추천 태깅 (검색)
					searchTagEvent($("#i_sSearchProdKeyword").val(),$("#i_iRecordCntSearch").val(),"MOBILE");
				} catch(e) {}
				
				MobileCommon.fn.addSearchScrollEvent();
			} 
			
			if(searchListYn == 'N') {
				var	layerRealBox	= $(".layerRealtimeBox");
				
				var realTime = object.realTimeList;
				
				if(realTime != undefined && realTime.length > 0) {
					var html = [];
					for(var i=0; i<realTime.length; i++) {
						var ico = "";
						var rk = parseInt(realTime[i].n_ranking, 10);
						var pre_rk = parseInt(realTime[i].n_pre_ranking, 10);
						
						if(pre_rk == 0) {
							ico += "<span class=\"ico_new2\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_new2.png\" alt=\"new\"/></span>";
						} else if(rk < pre_rk) {
							var rank = pre_rk - rk;
							ico += "<span class=\"ico up\">상승</span><span class=\"num\">"+rank+"</span>";
						} else if(rk > pre_rk) {
							var rank = (pre_rk - rk) * -1;
							ico += "<span class=\"ico down\">하락</span><span class=\"num\">"+rank+"</span>";
						} else {
							ico += "<span class=\"ico same\">동일</span>";
						}
						
						if(i % 5 == 0) {
							html.push("<div><ul>");
						}
						
						html.push("<li>");
						html.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+realTime[i].v_productcd+"\" class=\"realtime_txt ellipsis\">");
						html.push("		<em class=\"num\">"+parseInt(i+1)+"</em>");
						html.push("		<span class=\"hide\">위</span>"+realTime[i].v_productnm);
						html.push("		<span class=\"rank_num\">" + ico + "</span>");
						html.push("	</a>");
						html.push("</li>");
						
						if(i % 5 == 4) {
							html.push("</div></ul>");
						}
					}
					if(evtList != undefined && evtList.length >0){
						$(".div_resultArea").show();
						$(".div_resultNonArea").show();
						$(".p_srchKeyword").hide();
						$(".layerRealtimeSwipe-wrap").html(html.join(""));
						
						layerRealBox.addClass("active");
						$(".layerRealtimeSwipe").show();
					}else{
						$(".div_resultArea").hide();
						$(".div_resultNonArea").show();
						$(".p_srchKeyword").show();
						$(".layerRealtimeSwipe-wrap").html(html.join(""));
						
						layerRealBox.addClass("active");
						$(".layerRealtimeSwipe").show();
					}
					
					
					window.layerRealtimeSwipe	= new Swipe(document.getElementById('layerRealtimeSwipe'), {
						continuous: false,
						stopPropagation: true,
						callback: function(event, element) {
							$(".layerRealtimeSwipe-nav > span").removeClass().eq(event).addClass("active");
						}
					});
					
				}
				
				//tagging
				try {
					PAGE_TAG.SEARCH_RES_1 = $("#i_sSearchProdKeyword").val();
					s.prop6		= PAGE_TAG.SEARCH_RES_1;
					s.prop7 = "";
					s.events	= "event2";
					void(s.tl());
					//SmartOffer - 개인화 추천 태깅 (검색)
					searchTagEvent($("#i_sSearchProdKeyword").val(),$("#i_iRecordCntSearch").val(),"MOBILE");
				} catch(e) {}
			}
		},
		addSearchScrollEvent : function() {
			$("#modalPopupSearchForm").bind("scroll", function(event) {
				var elem = $("#modalPopupSearchForm");
				if(!MobileCommon.isLoadingPrdList && (elem[0].scrollHeight - elem.scrollTop() <= elem.outerHeight() )&& 
						parseInt(parameter_search.i_iNowPageNo) < parseInt(parameter_search.i_iTotalPageCnt) && parseInt(parameter_search.i_iRecordCnt) > ($(".li_prodSearch").size() -1) &&
						($(".li_prodSearch").size() - 1) > 0) {
					if(MobileCommon.isLoadingPrdList) {
						return;
					}
					MobileCommon.isLoadingPrdList = true;
					
					var result = parameter_search.pageStack[0];
					
					for(var i in parameter_search.pageStack ) {
						if(parseInt(result) < parseInt(parameter_search.pageStack[i])) {
							result = parameter_search.pageStack[i];
						}
					}
					
					parameter_search.i_iNowPageNo = parseInt(result) + 1;
					MobileCommon.fn.searchProduct(parameter_search.i_iNowPageNo);
					
				} else if(!MobileCommon.isLoadingPrdList && $("#modalPopupSearchForm").scrollTop() == 0 &&
						parseInt(parameter_search.i_iNowPageNo) > 1 && parseInt(parameter_search.i_iRecordCnt) > 0 &&
					($(".li_prodSearch").size() - 1) > 0) {
					var result = parameter_search.pageStack[0];
					for(var i in parameter_search.pageStack) {
						if(parseInt(result) > parseInt(parameter_search.pageStack[i])) {
							result = parameter_search.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						parameter_search.i_iNowPage = parseInt(result) - 1;
						
						MobileCommon.fn.searchProduct(parameter_search.i_iNowPageNo);
					}
				}
			});
		},
		openLiveChat : function(){
			if (GLOBAL_MOBILE_APP == 'APP'){
				if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
					window.location="apjscall://goTargetWithOutter?"+GLOBAL_WEB_URL+"comm/comm_live_chat.do";
				}else{
					
				}
			}
		},
		//안드로이드 페이지 통신용 함수
		getMainIdxReturnApp : function(){
			$('.gnbmenu ul li').each(function(idx){
				if($(this).hasClass('active')){
					window.aMain.jsMainPageIdx(idx);
				}
			});
		},
		
		getLoginPageCheckedApp : function(){
			var checked = $('#i_sFlagAuto').is(':checked');
			window.aMain.jsLoginPageChecked(checked);
		},
		openNewPop : function(url){
			if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
				window.location="apjscall://jsShowSubWebView?"+url;
			}else if (GLOBAL_MOBILE_OS == 'AND') {
				window.aMain.jsNewWebView(url);
			}else{
				window.open(url);
			}
		}
		
	},

	/**
	 * 모바일 공통 Ajax 처리 모듈
	 */
	ajax : function(opts) {
		// default options
		var	settings	= {
			url				: "",
			async			: true,					// 비동기 방식 true, false
			target			: document.body,
			errorProcType	: "alert",				// 에러처리 방식 alert, html
			data			: {},					// 요청 데이터
			beforeSend		: function() {			// 요청전 실행할 함수
			},
			success			: function() {			// 응답성공시 실행할 함수
			},
			error			: function(xhr, statusText) {	// 에러발생시 실행할 함수
			},
			dataType		: "json",				// 응답데이터 유형  json, xml, html, script, json, jsonp, text
			type			: "post",				// 전송방법 기본값  post, (get/post)
			animation		: false,					// 로딩 이미지 표시
			isModalEnd		: false
		};

		$.extend(settings, opts);

		// make the default timeout value.
		var	timeoutValue	= (settings.timeout) ? settings.timeout : 20000;	// default 10초

		// make a loading image
		var	ctime		= new Date().getTime();
		var	randomVal	= Math.floor(Math.random() * 100) + 1;
		var	divId		= "DIV" + ctime + "_" + randomVal;

		var	options	= {
			url		: settings.url,		// 요청URL
			async	: settings.async,	// 동기식
			data	: settings.data,
			type	: settings.type,	// POST / GET
			timeout	: timeoutValue,
			beforeSend	: function(jqXHR, setting) {
				if (typeof opts.beforeSend == "function") {
					opts.beforeSend();
				}
				else {
					if(settings.animation != 'undefined' && settings.animation) {
						showLoadingBox();
					}
				}
			},
			success	: function(responseData, statusText) {
				$("#" + divId).remove();	// delete the loading image.

				if (settings.success) {
					settings.success(responseData, statusText);
				}
			},
			complete : function(jqXHR, textStatus) {
				
				if(typeof settings.isModalEnd != 'undefined' && settings.isModalEnd) {
					hideLoadingBox();
				}
				
				if(GLOBAL_FLAG_APP_NEW == "Y") {
					try {	
						if(GLOBAL_MOBILE_OS == "AND") {
							window.Android.setDimming(false);
						}
						else{
							window.webkit.messageHandlers.setDimming.postMessage(false);
						}
					}
					catch(ex) {}
				}
			},
			// 통신오류
			error	: function(xhr, statusText) {
				$("#" + divId).remove();	// delete the loading image.

				if (settings.error) {
					var	errCode	= xhr.status;
					var	errMsg	= "";

					if (settings.errorProcType == "html") {
						// TODO 오류메시지 표시 레이어 팝업 구현
					} else {
						switch (xhr.status) {
							case 0:
								errMsg	= "서버에 접속할 수 없습니다.";
								break;
							case 404:
								errMsg	= "요청하신 페이지를 찾을 수 없습니다.";
								break;
							case 500:
								errMsg	= "서버에서 오류가 발생했습니다.";
								break;
							case 408:
								errMsg	= "서버로부터 응답이 없습니다(Timeout).";
								break;
							default:
								errMsg	= "알 수 없는 오류가 발생했습니다.";
								break;
						}
						if(xhr.status != 0) {
							alert(errMsg + " [오류코드:" + errCode + "]");
						}
					}
				}
			}
		};

		$.ajax(options);
	},

	/**
	 * Element의 좌표와 width, height를 반환
	 * 
	 * @param selector 요소 selector
	 * @return 객체 (.left : 좌측 위치, .top : 상단 위치, .width : 폭, .height : 높이)
	 */
	getBounds : function(selector) {
		var	ret	= {
			left   : $(selector).offset().left,
			top    : $(selector).offset().top,
			width  : $(selector).outerWidth(),
			height : $(selector).outerHeight()
		};

		return ret;
	}
	
};
