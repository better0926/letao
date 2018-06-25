$(function(){
  //获取验证码
  $(".getCode").on("click",function(){
    var mobile = $(".register_form input[name=mobile]").val();
    //手机号码不能为空
    if (!mobile) {
      mui.toast("手机号码不能为空");
      return;
    };

    //正则校验手机号码
    if(!/^1[23456789]\d{9}$/.test(mobile)){
      mui.toast("手机号码格式有误");
      return;
    }
    $(this).text("发送中...").addClass("disabled").prop("disable",true);
    //手机号码验证通过发送请求
    $.get("/user/vCode",function(info){
        console.log(info);
        var count = 3;
        var timer = setInterval(function(){
          count--;
          $(".getCode").text("发送成功，"+ count+"s后再发送");
          if(count <= 0){
            clearInterval(timer);
            $(".getCode").text("再次发送").removeClass("disabled").prop("disable", false);
          }
        },1000);
        if(info.error){
          mui.toast(info.message);
        };

      });
  });

  $(".register").on("click",function(){
    //校验用户名
    var username = $(".register_form input[name=username]").val();
    if (!username){
      mui.toast("用户名不能为空");
      return;
    }
    // 密码
    var password = $(".register_form input[name=password]").val();
    if (!password){
      mui.toast("密码不能为空");
      return;
    }
    // 确认密码
    var repass = $(".register_form input[name=repass]").val();
    if (repass != password) {
      mui.toast("密码与确认密码不一致");
      return;
    }
    // 手机号码
    var mobile = $(".register_form input[name=mobile]").val();
    //手机号码不能为空
    if (!mobile) {
      mui.toast("手机号码不能为空");
      return;
    };

    //正则校验手机号码
    if (!/^1[23456789]\d{9}$/.test(mobile)) {
      mui.toast("手机号码格式有误");
      return;
    }

    // 验证码
    var vCode = $(".register_form input[name=vCode]").val();
    if (!/^\d{6}$/.test(vCode)){
      mui.toast("验证码有误");
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/register",
      data: $(".register_form").serialize(),
      success: function(info){
        console.log(info);
        if(info.success){
          setTimeout(function(){
            mui.toast("注册成功，3s后跳到登录页");
            window.location.href = "login.html";
          },3000);
        }
      }
    });
  });
});