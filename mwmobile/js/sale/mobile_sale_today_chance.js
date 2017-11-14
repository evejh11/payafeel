/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를 위한 Javascript
 */
var	MobileHotsaleTodayChance = {
		name : "MobileHotsaleTodayChance",

		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');
			MobileHotsaleTodayChance.fn.setSubMenuChange();

			MobileHotsaleTodayChance.fn.addBtnEvent();
			MobileHotsaleTodayChance.fn.addDayEvent();
			MobileHotsaleTodayChance.fn.countDown();

			//MobileHotsaleTodayChance.fn.getHotsaleTodayChanceList();
		},

		fn : {
			/**
			 * 핫세일 서브 메뉴 처리
			 */
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');
				select_input.click(function() {
					if($(this).val() == "mobile_shop_product_br_store") {
						location.href	= "/mobile/shop/" + $(this).val() + ".do";
					} else if($(this).val() == "mobile_event_billing_beautypropose_view") {
						location.href	= "/mobile/event/" + $(this).val() + ".do";
					} else {
						location.href	= "/mobile/sale/" + $(this).val() + ".do";
					}
				});
			},

			addBtnEvent : function(){
				$(".btn_Detail").unbind("click").click(function(event){
					event.preventDefault();
//					if (GLOBAL_FLAG_APP_NEW == "Y") {
//						try {
//							if(GLOBAL_MOBILE_OS == "AND") {
//								MobileBodyStart.setLoginUserInfo();
//							}
//							else {
//								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
//							}
//						}catch(e){
//							alert(e);
//						}
//						var arrParam = [];
//						if(GLOBAL_LOGIN_KEY != "") {
//							$("input[name='i_sLoginKey']", $("form[name='frm']")).remove();
//							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
//						}
//						if(GLOBAL_LOGIN_TYPE != "") {
//							$("input[name='i_sLoginType']", $("form[name='frm']")).remove();
//							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
//						}
//						$("input[name='i_sDeviceNum']", $("form[name='frm']")).remove();
//						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
//						$(arrParam.join("")).appendTo($("form[name='frm']"));
//					}
//					var url = GLOBAL_WEB_URL+ "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//					$("form[name='frm']").attr("action", url).submit();
					MobileBodyStart.goProductDetail($(this).attr("id"));
				});
				$(".btn_basket").unbind("click").click(function(){
					event.preventDefault();
					var productcd = $(this).attr("id").split("/")[0];
					var optioncd = $(this).attr("id").split("/")[1];
					var stock = $(this).attr("id").split("/")[2];
					var cnt = 1; 

					if(stock == 0){
						showMessageBox({
							message : "판매가 모두 완료되었어요. <br/>다음 기회를 기다려주세요!"
						});
					}else{

						if(!IS_LOGIN){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
//										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_today_chance.do";
//										MobileBodyStart.goLogin(returnUrl);
										MobileBodyStart.goLoginPage();
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!"
										,ok_func : function(){
											MobileBodyStart.goLoginPage();
//											var url = GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_today_chance.do";
//											MobileBodyStart.goLogin(returnUrl);
										}
								});
							}
						}else{

							var list = [{
								productcd : productcd
								, optioncd : optioncd
								, cnt : cnt

							}];

							MobileBodyStart.addUserCart({
								list : list
								, callback : function(){
									showConfirmBox({
			        					message : "장바구니에 상품이 추가 되었어요.",
			        					ok_str  : "장바구니로 이동",
			        					cancel_str : "계속 쇼핑하기",
			        					ok_func : function(){
			        						location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
			        					}
			        				});
								}
							});
						}
					}
				});
				$(".btn_soldout").unbind("click").click(function(event){
					showMessageBox({
						message : "판매가 모두 완료되었어요. <br/>다음 기회를 기다려주세요!"
					});
				});

				$(".btn_purch").unbind("click").click(function(event){
					event.preventDefault();

					var productcd = $(this).attr("id").split("/")[0];
					var optioncd = $(this).attr("id").split("/")[1];
					var cnt = 1;
					var list = [{
						productcd : productcd
						, optioncd : optioncd
						, cnt : cnt

					}];

					MobileBodyStart.immediatelyPurchage({
						list : list
						, callback : function(){
							location.href = GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_today_chance.do";
						}
					});
				});
			},

			pars : {
				timer : null
				, startFlag : false
				, stopFlag : false
				, h1 : 0
				, h2 : 0
				, m1 : 0
				, m2 : 0
				, s1 : 0
				, s2 : 0
				, sTime : ""
					, eTime : ""
						, sDate : null
						, eDate : null
			},

			countDown : function() {
				MobileHotsaleTodayChance.fn.fnDeadLineInit();
				MobileHotsaleTodayChance.fn.pars.timer = setInterval(function() {
					if(MobileHotsaleTodayChance.fn.pars.stopFlag) {
						clearInterval(MobileHotsaleTodayChance.fn.pars.timer);
						return ;
					}

					MobileHotsaleTodayChance.fn.pars.sDate.setSeconds(MobileHotsaleTodayChance.fn.pars.sDate.getSeconds() + 1);
					MobileHotsaleTodayChance.fn.fnDeadLineCalc(MobileHotsaleTodayChance.fn.pars.sDate, MobileHotsaleTodayChance.fn.pars.eDate);
				}, 1000);

				/*clearInterval(MobileHotsaleTodayChance.fn.pars.timer);
				MobileHotsaleTodayChance.fn.pars.h1 = 0;
				MobileHotsaleTodayChance.fn.pars.h2 = 0;
				MobileHotsaleTodayChance.fn.pars.m1 = 0;
				MobileHotsaleTodayChance.fn.pars.m2 = 0;
				MobileHotsaleTodayChance.fn.pars.s1 = 0;
				MobileHotsaleTodayChance.fn.pars.s2 = 0;
				MobileHotsaleTodayChance.fn.fnDeadLineSet();
				return ;*/
			}
			, fnDeadLineInit : function() {

				var sTime = MobileHotsaleTodayChance.fn.pars.sTime;
				var eTime = MobileHotsaleTodayChance.fn.pars.eTime;

				MobileHotsaleTodayChance.fn.pars.sDate = new Date();
				MobileHotsaleTodayChance.fn.pars.eDate = new Date();
				var sDate = MobileHotsaleTodayChance.fn.pars.sDate;
				var eDate = MobileHotsaleTodayChance.fn.pars.eDate;
				var timeArr = sTime.split(",");

				sDate.setFullYear(parseInt(timeArr[0]), parseInt(timeArr[1]) - 1, parseInt(timeArr[2]));
				sDate.setHours(parseInt(timeArr[3]), parseInt(timeArr[4]), parseInt(timeArr[5]), 0);

				eDate.setFullYear(parseInt(eTime.substring(0, 4)), parseInt(eTime.substring(4, 6)) - 1, parseInt(eTime.substring(6, 8)));
				eDate.setHours(parseInt(eTime.substring(8, 10)), parseInt(eTime.substring(10, 12)), 59, 0);

				MobileHotsaleTodayChance.fn.fnDeadLineCalc(sDate, eDate);

				MobileHotsaleTodayChance.fn.pars.eDate = eDate;
				MobileHotsaleTodayChance.fn.pars.sDate = sDate;
			}
			, fnDeadLineCalc : function(sDate, eDate) {
				var diffDate = eDate - sDate; 
				var days = Math.floor((diffDate) / 1000 / 60 / 60 / 24);
				var hours = Math.floor((diffDate) / 1000 / 60 / 60 - (24 * days));
				var hours2 = Math.floor((diffDate) / 1000 / 60 / 60);
				var minutes = Math.floor((diffDate) / 1000 / 60 - (24 * 60 * days) - (60 * hours));
				var seconds = Math.round((diffDate) / 1000 - (24 * 60 * 60 * days) - (60 * 60 * hours) - (60 * minutes));

				if(hours2 < 24) {
					MobileHotsaleTodayChance.fn.pars.startFlag = true;
				} else {
					MobileHotsaleTodayChance.fn.pars.startFlag = false;
				}

				if(hours2 > 9) {
					MobileHotsaleTodayChance.fn.pars.h1 = Math.round(hours2 / 10);
					MobileHotsaleTodayChance.fn.pars.h2 = hours2 % 10;
				} else {
					MobileHotsaleTodayChance.fn.pars.h1 = 0;
					MobileHotsaleTodayChance.fn.pars.h2 = hours2;
				}

				if(minutes > 9) {
					minutes = minutes + "";
					MobileHotsaleTodayChance.fn.pars.m1 = minutes.substring(0, 1);
					MobileHotsaleTodayChance.fn.pars.m2 = minutes.substring(1, 2);
				} else {
					MobileHotsaleTodayChance.fn.pars.m1 = 0;
					MobileHotsaleTodayChance.fn.pars.m2 = minutes;
				}

				if(seconds > 9) {
					seconds = seconds + "";
					MobileHotsaleTodayChance.fn.pars.s1 = seconds.substring(0, 1);
					MobileHotsaleTodayChance.fn.pars.s2 = seconds.substring(1, 2);
				} else {
					MobileHotsaleTodayChance.fn.pars.s1 = 0;
					MobileHotsaleTodayChance.fn.pars.s2 = seconds;
				}

				if(diffDate <= 0) {
					MobileHotsaleTodayChance.fn.pars.stopFlag = true;
					todayOnly.fnReload();
				}

				MobileHotsaleTodayChance.fn.fnDeadLineSet();
			}
			, fnDeadLineSet : function() {
				$(".deadTime_h1").text(MobileHotsaleTodayChance.fn.pars.h1);
				$(".deadTime_h2").text(MobileHotsaleTodayChance.fn.pars.h2);
				$(".deadTime_m1").text(MobileHotsaleTodayChance.fn.pars.m1);
				$(".deadTime_m2").text(MobileHotsaleTodayChance.fn.pars.m2);
				$(".deadTime_s1").text(MobileHotsaleTodayChance.fn.pars.s1);
				$(".deadTime_s2").text(MobileHotsaleTodayChance.fn.pars.s2);
			},

			addDayEvent : function() {
				$(".timeArea").each(function() {
					var sTime = $("input[name=i_sTime]").val();
					var eTime = $(".span_enDt", $(this)).text();
					MobileHotsaleTodayChance.fn.pars.eTime = eTime;
					MobileHotsaleTodayChance.fn.pars.sTime = sTime;

				});
			},



			/**
			 * 모바일 핫세일 투데이찬스 진행중인 상품리스트를 위한 Javascript
			 */
			getHotsaleTodayChanceList : function () {

				MobileCommon.ajax({
					url			: "/mobile/sale/mobile_sale_today_chance_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
					},
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {
							console.log(data);
						} else {
							alert(data.message);
						}
						MobileHotsaleTodayChance.fn.pars.sTime = data.object.sTime;
						var obj_now = data.object.dealprd.now;
						var next_obj = data.object.dealprd.next;

						if( obj_now.length > 0 || next_obj.length > 0){
							var length = obj_now.length;
							var arrL=[];

							if(length > 0){
								var time = 100;
								for(var i=0; i<length; i++){
									var row=obj_now[i];
									var stock = row.n_stock_cnt;
									if(row.v_statuscd == "0002") {
										stock = 0;
									}

									time += 100 * i * 14;

									arrL.push("<h1 class='hide'>투데이찬스 목록</h1>															");
									arrL.push("<div class='tcBox'>																		");
									arrL.push("		<div class='sec1'>																	");
									arrL.push("			<div class='timeArea div_timeArea' id='"+row.v_dayoffcd+"'>															");
									arrL.push("					<p class='ttl'>현재 진행중인 상품 <span class='hide'>남은 시간</span></p>			");
									arrL.push("				<div class='time'>															");
									arrL.push("					<span><em id='deadTime_h1_"+row.v_dayoffcd+"' class='num deadTime_h1'>0</em><em id='deadTime_h2_"+row.v_dayoffcd+"' class='num deadTime_h2'>0</em></span>		");
									arrL.push("				<span class='term'></span>													");
									arrL.push("					<span><em id='deadTime_m1_"+row.v_dayoffcd+"' class='num deadTime_m1'>0</em><em id='deadTime_m2_"+row.v_dayoffcd+"' class='num deadTime_m2'>0</em></span>		");
									arrL.push("				<span class='term'></span>													");
									arrL.push("					<span><em id='deadTime_s1_"+row.v_dayoffcd+"' class='num deadTime_s1'>0</em><em id='deadTime_s2_"+row.v_dayoffcd+"' class='num deadTime_s2'>0</em></span>		");
									arrL.push("				</div>																		");
									arrL.push("			</div>																			");
									arrL.push("			<div class='salePercent'>														");
									arrL.push("				<em id='odometer"+i+"' class='odometer'>00</em>			");
									arrL.push("				<span>%</span>																");
									arrL.push("			</div>																				");
									arrL.push("         <script type='text/javascript'>");
									arrL.push("            setTimeout(function() {");
									arrL.push("                odometer"+i+".innerHTML = 30;");
									arrL.push("            }, 1000);");
									arrL.push("         </script>")
									arrL.push("			<span class=\"hide span_percent\">"+row.n_sale_per+"</span>");
									arrL.push("		</div>																				");
									arrL.push("		<div class='sec2'>																	");
									arrL.push("			<span class='ico_flag f3'>남은수량 :"+stock+"개</span>						");
									arrL.push("			<a href='#'>																	");
									arrL.push("				<p class='img'><img src='"+row.v_img_path2+"' class='btn_prod_detail' id='"+row.v_productcd+"' alt='' /></p>					");
									arrL.push("			</a>																			");
									arrL.push("		</div>																				");
									arrL.push("		<div class='sec3'>																	");
									arrL.push("				<div class='ttlbox'>														");
									arrL.push("					<p class='prodNm'>"+row.v_productnm+"</p>								");
									arrL.push("					<p class='priceZone'>													");
									if(row.n_price == row.n_list_price ){
										arrL.push("				<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>	");
									}else{
										arrL.push("				<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>	");
										arrL.push("				<span class='sale'><em>"+SetNumComma(row.n_list_price)+"</em>원</span>		");
									}
									arrL.push("					</p>																	");
									if(parseInt(row.n_freegood_cnt) > 0) {
										arrL.push("						<p class='gifttxt'>추가사은품증정</p>									");
									}

									arrL.push("					</div>																	");
									arrL.push("					<div class='btnArea2'>													");
									arrL.push("						<span class='btn_ty3 v5 btn_basket' id='"+row.v_productcd+"/"+row.v_optioncd+"/"+stock+"'><a href='#'>장바구니</a></span>	");

									if(stock != 0){
										arrL.push("						<span class='btn_ty v5 btn_purch' id='"+row.v_productcd+"/"+row.v_optioncd+"'><a href='#'>바로 구매</a></span>				");
									}else{
										arrL.push("						<span class='btn_ty v5'><a href='#'>판매 완료</a></span>				");
									}
									arrL.push("					</div>																	");
									arrL.push("				</div>																		");
									arrL.push("		</div>																				");

									MobileHotsaleTodayChance.fn.pars.eTime = row.v_en_dt;
								}

							}
							$(arrL.join("")).appendTo($(".todayChanceList"));
							MobileHotsaleTodayChance.fn.addBtnEvent();
							/*
							setTimeout(function(){
									//var per = $(".span_percent").eq(i).text();
									odometer0.innerHTML = 25; 
									//$(this).html(per);
							}, 1000);
							 */

							/*setTimeout(function() {
								odometer0.innerHTML = 30;
							}, 1000);*/

							//var length2 = next_obj.length;
							MobileHotsaleTodayChance.fn.countDown();

							var arrL2=[];
							var Ctime=MobileHotsaleTodayChance.fn.pars.sTime;
							var CtimeArr = (Ctime.split(",")[0]+Ctime.split(",")[1]+Ctime.split(",")[2]);

							for(var i=0; i<next_obj.length; i++){
								var row=next_obj[i];

								var sDate = new Date(CtimeArr.substr(0, 4), CtimeArr.substr(4,2), CtimeArr.substr(6, 2));
								var eDate = new Date(row.v_en_dt.substr(0,4), row.v_en_dt.substr(4,2), row.v_en_dt.substr(6, 2));
								var interval = eDate - sDate;
								var day = 1000*60*60*24;
								var remainTime = parseInt(interval / day);
								if(remainTime <= 10){
									arrL2.push("<h1 class='title'>커밍쑨 상품 <span>COMING SOON</span></h1>												");
									arrL2.push("<div class='tcBox'>																					");
									arrL2.push("		<p class='mark'>																				");
									arrL2.push("			<span>COMING</span>																			");
									arrL2.push("			<span>SOON</span>																			");	
									arrL2.push("		</p>																							");
									arrL2.push("		<div class='sec2'>																				");
									arrL2.push("			<a href='#'>																				");
									arrL2.push("				<p class='img'><img src='"+row.v_img_path2+"' alt='' /></p>								");
									arrL2.push("			</a>																						");
									arrL2.push("					</div>																				");
									arrL2.push("		<div class='sec3'>																				");
									arrL2.push("		<div class='ttlbox'>																			");
									arrL2.push("			<p class='prodNm'>"+row.v_productnm+"</p>													");
									arrL2.push("			<p class='date'>"+changeDatePatten(row.v_st_dt)+"("+(row.v_st_day)+")"+"~"+changeDatePatten(row.v_en_dt)+"("+(row.v_en_day)+")"+" 예정</p>");

									if(parseInt(row.n_freegood_cnt) > 0){
										arrL2.push("						<p class='gifttxt'>추가사은품증정</p>												");
									}	
									arrL2.push("			</div>																						");
									arrL2.push("		</div>																							");
									arrL2.push("</div>																								");
								}
							}
							$(arrL2.join("")).appendTo($(".comingList"));
							MobileHotsaleTodayChance.fn.addBtnEvent();
						}else{

							var arrResult=[];
							arrResult.push("<div class=\"nodata\">");
							arrResult.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrResult.push("</div>");
							$(".todayChanceList").html(arrResult.join(""));
						}
					}

				});
			},




		}
};


