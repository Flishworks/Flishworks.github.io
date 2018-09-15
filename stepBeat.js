// $(document).ready(function() {
//   if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
//   document.getElementById('moApi').innerHTML = 'Generic Sensor API';
//
//   let lastReadingTimestamp;
//   let accelerometer = new LinearAccelerationSensor();
//   accelerometer.addEventListener('reading', e => {
//     if (lastReadingTimestamp) {
//       intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
//     }
//     lastReadingTimestamp = accelerometer.timestamp
//     accelerationHandler(accelerometer, 'moAccel');
//     });
//     accelerometer.start();
//
//     if ('GravitySensor' in window) {
//       let gravity = new GravitySensor();
//       gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
//       gravity.start();
//     }
//
//     let gyroscope = new Gyroscope();
//     gyroscope.addEventListener('reading', e => rotationHandler({
//       alpha: gyroscope.x,
//       beta: gyroscope.y,
//       gamma: gyroscope.z
//     }));
//     gyroscope.start();
//
//   } else if ('DeviceMotionEvent' in window) {
//     document.getElementById('moApi').innerHTML = 'Device Motion API';
//
//     var onDeviceMotion = function (eventData) {
//       accelerationHandler(eventData.acceleration, 'moAccel');
//       accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
//       rotationHandler(eventData.rotationRate);
//       intervalHandler(eventData.interval);
//     }
//
//     window.addEventListener('devicemotion', onDeviceMotion, false);
//   } else {
//     document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
//   }
//
//   function accelerationHandler(acceleration, targetId) {
//     var info, xyz = "[X, Y, Z]";
//
//     info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
//     info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
//     info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
//     document.getElementById(targetId).innerHTML = info;
//   }
//
//   function rotationHandler(rotation) {
//     var info, xyz = "[X, Y, Z]";
//
//     info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
//     info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
//     info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
//     document.getElementById("moRotation").innerHTML = info;
//   }
//
//   function intervalHandler(interval) {
//     document.getElementById("moInterval").innerHTML = interval;
//   }
//
// });


let sensor = new LinearAccelerationSensor();
sensor.start();

sensor.onreading = () => {
  //console.log("Acceleration along X-axis: " + sensor.x);
  //console.log("Acceleration along Y-axis: " + sensor.y);
  //console.log("Acceleration along Z-axis: " + sensor.z);
}

function setup(){
  var canvas = createCanvas(getDocWidth()*.5, getDocHeight()*.5);
  canvas.parent("p5canvas");  //puts canvas in the p5canvas div
  canvas.position(getDocWidth()*.25,250);

  //initialize history array
  for (this.i=0;this.i<100;this.i++){
    history[this.i]=0;
  }
}

var T=0;

function draw(){
  T+=1;//for timing
  background(200);
  drawGrid();
  drawHistory();
}

function drawGrid(){
  stroke(50);
  strokeWeight(1);
  for (this.x=0;this.x<10;this.x++){
    line(width/10*x,0,width/10*x,height);
  }
  for (this.y=0;this.y<10;this.y++){
    line(0,height/10*y,width,height/10*y);
  }
}

function drawHistory(){
  stroke(200,100,0);
  strokeWeight(2);
  for (this.i=0;this.i<99;this.i++){
    line(width/200*this.i,history[this.i],width/200*(this.i+1),history[this.i+1])
    history[this.i]=history[this.i+1];
  }
  line(99*width/200,history[99],width/2,sensor.y*200+getDocHeight()*.25);
  history[99]=sensor.y*200+getDocHeight()*.25;
}
