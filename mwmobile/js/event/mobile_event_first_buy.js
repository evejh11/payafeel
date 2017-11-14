var MobileFirstBuy = {
	name : "MobileFirstBuy"
	, init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobileFirstBuy.fn.addBtnEvent();
	}
	, fn : {

		addBtnEvent : function() {

			$(document).on("click", ".btn_go_login", function(){
				showConfirmBox({
					message : "로그인 후 참여가능합니다."
					,ok_str  : "로그인"
					,ok_func : function(){
						MobileBodyStart.goLoginPage();
					}
					,cancel_str : "닫기"
					,cancel_func : function(){
					}
				});
			});

			$(document).on("click", ".btn_get_coupon", function(){
				MobileFirstBuy.fn.getCoupon();
			});
			
		}
		, getCoupon : function() {

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_first_buy_coupon_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : $("form[name='frm']").serialize()
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						showMessageBox({
							message : "슈퍼쿠폰이 발급되었습니다.<br/>마이파우치 > 쿠폰북에서 확인하세요!"
							, close : function() {
								location.href = "/mobile/my/mobile_my_coupon_list.do"
							}
						});
					}
					else {
						showMessageBox({
							message : data.message
						});
						return;
					}
				}
				, error : function(e) {
				}
			});
			
		}

	}

};