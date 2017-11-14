var MobileSnsUserInfo = {
		name : "MobileSnsUserInfo"
	   ,fbUseYn : false
	   ,twUseYn : false 
	   ,isLogin : false
	   ,init : function(){

		   MobileSnsUserInfo.fbUseYn = $("input[name='i_sFbToken']").val() !="" ? true : false;
		   MobileSnsUserInfo.twUseYn = $("input[name='i_sTwToken']").val() !="" ? true : false;
		   MobileSnsUserInfo.isLogin = $("input[name='i_sUserid']").val() !="" ? true : false;
		   
	   }
};

var MobileSnsLink = {
		name : "MobileSnsLink"
	   ,init : function(){
		   MobileSnsUserInfo.init();
		   MobileSnsLink.addBtnEvent();
	   }
	   ,addBtnEvent : function(){
		   
		   $(".btn_sns_fb").unbind("click").click(function(event){
			  event.preventDefault();
			  showMessageBox({
				message : "준비중 입니다."  
			  });
			  //MobileSnsLink.fnConnect($(this),"facebook"); 
		   });
		   
		   $(".btn_sns_tw").unbind("click").click(function(event){
			  event.preventDefault();
			  showMessageBox({
					message : "준비중 입니다."  
			  });
			  //MobileSnsLink.fnConnect($(this),"twitter"); 
		   });
	   }
	   ,fnConnect : function(obj,flag){
		   
			    var parentObj	= obj.parents("."+flag);
			    var message     = "";
			    var flagType	= "";
			    
			    if(flag == "twitter"){
			    	message		= "트위터";
			    	flagType	= "TW";
			    }else{
			    	message		= "페이스북";
			    	flagType	= "FB";
			    }
			    
				if(!MobileSnsUserInfo.isLogin){
					
					MobileBodyStart.goLogin("");
					
				}else{
					
					  if(!parentObj.hasClass("active")){
						  
							showConfirmBox({
								
								message : message + " 연동을 해제 하시겠습니까?"
								,ok_func : function(){
									MobileSnsLink.fnDisConnect(flagType);
								},cancel_func : function(){
								
								}
							});

					  }else{
						  
							showConfirmBox({
								
								message : message + " 연동을 하시겠습니까?"
								,ok_func : function(){
									
									if(flag == "twitter"){
										MobileSnsLink.twConnection();										
									}else{
										MobileSnsLink.fbConnection();
									}
									
								},cancel_func : function(){
									
								
								}
							});
						
					  }						
				} 
		   
	   }
	   ,fbConnection : function(){
		   
		   if(GLOBAL_MOBILE_APP == "APP"){

			   if(GLOBAL_MOBILE_OS == "iOS" || GLOBAL_MOBILE_OS == "IOS"){
				   window.location="apjscall://jsFaceBookSync";
			   }else if(GLOBAL_MOBILE_OS == "AND"){
				   window.aMain.jsFaceBookSync();
			   }
			   
		   }else{
				var fbUrl = $("input[name='i_sFbConnectUrl']").val();
				
			    window.open(fbUrl, 'DocAttach', 'menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');
		   }
	   }
	   ,twConnection : function(){
		   
		   if(GLOBAL_MOBILE_APP == "APP"){

			   if(GLOBAL_MOBILE_OS == "iOS" || GLOBAL_MOBILE_OS == "IOS"){
				   window.location="apjscall://syncTwitter";
			   }else if(GLOBAL_MOBILE_OS == "AND"){
				   window.aMain.jsTwiterSync();
			   }
			   
		   }else{
			   var twUrl = $("input[name='i_sTwConnectUrl']").val();
			   
			   window.open(twUrl, 'DocAttach', 'menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');
		   }
		   
	   }
	   ,fnDisConnect : function(flag) {

//			if(flag == "FB") {
//				fnFacebookdeauthorize();
//			}
			
		   if(GLOBAL_MOBILE_APP == "APP"){
			   if(flag == "FB") {
				   if(GLOBAL_MOBILE_OS == "iOS" || GLOBAL_MOBILE_OS == "IOS"){
					   window.location = "apjscall://jsFaceBookUnsync";
				   }else if(GLOBAL_MOBILE_OS == "AND"){
					   window.aMain.jsFaceBookUnsync();
				   }
			   }
		   }
		   
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"sns/sns_disconnect.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sFlagType : flag}
				, animation : false
				, success : function(json) {
					if(json.status == "succ") {
						document.location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_sns_link.do";
					}else{
						showMessageBox({
							message : json.message
						});
					}
				}
			});
		}
	   
};