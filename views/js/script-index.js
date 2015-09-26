var speedData = []

function getSpeedData(data) {
  data = JSON.parse(data);
  date = new Date();
  data["date"] = date;
  speedData.push(data);
  console.log(speedData);
}

function getCurrentSpeedData() {
  $.get("/wifi/init-get", function(data, status) {
    speedData = JSON.parse(data);
  });
}

$(document).ready( function() {
  getCurrentSpeedData();
  console.log("PLEASE");
  $.get("/wifi/get", function(data, status) {
    getSpeedData(data);
  });
  window.setInterval( function () {
    $.get("/wifi/get", function(data, status) {
      getSpeedData(data);
    });
  }, 60000);
});