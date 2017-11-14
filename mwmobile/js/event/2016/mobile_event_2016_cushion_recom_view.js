var double = false;
var coupon = false;
var MobileCushionRecom = {
	name : "MobileCushionRecom",
	init : function(){
		MobileCushionRecom.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					MobileCushionRecom.fn.startRecom();
				}
				
			});
		},
		startRecom : function(){
			if(double){
				return false;
			}else{
				double = true;
			}
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_cushion_recom_check_ajax.do",
				dtatType :"json",
				data : {i_sEventcd : $(".span_eventcd").text(),
					},
				success : function(data,textStatus){
					if(data.status == "succ"){
						//첫번째 팝업 오쁜
						MobileCushionRecom.fn.goPopup(1);
						double = false;
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
						double = false;
					}
				}
					
			});
		},
		goPopup : function(seqno){
			if(seqno == 1){
				modalPopup("#pop_cushion_recom_q01");
				$(".btn_yes_q01").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",1);
				});
				
				$(".btn_no_q01").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",1);
				});
				
				
			}else if(seqno == 2){
				modalPopup("#pop_cushion_recom_q02");
				$(".btn_yes_q02").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",2);
				});
				
				$(".btn_no_q02").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",2);
				});
				
				$(".btn_prev_q02").unbind("click").click(function(event){
					event.preventDefault();
					modalPopupClose('#pop_cushion_recom_q02');
					MobileCushionRecom.fn.goPopup(1);
				});
			}else if(seqno == 3){
				modalPopup("#pop_cushion_recom_q03");
				$(".btn_yes_q03").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",3);
				});
				
				$(".btn_no_q03").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",3);
				});
				
				$(".btn_prev_q03").unbind("click").click(function(event){
					event.preventDefault();
					modalPopupClose('#pop_cushion_recom_q03');
					MobileCushionRecom.fn.goPopup(2);
				});
			}else if(seqno == 4){
				modalPopup("#pop_cushion_recom_q04");
				$(".btn_yes_q04").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",4);
				});
				
				$(".btn_no_q04").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",4);
				});
				
				$(".btn_prev_q04").unbind("click").click(function(event){
					event.preventDefault();
					modalPopupClose('#pop_cushion_recom_q04');
					MobileCushionRecom.fn.goPopup(3);
				});
			}else if(seqno == 5){
				modalPopup("#pop_cushion_recom_q05");
				$(".btn_yes_q05").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",5);
				});
				
				$(".btn_no_q05").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",5);
				});
				
				$(".btn_prev_q05").unbind("click").click(function(event){
					event.preventDefault();
					modalPopupClose('#pop_cushion_recom_q05');
					MobileCushionRecom.fn.goPopup(4);
				});
			}else if(seqno == 6){
				modalPopup("#pop_cushion_recom_q06");
				$(".btn_yes_q06").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("Y",6);
				});
				
				$(".btn_no_q06").unbind("click").click(function(event){
					event.preventDefault();
					MobileCushionRecom.fn.saveApply("N",6);
				});
				
				$(".btn_prev_q06").unbind("click").click(function(event){
					event.preventDefault();
					modalPopupClose('#pop_cushion_recom_q06');
					MobileCushionRecom.fn.goPopup(5);
				});
			}else{
				alert("error");
			}
		},
		saveApply : function(answer, seqno){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_cushion_recom_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sAnswer : answer,
						i_iSeqno : seqno,
						i_sFlagAction : "A"
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						if(data.object.endflag == "Y" && seqno == 6){
							modalPopupClose('#pop_cushion_recom_q0'+seqno);
							//마지막 팝업을 띄우기
							var result = data.object.result.v_result;
							
							if(result == "BRIGHT"){
								modalPopup("#pop_cushion_recom_result01");
							}else if(result == "COVER"){
								modalPopup("#pop_cushion_recom_result02");
							}else if(result == "MATT"){
								modalPopup("#pop_cushion_recom_result03");
							}else if(result == "MOISTURE"){
								modalPopup("#pop_cushion_recom_result04");
							}else if(result == "ANTIAGING"){
								modalPopup("#pop_cushion_recom_result05");
							}
							var coupon = data.object.result.v_couponcd;
							//result에 따른 팝업
							
							$(".btn_coupon").unbind("click").click(function(event){
								event.preventDefault();
								MobileCushionRecom.fn.getCoupon(coupon);
							});
							//쿠폰 받기 클릭시 쿠폰받기로 click 이벤트
							
						}else{
							var nextseqno = parseInt(parseInt(seqno)+1);
							modalPopupClose('#pop_cushion_recom_q0'+seqno);
							MobileCushionRecom.fn.goPopup(nextseqno);
						}
					}
				}
			});
		},
		getCoupon : function(couponcd){
			if(coupon){
				return false;
			}else{
				coupon = true;
			}
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_cushion_recom_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sFlagAction : "C",
						i_sCouponcd  : couponcd
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						modalPopupClose("#pop_cushion_recom_result01");
						modalPopupClose("#pop_cushion_recom_result02");
						modalPopupClose("#pop_cushion_recom_result03");
						modalPopupClose("#pop_cushion_recom_result04");
						modalPopupClose("#pop_cushion_recom_result05");
						
						showMessageBox({
							message : "쿠폰이 발급되었습니다."
							, close : function(){
								location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_coupon_list.do";
							}
						});
						coupon = false;
					}else{
						modalPopupClose("#pop_cushion_recom_result01");
						modalPopupClose("#pop_cushion_recom_result02");
						modalPopupClose("#pop_cushion_recom_result03");
						modalPopupClose("#pop_cushion_recom_result04");
						modalPopupClose("#pop_cushion_recom_result05");
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
						coupon = false;
					}
				}
					
			});
		}
	}
};