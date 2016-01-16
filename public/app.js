'use strict';

var ref = new Firebase("https://<your_fb_url>.firebaseio.com/");

// everytime 'child_added' to ref we prepend to dom
// Possible 'on' refrerences: https://www.firebase.com/docs/web/api/query/on.html
// snap.val() is the object stored at that location
// snap.val().text will get us just the text
// snap.key() is the id of the object
ref.on('child_added', function(snap){
  $('#tweets').prepend(snap.val().text)
})

// remove everything at our ref
$(function () {
   $('#remove').on('click', function(){
     ref.remove()
   })
})
