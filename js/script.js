
var mode = "normal",
    compSequence = [],
    userSequence = [],
    count = 0;


///Get items from DOM
var $green = $('#greenBtn'),
    $red = $('#redBtn'),
    $blue = $('#blueBtn'),
    $yellow = $('#yellowBtn'),
    $start = $('#start'),
    $reset = $('#reset'),
    $strict = $('#strict'),
    $sound1 = $('#sound1'),
    $sound2 = $('#sound2'),
    $sound3 = $('#sound3'),
    $sound4 = $('#sound4'),
    $outer = $('#outer'),
    $victory = $('#victory'),
    $countNumber = $('#countNumber');

///add correct number to the computer array
green = function() {
    compSequence.push(1);
};
red = function() {
    compSequence.push(2);
};
blue = function() {
    compSequence.push(3);
};
yellow = function() {
    compSequence.push(4);
};


//play sound and light
playGreen = function() {
    $($sound1)[0].play();
    $($green).removeClass("green");
    $($green).addClass("pink");
    setTimeout(function() {
        $($green).addClass("green");
        $($green).removeClass("pink");
    }, 400)
};
playRed = function() {
    $($sound2)[0].play();
    $($red).removeClass("red");
    $($red).addClass("pink");
    setTimeout(function() {
        $($red).addClass("red");
        $($red).removeClass("pink");
    }, 400)
};
playBlue = function() {
    $($sound3)[0].play();
    $($blue).removeClass("blue");
    $($blue).addClass("pink");
    setTimeout(function() {
        $($blue).addClass("blue");
        $($blue).removeClass("pink");
    }, 400)
};
playYellow = function() {
    $($sound4)[0].play();
    $($yellow).removeClass("yellow");
    $($yellow).addClass("pink");
    setTimeout(function() {
        $($yellow).addClass("yellow");
        $($yellow).removeClass("pink");
    }, 400)
};

///playback the order
playSequence = function() {

    for (var i=0;i< compSequence.length;i++) {
        (function(index) {
            setTimeout(function(){
                switch (compSequence[index]) {
                    case 1:
                        playGreen();
                        break;
                    case 2:
                        playRed();
                        break;
                    case 3:
                        playBlue();
                        break;
                    case 4:
                        playYellow();
                        break;
                }
            }, 1500 + (1000 * index));
        })(i);
    }

};

////reset Function
resetGame = function() {
    userSequence = [];
    compSequence = [];
    count = 0;
    $($countNumber).hide().text("--").fadeIn(750);
};

///shake game if incorrect
shake = function(){
  $($outer).effect("shake", 500);
};

///check match
compareSeq = function() {
    var fail = false;
    ////if they are not the same length, do not add an extra button
    if (userSequence.length !== compSequence.length) {
        ///check that current sequence is valid
        for (var j = 0; j < userSequence.length; j++) {
            if (compSequence[j] !== userSequence[j]) {
                fail = true;
            }
        }
        if (fail) {
            ///check for strict mode
            if (mode === "strict") {
                shake();
                resetGame();
            }
            else {
                shake();
                userSequence = [];
                playSequence();
            }
        }
    }
    ///if they are the same length, check to see if arrays are the same and add extra
    else {
        for (var i = 0; i < compSequence.length; i++) {
            if (compSequence[i] !== userSequence[i]) {
                fail = true;
            }
        }
        ///winner
        if (count === 20 && !fail) {
            resetGame();
            $($outer).fadeOut(1000);
            $($victory).fadeIn(1000);

            setTimeout(function() {
                $($victory).fadeOut(1000);
                $($outer).fadeIn(1000);
            }, 3000);
        }
        else if (!fail) {
            random();
            userSequence = [];
        }
        else {
            ///check for strict mode
            if (mode === "strict") {
                shake();
                resetGame();
            }
            else {
                shake();
                userSequence = [];
                playSequence();
            }
        }
    }

};


///click on the buttons
$($green).click(function() {
    userSequence.push(1);
    playGreen();
    compareSeq();
});
$($red).click(function() {
    userSequence.push(2);
    playRed();
    compareSeq();
});
$($blue).click(function() {
    userSequence.push(3);
    playBlue();
    compareSeq();
});
$($yellow).click(function() {
    userSequence.push(4);
    playYellow();
    compareSeq();
});



random = function() {
    window.number = Math.floor((Math.random())*4)+1;

    switch (number) {
        case 1: green();
            break;
        case 2: red();
            break;
        case 3: blue();
            break;
        case 4: yellow();
            break;
    }
    count++;
    $($countNumber).hide().text(count).fadeIn(750);
    ///play computer sequence here
    playSequence();
};

///start the game

$($start).click(function() {
    random();
});

///Enable or disable strict mode///
$($strict).click(function() {
    $(this).toggleClass('active');
    if (mode === "normal") {
        mode = "strict";
    }
    else {
        mode = "normal";
    }
});

//reset////
$($reset).click(function(){
    resetGame();
});

/*Bouncy!*/

