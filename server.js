'use strict'

var express       = require('express');
var app           = express();

var Firebase      = require('firebase')
// var ref           = new Firebase('https://<your_fb_url>.firebaseio.com/')
var ref           = new Firebase("https://ch-twitter.firebaseio.com/");

var Twitter       = require('twitter')

// make sure keys are in quotes
// do not commit to github with your keys included
var client      = new Twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'TOKEN_KEY',
  access_token_secret: 'TOKEN_SECRET'
})

// stream da tweets! Everything you can stream: https://dev.twitter.com/streaming/overview
// check out the npm package at: https://www.npmjs.com/package/twitter
client.stream('statuses/filter', {track: 'san francisco'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text)

    // Unique id!! In this case we are using Date.now() + adding tweet text to firebase
    // learn more about saving data to firebase: https://www.firebase.com/docs/web/guide/saving-data.html
    // ref.child(unique_id).set({content_object})

    ref.child(Date.now()).set({text: tweet.text})
  })
})

// tells express where to look for front-end files
// this will all be covered in a week or two
app.use(express.static('public'));

// send our index file when the route is hit
// this will also be covered in a week or two
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

// launch the server on the port shown
app.listen(3000);
console.log('listening on 3000');
