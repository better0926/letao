// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.main_left'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: '2018年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['人数']
  },
  xAxis: {
    data: ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [1000, 200, 360, 100, 180, 820]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChartRight = echarts.init(document.querySelector('.main_right'));

option = {
  title: {
    text: '热门鞋品牌',
    subtext: '2017年2月',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['阿迪达斯', '特步', '安踏', '匡威', '李宁']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '阿迪达斯' },
        { value: 310, name: '特步' },
        { value: 234, name: '安踏' },
        { value: 135, name: '匡威' },
        { value: 1548, name: '李宁' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


// 使用刚指定的配置项和数据显示图表。
myChartRight.setOption(option);