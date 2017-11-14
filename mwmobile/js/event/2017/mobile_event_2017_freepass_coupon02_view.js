var MobileFreePassCoupon02 = {
	name : "MobileFreePassCoupon02",
	init : function(){
		MobileFreePassCoupon02.fn.addBtnEvent();
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
					MobileFreePassCoupon02.fn.goCheck();
				}
			});
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_freepass_coupon02_check_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						if(data.object == "COUPON01"){
							showConfirmBox({
								message : "짝짝짝!<br/>[4월 신제품 10% 프리패스 쿠폰]에 당첨되셨습니다."
								, ok_func : function(){
									location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
								}, cancel_func : function(){
									return ;
								}	
							});
						}else if(data.object == "COUPON02"){
							showConfirmBox({
								message : "짝짝짝!<br/>[4월 신제품 20% 프리패스 쿠폰]에 당첨되셨습니다."
								, ok_func : function(){
									location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
								}, cancel_func : function(){
									return ;
								}	
							});
						}else if(data.object == "COUPON03"){
							showConfirmBox({
								message : "짝짝짝!<br/>[4월 신제품 30% 프리패스 쿠폰]에 당첨되셨습니다."
								, ok_func : function(){
									location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
								}, cancel_func : function(){
									return ;
								}	
							});
						}
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
					}
				}
			});
		}
		
	
	}
};