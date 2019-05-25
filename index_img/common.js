//js中打开一个新页面
function openNewPage(url, title, height, width, top, left) {
    window.open(url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no') //这句要写成一行
}
//滚动条
function openNewPage(url, title, height, width, top, left, tool) {
    window.open(url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=' + tool + ', resizable=no,location=no, status=no') //这句要写成一行
}
//js中打开一个新页面
function openNewPage(url, title) {
    window.open(url, title, 'toolbar=yes,menubar=no,scrollbars=no,resizable=yes,location=yes,status=no,dependent=yes');  //这句要写成一行
}
/**-----------------------------添加收藏页----------------*/
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}


/*------------------------------------设置为首页-------*/
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}
////---------------所有页面用到的共有的方法-----------------------------
//判断是否为中文
function isCharsInBag(s, bag) {
    var i, c;
    for (i = 0; i < s.length; i++) {
        c = s.charAt(i);
        if (bag.indexOf(c) > -1)
            return c;
    }
    return "";
}
function ischinese(s) {
    var errorChar;
    var badChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ><,'<>{}?/+=|\\′\":;~!#$%()`";
    errorChar = isCharsInBag(s, badChar)
    if (errorChar != "") {
        return false;
    }
    return true;
}
//判断电子信箱
function check_email(address) {
    var szReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var bChk = szReg.test(address);
    return bChk;
}
//判断字符长度是否在规定范围内
function len(txt, i, j) {
    var len = txt.replace(/[\n\r]/g, "");
    var len = len.length;
    if (len < i) {
        return false;
    }
    else if (len > j) {
        return false;
    }
    else {
        return true;
    }
}
//判断是否为数字
function IsNum(argValue) {
    var flag = false;
    var length = argValue.length;
    for (var iIndex = 0; iIndex < length; iIndex++) {
        if ((argValue.substr(iIndex, 1) >= "0") && (argValue.substr(iIndex, 1) <= "9"))
            flag = true;
        else {
            flag = false;
            break;
        }
    }
    return flag;
}
/**
* 判断是否是空
* @param value
*/
function isEmpty(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null") {
        return true;
    }
    else {
        value = value.replace(/\s/g, "");
        if (value == "") {
            return true;
        }
        return false;
    }
}
/**
* 只包含中文和英文
* @param cs
* @returns {Boolean}
*/
function isGbOrEn(value) {
    var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (value.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}
/**
* 验证银行账户，带"(, ),-"字符和数字其他不通过
* @param str
* @returns {Boolean}
*/
function checkBankCount(str) {
    if (str.length > 50) {
        return false;
    }
    var patternStr = "(0123456789- )";
    var strlength = str.length;
    for (var i = 0; i < strlength; i++) {
        var tempchar = str.substring(i, i + 1);
        if (patternStr.indexOf(tempchar) < 0) {
            return false;
        }
    }
    return true;
}
//验证银行号码格式
function checkBankAccount(account) {
    var reg = /^\d{12,19}$/g;   // 以19位数字开头，以19位数字结尾
    if (!reg.test(account)) {
        return false;
    }
    else {
        return true;
    }
}
/**
* 检查是否含有非法字符
* @param temp_str
* @returns {Boolean}
*/
function is_forbid(temp_str) {
    temp_str = kong(temp_str);
    temp_str = temp_str.replace('*', "@");
    temp_str = temp_str.replace('--', "@");
    temp_str = temp_str.replace('/', "@");
    temp_str = temp_str.replace('+', "@");
    temp_str = temp_str.replace('\'', "@");
    temp_str = temp_str.replace('\\', "@");
    temp_str = temp_str.replace('$', "@");
    temp_str = temp_str.replace('^', "@");
    temp_str = temp_str.replace('.', "@");
    temp_str = temp_str.replace(';', "@");
    temp_str = temp_str.replace('<', "@");
    temp_str = temp_str.replace('>', "@");
    temp_str = temp_str.replace('"', "@");
    temp_str = temp_str.replace('=', "@");
    temp_str = temp_str.replace('{', "@");
    temp_str = temp_str.replace('}', "@");
    var forbid_str = new String('@,%,~,&');
    var forbid_array = new Array();
    forbid_array = forbid_str.split(',');
    for (i = 0; i < forbid_array.length; i++) {
        if (temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}
/**
* 检查字符长度汉字两个字节字母一个字节
* @param txtObj
* @returns {Number}
*/
function checkLength(txtObj) {
    var val = txtObj;
    var valLength = 0;
    for (var ii = 0; ii < val.length; ii++) {
        var word = val.substring(ii, 1);
        if (/[^\x00-\xff]/g.test(word)) {
            valLength += 2;
        } else {
            valLength++;
        }
    }
    return valLength;
}
//验证网站地址是否正确
function checkURL(URL) {
    var str = URL;
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}
//QQ验证
function check_QQ(qq) {
    var pattern = /^[1-9]\d{4,12}$/;
    if (!pattern.test(kong(qq))) {
        return false;
    }
    return true;
}
//msn验证
function check_msn(msn) {
    var pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!pattern.test(kong(msn))) {
        return false;
    }
    return true;
}
//去掉空格
function kong(str) {
    var s = str.replace(/\s+/g, "");
    return s;
}
//判断电话传真
function isTel(tel) {
    //国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
    var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (tel != "") {
        if (!pattern.exec(kong(tel))) {
            return false;
        }
    }
    return true;
}
//切换验证码
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}
//验证手机号码(检验13,15,18开头的手机号！)
function check_telephone(phone) {
    var reg = /^1[3|4|5|8][0-9]\d{8}$/;
    if (!reg.test(kong(phone))) {
        return false;
    }
    return true;
}
//验证邮政编码
function isPostalCode(code) {
    var pattern = /^[0-9]{6}$/;
    if (code != "") {
        if (!pattern.exec(kong(code))) {
            return false;
        }
    }
    return true;
}
//验证数字和字母和下划线
function checkNumA(str) {
    var pattern = /[\w\d_]/;
    if (!pattern.test(kong(str))) {
        return false;
    }
    return true;
}
//带小数点
function CheckFloat(v) {
    var reg = /^[0-9]*\.?[0-9]*$/;
    if (!reg.test(v)) {
        return false;
    }
    else {
        return true;
    }

}
//  //保留两位小数点
function returnFloat(value) {
    value = Math.round(parseFloat(value) * 100) / 100;
    if (value.toString().indexOf(".") < 0) {
        value = value.toString() + ".00";
    }
    return value;
}
//判断身份证
function isidcard(str) {
    var result = str.match(/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/);
    if (result == null) return false;
    return true;
}

//去掉特殊字符 
function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
//切换选项卡
function setTab(name, cursel, n, currentClass, otherClass) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? currentClass : otherClass;
        con.style.display = i == cursel ? "block" : "none";
    }
}
function goTab(id_num, num, tab_num, pre, currentClass, othrerClass) {
    for (var i = 0; i < tab_num; i++) { document.getElementById(pre + "_info_" + id_num + i).style.display = "none"; }
    for (var i = 0; i < tab_num; i++) { document.getElementById(pre + "_tab_" + id_num + i).className = othrerClass; }
    document.getElementById(pre + "_tab_" + id_num + num).className = currentClass;
    document.getElementById(pre + "_info_" + id_num + num).style.display = "block";
}
/**
* 从url里获取对应参数值
* @param paramName
* @returns {String}
*/
function getParam(paramName) {
    var paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}
