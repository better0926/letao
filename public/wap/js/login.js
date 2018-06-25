$(function(){
  $(".login").on("click",function(){
    //校验 用户名和密码框是否为空
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();
    
    if (!username ){
      mui.toast("请输入用户名");
      return;
    }
    if(!password){
      mui.toast("请输入密码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function(info){
        console.log(info);
        if(info.success){

          //如果是购物车页面或者商品详情页面跳转到登录页的，成功之后，需要回跳
          //判断是否有back参数，如果有，跳转到back对应的页面即可，如果没有back，默认跳到user.html
          if(location.search.indexOf("back") > -1){
            window.location.href = location.search.replace("?back=","");
          }else{
            //直接访问的登录页面。成功之后跳转到用户中心页面
            location.href = "user.html"
          }
          
        }
        if(info.error){
          mui.toast(info.message);
        }
      }
    });
  });
})