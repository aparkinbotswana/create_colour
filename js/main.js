document.addEventListener('DOMContentLoaded', function(){
  // this that I should consider using:
  // pointable.tipVelocity - what is a good way to use velocity in the use of the sketch program?

  // also, check the object to see where to get into in order to confirm if the connection to the Leap is working. excuted some code that makes to screen go pretty to indicate to user that the Leap connected and ready to use.

  // finds the height and width of the screen that the program is being run on so that these values can be passed as parameters for the canvas height and width. Honeybadger don't give a shit.
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let canvasElement = document.getElementById("sketch");
  let displayArea = canvasElement.getContext("2d");

  const changeAttr = function(el, attr, attrProperty){
    document.querySelector(el).setAttribute(attr, attrProperty);
  }//gets the element. changes attribute, Style in the case of css.

  const drawSketch = function(canvasX, canvasY){
    displayArea.lineTo(canvasX, canvasY);
    displayArea.stroke();
  }



  changeAttr('#sketch', 'width', `${windowWidth};`)
  changeAttr('#sketch', 'height', `${windowHeight};`)
  // adjusts height and width of canvas to make it equal to screen dimension



  Leap.loop(function(frame){
    const thumb = frame.pointables[0];
    const indexFinger = frame.pointables[1];
    const middleFinger = frame.pointables[2];
    const pinkyFinger = frame.pointables[3];
    const ringFinger = frame.pointables[4];

    if(frame.pointables.length > 0){
      // Convert the normalized coordinates to span the canvas
      let interactionBox = frame.interactionBox;
      let normalizedPosition = interactionBox.normalizePoint(indexFinger.tipPosition, true);
      ////////// keep the normalizedPosition bit of code in mind. Might impact other code cause it specifically targets index finger. come back to it if need be
      let canvasX = canvasElement.width * normalizedPosition[0];
      let canvasY = canvasElement.height * (1 - normalizedPosition[1]);

      if (indexFinger.extended === true && middleFinger.extended === true) {
        let currentPixelX = canvasX
        let currentPixelY = canvasY
        let previousPixel
        previousPixel.fillStyle = 'white'
        currentPixel.fillRect(canvasX, canvasY, 1, 1)
        currentPixel.fillStyle = 'black'
        displayArea.moveTo(canvasX, canvasY)
        return
      }
      // canvasElement.width = canvasElement.width; //clear
      
      //Get a pointable, in this case the index finger and normalize the tip position
      // let speed = indexFinger.tipVelocity;
      // console.log(speed);
      drawSketch(canvasX, canvasY);

      
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
