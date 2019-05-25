///购物车的操作
//添加到购物车中
function addToCart(id, num, type) {
    var url = "/tool/submit_ajax.ashx?action=addToCart&id=" + id + "&num=" + num + "&t=" + (new Date()).valueOf();
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        success: function (data, textStatus) {
            if (data.status == 1) {
                alert("成功加入购物车！");
                $(".p_img").html(data.pimg);
                $(".p_name").children("a").html(data.pmodel);
                $(".txt1").html(data.mainparam);
                $(".txt2").html(data.goodcount);
            }

        }
    });
}
//获取购物中产品信息
function ShopingCart(url) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        success: function (json) {
            if (json == "0") {
                $("#cart").hide();
                $("#empty").show();
            }
            else {
                var productData = json.Carts;
                var count = 0; //总份数
                var money = 0; //总金额
                var sb = "";
                $.each(productData, function (i, n) {

                    var id = n.id;

                    var name = n.name;
                    var num = n.num;
                    var price = n.price == "" ? "" : parseFloat(n.price);
                    var img = n.img;
                    count += parseInt(num);
                    money += n.price == "" ? 0 : parseFloat(num * price);
                    sb += "<tr bgcolor=\"#FCFDED\"  class=\"bg\" id=\"tr_a\">		";
                    sb = sb + "<td width=\"23\" ><input id=\"yu_981285\" name=\"choose\" type=\"checkbox\" value=\"" + id + "\" class=\"check\"/></td>";
                    sb = sb + "<td width=\"118\"><a target=\"_blank\" href=\"/ProductDetail-" + id + ".html\" clstag=\"click|keycount|follow|productimg\"><img width=\"100\" height=\"100\" src=\"" + img + "\"  alt='" + name + "' data-img=\"" + id + "\"/></a></td>";
                    sb = sb + "<td class=\"tb01\"><div class=\"p-name\"><a href=\"/ProductDetail-" + id + ".html\" target=\"_blank\" clstag=\"click|count|follow|productname\" title='" + name + "'>" + name + "</a></div></td>";
                    sb = sb + "<td align=\"center\" ><div class=\"p-price\" id=\"price_981285\">" + (price == "" ? "询价" : returnFloat(price)) + "</div></td>	";
                    sb = sb + "<td align=\"center\"><div class=\"p-price\" id=\"price_981285\">" + (price == "" ? "询价" : (returnFloat(num * parseFloat(price)))) + "</div><div id=\"promotion_981285\" class=\"p-prom\"></div></td>		 ";
                    sb = sb + "<td><div class=\"p-state\"><div id=\"f_981285\" class=\"ac\"><input type=\"button\" name='btnCut' style=\"text-align:center;margin-right:5px;\" value=\"-\" onclick=' subnum(" + id + "," + num + ",this)' /><input type=\"text\" name=\"txtNum\" onblur='changeNum(" + id + ",this)' style=\"width:30px;text-align:center\" size='1' maxlength='2' value=\"" + num + "\" onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\"/><input type=\"button\" name='btnAdd' style=\"margin-left:5px;text-align:center\" value=\"+\" onclick='addnum(" + id + "," + num + ",this)' /></div></td>";
                    sb = sb + "<td align=\"center\"><ul class=\"operating\"><li><a onclick=\"deletepro(" + id + ");\" href=\"javascript:void(0);\" clstag=\"click|keycount|follow|cancel\">删除</a></li></ul></td>";
                    sb = sb + "</tr>";
                });
                //**********************************************************************************
                $("#follow_table").html(sb); //显示购物车里面的商品信息
                $("#pcount").html("总共" + count + "件商品");
                $("#pprice").html("&yen;" + returnFloat(money));
                $("#zongjie").html("&yen;" + returnFloat(money));
            }
        }
    });
}
//修改数量时候
function changeNum(id, obj) {
    var part = /^[1-9][0-9]?$/;
    if (!part.test(obj.value)) {
        alert("数量必须1-99之间！");
        return;
    }
    ShopingCart("/tool/submit_ajax.ashx?t=" + (new Date()).valueOf() + "&action=changeNum&id=" + id + "&num=" + obj.value);
}
//删除购物车信息
function deletepro(id) {
    var url = "Ajax.aspx?t=" + new Date() + "&os=9&id=" + id;
    ShopingCart(url);
}
//添加数量
function addnum(id, num, obj) {
    if (parseInt(num) < 99) {
        num++;
        ShopingCart("Ajax.aspx?t=" + (new Date()).valueOf() + "&os=8&id=" + id + "&num=" + num);
    }
    else {
        obj.disabled = "disabled";
    }
}
//减少数量
function subnum(id, num, obj) {
    if (parseInt(num) > 1) {
        num--;
        ShopingCart("Ajax.aspx?t=" + (new Date()).valueOf() + "&os=8&id=" + id + "&num=" + num);
    }
    else {
        obj.disabled = "disabled";
    }
}
//删除选择的选项
function AllDelete() {
    var ch = document.getElementsByName("choose");
    var str = "";
    var count = 0;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].checked) {
            str += ch[i].value + ",";
            count++;
        }
    }
    str = str.substring(0, str.length - 1);
    if (count > 0) {
        if (confirm("确定从购物车中删除所有选中商品？")) {
            var url = "/tool/submit_ajax.ashx?t=" + new Date() + "&action=AllDelete&id=" + str;
            ShopingCart(url);
        }
    }
    else {
        alert("请至少选中一件商品！");
    }
}
//提交数据到数据库中
function submitdata(id, num, account, type) {
    var url = "/tool/submit_ajax.ashx?action=submitdata&id=" + id + "&num=" + num + "&Account=" + account + "&t=" + (new Date()).valueOf();
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        success: function (json) {
            if (json == "0") {
                alert("很遗憾操作失败，请重新操作！");
            }
            else {
                if (type == "1") {
                    window.location.href = "/User/AddToCart.aspx?pid=" + id;
                }
                else if (type == "2") {
                    alert("恭喜你添加成功！");
                }
                else if (type == "3") {
                    window.open("/User/AddToCart.aspx?pid=" + id);
                }
            }
        }
    });
}
//获取购物中产品信息
function CartList(url) {
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        success: function (json) {
            if (json == "0") {
                $("#cart").hide();
                $("#empty").show();
            }
            else if (json == "1") {
                tanchuceng();
            }
            else {
                var productData = json.carts;
                var count = 0; //总份数
                var money = 0; //总金额
                var sb = "";
                $.each(productData, function (i, n) {
                    var id = n.PId;
                    var name = n.PModel;
                    var num = n.PNum;
                    var price = n.PPrice == "" ? "" : parseFloat(n.PPrice);
                    var img = n.PImg
                    count += parseInt(num);
                    money += price == "" ? 0 : parseFloat(num * price);
                    sb += "<tr bgcolor=\"#FCFDED\"  class=\"bg\" id=\"tr_a\">		";
                    sb = sb + "<td width=\"23\" ><input id=\"yu_981285\" name=\"choose\" type=\"checkbox\" value=\"" + id + "\" class=\"check\"/></td>";
                    sb = sb + "<td width=\"118\"><a target=\"_blank\" href=\"/ProductDetail-" + id + ".html\" clstag=\"click|keycount|follow|productimg\"><img width=\"100\" height=\"100\" src=\"" + img + "\"  alt='" + name + "' data-img=\"" + id + "\"/></a></td>";
                    sb = sb + "<td class=\"tb01\"><div class=\"p-name\"><a href=\"/ProductDetail-" + id + ".html\" target=\"_blank\" clstag=\"click|count|follow|productname\" title='" + name + "'>" + name + "</a></div></td>";
                    sb = sb + "<td align=\"center\"><div class=\"p-price\" id=\"price_981285\">" + (price == "" ? "询价" : returnFloat(price)) + "</div></td>	";
                    sb = sb + "<td align=\"center\"><div class=\"p-price\" id=\"price_981285\">" + (price == "" ? "询价" : (returnFloat(num * price))) + "</div><div id=\"promotion_981285\" class=\"p-prom\"></div></td>		 ";
                    sb = sb + "<td><div class=\"p-state\"><div id=\"f_981285\" class=\"ac\"><input type=\"button\" name='btnCut' style=\"text-align:center;margin-right:5px;\" value=\"-\" onclick='jiannum(" + id + "," + num + ",this)' /><input type=\"text\" name=\"txtNum\" onblur='updateNum(" + id + ",this)' style=\"width:30px;text-align:center\" size='1' maxlength='2' value=\"" + num + "\" onkeyup=\"this.value=this.value.replace(/\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\D/g,'')\"/><input type=\"button\" name='btnAdd' style=\"margin-left:5px;text-align:center\" value=\"+\" onclick='jianum(" + id + "," + num + ",this)' /></div></td>";
                    sb = sb + "<td align=\"center\"><ul class=\"operating\"><li><a onclick=\"shanpro(" + id + ");\" href=\"javascript:void(0);\" clstag=\"click|keycount|follow|cancel\">删除</a></li></ul></td>";
                    sb = sb + "</tr>";
                });
                //**********************************************************************************
                $("#follow_table").html(sb); //显示购物车里面的商品信息
                $("#pcount").html("总共" + count + "件商品");
                $("#pprice").html("&yen;" + returnFloat(money));
                $("#zongjie").html("&yen;" + returnFloat(money));
            }
        }
    });
}
/////////////购物车操作
//修改数量时候
function updateNum(id, obj) {
    var part = /^[1-9][0-9]?$/;
    if (!part.test(obj.value)) {
        alert("数量必须1-99之间！");
        return;
    }
    CartList("/tool/submit_ajax.ashx?t=" + (new Date()).valueOf() + "&action=jiannum&id=" + id + "&Account=" + decodeURI(getCookie("Account")) + "&num=" + obj.value);
}
//删除购物车信息
function shanpro(id) {
    var url = "Ajax.aspx?t=" + new Date() + "&os=13&id=" + id + "&Account=" + decodeURI(getCookie("Account"));
    CartList(url);
}
//添加数量
function jianum(id, num, obj) {
    if (parseInt(num) < 99) {
        num++;
        CartList("/tool/submit_ajax.ashx?t=" + (new Date()).valueOf() + "&action=jiannum&id=" + id + "&Account=" + decodeURI(getCookie("Account")) + "&num=" + num);
    }
    else {
        obj.disabled = "disabled";
    }
}
//减少数量
function jiannum(id, num, obj) {
    if (parseInt(num) > 1) {
        num--;
        CartList("/tool/submit_ajax.ashx?t=" + (new Date()).valueOf() + "&action=jiannum&id=" + id + "&Account=" + decodeURI(getCookie("Account")) + "&num=" + num);
    }
    else {
        obj.disabled = "disabled";
    }
}
//删除选择的选项
function AlldataDelete() {
    var ch = document.getElementsByName("choose");
    var str = "";
    var count = 0;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].checked) {
            str += ch[i].value + ",";
            count++;
        }
    }
    str = str.substring(0, str.length - 1);
    if (count > 0) {
        if (confirm("确定从购物车中删除所有选中商品？")) {
            var url = "/tool/submit_ajax.ashx?t=" + new Date() + "&action=AlldataDelete&id=" + decodeURI(str) + "&Account=" + decodeURI(getCookie("Account"));
            CartList(url);
        }
    }
    else {
        alert("请至少选中一件商品！");
    }
}
//加载弹出的购物车内容
function tanchucart(obj) {
    if (getCookie("Account") != null && getCookie("Account") != "null" && getCookie("Account") != "" && getCookie("Account") != undefined) {
        var account = getCookie("Account");
        tanchucartlist(account, obj);
    }
    else {
        tanchucartlist("Anonymous", obj);
    }
}
//读取购物车中内容
function tanchucartlist(account, obj) {
    var url = "/tool/submit_ajax.ashx?action=tanchucartlistN&UserName=" + decodeURI(account) + "&t=" + Math.random();
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: url, //目标地址
        data: {},
        async: false,
        cache: false,
        success: function (json) {
            if (json == "0") {
                $(obj).html("<div class=\"prompt\"><div class=\"nogoods\"><b></b>购物车中还没有商品，赶紧选购吧！</div></div>");
                $("#cartnum").html(0);
            }
            else if (json == "1") {
                dandiandl();
            }
            else {
                var productData = json.Carts;
                var count = 0; //总份数
                var money = 0; //总金额
                var sb = "<div id=\"settleup-content\"><div class=\"smt\"><h4 class=\"fl\">最新加入的商品</h4></div><div class=\"smc\"><ul id=\"mcart-sigle\"></ul><ul id=\"mcart-gift\"></ul><ul id=\"mcart-mj\">";
                $.each(productData, function (i, n) {
                    var id = n.PId;
                    var name = n.PModel;
                    var num = n.PNum;
                    var price = n.PPrice == "" ? "" : parseFloat(n.PPrice);
                    var img = n.PImg
                    count += parseInt(num);
                    money += price == "" ? 0 : parseFloat(num * price);
                    sb += "<li><div class=\"p-img fl\"><a href=\"/ProductDetail-" + id + ".html\" target=\"_blank\"><img src=\"" + img + "\" width=\"50\" height=\"50\" alt=\"" + name + "\"></a></div><div class=\"p-name fl\"><span></span><a href=\"/ProductDetail-" + id + ".html\" title=\"" + name + "\" target=\"_blank\">" + name + "</a></div><div class=\"p-detail fr ar\"><span class=\"p-price\"><strong>￥" + (price == "" ? "询价" : returnFloat(price)) + "</strong>×" + num + "</span><br><a id=\"alertdelete" + id + "\"  href=\"#\"  class=\"delete\" onclick=\"tanchudelete(" + id + "," + account + ");\">删除</a></div></li>";
                });
                //**********************************************************************************
                sb += "</ul></div><div class=\"smb ar\">共<b>" + count + "</b>件商品　共计<strong>￥" + money + "</strong><br><a href=\"/User/ShopCart.aspx\" title=\"去购物车结算\" id=\"btn-payforgoods\">去购物车结算</a></div></div>";
                $("#cartnum").html(count);
                $(obj).html(sb);
            }
        }
    });
}

