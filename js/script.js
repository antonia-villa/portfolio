
// Change Style Class
// function changeView(event){

//   var project = event.target.id
//   $('#'+project+'Tile').attr('class', 'projectContainerSelected');

// }

$( ".projectLink" ).mouseover(function() {
 // var project = $(this).attr('id'); 
  $(this).style("fill", "red");

});

$( ".projectLink" ).click(function() {
  var project = $(this).attr('id'); 

  $('html, body').animate({
        scrollTop: $('#'+project+'Tile').offset().top
    }, 1500);

});

// $( ".projectLink" ).click(function() {
// // set selected container color
//   var project = $(this).attr('id');
//   $('#'+project+'Tile').attr('class', 'projectContainerSelected');

// // set remainin container classes
//   var num = Number(project.slice((project.length)-1))
//   var projectIds = [1,2,3,4]
//   projectIds = projectIds.filter( function(item) {
//     	return (item != num);
// 	});

//   for(id in projectIds){
//   	console.log('project',projectIds[id] )
//   	$('#project'+projectIds[id]+'Tile').attr('class', 'projectContainerUnselected');
//     $('#arrow'+projectIds[id]).hide();
//   }
  
// });

// $(".uparrow").click(function(){
//   var arrow = $(this).attr('id');
//   $(arrow).show();

// })

// // Reset Style Class
// $( "#projectsGrid" ).click(function() {
//   var projectIds = [1,2,3,4]

//   for(id in projectIds){
//   	$('#project'+projectIds[id]+'Tile').attr('class', 'projectContainer');
//     $('#arrow'+projectIds[id]).show();
//   }
// });


// // To match col height
// $('.box').matchHeight();

