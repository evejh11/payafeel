/**
* 1만원 쿠폰 다운로드 JavaScript
*/
var clickflag = false;
var MobileCmntMonthlyCoupon = {
	name : "MobileCmntMonthlyCoupon",
	init : function(){
		MobileCmntMonthlyCoupon.fn.addBtnEvent();
	},
	fn : {
		
		addBtnEvent : function(){
			$(".btn_coupon").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
							, ok_func : function(){
								MobileBodyStart.goLoginPage();
							}
					});
				}else{
					MobileCmntMonthlyCoupon.fn.saveCopuon();
				}
			});
		},
		saveCopuon : function(){
			if(clickflag){
				return;
			}
			clickflag = true;
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_apmall_monthly_coupon_save_ajax.do",
				dataType : "json",
				data : {},
				success : function(data, textStatus){
					if(data.status == "succ"){
						clickflag = false;
						showMessageBox({
							message : "쿠폰이 발급되었습니다. <br/>발급받으신 쿠폰은 <span style='color:#325ca7'>마이파우치>쿠폰북</span>에서 확인가능하세요!"
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