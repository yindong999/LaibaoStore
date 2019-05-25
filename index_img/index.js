 //动态加载左侧的分类列表
function LoadLeftMenu(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=jiazaixinx&t='+ Math.random(), //目标地址
        data: { os: 14,ptId:id},
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").children("#divfenleiID").html(html);
        }
    });
}
//动态加载左侧的分类列表
function LoadLeftMenuNew(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=jiazaiproducttype&t=' + Math.random(), //目标地址
        data: { os: 14, ptId: id },
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").children("#divfenleiID").html(html);
        }
    });
}
//动态加载左侧的分类列表
function LoadLeftMenuHaoCai(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=jiazaihaocai&t=' + Math.random(), //目标地址
        data: { os: 14, ptId: id },
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").children("#divfenleiID").html(html);
        }
    });
}

//动态加载场景下的供应信息
//function LoadSceneProduct(id,id1, obj) {
//    $.ajax({
//        type: "POST", //用POST方式传输
//        dataType: "html", //数据格式:html
//        url: '/tool/submit_ajax.ashx?action=jiazaiSceneProduct&t=' + Math.random(), //目标地址
//        data: { os: 14, SSId: id, lfid: id1 },
//        async: false,
//        success: function (html) {
////            $("#sceprli-" + id).addClass('ta-select');

//            $("#floor-" + id1).children(".sfc").children("#sceneproduct").html(html);
//        }
//    });
//}
//动态加载耗材下的产品信息
function LoadHaoCaiProduct(id, id1, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=jiazaiHaocaiProduct&t=' + Math.random(), //目标地址
        data: { os: 14, PTId2: id, lfid: id1 },
        async: false,
        success: function (html) {
            //            $("#sceprli-" + id).addClass('ta-select');

            $("#floor-" + id1).children(".sfc").children("#sceneproduct").html(html);
        }
    });
}
//动态加载一级科室下的科室信息列表
function LoadLeftKeshiMenu(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=keshiinfomation&t=' + Math.random(), //目标地址
        data: { os: 14, tdId: id },
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").children("#divfenleiID").html(html);
        }
    });
}
//获取更多科室的列表
function LoadLeftMoreKeshi(obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=keshiMoreinfomation&t=' + Math.random(), //目标地址
        data: {},
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").children("#divfenleiID").html(html);
        }
    });
}

//首页定制化行业点击事件
$("#industryclick").click(function () {
    document.getElementById("industry").click();
});
//默认首页点击触发事件
$("#morenclick").click(function () {
    ondefaultPage();
});

//首页定制化行业点击时间
function showinduindex(induid) {  
    if (induid != null && induid != undefined) {
        if (induid == 1) {
            $("#all_p_list").text("医院仪器分类");
            $("#proleftlist").css("display", "none");
            $("#indukeshilist").css("display", "block");
            //首页上半部分右侧修改
            $(".fhrtitle").css("display", "none");
            $(".fhrcontent").css("display", "none");
            $(".fhrparts").css("display", "none");
            $(".ProSaleVolume").css("display", "block");
            $(".right-pic").css("margin", "0px");
            //秒杀隐藏
            $(".lab_SecKill").css("display", "none");
            //楼层隐藏
            $(".scenefloor-2016").css("display", "none");
            $(".lab_preson_need").css("display","block");
        }
    }
}


//动态加载一级品类下的二级品类
function LoadPTwoProduct(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=allsortLoadPro&t=' + Math.random(), //目标地址
        data: { os: "allsortload", PTOneId: id},
        async: false,
        success: function (html) {
            $(".pinleishow_main").html(html);
        }
    });
}

//商城后台动态加载一级品类下的二级品类
function NewLoadPTwoProduct(id, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=allsortLoadProHouTai&t=' + Math.random(), //目标地址
        data: { os: "allsortLoadProHouTai", PTOneId: id },
        async: false,
        success: function (html) {
            $(".pinleishow_main").html(html);
            $("input[name = checkitem]:CheckBox").bind("click", function () {
                var str = "";
                $("input[name = checkitem]:CheckBox").each(function () {
                    var ischeck = $(this).attr("checked");
                    var id = $(this).attr("value");
                    if (ischeck != undefined && (ischeck == "true" || ischeck == "checked")) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: '/tool/submit_ajax.ashx?action=LoadPriceList&t=' + Math.random(), //目标地址
                            data: { ptid: id },
                            async: false,
                            success: function (json) {
                                var pricelist = json.QingDanPriceList;
                                if (pricelist != undefined) {
                                    $(pricelist).each(function (i, n) {
                                        if (n.IsAdvantage != undefined && parseInt(n.IsAdvantage) == 1) {
                                            str += "<div class='priceitem'><input type='checkbox' value='" + n.PLId + "' checked='true' />" + n.brandprcie + "</div>";
                                        } else {
                                            str += "<div class='priceitem'><input type='checkbox' value='" + n.PLId + "' />" + n.brandprcie + "</div>";
                                        }
                                    });
                                }

                            }
                        });
                    }
                });
                $(".pricelist").html(str);
            });
        }
    });
}



