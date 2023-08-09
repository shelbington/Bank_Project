var express = require('express');
require('dotenv').config();
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
var admin   = require('./admin.js');
//const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        admin.auth().verifyIdToken(token)
            .then(decodedToken => {
                console.log("Decoded Token: ", decodedToken);
                return next();
            }).catch(err => {
                return res.status(401).send("Unauthorized");
            })    
    }
    else {
        return res.status(401).send("No token found");
    }
}

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});




// find user account
app.get('/account/find/:email', verifyToken, (req, res) => {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', verifyToken, (req, res) => {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', verifyToken, function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Running on port: ' + port);