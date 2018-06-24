document.addEventListener('DOMContentLoaded', function(){

  // also, check the object to see where to get into in order to confirm if the connection to the Leap is working. excuted some code that makes to screen go pretty to indicate to user that the Leap connected and ready to use.

  // finds the height and width of the screen that the program is being run on so that these values can be passed as parameters for the canvas height and width. Honeybadger don't give a shit.
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let canvasElement = document.getElementById("sketch");
  let displayArea = canvasElement.getContext("2d");

  function changeAttr(el, attr, attrProperty){
    document.querySelector(el).setAttribute(attr, attrProperty);
  }//gets the element. changes attribute, Style in the case of css.

  changeAttr('#sketch', 'width', `${windowWidth};`)
  changeAttr('#sketch', 'height', `${windowHeight};`)
  // adjusts height and width of canvas to make it equal to screen dimension

  Leap.loop(function(frame){
    if(frame.pointables.length > 0){
      // canvasElement.width = canvasElement.width; //clear
      
      //Get a pointable and normalize the tip position
      let pointable = frame.pointables[0];
      // let speed = pointable.tipVelocity;
      // console.log(speed);
      let interactionBox = frame.interactionBox;
      let normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
      
      // Convert the normalized coordinates to span the canvas
      let canvasX = canvasElement.width * normalizedPosition[0];
      let canvasY = canvasElement.height * (1 - normalizedPosition[1]);
      displayArea.lineTo(canvasX, canvasY);
      displayArea.stroke();
      //we can ignore z for a 2D context
		}

    // if (frame.hands.length === 1) {
    //   const index = frame.hands[0].fingers[1].tipPosition.map(function(p){
    //     return parseInt(Math.abs(p) / 600 * 255);
    //   }).join(','); // takes the xyz coordinates of the tip of the index finger and turns it into an array.
    //   const rgb = `rgb(${index})`;
    //   window.document.body.style.backgroundColor = rgb; // passes the array value in as RGB for the background colour.
    // } // Changes screen colour!
  })
}, false);
