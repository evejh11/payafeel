
var MobileMyMain = {
	name : "MobileMyMain",
	init : function() {
		MobileMyMain.fn.getPageInit();
		MobileMyMain.fn.addBtnEvent();
		MobileMyMain.fn.fnFrdInviteChk();

		var flagreward = $("input[name='i_sFlagRewardPop']").val();
        if(flagreward != undefined && flagreward != "" && flagreward == "Y"){
//        	modalPopup("#mypouch_changeBenefit");
        }
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

	        $(".btn_reward_update").unbind("click").click(function(event){
	        	event.preventDefault();
	        	cmAjax({
					url		: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_reward_notice_update_ajax.do",
					type	: "post",
					data	: { },
					dataType	: "json",
					success 	: function(data, textStatus){
						if(data.status == 'succ'){
							showMessageBox({
								message : "변경된 혜택을 확인하셨습니다.<br/>감사합니다."
								, close : function(){
									modalPopupClose("#mypouch_changeBenefit");
								}
							});
						}
						else{
							showMessageBox({
								message : data.message
							});
						}
					}
				});
	        });
		},
		getPageInit : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_main_ajax.do",
				type : "POST",
				dataType : "json",
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
//						MobileMyMain.fn.setUserInfo(data.object);
						MobileMyMain.fn.setRenewUserInfo(data.object);
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
			$(".p_dateArea").text(year + "년 " +month+"월 기준");

			var userinfo = object.user;
			var levelnm = userinfo.userInfo.v_levelnm;

			var namehtml = usernm+"님은 <br/><em>"+levelnm.replace("회원", "")+"회원</em>입니다.";

			$(".p_nameArea").html(namehtml);
			$(".span_icoArea").addClass("m"+userinfo.userInfo.n_levelno);

			var year_orderPrice = userinfo.order.n_pay_total;
			var gradePrice = userinfo.grade.n_pay_total;

			$(".p_yPrice>em").text(SetNumComma(year_orderPrice));

			var next_price = 0;
			var grade = "";

			if(parseInt(year_orderPrice) < 200000) {
				next_price = 200000 - parseInt(year_orderPrice);
				grade = "VIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VIP++";
				}
			} else if(parseInt(year_orderPrice) >= 200000 && parseInt(year_orderPrice) < 500000) {
				next_price = 500000 - parseInt(year_orderPrice);
				grade = "VVIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VVIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VVIP++";
				}
			} else {
				next_price = 0;
				grade = "VVIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VVIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VVIP++";
				}
			}

			if(levelnm == "VVIP" && grade != "VVIP"){
				next_price = 500000 - parseInt(year_orderPrice);
				$(".p_Mgrade").hide();
                $(".p_vvip").html("다음달 <em>VVIP</em>등급을 유지하기 위해 필요한 구매금액").show();
			} else if(levelnm == "VVIP+" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
				next_price = 500000 - parseInt(year_orderPrice);
				$(".p_Mgrade").hide();
                $(".p_vvip").html("다음달 <em>VVIP+</em>등급을 유지하기 위해 필요한 구매금액").show();
			} else if(levelnm == "VVIP++" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
				next_price = 500000 - parseInt(year_orderPrice);
				$(".p_Mgrade").hide();
                $(".p_vvip").html("다음달 <em>VVIP++</em>등급을 유지하기 위해 필요한 구매금액").show();
			}

			$(".p_Mgrade>em").text(grade);

			$(".p_nPrice>em").text(SetNumComma(next_price));

			var couponCnt = userinfo.couponCnt;
			$(".em_couponCnt").text(SetNumComma(couponCnt));

			var totalGiftCardPrice = object.totalGiftCardPrice;
			$(".em_giftcard").text(SetNumComma(totalGiftCardPrice));

			$(".dd_user_mpoint>em").text(SetNumComma(userinfo.userInfo.n_mpoint));
			$(".em_bpoint_grade").text(object.bpoint.v_bpoint_grade);
			$(".dd_extinc_mpoint>").text(SetNumComma(userinfo.userInfo.n_loss_mpoint));

			$(".dd_user_bpoint>em").text(SetNumComma(object.bpoint.n_bpoint));
			$(".dd_user_lose_bpoint>em").text(SetNumComma(object.bpoint.n_lose_point));

			var deliveryCnt = parseInt(userinfo.userInfo.n_deli_addr_cnt);

			if(deliveryCnt > 0) {
				$(".dd_myAdd").text(deliveryCnt + "개 등록");
			} else {
				$(".dd_myAdd").text("미등록");
			}

			var monthCnt = userinfo.monthCnt;
			$(".em_0001").text(monthCnt.v_status_0001);
			$(".em_0002").text(monthCnt.v_status_0002);
			$(".em_0003").text(monthCnt.v_status_0003);
			$(".em_0004").text(monthCnt.v_status_0004);
			$(".em_0005").text(monthCnt.v_status_0005);
			$(".em_0022").text(monthCnt.v_status_0022);

            //통합커머스 일원화 보상 팝업
            var rewardCompDtm = userinfo.userInfo.v_reward_completed_dtm;
            var rewardCnt = userinfo.userInfo.n_reward_cnt;
            var rewardSite = userinfo.userInfo.v_reward_sitecd;
            var rewardDtm = userinfo.userInfo.v_reward_dtm;

            if(rewardCnt != undefined && rewardCnt != "" && rewardCnt > "0"){
//           	 $("input[name='i_sFlagRewardPop']").val("Y");
//           	 $("input[name='i_sRewardSite']").val(rewardSite);
//           	 $("input[name='i_sRewardDtm']").val(rewardDtm);
	           	if(rewardSite == "AHK") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("마몽드");
	           	}
	           	else if(rewardSite == "ADSK") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("라네즈");
	           	}
	           	else if(rewardSite == "AMM") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("마린에너지");
	           	}

	           	modalPopup("#mypouch_changeBenefit");
            }

			$(".mypouch").show();

		},

		setRenewUserInfo : function(object) {
			var usernm = object.usernm;
			var year = object.year;
			var month = object.month;
			$(".p_dateArea").text(year + "년 " +month+"월 기준");

			var userinfo = object.user;
			var levelnm = userinfo.userInfo.v_levelnm;
			var membersFlag = userinfo.userInfo.v_flag_members;

			var namehtml = usernm+"님은 <strong>"+levelnm.replace("회원", "")+"회원</strong>입니다.";
			$(".p_nameArea").html(namehtml);

			if(levelnm == "VIP" || levelnm == "VIP+" || levelnm == "VIP++") {
				levelImg = "<img src=\""+GLOBAL_MOBILE_IMG_URL+"renew/common/ico_memlv_vip.png\" alt=\"\" />"
			} else if(levelnm == "VVIP" || levelnm == "VVIP+" || levelnm == "VVIP++") {
				levelImg = "<img src=\""+GLOBAL_MOBILE_IMG_URL+"renew/common/ico_memlv_vvip.png\" alt=\"\" />"
			} else {
				levelImg = "<img src=\""+GLOBAL_MOBILE_IMG_URL+"renew/common/ico_memlv_vip.png\" alt=\"\" />"
			}
			$(".p_icoArea").html(levelImg);

			var membersDtAreaHtml = [];
			if(membersFlag === "Y"){
				membersDtAreaHtml.push("<dt>Ap 멤버십 기간</dt>");
				membersDtAreaHtml.push("<dd><strong>" + userinfo.userInfo.v_members_en_dt + "</strong></dd>");
				$("#dl_membersDate").html(membersDtAreaHtml).show();
			}

			//$(".span_icoArea").addClass("m"+userinfo.userInfo.n_levelno);

			var year_orderPrice = userinfo.order.n_pay_total;
			var gradePrice = userinfo.grade.n_pay_total;

			$(".p_yPrice>em").text(SetNumComma(year_orderPrice));

			var next_price = 0;
			var grade = "";
			var levelImg = "";

			if(parseInt(year_orderPrice) < 200000) {
				next_price = 200000 - parseInt(year_orderPrice);
				grade = "VIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VIP++";
				}
			} else if(parseInt(year_orderPrice) >= 200000 && parseInt(year_orderPrice) < 500000) {
				next_price = 500000 - parseInt(year_orderPrice);
				grade = "VVIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VVIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VVIP++";
				}
			} else {
				next_price = 0;
				grade = "VVIP";

				if(userinfo.userInfo.v_levelcd == "LV15" || userinfo.userInfo.v_levelcd == "LV16" || userinfo.userInfo.v_levelcd == "LV17") {
					grade = "VVIP+";
				} else if(userinfo.userInfo.v_levelcd == "LV18" || userinfo.userInfo.v_levelcd == "LV19" || userinfo.userInfo.v_levelcd == "LV20") {
					grade = "VVIP++";
				}
			}
			if(levelnm == "VVIP" && grade != "VVIP"){
				next_price = 500000 - parseInt(year_orderPrice);
				$("#dt_Mgrade").hide();
        $("#dt_vvip").html("다음달 <em>VVIP</em>등급을 유지하기 위해 필요한 구매금액").show();
			} else if(levelnm == "VVIP+" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
				next_price = 500000 - parseInt(year_orderPrice);
				$("#dt_Mgrade").hide();
        $("#dt_vvip").html("다음달 <em>VVIP+</em>등급을 유지하기 위해 필요한 구매금액").show();
			} else if(levelnm == "VVIP++" && (grade != "VVIP" && grade != "VVIP+" && grade != "VVIP++")) {
				next_price = 500000 - parseInt(year_orderPrice);
				$("#dt_Mgrade").hide();
        $("#dt_vvip").html("다음달 <em>VVIP++</em>등급을 유지하기 위해 필요한 구매금액").show();
			}

			$("#dt_Mgrade>em").text(grade);

			$("#dd_nPrice>strong").text(SetNumComma(next_price)+"원");

			var couponCnt = userinfo.couponCnt;
			$("#dd_couponCnt>strong").text(SetNumComma(couponCnt)+"개");

			var totalGiftCardPrice = object.totalGiftCardPrice;
			$("#dd_giftcard>strong").text(SetNumComma(totalGiftCardPrice)+"원");

			$(".dd_user_mpoint>em").text(SetNumComma(userinfo.userInfo.n_mpoint));
			$("#span_bpoint_grade").text(object.bpoint.v_bpoint_grade);
			$(".dd_extinc_mpoint>").text(SetNumComma(userinfo.userInfo.n_loss_mpoint));

			$("#dd_user_bpoint>strong").text(SetNumComma(object.bpoint.n_bpoint)+"P");
			$(".dd_user_lose_bpoint>em").text(SetNumComma(object.bpoint.n_lose_point));

			var deliveryCnt = parseInt(userinfo.userInfo.n_deli_addr_cnt);

			if(deliveryCnt > 0) {
				$(".dd_myAdd").text(deliveryCnt + "개 등록");
			} else {
				$(".dd_myAdd").text("미등록");
			}

			var monthCnt = userinfo.monthCnt;
			$("#dd_0001>strong").text(monthCnt.v_status_0001);
			$("#dd_0002>strong").text(monthCnt.v_status_0002);
			$("#dd_0003>strong").text(monthCnt.v_status_0003);
			$("#dd_0004>strong").text(monthCnt.v_status_0004);
			$("#dd_0005>strong").text(monthCnt.v_status_0005);
			$("#dd_0022>strong").text(monthCnt.v_status_0022);

            //통합커머스 일원화 보상 팝업
            var rewardCompDtm = userinfo.userInfo.v_reward_completed_dtm;
            var rewardCnt = userinfo.userInfo.n_reward_cnt;
            var rewardSite = userinfo.userInfo.v_reward_sitecd;
            var rewardDtm = userinfo.userInfo.v_reward_dtm;

            if(rewardCnt != undefined && rewardCnt != "" && rewardCnt > "0"){
//           	 $("input[name='i_sFlagRewardPop']").val("Y");
//           	 $("input[name='i_sRewardSite']").val(rewardSite);
//           	 $("input[name='i_sRewardDtm']").val(rewardDtm);
	           	if(rewardSite == "AHK") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("마몽드");
	           	}
	           	else if(rewardSite == "ADSK") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("라네즈");
	           	}
	           	else if(rewardSite == "AMM") {
	           		$(".brand_name", $("#mypouch_changeBenefit")).text("마린에너지");
	           	}

	           	modalPopup("#mypouch_changeBenefit");
            }

			$(".mypouch").show();

		}

		, fnFrdInviteChk : function() {
			if(!isEmpty($("input[name='i_sFrdUserid']").val())) {
				showMessageBox({
					message : "친구추천이벤트 선물이 도착했어요!<br/><br/>마이파우치 > 마이기프트카드에서 확인하세요!"
					, close : function() {
						MobileCommon.ajax({
							url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_save_ajax.do",
							type : "POST",
							dataType : "json",
							data : {
								i_sFrdUserid : $("input[name='i_sFrdUserid']").val()
								, i_sFlagAction : "M"
							},
							animation : false,
							async : false,
							success : function(data, textStatus) {
								document.location.href = GLOBAL_SSL_URL + "mobile/my/mobile_my_giftcard_list.do";
							}
						});
					}
				});
			}
		}
	}
};
