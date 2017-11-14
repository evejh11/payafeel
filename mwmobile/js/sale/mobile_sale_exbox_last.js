/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를 위한 Javascript
 */
var	MobilesaleExboxLast = {
	name : "MobilesaleExboxLast",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobilesaleExboxLast.fn.addBtnEvent();
		MobilesaleExboxLast.fn.setSubMenuChange();
		MobilesaleExboxLast.fn.getExboxInfoAndView1();// 지난 익스박스
		dropdownMenu2('.beforeAlimArea');
		
	},

	fn :{
		
		addBtnEvent : function() {
			$(".btn_review_detail").unbind("click").click(function(event){
				event.preventDefault();
				
				var id = $(this).attr("id");				
				var returnurl = $("input[name='i_sReturnUrl']").val()+"?"+$("input[name='i_sReturnParam']").val();
				var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+id+"&i_sReturnUrl="+returnurl;
				
				location.href = url;
			});
			//포토 댓글 리뷰
			$(".btn_photoReview").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[name='i_sTypecd']").val("0001");
				
				if($("#i_sFlagPhotoLoad").val() != "Y") {
					MobilesaleExboxLast.fn.getExboxInfoAndReply();
				}
			});
			$(".btn_free").unbind("click").click(function(event){
				event.preventDefault();
				var id = $("#i_sExboxtcd").val();
				MobilesaleExboxLast.fn.freePurchase(id);
			});
			//포토댓글 리뷰 더 보기
			$(".btn_photo_more").unbind("click").click(function(event) {
				event.preventDefault();
				var frm = $("form[name='frm_review']");
				$("input[name='i_sTypecd']",frm).val("0001");
				$("#i_iNowPageNo_0001",frm).val(parseInt($('#i_iNowPageNo_0001',frm).val()) + 1);
				MobilesaleExboxLast.fn.getExboxInfoAndReply("0001");
			});
			$(".btn_vote").unbind("click").click(function(event) {
				event.preventDefault();
				
				var reviewcd = $(this).attr("id").split("/")[0];
				var type = $(this).attr("id").split("/")[1];
				var idx = $(".btn_vote").index($(this));
				
				updateMobileVoteCnt(reviewcd, type, idx);
			});
			
			 $(".btn_beautyProfile").unbind("click").click(function(event){
				  event.preventDefault();
				  var id = $(this).attr("id");
				  MobileBeautyProfile.fn.addPopupBtnEvent(id);
			   });
			 
			 $(".btn_reg").unbind("click").click(function(event){
				event.preventDefault();
				
				$("#i_sRvTypecd").val("DT-003");
				$("#frm").attr("action","<c:url value='/mobile/cmnt/mobile_cmnt_photo_reg.do'/>");
			 });
			 
			 $(".btn_popup").unbind("click").click(function(event){
		        	event.preventDefault();
		        	modalPopup("#modalPopupBlueRebonPoint");
		    });
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
					
					var lastbox = $("#lastbox").val();
					var evtname = $(".exboxnm").text(); 
					var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_last.do?i_sExboxcd="+lastbox;
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
					var lastbox = $("#lastbox").val();
					var evtname = $(".exboxnm").text();
					var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_last.do?i_sExboxcd="+lastbox;
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
				
				
				$(".btn_tw2").click(function(event){
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
				$(".btn_fb2").unbind("click").click(function(event){
					event.preventDefault();
					
					var evtname = $(".exboxnm2").text(); 
					var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_now.do?i_sExboxcd="+$("input[name='i_sExboxcd']").val();
					var evtimg  = $(".img_val2>img").attr("src");
					var evtdesc = "";
					
					var rvo = {
							name : evtname
							,link : evtlink
							,picture : evtimg
							,description : evtdesc
					};

					MobileBodyStart.facebookShare(rvo,"N");

				});
				$(".btn_kt2").click(function(event){
					event.preventDefault();
					var evtname = $(".exboxnm2").text(); 
					var evtlink = GLOBAL_WEB_URL+ "mobile/sale/mobile_sale_exbox_now.do?i_sExboxcd="+$("input[name='i_sExboxcd']").val();
					var evtimg  = $(".img_val2>img").attr("src");
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
			 
			 //포토리뷰 등록
			 $(".btn_photoReg").unbind("click").click(function(event){				 
				 event.preventDefault();
				 var isLogin = $("input[name='isLogin']", frm).val();
				 if(isLogin == 'N'){
					 if(IS_LOGIN_SNS){
							showConfirmBox({
								message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
								, ok_func : function(){
									var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_exbox_last.do";
									MobileBodyStart.goLogin(returnUrl);
								}
							    , cancel_func: function(){
									return ;
								}
							});
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
									, ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_exbox_last.do";
										MobileBodyStart.goLogin(returnUrl);
									}
							});
						}
				 }else if(isLogin == 'Y'){
					 if($("#i_sFlagApply").val() != "Y"){
						 showMessageBox({ message : "리본박스 포토리뷰는 리본박스 신청자에 한해서 작성하실 수 있어요."});
					 }else{
						var frm = $("form[name='frm_review']");
						$("input[name='i_sRvTypecd']",frm).val("DC_T003");
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
								$("input[name='i_sLoginKey']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
							}
							if(GLOBAL_LOGIN_TYPE != "") {
								$("input[name='i_sLoginType']", frm).remove();
								arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
							}
							$("input[name='i_sDeviceNum']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
							$(arrParam.join("")).appendTo(frm);
						}
						frm.attr("action", GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_reg.do").submit(); 
					 }
					 
				 }
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
		freePurchase : function(id){
			if(!IS_LOGIN) {
				if(IS_LOGIN_SNS){
					showConfirmBox({
						message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_exbox_now.do";
							MobileBodyStart.goLogin(returnUrl);
						}
					    , cancel_func: function(){
							return ;
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
							, ok_func : function() {
								var returnUrl = "/mobile/sale/mobile_sale_exbox_now.do";
								MobileBodyStart.goLogin(returnUrl);
							}
					});
				}
			} else {
					var isOrder = $("#i_sOrderFlag").val();
					var isOrderDate = $("#i_sOrderDate").val();
					if(isOrderDate =="Y"){
										if (isOrder == "Y") {
											location.href = GLOBAL_WEB_URL
													+ "mobile/sale/mobile_sale_exbox_apply.do?i_sExboxcd="
													+ id;
											// MobileBodyStart.goLogin(returnUrl);
										} else {
											var msg = "";
											if(isOrder=="ERR_PT")msg="구매포인트가 부족합니다.";
											if(isOrder=="ERR_LV")msg="등급 및 구매금액 부족합니다.";
											if(isOrder=="ERR_ALO")msg="리본박스를 이미 신청하셨습니다.";
											showMessageBox({
												message : msg,
												ok_func : function() {
													location.href = GLOBAL_WEB_URL
															+ "mobile/sale/mobile_sale_exbox_now.do";
												}
											});
											// MobileBodyStart.goLogin(returnUrl);
										}
							}else{
							showMessageBox({
								message : "신청 기간에만 익스박스 신청이 가능합니다.",
								ok_func : function() {
									location.href = GLOBAL_WEB_URL
											+ "shop/sale/shop_sale_exbox_now.do";
								}
							});
						}
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
		},
		
		prodSlide : function(){
	         // 구성품슬라이드
	         window.compProdSwipe = new Swipe(document.getElementById('compProdSwipe'), {
	             continuous: false,
	             stopPropagation: true,
	             callback: function(event, element) {
	                 $("#compProd-nav > span").removeClass().eq(event).addClass("active");
	             }
	         });

		},
		getExboxInfoAndView1 : function() {
		
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_exbox_last_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {
					i_sExboxcd : $("input[name='i_sExboxcd']").val()  //파라메타 값 불러오기!!!!!!!!!!!!!!!!!!!!!!!!!
				},
				animation	: false,
				success		: function (data, textStatus) {
				//////지난 익스 박스 	///////////
				
						if ("succ" == data.status) {
								var obj = null;
								
								var arrr= [];
								if(data.object.lastExboxinfo == undefined && data.object.lastExbox.list != undefined && data.object.lastExbox.list.length > 0){
									obj = data.object.lastExbox.list[0];
									$("input[name='i_sProductcd']").val(obj.v_productcd);
									prod = data.object.lastExbox.prodlist;
									
								
								}else if(data.object.lastExboxinfo!=undefined){
									obj = data.object.lastExboxinfo;
									prod = data.object.prodlist;
									$("input[name='i_sProductcd']").val(obj.v_productcd);
								}
								$("input[name='i_sExboxcd']").val(obj.v_exboxcd);
								if(obj != undefined){
									arrr.push("<input type='hidden' id='lastbox' value="+obj.v_exboxcd+"/>");
									arrr.push("<p class='ttl exboxnm'>"+obj.v_exboxnm+"</p>");
									if(obj.v_flag_component_open == "Y"){
										arrr.push(" <p class='img_val'><img src='"+obj.image_path08+"' alt='' /></p>");
									}else{
										arrr.push(" <p class='img_val'><img src='"+obj.image_path06+"' alt='' /></p>");
									}
									
									arrr.push("<div class='sec1'>");
									arrr.push("<p class='txt1'>구성공개!</p>");
									arrr.push("<p class='txt2'>신청마감</p>");
									arrr.push("</div>");
									$(".div_lastBoxArea").html(arrr.join(""));
									if(obj.v_flag_component_open == "Y"){
										if(prod != undefined && prod.length>0){
											
											var length = 0;
											if(prod.length % 3 != 0 ){
												length = parseInt(prod.length /3) +1;
											}else{
												length = parseInt(prod.length /3);
											}
											for(var i=0; i<length; i++){
												var $div = $(".prodlist").eq(0).clone(true);
												$div.addClass("reborn");
												var $ul = $("ul",$div);
												
												if(prod.length%3 != 0){
													if(i == length-1){
														var last = $("li",$ul).size();
														for(var j=prod.length%3; j<last; j++){
															var $li = $("li",$ul).eq(j);
															$("input[name='i_arrProductcd']",$li).remove();
															$li.hide();
														}
														
													}
												}
												$div.appendTo(".Exboxprodlist");
												$div.show();
												
												var arrHtml = [];
												if(i == 0){
													arrHtml.push("<span class=\"active\"><span class=\"hide\">"+(i+1)+"</span></span>");
												}else{
													arrHtml.push("<span><span class=\"hide\">"+(i+1)+"</span></span>");
												}
												
												$(arrHtml.join("\n")).appendTo(".prodslide");
												
											}
											for(var j=0; j<prod.length; j++){
												var $ul = $(".reborn>ul");
												var $li = $("li",$ul).eq(j);
												$(".thumbImg>img",$li).attr("src",prod[j].v_img_path);
												$(".thumbImg>img",$li).attr("onerror","fnNoImage(this);");
												$(".prodDeatil>.brandNm",$li).text(prod[j].v_brandnm);
												if(prod[j].n_opt_cnt >0){
													$(".prodDeatil>.prodNm>a",$li).text(prod[j].v_productnm+"("+prod[j].v_optionnm+")");
												}else{
													$(".prodDeatil>.prodNm>a",$li).text(prod[j].v_productnm);
												}
												$(".prodDeatil>.prodNm>a",$li).attr("href", "javascript:MobileBodyStart.goProductDetail('" + prod[j].v_productcd + "');");
											}
											MobilesaleExboxLast.fn.prodSlide();
											for(var j=0; j<prod.length; j++){
												var inp1 	= jQuery("<input/>").prop({"type" : "hidden", "name" : "i_arrProductcd"}).val(prod[j].v_productcd);
												inp1.appendTo($("form[name='frm_review']"));
											}
										}
									}
									
									$("input[name='i_sTypecd']","form[name='frm_review']").val("0001");
									MobilesaleExboxLast.fn.getExboxInfoAndReply("0001");
									
									if(obj.v_flag_component_open == "N"){
										$(".btn_photoReg").hide();
									}
									$("input[name='i_sExboxcd']","form[name='frm_review']").val(obj.v_exboxcd);
								}else{
									var arrError = [];
									arrError.push("<div class=\"lastExbox\">");
									arrError.push("<div class=\"nodata\">");
									arrError.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
									arrError.push("</div>");
									$(".div_lastBoxArea").html(arrError.join(""));
									$(".prodlist").hide();
									$(".reviewarea").hide();
									$(".sharearealast").hide();
									
								}
								
								
							
						}
					
						
						
				 		var obj2= data.object.todayExbox;
				 		var stime= data.object.sTime;
				 		var stDt = obj2.v_st_dt;
						var arrr1= [];
						
						var sDate = new Date(stime.substr(0, 4), stime.substr(4,2), stime.substr(6, 2));
						var eDate = new Date(obj2.v_buy_en_dt.substr(0,4), obj2.v_buy_en_dt.substr(4,2), obj2.v_buy_en_dt.substr(6, 2));
						var interval = eDate - sDate;
						var day = 1000*60*60*24;
						var remainTime = parseInt(interval / day)+1;
							if(obj2.v_flag_component_open == "Y"){
								arrr1.push(" <p class='img_val2'><img src='"+obj2.image_path08+"' alt='' /></p>");
							}else{
								arrr1.push(" <p class='img_val2'><img src='"+obj2.image_path06+"' alt='' /></p>");
							}
							arrr1.push("<p class='ttl exboxnm2'>"+obj2.v_exboxnm+"</p>");
							arrr1.push("<input type='hidden' id='i_sOptioncd' name='i_sOptioncd' value='"+obj2.v_optioncd+"'/>");
							arrr1.push("<input type='hidden' id='i_sExboxtcd' name='i_sExboxtcd' value='"+obj2.v_exboxcd+"'/>");
							arrr1.push("<div class='sec1'>");
							arrr1.push("	<ul>");
							if(remainTime < 0){
								arrr1.push(" <li style='width:100%;'><p><em>신청 기간이 종료되었습니다</em></p></li>");
							}else if(stime < stDt){
								arrr1.push(" <li style='width:100%;'><p><em>신청 대기중</em></p></li>");
							}else{
								arrr1.push(" <li style='width:100%;'><p><span>남은 신청기간</span><em>"+ remainTime + "일</em></p></li>	");
							}
							arrr1.push(" 	</ul>");
							
							arrr1.push("		<a class='btn_free'>무료신청</a>");
							arrr1.push("</div>");
							arrr1.push("<div class='sec2'>");
							arrr1.push("	<p>");
							arrr1.push("	  <p class='descTxt'>* <em>전달 구매금액 20만원 이상</em> 고객은 무료신청이 가능합니다.</p>");
							arrr1.push("</div>");
						
						$(".div_todayExbox").html(arrr1.join(""));
						MobilesaleExboxLast.fn.addBtnEvent();
						
					},

				});	
			
			},
			  /*지난 익스박스 첫 후기*/
			  getExboxInfoAndReply : function(typecd) {
				  var frm = $("form[name='frm_review']");
				  MobileCommon.ajax({
									url			: GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_exbox_last_review_ajax.do",
									type		: "POST",
									dataType	: "json",
									data		: frm.serialize(),
									animation	: false,
									async : false,
									success		: function (data, textStatus){
									if ("succ" == data.status) {
											var page = data.object.review.page;
											var recordCnt = data.object.review.recordInfo.n_recordcnt;
											var list = data.object.review.list;
											var imglist = data.object.review.imglist;
											var flag = $("input[name='i_sTypecd']", frm).val();
											$("#review_cnt2").text(recordCnt); 
											if(flag == "0001") {
												$("#i_sFlagPhotoLoad").val("Y");
												$("#review_cnt2").text(recordCnt); 
											}
											MobilesaleExboxLast.fn.setExboxInfoAndReply(page, list, imglist, flag,recordCnt);
								}
							}
						});	 
			  		},			  		
			  		
			  		//댓글///
				setExboxInfoAndReply: function(page, list, imglist, flag, recordCnt , recordCnt2) {
					 if(flag == "0001") {
							var arrHtml = [];
							
							if(list != undefined && list.length > 0) {
								for(var i = 0; i< list.length; i++) {
									
									var level = list[i].v_user_level;
									if(level != undefined){
										level = "m"+level.substr(3,1);
									}else{
										level = "m1";
									}
									
									var cmtlevel = list[i].v_user_cmt_level;
									if(cmtlevel != undefined){
										cmtlevel = "c"+cmtlevel.substr(6,1);
									}else{
										cmtlevel = "c1";
									}
									
									var clob = list[i].v_clob;
									var remove_html = "";
									
									if(clob != undefined && clob != "") {
										remove_html = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/\[image#(.*?)\]/g, "").replace(/<!--(.|\n|\r)*-->/g,"");
									}
									
									arrHtml.push("<div class='photoReviewBox'>");
								if(list[i].v_rv_typecd == "DC_T002") {
									arrHtml.push("	<span class='ico_flag f1'>뷰티 테스터</span>");
								} else if(list[i].v_rv_typecd == "DC_T003") {
									arrHtml.push("	<span class='ico_flag f2'>리본박스</span>");
								}
								arrHtml.push("   <div class='userInfoArea'>");
								arrHtml.push("		<div class='photoZ'><img src='"+list[i].v_proimag_url+"' alt='' onerror='fnNoImageUser(this);'></div>");
								arrHtml.push("		<div class='userInfoZ'>");
								arrHtml.push("					<div class='name'");
								arrHtml.push("						<p>");
						
							if(list[i].v_nickname != undefined && list[i].v_nickname != "") {
								arrHtml.push("							<span class='nm'>"+list[i].v_nickname+"</span>");
							} else {
								arrHtml.push("							<span class='nm'>"+getStringReverseHidden(list[i].v_userid, 3)+"</span>");
							}
							if(list[i].n_bpcnt > 0){
								arrHtml.push("							 <a href='#' class='btn_beautyProfile' id='"+list[i].v_userid+"'><img src='"+GLOBAL_IMG_URL+"/common/ico_beautyProfile.png' alt='뷰티프로파일'></a>");
							}
								arrHtml.push("					   </p>");
								arrHtml.push("					 </div>");
								arrHtml.push("					 <div class='gradeZone'>");
								arrHtml.push("					 	<span class='ico_memberLevel "+level+"'>"+list[i].n_levelno+"</span>");
								arrHtml.push("					 	<span class='ico_communityLevel "+cmtlevel+"'>"+list[i].v_levelnm+"</span>");
								arrHtml.push("					 </div>");
								arrHtml.push("			    </div>");
								arrHtml.push("		   </div>");
							if(list[i].v_flag_best == "Y") {
								arrHtml.push("	<div class='bestArea'>");
								arrHtml.push("		<span class='ico_best'>best</span>");
								arrHtml.push("	</div>");    
							}
								arrHtml.push("	<p class='subject'>");
								if(list[i].v_reg_channel == "MOBILE" || list[i].v_reg_channel == "APP"){
									arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left; margin-top:4px;\">모바일</span>");
								}
								arrHtml.push("		<a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\" >"+list[i].v_title+"</a>");
								arrHtml.push("	</p>");
								arrHtml.push("	<p class='cont'><a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\" >"+getByteString(remove_html, 50)+"</a></p>");
								arrHtml.push("	<div class='photoZone' style='overflow: hidden;'>");
								arrHtml.push("		<ul>");
									if(imglist != undefined && imglist.length > 0) {
										var cnt = 0;
										for(var j=0; j<imglist.length; j++) {
											if(imglist[j].v_recordid == list[i].v_reviewcd) {
													++cnt;
												if(cnt <= 4) {
													if(parseInt(list[i].n_photo_cnt) > 4 && cnt == 4) {
														arrHtml.push("			<li>");
														arrHtml.push("				<div class=\"moreCountZone\">");
														arrHtml.push("					<img src=\""+imglist[j].v_image_path+"\" alt=\"\" />");
														arrHtml.push("					<span class=\"moreCount\">"+parseInt(list[i].n_photo_cnt-4)+"</span> ");
														arrHtml.push("				</div>");
														arrHtml.push("			</li>");
													} else {
														arrHtml.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" onerror='fnNoImage(this);'/></li>");
													}
												}
											}
										}
									}
									arrHtml.push("		</ul>");
									arrHtml.push("	</div>");
									arrHtml.push("	<div class=\"countBundle\">");
									arrHtml.push("		<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+SetNumComma(list[i].n_reply_cnt)+"</em></span>");
									arrHtml.push("		<a href=\"#\" class=\"btn_vote\" id=\""+list[i].v_reviewcd+"/photo\"><span class=\"ico_like\"><span class=\"hide\">좋아요</span><em><span class=\"span_voteCnt\">"+SetNumComma(list[i].n_vote_total)+"</span></em></span></a>");
									arrHtml.push("	</div>");
									arrHtml.push("	<p class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</p>");
									if(list[i].v_tagnm != undefined){
										arrHtml.push("			<p class=\"reviewtag\" style=\"width:100%;white-space: nowrap; overflow:hidden;text-overflow: ellipsis; \"><span>"+list[i].v_tagnm+"</span></p>");
									} 
									arrHtml.push("</div>");
								}
							} else {
								$(".review_cnt2").text(0);
								arrHtml.push("<div class=\"nodata\">");
								arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								arrHtml.push("</div>");
							}
							if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
								$(".btn_photo_more").hide();
							} else {
								$(".btn_photo_more").show();
							}
							if(1 == page.i_iNowPageNo) {
								$(".photoReviewArea").html(arrHtml.join(""));
							} else {
								$(".photoReviewArea").append(arrHtml.join(""));
							}
						}
						
						MobilesaleExboxLast.fn.addBtnEvent();
					},

					getParameter : function() {
						var parameter = {
							"i_sExboxcd" : $("#i_sExboxcd").val()
						};
						return parameter;
					}
				}
			};
