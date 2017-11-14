var MobileMyCardBillkeyList ={
	name : "MobileMyCardBillkeyList"
	,init : function(){
		
		MobileMyCardBillkeyList.fn.addBtnEvent();
		
	}
	, fn : {

		addBtnEvent : function(){
			
			$(".btn_default_card_change").unbind("click").click(function(event){
				event.preventDefault();
				
				var flagAction = $("input[name='i_sFlagAction']").val();
				
				var div_card_pop = MobileMyCardBillkeyList.fn.getDivCardPop(flagAction);
				
				var cardName = $("input[name='i_sCardName']", div_card_pop).val();
				var flagDefault = $("input[name='i_sFlagDefault']", div_card_pop).val();
				var seqno = $(this).attr("data-seqno");
				
				MobileMyCardBillkeyList.fn.cardSaveAjax(cardName, flagDefault, seqno);
			});
			
			$(".btn_card_del").unbind("click").click(function(event){
				event.preventDefault();
				
				var seqno = $(this).attr("data-seqno");
				var userid = $("input[name='i_sUserid']").val();
				var flagAction = "D";
				
				MobileCommon.ajax({
	    			url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_card_billkey_ajax.do"
	    			, type : "POST"
	    			, dataType : "json"
    				, data : {
    					i_sUserid : userid,
	    				i_sFlagAction : flagAction,
	    				i_iSeqno : seqno
	    			}	    			
					, animation : false
	    			, success : function(data, textStatus, jqXHR) {
	    				
	    				if (data.status == 'succ'){
	    					
	    					modalPopupClose('#modalPopupOnepayDel');
	    					$(".li_cardinfo_" + seqno).remove();
	    					$(".div_onePay").show();
	    					$(".div_card_billkey_reg_pop").hide();
	    					$(".div_card_billkey_mod_pop").hide();
//	    					document.frm_reload.submit();
	    					
	    				} else {
	    					showMessageBox({message : data.message});
	    				}
	    			}
	    		});
			});
			
			$(".btn_billkey_del").unbind("click").click(function(event){
				event.preventDefault();
				
				var seqno = $(this).attr("data-seqno");
				
				var li_cardinfo = $(".li_cardinfo_" + seqno);
				var cardName = $(".p_cardName", li_cardinfo).text();
				
				var confirmPop = $("#modalPopupOnepayDel");
				
				$(".btn_card_del", confirmPop).attr("data-seqno", seqno);
				
				var arrHTML = new Array;
				
				arrHTML.push("<h2>");
				arrHTML.push("	Apmall ONE pay에 등록된<br />‘" + cardName + "’을 삭제하시겠습니까?");
				arrHTML.push("</h2>");
				
				$(".content", confirmPop).html(arrHTML.join(""));
				
				modalPopup('#modalPopupOnepayDel');
			});
			
			$(".btn_billkey_mod").unbind("click").click(function(event){
				event.preventDefault();
				
				MobileMyCardBillkeyList.fn.popupCardBillkeyInit();
				
				var div_card_mod_pop = $(".div_card_billkey_mod_pop");
				var userid = $("input[name='i_sUserid']").val();
				var seqno = $(this).attr("data-seqno");
				
				var li_cardinfo = $(".li_cardinfo_" + seqno);
				var cardName = $(".p_cardName", li_cardinfo).text();
				var cardNum = $(".p_cardNum", li_cardinfo).text();
				var cardGubun1 = $(".span_card_gubun1", li_cardinfo).text();
				var flagDefault = $(".span_flag_default", li_cardinfo).attr("data-flagdefault");
				
				$(".i_sCardName", div_card_mod_pop).val(cardName);
				$(".i_sCardNum", div_card_mod_pop).text(cardNum);
				
				if (flagDefault == 'Y'){
					
					$("input[name='i_sFlagDefault']", div_card_mod_pop).val("Y");
					$(".tmp_flag_defaultY", div_card_mod_pop).prop("checked", true);
					$(".tmp_flag_defaultN", div_card_mod_pop).prop("checked", false);
					
				} else {
					
					$("input[name='i_sFlagDefault']", div_card_mod_pop).val("N");
					$(".tmp_flag_defaultY", div_card_mod_pop).prop("checked", false);
					$(".tmp_flag_defaultN", div_card_mod_pop).prop("checked", true);
				}
				
				var cardGubunName = "";
				
				if (cardGubun1 == '0'){
					
					$("input[name='i_sCardGubun1']", div_card_mod_pop).val("Y");
					$("#i_sCardGubun_0", div_card_mod_pop).prop("checked", true);
					$("#i_sCardGubun_1", div_card_mod_pop).prop("checked", false);
					
					cardGubunName = "개인";
					
				} else if (cardGubun1 == '1'){
					
					$("input[name='i_sCardGubun1']", div_card_mod_pop).val("N");
					$("#i_sCardGubun_0", div_card_mod_pop).prop("checked", false);
					$("#i_sCardGubun_1", div_card_mod_pop).prop("checked", true);
					
					cardGubunName = "법인";
					
				} else if (cardGubun1 == "9"){
					cardGubunName = "미확인";
				}
				
				$(".i_sCardGubun1", div_card_mod_pop).text(cardGubunName);
				$(".btn_billkey_save", div_card_mod_pop).attr("data-seqno", seqno);
				$(".btn_billkey_del", div_card_mod_pop).attr("data-seqno", seqno);
				
				$(".page_info").eq(0).hide();
				$(".div_onePay").hide();
				
				$("input[name='i_sFlagAction']").val("M");
				
				MobileMyCardBillkeyList.fn.addPopupEvent();
				
				div_card_mod_pop.show();
			});
			
			$(".btn_billkey_reg").unbind("click").click(function(event){
				event.preventDefault();
				
				MobileMyCardBillkeyList.fn.popupCardBillkeyInit();
				
				$(".page_info").eq(0).hide();
				$(".div_onePay").hide();
				
				$("input[name='i_sFlagAction']").val("R");
				
				var div_card_reg_pop = $(".div_card_billkey_reg_pop");
				
				$(".tmp_flag_defaultY", div_card_reg_pop).val("Y");
				$(".tmp_flag_defaultY", div_card_reg_pop).prop("checked", true);
				
				MobileMyCardBillkeyList.fn.addPopupEvent();
				
				div_card_reg_pop.show();
			});
		}
		, addPopupEvent : function(){
			
			$(".btn_billkey_save").unbind("click").click(function(event){
				event.preventDefault();
				
				var resObj = MobileMyCardBillkeyList.fn.validator();
				
//				카드등록수정 AJAX
				if (resObj.result){
					
					var userid = $("#i_sUserid").val();
					var flagAction = $("input[name='i_sFlagAction']").val();
					
					var div_card_pop = MobileMyCardBillkeyList.fn.getDivCardPop(flagAction);
					
					var cardName = $("input[name='i_sCardName']", div_card_pop).val();
					var flagDefault = $("input[name='i_sFlagDefault']", div_card_pop).val();
					var seqno = $(this).attr("data-seqno");
					
					var flagChange = $("input[name='i_sFlagChange']").val();
					var defaultCardName = $("input[name='i_sDefaultCardName']").val();
					
					if (!isEmpty(defaultCardName) && flagDefault == "Y" && cardName != defaultCardName){
						
						var defaultCardName = $("input[name='i_sDefaultCardName']").val();
						
						var arrHTML = new Array();
						
						arrHTML.push("<h2>");
						arrHTML.push("	‘" + defaultCardName + "’이 대표카드로 설정되어 있습니다.<br />현재 카드로 대표카드를 변경하시겠습니까?");
						arrHTML.push("</h2>");
						
						var confirmPop = $("#modalPopupOnepayMod");
						
						$(".content", confirmPop).html(arrHTML.join(""));
						
						$(".btn_default_card_change", confirmPop).attr("data-seqno", seqno);
						
						modalPopup('#modalPopupOnepayMod');
						
					} else {
						
						MobileMyCardBillkeyList.fn.cardSaveAjax(cardName, flagDefault, seqno);
					}
					
				} else {
					
					var errorPopup = $("#modalPopupOnepayErrorMsg");
					
					$(".content", errorPopup).html(resObj.message);
					
					modalPopup('#modalPopupOnepayErrorMsg');
				}
			});
			
			var flagAction = $("input[name='i_sFlagAction']").val();
			
			var div_card_pop = MobileMyCardBillkeyList.fn.getDivCardPop(flagAction);
			
			$(".tmp_flag_default", div_card_pop).change(function(event){
				
				$("input[name='i_sFlagDefault']", div_card_pop).val($(this).val());
			});
			
			$(".tmp_card_gubun", div_card_pop).change(function(event){
				
				$("input[name='i_sCardGubun1']", div_card_pop).val($(this).val());
			});
			
			$(".btn_popup_back").unbind("click").click(function(event){
				event.preventDefault();
				
				$(".div_card_billkey_reg_pop").hide();
				$(".div_card_billkey_mod_pop").hide();
				
				$(".page_info").eq(0).show();
				$(".div_onePay").show();
			})
			
		}
		, validator : function(){
			
			var resObj = {};
			
			var target = "";
			var message = "";
			var result = true;
			
			var flagAction = $("input[name='i_sFlagAction']").val();
			
			var defaultCardName = $("input[name='i_sDefaultCardName']").val();
			var div_card_pop = MobileMyCardBillkeyList.fn.getDivCardPop(flagAction);
			
			var cardName = $("input[name='i_sCardName']", div_card_pop).val();
			var flagDefault = "";
			
			$("input[name='tmp_flag_default']", div_card_pop).each(function(event){
				
				if ($(this).prop("checked")){
					flagDefault = $(this).val();
				}
			});
			
			if (isEmpty(cardName)) {
				target = "i_sCardName";
				message = "<h2>카드이름을 입력해 주세요</h2>";
				result = false;
			}
			
			if (calculate_byte(cardName) > 50) {
				target = "i_sCardName";
				message = "카드이름이 너무 길어요";
				result = false;
			}
			
			if (isEmpty(flagAction)) {
				target = "";
				message = "<h2>작업중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요</h2>";
				result = false;
			}
			
			if (flagAction == 'M' && !isEmpty(defaultCardName) && cardName == defaultCardName && flagDefault == 'N'){
				target = "";
				message = "<h2>대표카드는 미지정으로 변경할 수 없습니다.</h2><p>변경을 원하시면 다른 카드를 대표카드로<br />지정해 주십시오.</p>";
				result = false;
			}
			
			resObj.target = target;
			resObj.message = message;
			resObj.result = result;
			resObj.flagAction = flagAction;
			
			return resObj;
		}
		, popupCardBillkeyInit : function() {
			
			$(".i_sCardName").val("");
			$(".i_sCardGubun1").text("");
			$("input[name='i_sCardGubun1']").val("0");
			
			$("#i_sCardGubun_0").val("0");
			$("#i_sCardGubun_0").prop("checked", true);
  			
			$("#i_sCardGubun_1").val("1");
			$("#i_sCardGubun_1").prop("checked", false);
			
			$(".i_sCardNum").text("");
			
			$("input[name='i_sFlagDefault']").val("Y");
			
			$(".tmp_flag_defaultY").each(function(){
				
				$(this).val("Y");
				$(this).prop("checked", true);
			});
			
			$(".tmp_flag_defaultN").each(function(){
				
				$(this).val("N");
				$(this).prop("checked", false);
			});
			
			var div_card_reg_pop = $(".div_card_billkey_reg_pop");
			var div_card_mod_pop = $(".div_card_billkey_mod_pop");
			
			$(".btn_billkey_del", div_card_reg_pop).attr("data-seqno", "");
			$(".btn_billkey_save", div_card_reg_pop).attr("data-seqno", "");
			
			$(".btn_billkey_del", div_card_mod_pop).attr("data-seqno", "");
			$(".btn_billkey_save", div_card_mod_pop).attr("data-seqno", "");
		}
		, cardSaveAjax : function(cardName, flagDefault, seqno) {
			
			var userid = $("input[name='i_sUserid']").val();
			var flagAction = $("input[name='i_sFlagAction']").val();
			
			MobileCommon.ajax({
    			url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_card_billkey_ajax.do"
    			, type : "POST"
    			, dataType : "json"
    			, data : {
    				i_sUserid : userid,
    				i_sFlagAction : flagAction,
    				i_sFlagDefault : flagDefault,
    				i_sCardName : cardName,
    				i_iSeqno : seqno
    			}
    			, animation : false
    			, success : function(data, textStatus, jqXHR) {
    				
    				if (data.status == 'succ'){
    					
    					var obj = data.object;
    					var resFlagAction = obj.resFlagAction;
    					
    					if (resFlagAction == 'R'){
    						
    						var frm = $("form[name='frm']");
							var frm_billkey = $("form[name='frm_billkey']");
							
							var userid		= $("input[name='i_sUserid']", frm).val();
							var cardName	= $("input[name='i_sCardName']").val();
							var cardGubun1	= $("input[name='i_sCardGubun1']").val();
							var flagDefault	= $("input[name='i_sFlagDefault']").val();
							var flagClose	= $("input[name='i_sFlagClose']").val();
							
							$("input[name='CST_PLATFORM']", 	frm_billkey).val(obj.cstplatform);
							$("input[name='CST_MID']",	 		frm_billkey).val(obj.cstMid);
							$("input[name='LGD_WINDOW_TYPE']",	frm_billkey).val("submit");
							$("input[name='LGD_MID']",			frm_billkey).val(obj.lgdMid);
							$("input[name='LGD_BUYERSSN']",		frm_billkey).val("");
							$("input[name='LGD_CHECKSSNYN']",	frm_billkey).val("N");
							$("input[name='LGD_PRODUCTINFO']",	frm_billkey).val("");
							$("input[name='LGD_AMOUNT']",		frm_billkey).val("");
							$("input[name='LGD_EASYPAY_ONLY']",	frm_billkey).val("");
							$("input[name='LGD_RETURNURL']",	frm_billkey).val(GLOBAL_SSL_URL + "mobile/my/mobile_my_card_billkey_return.do?i_sUserid=" + userid + "&i_sCardName=" + encodeURI(cardName, "UTF-8") + "&i_sFlagDefault=" + flagDefault + "&i_sCardGubun1=" + cardGubun1 + "&i_sFlagClose=" + flagClose + "&i_sFlagClose2=Y");
							$("input[name='LGD_PAYWINDOWTYPE']",frm_billkey).val("CardBillingAuth_smartphone");
							$("input[name='LGD_VERSION']",		frm_billkey).val("JSP_SmartXPay_CardBilling");
							$("input[name='LGD_ENCODING']",		frm_billkey).val("UTF-8");
							$("input[name='LGD_ENCODING_NOTEURL']",		frm_billkey).val("UTF-8");
							$("input[name='LGD_ENCODING_RETURNURL']",	frm_billkey).val("UTF-8");
							
							lgdwin = open_paymentwindow(document.getElementById('frm_billkey'), 'service', 'submit');
    						
    					} else if (resFlagAction == 'M'){
    						
    						modalPopupClose('#modalPopupCardBillkeyReg');
    						document.frm_reload.submit();
    					}
    					
    				} else {
    					showMessageBox({message : data.message});
    				}
    			}
    		});
			
		}
		, getDivCardPop : function(flagAction){
			
			var div_card_pop;
			
			if (flagAction == 'R'){
				
				div_card_pop = $(".div_card_billkey_reg_pop");
				
			} else if (flagAction == 'M'){
				
				div_card_pop = $(".div_card_billkey_mod_pop");
			}
			
			return div_card_pop;
			
		}
	}
};

