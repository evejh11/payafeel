/**
 * 모바일 SNS 로그인 관련 처리
 */
var	MobileSnsLogin = {
	name : "MobileSnsLogin",
	init : function() {
		addInputMessageEvent();
		MobileSnsLogin.fn.addBtnEvent();
		MobileSnsLogin.fn.setPagaInit();
		
	},
	fn : {

		addBtnEvent : function(){
			
            $("#btn_facebook").unbind("click").click(function(event){
            	event.preventDefault();
        		if($("input[name='i_sSnsGbImg']").val() == "01"){
        			showMessageBox({
        				message : "facebook 로그인 중입니다."
        				, close : function (){
        				}
        			});
        			return false;
        		}else if($("input[name='i_sSnsGbImg']").val() == "02"){
        			showConfirmBox({
						message : "kakao 로그인 중입니다.<br/>facebook으로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithFacebook(1);
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else if($("input[name='i_sSnsGbImg']").val() == "03"){
        			showConfirmBox({
						message : "naver 로그인 중입니다.<br/>facebook으로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithFacebook(1);
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else{
        			MobileSnsLogin.fn.loginWithFacebook(1);
        		}
            	
            });
            
            $("#btn_kakao").unbind("click").click(function(event){
            	event.preventDefault();
        		if($("input[name='i_sSnsGbImg']").val() == "02"){
        			showMessageBox({
        				message : "kakao 로그인 중입니다."
        				, close : function (){
        				}
        			});
        			return false;
        		}else if($("input[name='i_sSnsGbImg']").val() == "01"){
        			showConfirmBox({
						message : "facebook 로그인 중입니다.<br/>kakao로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithKakao(1);
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else if($("input[name='i_sSnsGbImg']").val() == "03"){
        			showConfirmBox({
						message : "naver 로그인 중입니다.<br/>kakao로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithKakao(1);
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else{
        			MobileSnsLogin.fn.loginWithKakao(1);
        		}
            	
            });
            
            $("#btn_naver").unbind("click").click(function(event){
            	event.preventDefault();
        		if($("input[name='i_sSnsGbImg']").val() == "03"){
        			showMessageBox({
        				message : "naver 로그인 중입니다."
        				, close : function (){
        				}
        			});
        			return false;
        		}else if($("input[name='i_sSnsGbImg']").val() == "01"){
        			showConfirmBox({
						message : "facebook 로그인 중입니다.<br/>naver로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithNaver();
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else if($("input[name='i_sSnsGbImg']").val() == "02"){
        			showConfirmBox({
						message : "kakao 로그인 중입니다.<br/>naver로 로그인하시겠어요?"
						, ok_func : function(){
							MobileSnsLogin.fn.loginWithNaver();
						}
					    , cancel_func: function(){
							return false;
						}
					});
        		}else{
        			MobileSnsLogin.fn.loginWithNaver();
        		}
            	
            });
		},
		setPagaInit : function(){
			
		},
		
		loginWithNaver : function(){
			//$("#naver_id_login").on("click",function(event){
			//	$("#naver_id_login_anchor").trigger('click');
			//});
			//naver_id_login.dispatchEvent
			//$("#naver_id_login").trigger('click');
			$("#naver_id_login_anchor").trigger('click');
		},
		
		loginWithFacebook : function(status){
			if(GLOBAL_MOBILE_APP == "APP"){
				var appkey = $("#i_sFbAppid").val();
				var url = "http://www.facebook.com/dialog/oauth?client_id="+appkey+"&redirect_uri="+GLOBAL_WEB_URL +"mobile/sns/mobile_sns_facebook_callback2.do&scope=public_profile,email";
				location.href = url;
			}else{
				FB.getLoginStatus(function(response){
					if (response.status == "connected") {
						// 페이스북 로그인 YES! and 앱 허가 YES!
						MobileSnsLogin.fn.handleFacebookRegist(response,status);
					} else if (response.status == "not_authorized") {
						// 페이스북 로그인 YES! but 앱 허가 NO!
						FB.login(function(response) {
							MobileSnsLogin.fn.handleFacebookRegist(response,status);
						}, 
						{scope: 'public_profile'});
					} else {    
						// 페이스북 로그아웃 상태.
						FB.login(function(response) {
							MobileSnsLogin.fn.handleFacebookRegist(response,status);  
						}, 
						{scope: 'public_profile'});
					}
				});
			}
		},
		
		handleFacebookRegist : function(response,status){
			
			var accessToken = response.authResponse.accessToken;
			FB.api('/me', {fields: 'email, birthday, name'}, function(user) {
				
				userEmail = user.email; 
				userName = user.name;
				userId = user.id;
				gubun = "01";
				if(!user.error){
					if(!userEmail){
						if(status == 1){
							showMessageBox({
								message : "해당 유저 정보 오류로 페이스북으로 로그인이 불가합니다."
							});
						}else{
							showMessageBox({
								message : "해당 유저 정보 오류로 페이스북으로 가입이 불가합니다. 이메일로 가입해주세요."
							});
						}
						return;
					}else{
						$("#i_sSnsUserId").val(userId);
						$("#i_sSnsUserEmail").val(userEmail);
						$("#i_sSnsUserName").val(userName);
						$("#i_sSnsToken").val(accessToken);
						$("#i_sSnsGubun").val(gubun);
						
						if(status == 1){
							//fnShow();
							MobileSnsLogin.fn.fnLoginSns();
						}else{
							//fnShow();
						}
					}	
				}
			});
		},
		
		loginWithKakao : function(){
			// 로그인 창을 띄웁니다.
			var KAKAO_REST_APPID = $("#KAKAO_REST_APPID").val();
			var WEB_URL = $("#WEB_URL").val();
			window.location='https://kauth.kakao.com/oauth/authorize?client_id=' +KAKAO_REST_APPID+ '&redirect_uri=' + WEB_URL + 'mbr/mbr_member_kakao_oauth.do&response_type=code';
			
			
			
			/*Kakao.Auth.login({
			    success: function(authObj) {
			    	//authObj: { access_token:"...", refresh_token:"..." token_type:"bearer", expires_in:43199, scope:"Basic_Profile"}
			    	console.log("Kakao", authObj);
			    	accessToken = authObj.access_token;
			
			    	// 로그인 성공시, API를 호출합니다.
			    	Kakao.API.request({
			    		url: '/v1/user/me',
			    		success: function(res) {
			    			console.log("Kakao res", res);
			    
			    			userId = res.id;
			    			userName = res.properties.nickname;
			    			userEmail = res.properties.email; 
			    			gubun = "02";
				
			    			$("#i_sSnsUserId").val(userId);
			    			$("#i_sSnsUserEmail").val("");
			    			$("#i_sSnsUserName").val(userName);
			    			$("#i_sSnsToken").val(accessToken);
			    			$("#i_sSnsGubun").val(gubun);
				
			    			MobileSnsLogin.fn.fnLoginSns();
			    		},
			    		fail: function(error) {
			    			showMessageBox({
			    				message : "해당 유저 정보 오류로 카카오계정으로 로그인이 불가합니다."
			    			});
			    			console.log("Kakao error", error);
			    		}
			    	});
			    },
			    fail: function(err) {
			    	//errorObj: { error: "access_denied", error_description: "..."}
			    	showMessageBox({
			    		message : "해당 유저 정보 오류로 카카오계정으로 로그인이 불가합니다."
			    	});
			    	console.log("Kakao error", err);
			    	}
			  	});*/
		},
			
		fnLoginSns : function(){
			MobileSnsLogin.fn.LoginSnsMemberCheck();			
		},
		
		/**
		 * SNS 로그인
		 */
		LoginSnsMemberCheck : function(){
			if(MobileSnsLogin.fn.Validator3()){
				var userId		= $.trim($("input[name='i_sSnsUserId']").val());
	        	var userEmail	= $.trim($("input[name='i_sSnsUserEmail']").val());
	        	var userName	= $.trim($("input[name='i_sSnsUserName']").val());
	        	var accessToken	= $.trim($("input[name='i_sSnsToken']").val());
	        	var gubun	    = $.trim($("input[name='i_sSnsGubun']").val());
	        	MobileCommon.ajax({
				   	url     : GLOBAL_WEB_ROOT + "mbr/mbr_member_sns_login_ajax.do",
	    			type : "POST",
	    			animation : false,
					async	: false,
	    			data : {
				    	i_sGubun 	 : gubun,
				    	i_sSnsId 	 : userId,
				    	i_sEmail	 : userEmail,
				    	i_sUserName  : userName,
				    	i_sToken     : accessToken
	    			},
	    			dataType : "json",
	    			isModal : true,
	    			isModalEnd : true,
	    			success : function ( data, textStatus, jqXHR) {
	    				if (data.status == "succ") {
	    					if(GLOBAL_MOBILE_APP == 'APP'){
	    						if(GLOBAL_MOBILE_OS == 'iOS'){
	    							window.location="apjscall://jsReloadAppDeviceConfDataWithReturnUrl";
	    						}else if(GLOBAL_MOBILE_OS == 'AND'){
	    							window.aMain.jsReloadAppDeviceConfData();
	    						}
	    					}else{	
	    						var prd_frm = $("#frm_prd_move");
								if($("input[name='i_sFlagAction']",prd_frm).val() == "wish" ||  $("input[name='i_sFlagAction']",prd_frm).val() == "purchase"){
									IS_LOGIN_SNS = true;
									MobileLogin.fn.setPrdReturnUrl();
								}else{
									MobileLogin.fn.setReturnUrl();
								}
	    					}
	    				}
	    				else {
	    					showMessageBox({
				    			message : data.message
				    			, close : function(){
				    				MobileLogin.loginflag = false;
				    				location.href = GLOBAL_WEB_URL + "mobile/mbr/mobile_mbr_member_login.do";
				    			}
				    		});
	    					
	    				}
	    			}
	    		});
			}
		},
		
		Validator3 : function(){
			
			var validate = true;
			
			if($("input[name='i_sSnsUserId']").val() == ""){
				showMessageBox({
					message : "SNS ID값이 없습니다."
				});
				$("input[name='i_sSnsUserId']").focus();
				return false;
			}
			
			return validate;
		}
		
	}
};
			
