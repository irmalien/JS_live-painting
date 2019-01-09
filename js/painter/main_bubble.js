class Bubble {
  constructor(_x, _y, _radius) {
    //TODO apvienot mainīgos objektā
    const {alphaMin, alphaMax} = bubble;
    //TODO cleanUp variables!!!
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    // this.diameter = this.radius*2;
    // this.roundness = bubble.roundness;
    
    this.alphaMin = bubble.alphaMin;
    this.alphaMax = bubble.alphaMax;

    // this.strokeWeightMin;
    // this.strokeWeightMax;

    //MOVEMENT
    this.xoff1 = random(1000);
    this.xoff2 = random(1000)
    this.xoff3 = random(1000)
    //NB Between 1(random) and 0(flat) 
    this.incrementVerySlow = random(0.0001, 0.0001)
    this.incrementSlow = random(0.001, 0.005)
    this.incrementNormal = random(0.01, 0.005)
    this.move1 = random(0.2);
    this.move2 = random(-0.1, 0.1);

    //OBJECT TYPE
    //TODO solve how to apply in different situations
    this.type = this.selectType(0.5, 0.9, 1);

    //COLOR
    this.colorScheme = paletteArray;
    this.randomColor = int(random(0, this.colorScheme.length));

    this.h = this.colorScheme[this.randomColor][0];
    this.s = this.colorScheme[this.randomColor][1];
    this.l = this.colorScheme[this.randomColor][2];
    this.h_shade = this.h;
    this.s_shade = this.s;
    this.l_shade = this.l;
    this.a = random(this.alphaMin, this.alphaMax);

  }
  selectType(p1, p2, pTotal){
    const probability = random(pTotal);
    let variation = null;
    if (probability < p1){variation = 'A'}
    else if (probability < p2){variation = 'B'}
    else {variation = 'C'}
    return variation;
  }
  //====MOVE===================
  move(){
    this.xoff1 += this.incrementSlow;
    this.xoff2 += this.incrementNormal;
    this.xoff3 += this.incrementNormal;
    this.radius = this.changeRadius(this.type, bubble.minSize, bubble.maxSize, this.xoff3);
    this.x = this.moveDirection(this.x, this.radius, this.move1)
    this.y = this.moveDirection(this.y, this.radius, 0.1);
    this.x = this.moveTremble(this.x, this.radius, this.move1);
    this.y = this.moveTremble(this.y, this.radius, this.move1);
    this.x = this.movePerlin(this.x, this.radius, -0.5, 0.5, this.xoff1);
    this.y = this.movePerlin(this.y, this.radius, -0.5, 0.5, this.xoff2);
    this.edgeless();
  }

  changeRadius(type, minSize, maxSize, xoff){
    switch(type) {
      case "A":
        maxSize = maxSize/2
        break;
      case "B":
        break;
      case "C":
        maxSize = maxSize*2
        break;
      default:
        break;
    }
    return map(noise(xoff), 0, 1, minSize, maxSize);
  }

  moveDirection(pos, radius, value){
    pos = pos + (radius * value);
    return pos;
  }
  moveTremble(pos, radius, value){
    pos = pos + random(-radius*value, radius*value);
    return pos;
  }
  movePerlin(pos, radius, x1, x2, xoff){
    x1 = radius*x1;
    x2 = radius*x2;
    pos = pos + map(noise(xoff), 0, 1, x1, x2);
    return pos;
  };

  edgeless(){
    if (this.x > width){this.x = 0};
    if (this.x < 0){this.x = width};
    if (this.y > height){this.y = 0};
    if (this.y < 0){this.y = height};
  }

  //====SHOW===================
  show(){
    // changeColorRandom();
    // stroke(0, 0, 0);
    noStroke()
    // strokeWeight(0.5);
    // noFill();
    this.colorShadesNoise();
    // this.alphaShades();
    // this.colorImage();
    // this.h_shade++;
    fill(this.h, this.s_shade, this.l_shade)

    // var radius_local = map(this.a, 30, 100, 0, 3)
    // this.radius = (this.radius+radius_local)/2
    // this.radius = radius_local;
    ellipse(this.x, this.y, this.radius, this.radius);
  }


  // alphaShades(){
  //   this.h = map(noise(this.xoff3), 0, 1, bubble.alphaMin, bubble.alphaMax);
  // }

  colorShadesNoise(){
    this.h_shade = map(noise(this.xoff1), 0, 1, this.h-20, this.h+20);
    this.s_shade = map(noise(this.xoff2), 0, 1, this.s-10, this.s+10);
    this.l_shade = map(noise(this.xoff3), 0, 1, this.l-10, this.l+10);
    
    if (this.h_shade > 360) this.h_shade = 0;
    if (this.h_shade < 0) this.h_shade = 360;

    if (this.s > 100) this.s = 100;
    if (this.s < 0) this.s = 0;
    
    if (this.l > 100) this.l = 100;
    if (this.l < 0) this.l = 0;
  }

  colorShades(){
    this.h += random(-1, 1);
    this.s += random(-1, 1);
    this.l += random(-1, 1);
    
    if (this.h > 360) this.h = 0;
    if (this.h < 0) this.h = 360;

    if (this.s > 90) this.s = 90;
    if (this.s < 0) this.s = 0;
    
    if (this.l > 90) this.l = 90;
    if (this.l < 15) this.l = 15;
  }

  colorImage(){
    var col = img.get(this.x, this.y);
    var r = col[0];
    var g = col[1];
    var b = col[2];
    var col2 = (r+g+b)/3
    var l_shadeLocal = map(col2, 0, 255, 0, 100)
    this.a = l_shadeLocal;
  }

}