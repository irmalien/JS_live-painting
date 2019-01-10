    //TODO apvienot mainīgos objektā
    // const {alphaMin, alphaMax} = bubble;

function filters(){
  // count++;
  // if (count == 300){
  //   count =0;
  //   filter(BLUR, 1);
  //   filter(DILATE);
  // }
  // if (count == 100){filter(BLUR, 4)}
  // console.log(count)
  // background(0, 0, 100, 0.005);
}

//object-array example
var ourPets = [
  {
    animalType: "cat",
    names: [
      "Meowzer",
      "Fluffy",
      "Kit-Cat"
    ]
  },
  {
    animalType: "dog",
    names: [
      "Spot",
      "Bowser",
      "Frankie"
    ]
  }
];
ourPets[0].names[1]; // "Fluffy"
ourPets[1].names[0]; // "Spot"