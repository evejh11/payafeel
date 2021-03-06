var MobileApxFANCoupon02 = {
	name : "MobileApxFANCoupon02",
	init : function(){
		MobileApxFANCoupon02.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					var id = $(this).attr("id");
					MobileApxFANCoupon02.fn.saveCoupon(id);
				}
			});
		},
		saveCoupon : function(id){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_apfan_coupon02_check_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponType : id},
				success : function(data,textStatus){
					if(data.status == "succ"){
						//팝업세팅팅
						if(data.object == "FAN_EVT02_COUPON01"){
							modalPopup("#pop_apfan_coupon_02");
						}else{
							modalPopup("#pop_apfan_coupon_01");
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "already"){
								modalPopup("#pop_apfan_coupon_03");
							}else if(data.object == "not"){
								modalPopup("#pop_apfan_coupon_04");
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