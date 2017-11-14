
function showMessageBox(object) {
	if(typeof object != "object" || object == null) {
		alert("showMessageBox : 설정 오류");
		return
	}
	
	var title	= object.title || "";
	var message = object.message || "";
	var btn_message = object.btn_message || "";
	
	if(message == "") {
		return;
	}
	
	if(btn_message == "") {
		btn_message = "확인";
	}
	
	messageBox 	=	makeMessageBox(title, message, btn_message);
	
	if(title == "") {
		jQuery(".head", messageBox).hide();
	}
	
	modalPopup('#commonMessageBox');
	
	if(typeof object.close == "function") {
		messageBox.data("close_function", object.close);
	}
	
	jQuery(".btn_modalpopupClose", messageBox).eq(0).focus();
	
	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://hideMenuBar";
		}else{
			
		}
	}
	
	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(true);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(true);
			}
		}
		catch(ex) {}
	}

}

function makeMessageBox(title, message, btn_message) {
	jQuery("#commonMessageBox").remove();
	
	var arrHtml	=	[];
	
	arrHtml.push("<div id=\"commonMessageBox\" class=\"modal-wrap\">");
	arrHtml.push("	 <section class=\"modal-content\">");
	arrHtml.push("		<div class=\"head\">");
	arrHtml.push("			<p class=\"ttl\">"+title+"</p>");
	arrHtml.push("		</div>");
	arrHtml.push("		<div class=\"content\">");
	arrHtml.push("			<p class=\"tit\">"+message+"</p>");
	arrHtml.push("			<div class=\"btnArea2\">");
	arrHtml.push("				<span class=\"btn_ty\"><a href=\"#\" class=\"btn_ok\"  onclick=\"hideMessageBox(); return false;\">"+btn_message+"</a></span>");
	arrHtml.push("			</div>");
	arrHtml.push("		</div>");
	arrHtml.push("		<a href=\"#\" class=\"btn_modalpopupClose\" onclick=\"hideMessageBox();return false;\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png\" alt=\"닫기\"></a>");
	arrHtml.push("	</section>");
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));

	return div;
}

function hideMessageBox() {
	$('#wrapper').css({'overflow' : 'visible','height' : 'auto'});
	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://showMenuBar";
		}else{
			
		}
	}
	
	var messageBox = jQuery("#commonMessageBox");
	
	$(".overlay").remove();
	var close_function = messageBox.data("close_function");
	
	if(close_function != undefined) {
		close_function();
	}
	
	document.removeEventListener('touchmove', lock_touch);
	messageBox.remove();

	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(false);
				
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(false);
			}
		}
		catch(ex) {}
	}
}

function showConfirmBox(object) {
	if(typeof object != "object" || object == null) {
		alert("설정 오류");
		return
	}
	
	var title		= object.title || "";
	var message		= object.message || "";
	var ok_func		= object.ok_func;
	var cancel_func	= object.cancel_func;
	var option		= object.option;
	
	var ok_str = object.ok_str;
	var cancel_str = object.cancel_str;
	// 버튼 추가 (sns로그인 버튼)
	var	sns_func	= object.sns_func;
	var sns_str  	= object.sns_str;
	
	if(ok_str == undefined){
		ok_str = "예";
	}
	
	if(cancel_str == undefined){
		cancel_str = "아니요";
	}
	
	if(typeof option == "object" || option != null) {
		ok_str		=	option.ok_str || "";
		cancel_str	=	option.cancel_str || "";
		if(option.ok_str != undefined && option.ok_str != "") {
			ok_str = option.ok_str;
		}
		
		if(option.cancel_str != undefined && option.cancel_str != "") {
			cancel_str = option.cancel_str;
		}
		
		if(option.sns_str != undefined && option.sns_str != "") {
			sns_str = option.sns_str;
		}
	}
	
	if(sns_str != undefined){
		var confirmBox = makeConfirmBoxS(title, message, ok_str, cancel_str, sns_str);
	}
	else {
		var confirmBox = makeConfirmBox(title, message, ok_str, cancel_str);
	}
	
	if(title == "") {
		jQuery(".head", confirmBox).hide();
	}
	
	modalPopup('#commonConfirmeBox');
	
	jQuery(".btn_ok", confirmBox).unbind("click").click(function(event) {
		event.preventDefault();
		hideConfirmBox(false);
		
		if(typeof ok_func == "function") {
			ok_func();
		}
	});
	
	jQuery(".btn_cancel", confirmBox).unbind("click").click(function(event) {
		event.preventDefault();
		hideConfirmBox(true);
		
		if(typeof cancel_func == "function") {
			cancel_func();
		}
	});
	
	jQuery(".btn_sns", confirmBox).unbind("click").click(function(event) {
		event.preventDefault();
		hideConfirmBox(true);
		
		if(typeof sns_func == "function") {
			sns_func();
		}
	});
	
	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://hideMenuBar";
		}else{
			
		}
	}

	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(true);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(true);
			}
		}
		catch(ex) {}
	}

}

