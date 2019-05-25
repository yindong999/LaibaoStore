///----------------cookies统一管理----------------------------
//写cookies
function setCookie(name, value, time) {
    var exp = new Date();
    if (time != null) {
        var strsec = getsec(time);
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
    }
    else {
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + escape(value) + ((time == null) ? "" : ";expires=" + exp.toGMTString()) + ";";
    }
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
//删除cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;";
}
//获取cookie1
function getCookie1(name) {
    var offset, cookieValue;
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end));
        }
    }
    return cookieValue;
}
//获取cookie2
function getCookie2(objName) {
    var arrStr = document.cookie.split(";");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
}
//获取cookie3
function getCookie3(objName, key) {
    var arrStr = document.cookie.split(";");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].substring(arrStr[i].indexOf(objName + "=") + objName.length + 1).split("&");
        for (var j = 0; j < temp.length; j++) {
            var temp1 = temp[j].split("=");
            if (temp1[0] == key)
                return unescape(temp1[1]);
        }
    }
}
//注：此读法适用于多个键值对的Cookie，即写入Cookie的第二种情况。getCookie3("user","name");  值为minggetCookie3("user","pass"); 值为123