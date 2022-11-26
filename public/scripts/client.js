/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log('client.js loaded');

$(document).ready(function() { 
  console.log('client.js ready');

  $('#error').hide();
  
  loadTweets();

  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const $tweet = $(this).serialize();
    const $message = $('#tweet-text').val(); // Store message within textarea
    const $counter = Number($('.counter').val()); // Counters value
    
    if ($message === '' || $message === null) { // Message is blank
      $('#error-message').text('Message can\'t be empty or null');
      $('#error').show();
    } else if ($counter < 0){ // Message is over the 140 character limit
      $('#error-message').text('Message can\'t be over 140 characters');
      $('#error').show();
    } else { // Everything passes, now it can attempt a POST
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $tweet,
        success: () => {
          loadTweets();
          location.reload();
        },
        error: () => {
          $('#error-message').text('Error loading tweets');
          $('#error').show();
        }
      })
    }
  });
});

const createTweetElement = (data) => {
  const timeAgo = timeago.format(tweet.created_at); // Grab time tweet posted

  let $tweet = $( // Basic layout of tweet design. Will be affected by CSS.
    `
    <article>
      <header>
        <div>
          <img src=${data.user.avatars}>
          <div>${data.user.name}</div>
        </div>
        <div>
          <div>${data.user.handle}</div>
        </div>
      </header>
      <div class="posted-tweet">${escapeText(data.content.text)}</div>
      <hr class="solid">
      <footer>
        <div>${timeAgo}</div>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `
  )
  return $tweet;
}

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".new-tweet-container").prepend($tweet); // Append new tweets after the container
  }
}

const loadTweets = () => {
  $.ajax({
    type: 'GET',
    url: '/tweets',
    success: (tweets) => {
      renderTweets(tweets);
    },
    error: () => {
      alert('error loading tweets');
    }
  })
}

const escapeText = function (str) { // Ensure there is no cross-site scripting
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};