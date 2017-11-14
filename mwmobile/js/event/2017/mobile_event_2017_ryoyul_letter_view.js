var MobileRyoyulLetter = {
	name : "MobileRyoyulLetter",
	init : function(){
		MobileRyoyulLetter.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			//핑크색 배경 터치 시 HIDE
			$(".popBg").on("touchstart",function(e){
				  e.preventDefault();
				  $(".popBg").css("display", "none");
				 }).on("touchend",function(e){
				  e.preventDefault();
				  $(".popBg").css("display", "none");
				 }).on("touchmove",function(e){
				  e.preventDefault();
				  $(".popBg").css("display", "none");
				});
			
			//카드 보내기 버튼 클릭
	    	$(".p3btn1").unbind("click").click(function(event){
	    		event.preventDefault();
				$(".swiper-slide").each(function(i){
					if($(".swiper-slide").eq(i).hasClass("swiper-slide-active")){
						var imgurl = $(".slide-img", $(".swiper-slide").eq(i)).attr("src");
						$("input[name='i_sImgUrl']").val(imgurl);
						$(".selectedImg").attr("src", imgurl);
						$("input[name='i_sImgName']").val("s_slide" + (i+1));
					}
				});
				
				openPop('makeMsgPop');
	    	});
	    	
	    	//미리보기 버튼 클릭
	    	$(".p403").unbind("click").click(function(event){
	    		event.preventDefault();
	    		$(".sendnm_preview").text($(".sendernm").val());
	    		$(".receivernm_preview").text($(".receivernm").val());
	    		$(".send_msg").text($(".msg_text").val());
	    		$(".preview_img").attr("src", $("input[name='i_sImgUrl']").val());
	    		
	    		openPop('preMsgPop');
	    	});
	    	
	    	//작성완료 버튼 클릭
	    	$(".p401").unbind("click").click(function(event){
	    		event.preventDefault();
	    		var sendernm = $(".sendernm").val();
	    		var receivernm = $(".receivernm").val();
	    		var message = $(".msg_text").val();
	    		if(sendernm == "" || sendernm == undefined){
	    			showMessageBox({
	    				message : "보내는 사람 이름을 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else if(receivernm == "" || receivernm == undefined){
	    			showMessageBox({
	    				message : "받는 사람을 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else if(message == "" || message == undefined){
	    			showMessageBox({
	    				message : "내용을 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else if(message.length > 30){
	    			showMessageBox({
	    				message : "메세지 내용을 30자 이내로 입력해주세요."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else{
	    			$(".complete_msg").text($(".msg_text").val());
	    			$(".complete_img").attr("src", $("input[name='i_sImgUrl']").val());
	    			
	    			cmAjax({
	    				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_ryoyul_seqno_ajax.do"
	    				, type : "post"
						, dataType : "json"
						, data : {i_sEventcd : $(".span_eventcd").text()
							, i_sSendernm : $(".sendernm").val()	
							}
		    			, success : function(data,textStatus){
		    				if(data.status == "succ"){
		    					//보내기 완료 팝업 후, 경품 수령 팝업 띄우기
		    					var recordid = data.object.i_srecordid;
		    					var labeltext = data.object.i_slabeltext;
		    					var shorturl = data.object.i_sshorturl;
		    					$("input[name='i_sKakaoRecordid']").val(recordid);
		    					$("input[name='i_sShortUrl']").val(shorturl);
		    					$("textarea[name='i_sLabelText']").text(labeltext);
		    					
		    				}else{
		    					showMessageBox({
		    						message : data.message
		    					});
		    				}
		    			}
	    			});
	    			openPop('sendCardPop');
	    		}
	    	});
	    	
	    	//다른카드 선택하기 버튼 클릭
	    	$(".p402").unbind("click").click(function(event){
	    		event.preventDefault();
	    		$(".sendernm").val("");
	    		$(".receivernm").val("");
	    		$(".msg_text").val("");
	    		closePop('makeMsgPop');
	    	});
	    	
	    	$("select[name='i_sSelectEmail']").change(function(event){
	    		var email2 = $(this).val();
	    		$("input[name='i_sEmail2']").val(email2);
	    	});
	    	
	    	//이메일 보내기 버튼 클릭
	    	$(".email_p").unbind("click").click(function(event){
	    		event.preventDefault();
	    		var email1 = $("input[name='i_sEmail1']").val();
	    		var email2 = $("input[name='i_sEmail2']").val();
	    		if(email1 == "" || email2 == ""){
	    			showMessageBox({
	    				message : "받는 사람 이메일 주소를 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}
	    			});
	    		}else{
	    			//데이터 저장
	    			cmAjax({
	    				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_ryoyul_email_save_ajax.do"
	    				, type : "post"
	    				, dataType : "json"
	    				, data : {i_sEventcd : $(".span_eventcd").text()
	    						, i_sTypecd : "EMAIL"
	    						, i_sSendernm : $(".sendernm").val()
	    						, i_sReceivernm : $(".receivernm").val()
	    						, i_sEmail1 : $("input[name='i_sEmail1']").val()
	    						, i_sEmail2 : $("input[name='i_sEmail2']").val()
	    						, i_sMessage : $(".msg_text").val()
	    						, i_sImgUrl : $("input[name='i_sImgUrl']").val()	
	    						, i_sImgName : $("input[name='i_sImgName']").val()	
	    					}
	    				, success : function(data,textStatus){
	    					if(data.status == "succ"){
	    						//보내기 완료 팝업 후, 경품 수령 팝업 띄우기
	    						var recordid = data.object;
	    						$("input[name='i_sRecordid']").val(recordid);
	    						
	    						showMessageBox({
	    							message : "이메일이 전송되었습니다!"
	    							, close  : function(){
	    								closePop('eSendPop');
	    								openPop('inSertInfoPop');
	    							}	
	    						});
	    					}else{
    							showMessageBox({
    								message : data.message
    							});
	    					}
	    				}
	    			});
	    		}
	    	});
	 	
	    	//개인정보 동의 팝업 입력 완료 버튼 
	    	$(".btn_info_setting").unbind("click").click(function(event){
	    		event.preventDefault();
	    		var srcUrl = $(".infocheck").attr("src");
	    		var applyernm = $(".applyernm").val();
	    		var applymobileno = $(".applymobileno").val();
	    		if(applyernm == undefined || applyernm == ""){
	    			showMessageBox({
	    				message : "이름을 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else if(applymobileno == undefined || applymobileno == ""){
	    			showMessageBox({
	    				message : "혜택 받으실 휴대전화번호를 입력해주세요."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else if(srcUrl.indexOf("ch_off.png") > -1){
	    			showMessageBox({
	    				message : "개인정보 활용 동의하셔야 이용 가능합니다."
	    				, close : function(){
	    					return ;
	    				}	
	    			});
	    		}else{
	    			cmAjax({
	    				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_ryoyul_applyinfo_save_ajax.do"
	    				, type : "post"
	    				, dataType : "json"
	    				, data : {i_sEventcd : $(".span_eventcd").text()
	    						, i_sRecordid : $("input[name='i_sRecordid']").val()
	    						, i_sSendMobile : $(".applymobileno").val()
	    						, i_sFlagAgree : "Y"
	    					}
	    				, success : function(data,textStatus){
	    					if(data.status == "succ"){
	    						showMessageBox({
	    							message : "혜택 발급을 위한 정보를 저장하였습니다.<br/>감사합니다."
	    							, close  : function(){
	    								closePop('inSertInfoPop');
	    								document.frm_reload.submit();
	    							}	
	    						});
	    					}else{
    							showMessageBox({
    								message : data.message
    							});
	    					}
	    				}
	    			});
	    		}
	    	});
	    	
	    	//문자 보내기
	    	$(".sms_send").unbind("click").click(function(event){
	    		event.preventDefault();
	    		var mobileno = $("input[name='i_sReceiveMobile']").val();
	    		if(mobileno == "" || mobileno == undefined){
	    			showMessageBox({
	    				message : "받는 사람 휴대폰번호를 입력하지 않으셨습니다."
	    				, close : function(){
	    					return ;
	    				}
	    			});
	    		}else{
	    			//데이터 저장
	    			cmAjax({
	    				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_ryoyul_sms_save_ajax.do"
	    				, type : "post"
	    				, dataType : "json"
	    				, data : {i_sEventcd : $(".span_eventcd").text()
	    						, i_sTypecd : "SMS"
	    						, i_sSendernm : $(".sendernm").val()
	    						, i_sReceivernm : $(".receivernm").val()
	    						, i_sReceiveMobile : mobileno
	    						, i_sMessage : $(".msg_text").val()
	    						, i_sImgUrl : $("input[name='i_sImgUrl']").val()	
	    						, i_sImgName : $("input[name='i_sImgName']").val()	
	    					}
	    				, success : function(data,textStatus){
	    					if(data.status == "succ"){
	    						//보내기 완료 팝업 후, 경품 수령 팝업 띄우기
	    						var recordid = data.object;
	    						$("input[name='i_sRecordid']").val(recordid);
	    						
	    						showMessageBox({
	    							message : "문자가 전송되었습니다!"
	    							, close  : function(){
	    								closePop('mailSenPop');
	    								openPop('inSertInfoPop');
	    							}	
	    						});
	    					}else{
    							showMessageBox({
    								message : data.message
    							});
	    					}
	    				}
	    			});
	    		}
	    	});
	    	
	    	//카카오톡 보내기
	    	$(".p4b3").unbind("click").click(function(event){
	    		event.preventDefault();
    			//데이터 저장
    			cmAjax({
    				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_ryoyul_kakao_save_ajax.do"
    				, type : "post"
					, dataType : "json"
					, data : {i_sEventcd : $(".span_eventcd").text()
						, i_sTypecd : "KAKAO"
						, i_sSendernm : $(".sendernm").val()
						, i_sReceivernm : $(".receivernm").val()
						, i_sMessage : $(".msg_text").val()
						, i_sImgUrl : $("input[name='i_sImgUrl']").val()	
						, i_sImgName : $("input[name='i_sImgName']").val()	
						, i_sKakaoRecordid : $("input[name='i_sKakaoRecordid']").val()	
    				}
	    			, success : function(data,textStatus){
	    				if(data.status == "succ"){
	    					try{
	    		               	 Kakao.init('8218ce208f43a5737824a66dc103d2c3');
	    						   // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
	    		        		    Kakao.Link.createTalkLinkButton({
	    		        		      container: '#kakao-ryoevent',
	    		        		      label: $("#i_sLabelText").text(),
	    		        		      image: {
	    		        		        src: "http://images.amorepacificmall.com/mobile/images/event/event2017/ryoyul/pop92.jpg",
	    		        		        width: '300',
	    		        		        height: '155'
	    		        		      },
	    		        		      webButton: {
	    		        		        text: '웹/앱으로 보기',
	    		        		        url: 'http://www.amorepacificmall.com/event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd=EVT20170504_ryoEvent' // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
	    		        		      }
	    		        		    });
	    		        		   
	    		               }catch(e){} 
	    		    		
	    				}else{
	    					showMessageBox({
	    						message : data.message
	    					});
	    				}
	    			}
    			});
	    	});
	    	
	    	$(".save_img").unbind("click").click(function(event){
	    		event.preventDefault();
	    		var imgNm = $("input[name='i_sImgName']").val();
    			MobileRyoyulLetter.fn.ryoCmImageDown(imgNm);
	    	});
		},
		ryoCmImageDown : function(thumbnailId) {

			var imgUrl = $("input[name='i_sImgUrl']").val();
			
			var i_sFlagIOS = $("input[name='i_sFlagIOS']").val();
    		
    		if (i_sFlagIOS == "Y"){
    			openPop('saveImgPop');
//    			location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_img_detail.do?i_sEventcd=EVT20170504_ryoEvent&i_sImgUrl=" + imgUrl;
    		} else {
    			
    			if (jQuery("#cm_download").html() == null) {
    				
    				var arrHtml	= [];
    				arrHtml.push("<iframe id='cm_download' name='cm_download src='about:blank' style='display:none;' scrolling='auto' marginwidth='0' marginheight='0' frameborder='0' vspace='0' hspace='0'></iframe>");
    				jQuery(arrHtml.join("")).appendTo("body");
    			}
    			
    			var url = GLOBAL_WEB_ROOT + "mobile/event/2017/ryoevent_comm_image_download.do?i_sImgUrl=" + imgUrl +"&i_sThumbnailId=" + thumbnailId;
    			jQuery("#cm_download").attr("src", url);
    		}
		}
	}
};