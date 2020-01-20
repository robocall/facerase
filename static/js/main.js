console.log("hello")


// Prefer camera resolution nearest to 1280x720.
var constraints = { video: { width: 1280, height: 720 } }; 

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  console.log(document.getElementById('videoElement'));
  init();
  faceTracker();
});

var count = 0;
function faceTracker() {
  requestAnimationFrame(faceTracker);
  
  if (count < 10) {
    console.log('count = ' + count);
    /*
    console.log('ctracka is');
    console.log(ctracker);*/
  }
  ++count;

  var positions = ctracker.getCurrentPosition();
  //console.log(positions);
  // positions = [[x_0, y_0], [x_1,y_1], ... ]
  // do something with the positions ...
  //requestAnimationFrame(drawLoop);
  cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
  //var tankImg = new Image();
  //tankImg.src = "https://www.pancomanagement.com/pentagon-city/wp-content/uploads/sites/2/2019/11/solid-color-desktop-backgrounds-chrislattaorg-white-background-png-4096_2160.png";
  //tankImg.src = "https://previews.123rf.com/images/enterphoto/enterphoto1701/enterphoto170100033/71224944-colorful-rainbow-flower-chrysanthemum-flower-background.jpg"
  
  cc.save();

  cc.beginPath();
  cc.strokeStyle =  "green" //'rgba(255, 255, 255, 0.01)'; // transparent
  //pointslist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 22, 21, 19, 0]
  pointslist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  for (idx of pointslist) {
    p = positions[idx]
    cc.lineTo(p[0], p[1]);
    if (count < 10) {
      console.log(p)
    }
  }
  for (idx of pointslist.reverse().slice(1,15)) {
    p = positions[idx]
    reflected = reflect(p, positions[1], positions[13])
    cc.lineTo(reflected[0], reflected[1]);
    if (count < 50) {
      console.log(reflected)
    }
  }

  //cc.fillStyle = '#FFFFFF';
  //cc.fill();
  cc.stroke();
  cc.clip(); 
  //cc.drawImage(tankImg, 0, 0, 1000, 1000);
  cc.drawImage(backgroundPhoto, 0, 0, width, height);
  cc.closePath(); // Close the current path.
  cc.restore();
  
}

/**
 * @brief Reflect point p along line through points p0 and p1
 *
 * @author Balint Morvai <balint@morvai.de>
 * @license http://en.wikipedia.org/wiki/MIT_License MIT License 
 * @param p point to reflect
 * @param p0 first point for reflection line
 * @param p1 second point for reflection line
 * @return object
 */
var reflect = function(p, p0, p1) {
    var dx, dy, a, b, x, y;

    dx = p1[0] - p0[0];
    dy = p1[1] - p0[1];
    a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
    b = 2 * dx * dy / (dx * dx + dy * dy);
    x = Math.round(a * (p[0] - p0[0]) + b * (p[1] - p0[1]) + p0[0]); 
    y = Math.round(b * (p[0] - p0[0]) - a * (p[1] - p0[1]) + p0[1]);

    return [x, y];
}


function init() {
  videoInput = document.getElementById('videoElement');

  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput);

  canvasInput = document.getElementById('drawCanvas');

  cc = canvasInput.getContext('2d');
  startbutton = document.getElementById('startbutton');
  startbutton.addEventListener('click', function(ev){
    takepicture();
    ev.preventDefault();
  }, false);

  backgroundPhoto = new Image();
  //backgroundPhoto.crossOrigin = 'anonymous';
  //backgroundPhoto.src = "https://previews.123rf.com/images/enterphoto/enterphoto1701/enterphoto170100033/71224944-colorful-rainbow-flower-chrysanthemum-flower-background.jpg"
  backgroundPhoto.src = "static/flower.jpg"

  width=800;
  height=450;
  // cc.save();
}

function takepicture() {
  if (width && height) {
    cc.drawImage(videoInput, 0, 0, width, height);
  
    var data = canvasInput.toDataURL('image/png');
    backgroundPhoto.setAttribute('src', data);
  } else {
    clearphoto();
  }
}


