var timer;
var timer2;
var timerRunning = false;
var timerID = null;
var initial = new Date();
var count = 0;

// //////////////////////////////////////////////
/*
 * Count down 일때 Event intervals 설정
 */
var intervals = 4000;
var sec1 = 0;
var sec2 = 0;
var milisec1 = 0;
var milisec2 = 0;
// //////////////////////////////////////////////
var Candle = {
	max_top : 0,
	max_left : 0,
	init : function(p_opt) {
		var opt = p_opt || {};

		Candle.max_top = opt.max_top || 500;
		Candle.max_left = opt.max_left || 400;
	}
};
var MobileAnniversary4th = {
	name : "MobileAnniversary4th",
	init : function() {
		MobileAnniversary4th.fn.addBtnEvent();
		MobileAnniversary4th.fn.setAppList(1);
		Candle.init({
			max_top : 500,
			max_left : 400
		});
		
		if(GLOBAL_MOBILE_APP == "APP"){
			if(!IS_LOGIN){
				document.frm_login.submit();
			}else{
				
				if($(".span_flag_do").text() == "N"){
					
					
					var i_sClrkey = $(".span_logincd").text();
					if(i_sClrkey == null || i_sClrkey == "" || i_sClrkey == undefined){
						i_sClrkey = $.cookie('APMALL_CLRKEY');
					}
					
					var url = "http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=EVT20150101&i_sFlagEventTab=Y&i_sClrkey="+i_sClrkey;
					if (GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS') {
						window.location = "apjscall://goTargetWithOutter?" + url;
					} else {
						window.Android.jsNewWebView(url);
					}
				}else{
					if ($(".span_flag_win").text() == "S") {
						if ($(".span_flag_share").text() != "") {
							// 성공도 하고 공유도함
							$("#evtReady").css("display", "none");
							$("#evtSuccAll").css("display", "");
						} else {
							var i_sClrkey = $(".span_logincd").text();
							if(i_sClrkey == null || i_sClrkey == "" || i_sClrkey == undefined){
								i_sClrkey = $.cookie('APMALL_CLRKEY');
							}
							var url = "http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=EVT20150101&i_sFlagEventTab=Y&i_sClrkey="+i_sClrkey;
							if (GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS') {
								window.location = "apjscall://goTargetWithOutter?" + url;
							} else {
								window.Android.jsNewWebView(url);
							}
						}
					} else {
						// 실패
						$("#evtReady").css("display", "none");
						$("#evtFail").css("display", "");
					}
				}
			}
		}else{
			if($(".span_flag_do").text() == "Y"){
				if ($(".span_flag_win").text() == "S") {
					if ($(".span_flag_share").text() != "") {
						// 성공도 하고 공유도함
						$("#evtReady").css("display", "none");
						$("#evtSuccAll").css("display", "");
					} else {
						//성공했으나 공유안함
						$("#evtReady").css("display", "none");
						$("#evtSucc").css("display", "");
						$("#btn_nextStep").unbind("click").click(function(event){
							event.preventDefault();
							MobileAnniversary4th.fn.eventCheck("FS");
						});
					}
				} else {
					// 실패
					$("#evtReady").css("display", "none");
					$("#evtFail").css("display", "");
				}
			}else{
				$("#evtReady").css("display", "");
			}
		}

	},
	fn : {
		setAppList : function(pg) {
			if (pg == null || pg == '') {
				pg = 1;
			}

			var frm = $("form[name='frm']");
			
			var i_iTotalPageCnt = $("input[name='i_iTotalPageCnt']", frm).val();
			var i_iNowPageNo = $("input[name='i_iNowPageNo']", frm).val();
			if (parseInt(i_iNowPageNo) >= parseInt(i_iTotalPageCnt)) {
				$(".btn_more").hide();
			} else {
				$(".btn_more").show();
			}

			$("input[name='i_iNowPageNo']", frm).val(pg);
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_anniversary_4th_app_include_ajax.do",
				type : "post",
				data : {
					i_sEventcd : $(".span_eventcd_anni").text(),
					i_iNowPageNo : pg,
					i_iPageSize : 5,
					i_sCallback : "MobileAnniversary4th.fn.setAppList"
				},
				dataType : "html",
				success : function(html) {
					
					if(pg == 1){
						$("#appListArea").html(html);
					}else{
						$("#appListArea").append(html);
					}
					var frm_evt = $("form[name='frm_evt']");
					var i_iRecordCnt = $("#i_iRecordCnt_Evt",frm_evt).val();
					$(".span_commentCnt").text(i_iRecordCnt);
					// Anniversary4th.fn.addBtnEvent();
				}
			});
		},

		addBtnEvent : function() {
			$("#btn_start").unbind("click").click(function(event) {
				event.preventDefault();
				
				if(GLOBAL_MOBILE_APP == "APP"){
					var i_sClrkey = $(".span_logincd").text();
					if(i_sClrkey == null || i_sClrkey == "" || i_sClrkey == undefined){
						i_sClrkey = $.cookie('APMALL_CLRKEY');
					}
					var url = "http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=EVT20150101&i_sFlagEventTab=Y&i_sClrkey="+i_sClrkey;
					if (GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS') {
						window.location = "apjscall://goTargetWithOutter?" + url;
					} else {
						window.Android.jsNewWebView(url);
					}
						
				}else{
					MobileAnniversary4th.fn.eventCheck("S");
				}
				
			});

			$("#btn_eventjoin").unbind("click").click(function(event) {
				event.preventDefault();
				if (!IS_LOGIN) {
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function() {
							document.frm_login.submit();
						}
					});
				} else {
					var userRid = $("input[name='i_sRandom']").val();
					var eventcd = $(".span_eventcd_anni").text();
				}
			});

			$(".btn_more").unbind("click").click(function(event) {
				event.preventDefault();
				var i_iNowPageNo = parseInt($("#i_iNowPageNo").val()) + 1;
				$('#i_iNowPageNo').val(i_iNowPageNo);

				MobileAnniversary4th.fn.setAppList(i_iNowPageNo);
			});

			$("#btn_reset").click(function(event) {
				event.preventDefault();

				var eventcd = $(".span_eventcd_anni").text();
				if (!IS_LOGIN) {
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function() {
							document.frm_login.submit();
						}
					});
				} else {
					cmAjax({
						url : GLOBAL_WEB_ROOT + "event/2015/event_2015_anniversary_4th_check_ajax.do",
						type : "post",
						dataType : "json",
						data : {
							i_sEventcd : eventcd,
							i_sFlagAction : "R"
						},
						success : function(data, textStatus) {
							if (data.status == "succ") {
								showMessageBox({
									message : "초기화 완료",
									close : function() {
										document.frm_reload.submit();
									}
								});
							}
						}
					});
				}
			});

			
		},
		eventCheck : function(flag) {
			var validate = false;
			var eventcd = $(".span_eventcd_anni").text();
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_anniversary_4th_check_ajax.do",
				type : "post",
				data : {
					i_sFlagAction : flag,
					i_sEventcd : eventcd
				},
				dataType : "json",
				success : function(data, textStatus) {
					if (data.status == "succ") {
						if (flag == "S") {
							$("#evtReady").css("display", "none");
							$("#evtStart").css("display", "");
							// 초 돌리기 시작

							MobileAnniversary4th.fn.setStartEvent();

							// MobileAnniversary4th.fn.start_watch();
							MobileAnniversary4th.fn.setCandleMove($("#candleArea"));
							MobileAnniversary4th.fn.setCandleMove($("#candleArea2"));
							MobileAnniversary4th.fn.setCandleMove($("#candleArea3"));
							MobileAnniversary4th.fn.setCandleMove($("#candleArea4"));

							timer = setInterval(function() {
								MobileAnniversary4th.fn.setCandleMove($("#candleArea"));
								MobileAnniversary4th.fn.setCandleMove($("#candleArea2"));
								MobileAnniversary4th.fn.setCandleMove($("#candleArea3"));
								MobileAnniversary4th.fn.setCandleMove($("#candleArea4"));
							}, 700);

							MobileAnniversary4th.fn.addBtnEvent2();

						} else if (flag == "FS") {
							var userRid = $("input[name='i_sRandom']").val();
							var t_link = GLOBAL_WEB_URL + "comm/" + userRid
									+ "/comm_sns_log_img_check.do";
							var image = $(".span_snsimgpath").text();
							var rvo = {
								name : "APMALL 4주년 이벤트",
								link : GLOBAL_WEB_URL + "comm/" + userRid
										+ "/comm_sns_log_check.do?i_sMobile=Y",
								picture : image,
								description : "2015년, 1월, 아모레퍼시픽몰(APmall)이 탄생 4주년을 맞이하였습니다.<br/>APmall을 사랑해주시는 여러분들께 감사하는 마음으로 준비한  1월의 혜택!!<br/>APmall에서 준비한 선물과 함께하는 멋진 새해를 맞이하세요!"
							};

							MobileAnniversary4th.fn.facebookShare(rvo, eventcd,userRid);
						}
					} else {
						if (data.object == "login") {
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function() {
									document.frm_login.submit();
								}
							});
						} else if (data.object == "already") {
							showMessageBox({
								message : "4주년 이벤트는 하루 한 번만 참여 가능합니다.<br/>내일 다시 도전해 주세요."
							});
						} else if (data.object == "notsucc" && flag == "FS") {
							showMessageBox({
								message : "오늘 성공 내역이 없습니다."
							});
						} else {
							showMessageBox({
								message : data.message
							});
						}
						validate = false;
					}
					return validate;
				}
			});
		},
		addBtnEvent2 : function() {
			$("#candle01").click(function() {

					var img_src = $(this).attr("src");
					var id = $(this).attr("id");
					if (img_src.indexOf("m_candle_01_01.png") > -1) {
						$("#candle01").prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_01_02.png");
					} else if (img_src.indexOf("m_candle_01_02.png") > -1) {
						$("#candle01").prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_01_03.png");
					}

					MobileAnniversary4th.fn.checkedCandleStatus(id);
					// 촛불 다꺼졌는지 체크 function 호출
				});

			$("#candle02").click(function() {

					var img_src = $(this).attr("src");
					var id = $(this).attr("id");
					if (img_src.indexOf("m_candle_02_01.png") > -1) {
						$("#candle02").prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_02_02.png");
					} else if (img_src.indexOf("m_candle_02_02.png") > -1) {
						$("#candle02").prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_02_03.png");
					}

					MobileAnniversary4th.fn.checkedCandleStatus(id);
					// 촛불 다꺼졌는지 체크 function 호출
				});
			$("#candle03").click(function() {

					var img_src = $(this).attr("src");
					var id = $(this).attr("id");
					if (img_src.indexOf("m_candle_03_01.png") > -1) {
						$("#candle03").prop("src", ""+ GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_03_02.png");
					} else if (img_src.indexOf("m_candle_03_02.png") > -1) {
						$("#candle03").prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_03_03.png");
					}

					MobileAnniversary4th.fn.checkedCandleStatus(id);
					// 촛불 다꺼졌는지 체크 function 호출
				});
			$("#candle04").click(function() {

				var img_src = $(this).attr("src");
				var id = $(this).attr("id");
				if (img_src.indexOf("m_candle_04_01.png") > -1) {
					$("#candle04")
							.prop("src", "" + GLOBAL_MOBILE_IMG_URL + "event/event2015/m_candle_04_02.png");
				} else if (img_src.indexOf("m_candle_04_02.png") > -1) {
					$("#candle04").prop("src", "" + GLOBAL_MOBILE_IMG_URL+ "event/event2015/m_candle_04_03.png");
				}
				MobileAnniversary4th.fn.checkedCandleStatus(id);
				// 촛불 다꺼졌는지 체크 function 호출
			});
		},
		eventSave : function(winflag) {
			var eventcd = $(".span_eventcd_anni").text();
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_anniversary_4th_save_ajax.do",
				type : "post",
				data : {
					i_sEventcd : eventcd,
					i_sFlagWin : winflag
				},
				dataType : "json",
				success : function(data, textStatus) {
					if (data.status == "succ") {
						if (winflag == "S") {
							$("#btn_nextStep").unbind("click").click(
									function(event) {
										event.preventDefault();
										MobileAnniversary4th.fn.eventCheck("FS");
									});
						} else {
							return false;
						}
					} else {
						if (data.object == "login") {
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function() {
									document.frm_login.submit();
								}
							});
						}
					}
				}
			});
		},
		facebookShare : function(rvo, eventcd, userRid) {
			if (rvo != null && rvo != undefined) {

				FB.init({
					appId : "1470496013186362",
					status : true,
					cookie : true,
					version : 'v2.0'
				});

				FB.ui({
					method : "feed",
					name : rvo.name,
					link : rvo.link,
					picture : rvo.picture,
					description : rvo.description,
					redirect_uri:	"https://www.facebook.com"
				},
				function(response) {
					if (response && response.post_id) {
						cmAjax({
							url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_anniversary_4th_save_ajax.do",
							type : "post",
							data : {
								i_sEventcd : eventcd,
								i_sBuffer1 : response.post_id,
								i_sFlagAction : "U"
							},
							dataType : "json",
							success : function(data, textStatus) {
								if (data.status == "succ") {
									showMessageBox({
										message : "응모되었습니다."
										, close : function(){
											var frm = $("form[name='frm']");
											if ($(".span_flag_app",frm).text() == 'Y') {

												var url = "http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=EVT20150101";

												location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
											}else{
												self.close();
												document.frm_reload.submit();
											}
											
										}
									});
									
								}else{
									if (data.object == "login") {
										showConfirmBox({
											message : "로그인 하시면 서비스 이용이 가능하세요!",
											ok_func : function() {
												document.frm_login.submit();
											}
										});
									}
								}
							}
						});
					}
				});
			}
		},
		
		setCandleMove : function(candle) {

			var r_left = MobileAnniversary4th.fn.getRandom();
			var left = fnOnlyNumber(candle.css("margin-left")).number;
			var d_left = candle.data("d_left") || "+";

			d_left = MobileAnniversary4th.fn.getDirection(d_left, left, r_left);
			candle.data("d_left", d_left);

			candle.animate({
				"margin-left" : d_left + "=" + r_left + "px"
			}, 700);
		},

		printLog : function(str) {
			try {
				console.log(str);
			} catch (e) {
			}
		},

		getRandom : function() {
			var r = Math.floor((Math.random() * (50 - 0 + 1)) + 0);
			return r;
		},

		getDirection : function(dir, n, m, max, min) {
			var r = Math.floor((Math.random() * (2 - 0 + 1)) + 0);

			if (r == "0") {
				if (dir == "+") {
					dir = "-";
				} else {
					dir = "+";
				}
			}

			if (dir == "+") {
				if (parseInt(n + m) > 50) {
					dir = "-";
				}
			} else if (dir == "-") {
				if (parseInt(n - m) <= 0) {
					dir = "+";
				}
			}

			return dir;
		},

		start_watch : function() {
			initial = new Date();
			startTime = initial.getTime();
			MobileAnniversary4th.fn.showTimer();
		},

		stopTimer : function() {
			if (timerRunning)
				;
			clearTimeout(timerID);
			timerRunning = false;
			MobileAnniversary4th.fn.stopCandleMove();
		},

		showTimer : function() {
			var current = new Date();
			var curTime = current.getTime();
			var dif = curTime - startTime;
			var result = dif / 1000;
			if (result < 1)
				result = "0" + result;
			result = result.toString();
			if (result.indexOf(".") == -1)
				result += ".00";
			if (result.length - result.indexOf(".") <= 2)
				result += "0";
			$("#span_limit_time").text(result);
			timerID = setTimeout("MobileAnniversary4th.fn.showTimer()", 0);
			timerRunning = true;
			if (result > 4)
				MobileAnniversary4th.fn.stopTimer();
		},

		showTimer : function() {
			var current = new Date();
			var curTime = current.getTime();
			var dif = curTime - startTime;
			var result = dif / 1000;
			if (result < 1)
				result = "0" + result;
			result = result.toString();
			if (result.indexOf(".") == -1)
				result += ".00";
			if (result.length - result.indexOf(".") <= 2)
				result += "0";
			$("#span_limit_time").text(result);
			timerID = setTimeout("MobileAnniversary4th.fn.showTimer()", 0);
			timerRunning = true;
			if (result > 4)
				MobileAnniversary4th.fn.stopTimer();
		},

		stopCandleMove : function() {
			clearInterval(timer);

			/* 카운트 다운일때 */
			clearTimeout(timer2);

			$("#candle01").unbind("click");
			$("#candle02").unbind("click");
			$("#candle03").unbind("click");
			$("#candle04").unbind("click");
			var flag = "";

			if (count == 4) {
				flag = "S";
				$("#evtStart").css("display", "none");
				$("#evtSucc").css("display", "");
			} else {
				flag = "F";
				$("#evtStart").css("display", "none");
				$("#evtFail").css("display", "");
			}
			MobileAnniversary4th.fn.eventSave(flag);
		},

		checkedCandleStatus : function(id) {
			var img_src = $("#" + id + "").attr("src");
			var num = id.substr(6, 7);
			if (img_src.indexOf("m_candle_" + num + "_03.png") > -1) {
				count += 1;
				$("#" + id + "").unbind("click");
			}

			if (count == 4) {
				MobileAnniversary4th.fn.stopCandleMove();
			}
		},

		/* 카운트 다운 Start */
		setStartEvent : function() {
			setTimeout(MobileAnniversary4th.fn.setCountDown, 10);
		},

		/* 카운트 다운 Start */
		setCountDown : function(s) {

			if (intervals > 0) {
				if (intervals > 999) {

					sec1 = intervals.toString().substring(0, 1);
					sec2 = intervals.toString().substring(1, 2);
					milisec1 = intervals.toString().substring(2, 3);
					milisec2 = intervals.toString().substring(3, 4);

					$("#sec01").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/red_num_0"+ sec1 + ".png");
					$("#sec02").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/red_num_0"+ sec2 + ".png");
					$("#milisec01").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_0"+ milisec1 + ".png");
					$("#milisec02").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_0"+ milisec2 + ".png");

				} else if (intervals > 99 && intervals < 1000) {

					sec2 = intervals.toString().substring(0, 1);
					milisec1 = intervals.toString().substring(1, 2);
					milisec2 = intervals.toString().substring(2, 3);
					$("#sec01").prop("src", "" + GLOBAL_IMG_URL+ "event/event2015/red_num_00.png");
					$("#sec02").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/red_num_0"+ sec2 + ".png");
					$("#milisec01").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_0"+ milisec1 + ".png");
					$("#milisec02").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_0"+ milisec2 + ".png");

				} else if (intervals > 9 && intervals < 100) {
					milisec1 = intervals.toString().substring(1, 2);
					milisec2 = intervals.toString().substring(2, 3);

					$("#sec01").prop("src", "" + GLOBAL_IMG_URL+ "event/event2015/red_num_00.png");
					$("#sec02").prop("src", "" + GLOBAL_IMG_URL+ "event/event2015/red_num_00.png");
					$("#milisec01").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_0"+ milisec1 + ".png");
					$("#milisec02").prop("src", "" + GLOBAL_IMG_URL + "event/event2015/black_num_00.png");
				}
			}

			$("#span_limit_time").text(intervals);
			timer2 = setTimeout(MobileAnniversary4th.fn.setCountDown, 10); // 0.01초
			intervals--;
			if (intervals > 0) {
			} else {
				MobileAnniversary4th.fn.stopCandleMove();
			}
		}
	}
};
