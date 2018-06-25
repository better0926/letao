$(function(){
  //页面一来就加载数据
  $.get("/user/queryUserMessage",function(info){
    //console.log(info);
    //未登录直接跳转到登录页
    if(info.error === 400){
      window.location.href = "login.html";
    };
    //登录了显示用户信息
    $(".userinfo").html(template("userTpl",info));
  });

  //退出成功跳转到登录页
  $(".login_out").on("click",function(){
    $.get("/user/logout",function(info){
      console.log(info);
      if(info.success){
        window.location.href = "login.html";
      }
    });
  });
});