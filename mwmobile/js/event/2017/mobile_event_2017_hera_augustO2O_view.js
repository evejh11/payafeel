var MobileHeraAugustO2O = {
	name : "MobileHeraAugustO2O",
	init : function(){
		MobileHeraAugustO2O.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					modalPopup('#pop_hera_o2o');
				}
			});
			
			//예약 버튼
			$(".btn_apply").unbind("click").click(function(event){
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
					MobileHeraAugustO2O.fn.goCheck();
				}
			});
			
			/*$("select[name='i_sStore']").unbind("change").change(function(event){
				event.preventDefault();
				var val = $(this);
				if(val.find("disable")){
					showMessageBox({
						message : "해당 매장은 이미 예약이 완료된 상태입니다.<br/>다른 매장을 선택해주시기 바랍니다."
						, close : function(){
							return ;
						}	
					})
				}
			});*/
			
			/*$("select[name='i_sDay']").unbind("change").change(function(event){
				event.preventDefault();
				var val = $(this);
				if(val.find("disable")){
					showMessageBox({
						message : "해당 날짜는 이미 예약이 완료된 상태입니다.<br/>다른 매장을 선택해주시기 바랍니다."
						, close : function(){
							return ;
						}	
					})
				}
			});*/
			
			$("select[name='i_sStore']").change(function(event){
				event.preventDefault();
				var store = $(this).val();
				MobileHeraAugustO2O.fn.goChange('D', store, '');
			});
			
			$("select[name='i_sDay']").change(function(event){
				event.preventDefault();
				var day = $(this).val();
				var store = $("select[name='i_sStore']").val();
				MobileHeraAugustO2O.fn.goChange('T', store, day);
			});
			
		},
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_hera_augustO2O_apply_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()
					, i_sDay : $("select[name='i_sDay']").val()
					, i_sTime : $("select[name='i_sTime']").val()
					, i_sStore : $("select[name='i_sStore']").val()
				}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "예약 신청 완료<br/>(선정되신 분들께는 LMS 문자 발송됩니다.)"
							, close : function(){
								modalPopupClose("#pop_hera_o2o");
								location.href = GLOBAL_WEB_ROOT + "mobile/event/mobile_event_view.do?i_sEventcd=EVT20170801_heraO2O";
							}	
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else if(data.object == "already"){
							showMessageBox({
								message : "이미 예약하셨습니다.<br/>확인 부탁드립니다."
								, close : function(){
									modalPopupClose("#pop_hera_o2o");
								}	
							});
						}else if(data.object == "notapply"){
							showMessageBox({
								message : "해당 매장, 날짜, 시간에 예약하신 분이 계십니다.<br/>다시 선택해주세요."
								, close : function(){
									return ;
								}
							});
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
					}
				}
			});
		},
		goChange : function(flag, store, day){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_hera_augustO2O_change_ajax.do",
				type : "post",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sChangeFlag : flag
					, i_sStore : store
					, i_sDay : day
				},
				success : function(data, textStatus){
					if(data.status == "succ"){
						//select 다시 그리기
						var arrHtml = [];
						var disable = [];
						if(flag == "D"){
							var list = data.object;
							for(var i = 0; i < list.length; i++){
								arrHtml.push("<option value='"+list[i].v_day+"'");
								arrHtml.push(" style='");
								if(i != 0){
									arrHtml.push("z-index:20;");
								}
								
								arrHtml.push("' ");
								arrHtml.push("class='");
								if(list[i].v_flag_day == "Y"){
									arrHtml.push("disable");
									disable.push(list[i].v_day);
								}
								arrHtml.push("'>");
								
								var date = list[i].v_day;
								var month = date.substring(4, 6);
								var day = date.substring(6);
								arrHtml.push(month + "월 " + day +"일");
								arrHtml.push("</option>");
							}
							
							$("select[name='i_sDay']").html(arrHtml.join(""));
							
						}else if(flag == "T"){
							var list = data.object;
							for(var i = 0; i < list.length; i++){
								arrHtml.push("<option value='"+list[i].v_time+"'");
								arrHtml.push(" style='");
								if(i != 0){
									arrHtml.push("z-index:20;");
								}
								
								arrHtml.push("' ");
								arrHtml.push("class='");
								if(list[i].v_flag_time == "Y"){
									arrHtml.push("disable");
									disable.push(list[i].v_time);
								}
								arrHtml.push("'>");
								
								var date = list[i].v_time;
								var hour = date.substring(0, 2);
								var minute = date.substring(2);
								arrHtml.push(hour + ":" + minute);
								arrHtml.push("</option>");
							}
							
							$("select[name='i_sTime']").html(arrHtml.join(""));
							
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "already"){
								showMessageBox({
									message : "이미 예약하셨습니다.<br/>확인 부탁드립니다."
									, close : function(){
										modalPopupClose("#pop_hera_o2o");
									}
								});
							}else if(data.object == "notapply"){
								showMessageBox({
									message : "해당 매장, 날짜, 시간에 예약하신 분이 계십니다.<br/>다시 선택해주세요."
									, close : function(){
										return ;
									}
								});
							}else{
								showMessageBox({
									message : data.message
								});
							}
						}
					}
				}
					
			});
		}
	}
};