var map;
var marker;

function initMap() {
  var options = {
    center: { lat: 42.3601, lng: -71.0942 },
    zoom: 15,
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  const image = "ice cream.png";

  marker = new google.maps.Marker({
    position: { lat: 42.3601, lng: -71.0942 },
    map,
    title: "test post",
    icon: image,
  });

  marker.addEventListener("click", function () {
    openPostWindow();
  });
}

function openPostWindow() {
  var postContent =
    '<div id="content">' +
    '<h1 id="postTitle" class="postTitle">Sam Post</h1>' +
    "<p>I love to eat.</p>" +
    "</div>";

  var postwindow = new google.maps.InfoWindow({
    content: postContent,
  });

  postwindow.open(map, marker);
}
