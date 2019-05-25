//新版首页的右侧浮动图标
$(function () {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:text
        url: '/tool/submit_ajax.ashx?action=checkhoutaologin', //目标地址
        data: {},
        async: true,
        success: function (data, textStatus) {
            if (data.status == "1") {
                var tophtml = "<div id=\"izl_rmenun\" class=\"izl-rmenun\"><div class=\"btn1 btn-ewm\"><div class=\"pic\"><img src=\"../images/来宝app二维码.png\" style=\"margin-left: -14px;border: 2px solid  rgb(3, 104, 184);;\" alt=\"\"/></div></div><div class=\"btn1 btn-wx\" onclick=\"window.open('/UserFeedbackSurvey.aspx')\"><div class=\"pic\" >我要吐槽</div></div><div class=\"btn1 btn-dw\" onclick=\"ShortEssay(" + data.userid + ");\"><div class=\"shortessay\" >来宝短文</div></div><div class=\"btn1 btn-top\"></div></div>";
                if ($("#topn").length > 0) {
                    $("#topn").html(tophtml);
                }
                var topnewhtml = "<div id=\"izl_rmenun\" class=\"izl-rmenun\"><div class=\"btn1 btn-ewm\"><div class=\"ewm\"><img src=\"../images/来宝app二维码.png\" style=\"margin-left: -14px;border: 2px solid #f00;\" alt=\"\"/></div></div> <div class=\"btn1 btn-gouwuche\" onclick=\"window.open('/User/ShopCart.aspx')\"><div class=\"gouwuche\">购物车</div></div><div class=\"btn1 btn-zuji\" onclick=\"window.open('/user/UserHistory.aspx')\"><div class=\"zuji\">我的足迹</div></div><div class=\"btn1 btn-kefu\"  onclick=\"$('#OnLine').click()\"><div class=\"zaixiankefu\">在线咨询</div></div><div class=\"btn1 btn-wx\" onclick=\"window.open('/UserFeedbackSurvey.aspx')\"><div class=\"pic\" >我要吐槽</div></div><div class=\"btn1 btn-top\"></div></div>";
                if ($("#topnew").length > 0) {
                    $("#topnew").html(topnewhtml);
                }
                $("#izl_rmenun").each(function () {
                    $(this).find(".btn-ewm").hover(function () {
                        $(this).find(".ewm").fadeIn("slow");
                    }, function () {
                        $(this).find(".ewm").fadeOut("slow");
                    });
                    $(this).find(".btn-gouwuche").hover(function () {
                        $(this).find(".gouwuche").fadeIn("slow");
                    }, function () {
                        $(this).find(".gouwuche").fadeOut("slow");
                    });
                    $(this).find(".btn-zuji").hover(function () {
                        $(this).find(".zuji").fadeIn("slow");
                    }, function () {
                        $(this).find(".zuji").fadeOut("slow");
                    });
                    $(this).find(".btn-kefu").hover(function () {
                        $(this).find(".zaixiankefu").fadeIn("slow");
                    }, function () {
                        $(this).find(".zaixiankefu").fadeOut("slow");
                    });
                    $(this).find(".btn-weixin").hover(function () {
                        $(this).find(".weixin").fadeIn("slow");
                    }, function () {
                        $(this).find(".weixin").fadeOut("slow");
                    });
                    //$(this).find(".btn-wx").mouseenter(function () {
                    //    $(this).find(".pic").fadeIn("fast");
                    //});
                    //$(this).find(".btn-wx").mouseleave(function () {
                    //    $(this).find(".pic").fadeOut("fast");
                    //});
                    $(this).find(".btn-dw").mouseenter(function () {
                        $(this).find(".shortessay").fadeIn("fast");
                    });
                    $(this).find(".btn-dw").mouseleave(function () {
                        $(this).find(".shortessay").fadeOut("fast");
                    });
                    $(this).find(".btn-phone").mouseenter(function () {
                        $(this).find(".phone").fadeIn("fast");
                    });
                    $(this).find(".btn-phone").mouseleave(function () {
                        $(this).find(".phone").fadeOut("fast");
                    });
                    $(this).find(".btn-top").click(function () {
                        $("html, body").animate({
                            "scroll-top": 0
                        }, "fast");
                    });

                });
                var lastRmenuStatus = false;
                $(window).scroll(function () {//bug
                    var _top = $(window).scrollTop();
                    if (_top > 200) {
                        $("#izl_rmenun").data("expanded", true);
                    } else {
                        $("#izl_rmenun").data("expanded", false);
                    }
                    if ($("#izl_rmenun").data("expanded") != lastRmenuStatus) {
                        lastRmenuStatus = $("#izl_rmenun").data("expanded");
                        if (lastRmenuStatus) {
                            $("#izl_rmenun .btn-top").slideDown();
                            //$("#kefu").animate({ "bottom": "224px" }, 400).show();
                        } else {
                            $("#izl_rmenun .btn-top").slideUp();
                            //$("#kefu").animate({ "bottom": "178px" }, 400).show();
                        }
                    }
                });
            }
            else {
                var tophtml = "<div id=\"izl_rmenun\" class=\"izl-rmenun\"><div class=\"btn1 btn-ewm\"><div class=\"pic\"><img src=\"../images/来宝app二维码.png\" style=\"margin-left: -14px;border: 2px solid  rgb(3, 104, 184);;\" alt=\"\"/></div></div><div class=\"btn1 btn-wx\" onclick=\"window.open('/UserFeedbackSurvey.aspx')\"><div class=\"pic\" >我要吐槽</div></div><div class=\"btn1 btn-top\"></div></div>";
                if ($("#topn").length > 0) {
                    $("#topn").html(tophtml);
                }
                var topnewhtml = "<div id=\"izl_rmenun\" class=\"izl-rmenun\"><div class=\"btn1 btn-ewm\"><div class=\"ewm\"><img src=\"../images/来宝app二维码.png\" style=\"margin-left: -14px;border: 2px solid #f00;\" alt=\"\"/></div></div> <div class=\"btn1 btn-gouwuche\" onclick=\"window.open('/User/ShopCart.aspx')\"><div class=\"gouwuche\">购物车</div></div><div class=\"btn1 btn-zuji\" onclick=\"window.open('/user/UserHistory.aspx')\"><div class=\"zuji\">我的足迹</div></div><div class=\"btn1 btn-kefu\"  onclick=\"$('#OnLine').click()\"><div class=\"zaixiankefu\">在线咨询</div></div><div class=\"btn1 btn-wx\" onclick=\"window.open('/UserFeedbackSurvey.aspx')\"><div class=\"pic\" >我要吐槽</div></div><div class=\"btn1 btn-top\"></div></div>";
                if ($("#topnew").length > 0) {
                    $("#topnew").html(topnewhtml);
                }
                $("#izl_rmenun").each(function () {
                    $(this).find(".btn-ewm").hover(function () {
                        $(this).find(".ewm").fadeIn("slow");
                    }, function () {
                        $(this).find(".ewm").fadeOut("slow");
                    });
                    $(this).find(".btn-gouwuche").hover(function () {
                        $(this).find(".gouwuche").fadeIn("slow");
                    }, function () {
                        $(this).find(".gouwuche").fadeOut("slow");
                    });
                    $(this).find(".btn-zuji").hover(function () {
                        $(this).find(".zuji").fadeIn("slow");
                    }, function () {
                        $(this).find(".zuji").fadeOut("slow");
                    });
                    $(this).find(".btn-kefu").hover(function () {
                        $(this).find(".zaixiankefu").fadeIn("slow");
                    }, function () {
                        $(this).find(".zaixiankefu").fadeOut("slow");
                    });
                    //$(this).find(".btn-weixin").hover(function () {
                    //    $(this).find(".weixin").fadeIn("slow");
                    //}, function () {
                    //    $(this).find(".weixin").fadeOut("slow");
                    //});
                    $(this).find(".btn-ewm").mouseenter(function () {
                        $(this).find(".pic").fadeIn("fast");
                    });
                    $(this).find(".btn-ewm").mouseleave(function () {
                        $(this).find(".pic").fadeOut("fast");
                    });
                    $(this).find(".btn-wx").mouseenter(function () {
                        $(this).find(".pic").fadeIn("fast");
                    });
                    $(this).find(".btn-wx").mouseleave(function () {
                        $(this).find(".pic").fadeOut("fast");
                    });
                    $(this).find(".btn-phone").mouseenter(function () {
                        $(this).find(".phone").fadeIn("fast");
                    });
                    $(this).find(".btn-phone").mouseleave(function () {
                        $(this).find(".phone").fadeOut("fast");
                    });
                    $(this).find(".btn-top").click(function () {
                        $("html, body").animate({
                            "scroll-top": 0
                        }, "fast");
                    });
                });
                //$("#kefu").css("bottom", "132px");
                var lastRmenuStatus = false;
                $(window).scroll(function () {//bug
                    var _top = $(window).scrollTop();
                    if (_top > 200) {
                        $("#izl_rmenun").data("expanded", true);
                    } else {
                        $("#izl_rmenun").data("expanded", false);
                    }
                    if ($("#izl_rmenun").data("expanded") != lastRmenuStatus) {
                        lastRmenuStatus = $("#izl_rmenun").data("expanded");
                        if (lastRmenuStatus) {
                            $("#izl_rmenun .btn-top").slideDown();
                            //$("#kefu").animate({ "bottom": "178px" }, 400).show();
                        } else {
                            $("#izl_rmenun .btn-top").slideUp();
                            //$("#kefu").animate({ "bottom": "132px" }, 400).show();
                        }
                    }
                });

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {


            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
});

