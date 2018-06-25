$(function(){

  //假数据用来测试
  //var arr = ["埃迪达斯", "耐克", "新百伦"];
  //localStorage只能识别字符串，所以把拿到的数组转换成json字符串
  //如果需要使用需要把json再次转成对象
  //localStorage.setItem("lt_history", JSON.stringify(arr));
  /* var result = localStorage.getItem("lt_history");
  result = JSON.parse(result);

  //console.log(result);
  var html = template("historyTpl",{rows:result});
  $(".lt_history").html(html); */



  render();
  function getResult(){
    //存储值
    //key: 存储的值的键，以后取值的时候，也要通过这个key，就能获取对应的值。
    //获取历史记录 locHistory就是key   localStorage.getItem(key,value)
    var result = localStorage.getItem("locHistory") ||"[]";
    //获取到result是一个数组 需要转换成对象
    result = JSON.parse(result);
    //console.log(result);
    return result;
  }
  
  function render(){
    var history = getResult();
    //把拿到的结果渲染到 模板中 ,因为拿到result是一个数组需要转换成对象 用{}包裹一下。template只能遍历对象
    $(".lt_history").html(template("historyTpl", { rows: history }));
  }

  //清空历史记录 注册委托事件
  $(".lt_history").on("click",".all_delete",function(){
    mui.confirm("确定要清空所有历史记录吗？","温馨提示",["是","否"],function(e){
      console.log(e);
      //e返回的是值 是 0 || 1
    if(e.index === 0){
      //返回的结果是0 删除所有记录  locHistory是存储历史记录的key
      localStorage.removeItem("locHistory");
      render();
    };      
    });  
  });

  //删除选中的历史记录
  //获取到点击的下标
  //获取到历史记录的数组
  //删除数组对应下标的元素
  //重新渲染
  $(".lt_history").on("click", ".btn_delete", function () {
    //获取点击的元素的id
    var index = $(this).data("index");
    console.log(index);
    
    //调用mui中的confirm确认框
    mui.confirm("确定要删除这条历史记录吗？","温馨提示",["是","否"],function(e){
      //console.log(e);
      //根据e.index返回的值判断点击的是  “是” || “否”
      if(e.index === 0){
        //获取到历史记录的数组 
        var history = getResult();
        console.log(history);
        //删除数组中指定下标的元素
        history.splice(index, 1);
        //把删除后的数组重新存回历史记录locHistory中
        localStorage.setItem("locHistory", JSON.stringify(history));
        render();
      };
    });
  });

  //点击搜索时。给lt_history中添加搜索框的值
  //获取输入框的内容
  //获取历史记录的数组
  //把拿到的内容添加到数组的最前面
  //如果数组中有和输入的内容重复的，则删除最先存储的那条数据
  //数组最多可以存储10条记录
  $(".btn-search").on("click",function(){
    var txt = $(".txt").val();
    //console.log(txt);

    //如果没有输入内容则提示
    if(txt == ""){
      mui.toast("请输入你想搜索的内容");
      return;
    }
    $(".txt").val("");
    var history = getResult();
    //判断内容是否重复 
    //获取txt在history中的下标
    var index = history.indexOf(txt);
    if (history.indexOf(txt) !== -1){//存在，就删除
     
      history.splice(index,1);//删除指定元素
    };
    console.log(history);

    //判断数组的长度
    if(history.length >= 10){
      //删除最后一条数据
      history.pop();
    };
    history.unshift(txt);
    //把数据重新存回localStorage中
    localStorage.setItem("locHistory",JSON.stringify(history));
    render();

    //页面跳转
    location.href = "searchlist.html?key=" + txt;
  });
});