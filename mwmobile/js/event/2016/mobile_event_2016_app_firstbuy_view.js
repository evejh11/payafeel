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
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_app_firstbuy_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()
							, i_sCouponcd : "CPU20160607000019561"},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileAppFirstBuy.fn.getCoupon();
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											document.frm_login.submit();
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
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_app_firstbuy_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponcd : "CPU20160607000019561"},
				success : function(data, textStatus){
					if(data.status == "succ"){
						modalPopup('#pop_coupon_s');
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
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