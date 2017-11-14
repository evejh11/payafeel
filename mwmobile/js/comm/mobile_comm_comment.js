var i_sFlagEventRereply = "Y";
var i_sFlagRegAppForm      = "";
var i_sFlagRegMobileForm      = "";
var i_sFlagRegPcForm      = "";

var MobileComment = {
	init : function() {
		//MobileComment.fn.initRegForm();
	},
	upPhotoCnt : 1,
	fn : {
		// 입력폼 초기화
		initRegForm : function () {
			var ul = $("#ul_upload_image");
			var arrLi = $(".li_upload_image", ul);
			var len = arrLi.length;
			var imgNumber = $(".number", arrLi.eq(len - 1)).text().substr(7, 2);
			
			MobileComment.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			// 댓글쓰기 이미지 업로드
			jfupload.initImageUpload({
				target : $(".inp_photo_upload").eq(0)
				, uploadCd : "CMC_REPLY"		// uploadCd
				, formName : "frm_comment"			// form name
				, thumbnailWidth : "100;320;680;500" // thumbnail 필요할 경우
				, thumbnailHeight : "100;0;0;0"
				, index : 0
				, success : function(imgData, uploadCd) {
					MobileComment.fn.appendUploadImage(imgData, uploadCd, 0);
				}
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$(".inp_photo_upload").eq(0).click(function(event) {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "CMC_REPLY"
								, thumbnailWidth	: "100;320;680;500"
								, thumbnailHeight	: "100;0;0;0"
								, flagFixed 		: "N"
								, callback			: "MobileComment.fn.appendUploadImageApp"
								, idx				: "0"
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_REPLY", "100;320;680;500", "100;0;0;0", "N", "MobileComment.fn.appendUploadImageApp", "0");
						}
					} catch (e) {}
				});
			}
			
			MobileComment.fn.addBtnEvent();
		},
		appendUploadImageApp : function (imgData, uploadCd, idx) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm_comment", "R");
			
			MobileComment.fn.appendUploadImage(imgData, uploadCd, idx);
		},
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd, idx) {
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_100" + imgData.v_thumbnail_ext;
			var ul = $(".ul_upload_image").eq(idx);
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var imgNumber = "[image#01]";
			$(".li_upload_image", ul).not(":first").remove();
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
			
			inp.appendTo(div);
			
			$(".div_thumbnail").each(function() {
				var id = $(this).attr("id").replace("div_", "");
				
				if(id != imgData.v_thumbnail_id) {
					jfupload.deleteImage(id, "CMC_REPLY", "frm_comment");
				}
			});
			
			$(".div_thumbnail").not($("#div_" + imgData.v_thumbnail_id)).remove();
		},
		addBtnEvent : function() {
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				
				showConfirmBox({
					message : "이미지를 삭제하시겠습니까?"
					, ok_func : function() {
						var imgNumber = $(".number", li).text();
						var thumbnailId = li.attr("id").replace("li_", "");
						var idx = $(".photoList").index(li.parent());
						
						li.remove();
						
						jfupload.deleteImage(thumbnailId, "CMC_REPLY", "frm_comment");
					}
				});
				
			});
			
			// 댓글 더보기
			$(".btn_comment_more").unbind("click").click(function(event) {
				event.preventDefault();
				var frm_comment = $("form[name='frm_comment']");
				var nowpage = parseInt($("input[name='i_iNowPageNo']", frm_comment).val())+1;
				var recordid = $("input[name='i_sRecordid']").val();
				var tablenm = $("input[name='i_sTable']", frm_comment).val();
				
				MobileComment.fn.getInit(recordid, nowpage, tablenm, "", "");
			});
			
				if(GLOBAL_MOBILE_APP == 'APP'){
					if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
						window.location="apjscall://jsSetWhiteColorStatusBar";
					}else if (GLOBAL_MOBILE_OS == 'AND') {
						
					}
				}
			
			// 댓굴 수정
			$(".btn_modi_comm").unbind("click").click(function(event) {
				event.preventDefault();
				// 버튼영역 인덱스
				var idx = $(".div_btnArea").index($(this).parent());
				
				if($(".div_modi_area", ".div_contArea").length == 0) {
					
					var replycd = $(".input_replycd").eq(idx).val();
					var comment = $(".input_comment").eq(idx).val();
					
					var div = $(".div_modi_area").eq(0).clone(true); // 숨겨놓은 입력 폼 clone
					
					// 값 세팅, 버튼 disabled 풀어줌
					$(".i_sReplycd", div).val(replycd);
					$(".i_sComment", div).val(comment);
					
					$(".span_textLength>em", div).text(comment.length);
					$(".btn_rep", div).prop("disabled", false);
					
					// 수정할 내용의 영역에 append
					div.appendTo($(".div_contArea").eq(idx)).show();
					
					// 버튼 숨김, 보임 제어
					$(".btn_del_comm", $(this).parent()).hide();
					$(".btn_modi_cancel", $(this).parent()).show();
					
					// 숨겨놓은 입력 폼 clone한 것에 업로드 추가
					var idx = $(".inp_photo_upload").index($(".inp_photo_upload", div));
					jfupload.initImageUpload({
						target : $(".inp_photo_upload", div)
						, uploadCd : "CMC_REPLY"		// uploadCd
						, formName : "frm_comment"			// form name
						, thumbnailWidth : "100;320;680;500" // thumbnail 필요할 경우
					    , thumbnailHeight : "100;0;0;0"
					    , index : idx
						, success : function(imgData, uploadCd) {
							MobileComment.fn.appendUploadImage(imgData, uploadCd, idx);
						}
					});
					
					if (GLOBAL_MOBILE_APP == "APP") {
						$(".inp_photo_upload", div).click(function(event) {
							try {
								var idx = $(".inp_photo_upload").index($(this));
								if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
									event.preventDefault();
									window.webkit.messageHandlers.photo.postMessage({
										uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
										, uploadCd			: "CMC_REPLY"
										, thumbnailWidth	: "100;320;680;500"
										, thumbnailHeight	: "100;0;0;0"
										, flagFixed 		: "N"
										, callback			: "MobileComment.fn.appendUploadImageApp"
										, idx				: "" + idx
									});
								}
								else {
									window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_REPLY", "100;320;680;500", "100;0;0;0", "N", "MobileComment.fn.appendUploadImageApp", "" + idx);
								}
							} catch (e) {}
						});
					}
					
					// 수정할 내용 이미지 ajax로 불러옴
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_content_img_list_ajax.do"
						, dataType : "json"
						, data : {
							i_sRecordid : replycd
						}
						, animation : false
						, async : false
						, success : function(data, textStatus) {
							var list = data.object;
							var ul = $(".ul_upload_image").eq(idx);
							
							if(list != undefined && list.length > 0) {
								// 불러온 이미지 셋팅
								for(var i=0; i<list.length; i++) {
									var imgData = list[i];
									var li = $(".li_upload_image", ul).eq(0).clone(true);
									var url = imgData.v_image_path;
									var imgNumber = imgData.v_buffer1;
									
									$(".img_upload_image", li).prop("src", url);
									$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
									$(".number", li).text(imgNumber);
									
									li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
									
									jfupload.makeImageUploadTag(imgData, "CMC_REPLY", "frm_comment", "M");
								
									var div 	= $("#div_" + imgData.v_thumbnail_id);
									var inp 	= $("<input/>").prop({"type" : "hidden", "name" : "CMC_TALK_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
									inp.appendTo(div);
									
									$(".div_thumbnail").not($("#div_" + imgData.v_thumbnail_id)).remove();
								}
							}
						}
					});
				}
			});
			
			// 내용 입력 textarea 문자 길이
			$(".i_sComment").unbind("keydown").keydown(function() {
				var idx = $(".i_sComment").index($(this));
				
				var text = $(this).val();
				text = EmptyReplace(text);
				var length = text.length;
				
				if(length > 200) {
					$(".span_textLength>em").eq(idx).html("<font color=\"red\">"+length+"</font>");
				} else {
					$(".span_textLength>em").eq(idx).html(length);
				}
				
				if(length < 10) {
					$(".btn_rep").eq(idx).attr("disabled", false);
					$(".em_textMessage").eq(idx).show();
				} else {
					$(".btn_rep").eq(idx).attr("disabled", false);
					$(".em_textMessage").eq(idx).hide();
				}
			});
			$(".i_sComment").click(function() {
				if(!IS_LOGIN) {
					var options = {
						type : "reload"
					};
					
					MobileBodyStart.fnLoginCheck(options);
				}
			});
			
			// 취소 버튼 클릭 시
			$(".btn_modi_cancel").unbind("click").click(function(event) {
				event.preventDefault();
				// 버튼 영역 인덱스
				var idx = $(".div_btnArea").index($(this).parent());
				
				// 수정영역 붙여준 것 remove
				var target = $(".div_contArea").eq(idx);
				$(".div_modi_area", target).remove();
				
				// 버튼 숨김, 보임 제어
				$(".btn_del_comm", $(this).parent()).show();
				$(".btn_modi_cancel", $(this).parent()).hide();
			});
			
			$(".inp_photo_upload2").unbind("click").click(function() {
				// 업로드
				var upload_idx = $(".inp_photo_upload").index(this);
				
				jfupload.initImageUpload({
					target : $(this)
					, uploadCd : "CMC_REPLY"		// uploadCd
					, formName : "frm_comment"			// form name
					, thumbnailWidth : "100;320;680;500" // thumbnail 필요할 경우
					, thumbnailHeight : "100;0;0;0"
					, index : upload_idx
					, success : function(imgData, uploadCd) {
						MobileComment.fn.appendUploadImage(imgData, uploadCd, upload_idx);
					}
				});
				
				if (GLOBAL_MOBILE_APP == "APP") {
					$(this).click(function(event) {
						try {
							if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
								event.preventDefault();
								window.webkit.messageHandlers.photo.postMessage({
									uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
									, uploadCd			: "CMC_REPLY"
									, thumbnailWidth	: "100;320;680;500"
									, thumbnailHeight	: "100;0;0;0"
									, flagFixed 		: "N"
									, callback			: "MobileComment.fn.appendUploadImageApp"
									, idx				: "" + upload_idx
								});
							}
							else {
								window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_REPLY", "100;320;680;500", "100;0;0;0", "N", "MobileComment.fn.appendUploadImageApp", "" + upload_idx);
							}
						} catch (e) {}
					});
				}
				
				
			});
			
			// 올리기 버튼
			$(".btn_rep").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				var idx = $(".btn_rep").index($(this));
				if(id == "comment_reg"){
					// 댓글 등록전에 체크로직이 필요할 경우 사용하는 function
					var beforeFunction = undefined;
					try {
						beforeFunction = cmBeforeEvntComment;
						
					} catch (e) {}
					
					if (typeof beforeFunction == "function") {
						beforeFunction($(this), id);
					} else {
						MobileComment.fn.doWritePrc($(this), id);
					}
				} else{
					MobileComment.fn.goCommentSave(id, idx);
				}
			});
			
			// 글 삭제
			$(".btn_del_comm").unbind("click").click(function(event) {
				event.preventDefault();
				var idx = $(".div_btnArea").index($(this).parent());
				
				var message = "글을 삭제하실 경우 적립된 블루리본포인트도 차감되어요.<br/>정말 삭제하시겠어요?";
				
				if($("#i_sFlagEvent").val() == "Y") {
					message = "삭제하시겠어요?";
				}
				
				if($("#i_sFlagEvent").val() == "Y" && $("input[name='i_sRecordid']").val() == "EVT20160901_71st"){
					message = "삭제하시겠어요?<br/>삭제하시면 지급된 100P가 차감됩니다.";
				}
				showConfirmBox({
					message : message
					, ok_func : function() {
						MobileComment.fn.goCommentSave("del", idx);
					}
				});
					
			});
			
			// 신고
			$(".btn_report_reply").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				var frm = document.frm;
				$("input[name='i_sReportcont']",frm).val(id);
				$("input[name='i_sTable']",frm).val("CMC_REPLY");
				var returnUrl = $("input[name='i_sReturnUrl']",frm).val();
				if($("input[name='i_sUserid']").val()==""){
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								MobileBodyStart.goLogin(returnUrl);
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								MobileBodyStart.goLogin(returnUrl);
							}
						});
					}

				}else{
					location.href = GLOBAL_WEB_URL +"mobile/cmnt/mobile_cmnt_cmc_report.do?i_sReportcont="+id+"&i_sTable=CMC_REPLY&i_sReturnUrl="+returnUrl;
				}
				
			});
			
			// 대댓글 보기
			$(".btn_reply").unbind("click").click(function(event){
				  event.preventDefault();
                var chk = $(this).hasClass("active");
                if ( chk == false){
                    $(this).next(".replyArea").show();
                    $(this).addClass("active");
                } else {
                    $(this).next(".replyArea").hide();
                    $(this).removeClass("active");
                }
               
                $(".div_modi_area", ".div_contArea").remove();
            });
			
			// 댓글쓰기 버튼 클릭 시 입력 폼 보임
			 $(".btn_commentWrite").unbind("click").click(function(event){
			 	event.preventDefault();
			 	if(GLOBAL_MOBILE_APP == "APP"){
			 		if(i_sFlagRegAppForm == "N"){
			 			if(i_sFlagRegMobileForm == "Y" && i_sFlagRegPcForm == "Y"){
			 				showMessageBox({ message : "선택하신 이벤트는 모바일웹과 PC에서만 댓글을 등록할 수 있어요."});
			 			}else if(i_sFlagRegMobileForm == "N" && i_sFlagRegPcForm == "Y"){
			 				showMessageBox({ message : "선택하신 이벤트는 PC에서만 댓글을 등록할 수 있어요."});
			 			}else if(i_sFlagRegMobileForm == "Y" && i_sFlagRegPcForm == "N"){
			 				showMessageBox({ message : "선택하신 이벤트는 모바일웹에서만 댓글을 등록할 수 있어요."});
			 			}
			 		}else{
			 			$(".cmtWriteBox").eq(0).show();
			 		}
			 	}else{
			 		if(i_sFlagRegMobileForm == "N"){
			 			if(i_sFlagRegAppForm == "Y" && i_sFlagRegPcForm == "Y"){
			 				showMessageBox({ message : "선택하신 이벤트는 앱과 PC에서만 댓글을 등록할 수 있어요."});
			 			}else if(i_sFlagRegAppForm == "N" && i_sFlagRegPcForm == "Y"){
			 				showMessageBox({ message : "선택하신 이벤트는 PC에서만 댓글을 등록할 수 있어요."});
			 			}else if(i_sFlagRegAppForm == "Y" && i_sFlagRegPcForm == "N"){
			 				showMessageBox({ message : "선택하신 이벤트는 앱에서만 댓글을 등록할 수 있어요."});
			 			}
			 		}else{
			 			$(".cmtWriteBox").eq(0).show();
			 		}
			 	}
			 	
			    jfupload.initImageUpload({
				 	target : $(".inp_photo_upload").eq(0)
				 	, uploadCd : "CMC_REPLY"		// uploadCd
				 	, formName : "frm_comment"			// form name
				 	, thumbnailWidth : "100;320;680;500" // thumbnail 필요할 경우
				 	, thumbnailHeight : "100;0;0;0"
				 	, index : 0
				 	, success : function(imgData, uploadCd) {
				 		MobileComment.fn.appendUploadImage(imgData, uploadCd, 0);
				 	}
				});
			     
			    if (GLOBAL_MOBILE_APP == "APP") {
			    	$(".inp_photo_upload").eq(0).click(function(event) {
						try {
							if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
								event.preventDefault();
								window.webkit.messageHandlers.photo.postMessage({
									uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
									, uploadCd			: "CMC_REPLY"
									, thumbnailWidth	: "100;320;680;500"
									, thumbnailHeight	: "100;0;0;0"
									, flagFixed 		: "N"
									, callback			: "MobileComment.fn.appendUploadImageApp"
									, idx				: "0"
								});
							}
							else {
								window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_REPLY", "100;320;680;500", "100;0;0;0", "N", "MobileComment.fn.appendUploadImageApp", "0");
							}
						} catch (e) {}
					});
			    }
			     
			     
			     return false;
			 });
			 
			 // 뷰티 프로파일
			  $(".btn_beautyProfile").unbind("click").click(function(event){
				  event.preventDefault();
				  var id = $(this).attr("id");
				  MobileBeautyProfile.fn.addPopupBtnEvent(id);
			   });
			  
			//sns연동
