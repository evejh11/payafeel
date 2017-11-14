/**
 * 모바일 공지사항의 이벤트 처리를 위한 Javascript
 */
var	MobileNotice = {
	name : "MobileNotice",
	
	init : function() {
		MobileNotice.fn.setSubMenuChange();

		if (-1 < location.href.indexOf("/mobile_cstm_notice_list.do")) {
			
			MobileNotice.fn.getPageInit();

			$('#btnSearch').click(MobileNotice.fn.getSearch);
			$('.btn_more').click(MobileNotice.fn.getMore);
		} else {
			$('.btn_back').attr('href', '#');
			$('.btn_back').click(MobileNotice.fn.historyBack);
			$('.btnList').click(MobileNotice.fn.historyBack);

			MobileNotice.fn.getNoticeInfoAndView();
		}
	},

	fn : {
		/**
		 * 고객센터 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_URL +"mobile/cstm/" + $(this).val() + ".do";
			});
		},
		/**
		 * page 초기 로딩
		 */
		getPageInit : function () {
			
			var parameter = MobileNotice.fn.getParameter();
			
			parameter.i_sTypecd = $("#i_sOldTypecd").val(); 
			parameter.i_sFlagPageInit = "Y";
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_notice_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var category = data.object.noticeCategory;
						var notice = data.object.notice;
						
						MobileNotice.fn.setNoticeList(notice.page, notice.list);
						MobileNotice.fn.setCategory(category);
						
						$('#i_sFlagHistoryBack').val("N");
						
					} else {
						alert(data.message);
					}
				}
			});
		},

		/**
		 * 공지사항 목록 조회
		 */
		getNoticeListAndView : function(i_iNowPageNo) {
			var parameter = MobileNotice.fn.getParameter();
			
			parameter.i_iNowPageNo = i_iNowPageNo;
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_notice_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var notice = data.object.notice;
						MobileNotice.fn.setNoticeList(notice.page, notice.list);
						
					} else {
						alert(data.message);
					}
				}
			});
		},
		
		getParameter : function () {
			var	parameter	= {
				"i_sFlagPageInit"		: "N",
				"i_sSearchType"			: $('#i_sSearchType').val(),
				"i_sFlagMobileOpen"		: $('#i_sFlagMobileOpen').val(),
				"i_iNowPageNo"			: parseInt($('#i_iNowPageNo').val() || "1", 10),
				"i_iPageSize"			: parseInt($('#i_iPageSize').val() || "10", 10),
				"i_sFlagHistoryBack" 	: $('#i_sFlagHistoryBack').val(),
				"i_sTypecd"				: $('#i_sTypecd').val(),
				"i_sKeyword"			: $('#i_sKeyword').val()
			};
			return parameter;
		},
		/**
		 * 공지사항 카테고리
		 */
		setCategory : function (list) {
			$('#i_sTypecd option').remove();

			$('#i_sTypecd').append('<option value="">전체</option>');
			
			var typecd = $("#i_sOldTypecd").val();

			for (var i = 0; i < list.length; i++) {
				$('#i_sTypecd').append(
					'<option value="' + list[i].v_sub_code1 + '"'
					+ ((typecd == list[i].v_sub_code1) ? ' selected="selected"' : '') + '>'
					+ list[i].v_sub_codenm + '</option>'
				);
			}
		},
		
		/**
		 * 공지사항 목록 셋팅
		 */
		setNoticeList : function(page, list) {
			
			//if (page == undefined || list == undefined) {
			//	return;
			//}
			
			var parameter = MobileNotice.fn.getParameter();
			
			var	html	= "";

			if (list && (0 < list.length)) {
				if ('' != $('#noticeList').html().replace( /(^\s*)|(\s*$)/g, "" )) {
					
					$('#i_iNowPageNo').val(page.i_iNowPageNo);
					
					parameter.i_iNowPageNo	= page.i_iNowPageNo;
				}

				for (var i = 0; i < list.length; i++) {
					parameter.i_sNoticecd	= list[i].v_noticecd;
					parameter.i_sKeyword	= parameter.i_sKeyword;

					var	params	= $.param(parameter);
					var	date	= list[i].v_reg_dtm;
					var	count	= SetNumComma(list[i].n_view_cnt);
					var	isNew	= false;

					if (12 <= date.length) {
						date	= date.substring(0, 4) + "." + date.substring(4, 6) + "." + date.substring(6, 8)
								+ " " + date.substring(8, 10) + ":" + date.substring(10, 12); 

						var	startDate	= new Date(date.substring(0, 4), parseInt(date.substring(4, 6), 10) - 1, date.substring(6, 8),
													date.substring(8, 10), date.substring(10, 12), 00);
						var	endDate		= new Date();
						var diffDate	= (endDate.getTime() - startDate.getTime()) / (60 * 1000);

						isNew	= ((24 * 60) > diffDate);
					}

					
					html	+= "<li>"
							+ "<a href=\""+GLOBAL_WEB_URL+"mobile/cstm/mobile_cstm_notice_view.do?" + params + "\">"
							+ "<p class=\"subj\">"
							+ (("" == list[i].v_typenm) ? "" : "<span class=\"cate\">[" + list[i].v_typenm + "]</span>")
							+ list[i].v_title
							+ (isNew ? "<span class=\"ico_new\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_new.png\" alt=\"new\" /></span>" : "")
							+ "</p>"
							+ "<div class=\"bundle\">"
							+ "<span class=\"date\">" + date + "</span>"
							+ "<span class=\"count\">조회 " + count + "</span>"
							+ "</div>"
							+ "</a>"
							+ "<div class=\"txtContent\" style=\"padding: 18px 10px; line-height: 17px; border-top: 1px solid #d9d9d9; display: none;\"></div>"
							+ "</li>";
				}

				if (page.i_iNowPageNo >= page.i_iTotalPageCnt) {
					$('.btn_more').hide();
				} else {
					$('.btn_more').show();
				}
			} else {
				
				//if ('' == $('#noticeList').html().replace( /(^\s*)|(\s*$)/g, "" )) {
					
					html	+= "<li>"
							+ "<a href=\"#none\">"
							+ "<p class=\"subj\">공지사항이 존재하지 않습니다.</p>"
							+ "</a>"
							+ "</li>";
					
				//}

				$('.btn_more').hide();
			}

			if (1 == page.i_iNowPageNo) {
				$('#noticeList').html(html);
			} else {
				$('#noticeList').append(html);
			}
			
		},

		/**
		 * 검색 클릭 시 공지사항 목록 조회
		 */
		getSearch : function() {
			$('#i_iNowPageNo').val(1);
			
			MobileNotice.fn.getNoticeListAndView(1);
		},

		/**
		 * 더보기 클릭 시 공지사항 추가 목록 조회
		 */
		getMore : function() {
			var	i_iNowPageNo	= parseInt($('#i_iNowPageNo').val(), 10) + 1;
			
			MobileNotice.fn.getNoticeListAndView(i_iNowPageNo);
		},

		/**
		 * 공지사항 상세 조회
		 */
		getNoticeInfoAndView : function(i_sNoticecd) {
			
			var parameter = MobileNotice.fn.getParameter();
			
			parameter.i_sNoticecd = $('#i_sNoticecd').val();
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_notice_view_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						if (data.object) {
							var	date	= data.object.v_reg_dtm;
							var	count	= SetNumComma(data.object.n_view_cnt);
							var	isNew	= false;

							if (12 <= date.length) {
								date	= date.substring(0, 4) + "." + date.substring(4, 6) + "." + date.substring(6, 8)
										+ " " + date.substring(8, 10) + ":" + date.substring(10, 12); 

								var	startDate	= new Date(date.substring(0, 4), parseInt(date.substring(4, 6), 10) - 1, date.substring(6, 8),
															date.substring(8, 10), date.substring(10, 12), 00);
								var	endDate		= new Date();
								var diffDate	= (endDate.getTime() - startDate.getTime()) / (60 * 1000);
									
								isNew	= ((24 * 60) > diffDate);
							}

							$('div.ttlBox>.cate').html(data.object.v_typenm);
							$('div.ttlBox>.subject').html(
								data.object.v_title + (isNew ? "<span class=\"ico_new\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_new.png\" alt=\"new\" /></span>" : "")
							);
							$('div.ttlBox>.bundle').find('.date').text(date);
							$('div.ttlBox>.bundle').find('.count').text("조회 " + count);

							$('div.txtContent').html(data.object.v_clob);

							//TODO : 첨부파일 다운로드 처리 필요
							if (data.object.attachlist && (0 < data.object.attachlist)) {
							}

							var	html		= "";

							// 다음 공지사항
							if (data.object.nextarticle) {
								var	params	= {
									"i_sSearchType"		: $('#i_sSearchType').val(),
									"i_sFlagMobileOpen"	: $('#i_sFlagMobileOpen').val(),
									"i_sFlagOpen"		: $('#i_sFlagOpen').val(),
									"i_iStartRownum"	: $('#i_iStartRownum').val(),
									"i_iEndRownum"		: $('#i_iEndRownum').val(),
									"i_sTypecd"			: $('#i_sTypecd').val(),
									"i_sKeyword"		: $('#i_sKeyword').val(),
									"i_sNoticecd"		: data.object.nextarticle.v_noticecd
								};

								date	= data.object.nextarticle.v_reg_dtm;
								isNew	= false;

								if (12 <= date.length) {
									var	startDate	= new Date(date.substring(0, 4), parseInt(date.substring(4, 6), 10) - 1, date.substring(6, 8),
																date.substring(8, 10), date.substring(10, 12), 00);
									var	endDate		= new Date();
									var diffDate	= (endDate.getTime() - startDate.getTime()) / (60 * 1000);

									isNew	= ((24 * 60) > diffDate);
								}

								html	+= "<li>"
										+ "<a href=\""+GLOBAL_WEB_URL+"mobile/cstm/mobile_cstm_notice_view.do?" + $.param(params) + "\" class=\"ellipsis\">"
										+ "<span class=\"btn\">다음</span>"
										+ (("" == data.object.nextarticle.v_typenm) ? "" : "[" + data.object.nextarticle.v_typenm + "] ")
										+ data.object.nextarticle.v_title
										+ (isNew ? " <span class=\"ico_new\"><img src=\"" + GLOBAL_MOBILE_IMG_URL + "common/ico_new.png\" alt=\"new\"></span>" : "")
										+ "</a>"
										+ "</li>";
							}

							// 이전 공지사항
							if (data.object.prevarticle) {
								var	params	= {
									"i_sSearchType"		: $('#i_sSearchType').val(),
									"i_sFlagMobileOpen"	: $('#i_sFlagMobileOpen').val(),
									"i_sFlagOpen"		: $('#i_sFlagOpen').val(),
									"i_iStartRownum"	: $('#i_iStartRownum').val(),
									"i_iEndRownum"		: $('#i_iEndRownum').val(),
									"i_sTypecd"			: $('#i_sTypecd').val(),
									"i_sKeyword"		: $('#i_sKeyword').val(),
									"i_sNoticecd"		: data.object.prevarticle.v_noticecd
								};

								date	= data.object.prevarticle.v_reg_dtm;
								isNew	= false;

								if (12 <= date.length) {
									var	startDate	= new Date(date.substring(0, 4), parseInt(date.substring(4, 6), 10) - 1, date.substring(6, 8),
																date.substring(8, 10), date.substring(10, 12), 00);
									var	endDate		= new Date();
									var diffDate	= (endDate.getTime() - startDate.getTime()) / (60 * 1000);

									isNew	= ((24 * 60) > diffDate);
								}

								html	+= "<li>"
										+ "<a href=\""+GLOBAL_WEB_URL +"mobile/cstm/mobile_cstm_notice_view.do?" + $.param(params) + "\" class=\"ellipsis\">"
										+ "<span class=\"btn\">이전</span>"
										+ (("" == data.object.prevarticle.v_typenm) ? "" : "[" + data.object.prevarticle.v_typenm + "] ")
										+ data.object.prevarticle.v_title
										+ (isNew ? " <span class=\"ico_new\"><img src=\"" + GLOBAL_MOBILE_IMG_URL + "common/ico_new.png\" alt=\"new\"></span>" : "")
										+ "</a>"
										+ "</li>";
							}

							$('div.otherList>ul').html(html);
						} else {
							alert("일시적인 문제로 내용을 조회하지 못하였습니다.\n다시 시도해 보시기 바랍니다.");
						}
					} else {
						alert(data.message);
					}
				}
			});
		},

		/**
		 * 상세조회 화면에서 목록 화면으로 이동 처리
		 */
		historyBack : function() {
			
			var	parameter	=	MobileNotice.fn.getParameter();
			parameter.i_sFlagHistoryBack = "Y";
			
			location.href	= GLOBAL_WEB_URL +"mobile/cstm/mobile_cstm_notice_list.do?" + $.param(parameter);
		}
	}
};
