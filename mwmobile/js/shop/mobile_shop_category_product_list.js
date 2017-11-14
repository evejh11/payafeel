///////////////////renew2017.js////////////////////////////
var context = window,
	$win = $(window),
	$body = $('body'),
	$doc = $(document);

(function($){
	"use strict";

	$.fn.offon = function(type, f){
		return this.off(type).on(type, f);
	}

	$.fn.exists = function(){
		return this.length > 0;
	}

	$.fn.noop = function(){
		return this;
	}

	// space ([margin, padding], [horizontal, vertical, top, right, bottom, left])
	$.fn.space = function(property, option) {
		var property = String(property),
			option = String(option),
			value = 0;
		
		if(option == "horizontal") {
			if($(this).css(property + "-left") && $(this).css(property + "-left").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-left").replace(/\D/g, ""));
			}
			if($(this).css(property + "-right") && $(this).css(property + "-right").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-right").replace(/\D/g, ""));
			}
		} else if(option == "vertical") {
			if($(this).css(property + "-top") && $(this).css(property + "-top").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-top").replace(/\D/g, ""));
			}
			if($(this).css(property + "-bottom") && $(this).css(property + "-bottom").replace(/\D/g,"")) {
				value += Number($(this).css(property + "-bottom").replace(/\D/g, ""));
			}
		} else {
			if($(this).css(property + "-" + option) && $(this).css(property + "-" + option).replace(/\D/g,"")) {
				value = Number($(this).css(property + "-" + option).replace(/\D/g, ""));
			}
		}
		
		return value;
	};
}(jQuery));

(function($){
	if(!$){
		throw new Error("This library requires jQuery.");
	}
}(jQuery));

/* 공통 : 페이지 swipe 스크립트 */
(function($){
	var $mMenuItems = $('.gnb_nav .nav').find('li');
	
	$mMenuItems.find('a').click(function(e){
		var idx = $(this).parents('.gnb_nav .nav>li').index();
		$.clickMenuSlider(idx);
		e.preventDefault();
	}); 

	
	$.clickMenuSlider = function(id){ 
		$mMenuItems.removeClass('on'); 
		$mMenuItems.eq(id).addClass('on');
	}
}(jQuery));

