var clickflag = false;
var clickflag2 = false;
var clickflag3 = false;
var clickflag4 = false;
var clickflag5 = false;
var clickflag6 = false;
var clickflag7 = false;
var clickflag8 = false;
var MobileIopeCushionBox = {
	name : "MobileIopeCushionBox",
	init : function(){
		MobileIopeCushionBox.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_buy1").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag){
					return;
				}else{
					clickflag = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
					, type : "post"
					, dataType : "json"
					, success : function(data, textStatus){
						if(data.status == "succ"){
							var list = [];
							
							list.push({
								productcd : "SPR20160407000017370"
									, optioncd : optioncd                                                  
									, cnt : 1
									, typecd : "PROD_0001"
										, flagSoloPack : "N"
											, flagaction : "purchase"
							});
							
							MobileBodyStart.immediatelyPurchage({list : list});
							$(".btn_layer_close").unbind("click").click(function(event){
				        		clickflag = false;
				        	});
						}else{
							if(data.object == "login"){
								showConfirmBox({
									message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
									, ok_func : function(){
										document.frm_login.submit();
									}
								});
							}else{
								showMessageBox({
									message : data.message
								});
								clickflag = false;
							}
						}
					}
				});
				
			});
			$(".btn_buy2").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag2){
					return;
				}else{
					clickflag2 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag2 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag2 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy3").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag3){
					return;
				}else{
					clickflag3 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag3 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag3 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy4").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag4){
					return;
				}else{
					clickflag4 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag4 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag4 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy5").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag5){
					return;
				}else{
					clickflag5 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag5 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag5 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy6").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag6){
					return;
				}else{
					clickflag6 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag6 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag6 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy7").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag7){
					return;
				}else{
					clickflag7 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag7 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag7 = false;
								}
							}
						}
				});
				
			});
			$(".btn_buy8").unbind("click").click(function(event){
				event.preventDefault();
				if(clickflag8){
					return;
				}else{
					clickflag8 = true;
				}
				var optioncd =  $(this).attr("id");
				
				cmAjax({
					url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_iopecushion_box_optCntChk_ajax.do"
					, data : {i_sOptioncd : optioncd}
				, type : "post"
					, dataType : "json"
						, success : function(data, textStatus){
							if(data.status == "succ"){
								var list = [];
								
								list.push({
									productcd : "SPR20160407000017370"
										, optioncd : optioncd                                                  
										, cnt : 1
										, typecd : "PROD_0001"
											, flagSoloPack : "N"
												, flagaction : "purchase"
								});
								
								MobileBodyStart.immediatelyPurchage({list : list});
								$(".btn_layer_close").unbind("click").click(function(event){
									clickflag8 = false;
								});
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}else{
									showMessageBox({
										message : data.message
									});
									clickflag8 = false;
								}
							}
						}
				});
				
			});
			
		}
	}
};