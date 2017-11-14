/**
 * 모바일 고객센터 메인화면의 이벤트 처리를 위한 Javascript
 */
var	MobileCustomer = {
	name : "MobileCustomer",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');

		MobileCustomer.fn.setSubMenuChange();
		MobileCustomer.fn.setCustomerTab();
		
		// 초기 진입시 공지사항 및 FAQ 동시 로딩
		MobileCustomer.fn.getCstmMainList();
	},

	fn : {
		/**
		 * 고객센터 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_URL + "mobile/cstm/" + $(this).val() + ".do";
			});
		},

		/**
		 * 고객센터 메인 탭 처리
		 */
		setCustomerTab : function() {
			var	$tabCate	= $(".customer .tab_cate");
			var	$tabCont	= $(".customer .tab_cont");

			$tabCate.click(function() {
				var	$idxTab	= $tabCate.index(this);

				$tabCont.hide().eq($idxTab).show();
				$tabCate.removeClass("active").eq($idxTab).addClass("active");

				return false;
            });
		},
		
		getCstmMainList : function () {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_main_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {"i_sTypecd":"", "i_sFlagMobileOpen":"Y", "i_sFlagOpen":"Y", "i_iPageSize":5},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var notice = data.object.notice;
						var faq = data.object.faq;
						
						MobileCustomer.fn.setNoticeList(notice.page, notice.list);
						MobileCustomer.fn.setFaqList(faq.page, faq.list);
						
					} else {
						alert(data.message);
					}
				}
			});
			
		},
		/**
		 * 공지사항 목록 조회
		 */
		getNoticeListAndView : function(pageNo, pageSize) {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_notice_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {"i_sTypecd":"", "i_sFlagMobileOpen":"Y", "i_iNowPageNo":pageNo, "i_iPageSize":pageSize == undefined ? 5 : pageSize},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var notice = data.object.notice;
						MobileCustomer.fn.setNoticeList(notice.page, notice.list);
						
					} else {
						alert(data.message);
					}
				}
			});
		},

		/**
		 * FAQ 목록 조회
		 */
		getFaqListAndView : function(pageNo, pageSize) {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_faq_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {"i_sTypecd":"0001", "i_sFlagMobileOpen":"Y", "i_iNowPageNo":pageNo, "i_iPageSize":pageSize == undefined ? 5 : pageSize},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var faq = data.object.faq;
						MobileCustomer.fn.setFaqList(faq.page, faq.list);
						
					} else {
						alert(data.message);
					}
				}
			});
		},
		
		/**
		 * 공지사항 목록 생성
		 */
		setNoticeList : function (page, list) {
			
			var	html	= "";
			
			if (list != undefined && list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					var	date	= list[i].v_reg_dtm;
					var	view	= SetNumComma(list[i].n_view_cnt);
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
							+ "<a href=\""+GLOBAL_WEB_URL+"mobile/cstm/mobile_cstm_notice_view.do?i_sNoticecd=" + list[i].v_noticecd + "\">"
							+ "<p class=\"subj\">"
							+ (("" == list[i].v_typenm) ? "" : "<span class=\"cate\">[" + list[i].v_typenm + "]</span>")
							+ list[i].v_title
							+ (isNew ? "<span class=\"ico_new\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_new.png\" alt=\"new\" /></span>" : "");
							+ "</p>"
							+ "<div class=\"bundle\">"
							+ "<span class=\"date\">" + date + "</span>"
							+ "<span class=\"count\">조회 " + view + "</span>"
							+ "</div>"
							+ "</a>"
							+ "</li>";
				}
			}
			else {
				html	+= "<li>"
						+ "<a href=\"#none\">"
						+ "<p class=\"subj\">공지사항이 존재하지 않습니다.</p>"
						+ "</a>"
						+ "</li>";
			}
			
			$('div.tab_cont:eq(0)>ul').html(html);
		},
		/**
		 * FAQ 목록 생성
		 */
		setFaqList : function (page, list) {
			var	html	= "";

			if (list != undefined && list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					html	+= "<li>"
							+ "<a href=\"#none\" onclick=\"MobileCustomer.fn.showContent(this);\">"
							+ "<p class=\"subj\">"
							+ list[i].v_title
							+ "</p>"
							+ "<div class=\"bundle\">"
							+ "<span class=\"category\">" + list[i].v_typenm + "</span>"
							+ "</div>"
							+ "</a>"
							+ "<div class=\"txtContent\" style=\"padding: 18px 10px; line-height: 17px; border-top: 1px solid #d9d9d9; background: #f7f7f7; display: none;\">" + list[i].v_clob + "</div>"
							+ "</li>";
				}
			} else {
				html	+= "<li>"
						+ "<a href=\"#none\">"
						+ "<p class=\"subj\">FAQ가 존재하지 않습니다.</p>"
						+ "</a>"
						+ "</li>";
			}

			$('div.tab_cont:eq(1)>ul').html(html);
		},

		/**
		 * FAQ 상세내용 펼치기/접기
		 */
		showContent : function(obj) {
			var	isShow	= ('bold' == $(obj).children('.subj').css('font-weight'));

			$('.subj').css('font-weight', 'normal');
			$('.subj').css('color', '#121212');
			$('.txtContent').hide();

			if (!isShow) {
				$(obj).children('.subj').css('font-weight', 'bold');
				$(obj).children('.subj').css('color', '#4C7ED6');
				$(obj).siblings('.txtContent').show();
			}
		}
	}
};
