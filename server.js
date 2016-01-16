'use strict'

var express       = require('express');
var app           = express();

var Firebase      = require('firebase')
// var ref           = new Firebase('https://<your_fb_url>.firebaseio.com/')
var ref           = new Firebase('https://ch-twitter.firebaseio.com/')

var Twitter       = require('twitter')

var client      = new Twitter({
  // make sure keys are in quotes
  // do not commit to github with your keys included
  consumer_key: 'Se1a1quNUBALSX65ciTciFRIq',
  consumer_secret: 'mhDBcgHB4Wfk9ZIhOztgYJ3YlBmGy9p4qe7JgQyHUf7LLfBfvD',
  access_token_key: '22101689-hUWKsfP9Ia6VpMNOIGL6nKM7njZorsQOrcBzF7cYu',
  access_token_secret: 'BeHouu1hxVrfIsvXFDtpdgAbdw3p8782hgfRsQr6AdxKI'
})

// tells express where to look for front-end files
app.use(express.static('public'));

// send our index file when the route is hit
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

// stream da tweets! More info: https://dev.twitter.com/streaming/overview
client.stream('statuses/filter', {track: 'san francisco'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text)

    // Unique id!! In this case we are using Date.now(), Adding tweet text to firebase
    // learn more about saving data to firebase: https://www.firebase.com/docs/web/guide/saving-data.html
    ref.child(Date.now()).set({text: tweet.text})
  })
})

app.listen(3000);
console.log('listening on 3000');
