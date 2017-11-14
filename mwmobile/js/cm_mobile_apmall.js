
var MobileBodyStart = {
		 isRunningAddCart :false
		,isRunningimmediatelyPurchage : false 
		,isRunningAddWish : false
		,init : function(){

		}
		, fnLoginCheck : function ( p_option ) {
			
			var _defaults = {
				type : undefined   // page_move | reload
				, url : ""
				, param : ""
			};
			
			var options = $.extend(_defaults, p_option);
			
			if(options.type == undefined || options.type == "") {
				return;
			}
			
			if(IS_LOGIN_SNS){
				showConfirmBox({
					message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
					, ok_func : function(){
						if (options.type == "page_move") {
							document.frm_login.returnUrl.value = options.url;
							document.frm_login.returnParam.value = options.param;
						}
//						document.frm_login.submit();
						MobileBodyStart.goLoginPage();
					}
				    , cancel_func: function(){
						return ;
					}
				});
			}else{
				showConfirmBox({
					message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function() {
							if (options.type == "page_move") {
								document.frm_login.returnUrl.value = options.url;
								document.frm_login.returnParam.value = options.param;
							}
							
//							document.frm_login.submit();
							MobileBodyStart.goLoginPage();
						}
				});
			}
		}
		, fnLoginPageCheck : function ( p_option, list) {
			
			var _defaults = {
				type : undefined   // page_move | reload
				, url : ""
				, param : ""
			};
			
			var options = $.extend(_defaults, p_option);
			
			if(options.type == undefined || options.type == "") {
				return;
			}
			var frm = $("form[name='frm_login']");
			showConfirmBox({
				message : "해당서비스는 통합회원으로 로그인 하셔야 이용 가능해요."
				, ok_func : function() {
					var flagaction = list[0].flagaction;
					for(var i=0; i<list.length; i++) {
						var productcd = list[i].productcd;
						var optioncd  = list[i].optioncd;
						var cnt = list[i].cnt;
						var flagsolopack = list[i].flagSoloPack;
						
		        		var inp1 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrProductcd"}).val(productcd);
						var inp2 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrOptioncd"}).val(optioncd);
						var inp3 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrOptioncnt"}).val(cnt);
						var inp4 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrFlagSoloPack"}).val(flagsolopack);
						inp1.appendTo(frm);
						inp2.appendTo(frm);
						inp3.appendTo(frm);
						inp4.appendTo(frm);
		    		}
					var flag 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_sFlagAction"}).val(flagaction);
					flag.appendTo(frm);
					
					frm.submit();
					
				}
			});
		}
		//장바구니 추가
		, addUserCart : function (p_option) {
			if(MobileBodyStart.isRunningAddCart) {
				return ;
			}
			
			MobileBodyStart.isRunningAddCart = true;
			
			var _defaults = {
				list : undefined
				, flagPlus : undefined
				, callback : undefined
			};
				
			p_option = $.extend(_defaults, p_option);
			
			if (p_option.list == undefined) {
				return;
			}
			
			var flagUseSolo	= "N";
			
			/*if(p_option.list[0].flagSoloPack == "Y"){
				var message = "이 상품은 '스페셜 기프트'상품이에요. 스페셜 기프트로 구매하시면 구성에 포함된 사은품만 받으실 수 있어요.<br/>뷰티포인트로 상품 교환시 스페셜 기프트 및 일반구성 사은품을 받으실 수 없어요.";
				showConfirmBox({
					message : message
					, option : {
						ok_str : "스페셜 기프트로"
					  , cancel_str : "일반상품으로"
					}	
					, ok_func : function() {
						
						flagUseSolo = "Y";
						MobileBodyStart.addUserCartAjax(p_option, flagUseSolo);
						
					}
					, cancel_func : function() {
						
						flagUseSolo = "N";
						MobileBodyStart.addUserCartAjax(p_option, flagUseSolo);
					}
				});
			}else{*/
				
				flagUseSolo = "N";
				MobileBodyStart.addUserCartAjax(p_option, flagUseSolo);
				
			/*}*/			
		}
		//장바구니 추가 AJAX
		, addUserCartAjax : function(p_option, flagUseSolo){
			
			var len = p_option.list.length;
			var arrParam = [];
			var flagPlus = p_option.flagPlus == "Y" ? "Y" : "N";
			
			arrParam.push("i_sFlagMobileOpen=Y");
			arrParam.push("i_sFlagPlus=" + flagPlus);
			
			for (var i = 0; i < len; i++) {
				arrParam.push("i_arrProductcd=" + p_option.list[i].productcd);
				arrParam.push("i_arrOptioncd=" + p_option.list[i].optioncd);
				arrParam.push("i_arrFlagUseSolo="+ flagUseSolo);
				arrParam.push("i_arrCnt=" + p_option.list[i].cnt);
				
				if(p_option.list[i].setdiycd != undefined) {
					arrParam.push("i_arrSetdiycd=" + p_option.list[i].setdiycd);
				}
			}
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cart/mobile_cart_add_cart_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : arrParam.join("&")
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
					
						var cartCnt = data.object.v_cart_cnt;
						cartCnt = isEmpty(cartCnt) ? 0 : parseInt(cartCnt); 
						$("#header_cartCnt").text(SetNumComma(cartCnt));
					
						if (typeof p_option.callback == "function") {
							p_option.callback(data.object);
						}
						
					}
					MobileBodyStart.isRunningAddCart = false;
				}
				, error : function(e) {
					MobileBodyStart.isRunningAddCart = true;
				}
			});			
			
		}
		// 장바구니 삭제
		, removeUserCart : function ( p_option ) {
			var _defaults = {
				list : undefined
				, flagPlus : "N"
				, callback : undefined
			};
				
			p_option = $.extend(_defaults, p_option);
			
			if (p_option.list == undefined) {
				return;
			}
			
			var len = p_option.list.length;
			var arrParam = [];
			
			for (var i = 0; i < len; i++) {
				arrParam.push("i_arrCartcd=" + p_option.list[i].cartcd);
				arrParam.push("i_arrSeqno=" + p_option.list[i].seqno);
			}
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cart/mobile_cart_remove_cart_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : arrParam.join("&")
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						var cartCnt = data.object;
						
						cartCnt = isEmpty(cartCnt) ? 0 : parseInt(cartCnt); 
						$("#header_cartCnt").text(SetNumComma(cartCnt));

						if (typeof p_option.callback == "function") {
							p_option.callback();
						}
					}
				}
			});
		}
		//바로구매하기
		,immediatelyPurchage : function( p_option ){
			
//				if(MobileBodyStart.isRunningimmediatelyPurchage) {
//					return ;
//				}
//				
//				MobileBodyStart.isRunningimmediatelyPurchage = true;
			
				var _defaults = {
					list : undefined
				};
					
				p_option = $.extend(_defaults, p_option);
				
				if (p_option.list == undefined) {
					return;
				}
				
				if(p_option.list == ""){
					
					showMessageBox({message : "상품의 옵션을 선택해주세요."});
					return;
					
				}

				var flagUseSolo	= "N";
				
				if(IS_LOGIN || IS_LOGIN_SNS){
						flagUseSolo = "N";
						MobileBodyStart.PurchageApply(p_option, flagUseSolo);
				}
				else{
					showConfirmBox({
						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
						
						,cancel_str : "비로그인 구매"
						,cancel_func : function(){
							flagUseSolo = "N";
							MobileBodyStart.PurchageApply(p_option, flagUseSolo);
						}
						,ok_str  : "로그인 구매"
						,ok_func : function(){
							if (GLOBAL_FLAG_APP_NEW == 'Y') {
								try {
									MobileBodyStart.goLoginPage();
								}
								catch(e) {
									MobileBodyStart.goPageLogin('',p_option.list);
								}
							}
							else {
								MobileBodyStart.goPageLogin('',p_option.list);
							}
						}
					});

				}
		},
		immediatelyOnePayPurchage : function( p_option ){

			var _defaults = {
				list : undefined
			};

			p_option = $.extend(_defaults, p_option);

			if (p_option.list == undefined) {
				return;
			}

			if(p_option.list == ""){
				showMessageBox({message : "상품의 옵션을 선택해주세요."});
				return;
			}

			var flagUseSolo	= "N";
			
			if(IS_LOGIN){
				flagUseSolo = "N";
				MobileBodyStart.onePayPurchageApply(p_option, flagUseSolo);
			}

		},
		PurchageApply : function(p_option, flagUseSolo){
			
			$("#div_purchase").remove();
			
			var len = p_option.list.length;
			var arrParam = [];
			
			arrParam.push("<div id='div_purchase'>");
			arrParam.push("<form name='frm_purchase' method='post' action=''>");
			
			for (var i = 0; i < len; i++) {
				
				arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+p_option.list[i].productcd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+p_option.list[i].optioncd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='"+p_option.list[i].cnt+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='"+p_option.list[i].typecd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='"+flagUseSolo+"'/>");
				if(p_option.list[i].flagbeautyhd != undefined && p_option.list[i].flagbeautyhd == "Y"){
					arrParam.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='"+p_option.list[i].flagbeautyhd+"'/>");
					arrParam.push("<input type='hidden' name='i_sBeautyHotdealcd' value='"+p_option.list[i].beautyhotdealcd+"'/>");
				}
				
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
				if(GLOBAL_LOGIN_KEY != "") {
					arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
			}

			arrParam.push("</form>");
			arrParam.push("</div>");
			
			$(arrParam.join("")).appendTo("body");
	
			var frm = $("form[name='frm_purchase']");
			
			frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1.do");
			frm.submit();
			
		},
		onePayPurchageApply : function(p_option, flagUseSolo){

			$("#div_purchase").remove();

			var len = p_option.list.length;
			var arrParam = [];

			arrParam.push("<div id='div_purchase'>");
			arrParam.push("<form name='frm_purchase' method='post' action=''>");

			for (var i = 0; i < len; i++) {

				arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+p_option.list[i].productcd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+p_option.list[i].optioncd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='"+p_option.list[i].cnt+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='"+p_option.list[i].typecd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='"+flagUseSolo+"'/>");
				if(p_option.list[i].flagbeautyhd != undefined && p_option.list[i].flagbeautyhd == "Y"){
					arrParam.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='"+p_option.list[i].flagbeautyhd+"'/>");
					arrParam.push("<input type='hidden' name='i_sBeautyHotdealcd' value='"+p_option.list[i].beautyhotdealcd+"'/>");
					arrParam.push("<input type='hidden' name='i_sBeautyHotdealcd' value='"+p_option.list[i].beautyhotdealcd+"'/>");
				}

			}
			arrParam.push("<input type='hidden' name='i_sFlagGiftChoice' 	value='Y'/>");
			arrParam.push("</form>");
			arrParam.push("</div>");

			$(arrParam.join("")).appendTo("body");

			var frm = $("form[name='frm_purchase']");
			frm.attr("action", GLOBAL_SSL_URL+"mobile/order/mobile_order_onepay_step1.do");
			frm.submit();

		}
		
		//정기구독신청&구매
		,immediatelyBillingPurchage : function( p_option, evtCategorycd, eventcd){
			
//				if(MobileBodyStart.isRunningimmediatelyPurchage) {
//					return ;
//				}
//				
//				MobileBodyStart.isRunningimmediatelyPurchage = true;
			
				var _defaults = {
					list : undefined
				};
					
				p_option = $.extend(_defaults, p_option);
				
				if (p_option.list == undefined) {
					return;
				}
				
				if(p_option.list == ""){
					
					showMessageBox({message : "상품의 옵션을 선택해주세요."});
					return;
					
				}

				var flagUseSolo	= "N";
				
				if(IS_LOGIN || IS_LOGIN_SNS){
						flagUseSolo = "N";
						MobileBodyStart.billingPurchageApply(p_option, flagUseSolo, evtCategorycd, eventcd);
				}
				else{
//					showConfirmBox({
//						message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
//						
//						,cancel_str : "비로그인 구매"
//						,cancel_func : function(){
//								flagUseSolo = "N";
//								MobileBodyStart.billingPurchageApply(p_option, flagUseSolo, evtCategorycd);
//						}
//						,ok_str  : "로그인 구매"
//						,ok_func : function(){
//							MobileBodyStart.goPageLogin('',p_option.list);
//						}
//					});

				}
		}
		//정기구독신청&구매
		, immediatelyBillingNormalPurchage : function(p_option, eventcd, evtCategorycd){
			
				var _defaults = {
					list : undefined
				};
					
				p_option = $.extend(_defaults, p_option);
				
				if (p_option.list == undefined) {
					return;
				}
				
				if(p_option.list == ""){
					
					showMessageBox({message : "상품의 옵션을 선택해주세요."});
					return;
				}
				
				var flagUseSolo	= "N";
				
				flagUseSolo = "N";
				MobileBodyStart.billingNormalPurchageApply(p_option, flagUseSolo, eventcd, evtCategorycd);
		}
		, billingNormalPurchageApply : function(p_option, flagUseSolo, eventcd, evtCategorycd){
			
			$("#div_purchase").remove();
			
			var len = p_option.list.length;
			var arrParam = [];
			
			arrParam.push("<div id='div_purchase'>");
			arrParam.push("<form name='frm_purchase' method='post' action=''>");
			
//			arrParam.push("<input type='hidden' name='i_arrTest' 		value='" + "test" + "'/>");
			
			
			for (var i = 0; i < len; i++) {
				
				arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='" + p_option.list[i].productcd + "'/>");
				arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='" + p_option.list[i].optioncd + "'/>");
				arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='" + p_option.list[i].cnt + "'/>");
				arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='" + p_option.list[i].typecd + "'/>");
				arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='" + flagUseSolo + "'/>");
				
				if(p_option.list[i].flagbeautyhd != undefined && p_option.list[i].flagbeautyhd == "Y"){
					arrParam.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='"+p_option.list[i].flagbeautyhd+"'/>");
					arrParam.push("<input type='hidden' name='i_sBeautyHotdealcd' value='"+p_option.list[i].beautyhotdealcd+"'/>");
				}
				
			}

			arrParam.push("<input type='hidden' name='i_sBillingEventcd'		 	value='" + eventcd + "'/>");
			arrParam.push("<input type='hidden' name='i_sEvtCategorycd'		 	value='" + evtCategorycd + "'/>");

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
				if(GLOBAL_LOGIN_KEY != "") {
					arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
			}

			arrParam.push("</form>");
			arrParam.push("</div>");
			
			$(arrParam.join("")).appendTo("body");

			var frm = $("form[name='frm_purchase']");

			frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1.do");
			frm.submit();
		}
		, billingPurchageApply : function(p_option, flagUseSolo, evtCategorycd, eventcd){
			
			$("#div_purchase").remove();
			
			var len = p_option.list.length;
			var arrParam = [];
			
			arrParam.push("<div id='div_purchase'>");
			arrParam.push("<form name='frm_purchase' method='post' action=''>");
			
			for (var i = 0; i < len; i++) {
				
				arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+p_option.list[i].productcd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+p_option.list[i].optioncd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='"+p_option.list[i].cnt+"'/>");
				arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='"+p_option.list[i].typecd+"'/>");
				arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='"+flagUseSolo+"'/>");
				if(p_option.list[i].flagbeautyhd != undefined && p_option.list[i].flagbeautyhd == "Y"){
					arrParam.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='"+p_option.list[i].flagbeautyhd+"'/>");
					arrParam.push("<input type='hidden' name='i_sBeautyHotdealcd' value='"+p_option.list[i].beautyhotdealcd+"'/>");
				}
				
			}
			
			arrParam.push("<input type='hidden' name='i_sEventcd' 	value='" + eventcd + "'/>");
			arrParam.push("<input type='hidden' name='i_sEvtCategorycd' 	value='" + evtCategorycd + "'/>");

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
				if(GLOBAL_LOGIN_KEY != "") {
					arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
			}
		
			arrParam.push("</form>");
			arrParam.push("</div>");
			
		   $(arrParam.join("")).appendTo("body");

		   var frm = $("form[name='frm_purchase']");
		   
		   frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_billing_step1.do");
		   frm.submit();
		}
		//위시리스트 추가
		, addUserWish : function(p_option) {
			if(MobileBodyStart.isRunningAddWish) {
				return ;
			}
			
			MobileBodyStart.isRunningAddWish = true;
			
			var _defaults = {
				list : undefined
			};
				
			p_option = $.extend(_defaults, p_option);
			
			if (p_option.list == undefined) {
				return;
			}

			var flagUseSolo = "N";
			
			if(p_option.sourceFlag == "BASKET"){
				
				flagUseSolo = p_option.flagSoloPack;
				MobileBodyStart.addUserWishAjax(p_option,flagUseSolo);
				
			}else{

				/*if(p_option.flagSoloPack == "Y"){
					
					var message = "이 상품은 '스페셜 기프트'상품이에요. 스페셜 기프트로 구매하시면 구성에 포함된 사은품만 받으실 수 있어요.<br/>뷰티포인트로 상품 교환시 스페셜 기프트 및 일반구성 사은품을 받으실 수 없어요.";
					
					showConfirmBox({
						message : message
						, option : {
							ok_str : "스페셜 기프트로"
						  , cancel_str : "일반상품으로"
						}	
						, ok_func : function() {
							
							flagUseSolo = "Y";
							MobileBodyStart.addUserWishAjax(p_option,flagUseSolo);
							
						}
						, cancel_func : function() {
							
							flagUseSolo = "N";
							MobileBodyStart.addUserWishAjax(p_option,flagUseSolo);
						}
					});
					
				}else{*/
					
					flagUseSolo = "N";
					MobileBodyStart.addUserWishAjax(p_option,flagUseSolo);
					
				/*}*/

			}

		}
		,addUserWishAjax : function(p_option,flagUseSolo){
			
			if (p_option.list == undefined) {
				return;
			}
			
			var len = p_option.list.length;
			var arrParam = [];
			
			for (var i = 0; i < len; i++) {
				
				arrParam.push("i_arrProductCd=" + p_option.list[i].productcd);
				arrParam.push("i_arrOptionCd=" + p_option.list[i].optioncd);
				arrParam.push("i_arrProductCnt=" + 1);
				arrParam.push("i_arrFlagUseSolo=" + flagUseSolo);
			}
			
			var sourceFlag = p_option.sourceFlag != undefined ? p_option.sourceFlag : "BLANK";
			
			arrParam.push("i_sSourceFlag=" + sourceFlag);
			arrParam.push("i_sFlagMobileOpen=Y");
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/wish/mobile_wish_add_wishlist_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : arrParam.join("&")
			 	, animation: false
				, success : function(data, textStatus, jqXHR) {
					MobileBodyStart.isRunningAddWish = false;
					if(data.status == "succ") {
						//gypark : 옴니추어 태깅
						for (var j = 0; j < len; j++) {
							if(p_option.list[j].productnm != undefined && p_option.list[j].productnm){
								var str = p_option.list[j].brandnm + ";" + p_option.list[j].productnm + ";;;;eVar31=" + p_option.list[j].productcd;
								str = str.replace(/&/gi,"_");
								try{trackPurchaseClick(str, 'event11');}catch(e){}
							}else{
								PAGE_TAG.PRODUCTS = PAGE_TAG.PRODUCTS.replace(/&/gi,"_");
								try{trackPurchaseClick(PAGE_TAG.PRODUCTS, 'event11');}catch(e){}
							}
						}
						
						if(typeof(p_option.callback) == "function") {
							p_option.callback();
						} else {
							showMessageBox
							({
								message : data.message,
								close : function(){
									if(p_option.list[0].returnUrl != "" && p_option.list[0].returnUrl != undefined){
										location.href = p_option.list[0].returnUrl;
									}
								}
							});						
						}
						
					}
					else {
						showConfirmBox
						({
							message : data.message,
							ok_str : "위시리스트로 이동",
							cancel_str:"계속 쇼핑하기",
							ok_func : function(){
								location.href=GLOBAL_WEB_URL +"mobile/my/mobile_my_wish_list.do";
							},
							cancel_func : function(){
								if(p_option.list[0].returnUrl != "" && p_option.list[0].returnUrl != undefined){
									location.href = p_option.list[0].returnUrl;
								}
							}
						});
					}
				}
				, error : function(e) {
					showMessageBox
					({
						message : data.message,
						close : function(){
							if(p_option.list[0].returnUrl != "" && p_option.list[0].returnUrl != undefined){
								location.href = p_option.list[0].returnUrl;
							}
						}
					});
					MobileBodyStart.isRunningAddWish = false;
				}
			});			
			
		}
		,
		goLogin :function(returnUrl) {
			var frm = $("form[name='frm_login']");
			var sflag 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_sSnsFlg"}).val(returnUrl);
			sflag.appendTo(frm);
			frm.submit();
		}
		,
		goPageLogin :function(returnUrl,list) {
			var frm = $("form[name='frm_login']");
			var flagaction = list[0].flagaction;
			for(var i=0; i<list.length; i++) {
				var productcd = list[i].productcd;
				var optioncd  = list[i].optioncd;
				var cnt = list[i].cnt;
				var flagsolopack = list[i].flagSoloPack;
				
        		var inp1 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrProductcd"}).val(productcd);
				var inp2 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrOptioncd"}).val(optioncd);
				var inp3 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrOptioncnt"}).val(cnt);
				var inp4 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrFlagSoloPack"}).val(flagsolopack);
				inp1.appendTo(frm);
				inp2.appendTo(frm);
				inp3.appendTo(frm);
				inp4.appendTo(frm);
    		}
			var flag 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_sFlagAction"}).val(flagaction);
			var sflag 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_sSnsFlg"}).val(returnUrl);
			flag.appendTo(frm);
			sflag.appendTo(frm);
			frm.submit();
		}
		,facebookShare : function(rvo, flag){
			if(rvo !=null && rvo !=undefined){
				
				FB.init({appId:"1532234350418822", status: true, cookie: true, version: "v2.0"});

				FB.ui ({
							method: "feed",
							name: rvo.name,
			    			link: rvo.link,
			    			picture: rvo.picture,
			    			description: rvo.description
			    		},	function(response) {
			    				if(response && response.post_id){
						    		if(flag =="Y"){
						    			if(IS_LOGIN){
											MobileCommon.ajax({
												url : GLOBAL_WEB_ROOT + "sns/sns_facebook_share_callback.do"
												, type : "POST"
													, dataType : "json"
														, data : {
															"i_sSnsFlag" : "Y"
														}
											, animation: false
											, success : function(data, textStatus, jqXHR) {

												showMessageBox({message : data.message});

											}
											});
										}
						    			
						    		}else{
						    			self.close();
						    		}
						    	}
			    		}
			    );
				
			}

		}
		, addTopMenuLink : function ( preUrl ) {
			
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			
			select_input.click(function() {
				var val = $(this).val();
				
				if (val.indexOf("/") > -1) {
					location.href	= $(this).val() + ".do";
				}
				else {
					location.href	= preUrl + $(this).val() + ".do";
				}
			});
			
		}
		, twitterCallback : function(twflag){
			
			if(twflag =="Y"){
				if(IS_LOGIN){
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "sns/sns_facebook_share_callback.do"
						, type : "POST"
							, dataType : "json"
								, data : {
									"i_sSnsFlag" : "Y"
								}
					, animation: false
					, success : function(data, textStatus, jqXHR) {

						showMessageBox({message : data.message});

					}
					});
				}
			}else{
				
			}
			
		}
		, getShortenUrl : function(vo){

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "sns/sns_shorten_url.do"
				, type : "POST"
					, dataType : "json"
						, data : {
							"i_sSnsUrl":vo.url
						}
				, animation: false
				, success : function(data, textStatus, jqXHR) {
					if(data.status == "succ"){
						var url =  data.object.surl;
						window.open("http://twitter.com/share?text=["+vo.name+"]"+vo.desc+"&url="+url, '', 'width=815, height=436');
						twttr.events.bind('tweet', tweetIntentToAnalytics);
					}else{
						showMessageBox({message : data.message});
					}
				}
			});
		}
		, cmMobilePopup : function (vo) {
			
			var popup = $('#mlayerPop');
			
	        var overlay = $("<div class='overlay'></div>").clone().appendTo("#wrapper");
	        
	        popup.find(".content").html(vo.v_clob);
	        popup.show();
		    $('#mlayerPop .close').click(function(){
		    	if(vo.v_cookie == "1"){
		    		$.cookie('cmc_'+vo.v_popupcd, 'N', {expires:1, path: '/'});
		    	}else if(vo.v_cookie == "7"){
		    		$.cookie('cmc_'+vo.v_popupcd, 'N', {expires:7, path: '/'});
		    	}else if(vo.v_cookie == "30"){
		    		$.cookie('cmc_'+vo.v_popupcd, 'N', {expires:30, path: '/'});
		    	}
		    	popup.hide();
		    	overlay.remove();
		    });
		}
		, setLoginUserInfo : function() {
			try {
				if(GLOBAL_MOBILE_OS == "AND") {
					var info			= window.Android.requestUserInfo();
					var infoJson		= $.parseJSON(info);
					GLOBAL_LOGIN_KEY	= infoJson.i_sLoginKey;
					GLOBAL_LOGIN_TYPE	= infoJson.i_sLoginType;
					GLOBAL_DEVICE_NUM	= infoJson.i_sDeviceNum;
				}
				else {
					window.webkit.messageHandlers.requestUserInfo.postMessage(null);
				}
			}catch(e){
				console.log(e);
			}
		}
		, goProductDetail : function(productcd, param) {
			if (GLOBAL_FLAG_APP_NEW == "Y") {
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						window.Android.gotoProductDetail(productcd);
					}
					else {
						window.webkit.messageHandlers.gotoProductDetail.postMessage(productcd);
					}
				}catch(e){
					var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + productcd;
					if (typeof param != "undefined") {
						url += "&" + param
					}
					document.location.href = url;
				}
			}
			else {
				var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + productcd;
				if (typeof param != "undefined") {
					url += "&" + param
				}
				document.location.href = url;
			}
		}
		, goLoginPage : function() {

			try {
				if(GLOBAL_MOBILE_OS == "AND") {
					window.Android.gotoLogin();
				}
				else {
					window.webkit.messageHandlers.gotoLogin.postMessage(null);
				}
			}
			catch(e) {
				var frm = $("form[name='frm_login']");
				frm.submit();
			}

		}
		, goLoginPageMakeForm : function(returnUrl, returnParam) {

			try {

				var arrForm = [];
				arrForm.push("<form name='frm_move' id='frm_move' method='post' action=''>");
				arrForm.push("	<input name='i_sReturnUrl' value='" + returnUrl + "'>");
				arrForm.push("	<input name='i_sReturnParam' value='" + returnParam + "'>");
				arrForm.push("</form>");
				$(arrForm.join("\n")).appendTo($("body"));

				if(GLOBAL_MOBILE_OS == "AND") {
					window.Android.gotoLogin();
				}
				else {
					window.webkit.messageHandlers.gotoLogin.postMessage(null);
				}
			}
			catch(e) {
				var frm = $("form[name='frm_login']");
				frm.submit();
			}
			
		}
		, fnAppendUserInfo : function(target) {

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

			try {
				var arrParam	= [];
				
				if(GLOBAL_LOGIN_KEY != "") {
					$("input[name='i_sLoginKey']", target).remove();
					arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					$("input[name='i_sLoginType']", target).remove();
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				$("input[name='i_sDeviceNum']", target).remove();
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
				
				$(arrParam.join("")).appendTo(target);
			}
			catch(e) {
			}

		}
		, fnAppendUserInfoSubmit : function(target, url) {

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

			try {
				var arrParam	= [];

				if(GLOBAL_LOGIN_KEY != "") {
					$("input[name='i_sLoginKey']", target).remove();
					arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					$("input[name='i_sLoginType']", target).remove();
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				$("input[name='i_sDeviceNum']", target).remove();
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
				$(arrParam.join("")).appendTo(target);

				if(typeof url != "undefined") {
					target.attr("action", url);
				}
				target.submit();
			}
			catch(e) {
			}
			
		}
		, fnWebViewClose : function() {

			if (GLOBAL_FLAG_APP_NEW == "Y") {
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						window.Android.disableHistoryBack(false);
						window.Android.closeWebview();
					}
					else {
						window.webkit.messageHandlers.disableHistoryBack.postMessage(false);
						window.webkit.messageHandlers.closeWebview.postMessage(null);
					}
				}
				catch(e) {}
			}

		}
		, goProductList : function(categoryCd1, categoryCd2) {

			if (GLOBAL_FLAG_APP_NEW == "Y") {
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						window.Android.gotoProductList(categoryCd1, categoryCd2);
					}
					else {
						var category = categoryCd1;
						if(typeof categoryCd2 != "undefined" && !isEmpty(categoryCd2)) {
							category = category + ";" + categoryCd2;
						}
						window.webkit.messageHandlers.gotoProductList.postMessage(category, "");
					}
				}
				catch(e){
					var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y";
					if (typeof categoryCd1 != "undefined" && !isEmpty(categoryCd1)) {
						url += "&i_sCategorycd1=" + categoryCd1
					}
					if (typeof categoryCd2 != "undefined" && !isEmpty(categoryCd2)) {
						url += "&i_sCategorycd2=" + categoryCd2
					}
					document.location.href = url;
				}
			}
			else {
				var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y";
				if (typeof categoryCd1 != "undefined" && !isEmpty(categoryCd1)) {
					url += "&i_sCategorycd1=" + categoryCd1
				}
				if (typeof categoryCd1 != "undefined" && !isEmpty(categoryCd2)) {
					url += "&i_sCategorycd2=" + categoryCd2
				}
				document.location.href = url;
			}

		}
		, goMyPouch : function() {

			try {
				if(GLOBAL_MOBILE_OS == "AND") {
					window.Android.gotoMyPouch();
				}
				else {
					window.webkit.messageHandlers.gotoMyPouch.postMessage(null);
				}
			}
			catch(e) {
				location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_main.do";
			}

		}
};