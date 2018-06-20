$(function () {
  var page = 1;
  var pageSize = 5;
  var imgs = [];
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tpl1", info));

        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定版本
          size: "small", //设置分页按钮控件大小
          currentPage: page, //当前页码
          totalPages: Math.ceil(info.total / info.size),
          //返回按钮显示的内容
          itemTexts: function (type, page,current){
            switch(type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default: return page
            }
          },
          tooltipTitles: function (type,page, urrent){
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default: return page
            }
          },
          useBootstrapTooltip: true,//使用Bootstrap默认样式
          onPageClicked: function (a, b, c, pageNum) {
            page = pageNum;
            render();
          }
        });
      }
    });
  }

  //显示模态框 发送请求。渲染二级分类dropdowm名称
  $(".addcategory").on("click", function () {
    $("#adddModal").modal("show");

    //发送请求。渲染二级分类dropdowm名称
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info){
        //console.log(info);
        $(".dropdown-menu").html(template("tpl2",info));
      }
    });
  });

  //委托事件
  //给dropdowm 下的a添加事件，把选中的二级分类名称显示到dropdown-text中
  $(".dropdown").on("click","a",function(){
    //把选中的a中的文字添加到dropdown-text中
    $(".dropdown-text").text($(this).text());
    $("input[name='brandId']").val($(this).data("id"));

    //手动让校验通过
    $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  //图片上传功能
  $("#fileupload").fileupload({
     dataType: "json",
     done: function (e, data) {
      console.log(data);

      //判断imgs的长度。
      if(imgs.length >= 3){
        return;
      }

      imgs.push(data.result);
      console.log(imgs);
      
      //动态创建img标签
      //图片上传成功需要把图片显示出来
      //1. img_box中添加一张img
      //图片上传的结果已经存到数组中
      $(".img_box").append('<img src=" ' + data.result.picAddr +'" width="100" alt="">')
      //$(".img_box img").attr("src", data.result.picAddr);
      $("#fileupload").data("url", data.result.picAddr);

      //手动让图片校验通过
      if(imgs.length === 3){
        $("form").data("bootstrapValidator").updateStatus("tips", "VALID");
      }else{
        $("form").data("bootstrapValidator").updateStatus("tips", "INVALID");
      };
     }
  });

  //校验表单
  //表单校验功能
  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的描述'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的描述'
          }
        }
      },
      num: {
        validators: {
          //非空  必须是数字类型的
          notEmpty: {
            message: '请输入商品的库存'
          },
          //正则校验的
          regexp: {
            //不能0开头，不能超过5位数 1-99999
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入正确的库存（1-99999）'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品的尺码'
          },
          //正则校验的 30-50
          regexp: {
            //不能0开头，不能超过5位数 1-99999   
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的尺码范围（xx-xx）'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品的原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的现价'
          }
        }
      },
      tips: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      },
    }
  });

  //表单校验成功执行
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    var parm = $("form").serialize();
    console.log(parm);
    parm += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr1;
    parm += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr1;
    parm += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr1;
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: parm,
      success: function(info){
        console.log(info);
        if(info.success){
          //让page回到第一页
          pgae = 1;
          //重新渲染
          render();
          //隐藏模态框
          $("#adddModal").modal("hide");
          //重置数组
          imgs = [];
          //dropdown-text的text替换成默认文本
          $(".dropdown-text").text("请二级分类");
          //重置表单
          $("form").data("bootstrapValidator").resetForm("true");
          $(".img_box img").remove();
        };
      }
    });
  });
});