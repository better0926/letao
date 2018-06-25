require.config({
  baseUrl: "/back/",//绝对路径
  paths: {
    //给每一个模块配置一个别名
    "jquery": "lib/jquery/jquery",
    "artTamlate": "lib/artTemplate/template-web",
    "bootstrap": "lib/bootstrap/js/bootstrap",
    "bootstrapPaginator": "lib/bootstrap-paginator/bootstrap-paginator",
    "bootstrapValidator": "lib/bootstrap-validator/js/bootstrapValidator",
    "echars": "lib/echarts/echarts.min",
    "jqueryFileupload": "lib/jquery-fileupload/jquery.fileupload",
    "nprogress": "lib/nprogress/nprogress",//加载进度条效果
    "common": "js/common",
    "jquery-ui/ui/widget": "lib/jquery-fileupload/jquery.ui.widget",
    
  },
  //给不支持amd的js文件配一个 shim垫 指明依赖项 比如bootstarp依赖jquery。
  shim: {
   "bootstrap": {
     deps: ["jquery"]
   },
   "bootstrapPaginator": {
     deps: ["bootstrap"]
   },
   "bootstrapValidator": {
     deps: ["bootstrap"]
   }
  }
});