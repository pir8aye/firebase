'use strict';

var ref = new Firebase("https://<your_fb_url>.firebaseio.com/");

// everytime something is added to ref we append it to the dom
ref.on('child_added', function(snap){
  $('#tweets').prepend(snap.val().text)
})
