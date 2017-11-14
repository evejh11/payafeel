var MobileLaneigeBBcushion = {
	name : "MobileLaneigeBBcushion",
	init : function(){
		MobileLaneigeBBcushion.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			//스튜디오 예약 버튼
			$(".btn_apply").unbind("click").click(function(event){
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					showMessageBox({
						message : "응모 이벤트가 종료되었습니다."
						, close : function(){
							return ;
						}	
					});
					
//					var flag = true;
//					var time = $("select[name='i_sWantTime']").val();
//					var day = $("select[name='i_sWantDay']").val();
//					var array = [];
//					if(day == "20170616"){
//						if(time == "1030" || time == "1200" || time == "1400"){
//							flag = false;
//							showMessageBox({
//								message : "6월 16일 금요일은 15시 30분부터 예약이 가능합니다.<br/>다시 선택해주세요."
//								, close : function(){
//									return ;
//								}	
//							});
//						}
//					}
//					
//					if(flag){
//						MobileLaneigeBBcushion.fn.goCheck();
//					}
				}
			});
			
			//영상 공유하기
			$(".btn_coupon2").unbind("click").click(function(event){
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
					if(today > 20170601){
						showMessageBox({
							message : "영상 공유 이벤트가 종료되었습니다."
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
						modalPopup('#pop_bbcushion_02');
						
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
									modalPopupClose("#pop_bbcushion_02");
									modalPopup("#modalPopupCopyUrl");
									document.getElementById("i_sCopyUrl").focus();
									document.getElementById("i_sCopyUrl").select();
								}
								
								//sns포인트 
								cmAjax({
									url : GLOBAL_WEB_ROOT + "sns/sns_facebook_share_callback.do",
									dataType : "json",
									data : {i_sEventcd : $(".span_eventcd").text(), i_sSnsFlag : "Y"},
									success : function(data, textStatus){
										
									}
								});
							}
						});
					}
				}
				
			});
			
			$("select[name='i_sWantTime']").change(function(event){
				event.preventDefault();
				var time = $(this).val();
				var day = $("select[name='i_sWantDay']").val();
				var array = [];
				if(day == "20170616"){
					if(time == "1030" || time == "1200" || time == "1400"){
						showMessageBox({
							message : "6월 16일 금요일은 15시 30분부터 예약이 가능합니다.<br/>다시 선택해주세요."
							, close : function(){
								return ;
							}	
						});
					}
				}
			});
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_laneige_bbcushion_apply_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()
					, i_sWantDay : $("select[name='i_sWantDay']").val()
					, i_sWantTime : $("select[name='i_sWantTime']").val()
				}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "예약이 완료되었습니다!"
							, close : function(){
								modalPopupClose("#pop_bbcushion_04");
							}	
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else if(data.object == "already"){
							showMessageBox({
								message : data.message
								, close : function(){
									modalPopupClose("#pop_bbcushion_04");
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