function makeConfirmBox(title, message, ok_str, cancel_str) {
	jQuery("#commonConfirmeBox").remove();
	
	var arrHtml	=	[];
	
	arrHtml.push("<div id=\"commonConfirmeBox\" class=\"modal-wrap\">");
	arrHtml.push("	 <section class=\"modal-content\">");
	arrHtml.push("		<div class=\"head\">");
	arrHtml.push("			<p class=\"ttl\">"+title+"</p>");
	arrHtml.push("		</div>");
	arrHtml.push("		<div class=\"content\">");
	arrHtml.push("			<p class=\"tit\">"+message+"</p>");
	arrHtml.push("			<div class=\"btnArea\">");
	arrHtml.push("				<span class=\"btn_ty\"><a href=\"#\" class=\"btn_ok\">"+ok_str+"</a></span>");
	arrHtml.push("				<span class=\"btn_ty3\"><a href=\"#\" class=\"btn_cancel\">"+cancel_str+"</a></span>");
	arrHtml.push("			</div>");
	arrHtml.push("		</div>");
	arrHtml.push("		<a href=\"#\" class=\"btn_modalpopupClose\" onclick=\"modalPopupClose('#commonConfirmeBox');return false;\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png\" alt=\"닫기\"></a>");
	arrHtml.push("	</section>");
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));

	return div;
}

/**
 * Confirm 박스 생성 (3개 버튼)
 */
function makeConfirmBoxS(title, message, ok_str, cancel_str, sns_str) {
	
	jQuery("#commonConfirmBox").remove();
	
	var arrHtml			= [];
	
	arrHtml.push("<div id=\"commonConfirmeBox\" class=\"modal-wrap\">");
	arrHtml.push("	 <section class=\"modal-content\">");
	arrHtml.push("		<div class=\"head\">");
	arrHtml.push("			<p class=\"ttl\">"+title+"</p>");
	arrHtml.push("		</div>");
	arrHtml.push("		<div class=\"content\">");
	arrHtml.push("			<p class=\"tit\">"+message+"</p>");
	arrHtml.push("			<div class=\"btnArea3\">");
	arrHtml.push("				<span class=\"btn_ty\"><a href=\"#\" class=\"btn_ok\">"+ok_str+"</a></span>");
	arrHtml.push("				<span class=\"btn_ty3\"><a href=\"#\" class=\"btn_cancel\">"+cancel_str+"</a></span>");
	arrHtml.push("				<span class=\"btn_ty3\"><a href=\"#\" class=\"btn_sns\">"+sns_str+"</a></span>");
	arrHtml.push("			</div>");
	arrHtml.push("		</div>");
	arrHtml.push("		<a href=\"#\" class=\"btn_modalpopupClose\" onclick=\"modalPopupClose('#commonConfirmeBox');return false;\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png\" alt=\"닫기\"></a>");
	arrHtml.push("	</section>");
	arrHtml.push("</div>");

	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
	
	return div;	
}

function hideConfirmBox(flag) {

	//var confirmBox = jQuery("#commonConfirmeBox");
	//confirmBox.hide();
	modalPopupClose('#commonConfirmeBox');
	hideLayerPopupBackground("commonConfirmBoxBg");
	msgBoxHide(false);
	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(false);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(false);
			}
		}
		catch(ex) {}
	}
}

