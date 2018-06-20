$(function () {

  var page = 1; //当前显示页
  var pageSize = 5; //每页显示的数据条数

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        //模板生成数据
        $("tbody").html(template("tpl", info));
        // 分页效果
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定版本
          size: "small", //设置分页按钮控件大小
          currentPage: page, //当前页码
          totalPages: Math.ceil(info.total / info.size), //总页码
          // 点击页码事件
          onPageClicked: function (a, b, c, pageNum) {
            page = pageNum;
            render();
          }
        });
      },
    });
  };

  //点击添加分类显示模态框
  $(".addcategory").on("click", function () {
    $("#secondModal").modal("show");

    //发送请求。获取到一级分类的名称
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        //console.log(info);
        $(".dropdown-menu").html(template("dropdownTpl", info));
      }
    });
  });

  //点击选择一级分类名称 委托事件
  $(".dropdown-menu").on("click","a",function(){
    //获取到点击的a的名称 设置给dropdown-text 
    $(".dropdown-text").text($(this).text());
    
    //获取到分类id 设置给name="categoryId" 这个隐藏域
    $("input[name='categoryId']").val($(this).data("id"));

    //让隐藏的categoryIde的校验通过 展示一只小手
    $("form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

  // 图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    done: function(e,data){
      //console.log(data.result.picAddr);
      $("input[name='brandLogo']").val(data.result.picAddr);
      
      //把上传你的图片的src设置给img
      $(".img_box img").attr("src", data.result.picAddr);

      //手动让图片校验通过
      $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });

  //表单校验
  $("#secondModal form").bootstrapValidator({
    //指定校验类型，空数组就是校验所有类型
    excluded: [],

    //指定校验图标显示，bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张图片'
          }
        }
      },
    }
  });


  //表单校验通过发送请求 注册表单校验通过事件
  $("#secondModal form").on("success.form.bv",function(e){
    e.preventDefault();
    
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      success: function(info){
        console.log(info);
        if (info.success){
          $("#secondModal").modal("hide");//隐藏模态框
          page = 1;//让页码回到第一页。因为添加的数据在最前面
          render();//重新渲染页面

          //重置表单样式 将隐藏所有错误提示和图标
          $("form").data('bootstrapValidator').resetForm(true);
          //重置表单数据
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");//显示默认图片
        }
      }
    });
  });
});