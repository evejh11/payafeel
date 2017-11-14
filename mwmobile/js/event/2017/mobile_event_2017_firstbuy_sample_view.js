var MobileFirstBuySample = {
	name : "MobileFirstBuySample",
	init : function(){
		MobileFirstBuySample.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_first_buy").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					MobileFirstBuySample.fn.goBuySampleCheck();
				}
			});
			
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
					MobileFirstBuySample.fn.goCouponCheck();
				}
			});
		},
		goBuySampleCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_firstbuy_sample_check_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()},
				success : function(data,textStatus){
					if(data.status == "succ"){
						MobileFirstBuySample.fn.goBuySample(data.object);
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
					}
				}
			});
		},
		goBuySample : function(productinfo){
			$("#div_purchase").remove();
			
			var arrParam = [];
			
			arrParam.push("<div id='div_purchase'>");
			arrParam.push("<form name='frm_purchase' method='post' action=''>");
			arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+productinfo.productcd+"'/>");
			arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+productinfo.optioncd+"'/>");
			arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='1'/>");
			arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='0002'/>");
			arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='N'/>");
			arrParam.push("<input type='hidden' name='i_sEventcd' 	value='"+$(".span_eventcd").text()+"'/>");
			arrParam.push("</form>");
			arrParam.push("</div>");
			
		   $(arrParam.join("")).appendTo("body");

		   var frm = $("form[name='frm_purchase']");
		   
		   frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1_sample.do");
		   frm.submit();
		},
		goCouponCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_firstbuy_sample_coupon_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()},
				success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "쿠폰이 발급되었습니다. <br/>발급 된 쿠폰은 마이파우치>쿠폰북 에서 확인 가능하십니다."
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
					}
				}
			});
		}
		
	}
};