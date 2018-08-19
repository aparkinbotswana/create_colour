document.addEventListener('DOMContentLoaded', function(){
  // this that I should consider using:
  // pointable.tipVelocity - what is a good way to use velocity in the use of the sketch program?

  // also, check the object to see where to get into in order to confirm if the connection to the Leap is working. excuted some code that makes to screen go pretty to indicate to user that the Leap connected and ready to use.

  // finds the height and width of the screen that the program is being run on so that these values can be passed as parameters for the canvas height and width. Honeybadger don't give a shit.


  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  const canvasElement = document.getElementById("sketch");
  const displayArea = canvasElement.getContext("2d");

  const changeAttr = (el, attr, attrProperty) => {
    document.querySelector(el).setAttribute(attr, attrProperty);
  }//gets the element. changes attribute, Style in the case of css.

  const drawSketch = (canvasX, canvasY) => {
    displayArea.lineTo(canvasX, canvasY);
    displayArea.stroke();
  }

  const responsiveCanvas = () => {
    // c.attr('width', $(container).width()); //max width
    // c.attr('height', $(container).height()); //max height
    changeAttr('#sketch', 'width', )
    changeAttr('#sketch', 'height', )
  }


  changeAttr('#canvas-container', 'width', `${windowWidth};`)
  changeAttr('#canvas-container', 'height', `${windowHeight};`)
  // adjusts height and width of canvas to make it equal to screen dimension

  // window.addEventListener("resize", function () {
  //   responsiveCanvas()
  // });
  const canvasContainerWidth = document.getElementById("canvas-container").getBoundingClientRect().width
  const canvasContainerHeight = document.getElementById("canvas-container").getBoundingClientRect().height


  Leap.loop(function(frame){

      // let windowHeight = window.innerHeight;
      // let windowWidth = window.innerWidth;
      // // console.log(windowWidth);

      //   changeAttr('#sketch', 'width', `${windowWidth};`)
      //   changeAttr('#sketch', 'height', `${windowHeight};`)


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
        // save current pixel x and y into variable to be accessed in next loop
        // try something like fillRect().fillStyle?
        // see if there is a way to simply clear the previous pixel rather than change the colour
        // BEST option would be some code that checks the colour of the current pixel and inverts so as to always display a 'cursor' relative to your position. Needed because this will work even if you are hovering over a pixel which has already been coloured. WORK TOWARDS THIS SOLUTION
        let currentPixelX = canvasX
        let currentPixelY = canvasY
        // let previousPixel
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
