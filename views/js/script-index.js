var speedData = []
console.log("file loaded successfully");

function getSpeedData(data) {
  data = JSON.parse(data);
  date = new Date();
  data["date"] = date;
  speedData.push(data);
  console.log(speedData);
}

$(document).ready( function() {
  console.log("PLEASE");
  $.get("/wifi", function(data, status) {
    getSpeedData(data);
  });
  window.setInterval( function () {
    $.get("/wifi", function(data, status) {
      getSpeedData(data);
    });
  }, 60000);
});