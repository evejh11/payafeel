
var MobileMyActivity = {
	name : "MobileMyActivity",
	init : function() {
		MobileMyActivity.fn.getPageInit();
		$(".myActivity").show();
	},
	fn : {
		/**
		 * 버튼 이벤트 핸들링
		 */
		addBtnEvent : function() {
			$(".btn_community_info").unbind("click").click(function(event) {
				event.preventDefault();
				
				modalPopup('#communityGuide');
			});
			
            $(".myActivity .tab_cate").unbind("click").click(function(event){
            	event.preventDefault();
            	
                var idx = $(".myActivity .tab_cate").index(this);
                $(".myActivity .tab_cont").hide().eq(idx).show();
                $(".myActivity .tab_cate").removeClass("active").eq(idx).addClass("active");
                
                var id = $(this).attr("id");
                
                $("#i_sFlagReviewType").val(id);
                $("input[name='i_iNowPageNo']").val("1");
                
                MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".span_sort").unbind("click").click(function(event) {
            	$("input[name='i_iNowPageNo']").val("1");
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".span_sort2").unbind("click").click(function(event) {
            	$("input[name='i_iNowPageNo']").val("1");
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".btn_listArea_more").unbind("click").click(function(event) {
            	event.preventDefault();
            	$("input[name='i_iNowPageNo']", "#frm").val(parseInt($("input[name='i_iNowPageNo']", "#frm").val()) + 1);
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".btn_replyArea_more").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	$("input[name='i_iNowPageNo']", "#frm").val(parseInt($("input[name='i_iNowPageNo']", "#frm").val()) + 1);
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".btn_photoArea_more").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	$("input[name='i_iNowPageNo']", "#frm").val(parseInt($("input[name='i_iNowPageNo']", "#frm").val()) + 1);
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".btn_photoReplyArea_more").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	$("input[name='i_iNowPageNo']", "#frm").val(parseInt($("input[name='i_iNowPageNo']", "#frm").val()) + 1);
            	
            	MobileMyActivity.fn.getActivityInfo();
            });
            
            $(".btn_suda_detail").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	var id = $(this).attr("id");
            	var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_view.do?i_sFlagReply=N&i_sMemocd="+id;
            	MobileMyActivity.fn.goDetail(url);
            });
            
            $(".btn_suda_rep_detail").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	var id = $(this).attr("id");
            	var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_view.do?i_sFlagReply=Y&i_sMemocd="+id;
            	MobileMyActivity.fn.goDetail(url);
            });
            
            $(".btn_review_detail").unbind("click").click(function(event) {
            	event.preventDefault();
				var id = $(this).attr("id");
				var sort = $("input[name='i_sFlagSort']").val();
				var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sFlagReply=N&i_sFlagMyPouch=Y&i_sReviewcd="+id+"&i_sFlagSort="+sort;
				MobileMyActivity.fn.goDetail(url);
            	
            });
            
            $(".btn_review_rep_detail").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	var id = $(this).attr("id");
            	var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sFlagReply=Y&i_sReviewcd="+id;
            	MobileMyActivity.fn.goDetail(url);
            	
            });
            
            $(".btn_review_prod").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	var reviewcd = $(this).attr("id");
            	MobileMyActivity.fn.getReviewProdList(reviewcd);
            });
            
            $(".btn_listDetail").unbind("click").click(function(event){
				
			});
		},
		/**
		 * 페이지 로딩 후 페이지 데이터 불러옴
		 */
		getPageInit : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"mobile/my/mobile_my_activity_index_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagReviewType : $("#i_sFlagReviewType").val()
					, i_iNowPageNo : $("#i_iNowPageNo", "#frm").val()
					, i_sFlagSort : $("input[name='sort']:checked").val()
					, i_sFlagInit : "Y"
				}
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					MobileMyActivity.fn.setActivityInfo(data.object);
					
					var mpoint = parseInt(data.object.currentPoint.n_mpoint);
					var cmt_levelno = data.object.userInfo.v_cmt_levelno;
					var levelup_point = data.object.userInfo.n_levelup_point;
					
					MobileActivityStyle.init(mpoint, cmt_levelno, levelup_point);
				}
			});
		},
		goDetail : function(url) {
			
			location.href = url;
		},
		/**
		 * 내가 작성한 포토리뷰, 수다카페 글 목록 ajax
		 */
		getActivityInfo : function() {
			var reviewType = $("#i_sFlagReviewType").val();
			var flagSort = "";
			
			if(reviewType == "suda") {
				flagSort = $("input[name='sort']:checked").val();
			} else {
				flagSort = $("input[name='sort2']:checked").val();
			}
			$("input[name='i_sFlagSort']").val(flagSort);
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"mobile/my/mobile_my_activity_index_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagReviewType : reviewType
					, i_iNowPageNo : $("#i_iNowPageNo", "#frm").val()
					, i_sFlagSort : flagSort
					, i_sFlagInit : "N"
				}
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					MobileMyActivity.fn.setActivityInfo(data.object);
				}
			});
		},
		/**
		 * 내가 작성한 포토리뷰, 수다카페 글 목록 화면에 뿌려줌
		 */
		setActivityInfo : function(object) {
			var list = object.writeList.list;
			var page = object.writeList.page;
			var reviewType = $("#i_sFlagReviewType").val();
			var flagSort = $("input[name='sort']:checked").val();
			
			if(reviewType == "review") {
				flagSort = $("input[name='sort2']:checked").val();
			}
			
			if(object.userInfo != undefined) {
				var levelno = object.userInfo.n_levelno;
				var levelnm = object.userInfo.v_levelnm;
				var cmt_levelnm = object.userInfo.v_cmt_levelnm;
				var cmt_levelno = object.userInfo.v_cmt_levelno;
				var levelup_p = object.userInfo.n_levelup_point;
				
				$(".span_levelno").text(levelno);
				$(".span_levelup_p").text(levelup_p);
				$(".span_cmt_levelno").text(cmt_levelno);
				$(".p_cmtnm").text(cmt_levelnm);
				$(".span_cmt_levelnm").text(cmt_levelnm);
				$(".span_cmt_ico").addClass("c"+cmt_levelno);
				$(".span_levelnm").text(levelnm);
			}
			
			if(object.userBest != undefined) {
				var bestcnt = object.userBest.bestcnt;
				$(".span_reviewCnt>em").text(SetNumComma(bestcnt.n_review_cnt));
				$(".span_sudaCnt>em").text(SetNumComma(bestcnt.n_talk_cnt));
				$(".month3_rpoint").text(SetNumComma(bestcnt.n_mpoint));
				
				var nextlevelPoint = parseInt($(".span_levelup_p").text());
				
				if(nextlevelPoint != 0) {
					var minus_p = nextlevelPoint - parseInt(object.currentPoint.n_mpoint) < 0 ? 0 : nextlevelPoint - parseInt(object.currentPoint.n_mpoint);
					$(".levelup_rpoint").text(SetNumComma(minus_p));
				} else {
					$(".p_levelupArea").hide();
				}
				
				$(".span_w_suda").text(SetNumComma(object.userBest.tabcnt.n_talk_cnt));
				$(".span_voteCnt>em").text(SetNumComma(object.userBest.tabcnt.n_vote_cnt));
				$(".span_w_review").text(SetNumComma(object.userBest.tabcnt.n_review_cnt));
				
				if(object.userBest.nick != undefined) {
					$(".span_nickname").text(object.userBest.nick);
					$(".btn_nick_reg").hide();
				} else {
					$(".span_nickname").text("닉네임이 아직 없습니다.");
					$(".btn_nick_mod").hide();
				}
			}
			
			if(object.cmtCount != undefined) {
				var cmtCount = object.cmtCount;
				
				$(".em_attend").text(cmtCount.n_attend_cnt);
				
				if(parseInt(cmtCount.n_attend_cnt) >= parseInt(object.day) - 1) {
					$(".p_attendText").text("(개근중이시네요)");
				}
				
				$(".em_before_review").text(cmtCount.n_before_review_cnt);
				$(".em_entry").text(cmtCount.n_event_entry_cnt);
				$(".em_winner").text(cmtCount.n_event_winner_cnt);
				$(".em_mission").text(cmtCount.n_before_mission_cnt);
			}
			
			if(reviewType == "suda") {
				if(flagSort == "W") {
					$(".replyArea").eq(0).hide();
					var arrHtml = [];
					
					if(list != undefined && list.length > 0) {
						for(var i = 0; i < list.length; i++) {
							arrHtml.push("<div class=\"chatterListBox\">");
							arrHtml.push("	<div class=\"list\">");
							arrHtml.push("		<a href=\"#\" class=\"btn_suda_detail\" id=\""+list[i].v_memocd+"\">");
							
							if(list[i].v_flag_best == "Y") {
								arrHtml.push("			<span class=\"ico_best\">best</span>");
							}
							
							if(list[i].v_image_path != "" && list[i].v_image_path != undefined) {
								arrHtml.push("			<div class=\"thumbImg\"><img src=\""+list[i].v_image_path+"\" alt=\"\" /></div>");
							}
							arrHtml.push("			<div class=\"cont\">");
							arrHtml.push("				<p class=\"subj\">");
							
							if(list[i].v_reg_channel == "MOBILE") {
								arrHtml.push("					<span class=\"sp_ico i1\">모바일</span>");
							}
							arrHtml.push("				"+list[i].v_title+"</p>");
							arrHtml.push("				<p class=\"category\">"+list[i].v_talknm+"</p>");
							arrHtml.push("				<div class=\"countBundle\">");
							arrHtml.push("					<span class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</span>");
							arrHtml.push("					<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+list[i].n_reply_cnt+"</em></span>");
							arrHtml.push("					<span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+list[i].n_vote+"</em></span>");
							arrHtml.push("				</div>");
							arrHtml.push("			</div>");
							arrHtml.push("		</a>");
							arrHtml.push("	</div>");
							arrHtml.push("</div>");
						}
						
					} else {
						arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
					}
					
					if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
						$(".btn_listArea_more").hide();
					} else {
						$(".btn_listArea_more").show();
					}
					
					if(parseInt(page.i_iNowPageNo) == 1) {
						$(".div_listArea").html(arrHtml.join(""));
					} else {
						$(".div_listArea").append(arrHtml.join(""));
					}
					
					$(".listArea").eq(0).show();
				} else {
					$(".listArea").eq(0).hide();
					
					var arrHtml = [];
					
					if(list != undefined && list.length > 0) {
						for(var i = 0; i < list.length; i++) {
							var content = list[i].v_contents;
							
							if(list[i].v_image_path != undefined && list[i].v_image_path != "") {
								var imgPath = list[i].v_image_path.replace("_100", "");
								content = content.replace(/\[image#(.*?)\]/g, "<img src=\""+imgPath+"\"/>");
							}
							
							
							arrHtml.push("<div class=\"chatterListBox\">");
							arrHtml.push("	<div class=\"list\">");
							arrHtml.push("		<a href=\"#\" class=\"btn_suda_rep_detail\" id=\""+list[i].v_recordid+"\">");
							arrHtml.push("			<div class=\"cont\">");
							arrHtml.push("				<p class=\"subj\">");
							
							if(list[i].v_reg_channel == "MOBILE") {
								arrHtml.push("					<span class=\"sp_ico i1\">모바일</span>");
							}
							
							arrHtml.push("						"+content+"</p>");
							arrHtml.push("				<div class=\"countBundle\">");
							arrHtml.push("					<span class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</span>");
							
							if(parseInt(list[i].n_level) == 1) {
								arrHtml.push("					<span class=\"commentType btn_replyShow\" id=\""+list[i].v_replycd+"\">댓글의 댓글 "+list[i].n_child_cnt+"개</span>");
							} else {
								arrHtml.push("					<span class=\"commentType2\">대댓글입니다.</span>");
							}
							
							arrHtml.push("				</div>");
							arrHtml.push("			</div>");
							arrHtml.push("		</a>");
							arrHtml.push("	</div>");
							arrHtml.push("</div>");
						}
					} else {
						arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
					}
					
					if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
						$(".btn_replyArea_more").hide();
					} else {
						$(".btn_replyArea_more").show();
					}
					
					if(parseInt(page.i_iNowPageNo) == 1) {
						$(".div_replyArea").html(arrHtml.join(""));
					} else {
						$(".div_replyArea").append(arrHtml.join(""));
					}
					
					$(".replyArea").eq(0).show();
				}
			} else {
				if(flagSort == "W" || flagSort == "N" || flagSort == "B") {
					$(".replyArea").eq(1).hide();
					var arrHtml = [];
					var nickname = $(".span_nickname").text();
					var levelno = $(".span_levelno").text();
					var cmt_levelno = $(".span_cmt_levelno").text();
					var levelnm = $(".span_levelnm").text();
					var cmt_levelnm = $(".span_cmt_levelnm").text();
					var imglist = object.writeList.imglist;
					
					if(list != undefined && list.length > 0) {
						for(var i = 0; i< list.length; i++) {
							
							var clob = list[i].v_clob;
							var remove_html = "";
							
							if(clob != undefined && clob != "") {
								remove_html = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/\[image#(.*?)\]/g, "");
							}
							
							arrHtml.push("<div class=\"photoReviewBox\">");
							arrHtml.push("	<div class=\"userInfoArea\">");
							if(list[i].v_proimag_url != undefined && list[i].v_proimag_url != "") {
								arrHtml.push("	<div class=\"photoZ\"><img src=\""+list[i].v_proimag_url+"\" alt=\"프로필이미지\" onerror=\"fnNoImageUser(this);\"></div>");
							}
							arrHtml.push("		<div class=\"userInfoZ\">");
							arrHtml.push("			<div class=\"name\">");
							arrHtml.push("				<p>");
							arrHtml.push("					<span class=\"nm\">"+nickname+"</span>");
							if(parseInt(list[i].n_bprofile) > 0 ) {
								arrHtml.push("				<a href=\"#\" class=\"btn_beautyProfile\" id=\""+list[i].v_userid+"\"><img src=\""+GLOBAL_IMG_URL+"common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
							}
							arrHtml.push("				</p>");
							arrHtml.push("			</div>");
							arrHtml.push("			<div class=\"gradeZone\">");
							arrHtml.push("				<span class=\"ico_memberLevel m"+levelno+"\">"+levelnm+"</span>");
							arrHtml.push("				<span class=\"ico_communityLevel c"+cmt_levelno+"\">"+cmt_levelnm+"</span>");
							arrHtml.push("			</div>");
							arrHtml.push("		</div>");
							arrHtml.push("	</div>");
							if(list[i].v_rv_typecd == "DC_T002") {
								arrHtml.push("	<span class=\"ico_flag f1\">뷰티 테스터</span>");
							} else if(list[i].v_rv_typecd == "DC_T003") {
								arrHtml.push("	<span class=\"ico_flag f2\">리본박스</span>");
							}
						
						if(list[i].v_flag_best == "Y") {

							arrHtml.push("	<div class=\"bestArea\">");
							arrHtml.push("		<span class=\"ico_best\">best</span>");
							arrHtml.push("	</div>");
						}
							arrHtml.push("	<div id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\">");
							arrHtml.push("	<p class=\"subject\"><a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\" >"+list[i].v_title+"</a></p>");
							arrHtml.push("	<p class=\"cont\">"+getByteString(remove_html, 50)+"</p>");
							arrHtml.push("	<div class=\"photoZone\">");
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
												arrHtml.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" /></li>");
											}
										}
									}
								}
							}
								
							arrHtml.push("		</ul>");
							arrHtml.push("	</div></div>");
							
							arrHtml.push("	<div class=\"countBundle\">");
							arrHtml.push("		<a href=\"#\" class=\"btn_prodview btn_review_prod\" id=\""+list[i].v_reviewcd+"\"><span>리뷰상품 보기</span></a>");
							arrHtml.push("		<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+SetNumComma(list[i].n_reply_cnt)+"</em></span>");
							arrHtml.push("		<span class=\"ico_like\"><span class=\"hide\">좋아요</span><em>"+SetNumComma(list[i].n_vote_total)+"</em></span>");
							arrHtml.push("	</div>");
							arrHtml.push("	<p class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</p>");
							arrHtml.push("</div>");
						}
					} else {
						arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
					}
					
					if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
						$(".btn_photoArea_more").hide();
					} else {
						$(".btn_photoArea_more").show();
					}
					
					if(parseInt(page.i_iNowPageNo) == 1) {
						$(".div_photoArea").html(arrHtml.join(""));
					} else {
						$(".div_photoArea").append(arrHtml.join(""));
					}
					
					$(".listArea").eq(1).show();
				} else {
					$(".listArea").eq(1).hide();
					
					var arrHtml = [];
					
					if(list != undefined && list.length > 0) {
						for(var i = 0; i < list.length; i++) {
							var content = list[i].v_contents;
							
							if(list[i].v_image_path != undefined && list[i].v_image_path != "") {
								var imgPath = list[i].v_image_path.replace("_100", "");
								content = content.replace(/\[image#(.*?)\]/g, "<img src=\""+imgPath+"\"/>");
							}
							
							arrHtml.push("<div class=\"chatterListBox\">");
							arrHtml.push("	<div class=\"list\">");
							arrHtml.push("		<a href=\"#\" class=\"btn_review_rep_detail\" id=\""+list[i].v_recordid+"\">");
							arrHtml.push("			<div class=\"cont\">");
							arrHtml.push("				<p class=\"subj\">");
							
							if(list[i].v_reg_channel == "MOBILE") {
								arrHtml.push("					<span class=\"sp_ico i1\">모바일</span>");
							}
							
							arrHtml.push("						"+content+"</p>");
							arrHtml.push("				<div class=\"countBundle\">");
							arrHtml.push("					<span class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</span>");
							
							if(parseInt(list[i].n_level) == 1) {
								arrHtml.push("					<span class=\"commentType\" id=\""+list[i].v_replycd+"\">댓글의 댓글 "+list[i].n_child_cnt+"개</span>");
							} else {
								arrHtml.push("					<span class=\"commentType2\">대댓글입니다.</span>");
							}
							
							arrHtml.push("				</div>");
							arrHtml.push("			</div>");
							arrHtml.push("		</a>");
							arrHtml.push("	</div>");
							arrHtml.push("</div>");
						}
					} else {
						arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
					}
					
					if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
						$(".btn_photoReplyArea_more").hide();
					} else {
						$(".btn_photoReplyArea_more").show();
					}
					
					if(parseInt(page.i_iNowPageNo) == 1) {
						$(".div_photoReplyArea").html(arrHtml.join(""));
					} else {
						$(".div_photoReplyArea").append(arrHtml.join(""));
					}
					
					$(".replyArea").eq(1).show();
				}
			}
			
			MobileMyActivity.fn.addBtnEvent();
		},
		getReviewProdList : function(reviewcd) {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"mobile/shop/mobile_shop_review_product_ajax.do"
				, dataType : "json"
				, data : {
					i_sReviewcd : reviewcd
				}
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyActivity.fn.setReviewProdList(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setReviewProdList : function(list) {
			if(list != undefined && list.length > 0) {
				var arrHtml = [];
				for(var i = 0; i < list.length; i++) {

					arrHtml.push("<li>");
					arrHtml.push("	<a href=\"#\" class=\"btn_prod_detail\" id=\""+list[i].v_productcd+"\">");
					arrHtml.push("		<div class=\"prodImg\">");
					arrHtml.push("			<img src=\""+list[i].v_img_web_path+"\" alt=\""+list[i].v_productnm+"\" />");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class=\"detail\">");
					arrHtml.push("			<p class=\"brandNm\">"+list[i].v_brandnm+"</p>");
					arrHtml.push("			<p class=\"prodNm\">"+list[i].v_productnm+"</p>");
					arrHtml.push("			<p class=\"option\">"+list[i].v_optionnm+"</p>");
					arrHtml.push("			<p class=\"priceZone\">");
				if(parseInt(list[i].n_list_price) != parseInt(list[i].n_price)) {
					arrHtml.push("				<span class=\"sale\"><em>"+SetNumComma(list[i].n_list_price)+"</em>원</span>");
				}
					arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(list[i].n_price)+"</em>원</span>");
					arrHtml.push("			</p>");
					arrHtml.push("		</div>");
					arrHtml.push("	</a>");
					arrHtml.push("</li>");
				}
				
				$(".div_prodList>ul").html(arrHtml.join(""));
				modalPopup("#modalPopupReviewProd");
				MobileMyActivity.fn.addPopBtnEvent();
			}
		},
		addPopBtnEvent : function() {
            $(".btn_prod_detail").unbind("click").click(function(event) {
            	event.preventDefault();
            	MobileBodyStart.goProductDetail($(this).attr("id"));
//            	if (GLOBAL_FLAG_APP_NEW == "Y") {
//        			try {
//        				if(GLOBAL_MOBILE_OS == "AND") {
//        					MobileBodyStart.setLoginUserInfo();
//        				}
//        				else {
//        					window.webkit.messageHandlers.requestUserInfo.postMessage(null);
//        				}
//        			}catch(e){
//        				console.log(e);
//        			}
//        			var arrParam = [];
//        			if(GLOBAL_LOGIN_KEY != "") {
//        				$("input[name='i_sLoginKey']", $("form[name='frm']")).remove();
//        				arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
//        			}
//        			if(GLOBAL_LOGIN_TYPE != "") {
//        				$("input[name='i_sLoginType']", $("form[name='frm']")).remove();
//        				arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
//        			}
//        			$("input[name='i_sDeviceNum']", $("form[name='frm']")).remove();
//        			arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
//        			$(arrParam.join("")).appendTo($("form[name='frm']"));
//        		}
//            	var url = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//            	
//            	$("form[name='frm']").attr("action", url).submit();
            });
		}
	}
};

/**
 * 레벨 그래프
 */
var MobileActivityStyle = {
	init : function(point, cmt_levelno, levelup_point) {
		 //레벨 그래프
		
		var idx = parseInt(cmt_levelno) - 1;
		
		var pre_point = 0;
		if(cmt_levelno == 1) {
			pre_point = 0;
		} else if(cmt_levelno == 2) {
			pre_point = 2000;
		} else if(cmt_levelno == 3) {
			pre_point = 5000;
		} else if(cmt_levelno == 4) {
			pre_point = 9000;
		}
		
		var per = parseInt(((point-pre_point) * 100 / levelup_point) );
		
		$(".pointGraph>ul li").removeClass("active");
		$(".pointGraph>ul li").eq(idx).addClass("active");
		var num= per+'%';
		var $currentPoint = $(".currentPoint").eq(idx);
		var $currentGauge = $(".currentGauge").eq(idx);
		
		$currentPoint.css("left", num);
		$currentGauge.css("width", num);
		
		for(var i=0; i<idx; i++) {
			$(".currentPoint").eq(i).css("left", "100%");
			$(".currentGauge").eq(i).css("width", "100%");
		}
		
		$currentPoint.html(SetNumComma(point));
	}
};