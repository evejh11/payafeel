/* 모바일 주문결제의 이벤트 처리를 위한 Javascript*/
var giftparam = {
	giftprecnt : 0
	,giftcnt   : 0
};
var MobileOrderDelivery = {

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
	, init : function() {

		MobileOrderDelivery.cash_buy			= fnOnlyNumber($("input[name='i_iCashBuy']").val()).number;
		MobileOrderDelivery.cash_buy_limit		= fnOnlyNumber($("input[name='i_iCashBuyLimit']").val()).number;
		MobileOrderDelivery.point_buy			= fnOnlyNumber($("input[name='i_iPointBuy']").val()).number;
		MobileOrderDelivery.point_buy_limit		= fnOnlyNumber($("input[name='i_iPointBuyLimit']").val()).number;
		MobileOrderDelivery.cash_today			= fnOnlyNumber($("input[name='i_iCashToday']").val()).number;
		MobileOrderDelivery.cash_today_limit	= fnOnlyNumber($("input[name='i_iCashTodayLimit']").val()).number;
		MobileOrderDelivery.point_today			= fnOnlyNumber($("input[name='i_iPointToday']").val()).number;
		MobileOrderDelivery.point_today_limit	= fnOnlyNumber($("input[name='i_iPointTodayLimit']").val()).number;
		MobileOrderDelivery.gift_box			= fnOnlyNumber($("input[name='i_iGiftBox']").val()).number;
		MobileOrderDelivery.gift_box_limit		= fnOnlyNumber($("input[name='i_iGiftBoxLimit']").val()).number;
		MobileOrderDelivery.naming				= fnOnlyNumber($("input[name='i_iNaming']").val()).number;
		MobileOrderDelivery.naming_limit		= fnOnlyNumber($("input[name='i_iNamingLimit']").val()).number; 

	}

};

var MobileOrderUserInfo = {
	  name : "MobileOrderUserInfo"
	, levelcd :		""
	, init : function() {
		MobileOrderUserInfo.levelcd = $("input[name='i_sUserLevelcd']").val();
	}
};

