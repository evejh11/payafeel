var	MobileNickname = {
	name : "MobileNickname",
	upPhotoCnt : 1,
	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		
		MobileNickname.fn.initRegForm();
		MobileNickname.fn.setPageInit();
		MobileNickname.fn.setInputTextInit(); // x버튼, 등록버튼 설정

	},
	
	fn :{
		addBtnEvent : function(){
			
			$('.btn_back').unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
				var returnurl = $("input[name='i_sReturnUrl']", frm).val();
				var returnParam = $("input[name='i_sReturnParam']", frm).val();
				var url  = "";
				if(returnurl.indexOf("mobile_mbr_nickname") > -1){
					url = GLOBAL_WEB_URL+"mobile/main.do";
				}else if(returnParam == ""){
					url = returnurl;
				}else{
					url = returnurl + "?" + returnParam;
				}
				frm.attr("action", url);
				frm.submit();
			});
			
			$('.btn_savenick').unbind("click").click(function(event){
	  			event.preventDefault();
	  			if($("#i_sFlagState").val() == "ALL"){
	  				MobileNickname.fn.goSave();
	  			} 
	  		});
			
			$('.btn_cancel').unbind("click").click(function(event){
	  			event.preventDefault();
	  			MobileNickname.fn.fnCancel();
			});
			
		},
		
		/**
		 * 유효성 메세지 출력 설정, x 버튼 설정 등..
		 */
		setInputTextInit : function(){
			$(".inputBar a.btn_delete").hide();
            $("input[name='i_sNewNick']").keyup(function(){
				if ($(this).val() == "" ){
                    $(".inputBar a.btn_delete").hide();
					$("#warn_message").hide();
					$("#default_message").show();
               } else {
                    $(".inputBar a.btn_delete").fadeIn();
               }
            });
			
            $(".inputBar a.btn_delete").click(function(){
            	$("input[name='i_sNewNick']").val("");
                $(this).hide();
                $("#warn_message").hide();
				$("#default_message").show();
            });

		},
		
		/**
		 * 닉네임 유무에 따른 페이지 이동여부 처리
		 */
		setPageInit : function(){
  			var i_sFlagNickname = $("#i_sFlagNickname").val();
  			var i_sNickname 	= $("#i_sNickname").val();
  			var url 			= $("#i_sReturnUrl").val();
  			
	    	if(i_sFlagNickname == "R" && i_sNickname != "" ){
	    		showConfirmBox({
					message : "이미 닉네임을 등록하셨어요.<br/>닉네임 변경페이지로 이동하시겠어요?"
					, ok_func : function() {
						location.href = GLOBAL_WEB_URL +"mobile/mbr/mobile_mbr_nickname_mod.do?returnUrl="+url;
					}
					, cancel_func : function() {
						return ;
					}
				});	
	    	} 
	    	else if(i_sFlagNickname == "R" && i_sNickname == ""){
	    		
	    		MobileNickname.fn.inputNickname("");
		    	MobileNickname.fn.setInputTextInit();
		    	
	    	}
	    	else if(i_sFlagNickname == "M"){
	    	
	    		MobileNickname.fn.inputNickname(i_sNickname);
	    	}
	    	
	    },
		
		/**
		 * 닉네임 input text
		 */
		inputNickname : function(nickname){
  			var i_sFlagNickname = $("#i_sFlagNickname").val();
  			var i_sFlagword  	= "";
  			
			var arrHtml = Array();
			
			arrHtml.push("<input type='text' id='i_sNewNick' name='i_sNewNick' class='inputtxt' value='"+nickname+"' placeholder='10글자 이내'/>");
			$(arrHtml.join("\n")).appendTo($(".inputBar"));
			
			if(i_sFlagNickname == "M"){
				
				i_sFlagword = "datecheck";
				MobileNickname.fn.checkUpdateDate(i_sFlagword);
			}
		},
		
		/**
		  * 업데이트 날짜 체크, 중복 체크
		 */
		checkUpdateDate : function(i_sFlagword){
			$("#i_sFlagword").val(i_sFlagword);
			$("#i_sDivCount").val($(".div_thumbnail").size());
			var frm = $("form[name='frm']");
			
			MobileCommon.ajax({
				url		: GLOBAL_WEB_ROOT + "mobile/mbr/nickname_check_ajax.do",
				type	: "POST",
				data	: frm.serialize(),
				dataType	: "json",
				isModal		: true,
				isModalEnd	: true,
				animation : false,
				async	: false,
				success		: function(data){
					
					if(data.status=='succ'){
						if(data.object == "" || data.object == null){ 
							// 닉네임 등록 성공
							showMessageBox({
								message : data.message
								, close : function(){
									var url  = GLOBAL_WEB_URL + "mobile/mbr/mobile_mbr_nickname_mod.do";
									MobileBodyStart.fnAppendUserInfoSubmit(frm, url);
//									if (GLOBAL_FLAG_APP_NEW == "Y") {
//										try {
//											if(GLOBAL_MOBILE_OS == "AND") {
//												MobileBodyStart.setLoginUserInfo();
//											}
//											else {
//												window.webkit.messageHandlers.requestUserInfo.postMessage(null);
//											}
//										}catch(e){
//											console.log(e);
//										}
//										var arrParam = [];
//										if(GLOBAL_LOGIN_KEY != "") {
//											$("input[name='i_sLoginKey']", frm).remove();
//											arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
//										}
//										if(GLOBAL_LOGIN_TYPE != "") {
//											$("input[name='i_sLoginType']", frm).remove();
//											arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
//										}
//										$("input[name='i_sDeviceNum']", frm).remove();
//										arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
//										$(arrParam.join("")).appendTo(frm);
//									}
//									frm.attr("action", url);
//									frm.submit();
								}
							});
						}
						else {
							// 변경 가능함
							if(data.object.i_sFlagDateCheck != undefined && data.object.i_sFlagDateCheck == "Y"){
								
								$("#i_sFlagState").val("ALL");  // 닉네임 변경 가능
								MobileNickname.fn.setInputTextInit();
							}
						}
					}
					else if(data.status=='fail'){
						if(data.object.i_sFlagDateCheck != undefined && data.object.i_sFlagDateCheck == "N"){
							// 변경 기간 아님
							var arrHtml = Array();
							
							arrHtml.push("<p class='ttl rule'>"+data.object.i_sNickname+"님은 "+data.object.i_sGapdate+"일 후에 변경할 수 있습니다.</p>");
							$(arrHtml.join("\n")).appendTo($(".validation"));

							$("input[name='i_sNewNick']").attr("disabled", "disabled");
							$("#i_sFlagState").val("P"); 
						}
						else if(data.object != ""){
							// 중복된 닉넴임
							$("#warn_message").text("이미 존재하는 닉네임입니다."); 
						}
					}
					else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		
		goSave : function(){
			$("#warn_message").show();
			$("#default_message").hide();
				
			var flag = $("#i_sFlagState").val();
			
			if(flag == 'ALL'){
				if(MobileNickname.fn.Validator()){
					MobileNickname.fn.checkUpdateDate("overlapcheck");
				}
			}
		},
		
		/**
		 * 프로필 사진만 저장
		 */
		updateUsrPhoto : function(){
			var frm 			= $("form[name='frm']");
			$("#i_sDivCount").val($(".div_thumbnail").size());
			MobileCommon.ajax({
				url		: GLOBAL_WEB_ROOT + "mobile/mbr/user_photo_ajax.do",
				type	: "POST",
				data	: frm.serialize(),
				dataType	: "json",
				isModal		: true,
				isModalEnd	: true,
				animation : false,
				async	: false,
				success		: function(data){
					if(data.status=='succ'){
						showMessageBox({
							message : "프로필 사진이 변경되었어요."
						});
					}else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		
		// 입력폼 초기화
		initRegForm : function () {
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "USR_PHOTO"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "98;128;" // thumbnail 필요할 경우
				, thumbnailHeight : "98;128"
				, success : MobileNickname.fn.appendUploadImage
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$("#inp_photo_upload").click(function(event) {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "USR_PHOTO"
								, thumbnailWidth	: "98;128;"
								, thumbnailHeight	: "98;128;"
								, flagFixed 		: "N"
								, callback			: "MobileNickname.fn.appendUploadImageApp"
								, idx				: ""
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "USR_PHOTO", "98;128;", "98;128;", "N", "MobileNickname.fn.appendUploadImageApp", "");
						}
						return;
					} catch (e) {
						console.log(e);
					}
				});
			}
			
			MobileNickname.fn.addBtnEvent();
		},
		appendUploadImageApp : function (imgData, uploadCd) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "R");
			
			MobileNickname.fn.appendUploadImage(imgData, uploadCd);
		},
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_98" + imgData.v_thumbnail_ext;
			var ul = $(".ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			var upPhotoCnt = MobileNickname.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".upload_image").prop("src", url);
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
//			$("#i_sCurrent_Thumbnail_Id").val(imgData.v_thumbnail_id);
			
			// 이전 업로드 이미지 삭제
			if(upPhotoCnt != 1){
				var li = $(".li_upload_image").eq(1);
				var thumbnailId = li.attr("id").replace("li_", "");
				li.remove();
				jfupload.deleteImage(thumbnailId, "USR_PHOTO", "frm");
			}
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val("CMC");
			
			inp.appendTo(div);
			MobileNickname.fn.updateUsrPhoto();  
		},
		
		/**
		 * 유효성 검사
		 */
		Validator : function(){
			
			var validate	= true;
			var $lenNick	= $("input[name='i_sNewNick']").val().length;
			var nickname	= $.trim($("input[name='i_sNewNick']").val()); 
			
			// 공백 불가능
			if(nickname == ""){
				showMessageBox({
					message : "닉네임을 입력해 주세요."
				});
				validate = false;
			}
			
			// 글자 수 최소 2글자
			if($lenNick < 2 ){
				$("#warn_message").text("닉네임은 최소 2글자 이상이어야 합니다.");
				validate = false;
			}
			
			// 최대 10글자
			if($lenNick > 10){
				$("#warn_message").text("10글자 이내로 작성해 주세요.");
				validate = false;
			}
			
			return validate;
		},
		fnCancel : function () {
			var frm = $("form[name='frm']");
			var url = $("input[name='i_sReturnUrl']", frm).val();
			if(!isEmpty($("input[name='i_sReturnParam']", frm).val())) {
				url = url + "?" + $("input[name='i_sReturnParam']", frm).val()
			}
			if((isEmpty(url) || url.indexOf("mobile_mbr_nickname") > -1) && GLOBAL_FLAG_APP_NEW != "Y"){
				url = GLOBAL_WEB_URL+"mobile/main.do";
			}
			MobileBodyStart.fnAppendUserInfoSubmit(frm, url);
		}
	}
};
