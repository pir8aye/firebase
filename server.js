'use strict'

var express       = require('express');
var app           = express();

var Firebase      = require('firebase')
var ref           = new Firebase('https://<your_fb_url>.firebaseio.com/')

var Twitter       = require('twitter')

var client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: TOKEN_KEY,
  access_token_secret: TOKEN_SECRET
})

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

client.stream('statuses/filter', {track: 'nfl'}, function(stream) {
  stream.on('data', function(tweet) {
    // set a unique id!! Adding tweet text to firebase
    ref.child(Date.now()).set({text: tweet.text})
  })
})

app.listen(3000);
console.log('listening on 3000');
