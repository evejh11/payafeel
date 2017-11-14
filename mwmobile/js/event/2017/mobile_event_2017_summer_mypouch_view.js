var MobileSummerMypouch = {
	name : "MobileSummerMypouch",
	init : function(){
		MobileSummerMypouch.fn.addBtnEvent();
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
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_summer_mypouch_check_ajax.do",
						dataType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()},
						success : function(data,textStatus){
							if(data.status == "succ"){
								MobileSummerMypouch.fn.getRandom();
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
			});
			
			//재도전 UPDATE
			$(".btn_retry").unbind("click").click(function(event){
				event.preventDefault();
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_summer_mypouch_update_ajax.do",
					dataType :"json",
					data : {i_sEventcd : $(".span_eventcd").text()
						, i_sGiftcd : $("input[name='i_sGiftcd']").val()
						, i_sSaveFlag : "N"
					},
					success : function(data,textStatus){
						if(data.status == "succ"){
							modalPopupClose("#modalPopup_itemChoose");
							MobileSummerMypouch.fn.getRandom();
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
			});
			
			//확정하기 UPDATE, 쿠폰 발급
			$(".btn_confirm").unbind("click").click(function(event){
				event.preventDefault();
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_summer_mypouch_update_ajax.do",
					dataType :"json",
					data : {i_sEventcd : $(".span_eventcd").text()
						, i_sGiftcd : $("input[name='i_sGiftcd']").val()
						, i_sSaveFlag : "Y"
					},
					success : function(data,textStatus){
						if(data.status == "succ"){
							modalPopupClose("#modalPopup_itemChoose");
							
							var sampleNm = $(".productNm").text();
							$("span.sampleNm").text(sampleNm);
							modalPopup("#modalPopup_itemConfirm");
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
			});
		},
		getRandom : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "event/2017/event_2017_summer_mypouch_random_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()},
				success : function(data,textStatus){
					if(data.status == "succ"){
						var freegood = data.object;
						var freegoodArea = $(".freegoodArea");
						$(".fr_img", freegoodArea).attr("src", freegood.v_img_web_path);
						$(".brandNm", freegoodArea).text(freegood.v_brandnm);
						$(".productNm", freegoodArea).text(freegood.v_productnm);
						$(".challenge_num").text(freegood.applycnt);
						$("input[name='i_sGiftcd']").val(freegood.v_giftcd);
						
						if(freegood.applycnt == 3){
							$(".btnArea span.btn_box4").css("display", "none");
							$(".alimText").css("display", "none");
						}
						modalPopup("#modalPopup_itemChoose");
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