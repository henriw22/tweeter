$(document).ready(function() {
  // --- our code goes here ---
  console.log('DOM is ready to go!');
  $("#tweet-text").on('input', function() {
    const $textArea = $(this);
    const $form = $textArea.closest('form');
    const $counter = $form.find('.counter');
    const charLeft = 140 - $textArea.val().length;
    
    $counter.val(charLeft);

    if (charLeft < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }

    // console.log(this); //The this keyword is a reference to the button
  });

});
