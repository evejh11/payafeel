var MobileVeriteNfc = {
	name : "MobileVeriteNfc",
	init : function(){
		MobileVeriteNfc.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				if(!IS_LOGIN){
					modalPopup("#modalVeriteLogin");
					$(".btn_login").unbind("click").click(function(event){
						event.preventDefault();
						document.frm_login.submit();
					});
					$(".btn_login_cancel").unbind("click").click(function(event){
						modalPopupClose("#modalVeriteLogin");
					});
				}else{
					MobileVeriteNfc.fn.goCheck();
				}
			});
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_verite_nfcCushion_check_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						if(data.object == "COUPON01"){
							modalPopup("#modalVeriteSaleCoupon");
						}else if(data.object == "COUPON02"){
							modalPopup("#modalVeriteGiftCoupon");
						}else if(data.object == "COUPON03"){
							modalPopup("#modalVeriteFreeCoupon");
						}
					}else{
						if(data.object == "login"){
							modalPopup("#modalVeriteLogin");
							$(".btn_login").unbind("click").click(function(event){
								event.preventDefault();
								document.frm_login.submit();
							});
							$(".btn_login_cancel").unbind("click").click(function(event){
								modalPopupClose("#modalVeriteLogin");
							});
						}else if(data.object =="theend"){
							modalPopup("#modalVeriteAlready");
						}else if(data.object == "theendend"){
							modalPopup("#modalVeriteEnd");
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
					}
				}
			});
		}
		
	
	}
};