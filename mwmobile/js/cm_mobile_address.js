var MobileAddress = {
	 name :"MobileAddress"
	,field : ""
	,init : function(){
		
		MobileAddress.addEventBtn();
		MobileAddress.setting();
		
	},
	addEventBtn : function(){
		
		$(".btn_delivery_cancel").click(function(event){
			
			var frm = $("form[name='frm_delivery_addr']");
			
			MobileAddress.deliveryComplete(frm);
		});

		$(".btn_search_delivery").click(function(event){
			MobileZip.field  = $("#div_delivery").eq(0);
			var frm = $("form[name='frm_delivery_addr']");
			var eventcd = $("input[name='i_sEventcd']", frm).val();
			
			if(eventcd != ""){
				var addr = {
						type : "event",	
						orgZip1Name : "i_sZip1",
						orgZip2Name : "i_sZip2",
						orgAddr1Name : "i_sAddr1",
						orgAddr2Name : "i_sAddr2"
					};
			}else{
				var addr = {
						type : "delivery",	
						orgZip1Name : "i_sZip1",
						orgZip2Name : "i_sZip2",
						orgAddr1Name : "i_sAddr1",
						orgAddr2Name : "i_sAddr2"
				};
			}
			
			MobileZip.fn.zipProgress(addr);

		});
		
		$("#i_sDeliveryChoose").unbind("change").change(function(event) {
			
			var cd = $("select[name='i_sDeliveryChoose']").val();
			var wrap = $(".span_" + cd);
			$("input[name='i_sAddressee']").val($(".span_receivernm", wrap).text());
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
			
		});
		
	}
	,setting : function(){
		
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_select_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, animation : false
			, success : function ( data, textStatus, jqXHR) {

				if(data.status == "succ"){
					
					var vo   = data.object.telnoList;
					var size = vo.length;
					var target  = $("#select_tel");
					
					if(size > 0){
						
						var arrHtml = new Array();
						
						arrHtml.push("<select id='' name='i_sTel1' class='selectBox v2'>");
						arrHtml.push("	<option value=''>선택</option>");
						for(var i=0; i<size; i++){
							
							arrHtml.push("<option value='"+vo[i].v_sub_code1+"'>"+vo[i].v_sub_codenm+"</option>");
							
						}
						
						arrHtml.push("</select>");
						arrHtml.push("<em class='error_hide errortxt error_i_sTel1'></em>");
						
						
						target.html();
						target.html($(arrHtml.join("")));
				
					}
					
					vo = data.object.mobilenoList;
					size = vo.length;
					target = $("#select_mobile");
					
					if(size > 0){
						
						var arrHtml = new Array();
						
						arrHtml.push("<select id='' name='i_sMobile1' class='selectBox v2'>");
						arrHtml.push("	<option value=''>선택</option>");
						for(var i=0; i<size; i++){
							
							arrHtml.push("<option value='"+vo[i].v_sub_code1+"'>"+vo[i].v_sub_codenm+"</option>");
							
						}
						
						arrHtml.push("</select>");
						arrHtml.push("<em class='error_hide errortxt error_i_sMobile1'></em>");
						
						target.html();
						target.html($(arrHtml.join("")));
					}
					
				}
			}
		});
		
		
		
	}
	,deliveryProgress : function(delievery){
		
		var frm = $("form[name='frm_delivery_addr']");
		
		$("input[name='i_sOrdercd']", frm).val(delievery.ordercd);
		$("input[name='i_sFlagAction']", frm).val(delievery.flag);
		$("input[name='i_sAddresscd']", frm).val(delievery.addresscd);
		$("input[name='i_sEventcd']", frm).val(delievery.eventcd);
		$("input[name='i_sMseqno']", frm).val(delievery.addresscd);
		
		if(delievery.type == "order"){
			$(".order_address").show();
			if(delievery.eventcd != "" || delievery.eventcd != undefined){
				var offset = $('.order-tb').offset();
				$("html, body").animate({scrollTop:offset.top},800);
			}
		}else{
			$(".order_address").hide();
		}
		
		if(delievery.flag=="M"){
			
			if(delievery.type == "mybilling"){
				var wrap = $(".span_" + delievery.addresscd);
				
				$("input[name='i_sAddressnm']", frm).val($(".span_addressnm", wrap).text());
				$("input[name='i_sAddressee']", frm).val($(".span_receivernm", wrap).text());
				$("select[name='i_sTel1']", frm).val($(".span_phone1", wrap).text());
				$("input[name='i_sTel2']", frm).val($(".span_phone2", wrap).text());
				$("input[name='i_sTel3']", frm).val($(".span_phone3", wrap).text());
				$("select[name='i_sMobile1']", frm).val($(".span_mobile1", wrap).text());
				$("input[name='i_sMobile2']", frm).val($(".span_mobile2", wrap).text());
				$("input[name='i_sMobile3']", frm).val($(".span_mobile3", wrap).text());
				$("input[name='i_sZip1']", frm).val($(".span_zip1", wrap).text());
				$("input[name='i_sZip2']", frm).val($(".span_zip2", wrap).text());
				$("input[name='i_sAddr1']", frm).val($(".span_addr1", wrap).text());
				$("input[name='i_sAddr2']", frm).val($(".span_addr2", wrap).text());
				
				if($(".span_militaryYn", wrap).text() == "Y"){
					$("#troops").prop("checked", true);
				}
				$("input[name='i_sDeliveryComment']", frm).val($(".span_deliverycomment", wrap).text() == "undefined" ? "" : $(".span_deliverycomment", wrap).text());
				
				if ($(".span_flag_default", wrap).text() == "Y") {
					$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", true);
				}
				
				$(".btn_delivery_reg").text("변경");
			}else{
				var wrap = $(".span_" + delievery.addresscd);
				
				$("input[name='i_sAddressnm']", frm).val($(".span_addressnm", wrap).text());
				$("input[name='i_sAddressee']", frm).val($(".span_receivernm", wrap).text());
				$("select[name='i_sTel1']", frm).val($(".span_phone1", wrap).text());
				$("input[name='i_sTel2']", frm).val($(".span_phone2", wrap).text());
				$("input[name='i_sTel3']", frm).val($(".span_phone3", wrap).text());
				$("select[name='i_sMobile1']", frm).val($(".span_mobile1", wrap).text());
				$("input[name='i_sMobile2']", frm).val($(".span_mobile2", wrap).text());
				$("input[name='i_sMobile3']", frm).val($(".span_mobile3", wrap).text());
				$("input[name='i_sZip1']", frm).val($(".span_zip1", wrap).text());
				$("input[name='i_sZip2']", frm).val($(".span_zip2", wrap).text());
				$("input[name='i_sAddr1']", frm).val($(".span_addr1", wrap).text());
				$("input[name='i_sAddr2']", frm).val($(".span_addr2", wrap).text());
				
				if(delievery.type == "my"){
					if($(".span_militaryYn", wrap).text() == "Y"){
						$("#troops").prop("checked", true);
					}
					$("input[name='i_sDeliveryComment']").val($(".span_deliverycomment", wrap).text() == "undefined" ? "" : $(".span_deliverycomment", wrap).text());
				}
				
				if ($(".span_flag_default", wrap).text() == "Y") {
					$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", true);
				}
				
				$(".btn_delivery_reg").text("변경");
			}
			
			
		}else{
			
			$(".btn_delivery_reg").text("등록");
			
		}
		
		if(delievery.type == "my" || delievery.type == "mybilling"){
			$(".myorder_deliv_mod").show();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_address_list_ajax.do"
				, type : "POST"
				, dataType : "json"
				, animation : false
				, success : function ( data, textStatus, jqXHR) {

					if(data.status == "succ"){
						
						var vo   = data.object;
						var size = vo.length;
						var target  = $("#select_dlv");

						if(size > 0){
							
							var arrHtml = new Array();
							var arrlist = new Array();
							
							arrHtml.push("<select id='i_sDeliveryChoose' name='i_sDeliveryChoose' class='selectBox v2'>");
							arrHtml.push("	<option value=''>배송지선택</option>");
							
							
							for(var i=0; i<size; i++){
								
								
								arrHtml.push("<option value='"+vo[i].v_addresscd+"'>"+vo[i].v_addressnm+"</option>");
								
								if($(".span_"+vo[i].v_addresscd).length < 1){
									arrlist.push("<span class='span_hide span_"+vo[i].v_addresscd+"'>");
									arrlist.push("<span class='span_flag_default'>"+vo[i].v_flag_default+"</span>");
									arrlist.push("<span class='span_addressnm'>"+vo[i].v_addressnm+"</span>");
									arrlist.push("<span class='span_receivernm'>"+vo[i].v_addressee+"</span>");
									arrlist.push("<span class='span_zip1'>"+vo[i].v_post_code1+"</span>");
									arrlist.push("<span class='span_zip2'>"+vo[i].v_post_code2+"</span>");
									arrlist.push("<span class='span_addr1'>"+vo[i].v_address1+"</span>");
									arrlist.push("<span class='span_addr2'>"+vo[i].v_address2+"</span>");
									arrlist.push("<span class='span_phone1'>"+vo[i].v_tel1+"</span>");
									arrlist.push("<span class='span_phone2'>"+vo[i].v_tel2+"</span>");
									arrlist.push("<span class='span_phone3'>"+vo[i].v_tel3+"</span>");
									arrlist.push("<span class='span_mobile1'>"+vo[i].v_mobile1+"</span>");
									arrlist.push("<span class='span_mobile2'>"+vo[i].v_mobile2+"</span>");
									arrlist.push("<span class='span_mobile3'>"+vo[i].v_mobile3+"</span>");
									arrlist.push("</span>");
								}
								
							}
							arrHtml.push("</select>");
							
							target.html();
							target.html($(arrHtml.join("")));
							target.after($(arrlist.join("")));
					
						}
					}
					MobileAddress.addEventBtn();
				}
			});
			
			
		}
	
		location.href="#";
		$(".page_info").eq(0).hide();
		MobileAddress.field.hide();
		$("#div_delivery").show();
		
	}
	,deliveryComplete : function(frm){
		
		$(".page_info").eq(0).show();
		MobileAddress.field.show();
		$("#div_delivery").hide();
		
		$("input",frm).val("");
		$("select",frm).val("");
		$("input[name='i_sFlagDefault']", frm).val("Y");
		$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", false);
		
		var offset = $('.userDeliveryInfo').offset();
		$("html, body").animate({scrollTop:offset.top},10);				
		
	}
	, changeDeliveryChoose : function () {
		var cd = $("select[name='i_sDeliveryChoose']").val();
		var wrap = $(".span_" + cd);
		
		$("input[name='i_sDeliveryReceivernm']").val($(".span_receivernm", wrap).text());
		$("input[name='i_sDeliveryZip1']").val($(".span_zip1", wrap).text());
		$("input[name='i_sDeliveryZip2']").val($(".span_zip2", wrap).text());
		$("input[name='i_sDeliveryAddress1']").val($(".span_addr1", wrap).text());
		$("input[name='i_sDeliveryAddress2']").val($(".span_addr2", wrap).text());
		$("select[name='i_sDeliveryPhone1']").val($(".span_phone1", wrap).text());
		$("input[name='i_sDeliveryPhone2']").val($(".span_phone2", wrap).text());
		$("input[name='i_sDeliveryPhone3']").val($(".span_phone3", wrap).text());
		$("select[name='i_sDeliveryMobile1']").val($(".span_mobile1", wrap).text());
		$("input[name='i_sDeliveryMobile2']").val($(".span_mobile2", wrap).text());
		$("input[name='i_sDeliveryMobile3']").val($(".span_mobile3", wrap).text());
	}
};