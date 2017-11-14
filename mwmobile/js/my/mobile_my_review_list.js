
var MobileMyReview = {
	name : "MobileMyReview",
	init : function() {
		MobileMyReview.fn.getPageInit();
		MobileMyReview.fn.addScrollEvent();
		MobileReviewCommStyle.init();
	},
	isLoadingList : false,
	pageStack : [],
	fn : {
		addBtnEvent : function() {
			$(".tab_cate").unbind("click").click(function(event) {
				event.preventDefault();
				
				MobileMyReview.pageStack = new Array();
				$(".tab_cate").removeClass("active");
				$(this).addClass("active");
				
				var id = $(this).attr("id");
				var idx = $(".tab_cate").index($(this));
				
				$("#i_sFlagTab").val(id);
				
				$(".tab_cont").hide();
				$(".tab_cont").eq(idx).show();
				
				$("#i_iNowPageNo").val("1");
				
				MobileMyReview.fn.getReviewList();
			});
			
			$(".btn_review_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				var id = $(this).attr("id");
				
				var obj = {
					i_sFlagAction : "D"
					, i_sReviewcd : id
				};
				
				showConfirmBox({
					message : "글을 삭제하실 경우 적립된 블루리본포인트도 차감되어요.<br/>정말 삭제하시겠어요?"
					, ok_func : function() {
						MobileReviewComm.fn.goSave(obj);
					}
				});
			});
			
			$(".btn_review_reg").unbind("click").click(function(event) {
				event.preventDefault();
				
				if(MobileReviewComm.fn.fnValidate()) {
					var obj = {
						i_iRecomPoint : $("input[name='i_iRecomPoint']:checked").val()
						, i_sContent : $("#i_sContent").val()
						, i_sOrdercd : $("#i_sReviewOrdercd").val()
						, i_sProductcd : $("#i_sProductcd").val()
						, i_sFlagAction : "R"
						, i_sFlagRebuy : $("input[name='i_sFlagRebuy']:checked").val()
						, i_arrOptioncd : []
					};
					
					$("input[name='i_arrOptioncd']").each(function() {
						if(!$(this).is(":disabled")) {
							obj.i_arrOptioncd.push($(this).val());
						}
					});
					
					MobileReviewComm.fn.goSave(obj, "");
				}
			});
		},
		addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				var flag = $("#i_sFlagTab").val();
				
				if(!MobileMyReview.isLoadingList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 100) ) &&
						parseInt($("#i_iNowPageNo").val()) < parseInt($("#i_iTotalPageCnt").val()) && parseInt($("#i_iRecordCnt").val()) > $("li", ".div_"+flag).size()
						&& $("li", ".div_"+flag).size() > 0) {
					if(MobileMyReview.isLoadingList) {
						return;
					}
					
					MobileMyReview.isLoadingList = true;
					
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = MobileMyReview.pageStack[0];
					
					for(var i in MobileMyReview.pageStack) {
						if(parseInt(result) < parseInt(MobileMyReview.pageStack[i])) {
							result = MobileMyReview.pageStack[i];
						}
					}
					
					$("#i_iNowPageNo").val(parseInt(result) + 1);
					setTimeout(function() {
						MobileMyReview.fn.getReviewList();
					}, 1000);
				} else if(!MobileMyReview.isLoadingList && $(window).scrollTop() == 0 &&
						parseInt($("#i_iNowPageNo").val()) > 1 && parseInt($("#i_iRecordCnt").val()) > 0 &&
						$("li", ".div_"+flag).size() > 0) {
					var result = MobileMyReview.pageStack[0];
					for(var i in MobileMyReview.pageStack) {
						if(parseInt(result) > parseInt(MobileMyReview.pageStack[i])) {
							result = MobileMyReview.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						$("#i_iNowPageNo").val(parseInt(result) - 1);
						MobileMyReview.fn.getReviewList();
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
			
			if(MobileMyReview.isLoadingList) {
				return;
			}
			
			MobileMyReview.isLoadingList = true;
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_list_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagInit : "Y"
					, i_iNowPageNo : $("#i_iNowPageNo").val()
					, i_sFlagTab : $("#i_sFlagTab").val()
				}
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyReview.isLoadingList = false;
						MobileMyReview.fn.setReviewList(data.object);
						
						var page = data.object.review.page;
						if($.inArray(parseInt(page.i_iNowPageNo), parseInt(MobileMyReview.pageStack)) == -1) {
							MobileMyReview.pageStack.push(page.i_iNowPageNo);
						}
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
				, error : function() {
					MobileMyReview.isLoadingList = false;
				}
			});
		},
		getReviewList : function() {
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_list_ajax.do"
				, dataType : "json"
				, data : {
					i_sFlagInit : "N"
					, i_iNowPageNo : $("#i_iNowPageNo").val()
					, i_sFlagTab : $("#i_sFlagTab").val()
				}
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyReview.isLoadingList = false;
						
						MobileMyReview.fn.setReviewList(data.object);
						
						var page = data.object.review.page;
						if($.inArray(parseInt(page.i_iNowPageNo), parseInt(MobileMyReview.pageStack)) == -1) {
							MobileMyReview.pageStack.push(page.i_iNowPageNo);
						}
						
						hideScrollLoadingBox();
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}, error : function() {
					MobileMyReview.isLoadingList = false;
				}
			});
		},
		setReviewList : function(object) {
			var page = object.review.page;
			var list = object.review.list;
			
			var tabcnt = object.tabcnt;
			
			if(tabcnt != undefined) {
				$(".span_before").text(tabcnt.before);
				$(".span_after").text(tabcnt.after);
			}
			
			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
			$("#i_iRecordCnt").val(page.i_iRecordCnt);
			
			var tabid = $("#i_sFlagTab").val();
			
			if(tabid == "before") {
				var arrHtml = [];
				
				if(list != undefined && list.length > 0) {
					
					for(var i=0; i<list.length; i++) {
						var optionnm = "";
						if(parseInt(list[i].n_option_cnt) > 1) {
							optionnm = list[i].v_optionnm == undefined ? "" : list[i].v_optionnm.replace(/!!/gi, ", ");
							
						}
						
						arrHtml.push("<li>");
						arrHtml.push("	<div class=\"prodbox\">");
						arrHtml.push("		<div class=\"thumbImg\">");
						arrHtml.push("			<img src=\""+list[i].v_img_path+"\" alt=\"\">");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class=\"prodDetail\">");
						arrHtml.push("			<p class=\"brandNm ellipsis\">"+list[i].v_brandnm+"</p>");
						arrHtml.push("			<p class=\"prodNm\">"+list[i].v_productnm+" "+optionnm+"</p>");
						arrHtml.push("			<p class=\"date\">구매확정일 : "+changeDateHour(list[i].v_complete_dtm)+"</p>");        
						arrHtml.push("			<span class=\"btn_ty3 v3\"><a href=\"#\" class=\"btn_commentWrite\" id=\""+list[i].v_ordercd+"/"+list[i].v_productcd+"/my\"><span>구매후기 작성</span></a></span>");
/*						arrHtml.push("			<span class=\"btn_ty3 v3\"><a href=\"#\" class=\"btn_commentWrite\" id=\""+list[i].v_ordercd+"/"+list[i].v_productcd+"/my\"><span>구매후기 작성</span></a></span>");
*/						arrHtml.push("		</div>");
						arrHtml.push("	</div>");
						arrHtml.push("</li>");
					}
					
				} else {
					arrHtml.push("<li>");
					arrHtml.push("	<div class=\"nodata\">");
					arrHtml.push("		<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
					arrHtml.push("	</div>");
					arrHtml.push("</li>");
				}
				
				if(parseInt(page.i_iNowPageNo) == 1) {
					$(".div_before>ul").html(arrHtml.join(""));
				} else {
					$(".div_before>ul").append(arrHtml.join(""));
				}
				
				MobileReviewComm.init();
			} else {
				var arrHtml = [];
				
				if(list != undefined && list.length > 0) {
					
					for(var i=0; i<list.length; i++) {
						var optionnm = "";
						if(parseInt(list[i].n_option_cnt) > 1) {
							optionnm = list[i].v_optionnm == undefined ? "" : list[i].v_optionnm.replace(/!!/gi, ", ");
						}
						
						arrHtml.push("<li>");
						arrHtml.push("	<div class=\"prodbox\">");
						arrHtml.push("		<div class=\"thumbImg\">");
						arrHtml.push("			<img src=\""+list[i].v_img_path+"\" alt=\"\">");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class=\"prodDetail\">");
						arrHtml.push("			<p class=\"brandNm ellipsis\">"+list[i].v_brandnm+"</p>");
						arrHtml.push("			<p class=\"prodNm\">"+list[i].v_productnm+" "+optionnm+"</p>");
						arrHtml.push("			<p class=\"txt\" style=\"word-break:break-all;\">"+list[i].v_content+"</p>");
						arrHtml.push("			<div class=\"prodEvalu\">");
						arrHtml.push("				<span class=\"gradeType grade0"+list[i].n_recom_point+"\"><span class=\"hide\">"+list[i].n_recom_point+"</span></span>");
						
						if(list[i].v_flag_rebuy == "Y") {
							arrHtml.push("			<span class=\"ico_flag f4\">재구매할거예요</span>");
						}
						
						if(list[i].v_flag_prebuy == "Y") {
							arrHtml.push("			<span class=\"ico_flag f5\">재구매했어요</span>");
						}
						arrHtml.push("			</div>");
						arrHtml.push("			<span class=\"btn_ty3 v3\"><a href=\"#\" class=\"btn_delete btn_review_del\" id=\""+list[i].v_reviewcd+"\"><span>삭제</span></a></span>");
						arrHtml.push("		</div>");
						arrHtml.push("	</div>");
						arrHtml.push("</li>");
					}
				} else {
					arrHtml.push("<li>");
					arrHtml.push("	<div class=\"nodata\">");
					arrHtml.push("		<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
					arrHtml.push("	</div>");
					arrHtml.push("</li>");
				}
				
				if(parseInt(page.i_iNowPageNo) == 1) {
					$(".div_after>ul").html(arrHtml.join(""));
				} else {
					$(".div_after>ul").append(arrHtml.join(""));
				}
			}
			
			MobileMyReview.fn.addBtnEvent();
		},
	}
};

