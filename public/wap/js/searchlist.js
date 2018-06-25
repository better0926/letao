$(function(){
  var page = 1;
  var pageSize = 10;

  getSearchTxt();
  //获取地址栏参数
  var key = getSearchTxt().key;
  //console.log(key);
  //把拿到的参数设置给 搜索内容
  $(".txt").val(key);
  //发送请求渲染数据
  render();
  

  //点击搜索按钮 渲染数据  
  $(".btn-search").on("click",function(){
    //获取到搜索框中关键词
    //如果搜索框内容为空则提示
    key = $(".txt").val();
    /* if (key == ""){
      mui.toast('请输入搜索内容'); 
    }; */
    $(".sort .sort_list").removeClass("now");
    //需要让所有的箭头恢复默认值
    $(".sort .sort_list span").addClass("fa-angle-down").removeClass("fa-angle-up")
    
    render();
    
  });

  //库存和价格排序  li中带有data-type属性的注册事件
  $(".sort .sort_list[data-type]").on("click",function(){
    var $that = $(this);
    if (!$that.hasClass("now")){
      //点击的添加now
      $that.addClass("now").siblings().removeClass("now");
      //没有now这个类 让所有的箭头向下。默认样式
      $(".sort .sort_list span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }else{
      //点击后箭头需要切换
      $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }
    render();
  });


  function render(){
    $(".product").html('<div class="loading"></div>');
    //需要的参数 page pageSize proName
    var parm = {
      page :page,
      pageSize : pageSize,
      proName : key
    }

    //判断是否需要传价格和库存的参数
    var $selected = $(".sort .sort_list.now");
    //console.log($selected.length);
    
    if ($selected.length> 0){
      //包含now这个类就需要发送请求 说明需要排序
      
      var type = $selected.data("type");
      //console.log(type);
      //fa-angle-up 升序 返回的参数是1
      var val = $selected.find("span").hasClass("fa-angle-up") ? 1 : 2;
      //把获取到的type添加到parm中
      parm[type] = val;
    }
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: parm,
      success: function(info){
        console.log(info);
        setTimeout(function(){
          $(".pro").html(template("proTpl", info));
        },1000)
      },
      error: function(){
        console.log(2);
      }
    });
    
  };

  ////获取地址栏搜索的关键词
  function getSearchTxt(){
    var arr= [];
    //获取地址栏搜索的关键词
    //var search = location.search;
    //拿到的关键词转码成中文
    var search = decodeURI(location.search);
    //拿到的参数去掉前面的问号
    search = search.slice(1);

    //将参数切割成数组  & split();
    arr = search.split("&");
    var obj = {};
    arr.forEach(function(e){
      var key = e.split("=")[0];//键
      var val = e.split("=")[1];//值
      //console.log(key,val);
      obj[key] = val;
      //console.log(obj);
    });
    //console.log(search, arr);
    return obj;
  };
});