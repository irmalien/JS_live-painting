const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;

const canvasW = windowWidth  //5606 //1000 //4400; //windowWidth //2200
const canvasH = windowHeight   //3737 //667 //2616; //windowHeight //1308

let count = 0;
let atomArray = [];
let atomQuantity = 0;
let colorsData; //imported json data

var texte;
let letstry;

// const atomQuantity2 ={
//   value: 10,

//   set( newValue, para ) { return; this.value = newValue },
//   get()           { return this.value; }
// },

const atom = {

  //OBJECT
  //lifetime: 0 = infinity?
  lifespan: 100,

  sizeMin: 3,
  sizeMax: 3,
  sizeRand: 0.05,

  // roundness: 1,
  // rotationMin: 0,
  // rotationMax: 360,

  // minStroke: 1, 
  // maxStroke: 10, 



  //COLORS
  colArray: [],
  colAlphaMin: 0.9,
  colAlphaMax: 1.0,

  //DYNAMICS (relative to atom radius)
  movVer: 0.5,
  movHor: 0.1,
  movTremble: 0.1,
  movSpeed: 0.5,
  movRandX: 0.0,
  movRandY: 0.5,
  movRandZ: 0.9,
};


// function relativeSize(){
//   const relativeSize = canvasW/1000;
//   atom.minSize = atom.minSize * relativeSize;
//   atom.maxSize = atom.maxSize * relativeSize;
//   atom.movement = atom.movement * relativeSize;
// }

function preload(){
  colorsData = loadJSON("data/palettes.json");
  img = loadImage('img/gustavs.jpg');

}

function selectPalette(size, white, black){
  let selectRand = floor(random(0, colorsData.palettes.length))

  if (size > colorsData.palettes[selectRand].length){
    size = colorsData.palettes[selectRand].length
  };

  for (let i=0; i<size; i++){
    let hslNew = hexToHSL(colorsData.palettes[selectRand][i])
    atom.colArray.push(hslNew);
  }

  if (white){
    let colorTemp = [0, 0, 100];
    atom.colArray.push(colorTemp);
  };

  if (black){
    let colorTemp = [0, 0, 0];
    atom.colArray.push(colorTemp);
  };
}



function setup(){
  colorMode(HSL, 360, 100, 100, 100);
  createCanvas(canvasW, canvasH);
  selectPalette(5, true, false);
  background(0, 0, 0);
}

  // requestAnimationFrame(draw);

function draw() {
  // translate(width/2, height/2);
  //  count++;
  // if (count == 10){
  //   count =0;
  //   background(0, 0, 0, 5);
  // }



  if(atomArray.length>atom){
    atomArray.splice(0, 1);
  }
  else if(atomArray.length<atomQuantity){
    atomArray.push(
      new Atom(random(0, width), random(0, height), atom))
  }
  for(i = atomArray.length-1; i >= 0; i-- ){
    if (atomArray[i].count(i) == false){
      // atomArray[i] = new Atom(random(0, width), random(0, height), atom);
      atomArray.splice(i, 1);
    }
    else {
      atomArray[i].resize();
      atomArray[i].move();
    }


    // atomArray[i].show();
  }
}



let mouseX1;
let mouseY1;
let mouseX2;
let mouseY2;

function mousePressed() {
  mouseX1 = mouseX;
  mouseY1 = mouseY;
}
function mouseReleased() {
  mouseX2 = mouseX;
  mouseY2 = mouseY;
  calcDirection()
  atomQuantity++;
  atomArray.push(
    new Atom(mouseX2, mouseY2, atom))
}

function calcDirection() {
  let x = mouseX2-mouseX1;
  let y = mouseY2-mouseY1;
  atom.movHor = x/windowWidth;
  atom.movVer = y/windowWidth;
  //map(col2, 0, 255, 0, 100)
}



function selectColor(){

}

// function mouseDragged() {
//   atomQuantity++;
//   atomArray.push(
//     new Atom(mouseX, mouseY, atom))
// }
