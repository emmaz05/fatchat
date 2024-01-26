/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Post = require("./models/post")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(
      req.user,
      socketManager.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//Post commands
router.get("/posts", (req, res) => {
  Post.find({}).then((posts) => res.send(posts));
});

router.post("/post", auth.ensureLoggedIn, (req, res) => {
  const newPost = new Post({
    creator_name: req.user.name,
    creator_id: req.user._id,
    caption: req.body.caption,
    coord: req.body.coord,
    // lat: req.body.lat,
    // lng: req.body.lng,

    // creator_id: req.user._id,
    // creator_name: req.user.name,
    // content: req.body.content,
  });

  console.log(newPost);

  newPost.save().then((post) => res.send(post));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