var	MobileOrderStep1 = {

	name : "MobileOrderStep1"
	, status : ""
	, isLogin : false
	, isSnsLogin : false
	, sum_price : 0
	, sum_pay_money : 0
	, sum_dis_price : 0
	, sum_dis_coupon_price : 0
	, sum_pay_price : 0
	, sum_pay_bpoint : 0
	, sum_mpoint : 0
	, sum_pay_mpoint : 0
	, sum_save_bpoint : 0
	, sum_save_mpoint : 0
	, sum_naming_price : 0
	, sum_dis_channel_price : 0
	, sum_naming_cnt : 0
	, sum_pay_giftcard : 0
	, sum_pay_giftcon : 0
	, delivery_price : 0
	, gifgbox_price : 0
	, sum_fg_price : 0
	, sum_fg_mpoint : 0
	, sum_need_bpoint : 0
	, sum_min_bpoint_price  : 0
	, rebon_pointmall_cnt : 0
	, vip_pointmall_cnt : 0
	, channel_dc_per	: 0
	, channel_dc_brd_exc : ""
	, sum_zero_point_price : 0
	, sum_zero_mpoint_price : 0
	, flag_beauty_hotdeal : "N"
	, flag_use_delivery_coupon : "N"
	, vip_free_cnt : 0
	, flag_vip_gift : "N"
	, gift001_cnt	: 0
	, init : function(){

		MobileOrderStep1.isLogin			= $("input[name='i_sLoginFlag']").val() == "" ? false : true;

		/* 채널할인 정보 [s] */
		MobileOrderStep1.channel_dc_per		= fnOnlyNumber($("input[name='i_iChannelDcPer']").val()).number; 
		MobileOrderStep1.channel_dc_brd_exc	= $("input[name='i_sChannelDcBrdExc']").val();
		/* 채널할인 정보 [e] */

		/* VIP/VVIP 사은품 선택가능 개수 */
		MobileOrderStep1.vip_free_cnt		= fnOnlyNumber($("input[name='i_iFreeCnt']").val()).number

		MobileOrderStep1.flag_vip_gift		= $("input[name='i_sFlagVipGift']").val();

		MobileOrderUserInfo.init();
		MobileOrderDelivery.init();

		MobileOrderStep1.sum();
		MobileOrderStep1.addBtnEvent();

		MobileOrderStep1.isValidationKeyup();

		if(MobileOrderStep1.gift001_cnt < 1 && "N" == MobileOrderStep1.flag_vip_gift) {
			$(".btn_payment").click();
		}

	}
	, getPageParam : function () {
		var	pageParam	= {
				targetDt : $("input[name='i_sTargetDtm']").val()
		};
		return pageParam;
	}
	, addBtnEvent : function(){

		$(".btn_payment").click(function(event) {

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "order/order_complete_count_ajax.do"
				, type			: "POST"
				, dataType		: "json"
				, animation		: false
				, isModalEnd	: true
				, success		: function ( data, textStatus, jqXHR) {

					if(data.status == "succ"){

						data.object = 0;

						if(data.object >= 3){
							showAppMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
							return;
						}
						else {

							var message		= []; 
							var bfreeFlag	= true;
							var vipGiftFlag	= true;

							if($("input[name='i_arrBfreeGoodChk']").size() > 0) {
								var gift_object	= $("input[name='i_arrBfreeGoodChk']").filter(":checked");
								var gift_size	= gift_object.size();

								if(gift_size == 0){
									message.push("구매금액대별 사은품");
									bfreeFlag = false;
								}
							}

							if($("input[name='i_arrVipGiftChk']").size() > 0 && $("input[name='i_iFreeCnt']").val() > 0) {
								var vip_gift_chk_object	= $("input[name='i_arrVipGiftChk']").filter(":checked");
								var vip_gift_object		= $("input[name='i_arrVipGiftChk']");
								var vip_free_cnt		= $("input[name='i_iFreeCnt']").val();
								var vip_gift_chk_size	= vip_gift_chk_object.size();
								var vip_gift_size		= vip_gift_object.size();

								if(vip_gift_chk_size == 0
								||(vip_gift_size >= vip_free_cnt && vip_gift_chk_size < vip_free_cnt)) {
									message.push("CLUB AP 추가사은품");
									vipGiftFlag = false;
								}
							}

							
							if (!bfreeFlag || !vipGiftFlag) {
								var message = message.join(", ") + "을 선택하시지 않으셨어요. <br/>구매를 진행하시겠어요?"
								showAppConfirmBox({
									message : message
									, ok_func : function() {
										MobileOrderStep1.actionPayment();
									}
								})
								return;
							}
							else {
								MobileOrderStep1.actionPayment();
							}

						} 
					}
				}
			});

		});
		
		$(".btn_webview_close").click(function(){
			try{
				if(GLOBAL_MOBILE_OS == "AND") {
					window.Android.closeWebview();
				}
				else {
					window.webkit.messageHandlers.closeWebview.postMessage(null);
				}
			}catch(e){
				console.log(e);
			}
		});

		$(".btn_payment_onepay_cancel").click(function(){
			modalPopupClose("#modalPopupOnePayInfo");
		});

		$(".btn_payment_onepay").click(function(){
			MobileOrderStep1.actionPayment();
		});
		
	}
	, onePayCall : function(vo){

		var frm_lguplus_one_pay = $("form[name='frm_lguplus_one_pay']");
		var userDefaultBillkey = "";

		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT + "mobile/order/mobile_order_card_billkey_ajax.do"
			, type : "POST"
			, dataType : "json"
			, animation	: false
			, success : function (data, textStatus, jqXHR) {
				
				if (data.status == "succ") {
					
					var obj = data.object;
					var billkeyList = obj.billkeyList;
					
					var size = billkeyList.length;
					
					for (var i = 0; i < size; i++){
						
						var billkeyVo = billkeyList[i];
						
						var billkey = billkeyVo.v_billkey;
						var flagDefault = billkeyVo.v_flag_default;
						
						if (flagDefault == 'Y'){
							userDefaultBillkey = billkey;
						}
					}
					
					if (isEmpty(userDefaultBillkey)){

						try{
							if(GLOBAL_MOBILE_OS == 'AND'){
								window.Android.setSingleTitle('Apmall ONE pay 간편결제');
								window.Android.disableHistoryBack(false);
							}else{
								window.webkit.messageHandlers.setSingleTitle.postMessage('Apmall ONE pay 간편결제');
								window.webkit.messageHandlers.disableHistoryBack.postMessage(false);
							}
						}
						catch(e){
							console.log(e);
						}

						MobileOrderStep1.hideONEpayLoadingBox();
						showAppMessageBox({
							message : "결제에 사용할 대표 신용카드가 지정되지 않았습니다."
						});

					} else {

						//결제 호출
						$("input[name='CST_PLATFORM']",		frm_lguplus_one_pay).val(vo.cstplatform);
						$("input[name='CST_MID']",			frm_lguplus_one_pay).val(vo.cstmid);
						$("input[name='LGD_MID']",			frm_lguplus_one_pay).val(vo.lgdmid);

						$("input[name='LGD_OID']",			frm_lguplus_one_pay).val(vo.ordercd);
						$("input[name='LGD_AMOUNT']",		frm_lguplus_one_pay).val(vo.lgdamount);
						$("input[name='LGD_PAN']",			frm_lguplus_one_pay).val(userDefaultBillkey);
						$("input[name='VBV_ECI']",			frm_lguplus_one_pay).val("010");
						$("input[name='LGD_INSTALL']",		frm_lguplus_one_pay).val("00");
						$("input[name='LGD_PRODUCTINFO']",	frm_lguplus_one_pay).val(vo.productinfo);
						$("input[name='LGD_BUYER']",		frm_lguplus_one_pay).val(vo.username);
						$("input[name='LGD_BUYERID']",		frm_lguplus_one_pay).val(vo.userid);
						$("input[name='LGD_TXNAME']",		frm_lguplus_one_pay).val("CardAuth");

						$("input[name='LGD_ENCODING']",				frm_lguplus_one_pay).val("UTF-8");
						$("input[name='LGD_ENCODING_NOTEURL']",		frm_lguplus_one_pay).val("UTF-8");
						$("input[name='LGD_ENCODING_RETURNURL']",	frm_lguplus_one_pay).val("UTF-8");
						frm_lguplus_one_pay.attr("action", GLOBAL_SSL_URL + "mobile/order/mobile_order_onePay_next.do");
						frm_lguplus_one_pay.submit();
					}
					
				} else {
					
				}
			}
		});
	}
	, isAddEvent : {
		orderUser : false
	}
	, actionPayment : function () {

		// 결제 진행중
		if (MobileOrderStep1.status != "") {
			return;
		}
		
		if (!MobileOrderStep1.isValidation()) {
			return;
		}
		
		var frm = $("form[name='frm']");
		
		var flagBeauty = $("input[name='i_arrFlagBeauty']",frm);
		var isBpointPoructFlag = true;
		var productnm = "";
		
		flagBeauty.each(function(i){
			
			if(flagBeauty.eq(i).val() == "Y"){
				
				var beauty_price 	= fnOnlyNumber($(".span_beauty_price").eq(i).text()).number;
				
				if(productnm.length>0){
					
					productnm = productnm + ","+$("*[name='i_arrProductnm']",frm).eq(i).val();
					
				}else{
					
					productnm = $("*[name='i_arrProductnm']",frm).eq(i).val();
					
				}
				
				var cnt	= fnOnlyNumber($("*[name='i_arrProductCnt']").eq(i).val()).number;
				
				if($("*[name='i_arrPayBpoint']",frm).eq(i).val() != beauty_price * cnt){
					
					isBpointPoructFlag = false;
				}
			}
			
		});
		
		if(!isBpointPoructFlag){
			showAppMessageBox({message :"["+productnm+"] 상품은 뷰티포인트 전용상품 이에요.<br/>해당상품에서 뷰티포인트로 구매하기를 체크해주세요."});
			return;
		}

		MobileOrderStep1.setPaymentStatus("ING");
		
		var frm = $("form[name='frm']");

		$("textarea[name='i_sOrderParam']").val($("input[name='i_sReturnParam']", $("form[name='frm_common']")).val());

		MobileCommon.ajax({
			url				: GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_step1_save.do"
			, type			: "POST"
			, data			: frm.serialize()
			, dataType		: "json"
			, animation		: true
			, isModalEnd	: true
			, beforeSend	: function() {
				try{
					if(GLOBAL_MOBILE_OS == 'AND'){
						window.Android.setSingleTitle('Apmall ONE pay 간편결제');
//						window.Android.displayBottomBar(true);
						window.Android.disableHistoryBack(true);
					}else{
						window.webkit.messageHandlers.setSingleTitle.postMessage('Apmall ONE pay 간편결제');
//						window.webkit.messageHandlers.displayBottomBar.postMessage(true);
						window.webkit.messageHandlers.disableHistoryBack.postMessage(true);
					}
				}
				catch(e){
					console.log(e);
				}
				MobileOrderStep1.showONEpayLoadingBox();
			}
			, success : function (data, textStatus, jqXHR) {
				if (data.status == "succ") {

					var frm = $("form[name='frm']");
					var vo = data.object;
					$("input[name='i_sOrdercd']", frm).val(vo.v_ordercd);

					if (MobileOrderStep1.sum_pay_money > 0) {
						MobileOrderStep1.onePayCall(vo);
					}
					else if (MobileOrderStep1.sum_pay_bpoint > 0 || MobileOrderStep1.sum_pay_mpoint > 0 || MobileOrderStep1.sum_pay_giftcard > 0) {
						var frm_lguplus = $("form[name='frm_lguplus']");
						frm_lguplus.attr("action","/mobile/order/mobile_order_order_result.do?i_sOrdercd="+vo.ordercd);
						frm_lguplus.submit();
					}
					else {
						showAppMessageBox({message : "구매하실 상품을 선택해주세요."});
					}
				}
				else {
					try{
						if(GLOBAL_MOBILE_OS == 'AND'){
							window.Android.setSingleTitle('Apmall ONE pay 간편결제');
							window.Android.disableHistoryBack(false);
						}else{
							window.webkit.messageHandlers.setSingleTitle.postMessage('Apmall ONE pay 간편결제');
							window.webkit.messageHandlers.disableHistoryBack.postMessage(false);
						}
					}
					catch(e){
						console.log(e);
					}
					MobileOrderStep1.hideONEpayLoadingBox();
					MobileOrderStep1.setPaymentStatus("");
					showAppMessageBox({message : data.message});
				}
			}
		});
	}
	, isValidationKeyup : function(){
		
		var frm = $("form[name='frm']");
		
		var order_usernm  = $("input[name='i_sOrderUsernm']",frm);
		
		var order_mobile1 = $("*[name='i_sOrderMobile1']",frm);
		var order_mobile2 = $("input[name='i_sOrderMobile2']",frm);
		var order_mobile3 = $("input[name='i_sOrderMobile3']",frm);
		
		var receivernm = $("input[name='i_sDeliveryReceivernm']", frm);
		
		var zip1    = $("input[name='i_sDeliveryZip1']", frm);
		var zip2    = $("input[name='i_sDeliveryZip2']", frm);
		var addr1   = $("input[name='i_sDeliveryAddress1']", frm);
		var addr2   = $("input[name='i_sDeliveryAddress2']", frm);
		
		var phone1  = $("*[name='i_sDeliveryPhone1']", frm);
		var phone2  = $("input[name='i_sDeliveryPhone2']", frm);
		var phone3  = $("input[name='i_sDeliveryPhone3']", frm);
		
		var mobile1 = $("*[name='i_sDeliveryMobile1']", frm);
		var mobile2 = $("input[name='i_sDeliveryMobile2']", frm);
		var mobile3 = $("input[name='i_sDeliveryMobile3']", frm);
		
		var email1  = $("*[name='i_sOrderEmail1']", frm);
		var email2  = $("*[name='i_sOrderEmail2']", frm);
		var email3  = $("*[name='i_sOrderEmail3']", frm);
		var taxbill = $("input[name='i_sTaxBillNo']",frm);
		
		var paycardtype = $("*[name='i_sPayCardTypecd']",frm);
		
		var flagEscrow  = $("input[name='i_sFlagEscrowYn']",frm);
		
		order_usernm.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val) || val.length < 2) {
				
				addErrorMessageBox($(this).eq(0), "주문자 이름을 2자 이상 입력해 주세요.");
				
			}else if(val.length > 30){
				
				addErrorMessageBox($(this).eq(0), "주문자 이름이 너무 깁니다.");
			}
		});
		
		order_mobile1.unbind("change").change(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "주문자 앞자리 연락처를 선택해 주세요.");
			}
		});
		
		order_mobile2.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "주문자 중간자리 연락처를 입력해 주세요.");
			}
		});
		
		order_mobile3.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "주문자 끝자리 연락처를 입력해 주세요.");
			}
		});		
		
		receivernm.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val) || val.length < 2) {
				
				addErrorMessageBox($(this).eq(0), "받는사람 이름을 2자 이상 입력해주세요.");
				
			}else if(val.length > 30){
				
				addErrorMessageBox($(this).eq(0), "받는사람 이름이 너무 깁니다.");
			}
		});
		
		zip1.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 주소를 입력해 주세요.");
			}
		});
		
		zip2.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 주소를 입력해 주세요.");
			}
		});
		
		addr1.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 주소를 입력해 주세요.");
			}
		});
		
		addr2.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 주소를 입력해 주세요.");
			}
		});
		
		taxbill.unbind("keyup").keyup(function(){
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));
			var taxtype = $("input[name='i_sTaxBillType']").val();
			if(taxtype != "N" && (val == "휴대전화 또는 사업자등록번호" || val == "")){
				addErrorMessageBox($(this).eq(0), "휴대전화 또는 사업자등록번호를 입력해주세요.");
			} 
		});
		
		mobile1.unbind("change").change(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 앞자리 연락처를 선택해 주세요.");
			}
		});
		
		mobile2.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 중간자리 연락처를 입력해 주세요.");
			}
		});
		
		mobile3.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 끝자리 연락처를 입력해 주세요.");
			}
		});		
		
		paycardtype.unbind("change").change(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "카드 종류를 선택해주세요.");
			}
			
			if(val == "61"){
				$("#tr_mpoint_list").show();
			}else{
				$("#tr_mpoint_list").hide();	
			}

		});	
		
		//이메일1
		email1.unbind("keyup").keyup(function() {
			
			var val = $(this).val();
			removeErrorMessageBox($(this));

			var email2val = email2.val();
			
			if(!isEmpty(email2val)){

				var email = val+"@"+email2val;
				
				var obj = emailChkMsg(email);
				
				if (!obj.isResult) {
					addErrorMessageBox($(this),obj.message);
				}
			}else{
				
				if(isEmpty(val)){
					addErrorMessageBox($(this),"주문자 이메일을 입력해주세요.");	
				}
			}
		});
		
		email3.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this));
			var email1val = email1.val();
			
			if(!isEmpty(email1val)){

				var email = email1val+"@"+val;
				
				var obj = emailChkMsg(email);
				
				if (!obj.isResult) {
					addErrorMessageBox($(this),obj.message);
				}
			}else{
				if(isEmpty(val)){
					addErrorMessageBox($(this),"주문자 이메일을 입력해주세요.");	
				}
			}
		});
		
		flagEscrow.unbind("click").click(function(){
			
			var val = $(this).val();
			
			var name = $(this).attr("name");
			
			var msgTarget = $(".error_" + name);
			msgTarget.addClass("error_hide");
			$(this).removeClass("error");
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this), "에스크로 결제 여부를 선택해주세요.");
			}			
		});
	}
	, isValidation : function () {

		var prodCnt = $(".tr_product_list").size(); // 본품수량

		if (prodCnt == 0 && MobileOrderStep1.sum_pay_mpoint == 0) {
			showAppMessageBox({message : "주문하실 상품을 선택해주세요."});
			return false;
		}
		else if (prodCnt == 0 && MobileOrderStep1.sum_pay_mpoint > 0) {
			showAppMessageBox({message : "본품 결제액이 5,000원 이상일때에만<br/> 블루리본 포인트 상품을 구매 하실 수 있어요."});
			return false;
		}

		//전체 삭제
		removeErrorMessage();

		var isResult = true;
		var target 	 = undefined;
		var resObj 	 = undefined;

		if(isResult){
			resObj = MobileOrderStep1.isValidationOrderUser();
			isResult = resObj.isResult;
			target = resObj.target;
		}

		if(isResult){
			resObj = MobileOrderStep1.isValidationDeliveryUser();
			isResult = resObj.isResult;
			target = resObj.target;
		}

		if(isResult){
			resObj = MobileOrderStep1.isValidationEtc();
			isResult = resObj.isResult;
			target = resObj.target;
		}

		if (!isResult) {
			showAppMessageBox({message : "필수 입력사항을 확인해 주세요."});
			target.focus();
		}

		return isResult;

	}
	, isValidationOrderUser : function () {
		
		var frm = $("form[name='frm']");
		var isResult = true;
		var target = undefined;

		var statuscd			= $("input[name='i_arrStatuscd']",	$(".tr_product_list").eq(0));
		var stockqty			= $("input[name='i_arrStockQty']",	$(".tr_product_list").eq(0));
		var flagBillingProd		= $("input[name='i_arrFlagBillingProd']",	$(".tr_product_list").eq(0));
		if(((statuscd.val() != "0001" &&  statuscd.val() != "0005") || stockqty.val()<=0) && flagBillingProd.val() != "Y"){
			showAppMessageBox({
				message : "선택하신 상품은 일시품절입니다.<br/>다음에 주문해주세요."
				, close : function() {
					MobileBodyStart.fnWebViewClose();
				}
			});
		}

		var orderUsernm = $("*[name='i_sOrderUsernm']", frm);
		var email1  = $("*[name='i_sOrderEmail1']", frm);
		var email2  = $("*[name='i_sOrderEmail2']", frm);
		var mobile1 = $("*[name='i_sOrderMobile1']", frm);
		var mobile2 = $("*[name='i_sOrderMobile2']", frm);
		var mobile3 = $("*[name='i_sOrderMobile3']", frm);
		
		if (orderUsernm.val() == "" || orderUsernm.val().length < 2) {
		
			addErrorMessageBox($("*[name='i_sOrderUsernm']", frm),"주문자 이름을 2자 이상 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = orderUsernm.eq(0);
			}	
			
		}
		else if (calculate_byte(orderUsernm.val()) > 30 ) {
			
			addErrorMessageBox($("*[name='i_sOrderUsernm']", frm),"주문자 이름이 너무 깁니다. (최대 30byte : 영문 1byte 한글 3byte)");
			isResult = false;
			if (target == undefined) {
				target = orderUsernm.eq(0);
			}	
			
		}

		var email = "";

		if(!email1.prop("disabled") && !email2.prop("disabled")){

			if(email1.val() == ""){

				addErrorMessageBox($("*[name='i_sOrderEmail1']", frm),"사용자 이메일을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = email1.eq(0);
				}
				
			}

			if(email2.val() == "" && email3.val() == ""){

				addErrorMessageBox($("*[name='i_sOrderEmail2']", frm),"사용자 이메일을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = email1.eq(0);
				}
				
			}

			if(email1.val() !="" && email2.val() !="" && email2.val() != "직접입력"){
				
				email = email1.val() +"@"+ email2.val();
			}

			if(email2.val() == "직접입력" && email3.val() == ""){
				addErrorMessageBox($("*[name='i_sOrderEmail3']", frm),"사용자 이메일을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = email3.eq(0);
				}
			}

			if(email2.val() == "직접입력" && email3.val() != "" && email1.val() != ""){
				email = email1.val() +"@"+ email3.val();
			}

		}

		if(email != ""){
			var obj = emailChkMsg(email);
			if (!obj.isResult) {
			
				addErrorMessageBox($("*[name='i_sOrderEmail3']", frm),obj.message);
				isResult = false;
				if (target == undefined) {
					target = email1.eq(0);
				}	
				
			}
		}

		var mobile = mobile1.val() + "" + mobile2.val() + "" + mobile3.val();
		var isPassMobile	= false;

		if (mobile.length >= 9) {
			isPassPhone = true;
		}

		if (!isPassMobile && mobile1.val() == "") {

			addErrorMessageBox($("*[name='i_sOrderMobile1']", frm),"주문자 앞자리 연락처를 선택해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile1.eq(0);
			}
			
		}
		
		if (!isPassMobile && (mobile2.val() == "" || mobile2.val().length < 3)) {
			
			addErrorMessageBox($("*[name='i_sOrderMobile2']", frm),"주문자 중간자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile2.eq(0);
			}	

		}
		if (!isPassMobile && (mobile3.val() == "" || mobile3.val().length < 4)) {
			
			addErrorMessageBox($("*[name='i_sOrderMobile3']", frm),"주문자 끝자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile3.eq(0);
			}
		}
		
		var resObj = {
			target : target
			, isResult : isResult
		};
		
		return resObj;
	}
	, isValidationDeliveryUser : function () {
		
		var frm = $("form[name='frm']");
		var isResult = true;
		var target = undefined;
		
		var receivernm = $("input[name='i_sDeliveryReceivernm']", frm);
		var zip1 = $("input[name='i_sDeliveryZip1']", frm);
		var zip2 = $("input[name='i_sDeliveryZip2']", frm);
		var addr1 = $("input[name='i_sDeliveryAddress1']", frm);
		var addr2 = $("input[name='i_sDeliveryAddress2']", frm);
		var phone1 = $("*[name='i_sDeliveryPhone1']", frm);
		var phone2 = $("input[name='i_sDeliveryPhone2']", frm);
		var phone3 = $("input[name='i_sDeliveryPhone3']", frm);
		var mobile1 = $("*[name='i_sDeliveryMobile1']", frm);
		var mobile2 = $("input[name='i_sDeliveryMobile2']", frm);
		var mobile3 = $("input[name='i_sDeliveryMobile3']", frm);

		if (receivernm.val() == "" || receivernm.val().length < 2) {
			
			addErrorMessageBox(receivernm.eq(0),"받는사람 이름을 2자 이상 입력해주세요.");
			isResult = false;
			if (target == undefined) {
				target = receivernm.eq(0);
			}
		}
		else if (calculate_byte(receivernm.val()) > 30 ) {
			
			addErrorMessageBox(receivernm.eq(0),"받는사람 이름이 너무 깁니다. (최대 30byte : 영문 1byte 한글 3byte)");
			isResult = false;
			if (target == undefined) {
				target = receivernm.eq(0);
			}
		}
		
		if (zip1.val() == "") {
			
			addErrorMessageBox(zip1.eq(0),"배송지 주소를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = zip1.eq(0);
			}

		}
		if (zip2.val() == "") {
			
			addErrorMessageBox(zip2.eq(0),"배송지 주소를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = zip2.eq(0);
			}

		}
		if (addr1.val() == "") {
			addErrorMessageBox(addr1.eq(0),"배송지 주소를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = addr1.eq(0);
			}
		}
		
		var chaddr2 = addr2.val().replace(" ","");
		if (chaddr2 == "") {
			addErrorMessageBox(addr2.eq(0), "배송지 주소를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = addr2.eq(0);
			}
		}
		
		var phone = phone1.val() + "" + phone2.val() + "" + phone3.val();
		var mobile = mobile1.val() + "" + mobile2.val() + "" + mobile3.val();
		var isPassPhone		= false;
		var isPassMobile	= false;
		
//		if (phone.length >= 9) {
//			isPassPhone = true;
//		}
		if (mobile.length >= 9) {
			isPassMobile = true;
		}
		
		/**gypark : AP몰 개선(일반전화 필수값 해제)*/
		
	/*	if (!isPassPhone && phone1.val() == "") {
			addErrorMessageBox(phone1.eq(0), "배송지 앞자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = phone1.eq(0);
			}
		}
		if (!isPassPhone && (phone2.val() == "" || phone2.val().length < 3)) {
			addErrorMessageBox(phone2.eq(0), "배송지 중간자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = phone2.eq(0);
			}
		}
		if (!isPassPhone && (phone3.val() == "" || phone3.val().length < 4)) {
			addErrorMessageBox(phone3.eq(0), "배송지 뒷자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = phone3.eq(0);
			}
		}*/
		if (!isPassMobile && mobile1.val() == "") {
			addErrorMessageBox(mobile1.eq(0), "배송지 앞자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile1.eq(0);
			}
		}
		if (!isPassMobile && (mobile2.val() == "" || mobile2.val().length < 3 || mobile2.val() == "undefined" || mobile2.val()== undefined)) {
			addErrorMessageBox(mobile2.eq(0), "배송지 중간자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile2.eq(0);
			}
		}
		if (!isPassMobile && (mobile3.val() == "" || mobile3.val().length < 4 || mobile3.val()=="undefined" || mobile3.val()== undefined)) {
			addErrorMessageBox(mobile3.eq(0), "배송지 뒷자리 연락처를 입력해 주세요.");
			isResult = false;
			if (target == undefined) {
				target = mobile3.eq(0);
			}
		}
		
		var resObj = {
			target : target
			, isResult : isResult
		};
		
		return resObj;
	}
	, isValidationEtc : function () {

		var frm = $("form[name='frm']");
		var isResult = true;
		var target = undefined;

		// 실 결제 금액이 있을 경우만
		if (MobileOrderStep1.sum_pay_money > 0) {
			var payType = $("*[name='i_sPayTypecd']", frm).val();

			if (payType == undefined || payType == "") {

				addErrorMessageBox($("*[name='i_sPayTypecd']", frm).eq(0), "결제방법을 선택해 주세요", "");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sPayTypecd']", frm).focus();
				}

			}

			if (payType == "0026"){
				var flagCardBillkey = $("input[name='i_sFlagCardBillkey']").val();

				if (flagCardBillkey != "Y"){
					isResult = false;
					showAppMessageBox({
						message : "결제에 사용할 대표 신용카드가 지정되지 않았습니다."
					});
					return;
				}
			}
		}
		
		var resObj = {
			target : target
			, isResult : isResult
		};
		
		return resObj;
	}
	, setPaymentStatus : function ( status ) {
		// 결제상태 변경
		
		MobileOrderStep1.status = status;
		
		if (status == "ING") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 진행중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else if (status == "FINISH") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 완료 처리중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else {
			
			$(".btn_payment").removeClass("c-gray").addClass("c-blue").text("결제하기");
		}
	}
	//YHCHOI : 사은품 
	,GiftList : function(flag, flag_vip_gift){

		var field				= $(".contView").eq(0);
		var soloPrice			= $(".price",field);
		var arrSoloObj			= $("input[name='i_arrFlagSolo']");
		var soloSize			= arrSoloObj.size();  
		var arrUseSoloObj		= $("input[name='i_arrFlagUseSolo']");
		var i_iSoloPayPriceSum	= 0;
		var cnt					= 0;

		for(var i=0; i<soloSize; i++){
			if((arrSoloObj.eq(i).val() == "Y" && arrUseSoloObj.eq(i).val() == "Y")){
				i_iSoloPayPriceSum += parseInt(fnReplaceCharAll(soloPrice.eq(i).text(),",",""));
				cnt++;
			};
		}

		var i_iPayPriceSum = MobileOrderStep1.sum_pay_price - i_iSoloPayPriceSum;

		$("input[name='i_iSumSoloPrice']").val(i_iPayPriceSum);

		var tr = $(".tr_product_list");
		var size = tr.size();

		var arrParam = [];
		var arrpricebf = [];
		$("#div_bfprdList").html("");

		for(var i=0; i<size; i++){

			var solouseflag	= $("input[name='i_arrFlagUseSolo']",tr.eq(i)).val();
			var beautyflag	= $("input[name='i_arrFlagBeauty']",tr.eq(i)).val();
			var productcd	= $("input[name='i_arrProductcd']",tr.eq(i)).val();
			var optioncd 	= $("input[name='i_arrOptioncd']",tr.eq(i)).val();
			var brandcd	 	= $("input[name='i_arrBrandcd']",tr.eq(i)).val();
			var categorycd	= $("input[name='i_arrCategorycd']",tr.eq(i)).val();

			//YHCHOI : 특별구성 상품으로 들어온 상품, 뷰티포인트 전용 상품, 상품 옵션에서 N인것  제외
			if(solouseflag != "Y" && beautyflag !="Y"){
				arrParam.push("i_arrProductPrice="+ fnReplaceCharAll($(".row_sale_price",tr.eq(i)).text(),",",""));
				arrParam.push("i_arrProductcd="+productcd+"");
				arrParam.push("i_arrOptioncd="+optioncd+"");
				arrParam.push("i_arrBrandcd="+brandcd+"");
				arrParam.push("i_arrCategorycd="+categorycd+"");
				if(brandcd != ""){
					var pricebf	= fnReplaceCharAll($(".row_sale_price",tr.eq(i)).text(),",","");
					arrpricebf.push("<input type='hidden' name='i_arrProductPriceBf' value='"+ pricebf+"'/>");
					arrpricebf.push("<input type='hidden' name='i_arrProductcdbf' value='"+ productcd+"'/>");
					arrpricebf.push("<input type='hidden' name='i_arrOptioncdbf' value='"+ optioncd+"'/>");
					arrpricebf.push("<input type='hidden' name='i_arrBrandcdbf' value='"+ brandcd+"'/>");
				}
			}

		}

		$(arrpricebf.join("\n")).appendTo("#div_bfprdList");

		arrParam.push("i_iPayPrice="+i_iPayPriceSum+"");
		arrParam.push("i_sTargetDtm="+MobileOrderStep1.getPageParam().targetDt+"");
		arrParam.push("i_sLevelcd="+MobileOrderUserInfo.levelcd+"");

		MobileCommon.ajax({
			url				: GLOBAL_WEB_ROOT+"mobile/order/mobile_order_onepay_gift_list_ajax.do"
			, type			: "POST"
			, dataType		: "json"
			, async			: false
			, data			: arrParam.join("&")
			, success		: function (data, textStatus) {

				if(data.status == "succ"){

					var target 			= $("#div_bfreegood");
					var groupcd			= "";
					var vo 				= data.object.giftlist001;
					var betweencnt		= 0;
					var precnt 			= 0;
					var setcnt			= 0;

					//초기화
					target.html("");
					$(".div_no_data").hide();
					//[S]YHCHOI : 구매 금액대별 선택 사은품
					if(vo.length > 0){

						MobileOrderStep1.gift001_cnt = vo.length;

						var arrHtml001	= new Array();

						for(var i=0; i<vo.length; i++){

							betweencnt++;

							if(i>0 && groupcd != vo[i].v_groupcd){
								arrHtml001.push("</ul>");
								arrHtml001.push("</div>");
							}

							var div = $(".chkfreegood");
							if(groupcd != vo[i].v_groupcd){
								var grpsize = $(".check_grpcd_"+vo[i].v_groupcd,div).size();
								
								arrHtml001.push("<div class='giftTit'>");
								arrHtml001.push("	<p class='tit1'>"+vo[i].v_groupnm+" 구매 금액대별 사은품 선택</p>");
								arrHtml001.push("	<p class='tit2'>사은품 <span class='"+vo[i].v_groupcd+"_choice_cnt'>"+vo[i].n_max_choice+"</span>개를 선택해주세요. 재고 부족시 대체품이 발송됩니다.</p>");
								arrHtml001.push("	<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
								arrHtml001.push("	<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
								arrHtml001.push("	<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
								if(grpsize > 0){
									arrHtml001.push("	<span class='span_hide "+vo[i].v_groupcd+"_choose_cnt giftchoose_cnt'>"+grpsize+"</span> ");
									precnt++;
								}else{
									arrHtml001.push("	<span class='span_hide "+vo[i].v_groupcd+"_choose_cnt giftchoose_cnt'>0</span> ");
								}
								arrHtml001.push("</div>");
								arrHtml001.push("<div class='giftListArea'>");
								arrHtml001.push("	<ul>");
								setcnt ++ ;
							}
						
							var cnt = i+1;
							
							arrHtml001.push("	<li>");
							arrHtml001.push("		<div class='prodImg'>");
							arrHtml001.push("			<span class='inputChk4'>");
							if($(".check_prdcd_"+vo[i].v_productcd,div).size() > 0 && $(".check_grpcd_"+vo[i].v_groupcd,div).size() > 0){
								arrHtml001.push("				<input type='checkbox' id='add"+cnt+"' name='i_arrBfreeGoodChk' class='checkbox' value='"+vo[i].v_productcd+";"+vo[i].v_classcd+";"+vo[i].v_groupcd+"'checked='checked'/>");												
							}else{
								arrHtml001.push("				<input type='checkbox' id='add"+cnt+"' name='i_arrBfreeGoodChk' class='checkbox' value='"+vo[i].v_productcd+";"+vo[i].v_classcd+";"+vo[i].v_groupcd+"'/>");												
							}
							arrHtml001.push("				<label for='add"+cnt+"'>");
							arrHtml001.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
							arrHtml001.push("				</label>");						
							arrHtml001.push("			</span>");
							arrHtml001.push("		</div>");
							arrHtml001.push("		<div class='prodDetail'>");

							var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
							arrHtml001.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");
							//gypark : 사은품 정보 아이콘 삽입 
							arrHtml001.push(" <input type='hidden' value='" + vo[i].v_comment + "' name='tag_display' />");								
							arrHtml001.push("			<p class='prodNm'><a href='#' class='tag_info1'>"+vo[i].v_productnm+"&nbsp;</a></p>");

							if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
								arrHtml001.push("			<p class='ml'>"+vo[i].v_capacity+" * </p>");
							}else{
								arrHtml001.push("			<p class='ml'></p>");
							}

							arrHtml001.push("		</div>");
							arrHtml001.push("	</li>");

							groupcd = vo[i].v_groupcd;
						}
						giftparam.giftprecnt	= precnt;
						giftparam.giftcnt		= setcnt;

						if($(".span_pregroupcd").text() == "" && vo != undefined && vo.length > 0){
							$(".span_pregroupcd").text(vo[vo.length-1].v_groupcd);
						}

						target.html("");
						target.html($(arrHtml001.join("")));
						$(".div_between_freegood").show();
						$("#div_bfreegood").show();
						$(".div_no_data").hide();

					}
					//[E]YHCHOI : 구매 금액대별 선택 사은품	

					groupcd			= "";
					vo 				= data.object.giftlist002;
					
					//[S]YHCHOI : 구매 금액대별 고정 사은품
					if(vo.length > 0){
						
						var arrHtml002 	= new Array();

						for(var i=0; i<vo.length; i++){
							
							betweencnt++;
							
							if(i>0 && groupcd != vo[i].v_groupcd){
								
								arrHtml002.push("</ul>");
								arrHtml002.push("</div>");
							}

							if(groupcd != vo[i].v_groupcd){
								
								arrHtml002.push("<div class='giftTit'>");
								arrHtml002.push("	<p class='tit1'>"+vo[i].v_groupnm+"구매 금액대별 고정 사은품</p>");
								arrHtml002.push("	<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
								arrHtml002.push("	<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
								arrHtml002.push("	<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
								arrHtml002.push("<ul>");
								arrHtml002.push("</div>");
								arrHtml002.push("<div class='giftListArea'>");
								arrHtml002.push("	<ul>");
								
							}
						
							arrHtml002.push("	<li>");
							arrHtml002.push("		<div class='prodImg'>");
							arrHtml002.push("			<span class='inputabsol'>");
							arrHtml002.push("				<label>");
							arrHtml002.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
							arrHtml002.push("				</label>");
							arrHtml002.push("			</span>");
							arrHtml002.push("		</div>");
							arrHtml002.push("		<div class='prodDetail'>");

							var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
							arrHtml002.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");
							arrHtml002.push(" <input type='hidden' value='" + vo[i].v_comment + "' name='tag_display' />");
							arrHtml002.push("			<p class='prodNm'><a href='#' class='tag_info1'>"+vo[i].v_productnm+"&nbsp;</a></p>");

							if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
								arrHtml002.push("			<p class='ml'>"+vo[i].v_capacity+" * "+vo[i].n_cnt+"개</p>");
							}else{
								arrHtml002.push("			<p class='ml'>"+vo[i].n_cnt+"개</p>");
							}

							arrHtml002.push("		</div>");
							arrHtml002.push("	</li>");

							groupcd = vo[i].v_groupcd;
						}

						target.html(target.html() + arrHtml002.join(""));
						$(".div_between_freegood").show();
						$("#div_bfreegood").show();
						$(".div_no_data").hide();
					}
					
					if(betweencnt == 0){
						$(".div_between_freegood").hide();
						$("#div_bfreegood").hide();
						if($(".tr_order_coupon_freegood").size() == 0){
							$(".div_no_data").show();
						}else{
							$(".div_no_data").hide();
						}
					}
					// 구매 금액대별 고정 사은품 [e]

					// 스폐셜 사은품 + 데일리 기프트 + 금주의 브랜드 [s]
					vo 			= data.object.giftlist003;
					target		= $("#ul_sfreegood");
					groupcd 	= "";
					//초기화
					target.html("");

					var specialcnt	= 0;
					if(vo.length > 0){
						var arrHtml003 	= new Array();

						for(var i=0; i<vo.length; i++){

							specialcnt++;

							arrHtml003.push("	<li class='li_order_gift' style='float:left;'>");
							if(groupcd != vo[i].v_groupcd){
								arrHtml003.push("		<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
								arrHtml003.push("		<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
								arrHtml003.push("		<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
							
							}
							arrHtml003.push("	</li>");

							groupcd = vo[i].v_groupcd;
						}					
						target.html(arrHtml003.join(""));
					}

					vo 			= data.object.giftlist004;
					groupcd 	= "";
					if(vo.length > 0){
						var arrHtml004 	= new Array();

						for(var i=0; i<vo.length; i++){
							specialcnt++;

							arrHtml004.push("	<li class='li_order_gift'>");
							if(groupcd != vo[i].v_groupcd){
								arrHtml004.push("		<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
								arrHtml004.push("		<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
								arrHtml004.push("		<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
							
							}		
							arrHtml004.push("	</li>");

							groupcd = vo[i].v_groupcd;
						}

						target.html(target.html() +arrHtml004.join(""));
					}	
					
					vo 			= data.object.giftlist005;
					groupcd		= "";
					
					if(vo.length > 0){
						var arrHtml005 	= new Array();

						for(var i=0; i<vo.length; i++){
							specialcnt++;

							arrHtml005.push("	<li class='li_order_gift'>");
							if(groupcd != vo[i].v_groupcd){
								arrHtml005.push("		<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
								arrHtml005.push("		<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
								arrHtml005.push("		<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
							
							}
							arrHtml005.push("	</li>");

							groupcd = vo[i].v_groupcd;
						}				
						
						target.html(target.html() +arrHtml005.join(""));	
						
					}
					// 스폐셜 사은품 + 데일리 기프트 + 금주의 브랜드 [e]

					/* 구매금액 사은품 체크박스 이벤트 [s] */
					$("input:checkbox[name='i_arrBfreeGoodChk']").unbind("click").click(function(event){
						
						var value	= $(this).val().split(";");
						
						var groupcdchk = value[2];
						var productcd  = value[0];
						var choiceCnt = fnOnlyNumber($("."+groupcdchk+"_choice_cnt").text()).number;
						var chooseCnt = fnOnlyNumber($("."+groupcdchk+"_choose_cnt").text()).number;
						var div = $(".chkfreegood");
						if($(this).prop("checked")){
							if(chooseCnt >= choiceCnt){
								showAppMessageBox({message : "1개의 사은품을 선택해 주세요."});
								$(this).prop("checked",false);
								return;
							}
							var inp1 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrChkProductcd","class" : "check_prdcd_"+productcd}).val(productcd);
							var inp2 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrChkGroupcd","class" : "check_grpcd_"+groupcdchk}).val(groupcdchk);
							inp1.appendTo(div);
							inp2.appendTo(div);
							
							chooseCnt +=1;
							
							$(this).prop("checked",true);
							
						}else{
							
							chooseCnt -=1;
							$(".check_prdcd_"+productcd,div).remove();
							$(".check_grpcd_"+groupcdchk,div).remove();
							
							$(this).prop("checked",false);
						}
						
						$("."+groupcdchk+"_choose_cnt").text(chooseCnt);

					});
					/* 구매금액 사은품 체크박스 이벤트 [e] */

					/* VIP/VVIP 사은품 체크박스 이벤트 [s] */
					$("input:checkbox[name='i_arrVipGiftChk']").unbind("click").click(function(){
						var idx			= $("input:checkbox[name='i_arrVipGiftChk']").index($(this));
						var chkCnt		= $("input:checkbox[name='i_arrVipGiftChk']:checked").length;
						var limitCnt	= MobileOrderStep1.vip_free_cnt;
						var target		= $(".tr_vip_gift_list").eq(idx).find(".gift_input_area");

						if($(this).is(":checked")) {
							if ( chkCnt > limitCnt ) {
								showAppMessageBox({message : limitCnt + "개의 사은품을 선택해 주세요."});
								$(this).prop("checked", false);
								return;
							}

							var inp1 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftProductcd"}).val($(".span_vip_gift_productcd").eq(idx).text());
							var inp2 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftProductnm"}).val($(".span_vip_gift_productnm").eq(idx).text());
							var inp3 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftOptioncd"}).val($(".span_vip_gift_optioncd").eq(idx).text());
							var inp4 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftProductCnt"}).val($(".span_vip_gift_product_cnt").eq(idx).text());
							var inp5 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftBrandcd"}).val($(".span_vip_gift_brandcd").eq(idx).text());
							var inp6 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftBrandnm"}).val($(".span_vip_gift_brandnm").eq(idx).text());
							var inp7 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftImg"}).val($(".span_vip_gift_gift_img").eq(idx).text());
							var inp8 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftCapacity"}).val($(".span_vip_gift_capacity").eq(idx).text());
							var inp9 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrVipGiftCnt"}).val($(".span_vip_gift_cnt").eq(idx).text());
							inp1.appendTo(target);
							inp2.appendTo(target);
							inp3.appendTo(target);
							inp4.appendTo(target);
							inp5.appendTo(target);
							inp6.appendTo(target);
							inp7.appendTo(target);
							inp8.appendTo(target);
							inp9.appendTo(target);

						}
						else {
							target.html("");
						}

					});
					/* VIP/VVIP 사은품 체크박스 이벤트 [e] */

				}
				
				//gypark
				$(".tag_info1").click(function(event){
					event.preventDefault();
					var index	= $(".tag_info1").index($(this));
					var tr		= $(".div_choice_list > ul > li").eq(index);
					var tagInfo	= $("input[name='tag_display']", tr).val(); 
					var str		= "";
					str += "<div style='width:90%; text-align:left;margin:0 auto;'>";
					str += "<br />";
					str += "<p style='font-size:1.4em; font-weight:bold'>" + $(".tag_info1").eq(index).text() + "</p><br>";
					str += "<div>" + tagInfo + "</div>";
					str += "<br /></div>";

					$("#modalPopupGiftList .content").html(str);
					modalPopup("#modalPopupGiftList");
				});
			}
		});
	}
	, sum : function (flag) {

		var tr 		= $(".tr_product_list");
		var feild 	= $(".div_product_list");
		var size 	= tr.size();

		var sum_price 				= 0;	// 주문금액
		var sum_pay_price 			= 0;	// 결제금액
		var sum_dis_price 			= 0;	// 할인금액
		var sum_dis_coupon_price	= 0;	// 쿠폰 할인금액
		var sum_pay_bpoint 			= 0;	// 뷰티포인트 결제금액
		var sum_save_bpoint			= 0;	// 적립예정 뷰티포인트 
		var sum_save_mpoint			= 0;	// 적립예정 블루리본 포인트
		var sum_cart_discount		= 0;	// 장바구니 할인
		var sum_need_bpoint			= 0;	// 필요 뷰티포인트
		var sum_dis_channel_price	= 0;	// 채널할인 가격

		var sum_zero_point_price	= 0;	// 뷰티포인트 미적립 금액
		var sum_zero_mpoint_price	= 0;	// 블루리폰 포인트 미적립 금액
		
		var product_temp			= "";	// 1+1 전 구매 상품.
		var preCnt_temp				= 0;	// 1+1 전 구매 상품 갯수.
		var pre_price_temp			= 0; 
		
		//[S] 2016.12.01 YHCHOI : 뷰티포인트 파라미터
		var sum_min_bpoint_price	= 0;
		var arrBpointObj			= [];
		//var arrBrdcd				= ["ALK","AEK","22011","CAK","MCK","AFK","AOK","AMK"];
		//[E] 2016.12.01 YHCHOI : 뷰티포인트 파라미터

		for (var i = 0; i < size; i++) {

			var mPointflag 				= "";
			var	mpoint_per				= 0;
			var bpoint_per				= 0;

			var row_pay_price			= 0;
			var row_dis_ch_price		= 0;
			var row_pay_bpoint			= 0;
			var row_pay_coupon			= 0;

			var row_dis_coupon_price	= 0;
			var row_sale_price			= 0;
			var row_save_bpoint			= 0;
			var row_save_mpoint			= 0;
			var row_cart_discount		= 0;
			var row_need_bpoint			= 0;
			var row_sum_price			= 0;
			var row_dis_price			= 0;

			var channel_dc_per			= MobileOrderStep1.channel_dc_per;
			var channel_dc_brd_exc		= MobileOrderStep1.channel_dc_brd_exc;

			var productcd				= $("input[name='i_arrProductcd']",	tr.eq(i)).val();
			var optioncd				= $("input[name='i_arrOptioncd']",	tr.eq(i)).val();
			var brandcd					= $("input[name='i_arrBrandcd']",	tr.eq(i)).val();

			var price 					= fnOnlyNumber($(".span_price",			tr.eq(i)).text()).number;
			var sale_price				= fnOnlyNumber($(".span_sale_price",	tr.eq(i)).text()).number;
			var beauty_price			= fnOnlyNumber($(".span_beauty_price",	tr.eq(i)).text()).number;

			var onePlusBuyCnt			= fnOnlyNumber($(".span_oneplus_buy_cnt",	tr.eq(i)).text()).number;
			var onePlusGiveCnt			= fnOnlyNumber($(".span_oneplus_give_cnt",	tr.eq(i)).text()).number;
			var isonePlusFlag			= onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;

			var dayoffStockqty			= fnOnlyNumber($(".span_dayoff_stockqty",	tr.eq(i)).text()).number;
			var dayoffcd				= $(".span_dayoffcd",	tr.eq(i)).text();
			var typecd					= $(".span_typecd",		tr.eq(i)).text();

			var save_mpoint 			= 0;
			var save_mpoint_per 		= 0;
			var coupon_beauty_flag		= "Y";

			if(dayoffStockqty > 0 && dayoffcd !="" && dayoffcd != "undefined"){
				sale_price	= fnOnlyNumber($(".span_today_price",	tr.eq(i)).text()).number;
			}else{
				mPointflag	= $(".span_mpoint_per",	tr.eq(i)).text();

				mpoint_per	= mPointflag.substring(mPointflag.indexOf("_")+1);
				bpoint_per	= fnOnlyNumber($(".span_bpoint_per",	tr.eq(i)).text()).number;
				
				if(mPointflag.indexOf("PER_")>-1){
					save_mpoint_per	= MobileOrderStep1.isLogin ? fnOnlyNumber(mpoint_per).number : 0;
				}else{			
					save_mpoint		= MobileOrderStep1.isLogin ? fnOnlyNumber(mpoint_per).number : 0;
				}	
			}

			var cnt					= fnOnlyNumber($("input[name='i_arrProductCnt']",	tr.eq(i)).val()).number;
			var dis_coupon_price	= 0;
			var dis_cp_prod_cnt		= 0;
			var dis_price 			= price - sale_price;

			//[S] 2016.12.01 YHCHOI : 뷰티포인트 파라미터
			var pay_bpoint	= fnOnlyNumber(tr.eq(i).find(".span_bpoint_temp_price").text()).number;
			var bpoint_cnt	= pay_bpoint > 0 ? fnOnlyNumber(tr.eq(i).find(".span_bpoint_temp_cnt").text()).number : 0;
			//[E] 2016.12.01 YHCHOI : 뷰티포인트 파라미터

			if(!isonePlusFlag && typecd !="0003" && !(dayoffStockqty > 0 && dayoffcd !="" && dayoffcd != "undefined")){

				// 금액할인쿠폰(장바구니)
//				if (MobileOrderCoupon.cart_discount_per > 0 && MobileOrderCoupon.cart_max_dcprc !=0) {
//					
//					if((MobileOrderCoupon.cart_flag_brand == "Y"  && MobileOrderCoupon.cart_out_brandcd.indexOf(brandcd) == -1) || MobileOrderCoupon.cart_flag_brand == "N"){
//						
//						if (dis_price == 0 || MobileOrderCoupon.cart_flag_norprc == "Y") {
//
//							dis_cp_prod_cnt	= cnt - bpoint_cnt;
//							
//							dis_coupon_price = Math.round(price * MobileOrderCoupon.cart_discount_per / 100);
//							
//							for(var j=0; j<dis_cp_prod_cnt; j++){
//								
//								if(MobileOrderCoupon.cart_max_dcprc < 0){
//									MobileOrderCoupon.cart_max_dcprc = 0;
//								}
//								
//								if(MobileOrderCoupon.cart_max_dcprc < dis_coupon_price){
//									dis_coupon_price = MobileOrderCoupon.cart_max_dcprc;
//								}
//								
//								MobileOrderCoupon.cart_max_dcprc -= dis_coupon_price;
//								
//								row_cart_discount	+= dis_coupon_price;								 
//								row_pay_coupon		+= dis_coupon_price;
//								row_pay_price		+= price - dis_coupon_price;
//								
//								if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
//									
//									var dis = (price - dis_coupon_price) * (channel_dc_per / 100);
//									var rounddis = parseInt(Math.round(dis/10)*10);
//									var dischprice = (price-dis_coupon_price) - dis;
//									
//									row_dis_ch_price	+= rounddis;
//								}
//								if (MobileOrderCoupon.cart_flag_beauty == "Y"  || (MobileOrderCoupon.cart_flag_beauty == "N" && dis_coupon_price == 0)) {
//									row_save_bpoint	+= Math.round((price - dis_coupon_price) * bpoint_per / 100);
//								}else{
//									coupon_beauty_flag = "N";
//								}
//								
//								row_save_mpoint 	+= save_mpoint + Math.round((price - dis_coupon_price) * save_mpoint_per / 100);
//
//							}
//						}
//					}
//				}
				
			}

			/* n+n 가격 계산 */
			if(isonePlusFlag){

				var list = [];
				var onplus_sale_price	= 0;
				var onplus_dis_ch_price	= 0;
				var totalCnt			= 0;
				var preCnt				= 0;

				var cnt_object		= $("input[name='i_arrProductCnt']",	tr);
				var product_object	= $("input[name='i_arrProductcd']",		tr);
				var flagEvent		= $("input[name='i_arrFlagEvent']",		tr);
				var price_object	= $(".span_price",	tr);
				var cntSize			= cnt_object.size();
				
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
				} else {
					preCnt = preCnt_temp - cnt;
				}
				
				list.push({cnt: cnt, preCnt : preCnt, index : i});
				
				var obj = onePlusPriceResult(totalCnt, price, onePlusBuyCnt, onePlusGiveCnt, list);
				
				var objCnt = onPlusCount(totalCnt, preCnt, cnt ,onePlusBuyCnt, onePlusGiveCnt);
				var nopluscnt = 0;
				var restbuyprice_onplus = 0;
				
				if(obj.length > 0) {
					
					for(var j=0; j<obj.length; j++) {
						onplus_sale_price += parseInt(obj[j].price * obj[j].cnt);	
						if(obj[j].price == price){
							nopluscnt++;
							restbuyprice_onplus += parseInt(obj[j].price * obj[j].cnt);
						}
						if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) < 0) {
							var dis = parseInt(obj[j].price) * (channel_dc_per / 100);
							var rounddis = parseInt(Math.round(dis/10)*10);
							var dischprice = parseInt(obj[j].price) - dis;
							onplus_dis_ch_price += rounddis * obj[j].cnt;
						}
					}
				}
				
				product_temp   = productcd;
				pre_price_temp = price;
				
				row_pay_price	+= onplus_sale_price;
				row_save_mpoint += Math.round((save_mpoint * objCnt.buyCnt) / cnt) * cnt + Math.round(onplus_sale_price * save_mpoint_per / 100);
				row_sum_price 	+= price  * cnt;
				row_dis_price 	+= (price  * cnt) - onplus_sale_price;
				
				var todaydt = $("#i_sTodayDt").val();
				
				if(todaydt >= 20151001){
					if(nopluscnt > 0){
						row_save_bpoint	+= Math.round(restbuyprice_onplus * bpoint_per / 100);
					}else{
						sum_zero_point_price += onplus_sale_price;
						row_save_bpoint	+= 0;
					}
				}else{
					row_save_bpoint	+= Math.round(onplus_sale_price * bpoint_per / 100);
				}
				//YHCHOI : 임시방편으로 마이너스 가격 DISPLAY: NONE;
				if((price*cnt) == onplus_sale_price){
					$(".row_pay_price", feild.eq(i)).parents(".sale").hide();
				}
				
				if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) < 0) {
					row_dis_ch_price += onplus_dis_ch_price;
				}
				
			}else{

				if("Y" == $("input[name='i_arrFlagBeauty']", tr.eq(i)).val()){

					row_pay_price		 += beauty_price * cnt;
					row_save_bpoint		 += 0;
					row_save_mpoint 	 += 0;
					row_need_bpoint 	 += beauty_price * cnt;

					if(MobileOrderStep1.flag_beauty_hotdeal){
						row_sum_price		+= price  * cnt;
					}else{
						row_sum_price 		+= beauty_price * cnt;
					}

				}else{
					
					row_pay_price		 += sale_price * (cnt - dis_cp_prod_cnt - bpoint_cnt);
					
					if(dayoffStockqty > 0 && dayoffcd !=""){
						row_save_bpoint		 += 0;
						row_save_mpoint 	 += 0;	
						sum_zero_point_price += sale_price;
						sum_zero_mpoint_price += sale_price;
					}else{
						var todaydt = $("#i_sTodayDt").val();
						if((todaydt >= 20151001 &&  dis_price > 0)){
							if(MobileOrderUserInfo.levelcd == "LV15" || MobileOrderUserInfo.levelcd == "LV16" || MobileOrderUserInfo.levelcd == "LV17" || MobileOrderUserInfo.levelcd == "LV18" || MobileOrderUserInfo.levelcd == "LV19" || MobileOrderUserInfo.levelcd == "LV20"){
								var saleRate = parseInt((price - sale_price) * 100 / price);
								if(saleRate == 10){
									if(bpoint_per != 0){
										row_save_bpoint += Math.round(sale_price * bpoint_per / 100) * (cnt - dis_cp_prod_cnt - bpoint_cnt);
									}
								}else{
									row_save_bpoint		 += 0;
									if(dis_coupon_price <= 0 || coupon_beauty_flag == "N"){
										sum_zero_point_price += sale_price;
									}
								}
							}else{
								row_save_bpoint		 += 0;
								if(dis_coupon_price <= 0 || coupon_beauty_flag == "N"){
									sum_zero_point_price += sale_price;
								}
							}
						}else{
							row_save_bpoint		 += Math.round(sale_price * bpoint_per / 100) * (cnt - dis_cp_prod_cnt - bpoint_cnt);
						}
						row_save_mpoint 	 += save_mpoint * (cnt - dis_cp_prod_cnt - bpoint_cnt) + Math.round(sale_price * save_mpoint_per / 100) * (cnt - dis_cp_prod_cnt - bpoint_cnt);						
					}
					
					row_need_bpoint += 0;
					row_sum_price 	+= price * (cnt - bpoint_cnt) + (beauty_price * bpoint_cnt);
					
					if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
						var dis = sale_price * (channel_dc_per / 100);
						var rounddis = parseInt(Math.round(dis/10)*10);
						var dischprice = sale_price - dis;
						row_dis_ch_price += rounddis * (cnt - dis_cp_prod_cnt - bpoint_cnt);
					}
				}
				
				if("Y" == $("input[name='i_arrFlagBeauty']", tr.eq(i)).val() && MobileOrderStep1.flag_beauty_hotdeal != "Y"){
					row_dis_price += 0;
				}else{
					row_dis_price += (dis_price  * (cnt - dis_cp_prod_cnt)) - (dis_price * bpoint_cnt);
				}
			}
			
			//YHCHOI : [S]뷰티포인트 관련 추가부분
			var flag_mix 	= tr.eq(i).find("input[name='i_arrFlagMix']").val();
			var flag_beauty = tr.eq(i).find("input[name='i_arrFlagBeauty']").val();
			
			//if(typecd !="0003" && arrBrdcd.join(",").indexOf(brandcd) > -1){
			if(typecd !="0003" && (flag_mix == "Y" || flag_beauty == "Y")){
				
				var feild_bpoint = tr.eq(i).find(".span_bpoint_temp_cnt");

				if(row_dis_price == 0){
					sum_min_bpoint_price += flag_beauty == "Y" ? 0 : price * (cnt - dis_cp_prod_cnt);			
					feild_bpoint.text(cnt - dis_cp_prod_cnt);
				}else{
					feild_bpoint.text(0);
				}
				
				if(pay_bpoint > 0){
					
					var bpoint_as_price = (price * bpoint_cnt) - pay_bpoint;
					//YHCHOI : 현금으로 구입해도 적립이 안되는 더러운 세상 나중에 수정될 것

					if(bpoint_as_price > 0){
						row_pay_price	 += bpoint_as_price;
						row_save_bpoint	 += Math.round(bpoint_as_price * bpoint_per / 100);
						row_save_mpoint  += save_mpoint * bpoint_cnt + Math.round(bpoint_as_price * save_mpoint_per / 100);
						
						//뷰포결제시에도 채널할인부분 RNWOO
						if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
							var dis = (bpoint_as_price/bpoint_cnt) * (channel_dc_per / 100);
							var rounddis = parseInt(Math.round(dis/10)*10);
							var dischprice = bpoint_as_price - dis;
							row_dis_ch_price += rounddis * bpoint_cnt;
						}
					}

					row_pay_bpoint += pay_bpoint;
				}	
			}
			//YHCHOI : [E]뷰티포인트 관련 추가부분
			
			row_dis_coupon_price	+= row_pay_coupon;
			row_sale_price			+= row_pay_price;

			$(".row_pay_price", tr.eq(i)).text(SetNumComma(price * cnt));
			$(".row_sale_price", tr.eq(i)).text(SetNumComma(row_sale_price));
			$(".row_save_bpoint", tr.eq(i)).text(MobileOrderStep1.isLogin ? SetNumComma(row_save_bpoint) : 0);
			$(".row_save_mpoint", tr.eq(i)).text(MobileOrderStep1.isLogin ? SetNumComma(row_save_mpoint) : 0);
			
			if(bpoint_per > 0){
				if(cnt - bpoint_cnt == 0 || row_save_bpoint == 0){
					$(".row_save_bpoint_per", tr.eq(i)).text("(0%)");
				}else{
					$(".row_save_bpoint_per", tr.eq(i)).text(MobileOrderStep1.isLogin ? '('+SetNumComma(bpoint_per)+'%)' : 0);
				}
			}
			
			if(save_mpoint_per > 0){
				
				if(row_save_mpoint == 0){
					$(".row_save_mpoint_per", tr.eq(i)).text("(0%)");
				}else{
					$(".row_save_mpoint_per", tr.eq(i)).text(MobileOrderStep1.isLogin ? '('+SetNumComma(save_mpoint_per)+'%)' : 0);
				}
			}
			
			sum_price 				+= row_sum_price;
			sum_pay_price 			+= row_pay_price - row_need_bpoint;
			sum_dis_coupon_price	+= row_dis_coupon_price;
			sum_pay_bpoint 			+= row_pay_bpoint;
			sum_save_bpoint 		+= row_save_bpoint;
			sum_save_mpoint 		+= row_save_mpoint;
			sum_cart_discount 		+= row_cart_discount;
			sum_need_bpoint			+= row_need_bpoint;
			sum_dis_price			+= row_dis_price;
			sum_dis_channel_price   += row_dis_ch_price;
			
		}

		var sum_mpoint 			= 0;
		var sum_pay_mpoint 		= 0;
		var row_mpoint			= 0;
		var row_pay_mpoint		= 0;

		// VIP 사은품 계산
		tr = $(".tr_vip_gift_list");
		size = tr.size();

		for (var i = 0; i < size; i++) {

			var point = fnOnlyNumber($(".span_mpoint", tr.eq(i)).text()).number;
			var payPoint = fnOnlyNumber($(".span_pay_mpoint", tr.eq(i)).text()).number;
			var cnt = fnOnlyNumber($("*[name='i_arrVipGiftCnt']", tr.eq(i)).val()).number;

			row_mpoint		= point * cnt;
			row_pay_mpoint	= payPoint * cnt;

			sum_mpoint += row_mpoint;
			sum_pay_mpoint += row_pay_mpoint;
		}

		MobileOrderStep1.sum_price 				= sum_price;
		MobileOrderStep1.sum_dis_price 			= sum_dis_price;
		
		MobileOrderStep1.sum_dis_coupon_price 	= sum_dis_coupon_price;
		MobileOrderStep1.sum_pay_price 			= sum_pay_price;
		MobileOrderStep1.sum_dis_channel_price  = sum_dis_channel_price;
		
		MobileOrderStep1.sum_mpoint 			= sum_mpoint;
		MobileOrderStep1.sum_pay_mpoint 		= sum_pay_mpoint;
		MobileOrderStep1.sum_pay_bpoint 		= sum_pay_bpoint;
		
		MobileOrderStep1.sum_save_bpoint		= sum_save_bpoint;
		MobileOrderStep1.sum_save_mpoint		= sum_save_mpoint;
		
		MobileOrderStep1.sum_need_bpoint		= sum_need_bpoint;
		MobileOrderStep1.sum_zero_point_price	= sum_zero_point_price;
		MobileOrderStep1.sum_zero_mpoint_price	= sum_zero_mpoint_price;
		
		MobileOrderStep1.sum_min_bpoint_price	= sum_min_bpoint_price;
		
		MobileOrderStep1.setDeliveryPrice(false);

		MobileOrderStep1.fgSum();
		MobileOrderStep1.setPayStats();
		MobileOrderStep1.GiftList(flag, MobileOrderStep1.flag_vip_gift);

	}
	// 배송비
	, setDeliveryPrice : function ( isPayStats ) {
		
		var isDeliveryToday = false;		// 당일배송여부
		var isDeliveryFree = false;			// 무료배송여부
		
		var isGiftbox = $("input[name='i_sFlagGiftbox_temp']").prop("checked");
		var isNaming  = $("input[name='i_sFlagNaming_temp']").val() == "Y" ? true : false;
		
		if (!isNaming && !isGiftbox) {
			var arrTr = $(".tr_product_list");
			var size = arrTr.size();
			
			for (var i = 0; i < size; i++ ) {
				if ($(".span_delivery_typecd", arrTr.eq(i)).text() == "0002") {
					isDeliveryToday = true;
					break;
				}	
			}
		}
		
		// 무료배송 조건 없음
		if (MobileOrderDelivery.cash_buy_limit > 0 
				|| MobileOrderDelivery.point_buy_limit > 0
				|| MobileOrderDelivery.cash_today_limit > 0
				|| MobileOrderDelivery.point_today_limit > 0
				) {
			
			if (isDeliveryToday && MobileOrderDelivery.cash_today_limit > 0 && MobileOrderDelivery.cash_today_limit <= MobileOrderStep1.sum_pay_price ) {
				isDeliveryFree = true;
			}
			else if (isDeliveryToday && MobileOrderDelivery.point_today_limit > 0 && MobileOrderDelivery.point_today_limit <= MobileOrderStep1.sum_pay_bpoint ) {
				isDeliveryFree = true;
			}
			else if (MobileOrderDelivery.cash_buy_limit > 0 && MobileOrderDelivery.cash_buy_limit <= MobileOrderStep1.sum_pay_price ) {
				isDeliveryFree = true;
			}
			else if (MobileOrderDelivery.point_buy_limit > 0 && MobileOrderDelivery.point_buy_limit <= MobileOrderStep1.sum_pay_bpoint ) {
				isDeliveryFree = true;
			}
			else if(MobileOrderStep1.flag_beauty_hotdeal == "Y"){
				isDeliveryFree = true;
			}
		}
		
		if (isDeliveryFree) {
			MobileOrderStep1.delivery_price = 0;
		}
		else {
			if (isDeliveryToday && MobileOrderStep1.sum_pay_price > 0) {
				MobileOrderStep1.delivery_price = MobileOrderDelivery.cash_today;	
			}
			else if (isDeliveryToday && MobileOrderStep1.sum_pay_bpoint > 0) {
				MobileOrderStep1.delivery_price = MobileOrderDelivery.point_today;
			}
			else if (!isDeliveryToday && MobileOrderStep1.sum_pay_price > 0) {
				MobileOrderStep1.delivery_price = MobileOrderDelivery.cash_buy;
			}
			else if (!isDeliveryToday && MobileOrderStep1.sum_pay_bpoint > 0) {
				MobileOrderStep1.delivery_price = MobileOrderDelivery.point_buy;
			}
			else {
				MobileOrderStep1.delivery_price = MobileOrderDelivery.cash_buy;
			}
		}
		
		if (isPayStats) {
			MobileOrderStep1.setPayStats();
		}
	}	
	, isBpointSetting : function ( tr, feild , sum_pay_bpoint ) {
		
		var el_checkbox		= $("*[name='i_arrFlagBpoint_temp']", feild);
		var el_flag_bpoint 	= $("*[name='i_arrFlagBpoint']", tr);
		var el_pay_bpoint 	= $("*[name='i_arrPayBpoint']", feild);
	
		if (el_flag_bpoint.val() == "Y") {
			var beauty_price = fnOnlyNumber($(".span_beauty_price", tr).text()).number;
			var cnt			 = fnOnlyNumber($("*[name='i_arrProductCnt']", tr).val()).number;
	
			var bpoint 		 = MobileOrderUserInfo.bpoint - sum_pay_bpoint;
			var maxCnt		 = 0;
			
			for (var i = 1; i <= cnt; i++) {
				if (bpoint >= beauty_price * i) {
					maxCnt++;
				}
			}
			
			if (maxCnt == 0) {
				return false;
			}
			else {
				
				if(el_pay_bpoint.val() == 0){

					$("option", el_pay_bpoint).each(function (n) {
						if (n > 0) {						
							$(this).remove();
						}
					});
					
					for (var i = 1; i <= maxCnt; i++) {
						var op = $("<option/>").text(i+"개["+beauty_price * i+"원]").val(beauty_price * i);
						op.appendTo(el_pay_bpoint);
					}
				}
				
				if (el_pay_bpoint.val() == "0" || el_pay_bpoint.val() == "") {
					el_pay_bpoint.val(beauty_price * maxCnt);
				}

				el_pay_bpoint.unbind("change").change(function (event) {
					if(MobileOrderStep1.flag_beauty_hotdeal == "Y"){
						showAppMessageBox({
							message :"뷰티 핫딜 상품은 뷰티포인트로만 구매 가능합니다.",
							close : function(){
								document.frm_reload.submit();
							}
						});
					}else{
						if ($(this).val() == "0") {
							el_checkbox.attr("checkbox", false);
							el_checkbox.click();
							
						}else{
							
							MobileOrderStep1.sum();
						}
					}
				});
				return true;
			}
		}
		else {
			return true;
		}
	}
	, setBpointCheckEvent : function (tr,feild) {

		var el_checkbox 	= $("*[name='i_arrFlagBpoint_temp']", tr);
		var el_flag_bpoint 	= $("*[name='i_arrFlagBpoint']", tr);
		var el_pay_bpoint 	= $("*[name='i_arrPayBpoint']", feild);
		var el_bpoint_area 	= $("*[name='i_arrPayBpoint']", feild);
		
		
		if (el_checkbox.prop("checked")) {
			el_flag_bpoint.val("Y");
			el_bpoint_area.show();
		}
		else {
			el_flag_bpoint.val("N");
			el_pay_bpoint.val("0");
			el_bpoint_area.hide();
		}
		
		MobileOrderStep1.sum();
	}
	, fgSum : function () {
		var tr1 = $(".tr_freegood_list");
		var tr2 = $(".tr_order_coupon_freegood","#div_cpfreegood");
		var size1 = tr1.size();
		var size2 = tr2.size();
		
		var sum_fg_price = 0;
		var sum_fg_mpoint = 0;
		var cnt = 0;
		
		for (var i = 0; i < size1; i++) {
			cnt = fnOnlyNumber($(".span_fg_cnt", tr1.eq(i)).text()).number;	
			sum_fg_price += fnOnlyNumber($(".span_price", tr1.eq(i)).text()).number * cnt;
			sum_fg_price += fnOnlyNumber($(".span_fg_price", tr1.eq(i)).text()).number * cnt;
			sum_fg_mpoint += fnOnlyNumber($(".span_mpoint", tr1.eq(i)).text()).number * cnt;
		}
		
		for (var i = 0; i < size2; i++) {
			cnt = fnOnlyNumber($(".span_fg_cnt", tr2.eq(i)).text()).number;	
			sum_fg_price += fnOnlyNumber($(".span_price", tr2.eq(i)).text()).number * cnt;
			sum_fg_price += fnOnlyNumber($(".span_fg_price", tr2.eq(i)).text()).number * cnt;
			sum_fg_mpoint += fnOnlyNumber($(".span_mpoint", tr2.eq(i)).text()).number * cnt;
		}
		
		MobileOrderStep1.sum_fg_price  = sum_fg_price;
		MobileOrderStep1.sum_fg_mpoint = sum_fg_mpoint;
	}
	, setPayStats : function () {
		
		if (MobileOrderDelivery.naming_limit > 0 && MobileOrderStep1.sum_pay_price >= MobileOrderDelivery.naming_limit) {
			MobileOrderStep1.sum_naming_price = 0;
		}
		
		MobileOrderStep1.sum_pay_money = MobileOrderStep1.sum_pay_price + MobileOrderStep1.delivery_price + MobileOrderStep1.gifgbox_price + MobileOrderStep1.sum_naming_price - MobileOrderStep1.sum_pay_giftcard-MobileOrderStep1.sum_dis_channel_price;
		
		$(".sum_price").text(SetNumComma(""+parseInt(MobileOrderStep1.sum_price)));				 // 주문금액
		$(".sum_dis_price").text(SetNumComma(""+ ((MobileOrderStep1.sum_dis_price) * -1)));		 // 할인금액
		$(".dcadd_price").text(SetNumComma(""+MobileOrderStep1.sum_dis_channel_price*-1));
		
		if(MobileOrderStep1.sum_dis_channel_price > 0){
			$("#chdctitle").show();
			$("#chdcprice").show();
		}else{
			$("#chdctitle").hide();
			$("#chdcprice").hide();
		}
		$(".sum_need_bpoint").text(SetNumComma(""+ (MobileOrderStep1.sum_need_bpoint)));		 // 필요 뷰티 포인트 금액
		$(".sum_dis_coupon_price").text(SetNumComma(""+ MobileOrderStep1.sum_dis_coupon_price)); //총 쿠폰 할인 금액
		$(".sum_pay_giftcard").text(SetNumComma(""+ (MobileOrderStep1.sum_pay_giftcard + MobileOrderStep1.sum_dis_coupon_price)));// 쿠폰 및 기프트카드 사용금액
		$(".sum_pay_bpoint").text(SetNumComma(""+MobileOrderStep1.sum_pay_bpoint));	// 뷰티포인트 결제
		$(".suppl_price").text(SetNumComma("" + (MobileOrderStep1.gifgbox_price + MobileOrderStep1.sum_naming_price) )); //부가 서비스 금액
		$(".delivery_price").text(SetNumComma(""+MobileOrderStep1.delivery_price));	// 배송비
		$(".tot_dcprice").text(SetNumComma(""+parseInt(MobileOrderStep1.sum_dis_price+MobileOrderStep1.sum_dis_channel_price+MobileOrderStep1.sum_dis_coupon_price)));
		
		if(!MobileOrderStep1.isLogin){
			
			if(0>MobileOrderStep1.sum_pay_money){ 
				
				MobileOrderStep1.sum_pay_money = 0;
				
				$(".sum_pay_money").text(""+0);
			}else{
				$(".sum_pay_money").text(SetNumComma(""+MobileOrderStep1.sum_pay_money));								
			}
			
			
		}else{
			
			$(".sum_pay_money").text(SetNumComma(""+MobileOrderStep1.sum_pay_money));
		}

		$(".sum_pay_mpoint").text(SetNumComma(""+MobileOrderStep1.sum_pay_mpoint));	  // 수분포인트 결제

		$(".sum_save_bpoint").text(MobileOrderStep1.isLogin ? SetNumComma("" + MobileOrderStep1.sum_save_bpoint) : 0);
		$(".sum_save_mpoint").text(MobileOrderStep1.isLogin ? SetNumComma("" + MobileOrderStep1.sum_save_mpoint) : 0);
		
		if(MobileOrderStep1.sum_save_bpoint > 0){
			$(".sum_save_bpoint_per").text("("+Math.round((MobileOrderStep1.sum_save_bpoint * 100)/(MobileOrderStep1.sum_pay_money  + MobileOrderStep1.sum_pay_giftcard- MobileOrderStep1.delivery_price - MobileOrderStep1.sum_naming_price - MobileOrderStep1.gifgbox_price - MobileOrderStep1.sum_zero_point_price + MobileOrderStep1.sum_dis_channel_price)*10)/10+"%)");
		}else{
			$(".sum_save_bpoint_per").text("(0%)");	
		}
		
		if(MobileOrderStep1.sum_save_mpoint > 0){
			$(".sum_save_mpoint_per").text("("+Math.round((MobileOrderStep1.sum_save_mpoint * 100)/(MobileOrderStep1.sum_pay_money  + MobileOrderStep1.sum_pay_giftcard- MobileOrderStep1.delivery_price - MobileOrderStep1.sum_naming_price - MobileOrderStep1.gifgbox_price - MobileOrderStep1.sum_zero_mpoint_price + MobileOrderStep1.sum_dis_channel_price)*10)/10+"%)");
		}else{
			$(".sum_save_mpoint_per").text("(0%)");	
		}

		var frm = $("form[name='frm']");
		
		$("input[name='i_iSumPrice']", frm).val(MobileOrderStep1.sum_price + MobileOrderStep1.sum_fg_price);
		$("input[name='i_iSumPayPrice']", frm).val(MobileOrderStep1.sum_pay_money);
		$("input[name='i_iSumPayBpoint']", frm).val(MobileOrderStep1.sum_pay_bpoint);
		$("input[name='i_iSumSaveBpoint']", frm).val(MobileOrderStep1.sum_save_bpoint);
		$("input[name='i_iSumSaveMpoint']", frm).val(MobileOrderStep1.sum_save_mpoint);
		$("input[name='i_iSumNamingPrice']", frm).val(MobileOrderStep1.sum_naming_price);
		$("input[name='i_iSumMpoint']", frm).val(MobileOrderStep1.sum_mpoint);
		$("input[name='i_iSumPayMpoint']", frm).val(MobileOrderStep1.sum_pay_mpoint);
		$("input[name='i_iSumDisCouponPrice']", frm).val(SetNumComma(MobileOrderStep1.sum_dis_coupon_price));
		$("input[name='i_iDeliveryPrice']", frm).val(MobileOrderStep1.delivery_price);

		if (MobileOrderStep1.sum_pay_money == 0) {
			$("#i_sPayTypecd").val("");
			$(".order_payment_choose").hide();
			//gypark : 결제금액이 0일때, 결제수단 저장 비노출
			$(".lastpaysave").hide();
			$("input[name='i_sSaveUserPayment']").attr("checked", false);
		}
		else {
			$(".order_payment_choose").show();
			$(".lastpaysave").show();
		}
		
		var summary = $(".summary_ord");
		$(".price>em",summary).text(SetNumComma(MobileOrderStep1.sum_pay_money));
	}
	, setGiftcardClear : function(){
		$("input[name='i_arrGiftChk']").attr("checked", false);
		$("input[name='i_arrPayGiftcard']").val("0");
		$("input[name='i_arrPayGiftcard']").attr("disabled", true);
		MobileOrderGiftCard.setPayGiftcard("", 0);
		MobileOrderGiftCard.cnt = $("input[name='i_sGiftcardCnt']").val();
		MobileOrderGiftCard.balance = $("input[name='i_sGiftcardTotalPrice']").val();
		MobileOrderGiftCard.setGiftcard(MobileOrderGiftCard.cnt, MobileOrderGiftCard.balance);
		$("#div_complete_gift_card").html("");
	}
	, showONEpayLoadingBox : function() {
		$("#modalOnepayLoading").show();
	}
	, hideONEpayLoadingBox : function() {
		$("#modalOnepayLoading").hide();
	}
};

var submitFunc = function cnspaySubmit(data){

	if(data.RESULT_CODE == '00') {
		document.frm_kakao_pay.submit();
	}else {
		alert("결제요청 실패입니다.["+data.RESULT_MSG+"]");
		MobileOrderStep1.status = status;
		
		if (status == "ING") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 진행중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else if (status == "FINISH") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 완료 처리중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else {
			$(".overlay").remove();
			$(".btn_payment").removeClass("c-gray").addClass("c-blue").text("결제하기");
			
		}
	}

};

