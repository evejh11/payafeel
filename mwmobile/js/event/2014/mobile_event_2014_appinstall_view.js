var flagsuccess = false;
var MobileAppInstall = {
	name : "MobileAppInstall",
	init : function(){
		MobileAppInstall.fn.addBtnEvent();
		//Kakao.init('bd315af3d4805cb5343ce0a0c11b8ef5');
	},
	fn : {
		addBtnEvent : function(){
			
			/*$("#btn_kakao").click(function(event){
				event.preventDefault();
				Kakao.Link.createTalkLinkButton({
			      container: '#btn_kakao',
			      label: '아모레퍼시픽몰 앱 재탄생!!\n28개에 달하는 다양한 브랜드를 쉽고 편하게 만날 수 있는\n아모레퍼시픽몰 앱!\n다운로드하고 엄청난 선물도 받으세요~!\n9월 한달 동안 이벤트가 진행됩니다.\n지금바로 참여하세요~',			     
			      appLink : {
			    	  text : 'http://bit.ly/YY3wyN'
			      }
			    });
			});*/
			
			$("#btn_line").click(function(event){
				event.preventDefault();
				document.location.href = "http://line.me/R/msg/text/?" + encodeURIComponent($("#txt_line").val());
			});
			$("#btn_eventjoin").click(function(event){
				event.preventDefault();
				showMessageBox({
					message : "카카오톡 또는 라인으로 초대한 사진을 캡쳐해서 댓글 등록하면 이벤트 참여가 완료됩니다."
				});
			});
		}
	/*	
		cmAfterEvntComment :function cmAfterEvntComment(flag, idx, replycd) {
			
			cmAjax({
				url 	: GLOBAL_WEB_ROOT + "event/2014/event_2014_open_event_save_ajax.do",
				type	: "post",
				data	: { i_sEventcd : $("input[name='i_sEventcd']").val()},
				dataType : "json",
				success : function(data, textStatus){
					if(data.status == 'succ'){
						// 처음 댓글, 이벤트 응모
						showMessageBox({
							message : "이벤트에 응모되었습니다."
							, close : function () {
								CmComment.fn.doWriteEndPrc(flag, idx, replycd);
							}
						});
					} else {
						// 이미 참여한 이벤트
						CmComment.fn.doWriteEndPrc(flag, idx, replycd);
					}
				}
			});
		}*/
	}
};