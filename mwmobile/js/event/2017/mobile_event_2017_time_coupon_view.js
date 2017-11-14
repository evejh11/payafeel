var MobileTimeCoupon = {
	name : "MobileTimeCoupon",
	init : function(){
		MobileTimeCoupon.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_time_coupon_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text(),
								i_sCouponFlag : id
							},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileTimeCoupon.fn.getCoupon(id,data.object);
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
									});
								}else{
									showMessageBox({
										message : data.message
									});
								}
							}
						}
							
					});
				}
				
			});
		},
		getCoupon : function(flag, couponcd){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_time_coupon_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sCouponFlag : flag,
						i_sCouponcd  : couponcd
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "쿠폰이 발급되었습니다.<br/> 발급 된 쿠폰은 마이파우치>쿠폰북 에서 확인가능합니다."
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
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