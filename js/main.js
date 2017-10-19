
$( document ).ready(function() {

  // finds the height and width of the screen that the program is being run on so that these values can be passed as parameters for the canvas height and width. Honeybadger don't give a shit.
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();


  // adjusts height and width of canvas to make it equal to screen dimension
  $('#output').css({height: windowHeight});
  $('#output').css({width: windowWidth});


  console.log(windowWidth);
  console.log(windowHeight);


  Leap.loop(function(frame){
    if (frame.hands.length === 1) {
      const index = frame.hands[0].fingers[1].tipPosition.map(function(p){
        return parseInt(Math.abs(p) / 600 * 255);
      }).join(','); // takes the xyz coordinates of the tip of the index finger and turns it into an array.
      const rgb = `rgb(${index})`;
      window.document.body.style.backgroundColor = rgb; // passes the array value in as RGB for the background colour.
      $('body').html(rgb).css('color', rgb,).css('filter', 'invert(1)') //makes the text colour inverse to background colour.

      if (frame.hands[0].fingers[1].tipPosition[2] < -50) {
        console.log(frame.hands[0].fingers[1].tipPosition[2]);
        // getElementsByTagName('html').css("border": "green solid 1px");
      }
      // getElementsByTagName('html').css("border": "red solid 1px");
    }
  })
})
