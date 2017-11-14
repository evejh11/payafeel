var MobileTimeAttack = {
	name : "MobileTimeAttack",
	init : function(){
		MobileTimeAttack.fn.addBtnEvent();
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
					MobileTimeAttack.fn.getCoupon(id);
				}
				
			});
			
			$(".btn_coupon2").unbind("click").click(function(event){
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
					MobileTimeAttack.fn.getCoupon(id);
				}
				
			});
		},
		getCoupon : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_time_attack_check_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sTime : flag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						modalPopup('#pop_coupon_s');
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "end"){
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