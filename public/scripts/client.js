/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const name = data.user.name;
    const avatar = data.user.avatars;
    const handle = data.user.handle;
    const content = data.content.text;
    const time = data.created_at;

    const $tweet = $(`
      <article class="tweet boxhover">
        <header>
          <span class="name"><img src="${avatar}"><span>${name}</span></span>
          <span class="handle">${handle}</span>
        </header>
        <p><b>${escape(content)}</b></p>
        <footer>
          <span>${time}</span>
          <!-- <span class=‘time’ data-time=“1623621475652”></span> -->
          <span class="symbol"><i class="fa fa-flag hover"></i><i class="fa fa-retweet hover" aria-hidden="true"></i><i class="fa fa-heart hover"></i></span>
        </footer>
      </article>
    `);

    return $tweet;
  };


  const renderTweets = (datas) => {
    for (let data of datas) {
      let $tweet = createTweetElement(data);
      $('#tweets-container').prepend($tweet);
    }
  };


  $("form").submit(function (event) {
    event.preventDefault();
    $("#error1").slideUp("fast");
    $("#error2").slideUp("fast");
    const data = $('form').serialize();
    const test = $('#tweet-text').val().trim().length;
    
    if (test === 0) {
      $("#error1").slideDown("fast");
    } else if (test > 140) {
      $("#error2").slideDown("fast");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: data
      })
      .then((result) => {
        renderTweets(result);
        $('#tweet-text').val('');
        $('.counter').text('140');
      })
    }

  });



  const loadTweets = () => {
    $.ajax('/tweets', {METHOD: 'GET'})
    .then((result) => {
      renderTweets(result);
    });
  };

  loadTweets();

});


// $(document).ready(function() {
//   const timeElement = $(".time")
//   const time = timeElement.data("time")
//   const timeAgo = timeago.format(time)
//   timeElement.text(timeAgo)
// });