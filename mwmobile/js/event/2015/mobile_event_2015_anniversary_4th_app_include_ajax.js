var	MobileAnniversary4thInclude = {
	name : "MobileAnniversary4th",
	init : function() {
		MobileAnniversary4thInclude.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$("#btn_start").unbind("click").click(function(event){
				event.preventDefault();
				MobileAnniversary4thInclude.fn.eventCheck("S");
			});
			
			
			
			$("#btn_eventjoin").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					var userRid = $("input[name='i_sRandom']").val();
					var eventcd = $(".span_eventcd_anni").text();
				}
			});
		}
	}
};
