var chk_tot = 0;
var chk_overlap = false;
var MobileHommeGodskin = {
	name : "MobileHommeGodskin",
	init : function(){
		MobileHommeGodskin.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			//카드 클릭할 때 event
			$('.evtCard').find('a').unbind("click").click(function(event){
				event.preventDefault();
				var card = $(this);
				var idx = $('.evtCard').find('a').index($(this));
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_homme_godskin_random_check_ajax.do",
						dataType : "json",
						data : {i_sEventcd : $(".span_eventcd").text()},
						success : function(data, textStatus){
							if(data.status == "succ"){
								var imgNum = 0;
								if(data.object == "COUPONPRD"){		//정품 쿠폰
									imgNum = 4;
								}else if(data.object == "COUPON01"){		//10% 쿠폰
									imgNum = 1;
								}else if(data.object == "COUPON02"){		//20% 쿠폰
									imgNum = 2; 
								}else if(data.object == "COUPON03"){		//30% 쿠폰
									imgNum = 3;
								}
								
								var img = $("#evt170911_Result .resultImg");
								var imgUrl = GLOBAL_MOBILE_IMG_URL +'event/event2017/img_evt170911_laneige_popup_m_0'+imgNum+'.jpg';
								img.attr("src", imgUrl);
								
								card.find('img').stop().animate({width: '0', height: '100%', marginLeft: '50%'}, 150, 'easeOutCubic', function(){
									// card 선택시 선택 이미지 경로
									var $selectCard = GLOBAL_MOBILE_IMG_URL + 'event/event2017/img_evt170911_laneige_result_card_m_01.png';
									card.find('img').attr("src", $selectCard);
									card.find('img').stop().animate({width: '100%', height: '100%', marginLeft: '0'}, 150, 'easeOutCubic');
								});
								
								chk_tot = chk_tot + 1;
								chk_overlap = true;
								
								setTimeout(function(){ modalPopup('#evt170911_Result'); }, 500);
								return false;
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
			
		}
	}
};