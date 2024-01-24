var map;
var marker;
var infoWindow;

const Post = require("../../server/models/post.js");

router.get("/posts", (req, res) => {
  Post.find({}).then((posts) => res.send(posts));
});

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

  infoWindow = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<h1 id="postTitle" class="postTitle">Sam Manolis</h1>' +
      "<p>I love to eat.</p>" +
      "</div>",
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}
