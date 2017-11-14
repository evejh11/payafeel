/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를 위한 Javascript
 */
var parameter = {
	i_iNowPageNo : parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iNowPrePageNo : parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iPageSize : parseInt($('#i_iPageSize').val() || "6", 10),
	i_iTotalPageCnt : parseInt($('#i_iTotalPageCnt').val() || "1", 10),
	i_iRecordCnt : parseInt($('#i_iRecordCnt').val() || "1", 10),
	i_sSortCol : "",
	i_sEvtCategorycd : "",
	i_sSortDir : "DESC",
	i_sFlagListAction : "",
	pageStack : [],

};
var categorycd = "";

var MobileEventView = {
	name : "MobileEventView",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobileEventView.fn.setSubMenuChange();
		MobileEventView.fn.getEventView();
		$( window ).on( 'load resize scroll' ,function() {
			MobileEventView.fn.setScrollEvent();
		});
	},

	fn : {
		setScrollEvent : function(){
			var win_scroll_top = $(window).scrollTop();
			var win_height = $(window).height();
			var top_gap = 300;
			var target_top = win_scroll_top + win_height + top_gap;
			var arr_image_wrap = $(".inner_prd_cont");

			var arr_wrap = arr_image_wrap;
			var len = arr_wrap.length;

			for(var i=0; i<len; i++){
				var top = arr_wrap.eq(i).offset().top;
				if(!arr_wrap.eq(i).hasClass("img_load_complete")){
					if (target_top > top) {
						MobileEventView.fn.getImage(arr_wrap.eq(i));
						arr_wrap.eq(i).addClass("img_load_complete");
					}
				}
			}
		},
		getImage: function(wrap){
			fnImgSrcChange(wrap);
		},
		addBtnEvent : function() {

			$(".btn_cart").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_cart").index($(this));
				var productcd = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd = $("input[name='i_arrOptioncd']").eq(idx).val();
				var solopack = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				
				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];
				
				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						var target = "#balloonBasket";
						   
					    var winW = $(window).width();
					    var winH = $(window).height();

					    var lyW = $(target).width();
					    var lyH = $(target).height();

					    var scrollTop = $(window).scrollTop();
					    var scrollLeft = $(window).scrollLeft();

					    var eLeft = ((winW - lyW) / 2);
					    var eTop = ((winH - lyH) / 2) + scrollTop;

					    $(target).css({
					        "left": eLeft + "px",
					        "top" : eTop + "px"
					    });
					    
					    $(target).show();
					    setTimeout(function(){$(target).addClass("active");}, 800);
					    setTimeout(function(){$(target).removeClass('active').hide();},1200);
					}
				});
				
			});
			
			$(".btn_nowBuy").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_nowBuy").index($(this));
				var productcd = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd = $("input[name='i_arrOptioncd']").eq(idx).val();
				var solopack = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				
				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];
				
				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						location.href= GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
					}
				});
			});
			
			$(".btn_more").unbind("click").click(function(event) {
				event.preventDefault();
				MobileEventView.fn.getMore();
			});

			$(".ico_like").unbind("click").click(function(event) {
				event.preventDefault();
				flag = $("i_sFlagAction").val("UL");
				MobileEventView.fn.addLike();
			});

			$(".btnList").unbind("click").click(function(event) {
				event.preventDefault();
				location.href = GLOBAL_WEB_URL + "mobile/event/mobile_event_event_list.do";
			});

			$(".ico_share").unbind("click").click(function(event) {
				event.preventDefault();
				modalPopup('#modalPopupEvtShare');

			});
			var eventcd = $(".span_eventcd").text();
			var thumbnail = $("#i_sEventBnrPath").val();
			var eventnm = $("input[name='i_sEventnm']").val();
			var description = $("input[name='i_sEventDescrip']").val();
			
			$(".kakaostory_share").click(function(event){
//				Kakao.init('8218ce208f43a5737824a66dc103d2c3');
   		    	Kakao.Story.share({
			        url: 'http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd='+eventcd,
			        text: "아모레퍼시픽몰의 특별한 이벤트를 만나보세요! :)"
			    });
   		    });
            
              
              $(".btn_url").unbind("click").click(function(event){
      	        	event.preventDefault();
      	        	alert();
      	        	$("#i_sCopyUrl").val("http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd="+eventcd);
      	        	modalPopupClose("#modalPopupEvtShare");
      	        	modalPopup("#modalPopupCopyUrl");
      	        	document.getElementById("i_sCopyUrl").focus();
      	    		document.getElementById("i_sCopyUrl").select();
  	        	});
              $(".btn_pinit").unbind("click").click(function(event) {
      				event.preventDefault();
      				var arrPars = new Array();
      				arrPars.push("url=" + encodeURI("http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=")+eventcd);
      				arrPars.push("media=" + encodeURI(thumbnail));
      				arrPars.push("description=" + "[아모레퍼시픽몰] "+encodeURI(eventnm));
      				
      				window.open("//pinterest.com/pin/create/button/?" + arrPars.join("&"));
  				});
              $(".btn_fb").unbind("click").click(function(event){
  				event.preventDefault();
  				var rvo = {
  					 name : name
  					 ,link : GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+eventcd
  					,picture : thumbnail
  					,description : description
  				};
  				
  				MobileBodyStart.facebookShare(rvo,"Y");
  				
  			});
			//gypark 
			
			if (categorycd == 'AM004') {
				// 포토리뷰 이벤트
				$(".btn_photoreview_reg").unbind("click").click(function(event) {
					event.preventDefault();
					showMessageBox({
						message : "댓글에 휴가지 사진과 함께 소개를 남겨주시면 자동으로 참여하실 수 있어요."
					});
					/*
					 * var frm = $("form[name='frm']"); var frm_common =
					 * $("form[name='frm_common']"); var returnUrl =
					 * $("input[name='i_sReturnUrl']",frm_common).val();
					 * var returnParam =
					 * $("input[name='i_sReturnParam']",frm_common).val();
					 * 
					 * if($("input[name='i_sCmtLevel']").val() ==
					 * 'CZ_L005'){ showMessageBox({ message : "글 작성 제한
					 * 등급입니다." }); }else if(!IS_LOGIN){ var options = {
					 * type : "page_move" , url : returnUrl , param :
					 * returnParam };
					 * MobileBodyStart.fnLoginCheck(options); }else{
					 * frm.attr("action", GLOBAL_WEB_URL+
					 * "mobile/cmnt/mobile_cmnt_photo_reg.do").submit(); }
					 */
				});

				$(".btn_listDetail").unbind("click").click(function(event) {
					event.preventDefault();
					// var idx = $(".btn_listDetail").index($(this));
					var id = $(this).attr("id");

					MobileEventView.fn.goDetail(id);
				});
			}

			// SNS 공유
			$(".btn_face").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				var evtname = id.split(",")[0];
				var evtlink = id.split(",")[1];
				var evtimg = id.split(",")[2];
				var evtdesc = id.split(",")[3];

				var rvo = {
					name : evtname,
					link : evtlink,
					picture : evtimg,
					description : evtdesc
				};

				MobileBodyStart.facebookShare(rvo, "N");

			});
			$(".btn_kakaotalk").click(function(event) {
				event.preventDefault();

				kakao.link("talk").send({
					msg : "천연보습인자를 깨워 피부속에서 스스로 수분이 만들어 진다고!? \n 새롭게 출시 된 라네즈 워터뱅크 크림에 대한 기대평을 남기고 정품 받자!",
					url : "http://m.laneige.co.kr/mobile/event/mobile_water_event_main.do",
					appid : "${WEB_FULL_URL}mobile/",
					appver : "1.0",
					appname : "[라네즈 워터뱅크 이벤트]",
					type : "link"
				});
			});

			// 아코디언

		},

		accordionBtnEvent : function(flag) {
			$(".a_groupnm").unbind("click").click(function(event) {

				var idx = $(".a_groupnm").index($(this));
				var cont_wrap = $(".cont_wrap").eq(idx);
				fnImgSrcChange(cont_wrap);

			});

			var $accotit = $("#accoTab > .album_tit");

			var $accotit_ori = $("#accoTab> .tit");

			$(".album_contView").css("display", "none");
			$(".EventProd").css("display", "none");

			$accotit_ori.eq(0).addClass('active');
			if ($accotit_ori.eq(0).hasClass("album_tit")) {
				$(".album_contView").eq(0).show();
			} else {
				$(".EventProd").eq(0).show();
			}

			$accotit.unbind("click").click(function(event) {
				event.preventDefault();
				var idx = $accotit.index(this);
				if ($("+.album_contView", this).css("display") == "none") {
					$(".album_contView").hide();
					$("+.album_contView", this).show();

					var $objOffet = $(this).offset().top;
					$("html,body").stop().animate({
						scrollTop : $objOffet
					}, 0);

					$accotit.removeClass("active");
					$(this).addClass("active");

				} else if ($(this).hasClass("active")) {
					$(".album_contView").hide();
					$accotit.removeClass("active");
				}
				;
			});

			var $accotit2 = $("#accoTab > .slide_tit");
			var $accoCont = $("#accoTab .EventProd .contView");

			// $(".EventProd").css("display","none");
			// $(".EventProd").eq(0).show();
			// $accotit2.eq(0).addClass('active');

			$accotit2.unbind("click").click(function() {
				var idx = $accotit2.index(this);

				if ($("+.EventProd", this).css("display") == "none") {
					$(".EventProd").hide();
					$("+.EventProd", this).show();

					var $objOffet = $(this).offset().top;
					$("html,body").stop().animate({
						scrollTop : $objOffet
					}, 0);

					$accotit2.removeClass("active");
					$(this).addClass("active");
					$(".EventProd").eq(idx).show();
				} else if ($(this).hasClass("active")) {
					$(".EventProd").hide();
					$accotit2.removeClass("active");
				}
				;
			});

		},
		goEvent : function() {
			var url = $(".span_cm_event_url").text();
			var frm = $("form[name='frm']");
			if (url != "undefined" && url != undefined && url != "") {
				cmAjax({
					url : url,
					type : "post",
					async : false,
					data : {
						i_sEventcd : $("input[name='i_sEventcd']", frm).val(),
						i_sTodayFlower : $("input[name='i_sTodayFlower']").val()
					},
					dataType : "html",
					success : function(html) {
						$(".eventView .div_event_content").html(html);
					}
				});
			}
		},
		goDetail : function(id) {
			$("input[name='i_sReviewcd']").val(id);

			var frm = document.frm;

			frm.action = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do";
			frm.submit();
		},

		setSubMenuChange : function() {
			var select_input = $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href = "/mobile/event/" + $(this).val() + ".do";
			});
		},
		/**
		 * 좋아요 기능
		 */
		addLike : function() {
			var frm = $("form[name='frm']");
			var isLogin = $("input[name='isLogin']", frm).val();
			var eventcd = $("input[name='i_sEventcd']", frm).val();
			if (isLogin == 'N') {
				showConfirmBox({
					message : "로그인 하시면 서비스 이용이 가능하세요!",
					ok_func : function() {
						document.frm_login.submit();
					}
				});
			} else {
				MobileCommon.ajax({
					url : "/mobile/event/mobile_event_view_ajax.do",
					type : "POST",
					dataType : "json",
					data : {
						"i_sEventcd" : eventcd,
						"i_sType" : "event",
						"i_sFlagAction" : "UL"
					},
					animation : false,
					success : function(data, textStatus, jqXHR) {
						if (data.status == 'succ') {
							/*
							 * var vote =
							 * parseInt(SetNum($(".likeCnt").text()));
							 * balloonOpen(".ico_like");
							 * $(".likeCnt").text(vote+1);
							 */
							if (data.object == "like") {
								var vote = parseInt(SetNum($(".likeCnt").text()));

								$(".likeCnt").text(SetNumComma(vote + 1));
								balloonOpen(".ico_like");
							} else {
								var vote = parseInt(SetNum($(".likeCnt").text()));

								$(".likeCnt").text(SetNumComma(vote - 1));
								$(".ico_like").eq(0).removeClass("active");
							}

							MobileEventView.fn.addBtnEvent();
						} else if (data.status == 'isNotLogin') {
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function() {
									document.frm_login.submit();
								}
							});
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			}
		},
		getParameter : function() {
			var parameter = {
				"i_iNowPageNo" : parseInt($('#i_iNowPageNo').val() || "1", 10),
				"i_iPageSize" : parseInt($('#i_iPageSize').val() || "5", 10),
				"i_iTotalPageCnt" : parseInt($('#i_iTotalPageCnt').val() || "1", 10),
				"i_iRecordCnt" : parseInt($('#i_iRecordCnt').val() || "1", 10),
				"i_sMemocd" : $("input[name='i_sEventcd']", frm).val(),
				"i_sFlagAction" : ""
			};
			return parameter;
		},

		getPageInit : function() {
			var frm = $("form[name='frm']");
			var id = $("input[name='i_sEventcd']", frm).val();
			MobileCommon.ajax({
				url : "/mobile/event/mobile_event_view_ajax.do",
				type : "post",
				dataType : "json",
				data : {
					"i_sEventcd" : id,
					"i_sFlagAction" : "V"
				},
				animation : false,
				success : function(data, textStatus, jqXHR) {
				}
			});
		},

		getEventView : function() {
			MobileCommon.ajax({
				url : "/mobile/event/mobile_event_view_ajax.do",
				type : "POST",
				dataType : "json",
				data : {
					i_sEventcd : $("input[name='i_sEventcd']").val()
				},
				animation : false,
				success : function(data, textStatus) {

					if ("succ" == data.status) {

						var i_sEventcd = $("input[name='i_sEventcd']").val();

						var obj = data.object.event_detail;
						var pro = data.object.Product_list.list;
						var keyword = data.object.keywordlist;
						var textlist = data.object.textlist;
						// console.log(pro);
						var grplist = data.object.Product_list.grouplist;
						categorycd = obj.v_evt_categorycd;
						if (categorycd == 'AM004') {
							parameter.i_sEvtCategorycd = categorycd;
							/* MobileEventView.fn.reviewList(1); */
						}

						$("input[name='i_sEvtCategorycd']").val(obj.v_evt_categorycd);
						MobileEventView.fn.setEventView(data.object);

						MobileEventView.fn.addBtnEvent();

						if (obj.v_flag_reply == "Y") {
							MobileComment.fn.getInit($("input[name='i_sEventcd']").val(), 1, "CMC_EVENT_MEMO", obj.v_flag_reply_sns, parameter.i_sEvtCategorycd);
							MobileComment.init();
							var html = "<input type=\"hidden\" id=\"i_sFlagEvent\" value=\"Y\"/>";

							$("#frm_comment").append(html);
							$("#frm_comment").show();
						} else {
							$("#frm_comment").remove();
							$(".btn_ico_comment").remove();
						}

					} else {
						showMessageBox({
							message : data.message
						});
					}
					MobileEventView.fn.goEvent();
				}

			});
		},

		reviewList : function(i_iNowPageNo) {

			parameter.i_iNowPageNo = i_iNowPageNo;
			parameter.i_sSortCol = $("input[name='i_sSortCol']").val();
			parameter.i_sFlagListAction = 'S';
			parameter.i_sEventcd = $("input[name='i_sEventcd']").val();
			if (parameter.i_sEventcd != '') {
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_list_ajax.do",
					dataType : "json",
					data : parameter,
					animation : false,
					async : false,

					success : function(data, textStatus, jqXHR) {

						if (data.status == "succ") {
							MobileEventView.fn.setReviewList(data.object);
							MobileEventView.fn.addBtnEvent();
						}
					},
					error : function() {
					}
				});
			}
		},

		setReviewList : function(object) {

			var arrHtml = [];
			var list = object.review.list;
			var page = object.review.page;
			var imglist = object.review.imglist;

			parameter.i_iNowPrePageNo = page.i_iNowPageNo;

			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
			$("#i_iRecordCnt").val(page.i_iRecordCnt);

			parameter.i_iNowPage = page.i_iNowPageNo;
			parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter.i_iRecordCnt = page.i_iRecordCnt;

			arrHtml.push("<div class=\"summPhotoReview\">");
			arrHtml.push("<div class=\"title\">HOT한 썸머 플레이스</div>");
			// arrHtml.push("<div class=\"btnArea2 btn_photoreview_reg\">");
			// arrHtml.push("<a href=\"#\"><span>HOT한 썸머플레이스 등록</span></a>");
			// arrHtml.push("</div>");
			if (list != undefined && list.length > 0) {

				for (var i = 0; i < list.length; i++) {

					var rvlist = list[i];

					var clob = rvlist.v_clob;
					if (clob == undefined) {
						clob = "내용이 없습니다.";
					} else {
						clob = clob.replace(/\[image#(.*?)\]/g, "");
					}
					var level = rvlist.v_user_level;
					if (level != undefined) {
						level = "m" + level.substr(3, 1);
					} else {
						level = "m1";
					}

					var cmtlevel = rvlist.v_user_cmt_level;
					if (cmtlevel != undefined) {
						cmtlevel = "c" + cmtlevel.substr(6, 1);
					} else {
						cmtlevel = "c1";
					}

					var date = rvlist.v_reg_dtm;
					var vote = rvlist.n_vote;
					if (vote == undefined) {
						vote = 0;
					}
					var rvtype = rvlist.v_rv_typecd;
					if (rvtype != undefined) {
						rvtype = "f" + parseInt((rvtype.substr(6, 1)) - 1);
					} else {
						rvtype = "f0";
					}

					var cDate = changeBeforeDate(date);

					arrHtml.push("<input type=\"hidden\" class=\"i_sReviewcd\" name=\"i_sReviewcd\" value=\"" + rvlist.v_reviewcd + "\">");

					arrHtml.push("<div class=\"photoReviewBox\">");
					arrHtml.push("<div class=\"list btn_listDetail\" id=\"" + rvlist.v_reviewcd + "\">");

					arrHtml.push("			<div class=\"userInfoArea\">");
					arrHtml.push("				<div class=\"photoZ\"><img src=\"" + rvlist.v_user_img + "\" onerror=\"fnNoImageUser(this);\"/></div>");
					arrHtml.push("				<div class=\"userInfoZ\">");
					arrHtml.push("					<div class=\"name\">");
					arrHtml.push("						<p>");
					if (rvlist.v_nickname != undefined && rvlist.v_nickname != "") {
						arrHtml.push("							<span class='nm'>" + rvlist.v_nickname + "</span>");
					} else {
						arrHtml.push("							<span class='nm'>" + getStringReverseHidden(rvlist.v_userid, 3) + "</span>");
					}
					if (rvlist.n_bpcnt > 0) {
						arrHtml.push("							<a href=\"#\" id=\"" + rvlist.v_userid + "\" class=\"btn_beautyProfile\"><img src=\"" + GLOBAL_MOBILE_IMG_URL + "common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
					}
					arrHtml.push("						</p>");
					arrHtml.push("					</div>");
					arrHtml.push("					<div class=\"gradeZone\">");
					arrHtml.push("						<span class=\"ico_memberLevel " + level + "\">" + rvlist.v_levelnm + "</span>");
					arrHtml.push("						<span class=\"ico_communityLevel " + cmtlevel + "\">" + rvlist.v_cmt_levelnm + "</span>");
					arrHtml.push("					</div>");
					arrHtml.push("				</div>");
					arrHtml.push("			</div>");
					if (rvlist.v_rv_typenm !== "일반") {
						arrHtml.push("			<span class=\"ico_flag " + rvtype + "\">" + rvlist.v_rv_typenm + "</span>");
					}

					if (rvlist.v_flag_best == 'Y') {
						arrHtml.push("	<div class=\"bestArea\">");
						arrHtml.push("		<span class=\"ico_best\">Best</span>");
						arrHtml.push("	</div>");
					}
					if (rvlist.v_title == undefined) {
						rvlist.v_title = "제목이 없습니다.";
					}
					arrHtml.push("	<p class=\"subject\"><a href=\"#\" id=\"" + rvlist.v_reviewcd + "\" class=\"btn_listDetail\" >" + rvlist.v_title + "</a></p>");
					arrHtml.push("	<p class=\"cont\"><a href=\"#\" id=\"" + rvlist.v_reviewcd + "\" class=\"btn_listDetail\">" + clob + "</a></p>");
					arrHtml.push("	<div class=\"photoZone\">");
					arrHtml.push("		<ul>");

					if (imglist != undefined && imglist.length > 0) {
						var cnt = 0;

						for (var j = 0; j < imglist.length; j++) {
							if (imglist[j].v_recordid == rvlist.v_reviewcd) {
								++cnt;
								if (cnt <= 4) {
									if (parseInt(rvlist.n_photo_cnt) > 4 && cnt == 4) {
										arrHtml.push("			<li>");
										arrHtml.push("				<div class=\"moreCountZone\">");
										arrHtml.push("					<img src=\"" + imglist[j].v_image_path + "\" alt=\"\" onerror=\"fnNoImage(this);\">");
										arrHtml.push("					<span class=\"moreCount\">" + parseInt(rvlist.n_photo_cnt - 4) + "</span> ");
										arrHtml.push("				</div>");
										arrHtml.push("			</li>");
									} else {
										arrHtml.push("			<li><img src=\"" + imglist[j].v_image_path + "\" alt=\"\" onerror=\"fnNoImage(this);\"/></li>");
									}
								}
							}
						}
					}
					arrHtml.push("		</ul>");
					arrHtml.push("	</div>");
					arrHtml.push("		<div class=\"countBundle\">");
					arrHtml.push("			<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>" + rvlist.reply_cnt + "</em></span>");
					arrHtml.push("			<a href=\"#balloonLike\" id='" + rvlist.v_reviewcd + "' class=\"ico_like " + rvlist.v_reviewcd + "\"><span class=\"hide\">추천</span><em class=\"em_" + rvlist.v_reviewcd + "\">" + vote + "</em></a>");
					arrHtml.push("		</div>");
					arrHtml.push("			<p class=\"date\">" + cDate + "</p>");
					arrHtml.push("		</div>");
					arrHtml.push("</div>");

				}
				arrHtml.push("</div>");

				$(arrHtml.join("")).appendTo($(".div_event_content"));
				arrHtml.push("</div>");
			} else {
				arrHtml.push("<div class=\"nodata\">");
				arrHtml.push("<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
				arrHtml.push("</div>");
				$(arrHtml.join("")).appendTo($(".div_event_content"));
			}
		},

		setEventView : function(object) {
			// var imgPath = "<img src="+obj.v_mobile_img_path+" alt=''/>";
			var obj = object.event_detail;
			var pro = object.Product_list.list;
			var keyword = object.keywordist;
			var textlist = object.textlist;
			var grplist = object.Product_list.grouplist;
			
			try {
				
				PAGE_TAG.PAGE_NAME = "HOME^EVENT^"+obj.v_eventnm;
				
				s.pageName	= PAGE_TAG.PAGE_NAME;
				void(s.t());
			} catch(e) {}
			
			$(".ttlbox .event_ttl").text(obj.v_eventnm);
			$(".ttlbox .p_event_txt").text(obj.v_evt_comment);
			$(".ttlbox .date").text(changeDatePatten(obj.v_event_st_dt) + "~" + changeDatePatten(obj.v_event_en_dt));
			
			var arrEvtDetail = [];
			if(obj.v_mobile_bg_img_path != "" && obj.v_mobile_bg_img_path != undefined){
				arrEvtDetail.push("<img src='"+obj.v_mobile_bg_img_path+"' alt='' class='w100p'>");
				arrEvtDetail.push("<div class='hashTagArea' style='background-color:#"+obj.v_evt_hex_code+";'>");
				for(var j=0; j<textlist.length; j++){
					arrEvtDetail.push("	<p class='tit "+textlist[j].v_stylecd+"'>"+textlist[j].v_text+"</p>");
				}
				
				arrEvtDetail.push("	<p class='hashTags'>");
				for(var j=0; j<keyword.length; j++){
					arrEvtDetail.push("		<span>#"+keyword[j].v_keyword+"</span>");
				}
				arrEvtDetail.push("	</p>");
				arrEvtDetail.push("</div>");
				
				$(arrEvtDetail.join("\n")).appendTo($(".img_content"));
			}
			if(obj.v_mobile_contents != undefined && obj.v_mobile_contents != ""){
				$(".div_content_event_mo").html(obj.v_mobile_contents);
				$(".div_content_event_mo").show();
			}else{
				$(".div_content_event_mo").hide();
			}
			var pro_list = pro.length;
			var length = grplist.length;
			var sale = 0;

			if (length != undefined && length > 0) {
				var theme = [];
				theme.push("<option value='' selected='selected'>테마를 선택해 주세요</option>");
				for (var i = 0; i < length; i++) {
					var arrr2 = [];
					theme.push("<option value='"+grplist[i].n_grp_seqno+"'>"+grplist[i].v_groupnm+"</option>");
					if (pro_list != undefined && pro_list > 0) {
						for (var j = 0; j < pro_list; j++) {
							if (pro[j].n_grp_seqno == grplist[i].n_grp_seqno) {
								arrr2.push("<div class='inner_prd_cont grp_"+grplist[i].n_grp_seqno+"'>");
								arrr2.push("	<div class='itemBox'>");
								arrr2.push("		<a href='"+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+pro[j].v_productcd+"'>");
								arrr2.push("			<div class='thumbImg'>");
								if (pro[j].n_list_price > pro[j].n_price && pro[j].n_plus_evt_give_cnt <= 0) {
									sale = Math.round((pro[j].n_list_price - pro[j].n_price) * 100 / pro[j].n_list_price);
									arrr2.push("				<span class='label_sale'><em class='str'>"+sale+"%</em><em>SALE</em></span>");
								}
								arrr2.push("				<img src='"+ GLOBAL_IMG_URL+"common/blank.png' class='img_src_change' data-chg-src='"+pro[j].v_img_web_path+"'alt=''>");
								arrr2.push("			</div>");
								arrr2.push("			<div class='prodDetail'>");
								arrr2.push("				<p class='brandNm ellipsis'>"+pro[j].v_brandnm+"</p>");
								arrr2.push("				<p class='prodNm'>"+pro[j].v_productnm+"</p>");
								arrr2.push("				<p class='bar'></p>");
								arrr2.push("				<p class='priceZone'>");
								if (pro[j].n_list_price > pro[j].n_price && pro[j].n_plus_evt_give_cnt <= 0) {
									arrr2.push("					<span class='sale'>"+SetNumComma(pro[j].n_list_price)+"</span>");
								}
								arrr2.push("					<span class='price' style='color: #"+obj.v_evt_hex_code+";'>"+SetNumComma(pro[j].n_price)+"</span>");
								arrr2.push("				</p>");
								arrr2.push("				<p class='prd_info'>"+pro[j].v_comment+"</p>");
								arrr2.push("			</div>");
								arrr2.push("		</a>");
								arrr2.push("	</div>");
								arrr2.push("	<div class='btn_shoppingCart'>");
								arrr2.push("<input type='hidden' name='i_arrProductcd' value='"+pro[j].v_productcd+"'/>");
								arrr2.push("<input type='hidden' name='i_arrOptioncd' value='"+pro[j].v_optioncd+"'/>");
								arrr2.push("<input type='hidden' name='i_arrFlagSoloPack' value='"+pro[j].v_flag_solopack+"'/>");
								arrr2.push("		<a href='#' class='btn_cart'></a>");
								arrr2.push("		<a href='#' class='btn_nowBuy'>구매하기</a>");
								arrr2.push("	</div>");
								arrr2.push("</div>");
							}
						}
						$(arrr2.join("\n")).appendTo($(".promotion_prd_cont"));
					}
				}
				$(theme.join("\n")).appendTo($(".themeSel"));
			}	
//			$(".div_event_content").html(obj.v_mobile_contents);
			$(".socialListEvt .likeCnt").text(obj.n_vote_cnt);
			$(".socialListEvt .comment").text(SetNumComma(obj.comment_reply_cnt));
			$(".btn_face").attr("id", obj.v_eventnm + "," + "" + GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + obj.v_eventcd + "," + obj.v_mobile_img_path + "," + obj.v_evt_comment);
			$(".btn_kakaotalk").attr("id", obj.v_eventnm + "," + "" + GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + obj.v_eventcd + "," + obj.v_mobile_img_path + "," + obj.v_evt_comment);
			$(".hotSummEvt>.cont>div>a").addClass("btn_photoreview_reg");
			if (parseInt(obj.n_user_vote) > 0) {
				$(".ico_like").addClass("active");
			}
			

			if (obj.v_eventcd == 'EVT2014OPEN') {
				MobileCommon.ajax({
					url : "/mobile/event/2014/mobile_event_2014_open_view_ajax.do",
					type : "POST",
					dataType : "html",
					data : {
						i_sEventcd : $("input[name='i_sEventcd']").val()
					},
					animation : false,
					success : function(html) {
						$(".eventView .div_event_content").html(html);
					}
				});
			}

			if (obj.v_eventcd == "EVT2014NEWCUSTOMER") {
				MobileCommon.ajax({
					url : "/mobile/event/2014/mobile_event_2014_beauty_view_ajax.do",
					type : "POST",
					dataType : "html",
					data : {
						i_sEventcd : $("input[name='i_sEventcd']").val()
					},
					animation : false,
					success : function(html) {
						$(".eventView .div_event_content").html(html);
					}
				});
			}
			
			$(".themeSel").change(function(event){
				event.preventDefault();
				$(".inner_prd_cont").hide();
				$(".grp_"+$(this).val()).show();
				if($(this).val() == ""){
					$(".inner_prd_cont").show();
				}
			});
		}

	}
};