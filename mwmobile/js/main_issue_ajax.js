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
		var $board = $('#sortContainer'); // 해당 게시판
		var $icon = $(this).find('>i'); // 아이콘

		if($board.hasClass('album')){
			$board.removeClass('album');
			$icon.removeClass('album').addClass('list');
		} else {
			$board.addClass('album');
			$icon.removeClass('list').addClass('album');
		}
	});

	// 모달팝업 - 필터
	$('.sec_filtbox .tit a').on('click', function(){
		var $arr = $(this).parents('.tit');
		var $target = $($(this).attr('href'));

		if($target.is(':visible')){
			$arr.addClass('off');
			$target.hide();
		} else{
			$arr.removeClass('off');
			$target.show();
		}

		return false;
	});

	$('.chkbox').click(function(){
		// 애니메이션 효과 클래스 부여
		$(this).children().addClass("push");

		// 체크 표시
		if($(this).hasClass('chked')){
			$(this).removeClass('chked').addClass('unchked');
		} else {
			$(this).removeClass('unchked').addClass('chked');
		}
	});
});

/* mobile_shop_product_detail.html */
(function($){
	if(!$('.shop_prod_item').exists()){
		return false;
	}

	/* 상단 제품 슬라이드 */
	var $slickElement = $('#spThumb .single-item');
	//var header_h = $('header').height();
	var $shopTabs = $("#shopProdTabs");

	if($shopTabs.exists()){
		$('header').addClass('unfixed');
	}

	// 상품상세 - 메인 썸네일
	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var $pager = $(this).siblings('.pager');
		var i = (currentSlide ? currentSlide : 0) + 1;
		$pager.text(i + '/' + slick.slideCount);
		
		// 렌더링 전 해당 슬라이드 높이가 움직이기 때문에 top 위치를 재설정
		setTimeout(function () {
			window.GlobalUI._fixpos();
		}, 200);
	});

	$slickElement.slick({
		arrows : false,
		dots: false
	});

	// 상품상세 - 영상
	var $slickMovie = $('#spMoive .single-item');

	// 상품상세 - 메인 썸네일
	$slickMovie.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var $pager = $(this).siblings('.pager');
		var i = (currentSlide ? currentSlide : 0) + 1;
		$pager.text(i + '/' + slick.slideCount);
		
		// 렌더링 전 해당 슬라이드 높이가 움직이기 때문에 top 위치를 재설정
		setTimeout(function () {
			window.GlobalUI._fixpos();
		}, 200);
	});

	$slickMovie.slick({
		arrows : true,
		dots: false
	});

	// 리뷰 버튼 클릭시 
	$('#btnReview').click(function(e){
		// 초기화
		$('#shopProdTabs li').removeClass('on');
		$("#shopDetails, #shopReview, #shopShipping").hide();

		// 리뷰 탭 컨텐츠만 보여줌
		$('#shopReview').show();

		// 리뷰 탭 활성화
		$('#shopProdTabs li:eq(1)').addClass('on');
		$(window).scrollTop(window.fixeditem.SHOP_TAB_T);
	});

	// 옵션 컬러,텍스트 선택 시 활성화
	$('.list_opts').find('a').click(function(){
		$('.list_opts li').removeClass('on');
		$(this).parents('li').addClass('on');
	});

	$('.sec_accd li .tit a').click(function(){
		var $li = $(this).parents('li');
		var $panel = $li.find('.panel');

		if($panel.is(':hidden')){
			$panel.stop().slideDown(300);
			$li.addClass('on');
		} else {
			$panel.stop().slideUp(300);
			$li.removeClass('on');
		}

		return false;
	});

	// 상세정보, 상품리뷰, 배송정보 탭 선택 시
	$('#shopProdTabs a').click(function(e){
		// 초기화
		$('#shopProdTabs li').removeClass('on');
		$("#shopDetails, #shopReview, #shopShipping").hide();

		// 해당 아이템만 선택 보여줌
		var id = $(this).attr('href').replace('#','');
		$('#' + id).show();

		// 해당 아이템 탭에 활성화 클래스 추가
		$(this).parents('li').addClass('on');
		$(window).scrollTop(window.fixeditem.SHOP_TAB_T);

		return false;
	});

	// 구매후기, 포토리뷰 탭 선택 시
	$('#tabReview a').click(function(e){
		// 초기화
		$('#tabReview li').removeClass('on');
		$("#reviewWrap, #photoWrap").hide();

		// 해당 아이템만 선택 보여줌
		var id = $(this).attr('href').replace('#','');
		$('#' + id).show();

		// 해당 아이템 탭에 활성화 클래스 추가
		$(this).parents('li').addClass('on');

		return false;
	});
	
	// 하단 슬라이드
	$('.bnnr_shopbot').slick({
		arrows : true,
		dots : false,
		infinite : false
	});

	// 상품상세 옵션 - 스크롤
	var listOptScroll = new iScroll('listOptScroll', {
		mouseWheel: true,
	    scrollbars: true,
	    eventPassthrough: true
	});
}(jQuery));


// '좋아요' 클릭시  on-off처리
function fnToggleLike(target){
	var $target = $(target);

	// 애니메이션 효과 클래스 부여
	$target.children().addClass("push");
	
	// 활성화 표시
	if($target.hasClass('on')){
		$target.removeClass('on').addClass('off');
	} else {
		$target.removeClass('off').addClass('on');
	}
	
	return false; // A 링크 이벤트 중복 제거
}

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

//배송지 목록&새로입력 텝
function rNtab_area() {
	$('.rNew_tab > li a').bind('click focusin',function ()  {
      });
	      $('.rNew_tab > li').each(function(i){this.i=i}).click(function(){
	      var idx = $(this).index();
	      $(".rNtab_area").hide();
	      $(".rNtab_area:eq("+idx+")").show();
	      $('.rNew_tab > li').removeClass('act');
	      $(this).addClass('act');
	});
}rNtab_area();

///////////////////renew2017.js////////////////////////////