var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    return (userClickedPattern[currentLevel] === gamePattern[currentLevel]);
}

function startOver() {
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function wrongAnswer() {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);

    $("#" + randomColorChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
}

function ifNextSequence() {
    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

$(".btn").click(function() {
    userColorChosen = $(this).attr("id");
    animatePress(userColorChosen);
    playSound(userColorChosen);

    if(started){
        userClickedPattern.push(userColorChosen);
        if (checkAnswer(userClickedPattern.length - 1)) {
            ifNextSequence();
        } else {
            wrongAnswer();
        }
    }
});

$(document).keypress(function() {
    if (!started) {
        started = true;
        nextSequence();
    }
});
