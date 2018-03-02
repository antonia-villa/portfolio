$( ".projectLink" ).click(function() {
  var project = $(this).attr('id'); 

  $('html, body').animate({
        scrollTop: $('#'+project+'Tile').offset().top
    }, 1500);

});

