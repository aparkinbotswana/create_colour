
$( document ).ready(function() {


  Leap.loop(function(frame){
    if (frame.hands.length === 1) {
      const index = frame.hands[0].fingers[1].tipPosition.map(function(p){
        return parseInt(Math.abs(p) / 600 * 255);
      }).join(',');

      const rgb = `rgb(${index})`;
      window.document.body.style.backgroundColor = rgb;

    }
  })
})
