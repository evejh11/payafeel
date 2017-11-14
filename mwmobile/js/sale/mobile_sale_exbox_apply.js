/**
 * 모바일 핫세일 익스박스 신청 화면의 이벤트 처리를 위한 Javascript
 */
var cancel = false;
var	MobilesaleExboxapply = {
	name : "MobilesaleExboxapply",

	init : function() {
		MobilesaleExboxapply.fn.addBtnEvent();
	},
	fn :{
		addBtnEvent : function() {
			$(".btn_delivery_reg").click(function(event){
				event.preventDefault();
				MobilesaleExboxapply.fn.goSave("R");
			});
			
			$(".i_sAddressnm").unbind("change").change(function(event){
				event.preventDefault();
				var id = $(this).val();
				$div = $("#div_arr_"+id);
				$("#i_sAddressee").val($(".span_addressee",$div).text());
				$("#tel_"+$(".span_tel1",$div).text()).attr("selected",true);
				$("#i_sTel2").val($(".span_tel2",$div).text());
				$("#i_sTel3").val($(".span_tel3",$div).text());
				$("#mobile_"+$(".span_mobile1",$div).text()).attr("selected",true);
				$("#i_sMobile2").val($(".span_mobile2",$div).text());
				$("#i_sMobile3").val($(".span_mobile3",$div).text());
				$("#i_sZip1").val($(".span_zip1",$div).text());
				$("#i_sZip2").val($(".span_zip2",$div).text());
				$("#i_sAddr1").val($(".span_addr1",$div).text());
				$("#i_sAddr2").val($(".span_addr2",$div).text());
			});
			
			$(".btn_search_delivery").click(function(event){
				event.preventDefault();
				
				MobileZip.field = $(".exbox_apply").eq(0);
				
				var addr = {
						type : "exbox",
						orgZip1Name : "i_sZip1",
						orgZip2Name : "i_sZip2",
						orgAddr1Name : "i_sAddr1",
						orgAddr2Name : "i_sAddr2"
					};
					
				MobileZip.fn.zipProgress(addr);
				
			});
			$(".btn_delivery_modi").unbind("click").click(function(event){
				event.preventDefault();
				MobilesaleExboxapply.fn.goSave("M");
			});
			$(".i_sFlagDefault").unbind("click").click(function(){
				if ($(this).val() == "Y"){
					$(".div_newAddrnm").hide();
					$(this).val("N");
				}else{
					$(".div_newAddrnm").show();
					$(this).val("Y");
				}
				
			});
			var frm = $("form[name='frm_delivery_addr']");
			var target = undefined;
			
			$("#i_sAddressnm").unbind("keyup").keyup(function(){
				removeErrorMessageBox($("input[name='i_sAddressnm']",frm));
				if(isEmpty($("input[name='i_sAddressnm']", frm).val())) {
					addErrorMessageBox($("input[name='i_sAddressnm']", frm),"배송지명을 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sAddressnm']", frm);
					}	
				}	
			});
			
			$("#i_sAddressee").unbind("keyup").keyup(function(){
				removeErrorMessageBox($("input[name='i_sAddressee']",frm));
				if(isEmpty($("input[name='i_sAddressee']", frm).val())) {
					addErrorMessageBox($("input[name='i_sAddressee']", frm),"수신인명 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sAddressee']", frm);
					}	
				}	
			});
			$("#i_sTel2").unbind("change").change(function(){
				removeErrorMessageBox($("input[name='i_sTel2']",frm));
				if(isEmpty($("input[name='i_sTel2']", frm).val())) {
					addErrorMessageBox($("input[name='i_sTel2']", frm),"전화번호 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sTel2']", frm);
					}	
				}	
			});
			$("#i_sMobile2").unbind("change").change(function(){
				removeErrorMessageBox($("input[name='i_sMobile2']",frm));
				if(isEmpty($("input[name='i_sMobile2']", frm).val())) {
					addErrorMessageBox($("input[name='i_sMobile2']", frm),"휴대폰 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sMobile2']", frm);
					}	
				}	
			});
			$("#i_sAddr2").unbind("focus").focus(function(){
				removeErrorMessageBox($("input[name='i_sAddr2']",frm));
				if(isEmpty($("input[name='i_sAddr1']", frm).val())) {
					addErrorMessageBox($("input[name='i_sAddr2']", frm),"배송지 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sAddr2']", frm);
					}	
				}	
			});
			$("#i_sDeliveryComment").unbind("keyup").keyup(function(){
				removeErrorMessageBox($("input[name='i_sDeliveryComment']",frm));
				if(isEmpty($("input[name='i_sDeliveryComment']", frm).val())) {
					addErrorMessageBox($("input[name='i_sDeliveryComment']", frm),"배송요청사항 입력하세요.");
						isResult = false;
						if (target == undefined) {
						target = $("*[name='i_sDeliveryComment']", frm);
					}	
				}	
			});
			$("input[name='i_sNewAddressnm']").unbind("keyup").keyup(function(){
				if($(".i_sFlagDefault").val()=="Y"){
					removeErrorMessageBox($("input[name='i_sNewAddressnm']",frm));
					if(isEmpty($("input[name='i_sNewAddressnm']", frm).val())) {
						addErrorMessageBox($("input[name='i_sNewAddressnm']", frm),"신규배송지명을 입력하세요.");
							isResult = false;
							if (target == undefined) {
							target = $("*[name='i_sNewAddressnm']", frm);
						}	
					}	
				}
			});
			
		},
		fnValidator : function() {
			var frm = $("form[name='frm_delivery_addr']");
			var isResult = true;
			var target = undefined;
			
			if(isEmpty($("select[name='i_sAddressnm']", frm).val())) {
				addErrorMessageBox($("input[name='i_sAddressnm']", frm), "배송지명을 입력하세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sAddressnm']", frm);
				}
			}
			if(isEmpty($("input[name='i_sAddressee']", frm).val())) {
				addErrorMessageBox($("*[name='i_sAddressee']", frm), "수신인명 입력하세요.");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sAddressee']", frm);
				}
			}
			if(isEmpty($("input[name='i_sTel2']", frm).val())) {
				addErrorMessageBox($("*[name='i_sTel2']", frm), "전화번호 입력하세요");
				isResult = false;
				if (target == undefined) {
					target = $("#[name='i_sTel2']", frm);
				}
			}
			if(isEmpty($("input[name='i_sMobile2']", frm).val())) {
				addErrorMessageBox($("*[name='i_sMobile2']", frm), "휴대폰 입력하세요.");
				isResult = false;
				if (target == undefined) {
					target = $("#[name='i_sMobile2']", frm);
					
				}
			}
			if(isEmpty($("input[name='i_sAddr2']", frm).val())) {
				addErrorMessageBox($("*[name='i_sAddr2']", frm), "배송지  입력하세요.");
				isResult = false;
				if (target == undefined) {
					target = $("#[name='i_sAddr2']", frm);
				}
			}
			if(isEmpty($("input[name='i_sDeliveryComment']", frm).val())) {
				addErrorMessageBox($("*[name='i_sDeliveryComment']", frm), "배송요청사항  입력하세요.");
				isResult = false;
				if (target == undefined) {
					target = $("#[name='i_sDeliveryComment']", frm);
				}
			}
			if(isEmpty($("input[name='i_sNewAddressnm']",frm).val() && $(".i_sFlagDefault").val() == "Y")){
				addErrorMessageBox($("*[name='i_sNewAddressnm']", frm), "신규배송지명을 입력하세요.");
			}
			return isResult;
		},
			
		goSave : function(flag){
			if(! MobilesaleExboxapply.fn.fnValidator()) {
				return;
			}
			var frm = $("form[name='frm_delivery_addr']");
			
			MobilesaleExboxapply.fn.deliveryProgress(flag,"");
			
			if(cancel){
				return false;
			}else{
				cancel = true;
			}
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_exbox_apply_save.do"
				, type : "POST"
				, data : frm.serialize()
				, dataType : "json" 
				, animation	: false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						showMessageBox({
							message : data.message
								, close : function(){
									var returnurl = GLOBAL_WEB_URL + "mobile/sale/mobile_sale_exbox_now.do";
									frm.attr("action",returnurl).submit();
								}
						});
					}
					else {
						cancel = false;
						showMessageBox({message : data.message});
					}
				}
			});
		},
		
		deliveryComplete : function(frm){
			$(".beautyTesterView").eq(0).show();
			$(".page_info").eq(0).show();
			$("#div_delivery").hide();
	
			$("input",frm).val("");
			$("select",frm).val("");
			$("input[name='i_sFlagNew']", frm).val("Y");
			$("input[name='i_sFlagNew']", frm).eq(0).prop("checked", false);
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
		
		deliveryProgress : function(flag,code){
	
			var frm = $("form[name='frm_delivery_addr']");
	
			$("input[name='i_sFlagAction']", frm).val(flag);
			$("input[name='i_sAddresscd']", frm).val(code);
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
		}
	}
};

