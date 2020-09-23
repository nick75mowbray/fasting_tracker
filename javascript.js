$(document).ready(function(){
    console.log("js file working");
    
    // open hamburger menu
    $('#hamburger').on("click", function(){
        $('#menu-container').css('display', 'block');
        $('#hamburger').css('display', 'none');
    });

    //close hamburger menu
    $('#close').on("click", function(){
        $('#menu-container').css('display', 'none');
        $('#hamburger').css('display', 'block');
    });




}); //end document ready 