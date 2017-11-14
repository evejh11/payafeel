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
	, init : function(){
		
		MobileOrderDelivery.cash_buy 			= fnOnlyNumber($("input[name='i_iCashBuy']").val()).number;
		MobileOrderDelivery.cash_buy_limit 		= fnOnlyNumber($("input[name='i_iCashBuyLimit']").val()).number;
		MobileOrderDelivery.point_buy 			= fnOnlyNumber($("input[name='i_iPointBuy']").val()).number;
		MobileOrderDelivery.point_buy_limit 	= fnOnlyNumber($("input[name='i_iPointBuyLimit']").val()).number;
		MobileOrderDelivery.cash_today 			= fnOnlyNumber($("input[name='i_iCashToday']").val()).number;
		MobileOrderDelivery.cash_today_limit 	= fnOnlyNumber($("input[name='i_iCashTodayLimit']").val()).number;
		MobileOrderDelivery.point_today 		= fnOnlyNumber($("input[name='i_iPointToday']").val()).number;
		MobileOrderDelivery.point_today_limit 	= fnOnlyNumber($("input[name='i_iPointTodayLimit']").val()).number;
		MobileOrderDelivery.gift_box 			= fnOnlyNumber($("input[name='i_iGiftBox']").val()).number;
		MobileOrderDelivery.gift_box_limit 		= fnOnlyNumber($("input[name='i_iGiftBoxLimit']").val()).number;
		MobileOrderDelivery.naming 				= fnOnlyNumber($("input[name='i_iNaming']").val()).number;
		MobileOrderDelivery.naming_limit 		= fnOnlyNumber($("input[name='i_iNamingLimit']").val()).number; 
		
		MobileOrderDelivery.addBtnEvent();
		
	}
	,addBtnEvent : function(){

		//YHCHOI : 배송지 선택
		$("select[name='i_sDeliveryChoose']").change(function(event) {
			MobileAddress.changeDeliveryChoose();
		});
		
		//YHCHOI : 배송지 추가 
		$(".btn_delivery_add").click(function(event){
			MobileAddress.field = $(".order").eq(0);
			
		    var	delievery = {
					flag : "R"
					,addresscd : ""
					,type : "order"
					,ordercd : ""
				};
		    
			MobileAddress.deliveryProgress(delievery);
		});	
		
		//YHCHOI : 배송지 변경 
		$(".btn_delivery_modify").click(function(event){
			event.preventDefault();
			var addresscd = $("select[name='i_sDeliveryChoose']").val();
			
			if (addresscd == "") {
				showMessageBox({message : "변경하실 배송지를 선택해 주세요."});
				return;
			}
			
			MobileAddress.field = $(".order").eq(0);
			
		    var	delievery = {
					flag : "M"
					,addresscd : addresscd
					,type : "order"
					,ordercd : ""
				};
		    
			MobileAddress.deliveryProgress(delievery);
		});	
		
		$(".btn_zip2").click(function(event){

			event.preventDefault();
			
			MobileZip.field = $(".order").eq(0);
			
			var addr = {
				type : "order",
				orgZip1Name : "i_sDeliveryZip1",
				orgZip2Name : "i_sDeliveryZip2",
				orgAddr1Name : "i_sDeliveryAddress1",
				orgAddr2Name : "i_sDeliveryAddress2"
			};
			
			MobileZip.fn.zipProgress(addr);
			
		});
		
		$(".btn_delivery_reg").click(function(event){
			
			var frm = $("form[name='frm_delivery_addr']");
			
			var addrnm = $("input[name='i_sAddressnm']", frm);
			var addrsee = $("input[name='i_sAddressee']", frm);
			var tel1 = $("select[name='i_sTel1']", frm);
			var tel2 = $("input[name='i_sTel2']", frm);
			var tel3 = $("input[name='i_sTel3']", frm);
			var mobile1 = $("select[name='i_sMobile1']", frm);
			var mobile2 = $("input[name='i_sMobile2']", frm);
			var mobile3 = $("input[name='i_sMobile3']", frm);
			var zip1 = $("input[name='i_sZip1']", frm);
			var zip2 = $("input[name='i_sZip2']", frm);
			var addr1 = $("input[name='i_sAddr1']", frm);
			var addr2 = $("input[name='i_sAddr2']", frm);
			isCheck = true;
			if(addrnm.val()  == ""){
				addErrorMessageBox(addrnm, "배송지명을 입력해주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addrnm);
			}
			if(addrsee.val()  == ""){
				addErrorMessageBox(addrsee, "수신인 이름을 입력해주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addrsee);
			}
			
			/**gypark : AP몰 개선(일반전화 필수값 해제)*/
			
			/*if(tel1.val()  == ""){
				addErrorMessageBox(tel1, "배송지 앞자리 연락처를 선택해주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(tel1);
			}
			if(tel2.val()  == ""){
				addErrorMessageBox(tel2, "배송지 중간자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(tel2);
			}
			if(tel3.val()  == ""){
				addErrorMessageBox(tel3, "배송지 뒷자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(tel3);
			}*/
			if(mobile1.val()  == ""){
				addErrorMessageBox(mobile1, "배송지 앞자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile1);
			}
			if(mobile2.val()  == ""){
				addErrorMessageBox(mobile2, "배송지 중간자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile2);
			}
			if(mobile3.val()  == ""){
				addErrorMessageBox(mobile3, "배송지 뒷자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile3);
			}
			if(zip1.val()  == ""){
				addErrorMessageBox(zip1, "우편번호를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(zip1);
			}
			if(zip2.val()  == ""){
				addErrorMessageBox(zip2, "우편번호를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(zip2);
			}
			if(addr1.val()  == ""){
				addErrorMessageBox(addr1, "주소를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addr1);
			}
			if(addr2.val()  == ""){
				addErrorMessageBox(addr2, "주소를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addr2);
			}
			if(!isCheck){
				return;
			}
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/comm/mobile_comm_address_save_ajax.do"
				, type : "POST"
				, data : frm.serialize()
				, dataType : "json"
				, animation	: false
				, success : function ( data, textStatus, jqXHR) {
					
					if(data.status == "succ"){
						
						var key = data.object.i_sAddresscd;

						MobileCommon.ajax({
							url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_address_list_ajax.do"
							, type : "POST"
							, dataType : "json"
							, animation : false
							, success : function ( data, textStatus, jqXHR) {

								var target 	= $("#div_delivery_choose_area");
								var vo		= data.object;
								var arrHtml = new Array();
							
								arrHtml.push("<span class='cell'>");
								arrHtml.push("	<select id='' name='i_sDeliveryChoose' class='selectBox v2'>");
								arrHtml.push("		<option value=''>선택</option>");
								
								for(var i=0; i<vo.length; i++){
									
									var defaultmsg = vo[i].v_flag_default == "Y" ? "(기본배송지)" : "";
									
									arrHtml.push("	<option value='"+vo[i].v_addresscd+"'>"+vo[i].v_addressnm+""+defaultmsg+"</option>");
									
								}
								
								arrHtml.push("	</select>");
								
								for(var i=0; i<vo.length; i++){
									
									arrHtml.push("<span class='span_hide span_"+vo[i].v_addresscd+"'>");
									arrHtml.push("	<span class='span_addressnm'>"+vo[i].v_addressnm+"</span>");
									arrHtml.push("	<span class='span_receivernm'>"+vo[i].v_addressee+"</span>");
									arrHtml.push("	<span class='span_zip1'>"+vo[i].v_post_code1+"</span>");
									arrHtml.push("	<span class='span_zip2'>"+vo[i].v_post_code2+"</span>");
									arrHtml.push("	<span class='span_addr1'>"+vo[i].v_address1+"</span>");
									arrHtml.push("	<span class='span_addr2'>"+vo[i].v_address2+"</span>");
									arrHtml.push("	<span class='span_phone1'>"+vo[i].v_tel1+"</span>");
									arrHtml.push("	<span class='span_phone2'>"+vo[i].v_tel2+"</span>");
									arrHtml.push("	<span class='span_phone3'>"+vo[i].v_tel3+"</span>");
									arrHtml.push("	<span class='span_mobile1'>"+vo[i].v_mobile1+"</span>");
									arrHtml.push("	<span class='span_mobile2'>"+vo[i].v_mobile2+"</span>");
									arrHtml.push("	<span class='span_mobile3'>"+vo[i].v_mobile3+"</span>");

									arrHtml.push("</span>");
									
								}
								
								arrHtml.push("</span>");
								target.html($(arrHtml.join("")));
								
								$("select[name='i_sDeliveryChoose']",target).change(function(event) {
									MobileAddress.changeDeliveryChoose();
								});
								
								$("select[name='i_sDeliveryChoose']",target).val(key).change();
								
								MobileAddress.deliveryComplete(frm);
							}
						});
						
					}				
				}
			});			
		});

	}
	/**gypark : AP몰 개선 - 전화번호 입력시, 숫자가 아니면 alert창 뜨게 함 [s] */	
	, isDigit2 : function(obj, keyCode){
		
			if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 110 && keyCode <= 123)){
				showMessageBox({
					message : "숫자를 입력해 주세요."
					, close : function(){
						obj.focus();
//						obj.val("");
						return false;
					}
				});
			}
			
			else if((keyCode >= 12592 && keyCode <= 12687)){
				showMessageBox({
					message : "숫자를 입력해 주세요."
					, close : function(){
						obj.focus();
//						obj.val("");
						return false;
					}
				});
			}
			
			else if ((keyCode > 32 && keyCode < 48) || (keyCode > 57 && keyCode < 65) ||
					(keyCode > 90 && keyCode < 95) || (keyCode < 128 && keyCode > 122)){
				showMessageBox({
					message : "숫자를 입력해 주세요."
					, close : function(){
						obj.focus();
//						obj.val("");
						return false;
					}
				});
			}
			else {
				return true;
			}
		/**gypark : AP몰 개선 - 전화번호 입력시, 숫자가 아니면 alert창 뜨게 함 [e] */	
	}
	, changeDelivery : function ( vo ) {
		
		$("input[name='i_sDeliveryReceivernm']").val(vo.v_receivernm);
		$("select[name='i_sDeliveryMobile1']").val(vo.v_mobile1);
		$("input[name='i_sDeliveryMobile2']").val(vo.v_mobile2);
		$("input[name='i_sDeliveryMobile3']").val(vo.v_mobile3);
	}
};

var MobileOrderUserInfo = {
		  name   : "MobileOrderUserInfo"
		, mpoint : 0
		, bpoint : 0
		, levelcd : ""
		, init : function(){
			
			MobileOrderUserInfo.mpoint = parseInt($("input[name='i_iUserMpoint']").val(), 10);
			MobileOrderUserInfo.bpoint = parseInt($("input[name='i_iUserBpoint']").val(), 10);
			MobileOrderUserInfo.levelcd = $("input[name='i_sUserLevelcd']").val();			
		}
		,nonmemberSetting : function(){
			   
			   if(!MobileOrderStep1.isLogin){

				   $(".tr_delivery_select_area").remove();
				   $(".additional_service_area").remove();
				   
				   var size = $(".order_step_count").parents(".tit").not(".additional_service_area").size();
				   
				   for(var i=0; i<size; i++){
					   
					   var cnt = i+1;

					   $(".order_step_count").eq(i).text(cnt);
				   }
				   
			   }
		}
};


var MobileOrderCoupon = {
	  name : "MobileOrderCoupon"
	, cart_discount_per   : 0
	, cart_discount 	  : 0
	, cart_max_dcprc	  : 0
	, cart_ori_max_dcprc  : 0
	, cart_user_couponcd  : ""
	, cart_flag_beauty 	  : ""
	, cart_flag_brand	  : ""
	, cart_out_brandcd	  : ""
	, cart_flag_norprc	  : ""
	, list 				  : undefined		 
	, init : function(){
		MobileOrderCoupon.addBtnEvent();
	}
	,addBtnEvent : function(){

		//YCHOI : 라네즈 쿠폰 사용 창
		$(".btn_user_coupon_pop").unbind("click").click(function(event){
			event.preventDefault();
			
			if (!MobileOrderStep1.isLogin) {
				showMessageBox({message : "쿠폰을 사용하시려면 로그인을 해야해요.<br/>로그인 하시겠어요?"});
				return;
			}
			
			var evtCatecd = $("input[name='i_sEvtCategorycd']").val();
			
			if (evtCatecd == "EP001" || evtCatecd == "EP002" || evtCatecd == "EP003"){
				showMessageBox({message : "이 상품은 쿠폰할인 적용이 안되요."});
				return;
			}
			
			var usedCpCnt = MobileOrderCoupon.getUsedCouponCnt();

			if (usedCpCnt > 0) {
				MobileOrderCoupon.clearCoupon("clear");
			}
			else {
				MobileOrderCoupon.clearCoupon();
				MobileOrderCoupon.showUserCouponPopup();
			}
			
		});
		
		//YHCHOI : 라네즈 쿠폰 등록 창 SHOW
		$(".btn_coupon_show").click(function(event) {
			event.preventDefault();

			if($(".div_coupon_reg").css("display") == "none"){
				$(".div_coupon_reg").show();				
			}else{
				$(".div_coupon_reg").hide();
			}
		});
		
		//YHCHOI : 라네즈 쿠폰 등록
		$(".btn_coupon_reg").click(function(event) {
			event.preventDefault();
			
			if (!MobileOrderStep1.isLogin) {
				showMobileMessageBox({message : "쿠폰을 사용하시려면 로그인을 해야해요.<br/>로그인 하시겠어요?"});
				return;
			}
			
			MobileOrderCoupon.couponReg();
		});
		
		$("#div_coupon_list").on("click","input[name='i_arrCheckbox']",function(event) {
			var tr 	  = $(this).parents(".tr_coupon_list").eq(0);
			var type  = $(".span_typecd",tr).text();
			
			var cnt   = $(".tr_coupon_list").index(tr)+1;

			var user_couponcd 	= $(".span_user_couponcd",tr).text();
			var flag_prod_all   = $(".span_flag_prod_all",tr).text();
			var tr_prod 		= $(".tr_" + user_couponcd);
			var rd_prod 		= $("input[name='i_arrRadio"+cnt+"']", tr_prod);
			var size 			= rd_prod.size();
			
			//YHCHOI : 사은품, 장바구니 쿠폰 사용시 중복 쿠폰 사용 불가능			
			var arrChk 			= $("input[name='i_arrCheckbox']");

			var arrChkSize		= arrChk.size();
			for (var i = 0; i < arrChkSize; i++) {
				
				if(type == "0004" || type == "0006"){

					if (arrChk.eq(i).prop("checked") && arrChk.eq(i).val() != user_couponcd) {
						var tr_check = arrChk.eq(i).parents(".tr_coupon_list").eq(0);
						if($(".span_typecd",tr_check).text() != "0005"){
							arrChk.eq(i).prop("checked", false); 
							var chkurcpcd = $(".span_user_couponcd",tr_check).text();
							
							$(".tr_coupon_prod_list").hide();
							$("input:radio",".tr_"+chkurcpcd).prop("checked",false);
						}
					}
					
				}else{
				
					var subtr = arrChk.eq(i).parents(".tr_coupon_list").eq(0);
					var subtype = $(".span_typecd",subtr).text(); 
					var subusercoupon = $(".span_user_couponcd",subtr).text(); 
					
					if(type != "0005" && type != "0003"){
						if (subtype == "0004" || subtype == "0006") {
							arrChk.eq(i).prop("checked", false); 
							$(".tr_"+subusercoupon).hide();	
							$("input:radio",".tr_"+subusercoupon).prop("checked",false);							
						}
					}
					
					if(type == "0003"){
						var tr_check = arrChk.eq(i).parents(".tr_coupon_list").eq(0);
						if($(".span_typecd",tr_check).text() == "0003"){
							var chkurcpcd = $(".span_user_couponcd",tr_check).text();
							if(user_couponcd != chkurcpcd){
								arrChk.eq(i).prop("checked", false); 
								$("input:radio",".tr_"+chkurcpcd).prop("checked",false);
							}
						}
					}
				}
			}

			if ($(this).prop("checked")) {
				
				if(!(type == "0005" && flag_prod_all == "Y")){					
					tr_prod.show();
				}

				if (size == 1) {
					rd_prod.eq(0).prop("checked", true);
				}
				
				if(type == "0005" && flag_prod_all == "Y"){
					rd_prod.eq(0).prop("checked", true);
				}
				
				MobileOrderCoupon.fnApplyTemp(user_couponcd , type);
			}
			else {
				if(type == "0005"){
					$(".tr_cpfr_li_"+user_couponcd).parent().remove();
					if($(".tr_order_coupon_freegood").size()<=0){
						$(".div_coupon_freegood").hide();
					}
				}
				if(type == "0003"){
					MobileOrderStep1.flag_use_delivery_coupon = "N";
				}
				tr_prod.hide();
				rd_prod.prop("checked", false);
				MobileOrderCoupon.fnApplyTemp(user_couponcd, type);
			}
			//$(".addSearch").resize();
			$("#modalPopupCoupon").contents().find(".content").resize();
			
		});
		 
		$("#div_coupon_list").on("click",".prdCpCkr",function(event) {
			//event.preventDefault();
			var usercpcd = $(this).parents(".tr_coupon_prod_list").eq(0).attr("id");
			MobileOrderCoupon.fnApplyTemp(usercpcd , '');
			
		});
		
		$("#div_coupon_list").on("click",".btn_coupon_apply",function(event) {
			event.preventDefault();
			MobileOrderCoupon.fnApply();
			
		});
		
		$("#dl_coupon_list").on("click",".btn_delete_coupon",function(event) {
			event.preventDefault();
			
			var value  = $(this).attr("id").split(";");
			
			var typecd	  = value[0];
			var productcd = "";
			var user_couponcd = "";
			if(typecd == "0005"){
				user_couponcd = value[1];
			}else{
				productcd = value[1];
			}
			var index  = $(".btn_delete_coupon").index($(this));
	
			var couponDt = $("#dl_coupon_list").find("dt");
			var couponDd = $("#dl_coupon_list").find("dd");
			
			couponDt.eq(index).remove();
			couponDd.eq(index).remove();
			if(typecd == "0005"){
				$(".span_"+user_couponcd).remove();
			}
			var afterIndex = index;
			var prevIndex  = 0;
			
			var indexFlag = true;
		
			var data = MobileOrderCoupon.list;
			
			for(var i=0; i<data.length; i++){
				
				if(data[i].v_flag_option == "Y"){
					
					if(data[i].v_productcd.split("_")[0] == productcd){
						
						if(indexFlag){
							indexFlag = false;
							prevIndex = i;
						}
						
						afterIndex++;
					}
					
				}else{
					
					if(data[i].v_productcd == productcd){
						
						if(indexFlag){
							indexFlag = false;
							prevIndex = i;
						}
						
						afterIndex++;
					}						
					
				}
			}
			
			console.log(JSON.stringify(MobileOrderCoupon.list));
			
			MobileOrderCoupon.list.splice(prevIndex, afterIndex);
			
			if(typecd == "0004"||typecd == "0006"){
				
				MobileOrderCoupon.clearCartCoupon();
				
			}else if(typecd == "0005"){
				
				$(".tr_cpfr_li_"+user_couponcd).parent().remove();
				if($(".tr_order_coupon_freegood").size()<=0){
					$(".div_coupon_freegood").hide();
					$("#div_cpfreegood").html("");
				}
			}

			MobileOrderStep1.sum("clear");
		});
		/**gypark : AP몰 개선 - 전화번호 입력시, 숫자가 아니면 alert창 뜨게 함 [s] */
		$("input[name='i_sDeliveryPhone2']").keydown(function(event){
			var keyCode = event.keyCode;
			MobileOrderDelivery.isDigit2($(this), keyCode);
		});
		
		$("input[name='i_sDeliveryPhone3']").keydown(function(event){
			var keyCode = event.keyCode;
			MobileOrderDelivery.isDigit2($(this), keyCode);
		});
		
		$("input[name='i_sDeliveryMobile2']").keydown(function(event){
			var keyCode = event.keyCode;
			MobileOrderDelivery.isDigit2($(this), keyCode);
		});
		
		$("input[name='i_sDeliveryMobile3']").keydown(function(event){
			var keyCode = event.keyCode;
			MobileOrderDelivery.isDigit2($(this), keyCode);
		});
	
	}
	
	, getUsedCouponCnt : function () {
		var cnt = 0;
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		var arrCouponnm = [];
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_flag_use == "Y") {
				arrCouponnm.push(MobileOrderCoupon.list[i].v_couponnm);
				cnt++;
			}
		}
		
		return cnt;
	}
	, clearCoupon : function (flag) {
		MobileOrderCoupon.list = undefined;
		MobileOrderCoupon.clearCartCoupon();
		MobileOrderCoupon.productCntCheck("","N","");
		var arrChk 			= $("input[name='i_arrCheckbox']");

		var arrChkSize		= arrChk.size();
		for (var i = 0; i < arrChkSize; i++) {
			if (arrChk.eq(i).prop("checked")) {
				arrChk.eq(i).prop("checked", false); 
				
				$(".tr_coupon_prod_list").hide();
				$("input:radio",".tr_coupon_prod_list").prop("checked",false);
			}
		}
		$(".tr_order_coupon_freegood").remove();
		$(".div_coupon_freegood").hide();
		$("#dl_coupon_list").html("");
		
		MobileOrderStep1.sum(flag);
	}
	, clearCartCoupon : function () {
		MobileOrderCoupon.cart_discount 	 = 0;
		MobileOrderCoupon.cart_discount_per  = 0;
		MobileOrderCoupon.cart_max_dcprc	 = 0;
		MobileOrderCoupon.cart_user_couponcd = "";
		MobileOrderCoupon.cart_flag_beauty	 = "";
		MobileOrderCoupon.cart_flag_brand  	 = "";
		MobileOrderCoupon.cart_out_brandcd 	 = "";
		MobileOrderCoupon.cart_flag_norprc   = "";
	}
	// 쿠폰 사용여부 초기화
	, clearFlagUse : function () {
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_flag_use != "D") {
				MobileOrderCoupon.list[i].v_flag_use = "N";
			}
		}
	}
	, changeFlagUse : function (user_couponcd, flag) {
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_user_couponcd == user_couponcd) {
				MobileOrderCoupon.list[i].v_flag_use = flag;
				break;
			}
		}
	}
	, changeFlagOptionUse : function (user_couponcd, productcd, flag) {
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_user_couponcd == user_couponcd && MobileOrderCoupon.list[i].v_productcd == productcd) {
				MobileOrderCoupon.list[i].v_flag_use = flag;
				break;
			}
		}
	}	
	, getDeliveryCoupon : function () {
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_flag_use != "D" && MobileOrderCoupon.list[i].v_typecd == "0003") {
				return MobileOrderCoupon.list[i];
			}
		}
		return null;
	}	
	//YHCHOI : 이 부분도 수정이 필요함. MobileOrderStep1.sum() 부분에서 나중에 처리하도록 바꾸자.
	, getCouponInfo : function (productcd, typecd) {
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		
		var returnList = [];

		for (var i = 0; i < size; i++) {
			
			if (MobileOrderCoupon.list[i].v_flag_use == "D" || MobileOrderCoupon.list[i].v_flag_use == "Y") {
				continue;
			}
			
			if (typecd == "0005") {
				if (MobileOrderCoupon.list[i].v_typecd == typecd && MobileOrderCoupon.list[i].v_productcd.indexOf(productcd) > -1) {
					
					returnList.push({
						  v_user_couponcd : MobileOrderCoupon.list[i].v_user_couponcd
						, v_couponcd : MobileOrderCoupon.list[i].v_couponcd
						, v_couponnm : MobileOrderCoupon.list[i].v_couponnm
						, v_typecd : MobileOrderCoupon.list[i].v_typecd
						, n_pay_money : MobileOrderCoupon.list[i].n_pay_money
						, v_flag_pay_money : MobileOrderCoupon.list[i].v_flag_pay_money
						, n_min_money : MobileOrderCoupon.list[i].n_min_money
						, v_discount_text : MobileOrderCoupon.list[i].v_discount_text
						, v_flag_beauty : MobileOrderCoupon.list[i].v_flag_beauty
						, v_flag_norpc_apply : MobileOrderCoupon.list[i].v_flag_norpc_apply
						, v_productcd : MobileOrderCoupon.list[i].v_productcd
						, v_flag_use : "N"
						, v_flag_option : MobileOrderCoupon.list[i].v_flag_option
						, n_max_dcprc : MobileOrderCoupon.list[i].n_max_dcprc							
					});
				}
			}
			else {
				
				if (MobileOrderCoupon.list[i].v_typecd == typecd && MobileOrderCoupon.list[i].v_productcd.indexOf(productcd) > -1) {
					
					returnList.push({
						  v_user_couponcd : MobileOrderCoupon.list[i].v_user_couponcd
						, v_couponcd : MobileOrderCoupon.list[i].v_couponcd
						, v_couponnm : MobileOrderCoupon.list[i].v_couponnm
						, v_typecd : MobileOrderCoupon.list[i].v_typecd
						, n_pay_money : MobileOrderCoupon.list[i].n_pay_money
						, v_flag_pay_money : MobileOrderCoupon.list[i].v_flag_pay_money
						, n_min_money : MobileOrderCoupon.list[i].n_min_money
						, v_discount_text : MobileOrderCoupon.list[i].v_discount_text
						, v_flag_beauty : MobileOrderCoupon.list[i].v_flag_beauty
						, v_flag_norpc_apply : MobileOrderCoupon.list[i].v_flag_norpc_apply
						, v_productcd : MobileOrderCoupon.list[i].v_productcd
						, v_flag_use : "N"
						, v_flag_option : MobileOrderCoupon.list[i].v_flag_option
						, n_max_dcprc : MobileOrderCoupon.list[i].n_max_dcprc
					});
				}
				
			}
		}
		
		return returnList;
	}
	, showUserCouponPopup : function () {
		var arrProductcd = $("input[name='i_arrProductcd']", ".tr_product_list");
		var arrOptioncd = $("input[name='i_arrOptioncd']", ".tr_product_list");
		var size = arrProductcd.size();
		var arrParam = new Array();
		
		arrParam.push("i_iSumPayPrice=" + MobileOrderStep1.sum_pay_price);
		arrParam.push("i_iDeliveryPrice=" + MobileOrderStep1.delivery_price);
		arrParam.push("i_sTargetDtm=" + MobileOrderStep1.getPageParam().targetDt);
		
		for (var i = 0; i < size; i++) {
			arrParam.push("i_arrProductcd=" + arrProductcd.eq(i).val());
			arrParam.push("i_arrOptioncd=" + arrOptioncd.eq(i).val());
		}
		
		if(GLOBAL_MOBILE_APP=="APP"){
			arrParam.push("i_sFlagAppOpen=Y");
		}
		
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_coupon_ajax.do"
			, type : "POST"
			, data : arrParam.join("&")
			, dataType : "json"
			, animation	: false
			, success : function ( data, textStatus, jqXHR) {
				
				if(data.status == "succ"){
					
					MobileOrderHtml.CouponLayerPopup(data);

				}				
			}
		});
	}
	, getCheckCouponUsedAll : function () {
		var obj = {
			isUsedAll : true
			, data : undefined
		};
		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		var pay_price = MobileOrderStep1.sum_pay_price + MobileOrderStep1.sum_dis_coupon_price;
		
		for (var i = 0; i < size; i++) {
			if(MobileOrderCoupon.list[i].v_typecd != "0005"){
				if (MobileOrderCoupon.list[i].n_min_price > pay_price || MobileOrderCoupon.list[i].v_flag_use == "N") {
					
					MobileOrderCoupon.list[i].v_flag_use = "D";
					
					if (MobileOrderCoupon.list[i].v_typecd == "0004" || MobileOrderCoupon.list[i].v_typecd == "0006") {
						MobileOrderCoupon.clearCartCoupon();
					}
					obj.isUsedAll = false;
					obj.data = MobileOrderCoupon.list[i];
					break;
				}else{
					MobileOrderCoupon.list[i].v_flag_use == "Y";
				}
			}
		}
		return obj;
	}
	, couponReg : function() {
		
		if(isEmpty($("input[name='i_sCertifyCode']").val())) {
			showMessageBox({message : "쿠폰 번호를 입력해주세요."});
			return;
		}
		
		var flagAppOpen = "N";
		
		if(GLOBAL_MOBILE_APP=="APP"){
			flagAppOpen = "Y";
		}

		var today = $("input[name='i_sToday']").val();
		var code = $("input[name='i_sCertifyCode']").val();
		if(today >= 20151101 && (code =="apmallnew" || code =="apmallfriends")){
			showMessageBox({
				message : "한정수량 마감으로 등록되지 않습니다."
			});
		}else{
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_coupon_save.do"
				, type : "POST"
					, data : {
						i_sCertifyCode : $("input[name='i_sCertifyCode']").val()
						, i_sFlagMobile : "Y"
							, i_sFlagAppOpen : flagAppOpen
					}
			, dataType : "json"
				, animation: false
				, success : function(data, textStatus, jqXHR) {
					if(data.status == "succ") {
						
						showMessageBox({message : "쿠폰이 등록되었어요."});
						
						var new_cnt	=	data.object;
						
						$(".span_coupon_cnt").text(new_cnt);
						
						$("input[name='i_sCertifyCode']").val("");
						
					} else if(data.status == "isNotLogin"){
						
						showMessageBox({message : "쿠폰을 사용하시려면 로그인을 해야해요.<br/>로그인 하시겠어요?"});
						
					} else {
						
						showMessageBox({message : data.message});
					}
				}
			});
			
		}
	}
	, setApplyCouponCheck : function() {
		var delivery_price 	= fnOnlyNumber($("input[name='i_iDeliveryPrice']").val()).number;
		var pay_price 		= fnOnlyNumber($("input[name='i_iSumPayPrice']").val()).number;
		pay_price = MobileOrderStep1.sum_pay_price;
		
		var arrTr 			= $(".tr_coupon_list");
		var size 			= arrTr.size();
		
		for (var i = 0; i < size; i++) {
			var min_money 		= fnOnlyNumber($(".span_min_money", arrTr.eq(i)).text()).number;
			var type 			= $(".span_typecd", arrTr.eq(i)).text();
			var user_couponcd 	= $(".span_user_couponcd", arrTr.eq(i)).text();
			
			// 적용가능금액 체크
			if (min_money > 0 && min_money > pay_price) {
				// 최소 사용금액
				$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).attr("disabled", true);
				$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).parents(".inputChk").addClass("disabled");
			}
			else if (type == "0001") {
				// 금액할인쿠폰(상품할인), 사은품쿠폰일 경우
				var arr_tr_prod = $(".tr_" + user_couponcd);
				var size2 = arr_tr_prod.size();
				// 적용할 상품이 없는 경우
				if (size2 == 0) {
					$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).attr("disabled", true);
					$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).parents(".inputChk").addClass("disabled");
				}
			}
			else if (delivery_price == 0 && type =="0003") {
				
				$("input[name='i_arrCheckbox']", arrTr.eq(i)).prop("disabled", true);
				$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).parents(".inputChk").addClass("disabled");
				
			}else if(delivery_price > 0 && type == "0003"){
				if(min_money > 0 && pay_price < min_money){
					$("input[name='i_arrCheckbox']", arrTr.eq(i)).prop("disabled", true);
					$("input[type='radio'], input[type='checkbox']", arrTr.eq(i)).parents(".inputChk").addClass("disabled");
				}
			}
		}
	}
	, fnApply : function () {
		var arr_tr 		= $(".tr_coupon_list");
		var arr_chkbox 	= $("input[name='i_arrCheckbox']", arr_tr).not(":disabled");
		var arr_chkbox2 = arr_chkbox.filter(":checked");
		var size1		= arr_chkbox.size();
		var size2 		= arr_chkbox2.size();
	
		if (size1 == 0) {
			
			showMessageBox({message : "적용하실 수 있는 쿠폰이 없어요."
				,close : function(){
					
				}
			});
			modalPopupClose('#modalPopupCoupon');
			$("<div class='overlay'></div>").appendTo("#wrap");
			return;
		}
		
		if (size2 == 0) {
			
			showMessageBox({message : "사용하실 쿠폰을 선택해 주세요."
				,close : function(){
					$("<div class='overlay'></div>").appendTo("#wrap");
				}
			});
			return;
		}
		
		var list = [];

		for (var i = 0; i < size2; i++) {
			
			var tr = arr_chkbox2.eq(i).parents(".tr_coupon_list").eq(0);
			var cnt   = $(".tr_coupon_list").index(tr)+1;
			
			var v_user_couponcd 	= $(".span_user_couponcd",tr).text();
			var v_couponcd			= $(".span_couponcd",tr).text();
			var v_couponnm			= $(".span_couponnm",tr).text();
			var v_typecd 			= $(".span_typecd",tr).text();
			var v_coupon_free 			= $(".span_coupon_free",tr).text();
			var n_pay_money 		= fnOnlyNumber($(".span_pay_money",tr).text()).number;
		
			var v_flag_pay_money 	= $(".span_flag_pay_money",tr).text();
			var n_min_money 		= fnOnlyNumber($(".span_min_money",tr).text()).number;
			var v_discount_text		= $(".span_discount_text",tr).text();
			var v_flag_beauty		= $(".span_flag_beauty",tr).text();
			var v_flag_norpc_apply	= $(".span_flag_norpc_apply",tr).text();
			var v_flag_option		= $(".span_flag_option",tr).text();
			var n_max_dcprc 		= fnOnlyNumber($(".span_max_dcprc",tr).text()).number;
			var v_productcd 		= "";
			var v_brandcd			= "";
		
			if (v_typecd == "0001" || v_typecd == "0005") {
				
				var tr_prod = $(".tr_" + v_user_couponcd);

				v_productcd = $("input[name='i_arrRadio"+cnt+"']:checked", tr_prod).val();					
				
				if (v_productcd == undefined || v_productcd == "") {

					showMessageBox({message : "쿠폰을 적용하실 상품을 선택해 주세요."
						,close : function(){
							$("<div class='overlay'></div>").clone().appendTo("#wrap");
						}
					});
					return;
				}
				if(v_typecd != "0005"){
					if(MobileOrderCoupon.productCntCheck(v_productcd,v_flag_option,v_typecd)){
						
						showMessageBox({message : "1개의 상품에 1개의 쿠폰만 적용하실 수 있어요."
						,close : function(){
								$("<div class='overlay'></div>").clone().appendTo("#wrap");
								MobileOrderCoupon.productCntCheck("","N","");
									
							}
						});
						return;
						
					}
				}
			}
			else if (v_typecd == "0006") {
				
				var tr_prod = $(".tr_" + v_user_couponcd);
				var arr_rd = $("input[name='i_arrRadio"+cnt+"']", tr_prod);
				var size = arr_rd.size();
				
				for (var j = 0; j < size; j++) {
					v_productcd += arr_rd.eq(j).val() + ";";
				}
				
				v_brandcd = $(".span_out_brandcd",tr).text();
				
			}

			if(v_typecd == "0001" && v_flag_option == "Y"){
				
				var tr_prod = $(".tr_" + v_user_couponcd);
				
				var checkprd = $("input[name='i_arrRadio"+cnt+"']:checked", tr_prod).val().split("_")[0];
				
				var arr_rd = $("input[name='i_arrRadio"+cnt+"']", tr_prod);
				var size = arr_rd.size();
				
				for (var j = 0; j < size; j++) {
					
					if(arr_rd.eq(j).val().indexOf(checkprd) > -1){
						
						list.push({
							  v_user_couponcd : v_user_couponcd
							, v_couponcd : v_couponcd
							, v_couponnm : v_couponnm
							, v_typecd : v_typecd
							, n_pay_money : n_pay_money
							, v_flag_pay_money : v_flag_pay_money
							, n_min_money : n_min_money
							, v_discount_text : v_discount_text
							, v_flag_beauty : v_flag_beauty
							, v_productcd : arr_rd.eq(j).val()
							, v_flag_norpc_apply : v_flag_norpc_apply
							, v_flag_use : "N"
							, v_brandcd  : v_brandcd
							, v_flag_option : v_flag_option
							, n_max_dcprc : n_max_dcprc
							, v_coupon_freegood : v_coupon_free
						});	
					}
				}

			}else{
			
				list.push({
					  v_user_couponcd : v_user_couponcd
					, v_couponcd : v_couponcd
					, v_couponnm : v_couponnm
					, v_typecd : v_typecd
					, n_pay_money : n_pay_money
					, v_flag_pay_money : v_flag_pay_money
					, n_min_money : n_min_money
					, v_discount_text : v_discount_text
					, v_flag_beauty : v_flag_beauty
					, v_productcd : v_productcd
					, v_flag_norpc_apply : v_flag_norpc_apply
					, v_flag_use : "N"
					, v_brandcd  : v_brandcd
					, v_flag_option : v_flag_option
					, n_max_dcprc : n_max_dcprc
					, v_coupon_freegood : v_coupon_free
				});
			}
		}
		
		var tr = $(".tr_product_list");
		var size = tr.size();
		
		var isDisPriceFlag		= false;
		var isFlagNorpcAppy		= false;
		var isProductnm			= "";

		if(list != null){
			
			for (var i = 0; i < size; i++) {

				var sale_price		= fnOnlyNumber($(".span_sale_price", tr.eq(i)).text()).number;
				var price 			= fnOnlyNumber($(".span_price", tr.eq(i)).text()).number;
				var productnm	    = $("input[name='i_arrProductnm']").eq(i).val();
				var productcd	    = $("input[name='i_arrProductcd']").eq(i).val();
				var optioncd	    = $("input[name='i_arrOptioncd']").eq(i).val();

				var dis_price = price - sale_price;
				
				for(var j=0; j < list.length; j++){
					
					var v_productcd = list[j].v_productcd.substring(0,list[j].v_productcd.indexOf("_"));
					var v_optioncd	= list[j].v_productcd.substring(list[j].v_productcd.indexOf("_")+1);
					
					if(v_productcd == productcd && v_optioncd == optioncd){
						if(list[j].v_typecd != "0005"){
							if(dis_price>0){
								
								if(list[j].v_flag_norpc_apply != "Y"){
			
									isDisPriceFlag = true;
									
								}else{
									
									isFlagNorpcAppy = true;
									isProductnm += "["+productnm+"]";
								}
							}
						}
					}	
					
				}
			}
		}
		
		if(isDisPriceFlag){
			
			showMessageBox({message : "이미 할인이 된 상품에는 쿠폰을 적용하실 수 없어요."
				,close : function(){
					$("<div class='overlay'></div>").appendTo("#wrap");
					MobileOrderCoupon.productCntCheck("","N","");
				}
			});
			
			return;

		}else if(isFlagNorpcAppy){
			
			showMessageBox({message : ""+isProductnm+"상품은 현재 할인적용된 상품입니다.<br/><span style='color:red;'>해당 쿠폰 사용시, 정상금액에서 쿠폰할인이 적용됩니다.</sapn>"
				,close : function(){
					MobileOrderCoupon.setApplyCoupon(list,'');
					modalPopupClose('#modalPopupCoupon');
				}
			});
			
			return;
			
		}else{

			MobileOrderCoupon.setApplyCoupon(list,'apply');
			modalPopupClose('#modalPopupCoupon');
			
		}

	}
	, fnApplyTemp : function (usercpcd , typecd) {
		var arr_tr 		= $(".tr_coupon_list");
		var arr_chkbox 	= $("input[name='i_arrCheckbox']", arr_tr).not(":disabled");
		var arr_chkbox2 = arr_chkbox.filter(":checked");
		var size1		= arr_chkbox.size();
		var size2 		= arr_chkbox2.size();
	
		if (size1 == 0) {
			
			/*showMessageBox({message : "적용하실 수 있는 쿠폰이 없어요."
				,close : function(){
					
				}
			});
			modalPopupClose('#modalPopupCoupon');
			$("<div class='overlay'></div>").appendTo("#wrap");
			return;*/
		}
		
		if (size2 == 0) {
			
			/*showMessageBox({message : "사용하실 쿠폰을 선택해 주세요."
				,close : function(){
					$("<div class='overlay'></div>").appendTo("#wrap");
				}
			});
			return;*/
			$("#amtDcRpc").text("0원");
		}
		
		var list = [];

		for (var i = 0; i < size2; i++) {
			
			var tr = arr_chkbox2.eq(i).parents(".tr_coupon_list").eq(0);
			var cnt   = $(".tr_coupon_list").index(tr)+1;
			
			var v_user_couponcd 	= $(".span_user_couponcd",tr).text();
			var v_couponcd			= $(".span_couponcd",tr).text();
			var v_couponnm			= $(".span_couponnm",tr).text();
			var v_typecd 			= $(".span_typecd",tr).text();
			var v_coupon_free 			= $(".span_coupon_free",tr).text();
			var n_pay_money 		= fnOnlyNumber($(".span_pay_money",tr).text()).number;
		
			var v_flag_pay_money 	= $(".span_flag_pay_money",tr).text();
			var n_min_money 		= fnOnlyNumber($(".span_min_money",tr).text()).number;
			var v_discount_text		= $(".span_discount_text",tr).text();
			var v_flag_beauty		= $(".span_flag_beauty",tr).text();
			var v_flag_norpc_apply	= $(".span_flag_norpc_apply",tr).text();
			var v_flag_option		= $(".span_flag_option",tr).text();
			var n_max_dcprc 		= fnOnlyNumber($(".span_max_dcprc",tr).text()).number;
			var v_productcd 		= "";
			var v_brandcd			= "";
		
			if (v_typecd == "0001" || v_typecd == "0005") {
				
				var tr_prod = $(".tr_" + v_user_couponcd);

				v_productcd = $("input[name='i_arrRadio"+cnt+"']:checked", tr_prod).val();					
				
				if (v_productcd == undefined || v_productcd == "") {

					/*showMessageBox({message : "쿠폰을 적용하실 상품을 선택해 주세요."
						,close : function(){
							$("<div class='overlay'></div>").clone().appendTo("#wrap");
						}
					});*/
					return;
				}

				/*if(MobileOrderCoupon.productCntCheck(v_productcd,v_flag_option)){
					
					showMessageBox({message : "1개의 상품에 1개의 쿠폰만 적용하실 수 있어요."
					,close : function(){
							$("<div class='overlay'></div>").clone().appendTo("#wrap");
							MobileOrderCoupon.productCntCheck("","N");
								
						}
					});
					return;
					
				}*/
				
			}
			else if (v_typecd == "0006") {
				
				var tr_prod = $(".tr_" + v_user_couponcd);
				var arr_rd = $("input[name='i_arrRadio"+cnt+"']", tr_prod);
				var size = arr_rd.size();
				
				for (var j = 0; j < size; j++) {
					v_productcd += arr_rd.eq(j).val() + ";";
				}
				
				v_brandcd = $(".span_out_brandcd",tr).text();
				
			}

			if(v_typecd == "0001" && v_flag_option == "Y"){
				
				var tr_prod = $(".tr_" + v_user_couponcd);
				
				var checkprd = $("input[name='i_arrRadio"+cnt+"']:checked", tr_prod).val().split("_")[0];
				
				var arr_rd = $("input[name='i_arrRadio"+cnt+"']", tr_prod);
				var size = arr_rd.size();
				
				for (var j = 0; j < size; j++) {
					
					if(arr_rd.eq(j).val().indexOf(checkprd) > -1){
						
						list.push({
							  v_user_couponcd : v_user_couponcd
							, v_couponcd : v_couponcd
							, v_couponnm : v_couponnm
							, v_typecd : v_typecd
							, n_pay_money : n_pay_money
							, v_flag_pay_money : v_flag_pay_money
							, n_min_money : n_min_money
							, v_discount_text : v_discount_text
							, v_flag_beauty : v_flag_beauty
							, v_productcd : arr_rd.eq(j).val()
							, v_flag_norpc_apply : v_flag_norpc_apply
							, v_flag_use : "N"
							, v_brandcd  : v_brandcd
							, v_flag_option : v_flag_option
							, n_max_dcprc : n_max_dcprc
							, v_coupon_freegood : v_coupon_free
						});	
					}
				}

			}else{
			
				list.push({
					  v_user_couponcd : v_user_couponcd
					, v_couponcd : v_couponcd
					, v_couponnm : v_couponnm
					, v_typecd : v_typecd
					, n_pay_money : n_pay_money
					, v_flag_pay_money : v_flag_pay_money
					, n_min_money : n_min_money
					, v_discount_text : v_discount_text
					, v_flag_beauty : v_flag_beauty
					, v_productcd : v_productcd
					, v_flag_norpc_apply : v_flag_norpc_apply
					, v_flag_use : "N"
					, v_brandcd  : v_brandcd
					, v_flag_option : v_flag_option
					, n_max_dcprc : n_max_dcprc
					, v_coupon_freegood : v_coupon_free
				});
			}
		}
		
		var tr_prod = $(".tr_"+usercpcd);
		var checkprd = $(".prdCpCkr:checked", tr_prod).val();
		
		var tr = $(".tr_product_list");
		var size = tr.size();
		
		var isDisPriceFlag		= false;
		var isFlagNorpcAppy		= false;
		var isProductnm			= "";

		if(list != null && list.length > 0){
			if(checkprd != undefined && checkprd != ""){
				var sale_price		= fnOnlyNumber($(".span_sale_price_"+checkprd).text()).number;
				var price 			= fnOnlyNumber($(".span_price_"+checkprd).text()).number;
				var productnm	    = $(".span_productnm_"+checkprd).text();
				var productcd	    = checkprd.split("_")[0];
				var optioncd	    = checkprd.split("_")[1];
	
				var dis_price = price - sale_price;
				
				for(var j=0; j < list.length; j++){
					
					var v_productcd = list[j].v_productcd.substring(0,list[j].v_productcd.indexOf("_"));
					var v_optioncd	= list[j].v_productcd.substring(list[j].v_productcd.indexOf("_")+1);
					
					if(v_productcd == productcd && v_optioncd == optioncd){
						if(list[j].v_typecd != "0005" && typecd != "0005"){
							if(dis_price>0){
								
								if(list[j].v_flag_norpc_apply != "Y"){
									
									isDisPriceFlag = true;
									
								}else{
									
									isFlagNorpcAppy = true;
									isProductnm += "["+productnm+"]";
								}
							}
						}
	
					}	
					
				}
			}
		}
		
		if(isDisPriceFlag){
			
			showMessageBox({message : "이미 할인이 된 상품에는 쿠폰을 적용하실 수 없어요."
				,close : function(){
					$("<div class='overlay'></div>").appendTo("#wrap");
					MobileOrderCoupon.productCntCheck("","N","");
				}
			});
			
			return;

		}else if(isFlagNorpcAppy){
			
			showMessageBox({message : ""+isProductnm+"상품은 현재 할인적용된 상품입니다.<br/><span style='color:red;'>해당 쿠폰 사용시, 정상금액에서 쿠폰할인이 적용됩니다.</sapn>"
				,close : function(){
					MobileOrderCoupon.setApplyCoupon(list,'');
					//alert($(".sum_dis_coupon_price").text());
					$("#amtDcRpc").text($(".sum_dis_coupon_price").text() + "원");
					//modalPopupClose('#modalPopupCoupon');
				}
			});
			
			return;
			
		}else{

			MobileOrderCoupon.setApplyCoupon(list,'');
			//alert($(".sum_dis_coupon_price").text());
			$("#amtDcRpc").text($(".sum_dis_coupon_price").text() + "원");
			//modalPopupClose('#modalPopupCoupon');
			
		}

	}
	, productCntCheck : function(v_productcd, v_flag_option, v_typecd){

		var value = v_productcd.split("_");
		
		var isFlag    = false;
		var productTr = $(".tr_product_list");
		var size	  = productTr.size();
		
		if(value !=""){

			var productcd_temp = value[0];
			var optioncd_temp  = value[1];
			
			for(var i = 0 ; i<size; i++){
				
				if((productcd_temp == $("input[name='i_arrProductcd']",productTr.eq(i)).val() && v_flag_option =="Y") || (productcd_temp == $("input[name='i_arrProductcd']",productTr.eq(i)).val() && optioncd_temp == $("input[name='i_arrOptioncd']",productTr.eq(i)).val())){
					if(v_typecd != "0005"){
						var couponProductCnt = fnOnlyNumber($(".span_coupon_product_cnt",productTr.eq(i)).text()).number;
						
						couponProductCnt -= 1;
						
						$(".span_coupon_product_cnt",productTr.eq(i)).text(couponProductCnt);
						
						if(0 > couponProductCnt){
							
							isFlag = true;

						}
					}
				}
			}
			
		}else{
			
			for(var i = 0 ; i<size; i++){
				
					var couponProductCnt = fnOnlyNumber($("input[name='i_arrProductCnt']",productTr.eq(i)).val()).number;
					
					$(".span_coupon_product_cnt",productTr.eq(i)).text(couponProductCnt);
			}

		}
		
		return isFlag;
		
	}
	, setApplyCoupon : function (list,flag) {
		MobileOrderCoupon.list = list;
		var size = MobileOrderCoupon.list.length;
		
		MobileOrderCoupon.clearCartCoupon();
		for (var i = 0; i < size; i++) {
			
			if (list[i].v_typecd == "0004" || list[i].v_typecd == "0006") {
				if (list[i].v_flag_pay_money == "P") {
					
					MobileOrderCoupon.cart_discount_per 	= MobileOrderCoupon.list[i].n_pay_money;
					MobileOrderCoupon.cart_user_couponcd 	= MobileOrderCoupon.list[i].v_user_couponcd;
					MobileOrderCoupon.cart_flag_beauty		= MobileOrderCoupon.list[i].v_flag_beauty;					
					MobileOrderCoupon.cart_flag_norprc		= MobileOrderCoupon.list[i].v_flag_norpc_apply;
					MobileOrderCoupon.cart_max_dcprc		= MobileOrderCoupon.list[i].n_max_dcprc;
					MobileOrderCoupon.cart_ori_max_dcprc		= MobileOrderCoupon.list[i].n_max_dcprc;
					
					if(list[i].v_typecd == "0004"){
						MobileOrderCoupon.cart_flag_brand	   = "N";
					}else{	
						MobileOrderCoupon.cart_flag_brand	   = "Y";
						MobileOrderCoupon.cart_out_brandcd     = MobileOrderCoupon.list[i].v_brandcd;
					}
//					if($(".tr_order_coupon_freegood").size()>0){
//						$(".div_coupon_freegood").hide();
//						$(".tr_order_coupon_freegood").remove();
//					}
					
				}
			}
			//YHCHOI : 사은품 쿠폰
			else if (list[i].v_typecd == "0005" && list[i].v_flag_loading != "Y") {
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/order/mobile_order_coupon_fg_list_ajax.do"
					, type : "POST"
					, data : {
						i_sCouponcd : list[i].v_couponcd
						, i_sFlagMobile : "Y"
					}
					, dataType : "json"
					, animation : false
					, success : function ( data, textStatus, jqXHR) {
						
						if(data.status == "succ"){
						
							MobileOrderHtml.CouponFreedHtml(data, list[i].v_user_couponcd);
							
							if ($(".tr_order_coupon_freegood").size() == 0) {
								
								showMessageBox({message : "앗, 죄송합니다.  현재 재고가 모두 소진되어, 현재 주문과 함께 발송이 불가해요.<br/>재고가 들어오는대로 발송해드릴게요!"});
								return;
								
							}else {
								
								list[i].v_flag_loading = "Y";
								list[i].v_flag_use = "Y";
								
								MobileOrderCoupon.setApplyCoupon(MobileOrderCoupon.list,'');
							
								$(".div_coupon_freegood").show();
							}
						}
					}
				});
				return;	
			}
		}
		
		if(MobileOrderStep1.total_apply_bpoint > 0){
			MobileOrderStep1.clearPayBpoint();
			showMessageBox({
				message : "쿠폰 사용으로 인해 뷰티포인트 사용이 초기화 되었어요!<br/>다시 적용해주세요"
			});
		}
		
		MobileOrderStep1.sum(flag);
		
		if(MobileOrderStep1.delivery_price > 0){
			var tr = $(".tr_coupon_list");
			for(var h=0; h<tr.size(); h++){
				var tr_list = tr.eq(h);
				if($(".span_typecd",tr_list).text() == "0003"){
					var pay_price 		= MobileOrderStep1.sum_pay_price;
					var min_money 		= fnOnlyNumber($(".span_min_money", tr_list).text()).number;
					
					if(parseInt(min_money) > 0 && parseInt(pay_price) < parseInt(min_money)){
						$("input[name='i_arrCheckbox']",tr_list).prop("disabled",false);
						$("input[name='i_arrCheckbox']",tr_list).prop("checked",false);
						var checkbox =$(".inputChk",tr_list); 
						checkbox.addClass("disabled");
						$("label",checkbox).addClass("disabled");
						$("label",checkbox).removeClass("active");
					}else{
						$("input[name='i_arrCheckbox']",tr_list).prop("disabled",false);
						var checkbox =$(".inputChk",tr_list); 
						checkbox.removeClass("disabled");
						$("label",checkbox).removeClass("disabled");
					}
							
				}
			}
		}else{
			var tr = $(".tr_coupon_list");
			for(var h=0; h<tr.size(); h++){
				var tr_list = tr.eq(h);
				if($(".span_typecd",tr_list).text() == "0003"){
					if(MobileOrderStep1.flag_use_delivery_coupon == "N"){
						$("input[name='i_arrCheckbox']",tr_list).prop("disabled",false);
						$("input[name='i_arrCheckbox']",tr_list).prop("checked",false);
						var checkbox =$(".inputChk",tr_list); 
						checkbox.addClass("disabled");
						$("label",checkbox).addClass("disabled");
						$("label",checkbox).removeClass("active");
					}
				}
			}
		}
		
		MobileOrderHtml.CouponSubList(MobileOrderCoupon.list);
		
	}
	, setToggleBtn : function(){
		
		var cnt = MobileOrderCoupon.getUsedCouponCnt();
		
		if (cnt > 0) {
			$(".btn_user_coupon_pop").text("적용취소");
		}
		else {
			$(".btn_user_coupon_pop").text("쿠폰조회");
		}		
		
	}
};

