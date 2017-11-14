var validate = false;
var limiteLength = false;
var	MobileWishProject = {
	name : "MobileWishProject",
	init : function() {
		MobileWishProject.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			
			$("#i_sContent").unbind("click").click(function(){
				event.preventDefault();
				
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});					
					
				}else{
				
					if($("#i_sContent").val() == '이곳에 메시지를 입력하세요.'){
						$("#i_sContent").val("");
						$(".byteCnt").html("0");
					}
					
				}
			});
			
			
			$("#i_sContent").unbind("keyup").keyup(function() {
				var idx = $("#i_sComment").index($(this));
				var text = $(this).val();
				text = EmptyReplace(text);
				// var length2 = calculate_byte(text);   3byte
				var length = MobileWishProject.fn.getTextAreaByte(text);
				if(length < 1){
					$(".byteCnt").eq(idx).html("<font color=\"red\">"+length+"</font>");
					validate = false;
				}
				else if(length > 80) {
					$(".byteCnt").eq(idx).html("<font color=\"red\">"+length+"</font>");
					validate = false;
					showMessageBox({
						message : "문자 길이를 확인해 주세요~!",
						close : function(){
							$("#i_sContent").focus();
						}
					});
				} else {
					$(".byteCnt").eq(idx).html(length);
					validate = true;
				}
			});
			$(".btn_time").unbind("click").click(function(event){
			   event.preventDefault();
			   var text = $("#i_sContent").val();
			   if(validate){
				   MobileWishProject.fn.saveTimeCapsuleComment(text);
			   }else{
				   showMessageBox({
					   message : "문자 길이를 확인해 주세요~!"
				   });
			   }
		    });
		},
		
		getTextAreaByte : function(sTargetStr){
		   var sTmpStr, sTmpChar;
			var nOriginLen = 0;
			var nStrLength = 0;

			sTmpStr = new String(sTargetStr);
			nOriginLen = sTmpStr.length;

			for ( var i=0 ; i < nOriginLen ; i++ ) {
				sTmpChar = sTmpStr.charAt(i);

				if (escape(sTmpChar).length > 4) {
					nStrLength += 2;
				}else if (sTmpChar!='\r') {
					nStrLength ++;
				}
			}
			return nStrLength;
	   },
		
		saveTimeCapsuleComment : function(text){
			var frm = $("form[name='frm']");
		    var eventcd = $("#i_sEventcd", frm).val();
		   cmAjax({
			   url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_timecapsule_save.do",
			   data : {i_sContent : text,
				   		 i_sEventcd : eventcd},
			   type : "post",
			   dataType : "json",
			   success : function(data, textStatus){
				   if(data.status =="succ"){
					   showMessageBox({
							message : "고객님의 새해 소망이 AP몰 타입캡슐에</br> 보관되었습니다!</br> 입력해주신 새해 목표는 2015년 12월</br>고객님의 핸드폰으로 전송됩니다."
						});
				   }else{
					   if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									document.frm_login.submit(); 
								}
							});
						}else {
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