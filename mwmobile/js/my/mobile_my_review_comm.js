var MobileReviewComm = {
	init : function() {
		MobileReviewComm.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function() {
			$(".btn_commentWrite").unbind("click").click(function(event) {
				event.preventDefault();
				
				var ordercd = $(this).attr("id").split("/")[0];
				var productcd = $(this).attr("id").split("/")[1];
				var flag = "N";
				
				if($(this).attr("id").split("/")[2] == "my") {
					flag = "Y";
				}
				
				$('.noUi-target').eq(0).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
				$("#i_sReviewOrdercd").val(ordercd);
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_reg_ajax.do"
					, dataType : "json"
					, data : {
						i_sOrdercd : ordercd
						, i_sProductcd : productcd
						, i_sFlagProductcd : flag
					}
					, animation : false
					, async : false
					, success : function(data, textStatus ) {
						if(data.status == "succ") {
							var product = data.object.product;
							var option = data.object.option;
							
							if(product ==""){
								
								showMessageBox({message : "모든 구매후기를 등록하셨어요."});
								return;
								
							}
							
							MobileReviewComm.fn.setReviewReg(product, option, flag);
							$("#i_sContent").val("");
							modalPopup("#productReviewWrite");
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			});
			
			$(".btn_review_cancel").unbind("click").click(function(event) {
				event.preventDefault();
				
				removeErrorMessage();
				modalPopupClose('#productReviewWrite');
			});
			
			$(".btn_modalpopupClose").unbind("click").click(function(event) {
				event.preventDefault();
				
				removeErrorMessage();
				modalPopupClose('#productReviewWrite');
			});
			
		},
		addPopupBtnEvent : function() {
			$(".btn_option_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				var product = $(this).parent().attr("class");
				
				if($("."+product).find(":disabled").length == 1) {
					$("option", "#i_sProductcd").eq(0).prop("selected", true);
					$(".ul_option").hide();
				}
				
				var id = $(this).attr("id");
				$("#li_"+id).hide();
				$("input[type='hidden']", $("#li_"+id)).prop("disabled", true);
			});
			
			$("#i_sProductcd").unbind("change").change(function() {
				removeErrorMessageBox($("*[name='i_sProductcd']"));
				removeErrorMessageBox($("*[name='i_arrOptioncd']").eq(0));
				if($(this).val() != "") {
					var id = $(this).val();
					//$(".ul_option").show();
					$(".ul_option>li").hide();
					$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
					
					var option_cnt = parseInt($("#input_option_cnt", $(".li_"+id)).val());
					if(option_cnt > 1) {
						$(".li_"+id).show();
						$(".ul_option").show();
					}
					$("input[type='hidden']", $(".li_"+id)).prop("disabled", false);
				} else {
					$(".ul_option>li").hide();
					$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
					$(".ul_option").hide();
					
					addErrorMessageBox($("*[name='i_sProductcd']"), "등록하실 상품을 선택해 주세요.");
				}
			});
			
			$("#i_sContent").unbind("keyup").keyup(function() {
				var content = $(this).val();
				content = EmptyReplace(content);
				var length = content.length;
				removeErrorMessageBox($("*[name='i_sContent']"));
				if(length > 200) {
					$(".p_byte>em").html("<font color=\"red\">"+length+"</font>");
				} else {
					$(".p_byte>em").text(length);
					
					if(length == 0) {
						addErrorMessageBox($("*[name='i_sContent']"), "내용을 입력해주세요.");
					}
				}
			});
			
			$("#gradeSlider").unbind("click").click(function() {
				removeErrorMessageBox($("*[name='i_iRecomPoint']").eq(0));
			});
		},
		fnValidate : function() {
			var isResult = true;
			var target = undefined;
			removeErrorMessage();
			
			var productcd = $("option:selected", "*[name='i_sProductcd']");
			var optioncd = $("*[name='i_arrOptioncd']:not(':disabled')");
			var recomPoint = $("*[name='i_iRecomPoint']:checked");
			var content = $("*[name='i_sContent']");
			
			if(productcd.val() == "") {
				addErrorMessageBox($("*[name='i_sProductcd']"), "등록하실 상품을 선택해 주세요.");
				isResult = false;
				
				if(target == undefined) {
					target = productcd;
				}
			}
			if(optioncd.size() == 0) {
				if(productcd.val() != "") {
					addErrorMessageBox($("*[name='i_sProductcd']").eq(0), "등록하실 상품을 선택해 주세요.");
					$("#i_sProductcd").val("");
					isResult = false;
					if(target == undefined) {
						target = $("*[name='i_sProductcd']").eq(0);
					}
				}
			}
			
			if(recomPoint.length == 0 || recomPoint.val() == 0) {
				
				addErrorMessageBox($("*[name='i_iRecomPoint']").eq(0), "평점을 선택해 주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_iRecomPoint']").eq(0);
				}
			}
			
			if(content.val().length > 200) {
				addErrorMessageBox($("*[name='i_sContent']"), "200자 이하로 작성해주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
				
			} else if(content.val() == "") {
				addErrorMessageBox($("*[name='i_sContent']"), "내용을 입력해주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
			} else if(content.val().length < 20) {
				addErrorMessageBox($("*[name='i_sContent']"), "20자 이상 입력해 주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
				
			}
			
			if(!isResult) {
				target.focus();
			}
			
			return isResult;
		},
		setReviewReg : function(product, option, flag) {
			var productHtml = [];
			
			var selected = "";
			
			if(flag == "Y") {
				selected = "selected=\"selected\"";
			}
			
			if(product != undefined && product.length > 0) {
				productHtml.push("<option value=\"\">구매하신 상품을 선택하세요.</option>");
				for(var i=0; i<product.length; i++) {
					productHtml.push("<option value=\""+product[i].v_productcd+"\" "+selected+">"+product[i].v_productnm+"</option>");
				}
			}
			
			$("#i_sProductcd").html(productHtml.join(""));
			
			var arrOption = [];
			
			if(option != undefined && option.length > 0) {
				for(var i = 0; i < option.length; i++) {
					for(var j=0; j<product.length; j++) {
						if(option[i].v_productcd == product[j].v_productcd) {
							arrOption.push("<li id=\"li_"+option[i].v_optioncd+"\" class=\"li_"+option[i].v_productcd+"\">");
							arrOption.push("	<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+option[i].v_optioncd+"\"/>");
							arrOption.push("	<input type=\"hidden\" id=\"input_option_cnt\" value=\""+product[j].n_option_cnt+"\"/>");
							arrOption.push("	<p class=\"ttl\">"+option[i].v_optionnm+"</p>");
							arrOption.push("	<a href=\"#\" class=\"btn_delete btn_option_del\" id=\""+option[i].v_optioncd+"\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete.png\" alt=\"삭제\"></a>");
							arrOption.push("</li>");
						}
					}
				}
				
				$(".ul_option").html(arrOption.join(""));
			}
			
			if(flag == "Y") {
				if(parseInt(product[0].n_option_cnt) > 1) {
					$(".ul_option").show();
					$(".ul_option>li").show();
				} else {
					$(".ul_option").hide();
				}
				$("input[type='hidden']", ".ul_option>li").prop("disabled", false);
			} else {
				$(".ul_option").hide();
				$(".ul_option>li").hide();
				$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
			}
			
			MobileReviewComm.fn.addPopupBtnEvent();
		},
		goSave : function(obj, callback) {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_save_ajax.do"
				, dataType : "json"
				, data : obj
				, animation : false
				, async : false
				, success: function(data, textStatus) {
					if(data.status == "succ") {
						showMessageBox({
							message : data.message
							, close : function() {
								if(typeof callback != "function") {
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
									document.frm.submit();
								} else {
									callback();
								}
							}
						});
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		}
	}
};

var MobileReviewCommStyle = {
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
                        method: MobileReviewCommStyle.handleSliderValue
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
		$('.noUi-target').eq(0).removeClass('grade00 grade01 grade02 grade03 grade04 grade05');
		$('.noUi-target').eq(0).addClass('grade0'+ val);
		$('.radio-a').find('input#range0'+ val).click();
	}
};