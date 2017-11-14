
var MobileMyReview = {
	name : "MobileMyReview",
	init : function() {
		var Link = $.noUiSlider.Link;
		$('#gradeSlider').noUiSlider({
			start: [ 0 ]
			, step: 1
			, range: {
				'min': [ 0 ]
				, 'max': [ 5 ]
			}
			, serialization: {
				lower: [
						new Link({
						target: $("#gradeSlider")
						, method: MobileReviewCommStyle.handleSliderValue2
						})
				]
			}
		});
		MobileReviewCommStyle.handleSliderValue2($("input[name='i_iRecommPointText']").val());
		MobileMyReview.fn.addBtnEvent();
	},
	isLoadingList : false,
	pageStack : [],
	fn : {
		addBtnEvent : function() {

			$(".btn_review_modi").unbind("click").click(function(event) {
				event.preventDefault();

				if(MobileReviewComm.fn.fnValidate()) {

					var obj = {
						i_iRecomPoint	: $("input[name='i_iRecomPoint']:checked").val()
						, i_sContent	: $("#i_sContent").val()
						, i_sOrdercd	: $("#i_sReviewOrdercd").val()
						, i_sProductcd	: $("#i_sProductcd").val()
						, i_sFlagAction	: "M"
						, i_sFlagRebuy	: $("input[name='i_sFlagRebuy']:checked").val()
						, i_arrOptioncd	: []
						, i_sReviewcd	: $("input[name='i_sReviewcd']").val()
					};

					$("input[name='i_arrOptioncd']").each(function() {
						if(!$(this).is(":disabled")) {
							obj.i_arrOptioncd.push($(this).val());
						}
					});

					MobileMyReview.fn.goSave(obj);

				}
			});

			$("#i_sProductcd").unbind("change").change(function() {

				removeErrorMessageBox($("*[name='i_sProductcd']"));
				removeErrorMessageBox($("*[name='i_arrOptioncd']").eq(0));

				if($(this).val() != "") {
					var id = $(this).val();
					$(".ul_option").show();
					$("input[type='hidden']", ".li_" + id).prop("disabled", false);
					$("input[type='hidden']", $(".ul_option > li").not(".li_" + id)).prop("disabled", true);
					$(".ul_option").find(".li_" + id).show();
					$(".ul_option > li").not(".li_" + id).hide();
				} else {
					$(".ul_option>li").hide();
					$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
					$(".ul_option").hide();
					
					addErrorMessageBox($("*[name='i_sProductcd']"), "등록하실 상품을 선택해 주세요.");
				}
			});

			$(".btn_option_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				var product = $(this).parent().attr("class");
				
				if($("."+product).find(":disabled").length == 1) {
					$("option", "#i_sProductcd").eq(0).prop("selected", true);
					$(".ul_option").hide();
				}
				
				var id = $(this).attr("id");
				$("#li_"+id).hide();
				$("input[type='hidden']", $("#li_"+id)).prop("disabled", true);
			});

			$("#i_sContent").unbind("keyup").keyup(function() {
				var content = $(this).val();
				content = EmptyReplace(content);
				var length = content.length;
				removeErrorMessageBox($("*[name='i_sContent']"));
				if(length > 200) {
					$(".p_byte>em").html("<font color=\"red\">"+length+"</font>");
				} else {
					$(".p_byte>em").text(length);
					
					if(length == 0) {
						addErrorMessageBox($("*[name='i_sContent']"), "내용을 입력해주세요.");
					}
				}
			});
			
			$(".btn_review_cancel").click(function(){
				MobileMyReview.fn.fnClose();
			});
		}
		, goSave : function(obj) {

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_save_ajax.do"
				, dataType : "json"
				, data : obj
				, animation : false
				, async : false
				, success: function(data, textStatus) {
					if(data.status == "succ") {
						showAppMessageBox({
							message : data.message
							, close : function() {
								MobileMyReview.fn.fnClose();
							}
						});
					} else {
						showAppMessageBox({
							message : data.message
						});
					}
				}
			});
		}
		, fnClose : function() {
			try{
				if(GLOBAL_MOBILE_OS == "AND") {
					window.Android.closeWebview();
				}
				else {
					window.webkit.messageHandlers.closeWebview.postMessage(null);
				}
			}catch(e){
				console.log(e);
			}
		}
	}
};

