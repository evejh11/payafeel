
var COUNT = 0;//중복신청 방지
var	MobileEventBeauty2 = {

		name : "MobileEventBeauty2",

		init : function() {

			$('.btn_back').attr('href', '/mobile/main.do');

			MobileEventBeauty2.fn.MobileBeautyAform(1);
			MobileEventBeauty2.fn.setSubMenuChange();
			MobileEventBeauty2.fn.setAlimTextShow();
		},
		fn : {

			fnValidate : function(){
				var frm = $("form[name='frm']");
				var isResult = true;
				var target 	= undefined;
				var re = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi"); 

				if($("select[name=i_sSelItem]").val()=="sel") {
					addErrorMessageBox($("select[name='i_sSelItem']", frm),"상품을 선택해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sSelItem']", frm);
					}
				}
				if(isEmpty($("input[name='i_sBlogUrl']", frm).val()) || !re.test($("input[name='i_sBlogUrl']", frm).val())) {
					addErrorMessageBox($("input[name='i_sBlogUrl']", frm),"블로그 주소를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sBlogUrl']", frm);
					}

				}

				if(isEmpty($("textarea[name='i_sContents']", frm).val())) {
					addErrorMessageBox($("textarea[name='i_sContents']", frm),"신청사연을 남겨주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sContents']", frm);
					}

				}

				if(isEmpty($("input[name='i_sUsernm']", frm).val())) {
					addErrorMessageBox($("input[name='i_sUsernm']", frm),"수신인명을 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sUsernm']", frm);
					}
				}


				/*if($("select[name='i_sDeliveryChoose']").val()=="sel") {
					addErrorMessageBox($("select[name='i_sDeliveryChoose']", frm),"경고");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sDeliveryChoose']", frm);
					}
				}*/
				if($("select[name='i_sTele1']").val()=="sel") {
					addErrorMessageBox($("select[name='i_sTele1']", frm),"지역번호를 선택해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sTele1']", frm);
					}
				}
				if(isEmpty($("input[name='i_sTele2']").val())) {
					addErrorMessageBox($("input[name='i_sTele2']", frm),"전화번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sTele2']", frm);
					}
				}
				if(isEmpty($("input[name='i_sTele3']").val())) {
					addErrorMessageBox($("input[name='i_sTele3']", frm),"전화번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sTele3']", frm);
					}
				}
				if($("select[name='i_sPhone1']").val() =="sel") {
					addErrorMessageBox($("select[name='i_sPhone1']", frm),"휴대전화 번호를 선택해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPhone1']", frm);
					}
				}
				if(isEmpty($("input[name='i_sPhone2']").val())) {
					addErrorMessageBox($("input[name='i_sPhone2']", frm),"휴대전화 번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPhone2']", frm);
					}
				}
				if(isEmpty($("input[name='i_sPhone3']").val())) {
					addErrorMessageBox($("input[name='i_sPhone3']", frm),"휴대전화 번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPhone3']", frm);
					}
				}

				if(isEmpty($("input[name='i_sPost1']").val())) {
					addErrorMessageBox($("input[name='i_sPost1']", frm),"우편번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPost1']", frm);
					}
				}
				if(isEmpty($("input[name='i_sPost2']").val())) {
					addErrorMessageBox($("input[name='i_sPost2']", frm),"우편번호를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPost2']", frm);
					}
				}
				if(isEmpty($("input[name='i_sAddress1']").val())) {
					addErrorMessageBox($("input[name='i_sAddress1']", frm),"주소를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sAddress1']", frm);
					}
				}
				if(isEmpty($("input[name='i_sAddress2']").val())) {
					addErrorMessageBox($("input[name='i_sAddress2']", frm),"상세주소를 입력해주세요");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sAddress2']", frm);
					}
				}
				return isResult;
				COUNT = 0;
			},
			setAlimTextShow : function(){
				dropdownMenu2('.beforeAlimArea');
				return false;
			},
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');

				select_input.click(function() {
					location.href	= "/mobile/event/" + $(this).val() + ".do";
				});
			},
			addBtnEvent : function() {
				var $tabCate = $(".beautyTesterView .tab_cate"); 
				var $tabCont = $(".beautyTesterView .tab_cont");

				$tabCate.unbind("click").click(function(event){
					event.preventDefault();
					var $idxTab = $tabCate.index(this);
					var id = $(this).attr("id");   
					$("input[name='i_sFlagTab']").val(id);
					var Flagtab= $("input[name='i_sFlagTab']").val();
					$tabCont.hide().eq($idxTab).show();      
					$tabCate.removeClass("active").eq($idxTab).addClass("active"); 
					if(Flagtab=="aform"){
						var step =$("input[name='i_sFlagStep']").val();
						if(step =="2" || step =="3" || step =="4"){
							$tabCate.eq($idxTab).removeClass("active");
							var idx = parseInt(step) - 1;
							$tabCate.eq(idx).addClass("active");
							$(".tab_cont").hide();
							$(".tab_cont").eq(idx).show();
							if(step =="4"){
								$tabCate.removeClass("active");
								$tabCate.eq(1).addClass("active");
								$(".tab_cont").hide();
								$(".tab_cont").eq(1).show();
							}
							showMessageBox({
								message : "뷰티테스터 신청기간에 신청해주세요."
							});

						}else{
							$(".aform_btn").unbind("click").click(function(event){
								event.preventDefault();
								MobileEventBeauty2.fn.MobileBeautyAform(1);
								MobileEventBeauty2.fn.fbAsyncInit();	
							});	
						}

					}else if(Flagtab =="applicant"){

						MobileEventBeauty2.fn.MobileBeautyApplicant(1);
					}else{			

						MobileEventBeauty2.fn.MobileBeautyReview(1);
					}
					return false;
				});


				$("#i_sBlogUrl").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sBlogUrl']", frm));
					if(isEmpty($("input[name='i_sBlogUrl']", frm).val())) {
						$("input[name='i_sBlogUrl']").val("http://");

						addErrorMessageBox($("input[name='i_sBlogUrl']", frm),"블로그 주소를 입력해주세요");

					}		
				});

				$("#i_sUsernm").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sUsernm']", frm));
					if(isEmpty($("input[name='i_sUsernm']", frm).val())) {
						addErrorMessageBox($("input[name='i_sUsernm']", frm),"수신인명을 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sUsernm']", frm);
						}	
					}	
				});
				$("select[name='i_sSelItem']").change(function(event){
					if($(this).val() !="sel"){
						removeErrorMessageBox($("select[name='i_sSelItem']", frm));
					}else{
						addErrorMessageBox($("select[name='i_sSelItem']", frm),"상품을 선택해주세요");
					}
				});
				/*$("select[name='i_sDeliveryChoose']").change(function(event){
					if($(this).val() !="sel"){
						removeErrorMessageBox($("select[name='i_sDeliveryChoose']", frm));
					}else{
						addErrorMessageBox($("select[name='i_sDeliveryChoose']", frm),"경고");
					}
				});*/
				$("select[name='i_sTele1']").change(function(event){
					if($(this).val() !="sel"){
						removeErrorMessageBox($("select[name='i_sTele1']", frm));
					}else{
						addErrorMessageBox($("select[name='i_sTele1']", frm),"지역번호를 선택해주세요");
					}
				});
				$("#i_sTele2").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sTele2']", frm));
					if(isEmpty($("input[name='i_sTele2']", frm).val())) {
						addErrorMessageBox($("input[name='i_sTele2']", frm),"전화번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sTele2']", frm);
						}	
					}	
				});
				$("#i_sTele3").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sTele3']", frm));
					if(isEmpty($("input[name='i_sTele3']", frm).val())) {
						addErrorMessageBox($("input[name='i_sTele3']", frm),"전화번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sTele3']", frm);
						}	
					}	
				});

				$("select[name='i_sPhone1']").change(function(event){
					if($(this).val() !="sel"){
						removeErrorMessageBox($("select[name='i_sPhone1']", frm));
					}else{
						addErrorMessageBox($("select[name='i_sPhone1']", frm),"휴대전화 번호를 선택해주세요");
					}
				});
				$("#i_sPhone2").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sPhone2']", frm));
					if(isEmpty($("input[name='i_sPhone2']", frm).val())) {
						addErrorMessageBox($("input[name='i_sPhone2']", frm),"휴대전화 번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sPhone2']", frm);
						}	
					}	
				});
				$("#i_sPhone3").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sPhone3']", frm));
					if(isEmpty($("input[name='i_sPhone3']", frm).val())) {
						addErrorMessageBox($("input[name='i_sPhone3']", frm),"휴대전화 번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sPhone3']", frm);
						}	
					}	
				});

				$("#i_sPost1").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sPost1']", frm));
					if(isEmpty($("input[name='i_sPost1']", frm).val())) {
						addErrorMessageBox($("input[name='i_sPost1']", frm),"우편번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sPost1']", frm);
						}	
					}	
				});

				$("#i_sPost2").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sPost2']", frm));
					if(isEmpty($("input[name='i_sPost2']", frm).val())) {
						addErrorMessageBox($("input[name='i_sPost2']", frm),"우편번호를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sPost2']", frm);
						}	
					}	
				});

				$(".i_sAddress1").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sAddress1']", frm));
					if(isEmpty($("input[name='i_sAddress1']", frm).val())) {
						addErrorMessageBox($("input[name='i_sAddress1']", frm),"주소를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sAddress1']", frm);
						}	
					}	
				});
				$(".i_sAddress2").unbind("keyup").keyup(function(){
					removeErrorMessageBox($("input[name='i_sAddress2']", frm));
					if(isEmpty($("input[name='i_sAddress2']", frm).val())) {
						addErrorMessageBox($("input[name='i_sAddress2']", frm),"주소를 입력해주세요");
						isResult = false;
						if (target == undefined) {
							target = $("*[name='i_sAddress2']", frm);
						}	
					}	
				});
				$("select[name='i_sDeliveryChoose']").change(function(event) {
					MobileEventBeauty2.fn.changeDeliveryChoose();
				});

				$("#btn_delivery_add").unbind("click").click(function(event){
					event.preventDefault();
					if($("input[name='i_sUserid']").val() != undefined && $("input[name='i_sUserid']").val() != ""){

						var delivery = {flag : "R"
							,addresscd : ""
								,type : "order"
									,ordercd : ""};

						MobileAddress.field = $(".beautyTesterView").eq(0);
						MobileAddress.deliveryProgress(delivery);

					}else{
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
								, ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							    , cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}
					}
				});	


				$("#btn_zip2").unbind("click").click(function(event){
					event.preventDefault();
					
					MobileZip.field = $(".beautyTesterView").eq(0);
					
					var addr = {
							type : "beautyTesterView",
							orgZip1Name : "i_sPost1",
							orgZip2Name : "i_sPost2",
							orgAddr1Name : "i_sAddress1",
							orgAddr2Name : "i_sAddress2"
						};
					
					MobileZip.fn.zipProgress(addr);

				});

				$(".btn_delivery_reg").unbind("click").click(function(event){
					event.preventDefault();
					/*if(MobileEventBeauty2.fn.fnValidate()){} 배송지 추가시 유효성체크*/ 
					var frm = $("form[name='frm_delivery_addr']");

					MobileCommon.ajax({
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
											arrHtml.push("<span class='btn_ty v2' id='btn_delivery_add'><a href='#'>배송지 신규 등록</a></span>");
											arrHtml.push("</span>");
											target.html($(arrHtml.join("")));
											$("select[name='i_sDeliveryChoose']",target).change(function(event) {
												MobileEventBeauty2.fn.changeDeliveryChoose();
											});

											$("select[name='i_sDeliveryChoose']",target).val(key).change();

											MobileEventBeauty2.fn.deliveryComplete(frm);
										}
							});

						}				
					}
					});			
				});


				$(".btn_reg1").unbind("click").click(function(event){
					event.preventDefault();
					var uid= $("input[name='i_sUserid']").val();
					if(uid == undefined || uid == ""){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
								, ok_func : function(){
//									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
//									MobileBodyStart.goLogin(returnUrl);
									MobileBodyStart.goLoginPage();
								}
							    , cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
//									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
//									MobileBodyStart.goLogin(returnUrl);
									MobileBodyStart.goLoginPage();
								}
							});
						}
					}else{
						//gypark
						$(".missionArea").show();
						$(".t_aform").show();
					}
				});
				
				$(".btn_modify1").unbind("click").click(function(event){
					event.preventDefault();
					$(".missionArea").show();
					$(".t_aform").show();
				});
				
				$(".btn_reg2").unbind("click").click(function(event){
					event.preventDefault();
					COUNT++;
					var flag="R";
					var uid= $("input[name='i_sUserid']").val();
					if(uid == undefined || uid == ""){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
										MobileBodyStart.goLogin(returnUrl);
									}
							, cancel_func: function(){
								return ;
							}
							});
						}else{
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}
					}else{
						MobileEventBeauty2.fn.checkUserLevel(flag);						
					}
				});
				
				$(".btn_modify2").unbind("click").click(function(event){
					event.preventDefault();
					COUNT++;
					var flag="M";
					MobileEventBeauty2.fn.checkUserLevel(flag);
					
				});
				$(".btn_winner").unbind("click").click(function(event){
					event.preventDefault();
					var i_sEventcd=$("input[name='i_sEventcd']").val();

					event.preventDefault();
					MobileEventBeauty2.fn.winnerTester(i_sEventcd);
				});
				$("#i_sContents").unbind("keyup").keyup(function() {
					var cont = $(this).val();
					var length = cont.length;
					removeErrorMessageBox($("textarea[name='i_sContents']", frm));
					if(isEmpty($("textarea[name='i_sContents']", frm).val())) {
						addErrorMessageBox($("textarea[name='i_sContents']", frm),"신청사연을 남겨주세요");
					}

					if(length > 200) {
						$(".p_byte>em").html("<font color=\"red\">"+length+"</font>");
					} else {
						$(".p_byte>em").text(length);
					}
				});
				$("#i_sContents").unbind("focus").focus(function(){
					var uid= $("input[name='i_sUserid']").val();
					if(uid == undefined || uid ==""){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
								, ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							    , cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}
					}
				});
				$("#i_sBlogUrl").unbind("focus").focus(function(){
					var uid= $("input[name='i_sUserid']").val();
					if(uid == undefined || uid ==""){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
								, ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							    , cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}
					}
				});

				$("#aform1").unbind("click").click(function(event){
					event.preventDefault();
				});

				$("#more_btn").unbind("click").click(function(event){
					event.preventDefault();
					MobileEventBeauty2.fn.getMore();
				});
				$("#more_btn2").unbind("click").click(function(event){
					event.preventDefault();
					MobileEventBeauty2.fn.getMore2();
				});

				$(".btn_Detail").unbind("click").click(function(event){
					event.preventDefault();
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
					$("input[name='i_sRvTypecd']").val("DC_T002");
					var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+$(this).attr("id");
					$("form[name='frm']").attr("action", url).submit();

				});
				$(".miss_btn").unbind("click").click(function(event){
					event.preventDefault();
					MobileEventBeauty2.fn.fnMission();
					/*modalPopup(modalPopupMission);
					MobileEventBeauty2.fn.getUrl();*/

				});

				$(".btn_photo").unbind("click").click(function(event){
					event.preventDefault();
					var id=$("input[name='i_sRvTypecd']").val("DC_T002");
					MobileEventBeauty2.fn.goReview(id);

				});

				$(".btn_brand").unbind("click").click(function(event){
					var id = $(this).attr("id");
					event.preventDefault();
					MobileEventBeauty2.fn.goBrand(id);

				});
				//뷰티프로파일
				$(".btn_beautyProfile").unbind("click").click(function(event){
					event.preventDefault();

					var id = $(this).attr("id");
					MobileBeautyProfile.fn.addPopupBtnEvent(id);
				});

				//sns연동
				$(".btn_fb").unbind("click").click(function(event){
					event.preventDefault();
					MobileEventBeauty2.fn.fnConnect($(this),"facebook");
					/*var fbUrl = $("input[name='i_sFbConnectUrl']").val();
				    window.open(fbUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');*/
				});

				$(".btn_tw").unbind("click").click(function(event){
					event.preventDefault();
					MobileEventBeauty2.fn.fnConnect($(this),"twitter");
					/*var twUrl = $("input[name='i_sTwConnectUrl']").val();
				    window.open(twUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');*/
				});

				var twId = $("input[name='i_sTwToken']").val();
				if(twId != ""){
					$(".s_twitter").addClass("on");
				}
				var fbId = $("input[name='i_sFbToken']").val();
				if(fbId != ""){
					$(".s_facebook").addClass("on");
				}
			},

			fnMission : function(){
				MobileCommon.ajax({
					url: "/mobile/event/mobile_beauty_mission_ajax.do",
					type : "post",
					dataType:"json",
					data:{
						"i_sEventcd" : $("input[name='i_sEventcd']").val(),
					}, 
					animation : false,
					success :function(data, textStatus){
						if(data.status =="succ"){
							var userRid = data.object.userRid;
							var selItem = data.object.selItem;
							$("input[name='i_sProductcd']").val(selItem.v_productcd);
							var arrMiss =[];
							arrMiss.push("<a href='"+GLOBAL_WEB_URL+"event/event_beautytester.do?i_sEventcd="+$("input[name='i_sEventcd']").val()+"&i_sTab=2'><img src='"+GLOBAL_WEB_URL+"comm/"+userRid+"/comm_beauty_url_log_check.do'></a>");
							$(".mission").text(arrMiss.join(""));
							modalPopup(modalPopupMission);
							MobileEventBeauty2.fn.getUrl();
							MobileEventBeauty2.fn.addBtnEvent();
						}else if(data.status=="isNotLogin"){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
										MobileBodyStart.goLogin(returnUrl);
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
										MobileBodyStart.goLogin(returnUrl);
									}
								});
							}
						}else{

						}

					}
				});
			},

			fbConnection : function(){

				var fbUrl = $("input[name='i_sFbConnectUrl']").val();

				window.open(fbUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');
			}
			,twConnection : function(){

				var twUrl = $("input[name='i_sTwConnectUrl']").val();

				window.open(twUrl, 'DocAttach', 'height=' + 500 + ',width=' + 500 + ',menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=yes');

			}
			,fnDisConnect : function(flag) {

				/*if(flag == "FB") {
					fnFacebookdeauthorize();
				}*/

				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT +"sns/sns_disconnect.do"
					, type : "post"
						, dataType : "json"
							, data : {i_sFlagType : flag}
				, animation : false
				, success : function(json) {
					if(json.status == "succ") {
						location.href = GLOBAL_WEB_URL + "mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
					}else{
						showMessageBox({
							message : json.message
						});
					}
				}
				});
			},

			fnConnect : function(obj,flag){

				var parentObj	= obj.parents(".s_"+flag);
				var message     = "";
				var flagType	= "";

				if(flag == "twitter"){
					message		= "트위터";
					snsname 	= "twitter ";//공백있어야함
					flagType	= "TW";
				}else{
					message		= "페이스북";
					snsname 	= "facebook ";//공백있어야함
					flagType	= "FB";
				}

				if($("input[name='i_sUserid']").val()==""){
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
								MobileBodyStart.goLogin(returnUrl);
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
								MobileBodyStart.goLogin(returnUrl);
							}
						});
					}
				}else{

					if(parentObj.hasClass("active")){

						showConfirmBox({

							message : message + " 공유를 하지 않으시겠습니까??"
							,ok_func : function(){
								//MobileEventBeauty2.fn.fnDisConnect(flagType);
								if(message == "페이스북"){
									$(".s_facebook").removeClass("active").removeClass("on");
									$("input[name='i_sFboff']").val("Y");
								}else{
									$(".s_twitter").removeClass("active").removeClass("on");
									$("input[name='i_sTwoff']").val("Y");
								}
								
								
							},cancel_func : function(){

							}
						});

					}else{
						var snstk = parentObj.attr("id");
						if(snstk == snsname){
							showConfirmBox({

								message : message + " 연동을 하시겠습니까?"
								,ok_func : function(){
									if(flag == "twitter"){
										MobileEventBeauty2.fn.twConnection();										
									}else{
										MobileEventBeauty2.fn.fbConnection();
									}
									/*location.href =  GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();*/
								},cancel_func : function(){


								}
							});
						}else{
							showConfirmBox({

								message : message + " 공유를 하시겠습니까?"
								,ok_func : function(){
									if(message == "페이스북"){
										$(".s_facebook").addClass("active").addClass("on");
										$("input[name='i_sFboff']").val("N");
									}else{
										$(".s_twitter").addClass("active").addClass("on");
										$("input[name='i_sTwoff']").val("N");
									}
								},cancel_func : function(){


								}
							});
						}
						
						/*showConfirmBox({

							message : message + " 연동을 하시겠습니까?"
							,ok_func : function(){
								if(flag == "twitter"){
									MobileEventBeauty2.fn.twConnection();										
								}else{
									MobileEventBeauty2.fn.fbConnection();
								}
								location.href =  GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
							},cancel_func : function(){


							}
						});*/

					}						
				} 

			},


			//포토리뷰 등록
			goReview : function(id){
				var frm = document.frm;
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_photo_reg.do";
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
				frm.submit();
				/*var returnUrl = "/mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
				location.href = "/mobile/cmnt/mobile_cmnt_photo_reg.do?returnUrl="+returnUrl;*/
			},
			//브랜드 제품리스트 바로가기
			goBrand : function(id){

				var brandcd		= id.split(";")[0];
				var flagAppOpen	= id.split(";")[1];

				if(GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(flagAppOpen == "Y") {
							if(GLOBAL_MOBILE_OS == "AND") {
								window.Android.gotoBrandPage(brandcd);
							}
							else {
								window.webkit.messageHandlers.gotoBrandPage.postMessage(brandcd);
							}
						}
					} catch(e) {}
				}
				else {
					var frm = document.frm;
					frm.action = GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd="+brandcd;
					frm.submit();
				}
			},

			getUrl : function(){

				$(".paste_btn").unbind("click").click(function(event){
					event.preventDefault();

					var url = $(".mission").text();
					var IE=(document.all)?true:false;
					if (IE) {
						window.clipboardData.setData("Text", url);
						showMessageBox({
							message : '클립보드에 URL이 복사되었어요.'
						});
					} else {
						prompt("URL을 클립보드로 복사해주세요.", url);
					}

				});

			},
			deliveryComplete : function(frm){
				$(".beautyTesterView").eq(0).show();
				$(".page_info").eq(0).show();
				$("#div_delivery").hide();

				$("input",frm).val("");
				$("select",frm).val("");
				$("input[name='i_sFlagDefault']", frm).val("Y");
				$("input[name='i_sFlagDefault']", frm).eq(0).prop("checked", false);
				MobileEventBeauty2.fn.addBtnEvent();

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
			},
			/*, changeDelivery : function ( vo ) {

				$("input[name='i_sUsernm']").val(vo.v_receivernm);
				$("select[name='i_sMobile1']").val(vo.v_mobile1);
				$("input[name='i_sMobile2']").val(vo.v_mobile2);
				$("input[name='i_sMobile3']").val(vo.v_mobile3);
			},*/

			deliveryProgress : function(flag,code){

				var frm = $("form[name='frm_delivery_addr']");

				$("input[name='i_sFlagAction']", frm).val(flag);
				$("input[name='i_sAddresscd']", frm).val(code);
				location.href="#";
				$(".beautyTesterView").eq(0).hide();
				$(".page_info").eq(0).hide();
				$("#div_delivery").show();

			},



			getMore : function(){
				var i_iNowPageNo = parseInt($('#i_iNowPageNo').val())+1;
				$('#i_iNowPageNo').val(i_iNowPageNo);
				MobileEventBeauty2.fn.MobileBeautyApplicant(i_iNowPageNo);

			},
			getMore2 : function(){
				var i_iNowPageNo = parseInt($('#i_iNowPageNo').val())+1;
				$('#i_iNowPageNo').val(i_iNowPageNo);
				MobileEventBeauty2.fn.MobileBeautyReview(i_iNowPageNo);

			},
			getParameter : function(){

				var parameter = {
						"i_iNowPageNo"		: parseInt($('#i_iNowPageNo').val() || "1", 10),
						"i_iPageSize"		: parseInt($('#i_iPageSize').val() || "5", 10),
						"i_iTotalPageCnt"	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
						"i_iRecordCnt"		: parseInt($('#i_iRecordCnt').val() || "1", 10),
						"i_sEventcd"		: $("input[name='i_sEventcd']",frm).val(),
						"i_sFlagAction"		: "",
						"i_sFlagMobileOpen" : "Y",
						"i_sFlagTab" : $("input[name='i_sFlagTab']",frm).val(),
						pageStack : [],
						i_arrCategorycd :[],

				};
				return parameter;

			},


			//신청서 등록
			application : function(flag){
				$("input[name='i_sActionFlag']").val(flag);
					if(MobileEventBeauty2.fn.fnValidate()){
						if(COUNT == 0){
							MobileCommon.ajax({
								url: "/mobile/event/mobile_event_beauty_save_ajax.do",
								type : "post",
								dataType:"json",
								data:$("form[name='frm']").serialize(),
								animation : false,
								success :function(data, textStatus){

									if("succ" == data.status){
										showMessageBox({
											message : data.message
											, close : function() {
												location.href = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_list.do";
											}
										});
									}else if("isNotLogin" == data.status){

										showMessageBox({
											message : data.message
											, close : function() {
												var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
												MobileBodyStart.goLogin(returnUrl);
											}
										});
									}else if("fail" == data.status){
										if(data.object =="nickerror"){
											showConfirmBox({
												message : "뷰티테스터에 등록하기 위해서는 닉네임이 필요해요.<br/>닉네임페이지로 이동하시겠어요?"
												, ok_func : function() {
													location.href = GLOBAL_WEB_URL +"mobile/mbr/mobile_mbr_nickname_reg.do";
												}
												, cancel_func : function() {
													return ;
												}
											});	
											
										}else{
											showMessageBox({
												message : data.message
												, close : function() {
													location.href =  "/mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
												}
											});	
										}
									}else {
										showMessageBox({
											message : data.message
										});
									}
								}

							});
						}else{
							COUNT = 0;
						}
					}
				
			},


			//신청하기
			MobileBeautyAform : function (i_iNowPageNo) {

				MobileCommon.ajax({
					url			: "/mobile/event/mobile_event_beauty_view_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y"
							, "i_sFlagTab" : $("input[name='i_sFlagTab']").val() 
							, "i_sEventcd"   : $("input[name='i_sEventcd']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {
							console.log(data);
							MobileEventBeauty2.fn.changeDeliveryChoose();
						} else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else if("fail" == data.status){
							showMessageBox({
								message : data.message
								, close : function() {
									location.href =  GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
								}
							});
						}
						else {
							showMessageBox({
								message : data.message
							});
						}
						var lvlist = data.object.lvlist; //이벤트 참여가능한 레벨
						var lvbox =[];
						for(var i=0; i<lvlist.length; i++){
							lvbox = lvbox +"“"+lvlist[i].v_ap_level + "” ";
						}
						$(".ap_lv").text(lvbox);
						
						var i_sPageTitle = data.object.i_sPageTitle;
						var i_sDesc = data.object.i_sDesc;
						var i_sLink = data.object.i_sLink;
						var i_sImgPath = data.object.i_sImgPath;
						
						$("#i_sPageTitle").val(i_sPageTitle);
						$("#i_sDesc").val(i_sDesc);
						$("#i_sLink").val(i_sLink);
						$("#i_sImgPath").val(i_sImgPath);
						//신청
						var sns = data.object.sns;
						$("meta[property='og:title']").attr("content",sns.SnsTitle);
						$("meta[property='og:url']").attr("content",sns.SnsUrl);
						$("meta[property='og:description']").attr("content",sns.SnsDesc);
						$("meta[property='og:image']").attr("content",sns.SnsImage);
						$("meta[property='og:type']").attr("content",sns.SnsType);

						var prdlist = data.object.prdlist;
						var item = "";
						var content = "";
						var blogurl = "";
						var productcd = "";
						var optioncd = "";
						var AppProd = data.object.App;

						if(AppProd != undefined && AppProd.v_comment != undefined) {
							item = AppProd.v_productnm;
							content = AppProd.v_comment;
							blogurl = AppProd.v_blog_url;
							productcd = AppProd.v_productcd;
							optioncd = AppProd.v_optioncd;

							$(".i_sContents").val(content);
							$(".p_byte>em").text(content.length);
							$(".i_sBlogUrl").val(blogurl);
						}

						var itemHtml = [];
						var selected = "";
						var optionnm = "";
						itemHtml.push("<option value='sel'>선택</option>");
						for(var i=0; i<prdlist.length; i++) {
							var optioncd = prdlist[i].v_optioncd;
							if(optioncd != "111170344" && optioncd != "111380181" && optioncd != "111380182" && optioncd != "111380183" && optioncd != "111380184"){
								if(prdlist[i].v_productcd == "P00005040"){
									if(optioncd == "111170377" || optioncd == "111170378"){
										if(parseInt(prdlist[i].n_option_cnt) > 1) { //옵션상품 개수
											optionnm = "-" + prdlist[i].v_optionnm;
										} else {
											optionnm = "";
										}

										if(prdlist[i].v_productcd == productcd && prdlist[i].v_optioncd == optioncd) {
											selected = "selected=\"selected\"";
										} else {
											selected = "";
										}
										itemHtml.push("<option value='"+prdlist[i].v_productcd+"/"+prdlist[i].v_optioncd+"' "+selected+">"+prdlist[i].v_productnm+optionnm+"</option>");
									}
								}else{
									if(parseInt(prdlist[i].n_option_cnt) > 1) { //옵션상품 개수
										optionnm = "-" + prdlist[i].v_optionnm;
									} else {
										optionnm = "";
									}

									if(prdlist[i].v_productcd == productcd && prdlist[i].v_optioncd == optioncd) {
										selected = "selected=\"selected\"";
									} else {
										selected = "";
									}
									itemHtml.push("<option value='"+prdlist[i].v_productcd+"/"+prdlist[i].v_optioncd+"' "+selected+">"+prdlist[i].v_productnm+optionnm+"</option>");
								}
								
							}
						}
						$("#i_sSelItem").html(itemHtml.join(""));

						//신청사연
						var ap_cnt = data.object.ap_cnt;
						var arrAP=[];
						arrAP.push("신청자 <span class='count'>"+ap_cnt+"</span>");
						$("#count_ap").html(arrAP.join(""));
						var review_cnt = data.object.reviewCnt;
						var rvHtml = [];
						rvHtml.push("리뷰 <span class='count'>"+review_cnt+"</span>");
						$("#count_review").html(rvHtml.join(""));
						var bi = data.object.brandbi;
						var eventInfo = data.object.eventInfo;
						var flagstep = data.object.i_sFlagStep;

						var miss_con = eventInfo.v_evt_mission;
						var missHtml =[];
						missHtml.push("<p class='tit'><em>"+miss_con+"</em></p>");
						$(".missionArea>.txt").html(missHtml.join(""));
						var arrHtml1=[];	
						arrHtml1.push("     <p class=ttl'>"+eventInfo.v_eventnm+"</p>");     
						if(eventInfo.v_evt_comment != undefined && eventInfo.v_evt_comment != 'undefined'){
							arrHtml1.push("     <P class='txt'>"+eventInfo.v_evt_comment+"</P>");
						}
						arrHtml1.push("      <p class='tester'>테스터 모집 인원 : <em>"+eventInfo.n_win_user_cnt+"명</em></p>");
						arrHtml1.push("       <p class='date'>"+changeDatePatten(eventInfo.v_event_st_dt)+" ~ "+changeDatePatten(eventInfo.v_event_en_dt)+"</p>");
						arrHtml1.push("      <p class='brand'><a href='#' id ='" + bi.v_brandcd + ";" + bi.v_flag_app_open + "'class='btn_brand'><img src='"+bi.v_brand_logo+"' alt='' /></a></p>");
						$(".recruit").html(arrHtml1.join(""));
						var cur_date = changeDatePatten(data.object.CurTime);
						var issue_date=changeDatePatten(eventInfo.v_issue_dt);
						var eventst = changeDatePatten(eventInfo.v_event_st_dt);
						var eventen= changeDatePatten(eventInfo.v_event_en_dt);
						var reviewst = changeDatePatten(eventInfo.v_review_st_dt);
						var reviewen = changeDatePatten(eventInfo.v_review_en_dt);
						var topReview= changeDatePatten(eventInfo.v_top_review_dt);
						if(cur_date > reviewen){
							$(".missArea").remove();// 리뷰등록기간이 끝나면 미션창 지움
						} 

						if(cur_date >= issue_date){
							$(".testWin").show();//테스터 발표확인
						}else{
							$(".testWin").hide();
						}
						var arrHtml2 = [];
						arrHtml2.push(" <input type='hidden' name='i_sFlagStep' value='"+flagstep+"'/>");
						arrHtml2.push(" <ul>");
						arrHtml2.push(" 	<li class='p_tab1 active'>");
						arrHtml2.push("         <p class='ttl'>참가신청</p>");
						arrHtml2.push("         <p class='date'>"+eventst.substring(5, eventst.length)+"~"+eventen.substring(5, eventen.length)+"</p>");
						arrHtml2.push("     </li>");
						arrHtml2.push("     <li class='p_tab2'>");
						arrHtml2.push("         <p class='ttl'>테스터 발표</p>");
						arrHtml2.push("         <p class='date'>"+issue_date.substring(5, issue_date.length)+"</p>");
						arrHtml2.push("     </li>");
						arrHtml2.push("     <li class='p_tab3'>");
						arrHtml2.push("         <p class='ttl'>리뷰등록</p>");
						arrHtml2.push("         <p class='date'>"+reviewst.substring(5, reviewst.length)+"~"+reviewen.substring(5, reviewen.length)+"</p>");
						arrHtml2.push("     </li>");
						arrHtml2.push("     <li class='p_tab4'>");
						arrHtml2.push("         <p class='ttl'>TOP리뷰발표</p>");
						arrHtml2.push("			<p class='date'>"+topReview.substring(5, topReview.length)+"</p>");
						arrHtml2.push("			<input type='hidden' name='top_time' value='"+eventInfo.v_top_review_dt+"'>");
						arrHtml2.push("		</li>");
						arrHtml2.push(" 	</ul>");
						$(".testStep").html(arrHtml2.join(""));
						//var picHtml =[];
						//picHtml.push(""+eventInfo.v_clob+"");
						$(".picView").html(eventInfo.v_mobile_contents);
						//$(".banner .img").html(picHtml.join(""));
						
						//신청서
						var UserInfo = data.object.UserInfo;

						if(UserInfo != undefined){

							var phone=UserInfo.v_phone;
							var mobile=UserInfo.v_mobile;

							var tel1 = phone.split("-")[0];
							var tel2 = phone.split("-")[1];
							var tel3 = phone.split("-")[2];

							var mobile1 = mobile.split("-")[0];
							var mobile2 = mobile.split("-")[1];
							var mobile3 = mobile.split("-")[2];

							$("#i_sSelAdd").val(""); //배송지명 초기화
							$("#i_sUsernm").val(UserInfo.v_usernm);
							$("#i_sTele1").val(tel1);
							$("#i_sTele2").val(tel2);
							$("#i_sTele3").val(tel2);

							$("#i_sPhone1").val(mobile1);
							$("#i_sPhone2").val(mobile2);
							$("#i_sPhone3").val(mobile3);

							$("#i_sPost1").val(UserInfo.v_zip1);
							$("#i_sPost2").val(UserInfo.v_zip2);

							$("#i_sAddress1").val(UserInfo.v_addr1);
							$("#i_sAddress2").val(UserInfo.v_addr2);
							$("#i_sEmail").val(UserInfo.v_email);


							$(".add").hide();
							$(".modi").show();

						}else{
							$(".add").show();
							$(".modi").hide();
						}
						MobileEventBeauty2.fn.addBtnEvent();
						MobileEventBeauty2.fn.getStepInfo(data.object.i_sFlagStep);

					}
				});
			},

			getStepInfo : function(i_sFlagStep) {
				if(i_sFlagStep =="1"){
					
					$(".tab_cate").removeClass("active");
					$("#aform").addClass("active");
					$(".tab_cont").eq(0).show();
				
					$(".p_tab1").addClass("active");   //테스트단계
				}else if(i_sFlagStep == "2" || i_sFlagStep =="4"){

					$("input[name='i_sFlagTab']").val("applicant");
					MobileEventBeauty2.fn.MobileBeautyApplicant(1);
					$("select", ".applicationFrom").prop("disabled", true);  //배송지정보 disalbed
					$("input", ".applicationFrom").prop("disabled", true);	
					$("textarea", ".applicationFrom").prop("disabled", true);
					$("#btn_delivery_add").remove();
					$(".selectAdd").remove();

					$(".add").remove();	//신청버튼 제거
					$(".modi").remove(); 
					$(".tab_cate").removeClass("active");
					$("#applicant").addClass("active");
					$(".tab_cont").eq(1).show();

					$(".p_tab1").addClass("active");   //테스트단계
					$(".p_tab2").addClass("active");
				}else if(i_sFlagStep == "3"){
					$("input[name='i_sFlagTab']").val("review");
					MobileEventBeauty2.fn.MobileBeautyReview(1);
					$(".aform_btn").removeAttr('href');
					$("select", ".applicationFrom").prop("disabled", true);
					$("input", ".applicationFrom").prop("disabled", true);
					$("textarea", ".applicationFrom").prop("disabled", true);
					$("#btn_delivery_add").remove();
					$(".selectAdd").remove();
					$(".add").remove();
					$(".modi").remove();
					$(".tab_cate").removeClass("active");
					$("#review").addClass("active");
					$(".tab_cont").eq(2).show();

					$(".p_tab1").addClass("active"); 
					$(".p_tab2").addClass("active");
					$(".p_tab3").addClass("active");
					var t_time = $("input[name='top_time']").val();
					var i_sTime = $("input[name='i_sTime']").val();
					if(t_time == i_sTime){
						$(".p_tab4").addClass("active");
					}
				}

			},
			MobileBeautyApplicant : function(i_iNowPageNo){

				var parameter = MobileEventBeauty2.fn.getParameter();
				var frm = $("form[name='frm']");

				parameter.i_iNowPageNo = i_iNowPageNo;
				MobileCommon.ajax({
					url  : "/mobile/event/mobile_event_beauty_tab_ajax.do",
					type : "post",
					data : parameter,
					dataType :"json",
					animation : false,	

					success : function(data,textStatus){

						if("succ" == data.status){

							console.log(data);
						}else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else if("fail" == data.status){


							showMessageBox({
								message : data.message
								, close : function() {
									location.href =  GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do";
								}
							});
						}
						else {
							showMessageBox({
								message : data.message
							});
						}

						var obj2= data.object.applicant;
						var cTime = $("input[name='i_sTime']").val();
						if(obj2 != undefined && obj2 !=""){
							var page= data.object.page2;
							var length2= obj2.length;
							var arrL2=[];
							for(var i=0; i<length2; i++){
								//신청자 리스트보여주기
								var row=obj2[i];	
								var level = row.v_levelcd;
								if(level != undefined){
									level = "m"+level.substr(3,2);
								}else{
									level = "m1";
								}
								var cmt_level = row.v_cmt_levelcd;
								
								if(cmt_level != undefined){
									cmt_level = "c"+cmt_level.substr(6,7);
								}else{
									cmt_level = "c1";
								}
								arrL2.push("<div class='reviewBox'>");
								if(row.v_flag_win == "Y"){
									arrL2.push("<span class='ico_tester'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/ico_tester.png' alt='테스터선정'></span>");
								}
								arrL2.push("<div class='userInfoArea'>");
								arrL2.push(" <div class=\"photoZ\"><img src='"+row.v_user_img+"' alt=\"\" onerror=\"fnNoImageUser(this);\"></div>");
								arrL2.push("	<div class='userInfoZ'>");
								arrL2.push("   		<div class='name'>");
								arrL2.push("  			  <p>");
								if(row.v_nickname != undefined){
									arrL2.push("    		     <span class='nm'>"+row.v_nickname+"</span>");
								}else{
									arrL2.push("    		     <span class='nm'>"+getStringReverseHidden(row.v_userid, 3)+"</span>");
								}
								//뷰티프로파일 있는지 카운트
								if(row.n_bpcnt > 0){
									arrL2.push("       			 <a href='#' id='"+row.v_userid+"' class='btn_beautyProfile'><img src='"+GLOBAL_IMG_URL+"common/ico_beautyProfile.png'></a>");
								}
								arrL2.push("  			  </p>");
								arrL2.push("    	</div>");
								arrL2.push("    <div class='gradeZone'>");
								arrL2.push("         <span class='ico_memberLevel "+level+"'>"+row.v_levelnm+"</span>");
								arrL2.push("         <span class='ico_communityLevel "+cmt_level+"'>"+row.v_cmt_levelnm+"</span>");
								arrL2.push("	</div>");
								arrL2.push("</div>");
								arrL2.push("</div>");
								arrL2.push("<p class='cont'>"+row.v_comment+"</p>");
								var userblog = row.v_blog_url;
								var http = "";
								if(userblog != null){
									http = userblog.substring(0, 4);
									if(http.indexOf("http") == -1){
										userblog = "http://"+userblog;
									}
								} else{
									userblog = "";
								}
								arrL2.push("<p class='blogAddress'>블로그 : <a href='"+userblog+"' target='_blank'>"+userblog+"</a></p>");
								arrL2.push("<p class='testerNm'>"+row.v_productnm+" ㅡ "+row.v_optionnm+"  신청</p>");
								arrL2.push("<p class='date'>"+changeBeforeDate(row.v_reg_dtm)+"</p>");
								/*arrL2.push("	<div class='socialLink'>");

								if(row.v_fb_token != "" && row.v_fb_token != undefined){
									arrL2.push("    	<span class='s_facebook on'><a href='#'><em class='hide'>facebook</em></a></span>");
								}

								if(row.v_tw_token != "" && row.v_tw_token != undefined){

									arrL2.push("    	<span class='s_twitter on'><a href='#'><em class='hide'>twitter</em></a></span>");
								}
								arrL2.push("   </div>");*/
								arrL2.push("</div>");
								arrL2.push("</div>");

							}
							if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)){
								$("#more_btn").hide();
							}else{
								$("#more_btn").show();
							}
							if(1 == parseInt(page.i_iNowPageNo)){
								$(".t_applicant").html(arrL2.join(""));
								$(".tab_cont").eq(1).show();

							}else{
								$(".t_applicant").append(arrL2.join(""));
								$(".tab_cont").eq(1).show();
							}
							MobileEventBeauty2.fn.addBtnEvent();



						}//신청자유무
						else{
							$("#more_btn").hide();
							var arrResult=[];

							arrResult.push("<div class=\"nodata\">");
							arrResult.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrResult.push("</div>");
							$(".t_applicant").html(arrResult.join(""));
						}
						MobileEventBeauty2.fn.addBtnEvent();

					}
				});
			},	

			//리뷰
			MobileBeautyReview : function(i_iNowPageNo){

				var parameter = MobileEventBeauty2.fn.getParameter();
				var frm = $("form[name='frm']");
				parameter.i_iNowPageNo = i_iNowPageNo;
				MobileCommon.ajax({
					url  : GLOBAL_WEB_ROOT +"mobile/event/mobile_event_beauty_tab_ajax.do",
					type : "post",
					data : parameter,
					dataType :"json",
					animation : false,	

					success : function(data,textStatus){
						if("succ" == data.status){
							console.log(data);
						}else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do?i_sEventcd="+$("input[name='i_sEventcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else if("fail" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									location.href =  GLOBAL_WEB_URL+"mobile/event/mobile_event_beauty_view.do";
								}
							});
						}
						else {
							showMessageBox({
								message : data.message
							});
						}

						var flag = data.object.wFlag;// 뷰티테스터선정유무
						var ctime = $("input[name='i_sTime']").val();
						var ctime2 = ctime.substring(4, ctime.length);
						var review_st_dt = $(".p_tab3 .date").text().split("~")[0];
						var review_en_dt = $(".p_tab3 .date").text().split("~")[1];
						var top_dtm = $(".p_tab4 .date").text();
						var rst = fnReplaceCharAll(review_st_dt,".",""); 
						var ren = fnReplaceCharAll(review_en_dt,".","");
						var tdtm = fnReplaceCharAll(top_dtm,".",""); 
						if(flag > 0){ //V_FLAG_WIN = Y 여부
							var Mcount = data.object.Mcount; // 리뷰테이블에서 해당이벤트 리뷰를 작성했는지 
							if(Mcount == 0){
								if( ctime2 >= rst && ctime2 <=ren){ //리뷰등록 기간에만 나옴
									var arrLmiss = [];
									arrLmiss.push("<div class='misssionBefore' >");
									arrLmiss.push("		<P class='ttl'>뷰티테스터 미션을 아직 수행하지 않으셨습니다.</P>");
									arrLmiss.push("		<p class='txt'><em>등록 마감일까지 반드시 미션등록</em>해주세요. <br />그렇지 않으면 차후 뷰티테스터에 선정되지 못합니다.</p>");
									arrLmiss.push("		<div class='btnArea2'>");
									arrLmiss.push("			<span class='btn_ty'><a href='#none' class='miss_btn'>미션등록</a></span>");
									arrLmiss.push("		</div>");
									arrLmiss.push("</div>");
									$(".missArea").html(arrLmiss.join(""));
									MobileEventBeauty2.fn.addBtnEvent();
								}
							}
						}
						//리뷰 리스트
						var arrL3= [];
						var review=data.object.review;
						if(review != undefined){
							var list = data.object.review.list;
							var imglist = data.object.review.imglist;
							var page2 = data.object.review.page;
							var prodlist = data.object.review.product;
							if(list != undefined){
								for(var i = 0; i < list.length; i++){
									//if(list.v_rv_typecd != undefined){
									var rvlist = list[i];
									var clob = rvlist.v_clob;
									if(clob == undefined){
										clob = "내용이 없습니다.";
									} else {
										clob = clob.replace(/\[image#(.*?)\]/g, "");
										clob = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
										clob = getByteString(clob, 100);
									}
									var level = rvlist.v_user_level;
									if(level != undefined){
										level = "m"+level.substr(3,1);
									}else{
										level = "m1";
									}
									var cmt_level = rvlist.v_user_cmt_level;
									if(cmt_level != undefined){
										cmt_level = "c"+cmt_level.substr(6,7);
									}else{
										cmt_level = "c1";
									}
									var date = rvlist.v_reg_dtm;
									var vote = rvlist.n_vote;
									if(vote==undefined){
										vote=0;
									}
									var cDate = changeBeforeDate(date);
									arrL3.push("<div class='photoReviewBox'>");
									arrL3.push("<div class='userInfoArea'>");
									arrL3.push("	<div class='photoZ'><img src='"+rvlist.v_user_img+"' onerror=\"fnNoImageUser(this);\" alt=''></div>");
									arrL3.push("	<div class='userInfoZ'>");
									arrL3.push("   		<div class='name'>");
									arrL3.push("  			  <p>");
									if(rvlist.v_nickname != undefined){
										arrL3.push("    		     <span class='nm'>"+rvlist.v_nickname+"</span>");
									}else{
										arrL3.push("    		     <span class='nm'>"+getStringReverseHidden(rvlist.v_usernm, 1)+"</span>");
									}
									//뷰티프로파일 있는지 카운트
									if(rvlist.n_bpcnt > 0){
										arrL3.push("       			 <a href='#' id='"+rvlist.v_userid+"' class='btn_beautyProfile'><img src='"+GLOBAL_IMG_URL+"common/ico_beautyProfile.png' alt='뷰티프로파일'></a>");
									}
									arrL3.push("  			  </p>");
									arrL3.push("    	</div>");
									arrL3.push("    <div class='gradeZone'>");
									arrL3.push("         <span class='ico_memberLevel "+level+"'></span>");
									arrL3.push("         <span class='ico_communityLevel "+cmt_level+"'></span>");
									arrL3.push("	</div>");
									arrL3.push("  </div>");
									arrL3.push("</div>");
									if(rvlist.v_flag_best =="Y"){
										arrL3.push("	<div class='bestArea'>");
										arrL3.push("		<span class='ico_best'>best</span>");
										arrL3.push("	</div>");
									}
									arrL3.push("	<p class='subject'><a href='#' id='"+rvlist.v_reviewcd+"' class='btn_Detail'>");
									if(rvlist.v_flag_top_reviewer == "Y"){
										arrL3.push(" <span class='ico_topReview'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/ico_topReview.png' alt='TOP리뷰'></span>");
									}
									arrL3.push(rvlist.v_title+"</a>");
									if(rvlist.v_reg_channel == "MOBILE" || rvlist.v_reg_channel == "APP"){
										arrL3.push("	<span class=\"sp_ico i1\" style=\"float:left;\">모바일</span>");
									}
									arrL3.push("</p>");
									arrL3.push(" 	<p class='cont'><a href='#' id='"+rvlist.v_reviewcd+"' class='btn_Detail'>"+clob+"</a></p>");
									arrL3.push("	<div class='photoZone'>");
									arrL3.push(" 		<ul>");
									if(imglist != undefined && imglist.length > 0) {
										var cnt = 0;

										for(var j=0; j<imglist.length; j++) {
											if(imglist[j].v_recordid == rvlist.v_reviewcd) {
												++cnt;
												if(cnt <= 4) {
													if(parseInt(rvlist.n_photo_cnt) > 4 && cnt == 4) {
														arrL3.push("			<li>");
														arrL3.push("				<div class=\"moreCountZone\">");
														arrL3.push("					<img src=\""+imglist[j].v_image_path+"\" alt=\"\" />");
														arrL3.push("					<span class=\"moreCount\">"+parseInt(rvlist.n_photo_cnt-4)+"</span> ");
														arrL3.push("				</div>");
														arrL3.push("			</li>");
													} else {
														arrL3.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" /></li>");
													}
												}
											}
										}
									}
									arrL3.push("		</ul>");
									arrL3.push("	</div>");
									arrL3.push("	<div class='info'>");
									arrL3.push("		<div class='countBundle'>");
									arrL3.push("			<a href='#' class='btn_prodview btn_review_prod' id=\""+rvlist.v_reviewcd+"\"><span>리뷰상품 보기</span></a>");
									arrL3.push("			<span class='ico_comment'><span class='hide'>댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
									arrL3.push("			<span class='ico_like'><span class='hide'>추천</span><em>"+vote+"</em></span> ");
									arrL3.push("		</div>");
									arrL3.push(" 		<p class='date'>"+changeBeforeDate(rvlist.v_reg_dtm)+"</p>");
									arrL3.push("	</div>");

									var imageUrl = "";
									if(imglist != undefined && imglist.length > 0){
										for(var j = 0; j<imglist.length; j++){
											if(imglist[j].v_recordid == rvlist.v_reviewcd){
												imageUrl = imglist[j].v_image_path.replace("_100","");
											}
										}
									}

									if(prodlist != undefined && prodlist.length>0){

										arrL3.push("	<span class=\"hide span_review\" id=\"p"+rvlist.v_reviewcd+"\">");
										var len = prodlist.length;
										for(var k = 0; k<len; k++){
											if(prodlist[k].v_reviewcd == rvlist.v_reviewcd){
												arrL3.push("			<span class=\"span_reviewProd\">");
												// var levelcd = $("#i_sLevelcd").val();
												// var price = productPrice.fn.setProductPrice(prodlist[k], levelcd);

												arrL3.push("				<span class=\"span_productcd\">"+prodlist[k].v_productcd+"</span>");
												arrL3.push("				<span class=\"span_productnm\">"+prodlist[k].v_productnm+"</span>");
												arrL3.push("				<span class=\"span_optioncd\">"+prodlist[k].v_optioncd+"</span>");
												arrL3.push("				<span class=\"span_optioncnt\">"+prodlist[k].n_option_cnt+"</span>");
												arrL3.push("				<span class=\"span_optionnm\">"+prodlist[k].v_optionnm+"</span>");
												arrL3.push("				<span class=\"span_brandnm\">"+prodlist[k].v_brandnm+"</span>");
												arrL3.push("				<span class=\"span_imgpath\">"+prodlist[k].v_img_web_path+"</span>");
												arrL3.push("				<span class=\"span_price\">"+SetNumComma(prodlist[k].n_list_price)+"</span>");
												arrL3.push("				<span class=\"span_saleprice\">"+SetNumComma(prodlist[k].n_price)+"</span>");
												arrL3.push("				<span class=\"span_point\">1</span>");
												arrL3.push("				<span class=\"span_commentcnt\">18</span>");
												arrL3.push("				<span class=\"span_stockqty\">"+prodlist[k].n_stockqty+"</span>");
												arrL3.push("				<span class=\"span_statuscd\">"+prodlist[k].v_statuscd+"</span>");
												arrL3.push("			</span>");
											}
										}
										arrL3.push("	</span>");
										arrL3.push(" <input type=\"hidden\" class= \"hide prodCount\" value=\""+len+"\"/>");
									}


									arrL3.push("</div>");
									arrL3.push("</div>");

								}	
							}
							if(page2.i_iNowPageNo >= page2.i_iTotalPageCnt){
								$("#more_btn2").hide();
							}else{
								$("#more_btn2").show();
							}
							if(1 == page2.i_iNowPageNo){
								$(".t_review").html(arrL3.join(""));
								$(".tab_cont").eq(2).show();

							}else{
								$(".t_review").append(arrL3.join(""));
								$(".tab_cont").eq(2).show();
								//	}
							}
							MobileEventBeauty2.fn.addBtnEvent();
							MobileEventBeauty2.fn.addPopupBtnEvent();
						}else{
							$("#more_btn2").hide();
							var NodHtml =[];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							NodHtml.push("</div>");
							$(".t_review").html(NodHtml.join(""));

						}
						MobileEventBeauty2.fn.addBtnEvent();
						MobileEventBeauty2.fn.addPopupBtnEvent();
					}
				});
			},
			addPopupBtnEvent : function(){

				$(".btn_review_prod").unbind("click").click(function(event){
					event.preventDefault();
					var id = $(this).attr("id");
					var arrHtml = [];

					$(".span_reviewProd", "#p"+id).each(function(){
						var idx = $(".span_reviewProd").index($(this));
						var prodinfo = $(".span_reviewProd").eq(idx);
						var productcd = $(".span_productcd", prodinfo).text();
						var productnm = $(".span_productnm", prodinfo).text();
						var optionnm = $(".span_optionnm", prodinfo).text();
						var brandnm = $(".span_brandnm", prodinfo).text();
						var price = $(".span_price", prodinfo).text();
						var saleprice = $(".span_saleprice", prodinfo).text();
						var point = $(".span_point", prodinfo).text();
						var optioncd = $(".span_optioncd", prodinfo).text();
						var commentcnt = $(".span_commentcnt", prodinfo).text();
						var statuscd = $(".span_statuscd", prodinfo).text();
						var stockqty = parseInt($(".span_stockqty", prodinfo).text());
						var imgpath = $(".span_imgpath", prodinfo).text();
						var optioncnt = parseInt($(".span_optioncnt", prodinfo).text());

						arrHtml.push("<li>");
						arrHtml.push("	<a href=\"#\" class=\"btn_prod_detail\" id=\""+productcd+"\">");
						arrHtml.push("		<div class=\"prodImg\">");
						arrHtml.push("			<img src = \""+imgpath+"\" alt =\""+productnm+"\">");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class=\"detail\">");
						arrHtml.push("			<p class=\"brandNm\">"+brandnm+"</p>");
						arrHtml.push("			<p class=\"prodNm\">"+productnm+"</p>");

						if(optioncnt > 1){
							arrHtml.push("			<p class=\"option\">"+optionnm+"</p>");
						}
						arrHtml.push("			<p class=\"priceZone\">");

						if(price != saleprice){
							arrHtml.push("				<span class=\"sale\"><em>"+SetNumComma(price)+"</em>원</span>");
						}

						arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(saleprice)+"</em>원</span>");
						arrHtml.push("			</p>");
						arrHtml.push("		</div>");
						arrHtml.push("	</a>");
						arrHtml.push("</li>");

					});
					$(".div_prodList>ul").html(arrHtml.join(""));
					modalPopup("#modalPopupReviewProd");
					MobileEventBeauty2.fn.addPopupBtnEvent();								
				});

				$(".btn_prod_detail").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goProductDetail($(this).attr("id"));
