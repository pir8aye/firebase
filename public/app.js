'use strict';

// var ref = new Firebase("https://<your_fb_url>.firebaseio.com/");
var ref = new Firebase('https://ch-twitter.firebaseio.com/')

// everytime a child is added to ref we append it to the dom
// Possible 'on' refrerences: https://www.firebase.com/docs/web/api/query/on.html
// snap.val() is the object stored at that location
// snap.key() is the id of the object
ref.on('child_added', function(snap){
  $('#tweets').prepend(snap.val().text)
})

// remove everything at that ref
$(function () {
   $('#remove').on('click', function(){
     ref.remove()
   })
})