/* 공통 레이아웃 */
var gnbNavScroll;
(function($){
	var GlobalUI = {
		init : function(){
			var me = this;
			me.winW = $(window).width();
			me.winScroll = $win.scrollTop();
			me.$header = $('header'); // 헤더
			me.$gnbNav = $('#gnbNavScroll'); // 카테고리 스크롤
			me.$shopTab = $('#shopProdTabs'); // 상품상세 탭
			me.shopTabSpace = $(".shop_prod_details").space('margin', 'top'); 
			//me.$fBox = $("#filterBox"); // 필터박스

			me._fixpos();
			me._header();
			me._mainGnb();
			me._floatBott();
			me._subCate();

			$(window).resize(function(){
				me._fixpos();
			});
		},

		_header: function(){
			var me = this;

			if(!me.$header.exists()){
				return false;
			}

			var isFix = true;
			
			// HEADER 관련 FLOAT 이벤트
			$(window).on('scroll touchmove',function(){
				me.winScroll = $win.scrollTop();

				if(me.winScroll > 0){
					if(isFix){
						me.$header.addClass('fixed');
						isFix = false;
					}
				} else {
					me.$header.removeClass('fixed');
					isFix = true;
				}
			});
		},

		_fixpos : function(){
			var me = this;

			// 각 위치 값
			window.fixeditem = {
				HEADER_H: (!me.$header.exists()) ? 0 : me.$header.outerHeight(), // height
				HEADER_T: (!me.$header.exists()) ? 0 : me.$header.offset().top, // top
				GNB_NAV_T: (!me.$gnbNav.exists()) ? 0 : me.$gnbNav.offset().top,
				SHOP_TAB_H: (!me.$shopTab.exists()) ? 0 : me.$shopTab.outerHeight(),
				SHOP_TAB_T: (!me.$shopTab.exists()) ? 0 : me.$shopTab.offset().top,
				//FILTER_T: (!me.$fBox.exists()) ? 0 : me.$fBox.offset().top
			};
		},

		_mainGnb : function(){
			var me = this;
			var gnbFix = true;

			if($('.gnb_navwrap').exists()){
				var $mainGnb = $('.gnb_navwrap');
				var main_gnbH = $mainGnb.offset().top;

				// 상단 메인메뉴 GNB 영역 스크립트
				var offset = 0;
				var $aw = 0;

				var $gnbNav = $('#gnbNavScroll .nav');
				var $gnbNavItems = $gnbNav.find('li');

				init = function () {
					if($gnbNavItems.length <= 5){
						$gnbNav.addClass('minimum');
					}
				};

				init();

				if(!$gnbNav.exists()){
					return false;
				}

				//iscroll 가로값 체크
				$gnbNavItems.each(function(){
					var $eW = $(this).innerWidth();
					$aw = $aw + $eW;
					
					// 브랜드 선택된 곳의 스크롤 위치
					if($(this).attr("class") == "on"){
						offset = $aw - $eW;
					}
				});

				$gnbNav.css('width', $aw + 1);

				//iscroll핸들러
				function scrollHandler() {
					if(this.x || this.x === 0) {
						offset = this.x
					}
				};

				//iscroll
				gnbNavScroll = new iScroll('gnbNavScroll', {
					zoom:false,
					momentum: true,
					vScroll:false,
					hScrollbar:false,
					onBeforeScrollStart:function(e){
						e.preventDefault();
						e.stopPropagation();
					},
					onScrollMove: scrollHandler,
					x : -offset
				});

				$(window).resize(function(){
					me.winW = $(window).width();
					$aw = 0;
					$gnbNavItems.each(function(){
						var $eW = $(this).innerWidth();
						$aw = $aw + $eW;
					});
					$gnbNav.css('width',$aw + 1);
				});

				// BOTTOM 관련 FLOAT 이벤트 (TOP / 최근 본 상품)
				$(window).on('scroll touchmove',function(){
					me.winScroll = $win.scrollTop();

					if($('header').hasClass('unfixed')){ // 메인일 경우
						if(me.winScroll >= main_gnbH){
							if(gnbFix){
								$mainGnb.addClass('fixed');
								gnbFix = false;
							}
						} else {
							$mainGnb.removeClass('fixed');
							gnbFix = true;
						}

						$('.gnb_nav').css({'top' : 0});

					} else { // 서브일 경우
						if(me.winScroll >= main_gnbH - window.fixeditem.HEADER_H){
							if(gnbFix){
								$mainGnb.addClass('fixed');
								gnbFix = false;
							}
						} else {
							$mainGnb.removeClass('fixed');
							gnbFix = true;
						}
					}
				});
			}
			
			$(window).on('scroll touchmove',function(){
				me.winScroll = $win.scrollTop();

				// 상세 탭 고정
				if(me.$shopTab.exists()){
					if(me.winScroll >= (window.fixeditem.SHOP_TAB_T)){
						if(!me.$shopTab.hasClass('fixed')){
							me.$shopTab.addClass('fixed');
						}
					} else {
						me.$shopTab.removeClass('fixed');
					}
				}

				// 필터 박스 고정
				/*if(me.$fBox.exists()){
					if(me.winScroll >= (window.fixeditem.FILTER_T - window.fixeditem.HEADER_H)){
						if(!me.$fBox.hasClass('sec_filter')){ //공통필터 첨부 class 수정 2017/10/10
							me.$fBox.addClass('sec_filter');
						}
					} else {
						me.$fBox.removeClass('sec_filter');
					}
				}*/ /*주석처리 2017/10/20*/
			});
		},

		_subCate : function(){
			var me = this;

			var $body = $('body');
			var $flaotBar = $('.floatbar');
			var $subCate = $('.gnb_grphd');
			var $dimmed;
			var getSub = false;

			if(!$subCate.exists()){
				return false;
			}

			$subCate.find('h2 a').on('click',  function(){
				$subCate = $(this).parents('.gnb_grphd');
				getCate = ($subCate.find('.nav_mcate').length > 0) ? true : false ;

				// 레이어 메뉴를 가지고 있을 경우만 실행
				if(getCate){
					$dimmed = '<button type="button" class="dimmed" />';

					if($subCate.hasClass('open') === false){
						$subCate.addClass('open');
						$subCate.append($dimmed);
						$flaotBar.addClass('backwards'); // 딤드 아래로 보여짐
					}else{
						$subCate.removeClass('open');
						$subCate.find('.dimmed').hide().remove();
						$flaotBar.removeClass('backwards');
					}
				}
			});

			$('body').on('click', '.dimmed', function(){
				$subCate.removeClass('open');
				$subCate.find('.dimmed').hide().remove();
				$flaotBar.removeClass('backwards');
			});
		},

		_floatBott : function(){
			var me = this;

			if(!$('.floatbar').exists()){
				return false;
			}

			var $quickBot = $('.floatbar').find('.quick');
			
			// BOTTOM 관련 FLOAT 이벤트 (TOP / 최근 본 상품)
			$(window).on('scroll touchmove',function(){
				me.winScroll = $win.scrollTop();

				if( me.winScroll > 300 ){
					$quickBot.stop(true,true).addClass("on");
				}else{
					$quickBot.stop(true,true).removeClass("on");
				}
			});

			// 상단으로 가기
			$('.btn_top').on('click',function(){
				$win.scrollTop(0);
			});
		}
	}

	GlobalUI.init();

	window.GlobalUI = GlobalUI;
}(jQuery));