////楼层左侧导航时间
//$(function () {
//    // @ 给窗口加滚动条事件
//    $(window).scroll(function () {
//        // 获得窗口滚动上去的距离
//        var ling = $(document).scrollTop();
//        var len = $('#box ul li').length;

//        //        // 在标题栏显示滚动的距离
//        //        document.title = ling;
//        // 如果滚动距离大于1534的时候让滚动框出来
//        if (ling > 216) {
//            $('#box').show();
//        }
//        if (216 < ling && ling < 1300) {
//            // 让第一层的数字隐藏，文字显示，让其他兄弟元素的li数字显示，文字隐藏
//            $('#box ul li').eq(0).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(0).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 1800) {
//            $('#box ul li').eq(1).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(1).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 2300) {
//            $('#box ul li').eq(2).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(2).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 2800) {
//            $('#box ul li').eq(3).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(3).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 3300) {
//            $('#box ul li').eq(4).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(4).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 3800) {
//            $('#box ul li').eq(5).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(5).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 4300) {
//            $('#box ul li').eq(6).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(6).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 4800) {
//            $('#box ul li').eq(7).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(7).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 5300) {
//            $('#box ul li').eq(8).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(8).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 5800) {
//            $('#box ul li').eq(9).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(9).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        } else if (ling < 6300) {
//            $('#box ul li').eq(10).find('.num').hide().siblings('.word').css({ 'display': 'block', 'color': '#c81623' });
//            $('#box ul li').eq(10).siblings('li').find('.num').css('display', 'block').siblings('.word').hide();
//        }
//        if (ling > 216 + (len + 1) * 500 || ling < 216) {
//            // $('#box').css('display','none');  // @ 这一句和下一句效果一样。
//            $('#box').hide();
//        }

//    })

//})

$(function () {
    $('#box ul li').hover(function () {
        $(this).find('.num').hide().siblings('.word').css({ 'display': 'block', 'background': '#CB1C39', 'color': 'white' });
    }, function () {

        $(this).find('.num').css({ 'display': 'block', 'color': '#666' }).siblings('.word').hide().css({ 'display': 'none', 'background': 'url(/images/indexnew/indexnew.png) 0 0 no-repeat', 'color': '' });
    })
})


//楼层左侧导航时间
//$(function () {

//    // @ 给窗口加滚动条事件
//    $(window).scroll(function () {
//        var indexstate = $("#indexstate").val();
//        if (indexstate !== "1") {
//            // 获得窗口滚动上去的距离
//            var ling = $(document).scrollTop();
//            var len = $('#leftnav ul li').length;

//            //        // 在标题栏显示滚动的距离
//            //        document.title = ling;
//            // 如果滚动距离大于1534的时候让滚动框出来
//            if (ling > 216) {
//                $('#leftnav').show();
//                $(".smallmiao_show").css("top","43px");
//            }
//            if (216 < ling && ling < 1300) {
//                // 让第一层的数字隐藏，文字显示，让其他兄弟元素的li数字显示，文字隐藏
//                $('#leftnav ul li').eq(0).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(0).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 1800) {
//                $('#leftnav ul li').eq(1).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(1).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 2300) {
//                $('#leftnav ul li').eq(2).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(2).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 2800) {
//                $('#leftnav ul li').eq(3).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(3).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 3300) {
//                $('#leftnav ul li').eq(4).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(4).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 3800) {
//                $('#leftnav ul li').eq(5).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(5).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 4300) {
//                $('#leftnav ul li').eq(6).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(6).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 4800) {
//                $('#leftnav ul li').eq(7).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(7).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 5300) {
//                $('#leftnav ul li').eq(8).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(8).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 5800) {
//                $('#leftnav ul li').eq(9).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(9).siblings('li').removeClass("leftnav_item_on");
//            } else if (ling < 6300) {
//                $('#leftnav ul li').eq(10).addClass("leftnav_item_on");
//                $('#leftnav ul li').eq(10).siblings('li').removeClass("leftnav_item_on");
//            }
//            if (ling > 216 + (len + 1) * 500 || ling < 216) {
//                // $('#box').css('display','none');  // @ 这一句和下一句效果一样。
//                $('#leftnav').hide();
//                $(".smallmiao_show").css("top", "530px");
//            }
//        }

