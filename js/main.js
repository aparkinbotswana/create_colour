

$( document ).ready(function() {

  function concatData(id, data) {
    return id + ": " + data + "<br>"
  }

  var output = document.getElementById('output');
  var framestring = "", handstring = "", fingerstring = "";
  var hand, finger;

  var options = { enableGestures: true};

  Leap.loop(options, function(frame){
    framestring = concatData("frame_id", frame.id);
    framestring += concatData("num_hands", frame.hands.length);
    framestring += concatData("num_fingers", frame.fingers.length);
    framestring += "<br>";

    // having a fit over the extra argument in for loop. WTF does it even mean?
    for (var i = 0; i < frame.hands.length; i++) {
      hand = frame.hands[i];
      handstring = concatData("hand_type", hand.type);
      handstring += concatData("pinch_strength", hand.pinchStrength);
      handstring += concatData("grab_strength", hand.grabStrength);

      framestring += handstring;
    }

    output.innerHTML = framestring;

  })



  // may not need below code. double check. Leap.js library may manage this already.

  // var ws;
  //
  // // Support both the WebSocket and MozWebSocket objects
  // if ((typeof(WebSocket) == 'undefined') &&
  //     (typeof(MozWebSocket) != 'undefined')) {
  //   WebSocket = MozWebSocket;
  // }
  //
  // // Create the socket with event handlers
  // function connectToWebSocket() {
  //   // Create and open the socket
  //   ws = new WebSocket("ws://localhost:6437/v4.json");
  //
  //   // On successful connection
  //   ws.onopen = function(event) {
  //     var enableMessage = JSON.stringify({enableGestures: true});
  //     ws.send(enableMessage); // Enable gestures
  //     var backgroundMessage = JSON.stringify({background: true});
  //     ws.send(backgroundMessage); // Get frames in background
  //     console.log("open");
  //   };
  //
  //   // On message received
  //   ws.onmessage = function(event) {
  //       var obj = JSON.parse(event.data);
  //       var str = JSON.stringify(obj, undefined, 2);
  //       if(obj.id){
  //           console.log("Frame data for " + obj.id);
  //       } else {
  //           console.log("message " + event.data);
  //       }
  //   };
  //
  //   // On socket close
  //   ws.onclose = function(event) {
  //     ws = null;
  //     console.log("close");
  //   }
  //
  //   // On socket error
  //   ws.onerror = function(event) {
  //     console.log("error");
  //   };
  // }
  //
  // connectToWebSocket();

})
