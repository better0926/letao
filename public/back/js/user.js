$(function(){
  var page = 1;
  var pageSize = 5;
  render();

  function render(){
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        //console.log(info);
        //使用模板将数据显示到页面中
        $(".content tbody").html(template("tpl", info) );

        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定bootstrap版本
          size: "small",//分页按钮控件大小
          currentPage: page,//当前页码
          totalPages: Math.ceil(info.total / info.size),//总共多少页
          onPageClicked: function (event, originalEvent, type,pageNum){
            page = pageNum;
            render();
          }
        });
      }
    })
  };


  //启用禁用按钮
  //显示模态框
  //因为按钮是模板动态生成的所以要注册委托事件
  $(".content tbody").on("click",".btn",function(){
    //ajax请求需要的参数id 和 isDelete
    //获取启用禁用按钮 父元素的id
    var id = $(this).parent().data("id");

    //如果按钮包含btn-success这个类名，说明是禁用状态。否则就是启用状态
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    //console.log(id, isDelete);
    
    $("#userModal").modal("show");//显示模态框

    //点击确认按钮执行的操作，
    $(".btn_user").on("click",function(){
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function(info){
          //console.log(info);
          //如果返回的结果是true 隐藏模态框。并重新渲染数据
          if (info.success){
            $("#userModal").modal("hide");
            render();
          }
        },
      });
      
    });
  });
  
});