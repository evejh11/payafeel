var MobileHeraSunmate = {
	name : "MobileHeraSunmate",
	init : function(){
		MobileHeraSunmate.fn.addBtnEvent();
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
					MobileHeraSunmate.fn.getCoupon(id);
					try{
						fbq('track', 'heraSunPurchase');
					}catch(e){}
				}
				
			});
			
			$(".btn_mobile_detail_hera").unbind("click").click(function(event){
				event.preventDefault();
				var productcd = $(this).attr("id");
				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							window.Android.gotoProductDetail(productcd);
						}
						else {
							window.webkit.messageHandlers.gotoProductDetail.postMessage(productcd);
						}
					}catch(e){
						var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + productcd +"&event=heraSunPurchase";
						document.location.href = url;
					}
				}
				else {
					var url = GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + productcd +"&event=heraSunPurchase";
					document.location.href = url;
				}
			});
		},
		getCoupon : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_herasunmate_coupon_check_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sFlag : flag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						if(flag == "HERA_SUNMATE_FB"){
							showMessageBox({
								message : "쿠폰이 발급되었습니다."
								, close : function(){
									return ;
								}	
							});
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "end"){
								modalPopup('#pop_coupon_f');
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