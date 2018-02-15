
$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});

// Change Style Class
$( ".projectLink" ).click(function() {
// set selected container color
  var project = $(this).attr('id');
  $('#'+project+'Tile').attr('class', 'projectContainerSelected');

// set remainin container classes
  var num = Number(project.slice((project.length)-1))
  var projectIds = [1,2,3,4]
  projectIds = projectIds.filter( function(item) {
    	return (item != num);
	});

  for(id in projectIds){
  	console.log('project',projectIds[id] )
  	$('#project'+projectIds[id]+'Tile').attr('class', 'projectContainerUnselected');
    $('#arrow'+projectIds[id]).hide();
  }
  
});

$(".uparrow").click(function(){
  var arrow = $(this).attr('id');
  $(arrow).show();

})

// Reset Style Class
$( "#projectsGrid" ).click(function() {
  var projectIds = [1,2,3,4]

  for(id in projectIds){
  	$('#project'+projectIds[id]+'Tile').attr('class', 'projectContainer');
    $('#arrow'+projectIds[id]).show();
  }
});


// To match col height
$('.box').matchHeight();

