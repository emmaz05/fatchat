function initMap() {
  var options = {
    center: { lat: 42.3601, lng: -71.0942 },
    zoom: 15,
  };

  map = new google.maps.Map(document.getElementById("map"), options);
}