//layer popup 가운데로 
function cmLayerPopupCenter(layerBox) {
	
	var popW = layerBox.width();
	var popH = layerBox.height();
	var scroll_top = jQuery(document).scrollTop();
	var winW = jQuery(window).width();
	var winH = jQuery(window).height();
	var top = (winH - popH) / 2 - 30;
	
	if (winW > popW) {
		layerBox.css("left", winW / 2 - popW / 2);
	}
	else {
		layerBox.css("left", 0);
	}
	
	if(popH > winH - 100){
		jQuery('.pop-contents', layerBox).css('height', winH-200);
		layerBox.css({'top':scroll_top + 50});
	} else {
		jQuery('.pop-contents', layerBox).css('height', 'auto');
		layerBox.css({'top':top + scroll_top});
	}
}

// 레이어 팝업 background 보이기
function showLayerPopupBackground( id ) {
	var bgPop;
	if (id != undefined && id != "") {
		bgPop			= jQuery("#" + id);
		if (bgPop.html() == null) {
			bgPop = jQuery("<div id=\""+ id +"\"></div>").appendTo(jQuery("body"));
		}
	}
	else {
		bgPop			= jQuery(".bg-pop").eq(0);
		if (bgPop.size() == 0) {
			bgPop = jQuery("<div class=\"bg-pop\"></div>").appendTo(jQuery("body"));
		}
	}
	bgPop.show();
}

// 레이어 팝업 background 숨기기
function hideLayerPopupBackground(id) {
	if (id != undefined && id != "") {
		jQuery("#" + id).hide();
	}
	else {
		jQuery(".bg-pop").eq(0).hide();
	}
}

//[s] Loading Box
var loading_interval = undefined;

function showLoadingBox() {
	
	var loadingBox		= makeLoadingBox();
	
	showLayerPopupBackground("commonLoadingBoxBg");
	loadingBox.show();
	
	cmLayerPopupCenter(loadingBox);
	
	loading_interval = setInterval(function () {
		var div = jQuery("div", "#commonLoadingBox");
		
		if (div.html() != null) {
			var cls_num = parseInt(div.attr("class").split("-")[1]);
			
			if (cls_num == 11) {
				cls_num = 1;
			}
			else {
				cls_num++;
			}
			div.attr("class", "l-" + cls_num);
		}
		else {
			clearInterval(loading_interval);
		}
	}, 80);
	
	msgBoxHide(true);
}

// Loading box 닫기
function hideLoadingBox() {
	var loadingBox		= jQuery("#commonLoadingBox");
	
	if (loading_interval != undefined) {
		clearInterval(loading_interval);
		loading_interval = undefined;
	}
	
	loadingBox.remove();
	hideLayerPopupBackground("commonLoadingBoxBg");
	msgBoxHide(false);
}

// Loading box 
function makeLoadingBox() {
	
	jQuery("#commonLoadingBox").remove();
	
	var arrHtml = [];
	
	arrHtml.push("<div id=\"commonLoadingBox\">");
	
	arrHtml.push("    <div class=\"l-10\" ></div>");
	
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
	
	return div;
}

function showScrollLoadingBox(target) {
	var loadingBox		= makeScrollLoadingBox(target);
	
	var opts = {
	    lines: 12, // The number of lines to draw
	    length: 4, // The length of each line
	    width: 2, // The line thickness
	    radius: 4, // The radius of the inner circle
	    corners: 1, // Corner roundness (0..1)
	    rotate: 0, // The rotation offset
	    direction: 1, // 1: clockwise, -1: counterclockwise
	    color: '#73829c', // #rgb or #rrggbb or array of colors
	    speed: 1, // Rounds per second
	    trail: 60, // Afterglow percentage
	    shadow: false, // Whether to render a shadow
	    hwaccel: false, // Whether to use hardware acceleration
	    className: 'spinner', // The CSS class to assign to the spinner
	    zIndex: 2e9, // The z-index (defaults to 2000000000)
	    top: 'auto', // Top position relative to parent in px
	    left: 'auto' // Left position relative to parent in px
	};
	 
	$(".spinner", loadingBox).show().spin(opts);
}

function hideScrollLoadingBox() {
	var loadingBox = jQuery(".spinArea");
	
	loadingBox.fadeOut("slow");
}

function makeScrollLoadingBox(target) {
	
	if(target == undefined || target == "") {
		target = jQuery("body");
	}
	
	jQuery(".spinArea").remove();
	
	var arrHtml = [];
	arrHtml.push("<div class=\"spinArea\">");
	arrHtml.push("	<div class=\"spinner\">");
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(target);
	return div;
}