/*				$(".btn_fb").unbind("click").click(function(event){
					event.preventDefault();
					MobileComment.fn.fnConnect($(this),"facebook");
				});

				$(".btn_tw").unbind("click").click(function(event){
					event.preventDefault();
					MobileComment.fn.fnConnect($(this),"twitter");
				});*/
				
				var twId = $("input[name='i_sTwToken']").val();
				if(twId != ""){
					$(".s_twitter").addClass("on");
				}
				var fbId = $("input[name='i_sFbToken']").val();
				if(fbId != ""){
					$(".s_facebook").addClass("on");
				}
		},
		fbConnection : function(){

			var fbUrl = $("input[name='i_sFbConnectUrl']").val();

			window.open(fbUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');
		}
		,twConnection : function(){

			var twUrl = $("input[name='i_sTwConnectUrl']").val();

			window.open(twUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');

		}
		,fnDisConnect : function(flag) {

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"sns/sns_disconnect.do"
				, type : "post"
					, dataType : "json"
						, data : {i_sFlagType : flag}
			, animation : false
			, success : function(json) {
				if(json.status == "succ") {
					location.href = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
				}else{
					showMessageBox({
						message : json.message
					});
				}
			}
			});
		},

		fnConnect : function(obj,flag){

			var parentObj	= obj.parents(".s_"+flag);
			var message     = "";
			var flagType	= "";

			if(flag == "twitter"){
				message		= "트위터";
				snsname 	= "twitter ";//공백있어야함
				flagType	= "TW";
			}else{
				message		= "페이스북";
				snsname 	= "facebook ";//공백있어야함
				flagType	= "FB";
			}

			if($("input[name='i_sUserid']").val()==""){
				if(IS_LOGIN_SNS){
					showConfirmBox({
						message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
							MobileBodyStart.goLogin(returnUrl);
						}
					    , cancel_func: function(){
							return ;
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
							MobileBodyStart.goLogin(returnUrl);
						}
					});
				}

			}else{

				if(parentObj.hasClass("active")){

					showConfirmBox({

						message : message + " 공유를 하지 않으시겠습니까??"
						,ok_func : function(){
							if(message == "페이스북"){
								$(".s_facebook").removeClass("active").removeClass("on");
								$("input[name='i_sFboff']").val("Y");
							}else{
								$(".s_twitter").removeClass("active").removeClass("on");
								$("input[name='i_sTwoff']").val("Y");
							}
							
							
						},cancel_func : function(){

						}
					});

				}else{
					var snstk = parentObj.attr("id");
					if(snstk == snsname){
						showConfirmBox({

							message : message + " 연동을 하시겠습니까?"
							,ok_func : function(){
								if(flag == "twitter"){
									MobileComment.fn.twConnection();										
								}else{
									MobileComment.fn.fbConnection();
								}
							},cancel_func : function(){


							}
						});
					}else{
						showConfirmBox({

							message : message + " 공유를 하시겠습니까?"
							,ok_func : function(){
								if(message == "페이스북"){
									$(".s_facebook").addClass("active").addClass("on");
									$("input[name='i_sFboff']").val("N");
								}else{
									$(".s_twitter").addClass("active").addClass("on");
									$("input[name='i_sTwoff']").val("N");
								}
							},cancel_func : function(){


							}
						});
					}

				}						
			} 

		},
		
		// 댓글 init
		getInit : function(recordid, i_iNowPageNo, tablenm, snsflag, i_sEvtCategorycd) {
			if(snsflag != "Y"){
				$(".commentsocial").hide();
			}
			if(recordid == "EVT20160901_71st"){
				$(".btn_reply").hide();
			}
			$("input[name='i_sTable']").val(tablenm);
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_comment_list_ajax.do",
				type : "post",
				data : {
					i_sRecordid : recordid
					, i_iNowPageNo : i_iNowPageNo
					, i_sEvtCategorycd : i_sEvtCategorycd
				},
				dataType : "json",
				animation : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						if(data.object != undefined) {
							$("input[name='i_sRecordid']").val(recordid);
							$("input[name='i_sTable']", "#frm_comment").val(tablenm);
							$("input[name='i_sEvtCategorycd']").val(i_sEvtCategorycd);
							MobileComment.fn.setCommentList(data.object);
							MobileComment.fn.addBtnEvent();
							if(recordid == "EVT20140901"){
								i_sFlagRereply = "N";
								i_sFlagRegAppForm = "Y";
								i_sFlagRegMobileForm = "N";
								i_sFlagRegPcForm = "N";
							}else{
								i_sFlagRereply = "Y";
								i_sFlagRegAppForm = "Y";
								i_sFlagRegMobileForm = "Y";
								i_sFlagRegPcForm = "Y";
							}
							if(i_sFlagRereply == "N"){
								$(".btn_reply").hide();
							}
						}
					} else {
						showMessageBox({
							message : data.message							
						});
					}
				}
			});
		},
		
		// 댓글 내용 set
		setCommentList : function(object) {
			var page = object.page;
			var comment = object.list;
			var recomment = object.relist;
			var imglist = object.imglist;
			var cmntLevel = object.cmntLevel;
			var shoppingLevel = object.shoppingLevel;
			// 댓글 갯수
			var commentCnt = parseInt(page.i_iRecordCnt == undefined ? "0" : page.i_iRecordCnt) + parseInt(object.reCount == undefined ? "0" : object.reCount);
			$(".span_commentCnt").text(SetNumComma(commentCnt));
			if($("input[name='i_sTable']").val()=="CMC_EVENT_MEMO"){
				$(".comment").text(SetNumComma(commentCnt));
			}
			// 페이징 set
			var frm_comment = $("form[name='frm_comment']");
			
			$("input[name='i_iNowPageNo']", frm_comment).val(page.i_iNowPageNo);
			$("input[name='i_iRecordCnt']", frm_comment).val(page.i_iRecordCnt);
			$("input[name='i_iTotalPageCnt']", frm_comment).val(page.i_iTotalPageCnt);
			
			var userid=$("input[name='i_sUserid']",frm).val();
			var ul = $("#commentList");
			
			if(cmntLevel == "CZ_L005" || shoppingLevel == "LV14") {
				$("textarea", ".divTextArea").attr("disabled", true);
			}
			
			// 댓글
			if(comment != undefined && comment.length > 0) {
				for(var i=0; i<comment.length; i++) {
					var list = comment[i];
					
					var li = $(".li_comment_list").eq(0).clone(true); //숨겨놓은 댓글 영역 clone
					$(".ico_memberLevel", li).removeClass("m1"); //댓글 작성자 레벨css
					$(".ico_memberLevel", li).addClass("m"+list.n_levelno); //댓글 작성자 레벨css
					$(".ico_communityLevel", li).addClass("c"+list.v_cmt_levelno); //댓글 작성자 커뮤니티레벨css
					$(".btn_beautyProfile", li).attr("id",list.v_reg_userid);
					
					// 뷰티프로파일 없으면 삭제
					if(parseInt(list.n_bprofile) <= 0) { 
						$(".btn_beautyProfile", li).remove();
					} 
					
					var nickname = "";
					
					// 닉네임 set
					if(list.v_nickname != "" && list.v_nickname != undefined ) {
						nickname = list.v_nickname;
					} else {
						nickname = getStringReverseHidden(list.v_reg_userid,3);
					}
					
					if(list.v_reg_type == "ADMIN"){
						if(list.v_reg_userid.toUpperCase() !="AP491594"){
							nickname = "운영자";
						}else{
							nickname = "관리자";
						}
					}
					
					$(".span_nickname", li).text(nickname);
					
					var contents = list.v_contents.replace("[image#01]", "");
					var imageUrl = "";
					// 삭제된 댓글일 경우 수정, 삭제 버튼 없애기, 내용 '삭제된 댓글입니다' 로 바꿈
					if(list.v_flag_del == "Y") {
						contents = "<font color=\"#aaaaaa\">삭제된 댓글입니다.</font>";
						
						$(".btn_modi_comm", li).remove();
						$(".btn_del_comm", li).remove();
						
						// 대댓글작성 영역 remove
						$(".replyArea>.cmtWriteBox", li).remove();
						
						$(".input_comment", li).val("");
					}else if(list.v_flag_del == "B"){
						contents = "<font color=\"#aaaaaa\">관리자에의해 규제된 글입니다.</font>";
						
						$(".btn_modi_comm", li).remove();
						$(".btn_del_comm", li).remove();
						
						// 대댓글작성 영역 remove
						$(".replyArea>.cmtWriteBox", li).remove();
						
						$(".input_comment", li).val("");
					}else {
						// 댓글 이미지 있을 경우 댓글 내용에 이미지 추가
						
						if(imglist != undefined && imglist.length > 0) {
							for(var j=0; j<imglist.length; j++) {
								if(list.v_replycd == imglist[j].v_recordid) {
									if(list.v_reg_dtm.substring(0,8) >= 20151215){
										imageUrl = imglist[j].v_image_path.replace("_100", "_500");
									}else{
										imageUrl = imglist[j].v_image_path.replace("_100", "_680");
									}
								}
							}
						}
						
						// 내용 settig
						$(".input_comment", li).val(list.v_contents);
					}
					
					// 댓글 내용
					if(imageUrl != ""){
						if(list.v_reg_channel =="MOBILE" || list.v_reg_channel == "APP"){
							$(".div_comment", li).html("<img src='"+imageUrl+"'/><span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>"+contents);
						}else{
							$(".div_comment", li).html("<img src='"+imageUrl+"'/>"+contents);
						}
						
					}else{
						if(list.v_reg_channel =="MOBILE" || list.v_reg_channel == "APP"){
							$(".div_comment", li).html("<span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>"+contents);
						}else{
							$(".div_comment", li).html(contents);
						}
						
					}
					
					
					$(".div_contArea", li).attr("id", "div_" +  list.v_replycd);
					$(".span_date", li).text(changeTodayDate(list.v_reg_dtm));
					
					$(".div_pPhoto", li).html("<img src=\""+list.v_proimag_url+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"/>");
					
					// 대댓글 갯수
					$(".btn_reply", li).text("댓글의 댓글"+list.n_child_cnt+"개");
					
					// 제어를 위해 id 부여
					$(".replyList", li).attr("id", "ul_"+list.v_replycd);
					
					$(".inp_photo_upload", li).attr("id", "inp_photo_upload_"+(i+1));
					$(".inp_photo_upload", li).attr("name", "file_"+(i+1));
					$(".inp_photo_upload", li).addClass("inp_photo_upload2");
					
					$(".input_replycd", li).val(list.v_replycd);
					$(".input_ureplycd", li).val(list.v_replycd);
					

					
					// 버튼 제어
					if(userid == list.v_reg_userid) {
						$(".btn_report", li).remove();
					} else {
						$(".btn_modi_comm", li).remove();
						$(".btn_del_comm", li).remove();
						
						$(".btn_report_reply", li).attr("id", list.v_replycd);
					}
					
					li.appendTo(ul).show();
					
					// 대댓글
					if(recomment != undefined && recomment.length > 0) {
						for(var j=0; j<recomment.length; j++) {
							var list_recomment = recomment[j];
							
							if(list.v_replycd == list_recomment.v_ureplycd) {
								var ul_recomment = $($("#ul_"+list_recomment.v_ureplycd));
								
								var li_recomment = $(".li_recomment").eq(0).clone(true);
								$(".ico_memberLevel", li_recomment).addClass("m"+list_recomment.n_levelno);
								$(".ico_communityLevel", li_recomment).addClass("c"+list_recomment.v_cmt_levelno);
								$(".btn_beautyProfile", li_recomment).attr("id",list_recomment.v_reg_userid);
								
								if(parseInt(list_recomment.n_bprofile) <= 0) {
									$(".btn_beautyProfile", li_recomment).remove();
								} 
								
								var nickname = "";
								
								if(list_recomment.v_nickname != "" && list_recomment.v_nickname != undefined ) {
									nickname = list_recomment.v_nickname;
								} else {
									nickname = getStringReverseHidden(list_recomment.v_reg_userid,3);
								}
								
								if(list_recomment.v_reg_type == "ADMIN"){
									if(list_recomment.v_reg_userid.toUpperCase() != "AP491594"){
										nickname = "운영자";
									}else{
										nickname = "관리자";
									}
									
								}
								
								$(".span_nickname", li_recomment).text(nickname);
								
								if(list_recomment.v_proimag_url != undefined && list_recomment.v_proimag_url != "") {
									$(".div_pPhoto", li_recomment).html("<img src=\""+list_recomment.v_proimag_url+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"/>");
								} else {
									$(".div_pPhoto", li_recomment).html("<img src=\""+GLOBAL_IMG_URL+"common/non-userPhoto.jpg\" alt=\"\" onerror=\"fnNoImageUser(this);\"/>");
								}
								
								var recontents = list_recomment.v_contents.replace("[image#01]","");
								
								if(list_recomment.v_flag_del == "Y") {
									recontents = "<font color=\"#aaaaaa\">삭제된 댓글입니다.</font>";
									
									$(".btn_modi_comm", li_recomment).remove();
									$(".btn_del_comm", li_recomment).remove();
									
									$(".input_comment", li_recomment).val("");
								}else if(list_recomment.v_flag_del == "B"){
									recontents = "<font color=\"#aaaaaa\">관리자에의해 규제된 글입니다.</font>";
									
									$(".btn_modi_comm", li_recomment).remove();
									$(".btn_del_comm", li_recomment).remove();
									
									$(".input_comment", li_recomment).val("");
								}else {
									var imageUrl = "";
									if(imglist != undefined && imglist.length > 0) {
										for(var k=0; k<imglist.length; k++) {
											if(list_recomment.v_replycd == imglist[k].v_recordid) {
												if(list_recomment.v_reg_dtm.substring(0,8) >= 20151215){
													imageUrl = imglist[k].v_image_path.replace("_100", "_500");
												}else{
													imageUrl = imglist[k].v_image_path.replace("_100", "_680");
												}
											}
										}
									}
									
									$(".input_comment", li_recomment).val(list_recomment.v_contents);
									if(imageUrl != ""){
										if(list_recomment.v_reg_channel =="MOBILE" || list_recomment.v_reg_channel =="APP"){
											$(".div_comment", li_recomment).html("<img src='"+imageUrl+"'/><span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>"+recontents);
										}else{
											$(".div_comment", li_recomment).html("<img src='"+imageUrl+"'/>"+recontents);
										}
									}else{
										if(list_recomment.v_reg_channel =="MOBILE" || list_recomment.v_reg_channel =="APP"){
											$(".div_comment", li_recomment).html("<span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>"+recontents);
										}else{
											$(".div_comment", li_recomment).html(recontents);
										}
										
									}
								}
								
								$(".div_contArea", li_recomment).attr("id", "div_" +  list_recomment.v_replycd);
								
								$(".span_date", li_recomment).text(changeTodayDate(list_recomment.v_reg_dtm));
								
								$(".input_replycd", li_recomment).val(list_recomment.v_replycd);
								
								if(userid == list_recomment.v_reg_userid) {
									$(".btn_report", li_recomment).remove();
								} else {
									$(".btn_modi_comm", li_recomment).remove();
									$(".btn_del_comm", li_recomment).remove();
									
									$(".btn_report_reply", li_recomment).attr("id", list_recomment.v_replycd);
								}
								
								li_recomment.appendTo(ul_recomment).show();
							}
						}
					}
				}
			}
			
			if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
				$(".btn_comment_more").hide();
			} else {
				$(".btn_comment_more").show();
			}
		},
		goCommentSave : function(id, idx) {
			var parent = $(".btn_rep").eq(idx).parent();
			// 댓글 작성
			if(id == "comment_reg") {
				$(".input_ureplycd").attr("name", "");
				$(".i_sComment").attr("name", "");
				$(".i_sComment", parent).attr("name", "i_sComment");
				$("input[name='i_sFlagAction']").val("R");
				$("input[name='i_sEvtCategory']").val($("input[name='i_sEvtCategorycd']").val());
			// 대댓글 작성
			} else if(id =="recomment_reg") {
				$(".input_ureplycd").attr("name", "");
				$(".input_ureplycd", parent).attr("name", "i_sUreplycd");
				$(".i_sComment").attr("name", "");
				$(".i_sComment", parent).attr("name", "i_sComment");
				$("input[name='i_sFlagAction']").val("R");
				$("input[name='i_sEvtCategory']").val("");
			// 수정
			} else if(id == "modify"){
				$(".i_sReplycd", parent).attr("name", "i_sReplycd");
				$(".i_sComment").attr("name", "");
				$(".i_sComment", parent).attr("name", "i_sComment");
				$("input[name='i_sFlagAction']").val("M");
			// 삭제
			} else {
				var div = $(".div_contArea").eq(idx);
				$(".input_replycd").attr("name", "");
				$(".input_replycd", div).attr("name", "i_sReplycd");
				$("input[name='i_sFlagAction']").val("D");
			}
			if(MobileComment.fn.fnValidate(parent)) {
				// 저장 ajax
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_comment_save_ajax.do"
					, type : "POST"
					, data : $("form[name='frm_comment']").serialize()
					, dataType : "json"
					, async : false
					, animation : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							// 댓글후 처리할 로직이 있을경우 처리
							var afterFunction = undefined;
							try {
								afterFunction = cmAfterEvntComment;
							} catch (e) {}

							if (typeof afterFunction == "function" && id == "comment_reg") {
								cm_jquery_param.is_save = false;
								var realcd = data.object.replycd;
								afterFunction($("input[name='i_sFlagAction']").val(), idx, id, realcd);
							}
							else {
								MobileComment.fn.doWriteEndPrc($("input[name='i_sFlagAction']").val(), idx, id, data);
							}
						} else if(data.status == "isNotLogin") {
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										MobileBodyStart.goLoginPage();
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										MobileBodyStart.goLoginPage();
									}
								});
							}
						}else {
							showMessageBox({
								message : data.message
							});
						}
						MobileComment.fn.initRegForm();
					}
				});
			}
		},
		fnValidate : function(obj) {
			var flag = true;
			if($("input[name='i_sFlagAction']").val() != "D") {
				if(EmptyReplace($(".i_sComment", obj).val()).length < 10) {
					$(".em_textMessage", obj).text("최소 10자 이상 입력해주세요.");
					$(".em_textMessage", obj).show();
					
					flag = false;
				}else if(EmptyReplace($(".i_sComment", obj).val()).length > 200) {
					$(".em_textMessage", obj).text("최대 200자까지 입력하실 수 있습니다.");
					$(".em_textMessage", obj).show();
					
					flag = false;
				}else if(i_sFlagRegAppForm == "Y"){
			 		if(i_sFlagRegMobileForm == "N" && i_sFlagRegPcForm == "N"){
			 			if(GLOBAL_MOBILE_APP == "APP"){
			 				if($(".div_thumbnail").size() == 0){
								$(".em_textMessage", obj).text("사진을 등록해주세요");
								$(".em_textMessage", obj).show();
								//showMessageBox({ message : "사진을 등록해주세요."});
								flag = false;
			 				}
			 			}
			 		}
			 	}
			}
			
			return flag;
		},
		// 대댓글 작성 후 리스트 새로 불러옴
		getRecommentList : function(object, cnt) {
			var recomment = object.list;
			var imglist = object.imglist;
			$(".span_commentCnt").text(SetNumComma(cnt));
			
			if($("input[name='i_sTable']").val() == "CMC_EVENT_MEMO"){
				$(".comment").text(SetNumComma(cnt));
			}
			var userid=$("input[name='i_sUserid']",frm).val();
			if(recomment != undefined && recomment.length > 0) {
				for(var j=0; j<recomment.length; j++) {
					var list_recomment = recomment[j];
					
					var ul_recomment = $($("#ul_"+list_recomment.v_ureplycd));
					
					var li_recomment = $(".li_recomment").eq(0).clone(true);
					
					$(".ico_memberLevel", li_recomment).removeClass("m1");
					$(".ico_memberLevel", li_recomment).addClass("m"+list_recomment.n_levelno);
					$(".ico_communityLevel", li_recomment).addClass("c"+list_recomment.v_cmt_levelno);
					$(".btn_beautyProfile", li_recomment).attr("id",list_recomment.v_reg_userid);
					if(parseInt(list_recomment.n_bprofile) <= 0) {
						$(".btn_beautyProfile", li_recomment).remove();
					} 
					
					var nickname = "";
					
					if(list_recomment.v_nickname != "" && list_recomment.v_nickname != undefined) {
						nickname = list_recomment.v_nickname;
					} else {
						nickname = getStringReverseHidden(list_recomment.v_reg_userid,3);
					}
					
					$(".span_nickname", li_recomment).text(nickname);
					
					if(list_recomment.v_proimag_url != undefined && list_recomment.v_proimag_url != "") {
						$(".div_pPhoto", li_recomment).html("<img src=\""+list_recomment.v_proimag_url+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"/>");
					} else {
						$(".div_pPhoto", li_recomment).html("<img src=\""+GLOBAL_IMG_URL+"common/non-userPhoto.jpg\" alt=\"\" onerror=\"fnNoImageUser(this);\"/>");
					}
					var content = list_recomment.v_contents;
					
					if(list_recomment.v_flag_del == "Y") {
						content = "<font color=\"#aaaaaa\">삭제된 댓글입니다.</font>";
					} else {
						if(imglist != undefined && imglist.length > 0) {
							for(var i=0; i<imglist.length; i++) {
								if(list_recomment.v_replycd == imglist[i].v_recordid) {
									var imageUrl ="";
									if(list_recomment.v_reg_dtm.substring(0,8) >= 20151215){
										imageUrl = imglist[i].v_image_path.replace("_100", "_500");
									}else{
										imageUrl = imglist[i].v_image_path.replace("_100", "_680");
									}
									
									content = "<img src='"+imageUrl+"'/>"+content;
								}
							}
						}
					}

					
					$(".div_comment", li_recomment).html(content);
					$(".div_contArea", li_recomment).attr("id", "div_" +  list_recomment.v_replycd);
					$(".span_date", li_recomment).text(changeTodayDate(list_recomment.v_reg_dtm));
					
					$(".input_replycd", li_recomment).val(list_recomment.v_replycd);
					$(".input_comment", li_recomment).val(list_recomment.v_contents);
					
					if(userid == list_recomment.v_reg_userid) {
						$(".btn_report", li_recomment).remove();
					} else {
						$(".btn_modi_comm", li_recomment).remove();
						$(".btn_del_comm", li_recomment).remove();
					}
					
					if(j == 0) {
						ul_recomment.html("");
					}
					
					li_recomment.appendTo(ul_recomment).show();
				}
			}
		},
		
		doWritePrc : function ( btn_target, id) {
			var idx = $(".btn_rep").index(btn_target);
			var parent = $(".btn_rep").eq(idx).parent();
			
			$("input[name='i_sFlagAction']").val("R");
			MobileComment.fn.goCommentSave(id,0);
		},
		
		doWriteEndPrc : function(flag, idx, replycd,data){
			var id = replycd;
			
			if(id == "comment_reg" || id == "del" ) {
				var recordid = $("input[name='i_sRecordid']").val();
				var tablenm = $("input[name='i_sTable']", "#frm_comment").val();
				var evtCategorycd = $("input[name='i_sEvtCategorycd']").val();
				$("#commentList>li").not(":eq(0)").remove();
				MobileComment.fn.getInit(recordid, 1, tablenm,"", evtCategorycd);
				
				$(".i_sComment", parent).val("");
				$(".span_textLength>em").text("0");
				$(".div_thumbnail").remove();
				$("#WriteBox").hide();
				
				$(".ul_upload_image>li").not(":first").remove();
			} else if(id == "recomment_reg") {
				MobileComment.fn.getRecommentList(data.object.recomment, data.object.commcnt);
				$(".i_sComment", parent).val("");
				
				$("li", $(".ul_upload_image").eq(idx)).not(":eq(0)").remove();
				$(".span_textLength>em").text("0");
				$(".div_thumbnail").remove();
			} else if(id == "modify") {
				var comment_info = data.object.info.main;
				var imglist = data.object.info.imglist;
				
				var content = comment_info.v_contents;

				if(imglist != undefined && imglist.length > 0) {
					for(var i=0; i<imglist.length; i++) {
						var imageUrl = "";
						if(comment_info.v_reg_dtm.substring(0,8) >= 20151215){
							imageUrl = imglist[i].v_image_path.replace("_100", "_500");
						}else{
							imageUrl = imglist[i].v_image_path.replace("_100", "_680");
						}
						
						content = "<img src='"+imageUrl+"'/>" + content;
					}
				}
				
				$(".div_comment", "#div_"+comment_info.v_replycd).html(content);
				$(".input_comment", "#div_"+comment_info.v_replycd).val(comment_info.v_contents);
				$(".div_modi_area", "#div_"+comment_info.v_replycd).remove();
				
				var btn_idx = $(".div_contArea").index($("#div_"+comment_info.v_replycd));
				
				var parent = $(".div_btnArea").eq(btn_idx);
				
				$(".btn_modi_cancel", parent).hide();
				$(".btn_del_comm", parent).show();
				$(".div_thumbnail").remove();
				
			}
		}
	}
};