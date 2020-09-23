$(document).ready(function(){
    function menu(){
        $('#menu-container').css('display', 'block');
        $('.close').css('display', 'flex')
    };

    function bmiCalc() {

        $('#bmi-div').append('<label for="age" id="ageLabel">Age</label>');
        $('#ageLabel').append('<input type="text" id="age"></input>');
        $('#ageLabel').append('<br>');
        $('#bmi-div').append('<label for="height" id="heightLabel">Height</label>');
        $('#heightLabel').append('<input type="text" id="height"></input>');
        $('#heightLabel').append('<br>');
        $('#bmi-div').append('<label for="weight" id="weightLabel">Weight</label>');
        $('#weightLabel').append('<input type="text" id="weight"></input>');
        $('#weightLabel').append('<br>');

        $('#bmi-div').append('<button id="submitBTN">submit</button>');

        $('#submitBTN').on('click', function(event) {
            event.preventDefault();

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
                console.log()

                let bmi = response.bmi;
                let health = response.health;
                let range = response.healthy_bmi_range;

                $('#bmi-div').append('<h3>BMI: ' + bmi + '</h3>');
                $('#bmi-div').append('<h3>Overall Health: ' + health + '</h3>');
                $('#bmi-div').append('<h3>Healthy BMI Range: ' + range + '</h3>');
            });
        
        })

        
    }

    bmiCalc();


}); //end document ready 