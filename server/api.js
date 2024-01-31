/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

// api.js
const express = require("express");
const router = express.Router();

// import models so we can interact with the database
const User = require("./models/user");
const Post = require("./models/post");

// import authentication library
const auth = require("./auth");

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", async (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  try {
    const userData = await User.findById(req.user._id);
    res.send(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// /|------------------------------
// | write your API methods below!|
// |------------------------------|

//Post commands
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put("/updateBio", async (req, res) => {
  const { user_id, bio } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(user_id, { bio }, { new: true });

    if (updatedUser) {
      res.json({ success: true, message: "Bio updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/post", auth.ensureLoggedIn, async (req, res) => {
  const newPost = new Post({
    creator_name: req.user.name,
    creatorid: req.body.creatorid,
    caption: req.body.caption,
    coord: req.body.coord,
  });
  newPost.save().then((post) => res.send(post));

  socketManager.getIo().emit("post", newPost);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