//js获取参数数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//js获取form发送的参数
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
//获取带？参数
function GetRequest() {

    var url = location.search; //获取url中"?"符后的字串

    var theRequest = new Object();

    if (url.indexOf("?") != -1) {

        var str = url.substr(1);

        strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {

            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

        }

    }

    return theRequest;

}
//搜索功能实现
function search(key) {
    var keys = document.getElementById(key).value;
    window.location.href = "/SearchProduct.asp?keyword=" + stripscript(keys);
}

//搜索功能实现
function batchSearch(key) {
    var keys = $(key).val();
    if (keys.length > 0) {
        $.ajax({
            url: "/tool/submit_ajax.ashx?action=batchSearch",
            type: "POST",
            timeout: 60000,
            data: { "keywords": keys },
            dataType: "json",
            success: function (data, type) {
                if (data.status == 1) {
                    $("#search_num").html(data.sucnum + data.failnum);
                    $("#suc_num").html(data.sucnum);
                    $("#search-result").html(data.msg);
                    $("#hide_goods_spec_list").val(data.EquipmentList);
                    $("#hdbsid").val(data.bsId);
                    $.ajax({
                        url: "/tool/submit_ajax.ashx?action=AddSearchresult",
                        type: "POST",
                        timeout: 60000,
                        data: { "bsId": data.bsId, "searchresult": data.EquipmentList },
                        dataType: "json",
                        success: function (data, type) {
                            if (data.status == 1) {
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown + "添加结果失败");

                        }
                    });
                } else {
                    alert(456);

                }
                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();'
                alert(errorThrown + "123");
            }
        });
    }
}



