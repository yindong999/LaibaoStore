function dashang(obj, uid) {
    var lseid = $(obj).attr("id").replace("reward", "");
    var uids = uid;
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/admin_ajax.ashx?action=essayreward', //目标地址
        data: { uids: uids, lseid: lseid },
        async: false,
        success: function (json) {
            debugger;
            if (json.status == "1") {
                $("#reward" + lseid).children("span").text(json.rewardclick);


            } else if (json.status == "0" && json.rewardclick == "已打赏") {
                alert("您已打赏");
            }
            else {
                alert("未能成功打赏！");
            }
        }
    });
}
//提交来宝短文信息
function commmentsubmit(lseid, uid,obj) {
    debugger;
    var commentid = $(obj).parent().parent().parent().children(".p_input").children(".emotion").attr("id").replace("commentconwrite", "");

    //短文评论内容
    var essaycommentcon = $("#commentconwrite" + commentid).val();
    //如果评论的内容有图片的话要解析一下
    if (essaycommentcon.match(/\[.*?\]/g) !== null) {
        essaycommentcon = AnalyticEmotion(essaycommentcon);
    } 
   
    if (kong(essaycommentcon) == "") {
        alert("请输入您的评论内容！");
        $("#commentconwrite").focus();
        return;
    }
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/admin_ajax.ashx?action=addeassycomment', //目标地址
        data: { lseid: lseid, uids: uid, content: essaycommentcon },
        async: false,
        success: function (json) {
            debugger;
            if (json.status == "1") {
                debugger;
                alert("恭喜您评论成功！");
                $("#commentconwrite").val("");
                $("#commentconwrite").focus();
                var sadad = $(obj).attr("id").replace("submit", "");

                $("#submit" + sadad).parent().parent().parent().parent().children(".commentlist").children(".pinglunlist").prepend("<li class=\"commentc\" id=\"commentli" + json.lsecid + "\"><div class=\"commentcon\"><div style=\"  color:#333; width:710px; font-size:12px; padding: 0px 0px 0px 10px;\"><font style=\"font-size: 12px; color: #217dad;\">" + json.username + "：</font>" + essaycommentcon + "</div></div><div class=\"timeuser\"><div style=\" width: 580px; float: left; color:#808080; font-size:12px; padding-left:10px;\">" + json.adddate + "</div><div style=\" width: 130px; overflow: hidden; text-align:right;\"><div class=\"replygoal\" style=\"display: none;\">" + json.username + "</div><a id=\"reply" + json.lsecid + "\" style=\"color: #808080; font-size: 12px;\" href=\"javascript:void(0);\" onclick=\"replyzhankai(this);\">回复</a> <a id=\"deletecom" + json.lsecid + "\" style=\" color:#808080; font-size: 12px;\" href=\"javascript:void(0);\" onclick=\"deletecomment(" + json.lsecid + ",this," + json.lseid + "," + json.targetuid + ")\">删除</a></div></div> <div class=\"commentarea\"><div class=\"p_input\"><textarea class=\"emotion\" id=\"replyconwrite" + json.lsecid + "\" cols=\"\" rows=\"\" name=\"\" style=\"margin: 0px; border-color: #e7e7e7;padding: 5px 2px 0px 6px;color: #808080;text-decoration: none; border-style: solid; border-width: 1px;font-size: 12px; word-wrap: break-word; line-height: 18px; overflow: hidden;outline: none; height: 60px;\"></textarea><br /><a href=\"javascript:void(0)\" id=\"faceping" + json.lsecid + "\" class=\"im-icon-face\" title=\"选择表情\" ></a></div><div class=\"p_submit\"><div class=\"btncomment\"><a id=\"replysubmit" + json.lseid + "\" class=\"btncomment_a\" href=\"javascript:void(0)\" onclick=\"replysubmit(" + json.lseid + "," + json.targetuid + "," + json.logonid + ",this)\">评论</a></div></div></div></li>");
                //绑定表情
                $('#faceping' + json.lsecid).SinaEmotion($('#replyconwrite' + json.lsecid));
                $("#comment" + lseid).children("span").text(json.commentclick);

            }

            else {
                alert("很遗憾您评论失败！");
            }
        }
    });
}
function deletecomment(lsecid, obj,lseid,uid) {
    if (!confirm("您确认要删除此条评论吗？")) {
        return;
    }
    var lsecid = $(obj).attr("id").replace("deletecom", "");
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/admin_ajax.ashx?action=deleassycomment', //目标地址
        data: { lsecid: lsecid, lseid: lseid, uid: uid },
        async: false,
        success: function (json) {
            debugger;
            if (json.status == "1") {
                $("#deletecom" + lsecid).parent().parent().parent().parent().children("#commentli" + lsecid).remove();
                $("#comment" + lseid).children("span").text(json.commentclick);
                alert("恭喜您删除成功！");
            }
            else {
                alert("不允许删除其它评论，删除失败！");
            }
        }
    });
}