var MobileOrderGiftBox = {
	name : "MobileOrderGiftBox"
   ,isDuple : true
   ,init : function(){
	   
	   MobileOrderGiftBox.addBtnEvent();
	   
   }
   ,addBtnEvent : function (){
	   
	   $("#div_giftbox_list").on("click",".popGiftPackingSrv .inputRadio input[type='radio']",function(){
           var id = $(this).attr('id');
           
           $(".pckingImg").hide();
           $(".infoBox").hide();

           if ( id == 'packing01' ){
        	   
               $("#pckingImg01").show();
               $("#packingInfo01").show();

               MobileOrderGiftBox.freeGiftProduct();
               
           } else if ( id == 'packing02' ){
        	   
               $("#pckingImg02").show();
               $("#packingInfo02").show();
               
               MobileOrderGiftBox.premiumGiftProduct();
               
           }
       });
	   
	   $(".btn_giftbox_confirm").click(function(event){
		
		   var giftflag = $("input[name='i_arrProductGiftbox']");
		   var size		= giftflag.size();
		   var cnt		= 0;
		   
		   for(var i=0; i<size; i++){
			   
			   if(giftflag.eq(i).val() != ""){
				   cnt++;
			   }
		   }
		   
		   if(cnt == 0){
			   
			   showMessageBox({message : "신청하신 선물포장 서비스가 없어요."});
			   return;
			   
		   }
		   
		   MobileOrderHtml.GiftBoxLayerPopup();
		   
	   });
	   
	   $("input[name='i_sFlagGiftbox_temp']").click(function(event){
		  
			if($(this).prop("checked")){
				
				$(this).prop("checked",false);
				
				MobileOrderHtml.GiftBoxLayerPopup();
				
			}else{
				
				showConfirmBox({
					message : "신청하신 선물포장 서비스를 취소하시겠어요?"
					,ok_func : function(){
						
						 MobileOrderGiftBox.GiftboxDelete();
						 
					},cancel_func : function(){
						
						$("input[name='i_sFlagGiftbox_temp']").prop("checked",true);
					}
				});
				
			}
	   });

	   $("#div_giftbox_list").on("click",".btn_giftbox_apply",function(event){
		  event.preventDefault();
		  
		  //YCHOI : 이 부분 나중에 MobileOrderStep1.sum() 함수로 옮겨야 한다. 아직 어떻게 적용할지 확정되지 않아서 보류
		  var productChk  = $("input[name='i_arrGiftProductChk']");
		  var packingFlag = $("input[name='i_sPacking']:checked").val();
		  
		  var size   = productChk.size();
		  var cnt	 = 0;
		  
		  for(var i=0; i<size; i++){
			  
			if(productChk.eq(i).prop("checked")){

				var value = productChk.eq(i).val().split(";");
				var productcd = value[0];
				var optioncd  = value[1];
				
				var tr = $(".tr_product_list");
				var trSize = tr.size();
				
				for(var j=0; j<trSize; j++){
					
					var trProductcd = $("input[name='i_arrProductcd']",tr.eq(j)).val();
					var trOptioncd  = $("input[name='i_arrOptioncd']",tr.eq(j)).val();
	
					if(productcd == trProductcd && optioncd == trOptioncd){
						
						if(packingFlag == "F"){
							$("input[name='i_sFlagFreeGiftbox']").val("Y");
							$("input[name='i_sFlagGiftbox']").val("N");
						}else{
							$("input[name='i_sFlagGiftbox']").val("Y");
							$("input[name='i_sFlagFreeGiftbox']").val("N");
						}
						
						$("input[name='i_arrProductGiftbox']",tr.eq(j)).val(productcd+"_"+trOptioncd+"_"+packingFlag);
						cnt++;
						
					}
				}
			}
		  }
		  
		  if(cnt == 0){
			  showMessageBox({message : "적어도 하나 이상의 상품을 선택해야 신청 가능합니다."});
			  return;
		  }
		  
		  modalPopupClose("#modalPopupgGiftPackingSrv");
		  $("input[name='i_sFlagGiftbox_temp']").prop("checked",true);
		  $(".span_giftbox_cnt").text(cnt);
		  
		  if(packingFlag == "F"){
			  $(".span_giftbox_nm").text("무료");
		  }else{
			  $(".span_giftbox_nm").text("유료");	
		  }
		  
		  MobileOrderGiftBox.setGiftboxPrice(true,packingFlag);
  
	   });
	   
	   $("#div_giftbox_list").on("click",".btn_giftbox_cancel",function(event){
		   MobileOrderGiftBox.GiftboxDelete();
		   
	   });
	   
   }
   // 선물포장비
   , setGiftboxPrice : function ( isPayStats, packingFlag ) {
		var frm = $("form[name='frm']");
		
		if ($("input[name='i_sFlagGiftbox_temp']", frm).prop("checked")) {
			
			if(packingFlag != "F"){

				if (MobileOrderDelivery.gift_box_limit > 0 && MobileOrderStep1.sum_pay_price >= MobileOrderDelivery.gift_box_limit  ) {
					MobileOrderStep1.gifgbox_price = 0;
				}
				else {
					MobileOrderStep1.gifgbox_price = MobileOrderDelivery.gift_box;	
				}
			}
			
		}
		else {
			MobileOrderStep1.gifgbox_price = 0;
		}
		
		if (isPayStats) {
			MobileOrderStep1.setPayStats();
		}
	}
   ,GiftboxDelete : function(){
	   
	  MobileOrderGiftBox.isDuple = true;  
	  $("input[name='i_arrProductGiftbox']").val("");  
	  $("input[name='i_arrGiftProductChk']").prop("checked",false);
	  $("input[name='i_sFlagGiftbox_temp']").prop("checked",false);
	  $("input[name='i_sFlagGiftbox']").val("N");
	  $("input[name='i_sFlagFreeGiftbox']").val("N");			
	  $(".span_giftbox_nm").text("유료");
	  $(".span_giftbox_cnt").text(0);
	  MobileOrderStep1.gifgbox_price = 0;
	  modalPopupClose("#modalPopupgGiftPackingSrv");
	  MobileOrderStep1.setPayStats();
	   
   }
   ,freeGiftProduct : function(){

	   //YHCHOI : Y를 넣을시 무료포장 상품만 나옴
	   MobileOrderHtml.GiftBoxLayerSubList("Y");
   }
   ,premiumGiftProduct : function(){
	   
	   //YHCHOI : 파라미터 값을 넣지 않으면 상품이 다 나옴
	   MobileOrderHtml.GiftBoxLayerSubList("");
   }
};

