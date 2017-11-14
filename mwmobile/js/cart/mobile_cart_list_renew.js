var MobileCartDelivery = {
	  name : "MobileOrderDelivery"
	, cash_buy 			: 0
	, cash_buy_limit 	: 0
	, point_buy 		: 0
	, point_buy_limit 	: 0
	, cash_today 		: 0
	, cash_today_limit 	: 0
	, point_today 		: 0
	, point_today_limit : 0
	, gift_box 			: 0
	, gift_box_limit 	: 0
	, naming			: 0
	, naming_limit		: 0
	, init : function(){

		MobileCartDelivery.cash_buy 			= fnOnlyNumber($("input[name='i_iCashBuy']").val()).number;
		MobileCartDelivery.cash_buy_limit 		= fnOnlyNumber($("input[name='i_iCashBuyLimit']").val()).number;
		MobileCartDelivery.point_buy 			= fnOnlyNumber($("input[name='i_iPointBuy']").val()).number;
		MobileCartDelivery.point_buy_limit 		= fnOnlyNumber($("input[name='i_iPointBuyLimit']").val()).number;
		MobileCartDelivery.cash_today 			= fnOnlyNumber($("input[name='i_iCashToday']").val()).number;
		MobileCartDelivery.cash_today_limit 	= fnOnlyNumber($("input[name='i_iCashBuyLimit']").val()).number;
		MobileCartDelivery.point_today 			= fnOnlyNumber($("input[name='i_iPointToday']").val()).number;
		MobileCartDelivery.point_today_limit 	= fnOnlyNumber($("input[name='i_iPointTodayLimit']").val()).number;
		MobileCartDelivery.gift_box 			= fnOnlyNumber($("input[name='i_iGiftBox']").val()).number;
		MobileCartDelivery.gift_box_limit 		= fnOnlyNumber($("input[name='i_iGiftBoxLimit']").val()).number;
		MobileCartDelivery.naming 				= fnOnlyNumber($("input[name='i_iNaming']").val()).number;
		MobileCartDelivery.naming_limit 		= fnOnlyNumber($("input[name='i_iNamingLimit']").val()).number;

	}
};

var MobileCartUserInfo = {
		  name   : "MobileCartUserInfo"
		, mpoint : 0
		, bpoint : 0
		, vipgift_freeCnt : 0
		, levelcd : ""
		, fstOrder: ""
		, isLogin : false
		, isSnsLogin : false
		, init : function(){

			MobileCartUserInfo.mpoint = fnOnlyNumber($("input[name='i_iUserMpoint']").val()).number;
			MobileCartUserInfo.bpoint = fnOnlyNumber($("input[name='i_iUserBpoint']").val()).number;
			MobileCartUserInfo.vipgift_freeCnt = fnOnlyNumber($("input[name='i_sVipFreeCnt']").val()).number;
			MobileCartUserInfo.levelcd = $("input[name='i_sUserLevelcd']").val();
			MobileCartUserInfo.fstOrder = $("input[name='i_iUserFstOrder']").val() == "" ? 'Y' : 'N';
			MobileCartUserInfo.isLogin = $("input[name='i_sLoginFlag']").val() == "" ? false : true;
			MobileCartUserInfo.isSnsLogin = $("input[name='i_sSnsLoginFlag']").val() == "" ? false : true;

		},nonmemberSetting : function(){

			if(!MobileCartUserInfo.isLogin){

				$(".rebon_point_area").hide();

				MobileCartHtml.MobileCartVipHtml();
				$(".contView").eq(1).show();
			}
		}

};

var MobileCartList = {
	name : "MobileCartList"
   ,rebon_point_list : undefined
   ,init: function(){
			$('.btn_back').show();
			$(".btn_recent").css('display', 'none');
			MobileCartDelivery.init();
			MobileCartUserInfo.init();

			MobileCartList.cartList("");
			MobileCartList.addEventBtn();
			MobileCartList.addProductCntEvent();
			MobileCartUserInfo.nonmemberSetting();

			MobileCartHtml.MobileCartPointHtml();
			$(".contView").eq(0).show();

    }
   ,addEventBtn : function(){

		$(".btn_more_pointmall").click(function(event) {
			event.preventDefault();

			var lastpage = Math.ceil(MobileCartHtml.i_iRecordCnt/ 9);

			MobileCartHtml.i_iNowPageNo++;

			MobileCartHtml.MobileCartPointHtml();

			if(lastpage == MobileCartHtml.i_iNowPageNo) {

				$(".div_more_pointmall").hide();
			}

		});

	   //말풍선 애니메이션
	   $("#div_basket_list").on("click",".btn_add_wish",function(event){

		    var target = $(this).attr("href");

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

		    if (!$(this).hasClass("active")){

		    	MobileCartList.addWish($(this),target);

		    }else{

		    	$(target).hide();
		    	setTimeout(function(){$(target).removeClass('active').hide();},1200);

			    $(this).removeClass("active");

		    }

		    MobileCartList.init();
	   });

	   $("#div_basket_list").on("click",".btn_delete_wish",function(event){

		  	var seqno = $(this).attr("id");
		  	var tr = $(this).parents(".tr_cart_list").eq(0);
		  	var productnm = $("*[name='i_arrProductnm']", tr).val();
			var brandnm = $("*[name='i_arrBrandnm']", tr).val();
			var productcd = $("*[name='i_arrProductcd']", tr).val();

			showConfirmBox({
				message : "해당 상품을 위시리스트에서 삭제하시겠어요?"
				, ok_func : function() {

					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/wish/mobile_wish_remove_wishlist_ajax.do"
						, type : "post"
						, dataType : "json"
						, data : {i_arrSeqno : seqno}
						, isModal : true
						, isModalEnd : true
						, success : function(data, textStatus, jqXHR) {
							if(data.status == "succ") {
								//gypark : 옴니추어 태깅
								var str = brandnm+";"+productnm +";;;;eVar31="+productcd + ",";
								str = str.replace(/&/gi,"_");
								try {trackPurchaseClick(str, productcd ,'event12'); }catch(e){}
								MobileCartList.init();

							} else {

								showMessageBox({message : data.message
									, close : function() {
										MobileCartList.init();
									}
								});
							}
						}
						, error : function(e) {
							MobileWishList.isRunningDelWish = false;
							showMessageBox({message : e.message
								, close : function() {
									MobileCartList.init();
								}
							});
						}
					});

				}
				, cancel_func : function() {

					return ;

				}
			});
	   });

	   $("#div_basket_list").on("mousedown",".btn_cartBox_delete",function(){
		   try{
			   var tr = $(this).parents(".cartBox").eq(0);
			   var productcd  = $("input[name='i_arrProductcd']",tr).val();
			   var productCnt = $("input[name='i_arrProductCnt']",tr).val();

//			   AEC_F_D(productcd,'o',productCnt);
			   AEC_F_D1(productcd,'o', productCnt);
		   }catch(e) {}
	   });

	   //장바구니 삭제
	   $("#div_basket_list").on("click",".btn_cartBox_delete",function(event){
		   event.preventDefault();

		   var tr = $(this).parents(".cartBox").eq(0);

		   var list = [];

		   var cartcd 	  = $(".span_cartcd",tr).text();
		   var cart_seqno = $(".span_cart_seqno",tr).text();
		   var key		  = $(".span_key",tr).text();
		   var price	  = $(".span_price",tr).text();

		   var productcd  = $("input[name='i_arrProductcd']",tr).val();
		   var productCnt = $("input[name='i_arrProductCnt']",tr).val();
		   var productnm = $("input[name='i_arrProductnm']",tr).val();
		   var brandnm = $("input[name='i_arrBrandnm']",tr).val();

			showConfirmBox({
				message : "해당 상품을 장바구니에서 삭제하시겠어요?"
				, ok_func : function() {

					   list.push({cartcd : cartcd, seqno : cart_seqno});

					   MobileBodyStart.removeUserCart({list : list,
							callback : function() {

								$("tr_"+key).remove();
								tr.remove();

								MobileCartList.sum();

								if($(".cartBox").size() == 0){
									$(".totalPrice").hide();
									$(".predictList").hide();
									$(".nodata_cart").show();
								}
							}
						});
					    var str = brandnm+";"+productnm+";;;;eVar31="+productcd;
						str = str.replace(/&/gi,"_");
					    try {trackPurchaseClick(str, 'scRemove');}catch (e) {}
				}
				, cancel_func : function() {

					return ;

				}
			});
	   });

	   $("#div_basket_list").on("click","input[name='i_arrChkProd001']",function(event){

			if ($(this).hasClass("chk_diy")) {
				var val = $(this).val();

				if ($(this).prop("checked")) {
					$(".chk_" + val).prop("checked", true);
				}
				else {
					$(".chk_" + val).prop("checked", false);
				}
			}

			MobileCartList.sum();
			MobileCartList.setCheckCountLabel();

	   });

	   $(".vipChancetit").click(function(event){
		   event.preventDefault();

		   MobileCartHtml.MobileCartVipHtml();

	   });

	   $(".blueRebonPoint").click(function(event){
		   event.preventDefault();
		   MobileCartHtml.MobileCartPointHtml();
//		   if($(this).hasClass("active")){
//
//				var lastpage = Math.ceil(MobileCartHtml.i_iRecordCnt/ 9);
//
//				if(lastpage == MobileCartHtml.i_iNowPageNo) {
//					$(".div_more_pointmall").hide();
//				}
//
//		   }else{
//			   $(".div_more_pointmall").hide();
//		   }

	   });

	   $(".btn_wish_list").click(function(event){
		  event.preventDefault();

		   if(!MobileCartUserInfo.isLogin && !MobileCartUserInfo.isSnsLogin){

				showConfirmBox({
					message : "위시리스트 서비스를 이용하시려면 로그인 하셔야 합니다.<br /> 로그인 하시겠습니까?"
					, ok_str : "로그인 하기"
					, ok_func : function() {
						var returnurl = GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
						MobileBodyStart.goLogin(returnurl);
					}
				});

			   return;
		   }

		  document.location.href= GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";

	   });

	   $(".btn_alram_reservation_close").click(function(event){
			event.preventDefault();
			$(".div_alarm_reservation").remove();
	   });

	   $(".btn_alram_beautyprd_close").click(function(event){
			event.preventDefault();
			$(".div_alarm_beautyprd").remove();
	   });

	   $("#accoTab").on("click","input[name='i_arrVipProductChk_temp']",function(event){

		   var target   = $("#em_vip_select_list");
		   var limitCnt = 0;

		   if(!MobileCartUserInfo.isLogin){
			   showMessageBox({message : "해당 게시판은 아모레퍼시픽 회원이면서<br/>쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."});
			   $(this).prop("checked",false);
			   return;
		   }

		   if((MobileCartUserInfo.levelcd != "LV12" && MobileCartUserInfo.levelcd != "LV13" && MobileCartUserInfo.levelcd != "LV16"
			   && MobileCartUserInfo.levelcd != "LV17" && MobileCartUserInfo.levelcd != "LV19"
			   && MobileCartUserInfo.levelcd != "LV20" && MobileCartUserInfo.fstOrder != "Y")
			   || (MobileCartUserInfo.levelcd == "LV11" && MobileCartUserInfo.fstOrder != "Y")){

			   showMessageBox({message : "해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."});
			   $(this).prop("checked",false);
			   return;

		   }else{

			   limitCnt = MobileCartUserInfo.levelcd == 'LV13'|| MobileCartUserInfo.levelcd == 'LV17' || MobileCartUserInfo.levelcd == 'LV20' ? 2 : MobileCartUserInfo.levelcd == 'LV12' || MobileCartUserInfo.levelcd == 'LV16' || MobileCartUserInfo.levelcd == 'LV19' ? 1 : MobileCartUserInfo.fstOrder == "Y" ? 1 : 0;

		   }

		    var index = $("input[name='i_arrVipProductChk_temp']").index($(this));
		    var productNm = $($(".contView").eq(1),"#accoTab").find(".prodNm").eq(index).text();
		    var capacity = $($(".contView").eq(1),"#accoTab").find(".ml").eq(index).text();
		    var data = $(this).val().split(";");

		    if($(this).prop("checked")){
			    if(target.find("em").size() >= limitCnt){
			    	if(MobileCartUserInfo.levelcd == 'LV13'|| MobileCartUserInfo.levelcd == 'LV17' || MobileCartUserInfo.levelcd == 'LV20'){
			    		showMessageBox({message : "CLUB AP 사은품은 최대 2개까지 선택 가능하세요."});
			    	}else if(MobileCartUserInfo.levelcd == 'LV12'|| MobileCartUserInfo.levelcd == 'LV16' || MobileCartUserInfo.levelcd == 'LV19'){
			    		showMessageBox({message : "CLUB AP 사은품은 최대 1개까지 선택 가능하세요."});
			    	}
			    	$(this).prop("checked",false);
			    	return;

			    }

			    var li = $(".li_vipchance_list").eq(index);
			    var pstatus = $(".span_status", li).text();
			    var stockqty = $(".span_stockqty", li).text();
			    if(pstatus == "0002" || (pstatus == "0001" && stockqty <= 0)){
				   showMessageBox({
					   message : "선택하신 상품은 일시품절이에요."
				   });
				   $("#blus" + (index)).prop("checked", false);
				   return ;
			    }

		    	var arrHtml = new Array();

			    arrHtml.push("<em class='em_"+data[0]+" style='display:block;'>");
			    arrHtml.push("<input type='hidden' name='i_arrVipGiftProductcd' value='"+data[0]+"'>");
			    arrHtml.push("<input type='hidden' name='i_arrVipGiftOptioncd'  value='"+data[1]+"'>");

			    if(capacity !=""){
			    	arrHtml.push("	*"+productNm+""+capacity+"을 선택하였습니다.");
			    }else{
			    	arrHtml.push("	*"+productNm+"을 선택하였습니다.");
			    }
			    arrHtml.push("<br/>");
			    arrHtml.push("</em>");

			   	target.html(target.html()+arrHtml.join(""));
			   	target.show();
		    }else{

			   	$(".em_"+data[0]+"").remove();
			   	if(target.find("em").length == 0){
				   target.hide();
			   }
		    }

	   });


	   $("#accoTab").on("click","input[name='i_arrChkProd002']",function(event){

		   if(!MobileCartUserInfo.isLogin){
			   showMessageBox({message : "해당 서비스는 아모레퍼시픽 통합회원으로 로그인하시면 사용이 가능하세요.<br/>양해 부탁드릴게요."});
			   $(this).prop("checked",false);
			   return;
		   }

		   var sumPayMpoint = 0;

		   $("input[name='i_arrChkProd002']").each(function(i){

			      if($("input[name='i_arrChkProd002']").eq(i).prop("checked")){

			    	 var mcnt   =  fnOnlyNumber($("input[name='i_arrProductCnt']").eq(i).val()).number;
			    	 var mpoint =  fnOnlyNumber($(".span_rebon_point").eq(i).text()).number;

			    	 sumPayMpoint = sumPayMpoint + (mpoint * mcnt);
			      }

		   });

		   if($(this).prop("checked")){
			   if(MobileCartUserInfo.mpoint < sumPayMpoint){
				   showMessageBox({message : "사용가능하신 블루리본 포인트가 부족해요.<br/> 블루리본 포인트 상품을 다시 확인해주세요."});
				   $(this).prop("checked",false);
				   return;

			   }

			   var index = $("input[name='i_arrChkProd002']").index($(this));
			   var li = $(".li_pointmall_list").eq(index);
			   var pstatus = $(".span_status", li).text();
			   var stockqty = $(".span_stockqty", li).text();
			   if(pstatus == "0002" || (pstatus == "0001" && stockqty <= 0)){
				   showMessageBox({
					   message : "선택하신 상품은 일시품절이에요."
				   });
				   $("#blu" + (index+1)).prop("checked", false);
				   return ;
			   }
		   }

		    var val = $(this).val();

			if ($(this).hasClass("chk_diy")) {

				if ($(this).prop("checked")) {
					$(".chk_" + val).prop("checked", true);
				}
				else {
					$(".chk_" + val).prop("checked", false);
				}

			}else{

				 var parentObj = $(this).parents("li");

				if ($(this).prop("checked")) {

					MobileCartList.blueRebonSetPayment(parentObj, $(this).prop("checked"),val);

				}else{

					if(val == "BASKET"){

					   var tr = $(this).parents(".tr_cart_list").eq(0);

					   var list = [];

					   var cartcd 	  = $(".span_rebon_cartcd",tr).text();
					   var cart_seqno = $(".span_rebon_seqno",tr).text();
					   var key		  = $(".span_rebon_key",tr).text();

					   list.push({cartcd : cartcd, seqno : cart_seqno});

					   MobileBodyStart.removeUserCart({list : list,
							callback : function() {

								$("li_"+key).remove();
//								tr.remove();
								MobileCartList.blueRebonSetPayment(parentObj, $(this).prop("checked"),val);

							}
						});
					}else{

						MobileCartList.blueRebonSetPayment(parentObj, $(this).prop("checked"),val);

					}
				}
			}

			   MobileCartList.sum();
	   });

