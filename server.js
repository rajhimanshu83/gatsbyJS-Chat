    var express = require('express');
    var bodyParser = require('body-parser');
    var Pusher = require('pusher');

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // enable cross-origin resource sharing
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

      var pusher = new Pusher({ // connect to pusher
        appId: process.env.APP_ID, 
        key: process.env.APP_KEY, 
        secret:  process.env.APP_SECRET,
        cluster: process.env.APP_CLUSTER
      });

      app.get('/', function(req, res){ // to test if the server is running
        res.send('all green');
      });

      // to authenticate users
    app.post('/pusher/auth', function(req, res) {
        var socketId = req.body.socket_id;
        var channel = req.body.channel_name;
        var origin = req.get('origin');
        if(origin == 'https://www.phonedict.com'){
        var auth = pusher.authenticate(socketId, channel);
        res.send(auth);
        }
      });
  
      var port = process.env.PORT || 5000;
      app.listen(port);