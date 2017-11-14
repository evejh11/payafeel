/**
 * 이미지 파일 업로드 예제소스
 */
var	MobileImageUploadView = {
	name : "MobileImageUploadView",
	isLoad : false,
	upPhotoCnt : 1,
	init : function() {
		MobileImageUploadView.fn.addBtnEvent();
		MobileImageUploadView.fn.getTestTableData({i_sDataType : "LIST"});
	},
	fn : {
		addBtnEvent : function () {
			// 상세보기
			$(".a_title").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id").replace("a_", "");
				var paramData = {
						i_sDataType : "VIEW"
						, i_sPk : id
					};
				MobileImageUploadView.fn.getTestTableData(paramData);
			});
			
			// 수정하기
			$(".a_modify").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id").replace("a_modify_", "");
				var frm = $("form[name='frm']");
				$("input[name='i_sPk']", frm).val(id);
				frm.prop("action", GLOBAL_WEB_URL + "mobile/comm/mobile_comm_image_upload_reg.do").submit();
			});
			
			// 등록하기
			$(".btn_reg").click(function(event) {
				event.preventDefault();
				var frm = $("form[name='frm']");
				$("input[name='i_sPk']", frm).val("");
				frm.prop("action", GLOBAL_WEB_URL + "mobile/comm/mobile_comm_image_upload_reg.do").submit();
			});
		}, 
		getTestTableData : function (paramData) {
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_image_upload_data_ajax.do",
				type		: "POST",
				dataType	: "json",
				data 		: paramData,
				success		: function (data, textStatus) {
					if (data.status != "succ") {
						alert(data.message);
						return;
					}
					
					switch (paramData.i_sDataType) {
					case "LIST" : 
						MobileImageUploadView.fn.makeTestTableListTag(data.object);
						break;
					case "VIEW" :
						MobileImageUploadView.fn.makeTestTableViewTag(data.object);
						break;
					default : 
						break;
					}
				}	
			});
		},
		// 리스트 목록 만들기
		makeTestTableListTag : function (jsonObject) {
			
			var testTableList = jsonObject.testTableList; 
			
			if (testTableList == undefined) {
				return;
			}
			var len = testTableList.length;
			var tbody = $("#ul_test_table_list");
			
			for (var i = 0; i < len; i++) {
				var tr = $(".li_test_table_list").eq(0).clone(true);
				$(".a_title", tr).prop("id", "a_" + testTableList[i].v_pk);
				$(".a_modify", tr).prop("id", "a_modify_" + testTableList[i].v_pk);
				$(".subj", tr).text(testTableList[i].v_title);
				$(".date", tr).text(changeDatePatten(testTableList[i].v_reg_dtm));
				
				tr.appendTo(tbody).show();
			}
		},
		//
		makeTestTableViewTag : function (jsonObject) {
			var testTableInfo = jsonObject.testTableInfo;
			var imageList = jsonObject.imageList;
			var len = imageList == undefined ? 0 : imageList.length; 
			
			var div = $("#div_detail");
			var message = testTableInfo.v_message_chgbr;
			
			for (var i = 0; i <len; i++) {
				var imageUrl = imageList[i].v_image_path.replace("_98", "_500");
				//console.log(imageList[i].v_image_path);
				message = message.replace(imageList[i].v_buffer1, "<img src='"+ imageUrl +"'/>");
			}
			
			$(".subject", div).text(testTableInfo.v_title);
			$(".content", div).html(message);
		}
	}
};
