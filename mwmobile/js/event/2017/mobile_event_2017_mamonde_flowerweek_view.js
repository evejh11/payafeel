var MobileFlowerWeek = {
	name : "MobileFlowerWeek",
	init : function(){
		MobileFlowerWeek.fn.addBtnEvent();
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
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_mamonde_flowerweek_check_ajax.do",
						dataType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()
							, i_sCouponcd : "CPU20170904000027480"},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileFlowerWeek.fn.saveCoupon();
							}else{
								if(data.object =="login"){
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
		saveCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_mamonde_flowerweek_save_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponcd : "CPU20170904000027480"},
				success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message :"쿠폰이 발급되었습니다.<br/><span style='color:#325ca7'>마이파우치 > 쿠폰북<span>에서 확인해주세요!"
							, close : function(){
								return ;
							}	
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