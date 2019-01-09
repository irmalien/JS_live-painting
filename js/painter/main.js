const windowWidth = document.documentElement.clientWidth-17;
const windowHeight = document.documentElement.clientHeight-17;

const canvasW = windowWidth  //5606 //1000 //4400; //windowWidth //2200
const canvasH = windowHeight   //3737 //667 //2616; //windowHeight //1308

let count = 0;
let bubbleArray = [];
let bubbleQuantity = 10;

const bubble = {

  //OBJECT
  minSize: 0.5,
  maxSize: 10,
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
  //DYNAMICS
  //vertical //gravity
  //horisontal //wind
  //speed
  //Jitter
  //

  movement: 3,
};

let palettesData; //imported json data
let palette;
let paletteArray = [];

function relativeSize(){
  const relativeSize = canvasW/1000;
  bubble.minSize = bubble.minSize * relativeSize;
  bubble.maxSize = bubble.maxSize * relativeSize;
  bubble.movement = bubble.movement * relativeSize;
}

function preload(){
  palettesData = loadJSON("data/palettes.json");
  img = loadImage('img/gustavs.jpg');

}

function selectPalette(size, white, black){
  let selectRand = floor(random(0, palettesData.palettes.length))

  if (size > palettesData.palettes[selectRand].length){
    size = palettesData.palettes[selectRand].length
  };

  for (let i=0; i<size; i++){
    let hslNew = hexToHSL(palettesData.palettes[selectRand][i])
    paletteArray.push(hslNew);
    
  }

  if (white){
    let colorTemp = [0, 0, 100];
    paletteArray.push(colorTemp);
  };

  if (black){
    let colorTemp = [0, 0, 0];
    paletteArray.push(colorTemp);
  };
}

function setup(){
  colorMode(HSL, 360, 100, 100, 100);
  createCanvas(canvasW, canvasH);
  selectPalette(5, true, false);
  background(0, 0, 0);
}


function draw() {
  //  count++;
  // if (count == 10){
  //   count =0;
  //   background(0, 0, 0, 5);
  // }

  if(bubbleArray.length>bubbleQuantity){
    bubbleArray.splice(0, 1);
  }
  else if(bubbleArray.length<bubbleQuantity){
    bubbleArray.push(
      new Bubble(random(0, width), random(0, height), random(bubble.minSize, bubble.maxSize)))
  }

  for(i = 0; i < bubbleArray.length; i++ ){
    bubbleArray[i].move();
    bubbleArray[i].show();
  }
}

function mouseClicked() {
  bubbleQuantity++;
  bubbleArray.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize)))
}

function mouseDragged() {
  bubbleQuantity++;
  bubbleArray.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize)))
}
