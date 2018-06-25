$(function () {
  //下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        callback: function(){
          $.get("/cart/queryCart",function(info){
            console.log(info);
            // 返回一个数组
           setTimeout(function(){
            //如果返回error说明用户没有登录 跳转到登录页
            if(info.error){
              window.location.href = "login.html?back="+location.href;//登录后需要回跳到原来的页面
            }

             $(".OA_task_2").html(template("cartTpl", { rows: info }));
             //结束下拉刷新endPulldownToRefresh
             mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
           },1000);
            
          }); 
        }
      }
    }
  });

  //删除功能 注册委托事件
  $(".OA_task_2").on("tap",".btn_delete",function(){
    var id = $(this).data("id");
    //显示确认删除的提示框
    mui.confirm("确定要删除吗？","删除提醒",["是","否"],function(e){
      console.log(e.index);
      if(e.index === 0){
        //console.log(id);
        $.get("/cart/deleteCart", { id: id }, function (info) {
          console.log(info);
          if(info.success){
            //成功时，重新执行一次下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
          }
        });
      };
    });
  }); 

  //修改功能
  //1. 给修改按钮注册点击事件
  //2. 获取到id
  //3. 根据id获取到原来的信息
  //4. 把原来的信息显示出来
  //5. 用户进行修改
  //6. 发送ajax请求，把数据修改
  //7. 重新下拉刷新一次即可。
  $(".OA_task_2").on("tap",".btn_edit",function(){
    //获取btn_edit 上存储的信息，通过data自定义属性存储
    var data = this.dataset;//dataset是dom方法
    //将数据回显到修改的模态框中
    var html = template("editTpl",data);
    //需要把html字符串中所有的\n给干掉
    html = html.replace(/\n/g, "");
    //console.log(html);
    
    mui.confirm(html, "商品编辑", ["确定", "取消"],function(e){
      console.log(e);
      if(e.index === 0){
        //拿到请求需要的参数
        var id = data.id;
        var size = $(".proSize span.now").text();
        var num = $("input[type='number']").val();
        console.log(num);
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: id,
            num: num,
            size: size
          },
          success: function(info){
            console.log(info);
            //成功后，再执行一次下拉刷新
            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
          }
        });
      }
    });

    // 手动让购买数量可以选择
    mui(".mui-numbox").numbox();

    //修改编辑的尺码
    $(".proSize span").on("click",function(){
      $(this).addClass("now").siblings().removeClass("now");
    });
  });


  //计算金额
  $(".OA_task_2").on("change",".ckbox",function(){
    var total = 0;//存储金额
    $(".ckbox:checked").each(function(e){
      total += $(this).data("num") * $(this).data("price");
    });
    $(".count_momey").text(total.toFixed(2));    
  })
});