
var MobileMyMain = {
	name : "MobileMyMain",
	init : function() {
		MobileMyMain.fn.getPageInit();
		MobileMyMain.fn.addBtnEvent();
	},
	fn : {
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			
			select_input.click(function() {
				location.href	= GLOBAL_SSL_URL + "mobile/my/" + $(this).val() + ".do";
			});
		},
		addBtnEvent : function() {
			var $tabCate = $(".gradeBenufit .tab_cate"); 
	        var $tabCont = $(".gradeBenufit .tab_cont");

	        $tabCate.unbind("click").click(function(event){
	        	event.preventDefault();
	            var $idxTab = $tabCate.index(this);
	            $tabCont.hide().eq($idxTab).show();      
	            $tabCate.removeClass("active").eq($idxTab).addClass("active");
	            return false;
	            
	        });
		},
		getPageInit : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_main_sns_ajax.do",
				type : "POST",
				dataType : "json",
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMyMain.fn.setUserInfo(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setUserInfo : function(object) {
			var usernm = object.usernm;
			var year = object.year;
			var month = object.month;
			$(".p_dateArea").text(year + "년 " +month+"월");
			
//			var userinfo = object.user;
//			var levelnm = userinfo.userInfo.v_levelnm;
//			
//			var namehtml = usernm+"님은 <em>"+levelnm.replace("회원", "")+"</em>회원 이십니다.";
//			
//			$(".p_nameArea").html(namehtml);
//			$(".span_icoArea").addClass("m"+userinfo.userInfo.n_levelno);
//			
//			var year_orderPrice = userinfo.order.n_pay_total;
//			var gradePrice = userinfo.grade.n_pay_total;
//			
//			$(".p_yPrice>em").text(SetNumComma(year_orderPrice));
//			
//			var next_price = 0;
//			var grade = "";
//			
//			if(parseInt(year_orderPrice) < 200000) {
//				next_price = 200000 - parseInt(year_orderPrice);
//				grade = "VIP";
//				
//				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
//					grade = "VIP+";
//				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
//					grade = "VIP++";
//				}
//			} else if(parseInt(year_orderPrice) >= 200000 && parseInt(year_orderPrice) < 500000) {
//				next_price = 500000 - parseInt(year_orderPrice);
//				grade = "VVIP";
//				
//				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
//					grade = "VVIP+";
//				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
//					grade = "VVIP++";
//				}
//			} else {
//				next_price = 0;
//				grade = "VVIP";
//				
//				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
//					grade = "VVIP+";
//				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
//					grade = "VVIP++";
//				}
//			}
//			
//			if(levelnm == "VVIP" && grade != "VVIP"){
//				$(".p_Mgrade").hide();
//                $(".p_vvip").html("다음달 <em>VVIP</em>등급을 유지하기 위해 필요한 구매금액").show();
//			} else if(levelnm == "VVIP+" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
//				$(".p_Mgrade").hide();
//                $(".p_vvip").html("다음달 <em>VVIP+</em>등급을 유지하기 위해 필요한 구매금액").show();
//			} else if(levelnm == "VVIP++" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
//				$(".p_Mgrade").hide();
//                $(".p_vvip").html("다음달 <em>VVIP++</em>등급을 유지하기 위해 필요한 구매금액").show();
//			}
//			
//			$(".p_Mgrade>em").text(grade);
//			
//			$(".p_nPrice>em").text(SetNumComma(next_price));
//			
//			var couponCnt = userinfo.couponCnt;
//			$(".em_couponCnt").text(couponCnt);
//			
//			var totalGiftCardPrice = object.totalGiftCardPrice;
//			$(".em_giftcard").text(SetNumComma(totalGiftCardPrice));
//			
//			$(".dd_user_mpoint>em").text(SetNumComma(userinfo.userInfo.n_mpoint));
//			$(".em_bpoint_grade").text("\"" + object.bpoint.v_bpoint_grade + "\"");
//			$(".dd_extinc_mpoint>").text(SetNumComma(userinfo.userInfo.n_loss_mpoint));
//			
//			$(".dd_user_bpoint>em").text(SetNumComma(object.bpoint.n_bpoint));
//			$(".dd_user_lose_bpoint>em").text(SetNumComma(object.bpoint.n_lose_point));
			
			var deliveryCnt = object.deliverycnt;
			
			if(deliveryCnt > 0) {
				$(".dd_myAdd").text(deliveryCnt + "개 등록");
			} else {
				$(".dd_myAdd").text("미등록");
			}
			
			var monthCnt = object.monthcnt;
			$(".em_0001").text(monthCnt.v_status_0001);
			$(".em_0002").text(monthCnt.v_status_0002);
			$(".em_0003").text(monthCnt.v_status_0003);
			$(".em_0004").text(monthCnt.v_status_0004);
			$(".em_0005").text(monthCnt.v_status_0005);
			$(".em_0022").text(monthCnt.v_status_0022);
			
			$(".mypouch").show();
		}
	}
};