$(document).ready(function(){
	// 브랜드 더보기
	$(".box_brand .btn_more").on("click", function(e){
		var $box = $(this).parents('.box_brand');

		if($box.hasClass('on') !== true){
			$box.addClass('on');
		}else{
			$box.removeClass('on');
		}
	});

	// 그룹헤더 : 카테고리 더보기
	$(".side_box.cate li a").on("click", function(e){
		var $dep2 = $(this).parents('.side_box.cate').find('.depth2');

		if($(this).hasClass('on') !== true){
			var target = $(this).attr('href').replace('#', '');
			$(".side_box.cate li a").removeClass('on');
			$(this).addClass('on');
			$dep2.removeClass('on');
			$('.side_box.cate .depth2[id="'+ target +'"]').addClass('on');
		}else{
			$(this).removeClass('on');
			$dep2.removeClass('on');
		}
		return false;
	});

	// 필터 - VIEW 타입 변경 및 아이콘 변경
	$('.sec_filter .sortA button').on('click', function(){
		//$('.prod_list_box').toggleClass('album');//.attr('data-album', 'false');
		//var $board = $(this).parents('.sec_filter').next().next('.prod_list_box'); // 해당 게시판
		var $board = $('#prod_list_box_1'); // 해당 게시판
		var $icon = $(this).find('>i'); // 아이콘i-sort_1
		
		if($board.hasClass('album')){
			$board.removeClass('album');
			$icon.removeClass('album').addClass('list');
		} else {
			$board.addClass('album');
			$icon.removeClass('list').addClass('album');
		}
	});
});

// 옵션레이어 박스 열기
// target = 열 레이어 id명
// transition = transition 효과
function detailOpen(target, transition){
	var $target = $('#' + target);

	$target.addClass('open');

	if(transition === true){
		$target.addClass('transition3s');
	} else {
		$target.removeClass('transition3s');
	}
}

// 옵션레이어 박스 닫기
// target = 닫을 레이어 id명
// transition = transition 효과
function detailClose(target, transition){
	var $target = $('#' + target);

	$target.removeClass('open');

	if(transition === true){
		$target.addClass('transition3s');
	} else {
		$target.removeClass('transition3s');
	}
}

///////////////////renew2017.js////////////////////////////

/**
 * Coding script
 */

var prodlistIscroller,
offset = 0;
var winW = $(window).width();
var $aw = 0;

/**
 * 모바일 상품목록의 이벤트 처리를 위한 Javascript
 */
var parameter = {
	i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iPageSize		: parseInt($('#i_iPageSize').val() || "30", 10),
	i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
	i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
	i_sFlagPageInit	: "N",
	i_sCategorycd1	: $('#i_sCategorycd1').val(),
	i_sCategorycd2	: "",
	i_sCategorycd3	: "",
	i_sBrandcd		: "",
	i_sFlagBrand	: "",
	pageStack		: [],
	i_sPrdBrandcd	: "",
	i_sPrdSkin		: "",
	i_sPrdFeature	: "",
	i_sSelectSkin	: "",
	i_sSelectFeature: "",
	i_sPrdService	: "",
	i_sSelectService: "",
	i_sPrdPrice		: "",
	i_sSelectPrice	: "",
	i_sPrdFunc		: "",
	i_sSelectFunc	: "",
	i_sPrdPopular	: "",
	i_sPrdTrubleType : "",
	i_sSelectPrdTrubleType : "",
	i_sPrdTexture	: "",
	i_sOptMakeupeft	: "",
	i_sSelectMakeup	: "",
	i_sSaleSt		: "",
	i_sSaleEn		: "",
	i_sPriceSt		: "",
	i_sPriceEn		: "",
	i_sSpfSt		: "",
	i_sSpfEn		: "",
	i_sOptPA		: "",
	i_sRgb			: "",
	i_sFlagSort		: "",
	i_sFlagFilter	: "",
	i_sStatuscd		: "",
	i_sOptDeliveryTypecd : "",
	i_sOptSapstcd	: ""
};

