/*--------------------------用户登录所有操作-----------------------*/
function login() {

   
    if ($.cookie('isrenzheng') == "yes") {
        return location.href = "/logon.aspx?ReturnUrl="+escape("http://www.alaibao.cn/User/Authentic.aspx");
    } else {
        return location.href = "/logon.aspx?ReturnUrl=" + escape(location.href);
    }
}
//function login() { return location.href = "http://192.168.77.106:8086/logon.aspx?BackURL=" + escape(location.href); }
function regist() { return location.href = "http://passport.alaibao.cn/register/index.aspx?goto=" + escape(location.href); }
function zhuce() { window.open("http://passport.alaibao.cn/register/index.aspx?goto=" + escape(location.href)); }
//弹出登录层
function tanchuLogin() {

    if (getCookie("Account") != null && getCookie("Account") != "null" && getCookie("Account") != "" && getCookie("Account") != undefined) {

        addPayAttention();
    }
    else {
        $.tipsWindow({
            ___title: "来宝登陆",
            ___content: "iframe:../Ask/denglu.aspx",
            ___width: 494,
            ___height: 371,
            ___drag: "___boxTitle",
            ___showbg: true
        });
    }
}
//弹出登录层
function tanchuLogin1() {

    if (getCookie("Account") != null && getCookie("Account") != "null" && getCookie("Account") != "" && getCookie("Account") != undefined) {

        addPayAttention();
    }
    else {
        dandiandl();
    }
}


