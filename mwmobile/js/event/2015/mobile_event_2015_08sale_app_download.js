var	MobileAppDownload = {
	name : "MobileAppDownload",
	init : function() {
		MobileAppDownload.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_download").unbind("click").click(function(event){
				if(!IS_LOGIN){
					modalPopup("#modalPopupAppMobileDownload");
				}else{
					MobileAppDownload.fn.sendSmsPop();
				}
//				AppDiscount.fn.sendSmsUrl();
			});
			$(".btn_send_sms").unbind("click").click(function(event){
				MobileAppDownload.fn.sendSmsUrl();
			});
		},
		sendSmsPop: function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_08sale_app_usermobile_ajax.do"
				, dataType : "json"
				, data : {}
				, success :function(data, textStatus){
					if(data.status == "succ"){
						$("input[name='i_sMobile1']").val(data.object.mobileno1);
						$("input[name='i_sMobile2']").val(data.object.mobileno2);
						$("input[name='i_sMobile3']").val(data.object.mobileno3);
						modalPopup("#modalPopupAppMobileDownload");
					}else{
						modalPopup("#modalPopupAppMobileDownload");
					}
				}
			})
		},
		
		sendSmsUrl : function(){
			var mobile = String($("input[name='i_sMobile1']").val()) + String($("input[name='i_sMobile2']").val())+String($("input[name='i_sMobile3']").val());
			if($("input[name='i_sMobile2']").val() == undefined || $("input[name='i_sMobile2']").val() == '' || $("input[name='i_sMobile3']").val() == undefined || $("input[name='i_sMobile3']").val() == ''){
				showMessageBox({
					message : "휴대폰번호를 정확히 입력해주세요."
				});
				return ;
			}
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_08sale_app_download_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd_appdis").text(),
						i_sMobileNo : mobile},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "전송되었습니다."
							, close : function(){
								modalPopupClose("#modalPopupAppMobileDownload");
							}
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