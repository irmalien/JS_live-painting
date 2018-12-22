const windowWidth = document.documentElement.clientWidth-17;
const windowHeight = document.documentElement.clientHeight-17;

const canvasW = 1000  //5606 //1000 //4400; //windowWidth //2200
const canvasH = 667   //3737 //667 //2616; //windowHeight //1308

let count = 0;

const bubble = {
  array: [],
  //OBJECT
  quantity: 50,
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
  movement: 3,
};

let palettesData;
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

function selectPalette(size){
  let selectRand = floor(random(0, palettesData.palettes.length))
  palette = palettesData.palettes[selectRand][0];

  if (size > palettesData.palettes[selectRand].length){
    size = palettesData.palettes[selectRand].length
  };

  for (let i=0; i<size; i++){
    let hslNew = hexToHSL(palettesData.palettes[selectRand][i])
    paletteArray.push(hslNew);
  }
}

function setup(){
  colorMode(HSL, 360, 100, 100, 100);
  createCanvas(canvasW, canvasH);
  selectPalette(5);
  background(0, 0, 0);

}


function draw() {
  //  count++;
  // if (count == 50){
  //   count =0;
  //   background(0, 0, 0, 5);
  // }

  if(bubble.array.length>bubble.quantity){
    bubble.array.splice(0, 1);
  }
  else if(bubble.array.length<bubble.quantity){
    bubble.array.push(
      new Bubble(random(0, width), random(0, height), random(bubble.minSize, bubble.maxSize)))
  }

  for(i = 0; i < bubble.array.length; i++ ){
    bubble.array[i].move();
    bubble.array[i].show();
  }
}

function mouseClicked() {
  bubble.quantity++;
  bubble.array.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize)))
}

function mouseDragged() {
  bubble.quantity++;
  bubble.array.push(
    new Bubble(mouseX, mouseY, random(bubble.minSize, bubble.maxSize)))
}
