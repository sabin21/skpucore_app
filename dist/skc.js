function popWin(e,n,t,o,i){var a="status=no,height="+t+",width="+n+",resizable=no,left=0,top=0,screenX=0,screenY=0,scrollbars="+o;commonPopWin=window.open(e,i,a),commonPopWin.focus()}function confirmPopWin(e,n,t,o,i){if(0!=confirm("�� 李쎌쑝濡� �대┰�덈떎. �ъ떆寃좎뒿�덇퉴?")){var a="status=no,height="+t+",width="+n+",resizable=no,left=0,top=0,screenX=0,screenY=0,scrollbars="+o;commonPopWin=window.open(e,i,a),commonPopWin.focus()}}function confirmTargetLocation(e){0!=confirm("�� 李쎌쑝濡� �대┰�덈떎. �ъ떆寃좎뒿�덇퉴?")&&(window.open("about:blank").location.href=e)}function targetLocation(e){window.open("about:blank").location.href=e}function fnIframeResize(e){var n=document.getElementById(e).contentWindow.document.body.offsetHeight;$("#"+e).css("height",n)}jQuery((function(e){e.datepicker.regional.ko={closeText:"�リ린",prevText:"�댁쟾��",nextText:"�ㅼ쓬��",currentText:"�ㅻ뒛",monthNames:["1��","2��","3��","4��","5��","6��","7��","8��","9��","10��","11��","12��"],monthNamesShort:["1��","2��","3��","4��","5��","6��","7��","8��","9��","10��","11��","12��"],dayNames:["��","��","��","��","紐�","湲�","��"],dayNamesShort:["��","��","��","��","紐�","湲�","��"],dayNamesMin:["��","��","��","��","紐�","湲�","��"],weekHeader:"Wk",dateFormat:"yy-mm-dd",showOn:"button",buttonImage:"/aConsole/images/ico_cal.gif",buttonImageOnly:!1,firstDay:0,isRTL:!1,showMonthAfterYear:!0,yearSuffix:"",changeMonth:!0,changeYear:!0,yearRange:"c-1:c+5",showOtherMonths:!0,selectOtherMonths:!1,showWeek:!1,showButtonPanel:!0},e.datepicker.setDefaults(e.datepicker.regional.ko),e.fn.appendVal=function(n){return this.each((function(){null!=e(this).val()&&""!=e(this).val()?e(this).val(e(this).val()+","+n):e(this).val(e(this).val()+n)}))}}));var oEditors=[];function addEditor(e,n){nhn.husky.EZCreator.createInIFrame({oAppRef:oEditors,elPlaceHolder:e,sSkinURI:"/editor/SmartEditor2Skin.html",htParams:{bUseToolbar:!0,bUseVerticalResizer:!0,bUseModeChanger:!0,fOnBeforeUnload:function(){},aAdditionalFontList:[]},fOnAppLoad:function(){n&&n()},fCreator:"createSEditor2"})}function getHTML(e){return sHTML=oEditors.getById[e].getIR()}function setHTML(e,n){oEditors.getById[e].exec("PASTE_HTML",[n])}function fnStripTag(e){return e.replace(/<[^<|>]*>|&nbsp;|\r\n/gi,"").trim()}function fnPaging(e){var n=document.searchForm;$("input[name='pageIndex']").val(e),n.submit()}function fnPagingUrl(e,n){var t=document.searchForm;$("input[name='pageIndex']").val(e),t.action=n,t.submit()}function fnPage(e){var n=document.searchForm;n.action=e,n.method="get",n.submit()}function fnView(e,n){var t=document.searchForm;$("input[name='seq']").val(n),t.action=e,t.method="get",t.submit()}function fnAtDel(e){$(e).parent().parent().remove()}function fnDel(e){if(confirm("�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?")){var n=$("form[name=deleteForm]");n.find("input[name='seq']").val(e),n.submit()}}function fnDelAjax(e){if(confirm("�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?")){var n=$("form[name=deleteForm]");n.find("input[name='delSeq']").val(e),n.find("input[name='seq']").val(e);var t=n.serialize(),o=n.attr("action");$.post(o,t,(function(e){"S"==e.result?(alert("��젣�섏뿀�듬땲��."),$("form[name=searchForm]").submit()):alert("��젣以� �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�섏꽭��.")}),"json")}}function fnDelArr(){if($("input[name='chkSeq']").is(":checked")){if(confirm("�좏깮�� �댁슜�� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?")){var e=$("form[name=deleteForm]");e.find("input[name=seq]").val(""),$("input[name='chkSeq']:checked").each((function(){e.find("input[name=seq]").appendVal($(this).val())})),e.submit()}}else alert("�좏깮�� �댁슜�� �놁뒿�덈떎.")}function fnDelAjaxArr(){if($("input[name='chkSeq']").is(":checked")){if(confirm("�대떦 �뺣낫瑜� �곴뎄 ��젣�섏떆寃좎뒿�덇퉴?")){var e=$("form[name=deleteForm]");e.find("input[name=delSeq]").val(""),$("input[name='chkSeq']:checked").each((function(){e.find("input[name=delSeq]").appendVal($(this).val())}));var n=e.serialize(),t=e.attr("action");$.post(t,n,(function(e){"S"==e.result?(alert("��젣�섏뿀�듬땲��."),$("form[name=searchForm]").submit()):alert("��젣以� �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎. 愿�由ъ옄�먭쾶 臾몄쓽�섏꽭��.")}),"json")}}else alert("�좏깮�� �댁슜�� �놁뒿�덈떎.")}function fnCancel(e){confirm("�묒꽦以묒씤 �댁슜�� ��젣 �⑸땲��.\n痍⑥냼 �섏떆寃좎뒿�덇퉴?")&&fnPage(e)}function downloadFile(e,n){var t=encodeURI("/download.do?path="+e+"&fileName="+n);$("#ifr").attr("src",t)}function delFile(e,n,t){e&&$("#"+e).val(""),n&&$("#"+n).val(""),$(t).parent().remove()}function setCookie(e,n){var t=new Date;t.setDate(t.getDate()+365),document.cookie=e+"="+escape(n)+"; path=/; expires="+t.toGMTString()+";"}function setCookies(e,n,t){var o=new Date;o.setDate(o.getDate()+t),document.cookie=e+"="+escape(n)+"; path=/; expires="+o.toGMTString()+";"}function clearCookie(e){var n=new Date,t=new Date(n.getTime()-864e5);document.cookie=e+"= ; expires="+t.toGMTString()}function getCookieVal(e){for(var n=e+"=",t=0;t<=document.cookie.length;){var o=t+n.length;if(document.cookie.substring(t,o)==n)return-1==(endOfCookie=document.cookie.indexOf(";",o))&&(endOfCookie=document.cookie.length),unescape(document.cookie.substring(o,endOfCookie));if(0==(t=document.cookie.indexOf(" ",t)+1))break}return""}