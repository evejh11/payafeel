/**
 * 모바일 익스박스 화면의 이벤트 처리를 위한 Javascript
 */
var MobilesaleExboxNow = {
	name : "MobilesaleExboxNow",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		
		dropdownMenu2('.beforeAlimArea');
		MobilesaleExboxNow.fn.setSubMenuChange();
		MobilesaleExboxNow.fn.getHotsaleExboxNowList();
		var i_iNowPageNo = $("input[name='i_iNowPageNo']").val();
		MobilesaleExboxNow.fn.getHotsaleLastExboxList(i_iNowPageNo);// 지난 익스 박스
																	// 리스트
		// MobilesaleExboxNow.fn.addBtnEvent();
		
	},

	fn : {

		addBtnEvent : function() {
			$(".btn_more").unbind("click").click(function(event) {
				event.preventDefault();
				MobilesaleExboxNow.fn.getMore();
			});
			$(".exboxDetail").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				MobilesaleExboxNow.fn.goDetail(id);
			});
			/*
			 * $(".buyexbox").unbind("click").click(function(event){
			 * event.preventDefault(); MobilesaleExboxNow.fn.getBuyExbox(); });
			 */

			$(".btn_tw").click(function(event){
				event.preventDefault();
				
				  var buffer = $("input[name='i_sSnsimg']").val();     

				  var r = request.post({
				     url: "https://api.twitter.com/1.1/statuses/update_with_media.json",

				     oauth: {
				        consumer_key: $("input[name='i_sCsKey']").val(),
				        consumer_secret: $("input[name='i_sCsScKey']").val(),
				        token: '2508851683',
				        token_secret: 'WnFKA1fEftbspeTts0EZw5lbzdIAs5TuGpTxDTtIQAWPl'
				     }
				  }, function(err, response, body) {
				     return console.log(err, body);
				  });
				  var form = r.form();
				  form.append('status', "TEST...");
				  form.append('media[]', buffer);
				  
				window.open("http://twitter.com/share?text=아모레 퍼시픽 직영몰 트위터 공유 테스트 입니다.&mediaFile=D:/workspace/ap_mall_2014/WebContent/images/content/attendanceAward.gif", '', 'width=815, height=436');
				
			});
			/*$("#btn_tw").click(function(event){
			event.preventDefault();
			var img = $(".img_val>img").attr("src");
			alert(img)
			var imgUrl =GLOBAL_WEB_URL+img
			alert(imgUrl)
			window.open("http://twitter.com/share?url="+imgUrl+"&text=아모레 퍼시픽 직영몰 트위터 공유 테스트 입니다.", '', 'width=815, height=436');
			
			});*/
			$(".btn_fb").unbind("click").click(function(event){
				event.preventDefault();
				var todaycd = $("input[name='i_sExtodaycd']").val();
				var evtname = $(".exboxnm").text(); 
				var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_now.do?i_sExboxcd="+todaycd;
				var evtimg  = $(".img_val>img").attr("src");
				var evtdesc = "";
				var rvo = {
						name : evtname
						,link : evtlink
						,picture : evtimg
						,description : evtdesc
				};

				MobileBodyStart.facebookShare(rvo,"N");

			});
			$(".btn_kt").click(function(event){
				event.preventDefault();
				
				var todaycd = $("input[name='i_sExtodaycd']").val();
				var evtname = $(".exboxnm").text(); 
				var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_now.do?i_sExboxcd="+todaycd;
				var evtimg  = $(".img_val>img").attr("src");
				var evtdesc = "한 달에 한번 아모레퍼시픽의 26개가 넘는 다양한 브랜드에서 신상을 만나보세요!!";
				
				kakao.link("talk").send({
					msg : evtdesc,
					url : evtlink,
					appid : "${WEB_FULL_URL}mobile/",
					appver : "1.0",
					appname : evtname,
					type : "link"
				});
			});
			$(".btn_free").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $("#i_sExboxtcd").val();
				MobilesaleExboxNow.fn.freePurchase(id);
			});
			
			 $(".btn_popup").unbind("click").click(function(event){
		        	event.preventDefault();
		        	modalPopup("#modalPopupBlueRebonPoint");
		    });
			 var $tabCate = $(".gradeBenufit .tab_cate"); 
		        var $tabCont = $(".gradeBenufit .tab_cont");

		        $tabCate.unbind("click").click(function(event){
		        	event.preventDefault();
		            var $idxTab = $tabCate.index(this);
		            $tabCont.hide().eq($idxTab).show();      
		            $tabCate.removeClass("active").eq($idxTab).addClass("active");
		            return false;
		            
		        });
		},

		freePurchase : function(id) {
			if (!IS_LOGIN) {
				if(IS_LOGIN_SNS){
					showConfirmBox({
						message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
//							var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_exbox_now.do";
//							MobileBodyStart.goLogin(returnUrl);
							MobileBodyStart.goLoginPage();
						}
					    , cancel_func: function(){
							return ;
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function() {
//							var returnUrl = GLOBAL_WEB_URL + "mobile/sale/mobile_sale_exbox_now.do";
//							MobileBodyStart.goLogin(returnUrl);
							MobileBodyStart.goLoginPage();
						}
					});
				}
			} 
			else {
				
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "shop/sale/shop_sale_exbox_apply_check_ajax.do"
					, type : "POST"
					, async : false
					, data : {
						i_sExboxcd : id
					}
					, dataType : "json"
					, success : function(data, textStatus, jqXHR) {
						if (data.status == "succ") {
							if(data.object == "already"){
								location.href = GLOBAL_WEB_URL + "mobile/sale/mobile_sale_exbox_apply.do?i_sExboxcd=" + id;
							}else{
								modalPopup("#modalNoticeExbox");
								$(".btn_apply_agree").unbind("click").click(function(event){
									location.href = GLOBAL_WEB_URL + "mobile/sale/mobile_sale_exbox_apply.do?i_sExboxcd=" + id;
								});
							}
						}
						else {
							if(data.object == "login"){
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function() {
										MobileBodyStart.goLoginPage();
//										document.frm_login.submit(); 
									}
								});
							}else{
								showMessageBox({message : data.message});
							}
						}
					}
				});
			}
		},
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
				//MobileBodyStart.addTopMenuLink("/mobile/sale/");
		},
		/**
		 * 더보기 클릭 시 익스박스 추가 목록 조회
		 */

		getMore : function() {
			var i_iNowPageNo = parseInt($('#i_iNowPageNo').val()) + 1;
			$('#i_iNowPageNo').val(i_iNowPageNo);
			MobilesaleExboxNow.fn.getHotsaleLastExboxList(i_iNowPageNo);
		},

		/**
		 * 이달의 익스박스에서 지난 익스박스 클릭시 지난익스박스 상세보기
		 */
		goDetail : function(id) {
			$("#i_sExboxcd").val(id);
			var frm = document.frm;
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
			frm.action = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_exbox_last.do";
			frm.submit(); 

		},
		/*
		 * getBuyExbox : function(){ var div = $(".div_nowexbox"); var isLogin =
		 * $("input[name='isLogin']",frm).val();
		 * 
		 * if(isLogin == 'N'){ alert("로그인 안한 부분"); showMessageBox({ message :
		 * "로그인 하시면 서비스 이용이 가능하세요!" ,close : function(){ var returnurl =
		 * "/mobile/sale/mobile_sale_exbox_now.do?i_sExboxcd="+$("input[name='i_sExboxcd']").val();
		 * $("form[name='frm']").attr("action","/mobile/mbr/mobile_mbr_member_login.do?returnUrl="+returnurl).submit(); }
		 * }); } else{ // 구매하기 부분! alert("로그인 한 부분"); var exboxcd =
		 * $("[name='i_sProductcd']",div).val(); var optioncd =
		 * $("[name='i_sOptioncd']",div).val(); // 구매하기 부분! list = [{ productcd :
		 * exboxcd , optioncd : optioncd , cnt : 1 , typecd : "PROD_0001" }];
		 * MobileBodyStart.immediatelyPurchage({list : list});
		 * 
		 * 
		 *  } },
		 */
		getParameter : function() {
			var parameter = {
				i_iNowPageNo : parseInt($('#i_iNowPageNo').val() || "1", 10),
				i_iPageSize : parseInt($('#i_iPageSize').val() || "4", 10),
				i_iTotalPageCnt : parseInt($('#i_iTotalPageCnt').val() || "1",
						10),
			};
			return parameter;
		},
		getHotsaleExboxNowList : function() {

			MobileCommon.ajax({
				url :  GLOBAL_WEB_ROOT + "mobile/sale/mobile_sale_exbox_last_ajax.do",
				type : "POST",
				dataType : "json",
				data : {
					i_sExboxcd : $("input[name='i_sExboxcd']").val(),
					i_sFlagAction : "T"// 파라메타 값
				},
				animation : false,
				success : function(data, textStatus) {
					
					if (data.status != "succ") {
						alert(data.message);
						return;
					}
					var levelcd = $("#i_sLevelcd").val();
					var obj = data.object.todayExbox;
					var usrcntflag = data.object.usrcntflag;
					var stime = data.object.sTime;
					var stDt = obj.v_st_dt;
					var arrr = [];
					var sDate = new Date(stime.substr(0, 4), stime.substr(4, 2), stime.substr(6, 2));
					var eDate = new Date(obj.v_buy_en_dt.substr(0, 4),obj.v_buy_en_dt.substr(4, 2), obj.v_buy_en_dt.substr(6, 2));
					var interval = eDate - sDate;
					var day = 1000 * 60 * 60 * 24;
					var remainTime = parseInt(interval / day) + 1;
					var i_sFlagExboxOpen = $("input[name='i_sFlagExboxOpen']").val();
					
					if(obj.v_flag_mobile_open == 'Y'){
					arrr.push("<p class='ttl exboxnm'>" + obj.v_exboxnm+ "</p>");
					
					//gypark
					if (obj.v_flag_component_open == 'N') {
						arrr.push("<p class='img_val'><img src='"+ obj.image_path06 + "' alt='' onerror='fnNoImage(this;)'/></p>");
					}
					else if(obj.v_flag_component_open == 'Y'){
						arrr.push("<p class='img_val'><img src='"+ obj.image_path08 + "' alt='' onerror='fnNoImage(this;)'/></p>");					} 
					else {
						arrr.push("<p class='img_val'><img src='"+ obj.image_path08 + "' alt='' onerror='fnNoImage(this;)'/></p>");
					}
					
					arrr.push("<input type='hidden' id='i_sOptioncd' name='i_sOptioncd' value='"+ obj.v_optioncd + "'/>");
					arrr.push("<input type='hidden' id='i_sProductcd' name='i_sProductcd' value='"+ obj.v_productcd + "'/>");
					arrr.push("<input type='hidden' id='i_sExboxtcd' name='i_sExboxtcd' value='"+ obj.v_exboxcd + "'/>");
					arrr.push("<input type='hidden' id='i_sExboxtcd' name='i_sExtodaycd' value='"+ obj.v_exboxcd + "'/>");
					arrr.push("	<div class='sec1'>");
					arrr.push("   <ul>	");
					if(remainTime < 0){
						arrr.push(" <li style='width:100%;'><p><em>신청 기간이 종료되었습니다</em></p></li>");
					}else if(stime < stDt){
						arrr.push(" <li style='width:100%;'><p><em>신청 대기중</em></p></li>");
					}else{
						arrr.push(" <li style='width:100%;'><p><span>남은 신청기간</span><em>"+ remainTime + "일</em></p></li>");
					}
					arrr.push(" </ul>	");
					var prc = $("input[name='i_sPreMonth']").val();
					var prc_comp = $("input[name='i_sPreMonthComp']").val();
					
					arrr.push("	<a href='#' class='btn_free'>무료신청</a>");
					/*if(usrcntflag == "Y"){
						arrr.push("	<a href='#' class='btn_free'>무료신청</a>");
					}else{
						if((levelcd == 'LV13' || levelcd == "LV17" || levelcd == "LV20") && prc < 200000 && prc_comp < 200000){
							arrr.push("	<a href='#' class='btn_free'>14,900P로 구입</a>");
						}else if(prc >= 200000 || prc_comp >= 200000){
							arrr.push("	<a href='#' class='btn_free'>무료신청</a>");						
						}else{
							arrr.push("	<a href='#' class='btn_free'>14,900P로 구입</a>");
						}
					}*/
					arrr.push("	</div>");
					arrr.push("	  <div class='sec2'>");
					/*arrr.push("	  <p class='descTxt'>* <em>지난달 구매금액 20만원 이상</em> 고객은 무료신청이 가능하며 VVIP등급의 회원은 <em>블루리본포인트 14,900p</em>를 사용하여 신청가능합니다.</p>");*/
					arrr.push("	  <p class='descTxt'>* <em>지난달 구매금액이 20만원 이상</em>인 경우 무료신청 가능합니다.</p>");
					arrr.push("	</div>");
					} else{
						arrr.push("<div class='nodata'> ");
						arrr.push("<p class='sp_bg s5'>원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrr.push("</div> ");
					}
					$(".div_nowexbox").html("");
					$(".div_nowexbox").html(arrr.join(""));
					MobilesaleExboxNow.fn.addBtnEvent();
				}
			});
		},

		getHotsaleLastExboxList : function(i_iNowPageNo, i_iPageSize) {
			var parameter = MobilesaleExboxNow.fn.getParameter();

			parameter.i_iNowPageNo = i_iNowPageNo;
			parameter.i_iPageSize = i_iPageSize;

			MobileCommon
					.ajax({
						url : "/mobile/sale/mobile_sale_exbox_today_LastList_ajax.do",
						type : "POST",
						dataType : "json",
						data : {
							i_sExboxcd : $("input[name='i_sExboxcd']").val(),
							i_iNowPageNo : i_iNowPageNo
								},
						animation : false,
						success : function(data, textStatus) {

							if ("succ" == data.status) {
								
								var page = data.object.lastExbox.page;
								var obj2 = data.object.lastExbox.list;
								

								var arrr2 = [];
								if(obj2 != undefined && obj2.length >0){
									var length2 = obj2.length;
									for (var i = 0; i < length2; i++) {
										arrr2.push("<li>");
										arrr2.push("  	<a  href='#' id='"+ obj2[i].v_exboxcd+ "' class='exboxDetail'>");
										arrr2.push(" 		<div class='thumbImg'>");
										console.log(obj2[i].v_flag_component_open);
										if (obj2[i].v_flag_component_open == 'N') {
											arrr2.push("<img src='"+ obj2[i].image_path02 + "' alt='' onerror='fnNoImage(this);'/>");
										} else {
											arrr2.push("<img src='"+ obj2[i].image_path05 + "' alt='' onerror='fnNoImage(this);'/>");
										}
										arrr2.push("	 	</div>	");
										arrr2.push("	   	<div class='exboxDetail'>");
										arrr2.push("				 <p id='exbox_id' class='month ellipsis'>"+ obj2[i].v_st_dt2+ " 익스박스</p>");
										arrr2.push("		 		 <p class='subject ellipsis2'>"+ obj2[i].v_exboxnm + "</p>");
										arrr2.push("  	    </div>");
										arrr2.push("	</a>");
										arrr2.push("</li>	");
									}
									if (page.i_iNowPageNo >= page.i_iTotalPageCnt) {
										$(".btn_more").hide();
									} else if (page.i_iNowPageNo < page.i_iTotalPageCnt) {
										$(".btn_more").show();
									} else {
										if ('' == $('.exboxLastList').html().replace(/(^\s*)|(\s*$)/g, "")) 
										{
											html += "<li>"+ "<a href=\"#none\">"+ "<p class=\"subj\">지난 익스박스가 존재하지 않습니다..</p>"+ "</a>" + "</li>";
										}
										$('.btn_more').hide();
									}

									if (1 == page.i_iNowPageNo) {
										$(".exboxLastList>ul").html(arrr2.join(""));

									} else {
										$(".exboxLastList>ul").append(arrr2.join(""));

									}
									MobilesaleExboxNow.fn.addBtnEvent();
								}else{
									$('.btn_more').hide();
									$(".lastreborn").hide();
								}
								
							} else {
								showMessageBox({
									message : data.message
								});
							}

							
						}
					});
		}
	}
};
