var clickflag = false;
var clickflag2 = false;
var MobileHappyBathbox2 = {
	name : "MobileHappyBathbox2",
	init : function(){
		MobileHappyBathbox2.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_buy").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag){
					return;
				}else{
					clickflag = true;
				}
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2015/mobile_event_2015_happybath_box2_buycheck_ajax.do"
					, data : {i_sEventFlag : "EVT_HOLIDAY_S2"}
					, type : "post"
					, dataType : "json"
					, success : function(data, textStatus){
						if(data.status == "succ"){
							var list = [];
							
			        		list.push({
			        			productcd : "SPR20151223000014028"
			        			, optioncd : "11129573A"                                                 
			        			, cnt : 1
			        			, typecd : "PROD_0001"
			        			, flagSoloPack : "N"
			        			, flagaction : "purchase"
			        		});
				        	
			        		MobileBodyStart.immediatelyPurchage({list : list});
				        	$(".btn_layer_close").unbind("click").click(function(event){
				        		clickFlag = false;
				        	});
						}else{
							if(data.object == "login"){
								showConfirmBox({
									message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
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
				
			});
			$(".btn_buy2").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag2){
					return;
				}else{
					clickflag2 = true;
				}
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2015/mobile_event_2015_happybath_box2_buycheck_ajax.do"
					, data : {i_sEventFlag : "EVT_HOLIDAY_S2"}
					, type : "post"
					, dataType : "json"
					, success : function(data, textStatus){
						if(data.status == "succ"){
							var list = [];
							
			        		list.push({
			        			productcd : "SPR20151223000014028"
			        			, optioncd : "11129573A"                                                 
			        			, cnt : 1
			        			, typecd : "PROD_0001"
			        			, flagSoloPack : "N"
			        			, flagaction : "purchase"
			        		});
				        	
			        		MobileBodyStart.immediatelyPurchage({list : list});
				        	$(".btn_layer_close").unbind("click").click(function(event){
				        		clickFlag = false;
				        	});
						}else{
							if(data.object == "login"){
								showConfirmBox({
									message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
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
				
			});
		}
	}
};