var MobileOrderNaming = {
	name : "MobileOrderNaming"
	,naming_price : 0
	,naming_limit  : 0
	,naming_cnt	   : 0
	,sum_pay_price : 0
	,init : function(){
		MobileOrderNaming.addBtnEvent();
	}
	,
	addBtnEvent : function(){
		
		$("input[name='i_sFlagNaming_temp']").click(function(event){

			if($(this).prop("checked")){
				
				$(this).prop("checked",false);
				
				MobileOrderHtml.NamingLayerPopup("R");
				
			}else{
				
				showConfirmBox({
					message : "신청하신 레터링 서비스를 취소하시겠어요?"
					,ok_func : function(){
						$("#div_naming_list").html("");
						
						MobileCommon.ajax({
							url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_naming_save.do"
							, type : "POST"
							, data : {i_sNamingcd : $("input[name='i_sNamingcd']").val()}
							, dataType : "json"
							, animation: false
							, success : function ( data, textStatus, jqXHR) {
								if (data.status == "succ") {

									MobileOrderStep1.setNamingPrice("",0,0);
									
								}
							}
						});
						
					},cancel_func : function(){
						$("input[name='i_sFlagNaming_temp']").prop("checked",true);
					}
				});
			}
		});

		$("#div_naming_list").on("click",".btn_naming_delete",function(event){
			
			var parentOjb = $(this).parents(".letteringBox");			
			
			var inputbar = $(".inputbar",parentOjb);
			
			if(inputbar.size() == 1){
				
				$("input[name='i_arrFlagNaming_temp']",parentOjb).prop("checked",false);
				
				var flag  = $("input[name='i_arrFlagNaming']",parentOjb);
				
				if(flag.val() == "Y"){
					
					flag.val("N");
					
				}else{
					
					flag.val("Y");
					
				}
				
			}
			
			var index = $(".btn_naming_delete").index($(this));
			$(".inputbar").eq(index).remove();
			
			MobileOrderNaming.setNamingStatus(parentOjb);
			
		});
		
		$("#div_naming_list").on("change","select[name='i_arrNamingArea']",function(event){
			//YHCHOI : 중복체크 나중에 할란다
		});
		
		$("#div_naming_list").on("click",".btn_lettering_pop_apply",function(event) {
			event.preventDefault();
			MobileOrderNaming.setNamingStatus();
			MobileOrderNaming.fnApply();
		});

		$("#div_naming_list").on("click","input[name='i_arrFlagNaming_temp']",function(event) {
			
			var index = $("input[name='i_arrFlagNaming_temp']").index($(this));
		
			var flag  = $("input[name='i_arrFlagNaming']").eq(index);
			
			if(flag.val() == "Y"){
				flag.val("N");
			}else{
				flag.val("Y");
			}
			
			MobileOrderNaming.setNamingStatus();
		});
		
		$(".btn_naming").click(function(event){
			event.preventDefault();
			
			//팝업열기
			modalPopup("#modalPopupLetteringSrvInfo");
		});
		
		$(".btn_naming_confirm").click(function(event){
			event.preventDefault();
			
			if(MobileOrderNaming.naming_cnt == 0){
				
				showMessageBox({message : "신청하신 레터링 서비스가 없어요."});
				
			}else{
				
				MobileOrderHtml.NamingLayerPopup("M");				
			}
		});
	}
	,setNamingStatus : function(parentObj){
		
		MobileOrderNaming.naming_price	= MobileOrderDelivery.naming;
		MobileOrderNaming.naming_limit	= MobileOrderDelivery.naming_limit;
		MobileOrderNaming.sum_pay_price = MobileOrderStep1.sum_pay_price;
		
		if (MobileOrderNaming.naming_limit > 0 && MobileOrderNaming.naming_limit <= MobileOrderNaming.sum_pay_price) {
			MobileOrderNaming.naming_price = 0;
		}
		
		var letteringBox = null;
		
		if(parentObj != null && parentObj != undefined){

			letteringBox = parentObj;
			
			var lettering_no = $(".span_lettering_no",letteringBox);
			var size = lettering_no.size();
			var cnt	 = 0;
			
			$("select[name='i_arrNamingArea_temp']",parentObj).val(size);
			
			for(var i=0; i<size; i++){
				
				cnt = i+1;
				
				lettering_no.eq(i).text("#"+cnt);
				
			}
			
		}

		MobileOrderNaming.naming_cnt = parseInt($(".inputbar","#div_naming_list").size());
		
		$(".span_naming_cnt").text(MobileOrderNaming.naming_cnt);
		$(".span_lettering_cnt").text(MobileOrderNaming.naming_cnt);
		$(".span_naming_price").text(MobileOrderNaming.naming_cnt * MobileOrderNaming.naming_price);
	}
	, fnApply : function () {
		
		var flagNaming = $("*[name='i_arrFlagNaming']");
		var size = flagNaming.size();
		var cnt = 0;
		var messagecnt = 0;
		var flagsize = false;
		
		for (var i = 0 ; i < size; i++) {
			
			if (flagNaming.eq(i).val() == "Y") {
		
				var tr = flagNaming.eq(i).parents(".letteringBox").eq(0);
				
				var namingMessage  = $("input[name='i_arrNamingMessage']",tr);
				
				var pattern1 = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/; //한글만 허용 할때 

				for(var j=0; j<namingMessage.size(); j++){
					
					if(namingMessage.eq(j).val() != ""){
			
						messagecnt++;
						
					}
					
					cnt++;					
				}
				
				var messagelang = namingMessage.val().length;
				
				if(!pattern1.test(namingMessage.val())){
					if(messagelang < 11){
						flagsize = true;
					}
				}else{
					if(messagelang < 21){
						flagsize = true;
					}
				}
			}
		}
		
		if(cnt == 0){
			
			showMessageBox({message : "레터링할 위치를 설정해주세요."});
			return;
			
		}
		
		if(!flagsize){
			showMessageBox({message :"국문 10자, 영문 20자 이하로 신청해주세요."});
			return;
		}
		
		if(messagecnt == 0){
			
			showMessageBox({message : "레터링 문구를 적어주세요."});
			return;
		}
		
		var feild = $(".letteringBox");
		var size = feild.size();
		var arrParam = new Array();
		
		for(var i=0; i<size; i++){
			
			var arrNamingFlag 	= $("input[name='i_arrFlagNaming']",feild.eq(i));
			var arrProductcd  	= $("input[name='i_arrNamingProductcd']",feild.eq(i));
			var arrOptioncd   	= $("input[name='i_arrNamingOptioncd']",feild.eq(i));
			var arrNamingArea 	= $("select[name='i_arrNamingArea']",feild.eq(i));
			var arrNamingMessage= $("input[name='i_arrNamingMessage']",feild.eq(i));
			
			if(arrNamingArea.size() >0){
				
				for(var j=0; j<arrNamingArea.size(); j++){

					arrParam.push("i_arrFlagNaming=" + arrNamingFlag.val());
					arrParam.push("i_arrNamingProductcd=" + arrProductcd.val());
					arrParam.push("i_arrNamingOptioncd=" + arrOptioncd.val());			
					arrParam.push("i_arrNamingArea=" + arrNamingArea.eq(j).val());			
					arrParam.push("i_arrNamingMessage=" + encodeURIComponent(arrNamingMessage.eq(j).val()));
					arrParam.push("i_arrNamingSeqPorudctcd=" + arrProductcd.val()+"_"+i);
				}
				
			}else{

				arrParam.push("i_arrFlagNaming=" + arrNamingFlag.val());
				arrParam.push("i_arrNamingProductcd=" + arrProductcd.val());
				arrParam.push("i_arrNamingOptioncd=" + arrOptioncd.val());			
				arrParam.push("i_arrNamingArea=" + arrNamingArea.val());			
				arrParam.push("i_arrNamingMessage=" + encodeURIComponent(arrNamingMessage.val()));
				arrParam.push("i_arrNamingSeqPorudctcd=" + arrProductcd.val()+"_"+i);
			}
			
		}

		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_naming_save.do"
			, type : "POST"
			, data : arrParam.join("&")
			, dataType : "json"
			, animation: false
			, success : function ( data, textStatus, jqXHR) {
				if (data.status == "succ") {
					
					$("input[name='i_sFlagNaming_temp']").prop("checked",true);
					
					MobileOrderStep1.setNamingPrice(data.object, cnt, cnt  * MobileOrderNaming.naming_price);
					modalPopupClose('#modalPopupLetteringSrv');
					
				}
				else {
					
					showMessageBox(data.message);
				}
			}
		});
	}
};

