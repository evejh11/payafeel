
var MobileMyBeautytest = {
	name : "MobileMyBeautytest",
	init : function() {
		MobileMyBeautytest.fn.getPageInit();
		MobileMyBeautytest.fn.addScrollEvent();
	},
	isLoadingList : false,
	pageStack : [],
	fn : {
		addBtnEvent : function() {
			$(".tab_cate").unbind("click").click(function(event) {
				event.preventDefault();
				
				MobileMyBeautytest.pageStack = new Array();
				$(".tab_cate").removeClass("active");
				$(this).addClass("active");
				
				var id = $(this).attr("id");
				var idx = $(".tab_cate").index($(this));
				
				$("#i_sFlagTab").val(id);
				
				$(".tab_cont").hide();
				$(".tab_cont").eq(idx).show();
				
				$("#i_iNowPageNo").val("1");
				
				MobileMyBeautytest.fn.getBeautytestList();
			});
			
			$(".btn_detail").unbind("click").click(function(event) {
				event.preventDefault();
				
				var eventcd = $(this).attr("id");
				
				location.href = "/mobile/event/mobile_event_beauty_view.do?i_sEventcd="+eventcd;
			});
			
			$(".btn_review_detail").unbind("click").click(function(event) {
				event.preventDefault();
				
				var id = $(this).attr("id");
				location.href = "/mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+id;
			});
		},
		addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				var flag = $("#i_sFlagTab").val();
				
				var target = "";
				if(flag == "mission") {
					target = $("li", ".ul_before");
				} else {
					target = $(".div_reviewBox");
				}
				
				if(!MobileMyBeautytest.isLoadingList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 292) ) &&
						parseInt($("#i_iNowPageNo").val()) < parseInt($("#i_iTotalPageCnt").val()) && parseInt($("#i_iRecordCnt").val()) > target.size()
						&& target.size() > 0) {
					
					var result = MobileMyBeautytest.pageStack[0];
					for(var i in MobileMyBeautytest.pageStack) {
						if(parseInt(result) < parseInt(MobileMyBeautytest.pageStack[i])) {
							result = MobileMyBeautytest.pageStack[i];
						}
					}
					
					$("#i_iNowPageNo").val(parseInt(result) + 1);
					
					MobileMyBeautytest.fn.getBeautytestList();
					
				} else if(!MobileMyBeautytest.isLoadingList && $(window).scrollTop() == 0 &&
						parseInt($("#i_iNowPageNo").val()) > 1 && parseInt($("#i_iRecordCnt").val()) > 0 &&
						target.size() > 0) {
					var result = MobileMyBeautytest.pageStack[0];
					
					for(var i in MobileMyBeautytest.pageStack) {
						if(parseInt(result) > parseInt(MobileMyBeautytest.pageStack[i])) {
							result = MobileMyBeautytest.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						$("#i_iNowPageNo").val(parseInt(result) - 1);
						MobileMyBeautytest.fn.getBeautytestList();
					}
				}
			});
		},
		getPageInit : function() {
			$(".tab_cate").removeClass("active");
			
			var id = $("#i_sFlagTab").val();
			$("#"+id).addClass("active");
			
			$(".tab_cont").hide();
			$(".div_"+id).show();
			
			if(MobileMyBeautytest.isLoadingList) {
				return;
			}
			
			MobileMyBeautytest.isLoadingList = true;
			
			MobileCommon.ajax({
				url : "/mobile/my/mobile_my_beautytest_list_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagTab : $("#i_sFlagTab").val()
					, i_sFlagInit : "Y"
					, i_iNowPageNo : $("#i_iNowPageNo").val()
				}
				, async : false
				, animation : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyBeautytest.isLoadingList = false;
						MobileMyBeautytest.fn.setBeautytestList(data.object);
						var page = data.object.beauty.page;
						if($.inArray(parseInt(page.i_iNowPageNo), parseInt(MobileMyBeautytest.pageStack)) == -1) {
							MobileMyBeautytest.pageStack.push(page.i_iNowPageNo);
						}
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}, error : function() {
					MobileMyBeautytest.isLoadingList = false;
				}
			});
		},
		getBeautytestList : function() {
			if(MobileMyBeautytest.isLoadingList) {
				return;
			}
			
			MobileMyBeautytest.isLoadingList = true;
			
			MobileCommon.ajax({
				url : "/mobile/my/mobile_my_beautytest_list_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagTab : $("#i_sFlagTab").val()
					, i_sFlagInit : "N"
					, i_iNowPageNo : $("#i_iNowPageNo").val()
				}
				, async : false
				, animation : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyBeautytest.isLoadingList = false;
						
						MobileMyBeautytest.fn.setBeautytestList(data.object);
						
						var page = data.object.beauty.page;
						if($.inArray(parseInt(page.i_iNowPageNo), parseInt(MobileMyBeautytest.pageStack)) == -1) {
							MobileMyBeautytest.pageStack.push(page.i_iNowPageNo);
						}
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}, error : function() {
					MobileMyBeautytest.isLoadingList = false;
				}
			});
		},
		setBeautytestList : function(object) {
			var tabcnt = object.tabcnt;
			var page = object.beauty.page;
			var list = object.beauty.list;
			var imglist = object.beauty.imglist;
			if(tabcnt != undefined) {
				$(".span_before").text(tabcnt.mission);
				$(".span_after").text(tabcnt.after);
			}
			
			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
			$("#i_iRecordCnt").val(page.i_iRecordCnt);
			
			var tabid = $("#i_sFlagTab").val();
			if(tabid == "mission") {
				var arrHtml = [];
				if(list != undefined && list.length > 0) {
					for(var i=0; i<list.length; i++) {
						arrHtml.push("<li>");
						arrHtml.push("	<div class=\"btBox\">");
						arrHtml.push("		<a href=\"#\" class=\"btn_detail\" id=\""+list[i].v_eventcd+"\">");
						arrHtml.push("			<img src=\""+list[i].v_img_path+"\" alt=\""+list[i].v_eventnm+"\"/>");
						arrHtml.push("			<div class=\"ttlbox\">");
						arrHtml.push("				<p class=\"ttl\">"+list[i].v_eventnm+"</p>");
						arrHtml.push("				<p class=\"txt\">아모레퍼시픽몰 뷰티테스터 모집 (총 40명)</p>");
						arrHtml.push("				<div class=\"bottom\">");
						arrHtml.push("					<p class=\"date\">"+changeDatePatten(list[i].v_event_en_dt)+" 까지</p>");
                        arrHtml.push("					<p class=\"count\">"+SetNumComma(list[i].n_entry_cnt)+"명 신청중</p>");       
                        arrHtml.push("				</div>");
                        arrHtml.push("			</div>");
                        arrHtml.push("		</a>");
                        arrHtml.push("	</div>");
                        arrHtml.push("</li>");
					}
					
					$(".current").css("background", "#e4e4e4");
					$(".current>ul").css("border", "1px solid #cccccc");
				} else {
					arrHtml.push("<li>");
					arrHtml.push("	<div class=\"nodata\">");
					arrHtml.push("		<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
					arrHtml.push("	</div>");
					arrHtml.push("</li>");
					
					$(".current").css("background", "#ffffff");
					$(".current>ul").css("border", "1px solid #ffffff");
					
					//$(".ul_before").html(arrHtml.join(""));
				}
				
				if(parseInt(page.i_iNowPageNo) == 1) {
					$(".ul_before").html(arrHtml.join(""));
				} else {
					$(".ul_before").append(arrHtml.join(""));
				}
			} else {
				var arrHtml = [];
				
				if(list != undefined && list.length > 0) {
					for(var i=0; i<list.length; i++) {
						
						var clob = list[i].v_clob;
						var remove_html = "";
						
						if(clob != undefined && clob != "") {
							remove_html = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/\[image#(.*?)\]/g, "");
						}
						
						arrHtml.push("<div class=\"photoReviewBox div_reviewBox\">");
						arrHtml.push("	<span class=\"ico_flag f1\">뷰티 테스터</span>");
						arrHtml.push("	<span class=\"ico_topReview\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_topReview.png\" alt=\"TOP리뷰\"></span>");
						arrHtml.push("	<p class=\"subject\"><a href=\"#\" class=\"btn_review_detail\" id=\""+list[i].v_reviewcd+"\">"+list[i].v_title+"</a></p>");
                        arrHtml.push("	<p class=\"cont\"><a href=\"#\">"+remove_html+"</a></p>");
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
                        arrHtml.push("	</div>");
                        arrHtml.push("	<div class=\"info\">");
                        arrHtml.push("		<div class=\"countBundle\">");
                        arrHtml.push("			<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+SetNumComma(list[i].n_reply_cnt)+"</em></span>");
                        arrHtml.push("			<span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+SetNumComma(list[i].n_vote_total)+"</em></span>");
                        arrHtml.push("		</div>");
                        arrHtml.push("		<p class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</p>");
                        arrHtml.push("	</div>");
                        arrHtml.push("</div>");
					}
				} else {
					arrHtml.push("	<div class=\"nodata\">");
					arrHtml.push("		<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
					arrHtml.push("	</div>");
					$(".topReview").html(arrHtml.join(""));
				}
				
				if(parseInt(page.i_iNowPageNo) == 1) {
					$(".topReview").html(arrHtml.join(""));
				} else {
					$(".topReview").append(arrHtml.join(""));
				}
			}
			
			MobileMyBeautytest.fn.addBtnEvent();
		}
	}
};