const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
require("./database/connect");


const app = express();

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`started server on port ${port}`);
});

// mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// mongoose.connection.on("error", err => console.log(err));

app.engine("handlebars", exphbs({ defaultLayout: "app" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes/login_routes"));
app.use(require("./routes/event_routes"));

app.post('/uploads', upload.single('picture'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

// set storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  // file name with time stamps, to store a unique name with file extension
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).array("picture", 10); //for single files, use arrays for multiple files

// check file type
const checkFileType = (file, cb) => {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // check extension
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type

  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only");
  }
};

require("./models/event_model");
const Event = mongoose.model("event_model");
// middle ware start
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// middleware end
app.get("/", (req, res) => {
  // Blog.find()
  // .then(blogs => {
  //   console.log('found blogs')
  //   console.log(blogs)
  // })
  // res.render('home',{
  //   files: blogs
  // });
  res.render("/");
});


app.post("/upload", (req, res) => {
  console.log(req.body);
  upload(req, res, err => {
    if (err) {
      console.log("error from upload function");
      res.render("/", {
        msg: err
      });
    } else {
      // res.send('test');
      if (req.files == undefined) {
        res.render("/", {
          msg: "Error: No file selected"
        });
      } else {
        // save to database
        console.log("in post route");
        console.log(req.body);
        let newEvent = {
          title: req.body.title,
          caption: req.body.details,
          files: req.files
        };
        new Event(newEvent).save().then(event => {
          console.log("posted event");
          // console.log(blogs);
          res.redirect("/");
        });
      }
    }
  });
});
// fetch all the posts uploaded
app.get("/upload", (req, res) => {
  Event.find()
    .then(event => {
      console.log("found blogs");
      console.log(event);
      res.render("/", {
        events: event 
      });
    })
    .catch(err => console.log(err));
});
