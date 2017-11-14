var MobileFreshCarming = {
	name : "MobileFreshCarming",
	init : function(){
		MobileFreshCarming.fn.addBtnEvent();
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
					var today = $("input[name='i_sToday']").val();
					
					if(today < 20170327 || today > 20170409){
						showMessageBox({
							message : "즉석 당첨 이벤트 기간이 아닙니다.<br/>이벤트 기간에 참여해주세요!"
							, close : function(){
								return ;
							}	
						});
					}else{
						MobileFreshCarming.fn.goCheck();
					}
				}
			});
			
			$(".btn_coupon5").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_coupon_list.do";
				}
			});
			
			$(".btn_my_address").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_shipping.do";
				}
			});
			
			$(".youtube_thumb").unbind("click").click(function(event){
				event.preventDefault();
				var youtubeid = $(this).attr("id");
				var videoArea = $(".youtube_video");
				var url = "https://www.youtube.com/embed/" + youtubeid;
				videoArea.attr("src", url);
				$("input[name='i_sYoutubeUrl']").val(url);
			});
			
			$(".btn_coupon3").unbind("click").click(function(event){
				event.preventDefault();
				
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					var today = $("input[name='i_sToday']").val();
					if(today < 20170327 || today > 20170416){
						showMessageBox({
							message : "영상 공유 이벤트 기간이 아닙니다.<br/>이벤트 기간에 참여해주세요!"
								, close : function(){
									return ;
								}	
						});
					}else{
						var eventcd = $("#i_sEventcd").val();
						var thumbnail = $("#i_sEventBnrPath").val();
						var snspath	  = $("#i_sEventSnsPath").val();
						var eventnm = $("input[name='i_sEventnm']").val();
						var description = $("input[name='i_sEventDescrip']").val();
						modalPopup('#pop_coupon_01');
						
						$(".kakaostory_share").click(function(event){
							event.preventDefault();
							$("input[name='i_sShareType']").val("KAKAOSTORY");
							$(".kakaostory_share").css("border", "1px solid #3764be");
							$(".btn_url").css("border", "0");
							$(".btn_fb").css("border", "0");
						});
						
						$(".btn_url").unbind("click").click(function(event){
							event.preventDefault();
							$("input[name='i_sShareType']").val("URLCOPY");
							$(".kakaostory_share").css("border", "0");
							$(".btn_url").css("border", "1px solid #3764be");
							$(".btn_fb").css("border", "0");
						});
						
						$(".btn_fb").unbind("click").click(function(event){
							event.preventDefault();
							$("input[name='i_sShareType']").val("FACEBOOK");
							$(".kakaostory_share").css("border", "0");
							$(".btn_url").css("border", "0");
							$(".btn_fb").css("border", "1px solid #3764be");
						});
						
						$(".btn_x").unbind("click").click(function(event){
							event.preventDefault();
							$(".kakaostory_share").css("border", "0");
							$(".btn_url").css("border", "0");
							$(".btn_fb").css("border", "0");
							modalPopupClose('#pop_coupon_01');
						});
						
						$(".btn_share").unbind("click").click(function(event){
							event.preventDefault();
							var type = $("input[name='i_sShareType']").val();
							var youtubeUrl = $("input[name='i_sYoutubeUrl']").val();
							if(type == "" || type == undefined || type == "undefined"){
								showMessageBox({
									message : "공유할 SNS를 선택해주세요."
										, close : function(){
											return ;
										}	
								});
							}else if(youtubeUrl == "" || youtubeUrl == undefined || youtubeUrl == "undefined"){
								showMessageBox({
									message : "공유할 영상을 선택해주세요."
										, close : function(){
											return ;
										}	
								});
							}else{
								if(type == "FACEBOOK"){
									if(GLOBAL_MOBILE_APP == "APP"){
										var link = $("input[name='i_sYoutubeUrl']").val();
										var str = "facebook::i_sName::"+encodeURI(eventnm)+"::i_sLink::"+link+"::i_sDescription::"+encodeURI(description)+"::i_sPicture::"+snspath;
										
										window.location = str;
									}else{
										var rvo = {
												name : eventnm
												,link : $("input[name='i_sYoutubeUrl']").val()
												,description : description
										};
										MobileEventView.fn.facebookShare(rvo,"Y");
									}
								}else if(type == "KAKAOSTORY"){
									if(GLOBAL_MOBILE_APP == "APP") {
										var longurl = 'http://www.amorepacificmall.com/event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd='+eventcd;
										var shortstr = $("input[name='i_sYoutubeUrl']").val();
//	     						var shortstr = MobileEventView.fn.setShortenUrl(longurl);
										var str = "kakaostory::i_sUrl::"+shortstr+"::i_sImgPath::"+snspath+"::i_sText::"+encodeURI("[APmall] \"아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)\"")+"::i_sTitle::"+encodeURI(eventnm)+"::i_sDescription::"+encodeURI(description);
										
										window.location = str;
									}else{
										Kakao.Story.share({
											url: GLOBAL_WEB_URL+'event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd='+eventcd,
											text: $("input[name='i_sYoutubeUrl']").val()
										});
										Kakao.Story.cleanup();
									}
								}else if(type == "URLCOPY"){
									$("#i_sCopyUrl").val($("input[name='i_sYoutubeUrl']").val());
									modalPopupClose("#pop_coupon_01");
									modalPopup("#modalPopupCopyUrl");
									document.getElementById("i_sCopyUrl").focus();
									document.getElementById("i_sCopyUrl").select();
								}
							}
						});
					}
				}
			});
			
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_fresh_carming_random_check_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						if(data.object == "COUPON"){
							modalPopup("#pop_coupon_02");
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else if(data.object == "winuser"){
							showMessageBox({
								message : "이 전에 이미 당첨되셨습니다.<br/>즐거운 쇼핑되세요!"
								, ok_func : function(){
									return ;
								}
							});
						}else if(data.object == "once"){
							modalPopup("#pop_coupon_04");
						}else if(data.object == "twice"){
							modalPopup("#pop_coupon_05");
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