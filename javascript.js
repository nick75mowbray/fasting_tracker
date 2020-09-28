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
   
    // LOCAL STORAGE
var previousFasts = [];
var start = {minutes: "", hours: "", day: "", type: "", endtime: "", endday: "", fasting: false};

var fastStorage = localStorage.getItem("fastStorage");
var currentFast = localStorage.getItem("currentFast");

init();
initPreviousFasts();

function renderStart(){
    console.log(start);
};

function init() {
    // check if local storage has been used else get data from local storage
    if(currentFast===null){
        console.log("nothing in storage");
    } else {
        start = JSON.parse(localStorage.getItem("currentFast"));
        console.log("get start"+start);
    }
    // Render buttons
    renderStart();
};

function initPreviousFasts() {
    // check if local storage has been used else get data from local storage
    if(fastStorage===null){
        console.log("nothing in storage");
    } else {
        previousFasts = JSON.parse(localStorage.getItem("fastStorage"));
    }
    // Render buttons
};


function storePrevious() {
    // store timeblock objects in local storage
    localStorage.setItem("fastStorage", JSON.stringify(previousFasts));
};
function storeCurrrentFast() {
    // store timeblock objects in local storage
    localStorage.setItem("currentFast", JSON.stringify(start));
};

    // TIMER

    var fasting = false;
    var startTime = "";
    var startMinutes = "";
    var startDay = "";
    var endTime = "";
    var endDay = "";

    // get value of fasting type
    start.type = $('#type-selector').val();
    // show fasting message
    if (start.fasting===true){
        $('#fasting-state-message').text("You're fasting!")
    } else {
        $('#fasting-state-message').text("");
    }

    // add button to page'
    if (start.fasting === false){
        $('#start-btn').css("display", 'block');
        $('#end-btn').css('display', 'none');
    } else {
        $('#start-btn').css("display", 'none');
        $('#end-btn').css('display', 'block');
    }
 
    // start fast
    $('#start-btn').on("click", function(){
            start.hours = moment().format('HH:mm:ss');
            start.minutes = moment().format('mm');
            start.day = moment().calendar();
            start.endtime = moment().add(start.type, 'hours').format('HH:mm');
            start.endday = moment().add(start.type, 'hours').calendar();
            start.fasting = true;
            // show end fast button
            $('#start-btn').css("display", 'none');
            $('#end-btn').css('display', 'block');
            // store in local storage
            console.log(start);
            storeCurrrentFast();
            renderStart();
    }); 

    var refreshTimer;
    var percent;

    refreshTimer = setInterval(function(){
        $('#start-time').text(start.day);
        $('#end-time').text(start.endday);
        var timeDisplay = moment().subtract(start.hours).format('HH:mm:ss');
        var minutes = moment().subtract(start.minutes, 'minutes').format('mm');
        minutes = parseInt(minutes)*1.67;
        var elapsedTime = parseInt(start.type) - parseInt(timeDisplay);
        var hours = parseInt(timeDisplay)*100;
        percent = Math.round((hours+minutes+1)/(parseInt(start.type)*100)*100);
        if (start.fasting==true){
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
        var fastEnded = moment().subtract(start.hours).format('HH:mm:ss');
        console.log(fastEnded);
        $('#final-time').text(fastEnded);
        console.log("end fast working");
        // reset variables 
        start = {minutes: "", hours: "", day: "", type: "", endtime: "", endday: "", fasting: false};
        storeCurrrentFast();
        if (previousFasts.length >= 7){
            previousFasts.unshift(parseInt(fastEnded));
            previousFasts.pop();
        } else {
            previousFasts.unshift(parseInt(fastEnded));
        }
        storePrevious();
    }

    // previous fasts graph
    function showPreviousFasts(){
    for (var i = 0; i < previousFasts.length; i++){
        var graphDiv = $("<div class='graph-column'></div>");
        var graphEat = $("<div class='graph-eat graph-bar'></div>");
        var graphFast  = $("<div class='graph-bar graph-fast'></div>");
        if (previousFasts[i] <= 6){
            graphFast.css("height", "10px");
            console.lo
            graphEat.css("height", "190px");
        } else {
            graphFast.css("height", (previousFasts[i]-6)*10+"px");
            graphEat.css("height", (200-(previousFasts[i]-6)*10)+"px");
        }
        graphDiv.append(graphEat, graphFast);
        $('#graph-container').append(graphDiv);
    }
    };
    showPreviousFasts();

    // close end screen
    $('#close-fast-screen').on("click", function(){
        $('#end-fast-screen').css('display', 'none');
        $('main').css('display', 'block');
    });
    
    $('#end-btn').on("click", function(){
        endFast();
    });




}); //end document ready 