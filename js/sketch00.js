var circle = {
  x:0,
  y: 200,
  diameter: 10
};


var colorA = {
  r:255,
  g:0,
  b:0
}

var pointA = {
  x:100,
  y:50
}

function setup() {
  createCanvas(900, 600)
  background(0, 0, 0);
}

//TODO ideja: krāsu spektrs mouseX+mouseY+Scroll, hue, light, saturation. Rclick, copē un izvada krāsas kodu kādā no sistēmam.


function draw() {
  var r = random(0, 255)
  var g = random(0, 255)
  var b = random(0, 255)
  var a = random(0, 255)
  // var r = map(mouseX, 0, 600, 0, 255);
  // var b = map(mouseY, 0, 600, 255, 0);
  //background
  //ellipse

  noStroke();
  pointA.x = random(0, width)
  pointA.y = random(0, height)
  diameterA = random(0, 4)
  fill(r, r, r);

  ellipse(pointA.x, pointA.y, diameterA, diameterA )

  // function mouseWheel(event) {
  //
  //   //move the square according to the vertical scroll amount
  //   pos += event.delta;
  //       console.log(pos);
  //   //uncomment to block page scrolling
  //   return false;
  // };
}
