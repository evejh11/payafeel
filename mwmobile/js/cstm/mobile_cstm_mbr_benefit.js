/**
 * 모바일 회원 등급별 혜택의 이벤트 처리를 위한 Javascript
 */
var	MobileMbrBenefit = {
	name : "MobileMbrBenefit",

	init : function() {
		MobileMbrBenefit.fn.setSubMenuChange();
		MobileMbrBenefit.fn.setMbrGradeTab();
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
		 * 회원 등급별 혜택 탭 처리
		 */
		setMbrGradeTab : function() {
			var	$tabCate	= $(".gradeBenufit .tab_cate");
			var	$tabCont	= $(".gradeBenufit .tab_cont");

			$tabCate.click(function() {
				var	$idxTab	= $tabCate.index(this);

				$tabCont.hide().eq($idxTab).show();
				$tabCate.removeClass("active").eq($idxTab).addClass("active");

				return false;
            });
		}
	}
};
