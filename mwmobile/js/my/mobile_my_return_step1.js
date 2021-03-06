var MobileMyReturnStep1 ={
	name : "MobileMyReturnStep1"
	,init : function(){
		$(".contView").eq(0).show();
		$(".contView").eq(1).show();
		MobileMyReturnStep1.addBtnEvent();
		MobileMyReturnStep1.OrderView();
	},
	addBtnEvent : function(){
		
		//상품전체선택 기능
		$(".totalSelBox").on("click", "input[name='i_sCheckAll']" ,function(event) {
			var chk_all = $(this).find("input:checkbox + label");
			var len = $("span.inputChk6").find("input:checkbox").length;
			if($(this).is(":checked")) {
				chk_all.prop("checked", true);
    		   $(this).addClass("active");
    		   for(var i = 0; i < len; i++){
    			   $("span.inputChk6").find("input:checkbox").eq(i).prop("checked", true);
    			   $("span.inputChk6").find("label").eq(i).addClass("active");
    		   }
			} else {
				chk_all.prop("checked", false);
    		   $(this).removeClass("active");
    		   for(var i = 0; i < len; i++){
    			   $("span.inputChk6").find("input:checkbox").eq(i).prop("checked", false);
    			   $("span.inputChk6").find("label").eq(i).removeClass("active");
    		   }
			}
		});
		
		$(".btn_return_address").unbind("click").click(function(event){
			event.preventDefault();
			var validate = true;
			
			if($("input[name='i_arrSeqno']:checked").length == 0) {
				validate = false;
				showMessageBox({message : "반품하실 상품을 선택해주세요."});
				return;
			}
			
			var installMonth = $("input[name='i_iCardInstallMonth']").val();
			var paytype      = $("input[name='i_sPayTypecd']").val();
			
			if(installMonth != undefined && installMonth != ""){
				
				var monthInt = parseInt(installMonth);
				
				if(monthInt >= 80){
				
					var isMpointFlag = false;
					
					$("input[name='i_arrSeqno']").each(function() {	
						var id 	  = $(this).attr("id");
						var target = $(this);

						var chk = $(target).find("input").is(":checked");
						if(!chk) {
							isMpointFlag = true;
					    }
						
					});

					if(isMpointFlag){
						
						showMessageBox({message : "M포인트로 결제하신 주문은 부분 반품이 불가해요.<br/>반품을 원하시는 상품에 체크해주세요."});
						return;							
					}
				}		
			}
			
			if(paytype == "0025"){
				
				if(allowedpvoid == "N"){
				
					var isEximbayallFlag = false;
					
					$("input[name='i_arrSeqno']").each(function() {	
						var id 	  = $(this).attr("id");
						var target = $(this).parents("label[for='"+id+"']");

						var chk = $(target).find("input").is(":checked");
						if(!chk) {
							isEximbayallFlag = true;
					    }
						
					});

					if(isEximbayallFlag){
						
						showMessageBox({message : "해당주문은 부분 반품이 불가해요.<br/>전체상품에 체크해주세요."});
						return;							
					}
				}
				
			}else{
				
				var bpoint_chk = false;
				var arrSeqno   = $("input[name='i_arrSeqno']");
				var size	   = arrSeqno.length;
				var chksize	   = $("input[name='i_arrSeqno']:checked").size();
				
				if(size != chksize){
					for(var i=0; i<size; i++){
						var seqno = arrSeqno.eq(i);
						var tr    = seqno.parents(".orderProdBox");
						var pay_bpoint = fnOnlyNumber(tr.find(".beautyPoint").text()).number;
						if(pay_bpoint > 0 ){
							bpoint_chk = true;
							break;
						}
					}
					
					if(bpoint_chk){
						showMessageBox({message : "뷰티포인트로 구매한 주문은 부분 반품이 불가합니다.<br/>전체상품에 체크해주세요."});
						return;							
					}						
				}
			}
			
			var today = new Date();
			var tyear = String(today.getFullYear());
			var tmonth =String(today.getMonth()+1);
			var tday   = String(today.getDate());
			var td = tyear + ""+tmonth+tday;
			
			if(parseInt(td)>= 20150515 && parseInt(td) <= 20150605 && paytype == "0021"){
//			if(paytype == "0021"){
				
			
				var isKakaoFlag = false;
				
				$("input[name='i_arrSeqno']").each(function() {	
					var id 	  = $(this).attr("id");
					var target = $(this).parents("label[for='"+id+"']");

					var chk = $(target).find("input").is(":checked");
					if(!chk) {
						isKakaoFlag = true;
				    }
					
				});

				if(isKakaoFlag){
					validate = false;
					showMessageBox({message : "5.15 ~ 6.5 카카오페이 결제 시 부분 반품은 불가능합니다. 반품을 원하실 경우 모든 상품을 체크해주세요."});
					return;							
				}
//			}
			}	
			
			var p010cnt	 =	0;
			var p025list = [];

			$("input[name='i_arrSeqno']:checked").each(function() {
				if(($(this).attr("class")).indexOf("check_P010") > -1
				 ||($(this).attr("class")).indexOf("check_P021") > -1
				 ||($(this).attr("class")).indexOf("check_P022") > -1	 
				 ||($(this).attr("class")).indexOf("check_P023") > -1
				 ||($(this).attr("class")).indexOf("check_P024") > -1
				 ||($(this).attr("class")).indexOf("check_P025") > -1) {
					p010cnt++;
				}
				
				if(($(this).attr("class")).indexOf("check_P025") > -1){
					
					var div		  = $(this).parents(".prodbox_new").eq(0);
					var productcd = $("input[name='i_arrProductcd']",div).val();
					
					var size = p025list.length;
					
					if(size > 0){
						
						for(var i=0; i<size; i++){
							
							if(p025list[i].productcd != productcd){
								p025list.push({productcd : productcd});
							}
						}
						
					}else{
						
						p025list.push({productcd : productcd});
					}
				}					
			});
			
			if(p010cnt == 0) {
				validate = false;
				showMessageBox({
					message : "사은품은 반품대상이 아니에요."
				});
				return;
				
			}else{
				
				var size = p025list.length;
			
				if(size > 0){

					var productSize =  $("input[name='i_arrProductcd']").size();
					
					for(var i=0; i<size; i++){
				
						for(var j=0; j<productSize; j++){
							
							if(p025list[i].productcd  == $("input[name='i_arrProductcd']").eq(j).val()){
								
								var tr 	   = $("input[name='i_arrProductcd']").eq(j).parents(".prodbox_new").eq(0);
								var target = $("input[name='i_arrSeqno']",tr);
								
								target.attr("checked",true);
						    	target.addClass("active");
						    	target.parents("label").addClass("active");
							}
						}
					}
		
				}
			}
			
			var addParam	=	[];
			var ordercd	=	$("input[name='i_sOrdercd']", "#frm").val();
			var returnCnt	=	0;
			
			$("input[name='i_arrSeqno']:checked").each(function(i) {
				
				var seqno	= $(this).val();
				var area    = $(this).parents(".prodImg");
				
				addParam.push(seqno);
				
				if((area.find("input[name='i_sSetno']").attr("class")).indexOf("0") == -1) {
					
					var classnm	=	area.find("input[name='i_sSetno']").attr("class");
					
					$("." + classnm).each(function(j) {
						var setSeqno = $(this).val();
						var product_cnt	= $("#prod_" + seqno).val();
						$("#prod_" + setSeqno).val(product_cnt);
						
						if(setSeqno != addParam[i]) {
							addParam.push($(this).val());
						}
					});
				}
			});
			
			$("input[name='i_arrSeqnoSub']").each(function(i) {
				
				addParam.push($(this).val());
			});
			
			
			var totalCnt	=	0;
			$(".cntOrigin").each(function() {
				totalCnt	=	totalCnt + parseInt($(this).val());
			});
			
			if(MobileMyReturnStep1.isAllReturnValidation()) {	//전체 반품이면
				
				if($("input[name='i_arrSeqnoSubVip']").size() > 0) {
					$("input[name='i_arrSeqnoSubVip']").each(function() {
						addParam.push($(this).val());
					});
				}	
				
				if($("input[name='i_arrSeqnoSubBlue']").size() > 0) {
					$("input[name='i_arrSeqnoSubBlue']").each(function() {
						addParam.push($(this).val());
					});
				}
			}else{
				if($("input[name='i_arrSeqnoSubVip']:checked").size() > 0) {
					$("input[name='i_arrSeqnoSubVip']:checked").each(function() {
						addParam.push($(this).val());
					});
				}	
				
				if($("input[name='i_arrSeqnoSubBlue']:checked").size() > 0) {
					$("input[name='i_arrSeqnoSubBlue']:checked").each(function() {
						addParam.push($(this).val());
					});
				}
			}
		
			var flagNoReturn = $("input[name='i_arrFlagNoReturn']");
			var prodnm = [];
			var cnt = 0;
			for(var i = 0; i < $(".orderProdBox .prodbox_new").length; i++){
				if(flagNoReturn.eq(i).val() == "Y"){
					cnt++;
					prodnm.push($("input[name='i_sNoRtnProdnm']").eq(i).val());
				}
			}
			
			if(cnt > 0){
				validate = false;
				showConfirmBox({
					message : "반품이 불가한 상품("+prodnm.join(",")+")이 포함되어 있습니다.<br/>해당 상품 제외하고 반품을 진행하시겠습니까?"
					, ok_func : function(){
						location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_return_apply.do?i_sOrdercd=" + ordercd + "&i_sSeqno=" + addParam + "&i_iTotalCnt=" + totalCnt;
					}
					, cancel_func : function(){
						return ;
					}
				});
			}
			
			if(validate){
				location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_return_apply.do?i_sOrdercd=" + ordercd + "&i_sSeqno=" + addParam + "&i_iTotalCnt=" + totalCnt;
			}
			
			
		});
		
		$(".orderProdBox").on("change", "input[name='i_arrSeqno']", function(event){
			event.preventDefault();
			var val = $(this).val();
			var index = $("input[name='i_arrSeqno']").index($(this));
			var chkAllReturn = MobileMyReturnStep1.isAllReturnValidation();		//전체반품인지 아닌지 체크하는 메소드
			var chkCnt = $("input[name='i_arrSeqno']:checked", $(".prodbox_new")).length;
			
			if ($(this).prop("checked")) {
				
				//스페셜기프트가 있으면 해당 스페셜기프트를 다 체크되게 하기
				if($(".check_P012", $(".orderProdBox").eq(index)).size() > 0){
						
					$(".check_P012", $(".orderProdBox").eq(index)).each(function(){
						var id = $(this).attr("id");
						$(this).addClass("active");
						$(this).prop("checked", true);
						$("label[for='"+id+"']").addClass("active");
					});
				}
				
				if(chkAllReturn){ //전체 반품이면 모두 체크
					if($(".c_gift").size() > 0){
						$(".c_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".b_gift").size() > 0){
						$(".b_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".s_gift").size() > 0){
						$(".s_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".p_gift").size() > 0){
						$(".p_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".v_gift").size() > 0){
						$(".v_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
				}else{ //부분 반품이면 체크할 사항 체크
				
					if($(".b_gift").size() > 0){
						$(".b_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".s_gift").size() > 0){
						$(".s_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
				}
				
			}
			else {

				if($(".check_P012", $(".orderProdBox").eq(index)).size() > 0){
						
					$(".check_P012", $(".orderProdBox").eq(index)).each(function(){
						var id = $(this).attr("id");
						$(this).removeClass("active");
						$(this).prop("checked", false);
						$("label[for='"+id+"']").removeClass("active");
					});
				}
				
				if(chkCnt == 0){		//본품 체크한 게 없으면
					if($(".c_gift").size() > 0){
						$(".c_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".b_gift").size() > 0){
						$(".b_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".s_gift").size() > 0){
						$(".s_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".p_gift").size() > 0){
						$(".p_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".v_gift").size() > 0){
						$(".v_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
				}
				else if(chkCnt > 0  && !chkAllReturn){
					if($(".c_gift").size() > 0){
						$(".c_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".b_gift").size() > 0){
						$(".b_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".s_gift").size() > 0){
						$(".s_gift").each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
					
					if($(".p_gift").size() > 0){
						$(".p_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
					
					if($(".v_gift").size() > 0){
						$(".v_gift").each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
				}
			}
		});
		
		$(".btn_go_back").unbind("click").click(function(event){
			event.preventDefault();
			var ordercd = $("input[name='i_sOrdercd']").val();
			var url = "mobile/my/mobile_my_order_view.do?i_sOrdercd=" + ordercd;
			$(this).attr('href', url);
			location.href = GLOBAL_WEB_URL + url;
		});
		
		$(".btn_back").unbind("click").click(function(event){
			event.preventDefault();
			var ordercd = $("input[name='i_sOrdercd']").val();
			var url = "mobile/my/mobile_my_order_view.do?i_sOrdercd=" + ordercd;
			$(this).attr('href', url);
			location.href = GLOBAL_WEB_URL + url;
		});
		
		$(".prodImg_bd").on("change", "input[name='i_arrSeqno']", function(event){
			event.preventDefault();
			var index = $("input[name='i_arrSeqno']").index($(this));
			var id = $("input[name='i_arrSeqno']").eq(index).attr("id");
			var chkAllReturn = MobileMyReturnStep1.isAllReturnValidation();		//전체반품인지 아닌지 체크하는 메소드
			var pCnt = $("input[name='i_arrSeqno']:checked", $(".prodbox_new")).size();
			
			if(pCnt > 0 && !chkAllReturn && !$(this).prop("checked")){
				if($(this).attr("class").indexOf("check_P012") > -1){
					showMessageBox({
						message: "본품을 일부만 반품할 경우, 스페셜기프트는 필수 반품 상품입니다."
						, close : function(){
							$("#"+id).addClass("active");
							$("#"+id).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						}	
					});
				}
				if($(this).attr("class").indexOf("b_gift") > -1){
					showMessageBox({
						message: "본품을 일부만 반품할 경우, 구매금액대별 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
				if($(this).attr("class").indexOf("s_gift") > -1){
					showMessageBox({
						message: "본품을 일부만 반품할 경우, 이벤트 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
			}else if(pCnt > 0 && chkAllReturn && !$(this).prop("checked")){  //전체 반품일 때
				if($(this).attr("class").indexOf("check_P012") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, 스페셜기프트는 필수 반품 상품입니다."
						, close : function(){
							$("#"+id).addClass("active");
							$("#"+id).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						}	
					});
				}
				if($(this).attr("class").indexOf("b_gift") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, 구매금액대별 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
				if($(this).attr("class").indexOf("s_gift") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, 이벤트 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
				if($(this).attr("class").indexOf("c_gift") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, 쿠폰 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
				if($(this).attr("class").indexOf("v_gift") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, CLUB AP 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
				if($(this).attr("class").indexOf("p_gift") > -1){
					showMessageBox({
						message: "본품을 전체 반품할 경우, 블루리본 사은품은 필수 반품 상품입니다."
							, close : function(){
								$("#"+id).addClass("active");
								$("#"+id).prop("checked", true);
								$("label[for='"+id+"']").addClass("active");
							}	
					});
				}
			}
		});
	}
	, isAllReturnValidation : function(){		//전체반품인지 아닌지 체크하는 메소드
		var chkAllReturn = true;		//전체반품인지 아닌지 체크하는 플래그 
		var prodCnt = $("input[name='i_arrProductcd']").length;	//본품 갯수
		var size = $("select[name='i_arrProductCnt']").length;	//각각 몇개인지 나오는 selectbox 개수
		var sum = 0;	//totCnt 구하려고 쓰는 변수
		var cnt = 0;	//반품불가 상품 개수 세려고
		var totCnt = 0;	//본품 각각 몇개, 사은품 각각 몇개 다 더한 값
		var minusCnt = 0;
		var bonProdCnt = 0; // 본품 구매 갯수만 더한 것
		
		for(var i = 0; i < size; i++){
			sum = sum + parseInt($("select[name='i_arrProductCnt']").eq(i).val());
		}
		
		for(var j = 0; j < prodCnt; j++){
			var idx = $("input[name='i_arrSeqno']", $(".prodbox_new").eq(j)).val();
			bonProdCnt += parseInt($("#prod_" + idx).val());
			if($("input[name='i_arrFlagNoReturn']").eq(j).val() == "Y"){
				cnt++;
				minusCnt += parseInt($("#prod_" + idx).val());
			}
		}
		
		if(cnt > 0){	//반품불가 상품이 있으면 총 합에서 빼기
			totCnt = sum - minusCnt;
			prodCnt = prodCnt - cnt;
			bonProdCnt = bonProdCnt - minusCnt;
		}else{
			totCnt = sum;
		}
		
		var chkCnt = $("input[name='i_arrSeqno']:checked", $(".prodbox_new")).length;
		
		var chkProdCnt = 0;
		for(var k = 0; k < chkCnt; k++){
			var idx = $("input[name='i_arrSeqno']:checked", $(".prodbox_new")).index($("input[name='i_arrSeqno']"));
			chkProdCnt += parseInt($("#prod_" + (idx + 1)).val());
		}
		
		if(chkCnt < prodCnt){  //본품 체크된 갯수가 prodCnt 보다 적을 때 - 부분반품
			chkAllReturn = false;
		}else if(chkCnt == prodCnt && (chkProdCnt < bonProdCnt)){ //본품 체크된 갯수가 prodCnt랑 같은데 본품 갯수 더한 총합보다 선택한 본품 총 합보다 작을때 - 부분반품
			chkAllReturn = false;
		}else{	//전체 반품
			chkAllReturn = true;
		}
		
		return chkAllReturn;
	}
	,
	OrderView : function(){
		
		var frm = document.frm;
		
		var ordercd = $("input[name='i_sOrdercd']",frm).val();
		var mseqno = $("input[name='i_sMseqno']",frm).val();
		var sseqno = $("input[name='i_iSseqno']",frm).val();
		
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_order_view_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
					i_sOrdercd : ordercd
					, i_sMseqno : mseqno 
					, i_iSseqno : sseqno
					}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
	
				if(data.status == "succ"){
					
					var rvo  = data.object.orderVo;
					var pgVo = data.object.pgVo;
					var giftcardVo = data.object.giftcardVo;
					var giftboxCnt = 0;

					var vo 		= data.object.prodList;
					var size	= vo.length;
				
					$("input[name='i_iCardInstallMonth']").val(pgVo.v_cardinstallmonth);
					$("input[name='i_sPayTypecd']").val(rvo.v_pay_typecd);
					
					if(size > 0){
						
						var target	= $(".contView").eq(0);
						var arrHtml	= new Array();
						if(vo[0].v_hotdealcd != undefined && vo[0].v_hotdealcd != ""){
							arrHtml.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='Y'/>");
						}else{
							arrHtml.push("<input type='hidden' name='i_sFlagBeautyHotdeal' value='N'/>");
						}

						arrHtml.push("<div class='totalSelBox' style='display:none;border-bottom:1px solid #ededed;padding:8px 10px 6px 10px;min-height:35px;'>");
						arrHtml.push("	<span class='inputChk2'>");
						arrHtml.push("		<input type='checkbox' id='chk00' name='i_sCheckAll' class='checkbox' checked='checked' />");
						arrHtml.push("		<label for='chk00'>상품전체선택</label>");
						arrHtml.push("	</span>");
						arrHtml.push("</div>");
						
						for(var i=0; i<size; i++){
							
							var productno = vo[i].n_seqno;
							
							if(vo[i].v_flag_giftbox == "Y" || vo[i].v_flag_free_giftbox == "Y" ){
								
								giftboxCnt += 1;
								
							}
							
							arrHtml.push("<div class='orderProdBox'>");
							
								
								
								arrHtml.push("	<div class='prodbox prodbox_new'>");
								arrHtml.push("		<div class='prodImg'>");
								arrHtml.push("			<input type='hidden' name='i_arrProductcd' value='"+vo[i].v_productcd +";"+vo[i].v_product_typecd+"'/>");
								arrHtml.push("			<span class='inputChk6'>");
								arrHtml.push("			<input type='checkbox' id='chkpd_"+(i+1)+"' name='i_arrSeqno' value='"+vo[i].n_seqno+"' class='checkbox check_"+vo[i].v_product_typecd+"'");
								if(vo[i].v_flag_noreturn != undefined && vo[i].v_flag_noreturn == "Y"){
									arrHtml.push(" 				disabled='disabled' />");
								}else{
									arrHtml.push(" 				checked='checked' />");
								}
								arrHtml.push("			<label for='chkpd_"+(i+1)+"'>");
								arrHtml.push("				<img src='"+vo[i].v_img_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml.push("			</label>");
								arrHtml.push("			</span>");
								arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+vo[i].n_setno+"' value='"+vo[i].n_seqno+"' />");
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+vo[i].n_product_cnt+"' />");
								arrHtml.push("			<input type='hidden' name='i_arrFlagNoReturn' value='"+vo[i].v_flag_noreturn+"' />");
								arrHtml.push("			<input type='hidden' name='i_sNoRtnProdnm' value='"+vo[i].v_brandnm+"  "+vo[i].v_productnm+"' />");
								arrHtml.push("		</div>"	);
								arrHtml.push("		<div class='detail'>");
								arrHtml.push("			<p class='prodNm'>"+vo[i].v_brandnm+"   "+vo[i].v_productnm);
								arrHtml.push("				<select id='prod_"+vo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 count prodCnt' style='width:60px;'>");
								
								if(vo[i].v_product_typecd == "P025"){	//1+1 상품일때
									arrHtml.push("				<option value='"+vo[i].n_product_cnt+"'>"+vo[i].n_product_cnt+"개</option>");	
								}else{
									for(var j = 1; j <= vo[i].n_product_cnt; j++){
										arrHtml.push("			<option value='"+j+"'");
										if(j == vo[i].n_product_cnt){
											arrHtml.push("			selected= 'selected'");
										}
										arrHtml.push("			>"+j+"개</option>");
									}
								}
								arrHtml.push("				</select>");
								//arrHtml.push(" <span class='count'>/<em>"+vo[i].n_product_cnt+"개</em></span>");
								arrHtml.push("			</p>");
								if(parseInt(vo[i].n_option_cnt)> 1){
									
									arrHtml.push("		<div class='option'>옵션 : "+vo[i].v_optionnm+"</div>");
								}
								
								arrHtml.push("		<p class='priceZone'>");
								
								var n_list_price	= parseInt(vo[i].n_list_price);
								var n_dis_price		= parseInt(vo[i].n_dis_price);
								var n_minus_coupon  = parseInt(vo[i].n_minus_coupon);
								
								if(n_list_price>0 && n_dis_price>0 && n_minus_coupon == 0){
									if(vo[i].v_flag_beauty == "Y"){
										arrHtml.push("			<span class='price' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>P</span>");
									}else{
										arrHtml.push("			<span class='sale'><em><span class='row_pay_price'>"+SetNumComma(n_list_price * vo[i].n_product_cnt)+"</span></em>원</span>");
										arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>원</span>");
									}
								}else{
									if(vo[i].v_flag_beauty == "Y"){
										arrHtml.push("			<span class='price' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>P</span>");
									}else{
										arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>원</span>");
									}
								}
								
								arrHtml.push("		</p>");
								
								if(vo[i].n_pay_bpoint > 0){
									arrHtml.push("		<p class='pointTxt'>");
									arrHtml.push("			(뷰티포인트 결제 <span class='sp_point beautytxt v2 row_save_bpoint beautyPoint'>"+SetNumComma(vo[i].n_pay_bpoint)+"P</span>)");
									arrHtml.push("		</p>");
								}
								
								if(IS_LOGIN){
									
									arrHtml.push("		<p class='pointTxt'>");
									arrHtml.push("			<span class='sp_point beautytxt v2 row_save_bpoint'>"+SetNumComma(vo[i].n_save_bpoint)+"P</span>");
									arrHtml.push("			<span class='sp_point blueRebontxt v2 row_save_mpoint'>"+SetNumComma(vo[i].n_save_mpoint)+"P</span>");
									arrHtml.push("		</p>");
									
								}
								
								arrHtml.push("		</div>");
								arrHtml.push("	</div>");
								
								//YHCHOI : 본품 / 자체세트 사은품
								var freeVo = data.object.prodFreeList;
								var freesize = freeVo.length;
								
								var productno_temp = "";
								var isDivFlag = false;
								
								if(freesize>0){
									
									for(var j=0; j<freesize; j++){
										
										var uproductno = freeVo[j].n_useqno;
										
										if(productno == uproductno){
											
											if(productno_temp != uproductno){
												isDivFlag = true;
												arrHtml.push("<div class='bskGiftbox'>");
												arrHtml.push("	<p class='ttl'>스페셜기프트</p>");
												arrHtml.push("	<ul>");
											}
											
											arrHtml.push("		<li class='li_"+freeVo[j].n_useqno+"'>");
											//gypark : 스페셜기프트 사은품도 체크박스 생성
											arrHtml.push("			<div class='prodImg prodImg_bd'>");	
											arrHtml.push("			<span class='inputChk6'>");
											arrHtml.push("				<input type='checkbox' id='chkpf_"+(j+1)+"' name='i_arrSeqno' class='checkbox check_"+freeVo[j].v_product_typecd+"' value='"+freeVo[j].n_seqno+"' checked='checked'>");
											arrHtml.push("				<label for='chkpf_"+(j+1)+"'>");
											arrHtml.push("					<img src='"+freeVo[j].v_img_path+"' alt='' onerror=\"fnNoImage(this)\" style=\"width:68px; height:68px;\"/>");
											arrHtml.push("				</label>");
											arrHtml.push("			</span>");	
											arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+freeVo[j].n_setno+"' value='"+freeVo[j].n_setno+"'/>");
											arrHtml.push("			</div>");	
											arrHtml.push("			<div class='prodDetail freegoodDiv' style='min-height:40px;'>");	
											
											var brandnm = freeVo[j].v_brandnm != undefined ? freeVo[j].v_brandnm : '아모레퍼시픽몰';
											arrHtml.push("<span class='span_hide sub_ori_cnt'>["+(freeVo[j].n_product_cnt / vo[i].n_product_cnt)+"]</span>");
											arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");	
											arrHtml.push("			<p class='prodNm'>"+getByteString(freeVo[j].v_productnm,12)+"</p>");	
											
											if(freeVo[j].v_capacity != undefined){
												arrHtml.push("  		<p class='ml'>"+freeVo[j].v_capacity+"</p>");
												
											}
											
											arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+freeVo[j].n_product_cnt+"' />");
											arrHtml.push("			</div>");
											//gypark : 사은품도 선택하도록 변경
											arrHtml.push("			<select id='prod_"+freeVo[j].n_seqno+"' name='i_arrProductCnt' class='selectBox3 span_fg_cnt prodCnt'>");
											for(var k = 1; k <= freeVo[j].n_product_cnt; k++){
												arrHtml.push("			<option value='"+k+"'");
												if(k == freeVo[j].n_product_cnt){
													arrHtml.push("			selected= 'selected'");
												}
												arrHtml.push("			>"+k+"개</option>");
											}
											arrHtml.push("			</select>");
//											arrHtml.push("			<span class='span_fg_cnt'>"+freeVo[j].n_product_cnt+"개</span>");		
											arrHtml.push("		</li>");
											
											productno_temp = productno;
											
										}
									}
									
								}
								
								if(isDivFlag){
									arrHtml.push("	</ul>");
									arrHtml.push("</div>");									
								}
							
							arrHtml.push("	</div>");
							arrHtml.push("</div>");
							}

						}
						
						target.html($(arrHtml.join("")));	
					
						//YHCHOI : 쿠폰 사은품 들어가는 부분
						var cpVo   = data.object.cpList;
						var cpsize = cpVo.length;
					
						if(cpsize > 0){
							
							var target 	= $("#div_cpfreegood");
							var arrHtml = new Array();
							
							arrHtml.push("<ul>");
							
							for(var i=0; i<cpsize; i++){
								
								arrHtml.push("	<li>");
								arrHtml.push("		<div class='prodImg prodImg_bd'>");
								arrHtml.push("			<span class='inputChk6'>");
								arrHtml.push("				<input type='checkbox' id='chkc_"+(i+1)+"' name='i_arrSeqno' value='"+cpVo[i].v_n_seqno+"' class='checkbox check_"+cpVo[i].v_product_typecd+" c_gift' checked='checked'>");
								arrHtml.push("				<label for='chkc_"+(i+1)+"'>");
								arrHtml.push("					<img src='"+cpVo[i].v_img_path+"' alt='' onerror=\"fnNoImage(this)\" />");
								arrHtml.push("				</label>");
								arrHtml.push("			</span>");	
								arrHtml.push("			<input type='hidden' name='i_arrSeqnoSub' value='"+cpVo[i].n_seqno+"'");
								arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+cpVo[i].n_setno+"' value='"+cpVo[i].n_seqno+"'");
								arrHtml.push("		</div>");
								arrHtml.push("		<div class='prodDetail' style='min-height:40px;'>");
								
								var brandnm = cpVo[i].v_brandnm != undefined ? cpVo[i].v_brandnm : '아모레퍼시픽몰';
								
								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
								arrHtml.push("			<p class='prodNm'>"+getByteString(cpVo[i].v_productnm,12)+"</p>");
								if(cpVo[i].v_capacity !="" && cpVo[i].v_capacity != undefined && cpVo[i].n_product_cnt > 0){
									arrHtml.push("			<p class='ml'>"+cpVo[i].v_capacity+"</p>");								
								}
								
//								if(cpVo[i].v_capacity !="" && cpVo[i].v_capacity != undefined && cpVo[i].n_product_cnt > 0){								
//									arrHtml.push("			<p class='ml'>"+cpVo[i].v_capacity+"*"+cpVo[i].n_product_cnt+"개</p>");								
//								}else{								
//									arrHtml.push("			<p class='ml'>"+cpVo[i].n_product_cnt+"개</p>");								
//								}
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+cpVo[i].n_product_cnt+"' />");
								arrHtml.push("		</div>");
								
								arrHtml.push("			<select id='prod_"+cpVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
								for(var k = 1; k <= cpVo[i].n_product_cnt; k++){
									arrHtml.push("			<option value='"+k+"'");
									if(k == cpVo[i].n_product_cnt){
										arrHtml.push("			selected= 'selected'");
									}
									arrHtml.push("			>"+k+"개</option>");
								}
								arrHtml.push("			</select>");
								arrHtml.push("	</li>");
							
							}
							
							arrHtml.push("</ul>");
							
							target.html("");	
							target.html($(arrHtml.join("")));	
							$(".div_coupon_freegood").show();
								
						}
						
						//YHCHOI : 구매 금액대별 사은품 들어가는 부분
						var giftVo	= data.object.giftList;
						var giftsize = giftVo.length;
					
						if(giftsize > 0){
							
							var target 	= $("#div_bfreegood");
							var arrHtml = new Array();
							
							arrHtml.push("<ul>");
							
							for(var i=0; i<giftsize; i++){
								
								arrHtml.push("	<li>");
								arrHtml.push("		<div class='prodImg prodImg_bd'>");
								arrHtml.push("			<span class='inputChk6'>");
								arrHtml.push("				<input type='checkbox' id='chkb_"+(i+1)+"' name='i_arrSeqno' value='"+giftVo[i].n_seqno+"' class='checkbox check_"+giftVo[i].v_product_typecd+" b_gift' checked='checked'>");
								arrHtml.push("				<label for='chkb_"+(i+1)+"'>");
								arrHtml.push("					<img src='"+giftVo[i].v_img_path+"' alt='' onerror=\"fnNoImage(this)\" />");
								arrHtml.push("				</label>");
								arrHtml.push("			</span>");	
								arrHtml.push("			<input type='hidden' name='i_arrSeqnoSub' value='"+giftVo[i].n_seqno+"' />");
								arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+giftVo[i].n_setno+"' value='"+giftVo[i].n_seqno+"' />");
								arrHtml.push("		</div>");
								arrHtml.push("		<div class='prodDetail freegoodDiv' style='min-height:40px;'>");
								
								var brandnm = giftVo[i].v_brandnm != undefined ? giftVo[i].v_brandnm : '아모레퍼시픽몰';
								
								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
								arrHtml.push("			<p class='prodNm'>"+getByteString(giftVo[i].v_productnm,12)+"</p>");
								
								if(giftVo[i].v_capacity !="" && giftVo[i].v_capacity != undefined && giftVo[i].n_product_cnt > 0){
									arrHtml.push("			<p class='ml'>"+giftVo[i].v_capacity+"</p>");
								}
//								if(giftVo[i].v_capacity !="" && giftVo[i].v_capacity != undefined && giftVo[i].n_product_cnt > 0){								
//									arrHtml.push("			<p class='ml'>"+giftVo[i].v_capacity+"*"+giftVo[i].n_product_cnt+"개</p>");								
//								}else{								
//									arrHtml.push("			<p class='ml'>"+giftVo[i].n_product_cnt+"개</p>");								
//								}
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+giftVo[i].n_product_cnt+"' />");
								arrHtml.push("		</div>");
								
								arrHtml.push("			<select id='prod_"+giftVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
								for(var k = 1; k <= giftVo[i].n_product_cnt; k++){
									arrHtml.push("			<option value='"+k+"'");
									if(k == giftVo[i].n_product_cnt){
										arrHtml.push("			selected= 'selected'");
									}
									arrHtml.push("			>"+k+"개</option>");
								}
								arrHtml.push("			</select>");
								arrHtml.push("	</li>");
							
							}
							
							arrHtml.push("</ul>");
							
							target.html("");	
							target.html($(arrHtml.join("")));	
							$(".div_between_freegood").show();
								
						}
						
						//YHCHOI : 이벤트 사은품 들어가는 부분
						var specialVo	= data.object.spList;
						var specialsize = specialVo.length;
					
						if(specialsize > 0){
							
							var target 	= $("#div_spfreegood");
							var arrHtml = new Array();
							
							arrHtml.push("<ul>");
							
							for(var i=0; i<specialsize; i++){
								
								arrHtml.push("	<li>");
								arrHtml.push("		<div class='prodImg prodImg_bd'>");
								arrHtml.push("			<span class='inputChk6'>");
								arrHtml.push("				<input type='checkbox' id='chks_"+(i+1)+"' name='i_arrSeqno' value='"+specialVo[i].n_seqno+"' class='checkbox check_"+specialVo[i].v_product_typecd+" s_gift' checked='checked'>");
								arrHtml.push("				<label for='chks_"+(i+1)+"'>");
								arrHtml.push("					<img src='"+specialVo[i].v_img_path+"' alt='' onerror=\"fnNoImage(this)\" />");
								arrHtml.push("				</label>");
								arrHtml.push("			</span>");	
								arrHtml.push("			<input type='hidden' name='i_arrSeqnoSub' value='"+specialVo[i].n_seqno+"'/>");
								arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+specialVo[i].n_setno+"' value='"+specialVo[i].n_seqno+"'/>");
								arrHtml.push("		</div>");
								arrHtml.push("		<div class='prodDetail freegoodDiv' style='min-height:40px;'>");
								
								var brandnm = specialVo[i].v_brandnm != undefined ? specialVo[i].v_brandnm : '아모레퍼시픽몰';
								
								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
								arrHtml.push("			<p class='prodNm'>"+getByteString(specialVo[i].v_productnm,12)+"</p>");
								
								if(specialVo[i].v_capacity !="" && specialVo[i].v_capacity != undefined && specialVo[i].n_product_cnt > 0){								
									arrHtml.push("			<p class='ml'>"+specialVo[i].v_capacity+"</p>");								
								}
								
//								if(specialVo[i].v_capacity !="" && specialVo[i].v_capacity != undefined && specialVo[i].n_product_cnt > 0){								
//									arrHtml.push("			<p class='ml'>"+specialVo[i].v_capacity+"*"+specialVo[i].n_product_cnt+"개</p>");								
//								}else{
//									arrHtml.push("			<p class='ml'>"+specialVo[i].n_product_cnt+"개</p>");
//								}
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+specialVo[i].n_product_cnt+"' />");
								arrHtml.push("		</div>");
								
								arrHtml.push("			<select id='prod_"+specialVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
								for(var k = 1; k <= specialVo[i].n_product_cnt; k++){
									arrHtml.push("			<option value='"+k+"'");
									if(k == specialVo[i].n_product_cnt){
										arrHtml.push("			selected= 'selected'");
									}
									arrHtml.push("			>"+k+"개</option>");
								}
								arrHtml.push("			</select>");
								arrHtml.push("	</li>");
							
							}
							
							arrHtml.push("</ul>");
							
							target.html("");	
							target.html($(arrHtml.join("")));	
							$(".div_special_freegood").show();
								
						}		
						
						//YHCHOI : 블루리본 스토어 들어가는 부분
						var pointVo	= data.object.pointList;
						var pointsize = pointVo.length;
					
						if(pointsize > 0){
							
							var target 	= $("#div_rbfreegood");
							var arrHtml = new Array();
							
							arrHtml.push("<ul>");
							
							for(var i=0; i<pointsize; i++){
								
								arrHtml.push("	<li>");
								arrHtml.push("		<div class='prodImg prodImg_bd'>");
								arrHtml.push("			<span class='inputChk6'>");
								arrHtml.push("			<input type='checkbox' id='chkp_"+(i+1)+"' name='i_arrSeqno' value='"+pointVo[i].n_seqno+"' class='checkbox check_"+pointVo[i].v_product_typecd+" p_gift' checked='checked'>");
								arrHtml.push("			<label for='chkp_"+(i+1)+"'>");
								arrHtml.push("				<img src='"+pointVo[i].v_img_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml.push("			</label>");
								arrHtml.push("			</span>");
								arrHtml.push("			<input type='hidden' name='i_arrSeqnoSubBlue' value='"+pointVo[i].n_seqno+"' />");
								arrHtml.push("			<input type='hidden' name='i_sSetno' class='set_"+pointVo[i].n_setno+"' value='"+pointVo[i].n_seqno+"' />");
								arrHtml.push("		</div>");
								arrHtml.push("		<div class='prodDetail freegoodDiv' style='min-height:40px;'>");
								
								var brandnm = pointVo[i].v_brandnm != undefined ? pointVo[i].v_brandnm : '아모레퍼시픽몰';
								
								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
								arrHtml.push("			<p class='prodNm'>"+getByteString(pointVo[i].v_productnm,12)+"</p>");
								
								if(pointVo[i].v_capacity !="" && pointVo[i].v_capacity != undefined && pointVo[i].n_product_cnt > 0){
									arrHtml.push("			<p class='ml'>"+pointVo[i].v_capacity+"</p>");
								}
								
//								if(pointVo[i].v_capacity !="" && pointVo[i].v_capacity != undefined && pointVo[i].n_product_cnt > 0){
//									arrHtml.push("			<p class='ml'>"+pointVo[i].v_capacity+"*"+pointVo[i].n_product_cnt+"개</p>");
//								}else{
//									arrHtml.push("			<p class='ml'>"+pointVo[i].n_product_cnt+"개</p>");
//								}
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+pointVo[i].n_product_cnt+"' />");
								arrHtml.push("		</div>");
								
								arrHtml.push("			<select id='prod_"+pointVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
								for(var k = 1; k <= pointVo[i].n_product_cnt; k++){
									arrHtml.push("			<option value='"+k+"'");
									if(k == pointVo[i].n_product_cnt){
										arrHtml.push("			selected= 'selected'");
									}
									arrHtml.push("			>"+k+"개</option>");
								}
								arrHtml.push("			</select>");
								arrHtml.push("	</li>");
							
							}
							
							arrHtml.push("</ul>");
							
							target.html("");	
							target.html($(arrHtml.join("")));	
							$(".div_rebon_freegood").show();
								
						}
						
						//YHCHOI : CLUB AP 추가 사은품 들어가는 부분
//						var clubVo	= data.object.clList;
//						var clubsize = clubVo.length;
//					
//						if(clubsize > 0){
//							
//							var target 	= $("#div_clfreegood");
//							var arrHtml = new Array();
//							
//							arrHtml.push("<ul>");
//							
//							for(var i=0; i<clubsize; i++){
//								
//								arrHtml.push("	<li>");
//								arrHtml.push("		<div class='prodImg prodImg_bd'>");
//								arrHtml.push("		<span class='inputChk6'>");
//								arrHtml.push("			<input type='checkbox' id='chkv_"+(i+1)+"' name='i_arrSeqno' value='"+clubVo[i].n_seqno+"' class='checkbox check_"+clubVo[i].v_product_typecd+"' checked='checked'>");
//								arrHtml.push("			<label for='chkv_"+(i+1)+"'>");
//								arrHtml.push("				<img src='"+clubVo[i].v_img_path+"' alt='' onerror='fnNoImage(this);'/>");
//								arrHtml.push("			</label>");		
//								arrHtml.push("		</span>");
//								arrHtml.push("		<input type='hidden' name='i_arrSeqnoSubVip' value='"+clubVo[i].n_seqno+"' />");
//								arrHtml.push("		<input type='hidden' name='i_sSetno' class='set_"+clubVo[i].n_setno+"' value='"+clubVo[i].n_seqno+"' />");
//								arrHtml.push("		</div>");
//								arrHtml.push("		<div class='prodDetail' style='min-height:40px;'>");
//								
//								var brandnm = clubVo[i].v_brandnm != undefined ? clubVo[i].v_brandnm : '아모레퍼시픽몰';
//								
//								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
//								arrHtml.push("			<p class='prodNm'>"+getByteString(clubVo[i].v_productnm,12)+"</p>");
//								
//								if(clubVo[i].v_capacity !="" && clubVo[i].v_capacity != undefined && clubVo[i].n_product_cnt > 0){
//									arrHtml.push("			<p class='ml'>"+clubVo[i].v_capacity+"</p>");
//								}
//								
////								if(clubVo[i].v_capacity !="" && clubVo[i].v_capacity != undefined && clubVo[i].n_product_cnt > 0){
////									arrHtml.push("			<p class='ml'>"+clubVo[i].v_capacity+"*"+clubVo[i].n_product_cnt+"개</p>");
////								}else{
////									arrHtml.push("			<p class='ml'>"+clubVo[i].n_product_cnt+"개</p>");
////								}
//								
//								arrHtml.push("		</div>");
//								
//								arrHtml.push("			<select id='prod_"+clubVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
//								for(var k = 1; k <= clubVo[i].n_product_cnt; k++){
//									arrHtml.push("			<option value='"+k+"'");
//									if(k == clubVo[i].n_product_cnt){
//										arrHtml.push("			selected= 'selected'");
//									}
//									arrHtml.push("			>"+k+"개</option>");
//								}
//								arrHtml.push("			</select>");
//								arrHtml.push("	</li>");
//							
//							}
//							
//							arrHtml.push("</ul>");
//							
//							target.html("");	
//							target.html($(arrHtml.join("")));	
//							$(".div_clubap_freegood").show();
//								
//						}
						
						//YHCHOI : VIP 사은품 들어가는 부분
						var vipVo	= data.object.vipList;
						var vipsize = vipVo.length;
					
						if(vipsize > 0){
							
							var target 	= $("#div_vipfreegood");
							var arrHtml = new Array();
							
							arrHtml.push("<ul>");
							
							for(var i=0; i<vipsize; i++){
								
								arrHtml.push("	<li>");
								arrHtml.push("		<div class='prodImg prodImg_bd'>");
								arrHtml.push("		<span class='inputChk6'>");
								arrHtml.push("			<input type='checkbox' id='chkv_"+(i+1)+"' name='i_arrSeqno' value='"+vipVo[i].n_seqno+"' class='checkbox check_"+vipVo[i].v_product_typecd+" v_gift' checked='checked'>");
								arrHtml.push("			<label for='chkv_"+(i+1)+"'>");
								arrHtml.push("				<img src='"+vipVo[i].v_img_path+"' alt='' onerror='fnNoImage(this);'/>");
								arrHtml.push("			</label>");		
								arrHtml.push("		</span>");
								arrHtml.push("		<input type='hidden' name='i_arrSeqnoSubVip' value='"+vipVo[i].n_seqno+"' />");
								arrHtml.push("		<input type='hidden' name='i_sSetno' class='set_"+vipVo[i].n_setno+"' value='"+vipVo[i].n_seqno+"' />");
								arrHtml.push("		</div>");
								arrHtml.push("		<div class='prodDetail freegoodDiv' style='min-height:40px;'>");
								
								var brandnm = vipVo[i].v_brandnm != undefined ? vipVo[i].v_brandnm : '아모레퍼시픽몰';
								
								arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
								arrHtml.push("			<p class='prodNm'>"+getByteString(vipVo[i].v_productnm,12)+"</p>");
								
								if(vipVo[i].v_capacity !="" && vipVo[i].v_capacity != undefined && vipVo[i].n_product_cnt > 0){
									arrHtml.push("			<p class='ml'>"+vipVo[i].v_capacity+"</p>");
								}
								
//								if(vipVo[i].v_capacity !="" && vipVo[i].v_capacity != undefined && vipVo[i].n_product_cnt > 0){
//									arrHtml.push("			<p class='ml'>"+vipVo[i].v_capacity+"*"+vipVo[i].n_product_cnt+"개</p>");
//								}else{
//									arrHtml.push("			<p class='ml'>"+vipVo[i].n_product_cnt+"개</p>");
//								}
								arrHtml.push("			<input type='hidden' class='cntOrigin' value='"+vipVo[i].n_product_cnt+"' />");
								arrHtml.push("		</div>");
								
								arrHtml.push("			<select id='prod_"+vipVo[i].n_seqno+"' name='i_arrProductCnt' class='selectBox3 prodCnt'>");
								for(var k = 1; k <= vipVo[i].n_product_cnt; k++){
									arrHtml.push("			<option value='"+k+"'");
									if(k == vipVo[i].n_product_cnt){
										arrHtml.push("			selected= 'selected'");
									}
									arrHtml.push("			>"+k+"개</option>");
								}
								arrHtml.push("			</select>");
								arrHtml.push("	</li>");
							
							}
							
							arrHtml.push("</ul>");
							
							target.html("");	
							target.html($(arrHtml.join("")));	
							$(".div_vip_freegood").show();
								
						}

					var couponSize = 0;
					if(rvo.v_userid != "99999999999999999999"){
						
						//YCHOI : 쿠폰 사용 목록
						var couponVo = data.object.couponList.cplist;
						var frVo = data.object.couponList.cpfrlist;
						  couponSize = couponVo.length;
						
						if(couponSize > 0){
							
							var target = $("#div_coupon_list");
							var arrHtml = new Array();
							
							for(var i=0; i<couponSize; i++){
								
								arrHtml.push("<dl>");
								
								arrHtml.push("	<dt>사용쿠폰</dt>");
								arrHtml.push("	<dd class='ftxt'>["+couponVo[i].v_typenm+"]"+couponVo[i].v_couponnm+"</dd>");
								
								if(couponVo[i].n_price>0 && couponVo[i].v_typecd != "0005"){
									arrHtml.push("	<dt>할인금액</dt>");
									arrHtml.push("	<dd>"+SetNumComma(couponVo[i].n_price)+"원</dd>");					
								}else if(couponVo[i].v_typecd == "0005"){
									arrHtml.push("	<dt>지급사은품</dt>");
									for(var j=0; j<frVo.length; j++){
										if(frVo[j].v_couponcd == couponVo[i].v_couponcd){
											arrHtml.push("	<dd style='float:right;'>"+frVo[j].v_productnm+"</dd>");
										}
									}
								}
								arrHtml.push("</dl>");
								
							}	

							target.show();
							target.html("");	
							target.html($(arrHtml.join("")));	
						}
					}
					
					if(cpsize == 0 && giftsize == 0 && specialsize == 0 && pointsize == 0 && vipsize == 0){
						
						$(".div_no_data").show();

					}
					MobileMyReturnStep1.setPayStats(rvo, pgVo, giftcardVo, giftboxCnt);
					MobileMyReturnStep1.addBtnEvent();
				}else{
					
					showMessageBox({message : data.message
						,close : function(){
							
							MobileBodyStart.goLogin("");
						}
					});
				}	
			}			
		});	
		
	}
	,NamingLayerPopup : function(){
		
		var frm = document.frm;
		
		var odercd = $("input[name='i_sOrdercd']",frm).val();
		var naming_price = $("input[name='i_sNamingPrice']",frm).val();
		var naming_cnt 	 = $("input[name='i_sNamingCnt']",frm).val();
		
		var target 	 = $("#div_naming_list");
	
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_naming_view_ajax.do"
			, type : "POST"
			, data : {i_sOrdercd : odercd}
			, dataType : "json"
			, animation: false
			, success  : function (data, textStatus, jqXHR) {
				if (data.status == "succ") {

					var vo 		  	   = data.object;
					var size		   = vo.length;
					var productcd 	   = "";
					var optioncd	   = "";
					var arrHtml	  	   = new Array();
					
					arrHtml.push("<div id='modalPopupLetteringSrv' class='modal-wrap'>");
					arrHtml.push("	<section class='modal-content popupLetteringSrv'>");
					arrHtml.push("		<div class='head'>");
					arrHtml.push("			<p class='ttl'>레터링 서비스 신청내역</p>");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='content'>");
					arrHtml.push("			<p class='tit'>"+vo.length+"개의 상품에 레터링을 신청하셨습니다.</p>");

					var cnt = 0;
					
					for(var i=0; i<size; i++){
						
						if(vo[i].v_productcd != productcd || (vo[i].v_productcd == productcd && vo[i].v_optioncd != optioncd)){
							
							arrHtml.push("			<div class='letteringBox'>");
							arrHtml.push("				<div class='prodImg'>");
							arrHtml.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'>");
							arrHtml.push("				</div>");
							arrHtml.push("				<div class='detail'>");
							
							var brandnm = vo[i].v_brandnm != undefined ? vo[i].v_brandnm : '아모레퍼시픽몰';
							
							arrHtml.push("					<p class='brandNm'>"+brandnm+"</p>");
							arrHtml.push("					<p class='prodNm'>"+vo[i].v_productnm+"</p>");
							arrHtml.push("					<p class='option'>"+vo[i].v_optionnm+"</p>");
							arrHtml.push("				</div>");
							
						}
						
						if(vo[i].v_productcd == productcd || (vo[i].v_productcd == productcd && vo[i].v_optioncd == optioncd)){
							
							cnt +=1;
							
						}
							
							arrHtml.push("		    	<div class='div_input_naming'>");	
							arrHtml.push("					<div class='inputbar' style='padding: 0 28px 0 134px;'>");
							arrHtml.push("						<div class='select' style='width:120px;'>");
							arrHtml.push("							<span class='span_lettering_no'>#"+cnt+"</span>");
							arrHtml.push("							<select id='i_arrNamingArea' name='i_arrNamingArea' class='selectBox3'><option>"+vo[i].v_naming_area+"</option></select>");
							arrHtml.push("						</div>");
							arrHtml.push("						<input type='text' name='i_arrNamingMessage' class='inputtxt' value='"+vo[i].v_message+"' placeholder='문구를 적어주세요.' readOnly='readOnly'>");
							arrHtml.push("					</div>");
							arrHtml.push("		    	</div>");
			
							
						if(((vo[i].v_productcd != productcd && i>0)|| (vo[i].v_productcd == productcd && vo[i].v_optioncd != optioncd) && i>0) || ((size -1 == i))){
							
							arrHtml.push("		    </div>");
							cnt = 0;
							
						}							

						productcd = vo[i].v_productcd;
						optioncd  = vo[i].v_optioncd;

					}

					arrHtml.push("		    <div class='result'>");
					arrHtml.push("		    	<p>레터링 신청 총 <em class='span_naming_cnt'>"+naming_cnt+"</em><span class='ftxt2'>건</span></p>");
					arrHtml.push("		    	<p>추가비용 : <em class='span_naming_price'>"+naming_price+"</em><span class='ftxt2'>원</span></p>");
					arrHtml.push("		    </div>");
					arrHtml.push("		    <div class='btnArea2'>");
					arrHtml.push("		    	<span class='btn_ty btn_lettering_pop_apply'><a href='#' onclick=\"modalPopupClose('#modalPopupLetteringSrv');return false;\">닫기</a></span>");
					arrHtml.push("		    </div>");
					arrHtml.push("		</div>");
					arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupLetteringSrv');return false;\"><img src='/mobile/images/common/btn_modalpopupClose.png' alt='닫기'></a>");
					arrHtml.push("	</section>");
					arrHtml.push("</div>");
					
					target.html("");	
					target.html($(arrHtml.join("")));	
					
					//팝업열기
					modalPopup("#modalPopupLetteringSrv");

				}
			}
		});
	}
	,setPayStats : function(rvo, pgVo, giftcardVo, giftboxCnt){
		var frm = document.frm;
		
		$("input[name='i_sOrdercd']",frm).val(rvo.v_ordercd);
		$("input[name='i_sNamingPrice']",frm).val(rvo.n_naming_price);
		$("input[name='i_sNamingCnt']",frm).val(rvo.n_naming_cnt);
		
		$(".rvo_ordercd").text(rvo.v_ordercd);
		if(rvo.v_pay_typecd == "0006" && $("input[name='i_sFlagBeautyHotdeal']").val() == "Y"){
			$(".rvo_price").text(SetNumComma(rvo.n_pay_bpoint)+"P");
		}else{
			$(".rvo_price").text(SetNumComma(rvo.n_pay_money)+"원 ("+rvo.v_pay_typenm+")");
		}
				
		$(".rvo_status").text(rvo.v_statusnm);
		
		if(rvo.v_delivery_number == undefined){
			$(".dlvnum_area").hide();
		}else{
			$(".rvo_dlvnum").text(rvo.v_delivery_number);			
		}
		
		
		$(".rvo_order_usernm").text(rvo.v_order_usernm);
		$(".rvo_order_mobile").text(rvo.v_order_mobile);
		$(".rvo_order_email").text(rvo.v_order_email);
		
		$(".rvo_dlv_receivernm").text(rvo.v_delivery_receivernm);
		$(".rvo_dlv_phone").text(rvo.v_delivery_phone);
		$(".rvo_dlv_mobile").text(rvo.v_delivery_mobile);
		
		$(".rvo_dlv_address").text("("+rvo.v_delivery_zip1+"-"+rvo.v_delivery_zip2+") "+rvo.v_delivery_address1+" "+rvo.v_delivery_address2);
		
		var phone = [];
		if(rvo.v_delivery_phone != undefined){
			phone  = rvo.v_delivery_phone.split("-");
			$(".span_phone1").text(phone[0]);
			$(".span_phone2").text(phone[1]);
			$(".span_phone3").text(phone[2]);
		}else{
			$(".span_phone1").text("");
			$(".span_phone2").text("");
			$(".span_phone3").text("");
		}
		var mobile = rvo.v_delivery_mobile.split("-");
		
		$(".span_addressnm").text("");
		$(".span_receivernm").text(rvo.v_delivery_receivernm);
		$(".span_zip1").text(rvo.v_delivery_zip1);
		$(".span_zip2").text(rvo.v_delivery_zip2);
		$(".span_addr1").text(rvo.v_delivery_address1);
		$(".span_addr2").text(rvo.v_delivery_address2);
		$(".span_militaryYn").text(rvo.v_flag_military);
		$(".span_deliverycomment").text(rvo.v_delivery_comment);
		$(".span_mobile1").text(mobile[0]);
		$(".span_mobile2").text(mobile[1]);
		$(".span_mobile3").text(mobile[2]);
		
		if(rvo.v_flag_military == "Y"){
			$(".rvo_dlv_military").text("(군부대발송요청)");					
		}
		
		$(".rvo_dlv_comment").text(rvo.v_delivery_comment);
		
		
		if(IS_LOGIN){

			$(".rvo_n_pay_giftcard").text(SetNumComma(rvo.n_pay_giftcard)+"원");
			$(".rvo_giftcard_total_price").text(SetNumComma(giftcardVo.total_price)+"원");
			
		}else{

			$(".rvo_n_pay_giftcard").text(SetNumComma(0)+"원");
			$(".rvo_giftcard_total_price").text(SetNumComma(0)+"원");

		}
		
		
		if(rvo.n_naming_cnt > 0){
			
			$(".btn_lettering_confirm").show();
			$(".rvo_naming_cnt").text(rvo.n_naming_cnt+"개의 상품에 레터링");
			$(".rvo_flag_naming").text("신청");
			
		}else{
			
			$(".btn_lettering_confirm").hide();
			$(".rvo_flag_naming").text("미신청");
		}
		
		if(rvo.v_flag_giftbox == "Y"){
			
			$(".rvo_giftbox_cnt").text(giftboxCnt +"개 상품에 유료선물포장");
			$(".rvo_flag_giftbox").text("신청");
			
		}else if(rvo.v_flag_free_giftbox == "Y"){
			
			$(".rvo_giftbox_cnt").text(giftboxCnt +"개 상품에 무료선물포장");
			$(".rvo_flag_giftbox").text("신청");
			
		}else{
			
			$(".rvo_flag_giftbox").text("미신청");
		}
		
		$(".rvo_n_price").text(SetNumComma(rvo.n_price));
		if(rvo.v_pay_typecd == "0006" &&  $("input[name='i_sFlagBeautyHotdeal']").val() == "Y"){
			$(".rvo_n_pay_money").parent().html("<em class='rvo_n_pay_money'>"+SetNumComma(rvo.n_pay_bpoint)+"</em>P");
		}else{
			$(".rvo_n_pay_money").text(SetNumComma(rvo.n_pay_money));
		}
		$(".rvo_dis_price").text(SetNumComma((rvo.n_minus_price - rvo.n_minus_coupon - rvo.n_minus_freegood) * -1)+"원");
		$(".rvo_giftcard_price").text(SetNumComma((rvo.n_minus_coupon + rvo.n_pay_giftcard + rvo.n_pay_giftcon) * -1)+"원");
		$(".rvo_pay_bpoint1").text(SetNumComma(rvo.n_pay_bpoint * -1) +"원");
		$(".rvo_suppl_price").text(SetNumComma(rvo.n_naming_price + rvo.n_giftbox_price)+"원");
		$(".rvo_delivery_price").text(SetNumComma(rvo.n_delivery_price)+"원");
		
		if(IS_LOGIN){

			$(".rvo_pay_bpoint2").text(SetNumComma(rvo.n_pay_bpoint)+"P");
			$(".rvo_pay_mpoint").text(SetNumComma(rvo.n_pay_mpoint)+"P");
			$(".rvo_balance_bpoint").text(SetNumComma(rvo.n_prev_bpoint - rvo.n_pay_bpoint)+"P");
			$(".rvo_balance_mpoint").text(SetNumComma(rvo.n_prev_mpoint - rvo.n_pay_mpoint)+"P");
			$(".rvo_save_bpoint").text(SetNumComma(rvo.n_save_bpoint)+"P");
			$(".rvo_save_mpoint").text(SetNumComma(rvo.n_save_mpoint)+"P");
			
		}else{
			
			$(".rvo_pay_bpoint2").text(0+"P");
			$(".rvo_pay_mpoint").text(0+"P");
			$(".rvo_balance_bpoint").text(0+"P");
			$(".rvo_balance_mpoint").text(0+"P");
			$(".rvo_save_bpoint").text(0+"P");
			$(".rvo_save_mpoint").text(0+"P");					
		}
		
		if(rvo.v_pay_typecd !=null && rvo.v_pay_typecd != undefined){
			
			var target  = $(".tbody_order_pay_info");
			
			var arrHtml = new Array();
			
			var orderPayType  = rvo.v_pay_typecd;
			var orderPaynm	  = "";
			var orderPayPrice = rvo.n_pay_money;
			
			arrHtml.push("<tr>");
			if(orderPayType == "0006" || orderPayType == "0017"){
				arrHtml.push("	<th scope='row'><p>결제정보</p></th>");
			}else{
				arrHtml.push("	<th scope='row'><p>"+pgVo.v_pg_typenm+"</p></th>");
			}
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012" || orderPayType == "0021" || orderPayType == "0022"){
				orderPaynm = "신용카드";
			}else if(orderPayType == "0002"){
				orderPaynm = "실시간 계좌이체";
			}else if(orderPayType == "0003"){
				orderPaynm = "무통장입금(가상계좌)";
			}else if(orderPayType == "0005"){
				orderPaynm = "휴대폰 결제";
			}else if(orderPayType == "0006"){
				orderPaynm = "뷰티포인트 결제";
			}else if(orderPayType == "0019"){
				orderPaynm = "간편 결제";
			}else if(orderPayType == "0006"){
				orderPaynm = "뷰티포인트결제";
			}else if(orderPayType == "0017"){
				orderPaynm = "기프트카드결제";
			}else if(orderPayType == "0023"){
				if(pgVo.v_paytype == "CARD"){
					orderPaynm += " 신용카드" ;
				}else if(pgVo.v_paytype == "BANK"){
					orderPaynm += " 계좌이체"; 
				}
				if(typeof pgVo.v_paytype != "undefined" && parseInt(pgVo.v_npointpayamount) > 0){
					orderPaynm += " + 포인트";
				}
				if(typeof pgVo.v_paytype == "undefined" && parseInt(pgVo.v_npointpayamount) > 0){
					orderPaynm += " 포인트";
				}
			}else if(orderPayType == "0024"){
				orderPaynm = "신용카드";
			}
			
			arrHtml.push("	<td class='th1'><p>"+orderPaynm+"</p></td>");
			arrHtml.push("</tr>");
			
			arrHtml.push("<tr>");
			
			if(orderPayType == "0006"){
				arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
				arrHtml.push("  <td class='pri'><p>"+SetNumComma(rvo.n_pay_bpoint)+"P");
			}else{
				arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
				arrHtml.push("  <td class='pri'><p>"+SetNumComma(orderPayPrice)+"원");
			}
			
			if(orderPayType == "0002" || orderPayType == "0003" ){
				arrHtml.push("<span>(입금해주실 금액입니다)</span>");
			}
			if(orderPayType == "0023"){
				if(parseInt(pgVo.v_npointpayamount) > 0){
					arrHtml.push("<br/><span>&nbsp;(네이버페이 포인트 : " + SetNumComma(pgVo.v_npointpayamount) + "원)</span>");
				}
			}
			
			arrHtml.push("	</p></td>");
			arrHtml.push("</tr>");
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012"|| orderPayType == "0021" || orderPayType == "0022"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>결제카드</th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>할부구분</th>");
				
				if(pgVo.v_cardinstallmonth == "00"){
					arrHtml.push("<td><p>일시불</p></td>");	
				}else{
					arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"할부</p></td>");
				}
				
				arrHtml.push("<tr>");

			}else if(orderPayType == "0002"){
				
//				arrHtml.push("<tr>");
//				arrHtml.push("	<th scope='row'><p>출금은행명</p></th>");
//				arrHtml.push("	<td><p>"+pgVo.v_financename+"은행</p></td>");
//				arrHtml.push("</tr>");
				
			}else if(orderPayType == "0003"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금은행명</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+"은행</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금계좌번호</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_accountnum+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금예금주</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_saowner+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금기한</p></th>");
				arrHtml.push("	<td><p>"+dateStrucChange(pgVo.v_closedate,1)+" 까지</p></td>");
				arrHtml.push("</tr>");
				
				$(".v_pay_type_0003").show();
				
			}else if(orderPayType == "0005"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>휴대폰 통신사</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+"</p></td>");
				arrHtml.push("</tr>");				
				
			}else if(orderPayType == "0023"){
				
				if(pgVo.v_paytype == "CARD") {
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'>결제카드</th>");
					arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
					arrHtml.push("</tr>");
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'>할부구분</th>");
					
					if(pgVo.v_cardinstallmonth == "0"){
						arrHtml.push("<td><p>일시불</p></td>");	
					}else{
						arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"개월 할부</p></td>");
					}
					
					arrHtml.push("<tr>");
				}
				else if(pgVo.v_paytype == "BANK") {
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'><p>출금은행명</p></th>");
					arrHtml.push("	<td><p>"+pgVo.v_financename+"</p></td>");
					arrHtml.push("</tr>");
				}
				
			}else if(orderPayType == "0024"){

				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>결제카드</th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>할부구분</th>");
				
				if(pgVo.v_cardinstallmonth == "00" || pgVo.v_cardinstallmonth == "01"){
					arrHtml.push("<td><p>일시불</p></td>");	
				}else{
					arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"개월 할부</p></td>");
				}
				
				arrHtml.push("<tr>");
			}
			
			target.html("");
			target.html($(arrHtml.join("")));
			
			/* 해당 주문이 정기구독인 경우 */
			if(typeof rvo.n_mseqno != "undefined" && typeof rvo.v_financename != "undefined"){
				var div_mypouchListDetail = $(".mypouchListDetail ");
				var billHTML = [];

				billHTML.push("");
				billHTML.push("");
				billHTML.push("");
				billHTML.push("");
				
				billHTML.push("<dl>                                                                ");
				billHTML.push("    <dt>신청번호</dt>                                               ");
				billHTML.push("    <dd>" + rvo.n_mseqno + "</dd>                                         ");
				
				billHTML.push("    <dt>신청수량</dt>                                               ");
				billHTML.push("    <dd>매월 1 BOX</dd>                                             ");
				
				billHTML.push("    <dt>구독기간</dt>                                               ");
				billHTML.push("    <dd>3개월</dd>                                                  ");
				
				billHTML.push("    <dt>결제수단</dt>                                               ");
				billHTML.push("    <dd>신용카드" + (typeof rvo.v_financename != "undefined" ? '_' + rvo.v_financename : '') + "</dd>");
				
				billHTML.push("    <dt>결제방식</dt>                                               ");
				billHTML.push("    <dd>매월 자동결제</dd>                                          ");
				billHTML.push("    <dd class=\"fifth\">(* 첫결제 이후 2번째 박스부터 자동결제)</dd>  ");
				
				billHTML.push("    <dt>신청일</dt>                                                 ");
				billHTML.push("    <dd>" + rvo.v_order_dtm.substring(0, 4) + "년 " + rvo.v_order_dtm.substring(4, 6) + "월 " + rvo.v_order_dtm.substring(6, 8) + "일" + "</dd>                                       ");
				billHTML.push("</dl>                                                               ");
				
				div_mypouchListDetail.html("");
				div_mypouchListDetail.html($(billHTML.join("")));
				
				$(".div_btn_cancel").find(".btn_cancel_pop").addClass("btn_billing_cancel_pop").removeClass("btn_cancel_pop");
			}
			
			$(".div_btn_cancel").hide();
			$(".btn_addr_change").hide();
			$(".div_btn_deliverySucc").hide();
			$(".div_btn_list").hide();
			$(".totalSelBox").hide();
			
			if(rvo.v_statuscd == "0001" || rvo.v_statuscd == "0002"){
				
				$(".div_btn_cancel").show();
				$(".btn_addr_change").show();
				
			}
			else if(rvo.v_statuscd == "0005"){ //gypark : 배송완료 때, 반품신청, 교환신청 버튼 노출
				$(".div_btn_deliverySucc").show();
				$(".totalSelBox").show();
				if(pgVo.v_cardinstallmonth != undefined && pgVo.v_cardinstallmonth != ""){
					var monthInt = parseInt(pgVo.v_cardinstallmonth);
					
					if(monthInt >= 80){
						$("input[name='i_sCheckAll']").prop("checked",true);
						$("input[name='i_sCheckAll']").click();
					}
				}
			}
			else{	// gypark : 나머지 상태는 목록으로 버튼만 노출
				$(".div_btn_list").show();
			}
			
			$(".div_return_info").hide();
			if((orderPayType == "0003" && rvo.v_statuscd == "0002") || (orderPayType == "0005" && rvo.v_statuscd == "0002")){
			    
				$("input[name='i_sRefundBankUsernm']").val(rvo.v_order_usernm);
				$(".rvo_refund_price").text(SetNumComma(rvo.n_pay_money));
				$(".div_return_info").show();
				
				var nowDate   = new Date();
			    var sNowYear  = ""+nowDate.getFullYear();
			    var nowMonth  = nowDate.getMonth() + 1;
			    var sNowMonth = ""+nowMonth;
			    
			    if(sNowMonth.length < 2){
			    	sNowMonth = "0"+nowMonth; 
			    }
			    var noewDtm  = new Date(sNowYear,sNowMonth).valueOf();

			    var orderDtm = new Date(rvo.v_order_dtm.substring(0,4),rvo.v_order_dtm.substring(4,6)).valueOf();
 				if(orderPayType == "0005"){
			    	if(noewDtm > orderDtm){
				    	$(".p_return_info").show();
				    	$(".div_return_info").show();
				    }else{
				    	$(".p_return_info").hide();
				    	$(".div_return_info").hide();
				    }
			    }else{
			    	$(".div_return_info").show();
			    }
			}	
		}	
	}
};