$(document).ready(function(){
    console.log("js file working");
    
    // open hamburger menu
    $('#hamburger').on("click", function(){
        $('#menu').css('left', '0px');
        $('.close').css('display', 'flex');
    });
    
    //close hamburger menu
    $('#close').on("click", function(){
        $('#menu').css('left', "-300px");
        $('#hamburger').css('display', 'block');
    });

    //BMI Calculator
    function bmiCalc() {

        //$('#heading').empty();
        //$('#bmi-div').empty();
        //$('#results').empty();
        

        //heading
        $('#heading').append('<h1 class="is-size-1" id="BMI-header">BMI Calculator</h1>');
        $('#heading').append('<p class="is-size-3 has-text-weight-light firstPara" id="BMI-para">Calculate your body mass index with your age, weight and height!</p>');
        $('#BMI-para').append('<hr>');

        //form
        $('#bmi-div').append('<label class="label" for="age" id="ageLabel">Age </label>');
        $('#ageLabel').append('<input type="text" id="age" class="BMIinput"></input>');
        $('#ageLabel').append('<br>');
        $('#bmi-div').append('<label class="label" for="height" id="heightLabel">Height </label>');
        $('#heightLabel').append('<input type="text" id="height" class="BMIinput"></input>');
        $('#heightLabel').append('<br>');
        $('#bmi-div').append('<label class="label" for="weight" id="weightLabel">Weight </label>');
        $('#weightLabel').append('<input type="text" id="weight" class="BMIinput"></input>');
        $('#weightLabel').append('<br>');

        $('#bmi-div').append('<button class="submit button is-outlined is-success" id="submitBTN">submit</button>');

        $('#submitBTN').on('click', function(event) {
            event.preventDefault();
            
            // open hamburger menu
            $('#hamburger').on("click", function(){
            $('#menu').css('left', '0px');
            $('.close').css('display', 'flex');
            });
        
                //close hamburger menu
            $('#close').on("click", function(){
            $('#menu').css('left', "-300px");
            $('#hamburger').css('display', 'block');
            });

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
                $('#results').append('<p class="lead"><b>BMI: </b>' + bmi.toFixed(2) + '</p>');
                $('#results').append('<p class="lead"><b>Overall Health: </b>' + health + '</p>');
                $('#results').append('<p class="lead"><b>Healthy BMI Range: </b>' + range + '</p>');
            });
        
        });

    };

    // show BMI calculator
    $('#BMI-li').on("click", function(){
        console.log('BMI Calculator');
        bmiCalc();
        $('main').css('display', 'none');
        $('#menu-container').css('display', 'none');
    });
   


    // timer

    var fasting = false;
    var startTime = "";
    var startDay = "";
    var endTime = "";
    var endDay = "";

    // get value of fasting type
    var fastType = $('#type-selector').val();

    // add button to page'
    if (fasting === false){
        $('#start-btn').css("display", 'block');
        $('#end-btn').css('display', 'none');
    } else {
        $('#start-btn').css("display", 'none');
        $('#end-btn').css('display', 'block');
    }
 
    // start fast
    $('#start-btn').on("click", function(){
            startTime = moment().format('HH:mm:ss');
            startDay = moment().calendar();
            endTime = moment().add(fastType, 'hours').format('HH:mm');
            endDay = moment().add(fastType, 'hours').calendar();
            fasting=true;
            // show end fast button
            $('#start-btn').css("display", 'none');
            $('#end-btn').css('display', 'block');
    }); 

    var refreshTimer;
    var percent;

    refreshTimer = setInterval(function(){
        $('#start-time').text(startDay);
        $('#end-time').text(endDay);
        var timeDisplay = moment().subtract(startTime).format('HH:mm:ss');
        var elapsedTime = parseInt(fastType) - parseInt(timeDisplay);
        percent = Math.round((parseInt(timeDisplay)+1)/(parseInt(fastType)+1)*100);
        if (fasting==true){
        $('#digits-display').text(timeDisplay);
        $('#elapsed-time').text(elapsedTime);
        showPercent();
        }
        
    }, 500);
    // function to show percent / circle progress
    
    function showPercent(){
        $('#percent').text(percent+"%");
        var circleClass = "p"+(percent.toString());
        $('#circle').removeClass().addClass("progress-circle "+circleClass);
        if (percent > 50){
            $('#circle').addClass("over50"); 
        }
    };
        
    
    
    // function to show end fast screen
        
    function endFast(){
        $('main').css('display', 'none');
        $('#end-fast-screen').css('display', 'block');
        var fastEnded = moment().subtract(startTime).format('HH:mm:ss');
        $('#final-time').text(fastEnded);
        console.log("end fast working");
        // reset variables 
        fasting = false;
        startTime = "";
        startDay = "";
        endTime = "";
        endDay = "";
    }
    // close end screen
    $('#close-fast-screen').on("click", function(){
        $('#end-fast-screen').css('display', 'none');
        $('main').css('display', 'block');
    });
    
    $('#end-btn').on("click", function(){
        endFast();
    });

}); //end document ready 