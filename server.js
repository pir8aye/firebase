'use strict'

var Twitter       = require('twitter')
var Firebase      = require('firebase')
var express       = require('express')
var app           = express();
// var ref        = new Firebase('https://<your_fb_url>.firebaseio.com/')
var ref           = new Firebase("https://ch-twitter.firebaseio.com/");

// make sure keys are in quotes
// do not commit to github with your keys included
var client      = new Twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'TOKEN_KEY',
  access_token_secret: 'TOKEN_SECRET'
})

var client      = new Twitter({
  consumer_key: 'md7SwESko8JpH3Ue3p2tvDV5C',
  consumer_secret:   'jkNRQHIB1yI2IWcC9YqkbtxmxHEIFLpxtL77tBK12BVP5197PP',
  access_token_key: '22101689-8qSBR0HoA3lxIbiNSTPiKr7iP7nm634SlygfPQhH4',
  access_token_secret: 'Vj2uT9Jvpggjhz8LtT8ndZQuubNaN3owoAgJqOTlXvdvy'
})

// Stream da tweets! Everything you can stream: https://dev.twitter.com/streaming/overview
// check out the npm package at: https://www.npmjs.com/package/twitter
// learn about saving data to firebase: https://www.firebase.com/docs/web/guide/saving-data.html
// sky_folder.child(unique_id).push(content_object)

client.stream('statuses/filter', {track: 'god'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text)
    ref.child(Date.now()).set({text: tweet.text})
  })
})

// launch the server on the port selected
app.listen(3000);
console.log('listening on 3000');
