var Mobile72thAnniversary = {
	name : "Mobile72thAnniversary",
	init : function(){
		Mobile72thAnniversary.fn.addBtnEvent();
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
					Mobile72thAnniversary.fn.getCoupon(id);
				}
			});
		},
		getCoupon : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "event/2017/event_2017_72th_anniversary_check_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sCouponcd : flag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : data.message
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