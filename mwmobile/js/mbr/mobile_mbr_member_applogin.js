/**
 * 선진화 app 로그인 처리 화면의 이벤트 처리를 위한 Javascript
 */

var	MobileAppLogin = {
	name : "MobileAppLogin",
	loginflag : false,
	init : function() {
	},

	fn : {

		androidPageMove : function(loginKey, loginType, deviceNum) {

			try {

				var prd_frm		= $("#frm_prd_move");
				var flagAction	= $("input[name='i_sFlagAction']", prd_frm).val();

				var frm = $("form[name= 'frm_move']");
				var url = isEmpty($("input[name='i_sReturnUrl']", frm).val()) ? "" : $("input[name='i_sReturnUrl']", frm).val();
				var param = isEmpty($("input[name='i_sReturnParam']", frm).val()) ? "" : $("input[name='i_sReturnParam']", frm).val();
				var tempParam = param.split("&");
				var arrParam = [];
				if(tempParam.length > 0) {
					for(var i=0; i<tempParam.length; i++) {
						if(tempParam[i].indexOf("i_sDeviceNum") == -1 && tempParam[i].indexOf("i_sLoginType") == -1 && tempParam[i].indexOf("i_sLoginKey") == -1 ) {
							arrParam.push(tempParam[i]);
						}
					}
				}
				arrParam.push("i_sLoginKey="	+ loginKey);
				arrParam.push("i_sLoginType="	+ loginType);
				arrParam.push("i_sDeviceNum="	+ deviceNum);

				if (loginKey == "" || loginType == "" || deviceNum == "") {
					if(GLOBAL_API_VERSION == "v1") {
						frm.attr("action", url + "?" + arrParam.join("&"));
						frm.submit();
					}
					else {
						return;
					}
				}

				if(flagAction == "purchase") {

					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
						, type : "POST"
						, dataType : "json"
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {

							if(data.status == "succ") {

								if(data.object >= 3) {

									showMessageBox({
										message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!",
										close : function(){

											try {
												frm.attr("action", url + "?" + arrParam.join("&"));
												frm.submit();
											} catch(e) {
											}

										}
									});
									return;

								}
								else {

									try{

										$("#div_purchase").remove();

										var len = $("input[name='i_arrOptioncd']",frm).size();
										var arrParam = [];

										arrParam.push("<div id='div_purchase'>");
										arrParam.push("<form name='frm_purchase' method='post' action=''>");

										for (var i = 0; i < len; i++) {

											arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+$("input[name='i_arrProductcd']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+$("input[name='i_arrOptioncd']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='"+$("input[name='i_arrOptioncnt']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='PROD_0001'/>");
											arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='"+$("input[name='i_arrFlagSoloPack']",frm).eq(i).val()+"'/>");

										}

										if(loginKey != "" && loginKey != undefined) {
											arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+loginKey+"'/>");
										}
										if(loginType != "" && loginType != undefined) {
											arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+loginType+"'/>");
										}
										arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+deviceNum+"'/>");

										arrParam.push("</form>");
										arrParam.push("</div>");
										$(arrParam.join("")).appendTo("body");

										var frm = $("form[name='frm_purchase']");
										frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1.do");
										frm.submit();

									} catch(e) {
									}

								}
							}
						}
					});

				}
				else {

					if(url.indexOf("/mobile_my_main.do") > -1 || url.indexOf("mobile_my_main_sns.do") > -1) {
						try {
							window.Android.gotoMyPouch()
						}
						catch(e) {
							if (loginType == "NA" || loginType == "FB" || loginType == "KA") {
								url = GLOBAL_SSL_URL + "mobile/my/mobile_my_main_sns.do";
							}
							frm.attr("action", url + "?" + arrParam.join("&"));
							frm.submit();
						}
					}
					else {
						if(frm.length > 0) {
							frm.attr("action", url + "?" + arrParam.join("&"));
							frm.submit();
						}
						else {
							if (!isEmpty(loginKey) && !isEmpty(loginType) && !isEmpty(deviceNum)) {
								var frm			= $("form[name='frm_reload']")
								var arrParam	= [];
								arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + loginKey + "'/>");
								arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + loginType + "'/>");
								arrParam.push("<input type='hidden' name='i_sDeviceNum'		value='" + deviceNum + "'/>");
								$(arrParam.join("")).appendTo(frm);
								frm.submit();
							}
						}
					}

				}
			}
			catch(e) {
				try {
					if (!isEmpty(loginKey) && !isEmpty(loginType) && !isEmpty(deviceNum)) {
						var frm			= $("form[name='frm_reload']")
						var arrParam	= [];
						arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + loginKey + "'/>");
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + loginType + "'/>");
						arrParam.push("<input type='hidden' name='i_sDeviceNum'		value='" + deviceNum + "'/>");
						$(arrParam.join("")).appendTo(frm);
						frm.submit();
					}
				}
				catch(ee) {
				}
			}
			
		}
		, iosPageMove : function(loginKey, loginType, deviceNum) {

			try {

				var prd_frm		= $("#frm_prd_move");
				var flagAction	= $("input[name='i_sFlagAction']", prd_frm).val();
	
				var frm = $("form[name= 'frm_move']");
				var url = isEmpty($("input[name='i_sReturnUrl']", frm).val()) ? "" : $("input[name='i_sReturnUrl']", frm).val();
				var param = isEmpty($("input[name='i_sReturnParam']", frm).val()) ? "" : $("input[name='i_sReturnParam']", frm).val();
				var tempParam = param.split("&");
				var arrParam = []; 
				if(tempParam.length > 0) {
					for(var i=0; i<tempParam.length; i++) {
						if(tempParam[i].indexOf("i_sDeviceNum") == -1 && tempParam[i].indexOf("i_sLoginType") == -1 && tempParam[i].indexOf("i_sLoginKey") == -1 ) {
							arrParam.push(tempParam[i]);
						}
					}
				}
				arrParam.push("i_sLoginKey="	+ loginKey);
				arrParam.push("i_sLoginType="	+ loginType);
				arrParam.push("i_sDeviceNum="	+ deviceNum);
	
				if (loginKey == "" || loginType == "" || deviceNum == "") {
					if(GLOBAL_API_VERSION == "v1") {
						frm.attr("action", url + "?" + arrParam.join("&"));
						frm.submit();
					}
					else {
						return;
					}
				}
	
				if(flagAction == "purchase") {
	
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
						, type : "POST"
						, dataType : "json"
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {
	
							if(data.status == "succ") {
	
								if(data.object >= 3) {
	
									showMessageBox({
										message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!",
										close : function(){
	
											try {
												frm.attr("action", url + "?" + arrParam.join("&"));
												frm.submit();
											} catch(e) {
	//											alert("purchase2 : "+e);
											}
	
										}
									});
									return;
	
								}
								else {
	
									try{
	
										$("#div_purchase").remove();
	
										var len = $("input[name='i_arrOptioncd']",frm).size();
										var arrParam = [];
	
										arrParam.push("<div id='div_purchase'>");
										arrParam.push("<form name='frm_purchase' method='post' action=''>");
	
										for (var i = 0; i < len; i++) {
	
											arrParam.push("<input type='hidden' name='i_arrProductcd' 		value='"+$("input[name='i_arrProductcd']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrOptioncd' 		value='"+$("input[name='i_arrOptioncd']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrProductCnt' 		value='"+$("input[name='i_arrOptioncnt']",frm).eq(i).val()+"'/>");
											arrParam.push("<input type='hidden' name='i_arrProductTypecd' 	value='PROD_0001'/>");
											arrParam.push("<input type='hidden' name='i_arrFlagUseSolo' 	value='"+$("input[name='i_arrFlagSoloPack']",frm).eq(i).val()+"'/>");
	
										}
	
										if(loginKey != "" && loginKey != undefined) {
											arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+loginKey+"'/>");
										}
										if(loginType != "" && loginType != undefined) {
											arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+loginType+"'/>");
										}
										arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+deviceNum+"'/>");
	
										arrParam.push("</form>");
										arrParam.push("</div>");
										$(arrParam.join("")).appendTo("body");
	
										var frm = $("form[name='frm_purchase']");
										frm.attr("action",GLOBAL_SSL_URL+"mobile/order/mobile_order_order_step1.do");
										frm.submit();
	
									} catch(e) {
									}
	
								}
							}
						}
					});
	
				}
				else {
	
					if(url.indexOf("/mobile_my_main.do") > -1 || url.indexOf("mobile_my_main_sns.do") > -1) {
						try {
							window.webkit.messageHandlers.gotoMyPouch.postMessage(null);
						}
						catch(e) {
							alert(e);
							if (loginType == "NA" || loginType == "FB" || loginType == "KA") {
								url = GLOBAL_SSL_URL + "mobile/my/mobile_my_main_sns.do";
							}
							frm.attr("action", url + "?" + arrParam.join("&"));
							frm.submit();
						}
					}
					else {
						if(frm.length > 0) {
							frm.attr("action", url + "?" + arrParam.join("&"));
							frm.submit();
						}
						else {
							if (!isEmpty(loginKey) && !isEmpty(loginType) && !isEmpty(deviceNum)) {
								var frm			= $("form[name='frm_reload']")
								var arrParam	= [];
								arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + loginKey + "'/>");
								arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + loginType + "'/>");
								arrParam.push("<input type='hidden' name='i_sDeviceNum'		value='" + deviceNum + "'/>");
								$(arrParam.join("")).appendTo(frm);
								frm.submit();
							}
						}
					}
	
				}
			}
			catch(e) {
				try {
					if (!isEmpty(loginKey) && !isEmpty(loginType) && !isEmpty(deviceNum)) {
						var frm			= $("form[name='frm_reload']")
						var arrParam	= [];
						arrParam.push("<input type='hidden' name='i_sLoginKey'		value='" + loginKey + "'/>");
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + loginType + "'/>");
						arrParam.push("<input type='hidden' name='i_sDeviceNum'		value='" + deviceNum + "'/>");
						$(arrParam.join("")).appendTo(frm);
						frm.submit();
					}
				}
				catch(ee) {
				}
			}
		}
	}
};	

