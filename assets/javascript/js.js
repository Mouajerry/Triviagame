$(document).ready(function () {
    var options = [
        {
            question: "Who is the main character telling the story?", 
            choice: ["Eric", "Ted", "Ben", "Jerry"],
            answer: 1,
            photo: "assets/gif/ted.webp"
         },
         {
             question: "Who's has been Ted's best friend the longest?", 
            choice: ["Jason Segal", "Robin Smulders", "Barney Patrick", "Marshall Eriksen"],
            answer: 3,
            photo: "assets/gif/marshall.gif"
         }, 
         {
             question: "What is the real name of the character playing Ted Mosby?", 
            choice: ["Josh Radnor", "Bob Saget", "Neil Patrick Harris", "Jason Segal"],
            answer: 0,
            photo: "assets/gif/ted1.webp"
        }, 
        {
            question: "Which character is married to Marshall Eriken?", 
            choice: ["Lilian Radnor", "Robin Sherbatsky", "Lily Aldrin", "Victoria Dunn" ],
            answer: 2,
            photo: "assets/gif/lily.webp"
        }, 
        {
            question: "Who is the girl that Ted keeps chasing?", 
            choice: ["Lily Aldrin", "Robin Sherbatsky", "Stella Zinman", "Victoria"],
            answer: 1,
            photo: "assets/gif/robin.webp"
        }, 
        {
            question: "Which girl does Barney ends up marrying?", 
            choice: ["Robin Sherbatsky", "Lily Aldrin", "Zoey Pierson", "Quinn Garvey" ],
            answer: 0,
            photo: "assets/gif/robin1.webp"
        }, 
        {
            question: "Who's the mother of Ted's Kids?", 
            choice: ["Zoey Pierson", "Cristin Milioti", "Tracy McConnell", "Jeanette Peterson"],
            answer: 2,
            photo: "assets/gif/tracy.gif"
        }, 
        {
            question: "What is the bar that they always goes to?", 
            choice: ["McGlaren's pub", "McKenna", "Macallan", "MacLaren" ],
            answer: 3,
            photo: "assets/gif/bang.webp"
        },
        {
            question: "What is one of Barney's Favorite Line?", 
            choice: ["Sup Girl", "Legen-Daddy!", "Challenge Accepted", "Hey Beautiful" ],
            answer: 2,
            photo: "assets/gif/chal.gif"
        },
        {
            question: "Robin Scherbatsky was a famous Canadian teen pop. What was the name of her charcter?", 
            choice: ["Robin Glitter", "Jessica Glitter", "Jessica Robins", "Robin Sparkles" ],
            answer: 3,
            photo: "assets/gif/spark.gif"
        }];
        
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })