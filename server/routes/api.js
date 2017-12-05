const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const GoogleAuth = require('google-auth-library');

// const uri = 'mongodb://luismaglz:tocopan88@cluster0-shard-00-00-uxxuf.mongodb.net:27017,cluster0-shard-00-01-uxxuf.mongodb.net:27017,cluster0-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const uri = 'mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin';
const clientId = '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com';
// Connect
const connection = (closure) => {
    return MongoClient.connect(uri, (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/routes', (req, res) => {
    connection((db) => {
        db.collection('routes').find({})
            .toArray()
            .then((routes) => {
                response.data = routes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/routes', (req, res) => {
  connection((db) => {
        db.collection('routes').insertMany([{
            "gym": "The Front",
            "zone": "Wave Wall",
            "color": "FFEE00",
            "type": "boulder",
            "grade": "v1",
            "setter":"Audra O'Hara Jr.",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Wave Wall",
            "color": "FF0000",
            "type": "boulder",
            "grade": "v3",
            "setter":"Candice Wyman",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "0D7FFF",
            "type": "boulder",
            "grade": "v5",
            "setter":"Audra O'Hara Jr.",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "E8840C",
            "type": "boulder",
            "grade": "v2",
            "setter":"Audra O'Hara Jr.",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "FFEE00",
            "type": "Lead",
            "grade": "5.10a",
            "setter":"Candice Wyman",    
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "FF0000",
            "type": "Lead",
            "grade": "5.11",
            "setter":"Audra O'Hara Jr.",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "0D7FFF",
            "type": "Lead",
            "grade": "5.10b",
            "setter":"Candice Wyman",
            "attempts": 0,
            "sends": 0
        },
        {
            "gym": "The Front",
            "zone": "Old Gym",
            "color": "E8840C",
            "type": "Lead",
            "grade": "5.10c",
            "setter":"Audra O'Hara Jr.",
            "attempts": 0,
            "sends": 0
        }])
            .then(function(result) {
              return result;
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/google-token/validate', (req, res) =>{
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientId, '', '');
    client.verifyIdToken(
    req.body.token,
    clientId,
    function(e, login) {
        if(e){
            sendError(e, res);
        }
      var payload = login.getPayload();
      var userid = payload['sub'];
    })
});


module.exports = router;