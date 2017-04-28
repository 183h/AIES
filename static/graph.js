function drawGraph(titleName, container, unit) {
  var dataPoints = [];

  var chart = new CanvasJS.Chart(container,{
    title: {
      text: titleName
    },
    legend: {
      verticalAlign: "top",
      horizontalAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: "calibri",
      fontColor: "dimGrey"
    },
    axisX: {
      title: "Time",
      valueFormatString: "HH:mm:ss" ,
    },
    axisY:{
      title: "Value",
      suffix: " " + unit,
      includeZero: false
    },
    data: [{
      type: "line",
      xValueFormatString: "HH:mm:ss",
      xValueType: "dateTime",
      dataPoints: dataPoints
    }],
  });

  var updateInterval = 2000;
  var yValue1 = 0;
  var time = new Date;

  var updateChart = function (count) {
    time.setTime(time.getTime()+ updateInterval);
    var deltaY1 = .5 + Math.random() *(-.5-.5);
    yValue1 = Math.round((yValue1 + deltaY1)*100)/100;

    dataPoints.push({
      x: time.getTime(),
      y: yValue1
    });

    chart.render();
  };

  updateChart(100);
  setInterval(function(){updateChart()}, updateInterval);
}
