$(function(){

  var page = 1;//页码
  var pageSize = 5;//显示的数据数量

  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        //console.log(info);
        //动态生成数据显示在页面中
        $(".content tbody").html(template("tpl",info));

        // 分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定bootstrap版本
          size: "small",//分页控件按钮大小
          currentPage: page,//当前页码
          numberOfPages: 4, //显示可见页数 
          totalPages: Math.ceil(info.total / info.size),//总显示页数
          onPageClicked: function(a,b,c,pageNum){
            page = pageNum;//点击的时候让page显示当前点击的页码
            render();//重新渲染数据
          } 
        });
      },
    });
  };


  //点击添加按钮
  $(".addcategory").on("click",function(){    
    $("#addModal").modal("show");
  });

  //表单校验 校验输入的一级分类名称是否为空
  $("#addModal form").bootstrapValidator({
    // 1、需要校验的字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名不能为空"
          }
        }
      }
    },

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },  
  });



  //点击确认添加按钮 //校验表单成功发送ajax请求 success.form.bv
  $("#addModal form").on("success.form.bv",function(e){
    e.preventDefault();
    //发送请求
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("form").serialize(),
      /* data: {
        categoryName: categoryName
      }, */
      success: function (info) {
        //console.log(info);
        if (info.success) {
          $("#addModal").modal("hide");//隐藏模态框
          page = 1;//回到第一页
          render();//重新渲染数据

          //重置表单内容
          //$("form").data("bootstrapValidator")会创建一个实例对象 然后调用resetForm方法
          $("form").data("bootstrapValidator").resetForm(true);
        }
      }
    });
  });
});