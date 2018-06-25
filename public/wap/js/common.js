//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//获取地址栏搜索的关键词
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