var MobileApPikiCoupon = {
	name : "MobileApPikiCoupon",
	init : function(){
		MobileApPikiCoupon.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_str : "로그인"
						, cancel_str : "취소"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					var id = $(this).attr("id");
					MobileApPikiCoupon.fn.saveCoupon(id);
				}
			});
		},
		saveCoupon : function(id){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_piki2_coupon_check_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponType : id},
				success : function(data,textStatus){
					if(data.status == "succ"){
						//팝업세팅팅
						if(data.object == "AP_PIKI_COUPON01"){
							modalPopup("#pop_piki2_coupon_01");
						}else if(data.object == "AP_PIKI_COUPON02"){
							modalPopup("#pop_piki2_coupon_03");
						}else{
							modalPopup("#pop_piki2_coupon_02");
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_str : "로그인"
								, cancel_str : "취소"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "alreadyCp"){
								modalPopup("#pop_piki2_coupon_04");
							}else if(data.object == "alreadyGc"){
								modalPopup("#pop_piki2_coupon_04");
							}else if(data.object == "not"){
								modalPopup("#pop_piki2_coupon_05");
							}else if(data.object == "end"){
								showMessageBox({
									message : "쿠폰이 모두 소진되었습니다.<br/>성원 감사드립니다."
								});
							}
							else{
								showMessageBox({
									message : data.message
								});
							}
						}
					}
				}
			});
		}
	}
};