var MobileFamilyEvent = {
	name : "MobileFamilyEvent",
	init : function(){
		MobileFamilyEvent.fn.addBtnEvent();
		if($(".flag_link").text() == "Y"){
			var boxTop = 700;
			$("body,html,document").stop().animate({ scrollTop: boxTop }, 800);
		}
	},
	fn : {
		addBtnEvent : function(){
			$(".myFortuneCardConfirm").unbind("click").click(function(event){
				event.preventDefault();
				if($(".myFortuneCardListArea").hasClass("open")){
					$(".myFortuneCardListArea").removeClass("open");
					$('.myFortuneCardListArea').slideUp('fast');
				}else{
					if(!IS_LOGIN){
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
							, ok_func : function(){
								document.frm_login.submit();
							}
						});
					}else{
						MobileFamilyEvent.fn.goCheck();
					}
				}
			});
			
			$(".btn_pop").unbind("click").click(function(event){
				event.preventDefault();
				var ordercd = $(this).attr("id");
				
				MobileFamilyEvent.fn.goPickFortune(ordercd);
			});
		},
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_family_event_check_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text()},
				success : function(data, textStatus){
					if(data.status == "succ"){
						//밑에 리스트 오쁜
						$("#myorderList").html("");
						var arrHtml = [];
						
						var ordlist = data.object;
						if(ordlist.length >0 ){
							for(var i= 0; i < ordlist.length; i++){
								arrHtml.push("<li>");
								arrHtml.push("	<p>");
								arrHtml.push("		<span class='prodCode'>"+ordlist[i].v_ordercd+"</span>");
								arrHtml.push("		<span class='prodName'>"+ordlist[i].v_ordernm+"</span>");
								arrHtml.push("	</p>");
								arrHtml.push("	<span class='btn_ty btn_fc'><a href='javascript:;' id='"+ordlist[i].v_ordercd+"' class='btn_pop'>포츈카드 확인</a></span>");
								arrHtml.push("</li>");
							}
							$(arrHtml.join("\n")).appendTo("#myorderList");
						}
						
						$('.myFortuneCardListArea').slideDown('fast');
						$(".myFortuneCardListArea").addClass("open");
						MobileFamilyEvent.fn.addBtnEvent();
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else if(data.object == "zero"){
							showMessageBox({
								message : "보유하고 계시는 포츈카드가 없어요!<br/>포츈카드는 5월 주문건의 결제금액이<br/>5만원 이상일때 받으실 수 있어요!"
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
		goReCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_family_event_check_ajax.do",
				dataType : "json",
				data : {},
				success : function(data, textStatus){
					if(data.status == "succ"){
						//밑에 리스트 오쁜
						$("#myorderList").html("");
						var arrHtml = [];
						
						var ordlist = data.object;
						if(ordlist.length >0 ){
							for(var i= 0; i < ordlist.length; i++){
								arrHtml.push("<li>");
								arrHtml.push("	<p>");
								arrHtml.push("		<span class='prodCode'>"+ordlist[i].v_ordercd+"</span>");
								arrHtml.push("		<span class='prodName'>"+ordlist[i].v_ordernm+"</span>");
								arrHtml.push("	</p>");
								arrHtml.push("	<span class='btn_ty btn_fc'><a href='javascript:;' id='"+ordlist[i].v_ordercd+"' class='btn_pop'>포츈카드 확인</a></span>");
								arrHtml.push("</li>");
							}
							$(arrHtml.join("\n")).appendTo("#myorderList");
						}
						
						$('.myFortuneCardListArea').slideDown('fast');
						
						MobileFamilyEvent.fn.addBtnEvent();
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else if(data.object == "zero"){
							$("#myorderList").html("");
							$(".myFortuneCardListArea").removeClass("open");
							$('.myFortuneCardListArea').slideUp('fast');
						}else{
							showMessageBox({
								message : data.message
							});
						}
					}
				}
					
			});
		},
		goPickFortune : function(ordercd){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_family_event_pick_fortune_ajax.do",
				dataType : "json",
				data : {i_sOrdercd : ordercd},
				success : function(data, textStatus){
					if(data.status == "succ"){
						var cardlist = data.object;
						if(cardlist.length >0){
							$("#ul_FortuneCard").html("");
							for(var i=0; i<cardlist.length; i++){
								var arrHtml = [];
								if(cardlist[i].v_flag_yn == 'Y'){
									if(cardlist[i].v_gift_type != "COUPON"){
										arrHtml.push("<li class='act'><a href='javascript:;' class='pick'>");
										arrHtml.push("	<img src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_fortuneCard.jpg' alt=''/>");
										arrHtml.push("	<span><img class='pick_img' src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_"+cardlist[i].v_gift_type+"_"+cardlist[i].v_gift_detail+".jpg' alt=''/></span>");
										arrHtml.push("</a></li>");
									}else{
										arrHtml.push("<li class='act'><a href='javascript:;' class='pick'>");
										arrHtml.push("	<img src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_fortuneCard.jpg' alt=''/>");
										arrHtml.push("	<span><img class='pick_img' src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_COUPON.jpg' alt=''/></span>");
										arrHtml.push("</a></li>");
									}
								}else{
									arrHtml.push("<li><a href='javascript:;'>");
									arrHtml.push("	<img src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_fortuneCard.jpg' alt=''/>");
									arrHtml.push("	<span><img class='pick_img' src='"+GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_fortuneCard.jpg' alt='' /></span>");
									arrHtml.push("</a></li>");
								}
								$(arrHtml.join("\n")).appendTo("#ul_FortuneCard");
							}
							
							$(".btn_nonClick").show();
                        	$(".btn_Click").hide();
                        	
							modalPopup('#modalFortuneCard');
							
							var bx_li = $(".FortuneCardList li").height();
                        	$('.FortuneCardList').css('height',bx_li);
                        	
							$(".FortuneCardList li a").unbind("click").click(function() {
			                    if(!$(this).parent("li").hasClass("act")){
			                    	
			                    	var idx = $(".FortuneCardList li a").index($(this));
			                    	var size = $(".pick").size();
			                    	$(this).addClass("pick");
			                    	var img = "";
			                    	if(cardlist.length != size){
			                        	for(var i=0; i<cardlist.length; i++){
				                        	if(cardlist[i].n_seqno == parseInt(size + 1)){
				                        		index = i;
				                        		if(cardlist[i].v_gift_type == "COUPON"){
				                        			img = GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_COUPON.jpg";
				                        		}else{
				                        			img = GLOBAL_MOBILE_IMG_URL+"event/event2016/img_evt20160505_m_family_event_"+cardlist[i].v_gift_type+"_"+cardlist[i].v_gift_detail+".jpg";
				                        		}
				                        	}
				                        }
				                        
			                        	$(".pick_img").eq(idx).attr("src",img);
				                        
				                        $(this).parent("li").addClass("act");
				                    	MobileFamilyEvent.fn.goPickSaveFortune(cardlist[index]);
				                    	if(parseInt(size +1) == cardlist.length){
//				                    		MobileFamilyEvent.fn.goCheck();
				                        	$(".btn_nonClick").hide();
				                        	$(".btn_Click").show();
				                        	
				                        	$(".btn_Click").unbind("click").click(function(event){
				                        		modalPopupClose('#modalFortuneCard');
				                        		MobileFamilyEvent.fn.goReCheck();
				                        	});
			                        	}
			                        }
			                    }
			                });
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({ 
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else if(data.object == "ordercd"){
							showMessageBox({
								message : "해당 주문건을 찾을 수 없어요!<br/>다시 한번 확인해주세요!"
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
		
		goPickSaveFortune : function(cardobj){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_family_event_update_save_ajax.do",
				dataType : "json",
				data : {i_sOrdercd : cardobj.v_ordercd, 
						i_sGiftType : cardobj.v_gift_type , 
						i_sGiftDetail : cardobj.v_gift_detail},
				success : function(data,textStatus){
					if(data.status == "succ"){
						
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