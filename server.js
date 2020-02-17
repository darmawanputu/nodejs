var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();
// konkesi ke MongoDB
mongoose.connect('mongodb+srv://root:gemini82@mongodb-belajar-fsamo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Sukses konek ke database');
    }
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:gemini82@mongodb-belajar-fsamo.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true
// });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

//Root index
// app.get('/', function (req, res, next) {
//     res.json('selamat datang di beranda');
// });

// app.get('/', function (req, res, next) {
//     User.find({
//         name: "Darmawan"
//     }, function (err, foundUser) {
//         if (foundUser) {
//             res.json(foundUser);
//         } else {
//             res.json('User tidak ada');
//         }
//     });
// });

app.get('/:name', function (req, res, next) {
    User.find({
        name: req.params.name
    }, function (err, foundUser) {
        if (foundUser) {
            res.json(foundUser);
        } else {
            res.json('User tidak ada');
        }
    });
});

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Membuat model
var User = mongoose.model('User', UserSchema);
// Membuat new user (medtode get)
// app.get('/create-user', function (req, res, next) {
//     var user = new User();
//     user.name = "Mawan";
//     user.age = 30;
//     user.save(function (err) {
//         if (err) next(err)
//         res.json(user);
//     });
// });
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended: true
}));
//membuat new user metode post
app.post('/create-user', function (req, res, next) {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function (err) {
        if (err) console.log(err);
        res.json(user);
    });
});


// app.get('/:name', function (req, res, next) {
//     res.json(req.params.name)
// });

app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Sukses');
    }
});
