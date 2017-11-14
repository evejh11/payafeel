var i_sDetailFlag = '';
var i_sEvtCategorycd = "";
var MobilePhotoReg = {
	name : "MobilePhotoReg",
	upPhotoCnt : 1,
	init : function() {
		MobilePhotoReg.fn.getPageInit();
		if(i_sDetailFlag!="Y"){
			MobilePhotoReg.fn.initRegForm();
			i_sEvtCategorycd = 	$("input[name='i_sEvtCategorycd']").val();
			if(i_sEvtCategorycd != 'AM004'){
				MobilePhotoReg.fn.getReviewCategory();
				MobilePhotoRegStyle.init();
			}
		}
	},
	fn : {
		
		fnValidate : function(){
			var frm = $("form[name='frm']");
			var isResult = true;
			var target = undefined;
			var rvtypecd = $("input[name='i_sRvTypecd']", frm).val();
			
			//포토리뷰 정책동의
			if($("#i_sAcAgree").is(":checked")) {
				isResult = true;
			}else{
				addErrorMessageBox($("#i_sAcAgree", frm),"포토리뷰 이용약관에 동의해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("#i_sAcAgree", frm);
				}
			}
			//마케팅자료 동의
			if($("input[name='i_sFlagAgree']").is(":checked")) {
				isResult = true;
			}else{
				addErrorMessageBox($("input[name='i_sFlagAgree']", frm),"마케팅자료 사용에 동의해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sFlagAgree']", frm);
				}
			}
			
			//본문
			if(isEmpty($("textarea[name='i_sContent']", frm).val())) {
				addErrorMessageBox($("textarea[name='i_sContent']", frm),"리뷰 내용을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sContent']", frm);
				}
			}
			//이미지 없을때
			if($(".li_upload_image").size() == 1){
				addErrorMessageBox($("#btnRegister",frm),"최소 한장의 리뷰사진을 등록해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("#btnRegister", frm);
				}
			}
			
			//제목
			if(isEmpty($("input[name='i_sTitle']", frm).val())) {
				addErrorMessageBox($("input[name='i_sTitle']", frm),"제목을 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sTitle']", frm);
				}
			}
			
			//이벤트 작성시 validation 해제
			if(i_sEvtCategorycd != 'AM004'){
				//사용감
				if($("input[name='i_iUsePoint']:checked").val() == 0){
					addErrorMessageBox($("input[name='i_iUsePoint']",frm),"사용감을 선택해주세요.");
					isResult = false;
					if (target == undefined) {
						target = $("input[name='i_iUsePoint']",frm);
					}
				}else{
					if($("input[name='i_iUsePoint']:checked",frm).val() != ''){
						removeErrorMessageBox($("input[name='i_iUsePoint']",frm));
					}
				}
				
				//추천의사
				if($("input[name='i_iRecomPoint']:checked").val() == 0){
					addErrorMessageBox($("input[name='i_iRecomPoint']",frm),"추천의사를 선택해주세요.");
					isResult = false;
					if (target == undefined) {
						target = $("input[name='i_iRecomPoint']",frm);
					}
				}else{
					if($("input[name='i_iRecomPoint']:checked",frm).val() != ''){
						removeErrorMessageBox($("input[name='i_iRecomPoint']",frm));
					}
				}
				
				
				//등록된 상품 없을때
				if($(".li_product").size() == 0){
					addErrorMessageBox($("#btnRegister2",frm),"리뷰 상품을 등록해주세요.");
					isResult = false;
					if (target == undefined) {
						target = $("#btnRegister2", frm);
					}
				}
				
				//포토리뷰 구분 값 선택 안했을 때 
				if(rvtypecd == undefined || rvtypecd == "" || rvtypecd == "undefined"){
					addErrorMessageBox($("input[name='i_sRvTypeSelect']", frm),"리뷰 구분값을 선택해주세요.");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sRvTypeSelect']", frm);
					}
				}
				
			}
			return isResult;
						
		},
	
		addBtnEvent : function() {
			var frm = $("form[name='frm']");
			var isResult = true;
			var target = undefined;
			/* 에러메세지 */
			$("#i_sTitle").unbind("keyup").keyup(function(){
				removeErrorMessageBox($("input[name='i_sTitle']",frm));
				if(isEmpty($("input[name='i_sTitle']", frm).val())) {
					addErrorMessageBox($("input[name='i_sTitle']", frm),"제목을 입력해주세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sTitle']", frm);
					}	
				}	
			});
			
			$("#i_sContent").unbind("keyup").keyup(function(){
				removeErrorMessageBox($("textarea[name='i_sContent']",frm));
				if(isEmpty($("textarea[name='i_sContent']", frm).val())) {
					addErrorMessageBox($("textarea[name='i_sContent']", frm),"리뷰 내용을 입력해주세요.");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sContent']", frm);
					}	
				}	
			});
			
			
			$("input[name='i_sFlagAgree']").unbind("change").change(function(){
				if($("*[name='i_sFlagAgree']").is(":checked")){
					removeErrorMessageBox($("input:checkbox[name='i_sFlagAgree']",frm));
				}else{
						addErrorMessageBox($("input:checkbox[name='i_sFlagAgree']", frm),"마케팅자료 사용에 동의해주세요.");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sFlagAgree']", frm);
						}
				}
			});
			
			$("#i_sAcAgree").unbind("change").change(function(){
				if($("#i_sAcAgree").is(":checked")){
					removeErrorMessageBox($("#i_sAcAgree",frm));
				}else{
					addErrorMessageBox($("#i_sAcAgree", frm),"포토리뷰 이용약관에 동의해주세요.");
					isResult = false;
					if (target == undefined) {
						target = $("#i_sAcAgree", frm);
					}
				}
			});
			
			/*
			$("#inp_photo_upload").unbind("click").click(function(){
				removeErrorMessageBox($("#btnRegister",frm));
			});
			*/
			
			$(".btn_drop").unbind("click").click(function(event) {
				event.preventDefault();
				
				dropdownMenu2('.beforeAlimArea');
			});
			
			if(i_sEvtCategorycd != 'AM004'){
				$("input[name='i_iUsePoint']").unbind("click").click(function(){
					removeErrorMessageBox($(".btn_usepoint"),frm);
				});
				$("input[name='i_iRecomPoint']").unbind("click").click(function(){
					removeErrorMessageBox($(".btn_recompoint"),frm);
				});
			
			
			$(".btn_prod_search").unbind("click").click(function(event) {
				event.preventDefault();
				removeErrorMessageBox($("#btnRegister2",frm));
				
				$("#i_iNowPageNo").val("1");
				if($("input[name='i_sExboxcd']").val() != '' || i_sEvtCategorycd != ''){
					showMessageBox({
						message : "리뷰 상품을 추가할 수 없습니다."
					});
				}else{
					MobilePhotoReg.fn.getSearchProdList();					
				}
			});
			
			
			$("#i_sKeyword").unbind("keyup").keyup(function(event) {
				if ( $(this).val() == "" ){
				     $(this).next('span').removeClass("active");
				     $(this).next('button').removeClass("active").attr("disabled","disabled");
				} else {
				     $(this).next('span').addClass("active");
				     $(this).next('button').addClass("active").removeAttr("disabled");
				}

				if(event.keyCode == 13) {
					$("#i_iNowPageNo").val("1");
					MobilePhotoReg.fn.getSearchProdList();
				}
			});
			
			} // AM004 END
			
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				var imgNumber = $(".number", li).text();
				var thumbnailId = li.attr("id").replace("li_", "");
				showConfirmBox({
					message : "선택한 사진을 삭제하시겠습니까?"
					, ok_func : function() {
						
						li.remove();
						
						$("#i_sContent").val($("#i_sContent").val().replace(imgNumber, ""));
						
						jfupload.deleteImage(thumbnailId, "CMC_PHOTO", "frm");
					}
				});				
			});
			
			$(".btn_reg").unbind("click").click(function(event) {
				event.preventDefault();
				$("input[name='i_sRvTypecd']").val($("input[name='i_sRvTypeSelect']:checked").val());
				MobilePhotoReg.fn.goSave("R");
			});
			
			$(".btn_modify").unbind("click").click(function(event) {
				event.preventDefault();
				MobilePhotoReg.fn.goSave("M");
			});
			
			$(".btn_cancel").unbind("click").click(function(event) {
				event.preventDefault();
				var frm = $("form[name='frm']"); 
				var returnUrl = $("input[name='i_sReturnUrl']", frm).val();
				if(returnUrl != ""){
					location.href= returnUrl;					
				}else{
					$("form[name='frm']").attr("action", GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_list.do").submit();
				}
			});
			
			$(".btn_back").unbind("click").click(function(event) {
				event.preventDefault();
				var frm = $("form[name='frm']"); 
				var returnUrl = $("input[name='i_sReturnUrl']", frm).val();
				
				if(returnUrl != ""){
					location.href= returnUrl;
				}else{
					$("form[name='frm']").attr("action", GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_list.do").submit();
				}
			});
			
			$(".btn_prod_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				var idx = $(".btn_prod_del").index($(this));
				showConfirmBox({
					message : "해당 상품을 삭제하시겠습니까?"
					, ok_func : function() {
						$(".li_product").eq(idx).remove();
					}
				});
			});
			
			$(".input_chk_all").unbind("click").click(function(event){
				if($(this).is(":checked")){
					$(".input_chk").prop("checked", true);
				}else{
					$(".input_chk").prop("checked", false);
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
			
			MobilePhotoReg.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "CMC_PHOTO"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "100;320;680;C134" // thumbnail 필요할 경우
				, thumbnailHeight : "100;0;0;C134"
				, success : MobilePhotoReg.fn.appendUploadImage
			});
			
			$("#inp_photo_upload").click(function(event) {
				removeErrorMessageBox($("#btnRegister",frm));
				if (GLOBAL_MOBILE_APP == "APP") {
					try {
						if (GLOBAL_MOBILE_OS == "IOS" || GLOBAL_MOBILE_OS == "iOS") {
							event.preventDefault();
							window.webkit.messageHandlers.photo.postMessage({
								uploadUrl			: GLOBAL_WEB_URL + "comm/comm_image_upload.do"
								, uploadCd			: "CMC_PHOTO"
								, thumbnailWidth	: "100;320;680;C134"
								, thumbnailHeight	: "100;0;0;C134"
								, flagFixed 		: "N"
								, callback			: "MobilePhotoReg.fn.appendUploadImageApp"
								, idx				: ""
							});
						}
						else {
							window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "CMC_PHOTO", "100;320;680;C134", "100;0;0;C134", "N", "MobilePhotoReg.fn.appendUploadImageApp", "");
						}
					} catch (e) {
					}
				}
			});
			
			MobilePhotoReg.fn.addBtnEvent();
		},
		getPageInit : function() {
			var frm = $("form[name='frm']");
			var reviewcd = $("input[name='i_sReviewcd']",frm).val();
			if(reviewcd != ""){
				i_sDetailFlag = 'Y';
			}else{
				i_sDetailFlag = 'N';
			}
			var rvTypecd = $("input[name='i_sRvTypecd']", frm).val();
			var exboxcd = $("input[name='i_sExboxcd']",frm).val();
			var flagApply = $("input[name='i_sFlagApply']",frm).val();
			var flagOpen = $("input[name='i_sFlagOpen']",frm).val();
			
			if(reviewcd != "" || exboxcd != "") {
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_reg_ajax.do"
					, type : "post"
					, dataType : "json"
					, data : {
						i_sDetailFlag : i_sDetailFlag,
						i_sReviewcd : reviewcd,
						i_sExboxcd : exboxcd,
						i_sRvTypecd : rvTypecd,
						i_sFlagApply : flagApply,
						i_sFlagOpen : flagOpen
					}
					, async : false
					, animation : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							if(data.object.review != null){
								i_sDetailFlag = "Y";
								var typecd = data.object.review.detail.v_rv_typecd;
								$("input[name='i_sRvTypecd']", frm).val(typecd);
								if(typecd == "DC_T001" || typecd == "DC_T004"){
									$(".typeSelect").show();
									$(".i_sRadiotype_"+typecd).attr("checked",true);
								}else{
									$(".typeSelect").hide();
								}
								MobilePhotoReg.fn.setReviewCategory(data.object);
								MobilePhotoReg.fn.setReviewDetail(data.object);
							}else{
								//익스박스에서 포토리뷰 작성시 익스박스 구성상품 불러온다.
								MobilePhotoReg.fn.setExProdList(data.object);
							}
							MobilePhotoReg.fn.addBtnEvent();
						} else {
							if(data.object == "exbox"){
								showMessageBox({
									message : data.message,
									close : function(){
										var returnUrl = $("input[name='i_sReturnUrl']", frm).val();
										if(returnUrl != ""){
											location.href= returnUrl;					
										}
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
			}else{
				i_sDetailFlag = "N";
			}
		},
		
		
		getReviewCategory : function(){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"mobile/cmnt/mobile_cmnt_photo_reg_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : null
				, async : false
				, animation : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobilePhotoReg.fn.setReviewCategory(data.object);
					}
				}
			});
		},
		
		setReviewCategory : function(object){
			var list = object.ctlist;
			if(i_sDetailFlag=="Y"){
				list = object.review.taglist;
			}
			if(list != undefined && list.length>0){
				var arrHtml = [];
				arrHtml.push("<li>");
				arrHtml.push("		<span class=\"inputChk5\">");
				arrHtml.push("			<input type=\"checkbox\" id=\"categorycd1\" class=\"checkbox input_chk_all\"/>");
				arrHtml.push("			<label for=\"c1\">전체</label>");
				arrHtml.push("		</span>");
				arrHtml.push("</li>");
				for(var i =0; i<list.length; i++){
					var row = list[i];
					arrHtml.push("<li>");
					arrHtml.push("		<span class=\"inputChk5\">");
					if(list[i].v_tagcd != undefined && list[i].v_tagcd != "" && i_sDetailFlag=="Y"){
						arrHtml.push("			<input type=\"checkbox\" id=\"categorycd"+(i+2)+"\" name=\"i_arrCategorycd\" class=\"checkbox input_chk\" value=\""+row.v_sub_code1+"\" checked/>");						
					}else{
						arrHtml.push("			<input type=\"checkbox\" id=\"categorycd"+(i+2)+"\" name=\"i_arrCategorycd\" class=\"checkbox input_chk\" value=\""+row.v_sub_code1+"\"/>");
					}
					arrHtml.push("			<label for=\"categorycd"+(i+2)+"\">"+row.v_sub_codenm+"</label>");
					arrHtml.push("		</span>");
					arrHtml.push("</li>");
				}
			$(".categoryBox>ul").html(arrHtml.join(""));
			MobilePhotoReg.fn.addBtnEvent();
			}
		},
		
		setReviewDetail : function(object) {
			var detail = object.review.detail;
			var prodlist = object.review.product;
			var imglist = object.review.imglist;
			MobilePhotoRegStyle.init();
			
			$("#range0"+detail.n_use_point).prop("checked", true);
			$("#range1"+detail.n_recom_point).prop("checked", true);
			
			$('.noUi-target').eq(0).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
	        $('.noUi-target').eq(0).addClass('grade-0'+ detail.n_use_point);
	        
	        $('.noUi-target').eq(1).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
	        $('.noUi-target').eq(1).addClass('grade-0'+ detail.n_recom_point);
	        
	        $("#i_sTitle").val(detail.v_title);
	        $("#i_sContent").val(removeHTMLTag(detail.v_clob));
	        
	        if(detail.v_flag_agree == "Y") {
	        	$("input[name='i_sFlagAgree']").prop("checked", true);
	        }
	        if(i_sDetailFlag == "Y") {
	        	$("input[name='i_sAcAgree']").prop("checked", true);
	        }
	        
	        if(prodlist != undefined && prodlist.length > 0) {
	        	var arrHtml = [];
	        	for(var i=0; i<prodlist.length; i++) {
	        		/*var levelcd = $("#i_sLevelcd").val();*/
					/*var price = productPrice.fn.setProductPrice(prodlist[i], levelcd);*/
	        		
	        		arrHtml.push("<li class=\"li_product\">");
					arrHtml.push("	<a href=\"#\">");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrProductcd\" id=\"input"+prodlist[i].v_productcd+"_"+prodlist[i].v_optioncd+"\" value=\""+prodlist[i].v_productcd+"\"/>");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+prodlist[i].v_optioncd+"\"/>");
					arrHtml.push("		<div class=\"thumbImg\">");
					arrHtml.push("			<span class=\"btn_delete btn_prod_del\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete6.png\" alt=\"삭제\"></span>");
					arrHtml.push("			<img src=\""+prodlist[i].v_img_web_path+"\" alt=\""+prodlist[i].v_productnm+"\">");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class=\"prodDetail\">");
					arrHtml.push("			<p class=\"brandNm ellipsis\">"+prodlist[i].v_brandnm+"</p>");
					arrHtml.push("			<p class=\"prodNm\">"+getByteString(prodlist[i].v_productnm, 10)+"</p>");
					
					if(parseInt(prodlist[i].n_option_cnt) > 1) {
						arrHtml.push("			<p class=\"option\">"+getByteString(prodlist[i].v_optionnm, 8)+"</p>");
					}
					arrHtml.push("			<p class=\"priceZone\">");
					
					if(parseInt(prodlist[i].n_price) < parseInt(prodlist[i].n_list_price)) {
						arrHtml.push("			<span class=\"sale\"><em>"+SetNumComma(prodlist[i].n_list_price)+"</em>원</span>");
					}
					arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(prodlist[i].n_price)+"</em>원</span>");
					arrHtml.push("			</p>");
                    arrHtml.push("			<div class=\"prodEvalu\">");
                    arrHtml.push("				<span class=\"gradeType2 grade01\"><span class=\"hide\">평점 1.0</span></span>");
                    arrHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>(18)</span>");
                    arrHtml.push("			</div>");
                    
                    if(prodlist[i].v_statuscd == "0002" || parseInt(prodlist[i].n_stockqty) == 0) {
                    	arrHtml.push("		<span class=\"stateArea\">");
                    	arrHtml.push("			<span class=\"ico_state st1\">품절</span>");
                    	arrHtml.push("		</span>");
                    }
                    arrHtml.push("		</div>");
                    arrHtml.push("	</a>");
                    arrHtml.push("</li>");
	        	}
	        	
	        	$(".ul_prodList").append(arrHtml.join(""));
	        }
	        
	        var html = "";
    		html += "<span class=\"btn_ty3 btn_back\"><a href=\"#\" class=\"btn_cancel\">취소</a></span>"
    				 + "<span class=\"btn_ty btn_modify\"><a href=\"#\" id=\"btn_modi\" class=\"btn_modi\">수정</a></span>";
    		$(".div_btnArea").html(html);
	        
	        var ul = $("#ul_upload_image");
	        
	        if(imglist != undefined && imglist.length > 0) {
				 
				for(var i=0; i<imglist.length; i++) {
					var imgData = imglist[i];
					var li = $(".li_upload_image", ul).eq(0).clone(true);
					var url = imgData.v_image_path;
					var imgNumber = imgData.v_buffer1;
					
					$(".img_upload_image", li).prop("src", url);
					$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
					$(".number", li).text(imgNumber);
					
					li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
					
					// 기존 이미지 셋팅
					jfupload.makeImageUploadTag(imgData, "CMC_PHOTO", "frm", "M");		
					
					// buffer1 생성
					var div 	= $("#div_" + imgData.v_thumbnail_id);
					var inp 	= $("<input/>").prop({"type" : "hidden", "name" : "CMC_PHOTO_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
					inp.appendTo(div);
				} 
			}
		},
		appendUploadImageApp : function (imgData, uploadCd) {
			
			jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "R");
			
			MobilePhotoReg.fn.appendUploadImage(imgData, uploadCd);
			
		},
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_100" + imgData.v_thumbnail_ext;
			var ul = $("#ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var upPhotoCnt = MobilePhotoReg.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			$("#i_sContent").val($("#i_sContent").val() + imgNumber);
			
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
			
			inp.appendTo(div);
			
			if($(".li_upload_image").size() > 1){
				removeErrorMessageBox($("#btnRegister",frm));
			}
			if($(".li_upload_image").size() == 1) {
				addErrorMessageBox($("#btnRegister", frm),"사진을 등록해주세요");
				isResult = false;
				if (target == undefined) {
					target = $("#btnRegister", frm);
				}
			}
		},
		addPopupBtnEvent : function() {
			$(".btn_prod_more").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("#i_iNowPageNo").val(parseInt($("#i_iNowPageNo").val()) + 1);
				MobilePhotoReg.fn.getSearchProdList();
			});
			
			$(".btn_apply").unbind("click").click(function(event) {
				event.preventDefault();
				var arrHtml = [];
				
				$(".chk_reviewProd:checked").each(function() {
					var idx = $(".chk_reviewProd").index($(this));
					
					var prodinfo = $(".span_reviewProd").eq(idx);
					var productcd = $(".span_productcd", prodinfo).text();
					var productnm = $(".span_productnm", prodinfo).text();
					var optioncd = $(".span_optioncd", prodinfo).text();
					var optionnm = $(".span_optionnm", prodinfo).text();
					var optioncnt = parseInt($(".span_optioncnt", prodinfo).text());
					var brandnm = $(".span_brandnm", prodinfo).text();
					var imgpath = $(".span_imgpath", prodinfo).text();
					var saleprice = $(".span_saleprice", prodinfo).text();
					var price = $(".span_price", prodinfo).text();
					var commentcnt = $(".span_commentcnt", prodinfo).text();
					var point = $(".span_point", prodinfo).text();
					var stockqty = parseInt($(".span_stockqty", prodinfo).text());
					var statuscd = $(".span_statuscd", prodinfo).text();
					
					arrHtml.push("<li class=\"li_product\">");
					arrHtml.push("	<a href=\"#\">");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrProductcd\" id=\"input"+productcd+"_"+optioncd+"\" value=\""+productcd+"\"/>");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+optioncd+"\"/>");
					arrHtml.push("		<div class=\"thumbImg\">");
					arrHtml.push("			<span class=\"btn_delete btn_prod_del\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete6.png\" alt=\"삭제\"></span>");
					arrHtml.push("			<img src=\""+imgpath+"\" alt=\""+productnm+"\" onerror=\"fnNoImage(this);\">");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class=\"prodDetail\">");
					arrHtml.push("			<p class=\"brandNm ellipsis\">"+brandnm+"</p>");
					arrHtml.push("			<p class=\"prodNm\">"+getByteString(productnm, 10)+"</p>");
					
					if(optioncnt > 1) {
						arrHtml.push("			<p class=\"option\">"+getByteString(optionnm, 10)+"</p>");
					}
					arrHtml.push("			<p class=\"priceZone\">");
					
					if(price != saleprice) {
						arrHtml.push("			<span class=\"sale\"><em>"+SetNumComma(price)+"</em>원</span>");
					}
					arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(saleprice)+"</em>원</span>");
					arrHtml.push("			</p>");
                    arrHtml.push("			<div class=\"prodEvalu\">");
                    arrHtml.push("				<span class=\"gradeType2 grade0"+point+"\"><span class=\"hide\">평점 "+point+".0</span></span>");
                    arrHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+commentcnt+")</span>");
                    arrHtml.push("			</div>");
                    
                    if(statuscd == "0002" || stockqty == 0) {
                    	arrHtml.push("		<span class=\"stateArea\">");
                    	arrHtml.push("			<span class=\"ico_state st1\">품절</span>");
                    	arrHtml.push("		</span>");
                    }
                    arrHtml.push("		</div>");
                    arrHtml.push("	</a>");
                    arrHtml.push("</li>");
				});
				
				$(".ul_prodList").append(arrHtml.join(""));
				modalPopupClose('#modalPopupProdSearch');
				
				MobilePhotoReg.fn.addBtnEvent();
			});
			
			$(".chk_reviewProd").unbind("click").click(function() {
				if($(this).is(":checked")) {
					var idx = $(".chk_reviewProd").index($(this));
					var id= $(this).val();
					
					if($("#input"+id).length > 0) {
						showMessageBox({
							message : "이미 선택하신 상품이에요."
								, close : function() {
									$(".chk_reviewProd").eq(idx).prop("checked", false);
								}
						});
					}
				}
			});
		},
		goSave : function(flag) {
			$("#i_sFlagAction").val(flag);
			if(MobilePhotoReg.fn.fnValidate()){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_review_save_ajax.do"
					, type : "post"
					, dataType : "json"
					, data : $("form[name='frm']").serialize()
					, async : false
					, animation : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							var rvtypecd = $("input[name='i_sRvTypecd']").val();
							if(rvtypecd =="DC_T002"){
								if($("input[name='i_sTopReview']").val() == "Y"){
									showMessageBox({
										message : data.message
										, close : function() {
											location.href = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_list.do";
										}
									});
								}else{
									showMessageBox({
										message : data.message
										, close : function() {
											location.href = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
										}
									});
								}
							}else{
								showMessageBox({
									message : data.message
									, close : function() {
										location.href = "/mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+data.object+"&i_sFlagMyPouch=Y";
									}
								});
							}
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			}
		},
		setExProdList : function(object){
			var prodlist = object.exProd;
			var arrHtml = [];
			
			if(prodlist != undefined && prodlist.length > 0){
				for(var i = 0; i < prodlist.length; i++){
					var list = prodlist[i];
					arrHtml.push("<li class=\"li_product\">");
					arrHtml.push("	<a href=\"#\">");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrProductcd\" id=\"input"+list.v_productcd+"_"+list.v_optioncd+"\" value=\""+list.v_productcd+"\"/>");
					arrHtml.push("		<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+list.v_optioncd+"\"/>");
					arrHtml.push("		<div class=\"thumbImg\">");
					arrHtml.push("			<span class=\"btn_delete btn_prod_del\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete6.png\" alt=\"삭제\"></span>");
					arrHtml.push("			<img src=\""+list.v_img_web_path+"\" alt=\""+list.v_productnm+"\" onerror=\"fnNoImage(this);\">");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class=\"prodDetail\">");
					arrHtml.push("			<p class=\"brandNm ellipsis\">"+list.v_brandnm+"</p>");
					arrHtml.push("			<p class=\"prodNm\">"+getByteString(list.v_productnm, 10)+"</p>");
					
					if(list.v_optioncnt > 1) {
						arrHtml.push("			<p class=\"option\">"+getByteString(list.v_optionnm, 10)+"</p>");
					}
					arrHtml.push("			<p class=\"priceZone\">");
					
					if(list.n_price != list.n_list_price) {
						arrHtml.push("			<span class=\"sale\"><em>"+SetNumComma(list.n_price)+"</em>원</span>");
					}
					arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(list.n_list_price)+"</em>원</span>");
					arrHtml.push("			</p>");
		            arrHtml.push("			<div class=\"prodEvalu\">");
		            arrHtml.push("				<span class=\"gradeType2 grade0"+Math.round(list.n_single_point)+"\"><span class=\"hide\">평점 "+list.n_single_point+".0</span></span>");
		            arrHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+list.n_review_cnt+")</span>");
		            arrHtml.push("			</div>");
		            
		            if(list.v_statuscd == "0002" || list.n_stockqty == 0) {
		            	arrHtml.push("		<span class=\"stateArea\">");
		            	arrHtml.push("			<span class=\"ico_state st1\">품절</span>");
		            	arrHtml.push("		</span>");
		            }
		            arrHtml.push("		</div>");
		            arrHtml.push("	</a>");
		            arrHtml.push("</li>");
				}
			}
			
			$(".ul_prodList").append(arrHtml.join(""));
			
		},
		getSearchProdList : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_review_prod_search_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {
					i_sKeyword : $("#i_sKeyword").val()
					, i_iNowPageNo : $("#i_iNowPageNo").val()
					, i_sFlagSearch : "Y"
				}
				, async : false
				, animation : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						
						var page = data.object.page;
						var list = data.object.list;
						
						MobilePhotoReg.fn.setSearchProdList(page, list);
						modalPopup("#modalPopupProdSearch");
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setSearchProdList : function(page, object) {
			var arrHtml = [];
			
			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
			$("#i_iRecordCnt").val(page.i_iRecordCnt);
			
			$(".p_searchText>em").text($("#i_sKeyword").val());
			if(object != undefined && object.length > 0) {
				for(var i=0; i<object.length; i++) {
						var levelcd = $("#i_sLevelcd").val();
						var price = productPrice.fn.setProductPrice(object[i], levelcd);
						
						arrHtml.push("<li>");
						arrHtml.push("	<div class=\"prodImg\">");
						arrHtml.push("		<span class=\"inputChk4\">");
						arrHtml.push("			<input type=\"checkbox\" id=\"add"+page.i_iNowPageNo+i+"\" class=\"checkbox chk_reviewProd\" value=\""+object[i].v_productcd+"_"+object[i].v_optioncd+"\">");
						arrHtml.push("			<label for=\"add"+page.i_iNowPageNo+i+"\"><img src=\""+object[i].v_img_web_path+"\" alt=\"\"></label>");
						arrHtml.push("		</span>");
						arrHtml.push("		<span class=\"hide span_reviewProd\">");
						arrHtml.push("			<span class=\"span_productcd\">"+object[i].v_productcd+"</span>");
						arrHtml.push("			<span class=\"span_productnm\">"+object[i].v_productnm+"</span>");
						arrHtml.push("			<span class=\"span_optioncd\">"+object[i].v_optioncd+"</span>");
						arrHtml.push("			<span class=\"span_optioncnt\">"+object[i].n_option_cnt+"</span>");
						arrHtml.push("			<span class=\"span_optionnm\">"+object[i].v_optionnm+"</span>");
						arrHtml.push("			<span class=\"span_brandnm\">"+object[i].v_brandnm+"</span>");
						arrHtml.push("			<span class=\"span_imgpath\">"+object[i].v_img_web_path+"</span>");
						arrHtml.push("			<span class=\"span_price\">"+SetNumComma(object[i].n_list_price)+"</span>");
						arrHtml.push("			<span class=\"span_saleprice\">"+SetNumComma(object[i].n_price)+"</span>");
						arrHtml.push("			<span class=\"span_point\">"+object[i].n_single_point+"</span>");
						arrHtml.push("			<span class=\"span_commentcnt\">"+object[i].n_review_cnt+"</span>");
						arrHtml.push("			<span class=\"span_stockqty\">"+object[i].n_stockqty+"</span>");
						arrHtml.push("			<span class=\"span_statuscd\">"+object[i].v_statuscd+"</span>");
						arrHtml.push("		</span>");
						arrHtml.push("	</div>");
						arrHtml.push("	<div class=\"detail\">");
						arrHtml.push("		<p class=\"brandNm\">"+object[i].v_brandnm+"</p>");
						arrHtml.push("		<p class=\"prodNm\">"+object[i].v_productnm+"</p>");
						
						if(parseInt(object[i].n_option_cnt) > 1) {
							arrHtml.push("	<p class=\"option\">"+object[i].v_optionnm+"</p>");
						}
						
						arrHtml.push("		<p class=\"priceZone\">");
						if(parseInt(price.list_price) > parseInt(price.price)) {
							arrHtml.push("		<span class=\"sale\"><em>"+SetNumComma(price.list_price)+"</em>원</span>");
						}
						
						arrHtml.push("			<span class=\"price\"><em>"+SetNumComma(price.price)+"</em>원</span>");
						arrHtml.push("		</p>");
						arrHtml.push("	</div>");
						arrHtml.push("</li>");
				}
				
				$(".btn_apply").show();
			} else {
				arrHtml.push("<div class=\"nodata\">");
				arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
				arrHtml.push("</div>");
				
				$(".btn_apply").hide();
			}
			
			if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
				$(".btn_prod_more").hide();
			} else {
				$(".btn_prod_more").show();
			}
			
			if(parseInt(page.i_iNowPageNo) == 1) {
				$(".ul_search_prod").html(arrHtml.join(""));
			} else {
				$(".ul_search_prod").append(arrHtml.join(""));
			}
			
			MobilePhotoReg.fn.addPopupBtnEvent();
		}
	}
};