//					var url = GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//					$("form[name='frm']").attr("action", url).submit();
				});
			},


			//테스터 발표 확인
			winnerTester : function(i_sEventcd){
				MobileCommon.ajax({
					url: GLOBAL_WEB_ROOT + "mobile/event/mobile_event_beauty_winner_ajax.do",
					type : "post",
					dataType:"json",
					data:{ "i_sEventcd" : i_sEventcd},
					animation : false,
					success :function(data, textStatus){
						if("succ" == data.status){
							console.log(data);
						}else{
							console.log(data.message);
						}
						var winner= data.object.winner;
						var length4 = winner.length;
						var arrL4=[];
						if(length4 !=undefined && length4 > 0 ){

							for(var i=0; i<length4; i++){
								var row=winner[i];
									var level = row.v_levelcd;
									if(level != undefined){
										level = "m"+level.substr(3,2);
									}else{
										level = "m1";
									}
									var cmt_level = row.v_cmt_levelcd;
									if(cmt_level != undefined){
										cmt_level = "c"+cmt_level.substr(6,7);
									}else{
										cmt_level = "c1";
									}
									arrL4.push("<li>");
									arrL4.push("	<div class='userInfoArea'>");
									arrL4.push("		<div class='photoZ'><img src='"+row.v_user_img+"' onerror='fnNoImageUser(this);' alt=''></div>");
									arrL4.push("			<div class='userInfoZ'>");
									arrL4.push("				<div class='name'>");
									arrL4.push("					<p>");
									if(row.v_nickname != undefined){
										arrL4.push("					<span class='nm'>"+row.v_nickname+"</span>");
									}else{
										arrL4.push("					<span class='nm'>"+getStringReverseHidden(row.v_userid, 3)+"</span>");
									}
									if(row.n_bpcnt > 0){
										arrL4.push("       			 	<a href='#' id='"+row.v_userid+"' class='btn_beautyProfile'><img src='"+GLOBAL_IMG_URL+"common/ico_beautyProfile.png' alt='뷰티프로파일'></a>");
									}
									arrL4.push("					</p>");
									arrL4.push("				</div>");
									arrL4.push("				<div class='gradeZone'>");
									arrL4.push("						<span class='ico_memberLevel "+level+"'>"+row.v_cmt_levelnm+"</span>");
									arrL4.push("						<span class='ico_communityLevel "+cmt_level+"'>"+row.v_levelnm+"</span>");
									arrL4.push("				</div>");
									arrL4.push("			</div>");
									arrL4.push("	</div>");
									arrL4.push("</li>");

							}
							$(".winner>ul").html(arrL4.join(""));
						}else{

							var arrResult=[];
							arrResult.push("<div class=\"nodata\">");
							arrResult.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrResult.push("</div>");
							$(".winner>ul").html(arrResult.join(""));
						}
						MobileEventBeauty2.fn.addBtnEvent();

					}
				});
			},
			// 해당 이벤트에 참가할 수 있는 레벨인지 체크
			checkUserLevel : function(flag){
				
				var i_sEventcd = $("input[name='i_sEventcd']").val();
				cmAjax({
					url		: GLOBAL_WEB_ROOT + "event/event_beautytester_applicant_level_ajax.do",
					type	: "post",
					dataType : "json",
					data	: { i_sEventcd :i_sEventcd },
					success : function(data, textStatus){
						if(data.status == 'succ'){
							COUNT--;
							MobileEventBeauty2.fn.application(flag);
							
						}//succ 
						else if(data.status == 'fail'){
							/*var lv = data.object;
							lv = lv.replace("회원", "");
							lv = lv.replace("CZ_L001", "쌩얼");
							lv = lv.replace("CZ_L002", "누디");
							lv = lv.replace("CZ_L003", "스모키");
							lv = lv.replace("CZ_L004", "아티스트");
							lv = lv.replace("CZ_L005", "강등");
							var text = lv+" 등급은 본 이벤트에 참여하실 수 없습니다.";*/
							showMessageBox({
								message : "신청가능하신 등급이 아니에요."
							});
						} else{
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			}


		}//fn
};//MobileHotsaleClubAp


