

$( document ).ready(function() {

  Leap.loop(function(frame){

    var hand = frame.hands[0];

    var red = hand.fingers[1].tipPosition[0]
    var green = hand.fingers[1].tipPosition[1]
    var blue = hand.fingers[1].tipPosition[2]

    // var red = 200
    // var green = 200
    // var blue = 200


    var r = red.toString();
    var g = green.toString();
    var b = blue.toString();


    for (var i = 0; i < frame.hands.length; i++) {

      // $('#output').css("background", "rgb("r + "," + g + "," + b")")
      $('body').css("background", "rgb(" + r + "," + g + "," + b + ")")


    }

    // output.innerHTML = framestring

    //attach to dom here, yo.
    // body.css()



  })
})
