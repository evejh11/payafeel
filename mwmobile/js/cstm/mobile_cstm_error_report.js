var MobileErrorReport = {
	name : "MobileErrorReport",
	upPhotoCnt : 1,
	init : function(){
		
		MobileErrorReport.fn.initRegForm();
		var deviceinfo = navigator.userAgent;
		
		if(calculate_byte(deviceinfo) > 4000){
			fnCutString(deviceinfo, 4000, "N");
		}
		$("#i_sDeviceInfo").text(deviceinfo);
		
	},
	
	fn : {
		addBtnEvent : function(){
		
			$(".btn_back").unbind("click").click(function(event){
				$(this).attr('href', '/mobile/cstm/mobile_cstm_main.do');
			});

			$("#i_sClob").unbind("keyup").keyup(function(){
				var text 	= $("#i_sClob").val();
				text = EmptyReplace(text);
				var textlen = text.length;
				$("#currentlength").text(textlen);
				
				if(textlen > 2000){
					showMessageBox({
						message : "2000자 이하로 작성해주세요."
					});
				}
			});
			
			$("button.btnRegister2.v2.active").unbind("click").click(function(){
				var flagvalid = MobileErrorReport.fn.isValidation();
				if(flagvalid){
					MobileErrorReport.fn.goReg();
				}
			});
			
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				var imgNumber = $(".number", li).text();
				var thumbnailId = li.attr("id").replace("li_", "");
				
				li.remove();
				
				$("#i_sClob").val($("#i_sClob").val().replace(imgNumber, ""));
				
				jfupload.deleteImage(thumbnailId, "CER", "frm");
				
			});
			
			$(".btn_cancel").click(function(){
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						window.Android.closeWebview();
					}
					else {
						window.webkit.messageHandlers.closeWebview.postMessage(null);
					}
				} catch(e) {
					alert(e);
				}
			});
            
		},
		
		goReg : function(){
			
//			if(MobileErrorReport.fn.isValidation()){
				MobileCommon.ajax({
					url 	: GLOBAL_WEB_ROOT +"mobile/cstm/mobile_cstm_error_report_save.do",
					type 	: "post",
	        		dataType:"json",
	        		data	: $("form[name='frm']").serialize()+"&i_sDeviceInfo="+$("#i_sDeviceInfo").text(),
	        		success : function (data, textStatus, jqXHR){
	        			if(data.status=="succ"){
	        				showMessageBox({
	        					message : data.message
	        					, close : function(){
	        						location.href = GLOBAL_WEB_URL + "mobile/cstm/mobile_cstm_main.do";
	        					}
	        				});
	        			}
	        			else{
	        				showMessageBox({
	        					message : data.message
	        				});
	        			}
	        		}
	        	});
//			}
		},
		// 입력폼 초기화
		initRegForm : function () {
			var ul = $("#ul_upload_image");
			var arrLi = $(".li_upload_image", ul);
			var len = arrLi.length;
			var imgNumber = $(".number", arrLi.eq(len - 1)).text().substr(7, 2);
			
			MobileErrorReport.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "CER"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "98;500;" // thumbnail 필요할 경우
				, success : MobileErrorReport.fn.appendUploadImage
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$("#inp_photo_upload").click(function(event) {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "CER"
								, thumbnailWidth	: "98;500;"
								, thumbnailHeight	: "98;500;"
								, flagFixed 		: "N"
								, callback			: "MobileErrorReport.fn.appendUploadImageApp"
								, idx				: ""
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CER", "98;500;", "98;500;", "N", "MobileErrorReport.fn.appendUploadImageApp", "");
						}
					} catch (e) {}
				});
			}
			
			MobileErrorReport.fn.addBtnEvent();
		},
		
		//앱용 업로드 이미지 추가
		appendUploadImageApp : function (imgData, uploadCd) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "R");
			
			MobileErrorReport.fn.appendUploadImage(imgData, uploadCd);
		},
		
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_98" + imgData.v_thumbnail_ext;
			var ul = $("#ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var upPhotoCnt = MobileErrorReport.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			$("#i_sClob").val($("#i_sClob").val() + imgNumber);
			
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
			
			inp.appendTo(div);
		},
		
		/*
		 * 유효성 검사
		 */
		isValidation : function(){
			var validate = true;
			if($("input[name='i_sTitle']").val() == null || $("input[name='i_sTitle']").val() == ''){
				$("input[name='i_sTitle']").addClass("error");
				$(".em_title").show();
				validate = false;
			} 
			
			$("input[name='i_sTitle']").keyup(function(){
				$("input[name='i_sTitle']").removeClass("error");
				$(".em_title").hide();
				validate = true;
			});
			
			var text 	= $("#i_sClob").val();
			var textlen = text.length;
			if(textlen <= 20){
				$("#i_sClob").addClass("error");
				$(".em_content").show();
				validate = false;
			}
			
			$("#i_sClob").keyup(function(){
				var text 	= $("#i_sClob").val();
				text = EmptyReplace(text);
				var textlen = text.length;
				if(textlen >20){
					$("#i_sClob").removeClass("error");
					$(".em_content").hide();
					validate = true;
				}
			});
			
			return validate;
		}
	}
};