var MobileOrderGiftCard = {
	name : "MobileOrderGiftCard"
	,cnt : 0
	,use_cnt : 0
	,balance : 0		
	,payment_total : 0
	,isRowPayment : true
	,focus_target : undefined
	,isDuple : true
	,init : function(){
		
		MobileOrderGiftCard.cnt  	= fnOnlyNumber($("input[name='i_sGiftcardCnt']").val()).number;
		MobileOrderGiftCard.balance	= fnOnlyNumber($("input[name='i_sGiftcardTotalPrice']").val()).number;

		MobileOrderGiftCard.addBtnEvent();
		MobileOrderGiftCard.setGiftcard(MobileOrderGiftCard.cnt, MobileOrderGiftCard.balance);
		
	}
	,addBtnEvent : function(){
		
		$(".btn_giftcard_search").click(function(event){
			event.preventDefault();
			
			if (MobileOrderGiftCard.balance == 0) {
				showMessageBox({message : "사용가능하신 기프트카드가 없어요."});
				return;
			}
			
			MobileOrderHtml.GiftCardLayerPopup();
		});
		
		//YHCHOI : 라네즈 쿠폰 등록 창 SHOW
		$(".btn_giftcard_show").click(function(event) {
			event.preventDefault();

			if($(".div_giftcard_reg").css("display") == "none"){
				$(".div_giftcard_reg").show();				
			}else{
				$(".div_giftcard_reg").hide();
			}
		});
		
		// 기프트카드 등록하기
		$(".btn_giftcard_reg").click(function(event) {
			event.preventDefault();

			if (!MobileOrderGiftCard.isGiftcardRegValidate()) {
				return;
			}
			
			var frm = $("form[name='frm']");
			var cardNo = $("input[name='i_sGiftcardNo']", frm);
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_gift_card_save.do"
				, type : "POST"
				, data : {
					  i_sFlagAction : "REG"
					, i_sGiftcardNo :  cardNo.val()
				}
				, dataType : "json"
				, animation : false
				, success : function ( json, textStatus, jqXHR) {
					if (json.status == "succ") {
						
						cardNo.val("");

						if (!MobileOrderStep1.isLogin) {
						
							MobileOrderGiftCard.setGiftcardOutSide(json.object.price, json.object.card_no);		
							
						}else{
							
							MobileOrderGiftCard.setGiftcard(json.object.have_card_cnt, json.object.total_price);
							
						}

					}
					else {
						showMessageBox({message : json.message});
					}
				}
			});
		});

		$("#div_giftcard_list").on("keyup","input[name='i_arrPayGiftcard']",function(event){

			MobileOrderGiftCard.sum();

		});
		
		$("#div_giftcard_list").on("click","input[name='i_arrGiftChk']",function(event){

			var tr = $(this).parents(".tr_giftcard_pop_list").eq(0);
			
			if($(this).prop("checked")){
				
				$("input[name='i_arrExpiryDt']",tr).prop("disabled",false);
				$("input[name='i_arrPreBalance']",tr).prop("disabled",false);
				$("input[name='i_arrGiftcardNo']",tr).prop("disabled",false);
				$("input[name='i_arrPayGiftcard']",tr).prop("disabled",false);
				
			}else{
				
				$("input[name='i_arrExpiryDt']",tr).prop("disabled",true);
				$("input[name='i_arrPreBalance']",tr).prop("disabled",true);
				$("input[name='i_arrGiftcardNo']",tr).prop("disabled",true);
				$("input[name='i_arrPayGiftcard']",tr).prop("disabled",true);
				$("input[name='i_arrPayGiftcard']",tr).val(0);

			}
			
			MobileOrderGiftCard.sum();

		});
		
		$("#div_complete_gift_card").on("click",".btn_gift_delete",function(event){
			event.preventDefault();
		
			var giftcardTempcd = $("input[name='i_sGiftcardTempcd']").val();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/order/mobile_order_order_gift_card_save.do"
				, type : "POST"
				, data : {
					  i_sFlagAction : "DEL"
					, i_sGiftcardTempcd :  giftcardTempcd
				}
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {

						MobileOrderGiftCard.isDuple = true;
						
						MobileOrderGiftCard.cnt += MobileOrderGiftCard.use_cnt;
						MobileOrderGiftCard.balance += MobileOrderGiftCard.payment_total;
						
						
						$(".dl_giftcard_list").remove();
						MobileOrderGiftCard.setPayGiftcard("", 0);
						MobileOrderGiftCard.setGiftcard(MobileOrderGiftCard.cnt, MobileOrderGiftCard.balance);
					}
					else {
						
						showMessageBox({message :data.message});
						
					}
				}
			});

		});
		
		//기프트카드 사용하기
		$("#div_giftcard_list").on("click",".btn_giftcard_apply",function(event){
			event.preventDefault();

			if (!MobileOrderGiftCard.isGiftcardApplyValidate()) {
				return;
			}
			
			if (MobileOrderGiftCard.payment_total > 0) {
				
				var frm = $("form[name='frm_giftcard_pop']");
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/order/mobile_order_order_gift_card_save.do"
					, type : "POST"
					, data : frm.serialize()
					, animation : false
					, success : function ( data, textStatus, jqXHR) {
						if (data.status == "succ") {
							
							MobileOrderGiftCard.setPayGiftcard(data.object, MobileOrderGiftCard.payment_total);
							modalPopupClose('#modalPopupGiftcard');
							
							var target = $("#div_complete_gift_card");
							
							var arrHtml = new Array();
							
							arrHtml.push("<dl class='dl_giftcard_list'>");
							arrHtml.push("	<dt>기프트카드(<span id='span_giftcard_cnt' style='display:inline-block;'>"+MobileOrderGiftCard.use_cnt+"</span>) 사용금액</dt>");
							arrHtml.push("	<dd><span id='span_giftcard_payment' style='display:inline-block;'>"+MobileOrderGiftCard.payment_total+"</span>원<a href='#' class='btn_delete btn_gift_delete'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a></dd>");
							arrHtml.push("</dl>");

							target.html("");
							target.html($(arrHtml.join("")));
							
							MobileOrderGiftCard.cnt  	= fnOnlyNumber($("input[name='i_sGiftcardCnt']").val()).number;
							MobileOrderGiftCard.balance	= fnOnlyNumber($("input[name='i_sGiftcardTotalPrice']").val()).number;
							MobileOrderGiftCard.cnt -= MobileOrderGiftCard.use_cnt;
							MobileOrderGiftCard.balance -= MobileOrderGiftCard.payment_total;
							
							MobileOrderGiftCard.setGiftcard(MobileOrderGiftCard.cnt, MobileOrderGiftCard.balance);
						}
						else {
							
							showMessageBox({message :data.message});
							
						}
					}
				});
				
			}
			else {
				
				MobileOrderGiftCard.setPayGiftcard("", 0);
				modalPopupClose('#modalPopupGiftcard');
				
			}

		});
	}
	, setPayGiftcard : function (giftcardTempcd, payGiftcard) {
		
		var frm = $("form[name='frm']");
			
		$("input[name='i_sGiftcardTempcd']", frm).val(giftcardTempcd);
		$("input[name='i_iSumPayGiftcard']", frm).val(SetNumComma(payGiftcard));
		
		MobileOrderStep1.sum_pay_giftcard = payGiftcard;
		MobileOrderStep1.setPayStats();
	}
	, setGiftcard : function (cnt, balance) {
		
		MobileOrderGiftCard.cnt = cnt;
		MobileOrderGiftCard.balance = balance;
		
		$(".span_giftcard_cnt").text(SetNumComma(cnt));
		$(".span_giftcard_balance").text(SetNumComma(balance));
	}	
	, isGiftcardRegValidate : function () {
		
		var frm = $("form[name='frm']");
		var cardNo = $("input[name='i_sGiftcardNo']", frm);
		
		if (cardNo.val() == "") {
			showMessageBox({message : "카드 번호를 입력해 주세요."});
			return false;
		}
		else if (cardNo.val().length != 12) {
			showMessageBox({message : "카드 번호를 12자리로 입력해 주세요"});
			return false;
		}
		
		return true;
	}	
	,isGiftcardApplyValidate : function(){
		
		var sum_pay_price = MobileOrderStep1.sum_pay_price - MobileOrderStep1.sum_dis_channel_price;
		var isCheck = true;
		
		$("input[name='i_arrGiftChk']").each(function(i){
		
			if($(this).prop("checked")){
				
				isCheck = false;
				MobileOrderGiftCard.use_cnt++;
			}
			
		});
		
		if(isCheck){
			showMessageBox({ message: "기프트카드를 선택해주세요."});
			return false;
		}
		
		if (!MobileOrderGiftCard.isRowPayment) {
			showMessageBox({ message: "사용금액이 보유하신 기프트카드 금액보다 많아서 사용하실 수 없어요."});
			MobileOrderGiftCard.focus_target.focus();
			return false;
			
		}
		
		if (sum_pay_price < MobileOrderGiftCard.payment_total) {
			showMessageBox({ message : "주문하신 금액보다 더 많은 기프트카드를 사용하셨어요.\n" + SetNumComma(sum_pay_price) + "원 이하로 사용해 주세요."});
			return false;
		}
		
		return true;
	}
	, sum : function () {
		
		var arrTr = $(".tr_giftcard_pop_list");
		var size = arrTr.size();
		
		var balance_total 	= 0;
		var payment_total 	= 0; 
		var gap_total		= 0;
		var balance 		= 0;
		var payment			= 0;
		var gap				= 0;
		
		MobileOrderGiftCard.use_cnt = 0;
		MobileOrderGiftCard.isRowPayment = true;
		
		for (var i = 0; i < size; i++) {
			
			balance = fnOnlyNumber($("input[name='i_arrPreBalance']", arrTr.eq(i)).val()).number;
			balance_total += balance;
			
			payment = fnOnlyNumber($("input[name='i_arrPayGiftcard']", arrTr.eq(i)).val()).number;
			gap = balance - payment;
			
			payment_total += payment;
			gap_total += gap;
			
			$(".span_gap", arrTr.eq(i)).text(SetNumComma(gap));
			
			if (gap < 0) {
				$(".span_gap", arrTr.eq(i)).css("color", "red" );
				MobileOrderGiftCard.isRowPayment = false;
				MobileOrderGiftCard.focus_target = $("input[name='i_arrPayGiftcard']", arrTr.eq(i));
			} 
			else {
				$(".span_gap", arrTr.eq(i)).css("color", "#666666" );
			}			
		}
		
		$(".span_balance_total").text(SetNumComma(balance_total));	
		$(".span_payment_total").text(SetNumComma(payment_total));
		$(".span_gap_total").text(SetNumComma(gap_total));

		MobileOrderGiftCard.payment_total = payment_total;
		
		if (gap_total < 0) {
			$(".span_gap_total").css("color", "red" );
		} 
		else {
			$(".span_gap_total").css("color", "#666666" );
		}
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
	, sum_min_bpoint_cnt	: 0
	, rebon_pointmall_cnt : 0
	, vip_pointmall_cnt : 0
	, channel_dc_per	: 0
	, channel_dc_brd_exc : ""
	, sum_zero_point_price : 0
	, sum_zero_mpoint_price : 0
	, flag_beauty_hotdeal : "N"
	, flag_use_delivery_coupon : "N"
	, total_apply_bpoint : 0
	, init : function(){

		MobileOrderStep1.isLogin = $("input[name='i_sLoginFlag']").val() == "" ? false : true;
		MobileOrderStep1.isSnsLogin = $("input[name='i_sSnsLoginFlag']").val() == "" ? false : true;
		
		MobileOrderStep1.channel_dc_per = fnOnlyNumber($("input[name='i_iChannelDcPer']").val()).number; 
		MobileOrderStep1.channel_dc_brd_exc = $("input[name='i_sChannelDcBrdExc']").val();
		
		MobileOrderCoupon.init();
		MobileOrderBpoint.init();
		MobileOrderUserInfo.init();
		MobileOrderDelivery.init();
		MobileOrderNaming.init();
		MobileOrderGiftCard.init();
		MobileOrderGiftBox.init();
		
		MobileOrderStep1.OrderList();
		MobileOrderStep1.sum();
		MobileOrderStep1.addBtnEvent();
		
		MobileOrderUserInfo.nonmemberSetting();
	
		MobileOrderStep1.settingAccotit();
		
		MobileOrderStep1.isValidationKeyup();
		
		MobileOrderStep1.setPaymentSetting();
		addOnlyNumberEvent($(".onlyNumber"),{isComma:false,isStringNumber:true});
		
		if($("#i_sFlagBeautyHotdeal").val() == "Y" && $("#i_sBeautyHotdealcd").val() != undefined && $("#i_sBeautyHotdealcd").val() != ""){
			MobileOrderStep1.flag_beauty_hotdeal = "Y";
			$("input[name='i_arrFlagBpoint_temp']").eq(0).click();
		}
		
		//SNS로그인 공지
		if(!MobileOrderStep1.isLogin && MobileOrderStep1.isSnsLogin) {
			var message = [];
			message.push("<div><p style='text-align:center;margin-bottom:10px;'><img src='"+GLOBAL_MOBILE_IMG_URL+"content/pop_specialProd_img01.png' style='width:25%;height:25%' /></p></div>");
			message.push("<div>SNS 로그인 구매고객께 알려드립니다.</div>");
			message.push("<div style='margin-top:15px;'>");
			message.push("SNS 로그인으로 쇼핑하시면 <br/>뷰티포인트 적립 및 다양한 혜택을 받을 수 없답니다. <br/> ");
			message.push("회원가입 후 쇼핑하시면, 포인트 및 쿠폰 적립 등 <br/>더 많은 혜택을 누리실 수 있어요! <br/> ");
			message.push("<span style='color:#3764be;display:inline-block;margin-top:10px;'>※ SNS 회원 구매시 사은품은 <br/>구매금액대별 사은품과 스페셜기프트만 제공됩니다.</span><br/>");
			message.push("</div>");
			showMessageBox({
				message : message.join("")
				, close : function(){
					$("input[name='i_sOrderUsernm']").focus();
				}
			});
		}

	}
	,setPaymentSetting : function(){
		var value = $("input[name='i_sPayTypecd']").val();
		
		if (value != "0026"){
			
			$(".orderMethod .order_btn tbody tr .order_table_th").each(function(){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.gif",".gif")).next().removeClass("on");
			});
			
			$(".btn_methodMore > a").click();
		}
		
		if(value == "0022"){		 
			 /* 페이코 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th01");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th01 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").show();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			$(".onePayTit").removeClass("on");
			
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0021"){
			/* 카카오페이 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th02");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th02 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").show();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0019"){
			/* Paynow(간편결제) */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th03");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th03 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").show();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0001"){
			/* 신용카드 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th04");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th04 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").show();
			$("#tr_credit02").show();

			var targetId = $("select[name='i_sPayCardTypecd']").val();
			$(".card").hide();
			$("#tr_nopay"+targetId).show();
			
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").addClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",false); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0003"){
			/* 무통장입금 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th05");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th05 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").show();
			$("#tr_bank02").show();
			$("#tr_bank03").show();
			$("#tr_bank04").show();
			$("#tr_bank05").show();
			$("#tr_bank06").show();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").addClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",false); // 무통장
			$("#escrow03_flag_y").attr("disabled",false); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",false); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",false);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",false);	//무통장 현금영수중
			if($("input[name='i_sTaxBillType']:checked").val() == "N"){
				$(".tr_taxbill").hide();
			}else{
				$(".tr_taxbill").show();
			}
			$("input[name='i_sCashReceiptType']").attr("disabled",false);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",false);	//무통장 현금영수중
		}else if(value == "0002"){
			/* 실시간 계좌이체 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th06");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th06 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").show();
			$("#tr_realtime02").show();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").addClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",false);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",false); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0005"){
			/* 휴대폰 결제 */
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th07");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th07 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").show();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0023"){
			 /* 네이버페이 */
			$("#i_sPayTypecd").val("0023");
			 
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th08");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th08 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").hide();
			$("#tr_naver").show();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0024"){
			/* NFC결제 */
			var version = 0;
			try{
				version = fnReplaceAll(window.Android.getApplicationVersion(), ".", "");
			}catch (e) {
			}

			if(parseInt(version) > 262){
				$("#i_sPayTypecd").val("0024");
				
				var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th09");
				var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th09 .th_box");
				
				$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
				$order_table_thBox.addClass("on");
				$order_table_thBox.find("p").addClass("on");
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide();
				$("#tr_nfc").show();
				$("#tr_naver").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$("#tr_onepay").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}else{
				$("#i_sPayTypecd").val("");
				
				var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th09");
				var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th09 .th_box");
				
				if($order_table.length > 0){
					$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace("_on.gif",".gif")).next().removeClass("on");
					$order_table_thBox.removeClass("on");
					$order_table_thBox.find("p").removeClass("on");
				}
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide();
				$("#tr_nfc").hide();
				$("#tr_naver").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$("#tr_onepay").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}

		}else if(value == "0025"){
			$("#i_sPayTypecd").val("0025");
			 
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th10");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th10 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").show();
			$("#tr_paypal").hide();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$(".tr_taxbill").hide();
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0027"){
			$("#i_sPayTypecd").val("0027");
			 
			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th11");
			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th11 .th_box");
			
			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			$order_table_thBox.addClass("on");
			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").show();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").hide();
			$(".onePay_cnt").hide();
			
			$(".onePayTit").removeClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$(".tr_taxbill").hide();
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}else if(value == "0026"){
			$("#i_sPayTypecd").val("0026");
			 
//			var $order_table = $(".orderMethod .order_btn tbody tr .order_table_th12");
//			var $order_table_thBox = $(".orderMethod .order_btn tbody tr .order_table_th12 .th_box");
//			
//			$order_table.find("img").attr("src", $order_table.find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
//			$order_table_thBox.addClass("on");
//			$order_table_thBox.find("p").addClass("on");
			$("#tr_globalCredit").hide();
			$("#tr_paypal").show();
			$("#tr_naver").hide();
			$("#tr_nfc").hide();
			$("#tr_payco").hide();
			$("#tr_kakaopay").hide();
			$("#tr_paynow").hide();
			$("#tr_credit01").hide();
			$("#tr_credit02").hide();
			$(".card").hide();
			$("#tr_bank01").hide();
			$("#tr_bank02").hide();
			$("#tr_bank03").hide();
			$("#tr_bank04").hide();
			$("#tr_bank05").hide();
			$("#tr_bank06").hide();
			$("#tr_realtime01").hide();
			$("#tr_realtime02").hide();
			$("#tr_phone").hide();
			$("#tr_onepay").show();
			$(".onePay_cnt").show();
			
			$(".onePayTit").addClass("on");
			$(".orderMethod .order_cnt_wrap").removeClass("on");
			
			$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
			$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
			$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
			$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
			$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
			$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
			$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
			$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
			$(".tr_taxbill").hide();
			$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
			$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
		}
	}
	,settingAccotit : function(){
	
	    //아코디언
	    var $accotit = $("#accoTab > .tit");
	    var $accoCont = $("#accoTab .contView");

	    $accoCont.css("display","none");
	    $accoCont.eq(0).show().addClass('active');
	    $accotit.eq(0).addClass("active");
	    
	    var size = $accotit.size();
	    
	    for(var i=0; i<size; i++){
	    	
	        if ($("+.contView", $accotit.eq(i)).css("display") == "none"){
	        	
	        	if(!MobileOrderStep1.isLogin){
	        		
	        		if($accoCont.eq(i).hasClass("additional_service_area")){
			            $("+.contView", $accotit.eq(i)).hide();
			            $accotit.eq(i).removeClass("active");	
	        		}else{
			            $("+.contView", $accotit.eq(i)).show();
			            $accotit.eq(i).addClass("active");	
	        		}	        		
	        		
	        	}else{
		            $("+.contView", $accotit.eq(i)).show();
		            $accotit.eq(i).addClass("active");	
	        	}
	        }
	    	
	    }		
	}
	,getPageParam : function () {
		
		var	pageParam	= {
				targetDt : $("input[name='i_sTargetDtm']").val()
		};
		return pageParam;
		
	}
	,addBtnEvent : function(){
		
		$(".btn_payment_onepay").unbind("click").click(function(event){
			event.preventDefault();
			
			$("input[name='i_sFlagOnePay']").val("Y");
			
			if (!$("#i_sPaymentOnePayMsgChk").prop("checked")){
				showMessageBox({message : "주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며, 구매진행에 동의하시겠습니까? (전자상거래법 제8조 2항)에 체크해주세요."});
				return;
			}
			
			modalPopupClose("#modalPopupOnePayInfo");
			
			$(".btn_payment").click();
		});
		
		$(".btn_payment_onepay_cancel").unbind("click").click(function(event){
			event.preventDefault();
			
			var div_popup = $("#modalPopupOnepayInfo");
			
			$("input[name='i_sFlagOnePay']").val("N");
			
//			$(".i_sPaymentOnePayLabel", div_popup).removeClass("active");
			$("#i_sPaymentOnePayMsgChk").prop("checked", false);
			
			modalPopupClose("#modalPopupOnePayInfo");
		});
		
		$(".btn_onePay").unbind("click").click(function(event){
			
			if (!MobileOrderStep1.isLogin) {
				
				showConfirmBox({
					message : "로그인이 필요한 서비스입니다.<br/>로그인 하시겠어요?"
					,ok_func : function(){
						
						var frm_login = $("form[name='frm_login']");
						$("input[name='returnUrl']", frm_login).val(GLOBAL_SSL_URL + "mobile/my/mobile_my_card_billkey_list.do")
						$("input[name='returnParam']", frm_login).val("");
						$("input[name='isOrderSearch']", frm_login).val("");
						
						document.frm_login.submit();
						
					},cancel_func : function(){
					}
				});
				
				return;
				
			} else {
				location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_card_billkey_list.do";
			}			
		});
		
		$(".onePayArea > .onePayTit").unbind("click").click(function(event){
			
			$(this).toggleClass("on");
			
			var onePayCont = $(".onePayArea .onePay_cnt");
			
			if($(this).hasClass("on")){
		    	onePayCont.show();
		    	
		    	$(".btn_methodMore a").toggleClass('on');
		    	
		    	$(".btn_methodMore a").text("결제방법 더보기");
				$(".btn_methodMore a").parents(".otherOrderMethodArea").find(".order_btn").css(
	            	{
	            		"height":"60px",
	            		"overflow":"hidden",
	            		"padding":"0px 14px 0px 14px"
	            	}
	        	)
	        	$(".btn_methodMore a").parents(".otherOrderMethodArea").find(".h15").css("height","15px");
				
				$(".orderMethod .order_btn tbody tr .order_table_th").each(function(){
					 $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.gif",".gif")).next().removeClass("on");
				});
				
				$(".orderMethod .order_btn tbody tr .order_table_th .th_box").removeClass("on");
				
				$("input[name='i_sPayTypecd']").val("0026");
				MobileOrderStep1.setPaymentSetting();
		    	
		    }else{
		    	onePayCont.hide();
		    }
		});

		$(".btn_methodMore a").unbind("click").click(function () {
			
            $(this).toggleClass('on');
            
            if ($(this).hasClass('on')){
            	
                $(this).text("결제방법 닫기");
                $(this).parents(".otherOrderMethodArea").find(".order_btn").css(
                	{
                		"height":"auto",
                		"overflow":"visible",
                		"padding":"0px 14px 15px 14px"
                	}
            	)
            	$(this).parents(".otherOrderMethodArea").find(".h15").css("height","5px");
            } else{
                $(this).text("결제방법 더보기");
                $(this).parents(".otherOrderMethodArea").find(".order_btn").css(
                	{
                		"height":"60px",
                		"overflow":"hidden",
                		"padding":"0px 14px 0px 14px"
                	}
            	)
            	$(this).parents(".otherOrderMethodArea").find(".h15").css("height","15px");
              
            }
     	});
		
		$(".btn_giftCancel").unbind("click").click(function(event){
			$(".giftchoose_cnt").text(0);
			$(".chkfreegood").html("");
			$("input:checkbox[name='i_arrBfreeGoodChk']").prop("checked",false);
			
			modalPopupClose('#modalPopupFreeGift');
		});
		
		$("input[name='i_sTaxBillType']").unbind("click").click(function(event){
			$(this).attr("checked", true);
			var frm = $("form[name='frm']");
			removeErrorMessageBox($("input[name='i_sTaxBillNo']", frm));	
			
			if($(this).val() == "N"){
				$(".tr_taxbill").hide();
				removeErrorMessageBox($("input[name='i_sTaxBillNo']", frm));	
			}else{
				if($("input[name='i_sTaxBillNo']").val() == "휴대전화 또는 사업자등록번호" || $("input[name='i_sTaxBillNo']").val() == ""){
					addErrorMessageBox($("*[name='i_sTaxBillNo']", frm), "휴대전화 또는 사업자등록번호를 입력해주세요.", "");
				}else{
					removeErrorMessageBox($("input[name='i_sTaxBillNo']", frm));	
				}
				$(".tr_taxbill").show();
			}
			
		});
		
		$(".btn_cartlist").click(function(event){
			event.preventDefault();
			document.location.href = GLOBAL_SSL_URL+"mobile/cart/mobile_cart_cart_list.do";
		});
		$(".btn_freeGift").unbind("click").click(function(event){
			event.preventDefault();
			modalPopup("#modalPopupFreeGift");
		});
		$(".btn_card_info").unbind("click").click(function(event){
			event.preventDefault();
			
			var target = $(".conview_card_info");
			
			if(target.css("display") != "none"){
				
				target.hide();
				$(".btn_card_info").text("카드사 할인정보");
				
			}else{
				
				target.show();
				$(".btn_card_info").text("카드사 할인정보 닫기");
			}
			
		});
		
	    $(".btn_alram_reservation_close").click(function(event){
			event.preventDefault();
			$(".div_alarm_reservation").remove();
	    });
	   
	    $(".btn_alram_beautyprd_close").click(function(event){
			event.preventDefault();
			$(".div_alarm_beautyprd").remove();
	    });
		
		$("select[name='i_sOrderEmail2']").change(function(event){
			
			var target1 = $("input[name='i_sOrderEmail1']");
			var target2 = $("input[name='i_sOrderEmail3']");
			
			target2.val("");
			
			if($(this).val() =="직접입력"){
//				target1.attr("readonly",true);
//				target1.val("");
//				target1.attr("disabled",true);
				target2.show();
				addErrorMessageBox(target2, "주문자 이메일을 입력해주세요.");
			}else{
				target1.attr("readonly",false);
				target1.attr("disabled",false);
				target2.hide();
				removeErrorMessageBox(target2);	
			}

			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty($(this).val())) {
				addErrorMessageBox($(this).eq(0), "주문자 이메일을 선택해주세요.");
			}
			
		});
		
		// 결제정보
		$(".orderMethod .order_btn tbody tr .order_table_th span").on("click",function(){
			
			/* TODO :: 앱버전체크 추가 */
			if($(this).parent().hasClass("order_table_th09")){
				var version = 0;
				try{
					version = fnReplaceAll(window.Android.getApplicationVersion(), ".", "");
				}catch (e) {}
				
				if(parseInt(version) < 263){
					showMessageBox({
						message : "현재 버전에서는 사용하실 수 없습니다."
					});
					return;
				}
			}
			
			 $(".orderMethod .order_btn tbody tr .order_table_th").each(function(){
				 $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.gif",".gif")).next().removeClass("on");
			 });
			 $(this).find("img").attr("src", $(this).find("img").attr("src").replace(".gif","_on.gif")).next().addClass("on");
			 $(".orderMethod .order_btn tbody tr .order_table_th .th_box").removeClass("on");
			 $(this).addClass("on");

			 if($(this).parent().hasClass("order_table_th01")){
				 /* 페이코 */
				 $("#i_sPayTypecd").val("0022");
				 
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").show();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
			}else if($(this).parent().hasClass("order_table_th02")){
				/* 카카오페이 */
				$("#i_sPayTypecd").val("0021");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").show();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
			}else if($(this).parent().hasClass("order_table_th03")){
				/* Paynow(간편결제) */
				$("#i_sPayTypecd").val("0019");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").show();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
			}else if($(this).parent().hasClass("order_table_th04")){
				/* 신용카드 */
				$("#i_sPayTypecd").val("0001");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").show();
				$("#tr_credit02").show();

				var targetId = $("select[name='i_sPayCardTypecd'] option:selected").val();
				$(".card").hide();
				$("#tr_nopay"+targetId).show();
				
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").addClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",false); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
				// 결제정보 신용카드 
				$("select[name='i_sPayCardTypecd']").on("change",function(){
					var targetId = $("select[name='i_sPayCardTypecd'] option:selected").val();
					$(".card").hide();
					$("#tr_nopay"+targetId).show();
				});
				
			}else if($(this).parent().hasClass("order_table_th05")){
				/* 무통장입금 */
				$("#i_sPayTypecd").val("0003");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$(".card").hide();
				$("#tr_bank01").show();
				$("#tr_bank02").show();
				$("#tr_bank03").show();
				$("#tr_bank04").show();
				$("#tr_bank05").show();
				$("#tr_bank06").show();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").addClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",false); // 무통장
				$("#escrow03_flag_y").attr("disabled",false); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",false); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",false);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",false);	//무통장 현금영수중
				if($("input[name='i_sTaxBillType']:checked").val() == "N"){
					$(".tr_taxbill").hide();	
				}else{
					$(".tr_taxbill").show();
				}
				$("input[name='i_sCashReceiptType']").attr("disabled",false);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",false);	//무통장 현금영수중
				
			}else if($(this).parent().hasClass("order_table_th06")){
				/* 실시간 계좌이체 */
				$("#i_sPayTypecd").val("0002");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").show();
				$("#tr_realtime02").show();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").addClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",false);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",false); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}else if($(this).parent().hasClass("order_table_th07")){	
				/* 휴대폰 결제 */
				$("#i_sPayTypecd").val("0005");
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_phone").show();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}else if($(this).parent().hasClass("order_table_th08")){	
				/* 네이버페이 결제 */
				$("#i_sPayTypecd").val("0023");
				$("#tr_naver").show();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}else if($(this).parent().hasClass("order_table_th09")){	
				/* NFC 결제 */
				$("#i_sPayTypecd").val("0024");
				$("#tr_nfc").show();
				$("#tr_naver").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_globalCredit").hide();
				$("#tr_paypal").hide(); 
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
			}else if($(this).parent().hasClass("order_table_th10")){	
				$("#i_sPayTypecd").val("0025");
				$("#tr_globalCredit").show();
				$("#tr_paypal").hide(); 
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
			}else if($(this).parent().hasClass("order_table_th11")){
				$("#i_sPayTypecd").val("0027");
				$("#tr_globalCredit").hide();
				$("#tr_paypal").show(); 
				$("#tr_naver").hide();
				$("#tr_nfc").hide();
				$("#tr_payco").hide();
				$("#tr_kakaopay").hide();
				$("#tr_paynow").hide();
				$("#tr_credit01").hide();
				$("#tr_credit02").hide();
				$(".card").hide();
				$("#tr_bank01").hide();
				$("#tr_bank02").hide();
				$("#tr_bank03").hide();
				$("#tr_bank04").hide();
				$("#tr_bank05").hide();
				$("#tr_bank06").hide();
				$("#tr_realtime01").hide();
				$("#tr_realtime02").hide();
				$("#tr_phone").hide();
				$(".onePay_cnt").hide();
				
				$(".onePayTit").removeClass("on");
				$(".orderMethod .order_cnt_wrap").removeClass("on");
				
				$("select[name='i_sPayCardTypecd']").attr("disabled",true); //신용카드
				$("#escrow02_flag_y").attr("disabled",true);	//실시간 계좌 이체 에스크로 결제 여부
				$("#escrow02_flag_n").attr("disabled",true); //실시간 계좌 이체 에스크로 결제 여부
				$("select[name='i_sPayBankTypecd']").attr("disabled",true); // 무통장
				$("#escrow03_flag_y").attr("disabled",true); //무통장 에스크로 결제 여부
				$("#escrow03_flag_n").attr("disabled",true); //무통자 에스크로 결제 여부
				$("radio[name='i_sTaxBillType']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sTaxBillNo']").attr("disabled",true);	//무통장 현금영수중
				$("input[name='i_sCashReceiptType']").attr("disabled",true);	//무통장 현금영수중
				$("checkbox[name='i_sTaxBillSaveYn']").attr("disabled",true);	//무통장 현금영수중
				
			}
			 
		 });
		
		$("#i_sUserSame").click(function(event) {
				var vo;
				
				if ($(this).prop("checked")) {
					vo = {
						  v_receivernm : $("input[name='i_sOrderUsernm']").val()
						, v_mobile1 : $("select[name='i_sOrderMobile1']").val()
						, v_mobile2 : $("input[name='i_sOrderMobile2']").val()
						, v_mobile3 : $("input[name='i_sOrderMobile3']").val()
					};
				}
				else {
					vo = {
						v_receivernm : ""
						, v_phone1 : ""
						, v_phone2 : ""
						, v_phone3 : ""
						, v_mobile1 : ""
						, v_mobile2 : ""
						, v_mobile3 : ""
					};
				}
				
				MobileOrderDelivery.changeDelivery(vo);

		});
		
		// 뷰티포인트 결제 선택 여부
		$("input[name='i_arrFlagBpoint_temp']").click(function(event) {
						
			if($("input[name='i_sLoginFlag']").val() == "cat6987" || $("input[name='i_sLoginFlag']").val() == "z11111y" || $("input[name='i_sLoginFlag']").val() == "bitna8"){
				return ;
			}
			
			var obj = $("input[name='i_arrFlagBpoint_temp']");
			var index = obj.index($(this));

			var tr = $(".tr_product_list").eq(index);
			var feild = $(".div_product_list").eq(index);
			
			var el_flag_bpoint 	= $("*[name='i_arrFlagBpoint']", tr);
			var el_bpoint_price = $(".span_beauty_price", tr).text();
			var el_pay_bpoint 	= $("*[name='i_arrPayBpoint']", feild);
			var key 			= $(".span_key", tr).text();
			var el_fg_area		= $(".tr_" + key);
			var productcd = $("*[name='i_arrProductcd']", tr).val(); 
			
			if(productcd == "SPR20161228000025917"){
				el_flag_bpoint.val("N");
				el_pay_bpoint.val("0");
				el_pay_bpoint.hide();
				$(this).removeClass("pointcheck");
				el_fg_area.show();
				
				$(this).prop("checked", false);
				showMessageBox({
					message: "이 제품은 뷰티포인트 교환 불가 상품이에요."
				});
			}else{
				if ($(this).prop("checked")) {
					
					el_flag_bpoint.val("Y");
					el_pay_bpoint.show();
					el_fg_area.hide();
					$(this).addClass("pointcheck");
					
				}
				else {
					if(MobileOrderStep1.flag_beauty_hotdeal == "Y"){
						$(this).prop("checked",true);
						showMessageBox({
							message :"뷰티 핫딜 상품은 뷰티포인트로만 구매 가능합니다.",
						});
					}else{
						el_flag_bpoint.val("N");
						el_pay_bpoint.val("0");
						el_pay_bpoint.hide();
						$(this).removeClass("pointcheck");
						el_fg_area.show();
					}
				}
				
				MobileOrderStep1.sum();
				MobileOrderStep1.setGiftcardClear();
				
				if(MobileOrderStep1.flag_beauty_hotdeal != "Y"){
					var prev_pay_bpoint = MobileOrderUserInfo.bpoint - MobileOrderStep1.sum_pay_bpoint;
					
					if(prev_pay_bpoint > el_bpoint_price && el_pay_bpoint.val() != 0){
						
						showMessageBox({message : "* 뷰티포인트로 구매시에는 구매상품의 사은품 및 이벤트 혜택을 받으실 수 없습니다."});
						
					}
				}
			}
			
		});

		// 결제하기
		$(".btn_payment").click(function(event) {
			event.preventDefault();
			
			if(!MobileOrderStep1.isLogin){
				var mobile1 =$("select[name='i_sOrderMobile1']").val();
				var mobile2 =$("input[name='i_sOrderMobile2']").val();
				var mobile3 =$("input[name='i_sOrderMobile3']").val();
				
				var mobile = mobile1 + "" + mobile2 + "" + mobile3;
				var isPassMobile	= false;
				
				if (mobile.length >= 9) {
					isPassPhone = true;
				}

				if (!isPassMobile && mobile1 == "") {
					showMessageBox({
						message:"주문하시는 고객님의 휴대전화를 입력해주세요."
						,close : function(){
							$("select[name='i_sOrderMobile1']").focus();
						}
					});
					addWebErrorMessageBox($("*[name='i_sOrderMobile1']", frm),"주문하시는 고객님의 휴대전화를 입력해주세요.");
					return;
					
				}
				
				if (!isPassMobile && (mobile2 == "" || mobile2.length < 3)) {
					showMessageBox({
						message:"주문하시는 고객님의 휴대전화를 입력해주세요."
						,close : function(){
							$("input[name='i_sOrderMobile2']").focus();
						}
					});
					addWebErrorMessageBox($("*[name='i_sOrderMobile2']", frm),"주문하시는 고객님의 휴대전화를 입력해주세요.");
					return;	

				}
				if (!isPassMobile && (mobile3 == "" || mobile3.length < 4)) {
					showMessageBox({
						message:"주문하시는 고객님의 휴대전화를 입력해주세요."
						,close : function(){
							$("input[name='i_sOrderMobile3']").focus();
						}
					});
					addWebErrorMessageBox($("*[name='i_sOrderMobile3']", frm),"주문하시는 고객님의 휴대전화를 입력해주세요.");
					return;
				}
				
				var mobileNum = mobile1 + "-" + mobile2 + "-" + mobile3;
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
					, type : "POST"
					, data : {i_sMobileNum : mobileNum}
					, dataType : "json"
					, animation	: false
					, success : function ( data, textStatus, jqXHR) {
						
						if(data.status == "succ"){
							data.object = 0;
							
							if(data.object >= 3){
								showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
								return;
							} else {
								
								if($("input[name='i_arrBfreeGoodChk']").size() > 0){

									var gift_object = $("input[name='i_arrBfreeGoodChk']").filter(":checked");
									var gift_size   = gift_object.size();
									
									if(gift_size == 0){
										
										showConfirmBox({
											message : "구매금액대별 사은품을 선택하시지 않으셨어요.<br/>구매를 진행하시겠어요?"
											,ok_func : function(){
												MobileOrderStep1.actionPayment();						
											},cancel_func : function(){
												
											}
										});
										
										return;
									}else{
										MobileOrderStep1.actionPayment();				
									}
								}else{
									MobileOrderStep1.actionPayment();
								}
								
							} 
						}		
					}
				});
			}else{
				
				var eventcd = $("input[name='i_sEventcd']").val();
				var chkFlag = "CHK";
				
				if (eventcd != "" && eventcd != null && eventcd != undefined){
					
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"event/event_billing_stock_check_ajax.do"
						, type : "POST"
						, dataType : "json"
						, data : {
							i_sEventcd : eventcd
							, i_sChkFlag : chkFlag
						}
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {
							
							if(data.status == "succ"){
								
								var restrictCnt = data.object;
								
								if (restrictCnt <= 0){
									// 재고부족
									showMessageBox({message : "재고가 부족합니다."});
									return;
								} else {
									MobileCommon.ajax({
										url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
										, type : "POST"
										, dataType : "json"
										, animation	: false
										, success : function ( data, textStatus, jqXHR) {
											
											if(data.status == "succ"){
												
												data.object = 0;
												
												if(data.object >= 3){
													showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
													return;
												} else {
													
													if($("input[name='i_arrBfreeGoodChk']").size() > 0){

														var gift_object = $("input[name='i_arrBfreeGoodChk']").filter(":checked");
														var gift_size   = gift_object.size();
														
														if(gift_size == 0){
															
															showConfirmBox({
																message : "구매금액대별 사은품을 선택하시지 않으셨어요.<br/>구매를 진행하시겠어요?"
																,ok_func : function(){
																	MobileOrderStep1.actionPayment();						
																},cancel_func : function(){
																	
																}
															});
															
															return;
														}else{
															MobileOrderStep1.actionPayment();				
														}
													}else{
														MobileOrderStep1.actionPayment();
													}
													
												} 
											}		
										}
									});
								}
							}
						}
					});
				} else {
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
						, type : "POST"
						, dataType : "json"
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {
							
							if(data.status == "succ"){
								
								data.object = 0;
								
								if(data.object >= 3){
									showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
									return;
								} else {
									
									var i_sPayTypecd = $("input[name='i_sPayTypecd']").val();
									
									if ("0026" == i_sPayTypecd){ // 원페이
										
										var onePayFlag = $("input[name='i_sFlagOnePay']").val();
										
										if (onePayFlag == "N"){
											
											$("#i_sPaymentOnePayMsgChk").prop("checked", false);
											
											modalPopup("#modalPopupOnePayInfo");
											return;
										}
									}
									
									if($("input[name='i_arrBfreeGoodChk']").size() > 0){

										var gift_object = $("input[name='i_arrBfreeGoodChk']").filter(":checked");
										var gift_size   = gift_object.size();
										
										if(gift_size == 0){
											
											showConfirmBox({
												message : "구매금액대별 사은품을 선택하시지 않으셨어요.<br/>구매를 진행하시겠어요?"
												,ok_func : function(){
													MobileOrderStep1.actionPayment();						
												},cancel_func : function(){
													
												}
											});
											
											return;
										}else{
											MobileOrderStep1.actionPayment();				
										}
									}else{
										MobileOrderStep1.actionPayment();
									}
									
								} 
							}		
						}
					});
				}
			}
			/*if($("input[name='i_arrBfreeGoodChk']").size() > 0){

				var gift_object = $("input[name='i_arrBfreeGoodChk']").filter(":checked");
				var gift_size   = gift_object.size();
				
				if(gift_size == 0){
					
					showConfirmBox({
						message : "구매금액대별 사은품을 선택하시지 않으셨어요.<br/>구매를 진행하시겠어요?"
						,ok_func : function(){
							MobileOrderStep1.actionPayment();						
						},cancel_func : function(){
							
						}
					});
					
					return;
				}else{
					MobileOrderStep1.actionPayment();				
				}
			}else{
				MobileOrderStep1.actionPayment();
			}*/

		});
	}
	, orderCodeList : function(payType){
		
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_code_list_ajax.do"
			, type : "POST"
			, data : {i_sPayTypecd : payType}
			, dataType : "json"
			, animation	: false
			, success : function (data, textStatus, jqXHR) {
				
				if (data.status == "succ") {

					var arrCardHtml = new Array();
					var cardlist    = data.object;
					var size 	    = cardlist.length;
					
					target 			= $("select[name='i_sPayCardTypecd']");
					
					//맨 처음 신용카드
					target.prop("disabled",false);
					$("input:radio[name='i_sFlagEscrowYn']").prop("checked",false);
					
					arrCardHtml.push("<option value=''>카드종류를 선택해주세요</option>");
					for(var i=0; i<size; i++){
						
						var sub_code = cardlist[i].v_sub_code1;
						
						if(payType == "0001"){
							arrCardHtml.push("<option value='"+sub_code+"'>"+cardlist[i].v_sub_codenm+"</option>");
						}else{
							arrCardHtml.push("<option value='"+sub_code.substring(6,sub_code.length)+"'>"+cardlist[i].v_sub_codenm+"</option>");	
						}
						
					}
					
					target.html("");
					target.html($(arrCardHtml.join("")));

				}
			}
		});
		
	}
	, lguplusCall : function(vo){
		
		$("input[name='CST_PLATFORM']").val(vo.cstplatform);
		$("input[name='CST_MID']").val(vo.cstmid);
		$("input[name='LGD_MID']").val(vo.lgdmid);
		$("input[name='LGD_PRODUCTINFO']").val(vo.productinfo);
		$("input[name='LGD_OID']").val(vo.ordercd);
		$("input[name='LGD_TIMESTAMP']").val(vo.timestamp);
		$("input[name='LGD_HASHDATA']").val(vo.hashdata);
		$("input[name='LGD_CLOSEDATE']").val(vo.closedate);
		$("input[name='LGD_CASNOTEURL']").val(vo.casnoteurl);
		$("input[name='LGD_RETURNURL']").val(vo.returnurl);
	
		var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad');
		
		for (var word in mobileKeyWords){
			if (navigator.userAgent.match(mobileKeyWords[word]) != null){
				if(GLOBAL_MOBILE_APP=="APP"){
					$("#LGD_KVPMISPAUTOAPPYN").val("A");
					$("#LGD_MTRANSFERAUTOAPPYN").val("A");
					
					if(word != 'Android'){
						$("#LGD_KVPMISPWAPURL").val("apmall://");
						$("#LGD_KVPMISPCANCELURL").val("apmall://");
						$("#LGD_MTRANSFERWAPURL").val("apmall://");
						$("#LGD_MPILOTTEAPPCARDWAPURL").val("apmall://");
					}
					
				}else{
					
					$("#LGD_KVPMISPAUTOAPPYN").val("N");
					$("#LGD_MTRANSFERAUTOAPPYN").val("N");
				}
			}
		}

		if(vo.paytypecd == "SC0010"){

			//신용카드 시에는 카드번호
			$("input[name='LGD_USABLECARD']").val(vo.subtypecd);
			$("input[name='LGD_AFFILIATECARDINFO']").val("");
			$("input[name='LGD_AFFILIATECARDONLY']").val("N");
			
		}else if(vo.paytypecd == "SC0010_1" 
			   ||vo.paytypecd == "SSCD_01"
			   ||vo.paytypecd == "SHCD_02"
			   ||vo.paytypecd == "LOCD_01"
			   ||vo.paytypecd == "LOCD_02"){ 

			var affiliateCardInfo = "";
			var affiliateCardOnly = "N";

			if(vo.paytypecd == "SC0010_1"){
				affiliateCardInfo = "11-002055";
				affiliateCardOnly = "Y";
				vo.subtypecd = "11";
			}else if(vo.paytypecd  == "SSCD_01"){
				vo.subtypecd = "51";
			}else if(vo.paytypecd  == "SHCD_02"){
				vo.subtypecd = "41";
			}else if(vo.paytypecd  == "LOCD_01"||vo.paytypecd  == "LOCD_02"){
				vo.subtypecd = "71";
			}else{
				vo.subtypecd = "";
			}
			
			vo.paytypecd = "SC0010";
			
			$("input[name='LGD_AFFILIATECARDINFO']").val(affiliateCardInfo);
			$("input[name='LGD_AFFILIATECARDONLY']").val(affiliateCardOnly);
			$("input[name='LGD_USABLECARD']").val(vo.subtypecd);
			
		}else if(vo.paytypecd == "SC0030" || vo.paytypecd == "SC0040"){
			
			var escrowYn = $("input[name='i_sFlagEscrowYn']:checked").val();
			
			//에스크로 결제 여부
			$("input[name='LGD_ESCROW_USEYN']").val(escrowYn);

		}else if(vo.paytypecd == "PAYNOW"){
			
			$("input[name='LGD_EASYPAY_ONLY']").val("PAYNOW");
			
			if(GLOBAL_MOBILE_APP !=""){
				
				$("input[name='LGD_MONEPAYAPPYN']").val("Y");
				$("input[name='LGD_MONEPAY_RETURNURL']").val("");
				
			}else{
				
				$("input[name='LGD_MONEPAYAPPYN']").val("N");
				
			}
			
		}

		if(vo.paytypecd != "PAYNOW"){
			//결제수단 설정
			var cusTomUsa = $("input[name='LGD_CUSTOM_USABLEPAY']");
			
			if(cusTomUsa.size() > 0){
				
				$("input[name='LGD_CUSTOM_USABLEPAY']").val(vo.paytypecd);
				
			}else{
				
				var frm = $("#frm_lguplus");
				var arrHtml = [];
				arrHtml.push("<input type='hidden' name='LGD_CUSTOM_USABLEPAY' id='lgd_custom_usablepay' value='' />");
				$(arrHtml.join("")).appendTo(frm);
			}			

		}else{
			$("input[name='LGD_CUSTOM_USABLEPAY']").remove();
		}
		
		//금액 설정
		$("input[name='LGD_AMOUNT']").val(vo.lgdamount);

		//구매자 정보
		$("input[name='LGD_BUYER']").val(vo.username);
		$("input[name='LGD_BUYERID']").val(vo.userid);
		$("input[name='LGD_BUYEREMAIL']").val(vo.useremail);
		$("input[name='LGD_BUYERPHONE']").val(vo.usermobile);
		
		//YCHOI : 결제화면 호출
		launchCrossPlatform();
		
		$(".page_info").hide();
		$(".order").hide();
	}
	, lguplusCyberAccountCall : function(vo){ //무통장 입금 결제
		
		$("input[name='CST_PLATFORM']").val(vo.cstplatform);
		$("input[name='CST_MID']").val(vo.cstmid);
		$("input[name='LGD_MID']").val(vo.lgdmid); //LG유플러스에서 부여한 상점ID
		$("input[name='LGD_PRODUCTINFO']").val(vo.productinfo);
		$("input[name='LGD_OID']").val(vo.ordercd); //주문번호
		$("input[name='LGD_TIMESTAMP']").val(vo.timestamp);
		$("input[name='LGD_HASHDATA']").val(vo.hashdata);
		$("input[name='LGD_CLOSEDATE']").val(vo.closedate);
		$("input[name='LGD_CASNOTEURL']").val(vo.casnoteurl); //가상계좌 입금결과 수신 URL
		$("input[name='LGD_RETURNURL']").val(vo.returnurl);
		$("input[name='LGD_METHOD']").val("ASSIGN"); //호출 메서드 (발급: ASSIGN  변경: CHANGE)
		$("input[name='LGD_TXNAME']").val("CyberAccount"); //메소드 : CyberAccount
		$("input[name='LGD_AMOUNT']").val(vo.lgdamount); //결제금액
		$("input[name='LGD_BANKCODE']").val(vo.banktypecd); //입금계좌은행코드
		$("input[name='LGD_BUYERPHONE']").val(vo.usermobile); //구매자 휴대폰번호
		$("input[name='LGD_ACCOUNTOWNER']").val(vo.username); //입금자명
		
		
		if($("input[name='i_sTaxBillType']:checked").val() == 'N'){ //현금영수증 신청여부
			$("input[name='LGD_CASHCARDNUM']").val("");
			$("input[name='LGD_CASHRECEIPTUSE']").val("0");
		}else{
			$("input[name='LGD_CASHCARDNUM']").val($("input[name='i_sTaxBillNo']").val());
			$("input[name='LGD_CASHRECEIPTUSE']").val("1");
		}
		
		$("input[name='LGD_ACCOUNTOWNER']").val(vo.username); //입금자명
		$("input[name='LGD_ESCROW_USEYN']").val($("input[name='i_sFlagEscrowYn']:checked").val()); //에스크로 적용 여부
		
		$("#frm_lguplus").attr("method", "post");
		$('#frm_lguplus').attr("action", GLOBAL_WEB_ROOT + "mobile/order/mobile_order_lguplus_next2.do");
		$('#frm_lguplus').submit();
		
	}	
	, kakaopayCall : function(vo){
		
		if(vo.resultcode == "00"){

			var frm_kakao_pay = $("form[name='frm_kakao_pay']");
			
			var tr 	  = $(".tr_product_list");
			var field = $(".div_product_list");
			var size  = tr.size();
			var goodsCnt = 0;
			
			for(var i=0; i<size; i++){
				
				var productcnt  = parseInt($("input[name='i_arrProductCnt']",tr.eq(i)).val());
				var price       = fnOnlyNumber(fnReplaceCharAll($(".row_sale_price",field.eq(i)).text(),",","")).number;

				if(price > 0){
					goodsCnt += productcnt; 
				}
			}

			$("input[name='GoodsCnt']",frm_kakao_pay).val(goodsCnt);
			$("input[name='GoodsName']",frm_kakao_pay).val(vo.goodsname);
			$("input[name='Amt']",frm_kakao_pay).val(vo.amount);
			$("input[name='MID']",frm_kakao_pay).val(vo.mid);
			$("input[name='BuyerName']",frm_kakao_pay).val(vo.buyername);
			//$("input[name='BuyerEmail']",frm_kakao_pay).val(vo.buyeremail);
			$("input[name='EdiData']",frm_kakao_pay).val(vo.ediData);
			$("input[name='EncryptData']",frm_kakao_pay).val(vo.encryptdata);
			$("input[name='merchantTxnNum']",frm_kakao_pay).val(vo.moid);
			$("input[name='RESULT_MSG']",frm_kakao_pay).val(vo.resultmsg);
			$("input[name='RESULT_CODE']",frm_kakao_pay).val(vo.resultcode);
			$("input[name='FnNo']",frm_kakao_pay).val();
			
			frm_kakao_pay.attr("action","/mobile/order/mobile_order_kakaopay_next.do?i_sOrdercd="+vo.ordercd);
			
	        kakaopayDlp.setTxnId(vo.txnid);
	        kakaopayDlp.callDlp('kakaopay_layer', document.frm_kakao_pay, submitFunc);
	        
		}else{

			showMessageBox({message : vo.resultMsg
				,close : function(){
					
				}
			});
			
			return;
		}

	}
	, paycoCall : function(vo){
		
		if(vo.resultcode == "0"){
			var orderurl = vo.ordersheeturl; 
//			window.open(orderurl, 'popupPayco', 'top=100, left=300, width=727px, height=512px, resizble=no, scrollbars=yes');
			$("#paycoFrame").attr("src",orderurl);
			$("#payco_layer").css("display","block");
			
		}else{
			
			showMessageBox({message : vo.resultmsg
				,close : function(){
					MobileOrderStep1.setPaymentStatus("");
				}
			});
			
			return;
		}
	}
	, naverCall : function(vo){		// 네이버페이 결제 예약 후 처리
		
		if(vo.code == "Success"){

			// [s] 결제 예약 요청값
			$("input[name='modelVersion']", "#frm_naver").val(vo.modelversion);				// 네이버페이 결제 연동 버전 
			$("input[name='merchantPayKey']", "#frm_naver").val(vo.merchantpaykey);			// [필수]가맹점 결제 번호 ( v_ordercd )
			$("input[name='productName']", "#frm_naver").val(vo.productname);				// [필수]대표 상품명
			$("input[name='productCount']", "#frm_naver").val(vo.productcount);				// [필수]상품 수량
			$("input[name='deliveryFee']", "#frm_naver").val(vo.deliveryfee);				// [선택]배송비
			$("input[name='totalPayAmount']", "#frm_naver").val(vo.totalpayamount);			// [필수]총 결제 금액
			$("input[name='taxScopeAmount']", "#frm_naver").val(vo.taxscopeamount);			// [부분 필수]과세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액
			$("input[name='taxExScopeAmount']", "#frm_naver").val(vo.taxexscopeamount);		// [부분 필수]면세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액
			$("input[name='merchantUserKey']", "#frm_naver").val(vo.merchantuserkey);		// [선택]가맹점의 사용자 키
			$("input[name='returnUrl']", "#frm_naver").val(vo.returnurl);					// [필수]결제 완료 후 이동할 URL
			$("input[name='purchaserName']", "#frm_naver").val(vo.purchasername);			// [선택]구매자 성명
			$("input[name='purchaserBirthday']", "#frm_naver").val(vo.purchaserbirthday);	// [선택]구매자 생년월일(yyyymmdd)
			// [e] 결제 예약 요청값

			// [s] 결제 예약 응답값
			$("input[name='code']", "#frm_naver").val(vo.code);							// 결제 예약 응답 코드
			$("input[name='message']", "#frm_naver").val(vo.message);					// 결제 예약 응답 메시지
			$("input[name='reserveId']", "#frm_naver").val(vo.reserveid);				// 결제 예약 ID
			// [e] 결제 예약 응답값

			$("input[name='serviceUrl']", "#frm_naver").val(vo.serviceurl);				// 결제 요청 url

			$("#frm_naver").attr("action", "/order/web_order_naverpay_next.do");
			$("#frm_naver").submit();

		}else{
			
			showMessageBox({message : vo.resultmsg
				,close : function(){
					MobileOrderStep1.setPaymentStatus("");
				}
			});
			
			return;
		}
	}
	/* NFC앱 호출 [s] */
	, nfcpayCall : function(vo){

		var callUrl = "apmallsdkmodule://kpay_sdk";
		callUrl += "?P_MID=" + vo.p_mid;
		callUrl += "&P_OID=" + vo.p_oid;
		callUrl += "&P_AMT=" + vo.p_amt;
		callUrl += "&P_MNAME=" + vo.p_mname;
		callUrl += "&P_UNAME=" + vo.p_uname;
		callUrl += "&P_GOODS=" + vo.p_goods;
		callUrl += "&P_RETURN_URL=" + vo.p_return_url;
		callUrl += "&P_NFC_SCHEME=apmall_easypay://hankooknfc";
		callUrl += "&P_CANCEL_URL=" + vo.p_cancel_url;
		callUrl += "&P_QUOTA_BASE=" + vo.p_quota_base;

		window.location = callUrl;

	}
	, eximbayCall : function(vo){
		var frm_eximbay = $("#frm_eximbay");
		
		$("input[name='mid']", frm_eximbay).val(vo.mid);				 
		$("input[name='ref']", frm_eximbay).val(vo.ref);			
		$("input[name='cur']", frm_eximbay).val(vo.cur);				
		$("input[name='amt']", frm_eximbay).val(vo.amt);				
		$("input[name='buyer']", frm_eximbay).val(vo.buyer);				
		$("input[name='email']", frm_eximbay).val(vo.email);			
		$("input[name='returnurl']",frm_eximbay).val(vo.returnurl);			
		$("input[name='ver']", frm_eximbay).val(vo.ver);		
		$("input[name='fgkey']", frm_eximbay).val(vo.fgkey);		
		$("input[name='txntype']", frm_eximbay).val(vo.txntype);	
		$("input[name='statusurl']", frm_eximbay).val(vo.statusurl);	
		$("input[name='paymethod']", frm_eximbay).val(vo.paymethod);	
		$("input[name='lang']", frm_eximbay).val(vo.lang);	
		$("input[name='ostype']", frm_eximbay).val(vo.ostype);	
		$("input[name='tel']", frm_eximbay).val(vo.tel);
		$("input[name='param1']",frm_eximbay).val(vo.param1);
		$("input[name='param2']",frm_eximbay).val(vo.param2);
		if (GLOBAL_MOBILE_APP == 'APP') {
			$("input[name='mobiletype']",frm_eximbay).val("H");
		}else{
			$("input[name='mobiletype']",frm_eximbay).val("B");
		}
		
		if(vo.prdlist.length > 0){
			var arrHtml = [];
			for(var i=0; i< vo.prdlist.length; i++){
				var prd = vo.prdlist[i];
				if(prd.v_typecd != "0002"){
					arrHtml.push("<input type='hidden' name='item_"+parseInt(i+1)+"_product' value='"+prd.v_productnm+"'/>");
					arrHtml.push("<input type='hidden' name='item_"+parseInt(i+1)+"_quantity' value='"+prd.n_product_cnt+"'/>");
					arrHtml.push("<input type='hidden' name='item_"+parseInt(i+1)+"_unitPrice' value='"+Math.round(prd.n_pay_price/prd.n_product_cnt)+"'/>");
				}
			}
			$(arrHtml.join("\n")).appendTo(frm_eximbay);
		}
		frm_eximbay.attr("method","post");
		frm_eximbay.attr("action", vo.requrl);
		frm_eximbay.submit();
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
						
						showMessageBox({
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
	/* NFC앱 호출 [e] */
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
			showMessageBox({message :"["+productnm+"] 상품은 뷰티포인트 전용상품 이에요.<br/>해당상품에서 뷰티포인트로 구매하기를 체크해주세요."});
			return;
		}

		MobileOrderStep1.setPaymentStatus("ING");
		
		var frm = $("form[name='frm']");
		
		$("input[name='i_arrUserCouponcd']", frm).remove();
		$("input[name='i_arrCouponTypecd']", frm).remove();
		$("input[name='i_arrCouponProdcd']", frm).remove();

		var size = MobileOrderCoupon.list == undefined ? 0 : MobileOrderCoupon.list.length;
		var input, input2, input3;
		
		for (var i = 0; i < size; i++) {
			if (MobileOrderCoupon.list[i].v_flag_use == "Y") {
				input = $("<input type='hidden' name='i_arrUserCouponcd' />").appendTo(frm);
				input.val(MobileOrderCoupon.list[i].v_user_couponcd);
				
				input2 = $("<input type='hidden' name='i_arrCouponTypecd' />").appendTo(frm);
				input2.val(MobileOrderCoupon.list[i].v_typecd);
				
				input3 = $("<input type='hidden' name='i_arrCouponProdcd' />").appendTo(frm);
				input3.val(MobileOrderCoupon.list[i].v_productcd);
			} 
		}
		
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_coupon_check_ajax.do"
			, type : "POST"
			, data : frm.serialize()
			, dataType : "json"
			,animation	: false
			, success : function (data, textStatus, jqXHR) {
				if (data.status == "succ") {

					$("textarea[name='i_sOrderParam']").val($("input[name='i_sReturnParam']", $("form[name='frm_common']")).val());
					
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_step1_save.do"
						, type : "POST"
						, data : frm.serialize()
						, dataType : "json"
						,animation	: false
						, success : function (data, textStatus, jqXHR) {
							if (data.status == "succ") {
								
								var frm = $("form[name='frm']");
								var vo = data.object;
								$("input[name='i_sOrdercd']", frm).val(vo.v_ordercd);
								
								if (MobileOrderStep1.sum_pay_money > 0) {
									var i_sPayTypecd = $("input[name='i_sPayTypecd']").val();
									if (i_sPayTypecd == "0003"){
										MobileOrderStep1.lguplusCyberAccountCall(vo);
									}else if(i_sPayTypecd == "0021"){
										MobileOrderStep1.kakaopayCall(vo);
									}else if(i_sPayTypecd == "0022"){
										MobileOrderStep1.paycoCall(vo);
									}else if(i_sPayTypecd == "0023"){
										MobileOrderStep1.naverCall(vo);
									}else if(i_sPayTypecd == "0024"){
										MobileOrderStep1.nfcpayCall(vo);
									}else if(i_sPayTypecd == "0025"){
										MobileOrderStep1.eximbayCall(vo);
									}else if(i_sPayTypecd == "0027"){
										MobileOrderStep1.eximbayCall(vo);
									}else if(i_sPayTypecd == "0026"){
										MobileOrderStep1.onePayCall(vo);
									}
									else{
										MobileOrderStep1.lguplusCall(vo);	
									}
								}
								
								else if (MobileOrderStep1.sum_pay_bpoint > 0 || MobileOrderStep1.sum_pay_mpoint > 0 || MobileOrderStep1.sum_pay_giftcard > 0) {
									
									var frm_lguplus = $("form[name='frm_lguplus']");
									frm_lguplus.attr("action","/mobile/order/mobile_order_order_result.do?i_sOrdercd="+vo.ordercd);
									frm_lguplus.submit();
									
								}
								else {
									
									showMessageBox({message : "구매하실 상품을 선택해주세요."});
									
								}
							}
							else {
								
								MobileOrderStep1.setPaymentStatus("");
								showMessageBox({message : data.message});
							}
						}
					});
				} else {
					MobileOrderStep1.setPaymentStatus("");
					showMessageBox({message : data.message });
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
		/**gypark : AP몰 개선(일반전화 필수값 해제)*/
		
		/*phone1.unbind("change").change(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 앞자리 연락처를 선택해 주세요.");
			}
		});
		
		phone2.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 중간자리 연락처를 입력해 주세요.");
			}
		});
		
		phone3.unbind("keyup").keyup(function() {
			var val = $(this).val();
			removeErrorMessageBox($(this).eq(0));		
			
			if(isEmpty(val)) {
				addErrorMessageBox($(this).eq(0), "배송지 끝자리 연락처를 입력해 주세요.");
			}
		});	*/
		
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
		
		if(!$("input[name='i_sAgreeChk']").prop("checked")){
			showMessageBox({message : "구매 진행에 동의해야 결제 하실 수  있습니다."});
			return false;			
		}
		
		if (prodCnt == 0 && MobileOrderStep1.sum_pay_mpoint == 0) {
			showMessageBox({message : "주문하실 상품을 선택해주세요."});
			return false;
		}
		else if (prodCnt == 0 && MobileOrderStep1.sum_pay_mpoint > 0) {
			showMessageBox({message : "본품 결제액이 5,000원 이상일때에만<br/> 블루리본 포인트 상품을 구매 하실 수 있어요."});
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
			showMessageBox({message : "필수 입력사항을 확인해 주세요."});
			target.focus();						
		}
		
		return isResult;
	}
	, isValidationOrderUser : function () {
		
		var frm = $("form[name='frm']");
		var isResult = true;
		var target = undefined;
		
		if ($(".span_sold_out").size() > 0) {
			
			showMessageBox({message : "선택하신 상품중에 일시품절 상품이 포함되어있어요.<br/>해당 상품을 삭제하고 다시 주문해주세요."});
			return;
			
		}
		
		var orderUsernm = $("*[name='i_sOrderUsernm']", frm);
		var email1  = $("*[name='i_sOrderEmail1']", frm);
		var email2  = $("*[name='i_sOrderEmail2']", frm);
		var email3  = $("*[name='i_sOrderEmail3']", frm);
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
		
		if(email1.prop("disabled")){
			
			if(email3.val() == ""){

				addErrorMessageBox($("*[name='i_sOrderEmail3']", frm),"주문자 주소를 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = email1.eq(0);
				}	
				
			}else{

				email = email3.val();
				
			}

		}else{
			
			if(email1.val() == ""){

				addErrorMessageBox($("*[name='i_sOrderEmail1']", frm),"주문자 주소를 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = email1.eq(0);
				}
				
			}
			
			if(email2.val() == "" && email3.val() == ""){

				addErrorMessageBox($("*[name='i_sOrderEmail2']", frm),"주문자 뒷자리 주소를 선택해주세요.");
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
				
			}else if(payType == "0001"){
				
				var selectvalue = $("select[name='i_sPayCardTypecd']").val();
				
				if(selectvalue == ""){
					
					addErrorMessageBox($("*[name='i_sPayCardTypecd']", frm).eq(0), "카드 종류를 선택해주세요.", "");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPayCardTypecd']", frm).focus();
					}

				}
				
			}else if(payType == "0002"){
				
				if(!($("#escrow02_flag_y").eq(0).prop("checked") || $("#escrow02_flag_n").eq(0).prop("checked"))){

					addErrorMessageBox($("#escrow02_flag_y", frm).eq(0), "에스크로 결제 여부를 선택해주세요.", "");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sFlagEscrowYn']", frm).focus();
					}
				}
			}else if(payType == "0003") {
				
				if(!($("#escrow03_flag_y").eq(0).prop("checked") || $("#escrow03_flag_n").eq(0).prop("checked"))){

					addErrorMessageBox($("#escrow03_flag_y", frm).eq(0), "에스크로 결제 여부를 선택해주세요.", "");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sFlagEscrowYn']", frm).focus();
					}
				}
				
				var selectvalue = $("select[name='i_sPayBankTypecd']").val();
				
				if (selectvalue == ""){
					
					addErrorMessageBox($("*[name='i_sPayBankTypecd']", frm).eq(0), "입금은행을 선택해주세요.", "");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPayBankTypecd']", frm).focus();
					}
				}
				var checkval = "";
				$("*[name=i_sTaxBillType]",frm).each(function(){
					if($(this).attr("checked")){
						checkval = $(this).val();
					}
				});
				
				if(checkval != "N"){
					if($("input[name='i_sTaxBillNo']").val() == "휴대전화 또는 사업자등록번호" || $("input[name='i_sTaxBillNo']").val() == ""){
						addErrorMessageBox($("*[name='i_sTaxBillNo']", frm), "휴대전화 또는 사업자등록번호를 입력해주세요.", "");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sTaxBillNo']", frm).focus();
						}
					} 
				}
