var clickflag = false;
var MobileVeriteNewCushion = {
	name : "MobileVeriteNewCushion",
	init : function(){
		MobileVeriteNewCushion.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					MobileVeriteNewCushion.fn.saveCouponCushion();
				}
			});
		},
		saveCouponCushion : function(){
			if(clickflag){
				return;
			}
			clickflag = true;
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_verite_newcushion_save_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()
					},
				success : function(data,textStatus){
					if(data.status == "succ"){
						var msg = "";
						if(data.object == "COUPON01"){
							msg = "베리떼 NEW 립 틴트 20% 할인 쿠폰이 발급되었습니다.";
						}else if(data.object == "COUPON02"){
							msg = "크리스탈 광채 커버쿠션 30% 할인쿠폰이 발급되었습니다.";
						}else if(data.object == "COUPON03"){
							msg = "베리떼 올인원 마스크 사은품 쿠폰이 발급되었습니다.";
						}
						
						clickflag = false;
						showMessageBox({
							message : msg
							, btn_message : "쿠폰확인>"
							, close : function(){
								location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
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
						clickflag = false;
					}
				}
					
			});
		}
	}
};