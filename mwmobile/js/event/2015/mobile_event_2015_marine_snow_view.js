var MobileMarineSnow = {
	name : "MobileMarineSnow",
	init : function(){
		MobileMarineSnow.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			$(".btn_save").unbind("click").click(function(event){
				   event.preventDefault();
				   if(!IS_LOGIN){
					   showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								document.frm_login.submit(); 
							}
						});
				   }else{
					   MobileMarineSnow.fn.goSave();  
				   }
				   
			    });
		},
		goSave : function(){
			 var eventcd = $(".span_eventcd_marine").text();
			   cmAjax({
				   url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_marine_snow_save_ajax.do",
				   data : {i_sEventcd : eventcd},
				   type : "post",
				   dataType : "json",
				   success : function(data, textStatus){
					   if(data.status =="succ"){
						   showMessageBox({
								message : "응모되었습니다."
							});
					   }else{
						   if(data.object == "login"){
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										document.frm_login.submit(); 
									}
								});
							}else {
								if(data.object == "already"){
									showMessageBox({
										message : "이미 응모하셨습니다."
									});
								}else if(data.object == "buy"){
									showMessageBox({
										message : "기간 내 이벤트 상품 구매 후 응모가능합니다."
									});
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