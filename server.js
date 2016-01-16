'use strict'

require('dotenv').load('.env')

var express       = require('express');
var app           = express();

var Firebase      = require('firebase')
var ref           = new Firebase('https://twitter-streams.firebaseio.com/codinghouse')

var Twitter       = require('twitter')

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
})

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

client.stream('statuses/filter', {track: 'nfl'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet)
    ref.child(Date.now()).set({text: tweet.text})
  })
})

app.listen(3000);
console.log('listening on 3000');
