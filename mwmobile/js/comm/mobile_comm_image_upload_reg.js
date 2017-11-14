/**
 * 이미지 파일 업로드 예제소스
 */
var	MobileImageUploadReg = {
	name : "MobileImageUploadReg",
	isLoad : false,
	upPhotoCnt : 1,
	init : function() {
		
		var frm = $("form[name='frm']");
		var pk = $("input[name='i_sPk']", frm).val();
		
		// 수정일 경우
		if (pk != "") {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_image_upload_data_ajax.do",
				type		: "POST",
				dataType	: "json",
				data 		: {
					i_sDataType : "VIEW"
					, i_sPk : pk
				},
				success		: function (data, textStatus) {
					if (data.status != "succ") {
						alert(data.message);
						return;
					}
					MobileImageUploadReg.fn.makeTestTableModifyTag(data.object);
				}	
			});
		}
		else {
			$("input[name='i_sPk']", frm).val("");
			$("*[name='i_sFlagAction']", frm).val("R");
			MobileImageUploadReg.fn.initRegForm();
		}
	},
	fn : {
		// 입력폼 초기화
		initRegForm : function () {
			var ul = $("#ul_upload_image");
			var arrLi = $(".li_upload_image", ul);
			var len = arrLi.length;
			var imgNumber = $(".number", arrLi.eq(len - 1)).text().substr(7, 2);
			
			MobileImageUploadReg.upPhotoCnt = parseInt(imgNumber, 10) + 1; 
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "TEMP001"		// uploadCd
				, formName : "frm"			// form name
				, thumbnailWidth : "98;500;" // thumbnail 필요할 경우
				, success : MobileImageUploadReg.fn.appendUploadImage
			});
			
			MobileImageUploadReg.fn.addBtnEvent();
		},
		// 버튼 이벤트 추가
		addBtnEvent : function () {
			
			// 첨부 업로드 이미지 삭제
			$(".btn_upload_img_del").click(function(event) {
				event.preventDefault();
				var li = $(this).parents(".li_upload_image").eq(0);
				var imgNumber = $(".number", li).text();
				var thumbnailId = li.attr("id").replace("li_", "");
				
				li.remove();
				
				$("#i_sMessage").val($("#i_sMessage").val().replace(imgNumber, ""));
				
				jfupload.deleteImage(thumbnailId, "TEMP001", "frm");
				
			});
			
			// 저장
			$(".btn_save").click(function(event) {
				event.preventDefault();
				MobileImageUploadReg.fn.fnSave();
			});
			
			// 목록
			$(".btn_list").click(function(event) {
				event.preventDefault();
				MobileImageUploadReg.fn.goList();
			});
		},
		// 목록으로 가기
		goList : function () {
			document.location.href = GLOBAL_WEB_URL + "mobile/comm/mobile_comm_image_upload_view.do";
		}, 
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_98" + imgData.v_thumbnail_ext;
			var ul = $("#ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			
			var upPhotoCnt = MobileImageUploadReg.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".img_upload_image", li).prop("src", url);
			$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
			$(".number", li).text(imgNumber);
			
			$("#i_sMessage").val($("#i_sMessage").val() + imgNumber);
			
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
			
			inp.appendTo(div);
		},
		fnSave : function () {
			
			var frm = $("form[name='frm']");
			
			if ($("*[name='i_sTitle']", frm).val() == "") {
				alert("제목을 입력해 주세요.");
				return;
			}
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_image_upload_save.do",
				type		: "POST",
				dataType	: "json",
				data		: frm.serialize(),
				success		: function (data, textStatus) {
					MobileImageUploadReg.fn.goList();
				}	
			});
		}
		,
		makeTestTableModifyTag : function (jsonObject) {
			
			var frm = $("form[name='frm']");
			var uploadCd = "TEMP001";
			
			var testTableInfo = jsonObject.testTableInfo;
			var imageList = jsonObject.imageList;
			var len = imageList == undefined ? 0 : imageList.length;
			
			if (testTableInfo == undefined) {
				$("input[name='i_sPk']", frm).val("");
				$("*[name='i_sFlagAction']", frm).val("R");
				MobileImageUploadReg.fn.initRegForm();
				return;
			}
			
			$("*[name='i_sTitle']", frm).val(testTableInfo.v_title);
			$("*[name='i_sMessage']", frm).val(testTableInfo.v_message_rmhtml);
			$("*[name='i_sFlagAction']", frm).val("M");
			
			var ul = $("#ul_upload_image");
			
			for (var i = 0; i <len; i++) {
				var imgData = imageList[i];
				var li = $(".li_upload_image", ul).eq(0).clone(true);
				var url = imgData.v_image_path;
				var imgNumber = imgData.v_buffer1;
				
				$(".img_upload_image", li).prop("src", url);
				$(".size", li).text(getFileSize(imgData.n_thumbnail_size));
				$(".number", li).text(imgNumber);
				
				li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
				
				// 기존 이미지 셋팅
				jfupload.makeImageUploadTag(imgData, uploadCd, "frm", "M");		
				
				// buffer1 생성
				var div 	= $("#div_" + imgData.v_thumbnail_id);
				var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val(imgNumber);
				inp.appendTo(div);
			}
			
			MobileImageUploadReg.fn.initRegForm();
		}
	}
};
