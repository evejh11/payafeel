var MobileIope10ccCushion = {
	name : "MobileIope10ccCushion",
	init : function(){
		MobileIope10ccCushion.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			//영상 공유하기
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					
					var eventcd = $("#i_sEventcd").val();
					var thumbnail = $("#i_sEventBnrPath").val();
					var snspath	  = $("#i_sEventSnsPath").val();
					var eventnm = $("input[name='i_sEventnm']").val();
					var description = $("input[name='i_sEventDescrip']").val();
					modalPopup('#pop_iope10cc_01');
					
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
								modalPopupClose("#pop_iope10cc_01");
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