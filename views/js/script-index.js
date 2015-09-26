var speedData = []
var geocoder = new google.maps.Geocoder();

function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {  
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('Cannot determine address at this location.');
    }
  });
}

function updateMarkerStatus(str) {
  document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
  document.getElementById('address').innerHTML = str;
}

function initialize() {
  var latLng = new google.maps.LatLng(40.442492, -79.942553);
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 17,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
    position: latLng,
    title: 'Point A',
    map: map,
    draggable: true
  });

  // Update current position info.
  updateMarkerPosition(latLng);
  geocodePosition(latLng);

  // Add dragging event listeners.
  google.maps.event.addListener(marker, 'dragstart', function() {
    updateMarkerAddress('Dragging...');
  });

  google.maps.event.addListener(marker, 'drag', function() {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(marker.getPosition());
  });

  google.maps.event.addListener(marker, 'dragend', function() {
    updateMarkerStatus('Click and drag the marker.');
    geocodePosition(marker.getPosition());
  });
}

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
  // get data
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

  // Onload handler to fire off the app.
  google.maps.event.addDomListener(window, 'load', initialize);
});