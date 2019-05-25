//js获取参数数值
function labQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var urlreferrer = document.referrer; 
if (urlreferrer == "") {
    urlreferrer = "normal";
}
urlreferrer = escape(urlreferrer);
var locationurl = document.location;
locationurl = escape(locationurl);
var screenwidth = screen.width;
var screenheight = screen.height;
var isrelod = 0;
var pid = 0;
var ptid = 0;
var SaleId = 0;
if (menuType==undefined) {
    menuType ="other";
}
if ($("#PId_h").val() != undefined) {
    var pids = $("#PId_h").val();
    if (parseInt(pids) > 0) {
        pid = pids;
    }
}
if ($("#PTId_h").val() != undefined) {
    ptid = $("#PTId_h").val();
}
if ($("#UId_h").length > 0 && $("#UId_h").val()!="0") {
    SaleId = $("#UId_h").val();
}
else {
    if (labQueryString("SaleId") != null && labQueryString("SaleId") != "null" && labQueryString("SaleId") != "" && labQueryString("SaleId") != undefined) {
        SaleId = labQueryString("SaleId");
    }
}
window.onbeforeunload = function () {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        isrelod = 0;
        window.event.returnValue = ""; //此处放你想要操作的代码 
    } else {
        isrelod = 1;
    }
}
$(document).ready(function () {
    $("a[data-name]").each(function () {
        $(this).bind("click", function () {
            $.post("http://www.alaibao.cn/tool/event_ajax.ashx?action=view_aclick", { id: $(this).attr('id'), name: $(this).attr("data-name"), menuId: menuId, menuType: menuType, locationurl: $(this).attr("href"), EModel: $(this).attr("data-model") });
        })
    });


    $("a[data-exhibit]").each(function () {
       
        $.ajax({ url: "/tool/event_ajax.ashx?action=view_aexhibit", type: "POST", async: true, data: { id: $(this).attr('id'), name: $(this).attr("data-name"), menuId: menuId, menuType: menuType, locationurl: $(this).attr("href"), EModel: $(this).attr("data-model"), positUrl: window.location.href } });

        $(this).bind("click", function () {
            $.ajax({ url: "/tool/event_ajax.ashx?action=view_aexhibit_click", type: "POST", async: true, data: { id: $(this).attr('id'), name: $(this).attr("data-name"), menuId: menuId, menuType: menuType, locationurl: $(this).attr("href"), EModel: $(this).attr("data-model"), positUrl: window.location.href } });
        })

    });


});

var code = "<" + "script src='http://www.alaibao.cn/tool/Count.ashx?urlreferrer=" + encodeURI(encodeURI(urlreferrer)) + "&locationurl=" + encodeURI(encodeURI(locationurl)) + "&screenwidth=" + screenwidth + "&screenheight=" + screenheight + "&isrelod=" + isrelod + "&menuId=" + menuId +"&menuType="+menuType+"&slaeId=" + SaleId + "&prId=" + pid + "&protid=" + ptid + "&VTitle=" + encodeURI(encodeURI(document.title)) + "'></" + "script>";
document.write(code);