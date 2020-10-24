const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./querys');
const multer = require('multer');
const path =require('path');
const app = express();
// const port = 5000;
const DIR ='./uploads';


var distDir = __dirname + "/dist/";
app.use(express.static(__dirname + '/public'));
app.use(express.static(distDir));
const port = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))


let storage = multer.diskStorage({
    destination: (req,file, cb)=> {
        cb(null,DIR);
    },
    filename:(req,file,cb)=> {
        cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});
let upload = multer({ storage:storage});
app.use(cors());
app.use(bodyparser.json());

app.get('/uploads/:imagename', function (req,res) {
    res.sendfile(__dirname+ '/uploads/'+ req.params.imagename);
})

app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);
app.post('/getadmin',db.getadmin);

app.post('/addcategory',db.addcategory);
app.get('/listcategory',db.listcategory);
app.get('/getcategoryById/:id',db.getcategoryById);
app.put('/updatecategory',db.updatecategory);
app.delete('/deletecategory/:cid',db.deletecategory);

app.post('/addblog',db.addblog);
app.get('/listblog',db.listblog);
app.get('/getblogById/:id',db.getblogById);
app.put('/updateblog',db.updateblog);
app.delete('/deleteblog/:bid',db.deleteblog);

app.post('/upload', upload.single('image'),db.upload);

app.get('/getBlogFeature',db.getBlogFeature);
app.get('/getBlogActive',db.getBlogActive);

app.get('/countblogs',db.countblogs);
app.get('/countfeatured',db.countfeatured);
app.get('/countactive',db.countactive);

app.put('/blogupdate',db.blogupdate);
app.get('/', (request,response) => {
    response.json({ info: 'Node.js, Express, and Postgres API'});
});
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});