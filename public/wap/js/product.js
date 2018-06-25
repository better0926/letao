$(function () {
  var productId = getSearchTxt().productId;
  //console.log(productId);
  //获取到上商品地址栏的id
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    success: function (info) {
      //console.log(info);
      //渲染数据
      $(".mui-scroll").html(template("proTpl", info));

      //重新初始化轮播图的结构,动态生成的结构，mui框架中使用需要重新初始化轮播
      mui(".mui-slider").slider({
        interval: 3000
      });

      // 选择尺码添加当前类状态
      $(".proSize span").on("click", function () {
        $(this).addClass("now").siblings().removeClass("now");
      });

      //模板渲染。动态生成结果后要重新初始化num选择购买数量的input
      mui(".mui-numbox").numbox();
    }
  });

  //点击购买
  $(".go_cart").on("click", function () {

    //点击加入购物车 校验是否选择尺码
    var size = $(".proSize span.now").text();
    var num = $("input[type=number]").val();

    if (!size) {
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      success: function (info) {
        console.log(info);
        // js方法实现尺码显示
        /* 
        var temp = info.size.split("-");//30 50
        var tempArray = [];
        for(var i = +temp[0]; i <= temp[1]; i++) {
          tempArray.push(i);
        }
        info.sizeArray = tempArray;
       */

        //返回true 直接跳转到购物车页面
        if (info.success) {
          mui.confirm("加入购物车成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if (e.index === 0) {
              window.location.href = "cart.html"
            }
          });
        }
        //返回error跳转到登录页面
        if (info.error === 400) {
          window.location.href = "login.html?back=" + location.href;
        }

      }
    })
  })

});