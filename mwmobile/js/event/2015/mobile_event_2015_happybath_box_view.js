var clickflag = false;
var clickflag2 = false;
var MobileHappyBathbox = {
	name : "MobileHappyBathbox",
	init : function(){
		MobileHappyBathbox.fn.addBtnEvent();
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
					url : GLOBAL_WEB_ROOT +"mobile/event/2015/mobile_event_2015_happybath_box_buycheck_ajax.do"
					, data : ""
					, type : "post"
					, dataType : "json"
					, success : function(data, textStatus){
						if(data.status == "succ"){
							var list = [];
							
			        		list.push({
			        			productcd : "SPR20151211000013381"
			        			, optioncd : "11129573B"                                                 
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
					url : GLOBAL_WEB_ROOT +"mobile/event/2015/mobile_event_2015_happybath_box_buycheck_ajax.do"
					, data : ""
					, type : "post"
					, dataType : "json"
					, success : function(data, textStatus){
						if(data.status == "succ"){
							var list = [];
							
			        		list.push({
			        			productcd : "SPR20151211000013381"
			        			, optioncd : "11129573B"                                                 
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
		},
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_verite_save_ajax.do",
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
		}
	}
};