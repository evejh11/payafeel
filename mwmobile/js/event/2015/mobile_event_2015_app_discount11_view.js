var MobileAppDiscount11 = {
	name : "MobileAppDiscount11",
	init : function(){
		MobileAppDiscount11.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_send").unbind("click").click(function(event){
				
				MobileAppDiscount11.fn.sendSmsUrl();
			});
		},
		sendSmsUrl : function(){
			var mobile = String($("input[name='i_sMobileno1']").val()) + String($("input[name='i_sMobileno2']").val())+String($("input[name='i_sMobileno3']").val());
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_app_discount11_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd_appdis").text(),
						i_sMobileNo : mobile},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "전송되었습니다."
						});
					}else{
					
						showMessageBox({
							message : data.message
						});
				
						
					}
				}
					
			});
		}
	}
};