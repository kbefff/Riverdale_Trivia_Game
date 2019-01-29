// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).


// array of literalls holding quiz questions
var questions = [{
        question: "Who in Riverdale has never had a paernt in prison?",
        answers: [
            "Betty",
            "Jughead",
            "Archie"
        ],
        correctAnswer: "Archie",
        image: "..images/Archie.jpg"
    },
    {
        question: "What does Archie's dad do for a living?",
        answers: [
            "He owns a construction company",
            "He's unemployed",
            "He's an accountant"
        ],
        correctAnswer: "He owns a construction company",
        image: "..images/archie_dad.jpg"
    },
    {
        question: "WHat is the name of the Riverdale niker gang?",
        answers: [
            "The Bulldogs",
            "The Serpents",
            "The Vipers"
        ],
        correctAnswer: "The Serpents",
        image: "..images/serpents.jpg"
    },
    {
        question: "Which two Riverdale families have a long standing blood feud",
        answers: [
            "The Andrews and the Coopers",
            "The Andrews and the Jones",
            "The Blossoms and the Coopers"
        ],
        correctAnswer: "he Blossoms and the Coopers",
        image: "..images/cooper_blossom.jpg"
    },
    {
        question: "What is Jughead's sister's name?",
        answers: [
            "April",
            "Junebug",
            "Jellybean"
        ],
        correctAnswer: "Jellybean",
        image: "..images/jughead.jpg"
    }
]

$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on('click', '#reset', function () {
    game.reset();
})



var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("Time is up!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2> Time Remaining: <span id='counter'> 30 </span> Seconds</h2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
            console.log(timer)
        }
    },
    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwraper').html('<h2>Out of time!</h2>');
        $('#subwraper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }


    },
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>You're all done!</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect " + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $('#subwrapper').append("<button id='reset'>Reset</button>")

    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function () {
        console.log("correct!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You got it right!</h2>');
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

        var pic = questions[game.currentQuestion].image;
        var contentImage = $("<img>").attr("src", pic);
        $('#subwrapper').append('<div>' + contentImage + '</div>');



    },
    answeredIncorrectly: function () {
        console.log("incorrect!")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>Sorry, this is the wrong answer!<h2>');
        $('#subwrapper').append('<h3>The Correct Answer Is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },
    reset: function () {
        clearInterval(timer);
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    },

}