/**
 * 모바일 1:1상담 내역의 이벤트 처리를 위한 Javascript
 */

var MobileMyDirectList = {
	name : 'MobileMyDirectList',
	init : function(){
		
		MobileMyDirectList.fn.setSubMenuChange();
		MobileMyDirectList.fn.getCounselList("0001");
		MobileMyDirectList.fn.getCounselList("0002");
		
		$(".counselList").show();
	},
	
	fn : {
		/**
		 * 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_ROOT + "mobile/my/" + $(this).val() + ".do";
			});
		},
		
		addBtnEvent : function(){
			
			$(".a_goApp_sns").unbind("click").click(function(event){
				event.preventDefault();
				var url = "http://www.amorepacificmall.com/mobile/my/mobile_my_direct_list.do?i_sFlagSnsBrowser=Y";

				location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
			});
			
			var $question = $('.question .ttl a');
            var $answer = $('.answer');

            $question.unbind("click").click(function(){
                var chk = $(this).parent().parent().next('.answer').css('display');
                $answer.hide();

                if( chk == 'none' ) {
                    $(this).parent().parent().next('.answer').show();
                };
                return false;
            });
            
            $(".btn_appraisal").unbind("click").click(function(event){
            	event.preventDefault();
            	
            	var id    = $(this).find("a").attr("id");
            	modalPopup('#counseReview');
            	MobileMyDirectList.fn.appraisePop(id);
            });
            
            /* 상담평가하기 등록 버튼*/
            $("#regComment").unbind("click").click(function(event){
            	event.preventDefault();
            	
    			var commentyn 	= $("input:radio[name='i_sAppraiseYn']:checked").val();
    			var comment		= $("textarea[name='i_sAppraiseCmt']").val();
    			var commentlen  = comment.length;
    			var counselcd 	= $("input[name='i_sCounselcd']").val();
    			
    			if(commentyn == "N" && commentlen < 10){
					// 불만족 사유 필수(최소 10자 이상 입력)
    				$("#i_sAppraiseCmt").addClass("error");
    				$(".em_reason").show();
    				
    			} else{
    				$("#i_sAppraiseCmt").removeClass("error");
    				$(".em_reason").hide();
            		MobileMyDirectList.fn.goRegComment(commentyn, comment, counselcd);
            	}
            	
            });
            
            $(".bnt_counsel_more_0002").unbind("click").click(function(event){
            	event.preventDefault();
            	// 미해결 리스트 더보기
            	$("#i_sStatuscd").val("0002");
            	$("#i_iNowPageNo_0002").val(parseInt($("#i_iNowPageNo_0002").val(), 10) + 1);
            	
            	MobileMyDirectList.fn.getCounselList("0002");
            	
            });
            
            $(".bnt_counsel_more_0001").unbind("click").click(function(event){
            	event.preventDefault();
            	// 답변 완료 리스트 더보기
            	$("#i_sStatuscd").val("0001");
            	$("#i_iNowPageNo_0001").val(parseInt($("#i_iNowPageNo_0001").val(), 10) + 1);
            	
            	MobileMyDirectList.fn.getCounselList("0001");
            	
            });
            
		},
		
		appraisePop : function(counselcd){
			$("input[name='i_sCounselcd']").val(counselcd);
			$(".em_reason").hide();
            $("#i_sAppraiseCmt").removeClass("error");
            $("#i_sAppraiseCmt").val("");
            $(':radio[name="i_sAppraiseYn"]').change(function() {
                var category = $(this).filter(':checked').val();
                if ( category == "Y" ){
                    $("textarea").hide();
                    $(".em_reason").hide();
                    $("#i_sAppraiseCmt").removeClass("error");
                } else if ( category == "N" ) {
                    $("textarea").show();
                }
            });
		},
		
		getCounselList : function(i_sStatuscd){
			
			MobileCommon.ajax({
				url 	:  GLOBAL_WEB_ROOT + "mobile/my/mobile_my_direct_list_ajax.do",
				type 	: "post",
        		dataType: "json",
        		animation : false,
        		async : false,
        		data	: {   i_sStatuscd  : i_sStatuscd
        					, i_iNowPageNo : $("#i_iNowPageNo_"+i_sStatuscd).val()	},
        		success : function (data, textStatus, jqXHR){
        			if(data.status=="succ"){
        				console.log(data);
        				MobileMyDirectList.fn.ShowList(i_sStatuscd, data.object.counsel);
        			}
        			else if(data.status == "fail"){
        				//리스트 없음
        				MobileMyDirectList.fn.setListCount(0, 0);
        			}
        		}
        	});
				
		},
		
		ShowList : function(statuscd, object){
			
			if(statuscd == "0001"){
				var list_answer = object.list;
				var thumblist = object.imgList;
				
				if(list_answer && (0 < list_answer.length)){
					for(var i=0 ; i<list_answer.length ; i++){
						
						var arrQ = Array();
							
						arrQ.push("<li>");
						arrQ.push("<div class='question'>");
						arrQ.push("<p class='ttl'><a href='#none'>"+list_answer[i].v_counsel_title+"</a></p>");
						arrQ.push("<p class='date'>"+changeDatePatten(list_answer[i].v_reg_dtm)+"</p>");
						
						if(list_answer[i].v_appraisalcd == null || list_answer[i].v_appraisalcd == 'E'){
							
							arrQ.push("<span class='btn_ty v4 btn_appraisal'><a href='#' id='"+list_answer[i].v_counselcd+"'>상담에 만족하세요?</a></span>");
							arrQ.push("<div class='state'>");
							arrQ.push("    <span class='sp_counsel c3'>답변완료</span>");
							arrQ.push("</div>");
						}
						else if(list_answer[i].v_appraisalcd == 'N'){
							arrQ.push("<span style='display:inline-block;'></span>");
							arrQ.push("<div class='state'>");
							arrQ.push("    <span class='sp_counsel c4'>상담평가완료</span>");
							arrQ.push("</div>");							
						}
						else if(list_answer[i].v_appraisalcd == 'Y'){
							arrQ.push("<span style='display:inline-block;'></span>");
							arrQ.push("<div class='state'>");
							arrQ.push("    <span class='sp_counsel c5'>상담평가완료</span>");
							arrQ.push("</div>");							
						}
						arrQ.push("</div>");
						arrQ.push("<div class='answer'>");
						
						arrQ.push("		<div class='cnt q'>");
						arrQ.push("		<span class='mark'>Q</span>");
						var message = list_answer[i].v_counsel_content;
						for(var j=0; j < thumblist.length; j++){
							if(thumblist[j].v_recordid == list_answer[i].v_counselcd){
								var imgurl = thumblist[j].v_image_path;
								
								message = message.replace(thumblist[j].v_buffer1, "<img src="+imgurl+"/><br/>");
							}
						}
						arrQ.push("		<div>"+message+"</div>");
						arrQ.push("		<p class='date'>"+changeDateHour(list_answer[i].v_reg_dtm)+"</p>");
						arrQ.push("</div>");
						arrQ.push("<div class='cnt a'>");
						arrQ.push("		<span class='mark'>A</span>");
						arrQ.push("		<div>"+list_answer[i].v_reply_title+'<br/>'+list_answer[i].v_reply_content+"</div>");
						arrQ.push("		<p class='date'>"+changeDateHour(list_answer[i].v_reply_dtm)+"</p>");
						arrQ.push("</div>");
						arrQ.push("</div>");
						arrQ.push("</li>");

						$(arrQ.join("\n")).appendTo($("#view2"));
					}
				}
			}
			if(statuscd == "0002"){
				var list_noanswer = object.list;
				var thumblist = object.imgList;
				
				if(list_noanswer && (list_noanswer.length > 0)){
					for(var i=0 ; i<list_noanswer.length ; i++){
						var emailflag 	= "";
						var smsflag		= "";
						var arrN = Array();
						
						arrN.push("<li>");
						arrN.push("<div class='question'>");
						arrN.push("<p class='ttl ' ><a href='#none'>"+list_noanswer[i].v_counsel_title+"</a></p>");
						arrN.push("<p class='date'>"+changeDatePatten(list_noanswer[i].v_reg_dtm)+"</p>");
						arrN.push("<p class='result'>");
						arrN.push("<span class='tit'>결과 알림 : </span>");
						
						if(list_noanswer[i].v_emailyn == "Y"){
							emailflag = "이메일 수신";
						} else {
							emailflag = "이메일 수신거부";
						}
							
						if(list_noanswer[i].v_smsyn == "Y"){
							smsflag = "SMS 수신";
						} else {
							smsflag = " SMS 수신거부";
						}
							
						arrN.push("<span class='txt'>"+smsflag+", "+emailflag+"</span>");
						arrN.push("</p>");
						
						if(list_noanswer[i].v_status == "0002"){
							arrN.push("<div class='state'>");
							arrN.push("<span class='sp_counsel c1'>미확인</span>");
							arrN.push("</div>");
							
						} 
						else if(list_noanswer[i].v_status == "0003"){
							arrN.push("<div class='state'>");
							arrN.push("<span class='sp_counsel c2'>답변준비중</span>");
							arrN.push("</div>");
						}
						arrN.push("</div>");

						arrN.push("<div class='answer'>");
						arrN.push("<div class='cnt q'>");
						arrN.push("    <span class='mark'>Q</span>");
						
						var message = list_noanswer[i].v_counsel_content;
						for(var j=0; j < thumblist.length; j++){
							if(thumblist[j].v_recordid == list_noanswer[i].v_counselcd){
								var imgurl = thumblist[j].v_image_path;
								imgurl = imgurl.replace('_98', '_500');
								message = message.replace(thumblist[j].v_buffer1, "<img src="+imgurl+"><br/>");
							}
						}
						arrN.push("    <div>"+message+"</div>");
						arrN.push("    <p class='date'>"+changeDateHour(list_noanswer[i].v_reg_dtm)+"</p>");
						arrN.push("</div>");
						arrN.push("</div>");
						arrN.push("</li>");
						
						$(arrN.join("\n")).appendTo($("#view1"));
					}
				}
			}
			MobileMyDirectList.fn.setListCount(statuscd, object.page.i_iRecordCnt);
			
			if(parseInt(object.page.i_iNowPageNo) >= parseInt(object.page.i_iTotalPageCnt)){
				$(".bnt_counsel_more_"+statuscd).hide();
			} else{
				$(".bnt_counsel_more_"+statuscd).show();
			}
			
			MobileMyDirectList.fn.addBtnEvent();
		},
		
		goRegComment : function(commentyn, comment, counselcd){
			MobileCommon.ajax({
				url		 :  GLOBAL_WEB_ROOT + "mobile/my/mobile_my_direct_appraise_save_ajax.do",
				dataType : "json",
				type	 : "post",
				animation : false,
				async	: false,
				data	 : { i_sAppraisalcd : commentyn,
							 i_sAppraiseCmt : comment,
							 i_sCounselcd 	: counselcd },
				success  : function(data, textStatus, jqXHR){
					if(data.status == 'succ'){
						
						modalPopupClose('#counseReview');
						location.href = GLOBAL_SSL_URL+"mobile/my/mobile_my_direct_list.do";
					}
				
				}
				
			});
		},
		
		setListCount : function(statuscd, count){
			if(statuscd == "0001"){
				if(count == 0){
					$("#nodata2").show();
				} 
				$("#count_answer").html(count);
				
			}
			if(statuscd == "0002"){
				if(count == 0){
					$("#nodata1").show();
				} 
				$("#count_no_answer").html(count);
				
			}
		}
	}
};