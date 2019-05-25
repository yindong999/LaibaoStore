function LoadRightBrands(idArry, obj, yijinum) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=getTopEightBrands', //目标地址
        data: { os: 14, ptIdArry: idArry, yijinum: yijinum },
        async: false,
        success: function (html) {
            $(obj).children(".layer_1").find("#divBrandsID").html(html);
        }
    });
}

//楼层左侧导航时间
$(function () {

    // @ 给窗口加滚动条事件
    $(window).scroll(function () {
        var indexstate = $("#indexstate").val();
        if (indexstate !== "1") {
            // 获得窗口滚动上去的距离
            var ling = $(document).scrollTop();
            var len = $('#leftnav ul li').length;
            var flooryoushipinlei = $("#floor-youshipinlei").offset().top;
            var floorbrands = $("#floor-brands").offset().top;
            var floor1 = $("#floor-1").offset().top;
            var floor2 = $("#floor-2").offset().top;
            var floor3 = $("#floor-3").offset().top;
            var floor4 = $("#floor-4").offset().top;
            var floor5 = $("#floor-5").offset().top; //发现好货
            var guanggaolast = $(".guanggaolast").offset().top; //楼层下面广告
            var footnav = $(".foot-nav").offset().top; //底部

            //        // 在标题栏显示滚动的距离
            //        document.title = ling;
            // 如果滚动距离大于1534的时候让滚动框出来
            if (ling > 200) {
                $('#leftnav').show();
                $(".smallmiao_show").css("top", "43px");
            }
            if (200 < ling && ling <floorbrands ) {//优势品类
                // 让第一层的数字隐藏，文字显示，让其他兄弟元素的li数字显示，文字隐藏
                $('#leftnav ul li').eq(0).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(0).siblings('li').removeClass("leftnav_item_on");
            } else if (ling > floorbrands&&ling < floor1) {//精选品牌
                $('#leftnav ul li').eq(1).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(1).siblings('li').removeClass("leftnav_item_on");
            } else if (ling > floor1 && ling < floor2) {//1楼
                $('#leftnav ul li').eq(2).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(2).siblings('li').removeClass("leftnav_item_on");
            } else if (ling > floor2 && ling < floor3) {//2楼
                $('#leftnav ul li').eq(3).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(3).siblings('li').removeClass("leftnav_item_on");
            } else if (ling > floor3 && ling < floor4) {//3楼
                $('#leftnav ul li').eq(4).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(4).siblings('li').removeClass("leftnav_item_on");
            } else if (ling > floor4 && ling < guanggaolast) {//4楼
                $('#leftnav ul li').eq(5).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(5).siblings('li').removeClass("leftnav_item_on");

            } else if (ling > guanggaolast && ling < footnav) {//5楼
                $('#leftnav ul li').eq(6).addClass("leftnav_item_on");
                $('#leftnav ul li').eq(6).siblings('li').removeClass("leftnav_item_on");
            } 
            if (ling > 216 + (len + 1) * 500 || ling < 216) {
                // $('#box').css('display','none');  // @ 这一句和下一句效果一样。
                $('#leftnav').hide();
                $(".smallmiao_show").css("top", "530px");
            }
        }

    })

});
$(function () {
    var userid = $("#hidUserId").val();
    // @ 给窗口加滚动条事件
    $(window).scroll(function () {
        // 获得窗口滚动上去的距离
        var ling = $(document).scrollTop();
        $(".total_container_search").find("#searchw-2013").remove();
        $("#headerw-2013").children("#searchw-2013").remove();
        if (ling > 300) {
            $(".total_container").css("display", "block");
            $(".total_container").show();
            $(".as-shelter").addClass("show");
            $(".total_container").addClass("show");
            var str = "<div id=\"searchw-2013\"><div class=\"i-search ld\">";
            str += "<ul id=\"shelper\" class=\"hide\"></ul>";
            str += "<div class=\"form\"><input type=\"text\" style=\"color: rgb(153, 153, 153);\" class=\"text\" accesskey=\"s\" id=\"key\" autocomplete=\"off\" oninput=\"beginSearch()\" onclick=\"beginSearch()\"  onkeypress=\"if (event.keyCode == 13) {Labsearch('key');return false;}\"  onpropertychange=\"beginSearch()\" placeholder=\"产品 / 品牌 / 型号 / 实验室\"> <input type=\"button\" class=\"fangdajing\" value=\"    \" class=\"button\" onclick=\"Labsearch('key');return false;\"><input type=\"button\" value=\"搜索\" class=\"button\" onclick=\"Labsearch('key');return false;\"></div><div role=\"listbox\" class=\"ac-renderer\" aria-expanded=\"false\" id=\"divMsg\" style=\"display:none;\"></div></div><div id=\"hotwords\"><a href=\"/ProductC2-232-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">离心机</a><a href=\"/ProductC2-15-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">灭菌器</a><a href=\"/scene/SceneImage-11.html\" target=\"_blank\">食品检测实验室</a><a href=\"/scene/SceneImage-12.html\" target=\"_blank\">食品微生物实验室</a><a href=\"/BrandList-75.html\" target=\"_blank\">松下</a><a href=\"/BrandList-69.html\" target=\"_blank\">赛多利斯</a></div>";
            str += "<div class=\"batchSearch\" id=\"batchSearch\" runat=\"server\" style=\"right:-95px;top:5px;\"><a href=\"/search/BatchSearch.aspx\" class=\"batchSearcha\" target=\"_blank\">批量搜索</a></div>";
            str += "</div>";
            $(".total_container_search").prepend(str);
            $(".total_container_search").show();
            $("#headerw-2013").children("#searchw-2013").remove();
            if (userid != "") {
                $(".batchSearch").show();
                $("#myshopcart").hide();
            } else {

                $(".batchSearch").hide();
                $("#myshopcart").show();
            }
        } else {
            var str = "<div id=\"searchw-2013\"><div class=\"i-search ld\"><ul id=\"shelper\" class=\"hide\"></ul><div class=\"form\"><input type=\"text\" style=\"color: rgb(153, 153, 153);\" class=\"text\" accesskey=\"s\" id=\"key\" autocomplete=\"off\" oninput=\"beginSearch()\" onclick=\"beginSearch()\"  onkeypress=\"if (event.keyCode == 13) {Labsearch('key');return false;}\"  onpropertychange=\"beginSearch()\" placeholder=\"产品 / 品牌 / 型号 / 实验室\"><input type=\"button\" class=\"fangdajing\" value=\"    \" class=\"button\" onclick=\"Labsearch('key');return false;\"><input type=\"button\" value=\"搜索\" class=\"button\" onclick=\"Labsearch('key');return false;\"></div><div role=\"listbox\" class=\"ac-renderer\" aria-expanded=\"false\" id=\"divMsg\" style=\"display:none;\"></div></div><div id=\"hotwords\"><a href=\"/ProductC2-232-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">离心机</a><a href=\"/ProductC2-15-0-0-0-0-0-0-0-0-0-0-0-1-sort_totalsales_desc.html\" target=\"_blank\">灭菌器</a><a href=\"/scene/SceneImage-11.html\" target=\"_blank\">食品检测实验室</a><a href=\"/scene/SceneImage-12.html\" target=\"_blank\">食品微生物实验室</a><a href=\"/BrandList-75.html\" target=\"_blank\">松下</a><a href=\"/BrandList-69.html\" target=\"_blank\">赛多利斯</a></div><div class=\"batchSearch\" id=\"batchSearch\" runat=\"server\" style=\"right:252px;top:4px;\"><a href=\"/search/BatchSearch.aspx\" class=\"batchSearcha\" target=\"_blank\">批量搜索</a></div></div>";
            $(".as-shelter").removeClass("show");
            $(".total_container").removeClass("show");
            $(".total_container_search").prepend("");
            $("#headerw-2013").children("#logow-2013").after(str);
            $(".total_container").css("display", "none");
            if (userid != "") {
               
                $("#myshopcart").hide();
            } else {
              
                $("#myshopcart").show();
            }
        }
    });



});
//动态加载场景下的供应信息
function LoadSceneProduct(id, id1, obj) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "html", //数据格式:html
        url: '/tool/submit_ajax.ashx?action=jiazaiSceneProduct&t=' + Math.random(), //目标地址
        data: { os: 14, SSId: id, lfid: id1 },
        async: false,
        success: function (html) {
            $("#floor-" + id1).children("#sceneproduct").html(html);
        }
    });
}