//直接加关注并提示关注成功
function addPayAttention() {
    var accout = getCookie("Account");

    var pid = document.getElementById("commodityArticleId").value;

    var url = "user.aspx?os=1&pid=" + pid + "&accout=" + accout + "";


    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        success: function (json) {
            if (json == "0") {
                var sb = "<div  class=\"adv\" id=\"adv\" style=\"display:block; width:280px;\">";
                sb = sb + "<div class=\"content1\" >";
                sb = sb + "<p class=\"user\" style=\" padding-left:70px; padding-top:10px;text-align:left;\">操作失败，请重新操作！</p>";
                sb = sb + "</div>";
                sb = sb + "</div>";
                $.tipsWindow({
                    ___title: "提示",
                    ___content: "text:" + sb,
                    ___width: 280,
                    ___height: 150,
                    ___drag: "___boxTitle",
                    ___showbg: true
                });
            }
            else if (json == "1") {
                var sb = "<div class=\"adv\" id=\"adv\" style=\"display:block; width:280px;\">";
                sb = sb + "<div class=\"content1\" >";
                sb = sb + "<p class=\"user\" style=\" padding-left:70px; padding-top:10px;text-align:left;\">关注成功！</p>";
                sb = sb + "</div>";
                sb = sb + "</div>";
                $.tipsWindow({
                    ___title: "提示",
                    ___content: "text:" + sb,
                    ___width: 280,
                    ___height: 150,
                    ___drag: "___boxTitle",
                    ___showbg: true
                });
            }
            else if (json == "2") {
                var sb = "<div class=\"adv\" id=\"adv\" style=\"display:block; width:280px;\">";
                sb = sb + "<div class=\"content1\" >";
                sb = sb + "<p class=\"user\" style=\" padding-left:70px; padding-top:10px;text-align:left;\">您已经关注过该产品！</p>";
                sb = sb + "</div>";
                sb = sb + "</div>";
                $.tipsWindow({
                    ___title: "提示",
                    ___content: "text:" + sb,
                    ___width: 280,
                    ___height: 150,
                    ___drag: "___boxTitle",
                    ___showbg: true
                });
            }
        }
    });

}
//统计购物车中数量
function ProductCount(account) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/submit_ajax.ashx?action=tongjicount', //目标地址
        data: { UserName: decodeURI(account) },
        async: false,
        beforeSend: function (XMLHttpRequest) {
            //发送前动作
        },
        success: function (data, textStatus) {
            if (data.status == 1) {
                $("#cartnum").html(data.quantity);
            } else {
                $("#cartnum").html(data.quantity);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
}
//*-----------------------------新版本2014-08-20-----------*/
//单点登录弹出层
function dandiandl() {
    var sb = "<div class=\"adv\" id=\"adv\" style=\"display:block;\">";
    sb = sb + "<div class=\"content1\" >";
    sb = sb + "<p class=\"user\" style=\" padding-left:70px; padding-top:10px;text-align:left;\">邮箱/用户名/已验证手机</p>";
    sb = sb + "<p class=\"gl shuru1\" style=\"margin-bottom:0px;\"><input  name=\"Username\" id=\"Username\" type=\"text\"  class=\"biaodan\" size=\"35\" onkeyup=\"value=value.replace(/[^\a-\z\A-\Z0-9\@\.]/g,'')\" onfocus=\"onfocus1()\"/></p>";
    sb = sb + "<div style=\"height:15px;padding-left:60px;\"><p id=\"nametip\" style=\"background:#FFEBEC;border:1px solid #FFBDBF;color:#E6393D;padding:0px;margin:0px;height:15px;width:305px;font-size:12px;display:none;\">请输入邮箱/用户名/已验证手机</p></div>";
    sb = sb + "<p class=\"user\" style=\" padding-left:70px;text-align:left;\">密码</p>";
    sb = sb + "<p class=\"gl shuru2\" style=\"margin-bottom:0px;\"><input name=\"password\" id=\"password\" type=\"password\"  class=\"biaodan\" size=\"35\" /></p>";
    sb = sb + "<div style=\"height:15px;padding-left:60px;\"><p id=\"pwdtip\" style=\"background:#FFEBEC;border:1px solid #FFBDBF;color:#E6393D;padding:0px;margin:0px;height:15px;width:305px;font-size:12px;display:none;\" onfocus=\"onfocus2()\">请输入密码</p></div>";
    sb = sb + "<p class=\"rem\" style=\" padding-left:70px;text-align:left;\"> <input name=\"\" id=\"zddl\" type=\"checkbox\" value=\"0\" onclick='recordpassword()' />自动登录 <a href=\"http://passport.alaibao.cn/findPwd.aspx\">忘记密码?</a></p>";
    sb = sb + "<div class=\"denglu1\" style=\" margin-left:70px;paddint-top:8px;\" onclick=\"ddlnew('Username','password')\">登&nbsp;&nbsp;录</div>";
    sb = sb + "<p style=\"margin:0px auto;padding:0px;text-align:right;padding-right:90px;padding-top:10px;\"><a href=\'javascript:regist()' target=\"_blank\" style=\"color:#1B66C7;font-size:14px;\">立即注册</a></p>";
    sb = sb + "</div>";
    sb = sb + "</div>";
    $.tipsWindow({
        ___title: "登录来宝账号",
        ___content: "text:" + sb,
        ___width: 480,
        ___height: 350,
        ___drag: "___boxTitle",
        ___showbg: true
    });
}
function dandiandlnew() {
    //var sb = "";
    //sb = sb + "<div class=\"accountlogin\" style=\"float:none;margin-top:0;\">";
    //sb = sb + "<div class=\"accountlogintop\" style=\"height:150px;\">";
    //sb = sb + "<img src=\"images/logon/dltu.png\" style=\"margin-left: -35px;padding-top:10px;\"/>";
    //sb = sb + "</div>";
    //sb = sb + " <div class=\"accountlogincenter\">";
    //sb = sb + "<div class=\"zhanghulogin\">";
    //sb = sb + "<div class=\"error\"><div class=\"errorimg\"></div><span class=\"errortext\" runat=\"server\" id=\"msgtip\">请输入用户名和密码</span></div>";
    //sb = sb + " <div class=\"zhanghao\"><label class=\"inputimg\"></label><input name=\"Username\" id=\"Username\" type=\"text\" class=\"inputusername\" placeholder=\"邮箱/用户名/已验证手机号\" onkeyup=\"value=value.replace(/[^\a-\z\A-\Z0-9\@\.\_\-]/g,'')\" /></div>";
    //sb = sb + "<div class=\"zhanghao passworddiv\"><label class=\"inputimg pwdimg\"> </label><input name=\"password\" id=\"password\" type=\"password\" class=\"inputusername\" placeholder=\"密码\"style=\"background-color: #fff;\" runat=\"server\"  /></div>";
    //sb = sb + " <div class=\"jizhupwd\">";
    //sb = sb + "<div class=\"jizhuanniu\"><div> <input type=\"checkbox\" checked=\"checked\"  id=\"zddl\" class=\"radio\" onclick='recordpassword()'/><label></label> </div></div>";
    //sb = sb + "<div class=\"jizhutext\" style=\"display:none;\"><label>自动登录</label></div>";
    //sb = sb + "<div class=\"jizhutext\"><a href=\"javascript:void(0)\" onclick=\"parent.window.location='http://passport.alaibao.cn/api/oauth/qq/index.aspx?BackURL=" + escape("http://www.alaibao.cn/logon.aspx") + "'\" class=\"pdl\"><b class=\"QQ-icon\"></b><span>QQ</span></a><span class=\"line\">|</span>";
    //sb = sb + "<a href=\"javascript:void(0)\" onclick=\"parent.window.location='http://passport.alaibao.cn/api/oauth/weixin/index.aspx?BackURL="+escape("http://www.alaibao.cn/logon.aspx")+"'\" class=\"pdl\"><b class=\"weixin-icon\"></b><span>微信</span></a></div>";
    //sb = sb + "<div class=\"wangjipwddiv\"><a href=\"javascript:regist()\" class=\"lijizhucetext\">立即注册</a><span style=\"margin-left:4px;\">|</span><a href=\"http://passport.alaibao.cn/findPwd.aspx\" target=\"_blank\" class=\"wangjipwd\"> 忘记密码? </a></div>";
    //sb = sb + " </div></div>";
    ////原登录
    //sb = sb + "<div class=\"denglu1\" onclick=\"ddlnew('Username','password')\">登&nbsp;&nbsp;录</div>";  
    //sb = sb + "  </div>";
    //sb = sb + " <div class=\"accountloginbottom\">";
    ////  注册
    //sb = sb + "<span style=\"font-size:18px;color:#999;\">实验室采购平台</span>";
    //sb = sb + "  </div></div>";
    //$.tipsWindow({
    //    ___title: "登录来宝账号",
    //    ___content: "text:" + sb,
    //    ___width: 350,
    //    ___height: 440,
    //    ___drag: "___boxTitle",
    //    ___showbg: true
    //});
    yanzhengdl();
}
function yanzhengdl()
{

    layer.open({
        type: 2,
        area: ['380px', '450px'],
        title:false,
        fixed: false, //不固定
        maxmin: false,
        content: 'http://passport.alaibao.cn/login/alaibaoindex.aspx?goto=' + encodeURI(window.parent.location.href)
    });
}
//单点登录功能实现
function ddlnew(uname, pwd) {
    var username = document.getElementById(uname).value;
    var password = document.getElementById(pwd).value;
    var zddl = document.getElementById("zddl").value;
    if (username=="")
    {
        alert("请输入账号！");
        $('#msgtip').html("请输入账号！");
        return false;
    }
    if (password == ""||password.length<6)
    {
        $('#msgtip').html("密码格式不对！");
        return false;
    }
    var flag = 0;
    if (username.indexOf('@') > 0) {
        flag = 1;
    }
    else {
        if (!check_telephone(username)) {
            flag = 2;
        } else {
            flag = 3;
        }
    }



    var clientUrl = "http://passport.alaibao.cn/data.ashx?jsoncallback=?"

   

    $.ajax({
        url: clientUrl,
        dataType: "jsonp",
        data: { os: 1, username: username, password: password, flag: flag, zddl: zddl },
        success: OnSuccess,
        error: OnError
    });
}
//成功后调用方法
function OnSuccess(json) {
    if (json.Account != "aa") {
     
        dlfz(json.Account);
    }
    else {
       
        //        alert("请检查您输入的用户名或者密码是否正确！");
        $('#msgtip').html("请检查您输入的用户名或者密码是否正确！");
    }
}
//失败时候调用方法
function OnError(XMLHttpRequest, textStatus, errorThrown) {
    if (errorThrown || textStatus == "error" || textStatus == "parsererror" || textStatus == "notmodified") {
        console.log("网络繁忙，请稍后再试！");
        return;
    }
    if (textStatus == "timeout") {
        targetDiv.replaceWith("请求数据超时！");
        return;
    }
}
//点击记录密码时候
function recordpassword() {
    var jzmm = document.getElementById("zddl");
    if (jzmm.checked == true) {
        document.getElementById("zddl").value = "1";
    }
    else {
        document.getElementById("zddl").value = "0";
    }
}
//查看本地凭证是否存在(这儿修改了url的地址)
function dlfz(account) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/submit_ajax.ashx?action=denglu', //目标地址
        data: { UserName: decodeURI(account) },
        async: false,
        success: function (data, textStatus) {
            if (data.status == 1) {
                setCookie("Account", data.Account);
                $.tipsWindow.removeBox();
                location.reload();
            }
            else {

                dandiandl();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
//添加到关注中
function addAttion(pid) {
    if (getCookie("Account") != null && getCookie("Account") != "" && getCookie("Account") != "null" && getCookie("Account") != undefined) {
        var account = getCookie("Account");
        var attion = $(".a-coll").attr('id');
      //  alert($("#attion" + pid).html());

      //  alert(event.target.id);
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '/tool/submit_ajax.ashx?action=guanzhu', //目标地址
            data: { pid: pid, username: account },
            async: false,
            success: function (data, textStatus) {
                if (data.status == "2") {
                    alert(data.msg);
                    $("#attion" + pid).children(".jghui").css("display", "block");
                    $("#attion" + pid).children(".jgbai").css("display", "none");
                    $("#shoucang").find(".shoucangi").css("display", "block");
                    $("#shoucang").find(".shoucangb").css("display", "none");                   
                }
                else if (data.status == "1") {
                    alert(data.msg);                  
                    $("#attion" + pid).children(".jghui").css("display", "none");
                    $("#attion" + pid).children(".jgbai").css("display", "block");
                    $("#shoucang").find(".shoucangi").css("display", "none");
                    $("#shoucang").find(".shoucangb").css("display", "block");
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }
    else {
        yanzhengdl();
    }
}


//添加到场景关注中(改了之后其实这个logonid就没用了)
function addSceneFollow(sid, logonid) {
    //    if (logonid != 0) {
    //        $.ajax({
    //            type: "POST", //用POST方式传输
    //            dataType: "json", //数据格式:JSON
    //            url: '/tool/submit_ajax.ashx?action=sceneuidfollow', //目标地址
    //            data: { sid: sid, userid: logonid },
    //            async: false,
    //            success: function (data, textStatus) {
    //                if (data.status == "1") {
    //                    $("#sceneattion"+sid).html(data.msg);
    //                    $("#scbackground").removeClass("bacblue");
    //                    $("#scbackground").addClass("bacgray");
    //                }
    //                else if (data.status == "2") {
    //                    $("#sceneattion"+sid).html(data.msg);
    //                    $("#scbackground").removeClass("bacgray");
    //                    $("#scbackground").addClass("bacblue");
    //                }
    //                else {
    //                    alert(data.msg);
    //                }
    //                //window.location.reload();
    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
    //            }
    //        });
    //    } else {
    if (getCookie("Account") != null && getCookie("Account") != "" && getCookie("Account") != "null" && getCookie("Account") != undefined) {
        var account = getCookie("Account");
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '/tool/submit_ajax.ashx?action=scenefollow', //目标地址
            data: { sid: sid, username: account },
            async: false,
            success: function (data, textStatus) {
                if (data.status == "1") {//1代表关注场景成功
                    $("#sceneattion" + sid).html(data.msg); //前台标签赋值为取消关注
                    $("#scbackground").removeClass("bacblue"); //清除以前的背景色
                    $("#scbackground").addClass("bacgray"); //更新现在的背景色
                    //alert(data.msg);

                    //location.reload();
                }
                else if (data.status == "2") {
                    $("#sceneattion" + sid).html(data.msg);
                    $("#scbackground").removeClass("bacgray");
                    $("#scbackground").addClass("bacblue");
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }
    else {
        yanzhengdl();
    }

}

//添加到场景关注中
function addProtypeFollow(ptid, logonid) {
    if (logonid != 0) {
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '/tool/submit_ajax.ashx?action=protypefollow', //目标地址
            data: { ptid: ptid, userid: logonid },
            async: false,
            success: function (data, textStatus) {
                if (data.status == "1") {
                    $("#protypeattion" + ptid).html(data.msg);

                }
                else if (data.status == "2") {
                    $("#protypeattion" + ptid).html(data.msg);

                }
                else {
                    alert(data.msg);
                }
                //window.location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });
    }
}


//设置二级品类到首页展示
function setIndexShow(ptid) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/submit_ajax.ashx?action=setProIndex', //目标地址
        data: { ptid: ptid },
        async: false,
        success: function (data, textStatus) {
            if (data.status == "1") {
                $("#indexshow" + ptid).html(data.msg);

            }
            else if (data.status == "2") {
                $("#indexshow" + ptid).html(data.msg);

            }
            else {
                alert(data.msg);
            }
            //window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });

}
//设置二级品类到首页展示
function setIndexBShow(bid) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/submit_ajax.ashx?action=setBrandIndex', //目标地址
        data: { bid: bid },
        async: false,
        success: function (data, textStatus) {
            if (data.status == "1") {
                $("#indexbshow" + bid).html(data.msg);

            }
            else if (data.status == "2") {
                $("#indexbshow" + bid).html(data.msg);

            }
            else {
                alert(data.msg);
            }
            //window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });

}


//设置三级品类到楼层展示
function setIndexShowThree(ptid, lfid) {
    if (lfid != 0) {
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '/tool/submit_ajax.ashx?action=setIndexShowThree', //目标地址
            data: { ptid: ptid, lfid: lfid },
            async: false,
            success: function (data, textStatus) {
                if (data.status == "1") {
                    $("#indexshowThree" + ptid + lfid).html(data.msg);

                }
                else if (data.status == "2") {
                    $("#indexshowThree" + ptid + lfid).html(data.msg);

                }
                else {
                    alert(data.msg);
                }
                //window.location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });

    } else {
        alert("请选择楼层！");
    }


}


//设置场景到楼层展示
function setIndexShowScene(ssid, lfid) {
    if (lfid != 0) {
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '/tool/submit_ajax.ashx?action=setIndexShowScene', //目标地址
            data: { ssid: ssid, lfid: lfid },
            async: false,
            success: function (data, textStatus) {
                if (data.status == "1") {
                    $("#indexshowScene" + ssid + lfid).html(data.msg);

                }
                else if (data.status == "2") {
                    $("#indexshowScene" + ssid + lfid).html(data.msg);

                }
                else {
                    alert(data.msg);
                }
                //window.location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
            }
        });

    } else {
        alert("请选择楼层！");
    }


}



//提交验证
function submitit() {
    if (document.getElementById('Username').value == "") {
        document.getElementById('nametip').style.display = "block";
        return false;
    }
    if (document.getElementById('password').value == "") {
        document.getElementById('pwdtip').style.display = "block";
        return false;
    }
    else {
        if (!checkNumA(document.getElementById('password').value)) {
            alert("密码必须为字母或者数字组合！");
            return false;
        }
    }
    return true;
}
//获取焦点
function onfocus1() {
    document.getElementById('nametip').style.display = 'none';
}
function onfocus2() {
    document.getElementById('pwdtip').style.display = 'none';
}
//智能提示功能实现
function tipsalert() {
    $('#key').autocomplete("/tool/submit_ajax.ashx?action=tipsalert", {
        max: 12,    //列表里的条目数
        minChars: 1,    //自动完成激活之前填入的最小字符
        width: 310,     //提示的宽度，溢出隐藏
        scrollHeight: 300,   //提示的高度，溢出显示滚动条
        matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
        autoFill: false,    //自动填充

        //需要把data转换成json数据格式
        parse: function (data) {
            return $.map(eval(data), function (row) {
                return {
                    data: row,
                    value: row.to,
                    result: row.name
                }
            });
        },

        formatItem: function (row, i, max) {
            //显示的值
            return row.name;
        },
        formatMatch: function (row, i, max) {
            //查找匹配的值
            return row.name;
        },
        formatResult: function (row) {
            //选中后的值
            return row.to;

        },
        extraParams: { v: 1 }

    }).result(function (event, row, formatted) {

    });
}
//智能提示功能实现
function tishi(id, v, url, resultID, ddresult) {
    $('#' + id).autocomplete(url, {
        max: 12,    //列表里的条目数
        minChars: 2,    //自动完成激活之前填入的最小字符
        width: 310,     //提示的宽度，溢出隐藏
        scrollHeight: 300,   //提示的高度，溢出显示滚动条
        matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
        autoFill: false,    //自动填充

        //需要把data转换成json数据格式
        parse: function (data) {
            return $.map(eval(data), function (row) {
                return {
                    data: row,
                    value: row.to + "," + row.cpID,
                    result: row.name
                }
            });
        },

        formatItem: function (row, i, max) {
            //显示的值
            return row.name;
        },
        formatMatch: function (row, i, max) {
            //查找匹配的值
            return row.name;
        },
        formatResult: function (row) {
            //选中后的值
            return row.to + row.cpID;

        },
        extraParams: { action: v }

    }).result(function (event, row, formatted) {
        var ids = row.to.split(",");
        $("#" + resultID).val(row.to);
        if (ddresult != null) {
            $("#" + ddresult).val(ids[1]);
        }
    });
}
//弹出纠错反馈信息
function jiucuofankui() {
    var sb = "<div style='width:100%;margin-top:20px;'><div><textarea id='txtcontent' cols='20' rows='2' style='width:300px;height:150px;border:1px solid #DDDDDD;'></textarea></div><div><span style='float:left;margin-top:5px;padding-left:20px;'><input id='cbname' type='checkbox' /></span><span style='float:left;font-size:14px;margin-left:5px;'>匿名</span></div><div style='text-align:center;width:100%'><input id='Button3' type='button' value='提交' style='color:#fff;background:#0069D5;border:0px;font-size:16px;width:100px;height:25px;cursor:pointer;margin-top:5px;' onclick='Addfankui()' /></div></div>";
    $.tipsWindow({
        ___title: "纠错/建议",
        ___content: "text:" + sb,
        ___width: 340,
        ___height: 250,
        ___drag: "___boxTitle",
        ___showbg: true
    });
}
//弹出纠错反馈信息
function Addfankui() {
    var isanonymouse = 0;
    var fkcontent =$("#txtcontent").val();

    if (is_forbid(fkcontent)) {
        alert("您输入的信息中有非法字符,请删除!");
        return;
    }

    if ($("#cbname").is(':checked')) {
        isanonymouse = 1;
    }
    if (kong(fkcontent) == "") {
        alert("请输入您的纠错/建议内容！");
        $("#txtcontent").focus();
        return;
    }
    var ptid = 0;
    if ($("#PTId_h").val() != undefined) {
        ptid = $("#PTId_h").val();
    }
    var menuname = "";
    if (menuId != undefined) {
        menuname = menuId;
    }
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/submit_ajax.ashx?action=addFankui', //目标地址
        data: { PTitle: document.title, fkcontent: fkcontent, isanonymouse: isanonymouse, PUrl: location.href, PTId: ptid, CoEName: menuname },
        async: false,
        success: function (json) {
            if (json == "1") {
                alert("您的纠错/建议已记录，感谢您的支持！");
                $.tipsWindow.removeBox();
            }
            else {
                alert("很遗憾您纠错/建议失败！");
            }
        }
    });
}



