$(document).ready(function(){
    console.log("js file working");
    
    // open hamburger menu
    function openMenu(){
        $('#hamburger').css("display", "none");
        $('#menu').css("display", "block");
    }
    // add openMenu to onclick
    $('#hamburger').on("click", openMenu);
    
    //close hamburger menu
    function closeMenu(){
        $('#menu').css("display", "none");
        $('#hamburger').css('display', 'block');
    }
    // add closeMenu to onclick
    $('#close').on("click", closeMenu);

// close menu when opening new page
$('li.menu-li').on("click", closeMenu);

    //BMI Calculator
    function bmiCalc() {

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
                async: true,
                crossDomain: true,
                url: "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight + "",
                method: "GET",
                headers: {
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
    // run Bmi calc
    bmiCalc();


    function calorieCalc(){

        $('#submitBTN').on('click', function(event) {
            event.preventDefault();
            let ingrd=$('#Ingradient').val();
             let quantity=$('#Quantity').val();
            console.log(ingrd);
            console.log(quantity);

            var settings = {
                async: true,
                crossDomain: true,
                url: "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=" +quantity + "%20" +ingrd + "",
                method: "GET",
                headers: {
                    "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
                    "x-rapidapi-key": "0157ded83emshe3bc01cf91c87e5p150d98jsnc0f8cffc1c49"
                }
            }
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                let calories=response.calories;

                //results
                $('#cal-results').append('<hr>');
                $('#cal-results').append('<p class="lead"><b>Calories: </b>' + calories + '</p>');
            });
        })
    }
// run calorie calculator
calorieCalc();
   
    

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

    // get value of fasting type
    start.type = $('#type-selector').val();
    

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
            // get value of fasting type
            start.type = $('#type-selector').val();
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
        // show fasting message
        if (start.fasting===true){
        $('#fasting-state-message').text("You're fasting!");
        $('#start-finish-times').css("display", "flex");
        } else {
        $('#fasting-state-message').text("");
        $('#start-finish-times').css("display", "none");
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
        // reset display
        $('#digits-display').text("00:00:00");
        $('#elapsed-time').text("");
        // show start button
        // show end fast button
        $('#start-btn').css("display", 'block');
        $('#end-btn').css('display', 'none');
        // update show previous fasts
        showPreviousFasts();
    }    
    $('#end-btn').on("click", function(){
        endFast();
    });

    // previous fasts graph
    function showPreviousFasts(){
    // check if any fasts are stored in local storage
    $('#graph-container').empty();
    if (previousFasts.length >= 1){
        var graphValDiv = $("<div id='graph-values'></div>");
        for (var i = 24;i > 5; i = i-2){
            var graphLabel = $("<p class='graph-label'>"+i+"</p>");
            graphValDiv.append(graphLabel);
        }
        $('#graph-container').append(graphValDiv);
    for (var i = 0; i < previousFasts.length; i++){
        var graphDiv = $("<div class='graph-column'></div>");
        var graphEat = $("<div class='graph-eat graph-bar'></div>");
        var graphFast  = $("<div class='graph-bar graph-fast'></div>");
        // calculate bar height
        if (previousFasts[i] <= 6){
            graphFast.css("height", "10px");
            graphEat.css("height", "190px");
        } else {
            graphFast.css("height", (previousFasts[i]-6)*10+"px");
            graphEat.css("height", (200-(previousFasts[i]-6)*10)+"px");
        }
        graphDiv.append(graphEat, graphFast)
        $('#graph-container').append(graphDiv);
    
    }}
    };
    showPreviousFasts();

    // close end screen
    $('#close-fast-screen').on("click", function(){
        $('#end-fast-screen').css('display', 'none');
        $('main').css('display', 'block');
    });
    


    //NYT article function
    function NYTquery() {

        //let healthFitness = 'Health & Fitness';

        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Health%20%26%20Fitness&api-key=tZIiJgEGHbCV0KpFDgTXFHQH8FF0pLDt";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            console.log(response);
            console.log(response.response.docs);
            console.log(response.response.docs[1].multimedia[19].url);

            $('#articleIMG1').append('<a href="' + response.response.docs[2].web_url + '" target="blank"><img src="https://static01.nyt.com/' + response.response.docs[2].multimedia[19].url + '"></a>');

            $('#articleHead1').append('<a href="' + response.response.docs[2].web_url + '" target="blank"><h2>' + response.response.docs[2].headline.main +'</h2></a>');
            $('#articleHead1').append('<p><strong>' + response.response.docs[2].snippet +'</strong></p>');
            $('#articleHead1').append('<p>' + response.response.docs[2].pub_date +'</p>');

            $('#articleIMG2').append('<a href="' + response.response.docs[3].web_url + '" target="blank"><img src="https://static01.nyt.com/' + response.response.docs[3].multimedia[19].url + '"></a>');

            $('#articleHead2').append('<a href="' + response.response.docs[3].web_url + '" target="blank"><h2>' + response.response.docs[3].headline.main +'</h2></a>');
            $('#articleHead2').append('<p><strong>' + response.response.docs[3].snippet +'</strong></p>');
            $('#articleHead2').append('<p>' + response.response.docs[3].pub_date +'</p>');

            $('#articleIMG3').append('<a href="' + response.response.docs[5].web_url + '" target="blank"><img src="https://static01.nyt.com/' + response.response.docs[5].multimedia[19].url + '"></a>');

            $('#articleHead3').append('<a href="' + response.response.docs[5].web_url + '" target="blank"><h2>' + response.response.docs[5].headline.main +'</h2></a>');
            $('#articleHead3').append('<p><strong>' + response.response.docs[5].snippet +'</strong></p>');
            $('#articleHead3').append('<p>' + response.response.docs[5].pub_date +'</p>');
        })
        
    }

    // Show NYT articles
    $(window).on("load",function(event) {
        event.preventDefault();
        NYTquery();
    })

// function to load example values
function demo(){
    previousFasts = [12, 20, 19, 14, 12, 15, 18];
    console.log("demo working");
    showPreviousFasts();
    // get value of fasting type
    start.type = $('#type-selector').val();
    start.hours = moment().add(10, 'hours').format('HH:mm:ss');
    start.minutes = moment().add(10, 'hours').format('mm');
    start.day = moment().add(10, 'hours').calendar();
    start.endtime = moment().add(start.type, 'hours').format('HH:mm');
    start.endday = moment().add(start.type, 'hours').calendar();
    start.fasting = true;
    storeCurrrentFast();
}
$('#demo-values').on("click", demo);




}); //end document ready 