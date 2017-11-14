var MobileOrderAgree = {
	name : "MobileOrderAgree"
	, init : function(){
		
		MobileOrderAgree.addBtnEvent();
		
	}
	, addBtnEvent : function(){
		
		$(".btn_agree").click(function(event) {
			event.preventDefault();
			if ( !$("#agree01").prop("checked") ) {
				showMessageBox({
					message : "비회원구매 이용약관 동의란에 체크해주세요."
					, close : function () {
						$("#agree01").focus();
					}
				});
				return;
			}
			else if ( !$("#agree02").prop("checked") ) {
				showMessageBox({
					message : "비회원구매 개인정보 수집 동의란에 체크해주세요."
					, close : function () {
						$("#agree02").focus();
					}
				});
				return;
			}
			else if ( !$("#agree03").prop("checked") ) {
				showMessageBox({
					message : "비회원구매 개인정보 취급 위탁 동의란에 체크해주세요."
					, close : function () {
						$("#agree03").focus();
					}
				});
				return;
			}
			
			var frm = $("form[name='frm_reload']");
			
			var inputAgree = $("*[i_sFlagAgree]", frm);
			
			if (inputAgree.size() == 0) {
				inputAgree = $("<input type='hidden' name='i_sFlagAgree' value=''/>").appendTo(frm);
			}

			inputAgree.val("Y");

			frm.prop("action", "./mobile_order_order_step1.do");
			frm.submit();
		});
		
		$(".btn_no_agree").click(function(event) {
			event.preventDefault();
			document.location.href = GLOBAL_WEB_URL + "mobile/cart/mobile_cart_cart_list.do";
		});
		
		$("#agree04").click(function(event) {
			if ($(this).prop("checked")) {
				
				$("*[name='check_agree']").each(function (n) {
					$(this).prop("checked", true);
				});
				
			}else {
				
				$("*[name='check_agree']").each(function (n) {
					$(this).prop("checked", false);
				});
			}
		});
		
	}

};