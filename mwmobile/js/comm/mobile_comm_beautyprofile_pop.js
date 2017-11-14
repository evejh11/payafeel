/**
 * 모바일 뷰티프로파일 이벤트 처리를 위한 Javascript
 */
var	MobileBeautyProfile = {
	name : "MobileBeautyProfile",

	init : function() {
		
	},

	fn : {
		addPopupBtnEvent : function(id){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT +"mobile/comm/mobile_comm_beautyprofile_pop.do",
				type: "post",
				data: {i_sUserid : id},
				dataType: "json",
				animation : false,
				async : false,
				success : function(data,textStatus,jqXHR){
					if(data.status == 'succ'){
						
						var profile = data.object;
						if(profile != "" && profile != undefined){
							var length = profile.length;
							var trouble= "";
							var makeupstyle="";
							for(var i=0; i<length; i++){
								if(profile[i].v_tag_typecd == 'SKIN_TROUBLE'){
									if(profile[i].v_skin_trouble_nm != undefined){
										if(trouble == ""){
											trouble= profile[i].v_skin_trouble_nm;
										}else{
											trouble= trouble+", "+profile[i].v_skin_trouble_nm;
										}
									}
									
								}else{
									if(profile[i].v_tag_nm != undefined){
										if(makeupstyle == ""){
											makeupstyle= profile[i].v_tag_nm;
										}else{
											makeupstyle= makeupstyle+", "+profile[i].v_tag_nm;
										}
									}
								}
							}
							if(profile[0].v_nickname != undefined && profile[0].v_nickname!=""){
								$("#nickname").text(profile[0].v_nickname);	
							}else{
								$("#nickname").text(getStringReverseHidden(profile[0].v_userid,3));
							}
							
							$("#age").text(changeAgeYear(profile[0].v_birth_year));
							var sex = "";
							if(profile[0].v_sex == 'M'){
								sex = "남성";
							}else{
								sex = "여성";
							}
							$("#sex").text(sex);
							$("#skintype").text(profile[0].v_skin_typenm);
							$("#trouble").text(trouble);
							$("#skintone").text(profile[0].v_skin_tonenm);
							$("#makeup").text(makeupstyle);
							modalPopup("#modalPopupBeautyprofile");
							
						}
						
					}
				}
			});
		}
	
	
	}
	
};