//弹出删除功能实现
function tanchudelete(id, account) {
    $.ajax({
        type: "post",
        url: "/tool/submit_ajax.ashx?action=cart_goods_delete&t=" + Math.random(),
        data: { "Goodsid": id },
        dataType: "json",
        async: false,
        cache: false,
        success: function (data, textStatus) {
            if (data.status == 1) {
                tanchucartlist(account, $(".dropdown.hover").children(".dropdown_layer"));
                $(".dropdown").unbind('mouseenter').unbind('mouseleave');
                $(".dropdown").children(".dropdown_layer").hover(function () {
                    $(".dropdown").children(".dropdown_layer").show();
                    $(".dropdown").addClass("hover");
                }, function () {
                    $(".dropdown").children(".dropdown_layer").hide();
                    $(".dropdown").removeClass("hover");
                });
                $(".dropdown").bind("mouseenter", function () {
                    $(".dropdown").children(".dropdown_layer").show();
                    $(".dropdown").addClass("hover");
                })
            } else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
    return false;
}
//我的来宝
function wolaibao(obj) {
    var sb = "<div class=\"prompt\">";
    var stryh = "";
    var strview = "";
    if (getCookie("Account") != null && getCookie("Account") != "null" && getCookie("Account") != "" && getCookie("Account") != undefined) {
        var account = getCookie("Account");
        stryh += "<span class=\"fl\"><strong>" + account + "</strong></span><span class=\"fr\"><a href=\"/user/UsersGoods.aspx\">去我的来宝首页&nbsp;&gt;</a></span>";
        var url = "/User/Ajax.aspx?t=" + new Date() + "&os=18&UserName=" + decodeURI(account);
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: url, //目标地址
            data: {},
            async: false,
            success: function (json) {
                if (json != "0") {
                    var productData = json.ViewRecord;
                    strview += "<ul class=\"lh\">";
                    $.each(productData, function (i, n) {
                        var id = n.PId;
                        var name = n.PModel;
                        var img = n.PImg
                        strview += "<li><a href=\"/ProductDetail-" + id + ".html\" target=\"_blank\" title=\"" + name + "\"><img src=\"" + img + "\" width=\"50\" height=\"50\" alt=\"" + name + "\"></a></li>"

                    });
                    //**********************************************************************************
                    strview += "</ul>";
                }
            }
        });

    }
    else {
        stryh += "<span class=\"fl\">您好，请<a href=\"javascript:login()\" clstag=\"homepage|keycount|home2013|04a\">登录</a></span><span class=\"fr\"></span>";
        strview += "<div class=\"ac\">「暂无数据」</div>";
    }
    sb += stryh;
    sb += "</div><div id=\"jduc-orderlist\"></div><div class=\"uclist\"><ul class=\"fore1 fl\"><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04b\" href=\"/user/UsersGoods.aspx\">我的订单<span id=\"num-unfinishedorder\"><font style=\"color:#ccc\"></font></span></a></li><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04c\" href=\"/user/UserCount.aspx\">积分卷兑换<span id=\"num-consultation\"><font style=\"color:#ccc\"></font></span></a></li><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04d\" href=\"/user/UserListgifts.aspx\">积分换礼<span id=\"num-reduction\"><font style=\"color:#c00\"></font></span></a></li><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|shouhou\" href=\"/user/UserCount.aspx\">我的积分<span id=\"num-jifen\"><font style=\"color:#ccc\"></font></span></a></li></ul><ul class=\"fore2 fl\"><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04i\" href=\"/user/UserPayAttention.aspx\">我的关注&nbsp;&gt;</a></li><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04g\" href=\"/user/UserAddress.aspx\">我的地址&nbsp;&gt;</a></li><li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|licai\" href=\"/user/UserInfo.aspx\">我的资料&nbsp;&gt;</a></li></ul></div><div class=\"viewlist\"><div class=\"smt\" clstag=\"homepage|keycount|home2013|04k\"><h4>最近浏览的商品：</h4><div style=\"float:right;padding-right:9px;\"><a style=\"border:0;color:#005EA7\" href=\"/user/UserHistory.aspx\" target=\"_blank\">查看浏览历史&nbsp;&gt;</a></div></div><div class=\"smc\" id=\"jduc-viewlist\" clstag=\"homepage|keycount|home2013|04j\">";
    sb += strview;
    sb += "</div></div";
    $(obj).html(sb);
}