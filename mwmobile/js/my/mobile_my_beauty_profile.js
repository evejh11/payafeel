/**
* 모바일 뷰티프로파일 작성
*/

var MobileBeautyProfileGuide = {
	name : "MobileBeautyProfileGuide",
	init : function(){
		
		
		MobileBeautyProfileGuide.fn.addBtnEvent();
	},
	
	fn : {
		addBtnEvent : function(){
			
			$(".btn_ty").unbind("click").click(function(event){
				
				var i_sActionFlag = "R";
				var levelcd = $("input[name='i_sUserlv']").val();
				if(levelcd == 'LV14'){
					showMessageBox({
						message : "임직원이시라면 일반아이디로 로그인하셔야 이용가능하세요."
					});
				}
				else{
					location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_beauty_profile_step1.do?i_sActionFlag="+i_sActionFlag;
				}
			});
			
		}
	}
};

/**
 * 모바일 뷰티프로파일 1단계 등록 처리를 위한 javascript
 */

var beforeAreaIscroll;

var MobileBeautyProfile1 = {
	name : "MobileBeautyProfile1",
	init : function(){
		MobileBeautyProfile1.fn.getPageInit();
		
		beforeAreaIscroll = new iScroll("beforeAreaIscroll",{
	            hScroll:false
		});
	    document.addEventListener('DOMContentLoaded', beforeAreaIscroll, false);
	    
	},
	
	fn : {
		addBtnEvent : function(){
			
			$('button.btnRegister2').unbind("click").click(function(event){
				event.preventDefault();
				
				if($("input:checkbox[name='agree']").prop("checked")){
					if($("input:checkbox[name='i_arrBrandcd']:checked").length == 0){
						showMessageBox({
							message : "선호하는 브랜드를 선택해 주세요."
						});
					}else{
						MobileBeautyProfile1.fn.goNext();
					}
				} 
				else{
					showMessageBox({
						message : "개인정보 수집 및 이용 목적 동의란에 체크해주세요."
						, close : function(){
							$('body, html').animate({
								scrollTop : 0
							}, 500);
						}
					});
				}
			});
			
			
			$(".span_brandcd").unbind("click").click(function() {
				var checkbox = $("input:checkbox[name='i_arrBrandcd']", $(this));
				var cnt = $("input:checkbox[name='i_arrBrandcd']:checked").length;
				
				if(cnt >= 6){
					showMessageBox({
	            		message : "최대 5개 까지 선택하실 수 있어요."
	            	});
					var id = checkbox.attr("id");
					$("#"+id).prop("checked", false);
				}
			});
		},
		
		/**
		 * html 뿌리기, 변경 때는 기존 값 뿌리기
		 */
		getPageInit : function(){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_ajax.do",
				type 	 : "POST",
				animation : false,
				async	: false,
				data 	 : { "i_sTagTypecd" : $("#i_sTagTypecd").val(),
							 "i_sUserid" 	: $("#i_sUserid").val(),
							   i_iFlag 		: $("input[name='i_iFlag']").val() },
				dataType : "json",
				success  : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						
						var obj = data.object;	   		
						var arrHtml = Array();
						var tag= "";
						
						for(var rvo = 0; rvo < obj.Tag.length; rvo++){
							tag = tag+"/"+obj.Tag[rvo].v_tagcd ;
						}
						
						for(var vo = 0; vo < obj.list.length; vo++){
							var brandcd = "/"+obj.list[vo].v_brandcd;
							arrHtml.push("<li>");
							arrHtml.push("<span class='inputChk4 span_brandcd'>");
							
							if(tag.indexOf(brandcd) > -1){
								arrHtml.push("    <input type='checkbox' name='i_arrBrandcd' class='checkbox' id='"+obj.list[vo].v_brandcd+"' value='"+obj.list[vo].v_brandcd+"' checked='checked' />");
								arrHtml.push("    <label for='"+obj.list[vo].v_brandnm+"'><img src='"+obj.list[vo].v_image_t2_path+"' alt='"+obj.list[vo].v_brandnm+"' /></label>");
							} else{
								arrHtml.push("    <input type='checkbox' name='i_arrBrandcd' class='checkbox' id='"+obj.list[vo].v_brandcd+"' value='"+obj.list[vo].v_brandcd+"' />");
								arrHtml.push("    <label for='"+obj.list[vo].v_brandnm+"'><img src='"+obj.list[vo].v_image_t2_path+"' alt='"+obj.list[vo].v_brandnm+"' /></label>");
							}
							arrHtml.push("</span>");
							arrHtml.push("</li>");
						}
						$(arrHtml.join("\n")).appendTo($(".brandList"));
						
						MobileBeautyProfile1.fn.addBtnEvent();
					}
					else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		
		/**
		 * 저장하고 다음으로
		 */
		goNext : function(){
			var frm = $("form[name='frm']");
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_save_ajax.do",
				type		: "POST",
				dataType	: "json",
				animation : false,
				async	: false,
				data		: frm.serialize(),
				success		: function (data, textStatus) {
					
					if(data.status == "succ"){
						var url  = GLOBAL_SSL_URL+"mobile/my/mobile_my_beauty_profile_step2.do";
						if (GLOBAL_FLAG_APP_NEW == "Y") {
							try {
								if(GLOBAL_MOBILE_OS == "AND") {
									MobileBodyStart.setLoginUserInfo();
								}
								else {
									window.webkit.messageHandlers.requestUserInfo.postMessage(null);
								}
							}catch(e){
								console.log(e);
							}
							var arrParam = [];
							if(GLOBAL_LOGIN_KEY != "") {
								$("input[name='i_sLoginKey']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
							}
							if(GLOBAL_LOGIN_TYPE != "") {
								$("input[name='i_sLoginType']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
							}
							$("input[name='i_sDeviceNum']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
							$(arrParam.join("")).appendTo(frm);
						}
						frm.prop("action", url);
						document.frm.submit();
					}
					else{
						showMessageBox({
							message : data.message
						});
					}
				}	
			});		
		},

	}
};

/**
 * 모바일 뷰티프로파일 2단계 등록 처리를 위한 javascript
 */
var MobileBeautyProfile2 = {
		name : "MobileBeautyProfile2",
		init : function(){
			MobileBeautyProfile2.fn.addBtnEvent();
			MobileBeautyProfile2.fn.getBPinInfo();
			
		},
		
		fn : {
		addBtnEvent : function(){
			$('button.btnRegister2').unbind("click").click(function(event){
				event.preventDefault();
				MobileBeautyProfile2.fn.goNext();
			});
			
			$('.btn_back').unbind("click").click(function(event){
				event.preventDefault();
				var frm 	= $("form[name='frm']");
				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							MobileBodyStart.setLoginUserInfo();
						}
						else {
							window.webkit.messageHandlers.requestUserInfo.postMessage(null);
						}
					}catch(e){
						console.log(e);
					}
					var arrParam = [];
					if(GLOBAL_LOGIN_KEY != "") {
						$("input[name='i_sLoginKey']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
					}
					if(GLOBAL_LOGIN_TYPE != "") {
						$("input[name='i_sLoginType']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
					}
					$("input[name='i_sDeviceNum']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
					$(arrParam.join("")).appendTo(frm);
				}
				frm.prop("action", "/mobile/my/mobile_my_beauty_profile_step1.do");
				frm.submit();
			});
			
		},
	
		/**
		 * 원래 뷰티프로파일 데이터 가져오기
		 */
		getBPinInfo : function(){
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_ajax.do",
				type		: "POST",
				dataType	: "json",
				animation : false,
				async	: false,
				data		: { "i_sUserid" : $("#i_sUserid").val(),
								  i_iFlag 	: $("input[name='i_iFlag']").val() },
				success		: function (data, textStatus) {
					if(data.status == "succ"){
						
						var object  = data.object;
						var bp		= object.bprofile;
						
						if(bp != null){
							$("#i_sBirthYear").val(bp.v_birth_year);
							
							if($("#radio1").val() == bp.v_sex){
								$("#radio1").prop("checked", true);
							}
							else if($("#radio2").val() == bp.v_sex){
								$("#radio2").prop("checked", true);
							}
							
						}
						MobileBeautyProfile2.fn.getInitPage(object);
						$("#skintype0").prop("checked", true);
						
					} else{
						showMessageBox({
							message : data.message
						});
					}
					MobileBeautyProfile2.fn.addBtnEvent();
				}	
			});				
			
		},
			
		getInitPage : function(object){
			var type	= object.type;
			var troub = object.trouble;
			var bp	  = object.bprofile;
			var bptag = object.TagList;
			var arrHtml = Array();
			var arrHtml1 = Array();
			
			for(var vo=0; vo < type.length; vo++){
				arrHtml.push("<li>");
				arrHtml.push("<span class='inputRadio'>");
				if(type[vo].v_sub_code1 != 'AT017'){
					if(bp.v_skin_typecd != null && bp.v_skin_typecd.indexOf(type[vo].v_sub_code1) > -1){
						arrHtml.push("    <input type='radio' id='skintype"+vo+"' class='rab' name='i_sSkintype' value='"+type[vo].v_sub_code1+"'checked='checked' />");
						arrHtml.push("    <label for='skintype"+vo+"'>"+type[vo].v_sub_codenm+"</label>");
					} else{
						arrHtml.push("    <input type='radio' id='skintype"+vo+"' class='rab' name='i_sSkintype' value='"+type[vo].v_sub_code1+"' />");
						arrHtml.push("    <label for='skintype"+vo+"'>"+type[vo].v_sub_codenm+"</label>");
					}
				}
				arrHtml.push("</span>");
				arrHtml.push("</li>");
			}
			
			var temp = "";
			for(var vo=0; vo < bptag.length; vo++){
				if(bptag[vo].v_tag_typecd == 'SKIN_TROUBLE'){
					temp = temp + "/" + bptag[vo].v_tagcd;
				}
			}
			
			for(var i=0; i < troub.length; i ++){
				arrHtml1.push("<li>");
				arrHtml1.push("<span class='inputChk'>");
				if(temp.indexOf(troub[i].v_sub_code1) > -1 ){
					arrHtml1.push("    <input type='checkbox' id='"+troub[i].v_sub_code1+"' class='checkbox' name='i_arrSkintrouble' value='"+troub[i].v_sub_code1+"' checked='checked'/>");
					arrHtml1.push("    <label for='"+troub[i].v_sub_code1+"'>"+troub[i].v_sub_codenm+"</label>");
				} else {
					arrHtml1.push("    <input type='checkbox' id='"+troub[i].v_sub_code1+"' class='checkbox' name='i_arrSkintrouble' value='"+troub[i].v_sub_code1+"'/>");
					arrHtml1.push("    <label for='"+troub[i].v_sub_code1+"'>"+troub[i].v_sub_codenm+"</label>");
				}
				arrHtml1.push("</span>");
				arrHtml1.push("</li>");
			}
			
			$(arrHtml.join("\n")).appendTo($(".skintype"));		
			$(arrHtml1.join("\n")).appendTo($(".skintrouble"));					
			
		},
		/**
		 * 저장하고 다음으로
		 */
		goNext : function(){
			var frm = $("form[name='frm']");
			if(MobileBeautyProfile2.fn.isValidation()){
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_save_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation : false,
					async	: false,
					data		: frm.serialize(),
					success		: function (data, textStatus) {
						
						if(data.status == "succ"){
							var url  = GLOBAL_SSL_URL+"mobile/my/mobile_my_beauty_profile_step3.do";
							if (GLOBAL_FLAG_APP_NEW == "Y") {
								try {
									if(GLOBAL_MOBILE_OS == "AND") {
										MobileBodyStart.setLoginUserInfo();
									}
									else {
										window.webkit.messageHandlers.requestUserInfo.postMessage(null);
									}
								}catch(e){
									console.log(e);
								}
								var arrParam = [];
								if(GLOBAL_LOGIN_KEY != "") {
									$("input[name='i_sLoginKey']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
								}
								if(GLOBAL_LOGIN_TYPE != "") {
									$("input[name='i_sLoginType']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
								}
								$("input[name='i_sDeviceNum']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
								$(arrParam.join("")).appendTo(frm);
							}
							frm.prop("action", url);
							document.frm.submit();
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
		
		/*
		 * 2단계 유효성 검사
		 */
		isValidation : function(){
			var isResult = true;
			
			var age_pattern = /^[0-9]{4,4}$/;
			var today = new Date();
			var year = today.getFullYear();
			var skintrouble = $("input:checkbox[name='i_arrSkintrouble']:checked");
			if($("#i_sBirthYear").val() == ""){
				showMessageBox({
					message : "출생연도를 입력해주세요."
					, close : function(){
						$("#i_sBirthYear").focus();
					}
				});
				return false;
			}
			var yearchk = $("#i_sBirthYear").val().substring(0, 1);
			if(!age_pattern.test($("#i_sBirthYear").val()) || year < parseInt($("#i_sBirthYear").val()) || yearchk == '0'){
				showMessageBox({
					message : "출생연도를 재입력해주세요"
					, close : function(){
						$("#i_sBirthYear").focus();
					}
				});
				return false;
			}
			
			if(skintrouble.length < 1){
				showMessageBox({
					message : "피부고민을 한 개이상 입력해주세요."
				});
				return false;
			}
			return isResult;
		}	
	}
};

/**
 * 모바일 뷰티프로파일 3단계 등록 처리를 위한 javascript
 */
var MobileBeautyProfile3 = {
		name : "MobileBeautyProfile3",
		init : function(){
			
			MobileBeautyProfile3.fn.getPageInit();
		},
		
		fn : {
			addBtnEvent : function(){
				$('button.btnRegister2').unbind("click").click(function(event){
					event.preventDefault();
					
					var makeupstyle = $("input:checkbox[name='i_arrMakeupst']:checked");
					
					if(makeupstyle.length >= 1){
						MobileBeautyProfile3.fn.goNext();
					} else if(makeupstyle.length == 0){
						showMessageBox({
							message : "메이크업 스타일을 하나 이상 선택해주세요."
						});
					}
				});
				
				$('.btn_back').unbind("click").click(function(event){
					event.preventDefault();
					var frm 	= $("form[name='frm']");
					if (GLOBAL_FLAG_APP_NEW == "Y") {
						try {
							if(GLOBAL_MOBILE_OS == "AND") {
								MobileBodyStart.setLoginUserInfo();
							}
							else {
								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
							}
						}catch(e){
							console.log(e);
						}
						var arrParam = [];
						if(GLOBAL_LOGIN_KEY != "") {
							$("input[name='i_sLoginKey']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
						}
						if(GLOBAL_LOGIN_TYPE != "") {
							$("input[name='i_sLoginType']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
						}
						$("input[name='i_sDeviceNum']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
						$(arrParam.join("")).appendTo(frm);
					}
					frm.prop("action", "/mobile/my/mobile_my_beauty_profile_step2.do");
					document.frm.submit();
				});
			},
			
		
				
			getPageInit : function(){
				
				MobileCommon.ajax({
					  url		: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_ajax.do"
					, type		: "POST"
					, dataType	: "json"
					, animation : false
					, async	: false
					, data 		: { i_sTagTypecd: $("#i_sTagTypecd").val(),
						  			 i_iFlag 	: $("input[name='i_iFlag']").val() }
					, success	: function (data, textStatus) {
						if(data.status == "succ"){
							
							var list	= data.object.list;
							var bptag	= data.object.Taglist;
							var arrHtml	= Array();
							var temp 	= "";
							
							for(var vo=0; vo < bptag.length; vo++){
								if(bptag[vo].v_tag_typecd == 'MAKEUP_STYLE'){
									temp = temp + "/" + bptag[vo].v_tagcd;
								}
							}
							for(var vo=0; vo < list.length; vo++){
								if(list[vo].v_buffer1 == 'MAKEUP_STYLE'){
									
									arrHtml.push("<li>");
									arrHtml.push("<span class='inputChk'>");
									if(temp != null && temp.indexOf(list[vo].v_sub_code1) > -1){
										arrHtml.push("    <input type='checkbox' id='m"+vo+"' name='i_arrMakeupst' value='"+list[vo].v_sub_code1+"' class='checkbox' checked='checked' />");
										arrHtml.push("    <label for='m"+vo+"'>"+list[vo].v_sub_codenm+"</label>");
									} else{
										arrHtml.push("    <input type='checkbox' id='m"+vo+"' name='i_arrMakeupst' value='"+list[vo].v_sub_code1+"' class='checkbox' />");
										arrHtml.push("    <label for='m"+vo+"'>"+list[vo].v_sub_codenm+"</label>");
									}
									arrHtml.push("</span>");
									arrHtml.push("</li>");
								}
							}
							$(arrHtml.join("\n")).appendTo($(".makeupStyle"));
						} else{
							showMessageBox({
								message : data.message
							});
						}
						MobileBeautyProfile3.fn.addBtnEvent();
					}
				});
				
			},	
			/**
			 * 저장하고 다음으로
			 */
			goNext : function(){
				var frm = $("form[name='frm']");
				
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_save_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation : false,
					async	: false,
					data		: frm.serialize(),
					success		: function (data, textStatus) {
						
						if(data.status == "succ"){
							var url  = GLOBAL_SSL_URL+"mobile/my/mobile_my_beauty_profile_step4.do";
							if (GLOBAL_FLAG_APP_NEW == "Y") {
								try {
									if(GLOBAL_MOBILE_OS == "AND") {
										MobileBodyStart.setLoginUserInfo();
									}
									else {
										window.webkit.messageHandlers.requestUserInfo.postMessage(null);
									}
								}catch(e){
									console.log(e);
								}
								var arrParam = [];
								if(GLOBAL_LOGIN_KEY != "") {
									$("input[name='i_sLoginKey']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
								}
								if(GLOBAL_LOGIN_TYPE != "") {
									$("input[name='i_sLoginType']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
								}
								$("input[name='i_sDeviceNum']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
								$(arrParam.join("")).appendTo(frm);
							}
							frm.prop("action", url);
							document.frm.submit();
						} else{
							showMessageBox({
								message : data.message
							});
						}
					}	
				});			
			},
			
		}
	};

/**
 * 모바일 뷰티프로파일 4단계 등록 처리를 위한 javascript
 */
var MobileBeautyProfile4 = {
		name : "MobileBeautyProfile4",
		init : function(){
			
			MobileBeautyProfile4.fn.getPageInit();
//			MobileBeautyProfile4.fn.addBtnEvent();
		},
		
		fn : {
			addBtnEvent : function(){
				
				$('.btn_back').unbind("click").click(function(event){
					event.preventDefault();
					var frm 	= $("form[name='frm']");
					if (GLOBAL_FLAG_APP_NEW == "Y") {
						try {
							if(GLOBAL_MOBILE_OS == "AND") {
								MobileBodyStart.setLoginUserInfo();
							}
							else {
								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
							}
						}catch(e){
							console.log(e);
						}
						var arrParam = [];
						if(GLOBAL_LOGIN_KEY != "") {
							$("input[name='i_sLoginKey']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
						}
						if(GLOBAL_LOGIN_TYPE != "") {
							$("input[name='i_sLoginType']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
						}
						$("input[name='i_sDeviceNum']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
						$(arrParam.join("")).appendTo(frm);
					}
					frm.prop("action", "/mobile/my/mobile_my_beauty_profile_step3.do");
					document.frm.submit();
				});
				
				$("#goNext").unbind("click").click(function(event){
					event.preventDefault();
					
					var validate = true;
					var flag_chk = $("input:radio[name='i_sSkintone']:checked").length;
					if(flag_chk == 0){
						 showMessageBox({
							 message : "피부톤을 선택해주세요."
						 });
						 validate = false;
					}
					if(validate){
						MobileBeautyProfile4.fn.goNext();
					}
				});
				$("#myskintone").unbind("click").click(function(event){
					event.preventDefault();
					$(".resultArea").hide();
					$("#spring").hide();
					$("#summer").hide();
					$("#autumn").hide();
					$("#winter").hide();
					
					var tot = 0;
					for(var vo =1; vo <= 5; vo++){
						tot = tot + $("input[name='Q0"+vo+"']:checked").length;
					}
					if(tot != 5){
						showMessageBox({
							message : "설문에 모두 답해주세요."
							});
						return ;
					} else if(tot == 5){
						MobileBeautyProfile4.fn.Questionaire();
					}
				});
			},

			/**
			 * 화면 html 뿌리기
			 */
			getPageInit : function(){
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation : false,
					async	: false,
					data		: { i_sUserid	: $("#i_sUserid").val(),
									i_iFlag		: $("input[name='i_iFlag']").val() },
					success		: function (data, textStatus) {
						if(data.status == "succ"){
							
							var list	= data.object.list;
							var survey  = data.object.survey;
							var bp		= data.object.bprofile;
							var arrHtml	 = Array();
							var arrHtml1 = Array();
							var arrHtml2 = Array();
							var arrHtml3 = Array();
							var arrHtml4 = Array();
							var arrHtml5 = Array();
							
							for(var vo=0; vo < list.length; vo++){
								
								if(list[vo].v_buffer1 == 'SKIN_TONE'){
									arrHtml.push("<li>");
									arrHtml.push("<span class='inputRadio'>");
									if(bp.v_skin_tone != null && bp.v_skin_tone.indexOf(list[vo].v_sub_codenm) > -1){
										arrHtml.push("    <input type='radio' id='skintone"+vo+"' class='rab' name='i_sSkintone' value='"+list[vo].v_sub_code1+"' checked='checked' />");
										arrHtml.push("    <label for='skintone"+vo+"'>"+list[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml.push("    <input type='radio' id='skintone"+vo+"' class='rab' name='i_sSkintone' value='"+list[vo].v_sub_code1+"' />");
										arrHtml.push("    <label for='skintone"+vo+"'>"+list[vo].v_sub_codenm+"</label>");
									}
									arrHtml.push("</span>");
									arrHtml.push("</li>");
									
								}
								
							}
							$(arrHtml.join("\n")).appendTo($(".Skintone ul"));
							
							for(var vo=0; vo < survey.length; vo++){
								if(survey[vo].v_buffer1 == 'Q01'){
									arrHtml1.push("<li>");
									arrHtml1.push("<span class='inputRadio'>");
									if(bp.v_skin_color != null && bp.v_skin_color.indexOf(survey[vo].v_sub_codenm) > -1){
										arrHtml1.push("    <input type='radio' id='skincolor"+vo+"' class='rab' name='Q01' value='"+survey[vo].v_sub_code1+"' checked='checked'/>");
										arrHtml1.push("    <label for='skincolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml1.push("    <input type='radio' id='skincolor"+vo+"' class='rab' name='Q01' value='"+survey[vo].v_sub_code1+"' />");
										arrHtml1.push("    <label for='skincolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}
									arrHtml1.push("</span>");
									arrHtml1.push("</li>");
								}
								if(survey[vo].v_buffer1 == 'Q02'){
									arrHtml2.push("<li>");
									arrHtml2.push("<span class='inputRadio'>");
									if(bp.v_hair_color != null && bp.v_hair_color.indexOf(survey[vo].v_sub_codenm) > -1){
										arrHtml2.push("    <input type='radio' id='haircolor"+vo+"' class='rab' name='Q02' value='"+survey[vo].v_sub_code1+"' checked='checked'/>");
										arrHtml2.push("    <label for='haircolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml2.push("    <input type='radio' id='haircolor"+vo+"' class='rab' name='Q02' value='"+survey[vo].v_sub_code1+"' />");
										arrHtml2.push("    <label for='haircolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}
									arrHtml2.push("</span>");
									arrHtml2.push("</li>");
								}
								if(survey[vo].v_buffer1 == 'Q03'){
									arrHtml3.push("<li>");
									arrHtml3.push("<span class='inputRadio'>");
									if(bp.v_eye_color != null && bp.v_eye_color.indexOf(survey[vo].v_sub_codenm) > -1){
										arrHtml3.push("    <input type='radio' id='eyecolor"+vo+"' class='rab' name='Q03' value='"+survey[vo].v_sub_code1+"' checked='checked'/>");
										arrHtml3.push("    <label for='eyecolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml3.push("    <input type='radio' id='eyecolor"+vo+"' class='rab' name='Q03' value='"+survey[vo].v_sub_code1+"' />");
										arrHtml3.push("    <label for='eyecolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}
									arrHtml3.push("</span>");
									arrHtml3.push("</li>");
								}
								if(survey[vo].v_buffer1 == 'Q04'){
									arrHtml4.push("<li>");
									arrHtml4.push("<span class='inputRadio'>");
									if(bp.v_lipstick_color != null && bp.v_lipstick_color.indexOf(survey[vo].v_sub_codenm) > -1){
										arrHtml4.push("    <input type='radio' id='lipcolor"+vo+"' class='rab' name='Q04' value='"+survey[vo].v_sub_code1+"' checked='checked'/>");
										arrHtml4.push("    <label for='lipcolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml4.push("    <input type='radio' id='lipcolor"+vo+"' class='rab' name='Q04' value='"+survey[vo].v_sub_code1+"' />");
										arrHtml4.push("    <label for='lipcolor"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}
									arrHtml4.push("</span>");
									arrHtml4.push("</li>");
								}
								if(survey[vo].v_buffer1 == 'Q05'){
									arrHtml5.push("<li>");
									arrHtml5.push("<span class='inputRadio'>");
									if(bp.v_image_typecd != null && bp.v_image_typecd.indexOf(survey[vo].v_sub_codenm) > -1){
										arrHtml5.push("    <input type='radio' id='feel"+vo+"' class='rab' name='Q05' value='"+survey[vo].v_sub_code1+"' checked='checked'/>");
										arrHtml5.push("    <label for='feel"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}else{
										arrHtml5.push("    <input type='radio' id='feel"+vo+"' class='rab' name='Q05' value='"+survey[vo].v_sub_code1+"' />");
										arrHtml5.push("    <label for='feel"+vo+"'>"+survey[vo].v_sub_codenm+"</label>");
									}
									arrHtml5.push("</span>");
									arrHtml5.push("</li>");
								}
							}
//							$("#skintone22").prop("checked", true);
							$(arrHtml1.join("\n")).appendTo($(".skin_color"));
							$(arrHtml2.join("\n")).appendTo($(".hair_color"));
							$(arrHtml3.join("\n")).appendTo($(".eye_color"));
							$(arrHtml4.join("\n")).appendTo($(".lip_color"));
							$(arrHtml5.join("\n")).appendTo($(".feel1"));
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
						
						MobileBeautyProfile4.fn.addBtnEvent();
					}
				});
				
			},
			
			/**
			 * 저장하고 다음으로
			 */
			goNext : function(){
				
				var frm = $("form[name='frm']");
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_save_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation : false,
					async	: false,
					data		: frm.serialize(),
					success		: function (data, textStatus) {
						
						if(data.status == "succ"){
							var url  = GLOBAL_SSL_URL+"mobile/my/mobile_my_beauty_profile_step5.do";
							if (GLOBAL_FLAG_APP_NEW == "Y") {
								try {
									if(GLOBAL_MOBILE_OS == "AND") {
										MobileBodyStart.setLoginUserInfo();
									}
									else {
										window.webkit.messageHandlers.requestUserInfo.postMessage(null);
									}
								}catch(e){
									console.log(e);
								}
								var arrParam = [];
								if(GLOBAL_LOGIN_KEY != "") {
									$("input[name='i_sLoginKey']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
								}
								if(GLOBAL_LOGIN_TYPE != "") {
									$("input[name='i_sLoginType']", frm).remove();
									arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
								}
								$("input[name='i_sDeviceNum']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
								$(arrParam.join("")).appendTo(frm);
							}
							frm.prop("action", url);
							document.frm.submit();
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
					}	
				});
			},
			
			/*
			 * 4단계 설문조사
			 */
			Questionaire : function(){
				
				var a = 0;
				var b = 0;
				var c = 0;
				var d = 0;
				var answer		= [];
				var answer_num	= [];
				
				answer[0]		= $("input[name='Q01']:checked").val();
				answer[1]		= $("input[name='Q02']:checked").val();
				answer[2]		= $("input[name='Q03']:checked").val();
				answer[3]		= $("input[name='Q04']:checked").val();
				answer[4]		= $("input[name='Q05']:checked").val();
				
				answer_num[0] 	= answer[0].substring(answer[0].indexOf("A"));
				answer_num[1] 	= answer[1].substring(answer[1].indexOf("A"));
				answer_num[2] 	= answer[2].substring(answer[2].indexOf("A"));
				answer_num[3] 	= answer[3].substring(answer[3].indexOf("A"));
				answer_num[4] 	= answer[4].substring(answer[4].indexOf("A"));
				
				if(answer_num[0] == "A01"){
					a++;
					c++;
				}
				else{
					b++;
					d++;
				}
				for(var i=1; i <= 5; i++){
					if(answer_num[i] == "A01"){
						a++;
					} else if(answer_num[i] == "A02"){
						b++;
					} else if(answer_num[i] == "A03"){
						c++;
					} else if(answer_num[i] == "A04"){
						d++;
					}
				}
				
				var tone 	= "";
				var maxval 	= 0;
				var id  	= "";
				
				(a > b) ? (max = "a", maxval = a, tone="spring", id="skintone22") : (max = "b", maxval = b, tone="summer", id="skintone23");
				(maxval > c) ?  "" : (max = "c", maxval = c, tone="autumn", id="skintone24");
				(maxval > d) ?  "" : (max = "d", maxval = d, tone="winter", id="skintone25");
				
				$(".resultArea").show();
				$("#"+tone).show();
				$('body, html').animate({
					scrollTop : 0
				}, 500);
				
				$("#"+id).prop("checked", true);

			}
			
		}
	};

/**
 * 모바일 뷰티프로파일 5단계 등록 처리를 위한 javascript
 */
var MobileBeautyProfile5 = {
		name : "MobileBeautyProfile5",
		init : function(){
			
			MobileBeautyProfile5.fn.getPageInit();
			$("#radio01").prop("checked", true);
			MobileBeautyProfile5.fn.addBtnEvent();
		},
		
		fn : {
			addBtnEvent : function(){
				
				$('.btn_back').unbind("click").click(function(event){
					event.preventDefault();
					var frm 	= $("form[name='frm']");
					if (GLOBAL_FLAG_APP_NEW == "Y") {
						try {
							if(GLOBAL_MOBILE_OS == "AND") {
								MobileBodyStart.setLoginUserInfo();
							}
							else {
								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
							}
						}catch(e){
							console.log(e);
						}
						var arrParam = [];
						if(GLOBAL_LOGIN_KEY != "") {
							$("input[name='i_sLoginKey']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
						}
						if(GLOBAL_LOGIN_TYPE != "") {
							$("input[name='i_sLoginType']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
						}
						$("input[name='i_sDeviceNum']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
						$(arrParam.join("")).appendTo(frm);
					}
					frm.prop("action", "/mobile/my/mobile_my_beauty_profile_step5.do");
					document.frm.submit();
				});
				
	            $('.radioTy input[type=radio]').change(function () {
	                $(this).parent().parent().removeClass().addClass('radioTy');
	                var $val = $(this).prop("class").split("radio");
	                
	                $num = $val[1];

	                if($num == 1){
	                    $(this).parent().parent().addClass('grade-01');
	                } else if($num == 2){
	                    $(this).parent().parent().addClass('grade-02');
	                } else if($num == 3){
	                    $(this).parent().parent().addClass('grade-03');
	                } else if($num == 4){
	                    $(this).parent().parent().addClass('grade-04');
	                } else if($num == 5){
	                    $(this).parent().parent().addClass('grade-05');
	                } 
	            });
	            
	            
	            $("button.btnRegister2").unbind("click").click(function(event){
	    				event.preventDefault();
	    				MobileBeautyProfile5.fn.pointVal();
	            });
			},
			
			getBPInfo : function(){
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation : false,
					async	: false,
					data		: { i_sUserid	: $("input[name='i_sUserid']").val(),
									i_iFlag		: $("input[name='i_iFlag']").val() },
					success		: function (data, textStatus) {
						
						if(data.status == "succ"){
							var tag  = data.object.taglist;
							
							MobileBeautyProfile5.fn.setTagdata(tag);
						} else{
							showMessageBox({
								message : data.message
							});
						}
					}	
				});		
			},
			/**
			 * 저장된 값 체크해주기(변경할 때)
			 */
			setTagdata : function(tag){
				
				for(var vo=0; vo < tag.length; vo++){
					if(tag[vo].v_tag_typecd == 'SKINCARE'){
						var a = tag[vo].v_tagcd;
						$("#radio0"+a).prop("checked", true);
						$("#radio0"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'MAKEUP'){
						var a = tag[vo].v_tagcd;
						$("#radio1"+a).prop("checked", true);
						$("#radio1"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'NAIL'){
						var a = tag[vo].v_tagcd;
						$("#radio2"+a).prop("checked", true);
						$("#radio2"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'HAIR'){
						var a = tag[vo].v_tagcd;
						$("#radio3"+a).prop("checked", true);
						$("#radio3"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'BODYCARE'){
						var a = tag[vo].v_tagcd;
						$("#radio4"+a).prop("checked", true);
						$("#radio4"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'PERFUME'){
						var a = tag[vo].v_tagcd;
						$("#radio5"+a).prop("checked", true);
						$("#radio5"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'BEAUTYFOOD'){
						var a = tag[vo].v_tagcd;
						$("#radio6"+a).prop("checked", true);
						$("#radio6"+a).parent().parent().addClass('grade-0'+a);
					}
					if(tag[vo].v_tag_typecd == 'TEA'){
						var a = tag[vo].v_tagcd;
						$("#radio7"+a).prop("checked", true);
						$("#radio7"+a).parent().parent().addClass('grade-0'+a);
					}
				}
				
			},
			
			getPageInit : function(){
				
				var arrHtml1 = Array();
				var arrHtml2 = Array();
				var arrHtml3 = Array();
				var arrHtml4 = Array();
				var arrHtml5 = Array();
				var arrHtml6 = Array();
				var arrHtml7 = Array();
				var arrHtml8 = Array();
				
				for(var i=1; i <=5; i++){
							
					arrHtml1.push("<label for='radio0"+i+"'><input type='radio' id='radio0"+i+"' class='radio"+i+"' name='radio0' value='"+i+"'/></label>");
					arrHtml2.push("<label for='radio1"+i+"'><input type='radio' id='radio1"+i+"' class='radio"+i+"' name='radio1' value='"+i+"'/></label>");
					arrHtml3.push("<label for='radio2"+i+"'><input type='radio' id='radio2"+i+"' class='radio"+i+"' name='radio2' value='"+i+"'/></label>");
					arrHtml4.push("<label for='radio3"+i+"'><input type='radio' id='radio3"+i+"' class='radio"+i+"' name='radio3' value='"+i+"'/></label>");
					arrHtml5.push("<label for='radio4"+i+"'><input type='radio' id='radio4"+i+"' class='radio"+i+"' name='radio4' value='"+i+"'/></label>");
					arrHtml6.push("<label for='radio5"+i+"'><input type='radio' id='radio5"+i+"' class='radio"+i+"' name='radio5' value='"+i+"'/></label>");
					arrHtml7.push("<label for='radio6"+i+"'><input type='radio' id='radio6"+i+"' class='radio"+i+"' name='radio6' value='"+i+"'/></label>");
					arrHtml8.push("<label for='radio7"+i+"'><input type='radio' id='radio7"+i+"' class='radio"+i+"' name='radio7' value='"+i+"'/></label>");
				}
				
				$(arrHtml1.join("\n")).appendTo($("#skincare"));
				$(arrHtml2.join("\n")).appendTo($("#makeup"));
				$(arrHtml3.join("\n")).appendTo($("#nail"));
				$(arrHtml4.join("\n")).appendTo($("#hair"));
				$(arrHtml5.join("\n")).appendTo($("#bodycare"));
				$(arrHtml6.join("\n")).appendTo($("#perfume"));
				$(arrHtml7.join("\n")).appendTo($("#bfood"));
				$(arrHtml8.join("\n")).appendTo($("#tea"));

				MobileBeautyProfile5.fn.getBPInfo();
			},
			
			Validation : function(){
				var validate = true;
				
				var skin 	= $("input:radio[name='radio0']:checked").length;
				var makeup	= $("input:radio[name='radio1']:checked").length;
				var nail	= $("input:radio[name='radio2']:checked").length;
				var hair	= $("input:radio[name='radio3']:checked").length;
				var body	= $("input:radio[name='radio4']:checked").length;
				var perfume	= $("input:radio[name='radio5']:checked").length;
				var bfood	= $("input:radio[name='radio6']:checked").length;
				var tea		= $("input:radio[name='radio7']:checked").length;

				var tot 	= skin + makeup + nail + hair + body + perfume + bfood + tea;
				
				if(tot != 8 ){
					showMessageBox({
						message : "영역별 관심도를 선택해주세요."
					});
					validate = false;
				}
				
				return validate;
			},
			
			pointVal : function(){
				
				var i_sTagTypecd = "/SKINCARE/MAKEUP/NAIL/HAIR/BODYCARE/PERFUME/BEAUTYFOOD/TEA";
				var i_sPoint = "";
				for(var i=0; i <=7; i++){
					var arrPoint = $("input:radio[name='radio"+i+"']");
					
					arrPoint.each(function(j){
						
						if(arrPoint.eq(j).is(":checked")){
							i_sPoint = i_sPoint + "/" +arrPoint.eq(j).val();
						}
					});
				}
				
				MobileBeautyProfile5.fn.goSave(i_sTagTypecd, i_sPoint);
			},
			
			/**
			 * 저장
			 */
			goSave : function(i_sTagTypecd, i_sPoint){
				if(MobileBeautyProfile5.fn.Validation()){
					MobileCommon.ajax({
						url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_save_ajax.do",
						type		: "POST",
						dataType	: "json",
						animation : false,
						async	: false,
						data		: { i_sUserid		: $("input[name='i_sUserid']").val(),
										i_sTagTypecd 	: i_sTagTypecd,
										i_sPoint 		: i_sPoint, 
										i_sActionFlag	: $("input[name='i_sActionFlag']").val(),
										i_iFlag			: $("input[name='i_iFlag']").val() },
						success		: function (data, textStatus) {
							
							if(data.status == "succ"){
								var frm = $("form[name='frm']");
								if($("input[name='i_sEventYn']", frm).val() == "Y"){
									location.href = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
								} else{
									location.href = GLOBAL_SSL_URL +"mobile/my/mobile_my_beauty_profile.do";
								}
							}
							else{
								showMessageBox({
									message : data.message
								});
							}
						}
					});	
				}
			}
		}
	};

/**
 * 모바일 뷰티프로파일 결과화면의 이벤트 처리를 위한 Javascript
 */
var brandproiscroller,
    offset = 0;
var winW = $(window).width();
var $aw = 0;

var	MobileBeautyProfile= {
	name : "MobileBeautyProfile",

	init : function() {
		
		MobileBeautyProfile.fn.setSubMenuChange();
		MobileBeautyProfile.fn.addBtnEvent();
		MobileBeautyProfile.fn.setScroll();
	},
	
	fn :{
		
		/**
		 * 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_ROOT +"mobile/my/" + $(this).val() + ".do";
			});
		},
		
		addBtnEvent : function(){
			
			$(".btn_back").unbind("click").click(function(event){
				event.preventDefault();
				location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_main.do";
			});
			
			$(".btn_ty3 a").unbind("click").click(function(event){
        	  
				showConfirmBox({
	  				message : "뷰티프로파일 삭제시에 적립되었던 블루리본 포인트가 차감됩니다.<br/>정말로 뷰티프로파일을 삭제 하시겠습니까?"
	  				, ok_func : function () {
	  					MobileBeautyProfile.fn.goDelete();
	  				}
	  			});
			});
			
			$(".btn_ty a").unbind("click").click(function(event){
		        	  
					showConfirmBox({
		  				message : "뷰티프로파일을 변경하시겠습니까?"
		  				, ok_func : function () {
		  					MobileBeautyProfile.fn.goModify();
		  				}
		  			});
	          });
			
			$(".brandList li a").unbind("click").click(function(){
				// 해당 브랜드 제품리스트 페이지로 이동함.
				var brandcd		= $(this).attr("id");
				var flagAppOpen	=  $(this).attr("data_app_open");

				if(GLOBAL_FLAG_APP_NEW == "Y") {
					if(flagAppOpen == "Y") {
						try {
							if(GLOBAL_MOBILE_OS == "AND") {
								window.Android.gotoBrandPage(brandcd);
							}
							else {
								window.webkit.messageHandlers.gotoBrandPage.postMessage(brandcd);
							}
						}
						catch(e) {
						}
					}
				}
				else {
					location.href = GLOBAL_WEB_ROOT +"mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd="+brandcd+"";
				}
				
			});
			
		},
		
		/**
		 * 뷰티프로파일 변경 
		 */
		goModify : function(){
			var frm	= document.frm;
			frm['i_sActionFlag'].value = "M";
			if (GLOBAL_FLAG_APP_NEW == "Y") {
				try {
					if(GLOBAL_MOBILE_OS == "AND") {
						MobileBodyStart.setLoginUserInfo();
					}
					else {
						window.webkit.messageHandlers.requestUserInfo.postMessage(null);
					}
				}catch(e){
					console.log(e);
				}
				var arrParam = [];
				if(GLOBAL_LOGIN_KEY != "") {
					$("input[name='i_sLoginKey']", $("form[name='frm']")).remove();
					arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
				}
				if(GLOBAL_LOGIN_TYPE != "") {
					$("input[name='i_sLoginType']", $("form[name='frm']")).remove();
					arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
				}
				$("input[name='i_sDeviceNum']", $("form[name='frm']")).remove();
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
				$(arrParam.join("")).appendTo($("form[name='frm']"));
			}
			frm.action = "/mobile/my/mobile_my_beauty_profile_step1.do";
			frm.submit();
		},
		
		/**
		 * 뷰티프로파일 삭제
		 */
		goDelete : function(){
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_beauty_profile_delete_ajax.do",
				type		: "POST",
				dataType	: "json",
				animation : false,
				async	: false,
				data		: { "i_sFlagAction" : "D" ,
								"i_sUserid"		: $("#i_sUserid").val() },
				success		: function (data, textStatus) {
					if(data.status == "succ"){
						location.href = GLOBAL_SSL_URL + 'mobile/my/mobile_my_beauty_profile_guide.do';
					} else{
						showMessageBox({
							message : data.message
						});
					}
				}	
			});	
			
		},
		
		
        //iscroll 브랜드 로고 스크롤 처리
        setScroll : function(){
        	MobileBeautyProfile.fn.scrollWidth();
            brandproiscroller = new iScroll('brandproiscroller', {
                    zoom:false,
                    momentum: true,
                    vScroll:false,
                    hScrollbar:false,
                    onBeforeScrollStart:function(e){
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    onScrollMove: MobileBeautyProfile.fn.scrollHandler,
                    onScrollEnd: MobileBeautyProfile.fn.scrollHandler
                    
            });
            
            $( '.btn_next' ).click( function() {
            	MobileBeautyProfile.fn.Next();
            });
            $( '.btn_prev' ).click( function() {
            	MobileBeautyProfile.fn.Prev();
            });
            
        },


        //iscroll 가로값 체크
        scrollWidth : function(){
//                var $brandList = $(".brandList li");
            $(".brandList li").each(function(){
                var $eW = $(this).width();
                $aw = $aw + $eW;
            });
            $('.brandList').css('width',$aw);            	
        	
        },
        
        //iscroll핸들러
        scrollHandler : function(){
        	if(this.x || this.x === 0) {
        		offset = this.x;
        	}
        },
        
        //iscroll btn next
        Next : function(){
            offset -= (48 * 5);
            if ( offset < - $aw + winW ) {
                offset = - $aw + winW; // don't exceed this limit
            }
            brandproiscroller.scrollTo(offset,0,400);
        },
        
        //iscroll btn prev 
        Prev : function(){
            offset += (48 * 5);
            if ( offset > 0 ) {
                offset = 0; // don't exceed this limit
            }
            brandproiscroller.scrollTo(offset,0,400);
        },
        

	}
};
