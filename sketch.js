/*
Data and machine learning for artistic practice
Week 7

Style transfer on a webcam

*/

let style1,
    style2,
    video,
    img,
    graphics,
    graphic2;

function setup() {
  createCanvas(320, 240);

  // load webcam and hide it, videoLoaded callback for when its available
  video = createCapture(VIDEO, videoLoaded);
  video.size(320, 240);
  video.hide();
  
  // create graphics, you can image this like a second canvas, only invisible
  graphics = createGraphics(320, 240);
      graphics2 = createGraphics(320, 240);
}

function videoLoaded(stream) {
  // load in the style transfer model
  style1 = ml5.styleTransfer("models/udnie", modelLoaded); // try out mathura too!
style2 = ml5.styleTransfer("models/mathura", modelLoaded); // try out mathura too!
}

function modelLoaded() {
  // model loaded
  console.log("Model loaded");
   
  // start the transfer of style
  transferStyle();
}

function transferStyle() {
  // we transfer based on graphics, graphics contains a scaled down video feed
  style1.transfer(graphics, function(err, result) {
    let tempDOMImage = createImg(result.src).hide();
    img = tempDOMImage;
    tempDOMImage.remove(); // remove the temporary DOM image
    
    // recursively call function so we get live updates
    transferStyle();
  });
    style2.transfer(graphics2, function(err, result) {
    let tempDOMImage = createImg(result.src).hide();
    img = tempDOMImage;
    tempDOMImage.remove(); // remove the temporary DOM image
    
    // recursively call function so we get live updates
    transferStyle();
  });

}


function draw(){
  // Switch between showing the raw camera or the style
  if (img) {
    image(img, 0, 0, 320, 240);
   Line();
  }
    
  
  // this puts the video feed into the invisible graphics canvas
  graphics.image(video, 0, 0, 320, 240);
    graphics2.image(video, 0, 0, 320, 240);
}

function Line()
{
       var sinc = 128 + sin(frameCount/50) * 128;
	var framec = 128 + cos(frameCount/30) * 128;
	
  fill(framec, random(0,255));
	rect(0, 0, width, height);
	
	var x = width/2 + cos(frameCount/30) * 120;
	var y = height/2 + sin(frameCount/30) * 120;

	stroke(sinc, 100);
	for (var i = 0; i < width; i += 10) {
		line(i, 0, x, y);
	}
	for (var i = 0; i < width; i += 10) {
		line(i, height, x, y);		
	}
	for (var i = 0; i < height; i += 10) {
		line(0, i, x, y);		
	}
	for (var i = 0; i <= height; i += 10) {
		line(width, i, x, y);		
	}
}