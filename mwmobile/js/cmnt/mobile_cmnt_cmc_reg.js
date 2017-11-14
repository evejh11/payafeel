var FlagValidate = "N";
var	MobileCmcReg = {
	name : "MobileCmcReg",

	upPhotoCnt : 1,

	init : function() {
		MobileCmcReg.fn.getDetail();
		MobileCmcReg.fn.addBtnEvent();
	},
	fn : {
		fnValidate : function(){
			FlagValidate = "Y";
			var frm = $("form[name='frm']");
			var isResult = true;
			var target = undefined;
			//제목
			if(isEmpty($("input[name='i_sTitle']", frm).val())) {
				addErrorMessageBox($("input[name='i_sTitle']", frm),"제목을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sTitle']", frm);
				}
			}else{
				removeErrorMessageBox($("input[name='i_sTitle']",frm));
				
			}
			//본문
			if(isEmpty($("textarea[name='i_sContent']", frm).val())) {
				addErrorMessageBox($("textarea[name='i_sContent']", frm),"내용을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sContent']", frm);
				}
			}else{
				removeErrorMessageBox($("textarea[name='i_sContent']",frm));
			}
			return isResult;
			
						
		},
		/**
		 * 수다카페 등록 페이지 버튼 이벤트
		 */
		addBtnEvent : function (){
			
			$(".btn_dropdown").unbind("click").click(function(event){
				event.preventDefault();
				
				dropdownMenu2('.beforeAlimArea');
			});
			$(".btn_register").unbind("click").click(function(event){
				event.preventDefault();
				if(($("input[name='i_UserLevel']").val()=='LV11' || $("input[name='i_UserLevel']").val()=='LV15' || $("input[name='i_UserLevel']").val()=='LV18') && $("select[name='i_sTalkcd']").val()=='CTK20140402000000005'){
					showMessageBox({
						message : "해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else{
					MobileCmcReg.fn.goSave();
				}
				
			});
			$(".btn_modi").unbind("click").click(function(event){
				event.preventDefault();				
				MobileCmcReg.fn.goModify();
			});
			
			if($("input[name='i_sMemocd']").val()==""){
				var url = GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_list.do';
				$('.btn_back').unbind("click").click(function(event){
					showConfirmBox({
						message : "취소하시겠어요?"
							, ok_func : function(){	
								location.href = url;
							}
					});
			    	
				});
				$(".btn_cancel").unbind("click").click(function(event){
					var url= GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_list.do';
					showConfirmBox({
						message : "취소하시겠어요?"
							, ok_func : function(){	
							location.href =url;
							}
					});
				});
			}else{
				$('.btn_back').unbind("click").click(function(event){
					var frm=document.frm;
					showConfirmBox({
						message : "취소하시겠어요?"
							, ok_func : function(){		
								
								frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
								frm.submit();
							}
					});
			    			
				
				});
				$(".btn_cancel").unbind("click").click(function(event){
					var frm=document.frm;
					showConfirmBox({
						message : "취소하시겠어요?"
							, ok_func : function(){						
								
								frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
								frm.submit();
			    			}
						});
				});
			}
			$(".i_sContent").unbind("keyup").keyup(function(){
				var frm = $("form[name='frm']");
				var text = $(".i_sContent").val();
				text = EmptyReplace(text);
				var textlength = text.length;
				$(".textlength").text(textlength);
				if(FlagValidate == "Y"){
					MobileCmcReg.fn.fnValidate();
				}
			});
			$(".i_sModiContent").unbind("keyup").keyup(function(){
				var text=$(this).val();
				var textlength = text.length;
				$(".textlength").text(textlength);
			});
			
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				var imgNumber = $(".number", li).text();
				var thumbnailId = li.attr("id").replace("li_", "");
				
				li.remove();
				
				$("#i_sContent").val($("#i_sContent").val().replace(imgNumber, ""));
				
				jfupload.deleteImage(thumbnailId, "CMC_TALK", "frm");
				
			});
			$("#i_sTitle").unbind("keyup").keyup(function(){
				if(FlagValidate == "Y"){
					MobileCmcReg.fn.fnValidate();
				}
			});
			
			if (GLOBAL_MOBILE_APP == 'APP') {
				$("#inp_photo_upload").change(function(event){
					if (GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS') {
						window.location="apjscall://jsSetWhiteColorStatusBar";
					} else if (GLOBAL_MOBILE_OS == 'AND') {
						
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
			
			MobileCmcReg.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "CMC_TALK"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "100;320;680;C134" // thumbnail 필요할 경우
				, thumbnailHeight : "100;0;0;C134"
				, index : 0
				, success : MobileCmcReg.fn.appendUploadImage
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$("#inp_photo_upload").click(function(event) {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "CMC_TALK"
								, thumbnailWidth	: "100;320;680;C134"
								, thumbnailHeight	: "100;0;0;C134;"
								, flagFixed 		: "N"
								, callback			: "MobileCmcReg.fn.appendUploadImageApp"
								, idx				: ""
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_TALK", "100;320;680;C134", "100;0;0;C134;", "N", "MobileCmcReg.fn.appendUploadImageApp", "");
						}
						return;
					} catch (e) {
						console.log(e);
					}
				});
			}
			
			MobileCmcReg.fn.addBtnEvent();
		},
		appendUploadImageApp : function (imgData, uploadCd) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "R");
			
			MobileCmcReg.fn.appendUploadImage(imgData, uploadCd);
		},
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_URL + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_100" + imgData.v_thumbnail_ext;
			var ul = $("#ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var upPhotoCnt = MobileCmcReg.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			$("#i_sContent").val($("#i_sContent").val() + imgNumber);
			var text = $(".i_sContent").val();
			var textlength=text.length;
			$(".textlength").text(textlength);
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
			inp.appendTo(div);
		},
		//등록
		goSave : function (){
			$("input[name='i_sFlagAction']").val('R');
			if(MobileCmcReg.fn.fnValidate()){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_reg_save.do",
					type:"post",
					dataType:"json",
					data:$("form[name='frm']").serialize(),
					animation :false,
					success: function(data,textStatus,jqXHR){
						if(data.status == 'succ'){
							document.location.href = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
						}else{
							if(data.object == "login"){
								showConfirmBox({
	 								message : "로그인 하시면 서비스 이용이 가능하세요!"
	 									, ok_func : function(){
	 										document.frm_login.submit();
	 										return;
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
		},
		//수정
		goModify : function (){
			$("input[name='i_sFlagAction']").val('M');
			if(MobileCmcReg.fn.fnValidate()){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_reg_save.do",
					type:"post",
					dataType:"json",
					data:$("form[name='frm']").serialize(),
					animation :false,
					success: function(data,textStatus,jqXHR){
						if(data.status == 'succ'){
							
							var frm=document.frm;
							frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
							frm.submit();
						}else{
							if(data.object == "login"){
								showConfirmBox({
	 								message : "로그인 하시면 서비스 이용이 가능하세요!"
	 									, ok_func : function(){
	 										document.frm_login.submit();
	 										return;
	 									}
	 							});
							}else{
								showMessageBox({message:data.message});
							}
						}
					}
				});
			}
		},
		getDetail : function(){
			if($("input[name='i_sMemocd']").val()==undefined){
				$("input[name='i_sMemocd']").val("");
			}
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_reg_ajax.do",
				type: "post",
				dataType : "json",
				data : {"i_sMemocd":$("input[name='i_sMemocd']").val(),
					    "i_sFlagAction":"S"},
			    animation : false,
			    success : function(data,textStatus,jqXHR){
			    	if(data.status == 'succ'){
			    		MobileCmcReg.fn.setDetail(data.object);
			    		
			    	}
			    	
			    	MobileCmcReg.fn.addBtnEvent();
			    }	
			});
		},
		//수정시에 원본 이미지, 내용 보여주기
		setDetail : function(object) {
			var category = object.ctglist;
			var detail = object.detail;
			
			
			if(category != undefined && category.length > 0) {
				var arrHtml = [];
				
				for(var i=0; i< category.length; i++) {
					if(detail != undefined && detail.talkcd == category[i].v_talkcd){
						arrHtml.push("<option value=\""+category[i].v_talkcd+"\" selected>"+category[i].v_title+"</option>");
					}else{
						arrHtml.push("<option value=\""+category[i].v_talkcd+"\">"+category[i].v_title+"</option>");
					}
					
					
					
					
				}
				
				$((arrHtml).join("\n")).appendTo("#selectCtg");
			}
			
			if(detail != undefined) {
				var view = detail.view;
				$("input[name='i_sTitle']").val(view.v_title);
	    		$("#selectCtg").val(view.v_talkcd);
	    		
	    		$(".p_byte>em").addClass("modilength");
	    		
	    		$("#i_sContent").addClass("i_sModiContent");
	    		$("#i_sContent").val(removeHTMLTag(view.v_clob));
	    		
	    		var text=$(".i_sModiContent").val();
	    		var textlength=text.length;
	    		$(".textlength").text(textlength);
	    		
	    		$(".btn_register").remove();
	    		
	    		var html = "";
	    		html += "<span class=\"btn_ty3\" id=\"btn_cancel\"><a href=\"#\" class=\"btn_cancel\">취소</a></span>"
	    				 + "<span class=\"btn_ty\"><a href=\"#\" id=\"btn_modi\" class=\"btn_modi\">수정</a></span>";
	    		$(".btnArea").html(html);
	    		
	    		var ul = $("#ul_upload_image");
				
				if(detail.imglist != undefined && detail.imglist.length > 0) {
					var imgList = detail.imglist;
					 
					for(var i=0; i<imgList.length; i++) {
						var imgData = imgList[i];
						var li = $(".li_upload_image", ul).eq(0).clone(true);
						var url = imgData.v_image_path;
						var imgNumber = imgData.v_buffer1;
						
						$(".img_upload_image", li).prop("src", url);
						$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
						$(".number", li).text(imgNumber);
						
						li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
						
						// 기존 이미지 셋팅
						jfupload.makeImageUploadTag(imgData, "CMC_TALK", "frm", "M");		
						
						// buffer1 생성
						var div 	= $("#div_" + imgData.v_thumbnail_id);
						var inp 	= $("<input/>").prop({"type" : "hidden", "name" : "CMC_TALK_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
						inp.appendTo(div);
					} 
				}
			}
			
			MobileCmcReg.fn.initRegForm();
		}
	
	}
};