//    })

//})


///**鼠标滑动超过一定距离展示浮动的搜索框*/
//$(function () {
//    // @ 给窗口加滚动条事件
//    $(window).scroll(function () {
//        // 获得窗口滚动上去的距离
//        var ling = $(document).scrollTop();
//        $(".total_container_search").find("#searchw-2013").remove();
//        $("#headerw-2013").children("#searchw-2013").remove();
//        if (ling > 300) {
//            $(".total_container").css("display","block");
//            $(".as-shelter").addClass("show");
//            $(".total_container").addClass("show");
//            var str = "<div id=\"searchw-2013\"><div class=\"i-search ld\"><ul id=\"shelper\" class=\"hide\"></ul><div class=\"form\"><input type=\"text\" style=\"color: rgb(153, 153, 153);\" class=\"text\" accesskey=\"s\" id=\"key\" autocomplete=\"off\" oninput=\"beginSearch()\" onclick=\"beginSearch()\"  onkeypress=\"if (event.keyCode == 13) {Labsearch('key');return false;}\"  onpropertychange=\"beginSearch()\" placeholder=\"产品 / 品牌 / 型号 / 实验室\"><input type=\"button\" value=\"搜索\" class=\"button\" onclick=\"Labsearch('key');return false;\"></div><div role=\"listbox\" class=\"ac-renderer\" aria-expanded=\"false\" id=\"divMsg\" style=\"display:none;\"></div></div><div id=\"hotwords\"><a href=\"/ProductC2-232-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">离心机</a><a href=\"/ProductC2-15-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">灭菌器</a><a href=\"/scene/SceneImage-11.html\" target=\"_blank\">食品检测实验室</a><a href=\"/scene/SceneImage-12.html\" target=\"_blank\">食品微生物实验室</a><a href=\"/BrandList-75.html\" target=\"_blank\">松下</a><a href=\"/BrandList-69.html\" target=\"_blank\">赛多利斯</a></div></div>";
//            $(".total_container_search").prepend(str);
//            $("#headerw-2013").children("#searchw-2013").remove();
//        } else {
//            var str = "<div id=\"searchw-2013\"><div class=\"i-search ld\"><ul id=\"shelper\" class=\"hide\"></ul><div class=\"form\"><input type=\"text\" style=\"color: rgb(153, 153, 153);\" class=\"text\" accesskey=\"s\" id=\"key\" autocomplete=\"off\" oninput=\"beginSearch()\" onclick=\"beginSearch()\"  onkeypress=\"if (event.keyCode == 13) {Labsearch('key');return false;}\"  onpropertychange=\"beginSearch()\" placeholder=\"产品 / 品牌 / 型号 / 实验室\"><input type=\"button\" value=\"搜索\" class=\"button\" onclick=\"Labsearch('key');return false;\"></div><div role=\"listbox\" class=\"ac-renderer\" aria-expanded=\"false\" id=\"divMsg\" style=\"display:none;\"></div></div><div id=\"hotwords\"><a href=\"/ProductC2-232-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">离心机</a><a href=\"/ProductC2-15-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">灭菌器</a><a href=\"/scene/SceneImage-11.html\" target=\"_blank\">食品检测实验室</a><a href=\"/scene/SceneImage-12.html\" target=\"_blank\">食品微生物实验室</a><a href=\"/BrandList-75.html\" target=\"_blank\">松下</a><a href=\"/BrandList-69.html\" target=\"_blank\">赛多利斯</a></div></div>";
//            $(".as-shelter").removeClass("show");
//            $(".total_container").removeClass("show");
//            $(".total_container_search").prepend("");
//            $("#headerw-2013").children("#logow-2013").after(str);
//            $(".total_container").css("display", "none");
//        }
//    });

//});
/*清除cookie和跳转到实验室首页*/
function ondefaultPage() {
    document.getElementById("LinkButton1").click();
}

