$(document).ready(function() {
  // --- our code goes here ---
  console.log("I'm ready");
  $("#tweet-text").on('keyup', function() {
    const counter = $('.counter');
    let characterCount = $(this).val().length;
    let currentCount = 140 - characterCount;

    counter.text(currentCount);

    if(currentCount < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  })
});