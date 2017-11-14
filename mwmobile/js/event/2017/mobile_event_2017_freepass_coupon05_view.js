var clickflag = false;

var MobileFreePassCoupon05 = {
	name : "MobileFreePassCoupon05",
	init : function(){
		MobileFreePassCoupon05.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					MobileFreePassCoupon05.fn.goCheck();
				}
			});
		},
		
		goCheck : function(){
			if(clickflag){
				return;
			}
			
			clickflag = true;
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_freepass_coupon05_check_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						clickflag = false;
						showConfirmBox({
							message : "짝짝짝!<br/>["+data.object+"]에 당첨되셨습니다."
							, ok_func : function(){
								location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
							}, cancel_func : function(){
								return ;
							}	
						});
					}else{
						if(data.object == "login"){
							showMessageBox({
								message : "로그인 하셔야 이용이 가능합니다."
								, close : function(){
									MobileBodyStart.goLoginPage();
								}	
							});
						}
						else{
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