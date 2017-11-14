/**
 * 모바일 출석체크 화면의 이벤트 처리를 위한 Javascript
 */
var attendbrandisroller = 0,
offset = 0;
var winW = $(window).width();
var $aw = 0;
var arrbrandcd = [];
var finish = false;
var coupon = false;

var	MobileAttendCheck = {
		name : "MobileAttendCheck",

		init : function() {
			$('.btn_back').attr('href', GLOBAL_WEB_URL+'mobile/main.do');
			MobileAttendCheck.fn.setSubMenuChange();
			MobileAttendCheck.fn.addBtnEvent();
			MobileAttendCheck.fn.getPageInit("N" , "");
		},

		fn : {
			attendrate : function(num){
				//var num = '10%';
				var $current = $(".current");
				$current.css("width",0).delay(450).stop().animate({
					"width" : num+"%"
				}, 350);
			},
			fn_DayOfMonth : function(year,month){
				return 32 - new Date(year,month-1,32).getDate();
			},
			
			addBtnEvent : function(){
				
				$(".go_brand_prd_list").unbind("click").click(function(event){
					event.preventDefault();
					if($(this).attr("href")=="javascript:;"){
						showMessageBox({
							message:"아직 브랜드 TODAY쿠폰을 받지 않으셨어요!<br/>브랜드카드를 뽑아 브랜드 TODAY쿠폰을 받아주세요!"
						});
					}else{
						if(GLOBAL_FLAG_APP_NEW == "Y") {
							try {
								var brand		= $(this).attr("id").split(";")[0];
								var flagAppOpen	= $(this).attr("id").split(";")[1];
								if(flagAppOpen == "Y") {
									if(GLOBAL_MOBILE_OS == "AND") {
										window.Android.gotoBrandPage(brand)
									}
									else {
										window.webkit.messageHandlers.gotoBrandPage.postMessage(brand);
									}
								}
							} catch(e) {
							}
						}
						else {
							location.href=$(this).attr("href");
						}
					}
//					showMessageBox({
//						message : "1"
//					});
				});
				$(".btn_login").unbind("click").click(function(){
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message:"해당서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
							ok_func:function(){
//								var returnurl = GLOBAL_WEB_URL+"mobile/event/mobile_event_attend_check.do";
								MobileBodyStart.goLoginPage();
							}, cancel_func: function(){
									return ;
								}
						});
					}else{
//						var returnurl = GLOBAL_WEB_URL+"mobile/event/mobile_event_attend_check.do";
//						MobileBodyStart.goLogin(returnurl);
						MobileBodyStart.goLoginPage();
					}
					
				});
				$(".btn_delivery").unbind("click").click(function(event){
					event.preventDefault();
					MobileAttendCheck.fn.giveCoupon("CY");
				});
				 $(".btn_delivery_pass").unbind("click").click(function(event){
					event.preventDefault();
					MobileAttendCheck.fn.giveCoupon("CN");
				 });
				 $(".btn_lucky").unbind("click").click(function(event){
					 event.preventDefault();
					 MobileAttendCheck.fn.giveCoupon("LY");
				 });
				 $(".btn_lucky_pass").unbind("click").click(function(event){
					 event.preventDefault();
					 MobileAttendCheck.fn.giveCoupon("LN");
				 });
				 
				 $(".btn_lastmonth").unbind("click").click(function(event){
						event.preventDefault();
						if(!IS_LOGIN){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
									ok_func:function(){
										MobileBodyStart.goLoginPage();
//										document.frm_login.submit();
									}, cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
									ok_func:function(){
										MobileBodyStart.goLoginPage();
//										document.frm_login.submit();
									}
								});
							}
						}else{
							MobileAttendCheck.fn.goLastMonth("L");
							$(".btn_month").show();
						}
					 });
				 
				 $(".btn_month").unbind("click").click(function(event){
					event.preventDefault();
					
					MobileAttendCheck.fn.goLastMonth("P");
					$(".btn_lastmonth").show();
				 });
				 
				 $(".btn_checkwin").unbind("click").click(function(event){
					event.preventDefault();
					if(!IS_LOGIN){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
								ok_func:function(){
//									document.frm_login.submit();
									MobileBodyStart.goLoginPage();
								}, cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
								ok_func:function(){
//									document.frm_login.submit();
									MobileBodyStart.goLoginPage();
								}
							});
						}
					}else{
						var year = $("#i_sCheckDt").val().substring(0,4);
						var month = $("#i_sCheckDt").val().substring(4);
						cmDialogOpen("attend_check_win", {
							url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_attend_check_win_pop.do?i_sCheckDt="+$("#i_sCheckDt").val()+"&i_iMonth="+month+"&i_iYear="+year
							, width : "80%"
							, height : "50%"
							, changeViewAutoSize : false
						});
					}
					
				 });
				 
				$(".btn_go_brand").click(function(event){
					if (GLOBAL_FLAG_APP_NEW == "Y") {
						event.preventDefault();
						var brand		= $(this).attr("id").split(";")[0];
						var flagAppOpen	= $(this).attr("id").split(";")[1];
						try {
							if(flagAppOpen == "Y") {
								if(GLOBAL_MOBILE_OS == "AND") {
									window.Android.gotoBrandPage(brand)
								}
								else {
									window.webkit.messageHandlers.gotoBrandPage.postMessage(brand);
								}
							}
						} catch(e) {
						}
					}
				});
			},
			
			goLastMonth : function(flag){
				var date = $("#i_sCheckDt").val();
				var date_m = parseInt(date.substring(4, 6), 10)-1;
				var date_y = parseInt(date.substring(0, 4), 10);
				
				var today = new Date();
				
				today.setFullYear(date_y);
				today.setMonth(date_m);
				
				if(flag == "L"){
					
					today.setMonth(today.getMonth()-1);
				}else{
					
					today.setMonth(today.getMonth()+1);
				}
				
				var year = today.getFullYear();
				var month = today.getMonth()+1;
				
				if(month<10){
					month = "0"+month;
				}
				var i_sCheckDt = year+""+month;
				cmAjax({
					url :  GLOBAL_WEB_ROOT+"mobile/event/mobile_event_attend_check_month_info_ajax.do",
					type:"post",
					data:{i_sCheckDt : i_sCheckDt
						  , i_iYear : year
						  , i_iMonth : month },
					dataType:"json",
					success:function(data,textStatus){
						if(data.status == 'succ'){
							var month_en = data.object.month;
							$("#i_sCheckDt").val(i_sCheckDt);
							$("input[name='i_sMonth']").val(month_en);
							var calendar = data.object.calendar.list;
							var message = "";
							var usercnt = data.object.usercnt;
							if(usercnt == undefined){
								usercnt = 0;
							}
							MobileAttendCheck.fn.setUserRate(usercnt);
							
							MobileAttendCheck.fn.setCalendar(calendar,flag);

							if(data.object.userwin != undefined && data.object.userwin.length >0){
								var wincd = data.object.userwin[0].v_fg_cd;
								var fgcd  = data.object.userwin[0].v_fg_typecd;
								var winnm = data.object.userwin[0].v_win_prize;
								var num = 0;
								if(fgcd.indexOf("PASS") > -1){
									message = "중입니다.";
									num = parseInt(wincd)+1;
								}else{
									message = "에 당첨되었습니다.";
									num = wincd;
								}
								$(".winning_area").removeClass("a1").removeClass("a2").removeClass("a3");
								$(".winning_area").addClass("a"+num);
								$("#winnm").html("<strong>"+winnm+"</strong>");
								$("#message").text(message);
								$("#win_img").show();
								$(".p_winnm").css("float","left;");
								$(".winning_box").show();
							}else{
								message = "당첨내역이 없습니다.";
								$(".p_winnm").css("float","");
								$("#win_img").hide();
								$("#winnm").html("");
								$("#message").text(message);
								$(".winning_box").hide();
							}
							
							if(flag !="L"){
								var td = new Date();
								var year_td = td.getFullYear();
								var month_td = td.getMonth()+1;
								
								if(month_td <10){
									month_td = "0"+month_td;
								}
								var td_date = year_td+""+month_td;
								if(td_date == i_sCheckDt){
									$(".btn_month").hide();
								}
							}
						}else if(data.object == "login"){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
									ok_func:function(){
//										document.frm_login.submit();
										MobileBodyStart.goLoginPage();
									}, cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
									ok_func:function(){
//										document.frm_login.submit();
										MobileBodyStart.goLoginPage();
									}
								});
							}
						}
					}
				});
			},
			giveCoupon : function(flag){
				if(coupon){
					return false;
				}else{
					coupon = true;
				}
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_attend_check_save_ajax.do",
					type : "post",
					data : {i_sUserid : $("input[name='i_sUserid']").val(),
							i_sCouponFlag : flag,
							i_sFlagAction : "C"},
				    dataType:"json",
				    animation :false,
				    success : function(data,textStatus){
				    	if(data.status=='succ'){
				    		if(flag == "CY"){
				    			modalPopupClose('#modalPopupAttendance');
					    		showMessageBox({
					    			message : "무료배송 쿠폰을 지급하였습니다!<br/>알뜰한 쇼핑 되세요!"
					    			, close : function(){
					    				if($("#span_current_status").text() == "C"){
					    					modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
					    			}
					    		});
				    		}else if(flag=="CN"){
				    			modalPopupClose('#modalPopupAttendance');
				    			if($("#span_current_status").text() == "C"){
				    				 modalPopup('#modalPopupAttendanceComplete');
			    				}else{
			    					modalPopup('#modalPopupAttendanceCardSelect');
			    				}
				    		}else if(flag=="LY"){
				    			modalPopupClose('#modalPopupAttendanceLucky');
					    		showMessageBox({
					    			message : "축하드려요!!!<br/>이달의 행운상에 당첨되셨어요!"
					    			, close : function(){
					    				if($("#span_current_status").text() == "C"){
					    					 modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
					    			}
					    		});
				    		}else if(flag=="LN"){
				    			modalPopupClose('#modalPopupAttendanceLucky');
				    			if($("#span_current_status").text() == "C"){
				    				 modalPopup('#modalPopupAttendanceComplete');
			    				}else{
			    					modalPopup('#modalPopupAttendanceCardSelect');
			    				}
				    		}
				    	}else{
				    		if(data.status == 'isNotLogin'){
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}, cancel_func: function(){
											return ;
										}
									});
								}else{
									showConfirmBox({
										message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}
									});
								}
							}else{
								showMessageBox({
					    			message:data.message
					    		});
							}
				    		coupon = false;
				    	}
				    }
					
				});
			},
			setSubMenuChange : function() {
				var	select_input	= $('ul.nav_mcate>li>input[type=radio]');
		
				select_input.click(function() {
					var todayMonth = $("#todayMonth").val();
					if($(this).val() == "mobile_event_price_gift"){
						location.href  = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT" + todayMonth + "gifts";
					}else{
						location.href	= GLOBAL_WEB_URL+"mobile/event/" + $(this).val() + ".do";
					}
				});
			},
			goAttendCheck : function(object){
					if(finish){
						return false;
					}else{
						finish = true;
					}
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_attend_check_save_ajax.do",
						type:"post",
						data:{i_sUserid:$("input[name='i_sUserid']").val(),
							  i_sFlagAction :"A"},
						dataType:"json",
						animation :false,
						success: function(data,textStatus){
							if(data.status == 'succ'){
								if(data.object.cnt == 1){
									$("#span_current_status").text("C");
									var status = $("#span_current_status").text();
									
									if(data.object.freeDelivery == "Y"){
										$(".brandnm_coupon").text(data.object.maxbrandnm);
										modalPopup("#modalPopupAttendance");
										$(".btn_free_close").unbind("click").click(function(event){
							    			event.preventDefault();
							    			modalPopupClose('#modalPopupAttendance');
							    			if(status == "C"){
						    					 modalPopup('#modalPopupAttendanceComplete');
						    				}else{
						    					modalPopup('#modalPopupAttendanceCardSelect');
						    				}
										});
										$(".btn_brand").unbind("click").click(function(event){
											event.preventDefault();
											modalPopupClose('#modalPopupAttendanceComplete');
											$('body,html').animate({
												scrollTop: 1100
											}, 800);
										});
										
										var today = new Date();
										var month = today.getMonth();
										var today_y = today.getFullYear();
										var today_m = month+1;
										$("#i_sCheckDt").val(today_y+""+today_m);
										$("input[name='isCheck']").val("N");
										
										MobileAttendCheck.fn.setUserRate(data.object.usercnt);
										MobileAttendCheck.fn.getPageInit("Y" , "N");
										
										$(".btn_check").parent(".on").css("display","none");					
										$(".btn_check").parent(".off").css("display","block");
										
									}else if(data.object.lucky == "Y"){
										$(".brandnm_lucky").text(data.object.maxbrandnm);
										modalPopup("#modalPopupAttendanceLucky");
										$(".btn_lucky_close").unbind("click").click(function(event){
							    			event.preventDefault();
							    			modalPopupClose('#modalPopupAttendanceLucky');
							    			if(status == "C"){
						    					 modalPopup('#modalPopupAttendanceComplete');
						    				}else{
						    					modalPopup('#modalPopupAttendanceCardSelect');
						    				}
										});
										$(".btn_brand").unbind("click").click(function(event){
											event.preventDefault();
											modalPopupClose('#modalPopupAttendanceComplete');
											$('body,html').animate({
												scrollTop: 1100
											}, 800);
										});
										
										var today = new Date();
										var month = today.getMonth();
										var today_y = today.getFullYear();
										var today_m = month+1;
										$("#i_sCheckDt").val(today_y+""+today_m);
										$("input[name='isCheck']").val("N");
										
										MobileAttendCheck.fn.setUserRate(data.object.usercnt);
										MobileAttendCheck.fn.getPageInit("Y" , "N");
										
										$(".btn_check").parent(".on").css("display","none");					
										$(".btn_check").parent(".off").css("display","block");
										
									}else if(data.object.master == "Y"){
										$(".brandnm_master").text(data.object.maxbrandnm);
										modalPopup("#modalPopupAttendanceMaster");
										$(".btn_master").unbind("click").click(function(event){
							    			event.preventDefault();
							    			modalPopupClose('#modalPopupAttendanceMaster');
							    			if(status == "C"){
						    					 modalPopup('#modalPopupAttendanceComplete');
						    				}else{
						    					modalPopup('#modalPopupAttendanceCardSelect');
						    				}
										});
										$(".btn_master_close").unbind("click").click(function(event){
							    			event.preventDefault();
							    			modalPopupClose('#modalPopupAttendanceMaster');
							    			if(status == "C"){
						    					 modalPopup('#modalPopupAttendanceComplete');
						    				}else{
						    					modalPopup('#modalPopupAttendanceCardSelect');
						    				}
										});
										
										$(".btn_brand").unbind("click").click(function(event){
											event.preventDefault();
											modalPopupClose('#modalPopupAttendanceComplete');
											$('body,html').animate({
												scrollTop: 1100
											}, 800);
										});
										
										var today = new Date();
										var month = today.getMonth();
										var today_y = today.getFullYear();
										var today_m = month+1;
										$("#i_sCheckDt").val(today_y+""+today_m);
										$("input[name='isCheck']").val("N");
										
										MobileAttendCheck.fn.setUserRate(data.object.usercnt);
										MobileAttendCheck.fn.getPageInit("Y" , "N");
										
										$(".btn_check").parent(".on").css("display","none");
										$(".btn_check").parent(".off").css("display","block");
										
									}else{
										modalPopup("#modalPopupAttendanceComplete");
										
										$(".btn_brand").unbind("click").click(function(event){
											event.preventDefault();
											modalPopupClose('#modalPopupAttendanceComplete');
											$('body,html').animate({
												scrollTop: 1100
											}, 800);
										});
										
										var today = new Date();
										var month = today.getMonth();
										var today_y = today.getFullYear();
										var today_m = month+1;
										$("#i_sCheckDt").val(today_y+""+today_m);
										$("input[name='isCheck']").val("N");
										
										MobileAttendCheck.fn.setUserRate(data.object.usercnt);
										MobileAttendCheck.fn.getPageInit("Y" , "N");
										
										$(".btn_check").parent(".on").css("display","none");					
										$(".btn_check").parent(".off").css("display","block");
										
									}
									
								}else{
									showMessageBox({
										message:data.message
									});
									if($("input[name='isCheck']").val() == 'Y'){
										$(".btn_brandcard").unbind("click");
									}
								}
								
							}else if(data.status == 'isNotLogin'){
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}, cancel_func: function(){
											return ;
										}
									});
								}else{
									showConfirmBox({
										message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}
									});
								}
								finish = false;
							}else{
								finish = false;
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				
			},
			getPageInit  :  function(flag , brandchkflag){
				var check = $("input[name='isCheck']").val();
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_attend_check_ajax.do",
					type:"post",
					data:{i_sUserid : $("input[name='i_sUserid']").val()},
					dataType:"json",
					animation:false,
					success: function(data,textStatus){
						if(data.status == 'succ'){
							
							if(flag == 'N'){
								if(check !="Y"){
									var brandlist = data.object.brandlist.brand;
									MobileAttendCheck.fn.setBrandList(brandlist);
									MobileAttendCheck.fn.setScroll();
								}
							}
							
							var calendar = data.object.calendar.list;
							var usercnt = data.object.usercnt;
							
							if(usercnt == undefined){
								usercnt = 0;
							}
							MobileAttendCheck.fn.setUserRate(usercnt);						
							MobileAttendCheck.fn.setCalendar(calendar);
							
							if(check == 'N' ||  brandchkflag == "N"){
								
								$(".btn_brandcard").unbind("click").click(function(event) {
									event.preventDefault();
									var idx = $(".btn_brandcard").index($(this));
									var brandcd = data.object.brandlist.brand[idx].v_brandcd;
									var src = GLOBAL_MOBILE_IMG_URL+"event/attend/m_cardBrand_"+brandcd+".png";
									$(".chk_brand_card").eq(idx).attr("src",src);
									$(this).parent("li").addClass("act");
									setTimeout(function(){ $(".resultArea").css('display','block'); }, 1500);
									$(".btn_brandcard").unbind("click");
									MobileAttendCheck.fn.goBrandSave(brandcd);
								});
								
							}else if(check=="Y"){
								var brandnm = $("#brandnm").val();
								var brandcnt = $("#brandcnt").val();
								var brandcd = $("#i_sBrandcd").val();
								
								$(".btn_check").parent(".on").css("display","none");					
								$(".btn_check").parent(".off").css("display","block");
								
								var brandlist = data.object.brandlist.brand;
								MobileAttendCheck.fn.setBrandList(brandlist);
								
								var slide = $('.bxslider').bxSlider({
									slideWidth: 200,
								    minSlides: 3,
								    maxSlides: 3,
								    slideMargin: 7,
								    infiniteLoop:false,
								    hideControlOnEnd: true,
								    pager: false,
								    onSliderLoad: function(){
								    	var bx_li = $(".bxslider li").height();
										$('.bxslider').css('height',bx_li);
								    }
								 });
								slide.goToSlide(0);
								var brandinfo = data.object.brandinfo;
								var src = GLOBAL_MOBILE_IMG_URL+"event/attend/m_cardBrand_"+brandinfo.v_brandcd+".png";
								
								$(".chk_brand_card").eq(1).attr("src",src);
								$(".brandList li a").eq(1).parent("li").addClass("act");
								$(".brandList li a").unbind("click");
								
								$(".go_brand_prd_list").attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd="+brandinfo.v_brandcd);
								$(".go_brand_prd_list").attr("id", brandinfo.v_brandcd + ";" + brandinfo.v_flag_app_open);
								var arrHtml = [];
								arrHtml.push("<p class='resultCard'>");
								arrHtml.push("<em>"+brandinfo.v_brandnm+" 카드</em>를 뽑으셨습니다.");
								arrHtml.push("</p>");
								arrHtml.push("<p class='cumulative'>");
								arrHtml.push("<span>"+brandinfo.v_brandnm+" 누적 카드 : </span><em>"+brandinfo.n_brd_cnt+"장</em></p>");
								$(".resultArea").html("");
								$(arrHtml.join("")).appendTo(".resultArea");
								$(".resultArea").addClass('active');
							}else{
								$(".btn_brandcard").unbind("click").click(function(event) {
									event.preventDefault();
									if($("#span_current_status").text() != "C" && $("#span_current_status").text()  != "B"){
										showMessageBox({
											message : "출석체크를 하신 후에<br/>브랜드카드를 뽑아주세요."
										});
									}
								});
							}
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			},
			setUserRate : function(object){
				
				var date = $("#i_sCheckDt").val();
				
				var month = parseInt(date.substring(4, 6), 10);
				var year = parseInt(date.substring(0, 4), 10);
				
				var month_cnt = MobileAttendCheck.fn.fn_DayOfMonth(year, month);
				var user_rate = Math.round((object/month_cnt)*100);
				
				$("#user_rate").text(user_rate);
				MobileAttendCheck.fn.attendrate(user_rate);
			},
			shuffle : function(array){
				if(array == null || array.length == 0){
					return;
				}
				var len = array.length;
				for(var i=len; i>0; i--){
					array[len-1] = array.splice(Math.floor(Math.random()*i),1)[0];
				}
				return array;
			},
			setBrandList : function(object){
	
				var length = object.length;

				var arrHtml = [];
				for(var i=0; i<length; i++){
					arrHtml.push("<li>");
					arrHtml.push("	<a href='javascript:;' class='btn_brandcard' style='display:block'>");
					arrHtml.push("		<img src=\""+GLOBAL_MOBILE_IMG_URL+"content/brand_card2.png\" alt=\"\" />");
					arrHtml.push("		<span class='front'><img class='chk_brand_card' src=\""+GLOBAL_IMG_URL+"common/blank.png\" /></span></span>");
					arrHtml.push("	</a>");
					arrHtml.push("</li>");
				}
				$("#brandList").html("");
				$(arrHtml.join("")).appendTo("#brandList");
				
				$(".btn_check").unbind("click").click(function(){
					var isLogin = $("input[name='isLogin']").val();
					
					if(isLogin == "N"){
						if(IS_LOGIN_SNS){
							showConfirmBox({
								message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
								ok_func:function(){
//									document.frm_login.submit();
									MobileBodyStart.goLoginPage();
								}, cancel_func: function(){
									return ;
								}
							});
						}else{
							showConfirmBox({
								message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
								ok_func:function(){
//									document.frm_login.submit();
									MobileBodyStart.goLoginPage();
								}
							});
						}
					}
					else{
						MobileAttendCheck.fn.goAttendCheck(object);
					}
				});
			
			},
			setScroll : function(){
				var slides = $('.bxslider').bxSlider({
				    slideWidth: 200,
				    minSlides: 3,
				    maxSlides: 3,
				    slideMargin: 7,
				    infiniteLoop:false,
				    hideControlOnEnd: true,
				    pager: false,
				    onSliderLoad: function(){
				    	var bx_li = $(".bxslider li").height();
						$('.bxslider').css('height',bx_li);
				    }
				 });
			},
			//iscroll 가로값 체크
//			scrollWidth : function(){
//				$(".brandList li").each(function() {
//					var $eW = $(this).width();
//					$aw = $aw + $eW;
//				});
//				$('.brandList').css('width',$aw);
//			},
//			
//			//iscroll핸들러
//			scrollHandler : function() {
//				if (this.x || this.x === 0) {
//					offset = this.x;
//				}
//			},
//			
//			//iscroll btn next
//			Next : function() {
//				offset -= (48 * 5);
//				if (offset < -$aw + winW) { 
//					offset = -$aw + winW; // don't exceed this limit
//				}
//				attendbrandiscroller.scrollTo(offset, 0, 400);
//			},
//			
//			//iscroll btn prev 
//			Prev : function() {
//				offset += (48 * 5);
//				if (offset > 0) {
//					offset = 0; // don't exceed this limit
//				}
//				attendbrandiscroller.scrollTo(offset, 0, 400);
//			},
			goBrandSave : function(brandcd){
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_attend_check_save_ajax.do",
					type:"post",
					data:{i_sUserid : $("input[name='i_sUserid']").val(),
						  i_sBrandcd : brandcd,
						  i_sFlagAction : "B"},
					dataType:"json",
					animation :false,
					success:function(data,textStatus){
						if(data.status == 'succ'){
							
							var brandcnt = data.object.brandcnt;
							var brandnm = data.object.brandnm;
							var usercnt = data.object.usercnt;

							var arrHtml = [];
							arrHtml.push("<p class='resultCard'>");
							arrHtml.push("<em>"+brandnm.v_brandnm+" 카드</em>를 뽑으셨습니다.");
							arrHtml.push("</p>");
							arrHtml.push("<p class='cumulative'>");
							arrHtml.push("<span>"+brandnm.v_brandnm+" 누적 카드 : </span><em>"+brandcnt+"장</em></p>");
							$(".resultArea").html("");
							$(arrHtml.join("")).appendTo(".resultArea");
							$(".resultArea").addClass('active');
							$("input[name='isCheck']").val("Y");
							$("#span_current_status").text("B");
							var status = $("#span_current_status").text();
							$("#i_sBrandcd").val(brandnm.v_brandcd);
							$("#brand_name").text(brandnm.v_brandnm);
							$("#check_brandnm").text(brandnm.v_brandnm);
							$("#chk_brand_img").attr("src",GLOBAL_MOBILE_IMG_URL+"event/attend/m_today_coupon_"+brandnm.v_brandcd+".png");
							$("#chk_brand_img").attr("alt",brandnm.v_brandnm);
							$("#chk_brand_prdlist").attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd="+brandnm.v_brandcd);
							$("#chk_brand_prdlist").attr("id", brandnm.v_brandcd + ";" + brandnm.v_flag_app_open);
							$(".go_brand_prd_list").attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd="+brandnm.v_brandcd);
							$(".go_brand_prd_list").attr("id", brandnm.v_brandcd + ";" + brandnm.v_flag_app_open);
							MobileAttendCheck.fn.setUserRate(usercnt);	
							$(".today_brand_img").attr("src",GLOBAL_MOBILE_IMG_URL+"event/attend/m_brand_card_s_"+brandnm.v_brandcd+".png");
							$(".today_brand").show();
							setTimeout(function(){ 
								if(data.object.freeDelivery == "Y"){
									$(".brandnm_coupon").text(brandnm.v_brandnm);
									modalPopup("#modalPopupAttendance");
									$(".btn_free_close").unbind("click").click(function(event){
						    			event.preventDefault();
						    			modalPopupClose('#modalPopupAttendance');
						    			if(status == "C"){
					    					 modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
									});
								}else if(data.object.lucky == "Y"){
									$(".brandnm_lucky").text(brandnm.v_brandnm);
									modalPopup("#modalPopupAttendanceLucky");
									$(".btn_lucky_close").unbind("click").click(function(event){
						    			event.preventDefault();
						    			modalPopupClose('#modalPopupAttendanceLucky');
						    			if(status == "C"){
					    					 modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
									});
								}else if(data.object.master == "Y"){
									$(".brandnm_master").text(brandnm.v_brandnm);
									modalPopup("#modalPopupAttendanceMaster");
									$(".btn_master").unbind("click").click(function(event){
						    			event.preventDefault();
						    			modalPopupClose('#modalPopupAttendanceMaster');
						    			if(status == "C"){
					    					 modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
									});
									$(".btn_master_close").unbind("click").click(function(event){
						    			event.preventDefault();
						    			modalPopupClose('#modalPopupAttendanceMaster');
						    			if(status == "C"){
					    					 modalPopup('#modalPopupAttendanceComplete');
					    				}else{
					    					modalPopup('#modalPopupAttendanceCardSelect');
					    				}
									});
								}else{
									modalPopup("#modalPopupAttendanceCardSelect");
								}
							}, 1500);
							
							var today = new Date();
							var month = today.getMonth();
							var today_y = today.getFullYear();
							var today_m = month+1;
							$("#i_sCheckDt").val(today_y+""+today_m);
						}else{
							if(data.status == 'isNotLogin'){
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message:"해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}, cancel_func: function(){
											return ;
										}
									});
								}else{
									showConfirmBox({
										message:"해당 서비스는 로그인 하셔야 이용 가능해요.",
										ok_func:function(){
//											document.frm_login.submit();
											MobileBodyStart.goLoginPage();
										}
									});
								}
							}else{
								showMessageBox({
									message : data.message
								});
							}
							$(".brandList li a").unbind("click");
						}
					}
				});
			},
			setCalendar : function(object){
				var date = $("#i_sCheckDt").val();
				var month = parseInt(date.substring(4, 6), 10);
				var year = parseInt(date.substring(0, 4), 10);
				
				var today_m = month;
				var today_m_en = $("input[name='i_sMonth']").val();
				var lastDay = ( new Date( year, month, 0) ).getDate();
				var tr_cnt =0;
				var arrHtml=[];
				var length = object.length;
				var arrHead = [];
				
				var todaydate = $("#i_sTodayDate").val();
				arrHead.push("<em>"+today_m+"</em><span class=\"month\">월</span><span class=\"eng\">"+today_m_en+"</span>");
				$("#head").html(arrHead);
				var cnt = 0;
				for(var i=0; i<length; i++){
					
					if(object[i].v_day_of_week==1){
						tr_cnt = tr_cnt+1;	
						arrHtml.push("<tr>");
					}
					if(i==0){
						if(object[i].v_day_of_week != 1){
							cnt = object[i].v_day_of_week -1;
							tr_cnt = tr_cnt+1;	
							arrHtml.push("<tr>");
							lastDay = lastDay -(cnt-1);
							for(var j=1; j<=object[i].v_day_of_week -1; j++){
								arrHtml.push("<td><span class=\"gday\">"+lastDay+"</span></td>");
								lastDay = lastDay +1;
							}
						}						
					}
					var count = i+1;
					var daycolor = "day";
					if(object[i].v_day_of_week == 1){
						daycolor = "day_sun";
					}else if(object[i].v_day_of_week == 7){
						daycolor = "day_sat";
					}
					
					if(object[i].v_date == todaydate){
						if(object[i].v_attend_dt != undefined && object[i].v_brandnm != undefined){
							arrHtml.push("<td class='chk'><span class=\""+daycolor+"\">"+count+"</span><span class='card_brand today_brand'><img src=\""+GLOBAL_MOBILE_IMG_URL+"event/attend/m_brand_card_s_"+object[i].v_brandcd+".png\" alt=\""+object[i].v_brandnm+"\"/></span></td>");
						}else if(object[i].v_attend_dt != undefined && object[i].v_brandnm == undefined){
							arrHtml.push("<td class='chk'><span class=\""+daycolor+"\">"+count+"</span><span class='card_brand today_brand' style='display:none;'><img class='today_brand_img' src=\"\" alt=\"\"/></span></td>");
						}else{
							arrHtml.push("<td><span class=\""+daycolor+"\">"+count+"</span><span class='card_brand today_brand' style='display:none;'><img class='today_brand_img' src=\"\" alt=\"\"/></span></td>");
						}
					}else{
						if(object[i].v_attend_dt != undefined && object[i].v_brandnm != undefined){
							arrHtml.push("<td class='chk'><span class=\""+daycolor+"\">"+count+"</span><span class='card_brand'><img src=\""+GLOBAL_MOBILE_IMG_URL+"event/attend/m_brand_card_s_"+object[i].v_brandcd+".png\" alt=\""+object[i].v_brandnm+"\"/></span></td>");
						}else if(object[i].v_attend_dt != undefined && object[i].v_brandnm == undefined){
							arrHtml.push("<td class='chk'><span class=\""+daycolor+"\">"+count+"</span></td>");
						}else{
							arrHtml.push("<td><span class=\"day\">"+count+"</span></td>");
						}
					}
					
					if(i==length-1){
						var total_tr;
						
						if(tr_cnt == 4){
							total_tr = 35;
						}else{
							total_tr = 42;
						}
						var length_gday = total_tr-length-cnt;
						
						if( length_gday == 7){
							arrHtml.push("</tr>");
							arrHtml.push("<tr>");
						}else if(length_gday > 7){
							length_gday = length_gday - 7; 
						}
						
						for(var k=1; k<=length_gday; k++){
							
							arrHtml.push("<td><span class=\"gday\">"+k+"</span></td>");
						}						  
					}
					if(object[i].v_day_of_week == 7){
						
											
						arrHtml.push("</tr>");
					}					
					
				}
				
				$("#calendar").html(arrHtml);
				var td = new Date();
				var year_td = td.getFullYear();
				var month_td = td.getMonth()+1;
				
				if(month_td <10){
					month_td = "0"+month_td;
				}
				var td_date = year_td+""+month_td;
				if(td_date == date){
					$(".btn_month").hide();
				}
				
				if(IS_LOGIN){
					
					var wincd = $("#span_wincd").text();
					var winnm = $("#span_winnm").text();
					var fgcd  = $("#span_fgcd").text();
					
					var message = "";
					
					if(wincd != ""){
						
						var num = 0;
						if(fgcd.indexOf("PASS") > -1){
							message = "중입니다.";
							num = parseInt(wincd)+1;
						}else{
							message = "에 당첨되었습니다.";
							num = wincd;
						}
						$("#winnm").html("<strong>"+winnm+"</strong>");
						$("#message").text(message);
						$(".winning_area").removeClass("a1").removeClass("a2").removeClass("a3");
						$(".winning_area").addClass("a"+num);
						$(".winning_box").show();
					}else{
						message = "당첨내역이 없습니다.";
						$("#win_img").hide();
						$("#winnm").html("");
						$("#message").text(message);
						$(".winning_box").hide();
					}
				}else{
					$(".winning_box").hide();
				}
			}
		}
};