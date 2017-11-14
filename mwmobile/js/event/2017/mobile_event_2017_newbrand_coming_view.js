
var MobileNewBrand = {
	name : "MobileNewBrand",
	init : function() {
		MobileNewBrand.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function() {
			var eventcd = $("#i_sEventcd").val();
			var thumbnail = $("#i_sEventBnrPath").val();
			var snspath	  = $("#i_sEventSnsPath").val();
			var eventnm = $("input[name='i_sEventnm']").val();
			var description = $("input[name='i_sEventDescrip']").val();
			
			$(".btn_fb").unbind("click").click(function(event){
				event.preventDefault();
				if(GLOBAL_MOBILE_APP == "APP"){
  					var link = "http://www.amorepacificmall.com/event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd="+eventcd;
  					var str = "facebook::i_sName::"+encodeURI(eventnm)+"::i_sLink::"+link+"::i_sDescription::"+encodeURI(description)+"::i_sPicture::"+thumbnail;
  					
  					window.location = str;
  				}else{
  					var rvo = {
  	      					name : eventnm
  	      					,link : GLOBAL_WEB_URL+"event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd="+eventcd
  	      					,picture : thumbnail
  	      					,description : description
  	      				};
  	      				MobileEventView.fn.facebookShare(rvo,"Y");
  				}
			});
			
			$(".btn_url").unbind("click").click(function(event){
  	        	event.preventDefault();
  	        	$("#i_sCopyUrl").val("http://www.amorepacificmall.com/event/event_direct_list.do?i_sEventcd="+eventcd);
  	        	modalPopupClose("#modalPopupEvtShare");
  	        	modalPopup("#modalPopupCopyUrl");
  	        	document.getElementById("i_sCopyUrl").focus();
  	    		document.getElementById("i_sCopyUrl").select();
	        });
			
			$(".kakaostory_share").click(function(event){
           	 	if(GLOBAL_MOBILE_APP == "APP") {
 					var longurl = 'http://www.amorepacificmall.com/event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd='+eventcd;
 					var shortstr = MobileEventView.fn.setShortenUrl(longurl);
 					var str = "kakaostory::i_sUrl::"+shortstr+"::i_sImgPath::"+snspath+"::i_sText::"+encodeURI("[APmall] \"아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)\"")+"::i_sTitle::"+encodeURI(eventnm)+"::i_sDescription::"+encodeURI(description);
 					 
 			    	window.location = str;
 				}else{
    		    	Kakao.Story.share({
    		    		url: GLOBAL_WEB_URL+'event/event_direct_list.do?i_sFlagSnsBrowser=Y&i_sEventcd='+eventcd,
    		    		text: "[Apmall] 뷰티 인 아모레퍼시픽 아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)"
    		    	});
    		    	Kakao.Story.cleanup();
 				}
			});
		}
		, facebookShare : function(rvo, flag){
			if(rvo !=null && rvo !=undefined){
				
				FB.init({appId:"1532234350418822", status: true, cookie: true});
	
				FB.ui ({
							method: "feed",
							name: rvo.name,
			    			link: rvo.link,
			    			picture: rvo.picture,
			    			description: rvo.description
			    		},	function(response) {
			    				if(response && response.post_id){
						    		showMessageBox({
						    			message : "공유되었습니다."
						    		});
						    	}
			    		}
			    );
			}
		}
	}
};
