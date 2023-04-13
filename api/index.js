const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const salt = bcrypt.genSaltSync(10); //password hashed ,stored as such in db
const secret = "aaadkdfnvs454ad4ef856";

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //to catch headers properly
app.use(express.json()); //json parser
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(
  "mongodb+srv://blog:blog@cluster0.2hrbez2.mongodb.net/?retryWrites=true&w=majority"
);

//sign-up auth
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

//login auth
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username }); //find the user
  const passOk = bcrypt.compareSync(password, userDoc.password); // boolean
  if (passOk) {
    //user logged-in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

//valiating the cookie to check if logged-in
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", " ").json("ok"); //invalidating cookies(token)
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file; //creating extention
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext; //renaming path
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(await Post.find()
  .populate("author", ["username"])
  .sort({createdAt: -1})
  .limit(20)
  );
});

app.get('/post/:id',async (req, res)=> {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author',['username']);
  res.json(postDoc);
})

app.listen(4000);

//mongodb+srv://blog:blog@cluster0.2hrbez2.mongodb.net/?retryWrites=true&w=majority
//id blog pass blog
