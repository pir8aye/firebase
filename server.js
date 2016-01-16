'use strict'

var Twitter       = require('twitter')
var Firebase      = require('firebase')
// var ref           = new Firebase('https://<your_fb_url>.firebaseio.com/')
var ref           = new Firebase("https://ch-twitter.firebaseio.com/");

// make sure keys are in quotes
// do not commit to github with your keys included
var client      = new Twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'TOKEN_KEY',
  access_token_secret: 'TOKEN_SECRET'
})

// Stream da tweets! Everything you can stream: https://dev.twitter.com/streaming/overview
// check out the npm package at: https://www.npmjs.com/package/twitter
// learn about saving data to firebase: https://www.firebase.com/docs/web/guide/saving-data.html
// ref.child(unique_id).set(content_object)

client.stream('statuses/filter', {track: 'san francisco'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text)
    ref.child(Date.now()).set({text: tweet.text})
  })
})

// launch the server on the port selected
app.listen(3000);
console.log('listening on 3000');
