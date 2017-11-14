
var	MobileVeriteBigSample = {
	name : "MobileVeriteBigSample",
	init : function() {
		MobileVeriteBigSample.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_ok").unbind("click").click(function(event){
				event.preventDefault();
				var returnUrl = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
				location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do?returnUrl="+returnUrl;
			});
			
			$(".btn_cancel").unbind("click").click(function(event){
				event.preventDefault();
				modalPopupClose("#modalPopupVeriteLoginCheck");
			});
			
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=SPR20150313000007801";
				/*showMessageBox({
					message : "베리떼 샘플링 이벤트가 종료되었습니다.<br/>감사합니다^^"
				});*/
				/*if(!IS_LOGIN){
					modalPopup("#modalPopupVeriteLoginCheck");
				}else{
					$(".t_aform").show();
				}*/
			});
			
			$(".btn_reg").unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
				showConfirmBox({
					message : "베리떼 무료 샘플링 이벤트를 신청하시겠습니까?"
					, ok_func : function(){
						cmAjax({
							url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_verite_bigsample_save_ajax.do"
							, data : $("form[name='frm']").serialize()
							, dataType : "json"
								, success : function(data, textStatus){
									if(data.status == "succ"){
										modalPopup("#modalPopup_ask_finish");
									}else{
										showMessageBox({
											message : data.message
										});
									}
								}
						});
					}
					, cancel_func : function(){
						return ;
					}
				});
			});
			
			$(".btn_back").unbind("click").click(function(event){
				event.preventDefault();
				$(".t_aform").hide();
			});
			
			$("#btn_zip2").unbind("click").click(function(event){
				event.preventDefault();
				//선택된 배송지의 i_sAddresscd를 넘겨야 한다. 

				MobileZip.field = $(".t_aform").eq(0);
				
				var addr = {
						type : "event",
						orgZip1Name : "i_sPost1",
						orgZip2Name : "i_sPost2",
						orgAddr1Name : "i_sAddress1",
						orgAddr2Name : "i_sAddress2"
					};
				
				MobileZip.fn.zipProgress(addr); //수정하고 싶을 때
				
			});
			
			$(".btn_delivery_reg").unbind("click").click(function(event){
				event.preventDefault();
				/*if(MobileEventBeauty2.fn.fnValidate()){} 배송지 추가시 유효성체크*/ 
				var frm = $("form[name='frm_delivery_addr']");
				
				cmAjax({
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
										/*document.location.href ="/mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();*/
								var target 	= $("#div_delivery_choose_area");
								var vo		= data.object;
								var arrHtml = new Array();

								arrHtml.push("<span class='cell'>");
								arrHtml.push("	<select id='i_sSelAdd' name='i_sDeliveryChoose' class='selectBox v2'>");
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
								arrHtml.push("<span class='cell term2'></span>");
								arrHtml.push("<span class='cell'>");
								arrHtml.push("<span class='btn_ty v3' id='btn_delivery_add'><a href='#'>배송지 신규 등록</a></span>");
								arrHtml.push("</span>");
								target.html($(arrHtml.join("")));
								$("select[name='i_sDeliveryChoose']",target).change(function(event) {
									MobileVeriteBigSample.fn.changeDeliveryChoose();
								});

								$("select[name='i_sDeliveryChoose']",target).val(key).change();

								MobileVeriteBigSample.fn.deliveryComplete(frm);
							}
						});

					}else{
						showMessageBox({
							message : data.message
						});
					}				
				}
				});			
			});
			
			$(".btn_delivery_cancel").unbind("click").click(function(event){
				event.preventDefault();
				$(".t_aform").eq(0).show();
				
				$("#div_delivery").hide();
			});
			
			$("select[name='i_sDeliveryChoose']").change(function(event) {
				MobileVeriteBigSample.fn.changeDeliveryChoose();
			});
			
			$("#btn_delivery_add").unbind("click").click(function(event){
				event.preventDefault();
				var delivery = {flag : "R"
					,addresscd : ""
					,type : "order"
					,ordercd : ""
					,eventcd : "EVT20160301_verite"			
				};

				MobileAddress.field = $(".t_aform").eq(0);
				MobileAddress.deliveryProgress(delivery);
			});
		}
	
		, changeDeliveryChoose : function () {
			var cd = $("select[name='i_sDeliveryChoose']").val();
			var wrap = $(".span_" + cd);
	
			$("input[name='i_sUsernm']").val($(".span_receivernm", wrap).text());
			$("input[name='i_sPost1']").val($(".span_zip1", wrap).text());
			$("input[name='i_sPost2']").val($(".span_zip2", wrap).text());
			$("input[name='i_sAddress1']").val($(".span_addr1", wrap).text());
			$("input[name='i_sAddress2']").val($(".span_addr2", wrap).text());
			$("select[name='i_sTele1']").val($(".span_phone1", wrap).text());
			$("input[name='i_sTele2']").val($(".span_phone2", wrap).text());
			$("input[name='i_sTele3']").val($(".span_phone3", wrap).text());
			$("select[name='i_sPhone1']").val($(".span_mobile1", wrap).text());
			$("input[name='i_sPhone2']").val($(".span_mobile2", wrap).text());
			$("input[name='i_sPhone3']").val($(".span_mobile3", wrap).text());
		}
		,
		deliveryComplete : function(frm){
			$(".t_aform").eq(0).show();
			
			$("#div_delivery").hide();
	
			$("input",frm).val("");
			$("select",frm).val("");
			$("input[name='i_sFlagDefault']", frm).val("Y");
			$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", false);
			MobileVeriteBigSample.fn.addBtnEvent();
	
		}
	}
	
};