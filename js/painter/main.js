const windowWidth = document.documentElement.clientWidth-17;
const windowHeight = document.documentElement.clientHeight-17;

const canvasW = windowWidth //4400; //windowWidth //800 //4400; //2200
const canvasH = windowHeight //2616; //windowHeight //800 //2616; //1308

let count = 0;
let count1 = 0;

const color = [
  //Purvitis
  {palette: [
    [0, 0, 100],
    [26, 13, 99],
    [345, 5, 92],
    [21, 13, 91],
    [210, 6, 82],
    [211, 19, 76],
    [21, 53, 89],
    [35, 84, 94],
    [23, 91, 85],
    [356, 25, 75],
    [323, 11, 75],
    ]},
  //greyscale
  {palette: [
    [51, 11, 71],
    [51, 11, 46],
    [51, 11, 96],
    [51, 11, 21],
    [51, 11, 86],
    ]},
  //2: Greyscale Orange
  {palette: [
    [207, 45, 25],
    [160, 24, 35],
    [76, 16, 65],
    [36, 27, 85],
    [20, 88, 96],
    [35, 15, 95],
    ]},
  //3: Pollock nr5  
  {palette: [
    [45, 65, 95],
    [360, 70, 40],
    [280, 20, 6],
    [40, 10, 55],
    [35, 15, 95],
    [355, 85, 65],
    ]},
  //4: white  
  {palette: [
    [0, 0, 100],
    ]}  
  ]

const bubble = {
  array: [],
  //OBJECT
  quantity: 4000,
  minSize: 0.4,
  maxSize: 0.4,
  // roundness: 1,
  // minStroke: 1, 
  // maxStroke: 10, 

  // rotationMin: 0,
  // rotationMax: 360,

  //COLORS
  // hue: 0, 
  // saturation: 0,
  // lightness: 0,
  alphaMin: 0.9,
  alphaMax: 1.0,

  //MOVEMENT - 1 is normal , less is faster, more is slower
  movement: 1,
};

function randomize() {

}

function relativeSize(){
  const relativeSize = canvasW/1000;
  bubble.minSize = bubble.minSize * relativeSize;
  bubble.maxSize = bubble.maxSize * relativeSize;
  bubble.movement = bubble.movement * relativeSize;
}


function setup(){
  colorMode(HSB, 360, 100, 100);
  createCanvas(canvasW, canvasH);
  background(0, 0, 0);
  relativeSize();

  // let hex = '#ddffdd' //45 65 95
  // hsl = rgbToHsl(242, 203, 85);
  // let hsl = hexToHSL(hex);
  // console.log(hsl);

  // for(i = 0; i < bubble.quantity; i++ ){
  //   bubble.array[i] = 
  //   new Bubble(random(0, width), random(0, height), random(bubble.minSize, bubble.maxSize), 
  //   bubble.alphaMin, bubble.alphaMax);
  // }
}


function draw() {  
  if(bubble.array.length>bubble.quantity){
    bubble.array.splice(0, 1);
  }
  else if(bubble.array.length<bubble.quantity){
    bubble.array.push(
      new Bubble(random(0, width), random(0, height), random(bubble.minSize, bubble.maxSize), 
      bubble.alphaMin, bubble.alphaMax))
  }

  for(i = 0; i < bubble.array.length; i++ ){
    bubble.array[i].move();
    bubble.array[i].show();
  }
}

function mouseClicked() {
  bubble.quantity++;
  bubble.array.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize), 
    bubble.alphaMin, bubble.alphaMax))
}

function mouseDragged() {
  bubble.quantity++;
  bubble.array.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize), 
    bubble.alphaMin, bubble.alphaMax))
}
