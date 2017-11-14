var flagvalidate = "N";
var	MobileCmcReport = {
	name : "MobileCmcReport",
	init : function() {
		MobileCmcReport.fn.ConReport();
		MobileCmcReport.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent:function(){
			$(".btn_back").unbind("click").click(function(event){
				var frm = $("form[name='frm']");
				var url = $("input[name='i_sReturnUrl']",frm).val();
				event.preventDefault();
				location.href =url;
			});
			$(".btn_cancel").unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
				var url = $("input[name='i_sReturnUrl']",frm).val();
				showConfirmBox({
					message : "취소하시겠어요?"
						, ok_func : function(){	
							if (GLOBAL_FLAG_APP_NEW == "Y") {
								if(isEmpty(url)) {
									MobileBodyStart.fnWebViewClose();
								}
								else {
									location.href = url;
								}
							}
							else {
								location.href = url;
							}
						}
					});
			});
			$(".btn_report").unbind("click").click(function(event){
				event.preventDefault();
				MobileCmcReport.fn.goReport();
			});
			$("input:radio[name='report']").unbind("change").change(function(event){
					if(flagvalidate != "N"){
						MobileCmcReport.fn.validate();
					}
					
				
			});
		},
		goReport : function(){
			
			var validate = MobileCmcReport.fn.validate();
			if(validate){
				MobileCommon.ajax({
					url: GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_report_save_ajax.do",
					type:"post",
					data:$("form[name='frm']").serialize(),
					dataType:"json",
					animation : "false",
					success : function(data,textStatus){
						if(data.status == 'succ'){
							showMessageBox({
								message : "신고되었어요.",
								close : function(){
									var frm = $("form[name='frm']");
									var url = $("input[name='i_sReturnUrl']",frm).val();
									if (GLOBAL_FLAG_APP_NEW == "Y") {
										if(isEmpty(url)) {
											MobileBodyStart.fnWebViewClose();
										}
										else {
											location.href = url;
										}
									}
									else {
										location.href = url;
									}
								}
							});
						}else{
							showMessageBox({
								message:data.message
							});
						}
					}
					
				});
			}
		},
		validate : function(){
			flagvalidate = "Y";
			var validate = true;
			var isChecked = false;
			
			$("input:radio[name='report']").each(function(){
				if($(this).prop("checked")){
					isChecked = true;
					
				}
			});
			
			if(!isChecked){				
				addErrorMessageBox($("input[name='report']"),"신고사유를 선택해주세요");
				validate = false;
			}else{
				removeErrorMessageBox($("input[name='report']"));
			}
			return validate;
		},
		ConReport : function(){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_report_ajax.do",
				type:"post",
				dataType:"json",
				data: $("form[name='frm']").serialize(),					  
			    animation : false,
			    success : function(data,textStatus,jqXHR){
			    	var view = data.object.coninfo.view;
			    	var reason = data.object.reason;
			    	if(data.status == 'succ'){
			    		var contents = ""
			    		var arrHtml = [];
			    		$("input[name='i_sUserid']").val(view.v_userid);
			    		if(view.v_nickname != undefined){
			    			arrHtml.push("<p>작성자 : <em>"+view.v_nickname+"<span>("+getStringReverseHidden(view.v_userid,3)+")</span></em></p>");
			    		}else{
			    			arrHtml.push("<p>작성자 : <em><span>"+getStringReverseHidden(view.v_userid,3)+"</span></em></p>");
			    		}
			    		var flag = $("#i_sTable").val();
			    		if(flag == 'CMC_TALK_MEMO'){
			    			arrHtml.push("<p class='ellipsis'>글제목 : <em>"+view.v_title+"</em></p>");
			    		
			    		}else if(flag=="CMC_REVIEW"){
			    			contents = getByteString(view.v_content, 30);
			    			arrHtml.push("<p class='ellipsis'>글내용 : <em>"+contents+"</em></p>");
			    		}else{
			    			contents = getByteString(view.v_contents, 30);
			    			contents = contents.replace(/\[image#(.*?)\]/g, "");
			    			arrHtml.push("<p class='ellipsis'>글내용 : <em>"+contents+"</em></p>");
			    		}
			    		
			    		$(arrHtml.join("\n")).appendTo(".info");
			    		
			    		for(var i =0 ; i<reason.length; i++){			    			
			    			var arrR = [];
			    			arrR.push("<span class=\"inputRadio\">");
			    			arrR.push("<input type=\"radio\" id=\"radio"+(i+1)+"\" class=\"rab\" name=\"report\" value=\""+reason[i].v_sub_code1+"\" />");
			    			arrR.push("<label for=\"radio"+(i+1)+"\">"+reason[i].v_sub_codenm+"</label>");
			    			arrR.push("</span>");
			    			$(arrR.join("\n")).appendTo(".radioArea");
			    		}
			    		
			    		MobileCmcReport.fn.addBtnEvent();
			    	}
			    }
			    
					  
			});			
		}
	}
};