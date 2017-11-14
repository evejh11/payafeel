/**
 * 모바일 FAQ의 이벤트 처리를 위한 Javascript
 */
var	MobileFaq = {
	name : "MobileFaq",

	curTypeCd	: "",

	init : function() {
		MobileFaq.fn.setSubMenuChange();

		$('a.td').click(MobileFaq.fn.changeFaqList);
		$('#btnSearch').click(MobileFaq.fn.getSearch);
		$('.btn_more').click(MobileFaq.fn.getMore);
		
		MobileFaq.fn.getPageInit();
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
		 * page 초기 로딩
		 */
		getPageInit : function () {
			MobileFaq.curTypeCd = $("#i_sOldTypecd").val();
			
			var parameter = MobileFaq.fn.getParameter();
			
			parameter.i_sTypecd = $("#i_sOldTypecd").val(); 
			parameter.i_sFlagPageInit = "Y";
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_faq_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var category = data.object.faqCategory;
						var faq = data.object.faq;
						
						MobileFaq.fn.setCategory(category);
						MobileFaq.fn.setFaqList(faq.page, faq.list);
						
						$('#i_sFlagHistoryBack').val("N");
						
					} else {
						alert(data.message);
					}
				}
			});
		},
		
		/**
		 * FAQ 목록 조회
		 */
		getFaqListAndView : function(i_sTypecd, i_iNowPageNo) {
			var parameter = MobileFaq.fn.getParameter();
			
			parameter.i_sTypecd = i_sTypecd;
			parameter.i_iNowPageNo = i_iNowPageNo;

			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cstm/mobile_cstm_faq_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						
						var faq = data.object.faq;
						
						MobileFaq.fn.setFaqList(faq.page, faq.list);
						
						$("#i_sTypecd").val(i_sTypecd);
						
					} else {
						alert(data.message);
					}
				}
			});
		},
		/**
		 * faq 카테고리
		 */
		setCategory : function (list) {
			
			$('#i_sTypecd option').remove();

			$('div.faqCategory').find('a').each(function(idx) {
				
				if (idx > 0) {
					
					index = idx - 1;
				
					$(this).attr('href', '#?i_sTypecd=' + list[index].v_sub_code1);
					$(this).text(list[index].v_sub_codenm);
	
					$('#i_sTypecd').append('<option value="' + list[index].v_sub_code1 + '">' + list[index].v_sub_codenm + '</option>');
					
					if (MobileFaq.curTypeCd == list[index].v_sub_code1) {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");
					}
				}
				else {
					
					$(this).attr('href', '#?i_sTypecd=');
					$(this).text("전체FAQ");
	
					$('#i_sTypecd').append('<option value="">전체FAQ</option>');
	
					if (MobileFaq.curTypeCd == "") {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");
					}
					
				}
			});
			
		},
		/**
		 * faq 목록
		 */
		setFaqList : function (page, list) {
			
			var	html	= "";
			
			if (list && (0 < list.length)) {
				
				if ('' != $('#faqList').html().replace( /(^\s*)|(\s*$)/g, "" )) {
					$('#i_iNowPageNo').val(page.i_iNowPageNo);
				}

				for (var i = 0; i < list.length; i++) {
					html	+= "<li>"
							+ "<a href=\"#none\" onclick=\"MobileFaq.fn.showContent(this);\">"
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

				if (page.i_iNowPageNo >= page.i_iTotalPageCnt) {
					$('.btn_more').hide();
				} else {
					$('.btn_more').show();
				}
			} else {
				
				
				html	+= "<li>"
						+ "<a href=\"#none\">"
						+ "<p class=\"subj\">FAQ가 존재하지 않습니다.</p>"
						+ "</a>"
						+ "</li>";

				$('.btn_more').hide();
			}

			if (1 == page.i_iNowPageNo) {
				$('#faqList').html(html);
			} else {
				$('#faqList').append(html);
			}
		},
		
		getParameter : function () {
			var	parameter	= {
				"i_sTypecd"				: $('#i_sTypecd').val(),
				"i_sKeyword"			: $('#i_sKeyword').val(),
				"i_sFlagPageInit"		: "N",
				"i_sFlagHistoryBack" 	: $('#i_sFlagHistoryBack').val(),
				"i_iNowPageNo"			: parseInt($('#i_iNowPageNo').val() || "1", 10),
				"i_iPageSize"			: parseInt($('#i_iPageSize').val() || "10", 10),
			};
			
			return parameter;
		},
		/**
		 * FAQ 카테고리 선택 시 처리
		 */
		changeFaqList : function() {
			var	sTypeCd	= $(this).attr('href').replace(/[#][?]i_sTypecd=/, '');

			$('a.td').removeClass("active");
			$(this).addClass("active");
			$('#i_sKeyword').val("");

			MobileFaq.curTypeCd	= sTypeCd;
			MobileFaq.fn.getFaqListAndView(sTypeCd, 1);
		},

		/**
		 * 검색 클릭 시 FAQ 목록 조회
		 */
		getSearch : function() {

			$('div.faqCategory').find('a').each(function(index) {
				var	sTypeCd	= $(this).attr('href').replace(/[#][?]i_sTypecd=/, '');

				if (sTypeCd == $('#i_sTypecd').val()) {
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			});

			MobileFaq.fn.getFaqListAndView($('#i_sTypecd').val(), 1);
		},

		/**
		 * 더보기 클릭 시 FAQ 추가 목록 조회
		 */
		getMore : function() {
			var	i_iNowPageNo	= parseInt($('#i_iNowPageNo').val(), 10) + 1;
			
			MobileFaq.fn.getFaqListAndView(MobileFaq.curTypeCd, i_iNowPageNo);
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
