var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
const bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2;
var fs = require('fs');

// ... other imports 
const path = require("path")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

//ready
app.use(express.static(path.join(__dirname, '/pr0ject/src/public/img')));

//files upload by multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/pr0ject/src/public/img'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

//cloudinary
cloudinary.config({
  cloud_name: 'hcrwup82g',
  api_key: '617566545441475',
  api_secret: 'mq3Srsu1bLe-pCi_gEewBVz1PqU'
});

app.post('/upload', upload.any(), (req, res) => {
  console.log("let me in:", req.files)
  cloudinary.uploader.upload(req.files[0].path, { tags: 'basic_sample' }, function (err, image) {
    console.log();
    console.log("** File Upload");
    if (err) { console.warn(err); }
    console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    res.status(200).send(image.url)
    fs.unlinkSync(req.files[0].path, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });
  });
});

//my routes
const route = require('./router/route')
const auth = require('./router/auth')
const emailsender = require('./router/emailSender')

app.use('/auth', auth);
app.post('/auth', auth);
app.get('/auth', auth);
app.put('/auth', route)

//header routes
app.use('/hdr', route);
app.put('/hdr', route);
app.get('/hdr', route);

//post routes
app.use('/post', route);
app.get('/post', route);
app.post('/post', route);
app.put('/post', route);
app.delete('/post', route);

//button routes
app.use('/button', route);
app.post('/button', route);
app.get('/button', route);
app.put('/button', route);
app.delete('/button', route);
app.post('/uni', route);
app.delete('/uni', route);
app.post('/mat', route);
app.delete('/mat', route);

//abstract routes
app.use('/abs', route);
app.get('/abs', route);
app.put('/abs', route);

//email routes
app.use('/emailsender', emailsender);
app.post('/emailsender', emailsender);

app.use('/siteemailsender', emailsender);
app.post('/siteemailsender', emailsender);

app.use('/emailadvisor', emailsender);
app.post('/emailadvisor', emailsender);

app.use('/email', route);
app.post('/email', route);
app.get('/email', route);
app.put('/email', route);
app.delete('/email', route);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "/pr0ject/build")));
/*React root*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/pr0ject/build/index.html"));
});

var porta = process.env.PORT || 3001;
app.listen(porta);
console.log('App de Exemplo escutando na porta' + porta + '!');

module.exports = app;