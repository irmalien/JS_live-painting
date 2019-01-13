// let img;
const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;

function preload(){
  // img - loadImage('kitten.jpg')
}
let d =8
let n =5
let c =0.01;
let k = 5/8;
let sliderD;
let sliderN;
let sliderC;
let sliderSize;
let angle = 0;
let count = 0;
let canv;

function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  // canv = createCanvas(1280, 720);
  // angleMode(DEGREES)
  w1=width
  h1=height
  sliderD=createSlider(1, 30, 15, 0.01) //6 //14
  sliderN=createSlider(1, 30, 30, 0.01) //17 //15
  sliderC=createSlider(1, 100, 4, 0.01)
  sliderSize=createSlider(10, 1000, 900, 1)
  frameRate(3)
  // z = TWO_PI-0.1

}

let angleStep = 0.000000
let trail = 200; //45
let trueCount = 0;
let middle = false;

function draw() {
  count++
  trueCount++
  if (trueCount >= 1500){
    middle = true;
  };

  if(count >= 18){
    count=0;
    if (middle == false){
      trail++;
    }
    else{
      trail--
    }
  }
  console.log(count, trueCount, trail, middle)
  console.log(d, n, c)
  console.log(frameRate())
  background(0)
  d=sliderD.value();
  n=sliderN.value();
  step=0.002;
  c=c+step;
  // c=sliderC.value();
  angleStep=angleStep-0.000000001;

  size=sliderSize.value();
  k= n/d;
  // w1++
  // h1++
  // z = z-0.1
  // r=r+0.1;
  let newC = c
  let alfa = 0;
  angle = angle+angleStep;
  translate(w1/2, h1/2);
  noFill()
  for(let i=250; i>=250-trail; i--){
    let newStep = i*(step/1000);
    newC = newC+newStep;
    alfa = alfa+0.5
    rotate(angle);
    beginShape();
    for (let a=0+TWO_PI/newC; a<TWO_PI*d; a+=TWO_PI/newC){
      const r= size*cos(k*a)
      const x = r*cos(a);
      const y = r*sin(a);
      stroke(40,240,250, alfa);
      strokeWeight(0.25);
      vertex(x,y);
    }
    endShape();
    // saveCanvas('rose'+count,'png')
  }


  
  // image(img, 0, 0, mouseX, mouseY)
  // ellipse(0, 0, 100, 100)
}