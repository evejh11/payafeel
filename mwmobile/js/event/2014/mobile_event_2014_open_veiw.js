/**
 * 모바일 새단장 이벤트
 */

var MobileOpenEvent = {
	name : "MobileOpenEvent",
	upPhotoCnt : 1,
	init : function(){
		MobileOpenEvent.fn.initRegForm();
		MobileOpenEvent.fn.setPageInit();
		MobileOpenEvent.fn.addBtnEvent();
		
		
	},
	fn : {
		setPageInit : function(){
			if(!IS_LOGIN){
				$(".fileinput-button").hide();
				$(".span_notmission").text("로그인을 먼저 해주세요.");
				
			} else{
				var resultxt = "";
				if($(".span_mission1").text() == 'A'){
					resultxt = "프로필 사진과 닉네임이 등록되지 않았습니다. 등록하고 버튼을 눌러주세요~";
				}
				if($(".span_mission1").text() == 'P'){
					resultxt = "프로필사진이 등록되지 않았습니다. 사진을 등록하고 버튼을 눌러주세요~";
				}
				if($(".span_mission1").text() == 'N'){
					resultxt = "닉네임이 등록되지 않았습니다. 닉네임을 작성하고 버튼을 눌러주세요~";
				}
				$("#p_mission1_result").text(resultxt);
				
				var apply	= $(".span_applyYn").text();
				var nick 	= $(".span_nickname").text();
				var photo	= $(".span_usrphoto").text();
				var profile = $(".span_bprofile").text();

				if(apply != "Y"){
					if(nick == "" || photo == ""){
						if(profile == "N"){
							$(".span_notmission").text("1,2번 미션이 아직 완료되지 않았습니다.");
						} else{
							$(".span_notmission").text("1번 미션이 아직 완료되지 않았습니다.");
						}
					} else{
						if(profile == "N"){
							$(".span_notmission").text("2번 미션이 아직 완료되지 않았습니다.");
						} else{
							$(".span_notmission").text("모든 미션을 완료하셨습니다. <br/> 축하 댓글을 남겨주시면 이벤트 응모가 완료됩니다.");
						}
					}
				} else{
					$(".span_notmission").text("이벤트 응모를 완료하셨습니다.");
				}
			}
			$(".totalResult>p>span").html($(".span_notmission").text());
			
//			OpenEvent.fn.addBtnEvent();
		},
		
		addBtnEvent : function(){

			$(".btn_mission1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
	            		message : "로그인 하시면 서비스 이용이 가능하세요!",
	            		ok_func : function(){
	            			goUserLogin();
	            		}
	            	});
				} else{
					if($(".span_mission1").text() == ""){
						showMessageBox({
							message : "완료된 미션입니다."
						});
					} else if($(".span_mission1").text() == "P" || $(".span_mission1").text() == "A"){
						showMessageBox({
							message : "프로필 사진을 먼저 등록해주세요."
						});
					}
					else if($(".span_mission1").text() == "N"){
						MobileOpenEvent.fn.goSaveMission1();
					}
				}
				
			});
			
			$(".btn_mission3").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
	            		message : "로그인 하시면 서비스 이용이 가능하세요!",
	            		ok_func : function(){
	            			goUserLogin();
	            		}
	            	});
				} else{
					if($(".span_bprofile").text() == "Y"){
						showMessageBox({
							message : "완료된 미션입니다."
						});
					} else{
						var eventcd = $("input[name='i_sEventcd']").val();
						location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_beauty_profile_step1.do?i_sEventYn=Y&i_sEventcd="+eventcd+"&i_sActionFlag=R";
					}
				}
			});
			
			$("#i_sNewNick").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
	            		message : "로그인 하시면 서비스 이용이 가능하세요!",
	            		ok_func : function(){
	            			goUserLogin();
	            		}
	            	});
				}
			});
			
			
			
		},
		
		// 이미지 입력폼 초기화
		initRegForm : function () {
			
			jfupload.initImageUpload({
				target : $('#inp_photo_upload')
				, uploadCd : "USR_PHOTO"		// uploadCd
				, formName : "usr_photo_thumbnail"	// form name
				, thumbnailWidth : "98;128;" // thumbnail 필요할 경우
				, thumbnailHeight : "98;128"
				, success : MobileOpenEvent.fn.appendUploadImage
			});
			
			if (GLOBAL_MOBILE_APP == "APP") {
				$("#inp_photo_upload").click(function(event) {
					try {
						window.Android.open( GLOBAL_WEB_URL + "comm/comm_image_upload.do", "USR_PHOTO", "98;128;", "98;128;", "N", "MobileOpenEvent.fn.appendUploadImage", "");
					} catch (e) {}
				});
			}
			
			MobileOpenEvent.fn.addBtnEvent();
		},
		
		// 업로드 이미지 추가
		appendUploadImage : function (imgData, uploadCd) {
			var url = GLOBAL_WEB_ROOT + imgData.v_thumbnail_path.substring(1) + imgData.v_thumbnail_id + "_128" + imgData.v_thumbnail_ext;
			var ul = $(".ul_upload_image");
			var li = $(".li_upload_image", ul).eq(0).clone(true);
			var upPhotoCnt = MobileOpenEvent.upPhotoCnt++;
			var imgNumber = "[image#" + (upPhotoCnt > 9 ? upPhotoCnt : "0" + upPhotoCnt)  + "]";
			
			$(".upload_image").prop("src", url);
			li.appendTo(ul).show().prop("id", "li_" + imgData.v_thumbnail_id);
			
			// 이전 업로드 이미지 삭제
			if(upPhotoCnt != 1){
				var li = $(".li_upload_image").eq(1);
				var thumbnailId = li.attr("id").replace("li_", "");
				li.remove();
				jfupload.deleteImage(thumbnailId, "USR_PHOTO", "");
			}
			
			var div 	= $("#div_" + imgData.v_thumbnail_id);
			var inp 	= $("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_thumbnail_buffer1"}).addClass("cls_thumbnail_buffer1").val("CMC");
			inp.appendTo(div);
			MobileOpenEvent.fn.SaveUsrPhoto();
		},
		
		/*
		 * 프로필 사진 저장
		 */
		SaveUsrPhoto : function(){
			if($(".span_mission1").text() == "A"){
				$(".span_mission1").text("N");
			}
			var frm = $("form[name='usr_photo_thumbnail']");
			MobileCommon.ajax({
				url	 	: GLOBAL_WEB_ROOT +"mobile/mbr/user_photo_ajax.do",
				type	: "post",
				data	: frm.serialize(),
				dataType : "json",
				success : function(data, textStatus, jqXHR){
					if(data.status == 'succ'){
						document.frm_reload.submit();
					} else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		
		// 미션 1 닉네임 등록
		goSaveMission1 : function(){
			var nicknm = $("#i_sNewNick").val();
			var textlen = nicknm.length;
			if(nicknm == ""){
				showMessageBox({
					message : "닉네임을 입력해주세요."
				});
				return;
			}
			if(textlen < 2){
				showMessageBox({
					message : "닉네임은 최소 2글자 이상이어야 합니다."
				});
				return;
			}
			if(textlen > 10){
				showMessageBox({
					message : "10글자 이내로 작성해 주세요."
				});
				return;
			}
			cmAjax({
				url	 	: GLOBAL_WEB_ROOT +"mobile/event/2014/mobile_event_2014_open_mission_save_ajax.do",
				type	: "post",
				data	: { i_sFlagNickname : "R"
							,i_sNewNick : $("#i_sNewNick").val()
				},
				dataType : "json",
				success : function(data, textStatus, jqXHR){
					if(data.status == 'succ'){
						$(".span_mission1").text("");
						$("#p_mission1_result").text("");
						document.frm_reload.submit();
					} 
					if(data.status == 'fail'){
						showMessageBox({
							message : "이미 존재하는 닉네임입니다."
						});
						return;
					}
				}
			});
		}
	}
};