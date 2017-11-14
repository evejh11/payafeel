
var MobileMyShippngWrt = {
			name : "MobileMyShippngWrt",
			init : function() {
				
				MobileMyShippngWrt.fn.addBtnEvent();
				addOnlyNumberEvent($(".onlyNumber"));
			},
			fn : {
			addValidateEvent : function() {
				var frm = $("form[name='frm_delivery_addr']");
				var addressnm = $("input[name='i_sAddressnm']", frm);
				var addressee = $("input[name='i_sAddressee']", frm);
				var zip1 = $("input[name='i_sZip1']", frm);
				var zip2 = $("input[name='i_sZip2']", frm);
				var mobile1 = $("*[name='i_sMobile1']", frm);
				var mobile2 = $("*[name='i_sMobile2']", frm);
				var mobile3 = $("*[name='i_sMobile3']", frm);
				var tel1 = $("select[name=i_sTel1]", frm);
				var tel2 = $("input[name=i_sTel2]", frm);
				var tel3 = $("input[name=i_sTel3]", frm);
				var addr1 = $("input[name='i_sAddr1']", frm);
				var addr2 = $("input[name='i_sAddr2']", frm);
				
				addressnm.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(addressnm);
					if(isEmpty(val)) {
						addErrorMessageBox(addressnm, "배송지명을 입력해주세요.");
					} else if(val.length > 20){
						addErrorMessageBox(addressnm, "배송지명이 너무 깁니다.");
					}
				});

				addressee.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(addressee);
					if(isEmpty(val)) {
						addErrorMessageBox(addressee, "수신인명을 입력해주세요.");
					} else if(val.length > 20){
						addErrorMessageBox(addressee, "수신인명이 너무 깁니다.");
					}
				});
				
				mobile1.unbind("change").change(function() {
					removeErrorMessageBox(mobile1);
					
					if(isEmpty(mobile1.val())) {
						addErrorMessageBox(mobile1, "휴대전화 번호를 선택해주세요.");
					}
				});

				mobile2.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(mobile1);
					
					mobile2.removeClass("error");
					if(isEmpty(val) || val.length < 3) {
						addErrorMessageBox(mobile1, "휴대전화 번호를 입력해주세요.");
						mobile2.addClass("error");
					}
				});
				
				mobile3.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(mobile1);
					
					mobile3.removeClass("error");
					if(isEmpty(val) || val.length < 3) {
						addErrorMessageBox(mobile1, "휴대전화 번호를 입력해주세요.");
						mobile3.addClass("error");
					}
				});
				
				tel1.unbind("change").change(function() {
					removeErrorMessageBox(tel1);
					
					if(isEmpty(tel1.val())) {
						addErrorMessageBox(tel1, "전화번호를 선택해주세요.");
					}
				});
				
				tel2.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(tel1);
					
					tel2.removeClass("error");
					if(isEmpty(val) || val.length < 3) {
						addErrorMessageBox(tel1, "전화번호를 입력해주세요.");
						tel2.addClass("error");
					}
				});
				
				tel3.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(tel1);
					
					tel3.removeClass("error");
					if(isEmpty(val) || val.length < 3) {
						addErrorMessageBox(tel1, "전화번호를 입력해주세요.");
						tel3.addClass("error");
					}
				});

				zip1.unbind("keyup").keyup(function() {
					removeErrorMessageBox(zip1);
					var val = $(this).val();
					
					if(isEmpty(val)) {
						addErrorMessageBox(zip1, "우편번호를 입력해주세요.");
					}
				});
				
				zip2.unbind("keyup").keyup(function() {
					var val = $(this).val();
					removeErrorMessageBox(zip1);
					
					zip2.removeClass("error");
					if(isEmpty(val)) {
						addErrorMessageBox(zip1, "우편번호를 입력해주세요.");
						zip2.addClass("error");
					}
				});
				
				addr1.unbind("keyup").keyup(function() {
					removeErrorMessageBox(addr1);
					var val = $(this).val();
					
					if(isEmpty(val)) {
						addErrorMessageBox(addr1, "주소를 입력해주세요.");
					}
				});
				
				addr2.unbind("keyup").keyup(function() {
					removeErrorMessageBox(addr2);
					var val = $(this).val();
					
					if(isEmpty(val)) {
						addr2.attr("readonly",false);
						addErrorMessageBox(addr2, "세부주소를 입력해주세요.");
					}
				});
			},
			addBtnEvent : function() {
				
				
				$(".btn_delivery_reg").click(function(event){
		
					var frm = $("form[name='frm_delivery_addr']");
					
					var flag = "R";
					if($("input[name='i_sAddresscd']").val() != "" && $("input[name='i_sAddresscd']").val() != undefined) {
						flag = "M";
					}
					
					MobileMyShippngWrt.fn.deliveryProgress(flag);
					if(MobileMyShippngWrt.fn.fnValidate()) {
						MobileCommon.ajax({
							url : GLOBAL_WEB_ROOT+"mobile/comm/mobile_comm_address_save_ajax.do"
							, type : "POST"
								, data : frm.serialize()
								, dataType : "json" 
									, animation	: false
									, success : function ( data, textStatus, jqXHR) {
			
										if(data.status == "succ"){
											var key = data.object.i_sAddresscd;
											
											MobileCommon.ajax({
												url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_address_list_ajax.do"
												, type : "POST"
													, dataType : "json"
														, animation : false
														, success : function ( data, textStatus, jqXHR) {
															var url = "/mobile/my/mobile_my_shipping.do";
															if(GLOBAL_FLAG_APP_NEW == 'Y') {
																url += "?i_sFlagClose=" + $("input[name='i_sFlagClose']").val();
															}
															document.location.href = url;
															var target 	= $("#div_delivery_choose_area");
															var vo		= data.object;
															var arrHtml = new Array();
			
															arrHtml.push("<span class='cell'>");
															arrHtml.push("	<select id='' name='i_sDeliveryChoose' class='selectBox v2'>");
															arrHtml.push("		<option value=''>선택</option>");
			
															for(var i=0; i<vo.length; i++){
			
																var defaultmsg = vo[i].v_flag_default == "Y" ? "(기본배송지)" : "";
			
																arrHtml.push("	<option value='"+vo[i].v_addresscd+"'>"+vo[i].v_addressnm+""+defaultmsg+"</option>");
			
															}
			
															arrHtml.push("	</select>");
			
															for(var i=0; i<vo.length; i++){
			
																arrHtml.push("<span class='span_hide span_"+vo[i].v_addresscd+"'>");
																arrHtml.push("	<span class='span_addressnm'>"+vo[i].v_addressnm+"</span>");
																arrHtml.push("	<span class='span_receivernm'>"+vo[i].v_addressee+"</span>");
																arrHtml.push("	<span class='span_zip1'>"+vo[i].v_post_code1+"</span>");
																arrHtml.push("	<span class='span_zip2'>"+vo[i].v_post_code2+"</span>");
																arrHtml.push("	<span class='span_addr1'>"+vo[i].v_address1+"</span>");
																arrHtml.push("	<span class='span_addr2'>"+vo[i].v_address2+"</span>");
																arrHtml.push("	<span class='span_phone1'>"+vo[i].v_tel1+"</span>");
																arrHtml.push("	<span class='span_phone2'>"+vo[i].v_tel2+"</span>");
																arrHtml.push("	<span class='span_phone3'>"+vo[i].v_tel3+"</span>");
																arrHtml.push("	<span class='span_mobile1'>"+vo[i].v_mobile1+"</span>");
																arrHtml.push("	<span class='span_mobile2'>"+vo[i].v_mobile2+"</span>");
																arrHtml.push("	<span class='span_mobile3'>"+vo[i].v_mobile3+"</span>");
																arrHtml.push("</span>");
			
															}
			
															arrHtml.push("</span>");
															target.html($(arrHtml.join("")));
															$("select[name='i_sDeliveryChoose']",target).change(function(event) {
																MobileMyShippngWrt.fn.changeDeliveryChoose();
															});
			
															$("select[name='i_sDeliveryChoose']",target).val(key).change();
															MobileMyShippngWrt.fn.deliveryComplete(frm);
														}
											});
			
										}				
									}
						});
					}
				});
				
				
				$(".btn_search_delivery").click(function(event){
					event.preventDefault();

					MobileZip.field  = $(".myShipping").eq(0);
					
					var addr = {
						type : "myShipping",
						orgZip1Name : "i_sZip1",
						orgZip2Name : "i_sZip2",
						orgAddr1Name : "i_sAddr1",
						orgAddr2Name : "i_sAddr2"
					};
					
					MobileZip.fn.zipProgress(addr);

				});
		
				
			},
			
			deliveryComplete : function(frm){
				$(".beautyTesterView").eq(0).show();
				$(".page_info").eq(0).show();
				$("#div_delivery").hide();
		
				$("input",frm).val("");
				$("select",frm).val("");
				$("input[name='i_sFlagDefault']", frm).val("Y");
				$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", false);
				if($(".btn_delivery_cancel").click()){
		
				}
			},
			getParameter : function(){
				var parameter = {
						"i_iNowPageNo"		: parseInt($('#i_iNowPageNo').val() || "1", 10),
						"i_iPageSize"		: parseInt($('#i_iPageSize').val() || "5", 10),
						"i_iTotalPageCnt"	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
						"i_iRecordCnt"		: parseInt($('#i_iRecordCnt').val() || "1", 10),
						"i_sFlagAction"		: "",
						"i_sFlagMobileOpen" : "Y",
						"i_sFlagTab" : $("input[name='i_sFlagTab']",frm).val(),
						pageStack : [],
						i_arrCategorycd :[],
				};
				return parameter;
		
			},
			
			deliveryProgress : function(flag){
		
				var frm = $("form[name='frm_delivery_addr']");
		
				$("input[name='i_sFlagAction']", frm).val(flag);
				//$("input[name='i_sAddresscd']", frm).val(code);
				location.href="#";
				$(".beautyTesterView").eq(0).hide();
				$(".page_info").eq(0).hide();
				$("#div_delivery").show();
		
			},	
			changeDeliveryChoose : function () {
				var cd = $("select[name='i_sDeliveryChoose']").val();
				var wrap = $(".span_" + cd);
		
				$("input[name='i_sUsernm']").val($(".span_receivernm", wrap).text());
				$("input[name='i_sZip1']").val($(".span_zip1", wrap).text());
				$("input[name='i_sZip2']").val($(".span_zip2", wrap).text());
				$("input[name='i_sAddr1']").val($(".span_addr1", wrap).text());
				$("input[name='i_sAddr2']").val($(".span_addr2", wrap).text());
				$("select[name='i_sTel1']").val($(".span_phone1", wrap).text());
				$("input[name='i_sTel2']").val($(".span_phone2", wrap).text());
				$("input[name='i_sTel3']").val($(".span_phone3", wrap).text());
				$("select[name='i_sMobile1']").val($(".span_mobile1", wrap).text());
				$("input[name='i_sMobile2']").val($(".span_mobile2", wrap).text());
				$("input[name='i_sMobile3']").val($(".span_mobile3", wrap).text());
			},
			fnValidate : function() {
				var isResult = true;
				var target 	= undefined;
				
				var frm = $("form[name='frm_delivery_addr']");
				var addressnm = $("input[name='i_sAddressnm']", frm);
				var addressee = $("input[name='i_sAddressee']", frm);
				var zip1 = $("input[name='i_sZip1']", frm);
				var zip2 = $("input[name='i_sZip2']", frm);
				var mobile1 = $("*[name='i_sMobile1']", frm);
				var mobile2 = $("*[name='i_sMobile2']", frm);
				var mobile3 = $("*[name='i_sMobile3']", frm);
				var tel1 = $("select[name=i_sTel1]", frm);
				var tel2 = $("input[name=i_sTel2]", frm);
				var tel3 = $("input[name=i_sTel3]", frm);
				var addr1 = $("input[name='i_sAddr1']", frm);
				var addr2 = $("input[name='i_sAddr2']", frm);
				
				if(isEmpty(addressnm.val())) {
					addErrorMessageBox(addressnm,"배송지명을 입력해주세요.");
					isResult = false;
					if (target == undefined) {
						target = addressnm;
					}
				} else if(calculate_byte(addressnm.val()) > 20) {
					addErrorMessageBox(addressnm,"배송지명이 너무 깁니다.");
					isResult = false;
					if (target == undefined) {
						target = addressnm;
					}
				}
				
				
				if(isEmpty(addressee.val())) {
					addErrorMessageBox(addressee,"수신인명을 입력해주세요.");
					isResult = false;
					if (target == undefined) {
						target = addressee;
					}
				} else if(calculate_byte(addressee.val()) > 20) {
					addErrorMessageBox(addressee,"수신인명이 너무 깁니다.");
					isResult = false;
					if (target == undefined) {
						target = addressee;
					}
				}
				
				var tel = tel1.val() + "" + tel2.val() + "" + tel3.val();
				var isPassTel = false;
				
				if(tel.length >=9) {
					isPassTel = true;
				}
				
				if(!isPassTel && tel1.val()=="") {
					addErrorMessageBox(tel1,"전화번호를 선택해주세요.");
					isResult = false;
					if (target == undefined) {
						target = tel1;
					}
				}
				if(!isPassTel && (isEmpty(tel2.val()) || calculate_byte(tel2.val()) < 3)) {
					addErrorMessageBox($("select[name='i_sTel1']", frm),"전화번호를 입력해주세요.");
					
					tel2.addClass("error");
					isResult = false;
					if (target == undefined) {
						target = tel2;
					}
				}
				if(!isPassTel && (isEmpty(tel3.val()) || calculate_byte(tel3.val()) < 4)) {
					addErrorMessageBox($("input[name='i_sTel1']", frm),"전화번호를 입력해주세요.");
					
					tel3.addClass("error");
					isResult = false;
					if (target == undefined) {
						target = tel3;
					}
				}
				
				var mobile = mobile1.val() + "" + mobile2.val() + "" + mobile3.val();
				var isPassMobile	= false;
				
				if (mobile.length >= 9) {
					isPassPhone = true;
				}

				if (!isPassMobile && mobile1.val() == "") {
					
					addErrorMessageBox($("*[name='i_sMobile1']", frm),"휴대전화 번호를 선택해주세요");
					
					isResult = false;
					if (target == undefined) {
						target = mobile1.eq(0);
					}
					
				}
				
				if (!isPassMobile && (mobile2.val() == "" || calculate_byte(mobile2.val()) < 3)) {
					
					addErrorMessageBox($("*[name='i_sMobile1']", frm),"휴대전화 번호를 입력해주세요");
					mobile2.eq(0).addClass("error");
					isResult = false;
					if (target == undefined) {
						target = mobile2.eq(0);
					}	

				}
				if (!isPassMobile && (mobile3.val() == "" || calculate_byte(mobile3.val()) < 4)) {
					
					addErrorMessageBox($("*[name='i_sMobile1']", frm),"휴대전화 번호를 입력해주세요");
					mobile3.eq(0).addClass("error");
					isResult = false;
					if (target == undefined) {
						target = mobile3.eq(0);
					}
				}
				
				if (zip1.val() == "") {
					
					addErrorMessageBox(zip1.eq(0),"우편번호를 입력해 주세요.");
					isResult = false;
					if (target == undefined) {
						target = zip1.eq(0);
					}

				}
				if (zip2.val() == "") {
					
					addErrorMessageBox(zip1.eq(0),"우편번호를 입력해 주세요.");
					
					zip2.eq(0).addClass("error");
					isResult = false;
					if (target == undefined) {
						target = zip2.eq(0);
					}

				}
				
				if(isEmpty(addr1.val())) {
					addErrorMessageBox(addr1,"주소를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = addr1;
					}
				}
				if(isEmpty(addr2.val())) {
					addr2.attr("readonly",false);
					addErrorMessageBox(addr2,"세부주소를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = addr2;
					}
				}
				
				MobileMyShippngWrt.fn.addValidateEvent();
				return isResult;
			}
	}
};

