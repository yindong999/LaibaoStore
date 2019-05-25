$(function () {
    jQuery.support.cors = true; //IE9、IE8会出现跨域问题，所以加上这个
    var lab360url = getLab360Url();
    var online = "0";
    var fingerprint = '';
    var ptid_h = "0";
    if ($("#PTId_h").val() != undefined) {
        ptid_h = $("#PTId_h").val();
    }

    var uid_h = "911";
    if ($("#UId_h").val() != undefined) {
        uid_h = $("#UId_h").val();
    }

    var pid_h = "0";
    if ($("#PId_h").val() != undefined) {
        pid_h = $("#PId_h").val();
    }
    var ip = "";
    if ($("#IP") != undefined) {
        ip = $("#IP").val();
    }
    var specialsubjectIndex = "0";
    if ($("#specialsubjectIndex").val() != undefined) {
        specialsubjectIndex = $("#specialsubjectIndex").val();
    }
    var remark = "";
    if ($("#Remark").val() != undefined) {
        remark = $("#Remark").val();
    }
    var cu = "";
    if (GetCookies("Account") != null && GetCookies("Account") != "null" && GetCookies("Account") != "" && GetCookies("Account") != undefined) {
        var account = GetCookies("Account");
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:html
            url: lab360url+ '/tool/submit_ajax.ashx?action=GetBelongerId',//getLab360Url() + 上线后再加
            data: { account: account },
            async: false,
            success: function (data, textStatus) {
                if (data.status == 1) {
                    cu = encodeURIComponent(data.msg);
                } 
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(cu);
            }
        });
    }
    var url = document.location + "*" + uid_h + "-" + cu;
    //叮咚开关--start
    var num = 0;
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:html
        url: lab360url+ '/tool/submit_ajax.ashx?action=ServiceSwitch',
        data: { uid: uid_h },
        async: false,
        success: function (data) {
            num = parseInt(data);
        }
    });
    if ($('#OnLine').length <= 0) {
        $('body').append("<a id=\"OnLine\"></a>")
    }

    ///判定是否登录

    //判定域名是www.lab360.cn
    if (document.domain == "www.alaibao.cn") {
       
        var Myurl = document.location.toString();
       
        var price = 0;
        
        if (pid_h > 0)
        {
            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "json", //数据格式:html
                url: '/tool/submit_ajax.ashx?action=judgePrice',
                data: { pid: pid_h},
                async: false,
                success: function (data) {

                    price = data.status;
                  

                }

            });

        }
        //判定网站是/  Default   ProductC2   ProductDetail
        if (price > 0 && Myurl.indexOf(lab360url + "/ProductDetail") >= 0) {
            //if (uid_h == "911"||uid_h == "0")
            //{
            if (!((getCookie("Account") != null && getCookie("Account") != "" && getCookie("Account") != "null" && getCookie("Account") != undefined) || (getCookie("usersIDs") != null && getCookie("usersIDs") != "" && getCookie("usersIDs") != "null" && getCookie("usersIDs") != undefined))) {

                    $("#OnLine").attr("href", "javascript:void(0)");
                    $("#OnLine").attr("onclick", "dandiandlnew()");
                    $("#OnLine").attr("rel", "nofollow");
                    $("#Online" + pid_h).text("登录查看");
                    return false;
                }
            //}
        }
    


    }
    if (num == 1) {
        $("#OnLine").attr("href", "javascript:;");
        $("#OnLine").attr("onclick", "LeaveMessage(" + pid_h + "," + ptid_h + "," + uid_h + ")");
        if (((url.indexOf("specialsubject") < 0 && url.indexOf("tradelab") < 0) || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
            $('body').append('<div class="kefu" id="kefu" onclick="LeaveMessage(' + pid_h + ',' + ptid_h + ',' + uid_h + ')" onmouseenter="showdiv(\'liuyan_animation\')" onmouseleave="hidediv(\'liuyan_animation\')"><img src="' + lab360url+ '/chat/images/user4.png" alt="" width="45" height="45"/><div id="liuyan_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线留言</div></div>');
        }
        return false;
    } else {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "callbackparam",
            url: getChatUrl()+ '/chat/Ajax.ashx?action=ReceptOnline&ptid=' + ptid_h + '&uid=' + uid_h + "&cu=" + cu + '&url=' + encodeURIComponent(location.href), //目标地址
            async:true,
            success: function (json) {  
                online = json[0].uid;
                if (online != "0") {
                        if (cu != "") {
                            if ($(".tel") != undefined) {
                                $(".tel").html("<img class=\"tel_icon\" src=\"images/tel.jpg\" width=\"24\" height=\"24\" alt=\"电话号码\" /><font id=\"tel\" >" + json[0].Tel + "</font>");
                            }
                            if ($(".tel1") != undefined) {
                                $(".tel1").html(json[0].Tel);
                            }
                            if ($(".flagShow_p2.flag_tel.line91") != undefined) {
                                $(".flagShow_p2.flag_tel.line91").html("<a href=\"tel://" + json[0].Tel + "\">" + json[0].Tel + "</a>");
                            }
                            if ($(".flagShow_p2.flag_qq") != undefined) {
                                $(".flagShow_p2.flag_qq").html("<a href=\"http://wpa.qq.com/msgrd?v=3&amp;uin=" + json[0].QQ + "&amp;site=qq&amp;menu=yes\" target=\"_blank\"><img border=\"0\" src=\"/images/qiyeQQ.png\"></a><span>" + json[0].QQ + "</span>");
                            }
                            if ($(".alinkqq") != undefined) {
                                $(".alinkqq").attr("href", "http://wpa.qq.com/msgrd?v=3&uin=" + json[0].QQ + "&site=qq&menu=yes");
                            }
                            if ($("#QQzizun") != undefined)
                            {
                                $("#QQzizun").attr("href", "tencent://message/?uin=" + json[0].QQ);
                            }
                            if ($(".phonediv") != undefined)
                            {
                                $(".phonediv").html("<b></b><em>" + json[0].Tel + "</em>");
                            }
                            if ($(".btn1.btn-phone") != undefined)
                            {
                                $(".btn1.btn-phone").html("<div class=\"phone\" style=\"display: none;\">" + json[0].Tel + "</div>");
                            }
                        }
                        //生成游客随机ID
                        $.ajax({
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callbackparam",
                            url: lab360url + '/tool/submit_ajax.ashx?action=GenerateId&url=' + encodeURIComponent(location.href) + '&uId=' + online, //目标地址
                            success: function (json) {
                                fingerprint = json[0].id;

                                var PageName = "";
                                if (url.indexOf("ProductDetail") > 0 && url.indexOf("www.olabo.cn") < 0) {
                                    PageName = "产品详情页-";
                                } else if (url.indexOf("specialsubject") > 0 || url.indexOf("6186155.com") > 0) {
                                    PageName = "专题页-";
                                } else if (url.indexOf("ProductC2") > 0) {
                                    PageName = "产品列表页-";
                                } else if (url.indexOf("PriceList") > 0 && url.indexOf("PriceLists") < 0) {
                                    PageName = "价格单详情页-";
                                } else if (url.indexOf("tradelab") > 0) {
                                    PageName = "一键购支付页-";
                                } else if (url.indexOf("Default") > 0) {
                                    PageName = "商城首页-";
                                } else if (url.indexOf("ProductType") > 0) {
                                    PageName = "全部品类页-";
                                } else if (url.indexOf("PriceLists") > 0) {
                                    PageName = "价格单列表页-";
                                } else if (url.indexOf("BrandList") > 0) {
                                    PageName = "品牌列表页-";
                                } else if (url.indexOf("Brands") > 0) {
                                    PageName = "全部品牌页-";
                                } else if (url.indexOf("search/search") > 0) {
                                    PageName = "搜索结果页-";
                                } else if (url.indexOf("SupplyInfo") > 0) {
                                    PageName = "供应详情页-";
                                }
                                if (online != "0") {
                                    var chaturl = getChatUrl() + '/chat/PCTalk.aspx?UserType=1&UserIdentify=' + fingerprint + '&FromUrl=' + encodeURIComponent(url) + '&content=' + encodeURIComponent(document.title) + '&IP=' + encodeURI(ip) + '&pids=' + pid_h + '&ptids=' + ptid_h + '&uids=' + online + '&cu=' + cu + '&remark=' + encodeURIComponent(remark);
                                    $("#OnLine").attr("href", "javascript:void(0)");
                                    $("#OnLine").attr("onclick", "WebChat('" + chaturl + "');_czc.push(['_trackEvent', '在线客服', '" + PageName + "页面中部按钮']);");
                                    $("#OnLine").attr("rel", "nofollow");
                                    $("#OnLine").attr("data-name", "在线客服-右侧悬浮按钮");
                                    $("#OnLine").attr("data-model", "在线客服-右侧悬浮按钮");
                                    if ((url.indexOf("specialsubject") < 0 || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("m.alaibao.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
                                        $('body').append('<div class="kefu" id="kefu"><a id="OnLine_" data-name="在线客服-右侧悬浮按钮" data-model="在线客服-右侧悬浮按钮" rel="nofollow" href="javascript:void(0);"  onclick="WebChat(\'' + chaturl + '\');_czc.push([\'_trackEvent\', \'在线客服\', \'' + PageName + '右侧悬浮按钮\']);"  onmouseenter="showdiv(\'zixun_animation\')" onmouseleave="hidediv(\'zixun_animation\')"><img src="' + lab360url + '/chat/images/user4.png" alt="" width="45" height="45"/><a/><div id="zixun_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线咨询</div></div>');
                                    }
                                } else {
                                    $("#OnLine").attr("href", "javascript:;");
                                    $("#OnLine").attr("onclick", "LeaveMessage(" + pid_h + "," + ptid_h + "," + uid_h + ")");
                                    if (((url.indexOf("specialsubject") < 0 && url.indexOf("tradelab") < 0) || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("m.alaibao.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
                                        $('body').append('<div class="kefu" id="kefu" onclick="LeaveMessage(' + pid_h + ',' + ptid_h + ',' + uid_h + ')" onmouseenter="showdiv(\'liuyan_animation\')" onmouseleave="hidediv(\'liuyan_animation\')"><img src="' + lab360url + '/chat/images/user4.png" alt="" width="45" height="45"/><div id="liuyan_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线留言</div></div>');
                                    }
                                }

                            },
                            error: function (error) {
                                $("#OnLine").attr("href", "javascript:;");
                                $("#OnLine").attr("onclick", "LeaveMessage(" + pid_h + "," + ptid_h + "," + uid_h + ")");
                                if (((url.indexOf("specialsubject") < 0 && url.indexOf("tradelab") < 0) || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("m.alaibao.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
                                    $('body').append('<div class="kefu" id="kefu" onclick="LeaveMessage(' + pid_h + ',' + ptid_h + ',' + uid_h + ')" onmouseenter="showdiv(\'liuyan_animation\')" onmouseleave="hidediv(\'liuyan_animation\')"><img src="' + lab360url + '/chat/images/user4.png" alt="" width="45" height="45"/><div id="liuyan_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线留言</div></div>');
                                }
                            }
                        });
                }
                else {
                    $("#OnLine").attr("href", "javascript:;");
                    $("#OnLine").attr("onclick", "LeaveMessage(" + pid_h + "," + ptid_h + "," + uid_h + ")");
                    if (((url.indexOf("specialsubject") < 0 && url.indexOf("tradelab") < 0) || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("m.alaibao.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
                        $('body').append('<div class="kefu" id="kefu" onclick="LeaveMessage(' + pid_h + ',' + ptid_h + ',' + uid_h + ')" onmouseenter="showdiv(\'liuyan_animation\')" onmouseleave="hidediv(\'liuyan_animation\')"><img src="' + lab360url + '/chat/images/user4.png" alt="" width="45" height="45"/><div id="liuyan_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线留言</div></div>');
                    }
                }
            },
            error: function (json) {
                $("#OnLine").attr("href", "javascript:;");
                $("#OnLine").attr("onclick", "LeaveMessage(" + pid_h + "," + ptid_h + "," + uid_h + ")");
                if (((url.indexOf("specialsubject") < 0 && url.indexOf("tradelab") < 0) || specialsubjectIndex != "0") && url.indexOf("biobase.cn") < 0 && url.indexOf("xinbeixi.cn") < 0 && url.indexOf("m.lab360.cn") < 0 && url.indexOf("m.alaibao.cn") < 0 && url.indexOf("www.labbase.net") < 0 && url.indexOf("tongfenggui.com.cn") < 0 && url.indexOf("jinfengyedanguan.com") < 0) {
                    $('body').append('<div class="kefu" id="kefu" onclick="LeaveMessage(' + pid_h + ',' + ptid_h + ',' + uid_h + ')" onmouseenter="showdiv(\'liuyan_animation\')" onmouseleave="hidediv(\'liuyan_animation\')"><img src="' + lab360url + '/chat/images/user4.png" alt="" width="45" height="45"/><div id="liuyan_animation" style="display:none;background-color: #0368B8;position: absolute;width: 160px;left: -160px;top: 0px;line-height: 45px;color: #FFF;font-size: 18px;    text-align: center;">在线留言</div></div>');
                }
            }
        });
    }
});

function WebChat(url) {
    window.open(url, '在线客服', "height=520, width=900,top=100,left=" + (document.body.clientWidth -900) / 2 + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}
function showdiv(id) {
    $("#" + id).fadeIn("fast");
}
function hidediv(id) {
    $("#" + id).fadeOut("fast");
}
//获取URL
function getLab360Url() {
    if (true) {
        return "http://www.alaibao.cn";
    }
    else {
        return "http://localhost:360"
    }
}
//获取客服系统URL
function getChatUrl() {
    if (true) {
        return "http://chat.alaibao.cn";
    }
    else {
        return "http://10.1.20.252:4360";
        //return "http://localhost:4360"
    }
}
//留言信息弹出页面
function LeaveMessage(pid, ptid, uid) {
    window.open(getLab360Url()+"/LeaveMessage.aspx?PId=" + pid + "&PTId=" + ptid + "&UId=" + uid + '&FromUrl=' + encodeURIComponent(location.href) + '&RefTitle=' + encodeURIComponent(document.title), "给客服留言", "height=330, width=500, top=200,left=" + (document.body.clientWidth - 506) / 2 + ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}
//短文添加弹出页面
function ShortEssay(uid) {
    var str = "<div id='liyuandiv'><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\"><tr><td align=\"right\" height=\"30\" class='tdright'></td><td><span style=\"float:left; margin-left:5px;\"> ";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=shortessattype',
        data: {},
        async: false,
        success: function (html) {
            str += html;
        }
    });
    str += "</span></td></tr>";
    str += "<tr><td align=\"right\" height=\"80\" valign=\"middle\" class='tdright'>&nbsp;&nbsp;</td><td> <textarea id=\"txtcontent\" style=\"height:60px;width:330px;\"></textarea></td></tr>";
    str += "<tr><td align=\"right\" height=\"30\" class='tdright'></td><td><span style=\"float:left;\"> <input type=\"checkbox\" id=\"isanonymouse\" value=\"1\"/><label>匿名</label></span></td></tr>";
    str += "<tr><td  height=\"30\"></td><td><input name=\"\"  type=\"button\" value=\"提交\"  style=\"margin-left:140px;background:#0069d5; border:0;cursor:pointer; height:20px; color:#FFF; padding:0px 10px\" onclick=\"submitshortessay(" + uid + ")\" /></td></tr></table></div>";
    $.tipsWindow({
        ___title: "发布来宝短文",
        ___content: "text:" + str,
        ___width: 350,
        ___height: 180,
        ___drag: "___boxTitle",
        ___showbg: true
    });
}


//提交来宝短文信息
function submitshortessay(uid) {
    debugger;
    var isanonymouse = 0;
    var shortessaycontent = $("#txtcontent").val();
    if ($("input[type='checkbox']").is(':checked')) {
        isanonymouse = 1;
    }
    var sel = document.getElementById("shortessaylistSelect");
    var selvalue = sel.options[sel.selectedIndex].value;
    if (kong(shortessaycontent) == "") {
        alert("请输入您的短文内容！");
        $("#txtcontent").focus();
        return;
    }
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/admin_ajax.ashx?action=addshortessay', //目标地址
        data: { uids: uid, content: shortessaycontent, isanonymouse: isanonymouse, setid: selvalue },
        async: false,
        success: function (json) {
            if (json == "1") {
                alert("恭喜您添加短文成功！");
                $.tipsWindow.removeBox();
            }

            else {
                alert("很遗憾您添加短文失败！");
            }
        }
    });
}
//读取cookies 
function GetCookies(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}