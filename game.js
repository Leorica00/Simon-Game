var color = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userColorPattern = [];
var level = 0;
var currentColor = 0;
var weGood = false;


$(document).on("keypress", function(ev) {
  console.log(ev.key);
  if (ev.key === "a" || ev.key === "A") {
  } else {

    if (weGood === false) {
      weGood = true;
      nextSequence();
      $(".btn").on("click", function(event) {
        if (weGood) {
          var userColor = event.target.id;
          userColorPattern.push(userColor);
          animatePress(userColor);
          makeSound(userColor, userColor);
          console.log(currentColor);
          checkColor(currentColor);
          currentColor += 1;

        }

      })

    }

  }
});


function checkColor(colorIndex) {

  console.log(colorIndex);
  if (gamePattern[colorIndex] === userColorPattern[colorIndex]) {
    console.log("success")
    if (gamePattern.length === userColorPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("go home");
    $("h1").text("press A button to try again");
    $("body").css("backgroundColor", "red");
    setTimeout(function() {
      $("body").css("backgroundColor", "#011F3F");
    }, 200);
    weGood = false;
    makeSound("wrong");
    level = 0;
    gamePattern = [];
    userColorPattern = [];
    currentColor = 0;
    $(".btn").off("click");
  }
}




function nextSequence() {
  userColorPattern = [];
  level += 1;
  $("h1").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = color[randomNumber];
  gamePattern.push(randomColor);

  animatePress(randomColor);
  makeSound(randomColor);
  currentColor = 0;


  // setTimeout(function () {
  //   nextSequence();
  // }, 1000);

}




///animation ///
function animatePress(userChosenColor) {
  $("#" + userChosenColor)
    .fadeOut(100, function() {
      $("." + userChosenColor).addClass("pressed");
    })
    .fadeIn(100, function() {
      $("." + userChosenColor).removeClass("pressed");
    });
}
///make sound ?///
function makeSound(userChosenColor) {
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
}