//显示评论AJAX分页列表
function AjaxPageList(listDiv, pageDiv, pageSize, pageCount, sendUrl) {
    //pageIndex -页面索引初始值
    //pageSize -每页显示条数初始化
    //pageCount -取得总页数
    InitComment(0); //初始化评论数据
    $(pageDiv).pagination(pageCount, {
        callback: pageselectCallback,
        prev_text: "« 上一页",
        next_text: "下一页 »",
        items_per_page: pageSize,
        num_display_entries: 3,
        current_page: 0,
        num_edge_entries: 5,
        link_to: "javascript:;"
    });

    //分页点击事件
    function pageselectCallback(page_id, jq) {
        InitComment(page_id);
    }
    //请求评论数据
    function InitComment(page_id) {
        page_id++;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: sendUrl + "&page_size=" + pageSize + "&page_index=" + page_id,
            beforeSend: function (XMLHttpRequest) {
                $(listDiv).html('<p style="line-height:35px;">正在狠努力加载，请稍候...</p>');
            },
            success: function (data) {
                var strHtml = '<tbody>';
                strHtml += '<tr>';
                strHtml += '<th width="60" align="center">序号</th>';
                strHtml += '<th width="30%"  align="left">搜索词</th>';
                strHtml += '<th width="15%" align="left">搜索时间</th>';
                strHtml += '<th width="10%" align="left">调研员</th>';
                strHtml += '<th width="15%" align="left">处理时间</th>';
                strHtml += '<th width="15%" align="left">处理意见</th>';
                strHtml += '<th width="100">是否处理</th>';
                strHtml += '</tr>';



                for (var i in data) {
                    strHtml += '<tr>';

                    strHtml += '<td width="60" align="center">' + data[i].Id + '</td>';
                    strHtml += '<td>' + data[i].SearchKeywords + '</td>';
                    strHtml += '<td>' + data[i].AddDate + '</td>';
                    strHtml += '<td>' + data[i].SurveyName + '</td>';
                    strHtml += '<td>' + data[i].SolvedTime + '</td>';
                    strHtml += '<td>' + data[i].ProcessMethod + '</td>';

                    if (data[i].IsSolved.toString() == "1") {
                        strHtml += '<td>√</td>';
                    }
                    else {
                        strHtml += '<td>×</td>';
                    }

                    strHtml += '</tr>';
                }
                strHtml += '</tbody>'
                $(listDiv).html(strHtml);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                $(listDiv).html('<tbody><tr> <th width="60" align="center">序号</th><th width="30%"  align="left">搜索词</th><th width="15%" align="left">搜索时间</th><th width="10%" align="left">调研员</th><th width="15%" align="left">处理时间</th><th width="15%" align="left">处理意见</th><th width="100">是否处理</th></tr></tbody>');
            }
        });
    }
}

/*表单AJAX提交封装(包含验证)
------------------------------------------------*/
function AjaxInitForm(formObj, btnObj, isDialog, urlObj, callback) {
    var argNum = arguments.length; //参数个数
    $(formObj).Validform({

        
        tiptype: 3,
        callback: function (form) {
            //AJAX提交表单
           
            $(form).ajaxSubmit({                
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: '/tool/submit_ajax.ashx?action=AddData',
                type:"POST",
                dataType: "json",
                timeout: 60000
            });
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        $(btnObj).prop("disabled", true);
        $(btnObj).val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        
        if (data.status == 1) {
            $(btnObj).val("提交成功");
            //是否提示，默认不提示
            if (isDialog == 1) {
                var d = dialog({ content: data.msg }).show();
                setTimeout(function () {
                    d.close().remove();
                    if (argNum == 5) {
                        callback();
                    } else if (data.url) {
                        location.href = data.url;
                    } else if ($(urlObj).length > 0 && $(urlObj).val() != "") {
                        location.href = $(urlObj).val();
                    } else {
                        location.reload();
                    }
                }, 2000);
            } else {
                if (argNum == 5) {
                    callback();
                } else if (data.url) {
                    location.href = data.url;
                } else if ($(urlObj)) {
                    location.href = $(urlObj).val();
                } else {
                    location.reload();
                }
            }
        } else {

            //   dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
            $(btnObj).prop("disabled", false);
            $(btnObj).val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {

        alert(123);
        //dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        $(btnObj).prop("disabled", false);
        $(btnObj).val("再次提交");
    }




}