//提交评论回复信息
function replysubmit(lseid, replyuid, uid, obj) {
    debugger;
    var commentid = $(obj).parent().parent().parent().children(".p_input").children(".emotion").attr("id").replace("replyconwrite", "");
    //短文评论回复内容
    var essaycommentcon = $("#replyconwrite" + commentid).val();
    var firstmao = essaycommentcon.indexOf(":", essaycommentcon);
    var newreplycon = essaycommentcon.substr(firstmao + 1);
    //如果回复的内容有图片的话要解析一下
    if (newreplycon.match(/\[.*?\]/g) !== null) {
        newreplycon = AnalyticEmotion(newreplycon);
    } 
    if (kong(newreplycon) == "") {
        alert("请输入您的评论回复内容！");
        $("#commentconwrite").focus();
        return;
    }
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/tool/admin_ajax.ashx?action=addreplycon', //目标地址
        data: { lseid: lseid, replygoalid: replyuid, uids: uid, content: newreplycon },
        async: false,
        success: function (json) {
            debugger;
            if (json.status == "1") {
                debugger;
                alert("恭喜您回复成功！");
                $("#replyshow").val(0);
                $("#replyconwrite").val("");
                $("#replyconwrite").focus();
                var sadad = $(obj).attr("id").replace("replysubmit", "");

                $("#replysubmit" + sadad).parent().parent().parent().parent().children(".commentarea").removeClass("commentclick");
                $("#replysubmit" + sadad).parent().parent().parent().parent().parent().parent().parent().children(".commentlist").children(".pinglunlist").prepend("<li class=\"commentc\" id=\"commentli" + json.lsecid + "\"><div class=\"commentcon\"><div style=\"  color:#333; width:710px; font-size:12px; padding-left:10px;\"><font style=\"font-size: 12px; color: #217dad;\">" + json.username + "：</font>" + "回复<font style=\"color:#217dad;\">@" + json.targetusername + "</font>:" + newreplycon + "</div></div><div class=\"timeuser\"><div style=\" width: 580px; float: left; color:#808080; font-size:12px; padding-left:10px;\">" + json.adddate + "</div><div style=\" width: 130px; overflow: hidden; text-align:right;\"><div class=\"replygoal\" style=\"display: none;\">" + json.username + "</div><a id=\"reply" + json.lsecid + "\" style=\"color: #808080; font-size: 12px;\" href=\"javascript:void(0);\" onclick=\"replyzhankai(this);\">回复</a> <a id=\"deletecom" + json.lsecid + "\" style=\" color:#808080; font-size: 12px;\" href=\"javascript:void(0);\" onclick=\"deletecomment(" + json.lsecid + ",this," + json.lseid + "," + json.targetuid + ")\">删除</a></div></div><div class=\"commentarea\"><div class=\"p_input\"><textarea class=\"emotion\" id=\"replyconwrite" + json.lsecid + "\" cols=\"\" rows=\"\" name=\"\" style=\"margin: 0px; border-color: #e7e7e7;padding: 5px 2px 0px 6px;color: #808080;text-decoration: none; border-style: solid; border-width: 1px;font-size: 12px; word-wrap: break-word; line-height: 18px; overflow: hidden;outline: none; height: 60px;\"></textarea><br /><a href=\"javascript:void(0)\" id=\"faceping" + json.lsecid + "\" class=\"im-icon-face\" title=\"选择表情\" ></a></div><div class=\"p_submit\"><div class=\"btncomment\"><a id=\"replysubmit" + json.lseid + "\" class=\"btncomment_a\" href=\"javascript:void(0)\" onclick=\"replysubmit(" + json.lseid + "," + json.targetuid + "," + json.logonid + ",this)\">评论</a></div></div></div></li>");
                //绑定表情
                $('#faceping' + json.lsecid).SinaEmotion($('#replyconwrite' + json.lsecid));
                //$("#comment" + lseid).children("span").text(json.commentclick);

            }

            else {
                alert("很遗憾您评论失败！");
            }
        }
    });
}


//搜索查询
function InterlocutionSearch(divTgs) {
    var str = $.trim($(divTgs).val());
    var ptId = $.trim($("#hdptid").val());
    var BId = $.trim($("#hdbid").val());


    if (str != "输入关健字" && ptId > 0) {
       
        $.ajax({
            url: "/tool/submit_ajax.ashx?action=InterlocutionSearch",
            type: "POST",
            timeout: 60000,
            data: { "keywords":str, "PTId": ptId, "BId": BId },
            dataType: "html",
            success: function (data, type) {
                
                    $("#InterlocutionListBox").html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                alert(XMLHttpRequest);
            
        }

        })
    }
    return false;
}