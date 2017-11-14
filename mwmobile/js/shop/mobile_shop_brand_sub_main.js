/**
 * Coding script
 */

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
	i_sOptSapstcd	: "",
	//리뉴얼 추가
	i_sFlagPageType	: "init",
	i_sFlagScrollType	: "N",
};

var MobileShopBrandList = {
	name : "MobileShopBrandList",
	
	init : function() {
		
		// 브랜드
		$('.gnb_nav .nav li').unbind("click").click(function(event){
			event.preventDefault();
			parameter.i_sFlagPageType = "init";
			MobileShopBrandList.fn.getBrandSubMain($(this).attr("id"));
			$win.scrollTop(0);
		});
		
		MobileShopBrandList.fn.getPageInit();
	},
	fn : {
		/**
		 * 버튼 제어를 위한 function
		 */
		addBtnEvent : function() {
			$(".prod_item a").unbind("click").click(function(event) {
				event.preventDefault();
				MobileBodyStart.goProductDetail($(this).attr("id"));
			});
			
			$('.sec_filter .sortA button').unbind("click").click(function(event) {
				event.preventDefault();
				$('.prod_list_box').toggleClass('album');//.attr('data-album', 'false');
			});
			
			$('.btn_aplike').unbind("click").click(function(event) {
				event.stopPropagation();
				alert("좋아요~!");
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
		 * 카테고리 슬라이드
		 */
		addCategorySlider : function() {
			var offset = 0;
			var $aw = 0;
			
			var $mCategoryItems = $('.nav_catescrl .scrlable_x').find('li');
			
			$mCategoryItems.each(function(){
				var $eW = $(this).innerWidth();
				$aw = $aw + $eW;
				
				// 카테고리 선택된 곳의 스크롤 위치
				if($(this).attr("class") == "on"){
					offset = $aw - $eW;
					$(".scrlable_x").scrollLeft(offset);
				}
			});
			
			
			$mCategoryItems.find('a').click(function(e){
				e.preventDefault();
				var idx = $(this).parents('.nav_catescrl .scrlable_x li').index();
				$.clickCategorySlider(idx);
				
				$win.scrollTop(0);
				$('#i_iNowPageNo').val(1);
				if(parameter.i_sFlagPageType != "init"){
					$('#i_sCategorycd2').val("ALL");
					parameter.i_sFlagPageType = "2depth";
				}
				MobileShopBrandList.fn.getBrandItemList($(this).parent().attr("id"));
			});
			
			$.clickCategorySlider = function(id){ 
				$mCategoryItems.removeClass('on'); 
				$mCategoryItems.eq(id).addClass('on');
			}
		},
		/**
		 * 2depth 카테고리 선택 이벤트
		 */
		add2depthSlider : function() {
			var $mDepthItems = $('.nav_scate').find('li');
			
			$mDepthItems.find('a').click(function(e){
				e.preventDefault();
				var idx = $(this).parents('.nav_scate li').index();
				$.clickDepthSlider(idx);
				
				$('#i_iNowPageNo').val(1);
				parameter.i_sFlagPageType = "3depth";
				MobileShopBrandList.fn.getBrandItemList(parameter.i_sCategorycd1, $(this).parent().attr("id"));
			});
			
			$.clickDepthSlider = function(id){ 
				$mDepthItems.removeClass('on'); 
				$mDepthItems.eq(id).addClass('on');
			}
		},
		/**
		 * 브랜드 서브메인
		 */
		getBrandSubMain : function(brandId) {
			if(brandId != null){
				$("#i_sBrandcd").val(brandId);
			}
			MobileShopBrandList.fn.setParameter();
			
			cmAjax({
				url		: GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_brand_sub_main_ajax.do"
				, data  : parameter
				, dataType : "html"
				, type : "post"
				, async : false
				, animation : false
				, success : function(html){
					$("#content").html(html);
					MobileShopBrandList.fn.addBtnEvent();
					MobileShopBrandList.fn.addCategorySlider();
					MobileShopBrandList.fn.lazyLoading();
				}
			});
		},
		/**
		 * 브랜드 상품 리스트
		 */
		getBrandItemList : function(categoryId, depthId) {
			if(categoryId != null){
				$("#i_sCategorycd1").val(categoryId);
			}
			
			if(depthId != null){
				$("#i_sCategorycd2").val(depthId);
			}
			
			MobileShopBrandList.fn.setParameter();
			
			cmAjax({
				url		: GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_brand_product_list_ajax.do"
				, data  : parameter
				, dataType : "html"
				, type : "post"
				, async : false
				, animation : false
				, success : function(html){
					
					if(parameter.i_sFlagScrollType == "Y"){
						$(".prod_list_box .list").append(html);
						parameter.i_sFlagScrollType = "N";
					} else{
						if(parameter.i_sFlagPageType == "2depth"){
							$(".2depth_box").html(html);
							MobileShopBrandList.fn.add2depthSlider();
						} else if(parameter.i_sFlagPageType == "3depth"){
							$(".item_list_box").html(html);
						} else{
							$("#content").html(html);
							parameter.i_sFlagPageType = "2depth";
							MobileShopBrandList.fn.addCategorySlider();
							MobileShopBrandList.fn.add2depthSlider();
						}
					}
					MobileShopBrandList.fn.addScrollEvent();
					MobileShopBrandList.fn.addBtnEvent();
					MobileShopBrandList.fn.lazyLoading();
					MobileShopBrandList.fn.setParameter();
					hideScrollLoadingBox();
					MobileShopBrandList.isLoadingPrdList = false;
					MobileShopBrandList.fn.filterBox();
				}
			});
		},
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {

			$(window).bind("scroll", function(event) {
				
				if(!MobileShopBrandList.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 600) )&& 
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".prod_item").size() &&
						$(".prod_item").size() > 0) {
					
					if(MobileShopBrandList.isLoadingPrdList) {
						return;
					}
					
					MobileShopBrandList.isLoadingPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea"));
					
					parameter.i_iNowPageNo = parameter.i_iNowPageNo + 1;
					
					$('#i_iNowPageNo').val(parameter.i_iNowPageNo);
					
					parameter.i_sFlagScrollType = "Y";
					setTimeout(function() {
						MobileShopBrandList.fn.getBrandItemList();
					}, 1000);
				} else {
					
				}
			});
		},
		setParameter : function() {
			
			parameter.i_iNowPageNo = parseInt($('#i_iNowPageNo').val() || "1", 10),
			parameter.i_iPageSize = parseInt($('#i_iPageSize').val() || "30", 10),
			parameter.i_iTotalPageCnt = parseInt($('#i_iTotalPageCnt').val() || "1", 10),
			parameter.i_iRecordCnt = parseInt($('#i_iRecordCnt').val() || "1", 10),
			
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
			MobileShopBrandList.fn.getBrandSubMain();
		},
		/**
		 * 필터박스 js
		 */
		filterBox : function() {
			$fBox = $("#filterBox"); // 필터박스
			$header = $('header'); // 헤더
			
			// 각 위치 값
			window.fixeditem = {
				HEADER_H: (!$header.exists()) ? 0 : $header.outerHeight(), // height
				FILTER_T: (!$fBox.exists()) ? 0 : $fBox.offset().top
			};
			
			$(window).on('scroll touchmove',function(){
				winScroll = $win.scrollTop();

				// 필터 박스 고정
				if($fBox.exists()){
					if(winScroll >= (window.fixeditem.FILTER_T - window.fixeditem.HEADER_H)){
						if(!$fBox.hasClass('fixed')){
							$fBox.addClass('fixed');
						}
					} else {
						$fBox.removeClass('fixed');
					}
				}
			});
		}
	}
};
