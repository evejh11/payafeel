var MobileMoisture = {
	name : "MobileMoisture",
	init : function(){
		MobileMoisture.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			$(".btn_vote").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else if($(".span_selectmoi").text() == ""){
					showMessageBox({
						message :"추천할 수분크림을 선택해주세요"
					});
				}else{
					MobileMoisture.fn.goVote();
				}
			});
			$("span.radio").unbind("click").click(function(event){
		  		event.preventDefault();
		  		var idx = $("span.radio").index(this);
		  		if($(".span_productnm").text() == ""){
		  			
			  		if($("span.radio").eq(idx).hasClass("checked")){
			  			$("span.radio").eq(idx).removeClass("checked");
			  			$("input:radio[name='recomm']").eq(idx).prop("checked",false);
			  		}else{
			  			$("span.radio").removeClass("checked");
			  			$("span.radio").eq(idx).addClass("checked");
			  			$("input:radio[name='recomm']").eq(idx).prop("checked",true);
			  			$(".span_selectmoi").text($("input:radio[name='recomm']").eq(idx).val());
			  		}
		  		}
	  			
			  });
			$(".btnList").unbind("click").click(function(event){
				event.preventDefault();
				location.href=GLOBAL_WEB_URL + "mobile/event/mobile_event_event_list.do";
			});
		},
		goVote : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2014/mobile_event_2014_moisture_save_ajax.do",
				type : "post",
				data : {
							i_sEventcd : $(".span_eventcd").text(),
							i_sProductcd : $(".span_selectmoi").text(),
						},
				dataType : "json",
				success : function(data, textStatus){
					if(data.status == "succ"){
						$(".span_productnm").text(data.object.productnm);
						$(".span_productcd").text(data.object.productcd);
						
						showMessageBox({
							message : data.message,
							close   : function(){
								$(".btn_vote").html("<span class=\"check_moi\" style=\"font-size:1.0em;\">\""+data.object.productnm+"\" <br/>추천하셨습니다.</span>");
							}
						});
						
						
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else{
							showMessageBox({
								message : data.message
							});
						}
					}
				}
			});
		}
	}
};