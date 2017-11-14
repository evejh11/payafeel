var MobileMonster = {
	name : "MobileMonster",
	init : function(){
		MobileMonster.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					MobileMonster.fn.getCoupon();
				}
				
			});
		},
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_monster_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "쿠폰 발급 되었습니다.<br/>발급 된 쿠폰은 <span style='color:#325ca7'>마이파우치>쿠폰북</span>에서 확인 가능합니다."
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
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