//레이어 팝업 background 보이기
function showLayerPopupBackground( id ) {
	var bgPop;
	if (id != undefined && id != "") {
		bgPop			= jQuery("#" + id);
		if (bgPop.html() == null) {
			bgPop = jQuery("<div id=\""+ id +"\"></div>").appendTo(jQuery("body"));
		}
	}
	else {
		bgPop			= jQuery(".bg-pop").eq(0);
		if (bgPop.size() == 0) {
			bgPop = jQuery("<div class=\"bg-pop\"></div>").appendTo(jQuery("body"));
		}
	}
	bgPop.show();
}

// 레이어 팝업 background 숨기기
function hideLayerPopupBackground(id) {
	if (id != undefined && id != "") {
		jQuery("#" + id).hide();
	}
	else {
		jQuery(".bg-pop").eq(0).hide();
	}
}

function cmDialogOpen(customId, p_opt) {
	
	if (jQuery('#div_'+customId).html() != null) {
		jQuery('#div_'+customId).remove();
	}
	
	var arrHtml	= [];
	
	arrHtml.push("<div id='div_"+customId+"' class='common_layer_popup pop-contents' style='position:absolute;border:2px solid #131313;border-radius:6px;background:#fff;z-index:999;'>");
	arrHtml.push("<a href='#' class='btnClose' style='display:block;position: absolute;top:-13px;right:-9px;z-index:999;' onclick='cmDialogClose(\""+customId+"\");return false;'><img src='/mobile/images/common/btn_modalpopupClose.png' alt='닫기' style='width:33px;'></a>");
	arrHtml.push("<div id='div_div_"+customId+"'style='width:100%; height:100%; z-index:998;overflow-y:auto; -webkit-overflow-scrolling: touch; '>");
	arrHtml.push("    <iframe id='"+customId+"' name='"+customId+"' class='ui-iframe-style' src='about:blank' style='overflow-x:hidden;background-color:#fff;width:100%;height:100%; border-radius:6px; ' marginwidth='0' marginheight='0' frameborder='0' vspace='0' hspace='0'></iframe>");
	arrHtml.push("</div></div>");
	
	var layerBox 	= jQuery(arrHtml.join("")).appendTo("body");
	var iframe 		= jQuery("iframe", layerBox);
	var btnClose 	= jQuery(".btn_layer_close", layerBox);
	
	var defaults = {
		maxWidth : "2000"
		, maxHeight : "2000"
		, modal : true
		, scroll :"auto"
		, position : undefined
		, width : undefined
		, height : undefined
		, changeViewAutoSize : false
	};
	var options = jQuery.extend(defaults, p_opt);
	
	if (options.modal == true) {
		showLayerPopupBackground("common_layer_popupBg");
	}
	
	if (options.width != undefined) {
		var width = ("" + options.width).toLowerCase();
		if (width.indexOf("%") == -1 && width.indexOf("px") == -1) {
			options.width += "px";
		}
	}
	if (options.height != undefined) {
		var height = ("" + options.height).toLowerCase();
		if (height.indexOf("%") == -1 && height.indexOf("px") == -1) {
			options.height += "px";
		}
	}
	
	layerBox.width(options.width);
	layerBox.height(options.height);
	
	jQuery("#div_div_"+customId , layerBox).height("100%");
	
	layerBox.show();
	iframe.attr({src: options.url});
	
	if ( options.position == undefined || options.position.length < 2) {
		cmLayerPopupCenter(layerBox);
		
		jQuery(window).resize(function (event) {
			cmLayerPopupCenter(layerBox);
		});
	}
	else {
		var left = ("" + options.position[0]).toLowerCase();
		if (left.indexOf("%") == -1 && left.indexOf("px") == -1) {
			options.position[0] += "px";
		}
		var top = ("" + options.position[1]).toLowerCase();
		if (top.indexOf("%") == -1 && top.indexOf("px") == -1) {
			options.position[1] += "px";
		}
		layerBox.css({"left" : options.position[0], "top" : options.position[1]});
	}
	
	// layer popup 종료후 실행될 function setting
	if (options.fnc_return != undefined) {
		fncReturns[customId]		= options.fnc_return;
	}
	
	btnClose.click(function(event) {
		event.preventDefault();
		cmDialogClose(customId);
	});
	
	
/*	if ( options.changeViewAutoSize ) {
		jQuery("#"+customId).load(function (event) {
			
			var popBody = jQuery("#"+customId).contents().find("body");
			var height = jQuery(".cm_popup_wrap", popBody).height();
			
			if (options.maxHeight > height) {
				jQuery('#div_'+customId).height(height);
				jQuery('#'+customId).height(height);
			}
			
			popBody.resize(function (event) {
			
				height = jQuery(".cm_popup_wrap", popBody).height();
				
				if (jQuery('#div_'+customId).height() != height) {
					if (options.maxHeight > height) {
						jQuery('#div_'+customId).height(height);
						jQuery('#'+customId).height(height);
					}
					else  {
						jQuery('#div_'+customId).height(options.maxHeight);
						jQuery('#'+customId).height(options.maxHeight);
					}
				}
				
			});
			try {
				popBody.resize();
			} catch (e) {}
		});
	}*/
	
}

