'use strict';

var ref = new Firebase("https://twitter-streams.firebaseio.com/codinghouse");

ref.on('child_added', function(snap){
  $('.tweets').prepend(snap.val().text)
})
