/**
 * 모바일 로그인 처리 화면의 이벤트 처리를 위한 Javascript
 */

var	MobileLogin = {
	name : "MobileLogin",
	loginflag : false,
	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');

//		MobileLogin.fn.setSubMenuChange();
		MobileLogin.fn.setMbrNonMbrTab();
		MobileLogin.fn.inputAddEvent();
		MobileLogin.fn.KeyPressEnter();
		MobileLogin.fn.getPageInit();

		MobileLogin.fn.getLoginInputText();
		MobileLogin.fn.loginChangeEvent();
		//앱 검사 시 회원가입 노출 안되도록 하는 부분
//		if(GLOBAL_MOBILE_APP == 'APP'){
//			if (GLOBAL_MOBILE_OS == 'AND') {
//				$(".btn_member_join").show();
//			}
//		}else{
//			$(".btn_member_join").show();
//		}

},

	fn : {
		/**
		 * 로그인 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_ROOT + "mobile/mbr/" + $(this).val() + ".do";
			});
		},

		/**
		 * returnUrl 처리
		 */
		setReturnUrl 	: function(){
			var frm = $("form[name= 'frm_move']");
			var url = $("input[name='i_sReturnUrl']", frm).val();
			var param = $("input[name='i_sReturnParam']", frm).val();

			if (param == "") {
				frm.attr("action", url);
			}
			else {
				frm.attr("action", url + "?" + param);
			}
			frm.submit();
		},
		setPrdReturnUrl : function(){
			var frm = $("#frm_prd_move");
			var url = $("input[name='i_sReturnUrl']", frm).val();
			var param = $("input[name='i_sReturnParam']", frm).val();
			if($("input[name='i_sFlagAction']",frm).val() == "wish"){
				var list = [];
				var size = $("input[name='i_arrOptioncd']",frm).size();
				for(var i=0; i<size; i++) {
	    			var option = $("input[name='i_arrOptioncd']",frm).eq(i).val();
	    			var productcd = $("input[name='i_arrProductcd']",frm).eq(i).val();
	    			var cnt = $("input[name='i_arrOptioncnt']",frm).eq(i).val();
	    			var flagsolo = $("input[name='i_arrFlagSoloPack']",frm).eq(i).val();
	    			list.push({
	    				productcd : productcd
	    				, optioncd : option
	    				, cnt : cnt
	    				, flagSoloPack : flagsolo
	    				, returnUrl : url+"?"+param
	    			});
	    		}

	    		MobileBodyStart.addUserWish({
	    			list : list
					, sourceFlag : "BLANK"
					, flagSoloPack : $(".span_soloPack").text()
					, callback : function(){
						location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
					}
	    		});
			}else{
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
					, type : "POST"
					, dataType : "json"
					, animation	: false
					, success : function ( data, textStatus, jqXHR) {

						if(data.status == "succ"){

							if(data.object >= 3){
								showMessageBox
								({
									message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!",
									close : function(){
										var frm = $("form[name= 'frm_move']");
										var url = $("input[name='i_sReturnUrl']", frm).val();
										var param = $("input[name='i_sReturnParam']", frm).val();

										if (param == "") {
											frm.attr("action", url);
										}
										else {
											frm.attr("action", url + "?" + param);
										}
										frm.submit();
									}
								});
								return;
							}else{
								var list = [];
								var size = $("input[name='i_arrOptioncd']",frm).size();
								for(var i=0; i<size; i++) {
					    			var option = $("input[name='i_arrOptioncd']",frm).eq(i).val();
					    			var productcd = $("input[name='i_arrProductcd']",frm).eq(i).val();
					    			var cnt = $("input[name='i_arrOptioncnt']",frm).eq(i).val();
					    			var flagsolo = $("input[name='i_arrFlagSoloPack']",frm).eq(i).val();
					        		list.push({
					        			productcd : productcd
					        			, optioncd : option
					        			, cnt : cnt
					        			, typecd : "PROD_0001"
					        			, flagSoloPack : flagsolo
					        			, flagloginpg : true
					        		});
					        	}

								MobileBodyStart.immediatelyPurchage({list : list});
							}
						}
					}
				});

			}
		},
		/**
		* 회원 비회원 로그인 탭메뉴 처리
		*/
		setMbrNonMbrTab : function(){
			 var $tabCate = $(".tab_wrap > h2");
	         var $tabCont = $(".tab_wrap .tab_cont");
	         $(".tab_wrap .tab_cont:not(:first)").css("display","none");


	         $tabCate.click(function(){
	        	 var $idxTab = $tabCate.index(this);

	        	 $tabCont.hide().eq($idxTab).show();
                 $tabCate.removeClass("active").eq($idxTab).addClass("active");

	        	 if($idxTab == 0) {
		            	if($("input[name='i_sUserid']", "form[name='mbrlogin']").val().length > 0) {
		            		$("input[name='i_sPassword']", "form[name='mbrlogin']").focus();
		            	} else {
			            	$("input[name='i_sUserid']", "form[name='mbrlogin']").focus();
		            	}
		            } else {
		            	if($("input[name='i_sOrdercd']", "form[name='nonmbrlogin']").val().length > 0) {
		            		$("input[name='i_iPhone1']", "form[name='nonmbrlogin']").focus();
		            	} else {
			            	$("input[name='i_sOrdercd']", "form[name='nonmbrlogin']").focus();
		            	}
		            }
		       });
            return false;

		},

		/**
		 * 2017 모바일웹 리뉴얼 로그인 이벤트
		 */

		loginChangeEvent: function() {
			$('#btn_NM').click(function(){
			//	$('.gnb_login .h').text('비회원 로그인');
				$('.sec_login .mbrformA').hide();
				$('.sec_login .mbrformB').show();
				$(this).hide();
				$('#btn_YM').css('display','block');
				$('#btn_YM_TXT').css('display','inline-block');
			});

			$('#btn_YM').click(function(){
		//		$('.gnb_login .h').text('로그인');
				$('.sec_login .mbrformB').hide();
				$('.sec_login .mbrformA').show();
				$(this).hide();
				$('#btn_NM').css('display','block');
			});

			$('#btn_YM_TXT').click(function(){
		//		$('.gnb_login .h').text('로그인');
				$('.sec_login .mbrformB').hide();
				$('.sec_login .mbrformA').show();
				$(this).hide();
				$('#btn_NM').css('display','block');
			});

			$('.btn_keyboard').click(function(){
				if($('.pc_keyboard').hasClass('open')!=true){
					$('.pc_keyboard').addClass('open');
				}else{
					$('.pc_keyboard').removeClass('open');
				}
			});
		},

	    /**
	     * input 이벤트 추가
	     */

	    inputAddEvent : function(){

	    	$("#btn_login", "form[name='mbrlogin']").click(function(event){
	    		event.preventDefault();
	    		MobileLogin.fn.LoginCheck();
	    	});
	    	$("#btn_non_login", "form[name='nonmbrlogin']").click(function(event){
	    		event.preventDefault();
	    		MobileLogin.fn.LoginNonMemberCheck();
	    	});

	    	$(".btn_test_login").unbind("click").click(function(event) {
	    		event.preventDefault();

	    		var id = $(this).attr("id").split("/")[0];
	    		var pwd = $(this).attr("id").split("/")[1];

	    		$("input[name='i_sUserid']").val(id);
	    		$("input[name='i_sPassword']").val(pwd);

	    		MobileLogin.fn.LoginCheck();
	    	});

	    	$("#i_sFlagAuto").unbind("click").click(function(event){

	    		var flag = $("#i_sFlagAuto").is(":checked");
	    		if(flag){
					if(GLOBAL_MOBILE_APP == 'APP'){
						if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
							window.location="apjscall://jsAutoLoginChkWithValue?Y";
						}else if (GLOBAL_MOBILE_OS == 'AND') {

						}
					}
	    		}else{
					if(GLOBAL_MOBILE_APP == 'APP'){
						if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
							window.location="apjscall://jsAutoLoginChkWithValue?N";
						}else if (GLOBAL_MOBILE_OS == 'AND') {

						}
					}
	    		}

	    	});

	    	var banner_navi = [];
	    	$(".loginBannerVisual-wrap > div").each(function(i) {
	    		var active = "";
	    		if(i == 0) {
	    			active = "active";
	    		}

	    		banner_navi.push("<span class='"+active+"'><span class='hide'>"+parseInt(i+1)+"</span></span>");
	    	});

	    	$(".loginBannerVisual-nav").html(banner_navi.join(""));

	    	window.loginBannerSwipe = new Swipe(document.getElementById('loginBannerSwipe'), {
	            continuous: true,
	            stopPropagation: true,
	            callback: function(event, element) {
	            	var idx = setNaviIndex($(".loginBannerVisual-nav > span"), event);

					$(".loginBannerVisual-nav > span").removeClass().eq(idx).addClass("active");
	            }
	        });
	    },
	    /**
		 *  비회원 로그인 전화번호 (지역번호, 010, 011...) 가져오는 부분
		 */
		getPageInit : function() {
			MobileCommon.ajax({
				  url 	: GLOBAL_WEB_ROOT + "mobile/mbr/mobile_order_info_p_check_ajax.do",
    			  type 	: "POST",
    			  data 	: "",
    			  dataType 		: "json",
    			  isModal 		: true,
    			  isModalEnd	: true,
    			  animation : false,
  				  async	: false,
    			  success 		: function ( data, textStatus, jqXHR) {
    				if (data.status == "succ") {
    					var obj = data.object;
    					var arrHtml = Array();

    					for(var vo = 0; vo < obj.numlist.length; vo++){
    						arrHtml.push("<option value="+obj.numlist[vo].v_sub_codenm+">"+obj.numlist[vo].v_sub_codenm+"</option>");
    					}
    					$(arrHtml.join("\n")).appendTo($(".loginform #i_iPhone1"));
    				}
    			  }
			});
		},

		 /**
		 * 엔터키 입력시
		 */
	    KeyPressEnter : function(){
	    	var login_frm	 = $("form[name='mbrlogin']");
	    	var non_frm 	 = $("form[name='nonmbrlogin']");

	    	$("input[name='i_sUserid']", login_frm).keyup(function(event) {
	    		if(event.keyCode == 13){
	    			if($(this).val().length > 0 && $("input[name='i_sPassword']", login_frm).val().length > 0){
	    				MobileLogin.fn.LoginCheck();
	    			} else if($(this).val().length > 0 && $("input[name='i_sPassword']", login_frm).val().length == 0){
	    				$("input[name='i_sPassword']", login_frm).focus();
	    			}
	    		}
	    	});
	    	$("input[name='i_sPassword']", login_frm).keyup(function(event) {
	    		if(event.keyCode == 13){
	    			if($(this).val().length > 0 && $("input[name='i_sUserid']", login_frm).val().length > 0){
	    				MobileLogin.fn.LoginCheck();
	    			} else if($(this).val().length > 0 && $("input[name='i_sUserid']", login_frm).val().length == 0){
	    				$("input[name='i_sUserid']", login_frm).focus();
	    			}
	    		}
	    	});
	    	$("input[name='i_sOrdercd']", non_frm).keyup(function(event) {
	    		if(event.keyCode == 13){
	    			if($(this).val().length > 0){
	    				if($("*[name='i_iPhone1']", non_frm).val().length > 0){
	    					if($("input[name='i_iPhone2']", non_frm).val().length > 0){
	    						if($("input[name='i_iPhone3']", non_frm).val().length > 0){
	    							MobileLogin.fn.LoginNonMemberCheck();
	    	    				} else if($("input[name='i_iPhone3']", non_frm).val().length == 0){
	    							$("input[name='i_iPhone3']", non_frm).focus();
	    						}
	    					} else if($("input[name='i_iPhone2']", non_frm).val().length == 0){
	    						$("input[name='i_iPhone2']", non_frm).focus();
	    					}
	    				} else if($("*[name='i_iPhone1']", non_frm).val().length == 0){
	    					$("*[name='i_iPhone1']", non_frm).focus();
	    				}
	    			}
	    		}
	    	});
	    	$("*[name='i_iPhone2']", non_frm).keyup(function(event) {
	    		if(event.keyCode == 13){
	    			if($(this).val().length > 0){
	    				if($("*[name='i_iPhone1']", non_frm).val().length > 0){
	    					if($("input[name='i_iPhone3']", non_frm).val().length > 0){
	    						if($("input[name='i_sOrdercd']", non_frm).val().length > 0){
	    							MobileLogin.fn.LoginNonMemberCheck();
	    	    				} else if($("input[name='i_sOrdercd']", non_frm).val().length == 0){
	    							$("input[name='i_sOrdercd']", non_frm).focus();
	    						}
	    					} else if($("input[name='i_iPhone3']", non_frm).val().length == 0){
	    						$("input[name='i_iPhone3']", non_frm).focus();
	    					}
	    				} else if($("*[name='i_iPhone1']", non_frm).val().length == 0){
	    					$("*[name='i_iPhone1']", non_frm).focus();
	    				}
	    			}
	    		}
	    	});
	    	$("*[name='i_iPhone3']", non_frm).keyup(function(event) {
	    		if(event.keyCode == 13){
	    			if($(this).val().length > 0){
	    				if($("*[name='i_iPhone1']", non_frm).val().length > 0){
	    					if($("input[name='i_iPhone2']", non_frm).val().length > 0){
	    						if($("input[name='i_sOrdercd']", non_frm).val().length > 0){
	    							MobileLogin.fn.LoginNonMemberCheck();
	    	    				} else if($("input[name='i_sOrdercd']", non_frm).val().length == 0){
	    							$("input[name='i_sOrdercd']", non_frm).focus();
	    						}
	    					} else if($("input[name='i_iPhone2']", non_frm).val().length == 0){
	    						$("input[name='i_iPhone2']", non_frm).focus();
	    					}
	    				} else if($("*[name='i_iPhone1']", non_frm).val().length == 0){
	    					$("*[name='i_iPhone1']", non_frm).focus();
	    				}
	    			}
	    		}
	    	});

	    },


		/**
         * input text 입력, 버튼활성화
         */
        getLoginInputText : function(){

	         $('#member-loginform input[type=text]').keyup(function() {
	            if ( $(this).val() == "" ){
	                 $('button.btnRegister2').removeClass("active").attr("disabled","disabled");
	            } else {
	                 $('button.btnRegister2').addClass("active").removeAttr("disabled");
	            }
	         });
	         $('#nonmember-loginform input[type=text]').keyup(function() {
		            if ( $(this).val() == "" ){
		                 $('button.btnRegister2').removeClass("active").attr("disabled","disabled");
		            } else {
		                 $('button.btnRegister2').addClass("active").removeAttr("disabled");
		            }
		         });
		},

		/**
		 * 회원 로그인 체크
		 */
		LoginCheck : function(){

			if(MobileLogin.loginflag){
				return false;
			}else{
				MobileLogin.loginflag = true;
			}

			var frm			= $("form[name='mbrlogin']");

			if ($("input[name='i_sUserid']", frm).val() == "") {
				showMessageBox({
					message : "아이디를 입력해 주세요."
					, close : function() {
						$("input[name='i_sUserid']", frm).focus();
					}
				});
				MobileLogin.loginflag = false;
				return ;
			}

			if($("input[name='i_sPassword']", frm).val() == "") {
				showMessageBox({
					message : "비밀번호를 입력해 주세요."
					, close : function() {
						$("input[name='i_sPassword']", frm).focus();
					}
				});
				MobileLogin.loginflag = false;
				return ;
			}

			var userid	= $.trim($("input[name='i_sUserid']", frm).val());
			var pswd	= hex_sha512($.trim($("input[name='i_sPassword']", frm).val()));
			var pswd2	= hex_sha512($.md5($.trim($("input[name='i_sPassword']", frm).val())));
			var ssoCode	= $.trim($("input[name='i_sPassword']", frm).val());

			var autoLogin  = $("*[name='i_sFlagAutoLogin']").prop("checked")? "Y" : "N";
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/mbr/mobile_mbr_member_login_ajax.do",
				type		: "POST",
				animation	: false,
				async		: false,
				data		: {
					i_sUserid : userid,
					i_sPassword : pswd,
					i_sPassword2 : pswd2,
					i_sSSoCode : ssoCode,
					i_sFlagSaveId 	: $("*[name='i_sFlagSaveId']").prop("checked") ? "Y" : "N",
					i_sFlagAutoLogin	: $("*[name='i_sFlagAutoLogin']").prop("checked") ? "Y" : "N"
				},
				dataType	: "json",
				isModal		: true,
				isModalEnd	: true,
				success		: function (data, textStatus, jqXHR) {

					if (data.status == "succ") {

						var flagFirstLogin = "N";
						var flagTest = false;
						try {
							if(data.object.i_sUserid == "songes410"
							|| data.object.i_sUserid == "leekw0105"
							|| data.object.i_sUserid == "secreties"
							|| data.object.i_sUserid == "ap_test010") {
								flagTest = true;
							}
							flagFirstLogin = data.object.i_sFirstLogin;
						}
						catch(e){
						}

						if(!isEmpty($("input[name='i_sInviteType']").val())
						&& !isEmpty($("input[name='i_sInviteUsercd']").val())
						&& (flagFirstLogin == "Y" || flagTest)) {
							MobileCommon.ajax({
								url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_save_ajax.do"
								, type : "post"
								, data : {
									i_sInviteType : $("input[name='i_sInviteType']").val()
									, i_sInviteUsercd : $("input[name='i_sInviteUsercd']").val()
									, i_sInviteMethod : $("input[name='i_sInviteMethod']").val()
								}
								, dataType : "json"
								, success : function(data, textStatus, jqXHR) {

									if(data.status == "succ") {

										if ("IT0001" == data.object.i_sInviteType
										||  "ORDER" == data.object.i_sInviteType
										||  "ATTEND" == data.object.i_sInviteType
										) {
											showMessageBox({
												message : "반가워요! <br\><br\>시원한 쇼핑지원금 5,000원이<br\>지급되었어요!"
												, close : function() {
													document.location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_coupon_list.do";
												}
											})
										}
										else {
											if (!isEmpty(data.object.i_sBenefitCode)) {
												showMessageBox({
													message : data.object.i_sInviteUsernm + "님께서 기프트카드<br\>3,000원을 선물하셨어요!<br/><br/>마이파우치 > 기프트카드<br\>에서 확인하세요!"
														, close : function() {
															document.location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_giftcard_list.do";
														}
												})
											}
											else {
												MobileLogin.fn.setReturnUrl();
											}
										}

									}
									else {
										MobileLogin.fn.setReturnUrl();
									}

								}
							});
						}
						else {
							if(GLOBAL_MOBILE_APP == 'APP'){
								if(GLOBAL_MOBILE_OS == 'iOS'){
									window.location="apjscall://jsReloadAppDeviceConfDataWithReturnUrl";
								}else if(GLOBAL_MOBILE_OS == 'AND'){
									window.aMain.jsReloadAppDeviceConfData();
								}
							}else{
								var prd_frm = $("#frm_prd_move");
								if($("input[name='i_sFlagAction']",prd_frm).val() == "wish" ||  $("input[name='i_sFlagAction']",prd_frm).val() == "purchase"){
									IS_LOGIN = true;
									MobileLogin.fn.setPrdReturnUrl();
								}else{
									MobileLogin.fn.setReturnUrl();
								}
							}
						}


					}
					else {

							var flagbreakuser = "N";
							try{
								flagbreakuser = data.object.flagbreakuser;
							}catch(e){
							}

							if(flagbreakuser == "Y"){
								showConfirmBox({
									message : "아모레퍼시픽몰을 오랜만에 찾아주셔서 감사해요!<br/>계정 복구 페이지로 이동하시겠어요?"
									,ok_func : function(){
										location.href = data.object.url;
									}
									,cancel_func : function(){
										location.href = GLOBAL_WEB_ROOT + "mobile/main.do";
									}
								});
							}else{
								showMessageBox({
									message : data.message
									, close : function (){

										if(data.object.url.indexOf("beautypoint") > -1){

											location.href=data.object.url;

										}else{

											$("input[name='i_sPassword']").val("");
											$("input[name='i_sUserid']").focus();
										}
									}
								});
							}
							MobileLogin.loginflag = false;
						}
	    			}
	    		});
	            return false;
	        },

		/**
		 * 비회원 로그인 처리
		 */
        LoginNonMemberCheck : function(){
        	var frm		= $("form[name='nonmbrlogin']");

		        if($("input[name='i_sOrdercd']", frm).val() == ""){
		        	showMessageBox({
		        		message : "주문번호를 입력해 주세요."
		        		, close : function() {
		        			$("input[name='i_sOrdercd']", frm).focus();
		        		}
		        	});
		        	return false;
		        }
		        if($("*[name='i_iPhone1']", frm).val() == "" || $("*[name='i_iPhone2']", frm).val() == ""
		        			|| $("*[name='i_iPhone3']", frm).val() == ""){
		        	showMessageBox({
		        		message : "전화번호를 입력해 주세요."


		        	});
		        	return false;
		        }

	        	var ordercd		= $.trim($("input[name='i_sOrdercd']", frm).val());
	        	var phonenum1	= $("*[name='i_iPhone1']", frm).val();
	        	var phonenum2	= $.trim($("input[name='i_iPhone2']", frm).val());
	        	var phonenum3	= $.trim($("input[name='i_iPhone3']", frm).val());
	        	var phone		= phonenum1+'-'+phonenum2+'-'+phonenum3;

	        	MobileCommon.ajax({
	    			url : GLOBAL_WEB_ROOT + "mobile/mbr/mobile_order_info_check_ajax.do",
	    			type : "POST",
	    			animation : false,
					async	: false,
	    			data : {
	    				i_sOrdercd : ordercd
	    				, i_sPhonenum : phone
	    			},
	    			dataType : "json",
	    			isModal : true,
	    			isModalEnd : true,
	    			success : function ( data, textStatus, jqXHR) {
	    				if (data.status == "succ") {

	    					var encOrdercd = data.object.ordercd;
	        				var encPhone   = data.object.phonenum;
	        				document.location.href = GLOBAL_WEB_URL +"mobile/my/mobile_my_order_list.do?i_sOrdercd=" + encOrdercd + "&i_sPhonenum="+ encPhone;

	    				} else if(data.status == "fail") {
	    					showMessageBox({
				    			message : "등록되지 않은 주문번호이거나 기존에 등록하신 전화번호가 아니에요.<br/>다시 확인부탁드릴게요."
				    		});
	    				}
	    				else {
	    					showMessageBox({
				    			message : data.message
				    		});
	    				}
	    			}
	    		});
	        }

	}
};