/**
 * IFrame 레이어 팝업 종료 함수
 */
function cmDialogClose(customId){
	
	//hideLayerPopupBackground("common_layer_popupBg");
	jQuery('#div_'+customId).remove();
}

/* ONEPAY step1 페이지 메시지 박스 [s] */
function showAppMessageBox(object) {
	if(typeof object != "object" || object == null) {
		alert("showMessageBox : 설정 오류");
		return
	}
	
	var title	= object.title || "";
	var message = object.message || "";
	var btn_message = object.btn_message || "";
	
	if(message == "") {
		return;
	}
	
	if(btn_message == "") {
		btn_message = "확인";
	}
	
	messageBox 	=	makeAppMessageBox(title, message, btn_message);
	
	if(title == "") {
		jQuery(".head", messageBox).hide();
	}
	
	modalPopup('#commonAppMessageBox');
	
	if(typeof object.close == "function") {
		messageBox.data("close_function", object.close);
	}
	
	jQuery(".btn_modalpopupClose", messageBox).eq(0).focus();
	
	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://hideMenuBar";
		}else{
			
		}
	}
	
	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(true);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(true);
			}
		}
		catch(ex) {}
	}

}

function makeAppMessageBox(title, message, ok_str , ok_css) {

	jQuery("#commonAppMessageBox").remove();

	var arrHtml	=	[];
	
	arrHtml.push("<div id=\"commonAppMessageBox\" class=\"modal-wrap\" style=\"padding:15px 20px;\">");
	arrHtml.push("	<section class=\"modal-content popupOnePayInfo\">");
	arrHtml.push("		<div class=\"pop-inner\">");
	arrHtml.push("			<div class=\"head\">");
	arrHtml.push("				<h1 class=\"title\">"+title+"</h1>");
	arrHtml.push("			</div>");
	arrHtml.push("			<div class=\"content\" style=\"padding:10% 7% 10%;\">");
	arrHtml.push("				<p class=\"tit\">"+message+"</p>");
	arrHtml.push("			</div>");
	arrHtml.push("			<div class=\"popBtnArea\" style=\"margin-bottom: -10px\">");
	arrHtml.push("				<span class=\"btn_order\" style=\"width:100%\"><a href=\"javascript:;\" onclick=\"hideAppMessageBox(); return false;\" class=\"btn_ok\">" + ok_str + "</a></span>");
//	arrHtml.push("				<span class=\"btn_box v3\"><a href=\"#\" class=\"btn_ok\" onclick=\"hideMessageBox(); return false;\" style='width:"+ok_css+";'>"+ok_str+"</a></span>");
	arrHtml.push("			</div>");
	arrHtml.push("		</div>");
	arrHtml.push("	</section>");
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));

	return div;
}

function hideAppMessageBox () {
	
	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://showMenuBar";
		}else{
			
		}
	}
	
	var messageBox = jQuery("#commonAppMessageBox");
	
	$(".overlay").remove();
	var close_function = messageBox.data("close_function");
	
	if(close_function != undefined) {
		close_function();
	}
	
	document.removeEventListener('touchmove', lock_touch);
	messageBox.remove();

	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(false);
				
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(false);
			}
		}
		catch(ex) {}
	}
}

