$(document).ready(function() {
  scroll_down();
});


function scroll_down() {
  $('#banner_search_btn').click(function() {
    $('html, body').animate({
      scrollTop: $("#selected_start").offset().top
    }, 2000);
  })
}
