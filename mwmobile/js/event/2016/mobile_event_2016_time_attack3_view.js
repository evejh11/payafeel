var MobileTimeAttack3 = {
	name : "MobileTimeAttack3",
	init : function(){
		MobileTimeAttack3.fn.addBtnEvent();
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
						url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_time_attack3_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text(),
								i_sCouponFlag : "TENCP"
							},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileTimeAttack3.fn.getCoupon("TENCP",data.object);
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											document.frm_login.submit();
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
				
			});
			
			$(".btn_coupon2").unbind("click").click(function(event){
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
						url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_time_attack3_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text(),
								i_sCouponFlag : "TWOCP"
							},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileTimeAttack3.fn.getCoupon("TWOCP",data.object);
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											document.frm_login.submit();
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
				
			});
		},
		getCoupon : function(flag, couponcd){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_time_attack3_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sCouponFlag : flag,
						i_sCouponcd  : couponcd
						},
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