function makeAppConfirmBox(title, message, ok_str, cancel_str) {
	
	jQuery("#commonAppConfirmBox").remove();
	
	var arrHtml			= [];
	
	arrHtml.push("<div id=\"commonAppConfirmBox\" class=\"modal-wrap\" style=\"padding:15px 20px;\">");
	arrHtml.push("	<section class=\"modal-content popupOnePayInfo\">");
	arrHtml.push("		<div class=\"pop-inner\">");
	arrHtml.push("			<div class=\"head\">");
	arrHtml.push("				<h1 class=\"title\">"+title+"</h1>");
	arrHtml.push("			</div>");
	arrHtml.push("			<div class=\"content\" style=\"padding:10% 7% 10%;\">");
	arrHtml.push("				<p class=\"tit\">"+message+"</p>");
	arrHtml.push("			</div>");
	arrHtml.push("			<div class=\"popBtnArea\" style=\"margin-bottom: -10px\">");
	arrHtml.push("				<span class=\"btn_cancle\"><a href=\"#\" class=\"btn_cancel\">" + cancel_str + "</a></span>");
	arrHtml.push("				<span class=\"btn_order\"><a href=\"#\" class=\"btn_ok\">"+ok_str+"</a></span>");
	arrHtml.push("			</div>");
	arrHtml.push("		</div>");
	arrHtml.push("	</section>");
	arrHtml.push("</div>");

	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
	
	return div;	
}

function showAppConfirmBox(object) {
	if(typeof object != "object" || object == null) {
		alert("설정 오류");
		return
	}
	
	var title		= object.title || "";
	var message		= object.message || "";
	var ok_func		= object.ok_func;
	var cancel_func	= object.cancel_func;
	var option		= object.option;
	
	var ok_str = object.ok_str;
	var cancel_str = object.cancel_str;
	// 버튼 추가 (sns로그인 버튼)
	var	sns_func	= object.sns_func;
	var sns_str  	= object.sns_str;
	
	if(ok_str == undefined){
		ok_str = "예";
	}
	
	if(cancel_str == undefined){
		cancel_str = "아니요";
	}
	
	if(typeof option == "object" || option != null) {
		ok_str		=	option.ok_str || "";
		cancel_str	=	option.cancel_str || "";
		if(option.ok_str != undefined && option.ok_str != "") {
			ok_str = option.ok_str;
		}
		
		if(option.cancel_str != undefined && option.cancel_str != "") {
			cancel_str = option.cancel_str;
		}
		
		if(option.sns_str != undefined && option.sns_str != "") {
			sns_str = option.sns_str;
		}
	}

	var confirmBox = makeAppConfirmBox(title, message, ok_str, cancel_str);
	
	if(title == "") {
		jQuery(".head", confirmBox).hide();
	}

	modalPopup('#commonAppConfirmBox');

	jQuery(".btn_ok", confirmBox).unbind("click").click(function(event) {
		event.preventDefault();
		hideAppConfirmBox(false);

		if(typeof ok_func == "function") {
			ok_func();
		}
	});

	jQuery(".btn_cancel", confirmBox).unbind("click").click(function(event) {
		event.preventDefault();
		hideAppConfirmBox(true);

		if(typeof cancel_func == "function") {
			cancel_func();
		}
	});

	if (GLOBAL_MOBILE_APP == 'APP'){
		if(GLOBAL_MOBILE_OS == 'iOS' || GLOBAL_MOBILE_OS == 'IOS'){
			window.location="apjscall://hideMenuBar";
		}else{
			
		}
	}

	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(true);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(true);
			}
		}
		catch(ex) {}
	}

}

function hideAppConfirmBox(flag) {

	modalPopupClose('#commonAppConfirmBox');
	hideLayerPopupBackground("commonConfirmBoxBg");
	msgBoxHide(false);
	if(GLOBAL_FLAG_APP_NEW == "Y") {
		try {	
			if(GLOBAL_MOBILE_OS == "AND") {
				window.Android.setDimming(false);
			}
			else{
				window.webkit.messageHandlers.setDimming.postMessage(false);
			}
		}
		catch(ex) {}
	}
}
/* ONEPAY step1 페이지 메시지 박스 [e] */