var MobileShopCategoryProductList = {
	name : "MobileShopCategoryProductList",
	
	init : function() {
		MobileShopCategoryProductList.fn.setSubMenuChange();
		MobileShopCategoryProductList.fn.getPageInit();
		MobileShopCategoryProductList.fn.addScrollEvent();
	},
	isLoadingPrdList : false,
	
	fn : {
		/**
		 * 버튼 제어를 위한 function
		 */
		addBtnEvent : function() {
			
			// 2depth 클릭
			/*$(".btn_category").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id") == "ALL" ? "" : $(this).attr("id");
				
				$(".btn_category").removeClass("on");
				$(this).addClass("on");
				
				var level = $(this).attr("level");
				
				if(level == 1) {
					parameter.i_sCategorycd1 = id;
					$("input[name='i_sCategorycd1']").val(id);
				} else if(level == 2) {
					parameter.i_sCategorycd2 = id;
					$("input[name='i_sCategorycd2']").val(id);
				} else if(level == 3) {
					parameter.i_sCategorycd3 = id;
					$("input[name='i_sCategorycd3']").val(id);
				}
				
				parameter.i_sFlagPageInit = "N";
				
				parameter.pageStack = new Array();
				MobileShopCategoryProductList.fn.getShoppingProductList(1);
			});*/ //수정 2017/10/24
			
			// 상품 상세 페이지 이동
			$(".prod_item a").unbind("click").click(function(event) {
				event.preventDefault();
				MobileBodyStart.goProductDetail($(this).attr("id"));
			});
			
			// 리스트 정렬
			$(".select_sort").unbind("change").change(function(event) {
				event.preventDefault();
				var value = $(this).val();
				$("input[name='i_sFlagSort']").val(value);
				
				parameter.i_sFlagSort = value;
				
				MobileShopCategoryProductList.fn.getShoppingProductList(1);
			});
		},
		/**
		 * 스크롤 더보기를 위한 function
		 */
		/*addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				if(!MobileShopCategoryProductList.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 600) )&& 
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".prod_item").size() &&
						$(".prod_item").size() > 0) {
					
					if(MobileShopCategoryProductList.isLoadingPrdList) {
						return;
					}
					
					MobileShopCategoryProductList.isLoadingPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					
					for(var i in parameter.pageStack) {
						if(parseInt(result) < parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					parameter.i_iNowPageNo = parseInt(result) + 1;
					
					parameter.i_sFlagPageInit = "N";
					setTimeout(function() {
						MobileShopCategoryProductList.fn.getShoppingProductList(parameter.i_iNowPageNo);
					}, 1000);
				} else {
					
				}
			});
		},*/ //수정 2017/10/24
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				if(!MobileShopProductList1.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 600) )&& 
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".prod_item").size() &&
						$(".prod_item").size() > 0) {
					
					if(MobileShopProductList1.isLoadingPrdList) {
						return;
					}
					
					MobileShopProductList1.isLoadingPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					
					for(var i in parameter.pageStack) {
						if(parseInt(result) < parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					parameter.i_iNowPageNo = parseInt(result) + 1;
					
					parameter.i_sFlagPageInit = "N";
					setTimeout(function() {
						//MobileShopProductList1.fn.getShoppingProductList(parameter.i_iNowPageNo); //기존
						
						fn_filterItems(parameter.i_iNowPageNo); //신규
					}, 1000);
				} else if(!MobileShopProductList1.isLoadingPrdList && $(window).scrollTop() == 0 &&
					parameter.i_iNowPageNo > 1 && parameter.i_iRecordCnt > 0 &&
					$(".prod_item").size() > 0) {
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					for(var i in parameter.pageStack) {
						if(parseInt(result) > parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						parameter.i_iNowPage = parseInt(result) - 1;
						
						parameter.i_sFlagPageInit = "N";
						//MobileShopProductList1.fn.getShoppingProductList(parameter.i_iNowPageNo); //기존
						
						fn_filterItems(parameter.i_iNowPageNo); //신규
					}
				}
			});
		},//수정 2017/10/25
		/**
		 * 서브메뉴 이벤트 function
		 */
		setSubMenuChange : function() {
			
			$("a", ".coltype").unbind("click").click(function(event) {
				var click = $(this).find("input");
				event.preventDefault();
				var val = click.val();
				var ucategory = click.attr("ucategory");
				if($("input[name='i_sFlagBrand']").val() == "Y") {
					location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_category_product_list.do?i_sFlagBrand=Y&i_sBrandcd=" + val;
				} else {
					if(click.hasClass("option_depth1")) {
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_category_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + val;
					} else if(click.hasClass("option_depth2")) {
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_category_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + ucategory + "&i_sCategorycd2=" +val;
					} else{
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_category_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + ucategory + "&i_sCategorycd3=" +val + "&i_sCushionZone=Y";
					}
				}
			});
		},
		setParameter : function() {
			parameter.i_sCategorycd1 = $("#i_sCategorycd1").val();
			parameter.i_sCategorycd2 = $("#i_sCategorycd2").val();
			parameter.i_sCategorycd3 = $("#i_sCategorycd3").val();
			parameter.i_sFlagBrand = $("#i_sFlagBrand").val();
			parameter.i_sBrandcd = $("#i_sBrandcd").val();
			
			parameter.i_sPrdSkin = $(".i_sPrdSkin").val();
			parameter.i_sPrdFeature = $(".i_sPrdFeature").val();
			parameter.i_sSelectSkin = $(".i_sSelectSkin").val();
			parameter.i_sSelectFeature = $(".i_sSelectFeature").val();
			parameter.i_sPrdService = $(".i_sPrdService").val();
			parameter.i_sSelectService = $(".i_sSelectService").val();
			parameter.i_sPrdPrice = $(".i_sPrdPrice").val();
			parameter.i_sSelectPrice = $(".i_sSelectPrice").val();
			parameter.i_sPrdFunc = $(".i_sPrdFunc").val();
			parameter.i_sSelectFunc = $(".i_sSelectFunc").val();
			parameter.i_sPrdPopular = $(".i_sPrdPopular").val();
			parameter.i_sPrdTrubleType = $(".i_sPrdTrubleType").val();
			parameter.i_sSelectPrdTrubleType = $(".i_sSelectPrdTrubleType").val();
			parameter.i_sPrdTexture = $(".i_sPrdTexture").val();
			parameter.i_sOptMakeupeft = $(".i_sOptMakeupeft").val();
			parameter.i_sSelectMakeup = $(".i_sSelectMakeup").val();
			parameter.i_sPrdBrandcd = $(".i_sPrdBrandcd").val();
			parameter.i_sSaleSt = $(".i_sSaleSt").val();
			parameter.i_sSaleEn = $(".i_sSaleEn").val();
			parameter.i_sPriceSt = $(".i_sPriceSt").val();
			parameter.i_sPriceEn = $(".i_sPriceEn").val();
			parameter.i_sSpfSt = $(".i_sSpfSt").val();
			parameter.i_sSpfEn = $(".i_sSpfEn").val();
			parameter.i_sOptPA = $(".i_sOptPA").val();
			parameter.i_sRgb = $(".i_sRgb").val();
			parameter.i_sFlagFilter = $("input[name='i_sFlagFilter']").val();
			parameter.i_sStatuscd = $(".i_sStatuscd").val();
			parameter.i_sOptDeliveryTypecd = $(".i_sOptDeliveryTypecd").val();
			parameter.i_sOptSapStcd = $(".i_sOptSapStcd").val();
			parameter.i_sFlagSort = $("input[name='i_sFlagSort']").val();
		},
		/**
		 * 최초 페이지 로딩 시 실행 function
		 */
		getPageInit : function() {
			if(MobileShopCategoryProductList.isLoadingPrdList) {
				return;
			}
			
			MobileShopCategoryProductList.isLoadingPrdList = true;
			
			parameter.i_sFlagPageInit = "Y";
			MobileShopCategoryProductList.fn.setParameter();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_list_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : true,
				isModalEnd : true,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileShopCategoryProductList.isLoadingPrdList = false;
						MobileShopCategoryProductList.fn.setShopProductList(data.object);
						
						var shop = data.object.shopprd;
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						MobileShopCategoryProductList.fn.addBtnEvent();
					} else {
						alert(data.message);
					}
				}
			});
		},
		/**
		 * 상품목록 ajax function
		 * @param i_iNowPageNo : 현재 페이지
		 */
		getShoppingProductList : function(i_iNowPageNo) {
			parameter.i_iNowPageNo  = i_iNowPageNo;
			MobileShopCategoryProductList.fn.setParameter();
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_list_ajax.do",
				type : "POST", 
				dataType : "json",
				data : parameter,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileShopCategoryProductList.isLoadingPrdList = false;
						MobileShopCategoryProductList.fn.setShopProductList(data.object);
						
						var shop = data.object.shopprd;
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						MobileShopCategoryProductList.fn.addBtnEvent();
						hideScrollLoadingBox();
					} else {
						showMessageBox({
              				message : data.message
              			});
					}
				}, error : function() {
					MobileShopCategoryProductList.isLoadingPrdList = false;
				}
			});
		},
		/**
		 *  loazy loding 이미지 로딩
		 */
		lazyLoading : function() {
			$("img.lazy").lazyload({
				event: "scrollstop",
				threshold : 600
			});
		},
		/**
		 * 리턴된 데이터를 이용해 화면에 뿌리는 function
		 * @param object : ajax 리턴된 데이터
		 */
		setShopProductList : function(object) {
			var productHtml = [];
			
			var brand = object.brand;
			var feature = object.feature;
			var skin = object.skin;
			var popular = object.popular;
			var price = object.price;
			var service = object.service;
			var func = object.func;
			var trouble = object.trouble;
			var texture = object.texture;
			var makeup = object.makeup;
			var pa = object.pa;
			var cate = object.category;
			var list = object.shopprd.list;
			var page = object.shopprd.page;
			
			var brandnm = object.brandnm;
			var ctgnm = object.ctgnm;
			
			$('#i_iNowPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iRecordCnt').val(page.i_iRecordCnt);
			
			try {
				if(brandnm != undefined && brandnm != "") {
					PAGE_TAG.PAGE_NAME = "HOME^"+brandnm;
				} else if(ctgnm != undefined && ctgnm != "") {
					PAGE_TAG.PAGE_NAME = "HOME^"+ctgnm;
				} else {
					PAGE_TAG.PAGE_NAME = "HOME^상품";
				}
			} catch(e) {}
			
			parameter.i_iNowPage = page.i_iNowPageNo;
			parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter.i_iRecordCnt = page.i_iRecordCnt;
			
			var arrParam = [];
			if(feature != undefined && feature.length > 0) {
				for(var i=0; i<feature.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+feature[i].v_sub_code1+"/feature\">"+feature[i].v_sub_codenm+"</a>");
				}
			}

			if(service != undefined && service.length > 0) {
				for(var i=0; i<service.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+service[i].v_sub_code1+"/service\">"+service[i].v_sub_codenm+"</a>");
				}
			}

			if(price != undefined && price.length > 0) {
				for(var i=0; i<price.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+price[i].v_sub_code1+"/price\">"+price[i].v_sub_codenm+"</a>");
				}
			}
			
			if(popular != undefined && popular.length > 0) {
				for(var i=0; i<popular.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+popular[i].v_sub_code1+"/popular\">"+popular[i].v_sub_codenm+"</a>");
				}
			}
			
			if(brand != undefined && brand.length > 0) {
				for(var i=0; i<brand.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\" id=\""+brand[i].v_brandcd+"/brand\">"+brand[i].v_brandnm+"</a>");
				}
			}

			if(skin != undefined && skin.length > 0) {
				for(var i=0; i<skin.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+skin[i].v_sub_code1+"/skin\">"+skin[i].v_sub_codenm+"</a>");
				}
			}
			
			if(trouble != undefined && trouble.length > 0) {
				for(var i=0; i<trouble.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+trouble[i].v_sub_code1+"/trouble\">"+trouble[i].v_sub_codenm+"</a>");
				}
			}
			
			if(texture != undefined && texture.length > 0) {
				for(var i=0; i<texture.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+texture[i].v_sub_code1+"/texture\">"+texture[i].v_sub_codenm+"</a>");
				}
			}
			
			if(makeup != undefined && makeup.length > 0) {
				for(var i=0; i<makeup.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+makeup[i].v_sub_code1+"/makeup\">"+makeup[i].v_sub_codenm+"</a>");
				}
			}
			
			if(func != undefined && func.length > 0) {
				for(var i=0; i<func.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+func[i].v_sub_code1+"/func\">"+func[i].v_sub_codenm+"</a>");
				}
			}
			
			if(pa != undefined && pa.length > 0) {
				for(var i=0; i<pa.length; i++) {
					arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+pa[i].v_sub_code1+"/pa\">PA"+pa[i].v_sub_codenm+"</a>");
				}
			}
			
			var statuscd = $(".i_sStatuscd").val();
			if(statuscd != undefined && statuscd != "") {
				arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\"0002/status\">일시품절</a>");
			}
			
			var optDeliveryTypecd = $(".i_sOptDeliveryTypecd").val();
			if(optDeliveryTypecd != undefined && optDeliveryTypecd != "") {
				arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\"0003/delivery\">긴급입고</a>");
			}
			
			var optSapStcd = $(".i_sOptSapStcd").val();
			if(optSapStcd != undefined && optSapStcd != "") {
				arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\"DK_004/sapstcd\">단종</a>");
			}
			
			
			$(".div_checked").html(arrParam.join("")); 
			
			if(parameter.i_sFlagPageInit == "Y" && GLOBAL_FLAG_APP_NEW != 'Y') {
				var arrCate = [];
				if(cate != undefined && cate.length > 0) {
					for(var i=0; i<cate.length; i++) {
						arrCate.push('<li class="btn_category" id="'+cate[i].v_categorycd+'" level="'+cate[i].n_level+'"><a href="#">'+cate[i].v_categorynm+'('+cate[i].n_cnt+')</a></li>');
					}
					$(".nav_scate ul").html(arrCate.join(""));
					
					var nowCategory = $("input[name='i_sCategorycd"+cate[0].n_level+"']").val();
					
					if(nowCategory != "") {
						$("#"+nowCategory).addClass("on");
					} else {
						
					}
				}
			}
			
			var criArr = new Array();
			if(list != undefined && list.length > 0) {
				for(var i=0; i<list.length; i++) {
					var row = list[i];
					
					var bannerhtml = "";
					if(row.v_banner != undefined && row.v_banner != "") {
						var banner = row.v_banner;
						if(banner.split(",")[1].length == 2) {
							bannerhtml = "<span class=\"ico_label la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1]+"</em><em></em></span>";
						} else {
							bannerhtml = "<span class=\"ico_label la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1].substring(0,2)+"</em><em>"+banner.split(",")[1].substring(2,4)+"</em></span>";
						}
					}
					
					var point = parseInt(row.n_single_point);
					
					var img_path = row.v_img_path || "";
					if(row.v_feature_tag != undefined && row.v_feature_tag != "" && row.v_feature_tag.indexOf("DG_P009") >-1){
						if(row.v_free_img_path != undefined && row.v_free_img_path != ""){
							img_path = row.v_free_img_path;
						}
					}
					if (img_path.indexOf("_155") > -1) {
						img_path = img_path.replace("_155", "_356");
					}
					
					// 상품 li 만들기
					productHtml.push('<li>');
					productHtml.push('<div class="prod_item">');
					productHtml.push('	<a href="#none" id="'+row.v_productcd+'">');
					productHtml.push('		<div class="thumb"><img data-original="'+img_path+'" class="lazy img-responsive" alt="'+row.v_productnm+'"></div>');
					productHtml.push('		<div class="details">');
					productHtml.push('			<p class="brand_nm">'+row.v_brandnm+'</p>');
					productHtml.push('			<p class="prod_nm">'+row.v_productnm+'</p>');
					// 금액 정보
					productHtml.push('			<div class="price_area">');
					if(row.n_list_price > row.n_price && row.n_plus_evt_give_cnt <= 0) {
						//뷰티 포인트
						if(row.v_flag_beauty == "Y"){
							productHtml.push('		<strong class="price point"><span>'+SetNumComma(row.n_price)+'</span>P</strong>');
						}else{
							var salePer = parseInt((parseInt(row.n_list_price) - parseInt(row.n_price)) / parseInt(row.n_list_price) * 100);
							productHtml.push('		<em class="sale">'+salePer+'%</em>');
							productHtml.push('		<strong class="price"><span>'+SetNumComma(row.n_price)+'</span>원</strong>');
							productHtml.push('		<del class="base"><span>'+SetNumComma(row.n_list_price)+'</span>원</del>');
						}
					}else if(row.n_plus_evt_give_cnt > 0){
						// 0+0 이벤트
						productHtml.push('				<em class="sale">'+row.n_plus_evt_buy_cnt + '<em style="font-size: 1.1em;font-weight: normal;">+</em>'+row.n_plus_evt_give_cnt+'</em></span>');
						productHtml.push('				<strong class="price"><span>'+SetNumComma(row.n_price*parseInt(row.n_plus_evt_buy_cnt))+'</span>원</strong>');
						productHtml.push('				<del class="base"><span>'+SetNumComma(row.n_list_price*parseInt(row.n_plus_evt_buy_cnt + row.n_plus_evt_give_cnt))+'</span>원</del>');
					}else {
						if(row.v_flag_beauty == "Y"){
							productHtml.push('			<strong class="price point"><span>'+SetNumComma(row.n_price)+'</span>P</strong>');
						}else{
							productHtml.push('			<strong class="price"><span>'+SetNumComma(row.n_price)+'</span>원</strong>');
						}
					}
					if(row.v_statuscd == "0002") {
						productHtml.push("				<span class=\"ico_state st1\">품절</span>");   
					}
					productHtml.push("			</div>");
					productHtml.push('			<div class="tag_area">');
					productHtml.push(			getProductListTag(row.v_feature_tag));
					productHtml.push('			</div>');
					productHtml.push('			<div class="info">');
					productHtml.push('				<div class="grade"><i class="i-grade grade0'+row.n_single_point+'">'+row.n_single_point+'점</i></div>');
					productHtml.push('				<div class="review">리뷰 <em>'+SetNumComma(row.n_review_cnt)+'</em></div>');
					productHtml.push('			</div>');
					productHtml.push('			<button type="button" class="btn_aplike"><i class="i-prod heart">좋아요</i></button>');
					productHtml.push('		</div>');
					productHtml.push('	</a>');
					productHtml.push('</div>');
					productHtml.push('</li>');
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".prod_list_box .list").html(productHtml.join(""));
				} else {
					$(productHtml.join("")).appendTo($(".prod_list_box .list"));
				}
				
			} else {
				productHtml.push('<div class="prod_list_empty">');
				productHtml.push('	<p class="txt">더 좋은 상품을 준비중입니다</p>');
				productHtml.push('</div>');
				$(".prod_list_box .list").html(productHtml.join(""));
			}
			
			//SmartOffer - 개인화 추천 태깅 (검색필터)
			try{
				paramList ="?prdBrandcd=" + $("input[name='i_sPrdBrandcd']").val();			// 브랜드
				paramList +="&selectService=" + $(".i_sSelectService").val();				// 서비스
				paramList +="&prdFeature=" + $("input[name='i_sPrdFeature']").val();		// 상품특징
				paramList +="&prdPrice=" + $("input[name='i_sPrdPrice']").val();			// 쇼핑찬스
				paramList +="&prdPopular=" + $("input[name='i_sPrdPopular']").val();		// 인기
				paramList +="&statuscd=" + $("input[name='i_sStatuscd']").val();			// 판매상태
				paramList +="&prdFunc=" + $("input[name='i_sPrdFunc']").val();				// 기능성
				paramList +="&optPa=" + $("input[name='i_sOptPA']").val();					// PA
				paramList +="&prdSkin=" + $("input[name='i_sPrdSkin']").val();				// 피부타입
				paramList +="&prdTruble=" + $("input[name='i_sPrdTrubleType']").val();		// 피부고민
				paramList +="&prdTexture=" + $("input[name='i_sPrdTexture']").val();		// 텍스쳐
				paramList +="&optMakeup=" + $("input[name='i_sOptMakeupeft']").val();		// 메이크업 효과
				paramList +="&saleSt=" + $("input[name='i_sSaleSt']").val();				// SALE S
				paramList +="&saleEn=" + $("input[name='i_sSaleEn']").val();				// SLAE E
				paramList +="&priceSt=" + $("input[name='i_sPriceSt']").val();				// 가격 S
				paramList +="&priceEn=" + $("input[name='i_sPriceEn']").val();		    	// 가격 E
				paramList +="&spfSt=" + $("input[name='i_sSpfSt']").val();					// SPF S
				paramList +="&spfEn=" + $("input[name='i_sSpfEn']").val();					// SPF E
				paramList +="&rgb=" + $("input[name='i_sRgb']").val();						// 색상
				paramList +="&flagBrand=" + $("input[name='i_sFlagBrand']").val();			// 브랜드 정렬여부		
				paramList +="&flagSort=" + $("input[name='i_sFlagSort']").val();			// 상품정렬					
				paramList +="&categorycd1=" + $("input[name='i_sCategorycd1']").val();		// 카테고리1
				paramList +="&categorycd2=" + $("input[name='i_sCategorycd2']").val();		// 카테고리2
				paramList +="&categorycd3=" + $("input[name='i_sCategorycd3']").val();		// 카테고리3
				searchFilterTagEvent(paramList,'MOBILE');
			}catch(e){}
				
			// 이미지 리로딩
			MobileShopCategoryProductList.fn.lazyLoading();
		}
	}
};
