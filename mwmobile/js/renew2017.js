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


/* 공통 : Lazy loading */
(function($){
	/* Lazyload */
	$("img.lazy").lazyload({
		event: "scrollstop",
		threshold : 600
	});

	// 페이지 Swipe 기능이 있을 경우 (메인만 해당) 높이 재설정
	//if(pageSwipe){
	//	$('img.lazy').on('load', function(){
	//		pageSwipe.slick('setPosition');
	//	});
	//}
}(jQuery));

/* 공통 레이아웃 */
var gnbNavScroll;
(function($){
	var GlobalUI = {
		init : function(){
			var me = this;
			me.winW = $(window).width();
			me.winScroll = $win.scrollTop();
			me.$body = $("html, body");
			me.$header = $('header'); // 헤더
			me.$gnbNav = $('#gnbNavScroll'); // 카테고리 스크롤
			me.$shopTab = $('#shopProdTabs'); // 상품상세 탭
			me.shopTabSpace = $(".shop_prod_details").space('margin', 'top');

			me._fixpos();
			me._header();
			me._mainGnb();
			me._floatBott();
			me._subCate();
			me._footer();

			$(window).load(function(){
				me._fixpos();
				me._trans_btn();
			});

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

				// 딤 처리시 body를 fixed 시킬경우 scrolltop 0일 경우에도 fixed 여야함
				if(me.winScroll >= 0){
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
				SHOP_TAB_T: (!me.$shopTab.exists()) ? 0 : me.$shopTab.offset().top
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

				//iscroll핸들러
				function scrollHandler() {
					if(this.x || this.x === 0) {
						offset = this.x
					}
				};

				/*//iscroll 가로값 체크
				$gnbNavItems.each(function(){
					var $eW = $(this).innerWidth();
					$aw = $aw + $eW;

					// 브랜드 선택된 곳의 스크롤 위치
					if($(this).attr("class") == "on"){
						offset = $aw - $eW;
					}
				});

				// 카테고리 최소 5개일 경우 너비 클래스로 너비 비율 지정하기 때문에 너비 지정 불필요
				if(!$gnbNav.hasClass('minimum')){
					$gnbNav.css('width', $aw + 1);
				}*/

				// 리사이즈 및 초기 값 설정 (위 내용 병합)
				$(window).resize(function(){
					me.winW = $(window).width();
					$aw = 0;

					//iscroll 가로값 체크
					$gnbNavItems.each(function(){
						var $eW = $(this).innerWidth();
						$aw = $aw + $eW;

						// 브랜드 선택된 곳의 스크롤 위치
						if($(this).attr("class") == "on"){
							offset = $aw - $eW;
						}
					});
					
					// 카테고리 최소 5개일 경우 너비 클래스로 너비 비율 지정하기 때문에 너비 지정 불필요
					if(!$gnbNav.hasClass('minimum')){
						$gnbNav.css('width', $aw + 1);
					}
				}).resize();

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

			if(!$('.quick').exists()){
				return false;
			}

			var $quick = $('.quick');

			$(window).on('scroll touchmove',function(){
				me.winScroll = $win.scrollTop();

				if( me.winScroll > 300 ){
					if($('.trans_btn').exists()){
						if($(".trans_box").hasClass('fix')){
							// 하단 플로팅 버튼이 fixed일 경우
							$quick.css("bottom","73px");
							$quick.stop(true,true).addClass("on");
						} else {
							// 단 플로팅 버튼이 버튼이 페이지 내 위치할 경우
							$quick.css("bottom","");
							$quick.stop(true,true).addClass("on");
						}
					} else {
						// 하단 플로팅 버튼이 없는 경우
						$quick.css("bottom","");
						$quick.stop(true,true).addClass("on");
					}
				}else{
					$quick.stop(true,true).removeClass("on");
				}
			});

			// 상단으로 가기
			$('.btn_top').on('click',function(){
				$win.scrollTop(0);
			});
		},

		_trans_btn : function(){
			var me = this;			
			me.winScroll = $win.scrollTop();
			me.winH = $(window).height();
			if($("div").hasClass("trans_btn")){
				$(window).on('scroll touchmove',function(){
					var $trans_fix = $(".trans_btn").offset().top;
					if($(".trans_btn").hasClass("only_bottom")){
						$("footer").addClass("trans_bottom");
						//return false;
					}else{
						if ( me.winScroll > $trans_fix - me.winH ) {
							$(".trans_box").removeClass("fix");
	
						} else{
							$(".trans_box").addClass("fix");
						}				
					}			
				});
			} else{
				return false;
			}
		},

		_footer : function(){
			var me = this;

			if(!$('footer').exists()){
				return false;
			}

			var $ft = $('footer');
			var $wrap = $ft.find('.info_wrap');
			var $view = $wrap.find('.view');
			var top = 0;

			// 사업자정보 상세보기 클릭시
			$ft.find('.btn_info').click(function(){
				if($view.is(':hidden')){
					$wrap.addClass('on');
					top = $ft.offset().top;

					// 포커스 이동
					me.$body.stop().animate({scrollTop:top}, 300);
				} else {
					$wrap.removeClass('on');
				}
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
	
	// 브랜드관 상단 배너 있을 경우 - 애니메이션 실행
	if($('.sec_spotbnnr').length > 0){
		$('.sec_spotbnnr').addClass('loaded');
	}

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
		var $board = $(this).parents('.sec_filter').next('.prod_list_box'); // 해당 게시판
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
	// 퍼블리싱 테스트 예시 페이지 때문에 삭제
	//if(!$('.shop_prod_item').exists()){
	//	return false;
	//}

	/* 상단 제품 슬라이드 */
	var $slickElement = $('#spThumb .single-item');
	var $shopTabs = $("#shopProdTabs");

	if($shopTabs.exists()){
		$('header').addClass('unfixed');
	}

	// 상품상세 - 썸네일 (스크립트 보완 - 해당 option이 있어 교체 및 포커스 문제 해결결)
	$slickElement.slick({
		arrows : false,
		dots: true,
		dotsClass: 'pager',
		accessibility: false,
		customPaging : function(slider, i) {
			return  (i + 1) + '/' + slider.slideCount;
		}
	});

	// 상품상세 - 상세 내 영상 (스크립트 보완 - 해당 option이 있어 교체 및 포커스 문제 해결결)
	var $slickMovie = $('#spMoive .single-item');

	$slickMovie.slick({
		arrows : true,
		dots: false,
		accessibility: false,
		customPaging : function(slider, i) {
			return  (i + 1) + '/' + slider.slideCount;
		}
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

	// 추천 활성화 클래스 추가
	$('.btn_recomm').click(function(){
		var $target = $(this);
		var $icon = $(this).find('.i-shop');

		// 애니메이션 효과 클래스 부여
		$icon.addClass("rotate");

		// 활성화 표시
		if($target.hasClass('on')){
			$target.removeClass('on').addClass('off');
		} else {
			$target.removeClass('off').addClass('on');
		}
	});

	// 아코디언 형식 리스트 - 접기&펼치기
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

	// 상품상세 옵션이 있을 경우에만 - 퍼블 error 생겨서 추가 (개발에서 사용여부 결정하셔서 쓰세요 !)
	if($('#listOptScroll').exists()){
		// 상품상세 옵션 - 스크롤
		var listOptScroll = new iScroll('listOptScroll', {
			mouseWheel: true,
			scrollbars: true,
			eventPassthrough: true
		});
	}
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

/* 장바구니, 카드 옵션선택 통합본 */
(function($){
	var ShopOptBox = {
		init : function(){
			var me = this;

			if($('.spopts_wrap').length < 1){
				return false;
			}

			me.$body = $('body');
			me.$allBox = $('.spopts_wrap');
			me.$baseBox = $('#spoptsWrap');
			me.$optBox = $('#spoptsOption');
			if($('.orderModi').length > 0 ){
				me.order = me.$baseBox.hasClass('orderModi');
			}

			me.evtBinder();
		},

		optBoxOpen : function(target) {
			var me = this;

			me.$target = $('#' + target);

			$('.spopts_wrap').removeClass('trans300ms');

			// SCROLL TOP의 값은 초기 오픈시에만 가져올 것
			me.optScrlTop = $(window).scrollTop();

			if(me.order === true){
				if($('.dimmed_cart').length < 1 ){
					var $dimmed = '<button type="button" class="dimmed_cart" />';
					me.$body.append($dimmed);
					me.$body.addClass('fixed').css('top', me.optScrlTop*-1);
				}
			}

			me.$target.addClass('trans300ms').addClass('open');
		},

		optBoxClose : function(target) {
			var me = this;

			me.$target = $('#' + target);

			me.$allBox.addClass('trans300ms').removeClass('open');

			if(me.$body.find('.dimmed_cart').is(':visible')){
				me.$body.find('.dimmed_cart').hide().remove();
				me.$body.removeClass('fixed').css('top', '');
				$(window).scrollTop(me.optScrlTop);
			}
		},

		evtBinder : function(){
			var me = this;

			// 장바구니
			$('#btnCart').click(function(){
				// 장바구니 버튼 기능이 달라 퍼블리싱 테스트시 작업용으로 쓰고 있습니다. (개발 작업시 제거하셔도 됩니다)
				if($(this).attr('id') === 'btnCart'){
					if(me.$baseBox.hasClass('open')){
						// 선택된 옵션이 없을 경우
						if(me.$baseBox.find('.slted_area .item').length < 1) {
							alert('옵션을 선택하세요');
						} else {
							// 장바구니 담기 옵션
							notiToastOpen();
						}
						return false;
					}
				}

				me.optBoxOpen('spoptsWrap');
			});

			// 구매하기
			$('#btnPurchase').click(function(){
				me.optBoxOpen('spoptsWrap');
			});

			// 옵션선택 : 기본 (선택창 클릭시)
			$('#btnOptOpen').click(function(){
				me.$baseBox.removeClass('open trans300ms');
				me.$optBox.addClass('open');
			});

			// 옵션선택 : 세부옵션 (선택창 클릭시)
			$('#btnOptClose').click(function(){
				me.$baseBox.addClass('open');
				me.$optBox.removeClass('open trans300ms');
			});

			// 옵션선택 : 세부옵션 (옵션 선택시)
			$('#spoptsOption .list_opt a').click(function(){
				me.$baseBox.addClass('open');
				me.$optBox.removeClass('open trans300ms');
			});

			// 옵션선택 : 닫기 클릭시 (딤드 닫힘)
			$('.spopts_wrap .btn_close').click(function(){
				me.optBoxClose();
			});

			/* 장바구니 */
			// 주문변경 클릭시
			$('.btn_ord_modi').click(function(){
				me.optBoxOpen('spoptsWrap');
			});

			// 취소, 주문하기 클릭시
			$('.btns_order_modi').click(function(){
				me.optBoxClose();
			});

			// 딤드 클릭시 (딤드 닫힘)
			$('body').on('click', '.dimmed_cart', function(){
				me.optBoxClose();
			});
		}
	}

	ShopOptBox.init();

	window.ShopOptBox = ShopOptBox;
}(jQuery));

/*// 옵션레이어 박스 열기
// target = 열 레이어 id명
// transition = transition 효과
var optScrlTop = $(window).scrollTop();
function detailOpen(target, transition){
	var $target = $('#' + target);
	optScrlTop = $(window).scrollTop();

	$('body').addClass('fixed').css('top', optScrlTop*-1);

	// 장바구니 딤드 추가
	if($target.hasClass('orderModi') && target === 'spoptsWrap'){
		var $dimmed = '<button type="button" class="dimmed_cart" />';
		$('body').append($dimmed);
	}

	if(transition === true){
		$target.addClass('trans300ms');
	} else {
		$target.removeClass('trans300ms');
	}

	$target.addClass('open');
	$('header').addClass('fixed');

}

// 옵션레이어 박스 닫기
// target = 닫을 레이어 id명
// transition = transition 효과
function detailClose(target, transition){
	var $target = $('#' + target);

	$target.removeClass('open');

	if(transition === true){
		$target.addClass('trans300ms');
	} else {
		$target.removeClass('trans300ms');
	}

	// 장바구니 딤드제거 (페이지)
	// body에 장바구니 딤드를, 보여지는 경우
	if($('body').find('.dimmed_cart').is(':visible')){
		if((!$('#spoptsOption').hasClass('open') && !$('#spoptsWrap').hasClass('open'))){
			$('body').find('.dimmed_cart').hide().remove();
		}
	}

	$('body').removeClass('fixed').css('top', '');
	$(window).scrollTop(optScrlTop);
}*/

// 장바구니 담기 완료
function notiToastOpen(){
	if($('.toast_noti').length === 0){
		$('body').append('<div class="toast_noti animated500ms"><i class="i-modal bag"></i><p class="msg">장바구니<br>담기완료</p></div>');
	} else {
		// 이미 실행되고 있는 경우 return
		return false;
	}

	$('.toast_noti').addClass('zoomIn');

	var intervalListener = setInterval( function(){
		$('.toast_noti').removeClass('zoomIn').addClass('zoomOut');
	}, 1000);

	// 장바구니 애니메이션이 끝나면
	$('.toast_noti').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
		// zoomOut 될 경우
		if($(this).hasClass('zoomOut')){
			// setInterval 초기화
			clearInterval(intervalListener); 
			// 태그 삭제
			$(this).remove();
		}
	});

	return false;
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

function cp_select(){
	$('.ul_selecs li a').bind('click',function ()  {
		if ($(this).parent('li').hasClass('dis')) {
			return false;
		}else{
			if ($(this).parent('li').hasClass('act')) {
				$(this).parent('li').removeClass('act');
			} else{
				$(this).parents('.ul_selecs').find('li').removeClass('act');
				$(this).parent('li').addClass('act');
			}
		};
  });
}cp_select();