//	    $("#accoTab").on("change","select[name='i_arrProductCnt']",function(event){
//	    	var parentObj = $(this).parents("li");
//	    	MobileCartList.blueRebonSetPayment(parentObj, true, "");
//	    	MobileCartList.sum();
//
//	    });

		$(".btn_order_all").click(function(event) {
			event.preventDefault();
			var arrChk = $("input[name='i_arrChkProd001'], input[name='i_arrChkProd002']:checked");
			if(IS_LOGIN || IS_LOGIN_SNS){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
					, type : "POST"
					, dataType : "json"
					, animation	: false
					, success : function ( data, textStatus, jqXHR) {

						if(data.status == "succ"){

							if(data.object >= 3){
								showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
								return;
							}else{
								var nowDate  = new Date();
							    var nowYear  = nowDate.getFullYear();
							    var nowMonth = nowDate.getMonth() + 1;
							    var nowDay  = nowDate.getDate();

							    if(nowMonth < 10 ) {
							    	nowMonth = "0" + nowMonth;
							    }

							    if(nowDay < 10) {
							    	nowDay = "0" + nowDay;
							    }

							    var today = nowYear + nowMonth + nowDay;

							    if(parseInt(today) >= 20160201){
							    	var cookieMo = $.cookie('cmc_cart_membership_mobile_popup');
							    	if(cookieMo != "N" || cookieMo == undefined || cookieMo == ''){
							    		//gypark : 장바구니 팝업
							    		if(GLOBAL_LEVELCD == "LV11" || GLOBAL_LEVELCD == "LV12" || GLOBAL_LEVELCD == "LV13"){
							    			var sum_price = 0;
											var productTr = $(".tr_product_list");
											for(var i = 0; i < productTr.size(); i++){
												var beautyFlag    = $("input[name='i_arrFlagBeauty']",productTr.eq(i)).val();
												if(beautyFlag != "Y"){
													sum_price += fnOnlyNumber($(".row_sale_price", productTr.eq(i)).text()).number;
												}
											}

							    			if(parseInt(sum_price) >= 50000){
							    				modalPopup('#pop_cart');
							    				$("#chk_one").unbind("click").click(function(){
							    					$.cookie('cmc_cart_membership_mobile_popup', 'N', {expires:1, path: '/'});
							    				});
							    				$(".btn_pass").unbind("click").click(function(){
							    					modalPopupClose('#pop_cart');
							    					try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							    					MobileCartList.setCartPayment(arrChk, "all");
							    				});
							    			}else{
							    				try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							    				MobileCartList.setCartPayment(arrChk, "all");
							    			}
							    		}else{
							    			try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							    			MobileCartList.setCartPayment(arrChk, "all");
							    		}
							    	}else{
							    		try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							    		MobileCartList.setCartPayment(arrChk, "all");
							    	}

							    }else{	//2월1일 전
							    	try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							    	MobileCartList.setCartPayment(arrChk, "all");
							    }

							}
						}
					}
				});
			}else{
				if (SNS_LOGIN_SCREEN_YN) {
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
						,ok_str  : "로그인 구매"
						,ok_func : function(){
							MobileBodyStart.goLoginPage();
//							MobileBodyStart.goLogin();
						}
						,cancel_str : "비로그인 구매"
						,cancel_func : function(){
							try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							MobileCartList.setCartPayment(arrChk, "all");
						}
						,sns_str : "SNS로그인 구매"
						,sns_func : function(){
							//MobileBodyStart.goLogin("s");
							MobileBodyStart.goLoginPage();
//							MobileBodyStart.goLogin();
						}
					});
				}
				else {
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
						,ok_str  : "로그인 구매"
						,ok_func : function(){
//							MobileBodyStart.goLogin();
							MobileBodyStart.goLoginPage();
						}
						,cancel_str : "비로그인 구매"
						,cancel_func : function(){
							try { trackClicksEx('모바일장바구니^전체주문','전체주문', true); } catch(e){}
							MobileCartList.setCartPayment(arrChk, "all");
						}
					});
				}
			}

		});

		$(".btn_payment").click(function(event) {
			event.preventDefault();
			var arrChk = $("input[name='i_arrChkProd001'], input[name='i_arrChkProd002']").filter(":checked");
			if(IS_LOGIN || IS_LOGIN_SNS){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
					, type : "POST"
					, dataType : "json"
					, animation	: false
					, success : function ( data, textStatus, jqXHR) {

						if(data.status == "succ"){

							if(data.object >= 3){
								showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
								return;
							}else{
								var nowDate  = new Date();
							    var nowYear  = nowDate.getFullYear();
							    var nowMonth = nowDate.getMonth() + 1;
							    var nowDay  = nowDate.getDate();

							    if(nowMonth < 10 ) {
							    	nowMonth = "0" + nowMonth;
							    }

							    if(nowDay < 10) {
							    	nowDay = "0" + nowDay;
							    }

							    var today = nowYear + nowMonth + nowDay;

							    if(parseInt(today) >= 20160201){
							    	var cookieMo = $.cookie('cmc_cart_membership_mobile_popup');
							    	if(cookieMo != "N" || cookieMo == undefined || cookieMo == ''){
							    		//gypark : 장바구니 팝업
							    		if(GLOBAL_LEVELCD == "LV11" || GLOBAL_LEVELCD == "LV12" || GLOBAL_LEVELCD == "LV13"){
							    			var sum_price = fnOnlyNumber($(".sum_pay_product_price").text()).number;
							    			var beauty_price = fnOnlyNumber($(".sum_need_bpoint").text()).number;
							    			var all_price = fnOnlyNumber($(".sum_pay_price").text()).number;

							    			if(beauty_price > 0){
							    				sum_price = all_price - beauty_price;
							    			}

							    			if(parseInt(sum_price) >= 30000){
							    				modalPopup('#pop_cart');
							    				$("#chk_one").unbind("click").click(function(){
							    					$.cookie('cmc_cart_membership_mobile_popup', 'N', {expires:1, path: '/'});
							    				});
							    				$(".btn_pass").unbind("click").click(function(){
							    					modalPopupClose('#pop_cart');
							    					try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							    					MobileCartList.setCartPayment(arrChk, "choose");
							    				});
							    			}else{
							    				try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							    				MobileCartList.setCartPayment(arrChk, "choose");
							    			}
							    		}else{
							    			try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							    			MobileCartList.setCartPayment(arrChk, "choose");
							    		}
							    	}else{
							    		try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							    		MobileCartList.setCartPayment(arrChk, "choose");
							    	}
							    }else{ //2월1일 전
							    	try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							    	MobileCartList.setCartPayment(arrChk, "choose");
							    }

							}
						}
					}
				});
			}else{
				if (SNS_LOGIN_SCREEN_YN) {
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
						,ok_str  : "로그인 구매"
						,ok_func : function(){
//							MobileBodyStart.goLogin();
							MobileBodyStart.goLoginPage();
						}
						,cancel_str : "비로그인 구매"
						,cancel_func : function(){
							try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							MobileCartList.setCartPayment(arrChk, "choose");
						}
						,sns_str : "SNS로그인 구매"
						,sns_func : function(){
							//MobileBodyStart.goLogin("s");
//							MobileBodyStart.goLogin();
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
							,cancel_str  : "로그인 구매"
								,cancel_func : function(){
//									MobileBodyStart.goLogin();
									MobileBodyStart.goLoginPage();
								}
					,ok_str : "비로그인 구매"
						,ok_func : function(){
							try { trackClicksEx('모바일장바구니^선택상품주문','선택상품주문', true); } catch(e){}
							MobileCartList.setCartPayment(arrChk, "choose");
						}
					});
				}
			}
		});

       //구매대역 swipe
       window.purchasePriceSwipe = new Swipe(document.getElementById('purchasePriceSwipe'), {
           continuous: true,
           stopPropagation: true,
           callback: function(event, element) {
               $("#purchasebanner-nav > span").removeClass().eq(event).addClass("active");
           }
       });

       //배너영역 swipe
       window.adbannerSwipe = new Swipe(document.getElementById('adbannerSwipe'), {
           continuous: true,
           stopPropagation: true,
           callback: function(event, element) {
               $("#adbanner-nav > span").removeClass().eq(event).addClass("active");
           }
       });

       //gypark : 전체 선택, 해제 - 모바일은 본품만(PC랑 다르게 블루리본사은품과 club ap를 이 페이지에서 선택해야하기 때문)
       $("#chk00").unbind("change").change(function(event){
    	   event.preventDefault();
    	   var chk_all = $(this).find("input:checkbox + label");
    	   var len = $(".cartBox").find("input:checkbox").length;
    	   if($(this).is(":checked")){
    		   chk_all.prop("checked", true);
    		   $(this).addClass("active");
    		   for(var i = 0; i < len; i++){
    			   $(".cartBox").find("input:checkbox").eq(i).prop("checked", true);
    			   $(".cartBox").find("label").eq(i).addClass("active");
    		   }
    	   }else{
    		   chk_all.prop("checked", false);
    		   $(this).removeClass("active");
    		   for(var i = 0; i < len ; i++){
    			   $(".cartBox").find("input:checkbox").eq(i).prop("checked", false);
    			   $(".cartBox").find("label").eq(i).removeClass("active");
    		   }
    	   }
				 MobileCartList.setCheckCountLabel();
       });

       //gypark : 선택상품 삭제
       $(".btn_select_delete").unbind("click").click(function(event){
    	   event.preventDefault();

    	   if($("input[name='i_arrChkProd001']:checked").size() == 0){
				showMessageBox({
					message : "삭제할 상품을 선택해주세요."
					,ok_func : function(){
						return ;
					}
				});
			}else{
				showConfirmBox({
					message : "선택한 상품을 장바구니에서 삭제하시겠어요?"
					, ok_func : function(){
						var list = [];
						var cartString ="";

						$("input[name='i_arrChkProd001']:checked").each(function(event){
							var index = $("input[name='i_arrChkProd001']").index($(this));
							var tr = $(".cartBox").eq(index);

							var cartcd 	  = $(".span_cartcd",tr).text();
							var cart_seqno = $(".span_cart_seqno",tr).text();
							var key		  = $(".span_key",tr).text();
							var price	  = $(".span_price",tr).text();

							var productcd  = $("input[name='i_arrProductcd']",tr).val();
							var productCnt = $("input[name='i_arrProductCnt']",tr).val();
							var productnm = $("input[name='i_arrProductnm']",tr).val();
							var brandnm = $("input[name='i_arrBrandnm']",tr).val();

							list.push({cartcd : cartcd, seqno : cart_seqno});

							var techString = ";"+productcd+";"+productCnt+";"+price;

							//try {trackClicksEx(techString,'scRemove');}catch(e){}

							var str = brandnm+";"+productnm +";;;;eVar31="+productcd + ",";
							str = str.replace(/&/gi,"_");
							cartString += str;

							try{
//								AEC_F_D(productcd, 'o', productCnt);
								AEC_F_D1(productcd,'o', productCnt);
							}catch(e){}
						});

						try {trackPurchaseClick(cartString,'scRemove');}catch (e) {}

						MobileBodyStart.removeUserCart({
							list : list
							, callback : function(){
								$("input[name='i_arrChkProd001']:checked").each(function(event){
									var index = $("input[name='i_arrChkProd001']").index($(this));
									var tr = $(".cartBox").eq(index);
									var key = $(".span_key", tr).text();
									$(".tr_" + key).remove();
									tr.remove();

									MobileCartList.sum();
									MobileCartList.setCheckCountLabel();

									if($(".cartBox").size() == 0){
										$(".totalPrice").hide();
										$(".predictList").hide();
										$(".nodata_cart").show();
									}
								});
							}
						});
					}
					, cancel_func : function(){
						return ;
					}
				});

			}
       });

       //장바구니 추천상품 영역 장바구니 추가
	   $("#div_smartOffer_list").on("click",".btn_add_cart",function(){
		   event.preventDefault();
			var idx = $(".btn_add_cart").index($(this));
			var productcd = $("input[name='i_arrProductcd1']").eq(idx).val();
			var optioncd = $("input[name='i_arrOptioncd1']").eq(idx).val();
			var solopack = $("input[name='i_arrFlagSoloPack1']").eq(idx).val();
			var flagreser = $("input[name='i_arrFlagReser1']").eq(idx).val();
			var productnm = $("input[name='i_arrProductnm1']").eq(idx).val();
			var brandnm = $("input[name='i_arrBrandnm1']").eq(idx).val();
			var price = $("input[name='i_arrPrice1']").eq(idx).val();
			var list_price = $("input[name='i_arrList_Price1']").eq(idx).val();
			var categorycd = $("input[name='i_arrCategorycd1']").eq(idx).val();
			var brandcd = $("input[name='i_arrBrandcd1']").eq(idx).val();

			if(flagreser == "Y"){
				showConfirmBox({
					message : "이 상품은 상세페이지에서 예약 가능해요!<br/>이동하시겠어요?"
					, ok_func : function(){
						MobileBodyStart.goProductDetail(productcd);
//						location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+productcd;
					}
				});
			}
			else if(productcd == "SPR20170124000026690"){
				showMessageBox({
					message : "현재 이 상품은 장바구니에 담으실 수 없습니다!"
					,close : function(){
						return ;
					}
				});
			}
			else{
				//SmartOffer - 개인화 추천 태깅 (장바구니 담기)
            	try{
    	        	var cartList = [];
    	        	cartList.push({
    	        		  ITEM_VALUE : productcd
		    			, name : productnm
		    			, brand  : brandcd
		    			, category : categorycd
		    			, price : list_price
		    			, qty   : 1
		    			, prodOptionCode : optioncd
		    			, discountPrice : price
	        		});
    	        	cartListTagEvent(cartList,'MOBILE');
            	}catch(e){}

				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];

				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						var str = brandnm + ";" + productnm +";;;event54=1|event55="+price+";eVar31="+ productcd;
						str = str.replace(/&/gi,"_");

						try{trackPurchaseClick(str,'scAdd,event54,event55');}catch(e){}

						showMessageBox({
							message : "장바구니에 상품이 추가 되었어요."
								, close : function() {
									location.href =  GLOBAL_WEB_URL+ "mobile/cart/mobile_cart_cart_list.do";
								}
						});
					}
				});
			}
	   });
		//////////2017 리뉴얼 이벤트 추가

		//스페셜기프트가 있을때 아코디언 오픈
		$('#div_basket_list').on('click', '#a_gift', function(){
			if($(this).hasClass('on')!=true){
				$(this).addClass('on').parents('.giftbox').find('#scrlable_x_gift').addClass('on');
			}else{
				$(this).removeClass('on').parents('.giftbox').find('#scrlable_x_gift').removeClass('on');
			}
		});

		// 주문변경 버튼 클릭
		$('#div_basket_list').on('click', '.btn_ord_modi',function(){
			var optioncd = $(this).attr("id");
			var productCd = $(this).parents('div').attr("id");
			ShopOptBox.optBoxOpen('spoptsWrap');
			MobileCartList.setOptionSelect(productCd, optioncd);
		});

	},

	addOptionEvent : function () {
		// 옵션선택 : 세부옵션 (선택창 클릭시)
		$('#spoptsWrap').on('click', '#btnOptOpen',function(){
			ShopOptBox.$baseBox.removeClass('open trans300ms');
			ShopOptBox.$optBox.addClass('open');
		});

		// 상품상세 옵션 - 스크롤
		var listOptScroll = new iScroll('listOptScroll', {
			mouseWheel: true,
			scrollbars: true,
			eventPassthrough: true
		});


		$('.optslt_area .list_opt li').find('a').click(function(){
			$('#spoptsOption').removeClass('open');
			$('#spoptsWrap').show();
		});

		// 옵션선택 : 세부옵션 (옵션 선택시)
		$('#spoptsOption .list_opt a').click(function(){
			ShopOptBox.$baseBox.addClass('open');
			ShopOptBox.$optBox.removeClass('open trans300ms');
			var optioncd = $(this).parents('li').attr("id");
			var prodcd = $(this).parents('li').parents('ul').attr("id");
			var tr		 = $("#cartBox_"+prodcd);
			$("input[name='i_arrOptioncd']",tr).val(optioncd);
			MobileCartList.setOptionSelect(prodcd, optioncd);

		});

		// 옵션선택 : 닫기 클릭시 (딤드 닫힘)
		$('.spopts_wrap .btn_close').click(function(){
			ShopOptBox.optBoxClose();
		});

		// 취소버튼 클릭
		$("#opt_cancel_btn").click(function() {
			var boxProductCd = $('#scrl_opts_wrap .slted_area').attr("id");
			var tr		 = $("#cartBox_"+boxProductCd);
			var orgCnt = fnOnlyNumber($(".span_total_cnt", tr).text()).number;
			var orgOptionCd = $(".span_optioncd", tr).text();
			$("input[name='i_arrProductCnt']",tr).val(orgCnt);
			$("input[name='i_arrOptioncd']",tr).val(optioncd);
		});

		// 주문변경 버튼 클릭
		$('#opt_change_btn').click(function() {
			var boxProductCd = $('#scrl_opts_wrap .slted_area').attr("id");
			// MobileCartList.sum();
			console.log('boxProductCd------', boxProductCd);

			// var tr = obj.parents(".tr_cart_list").eq(0);
			var tr		 = $("#cartBox_"+boxProductCd);
		 	var cartcd 	  = $(".span_cartcd", tr).text();
		 	var seqno 	  = $(".span_cart_seqno", tr).text();
			var optioncd	  	= $("input[name='i_arrOptioncd']",tr).val();
		 	var productcd = $("input[name='i_arrProductcd']",tr).val();

		 	var arrParam = [];

		 	arrParam.push("i_arrCartcd=" + cartcd);
		 	arrParam.push("i_arrSeqno=" + seqno);
		 	arrParam.push("i_arrProductcd=" + productcd);
		 	arrParam.push("i_arrOptioncd=" + optioncd);

		 	MobileCommon.ajax({
			 	url : GLOBAL_WEB_ROOT+"mobile/cart/mobile_cart_change_cart_ajax.do"
			 	, type : "POST"
			 	, dataType : "json"
			 	, data : arrParam.join("&")
			 	, animation : false
			 	, success : function ( data, textStatus, jqXHR) {
				 	if (data.status == "succ") {
					 	MobileCartList.updateProductCnt(boxProductCd);
						//  MobileCartList.cartList();
				 	}
			 	}
		 	});
		});

	},

	updateProductCnt : function(prodcd) {
		var tr		 = $("#cartBox_"+prodcd);

		var productcd  	  = $("input[name='i_arrProductcd']",tr).val();
		var optioncd	  	= $("input[name='i_arrOptioncd']",tr).val();
		var productCnt 		= $("input[name='i_arrProductCnt']", tr).val();

		 try{
			 AEC_U_V1(productcd, productCnt);
		 }catch(e) {}

		 var list = [{
			 productcd : productcd
			 , optioncd : optioncd
			 , cnt : productCnt
		 }];

		 MobileBodyStart.addUserCart({
			 list : list
			 , callback : function(){
				 		console.log("addUserCart success!")
						MobileCartList.cartList("");
			 }
		 });
	},

	cartList : function(flag){
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/cart/mobile_cart_cart_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {i_sFlagWish : "L"}
			, animation : true
			, isModalEnd : true
			, success : function ( data, textStatus, jqXHR) {
				if (data.status == "succ") {

					if(data.object.PROD_TAG != undefined){

						//YHCHOI :  태깅
						try {
							s.products 	= data.object.PROD_TAG.replace(/>/gi,"^");
							s.products 	= s.products.replace(/&/gi,"_");
							s.events	= "scView"; //장바구니페이지
							void(s.t());
						} catch (e) {

						}
					}
					// console.log('list call--', data.object.PROD_TAG);

					var vo   	 	= data.object.productList;
					var size 	 	= vo.length;
					var paramhtml 	= [];
					var paramTarget = $("#div_basket_list");

					var sum_price_fb = 0;
					var fabArr = new Array();
					//YHCHOI : 여기부터는 본품
					if(size > 0){

						var flagSolo 	= "";
					    var flagUsesolo = "";
					    var flagEvent	= "N";
					    var criArr = [];

						for(var i=0; i<size; i++) {
//							try{
//								_A_amt[i] = vo[i].n_sale_price.toString();
//								_A_nl[i] = vo[i].n_cnt.toString();
//								_A_pl[i] = vo[i].v_productcd;
//								_A_pn[i] = vo[i].v_productnm;
//								_A_ct[i] = vo[i].v_prod_ctg_path;
//							}catch(e) {}

							if(vo[i].v_prod_typecd == "PROD_0001"){

								var statuscd = vo[i].n_stockqty <= 0 ? '0002' : vo[i].v_statuscd;

								paramhtml.push("<div class='cartBox' id=cartBox_"+vo[i].v_productcd+">");
								paramhtml.push("	<input type='hidden' name='i_arrProductnm' 		value='"+vo[i].v_productnm+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrProductcd' 		value='"+vo[i].v_productcd+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrProductImg' 	value='"+vo[i].v_img_web_path+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrOptionnm' 		value='"+vo[i].v_optionnm+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrOptioncd' 		value='"+vo[i].v_optioncd+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrOptionCnt' 		value='"+vo[i].n_option_cnt+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrBrandnm' 		value='"+vo[i].v_brandnm+"'/>");

								// S 타켓팅 게이츠 태깅
								/*try {
									tJsonArr.push(
										{i : vo[i].v_productcd
										, t : vo[i].v_productnm}
									);
								} catch (e) {}*/
								// E 타켓팅 게이츠 태깅

								// S 크리테오 태깅
								/*try {
									criArr.push(
											{id : vo[i].v_productcd
												, price : vo[i].n_sale_price
												, quantity : vo[i].n_cnt}
									);
								} catch (e) {}*/
								// E 크리테오 태깅

								// S 페이스북 픽셀 태깅
								try {
									fabArr.push(
												vo[i].v_productcd
										);
									sum_price_fb += vo[i].n_sale_price * vo[i].n_cnt;
									} catch (e) {}
								// E 페이스북 픽셀 태깅

								var maxcartcnt     = vo[i].n_opt_max_cart_cnt;
								var stockqty   	   = vo[i].n_stockqty;
								var dayoffStockqty = vo[i].n_dof_stockqty;
								var dayoffcd	   = vo[i].v_dayoffcd;

								var productOriCnt = vo[i].n_cnt;

							    if(vo[i].n_cnt > stockqty || (vo[i].n_cnt > dayoffStockqty && dayoffStockqty > 0 && dayoffcd != "undefined")){
								   if(stockqty > dayoffStockqty && dayoffStockqty > 0 && dayoffcd != "undefined"){
									   productOriCnt = dayoffStockqty;
								   }else{

									   if(stockqty <= 0){
										   productOriCnt = 1;
									   }else{
										   productOriCnt = stockqty;
									   }
								   }
							    }else if(vo[i].n_cnt > maxcartcnt){
								   productOriCnt = maxcartcnt;
							    }

								paramhtml.push("	<input type='hidden' name='i_arrProductCnt' 	value='"+productOriCnt+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrFlagBeauty' 	value='"+vo[i].v_flag_beauty+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrSetdiycd' 		value=''/>");
								paramhtml.push("	<input type='hidden' name='i_arrSetdiyKey' 		value=''/>");
								paramhtml.push("	<input type='hidden' name='i_arrStatuscd' 		value='"+statuscd+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrFlagSolo'		value='"+vo[i].v_flag_solopack+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrFlagUseSolo'	value='"+vo[i].v_flag_use_solopack+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrFlagEvent'		value='"+vo[i].v_flag_event+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrBrandNm' 		value='"+vo[i].v_brandnm+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrProductTypecd'	value='"+vo[i].v_prod_typecd+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrFeatureTag' 	value='"+vo[i].v_feature_tag+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrOnpluBuyCnt' 	value='"+vo[i].n_plus_evt_buy_cnt+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrOnpluGiveCnt' 	value='"+vo[i].n_plus_evt_give_cnt+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrTagPrice'       value='"+vo[i].n_price+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrTagCategory'    value='"+vo[i].v_tag_categorycd+"'/>");
								paramhtml.push("	<input type='hidden' name='i_arrBrandcd' 		value='"+vo[i].v_brandcd+"'/>");

								paramhtml.push("	<span class='span_hide span_optioncd'>"+vo[i].v_optioncd+"</span>");
								paramhtml.push("	<span class='span_hide span_key'>"+vo[i].v_key+"</span>");
								paramhtml.push("	<span class='span_hide span_price'>"+vo[i].n_price+"</span>");
								paramhtml.push("	<span class='span_hide span_sale_price'>"+vo[i].n_sale_price+"</span>");
								paramhtml.push("	<span class='span_hide span_beauty_price'>"+vo[i].n_beauty_price+"</span>");
								paramhtml.push("	<span class='span_hide span_today_price'>"+vo[i].n_today_price+"</span>");

								paramhtml.push("	<span class='span_hide span_status'>"+statuscd+"</span>");
								paramhtml.push("	<span class='span_hide span_cartcd'>"+vo[i].v_cartcd+"</span>");
								paramhtml.push("	<span class='span_hide span_cart_seqno'>"+vo[i].n_seqno+"</span>");

								paramhtml.push("	<span class='span_hide span_stockqty'>"+vo[i].n_stockqty+"</span>");
								paramhtml.push("	<span class='span_hide span_dayoff_stockqty'>"+vo[i].n_dof_stockqty+"</span>");
								paramhtml.push("	<span class='span_hide span_dayoffcd'>"+vo[i].v_dayoffcd+"</span>");

								paramhtml.push("	<span class='span_hide span_max_cart_cnt'>"+vo[i].n_opt_max_cart_cnt+"</span>");
								paramhtml.push("	<span class='span_hide span_mpoint_per'>"+vo[i].v_mpoint_per+"</span>");
								paramhtml.push("	<span class='span_hide span_bpoint_per'>"+vo[i].n_bpoint_per+"</span>");

								paramhtml.push("	<span class='span_hide span_total_cnt'>"+vo[i].n_total_cnt+"</span>");
								paramhtml.push("	<span class='span_hide span_pre_cnt'>"+vo[i].n_pre_cnt+"</span>");
								paramhtml.push("	<span class='span_hide span_oneplus_buy_cnt'>"+vo[i].n_plus_evt_buy_cnt+"</span>");
								paramhtml.push("	<span class='span_hide span_oneplus_give_cnt'>"+vo[i].n_plus_evt_give_cnt+"</span>");

								paramhtml.push("	<span class='span_hide span_wish_seqno'>"+vo[i].n_wish_seqno+"</span>");
								paramhtml.push("	<span class='span_hide span_flag_wish'>"+vo[i].v_flag_wish+"</span>");

								if(vo[i].n_option_cnt > 1){

									var opVo = null;

									if(vo[i].n_setdiy_key !=null){
										opVo = data.object.diyOptionList;
									}else{
										opVo = data.object.optionList;
									}

									var opVosize = opVo.length;

									for(var j=0; j<opVosize; j++){

										if(vo[i].v_productcd == opVo[j].v_productcd){

											paramhtml.push("<input type='hidden' name='i_arrOptioncd_temp' 	  value='"+opVo[j].v_optioncd+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionnm_temp' 	  value='"+opVo[j].v_optionnm+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionstock_temp'   value='"+opVo[j].n_stockqty+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionstatus_temp'   value='"+opVo[j].v_opt_statuscd+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionListPrice_temp'   value='"+opVo[j].n_list_price+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionPrice_temp'   value='"+opVo[j].n_price+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptioncd_"+opVo[j].v_optioncd+"' 	  value='"+opVo[j].v_optioncd+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionnm_"+opVo[j].v_optioncd+"' 	  value='"+opVo[j].v_optionnm+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionstock_"+opVo[j].v_optioncd+"'   value='"+opVo[j].n_stockqty+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionstatus_"+opVo[j].v_optioncd+"'   value='"+opVo[j].v_opt_statuscd+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionListPrice_"+opVo[j].v_optioncd+"'   value='"+opVo[j].v_n_list_price+"' />");
											paramhtml.push("<input type='hidden' name='i_arrOptionPrice_"+opVo[j].v_optioncd+"'   value='"+opVo[j].v_n_price+"' />");
										};
									};

								};

								paramhtml.push("</div>");

								flagSolo 	= vo[i].v_flag_solopack;
								flagUsesolo = vo[i].v_flag_use_solopack;
								flagEvent 	= vo[i].v_flag_event;

							}else if(vo[i].v_prod_typecd == "PROD_0009"){

								if(((flagSolo == "Y" && flagUsesolo == "Y")|| flagSolo == "N") && flagEvent == "Y"){

									paramhtml.push("<div class='tr_freegood_list tr_"+vo[i].v_key+"'>");
									paramhtml.push("<input type='hidden' name='i_arrUproductcd'  value='"+vo[i].v_uproductcd+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrProductcd'   value='"+vo[i].v_productcd+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrProductnm'   value='"+vo[i].v_productnm+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrProductImg'  value='"+vo[i].v_img_web_path+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrOptioncd'    value='"+vo[i].v_optioncd+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrProductCnt'  value='"+vo[i].n_cnt+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrProductKey'  value='"+vo[i].v_key+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrBrandNm' 	 value='"+vo[i].v_brandnm+"'/>");
									paramhtml.push("<input type='hidden' name='i_arrCapacity'    value='"+vo[i].v_capacity+"'/>");

									paramhtml.push("<span class='span_hide span_key'>"+vo[i].v_key+"</span>");
									paramhtml.push("<span class='span_hide span_sale_price'>"+vo[i].n_sale_price+"</span>");
									paramhtml.push("<span class='span_hide span_price'>"+vo[i].n_price+"</span>");
									paramhtml.push("<span class='span_hide span_mpoint'>"+vo[i].n_point+"</span>");
									paramhtml.push("<span class='span_hide span_fg_cnt_per_unit'>"+vo[i].n_freegood_cnt+"</span>");
									paramhtml.push("<span class='span_hide span_typecd'>"+vo[i].v_typecd+"</span>");
									paramhtml.push("</div>");
								}
							};

						};

						try{
							goFacebook(fabArr, sum_price_fb);
						}catch(e){}
						// 스토어 서비스
						try{
							awq('track','add_to_cart', 'a1627cefe9caa9adf47f244c5aeeb1e5', {"price":sum_price_fb,"currency":"KRW","content_type":"product","product_ids":fabArr});
						}catch(e){}
						// end 스토어 서비스
						// S 타켓팅 케이츠 태깅
						/*try{
							wptg_tagscript.exec();
						}catch(e) {
						}*/
						// E 타켓팅 케이츠 태깅

						//크리테오 스크립트 삽입
						/*try{
							var email = $(".semail").text();
							var md5Email = "";
							if(email != ""){
								md5Email = $.md5($.trim(email));
							}
							window.criteo_q = window.criteo_q || [];
							window.criteo_q.push(
							        { event: "setAccount", account: 28654 },
							        { event: "setHashedEmail", email: md5Email },
							        { event: "setSiteType", type: "m" },
							        { event: "viewBasket", item: criArr}
							);
						}catch(e){}*/

					}else{
						try{
							goFacebook(fabArr, sum_price_fb);
						}catch(e){}
						// 스토어 서비스
						try{
							awq('track','add_to_cart', 'a1627cefe9caa9adf47f244c5aeeb1e5', {"price":sum_price_fb,"currency":"KRW","content_type":"product","product_ids":fabArr});
						}catch(e){}
						// end 스토어 서비스
					}

					paramTarget.html(paramhtml.join(""));

					//YHCHOI : 본품 상품 들어가는 부분
					var productTr		 = $(".cartBox");
					var freegoodTr		 = $(".tr_freegood_list");
					var productlistSize  = productTr.size();
					var freegoodlistSize = freegoodTr.size();

					var reservation_cnt  = 0;
					var beautyprd_cnt    = 0;
					var optDetailHtml = [];

					//YCHOI : 본품 상품 리스트
					if(productlistSize > 0){

							for(var i=0; i<productlistSize; i++){

									var arrHtml 	= new Array();
									var target = $(".cartBox").eq(i);

									var productcd	  = $("input[name='i_arrProductcd']",productTr.eq(i));
									var productnm	  = $("input[name='i_arrProductnm']",productTr.eq(i));
									var productImg 	  = $("input[name='i_arrProductImg']",productTr.eq(i));
									var productCnt 	  = $("input[name='i_arrProductCnt']",productTr.eq(i));
									var beautyFlag    = $("input[name='i_arrFlagBeauty']",productTr.eq(i));
									var flagSolo 	  = $("input[name='i_arrFlagSolo']",productTr.eq(i));
									var flagUsesolo   = $("input[name='i_arrFlagUseSolo']",productTr.eq(i));
									var flagEvent     = $("input[name='i_arrFlagEvent']",productTr.eq(i));
									var optionnm   	  = $("input[name='i_arrOptionnm']",productTr.eq(i));
									var optioncd   	  = $("input[name='i_arrOptioncd']",productTr.eq(i));
									var optionCnt     = $("input[name='i_arrOptionCnt']",productTr.eq(i));
									var statuscd      = $("input[name='i_arrStatuscd']",productTr.eq(i));
									var brandnm   	  = $("input[name='i_arrBrandNm']",productTr.eq(i));
									var featureTag    = $("input[name='i_arrFeatureTag']",productTr.eq(i));

									var optioncdtemp  = $("input[name='i_arrOptioncd_temp']",productTr.eq(i));
									var optionnmtemp  = $("input[name='i_arrOptionnm_temp']",productTr.eq(i));
								   	var optionstocktemp  = $("input[name='i_arrOptionstock_temp']",productTr.eq(i));
								   	var optionstatustemp  = $("input[name='i_arrOptionstatus_temp']",productTr.eq(i));

								   arrHtml.push("<div class='inner'>");
								   arrHtml.push("	<div class='box_chk'>");
								   arrHtml.push("		<span class='rCheckbox'>");
								   arrHtml.push("			<input type='checkbox' id='chk"+i+"' name='i_arrChkProd001' class='chb' checked='checked'/>");
								   arrHtml.push("   		<label for='chk"+i+"'>");

								   if(statuscd.val() != "0001" && statuscd.val() != "0003"){
									   arrHtml.push("<span style='color:red;'>(일시품절)</span>");

								   }else if(statuscd.val() == "0003"){
									   arrHtml.push("<span style='color:red;'>(판매중지)</span>");
								   }

								  //  arrHtml.push("		<span class='brandNm'>"+brandnm.val()+"</span>");
								   arrHtml.push("			"+brandnm.val()+"</label>");
								   arrHtml.push("		</span>");
								  //  arrHtml.push("	<div class='srvArea'>");
									 //
								  //  if(featureTag.val() != "undefined"){
									//
									//    if(featureTag.val().indexOf("DG_P017") > -1){
									// 	   reservation_cnt++;
									//    }
									//
									//    if(flagSolo.val() == "Y" && flagUsesolo.val() == "N"){
									// 	   arrHtml.push(			getFilterHtmlTag(featureTag.val().replace("DG_P006","")));
									//    }else{
									// 	   arrHtml.push(			getFilterHtmlTag(featureTag.val()));
									//    }
								  //  }
								  //
								  //  arrHtml.push("	</div>");
									arrHtml.push("	<button class='btn_cartBox_delete'>선택 삭제</button>")
								  arrHtml.push("</div>");

								   var price			= fnOnlyNumber($(".span_price",productTr.eq(i)).text()).number;
								   var sale_price		= fnOnlyNumber($(".span_sale_price",productTr.eq(i)).text()).number;
								   var today_price		= fnOnlyNumber($(".span_today_price",productTr.eq(i)).text()).number;

								   var onePlusBuyCnt   = fnOnlyNumber($(".span_oneplus_buy_cnt", productTr.eq(i)).text()).number;
								   var onePlusGiveCnt  = fnOnlyNumber($(".span_oneplus_give_cnt", productTr.eq(i)).text()).number;
								   var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;

								   var dayoffcd			= $(".span_dayoffcd",productTr.eq(i)).text();
								   var dayoffStockqty   = fnOnlyNumber($(".span_dayoff_stockqty",productTr.eq(i)).text()).number;

								   var productKey 		= $(".span_key",productTr.eq(i)).text();

								   arrHtml.push("<div class='prodbox'>");
								   arrHtml.push("	<div class='prodImg'>");
								   arrHtml.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + productcd.val() + "');\" onClick=\"trackClicksMall('상품','장바구니^상품상세','상품상세','event5',true,'"+productcd.val()+"');\" ><img src='"+productImg.val()+"' alt='' onerror='fnNoImage(this);'></a>");

								   arrHtml.push("	</div>");
								   arrHtml.push(" <div class='detail'>");
									 arrHtml.push(" 	<p class='prodNm'>"+productnm.val()+"</p>");
								   arrHtml.push("		<div class='option'>"+optionnm.val()+"<br />"+productCnt.val()+"개</div>");
									 arrHtml.push("		<div class='btn' id="+productcd.val()+"><a class='btn_gradation01 btn_ord_modi' id="+optioncd.val()+" href='javascript:;'>주문변경</a></div>");
									 arrHtml.push('		<div class="price_area">');
								   if((dayoffStockqty > 0 && dayoffcd !="undefined" && today_price > 0)
								    ||((price > 0 && sale_price > 0 && price > sale_price) && (dayoffStockqty == 0 && dayoffcd =="undefined"))
								    ||(isonePlusFlag)){

									   var unit = "원";
										var color = "";

										if(beautyFlag.val() == "Y"){
											unit = "P";
											color = "color: #ea5279";
											beautyprd_cnt++;
											// arrHtml.push("		<span class='price' style='"+color+"'>");
										  arrHtml.push("			<strong class='price'><span id=\"row_sale_price\" class='row_sale_price'>0</span>"+unit+"");
										}else{
											// arrHtml.push("		<span class='price' style=''>");
											  //  arrHtml.push("			할인금액:<em class='row_pay_price'>0</em>원");
											  //  arrHtml.push("			판매가격:<em class='row_sale_price'>0</em>원");
											   arrHtml.push("			<strong class='price'><span class='row_sale_price'>0</span>원");
												 arrHtml.push("			<del class='base'><span class='row_pay_price'>0</span>원");
										}
								   }else{

										var unit = "원";
										var color = "";

										if(beautyFlag.val() == "Y"){
											unit = "P";
											color = "color: #ea5279";
											beautyprd_cnt++;
										}
											// arrHtml.push("		<span class='price' style='"+color+"'>");
									    // arrHtml.push("			<dd style='"+color+"'><em class='row_sale_price'>0</em>"+unit+"</dd>");
											arrHtml.push("			<strong class='price'><span class='row_sale_price'>0</span>"+unit+"");

								   }

									//  arrHtml.push("		</span>");
								   arrHtml.push("		</div>");

								   var maxcartcnt      = fnOnlyNumber($(".span_max_cart_cnt",productTr.eq(i)).text()).number;
								   var onplusBuyCnt    = fnOnlyNumber($(".span_oneplus_buy_cnt",productTr.eq(i)).text()).number;
								   var onplusGiveCnt   = fnOnlyNumber($(".span_oneplus_give_cnt",productTr.eq(i)).text()).number;

								   if(onplusBuyCnt !=0 && onplusGiveCnt !=0){

										 // 필요시 display none 삭제
									   arrHtml.push("		<div class='sel' style='display:none'>");
									   arrHtml.push("		<span style='color:#4c7ed6;'><em class='row_plus_buy_cnt'>"+parseInt(onplusBuyCnt+onplusGiveCnt)+"</em>개 구매시  <em class='row_plus_give_cnt'>"+onplusBuyCnt+"</em>개 금액이 적용됩니다.</span>");
									   arrHtml.push("		</div>");
								   }

								   arrHtml.push("   </div>");
								   arrHtml.push("</div>");

								   if(((flagSolo.val() == "Y" && flagUsesolo.val() == "Y")|| flagSolo.val() == "N") && flagEvent.val() == "Y"){

										var prevProductkey = "";
										var isDivFlag = false;

										if(freegoodlistSize>0){

											for(var k=0; k<freegoodlistSize; k++){

												var freegoodnm			= $("input[name='i_arrProductnm']",freegoodTr.eq(k));
												var freegoodImg 		= $("input[name='i_arrProductImg']",freegoodTr.eq(k));
												var freegoodCnt			= $("input[name='i_arrProductCnt']",freegoodTr.eq(k));
												var freegoodKey			= $("input[name='i_arrProductKey']",freegoodTr.eq(k));
												var freecapacity		= $("input[name='i_arrCapacity']",freegoodTr.eq(k));
												var freebrandnm			= $("input[name='i_arrBrandNm']",freegoodTr.eq(k));

												var uproductKey         = $(".span_key",freegoodTr.eq(k)).text();

												if(productKey == uproductKey){

													if(prevProductkey != uproductKey){

														isDivFlag = true;
														arrHtml.push("<div class='giftbox'>");
														arrHtml.push('	<h3 class="tit"><a href="#none" id="a_gift">상품 구매시 스페셜 기프트가 있어요</a></h3>');
														arrHtml.push("	<div class='scrlable_x' id='scrlable_x_gift'>");
														arrHtml.push("		<ul class='list_prod2'>");

													}

													arrHtml.push("			<li class='li_freegood_list li_"+freegoodKey.val()+"'>");
													arrHtml.push("				<div class='prod_item'>");
													// arrHtml.push("					<a href=''#none'>");
													arrHtml.push("						<div class='thumb'><img src='"+freegoodImg.val()+"' alt='' onerror='fnNoImage(this);'></div>");
													arrHtml.push("						<div class='details'>");

													var brandnm = freebrandnm.val() == "undefined" ? "아모레퍼시픽몰" : freebrandnm.val();

													arrHtml.push("							<p class='brand_nm'>"+brandnm+"</p>");
													arrHtml.push("							<p class='prod_nm'>"+freegoodnm.val()+"</p>");
													arrHtml.push("							<p class='qty'>"+freegoodCnt.val()+"개</p>");

													if(freecapacity.val() !="" && freecapacity.val() != "undefined"){
														arrHtml.push("						<p class='ml'>"+freecapacity.val()+"</p>");
													}
													arrHtml.push("					</div>");
													// arrHtml.push("				</a>");

													arrHtml.push("			</div>");
													arrHtml.push("		</li>");

													prevProductkey = productKey;
												}
											}
										}

										if(isDivFlag){
											arrHtml.push("		</ul>");
											arrHtml.push("	</div>");
											arrHtml.push("</div>");
										}
								   }

									arrHtml.push("	</div>");
									target.html(target.html() + arrHtml.join(""));
							}

							MobileCartList.setCheckCountLabel();

							$(".totalPrice").show();
							$(".predictList").show();
							$(".nodata_cart").hide();

					}else{

						/*var arrHtml 	= new Array();
						var target = $("#div_basket_list");
						arrHtml.push("<div class='nodata'>");
						arrHtml.push("	<p class='sp_bg s5'>현재는 장바구니에 담긴 상품이 없습니다.</p>");
						arrHtml.push("</div>");*/

						$(".totalPrice").hide();
						$(".predictList").hide();
						$(".nodata_cart").show();
						/*target.html($(arrHtml.join("")));*/

					}

					//YHCHOI : 블루리본 스토어
					MobileCartList.rebon_point_list  = data.object.waterPointList;

					MobileCartList.sum();

					//YHCHOI : 예약발송 상품이 있으면 표시해준다.
					if(reservation_cnt > 0){
						$(".div_alarm_reservation").show();
					}

					//YHCHOI : 뷰티포인트 전용 상품이 있으면 표시해준다.
					if(beautyprd_cnt > 0){
						$(".div_alarm_beautyprd").show();
					}

					var sameRecomList = data.object.recomList;
					if(sameRecomList != undefined && sameRecomList.length > 0) {
						var sameHtml = [];
						var sameNav = [];
						var clickUrl = "";

						$(".cate_title").text(sameRecomList[0].v_scenariocomment);

						var len = sameRecomList.length;
						for(var i=0; i<len; i++) {
							if(i % 3 == 0) {
								sameHtml.push("<div class=\"bskGiftbox cartGiftboxadd\">");
								sameHtml.push("	<ul>");
							}
							clickUrl = "clickUrl=" + sameRecomList[i].v_clickurl;
							sameHtml.push("<li>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrProductcd1\" value='"+ sameRecomList[i].v_productcd+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrOptioncd1\" value='"+ sameRecomList[i].v_optioncd+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrFlagReser1\" value='"+ sameRecomList[i].v_flag_reser_real+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrProductnm1\" value='"+ sameRecomList[i].v_productnm+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrBrandnm1\" value='"+ sameRecomList[i].v_brandnm+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrPrice1\" value='"+ sameRecomList[i].n_price+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrList_Price1\" value='"+ sameRecomList[i].n_list_price+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrCategorycd1\" value='"+ sameRecomList[i].v_categorycd+"'/>");
							sameHtml.push("<input type=\"hidden\" name=\"i_arrBrandcd1\" value='"+ sameRecomList[i].v_brandcd+"'/>");
							sameHtml.push("<div class=\"prodImg\">");
							sameHtml.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + sameRecomList[i].v_productcd + "','"  + clickUrl + "');\">");
							sameHtml.push("		<div class=\"thumbImg\">");
							sameHtml.push("			<img src=\""+sameRecomList[i].v_img_path+"\" alt=\"\" />");
							sameHtml.push("		</div>");
							sameHtml.push("		<div class=\"prodDetail\">");
							sameHtml.push("			<p class=\"brandNm ellipsis\">"+ sameRecomList[i].v_brandnm +"</p>");
							sameHtml.push("			<p class=\"prodNm\">"+getByteString(sameRecomList[i].v_productnm, 15)+"</p>");
							sameHtml.push("			<p class=\"priceZone\">");
							if(sameRecomList[i].n_list_price != sameRecomList[i].n_price) {
								sameHtml.push("				<span class=\"sale\"><em>"+SetNumComma(sameRecomList[i].n_list_price)+"</em> 원</span>");
							}
							sameHtml.push("				<span class=\"price\"><em>"+SetNumComma(sameRecomList[i].n_price)+"</em> 원</span>");
							sameHtml.push("			</p>");
							sameHtml.push("		</div>");
							sameHtml.push("	</a>");
							sameHtml.push("</div>");
							sameHtml.push("<div class=\"prodBasket\">");
							sameHtml.push("		<a href=\"#\" class=\"btn_add_cart\">장바구니추가</a>");
							sameHtml.push("</div>");
							sameHtml.push("</li>");
							if(i % 3 == 2 || i == len-1) {
								sameHtml.push("	</ul>");
								sameHtml.push("</div>");
							}
						}

						var navi_no = 0;
						if(len > 3) {
							for(var i = 0; i<len; i++) {
								var active = "";
								if(i % 3 == 0) {
									navi_no++;
									if(navi_no == 1) {
										active = "class=\"active\"";
									} else {
										active = "";
									}

									sameNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
								}
							}
							$("#vipRecom-nav").html(sameNav.join(""));
						}

						$("#vipRecomArea").html(sameHtml.join(""));

						window.recommendSwipe = new Swipe(document.getElementById('recommendSwipe'), {
	                        continuous: true,
	                        stopPropagation: true,
	                        callback: function(event, element) {
	                        	var idx = setNaviIndex($("#vipRecom-nav > span"), event);
	                            $("#vipRecom-nav > span").removeClass().eq(idx).addClass("active");
	                        }
	                    });
					} else {
						$(".recommendContView").hide();
					}

					/* 기존 추천영역 제외
					if(sameRecomList != undefined && sameRecomList.length > 0) {
						var sameHtml = [];
						var sameNav = [];

						var len = sameRecomList.length;
						for(var i=0; i<len; i++) {
							if(i % 3 == 0) {
								sameHtml.push("<div class=\"prodAlbumType v2\">");
								sameHtml.push("	<ul>");
							}

							sameHtml.push("<li>");
							sameHtml.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + sameRecomList[i].v_productcd + "');\">");
							sameHtml.push("		<div class=\"thumbImg\">");
							sameHtml.push("			<img src=\""+sameRecomList[i].v_img_path+"\" alt=\"\" />");
							sameHtml.push("		</div>");
							sameHtml.push("		<div class=\"prodDetail\">");
							sameHtml.push("			<p class=\"prodNm\">"+getByteString(sameRecomList[i].v_productnm, 15)+"</p>");
							sameHtml.push("			<p class=\"priceZone\">");
							if(sameRecomList[i].n_list_price != sameRecomList[i].n_price) {
								sameHtml.push("				<span class=\"sale\"><em>"+SetNumComma(sameRecomList[i].n_list_price)+"</em> 원</span>");
							}
							sameHtml.push("				<span class=\"price\"><em>"+SetNumComma(sameRecomList[i].n_price)+"</em> 원</span>");
							sameHtml.push("			</p>");
							sameHtml.push("			<div class=\"prodEvalu\">");
							sameHtml.push("				<span class=\"gradeType2 grade0"+Math.round(sameRecomList[i].n_single_point)+"\"><span class=\"hide\">평점 "+sameRecomList[i].n_single_point+"</span></span>");
							sameHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(sameRecomList[i].n_review_cnt)+")</span>");
							sameHtml.push("			</div>");
							sameHtml.push("		</div>");
							sameHtml.push("	</a>");
							sameHtml.push("</li>");

							if(i % 3 == 2 || i == len-1) {
								sameHtml.push("	</ul>");
								sameHtml.push("</div>");
							}
						}

						var navi_no = 0;
						if(len > 3) {
							for(var i = 0; i<len; i++) {
								var active = "";
								if(i % 3 == 0) {
									navi_no++;
									if(navi_no == 1) {
										active = "class=\"active\"";
									} else {
										active = "";
									}


									sameNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
								}
							}
							$("#basketRecom-nav").html(sameNav.join(""));
						}

						$("#basketRecomArea").html(sameHtml.join(""));

						window.latestSwipe = new Swipe(document.getElementById('latestSwipe'), {
	                        continuous: true,
	                        stopPropagation: true,
	                        callback: function(event, element) {
	                        	var idx = setNaviIndex($("#basketRecom-nav > span"), event);
	                            $("#basketRecom-nav > span").removeClass().eq(idx).addClass("active");
	                        }
	                    });
					} else {
						$(".p_recomTitle").hide();
						$(".recomSec").hide();
					}
					*/
				}
			}
		});
		MobileCartList.addProductCntEvent();

   }
	, setCartPayment : function (arrChk, type) {

		if (arrChk.size() == 0) {
			showMessageBox({message : "주문하실 상품을 선택해주세요."});
			return;
		}

		var tr;
		var size = arrChk.size();
		var isLackOfQty = false;
		var hasSoldOut = false;
		var status 		 = "";
		var price		 = 0;
		var prodCnt 	 = 0;			// 본품 수량
		var pointCnt 	 = 0;
		var sumPayMpoint = 0;
		var sumPayBpoint = 0;

		var buyCnt = 0;
		var qtyCnt = 0;

		var onePlusBuyCnt  = 0;
		var onePlusGiveCnt = 0;

		var tempList = [];

		MobileCartList.clearForm();

		for (var i = 0 ; i < size; i++) {

			tr = arrChk.eq(i).parents(".cartBox").eq(0);

			// TODO : tr_vipgift_list delete
			if (tr.hasClass("tr_vipgift_list")) {
				continue;
			}

			status = $(".span_status", tr).text();
			buyCnt = fnOnlyNumber($("*[name='i_arrProductCnt']", tr).val()).number;
			qtyCnt = fnOnlyNumber($(".span_stockqty", tr).text()).number;
			price  = fnOnlyNumber($(".span_price", tr).text()).number;

			if (status != "0001") {
				hasSoldOut = true;
			}


			// 재고 수량 체크
			if (buyCnt > qtyCnt) {
				isLackOfQty = true;
			}

			// TODO : delete - i_arrChkProd002
			// if (tr.hasClass("tr_product_list")) {

				var beautyFlag = $("input[name='i_arrFlagBeauty']",tr).val();

				if(beautyFlag == "Y"){

					var bpoint  = fnOnlyNumber($(".span_beauty_price", tr).text()).number;
					var cnt		= fnOnlyNumber($("*[name='i_arrProductCnt']", tr).val()).number;

					sumPayBpoint += bpoint * cnt;

				}

				MobileCartList.makeParameter(tr,"product");
				prodCnt++;

			// }else {
			//
			// 	if($("input[name='i_arrChkProd002']",tr).prop("checked")){
			//
			// 		var mpoint	= fnOnlyNumber($(".span_rebon_point", tr).text()).number;
	    // 			var cnt		= fnOnlyNumber($("*[name='i_arrProductCnt']", tr).val()).number;
	    // 			sumPayMpoint += mpoint * cnt;
			//
	    // 			MobileCartList.makeParameter(tr,"point");
	    // 			pointCnt++;
			// 	}
			// }

			var productcd  = $("input[name='i_arrProductcd']",tr).val();
			var productnm  = $("input[name='i_arrProductnm']",tr).val();
			var optionnm   = $("input[name='i_arrOptionnm']",tr).val();
			var optioncd   = $("input[name='i_arrOptioncd']",tr).val();

			onePlusBuyCnt  =	fnOnlyNumber($(".span_oneplus_buy_cnt",tr).text()).number;
			onePlusGiveCnt =	fnOnlyNumber($(".span_oneplus_give_cnt",tr).text()).number;

			if(onePlusBuyCnt > 0 && onePlusGiveCnt > 0){

				tempList.push({temp : productcd+"_"+price
					, price : price
					, productnm : productnm
					, productcd : productcd
					, optionnm : optionnm
					, optioncd : optioncd
					, cnt	   : buyCnt
					, onePlusBuyCnt : onePlusBuyCnt
					, onePlusGiveCnt : onePlusGiveCnt
				});

				tempList.sort(function(a, b) {
					  if (a.temp > b.temp) return -1;
					  if (b.temp > a.temp) return 1;
					  return 0;
				});

			}
		}

		if (prodCnt == 0 && pointCnt == 0) {
			showMessageBox({message : "주문하실 상품을 선택해주세요."});
			return;
		}

		if(type == "all"){
			if (prodCnt == 0 && pointCnt > 0) {
				showMessageBox({message : "블루리본사은품은 장바구니에 5,000원 <br/>이상 담으셨을 경우 교환가능하세요!<br/>(상품 추가 혹은 블루리본사은품 제외 후 <br/>결제시도해주세요)"});
				return;
			}else if(pointCnt > 0 && parseInt($("input[name='i_sAllPrice']").val()) < 5000){
				showMessageBox({message : "블루리본사은품은 장바구니에 5,000원 <br/>이상 담으셨을 경우 교환가능하세요!<br/>(상품 추가 혹은 블루리본사은품 제외 후 <br/>결제시도해주세요)"});
				return;
			}

		}else{
			if (prodCnt == 0 && pointCnt > 0) {
				showMessageBox({message : "블루리본사은품은 장바구니에 5,000원 <br/>이상 담으셨을 경우 교환가능하세요!<br/>(상품 추가 혹은 블루리본사은품 제외 후 <br/>결제시도해주세요)"});
				return;
			}else if(pointCnt > 0 && parseInt($("input[name='i_sChkPrice']").val()) < 5000){
				showMessageBox({message : "블루리본사은품은 장바구니에 5,000원 <br/>이상 담으셨을 경우 교환가능하세요!<br/>(상품 추가 혹은 블루리본사은품 제외 후 <br/>결제시도해주세요)"});
				return;
			}
		}

		if (hasSoldOut) {
			showMessageBox({message : "선택하신 상품중에 일시품절 상품이 포함되어있어요.<br /> 일시품절 상품을 제외하고 주문해주세요."});
			return;
		}

		if (isLackOfQty) {
			showMessageBox({message : "선택하신 상품중에 재고부족 상품이 포함되어있어요.<br /> 재고부족 상품을 제외하고 주문해주세요."});
			return;
		}

		if(MobileCartUserInfo.mpoint > 0){

			if (MobileCartUserInfo.mpoint < sumPayMpoint) {
				showMessageBox({message : "블루리본 포인트 잔액이 부족해요."});
				return;
			}

		}

		if(MobileCartUserInfo.bpoint > 0){

			if (MobileCartUserInfo.bpoint < sumPayBpoint) {
				showMessageBox({message : "사용가능하신 뷰티포인트가 부족해요.<br /> 뷰티포인트 상품을 다시 확인해주세요."});
				return;
			}
		}

		if(tempList.length > 0) {

			var prePrice 	   = 0;
			var preProductcd   = 0;
			var oneplusMessage = "";
			var isonePlusFlag  = false;
			var size = tempList.length;

			for(var i=0; i<size; i++) {

				var totalCnt  = 0;
				var optionnm  = "";

				for(var j=0; j<size; j++) {

					if(tempList[i].productcd == tempList[j].productcd && tempList[i].price == tempList[j].price){

						optionnm += "["+tempList[j].optionnm+"]";

						totalCnt += parseInt(tempList[j].cnt);
					}

				}

				var obj = onePlusCheck(totalCnt, tempList[i].onePlusBuyCnt, tempList[i].onePlusGiveCnt);

				if(parseInt(obj.buyGapCnt) > 0 && ((prePrice != tempList[i].price && preProductcd == tempList[i].productcd) || preProductcd != tempList[i].productcd)) {
					isonePlusFlag = true;

					oneplusMessage += optionnm+"상품은 <em class=\"f_st2\">" +tempList[i].onePlusBuyCnt + "+" + tempList[i].onePlusGiveCnt + "</em> 행사 상품입니다. <em class=\"f_st2\">" + obj.buyGapCnt + "</em>개를 더 구매하시면 할인이 적용됩니다.<br/>현재 선택하신 수량은 " +tempList[i].onePlusBuyCnt + "+" + tempList[i].onePlusGiveCnt + "행사의 적용을 받지 못합니다.";

				}else if(parseInt(obj.giveGapCnt) > 0 && ((prePrice != tempList[i].price && preProductcd == tempList[i].productcd) || preProductcd != tempList[i].productcd)) {
					isonePlusFlag = true;
					oneplusMessage += optionnm+"상품은 <em class=\"f_st2\">" +tempList[i].onePlusBuyCnt + "+" + tempList[i].onePlusGiveCnt + "</em> 행사 상품입니다. <em class=\"f_st2\">" + obj.giveGapCnt + "</em>개를 더 구매하셔도 같은 가격이 적용됩니다.<br/>현재 선택하신 수량은 " +tempList[i].onePlusBuyCnt + "+" + tempList[i].onePlusGiveCnt + "행사의 적용을 받지 못합니다.";
				};

				prePrice  = tempList[i].price;
				preProductcd   = tempList[i].productcd;

			}

    		if(isonePlusFlag){

    			showConfirmBox({
    				message : oneplusMessage+"</br><span style='color:red;'>상품재고가 부족할 시에는 할인 혜택을 받지 못하실 수 있어요.</span><br /> 계속 구매를 진행하시겠어요?"
    				, ok_func : function() {
    					MobileCartList.makeVipgiftParameter();
    					MobileCartList.goOrder();
    				}
    			});

    			return;
    		}

			// TODO : CLUB AP 관련 삭제
			if (prodCnt > 0) {

				var vipgift = MobileCartList.makeVipgiftParameter();

				if (MobileCartUserInfo.vipgift_freeCnt > 0 && vipgift.cnt == 0) {

					showConfirmBox({

						message : "CLUB AP 혜택을 선택하지 않으셨어요.<br /> 계속 구매를 진행하시겠어요?"
						, ok_func : function () {

							MobileCartList.goOrder();

						}
						, cancel_func : function () {

						}
					});

					return;
				}
			}

		}else{

			if (prodCnt > 0) {

				var vipgift = MobileCartList.makeVipgiftParameter();

				if (MobileCartUserInfo.vipgift_freeCnt > 0 && vipgift.cnt == 0) {

					showConfirmBox({

						message : "CLUB AP 혜택을 선택하지 않으셨어요.<br /> 계속 구매를 진행하시겠어요?"
						, ok_func : function () {

							MobileCartList.goOrder();

						}
						, cancel_func : function () {

						}
					});

					return;
				}
			}

		}

		MobileCartList.goOrder();

	}
	, sum : function () {

		var arrTr = $(".cartBox");
		var size = arrTr.size();

		var isDeliveryToday = false;

		var price, sale_price, beauty_price;
		var cnt;
		var mPointflag = "";
		var bpoint_per = 0;
		var mpoint_per = 0;

		var sumPayPrice = 0;
		var sumPayPriceAll = 0;

		var sumDisPrice = 0;
		var sumPayMpoint = 0;
		var sumSaveBpoint = 0;
		var sumNeedBpoint = 0;
		var sumSaveMpoint = 0;
		var deliveryPrice = 0;

		var sum_zero_point_price = 0;
		var sum_zero_mpoint_price = 0;

		var cart_cnt         = 0;	// 상단 장바구니 수량 계산용
		var product_temp     = "";  // 1+1 전 구매 상품.
		var preCnt_temp      = 0;   // 1+1 전 구매 상품 갯수.
		var pre_price_temp   = 0;
		for (var i = 0; i < size; i++) {

			price 			= fnOnlyNumber($(".span_price", arrTr.eq(i)).text()).number;
			sale_price		= fnOnlyNumber($(".span_sale_price", arrTr.eq(i)).text()).number;
			beauty_price    = fnOnlyNumber($(".span_beauty_price", arrTr.eq(i)).text()).number;
			qtyCnt			= fnOnlyNumber($(".span_stockqty", arrTr.eq(i)).text()).number;

			var save_mpoint = 0;
			var save_mpoint_per = 0;
			var dis_price = price - sale_price;
			var onePlusBuyCnt   = fnOnlyNumber($(".span_oneplus_buy_cnt", arrTr.eq(i)).text()).number;
			var onePlusGiveCnt  = fnOnlyNumber($(".span_oneplus_give_cnt", arrTr.eq(i)).text()).number;
			var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;

			var dayoffStockqty  = fnOnlyNumber($(".span_dayoff_stockqty",arrTr.eq(i)).text()).number;
			var dayoffcd		= $(".span_dayoffcd",arrTr.eq(i)).text();

		    if(dayoffStockqty > 0 && dayoffcd !="undefined"){

			   sale_price		= fnOnlyNumber($(".span_today_price", arrTr.eq(i)).text()).number;

		    }

			cnt				= fnOnlyNumber($("*[name='i_arrProductCnt']", arrTr.eq(i)).val()).number;

			var productcd   = $("*[name='i_arrProductcd']", arrTr.eq(i)).val();

			mPointflag	= $(".span_mpoint_per",arrTr.eq(i)).text();
			mpoint_per	= mPointflag.substring(mPointflag.indexOf("_")+1);

			if(mPointflag.indexOf("PER_")>-1){

				save_mpoint_per	= MobileCartUserInfo.isLogin ? fnOnlyNumber(mpoint_per).number : 0;

			}else{

				save_mpoint		= MobileCartUserInfo.isLogin ? fnOnlyNumber(mpoint_per).number : 0;

			}

			if(isonePlusFlag){

				var list = [];
				var onplus_sale_price = 0;

				var totalCnt = 0;
				var preCnt = 0;

				var cnt_object     = $("input[name='i_arrProductCnt']",arrTr);
				var product_object = $("input[name='i_arrProductcd']",arrTr);
				var flagEvent	   = $("input[name='i_arrFlagEvent']",arrTr);
				var price_object   = $(".span_price", arrTr);
				var cntSize        = cnt_object.size();

				for(var j=0; j<cntSize; j++){

					var price_object_val = fnOnlyNumber(price_object.eq(j).text()).number;

					if(productcd == product_object.eq(j).val() && price == price_object_val){

						if(flagEvent.eq(j).val() == "Y"){
							totalCnt += parseInt(cnt_object.eq(j).val());
						}
					}

				}

				if(product_temp != productcd || (pre_price_temp != price && product_temp == productcd)){
					preCnt_temp = 0;
				}

				preCnt_temp += cnt;

				if(product_temp != productcd || (pre_price_temp != price && product_temp == productcd)){

					preCnt = 0;

				}else{

					preCnt = preCnt_temp - cnt;
				}

				list.push({cnt: cnt, preCnt : preCnt, index : i});

				var obj    = onePlusPriceResult(totalCnt, price, onePlusBuyCnt, onePlusGiveCnt, list);

				var objCnt = onPlusCount(totalCnt, preCnt, cnt ,onePlusBuyCnt, onePlusGiveCnt);
				var nopluscnt = 0;
				if(obj.length > 0) {

					for(var j=0; j<obj.length; j++) {

						onplus_sale_price += parseInt(obj[j].price * obj[j].cnt);
						if(obj[j].price == price){
							nopluscnt++;
						}

					}

				}

				product_temp   = productcd;
				pre_price_temp = price;

				if ($("input[type='checkbox']", arrTr.eq(i)).prop("checked")) {

	    			sumPayPrice 	+= onplus_sale_price;
	    			sumDisPrice		+= (price * cnt) - onplus_sale_price;

        			bpoint_per = fnOnlyNumber($(".span_bpoint_per", arrTr.eq(i)).text()).number;

        			if($("#i_sTodayDt").val() >= 20151001){
        				if(nopluscnt > 0){
            				sumSaveBpoint	+= Math.round((onplus_sale_price - sumDisPrice) * bpoint_per / 100);
            			}else{
            				sum_zero_point_price += onplus_sale_price;
            				sumSaveBpoint	+= 0;
            			}
        			}else{
        				sumSaveBpoint	+= Math.round(onplus_sale_price * bpoint_per / 100);
        			}

    				sumSaveMpoint 	+= Math.round((save_mpoint * objCnt.buyCnt) / cnt) * cnt + Math.round(onplus_sale_price * save_mpoint_per / 100);
    				sumNeedBpoint   += 0;

				}

				sumPayPriceAll += onplus_sale_price;
				$(".row_sale_price", arrTr.eq(i)).text(SetNumComma(onplus_sale_price));

				if(price * cnt == onplus_sale_price){

					// $(".row_pay_price", arrTr.eq(i)).parents("dl").find(".sale").remove();
					// $(".row_pay_price", arrTr.eq(i)).parents("dd").remove();
					$(".row_pay_price", arrTr.eq(i)).parents("del").remove();

				}else{

					// $(".row_pay_price", arrTr.eq(i)).text(SetNumComma((price * cnt) - onplus_sale_price));
					$(".row_pay_price", arrTr.eq(i)).text(SetNumComma(price * cnt));

				}

			}else{

				if ($("input[type='checkbox']", arrTr.eq(i)).prop("checked")) {

	    			if("Y" == $("input[name='i_arrFlagBeauty']", arrTr.eq(i)).val()){

	    				sumSaveBpoint	+= 0;
	    				sumSaveMpoint 	+= 0;
	    				sumNeedBpoint   += beauty_price * cnt;

		    			sumPayPrice 	+= beauty_price * cnt;
		    			sumDisPrice		+= 0;

						$(".row_sale_price", arrTr.eq(i)).text(SetNumComma(beauty_price * cnt));
						$(".row_pay_price", arrTr.eq(i)).text(SetNumComma(beauty_price * cnt));
	    			}else{

	        			bpoint_per 		 = fnOnlyNumber($(".span_bpoint_per", arrTr.eq(i)).text()).number;

	        			if(dayoffStockqty > 0 && dayoffcd !="undefined"){
		    				sumSaveBpoint	+= 0;
		    				sumSaveMpoint 	+= 0;
		    				sum_zero_point_price += sale_price;
		    				sum_zero_mpoint_price += sale_price;

	        			}else{
	        				if(dis_price > 0){
								if(MobileCartUserInfo.levelcd == "LV15" || MobileCartUserInfo.levelcd == "LV16" || MobileCartUserInfo.levelcd == "LV17" || MobileCartUserInfo.levelcd == "LV18" || MobileCartUserInfo.levelcd == "LV19" || MobileCartUserInfo.levelcd == "LV20"){
									var saleRate = (price - sale_price) * 100 / price;
									if(saleRate == 10){
										if(bpoint_per != 0){
											sumSaveBpoint += Math.round(sale_price * bpoint_per / 100) * cnt;
										}
									}else{
										sumSaveBpoint	+= 0;
			        					sum_zero_point_price += sale_price;									}
								}else{
									sumSaveBpoint	+= 0;
		        					sum_zero_point_price += sale_price;								}
	        				}else{
	        					sumSaveBpoint	+= Math.round(sale_price * bpoint_per / 100) * cnt;
	        				}
		    				sumSaveMpoint 	+= save_mpoint * cnt + Math.round(sale_price * save_mpoint_per / 100) * cnt;
	        			}
	    				sumNeedBpoint   += 0;

		    			sumPayPrice 	+= sale_price * cnt;
		    			sumDisPrice		+= (price - sale_price) * cnt;

						$(".row_sale_price", arrTr.eq(i)).text(SetNumComma(sale_price * cnt));
						// $(".row_pay_price", arrTr.eq(i)).text(SetNumComma((price - sale_price) * cnt));
						$(".row_pay_price", arrTr.eq(i)).text(SetNumComma(price * cnt));

	    			}

				}
				sumPayPriceAll += sale_price * cnt;

			}

			cart_cnt += cnt;

		}

		//  TODO : li_pointmall_list (사은품 삭제)
		arrTr = $(".li_pointmall_list");
		size  = arrTr.size();

		for (var i = 0; i < size; i++) {
			point		= fnOnlyNumber($(".span_rebon_point", arrTr.eq(i)).text()).number;
			cnt			= fnOnlyNumber($("*[name='i_arrProductCnt']", arrTr.eq(i)).val()).number;
			qtyCnt		= fnOnlyNumber($(".span_stockqty", arrTr.eq(i)).text()).number;

			if ($("input[type='checkbox']", arrTr.eq(i)).prop("checked")) {
				sumPayMpoint += point * cnt;
			}
		}

		// 배송비 계산
		if (isDeliveryToday) {
			if (MobileCartDelivery.cash_today_limit > 0 && sumPayPrice >= MobileCartDelivery.cash_today_limit) {
				MobileCartDeliveryPrice = 0;
			}
			else {
				deliveryPrice = MobileCartDelivery.cash_today;
			}
		}
		else {
			if (MobileCartDelivery.cash_buy_limit > 0 && sumPayPrice >= MobileCartDelivery.cash_buy_limit) {
				deliveryPrice = 0;
			}
			else {
				deliveryPrice = MobileCartDelivery.cash_buy;
			}
		}

		$(".sum_dis_price").text(SetNumComma(sumDisPrice));
		$(".delivery_price").text(SetNumComma(deliveryPrice));
		$(".sum_pay_price").text(SetNumComma(sumPayPrice + deliveryPrice));
		$(".prev_sum_rebon_point").text(SetNumComma(sumPayMpoint));
		$(".sum_pay_mpoint").text(SetNumComma(sumPayMpoint));
		$(".sum_pay_product_price").text(SetNumComma(sumPayPrice - sumNeedBpoint + sumDisPrice));

		$(".sum_need_bpoint").text(SetNumComma(sumNeedBpoint));
		$(".sum_save_bpoint").text(SetNumComma(sumSaveBpoint));
		$(".sum_save_mpoint").text(SetNumComma(sumSaveMpoint));

		if(sumSaveBpoint > 0){
			$(".sum_save_bpoint_per").text(Math.round((sumSaveBpoint * 100)/(sumPayPrice - sumNeedBpoint - sum_zero_point_price)*10)/10);
		}else{
			$(".sum_save_bpoint_per").text("0");
		}

		if(sumSaveMpoint > 0){
			$(".sum_save_mpoint_per").text(Math.round((sumSaveMpoint * 100)/(sumPayPrice - sumNeedBpoint - sum_zero_mpoint_price)*10)/10);
		}else{
			$(".sum_save_mpoint_per").text("0");
		}

		$("input[name='i_sAllPrice']").val(sumPayPriceAll);
		$("input[name='i_sChkPrice']").val(sumPayPrice);

	}
	, clearForm : function () {
		var frm = $("form[name='frm_payment']");
		$("input", frm).remove();
	}
	, goOrder : function () {
		var frm = $("form[name='frm_payment']");
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
		frm.attr("action", GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1.do");
		frm.submit();
	}
	, makeParameter : function (tr,flag) {
		var frm = $("form[name='frm_payment']");

		var data  = {
			productcd 		: ""
			, optioncd 		: ""
			, productTypecd	: ""
			, productCnt 	: ""
			, setdiycd 		: ""
			, setdiyKey 	: ""
			, flagUseSole   : ""
		};

		if(flag == "product"){

			data.productcd 		= $("*[name='i_arrProductcd']", tr).val();
			data.optioncd 		= $("*[name='i_arrOptioncd']", tr).val();
			data.productTypecd	= $("*[name='i_arrProductTypecd']", tr).val();
			data.productCnt 	= $("*[name='i_arrProductCnt']", tr).val();
			data.setdiycd 		= $("*[name='i_arrSetdiycd']", tr).val();
			data.setdiyKey 		= $("*[name='i_arrSetdiyKey']", tr).val();
			data.flagUseSole    = $("*[name='i_arrFlagUseSolo']",tr).val();


		}else if(flag == "point"){

			data.productcd 		= $(".span_rebon_productcd", tr).text();
			data.optioncd 		= $(".span_rebon_optioncd", tr).text();
			data.productTypecd	= $(".span_rebon_typecd", tr).text();
			data.productCnt 	= $("*[name='i_arrProductCnt']", tr).val();
			data.setdiycd 		= "";
			data.setdiyKey 		= "";

		}

		var arrHtml = [];

		arrHtml.push("<input type='hidden' name='i_arrProductcd' value='" + data.productcd + "' />");
		arrHtml.push("<input type='hidden' name='i_arrOptioncd' value='" + data.optioncd + "' />");
		arrHtml.push("<input type='hidden' name='i_arrProductTypecd' value='" + data.productTypecd + "' />");
		arrHtml.push("<input type='hidden' name='i_arrProductCnt' value='" + data.productCnt + "' />");
		arrHtml.push("<input type='hidden' name='i_arrSetdiycd' value='" + data.setdiycd + "' />");
		arrHtml.push("<input type='hidden' name='i_arrSetdiyKey' value='" + data.setdiyKey + "' />");
		arrHtml.push("<input type='hidden' name='i_arrFlagUseSolo' value='" + data.flagUseSole + "' />");

		$(arrHtml.join("")).appendTo(frm);
	}
	// TODO: CLUB AP 관련 삭제
	, makeVipgiftParameter : function () {
		var frm = $("form[name='frm_payment']");

		var arrTr = $("#em_vip_select_list").find("em");
		var size = arrTr.size();
    	var arrHtml = [];
    	var data = {};
    	var point = 0;

		for (var i = 0; i < size; i++) {

    		data  = {
    			productcd 		: $("*[name='i_arrVipGiftProductcd']", arrTr.eq(i)).val()
    			, optioncd 		: $("*[name='i_arrVipGiftOptioncd']", arrTr.eq(i)).val()
    		};

    		point += fnOnlyNumber($(".span_point", arrTr.eq(i)).text()).number;

    		arrHtml.push("<input type='hidden' name='i_arrVipGiftProductcd' value='" + data.productcd + "' />");
    		arrHtml.push("<input type='hidden' name='i_arrVipGiftOptioncd' value='" + data.optioncd + "' />");
		}

		$(arrHtml.join("")).appendTo(frm);

		var rtn = {
			point : point
			, cnt : size
		};

		return rtn;
	}
	// TODO : 블루리본 관련 삭제
	,blueRebonSetPayment : function(obj,isSetFlag,value){

		   var productcd  	= $(".span_rebon_productcd",obj).text();
		   var optioncdcd 	= $(".span_rebon_optioncd",obj).text();
		   var cartSeqNo 	= $(".span_rebon_seqno",obj);
		   var cartcd 		= $(".span_rebon_cartcd",obj);

		   var productCnt 	= fnOnlyNumber($("input[name='i_arrProductCnt']",obj).val()).number;

		   var list  = [];
		   var target   = $("#em_blue_select_list");

		   if(isSetFlag){

			   $(".selectNum2",obj).show();
			   $(".selectBox3",obj).show();
			   $("input[name='i_arrProductCnt']",obj).show();

			   var productNm = $(".prodNm", obj).text();
			   var capacity = $(".ml", obj).text();
			   var productcd = $(".span_rebon_productcd", obj).text();

			   var arrHtml = new Array();
			   if($(".em_"+productcd).size() <= 0){
				   arrHtml.push("<em class='em_"+productcd+" style='display:block;'>");

				   if(capacity !=""){
					   arrHtml.push("	*"+productNm+""+capacity+"을 선택하였습니다.");
				   }else{
					   arrHtml.push("	*"+productNm+"을 선택하였습니다.");
				   }
				   arrHtml.push("<br/>");
				   arrHtml.push("</em>");

				   target.html(target.html()+arrHtml.join(""));
			   }
			   target.show();

			    if(value == "BASKET" || value == "ADMIN"){

					list.push({
						"productcd" : productcd
						, "optioncd" : optioncdcd
						, "cnt" : productCnt
					});

					MobileBodyStart.addUserCart({
						list : list
						, flagPlus : "Y"
						, callback : function (vo) {
							cartcd.text(vo.v_cartcd);
							cartSeqNo.text(vo.n_seqno);
						}
					});
			    }

		   }else{

			   var productcd = $(".span_rebon_productcd", obj).text();
			   $(".selectNum2",obj).hide();
			   $(".selectBox3",obj).hide();
//			   $("input[name='i_arrProductCnt']",obj).hide();
			   $("input[name='i_arrProductCnt']",obj).val(1);

				list.push({
					cartcd : cartcd.text()
					, seqno : cartSeqNo.text()
				});

			   MobileBodyStart.removeUserCart({list : list,
					callback : function() {

					}
				});

			   $(".em_"+productcd+"").remove();
			   if(target.find("em").length == 0){
				   target.hide();
			   }
		   }
	}
	, addWish : function (obj,target) {

		var tr = obj.parents(".tr_cart_list").eq(0);

		var productcd = $("*[name='i_arrProductcd']", tr).val();
		var optioncd  = $("*[name='i_arrOptioncd']", tr).val();
		var flagUseSolo  = $("*[name='i_arrFlagUseSolo']",tr).val();
		var cnt = $("*[name='i_arrProductCnt']", tr).val();
		var productnm = $("*[name='i_arrProductnm']", tr).val();
		var brandnm = $("*[name='i_arrBrandnm']", tr).val();
		var tagPrice = $("*[name='i_arrTagPrice']", tr).val();
		var tagSalePrice = fnOnlyNumber($(".span_sale_price", tr).text()).number;
		var tagCategory = $("*[name='i_arrTagCategory']", tr).val();
		var brandcd = $("*[name='i_arrBrandcd']", tr).val();

		if(IS_LOGIN || IS_LOGIN_SNS) {
			//SmartOffer - 개인화 추천 태깅 (위시리스트 담기)
	    	try{
	        	var wishList = [];
	        	var list_price = parseInt(tagPrice);
				var price = parseInt(tagSalePrice);
				var productCnt = parseInt(cnt);
	    		wishList.push({
	    			  ITEM_VALUE : productcd
	    			, name : productnm
	    			, brand  : brandcd
	    			, category : tagCategory
	    			, price : Number(list_price * productCnt)
	    			, qty   : productCnt
	    			, prodOptionCode : optioncd
	    			, discountPrice : Number(price * productCnt)
	    		});
	    		wishListTagEvent(wishList,'MOBILE');
	    	}catch(e){}

			var list = [{
				  productcd : productcd
				, optioncd : optioncd
				, cnt : cnt
				, productnm : productnm
				, brandnm : brandnm
			}];

			MobileBodyStart.addUserWish({
				list : list
				, sourceFlag : "BASKET"
				, flagSoloPack : flagUseSolo
				, callback : function(){

//					balloonOpen(obj);
					showConfirmBox({
						message : "위시리스트에 상품이 담겼습니다.",
						ok_str  : "위시리스트로 이동",
						cancel_str  : "계속 쇼핑하기",
						ok_func : function(){
							location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
						}


					});

				}
			});

		}
		else {
			showConfirmBox({
				message : "위시리스트에 상품을 담으려면 로그인이 필요해요.<br /> 로그인 하시겠어요?"
				, ok_str : "로그인 하기"
				, ok_func : function() {
					MobileBodyStart.goLogin();
				}
			});
		}
	},
	setOptionSelect : function(prodcd, optcd) {

		var optTarget = $("#cartBox_"+prodcd);

		// var cnt_object     = $("input[name='i_arrProductCnt']",optTarget);
		// var optionPrice =  fnOnlyNumber($(".row_sale_price", optTarget).text()).number;

		var optioncd  = $("input[name='i_arrOptioncd_"+optcd+"']").val();
		var optionnm = "";
		var optionstock = "";
		var optionstatus = "";
		var optionCnt = "";
		var productCnt = "";
		var disUnit = "";
		var disPrice = $("input[name='i_arrTagPrice']", optTarget).val();
		var flagBeauty = $("input[name='i_arrFlagBeauty']", optTarget).val();
		var salePrice = $(".row_sale_price", optTarget).text();

		var unit = "원";
		var color = "";

		optionCnt  = $("input[name='i_arrOptionCnt']", optTarget).val();

		// TODO : color 에서 class 지정으로 바뀔 수 있음
		if(flagBeauty == "Y"){
			unit = "P";
			color = "color: #ea5279";
		}

		if (optioncd == undefined) {
			optioncd  = $("input[name='i_arrOptioncd']", optTarget).val();
			optionnm  = $("input[name='i_arrOptionnm']", optTarget).val();
			productCnt  = $("input[name='i_arrProductCnt']", optTarget).val();
			optionstock  = $("input[name='i_arrOptionstock']", optTarget).val();
			optionstatus  = $("input[name='i_arrOptionstatus']", optTarget).val();
		} else {
			optionnm  = $("input[name='i_arrOptionnm_"+optcd+"']").val();
			optionstock  = $("input[name='i_arrOptionstock_"+optcd+"']").val();
			optionstatus  = $("input[name='i_arrOptionstatus_"+optcd+"']").val();
			productCnt  = $("input[name='i_arrProductCnt']", optTarget).val();
		}
		var optHtml = "";
		if (optionstock != undefined) {
			optHtml += "<div class=\"optslt_area\">"
						 + 		"<button type=\"button\" class=\"btn_slt\" id=\"btnOptOpen\">"+optionnm+"</button>"
						 + 	"</div>";
		}
			optHtml +=		"<div class=\"slted_area\" id="+prodcd+">"
					 +		'	<div class="item">'
					 +		"		<p class=\"prod_nm ellipsis\">"+optionnm+"</p>"
					 +		'		<div class="info">'
					 +		'			<div class="amount_area">'
					 +		'				<div class="amount">'
					 +		"					<input type=\"text\" id='optCnt' value="+productCnt+" maxlength=\"3\">"
					 +		"					<button type=\"button\" class=\"btn_omit\" id=\"minus_"+prodcd+"\"><i class=\"i-shop minus\">감소</i></button>"
					 +		"					<button type=\"button\" class=\"btn_add\" id=\"plus_"+prodcd+"\"><i class=\"i-shop plus\">증가</i></button>"
					 +		'				</div>'
					 +		'			</div>'
					 +		'			<div class="price_area">'
					 +		"				<strong class=\"price\" style='"+color+"'><span id='option_change_price'>"+salePrice+"</span>"+unit+"</strong>"
					//  +		"				<del class='base'><span class='row_pay_price'>0</span>원"
					 +		'			</div>'
					 +		'		</div>'
					 +		'	</div>'
					 +		'</div>';

	 $('#scrl_opts_wrap').html(optHtml);

	 var optioncdtemp  = $("input[name='i_arrOptioncd_temp']", optTarget);
	 var optionnmtemp  = $("input[name='i_arrOptionnm_temp']", optTarget);
	 var optionstocktemp  = $("input[name='i_arrOptionstock_temp']", optTarget);
	 var optionstatustemp  = $("input[name='i_arrOptionstatus_temp']", optTarget);
	 var optionPricetemp  = $("input[name='i_arrOptionPrice_temp']", optTarget);
   var statuscd      = $("input[name='i_arrStatuscd']", optTarget);
	 var featureTag    = $("input[name='i_arrFeatureTag']", optTarget);
	 var productcd	  = $("input[name='i_arrProductcd']", optTarget);

	//  var productnm	  = $("input[name='i_arrProductnm']",productTr.eq(i));
	//  var productImg 	  = $("input[name='i_arrProductImg']",productTr.eq(i));
	//  var productCnt 	  = $("input[name='i_arrProductCnt']",productTr.eq(i));
	//  var beautyFlag    = $("input[name='i_arrFlagBeauty']",productTr.eq(i));
	//  var flagSolo 	  = $("input[name='i_arrFlagSolo']",productTr.eq(i));
	//  var flagUsesolo   = $("input[name='i_arrFlagUseSolo']",productTr.eq(i));
	//  var flagEvent     = $("input[name='i_arrFlagEvent']",productTr.eq(i));
	//  var optionnm   	  = $("input[name='i_arrOptionnm']",productTr.eq(i));
	//  var optioncd   	  = $("input[name='i_arrOptioncd']",productTr.eq(i));
	//  var optionCnt     = $("input[name='i_arrOptionCnt']",productTr.eq(i));
	//  var statuscd      = $("input[name='i_arrStatuscd']",productTr.eq(i));
	//  var brandnm   	  = $("input[name='i_arrBrandNm']",productTr.eq(i));
	//  var featureTag    = $("input[name='i_arrFeatureTag']",productTr.eq(i));

	 var arrOptionHtml = [];
	 if(optionCnt > 1){
		 var soldoutClass = "";
		 var soldout = "";
		 var soldoutCnt = 0;

		 arrOptionHtml.push("<ul class=\"list\" id="+prodcd+">")
		for (var n=0; n < optioncdtemp.size(); n++){
			if (parseInt(optionstocktemp.eq(n).val()) <= 0 || optionstatustemp.eq(n).val() != '0001') {
				 soldoutClass = "disabled";
				 soldout = "(일시품절)";
				 soldoutCnt++;
			 } else {
				 soldoutClass = "";
				 soldout = "";
			 }
			 // 옵션 그리기
			 arrOptionHtml.push('<li class="'+soldoutClass+'" id="'+optioncdtemp.eq(n).val()+'">');
			 arrOptionHtml.push('	<a href="#none" onclick="ShopOptBox.$baseBox.addClass(\'open\');ShopOptBox.$optBox.removeClass(\'open trans300ms\');">');
			 arrOptionHtml.push('		<div class="opt_nm">' + optionnmtemp.eq(n).val() + soldout + '</div>');
			 arrOptionHtml.push('		<div class="price_area">')
			 arrOptionHtml.push('			<strong class="price"><span>'+SetNumComma(optionPricetemp.eq(n).val())+'</span>원</strong>');

			 arrOptionHtml.push('		</div>');
			 arrOptionHtml.push('	</a>');
			 arrOptionHtml.push('</li>');

			// var option_selected = optioncdtemp.eq(n).val() == optioncd.val() ? 'selected=selected' : '';
			//
			// arrOptionHtml.push("				<option value='"+optioncdtemp.eq(n).val()+"'"+option_selected+">");
			// arrOptionHtml.push("					"+optionnmtemp.eq(n).val()+"");
			//
			// if(parseInt(optionstocktemp.eq(n).val()) <= 0 || optionstatustemp.eq(n).val() != '0001'){
			//
			// arrOptionHtml.push("					  (일시품절)");
			//
			// }
			// arrOptionHtml.push("					  "+soldout+"");
			//
			// arrOptionHtml.push("				</option>");

		}
		arrOptionHtml.push('</ul>');


		 for(var n=0; n<optioncdtemp.size(); n++){
			arrOptionHtml.push("<input type='hidden' name='"+optioncdtemp.eq(n).val()+"_status' value='"+optionstatustemp.eq(n).val()+"'/>");
		}
		 arrOptionHtml.push("		</div>");

	 }else{

		 if(featureTag.val().indexOf("DG_P003") > -1 || featureTag.val().indexOf("DG_P004") > -1){

			if(statuscd.val() != "0001"){

			 soldout = "(일시품절)";
			}

			 arrOptionHtml.push('<li class="'+soldoutClass+'" id="'+optioncd+'">');
			 arrOptionHtml.push('	<a href="#none" onclick="ShopOptBox.$baseBox.addClass(\'open\');ShopOptBox.$optBox.removeClass(\'open trans300ms\');">');
			 arrOptionHtml.push('		<div class="opt_nm">' + optionnm + soldout + '</div>');
			//  arrOptionHtml.push('		<div class="price_area">')
			//  arrOptionHtml.push('			<strong class="price"><span>'+SetNumComma(optionPricetemp.eq(n).val())+'</span>원</strong>');
			 //
			//  arrOptionHtml.push('		</div>');
			 arrOptionHtml.push('	</a>');
			 arrOptionHtml.push('</li>');

		 }else{

			 arrOptionHtml.push("		<input type='hidden' id='' name='i_arrOption_temp' value='"+optioncd+"'>");
		 }

	 }
	 $("#listOptScroll").html(arrOptionHtml.join(""));




	 MobileCartList.addProductCntEvent();
	 MobileCartList.addOptionEvent();


	},

	setOnePlusPrice : function(price, prodcd) {
		var target = $("#cartBox_"+prodcd);
		var onePlusBuyCnt = parseInt($(".span_oneplus_buy_cnt", target).text());
		var onePlusGiveCnt = parseInt($(".span_oneplus_give_cnt", target).text());
		//
		// var list = [];
		// var totalCnt = 0;
		//
		// var preCnt = 0;
		// $("input[name='i_arrProductCnt']").each(function(i) {
		// 	if(!$(this).is(":disabled")) {
		// 		var optioncd = $("input[name='i_arrOptioncd']").eq(i).val();
		// 		var prodcd = $("input[name='i_arrProductcd']").eq(i).val();
		// 		// var optionInfo = $("#cartBox_"+prodcd);
		// 		var optionPrice = $(".span_sale_price", target).text();
		// 		if(optionPrice == price) {
		// 			totalCnt += parseInt($(this).val());
		//
		// 			if(i == 0) {
		// 				preCnt = 0;
		// 			} else {
		// 				preCnt = totalCnt - parseInt($(this).val());
		// 			}
		//
		// 			list.push({cnt: $(this).val(), preCnt : preCnt, index : i});
		// 		}
		// 	}
		// });
		//
		// var obj = onePlusPriceResult(totalCnt, price, productbuyCnt, productgiveCnt, list);
		//
		// var totalSum = 0;
		// if(obj.length > 0) {
		// 	$("#option_change_price").each(function(idx) {
		// 		var sum = 0;
		// 		for(var i=0; i<obj.length; i++) {
		// 			if(idx == obj[i].index) {
		// 				sum += (parseInt(obj[i].price) * obj[i].cnt);
		// 				$("#option_change_price").eq(obj[i].index).text(SetNumComma(sum));
		// 			}
		// 		}
		//
		// 		totalSum = sum;
		// 	});
		// }
		//
		// return totalSum;

		var list = [];
		var onplus_sale_price = 0;

		var totalCnt = 0;
		var preCnt = 0;
		var product_temp     = "";  // 1+1 전 구매 상품.
		var preCnt_temp      = 0;   // 1+1 전 구매 상품 갯수.
		var pre_price_temp   = 0;
		var cnt;

		var cnt_object     = $("input[name='i_arrProductCnt']",target);
		var product_object = $("input[name='i_arrProductcd']",target);
		var flagEvent	   = $("input[name='i_arrFlagEvent']",target);
		var price_object   = $(".span_price", target);
		var cntSize        = cnt_object.size();
		var price 			= fnOnlyNumber($(".span_price", target).text()).number;

		for (var j=0; j<cntSize; j++){

			var price_object_val = fnOnlyNumber(price_object.eq(j).text()).number;

			if(prodcd == product_object.eq(j).val() && price == price_object_val){

				if(flagEvent.eq(j).val() == "Y"){
					totalCnt += parseInt(cnt_object.eq(j).val());
				}
			}
		}

		cnt	= fnOnlyNumber($("*[name='i_arrProductCnt']", target).val()).number;

		if(product_temp != prodcd || (pre_price_temp != price && product_temp == prodcd)){
			preCnt_temp = 0;
		}

		preCnt_temp += cnt;

		if(product_temp != prodcd || (pre_price_temp != price && product_temp == prodcd)){

			preCnt = 0;

		}else{

			preCnt = preCnt_temp - cnt;
		}

		list.push({cnt: cnt, preCnt : preCnt, index : i});

		var obj    = onePlusPriceResult(totalCnt, price, onePlusBuyCnt, onePlusGiveCnt, list);

		var objCnt = onPlusCount(totalCnt, preCnt, cnt ,onePlusBuyCnt, onePlusGiveCnt);
		var nopluscnt = 0;
		if(obj.length > 0) {

			for(var j=0; j<obj.length; j++) {

				onplus_sale_price += parseInt(obj[j].price * obj[j].cnt);
				if(obj[j].price == price){
					nopluscnt++;
				}

			}

		}
		product_temp   = prodcd;
		pre_price_temp = price;

		return onplus_sale_price;

	},
	/**
	 * 상품 수량 +, - 조절
	 */
	addProductCntEvent : function() {
		$(".btn_omit").unbind("click").click(function(event) {
			event.preventDefault();

			var idx = $(".btn_omit").index($(this));
			var prodcd = $(this).attr("id").replace("minus_", "");

			// var optioninfo = $("#span_option_" + optioncd);
			var optioninfo = $("#cartBox_"+prodcd);

			var dc_prc = parseInt($(".span_sale_price", optioninfo).text());
			var dayoffcd = $(".span_dayoffcd", optioninfo).text();
			// var flagEvent = $(".span_flag_event", optioninfo).text();
			var flagEvent = $("input[name='i_arrFlagEvent']", optioninfo).val();
			var onePlusBuyCnt = parseInt($(".span_oneplus_buy_cnt", optioninfo).text());
			var productCnt = parseInt($("input[name='i_arrProductCnt']", optioninfo).val());

			if(productCnt != 1) {
				var cnt =	productCnt - 1;
				var minusPrice = 0;
				var originPrice = $(".span_price", optioninfo).text();
				var dayoffStockqty = $(".span_dayoff_stockqty", optioninfo).text();

				// 변경된 상품 갯수 셋팅
				$("input[name='i_arrProductCnt']", optioninfo).val(cnt);

				if (onePlusBuyCnt > 0 && flagEvent == "Y") {
					minusPrice = MobileCartList.setOnePlusPrice(dc_prc, prodcd);
				} else {
					if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
						minusPrice = dc_prc * cnt;
					} else {
						minusPrice = parseInt(originPrice)  * cnt;
					}

				}
				$("#option_change_price").text(SetNumComma(minusPrice));

				// $(".span_wishCnt").eq(idx).text(cnt);
				$("#optCnt").val(cnt);
			}

			// MobileCartList.sum();
		});

		$(".btn_add").unbind("click").click(function(event) {
			event.preventDefault();

			var idx = $(".btn_add").index($(this));
			var prodcd = $(this).attr("id").replace("plus_", "");

			var optioninfo = $("#cartBox_" + prodcd);
			var dc_prc = parseInt($(".span_sale_price", optioninfo).text());

			var productCnt = parseInt($("input[name='i_arrProductCnt']", optioninfo).val());
			var maxCnt = parseInt($(".span_max_cart_cnt", optioninfo).text());
			var stockqty = parseInt($(".span_stockqty", optioninfo).text());
			var dayoffcd = $(".span_dayoffcd", optioninfo).text();
			var flagEvent = $("input[name='i_arrFlagEvent']", optioninfo).val();
			var onePluseCnt = parseInt($("input[name='i_arrOnpluBuyCnt']", optioninfo).val());

			if (productCnt + 1 <= maxCnt && productCnt + 1 <= stockqty) {
				var cnt = productCnt +1;
				var plusPrice = 0;
				var originPrice = parseInt($(".span_price", optioninfo).text());
				var dayoffStockqty = parseInt($(".span_dayoff_stockqty", optioninfo).text());

				if ((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0)) {
					if (cnt <= dayoffStockqty) {
						plusPrice = dc_prc * cnt;

						$("input[name='i_arrProductCnt']", optioninfo).val(cnt);
						$("#option_change_price").text(SetNumComma(plusPrice));
					} else {
						showMessageBox({
							message : "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요."
						});
						return;
					}
				} else {
					$("input[name='i_arrProductCnt']", optioninfo).val(cnt);
					if (onePluseCnt > 0 && flagEvent == "Y") {
						plusPrice = MobileCartList.setOnePlusPrice(dc_prc, prodcd);
					} else {
						if ((dayoffcd != undefined && dayoffcd != "") && parseInt(dayoffStockqty) < 1) {
							plusPrice = originPrice * cnt;
						} else {
							plusPrice = dc_prc * cnt;
						}

					}
					$("#option_change_price").text(SetNumComma(plusPrice));


				}

				// $(".span_wishCnt").eq(idx).text(cnt);
				$("#optCnt").val(cnt);
				// MobileCartList.sum();

			} else {
				if(productCnt+1 > maxCnt && productCnt+1 < stockqty) {
					showMessageBox({
						message : "1회 주문시의 구매제한 수량을 초과하였어요."
					});
				} else if(productCnt+1 > stockqty) {
					showMessageBox({
						message : "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요."
					});
				}
			}
		});

	},

	setCheckCountLabel : function() {
		var chkboxAllCnt = $("input[name='i_arrChkProd001']").size();
		// var chkboxAllCnt = $(".cartBox").find("input:checkbox").length;
		var chkboxCnt = $("input[name='i_arrChkProd001']:checked").size();
		var labelText = "전체선택 (" + chkboxCnt + "/" + chkboxAllCnt + ")";
		$("#chkLabel").text(labelText);
		var orderBtnLabel = "주문하기 (" + chkboxCnt + "개)";
		$("#cart_btn_payment").text(orderBtnLabel);

	}



};
