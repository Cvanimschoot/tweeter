/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log('client.js loaded');

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() { 
  console.log('client.js ready');

  loadTweets();

  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const $tweet = $(this).serialize();
    const $message = $('#tweet-text').val();
    const $counter = Number($('.counter').val());
    if ($message === '' || $message === null) {
      alert('message can\'t be empty or null');
    } else if ($counter < 0){ 
      alert('message can\'t be over 140 characters');
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $tweet,
        success: () => {
          loadTweets();
          $('.tweets-container').load(location.href + ' .tweets-container > *');
        },
        error: () => {
          alert('error loading tweets');
        }
      })
    }
    
  });
});

const createTweetElement = (data) => {
  const timeAgo = timeago.format(tweet.created_at);
  
  let $tweet = $( 
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
      <div class="posted-tweet">${data.content.text}</div>
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
    $(".tweets-container").append($tweet);
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