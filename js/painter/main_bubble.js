class Bubble {
  constructor(_x, _y, _radius) {
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
    this.increment1 = random(0.001, 0.005)
    this.increment2 = random(0.001, 0.005)
    this.increment3 = random(0.01, 0.005)
    this.move1 = random(0.2);
    this.move2 = random(-0.2, 0.2);

    //OBJECT TYPE
    //TODO solve how to apply in different situations
    this.type = this.selectType(0.5, 0.9, 1);

    //COLOR
    this.colorScheme = color[3].palette;
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
    this.xoff1 += this.increment1;
    this.xoff2 += this.increment2;
    this.xoff3 += this.increment3;
    this.radius = this.changeRadius(this.type, bubble.minSize, bubble.maxSize, this.xoff3);
    // this.x = this.moveDirection(this.x, this.radius, this.move2);
    // this.y = this.moveDirection(this.y, this.radius, this.move2);
    this.x = this.moveTremble(this.x, this.radius, this.move1);
    this.y = this.moveTremble(this.y, this.radius, this.move1);
    this.x = this.movePerlin(this.x, this.radius, -0.5, 0.5, this.xoff1);
    this.y = this.movePerlin(this.y, this.radius, -0.5, 0.5, this.xoff2);
    this.edgeless(this.x, this.y);
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

  edgeless(x, y){
    if (x > width){x = 0};
    if (x < 0){x = width};
    if (y > height){y = 0};
    if (y < 0){y = height};
  }

  //====SHOW===================
  show(){
    // this.changeColor();
    // stroke(this.h, this.s, this.l);
    noStroke()
    // strokeWeight(this.strokeWeight);
    // noFill();
    this.colorShadesNoise();
    // this.alphaShades();
    // this.colorImage();
    fill(this.h_shade, this.s_shade, this.l_shade += random(-2, 2), this.a_shade)
    // fill(255);
    // var radius_local = map(this.l_shade, 30, 100, 0, 3)
    // this.radius = (this.radius+radius_local)/2
    ellipse(this.x, this.y, this.radius, this.radius);
  }


  alphaShades(){
    this.a = map(noise(this.xoff3), 0, 1, bubble.alphaMin, bubble.alphaMax);
  }

  colorShadesNoise(){
    this.h_shade = map(noise(this.xoff1), 0, 1, this.h-20, this.h+20);
    this.s_shade = map(noise(this.xoff2), 0, 1, this.s-10, this.s+10);
    this.l_shade = map(noise(this.xoff3), 0, 1, this.l-10, this.l+10);
    
    if (this.h_shade > 360) this.h_shade = 0;
    if (this.h_shade < 0) this.h_shade = 360;

    // if (this.s > 100) this.s = 100;
    // if (this.s < 0) this.s = 0;
    
    // if (this.l > 100) this.l = 100;
    // if (this.l < 0) this.l = 0;
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

  changeColorRandom(){
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
    var col2 = r+g+b
    var col3 = col2/3
    var l_shadeLocal = map(col3, 100, 255, 0, 100)
    this.l_shade = (this.l_shade+l_shadeLocal)/2
  }

}