var MobileMyDirectReg = {
	name : "MobileMyDirectReg",
	upPhotoCnt : 1,
	init : function(){
		
		MobileMyDirectReg.fn.initRegForm();
		MobileMyDirectReg.fn.setPageInit();
	},
	
	fn : {
		addBtnEvent : function(){
		
			$(".btn_back").unbind("click").click(function(event){
				$(this).attr('href', '/mobile/my/mobile_my_direct_list.do');
			});

			$("#i_sCounselContent").unbind("keyup").keyup(function(event){

				var text 	= $("#i_sCounselContent").val();
				text = EmptyReplace(text);
				var textlen = text.length;
				$("#currentlength").text(textlen);

				if (event.keyCode != "8") {
					if(textlen > 2000){
						showMessageBox({
							message : "2000자 이하로 작성해주세요."
						});
					}
				}

			});

			$(".btn_cancel").unbind("click").click(function(event){
				event.preventDefault();
				showConfirmBox({
					message : "취소하시겠어요?"
					, ok_func : function(){
						location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_direct_list.do";
					}
				})
			});
			
			$("button.btnRegister2.v2.active").unbind("click").click(function(){
				var validyn = MobileMyDirectReg.fn.isValidation();
				if(validyn){
					MobileMyDirectReg.fn.goReg();
				}
			});
			
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				var imgNumber = $(".number", li).text();
				var thumbnailId = li.attr("id").replace("li_", "");
				
				li.remove();
				
				$("#i_sCounselContent").val($("#i_sCounselContent").val().replace(imgNumber, ""));
				
				jfupload.deleteImage(thumbnailId, "COUNSEL", "frm");
				
			});
			
			if(GLOBAL_MOBILE_APP == 'APP'){
				if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
					window.location="apjscall://jsSetWhiteColorStatusBar";
				}else if (GLOBAL_MOBILE_OS == 'AND') {
					
				}
			}
			
	      /* 결과 알림 선택이 필수인지 확인해야함
            var chkLength = $("input:checkbox").length;

            $('input:checkbox').click(function() {

                $('input:checkbox').each(function(){
                    
                    if ( $("input:checkbox:checked").length > 0 ) {
                        $('button.btnRegister2').addClass("active").removeAttr("disabled");
                        
                    } else {
                        $('button.btnRegister2').removeClass("active").attr("disabled","disabled");
                    }
                });
            });
            */
			
            
		},
		
		/**
		 * 상담유형 select box, 이메일 주소, 핸드폰 번호 
		 */
		setPageInit : function(){
			
			MobileCommon.ajax({
				url 	: "/mobile/my/mobile_my_direct_reg_ajax.do",
				type 	: "post",
        		dataType:"json",
        		async	: false,
        		animation : false,
        		data	: "",
        		success : function (data, textStatus, jqXHR){
        			if(data.status=="succ"){
        				var contact = data.object.rvo;
        				var CtgList = data.object.CtgList;
        				var arrHtml = Array();
        				
        				if(CtgList != undefined && CtgList.length > 0){
	        				arrHtml.push("<option value=''>문의 카테고리를 선택하세요.</option>");
	        				for(var vo = 0; vo < CtgList.length; vo++){
	        					arrHtml.push("<option value='"+CtgList[vo].v_sub_code1+"'>"+CtgList[vo].v_sub_codenm+"</option>");
	        				}
	        				$(arrHtml.join("\n")).appendTo($("#i_sCounselTypecd"));
        				}	
        				var hidEmail = "";
        				var hidPhone = "";
        				if(contact.email1 != null || contact.email1 != ''){
        					hidEmail = "(" + getStringReverseHidden(contact.email1, 4)+'@'+contact.email2 + ")";
        				}
        				if(contact.mobilno1 != null || contact.mobileno1 != ''){
        					hidPhone = "(" + contact.mobileno1 +'-'+ getStringReverseHidden(contact.mobileno2, 1) +'-'+ getStringReverseHidden(contact.mobileno3, 2) + ")";
        				} 
        				$("#hidUserEmail").html(hidEmail);
        				$("#hidUserPhone").html(hidPhone);
        			}
        			else{
        				showMessageBox({
        					message : data.message
        				});
        			}
        		}
        	});
		},
		
		goReg : function(){
			if(MobileMyDirectReg.fn.isValidation()){
				MobileCommon.ajax({
					url 	: "/mobile/my/mobile_my_direct_reg_save_ajax.do",
					type 	: "post",
	        		dataType:"json",
	        		async	: false,
	        		animation : false,
	        		data	: $("form[name='frm']").serialize(),
	        		success : function (data, textStatus, jqXHR){
	        			if(data.status=="succ"){
	        				showMessageBox({
	        					message : "등록되었어요."
	        					, close : function(){
	        						location.href = "/mobile/my/mobile_my_direct_list.do";
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
			}
		},
		// 입력폼 초기화
		initRegForm : function () {
			var ul = $("#ul_upload_image");
			var arrLi = $(".li_upload_image", ul);
			var len = arrLi.length;
			var imgNumber = $(".number", arrLi.eq(len - 1)).text().substr(7, 2);
			
			MobileMyDirectReg.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "COUNSEL"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "98;500;" // thumbnail 필요할 경우
				, success : MobileMyDirectReg.fn.appendUploadImage
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$("#inp_photo_upload").click(function(event) {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "COUNSEL"
								, thumbnailWidth	: "98;500;"
								, thumbnailHeight	: "98;500;"
								, flagFixed 		: "N"
								, callback			: "MobileMyDirectReg.fn.appendUploadImageApp"
								, idx				: ""
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "COUNSEL", "98;500;", "98;500;", "N", "MobileMyDirectReg.fn.appendUploadImageApp", "");
						}
					} catch (e) {}
				});
			}
			
			MobileMyDirectReg.fn.addBtnEvent();
		},
		appendUploadImageApp : function (imgData, uploadCd) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "R");
			
			MobileMyDirectReg.fn.appendUploadImage(imgData, uploadCd);
		},
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_98" + imgData.v_thumbnail_ext;
			var ul = $("#ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var upPhotoCnt = MobileMyDirectReg.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			$("#i_sCounselContent").val($("#i_sCounselContent").val() + imgNumber);
			
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
			
			if($("#i_sCounselTypecd").val() == null || $("#i_sCounselTypecd").val() == ""){
				$("#i_sCounselTypecd").addClass("error");
				$(".em_category").show();
				return false;
			}
			else{
				$("#i_sCounselTypecd").removeClass("error");
				$(".em_category").hide();
			}

			$("#i_sCounselTypecd").change(function(){
				$("#i_sCounselTypecd").removeClass("error");
				$(".em_category").hide();
			});

			if($("input[name='i_sCounselTitle']").val() == null || $("input[name='i_sCounselTitle']").val().trim() == ''){
				$("input[name='i_sCounselTitle']").addClass("error");
				$(".em_title").show();
				return false;
			}
			else {
				$("input[name='i_sCounselTitle']").removeClass("error");
				$(".em_title").hide();
			}
			$("input[name='i_sCounselTitle']").keyup(function(){
				$("input[name='i_sCounselTitle']").removeClass("error");
				$(".em_title").hide();
				return false;
			});
			
			var text 	= $("#i_sCounselContent").val();
			var textlen = text.length;
			if(textlen <= 20){
				$("#i_sCounselContent").addClass("error");
				$(".em_content").show();
				$(".em_content2").hide();
				return false;
			}
			else if(textlen > 2000) {
				$("#i_sCounselContent").addClass("error");
				$(".em_content2").show();
				$(".em_content").hide();
				return false;
			}
			else{
				$("#i_sCounselContent").removeClass("error");
				$(".em_content").hide();
				$(".em_content2").hide();
			}
			
			$("#i_sCounselContent").keyup(function(){
				$("#i_sCounselContent").removeClass("error");
				$(".em_content").hide();
				return false;
			});
			
			return validate;
		}
	}
};