//				대표카드등록이 안되어있을 때
			} else if (payType == "0026"){
				
				var flagCardBillkey = $("input[name='i_sFlagCardBillkey']").val();
				
				if (flagCardBillkey != "Y"){
					isResult = false;
					showMessageBox({
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
	,GiftList : function(flag){
	
		var field			 	= $(".contView").eq(0);
		var soloPrice  			= $(".price",field);
		var arrSoloObj 	 	 	= $("input[name='i_arrFlagSolo']");
		var soloSize			= arrSoloObj.size();  
		var arrUseSoloObj 	 	= $("input[name='i_arrFlagUseSolo']");
		//var arrFlagEvent		= $("input[name='i_arrFlagEvent']");
		var i_iSoloPayPriceSum 	= 0;
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
			var field = $(".div_product_list");
			var size = tr.size();
			
			var arrParam = [];
			var arrpricebf = [];
			$("#div_bfprdList").html("");
			
			for(var i=0; i<size; i++){
				
				var solouseflag = $("input[name='i_arrFlagUseSolo']",tr.eq(i)).val();
				var beautyflag  = $("input[name='i_arrFlagBeauty']",tr.eq(i)).val();
				//var eventflag   = $("input[name='i_arrFlagEvent']",tr.eq(i)).val();
				var productcd   = $("input[name='i_arrProductcd']",tr.eq(i)).val();
				var optioncd 	= $("input[name='i_arrOptioncd']",tr.eq(i)).val();
				var brandcd	 	= $("input[name='i_arrBrandcd']",tr.eq(i)).val();
				var categorycd	= $("input[name='i_arrCategorycd']",tr.eq(i)).val();
				//YHCHOI : 특별구성 상품으로 들어온 상품, 뷰티포인트 전용 상품, 상품 옵션에서 N인것  제외
				if(solouseflag != "Y" &&  beautyflag !="Y"){

					arrParam.push("i_arrProductPrice="+ fnReplaceCharAll($(".row_sale_price",field.eq(i)).text(),",",""));
					arrParam.push("i_arrProductcd="+productcd+"");
					arrParam.push("i_arrOptioncd="+optioncd+"");
					arrParam.push("i_arrBrandcd="+brandcd+"");
					arrParam.push("i_arrCategorycd="+categorycd+"");
					if(brandcd != ""){
						var pricebf		= fnReplaceCharAll($(".row_sale_price",field.eq(i)).text(),",","");
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
			
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/order/mobile_order_gift_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				async       : false,
				data		: arrParam.join("&"),
				animation	: false,
				success		: function (data, textStatus) {
					if(data.status == "succ"){
						
						var target 			= $("#div_bfreegood");
						var groupcd			= "";
						var vo 			    = data.object.giftlist001;
						var betweencnt		= 0;
						var precnt 			= 0;
						var setcnt    		= 0;
	
						//초기화
						target.html("");
						
						$(".div_no_data").hide();
						//[S]YHCHOI : 구매 금액대별 선택 사은품
						if(vo.length > 0){
							var arrHtml001 	   	= new Array();

							for(var i=0; i<vo.length; i++){
								
								betweencnt++;
								
								if(i>0 && groupcd != vo[i].v_groupcd){
									
									arrHtml001.push("</ul>");
									arrHtml001.push("</div>");
								}
								var div = $(".chkfreegood");
								if(groupcd != vo[i].v_groupcd){
									var grpsize = $(".check_grpcd_"+vo[i].v_groupcd,div).size();
									
									arrHtml001.push("<div class='div_choice_list'>");
									//gypark : 사은품 아래 글 수정
									arrHtml001.push("	<p class='ttl'>"+vo[i].v_groupnm+" 구매 금액대별 사은품<span><br/>(<b>사은품 <span class='"+vo[i].v_groupcd+"_choice_cnt'>"+vo[i].n_max_choice+"</span>개</b>를 선택해주세요. 재고 부족시 대체품이 발송됩니다.)</span></p>");
									arrHtml001.push("	<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
									arrHtml001.push("	<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
									arrHtml001.push("	<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
									if(grpsize > 0){
										arrHtml001.push("	<span class='span_hide "+vo[i].v_groupcd+"_choose_cnt giftchoose_cnt'>"+grpsize+"</span> ");
										precnt++;
									}else{
										arrHtml001.push("	<span class='span_hide "+vo[i].v_groupcd+"_choose_cnt giftchoose_cnt'>0</span> ");
									}
									arrHtml001.push("<ul>");
									setcnt ++ ;
								}
							
								var cnt = i+1;
								
								arrHtml001.push("	<li class='li_order_gift'>");
								arrHtml001.push("		<div class='prodImg'>");
								arrHtml001.push("			<span class='inputChk4'>");
								if($(".check_prdcd_"+vo[i].v_productcd,div).size() > 0 && $(".check_grpcd_"+vo[i].v_groupcd,div).size() > 0){
									arrHtml001.push("				<input type='checkbox' id='add"+cnt+"' name='i_arrBfreeGoodChk' class='checkbox' value='"+vo[i].v_productcd+";"+vo[i].v_classcd+";"+vo[i].v_groupcd+"'checked='checked'/>");												
								}else{
									arrHtml001.push("				<input type='checkbox' id='add"+cnt+"' name='i_arrBfreeGoodChk' class='checkbox' value='"+vo[i].v_productcd+";"+vo[i].v_classcd+";"+vo[i].v_groupcd+"'/>");												
								}
								arrHtml001.push("				<label for='add"+cnt+"'>");
								//gypark : 재고 부족 시 대체품 발송 글 제거
								/*if(vo[i].n_stockqty <= 0){
								
								arrHtml001.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
								
								}*/
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
							giftparam.giftprecnt = precnt;
							giftparam.giftcnt    = setcnt;
							
							if($(".span_pregroupcd").text() == "" && vo != undefined && vo.length > 0){
								$(".span_pregroupcd").text(vo[vo.length-1].v_groupcd);
							}
							
							if(flag == "clear"){
								if(vo != undefined && vo.length > 0){
									var pregrpcd = $(".span_pregroupcd").text();
									var prebool	= false;
									if(pregrpcd != "" && pregrpcd == vo[vo.length-1].v_groupcd){
										prebool = true;
									}
									else{
										$(".span_pregroupcd").text(vo[vo.length-1].v_groupcd);
										prebool = false;
									}
									
									if(!prebool){
										showMessageBox({
											message : "쿠폰 적용이 취소되어 구매사은품을 다시 선택해주셔야 합니다.<br/>구매사은품을 선택해주세요!"
												, close : function(){
													$(".btn_freeGift").focus();
												}
										});
									}
								}
							}else if(flag == "apply"){
								if(vo != undefined && vo.length > 0){
									var pregrpcd = $(".span_pregroupcd").text();
									var prebool	= false;
									if(pregrpcd != "" && pregrpcd == vo[vo.length-1].v_groupcd){
										prebool = true;
									}
									else{
										$(".span_pregroupcd").text(vo[vo.length-1].v_groupcd);
										prebool = false;
									}
									if(!prebool){
										showMessageBox({
											message : "쿠폰할인이 적용되어 구매사은품을 다시 선택해주셔야 합니다.<br/>구매사은품을 선택해주세요!"
												, close : function(){
													$(".btn_freeGift").focus();
												}
										});
									}
								}
							}
							target.html("");	
							target.html($(arrHtml001.join("")));	
							$(".div_between_freegood").show();
							$("#div_bfreegood").show();
							$(".div_no_data").hide();
							
						}
						//[E]YHCHOI : 구매 금액대별 선택 사은품					

						groupcd			= "";
						vo 			    = data.object.giftlist002;
						
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
									
									arrHtml002.push("<div class='div_choice_list'>");
									arrHtml002.push("	<p class='ttl'>"+vo[i].v_groupnm+"구매 금액대별 고정 사은품</p>");
									arrHtml002.push("	<input type='hidden' name='i_arrrBfGiftcd' value='"+vo[i].v_giftcd+"'/>");
									arrHtml002.push("	<input type='hidden' name='i_arrrBfGroupcd' value='"+vo[i].v_groupcd+"'/>");
									arrHtml002.push("	<input type='hidden' name='i_arrrBfClasscd' value='"+vo[i].v_classcd+"'/>");
									arrHtml002.push("<ul>");
									
								}
							
								arrHtml002.push("	<li class='li_order_gift'>");
								arrHtml002.push("		<div class='prodImg'>");
								arrHtml002.push("			<span class='inputabsol'>");
								arrHtml002.push("				<label>");
								//gypark : 재고 부족 시 대체품 발송 글 제거
								/*if(vo[i].n_stockqty <= 0){
			
								arrHtml002.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
								
								}*/
								
								arrHtml002.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml002.push("				</label>");												
								arrHtml002.push("			</span>");
								arrHtml002.push("		</div>");
								arrHtml002.push("		<div class='prodDetail'>");
								var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
								
								arrHtml002.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");
								//gypark : 사은품 정보 아이콘 삽입 
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
			
							target.html(target.html() +arrHtml002.join(""));	
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
						//[E]YHCHOI : 구매 금액대별 고정 사은품					
					
						//[S]YHCHOI : 스폐셜 사은품 + 데일리 기프트 + 금주의 브랜드
						vo 			    = data.object.giftlist003;
						target			= $("#ul_sfreegood");
						groupcd 		= "";

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
								
								arrHtml003.push("		<div class='prodImg'>");
//								arrHtml003.push("			<span class='inputChk4 inputabsol'>");
								arrHtml003.push("				<label>");
								//gypark : 재고 부족 시 대체품 발송 글 제거
								/*if(vo[i].n_stockqty <= 0){
			
								arrHtml003.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
								
								}*/
								
								arrHtml003.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml003.push("				</label>");												
//								arrHtml003.push("			</span>");
								arrHtml003.push("		</div>");
								arrHtml003.push("		<div class='prodDetail'>");
								
								var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
								
								arrHtml003.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");							
								arrHtml003.push("			<p class='prodNm'>"+vo[i].v_productnm+"</p>");
															
								if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
									
									arrHtml003.push("			<p class='ml'>"+vo[i].v_capacity+" * "+vo[i].n_cnt+"개</p>");
									
								}else{
									
									arrHtml003.push("			<p class='ml'>"+vo[i].n_cnt+"개</p>");
									
								}
								
								arrHtml003.push("		</div>");
								arrHtml003.push("	</li>");
								
								groupcd = vo[i].v_groupcd;
							}					
			
							target.html(arrHtml003.join(""));
							$(".div_speical_freegood").show();
							$(".div_no_data").hide();
						}else{
							$(".div_speical_freegood").hide();
						}
						
						vo 			    = data.object.giftlist004;
						groupcd 		= "";
						
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
								
								arrHtml004.push("		<div class='prodImg'>");
								arrHtml004.push("			<span class='inputabsol'>");
								arrHtml004.push("				<label>");
								//gypark : 재고 부족 시 대체품 발송 글 제거
								/*if(vo[i].n_stockqty <= 0){
			
								arrHtml004.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
								
								}*/
								
								arrHtml004.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml004.push("				</label>");												
								arrHtml004.push("			</span>");
								arrHtml004.push("		</div>");
								arrHtml004.push("		<div class='prodDetail'>");
								
								var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
								
								arrHtml004.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");							
								arrHtml004.push("			<p class='prodNm'>"+vo[i].v_productnm+"</p>");
										
								if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
									
									arrHtml004.push("			<p class='ml'>"+vo[i].v_capacity+" * "+vo[i].n_cnt+"개</p>");
									
								}else{
									
									arrHtml004.push("			<p class='ml'>"+vo[i].n_cnt+"개</p>");
									
								}
								
								arrHtml004.push("		</div>");
								arrHtml004.push("	</li>");

								groupcd = vo[i].v_groupcd;
							}					
							
							target.html(target.html() +arrHtml004.join(""));
							$(".div_speical_freegood").show();
							$(".div_no_data").hide();
						}	
						
						vo 			    = data.object.giftlist005;
						groupcd			= "";
						
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
								
								arrHtml005.push("		<div class='prodImg'>");
								arrHtml005.push("			<span class='inputabsol'>");
								arrHtml005.push("				<label>");
								//gypark : 재고 부족 시 대체품 발송 글 제거
								/*if(vo[i].n_stockqty <= 0){
			
								arrHtml005.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
								
								}*/
								
								arrHtml005.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml005.push("				</label>");												
								arrHtml005.push("			</span>");
								arrHtml005.push("		</div>");
								arrHtml005.push("		<div class='prodDetail'>");
								
								var bradnnm = vo[i].v_brandnm == undefined ? '아모레퍼시픽' : vo[i].v_brandnm;
								
								arrHtml005.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");								
								arrHtml005.push("			<p class='prodNm'>"+vo[i].v_productnm+"</p>");
									
								if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
									
									arrHtml005.push("			<p class='ml'>"+vo[i].v_capacity+" * "+vo[i].n_cnt+"개</p>");
									
								}else{
									
									arrHtml005.push("			<p class='ml'>"+vo[i].n_cnt+"개</p>");
									
								}
								
								arrHtml005.push("		</div>");
								arrHtml005.push("	</li>");

								groupcd = vo[i].v_groupcd;
							}				
							
							target.html(target.html() +arrHtml005.join(""));	
							$(".div_speical_freegood").show();
							$(".div_no_data").hide();
							
						}
						
						if(specialcnt == 0){
							$(".div_speical_freegood").hide();
						}
						
						if(betweencnt == 0 && specialcnt == 0 && MobileOrderStep1.vip_pointmall_cnt == 0 && MobileOrderStep1.rebon_pointmall_cnt == 0 ){

						    //아코디언
						    var $accotit = $("#accoTab > .tit");
						    var $accoCont = $("#accoTab .contView");
						    
							if($(".div_coupon_freegood").css("display") != "none"){

							    $accoCont.eq(1).css("display","block");
							    $accotit.eq(1).addClass("active");
							    
							}else{

							    $accoCont.eq(1).css("display","none");
							    $accotit.eq(1).removeClass("active");
							    
//							    $(".div_no_data").show();	
							}						    	
						} 

						//[E]YHCHOI : 스폐셜 사은품 + 데일리 기프트 + 금주의 브랜드
						
						$("input:checkbox[name='i_arrBfreeGoodChk']").unbind("click").click(function(event){
							
							var value	= $(this).val().split(";");
							
							var groupcdchk = value[2];
							var productcd  = value[0];
							var choiceCnt = fnOnlyNumber($("."+groupcdchk+"_choice_cnt").text()).number;
							var chooseCnt = fnOnlyNumber($("."+groupcdchk+"_choose_cnt").text()).number;
							var div = $(".chkfreegood");
							if($(this).prop("checked")){
								if(chooseCnt >= choiceCnt){
								
									showMessageBox({message : "1개의 사은품을 선택해 주세요."});
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
						
					}
					
					//gypark
					$(".tag_info1").click(function(event){
						var index = $(".tag_info1").index($(this));
						 event.preventDefault();
						 var tr	  = $(".div_choice_list > ul > li").eq(index);
				         var tagInfo = $("input[name='tag_display']", tr).val(); 
				         var str = "";
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
	,OrderList : function(){

			//YHCHOI : 본품 상품 들어가는 부분
			var productTr		 = $(".tr_product_list");
			var freegoodTr		 = $(".tr_freegood_list");
			var productlistSize  = productTr.size();
			var freegoodlistSize = freegoodTr.size();
	
			if(productlistSize > 0){
			
					var target 		= $(".contView").eq(0);
					var arrHtml 	= new Array();
					var arrGift 	= new Array();
					var giftCnt = 0;
					var reservation_cnt  = 0;
					var beautyprd_cnt    = 0;
					
					for(var i=0; i<productlistSize; i++){
							var productcd    = $("input[name='i_arrProductcd']",productTr.eq(i));
							var productnm	= $("input[name='i_arrProductnm']",productTr.eq(i));
							var productimg 	= $("input[name='i_arrProductImg']",productTr.eq(i));
							var productcnt 	= $("input[name='i_arrProductCnt']",productTr.eq(i));
							var flagSolo 	= $("input[name='i_arrFlagSolo']",productTr.eq(i));
							var flagUsesolo = $("input[name='i_arrFlagUseSolo']",productTr.eq(i));
							var optionnm   	= $("input[name='i_arrOptionnm']",productTr.eq(i));
							var optioncnt   = $("input[name='i_arrOptionCnt']",productTr.eq(i));
							var featuretag  = $("input[name='i_arrFeatureTag']",productTr.eq(i));
							var brandnm  	= $("input[name='i_arrBrandnm']",productTr.eq(i));
							var statuscd  	= $("input[name='i_arrStatuscd']",productTr.eq(i));
							var stockqty  	= $("input[name='i_arrStockQty']",productTr.eq(i));
							var beautyFlag  = $("input[name='i_arrFlagBeauty']",productTr.eq(i));
							var flagBillingProd  = $("input[name='i_arrFlagBillingProd']",productTr.eq(i));
							
							var price			= fnOnlyNumber($(".span_price",productTr.eq(i)).text()).number;
							var sale_price		= fnOnlyNumber($(".span_sale_price",productTr.eq(i)).text()).number;
							var today_price		= fnOnlyNumber($(".span_today_price",productTr.eq(i)).text()).number;
							
							var onePlusBuyCnt   = fnOnlyNumber($(".span_oneplus_buy_cnt", productTr.eq(i)).text()).number;
							var onePlusGiveCnt  = fnOnlyNumber($(".span_oneplus_give_cnt", productTr.eq(i)).text()).number;
							var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;

							var dayoffcd   		 =  $(".span_dayoffcd",productTr.eq(i)).text();
							var dayoffStockqty   =  $(".span_dayoff_stockqty",productTr.eq(i)).text();						

							var productkey 		= $(".span_key",productTr.eq(i)).text();

							if(productlistSize >1){
								if(i == 0){
									var summary = $(".summary_ord");
									$(".prodImg>img",summary).prop("src",productimg.val());
									$(".span_firstPrdNm",summary).text(productnm.val());
									$("#summary_count").text(" 외 "+parseInt(productlistSize-1)+"건");
									
								}
							}else{
								$(".summary_ord").hide();
							}
							
							arrHtml.push("<div class='orderProdBox div_product_list'>");
							arrHtml.push("	<div class='prodbox'>");
							arrHtml.push("		<div class='prodImg'><img src='"+productimg.val()+"' alt=''onerror='fnNoImage(this);'/></div>");
							arrHtml.push("		<div class='detail'>");

							arrHtml.push("			<p class='prodNm'>");
							
							if(((statuscd.val() != "0001" &&  statuscd.val() != "0005") || stockqty.val()<=0) && flagBillingProd.val() != "Y"){
								
								arrHtml.push("<span class='span_sold_out' style='color:red;'>[일시품절]</span>");								
							}
							
							arrHtml.push(""+brandnm.val()+"   "+productnm.val()+" <span class='count'>"+productcnt.val()+"개</span></p>");							
							
							
							if(parseInt(optioncnt.val())> 1 ||(featuretag.val().indexOf("DG_P003") > -1 || featuretag.val().indexOf("DG_P004") > -1)){
								
								arrHtml.push("		<div class='option'>"+optionnm.val()+"</div>");
							}
							
							arrHtml.push("		<p class='priceZone'>");
							
							
							if((dayoffStockqty > 0 && dayoffcd !="" && today_price > 0)
							||((price>0 && sale_price > 0 && price > sale_price) && (dayoffStockqty == 0 && dayoffcd ==""))
							||(isonePlusFlag)){
										
								var unit = "원";
								var color = "";
								
								if(beautyFlag.val() == "Y"){
									unit = "P";
									color = "color: #ea5279";
									beautyprd_cnt++;
									arrHtml.push("			<span class='price' style='"+color+"'><em><span class='row_sale_price'>0</span></em>"+unit+"</span>");
								}else{
									arrHtml.push("			<span class='sale'><em><span class='row_pay_price'>0</span></em>원</span>");
									arrHtml.push("			<span class='price'><em><span class='row_sale_price'>0</span></em>원</span>");
								}
								
							}else{

								var unit = "원";
								var color = "";
								
								if(beautyFlag.val() == "Y"){
									unit = "P";
									color = "color: #ea5279";
									beautyprd_cnt++;
								}
								
								arrHtml.push("			<span class='price' style='"+color+"'><em><span class='row_sale_price'>0</span></em>"+unit+"</span>");									
								
							}

							arrHtml.push("		</p>");
							arrHtml.push("</div>");
							arrHtml.push("</div>");

					        var evtCatecd = $("input[name='i_sEvtCategorycd']").val();
							var disabeld = isonePlusFlag || !MobileOrderStep1.isLogin ? 'disabled' : '';
							
							if(productcd.val() == "SPR20161228000025917"
								|| evtCatecd == "EP001" || evtCatecd == "EP002" || evtCatecd == "EP003" || evtCatecd == "EP004"){
					        	disabeld = "disabled";
					        }
							
							if(!MobileOrderStep1.isSnsLogin) {
								arrHtml.push("<div class='pointBox clearfix'>");
								arrHtml.push("	<div class='info_point'>");
								arrHtml.push("		<p class='pointTxt'>");
								arrHtml.push("			<span class='sp_point beautytxt v2'><em><span class='row_save_bpoint'>0</span>P<!--<span class='row_save_bpoint_per'></span>--></em></span>");
								arrHtml.push("			<span class='sp_point blueRebontxt v2'><em><span class='row_save_mpoint'>0</span>P<!--<span class='row_save_mpoint_per'></span>--></em></span>");
								arrHtml.push("		</p>");
								arrHtml.push("	</div>");
							}
	
							if((flagSolo.val() == "Y" && flagUsesolo.val() == "Y") || flagSolo.val() == "N"){
								
								var productkey_temp = "";
								var isDivFlag = false;

								if(freegoodlistSize>0){
									
									for(var k=0; k<freegoodlistSize; k++){
										
										var freegoodnm			= $("input[name='i_arrFreegoodnm']",freegoodTr.eq(k));
										var freegoodimg 		= $("input[name='i_arrFreegoodImg']",freegoodTr.eq(k));
										var freegoodcnt			= $("input[name='i_arrFreegoodCnt']",freegoodTr.eq(k));
										var freegoodkey			= $("input[name='i_arrFreegoodKey']",freegoodTr.eq(k));
										var freecapacity		= $("input[name='i_arrFreeCapacity']",freegoodTr.eq(k));
										var freebrandnm			= $("input[name='i_arrFreeBrandnm']",freegoodTr.eq(k));
										
										var UproductKey         = $(".span_key",freegoodTr.eq(k)).text();
										
										if(productkey == UproductKey){
											
											if(productkey_temp != UproductKey){
												giftCnt++;
												isDivFlag = true;
												arrGift.push("<div class=\"orderProdBox\">");
												arrGift.push("	<div class=\"prodbox\">");
												arrGift.push("		<div class=\"prodImg\">");
												arrGift.push("			<img src='"+productimg.val()+"' alt=''onerror='fnNoImage(this);'/>");
												arrGift.push("		</div>");
												arrGift.push("		<div class=\"detail\">");
												arrGift.push("			<p class=\"brandNm\">"+brandnm.val()+"</p>");
												arrGift.push("			<p class=\"prodNm\">"+productnm.val()+"</p>");
												arrGift.push("			<p class=\"freeGift_bubble\">이 제품 구매시 스페셜기프트 증정!</p>");
												arrGift.push("		</div>");
												arrGift.push("	</div>");
												arrGift.push("</div>");
												arrGift.push("<div class='sec'>");
												arrGift.push("	<ul>");
																			
											}
											arrGift.push("		<li class='li_freegood_list li_"+freegoodkey.val()+"'>");
											arrGift.push("			<div class='prodImg'>");	
											arrGift.push("			<img src='"+freegoodimg.val()+"' alt='' onerror='fnNoImage(this);'>");
											arrGift.push("			</div>");
											arrGift.push("			<div class='prodDetail'>");
											
											var bradnnmDefault = freebrandnm.val() == undefined ? '아모레퍼시픽' : freebrandnm.val();
											
											arrGift.push("			<p class='brandNm ellipsis'>"+bradnnmDefault+"</p>");	
											arrGift.push("			<p class='prodNm'>"+freegoodnm.val()+" * <span class='span_fg_cnt'>"+freegoodcnt.val()+"</span>개</p>");	
											
											if(freecapacity.val() !="" && freecapacity.val() != undefined){
												
												arrHtml.push("		<p class='ml'>"+freecapacity.val()+"</p>");
												
											}
											
											arrGift.push("			</div>");	
											//arrGift.push("			<span class='span_fg_cnt'>"+freegoodcnt.val()+"</span>");		
											arrGift.push("		</li>");
		
											productkey_temp = productkey;
										}
									}
								}
		
								if(isDivFlag){
									arrGift.push("	</ul>");
									arrGift.push("</div>");									
								}
								
							}							
	
							arrHtml.push("	</div>");
							
							
							arrHtml.push("</div>");
					}
					
					arrHtml.push("	<div class='wrap_btn_gift'>");
					arrHtml.push("		<a href='javascript:;' class='btn_freeGift' onclick=\"trackClicksEx('모바일 결제진행^사은품 선택하기','사은품 선택하기',true);\">사은품 선택하기</a>");
					arrHtml.push("	</div>");
					
					target.html($(arrHtml.join("")));
					$("#prdGiftList").html($(arrGift.join("")));
					if(giftCnt >0){
						$(".div_no_data_giftPrd").hide();
					}/*else{
						$(".div_no_data_giftPrd").show();
					} *///gypark :사은품 없을때는 그냥 접혀보이게 수정 요청
					
					//YHCHOI : 예약발송 상품이 있으면 표시해준다.
					if(reservation_cnt > 0){
						$(".div_alarm_reservation").show();
					}
					
					//YHCHOI : 뷰티포인트 전용 상품이 있으면 표시해준다.
					if(beautyprd_cnt > 0){
						$(".div_alarm_beautyprd").show();
					}       
			}	
		
			//YHCHOI : 수분 포인트 들어가는 부분
			var waterTr   = $(".tr_water_point_list");
			var waterSize = waterTr.size();
				
			if(waterSize > 0){
				                                  
					var target 	= $("#div_rbfreegood");
					var arrHtml = new Array();
					
					arrHtml.push("<ul>");
					
					for(var i=0; i<waterSize; i++){
		
						var waterProductnm  = $("input[name='i_arrProductnm']",waterTr.eq(i));
						var waterProductCnt = $("input[name='i_arrProductCnt']",waterTr.eq(i));
						var waterBrandnm 	= $("input[name='i_arrProductBrandnm']",waterTr.eq(i));
						var waterProductimg = $("input[name='i_arrProductImg']",waterTr.eq(i));
						var waterCapacity   = $("input[name='i_arrProductCapacity']",waterTr.eq(i));
					
						arrHtml.push("	<li>");
						arrHtml.push("		<div class='prodImg'>");
						arrHtml.push("			<img src='"+waterProductimg.val()+"' alt='' onerror='fnNoImage(this);'/>");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class='prodDetail'>");
						
						var bradnnm = waterBrandnm.val() == "" ? '아모레퍼시픽몰' : waterBrandnm.val();
						
						arrHtml.push("			<p class='brandNm ellipsis'>"+bradnnm+"</p>");						
						arrHtml.push("			<p class='prodNm'>"+waterProductnm.val()+"</p>");
						
						if(waterCapacity.val() !="" && waterCapacity.val() != undefined && waterProductCnt.val() > 0){
							
							arrHtml.push("			<p class='ml'>"+waterCapacity.val()+" * "+waterProductCnt.val()+"개</p>");
							
						}else{
							
							arrHtml.push("			<p class='ml'>"+waterProductCnt.val()+"개</p>");
							
						}
	
						arrHtml.push("		</div>");
						arrHtml.push("	</li>");
						
						MobileOrderStep1.rebon_pointmall_cnt++;
					}
					
					arrHtml.push("</ul>");
		
					target.html("");	
					target.html($(arrHtml.join("")));	
					$(".div_rebon_freegood").show();
					$(".div_no_data").hide();
					
			}else{
				$(".div_rebon_freegood").hide();
			}
	
			//YHCHOI : VIP 사은품 들어가는 부분
			var vipTr 	= $(".tr_vip_gift_list");
			var vipSize	= vipTr.size();
				
			if(vipSize > 0){
					
					var target 	= $("#div_vipfreegood");
					var arrHtml = new Array();
		
					arrHtml.push("<ul>");
					for(var i=0; i<vipSize; i++){
		
						var vipBrandnm 	  = $("input[name='i_arrVipGiftBrandnm']",vipTr.eq(i));
						var vipProductnm  = $("input[name='i_arrVipGiftProductnm']",vipTr.eq(i));
						var vipProductCnt = $("input[name='i_arrVipGiftProductCnt']",vipTr.eq(i));
						var vipProductimg = $("input[name='i_arrVipGiftImg']",vipTr.eq(i));
						var vipCapacity   = $("input[name='i_arrVipGiftCapacity']",vipTr.eq(i));
					
						arrHtml.push("	<li>");
						arrHtml.push("		<div class='prodImg'>");
						arrHtml.push("			<img src='"+vipProductimg.val()+"' alt='' onerror='fnNoImage(this);'/>");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class='prodDetail'>");
						arrHtml.push("			<p class='brandNm ellipsis'>"+vipBrandnm.val()+"</p>");
						arrHtml.push("			<p class='prodNm'>"+vipProductnm.val()+"</p>");
						
						if(vipCapacity.val() !="" && vipCapacity.val() != undefined && vipProductCnt.val() > 0){
							
							arrHtml.push("			<p class='ml'>"+vipCapacity.val()+" * "+vipProductCnt.val()+"개</p>");
							
						}else{
							
							arrHtml.push("			<p class='ml'>"+vipProductCnt.val()+"개</p>");
							
						}
						
						arrHtml.push("		</div>");
						arrHtml.push("	</li>");
						
						MobileOrderStep1.vip_pointmall_cnt++;
					}					
					
					arrHtml.push("</ul>");
		
					target.html("");	
					target.html($(arrHtml.join("")));	
					$(".div_vip_freegood").show();
					$(".div_no_data").hide();
			}else{
				$(".div_vip_freegood").hide();
			}
	
	}
	, setNamingPrice : function (namingcd, namingCnt, namingPrice) {
		$("input[name='i_sFlagNaming']").val(namingCnt > 0 ? "Y" : "N");
		$("input[name='i_sNamingcd']").val(namingcd);

		if (namingCnt > 0) {
			$("input[name='i_sFlagNaming_temp']").prop("checked",true);
		}
		else {
			$("input[name='i_sFlagNaming_temp']").prop("checked",false);
		}
		
		
		MobileOrderNaming.naming_cnt		= namingCnt;
		MobileOrderStep1.sum_naming_cnt 	= namingCnt;
		MobileOrderStep1.sum_naming_price 	= namingPrice;
		MobileOrderStep1.setPayStats();
		
		$(".span_lettering_cnt").text(namingCnt);
	}
	// 뷰티포인트 결제시 사은품 처리
	, setBpointFreegood : function ( key, cnt) {
		var arrTr = $(".tr_" + key);
		var arrLi = $(".li_" + key);
		var size = arrTr.size();
		var fgCntPerUnit = 0;
		
		for (var i = 0; i < size; i++) {
			if (cnt == 0) {
				$(".span_fg_cnt", arrTr.eq(i)).text("0");
				arrTr.eq(i).hide();
				arrLi.eq(i).hide();
			}
			else {
				fgCntPerUnit = fnOnlyNumber($(".span_fg_cnt_per_unit", arrTr.eq(i)).text()).number;
				$(".span_fg_cnt", arrLi.eq(i)).text(fgCntPerUnit * cnt);
				$(".span_fg_cnt", arrTr.eq(i)).text(fgCntPerUnit * cnt);
				
				
				arrTr.eq(i).show();
				arrLi.eq(i).show();
			}
		}
	}
	,clearPayBpoint : function(){
		var tr			  = $(".tr_product_list");
		var size 	 	  = tr.size();
		
		for(var i = 0 ; i< size; i ++ ){
			var feild_bpoint = tr.eq(i).find(".span_bpoint_temp_price");
			feild_bpoint.text(0);
			tr.eq(i).find("input[name='i_arrFlagBpoint']").val("N");
			tr.eq(i).find("input[name='i_arrPayBpoint']").val(0);
			tr.eq(i).find("input[name='i_arrPayBpointCnt']").val(0);							
		}
		
		$("#inp_bpoint_price").val("0");
		$("#btn_user_bpoint_pop").removeClass("refund");
		$("#btn_user_bpoint_pop").addClass("use");
		$("#btn_user_bpoint_pop").text("포인트사용");
		MobileOrderStep1.total_apply_bpoint = 0;
		MobileOrderStep1.sum();
	} 
	, sum : function (flag) {

		var tr 		= $(".tr_product_list");
		var feild 	= $(".div_product_list");
		var size 	= tr.size();
		
		var sum_price 			 = 0;	// 주문금액
		var sum_pay_price 		 = 0;	// 결제금액
		var sum_dis_price 		 = 0;	// 할인금액		
		var sum_dis_coupon_price = 0;
		var sum_pay_bpoint 		 = 0;
		var sum_pay_bpoint_only	 = 0;	//뷰티포인트 전용상품
		
		var sum_save_bpoint		 = 0;
		var sum_save_mpoint		 = 0;
		var sum_cart_discount	 = 0;
		var sum_need_bpoint		 = 0;
		var sum_dis_channel_price = 0;
		var sum_pay_bpoint_cnt	 = 0;
		var use_bpoint			 = MobileOrderStep1.total_apply_bpoint;
		
		var sum_zero_point_price = 0;
		var sum_zero_mpoint_price = 0;
		
		var product_temp 	 = "";  // 1+1 전 구매 상품.
		var preCnt_temp  	 = 0;   // 1+1 전 구매 상품 갯수.
		var pre_price_temp   = 0; 
		
		//[S] 2016.12.01 YHCHOI : 뷰티포인트 파라미터
		var sum_min_bpoint_price  = 0;
		var sum_min_bpoint_cnt	  = 0;
		var arrBpointObj		  = [];
		//var arrBrdcd			  = ["ALK","AEK","22011","CAK","MCK","AFK","AOK","AMK"];
		//[E] 2016.12.01 YHCHOI : 뷰티포인트 파라미터

		// 쿠폰 사용여부 초기화
		MobileOrderCoupon.clearFlagUse();
		MobileOrderCoupon.cart_max_dcprc	=	MobileOrderCoupon.cart_ori_max_dcprc;
		//뷰포합산결제 수정으로인해 
		//사용하고자하는 뷰티포인트를 나눠 계산하기때문에 뷰포전용상품이 있는경우 제일 먼저 사용하고자하는 포인트에서 제외시켜준다.
		for (var i = 0; i < size; i++) {
			if("Y" == $("input[name='i_arrFlagBeauty']", tr.eq(i)).val()){
				if(use_bpoint > 0){
					var beauty_price 	= fnOnlyNumber($(".span_beauty_price", tr.eq(i)).text()).number;
					var cnt 			= fnOnlyNumber($("input[name='i_arrProductCnt']", tr.eq(i)).val()).number;	
					use_bpoint = use_bpoint - (beauty_price * cnt); 
				}
			}
		}
		
		$("input[name='i_iAllUseBpoint']").val(use_bpoint);
		
		for (var i = 0; i < size; i++) {

			var mPointflag 				= "";
			var	mpoint_per				= 0;
			var bpoint_per				= 0;
			
			var row_pay_price			= 0;
			var row_dis_ch_price		= 0;
			var row_pay_bpoint 			= 0;
			var row_pay_bpoint_only		= 0;		//뷰포전용상품 
			var row_pay_bpoint_cnt		= 0;
			var row_pay_bpoint_cnt_only	= 0;		//뷰포전용상품
			var row_pay_coupon			= 0;
			
			var row_dis_coupon_price	= 0;
			var row_sale_price			= 0;
			var row_save_bpoint			= 0;
			var row_save_mpoint			= 0;
			var row_cart_discount 		= 0;
			var row_need_bpoint         = 0;
			var row_sum_price			= 0;
			var row_dis_price			= 0;
			var row_origin_pay_price	= 0; //하나의 상품을 여러개 주문 후 상품쿠폰 + 뷰티포인트 사용시 각 갯수별 비중을 구하기 위해 뷰포를 사용하기 전의 가격합을 넘겨준다.
			var onplus_sum_bpoint		= 0;
			var coupon_sum_bpoint		= 0;
			
			var channel_dc_per			= MobileOrderStep1.channel_dc_per;
			var channel_dc_brd_exc		= MobileOrderStep1.channel_dc_brd_exc;
			
			var productcd		= $("input[name='i_arrProductcd']", tr.eq(i)).val();
			var optioncd		= $("input[name='i_arrOptioncd']", tr.eq(i)).val();
			var brandcd			= $("input[name='i_arrBrandcd']", tr.eq(i)).val();
			 
			var price 			= fnOnlyNumber($(".span_price", tr.eq(i)).text()).number;
			var sale_price 		= fnOnlyNumber($(".span_sale_price", tr.eq(i)).text()).number;
			var beauty_price 	= fnOnlyNumber($(".span_beauty_price", tr.eq(i)).text()).number;
			
			var onePlusBuyCnt   = fnOnlyNumber($(".span_oneplus_buy_cnt", tr.eq(i)).text()).number;
			var onePlusGiveCnt  = fnOnlyNumber($(".span_oneplus_give_cnt", tr.eq(i)).text()).number;
			var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;
			
			var dayoffStockqty  = fnOnlyNumber($(".span_dayoff_stockqty",tr.eq(i)).text()).number;
			var dayoffcd		= $(".span_dayoffcd",tr.eq(i)).text();
			var typecd			= $(".span_typecd",tr.eq(i)).text();

			var save_mpoint 		= 0;
			var save_mpoint_per 	= 0;
			var coupon_beauty_flag = "Y";
			
		    if(dayoffStockqty > 0 && dayoffcd !=""){
				sale_price	= fnOnlyNumber($(".span_today_price", tr.eq(i)).text()).number;
			}else{
				mPointflag	= $(".span_mpoint_per",tr.eq(i)).text();
				
				mpoint_per	= mPointflag.substring(mPointflag.indexOf("_")+1);
				bpoint_per	= fnOnlyNumber($(".span_bpoint_per", tr.eq(i)).text()).number;
				
				if(mPointflag.indexOf("PER_")>-1){
					save_mpoint_per	= MobileOrderStep1.isLogin ? fnOnlyNumber(mpoint_per).number : 0;	
				}else{			
					save_mpoint		= MobileOrderStep1.isLogin ? fnOnlyNumber(mpoint_per).number : 0;
				}	
			}
		    
			var cnt 	  			= fnOnlyNumber($("input[name='i_arrProductCnt']", tr.eq(i)).val()).number;
			var dis_coupon_price 	= 0;
			var dis_cp_prod_cnt		= 0;
			var dis_price 			= price - sale_price;

			//[S] 2016.12.01 YHCHOI : 뷰티포인트 파라미터
			var pay_bpoint	= fnOnlyNumber(tr.eq(i).find(".span_bpoint_temp_price").text()).number;
			var bpoint_cnt	= pay_bpoint > 0 ? fnOnlyNumber(tr.eq(i).find(".span_bpoint_temp_cnt").text()).number : 0;
			var flag_mix 	= tr.eq(i).find("input[name='i_arrFlagMix']").val();
			var flag_beauty = tr.eq(i).find("input[name='i_arrFlagBeauty']").val();
			//[E] 2016.12.01 YHCHOI : 뷰티포인트 파라미터

			//MobileOrderStep1.setBpointFreegood($(".span_key", tr.eq(i)).text(), cnt - bpoint_cnt); // 뷰티포인트 결제시 사은품 처리
			
			if(!isonePlusFlag && typecd !="0003" && !(dayoffStockqty > 0 && dayoffcd !="" && dayoffcd != "undefined")){

				// 금액할인쿠폰(장바구니)
				if (MobileOrderCoupon.cart_discount_per > 0 && MobileOrderCoupon.cart_max_dcprc !=0) {
					
					if((MobileOrderCoupon.cart_flag_brand == "Y"  && MobileOrderCoupon.cart_out_brandcd.indexOf(brandcd) == -1) || MobileOrderCoupon.cart_flag_brand == "N"){
						
						if ((dis_price == 0 || MobileOrderCoupon.cart_flag_norprc == "Y") && ("Y" != $("input[name='i_arrFlagBeauty']", tr.eq(i)).val())) {

							dis_cp_prod_cnt	= cnt - bpoint_cnt;
							
							dis_coupon_price = Math.round(price * MobileOrderCoupon.cart_discount_per / 100);
							
							for(var j=0; j<dis_cp_prod_cnt; j++){
								var paybpoint = 0;
								if(MobileOrderCoupon.cart_max_dcprc < 0){
									MobileOrderCoupon.cart_max_dcprc = 0;
								}
								
								if(MobileOrderCoupon.cart_max_dcprc < dis_coupon_price){
									dis_coupon_price = MobileOrderCoupon.cart_max_dcprc;
								}
								
								MobileOrderCoupon.cart_max_dcprc -= dis_coupon_price;
								
								if((price - dis_coupon_price) >= 5000 && flag_mix == "Y"){
									//뷰포사용가능
									coupon_sum_bpoint += parseInt(price - dis_coupon_price);
									if(use_bpoint > 0){
										if(MobileOrderStep1.sum_min_bpoint_price > 0){
											var solo_prd_price = price - dis_coupon_price;
											var bpoint_price = Math.round(((solo_prd_price/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;
											row_pay_bpoint += bpoint_price;
											row_pay_bpoint_cnt += 1;
											if(((i == size-1) && (j == dis_cp_prod_cnt-1))//마지막일경우 쿠폰for에서도 마지막 
													|| parseInt(sum_pay_bpoint_cnt + row_pay_bpoint_cnt) >= MobileOrderStep1.sum_min_bpoint_cnt){//사용갯수가 총사용가능 갯수보다 크거나 '같을'경우(마지막 row의 상품이 뷰포전용상품일경우, 이전상품에서 사용뷰포에 맞춰준다)
												var last_sum_bpoint = parseInt((sum_pay_bpoint - sum_pay_bpoint_only) + row_pay_bpoint); //현재까지 총 사용포인트에서 뷰포 전용으로 사용한 포인트는 빼줘야한다.(마지막 row인경우 남은 remain뷰포를 구하기위해)- 이하동일
												bpoint_price = parseInt(bpoint_price + (use_bpoint - last_sum_bpoint));
												row_pay_bpoint += parseInt(use_bpoint - last_sum_bpoint);
											}
											paybpoint = bpoint_price;
										}
									}
									sum_min_bpoint_cnt += 1;
									row_origin_pay_price += price - dis_coupon_price;
								}
								
								row_cart_discount	+= dis_coupon_price;								 
								row_pay_coupon		+= dis_coupon_price;
								row_pay_price		+= price - dis_coupon_price - paybpoint;
								
								if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
									
									var dis = (price - dis_coupon_price - paybpoint) * (channel_dc_per / 100);
									var rounddis = parseInt(Math.round(dis/10)*10);
									var dischprice = (price-dis_coupon_price - paybpoint) - dis;
									
									row_dis_ch_price	+= rounddis;
								}
								if (MobileOrderCoupon.cart_flag_beauty == "Y"  || (MobileOrderCoupon.cart_flag_beauty == "N" && dis_coupon_price == 0)) {
									row_save_bpoint	+= Math.round((price - dis_coupon_price - paybpoint) * bpoint_per / 100);
								}else{
									coupon_beauty_flag = "N";
								}
								
								row_save_mpoint 	+= save_mpoint + Math.round((price - dis_coupon_price - paybpoint) * save_mpoint_per / 100);
									
							}							
						}
					}				
				}
				
				var cp_info = "";
				
				if (MobileOrderCoupon.cart_discount_per == 0) {
					cp_info = MobileOrderCoupon.getCouponInfo(productcd + "_" + optioncd , "0001");
				}
				
				if (cp_info != "") {
					
					if (cnt > 0) {
						
						var dis_coupon_price_temp = 0;
						var pay_coupon_bpoint = 0;
						var cnt_temp = 1;
						//YHCHOI : 다중 쿠폰 사용 체크 하기 
						for(var j=0; j<cp_info.length; j++){
							var paybpoint = 0;
							var last_rest_bpoint = 0;
							if (dis_price == 0 || cp_info[j].v_flag_norpc_apply == "Y") {
								
								if(cp_info[j].v_flag_option == "Y"){
									cnt_temp	    = cnt;
									dis_cp_prod_cnt = cnt;
								}else{
									dis_cp_prod_cnt +=1;
								}
								
								if (cp_info[j].v_flag_pay_money == "P") {

									var dcprc = Math.round(price * cp_info[j].n_pay_money / 100);
									
									if(cp_info[j].n_max_dcprc < dcprc && cp_info[j].n_max_dcprc != 0){
										dis_coupon_price		+= cp_info[j].n_max_dcprc * cnt_temp;
										dis_coupon_price_temp	 = cp_info[j].n_max_dcprc;
									}else{
										dis_coupon_price		+= dcprc * cnt_temp;
										dis_coupon_price_temp	 = dcprc;
									}
									
								}else if (cp_info[j].v_flag_pay_money == "M") {
									dis_coupon_price		+= cp_info[j].n_pay_money * cnt_temp;
									dis_coupon_price_temp	 = cp_info[j].n_pay_money;
								}
									
								if(dis_price < dis_coupon_price_temp){
									
									if(cp_info[j].v_flag_option == "Y"){
										MobileOrderCoupon.changeFlagOptionUse(cp_info[j].v_user_couponcd, productcd + "_" + optioncd, "Y");
									}else{
										MobileOrderCoupon.changeFlagUse(cp_info[j].v_user_couponcd, "Y");										
									}

									var couponPrice = price - dis_coupon_price_temp;
									
									if(couponPrice <= 0){
										couponPrice = 0;
									}
									
									if(couponPrice >= 5000 && flag_mix == "Y"){
										// 뷰포사용가능
										if(cp_info[j].v_flag_option == "Y"){
											coupon_sum_bpoint += (couponPrice * cnt_temp);
										}else{
											coupon_sum_bpoint += couponPrice;
										}
										if(use_bpoint > 0 && MobileOrderStep1.sum_min_bpoint_price > 0){
											var solo_prd_price = parseInt(couponPrice);
											var bpoint_price = Math.round(((solo_prd_price/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;
											
											if(cp_info[j].v_flag_option == "Y"){
												row_pay_bpoint += bpoint_price * cnt_temp;
												pay_coupon_bpoint += bpoint_price * cnt_temp;
												row_pay_bpoint_cnt += cnt_temp;
												paybpoint = bpoint_price;
												if(((i == size-1) && (j == parseInt(cp_info.length-1))) 
														|| parseInt(sum_pay_bpoint_cnt + row_pay_bpoint_cnt) >= MobileOrderStep1.sum_min_bpoint_cnt){
													var last_sum_bpoint = parseInt((sum_pay_bpoint - sum_pay_bpoint_only) + row_pay_bpoint);
													bpoint_price = bpoint_price + (use_bpoint - last_sum_bpoint);
													row_pay_bpoint += (use_bpoint-last_sum_bpoint);
													pay_coupon_bpoint += (use_bpoint-last_sum_bpoint);
													last_rest_bpoint += (use_bpoint-last_sum_bpoint);
												}
											}else{
												row_pay_bpoint += bpoint_price;
												pay_coupon_bpoint += bpoint_price;
												row_pay_bpoint_cnt += 1;
												if(((i == size-1) && (j == parseInt(cp_info.length-1)) &&(cnt == parseInt(cp_info.length-1))) 
														|| parseInt(sum_pay_bpoint_cnt + row_pay_bpoint_cnt) >= MobileOrderStep1.sum_min_bpoint_cnt){
													var last_sum_bpoint = parseInt((sum_pay_bpoint - sum_pay_bpoint_only) + row_pay_bpoint);
													bpoint_price = bpoint_price + (use_bpoint-last_sum_bpoint);
													row_pay_bpoint += (use_bpoint-last_sum_bpoint);
													pay_coupon_bpoint += (use_bpoint-last_sum_bpoint);
												}
												paybpoint = bpoint_price;
											}
											isBpointFlag = true;
										}
										sum_min_bpoint_cnt += dis_cp_prod_cnt;
										row_origin_pay_price += couponPrice;
									}
									
									if (cp_info[j].v_flag_beauty == "Y") {
										if(cp_info[j].v_flag_option == "Y"){
											if(last_rest_bpoint != 0){
												row_save_bpoint		+= Math.round((couponPrice - paybpoint) * bpoint_per / 100) * (cnt_temp-1);
												row_save_bpoint		+= Math.round((couponPrice - (paybpoint+last_rest_bpoint)) * bpoint_per / 100) ;
											}else{
												row_save_bpoint		+= Math.round((couponPrice - paybpoint) * bpoint_per / 100) * cnt_temp;
											}
										}else{
											row_save_bpoint		+= Math.round((couponPrice - paybpoint) * bpoint_per / 100) * cnt_temp;
										}
									}else{
										coupon_beauty_flag = "N";
									}
									
									if(cp_info[j].v_flag_option == "Y"){
										if(last_rest_bpoint != 0){
											row_save_mpoint += save_mpoint * (cnt - cnt_temp - bpoint_cnt) + Math.round((couponPrice - paybpoint) * save_mpoint_per / 100) * (cnt_temp-1);
											row_save_mpoint += save_mpoint * (cnt - cnt_temp - bpoint_cnt) + Math.round((couponPrice - (paybpoint + last_rest_bpoint)) * save_mpoint_per / 100);
										}else{
											row_save_mpoint += save_mpoint * (cnt - cnt_temp - bpoint_cnt) + Math.round((couponPrice - paybpoint) * save_mpoint_per / 100) * cnt_temp;
										}
									}else{
										row_save_mpoint += save_mpoint * (cnt - cnt_temp - bpoint_cnt) + Math.round((couponPrice - paybpoint) * save_mpoint_per / 100) * cnt_temp;
									}

								}else{
									
									dis_cp_prod_cnt          = 0;
									dis_coupon_price		+= 0;
									dis_coupon_price_temp	 = 0;
								}
							}
							//추가할인
							if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
								
								var dis=0;
								var rounddis=0;
								
								if(cp_info[j].v_flag_option == "Y"){
									if(last_rest_bpoint != 0){
										dis = (price-dis_coupon_price_temp-paybpoint) * (channel_dc_per / 100);
										rounddis = parseInt(Math.round(dis/10)*10);
										row_dis_ch_price += rounddis * (dis_cp_prod_cnt-1);
										
										dis = (price-dis_coupon_price_temp-(paybpoint+last_rest_bpoint)) * (channel_dc_per / 100);
										rounddis = parseInt(Math.round(dis/10)*10);
										row_dis_ch_price += rounddis * (1);
									}else{
										dis = (price-dis_coupon_price_temp - paybpoint) * (channel_dc_per / 100);
										rounddis = parseInt(Math.round(dis/10)*10);
										row_dis_ch_price += rounddis * (dis_cp_prod_cnt);
									}
								}else{
									dis = (price-dis_coupon_price_temp-paybpoint) * (channel_dc_per / 100);
									rounddis = parseInt(Math.round(dis/10)*10);
									
									row_dis_ch_price += rounddis;
								}
							}
						}
						
						//사용한 쿠폰이 가격을 더 많이 깍았을 경우
						if(price * dis_cp_prod_cnt <dis_coupon_price){
							dis_coupon_price = price;
						}
						
						row_pay_coupon	+= dis_coupon_price;
						row_pay_price	+= ((price * dis_cp_prod_cnt) - dis_coupon_price - pay_coupon_bpoint);
					}
				}
			}

//			if (cnt - bpoint_cnt > 0) {
				
				var cp_info = MobileOrderCoupon.getCouponInfo(productcd, "0005");
				
				if (cp_info != "") {
					for(var m=0; m<cp_info.length; m++){
						MobileOrderCoupon.changeFlagUse(cp_info[m].v_user_couponcd, "Y");
					}
				}
//			}				

			if(isonePlusFlag){
				
				var list = [];
				var onplus_sale_price = 0;
				var onplus_dis_ch_price = 0;
				var totalCnt = 0;
				var preCnt = 0;
				
				var cnt_object     = $("input[name='i_arrProductCnt']",tr);
				var product_object = $("input[name='i_arrProductcd']",tr);
				var flagEvent	   = $("input[name='i_arrFlagEvent']",tr);
				var price_object   = $(".span_price", tr);
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
				} else {
					preCnt = preCnt_temp - cnt;
				}
				
				list.push({cnt: cnt, preCnt : preCnt, index : i});
				
				var obj = onePlusPriceResult(totalCnt, price, onePlusBuyCnt, onePlusGiveCnt, list);
				
				var objCnt = onPlusCount(totalCnt, preCnt, cnt ,onePlusBuyCnt, onePlusGiveCnt);
				var nopluscnt = 0;
				var restbuyprice_onplus = 0;
				var bpoint_onplus = 0;
				if(obj.length > 0) {
					var remain_bpoint = 0;
					for(var j=0; j<obj.length; j++) {
						var onplusbpoint = 0;
						onplus_sale_price += parseInt(obj[j].price * obj[j].cnt);
						
						if(obj[j].price >= 5000 && flag_mix == "Y"){
							
							onplus_sum_bpoint += parseInt(obj[j].price * obj[j].cnt);
							sum_min_bpoint_cnt += obj[j].cnt;
							row_origin_pay_price += parseInt(obj[j].price * obj[j].cnt);
							
							if(use_bpoint > 0 && MobileOrderStep1.sum_min_bpoint_price > 0){
								var solo_prd_price = parseInt(obj[j].price);
								var bpoint_price = Math.round(((solo_prd_price/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;
								row_pay_bpoint += bpoint_price * obj[j].cnt; // 모든상품의 뷰포사용을 합하기위해
								bpoint_onplus += bpoint_price * obj[j].cnt; // 1+1에서만 뷰포사용을 합하기위해
								row_pay_bpoint_cnt += obj[j].cnt;
								if(((i == size-1) && (j == obj.length-1)) 
										|| parseInt(sum_pay_bpoint_cnt + row_pay_bpoint_cnt) >= MobileOrderStep1.sum_min_bpoint_cnt){
									var last_sum_bpoint = parseInt((sum_pay_bpoint - sum_pay_bpoint_only) + row_pay_bpoint);
									bpoint_price = bpoint_price + (use_bpoint - last_sum_bpoint);
									row_pay_bpoint += (use_bpoint - last_sum_bpoint);
									bpoint_onplus += (use_bpoint - last_sum_bpoint);
									remain_bpoint = parseInt(use_bpoint - last_sum_bpoint);
								}
								onplusbpoint = bpoint_price;
							}
						}
						
						if(onplusbpoint < 0){ // 이미 앞에서 사용한 뷰포를 모두 소진한 경우 뷰포적용을 하지 않는다.
							onplusbpoint = 0;
						}
						
						if(obj[j].price == price){
							nopluscnt++;
							var bpoint_price_notone = 0;
							if(obj[j].price >= 5000 && flag_mix == "Y"){
								if(use_bpoint > 0 && MobileOrderStep1.sum_min_bpoint_price > 0){
									var solo_prd_price = parseInt(obj[j].price);
									bpoint_price_notone = Math.round(((solo_prd_price/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;
									
									if(onplusbpoint != bpoint_price_notone){
										bpoint_price_notone = onplusbpoint;
									}
								}
							}
							restbuyprice_onplus += parseInt((obj[j].price - bpoint_price_notone) * obj[j].cnt);
						}
						if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) < 0) {
							if(remain_bpoint != 0){
								var dis = parseInt(obj[j].price - (onplusbpoint - remain_bpoint)) * (channel_dc_per / 100);
								var rounddis = parseInt(Math.round(dis/10)*10);
								var dischprice = parseInt(obj[j].price - onplusbpoint) - dis;
								onplus_dis_ch_price += rounddis * parseInt(obj[j].cnt-1);
								
								dis = parseInt(obj[j].price - onplusbpoint) * (channel_dc_per / 100);
								rounddis = parseInt(Math.round(dis/10)*10);
								dischprice = parseInt(obj[j].price - onplusbpoint) - dis;
								onplus_dis_ch_price += rounddis;
								
							}else{
								var dis = parseInt(obj[j].price - onplusbpoint) * (channel_dc_per / 100);
								var rounddis = parseInt(Math.round(dis/10)*10);
								var dischprice = parseInt(obj[j].price - onplusbpoint) - dis;
								onplus_dis_ch_price += rounddis * obj[j].cnt;
							}
						}
					}
				}
				
				product_temp   = productcd;
				pre_price_temp = price;
				
				row_pay_price	+= onplus_sale_price - bpoint_onplus;
				row_save_mpoint += Math.round((save_mpoint * objCnt.buyCnt) / cnt) * cnt + Math.round((onplus_sale_price - bpoint_onplus) * save_mpoint_per / 100);
				row_sum_price 	+= price  * cnt;
				row_dis_price 	+= (price  * cnt) - onplus_sale_price;
				
				
				if(nopluscnt > 0){
					row_save_bpoint	+= Math.round(restbuyprice_onplus * bpoint_per / 100);
				}else{
					row_save_bpoint	+= 0;
					sum_zero_point_price += onplus_sale_price;
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
					row_pay_bpoint_only  += beauty_price * cnt;
					row_pay_bpoint_cnt_only += cnt;
					if(MobileOrderStep1.flag_beauty_hotdeal){
						row_sum_price		 += price  * cnt;
					}else{
						row_sum_price 		 += beauty_price * cnt;
					}
					
				}else{
					var restcnt = parseInt(cnt - dis_cp_prod_cnt);
					var restbpoint = 0;
					var remain_bpoint_norm = 0;
					
					if(sale_price >= 5000 && typecd != "0003" && flag_mix == "Y"){
						if(use_bpoint > 0 && MobileOrderStep1.sum_min_bpoint_price > 0 && restcnt > 0){
							var solo_prd_price = parseInt(sale_price);
							var bpoint_price = Math.round(((solo_prd_price/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;
							row_pay_bpoint += bpoint_price * restcnt; // 한row상품의 뷰포사용을 합하기위해
							row_pay_bpoint_cnt += restcnt;
							restbpoint = bpoint_price;
							if((i == (size-1)) || parseInt(sum_pay_bpoint_cnt + row_pay_bpoint_cnt) >= MobileOrderStep1.sum_min_bpoint_cnt){
								var last_sum_bpoint = parseInt((sum_pay_bpoint - sum_pay_bpoint_only) + row_pay_bpoint);
								bpoint_price = bpoint_price + (use_bpoint - last_sum_bpoint);
								row_pay_bpoint += (use_bpoint - last_sum_bpoint);
								remain_bpoint_norm = (use_bpoint - last_sum_bpoint);
//								restbpoint = restbpoint + (use_bpoint - last_sum_bpoint);
							}
						}
						sum_min_bpoint_cnt += restcnt;
						row_origin_pay_price += sale_price * restcnt;
					}
					var restsaleprice = sale_price - restbpoint;
					
					if(remain_bpoint_norm != 0){
						row_pay_price += (sale_price * (cnt - dis_cp_prod_cnt -1)) - (restbpoint * (restcnt-1));
						row_pay_price += (sale_price) - parseInt(restbpoint + remain_bpoint_norm);
					}else{
						row_pay_price += (sale_price * (cnt - dis_cp_prod_cnt)) - (restbpoint * restcnt);
					}
					
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
										if(remain_bpoint_norm != 0){
											row_save_bpoint += Math.round(restsaleprice * bpoint_per / 100) * (cnt - dis_cp_prod_cnt -1);
											row_save_bpoint += Math.round((sale_price - (restbpoint+remain_bpoint_norm)) * bpoint_per / 100);
										}else{
											row_save_bpoint += Math.round(restsaleprice * bpoint_per / 100) * (cnt - dis_cp_prod_cnt);
										}
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
							if(remain_bpoint_norm != 0){
								row_save_bpoint += Math.round(restsaleprice * bpoint_per / 100) * (cnt - dis_cp_prod_cnt -1);
								row_save_bpoint += Math.round((sale_price - (restbpoint+remain_bpoint_norm)) * bpoint_per / 100);
							}else{
								row_save_bpoint += Math.round(restsaleprice * bpoint_per / 100) * (cnt - dis_cp_prod_cnt);
							}
						}
						if(remain_bpoint_norm != 0){
							row_save_mpoint 	+= save_mpoint * (cnt - dis_cp_prod_cnt-1) + Math.round(restsaleprice * save_mpoint_per / 100) * (cnt - dis_cp_prod_cnt-1);						
							row_save_mpoint 	+= save_mpoint + Math.round((sale_price - (restbpoint+remain_bpoint_norm)) * save_mpoint_per / 100);						
						}else{
							row_save_mpoint 	+= save_mpoint * (cnt - dis_cp_prod_cnt) + Math.round(restsaleprice * save_mpoint_per / 100) * (cnt - dis_cp_prod_cnt);						
						}						
					}
					
					row_need_bpoint += 0;
					row_sum_price 	+= price * (cnt - bpoint_cnt) + (beauty_price * bpoint_cnt);
					
					if (channel_dc_per > 0 && channel_dc_brd_exc.indexOf(brandcd) == -1) {
						if(remain_bpoint_norm != 0){
							var dis = restsaleprice * (channel_dc_per / 100);
							var rounddis = parseInt(Math.round(dis/10)*10);
							var dischprice = restsaleprice - dis;
							
							row_dis_ch_price += rounddis * (cnt - dis_cp_prod_cnt -1);
							
							dis = (sale_price - (restbpoint+remain_bpoint_norm)) * (channel_dc_per / 100);
							rounddis = parseInt(Math.round(dis/10)*10);
							dischprice = (sale_price - (restbpoint+remain_bpoint_norm)) - dis;
							
							row_dis_ch_price += rounddis;
						}else{
							var dis = restsaleprice * (channel_dc_per / 100);
							var rounddis = parseInt(Math.round(dis/10)*10);
							var dischprice = restsaleprice - dis;
							row_dis_ch_price += rounddis * (cnt - dis_cp_prod_cnt);
						}
					}
				}
				
				if("Y" == $("input[name='i_arrFlagBeauty']", tr.eq(i)).val() && MobileOrderStep1.flag_beauty_hotdeal != "Y"){
					row_dis_price += 0;
				}else{
					row_dis_price += (dis_price  * (cnt - dis_cp_prod_cnt));
				}
			}
			
			//YHCHOI : [S]뷰티포인트 관련 추가부분
			var flag_mix 	= tr.eq(i).find("input[name='i_arrFlagMix']").val();
			var flag_beauty = tr.eq(i).find("input[name='i_arrFlagBeauty']").val();
			
			//if(typecd !="0003" && arrBrdcd.join(",").indexOf(brandcd) > -1){
			if(typecd !="0003" && (flag_mix == "Y" || flag_beauty == "Y")){
				var feild_bpoint = tr.eq(i).find(".span_bpoint_temp_cnt");
				if(row_dis_price > 0 || dis_cp_prod_cnt >0 || isonePlusFlag){
					if(isonePlusFlag){
						//1+1일경우에는 1+1적용금액이 뷰포사용가능금액
						sum_min_bpoint_price += flag_beauty == "Y" ? 0 : onplus_sum_bpoint;
					}else if(dis_cp_prod_cnt > 0){
						//쿠폰썼을경우 쿠폰금액만큼 제한 금액이 뷰포사용가능금액
						var rest_norm_cnt = parseInt(cnt - dis_cp_prod_cnt);
						sum_min_bpoint_price += flag_beauty == "Y" ? 0 : coupon_sum_bpoint;
						if(rest_norm_cnt > 0){
							if(sale_price >= 5000){
								sum_min_bpoint_price += flag_beauty == "Y" ? 0 : (sale_price * (cnt - dis_cp_prod_cnt));
							}
						}
					}else{
						//쿠폰을 안썼을 경우에는 기본할인금액을 제한 금액이 뷰포사용가능금액
						if(parseInt(sale_price) >= 5000){
							sum_min_bpoint_price += flag_beauty == "Y" ? 0 : (sale_price) * (cnt);			
							feild_bpoint.text(cnt);
						}
					}
				}else{
					if(parseInt(price) >= 5000){
						sum_min_bpoint_price += flag_beauty == "Y" ? 0 : price * (cnt);			
						feild_bpoint.text(cnt);
					}else{
						feild_bpoint.text(0);
					}
				}
			}
			//YHCHOI : [E]뷰티포인트 관련 추가부분
			
			row_dis_coupon_price	+= row_pay_coupon;
			row_sale_price			+= row_pay_price;

			$(".row_pay_price", feild.eq(i)).text(SetNumComma(price * cnt));
			$(".row_sale_price", feild.eq(i)).text(SetNumComma(row_sale_price));
			$(".row_save_bpoint", feild.eq(i)).text(MobileOrderStep1.isLogin ? SetNumComma(row_save_bpoint) : 0);
			$(".row_save_mpoint", feild.eq(i)).text(MobileOrderStep1.isLogin ? SetNumComma(row_save_mpoint) : 0);
			
			$("input[name='i_arrPayOriginPrice']", tr.eq(i)).val(row_origin_pay_price);
			if(row_pay_bpoint > 0 || row_pay_bpoint_only > 0){
				if(row_pay_bpoint_only > 0){
					$("input[name='i_arrPayBpoint']", tr.eq(i)).val(row_pay_bpoint_only);
				}else{
					$("input[name='i_arrPayBpoint']", tr.eq(i)).val(row_pay_bpoint);
				}
				
				if(row_pay_bpoint_cnt_only > 0){
					$("input[name='i_arrPayBpointCnt']", tr.eq(i)).val(row_pay_bpoint_cnt_only);
					MobileOrderStep1.setBpointFreegood($(".span_key", tr.eq(i)).text(), cnt - row_pay_bpoint_cnt_only);
				}else{
					$("input[name='i_arrPayBpointCnt']", tr.eq(i)).val(row_pay_bpoint_cnt);
					MobileOrderStep1.setBpointFreegood($(".span_key", tr.eq(i)).text(), cnt - row_pay_bpoint_cnt);
				}
			}else{
				MobileOrderStep1.setBpointFreegood($(".span_key", tr.eq(i)).text(), cnt);	
			}
			
			if(bpoint_per > 0){
				if(cnt - bpoint_cnt == 0 || row_save_bpoint == 0){
					$(".row_save_bpoint_per", feild.eq(i)).text("(0%)");
				}else{
					$(".row_save_bpoint_per", feild.eq(i)).text(MobileOrderStep1.isLogin ? '('+SetNumComma(bpoint_per)+'%)' : 0);
				}
			}
			
			if(save_mpoint_per > 0){
				
				if(row_save_mpoint == 0){
					$(".row_save_mpoint_per", feild.eq(i)).text("(0%)");
				}else{
					$(".row_save_mpoint_per", feild.eq(i)).text(MobileOrderStep1.isLogin ? '('+SetNumComma(save_mpoint_per)+'%)' : 0);
				}
			}
			
			sum_price 				+= row_sum_price;
			sum_pay_price 			+= row_pay_price - row_need_bpoint;
			sum_dis_coupon_price	+= row_dis_coupon_price;
			sum_pay_bpoint 			+= row_pay_bpoint;
			sum_pay_bpoint			+= row_pay_bpoint_only;//뷰포전용상품도 총 뷰포 사용에 합해준다.
			sum_pay_bpoint_only		+= row_pay_bpoint_only;
			sum_save_bpoint 		+= row_save_bpoint;
			sum_save_mpoint 		+= row_save_mpoint;
			sum_cart_discount 		+= row_cart_discount;
			sum_need_bpoint			+= row_need_bpoint;
			sum_dis_price			+= row_dis_price;
			sum_dis_channel_price   += row_dis_ch_price;
			sum_pay_bpoint_cnt		+= row_pay_bpoint_cnt;
		}
		
		// 수분 포인트몰 계산
		tr = $(".tr_water_point_list");
		size = tr.size();
		
		var sum_mpoint 			= 0;
		var sum_pay_mpoint 		= 0;
		var row_mpoint			= 0;
		var row_pay_mpoint		= 0;
		
		for (var i = 0; i < size; i++) {
			
			var point = fnOnlyNumber($(".span_mpoint", tr.eq(i)).text()).number;
			var payPoint = fnOnlyNumber($(".span_pay_mpoint", tr.eq(i)).text()).number;
			var cnt = fnOnlyNumber($("*[name='i_arrProductCnt']", tr.eq(i)).val()).number;
			
			row_mpoint		= point * cnt;
			row_pay_mpoint	= payPoint * cnt;
			
			sum_mpoint += row_mpoint;
			sum_pay_mpoint += row_pay_mpoint;
		}
		
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
		MobileOrderStep1.sum_zero_point_price   = sum_zero_point_price;
		MobileOrderStep1.sum_zero_mpoint_price   = sum_zero_mpoint_price;
		
		MobileOrderStep1.sum_min_bpoint_price  = sum_min_bpoint_price;
		MobileOrderStep1.sum_min_bpoint_cnt		= sum_min_bpoint_cnt;
		
		$("input[name='i_iMaxUseBpoint']").val(MobileOrderStep1.sum_min_bpoint_price);
		
		MobileOrderStep1.setDeliveryPrice(false);
		
		// 배송비
		if (MobileOrderStep1.delivery_price > 0) {
			
			var deliveryCp = MobileOrderCoupon.getDeliveryCoupon();
			
			if (deliveryCp != null) {
				
				MobileOrderCoupon.changeFlagUse(deliveryCp.v_user_couponcd, "Y");
//				MobileOrderStep1.sum_dis_coupon_price = MobileOrderStep1.delivery_price; 
				MobileOrderStep1.flag_use_delivery_coupon = "Y";
				MobileOrderStep1.delivery_price = 0;
				
			}
		}else{
			MobileOrderStep1.flag_use_delivery_coupon = "N";
		}
		
		// 장바구니할인 쿠폰 사용여부 체크
		if (MobileOrderCoupon.cart_discount_per > 0 && sum_cart_discount > 0) {
			
			MobileOrderCoupon.changeFlagUse(MobileOrderCoupon.cart_user_couponcd, "Y");
		}
		
		var cpobj = MobileOrderCoupon.getCheckCouponUsedAll();
		if (!cpobj.isUsedAll) {

			var message 		 = "";
			var is_trFlag   	 = false;
			var is_trSetFlag 	 = false;
			var is_high_saleFlag = false;
			var is_dayoffFlag 	 = false;
			
			var tr_temp 	= $(".tr_product_list");
			var size_temp 	= tr_temp.size();

			for (var i = 0; i < size_temp; i++) {

				var productcd       = tr_temp.eq(i).find("input[name='i_arrProductcd']").val();
				var optioncd		= tr_temp.eq(i).find("input[name='i_arrOptioncd']").val();
				var price 			= fnOnlyNumber($(".span_price", tr_temp.eq(i)).text()).number;
				var today_price 	= fnOnlyNumber($(".span_today_price", tr_temp.eq(i)).text()).number;
				var sale_price 		= fnOnlyNumber($(".span_sale_price", tr_temp.eq(i)).text()).number;
				var bpoint_price	= fnOnlyNumber($(".span_bpoint_temp_price", tr_temp.eq(i)).text()).number;
				var bpoint_flag		= bpoint_price > 0 ? true : false;
				
				var typecd			= $(".span_typecd",tr_temp.eq(i)).text();
				
				var discount_temp   = (price - sale_price) + (price - today_price);
				var dis_price = price - sale_price;
				var dis_price2 = price = today_price;
				
				var dis_per   = (dis_price/price) * 100;
				var dis_per2   = (dis_price2/price) * 100;
				var dayoffStockqty  = fnOnlyNumber($(".span_dayoff_stockqty",tr_temp.eq(i)).text()).number;
				var dayoffcd		= $(".span_dayoffcd",tr_temp.eq(i)).text();
				
				if(discount_temp > 0 && cpobj.data.v_flag_norpc_apply == "N"){
					is_trFlag = true;
				}
				
				if(typecd == "0003"){
					is_trSetFlag = true;
				}
				
				if(cpobj.data.v_typecd == "0001"){
					
					var comprecd = productcd+"_"+optioncd;
					
					if(cpobj.data.v_productcd == comprecd){
						
						if(!bpoint_flag && cpobj.data.v_flag_pay_money == "M" && (dis_price >= cpobj.data.n_pay_money || dis_price2 >= cpobj.data.n_pay_money)){
							if(dayoffStockqty > 0 && dayoffcd != ""){
								if(typecd == "0003"){
									is_trSetFlag = true;
								}else{
									is_dayoffFlag = true;
								}
							}else{
								if(typecd == "0003"){
									is_trSetFlag = true;
								}else{
									is_high_saleFlag = true;
								}
							}
						}
						
						if(!bpoint_flag && cpobj.data.v_flag_pay_money == "P" && (dis_per >= cpobj.data.n_pay_money || dis_per2 >= cpobj.data.n_pay_money)){
							if(dayoffStockqty > 0 && dayoffcd != ""){
								if(typecd == "0003"){
									is_trSetFlag = true;
								}else{
									is_dayoffFlag = true;
								}
							}else{
								if(typecd == "0003"){
									is_trSetFlag = true;
								}else{
									is_high_saleFlag = true;
								}
							}
						}
					}
					
				}else{
					
					if(!bpoint_flag && cpobj.data.v_typecd != "0006" && cpobj.data.v_flag_pay_money == "M" && (dis_price >= cpobj.data.n_pay_money || dis_price2 >= cpobj.data.n_pay_money)){
						if(dayoffStockqty > 0 && dayoffcd != ""){
							if(typecd == "0003"){
								is_trSetFlag = true;
							}else{
								is_dayoffFlag = true;
							}
						}else{
							if(typecd == "0003"){
								is_trSetFlag = true;
							}else{
								is_high_saleFlag = true;
							}
						}
					}
					if(!bpoint_flag && cpobj.data.v_typecd != "0006" && cpobj.data.v_flag_pay_money == "P" && (dis_per >= cpobj.data.n_pay_money || dis_per2 >= cpobj.data.n_pay_money)){
						if(dayoffStockqty > 0 && dayoffcd != ""){
							if(typecd == "0003"){
								is_trSetFlag = true;
							}else{
								is_dayoffFlag = true;
							}
						}else{
							if(typecd == "0003"){
								is_trSetFlag = true;
							}else{
								is_high_saleFlag = true;
							}
						}
					}
					
					if(dayoffStockqty > 0 && dayoffcd != ""){
						is_dayoffFlag = true;
					}
					
					if(typecd == "0003"){
						is_trSetFlag = true;
					}
				}				
			}				
			
			if(is_trFlag){
				message = "[" + cpobj.data.v_couponnm + "]은 이미 할인된 상품에는 적용되지 않아요.";
			}else if(is_high_saleFlag){
				message = "[" + cpobj.data.v_couponnm + "]은<br/> 현재 할인가로 구매하시는것이 <br/>더욱 알뜰한 쇼핑이에요!";
			}else if(is_trSetFlag){
				message = "[" + cpobj.data.v_couponnm + "]은 스페셜 세트 상품에는 적용되지 않아요.";
			}else if(is_dayoffFlag){
				message = "[" + cpobj.data.v_couponnm + "]은 투데이 찬스 상품에는 적용되지 않아요.";
			}else{
				message = "[" + cpobj.data.v_couponnm + "]을 사용하실 수 없어요.<br/> 확인 후 다시 사용해주세요.";
			}
			
			$("<div class='overlay'></div>").appendTo("#wrap");
			
			showMessageBox({
				message : message
				, close : function () {
					
					MobileOrderCoupon.clearCoupon();
					MobileOrderStep1.sum();
				}
			});
			
			return;
			
		}
		
		MobileOrderCoupon.setToggleBtn();
		MobileOrderStep1.fgSum();
		MobileOrderStep1.setPayStats();
		MobileOrderStep1.GiftList(flag);			

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
						showMessageBox({
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
			$(".sum_save_bpoint_per").text("("+Math.round((MobileOrderStep1.sum_save_bpoint * 100)/(MobileOrderStep1.sum_pay_money + MobileOrderStep1.sum_pay_bpoint + MobileOrderStep1.sum_pay_giftcard- MobileOrderStep1.delivery_price - MobileOrderStep1.sum_naming_price - MobileOrderStep1.gifgbox_price - MobileOrderStep1.sum_zero_point_price + MobileOrderStep1.sum_dis_channel_price)*10)/10+"%)");
		}else{
			$(".sum_save_bpoint_per").text("(0%)");	
		}
		
		if(MobileOrderStep1.sum_save_mpoint > 0){
			$(".sum_save_mpoint_per").text("("+Math.round((MobileOrderStep1.sum_save_mpoint * 100)/(MobileOrderStep1.sum_pay_money + MobileOrderStep1.sum_pay_bpoint + MobileOrderStep1.sum_pay_giftcard- MobileOrderStep1.delivery_price - MobileOrderStep1.sum_naming_price - MobileOrderStep1.gifgbox_price - MobileOrderStep1.sum_zero_mpoint_price + MobileOrderStep1.sum_dis_channel_price)*10)/10+"%)");
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
		$("input[name='i_arrExpiryDt']").prop("disabled",true);
		$("input[name='i_arrPreBalance']").prop("disabled",true);
		$("input[name='i_arrGiftcardNo']").prop("disabled",true);
		MobileOrderGiftCard.payment_total = 0;
		MobileOrderGiftCard.setPayGiftcard("", 0);
		MobileOrderGiftCard.cnt = $("input[name='i_sGiftcardCnt']").val();
		MobileOrderGiftCard.balance = $("input[name='i_sGiftcardTotalPrice']").val();
		MobileOrderGiftCard.setGiftcard(MobileOrderGiftCard.cnt, MobileOrderGiftCard.balance);
		$("#div_complete_gift_card").html("");
	}
};

/*
* Smart XPay의 내부 스마트폰 함수명과 맵핑되어 사용됨
* 으로 반드시 자바스크립트 함수는 위와 같은 명명된 함수명으로 사용
*/
function launchCrossPlatform(){
	location.href="#";
	document.getElementById("container").style.height = "1200px";
	lgdwin = open_paymentwindow(document.getElementById('frm_lguplus'), $("#cst_platform").val(), "submit");
}

/*
* FORM 명만  수정 가능
*/
function getFormObject() {
        return document.getElementById("frm_lguplus");
}

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

/*
* payco 결제 진행
*/
function payco_next(reserveOrderNo, sellerOrderReferenceKey, paymentCertifyToken, totalPaymentAmt, code){
	
	$("#payco_layer").css("display","none");
	MobileOrderStep1.setPaymentStatus("");	
	
	if (code == "0"){
		$("#reserveOrderNo").val(reserveOrderNo);
		$("#sellerOrderReferenceKey").val(sellerOrderReferenceKey);
		$("#paymentCertifyToken").val(paymentCertifyToken);
		$("#totalPaymentAmt").val(totalPaymentAmt);
		
		$("form[name='frm_payco']").attr("action", GLOBAL_WEB_ROOT+"mobile/order/mobile_order_payco_return.do");
		$("form[name='frm_payco']").submit();
		    
	}else{
		showMessageBox({message : "ERRCODE:" + code + " ,MSG: 결제에 실패하였습니다"});	
	}
	
}

/*
* payco 결제창 닫기
*/
function payco_close(){
	MobileOrderStep1.setPaymentStatus("");
	$("#payco_layer").css("display","none");
	$(".overlay").remove();	
	
}

