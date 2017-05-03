function drawGraph(titleName, container, unit, apiMethod) {
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

  var updateInterval = 5000;
  var yValue1 = 0;
  var time = new Date;

  var updateChart = function (count) {
    time.setTime(time.getTime()+ updateInterval);
    // var deltaY1 = .5 + Math.random() *(-.5-.5);
    // yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
    yValue1 = apiCall(apiMethod, false);

    dataPoints.push({
      x: time.getTime(),
      y: yValue1.data
    });

    chart.render();
  };

  updateChart(100);
  // setInterval(function(){updateChart()}, updateInterval);
}

var rainStatusIcons = {"Rain": "wi wi-rain",
                       "High humidity / Light rain": "wi wi-humidity",
                       "Drought": "wi wi-day-sunny"};

function getRainStatus(rainStatusApi){
  var status = null;
  status = apiCall(rainStatusApi, false);
  $("#rainStatus").text(status.data);
  $("#rainStatusIcon").attr("class", rainStatusIcons[status.data]);
}

function setInitialValveState(valveStatusApi){
  var valveStatus = null;
  valveStatus = apiCall(valveStatusApi, false);
  if (valveStatus.data[0] == 0){
    $("#buttonValve").attr("class", "btn btn-danger");
    $("#buttonValve").text(valveStatus.data[1]);
    $("#dropdownValve").attr("class", "btn btn-danger dropdown-toggle");
  }else if (valveStatus.data[0] == 1) {
    $("#buttonValve").attr("class", "btn btn-success");
    $("#buttonValve").text(valveStatus.data[1]);
    $("#dropdownValve").attr("class", "btn btn-success dropdown-toggle");
  }
}

function turnValve(status){
  apiCall("setValve/"+status, false)
  if (status == "off"){
    $("#buttonValve").attr("class", "btn btn-danger");
    $("#buttonValve").text("OFF");
    $("#dropdownValve").attr("class", "btn btn-danger dropdown-toggle");
  }else if (status == "on") {
    $("#buttonValve").attr("class", "btn btn-success");
    $("#buttonValve").text("ON");
    $("#dropdownValve").attr("class", "btn btn-success dropdown-toggle");
  }
}

function updateCronTable(){
  response = apiCall('cronTable', false);
  $("#crons").html(response);
}

urlRoot = "http://127.0.0.1:5000/";

function addCron(){
  checkedDays = $("input[type=checkbox][name*='dow']:checked").length;
  if(!checkedDays) {
    alert("You must check at least one day!");
    return false;
  }
  checkedHours = $("input[type=checkbox][name*='hour']:checked").length;
  if(!checkedHours) {
    alert("You must check at least one hour!");
    return false;
  }

  $.ajax({
    url: urlRoot + 'addCron',
    data: $('#cronForm').serialize(),
    type: 'POST',
    success: function(response) {
      $('input[type=checkbox]').prop('checked', false);
      $('#addCronButton').blur();
      updateCronTable();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteCron(id){
  apiCall("deleteCron/"+id, true);
  updateCronTable();
}

function apiCall(apiMethod, asyncType){
  var apiCallResult = null;
  $.ajax({
    url: urlRoot + apiMethod,
    async: asyncType,
    success: function(result){
        apiCallResult = result;
    }
  });

  return apiCallResult;
}
