'use strict';

var ref = new Firebase("https://<your_fb_url>.firebaseio.com/");

ref.on('child_added', function(snap){
  $('.tweets').prepend(snap.val().text)
})
