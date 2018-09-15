var T=0;
var history =[]
var scalingFactor=10;
for (this.i=0;this.i<100;this.i++){ //fill array with zero
  history[this.i]=0;
}

let sensor = new LinearAccelerationSensor();
//let sensor = new Accelerometer();

sensor.start();
sensor.onreading = () => {
  for (this.i=0;this.i<100;this.i++){
    history[this.i]=history[this.i+1];
  }
  history[100]=sensor.y*scalingFactor;
  //console.log("Acceleration along X-axis: " + sensor.x);
  //console.log("Acceleration along Y-axis: " + sensor.y);
  //console.log("Acceleration along Z-axis: " + sensor.z);
}

function setup(){
  var canvas = createCanvas(getDocWidth(), getDocHeight());
  canvas.parent("p5canvas");  //puts canvas in the p5canvas div
  canvas.position(0,0);
}

function draw(){
  T+=1;//for timing
  background(25,50,75);
  drawGrid();
  drawHistory();
}

function drawGrid(){
  stroke(150,125,75);
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
  for (this.i=0;this.i<100;this.i++){
    line(width/100*this.i,history[this.i]+height/2,width/100*(this.i+1),history[this.i+1]+height/2)
  }
  //line(99*width/100,history[99],width,sensor.y*5+getDocHeight()*.5);
  //history[99]=sensor.y*5+getDocHeight()*.5;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function getDocWidth() {
    var D = document;
    return Math.max(
        D.body.scrollWidth, D.documentElement.scrollWidth,
        D.body.offsetWidth, D.documentElement.offsetWidth,
        D.body.clientWidth, D.documentElement.clientWidth
    );
}