var MobilePhotoRegStyle = {
	init : function() {
		var Link = $.noUiSlider.Link;
        $('#gradeSlider').noUiSlider({
            start: [ 0 ],
            step: 1,
            range: {
                'min': [  0 ],
                'max': [ 5 ]
            },
            serialization: {
                lower: [
                    new Link({
                        target: $("#gradeSlider"),
                        method: MobilePhotoRegStyle.handleSliderValue
                    })
                ]
            }
        });

        $('#gradeSlider2').noUiSlider({
            start: [ 0 ],
            step: 1,
            range: {
                'min': [  0 ],
                'max': [ 5 ]
            },
            serialization: {
                lower: [
                    new Link({
                        target: $("#gradeSlider2"),
                        method: MobilePhotoRegStyle.handleSliderValue2
                    })
                ]
            }
        });
	},
	handleSliderValue : function(value) {
		var val = parseInt(value);
        $('.noUi-target').eq(0).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
        $('.noUi-target').eq(0).addClass('grade-0'+ val);
        $('.radio-a').find('input#range0'+ val).click();
	},
	handleSliderValue2 : function(value) {
		var val = parseInt(value);
        $('.noUi-target').eq(1).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
        $('.noUi-target').eq(1).addClass('grade-0'+ val);
        $('.radio-a2').find('input#range1'+ val).click();
	}
};