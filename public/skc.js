jQuery(function($) {
	// �щ젰 �앹뾽 �ㅼ젙
	$.datepicker.regional['ko'] = {
		closeText : '�リ린',
		prevText : '�댁쟾��',
		nextText : '�ㅼ쓬��',
		currentText : '�ㅻ뒛',
		monthNames : [ '1��', '2��', '3��', '4��', '5��', '6��', '7��', '8��', '9��',
				'10��', '11��', '12��' ],
		monthNamesShort : [ '1��', '2��', '3��', '4��', '5��', '6��', '7��', '8��',
				'9��', '10��', '11��', '12��' ],
		dayNames : [ '��', '��', '��', '��', '紐�', '湲�', '��' ],
		dayNamesShort : [ '��', '��', '��', '��', '紐�', '湲�', '��' ],
		dayNamesMin : [ '��', '��', '��', '��', '紐�', '湲�', '��' ],
		weekHeader : 'Wk',
		dateFormat : 'yy-mm-dd',
		showOn : "button",
		buttonImage : '/aConsole/images/ico_cal.gif',
		buttonImageOnly : false,
		firstDay : 0,
		isRTL : false,
		showMonthAfterYear : true,
		yearSuffix : '',
		changeMonth : true,
		changeYear : true,
		yearRange : 'c-1:c+5',
		showOtherMonths : true,
		selectOtherMonths : false,
		showWeek : false,
		showButtonPanel : true
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	// jquery appendVal plugin
	$.fn.appendVal = function (newPart) {
		var result = this.each(function(){ 
			if( null != $(this).val() && "" != $(this).val() ){
				$(this).val( $(this).val() +","+ newPart );
			}else{
				$(this).val( $(this).val() + newPart); 
			}
		});
		return result;
	};
});

// ############�앹뾽 �닿린################################
function popWin(url, w, h, scroll, name) {
	var option = "status=no,height=" + h + ",width=" + w
			+ ",resizable=no,left=0,top=0,screenX=0,screenY=0,scrollbars="
			+ scroll;

	commonPopWin = window.open(url, name, option);
	commonPopWin.focus();
}

function confirmPopWin(url, w, h, scroll, name) {
	if (confirm("�� 李쎌쑝濡� �대┰�덈떎. �ъ떆寃좎뒿�덇퉴?") == false)
		return;

	var option = "status=no,height=" + h + ",width=" + w
			+ ",resizable=no,left=0,top=0,screenX=0,screenY=0,scrollbars="
			+ scroll;

	commonPopWin = window.open(url, name, option);
	commonPopWin.focus();
}
function confirmTargetLocation(url) {
	if (confirm("�� 李쎌쑝濡� �대┰�덈떎. �ъ떆寃좎뒿�덇퉴?") == false)
		return;
	var popWin = window.open('about:blank');
	popWin.location.href = url;
}
function targetLocation(url) {
	var popWin = window.open('about:blank');
	popWin.location.href = url;
}

// �꾩씠�꾨젅�� 由ъ궗�댁쫰
function fnIframeResize(_objId) {
	var iframeObj = document.getElementById(_objId);

	var childFrameHeight = iframeObj.contentWindow.document.body.offsetHeight;

	$('#' + _objId).css('height', childFrameHeight);

}


//�먮뵒�� �꾩뿭 蹂���
var oEditors = [];

/** �ㅼ씠踰� �먮뵒�� 異붽� * */
function addEditor(id, fnc) {
	nhn.husky.EZCreator.createInIFrame({
		oAppRef : oEditors,
		elPlaceHolder : id,
		sSkinURI : "/editor/SmartEditor2Skin.html",
		htParams : {
			bUseToolbar : true, // �대컮 �ъ슜 �щ� (true:�ъ슜/ false:�ъ슜�섏� �딆쓬)
			bUseVerticalResizer : true, // �낅젰李� �ш린 議곗젅諛� �ъ슜 �щ� (true:�ъ슜/ false:�ъ슜�섏�
			// �딆쓬)
			bUseModeChanger : true, // 紐⑤뱶 ��(Editor | HTML | TEXT) �ъ슜 �щ�
			// (true:�ъ슜/ false:�ъ슜�섏� �딆쓬)
			fOnBeforeUnload : function() {
			},
			aAdditionalFontList : []
		}, // boolean
		fOnAppLoad : function() {
			// oEditors.getById[id].setDefaultFont('kopubM', 10) ;
			if (fnc) {
				fnc();
			}
		},
		fCreator : "createSEditor2"
	});
}

/** �ㅼ씠踰� �먮뵒�곗뿉�� 媛믪쓣 媛��몄삩��. * */
function getHTML(id) {
	//return sHTML = oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
	return sHTML = oEditors.getById[id].getIR();
	
}
function setHTML(id, HTML) {
	oEditors.getById[id].exec("PASTE_HTML", [ HTML ]);
}
/** XSS 移섑솚 return **/
function fnStripTag(str){  
	str = str.replace(/<[^<|>]*>|&nbsp;|\r\n/gi, "").trim();
	return str;
}

//�섏씠吏� �대룞 
function fnPaging(pageIndex){
    var frm = document.searchForm;
    $("input[name='pageIndex']").val( pageIndex );
    frm.submit();
}



//�섏씠吏� Url �대룞 
function fnPagingUrl(pageIndex, _url){
    var frm = document.searchForm;
    $("input[name='pageIndex']").val( pageIndex );
    frm.action = _url;
    frm.submit();
}

//�섏씠吏� �대룞
function fnPage(_url) {
    var frm = document.searchForm;
    frm.action = _url;
    frm.method = "get";
    frm.submit();
}

//�곸꽭�섏씠吏� �대룞 
function fnView(_url, _seq) {
    var frm = document.searchForm;
	$("input[name='seq']").val( _seq );
	frm.action = _url;
	frm.method = "get";
	frm.submit();
}

// 泥⑤��뚯씪 �붾㈃ ��젣( �⑥씪 援ъ“ )
function fnAtDel(obj) {
	$(obj).parent().parent().remove();
	
}
// ��젣
function fnDel(_seq) {
	if(confirm('�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?')){
		var frm = $("form[name=deleteForm]");
		frm.find("input[name='seq']").val( _seq );
		frm.submit();
	}
}

function fnDelAjax(_seq) {
	if(! confirm('�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?')) return;
	var frm = $("form[name=deleteForm]");
	frm.find("input[name='delSeq']").val( _seq );
	frm.find("input[name='seq']").val( _seq );
	var params = frm.serialize();
	var url = frm.attr("action");
    $.post(
            url,
            params,
            function(data){
                if(data.result == "S" ){     
                	alert("��젣�섏뿀�듬땲��.");
                	$("form[name=searchForm]").submit();
                }else{
                	alert("��젣以� �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�섏꽭��.");
				}

            }, "json"
       ); 	
}

//�좏깮 ��젣
function fnDelArr(){
	if (! $("input[name='chkSeq']").is(":checked"))	{
		alert("�좏깮�� �댁슜�� �놁뒿�덈떎.");
		return ;
	}
	if (confirm("�좏깮�� �댁슜�� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?") ) 	{
		var frm = $("form[name=deleteForm]");

		frm.find("input[name=seq]").val("");
		$("input[name='chkSeq']:checked").each(function(){
			frm.find("input[name=seq]").appendVal( $(this).val() );
		});		
		frm.submit();		
	}     
}

function fnDelAjaxArr() {
	if (! $("input[name='chkSeq']").is(":checked"))	{
		alert("�좏깮�� �댁슜�� �놁뒿�덈떎.");
		return ;
	}	
	if(! confirm('�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?')) return;
	var frm = $("form[name=deleteForm]");
	frm.find("input[name=delSeq]").val("");
	$("input[name='chkSeq']:checked").each(function(){
		frm.find("input[name=delSeq]").appendVal( $(this).val() );
	});	
	var params = frm.serialize();
	var url = frm.attr("action");
    $.post(
            url,
            params,
            function(data){
                if(data.result == "S" ){
                	alert("��젣�섏뿀�듬땲��.");
                	$("form[name=searchForm]").submit();
                }else{
                	alert("��젣以� �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�섏꽭��.");
				}

            }, "json"
       ); 	
}
//�깅줉 痍⑥냼
function fnCancel(_url){
	if ( ! confirm("�묒꽦以묒씤 �댁슜�� ��젣 �⑸땲��.\n痍⑥냼 �섏떆寃좎뒿�덇퉴?") ) return;
	fnPage(_url);
}
// 泥⑤��뚯씪 �ㅼ슫濡쒕뱶
function downloadFile(path, name) {
	var url = encodeURI("/download.do?path=" + path + "&fileName=" + name);
	$("#ifr").attr("src", url);
}

// 泥⑤��뚯씪 ��젣
function delFile(id1, id2, obj) {
	if (id1) {
		$("#" + id1).val('');
	}
	if (id2) {
		$("#" + id2).val('');
	}
	$(obj).parent().remove();
}

//荑좏궎�댁슜
function setCookie(name, value) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + 365);   
	document.cookie = name + "=" + escape(value) + "; path=/; expires="
			+ todayDate.toGMTString() + ";"
}

//荑좏궎�댁슜
function setCookies(name, value, days) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + days);
	document.cookie = name + "=" + escape(value) + "; path=/; expires="
			+ todayDate.toGMTString() + ";"
} 
// 荑좏궎 �뚮㈇ �⑥닔
function clearCookie(name) {
	var today = new Date()
	// �댁젣 �좎쭨瑜� 荑좏궎 �뚮㈇ �좎쭨濡� �ㅼ젙�쒕떎.
	var expire_date = new Date(today.getTime() - 60 * 60 * 24 * 1000)
	document.cookie = name + "= " + "; expires=" + expire_date.toGMTString()
}

function getCookieVal(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}