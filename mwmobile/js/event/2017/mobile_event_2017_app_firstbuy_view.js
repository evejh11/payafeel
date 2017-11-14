var MobileAppFirstBuy = {
	name : "MobileAppFirstBuy",
	init : function(){
		MobileAppFirstBuy.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_app_firstbuy_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()
							, i_sCouponcd : "CPU20170706000026140"},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileAppFirstBuy.fn.getCoupon();
							}else{
								if(data.object == "login"){
									showMessageBox({
										message : "로그인 하셔야 이용이 가능합니다."
										, close : function(){
											MobileBodyStart.goLoginPage();
										}	
									});
								}else{
									if(data.object == "notFirst"){
										modalPopup('#pop_coupon_f');
									}else{
										showMessageBox({
											message : data.message
										});
									}
								}
							}
						}
							
					});
				}
				
			});
			
		},
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_app_firstbuy_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponcd : "CPU20170706000026140"},
				success : function(data, textStatus){
					if(data.status == "succ"){
						modalPopup('#pop_coupon_s');
					}else{
						if(data.object == "login"){
							showMessageBox({
								message : "로그인 하셔야 이용이 가능합니다."
								, close : function(){
									MobileBodyStart.goLoginPage();
								}	
							});
						}else{
							if(data.object == "notFirst"){
								modalPopup('#pop_coupon_f');
							}else{
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