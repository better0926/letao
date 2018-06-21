$(function(){

  // 渲染左侧一级分类
  render();
  function render() {
    $.get("/category/queryTopCategory",function(info){
      //console.log(info);
      //左侧模板渲染
      $(".silder").html(template("tl_left",info));

      secondeRender(info.rows[0].id);//返回的数组中的下标为0的元素渲染出来再右侧二级分类栏中
    });
  }

  //点击一级分类动态渲染二级分类
  $(".ct_left").on("click",".silder_list",function(){
    $(this).addClass("now").siblings().removeClass("now");
    
    //获取点击的id
    var id = $(this).data("id");
    secondeRender(id);

    //让容易滚动到指定位置，切换选项时，右边的容器要回到顶部
    mui('.ct_right .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
  });

  //二级分类ajax
  function secondeRender(id){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function(info){
        //console.log(info);
        //右侧模板渲染
        $(".main").html(template("tl_right",info));
      }
    });
  };
});