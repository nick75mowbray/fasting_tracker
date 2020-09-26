$(document).ready(function(){
    console.log("js file working");
    
    // open hamburger menu
    $('#hamburger').on("click", function(){
        $('#menu-container').css('display', 'block');
        $('.close').css('display', 'flex');
        
    });

    //BMI Calculator
    function bmiCalc() {

        $('#heading').empty();
        $('#bmi-div').empty();
        $('#results').empty();
        

        //heading
        //$('#bmi-page').append('<div id="heading"></div>');
        $('#heading').append('<h1 id="BMI-header">BMI Calculator</h1>');
        $('#heading').append('<p id="BMI-para">Calculate your body mass index with your age, weight and height!</p>');
        $('#BMI-para').append('<hr>');

        //form
        $('#bmi-div').append('<label for="age" id="ageLabel">Age</label>');
        $('#ageLabel').append('<input type="text" id="age" class="BMIinput"></input>');
        $('#ageLabel').append('<br>');
        $('#bmi-div').append('<label for="height" id="heightLabel">Height</label>');
        $('#heightLabel').append('<input type="text" id="height" class="BMIinput"></input>');
        $('#heightLabel').append('<br>');
        $('#bmi-div').append('<label for="weight" id="weightLabel">Weight</label>');
        $('#weightLabel').append('<input type="text" id="weight" class="BMIinput"></input>');
        $('#weightLabel').append('<br>');

        $('#bmi-div').append('<button class="button large" id="submitBTN">submit</button>');

        $('#submitBTN').on('click', function(event) {
            event.preventDefault();

            $('#results').empty();

            let age = $('#age').val();
            let height = $('#height').val();
            let weight = $('#weight').val();

            console.log(age);
            console.log(height);
            console.log(weight);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight + "",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
                    "x-rapidapi-key": "9412a276cbmsh4a03f98b46a37d7p1d53c7jsnbbec000e7aac"
                }
            }
            
            $.ajax(settings).done(function (response) {
                console.log(response);

                let bmi = response.bmi;
                let health = response.health;
                let range = response.healthy_bmi_range;

                //results
                $('#results-head').html('<hr>');
                $('#results-head').append('<h3>Your BMI!</h3>');
                $('#results').append('<hr>');
                $('#results').append('<p><b>BMI</b>: ' + bmi.toFixed(2) + '</p>');
                $('#results').append('<p><b>Overall Health</b>: ' + health + '</p>');
                $('#results').append('<p><b>Healthy BMI Range</b>: ' + range + '</p>');
            });
        
        })

    }

    // show BMI calculator
    $('#BMI-li').on("click", function(){
        bmiCalc();
        $('main').css('display', 'none');
        $('#menu-container').css('display', 'none');
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
        fill: 'rgba(255, 255, 50, 1)',
        stroke: 2,
        duration: 1200,
        warnings: true
    });

}); //end document ready 