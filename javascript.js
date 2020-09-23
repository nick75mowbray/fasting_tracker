$(document).ready(function(){
    console.log("js file working");
    
    // open hamburger menu
    $('#hamburger').on("click", function(){
        $('#menu-container').css('display', 'block');
        $('#hamburger').css('display', 'none');
        console.log("menu icon click is working");
    });

    //close hamburger menu
    $('#close').on("click", function(){
        $('#menu-container').css('display', 'none');
        $('#hamburger').css('display', 'block');
    });

    var progressBar = new ProgressBar.Circle('#progress', {
        color: '#FFCC00',
        strokeWidth: 5,
        trailWidth: 0.8,
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        // fill: 'rgba(0, 0, 0, 0.5)',
        duration: 1200,
        warnings: true
    });

}); //end document ready 