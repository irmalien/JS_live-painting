class Atom {
  constructor(_x, _y, _atom) {    
    //POSITION
    this.x = _x;
    this.y = _y;

    //OBJECT
    this.lifespan = _atom.lifespan;
    this.sizeMin = _atom.sizeMin;
    this.sizeMax = _atom.sizeMax;
    this.sizeRand = _atom.sizeRand;
    this.size = random(_atom.sizeMin, _atom.sizeMax);

    //COLOR
    this.colArray = _atom.colArray;
    this.colRand = int(random(0, this.colArray.length));
    this.colH = this.colArray[this.colRand][0];
    this.colS= this.colArray[this.colRand][1];
    this.colL= this.colArray[this.colRand][2];
    this.colA= random(_atom.colAlphaMin, _atom.colAlphaMax);
    this.colH2;
    this.colS2;
    this.colL2;

    //DYNAMICS
    this.movHor = _atom.movHor;
    this.movVer = _atom.movVer;
    this.movTremble = _atom.movTremble;
    this.movSpeed = _atom.movSpeed;
    this.movRandX = _atom.movRandX;
    this.movRandY = _atom.movRandY;
    this.movRandZ = _atom.movRandZ;

    //PERLIN
    this.xoffX = random(1000);
    this.xoffY = random(1000);
    this.xoffZ = random(1000);
    this.xoffSize = random(1000);
    this.xoffCol = random(1000);

    // this.strokeWeightMin;
    // this.strokeWeightMax;

    //OBJECT TYPE
    //TODO solve how to apply in different situations
    this.type = this.selectType(0.5, 0.9, 1);

    //EXTRAS
    count=1

  }

  //====INITIALIZE===================
  selectType(p1, p2, pTotal){
    const probability = random(pTotal);
    let variation = null;
    if (probability < p1){variation = 'A'}
    else if (probability < p2){variation = 'B'}
    else {variation = 'C'}
    return variation;
  }


  //====MOVE===================

  count(id){
    count++;
    if (count>=this.lifespan){
      return false;
    }
    else{
      return true
    }

  }

  resize(){
    this.xoffSize += this.sizeRand;
    this.size = this.changeRadius(this.type, this.sizeMin, this.sizeMax, this.xoffSize);
  }

  move(){
    this.xoffX += this.movRandX;
    this.xoffY += this.movRandY;
    this.xoffZ += this.movRandZ;

    this.x = this.moveDirection(this.x, this.size, this.movHor)
    this.y = this.moveDirection(this.y, this.size, this.movVer);
    // this.x = this.moveTremble(this.x, this.size, this.movTremble);
    // this.y = this.moveTremble(this.y, this.size, this.movTremble);
    this.x = this.movePerlin(this.x, this.size, -this.movSpeed/5, this.movSpeed/5, this.xoffZ);
    this.y = this.movePerlin(this.y, this.size, -this.movSpeed/5, this.movSpeed/5, this.xoffZ);
    this.x = this.movePerlin(this.x, this.size, -this.movSpeed, this.movSpeed, this.xoffX);
    this.y = this.movePerlin(this.y, this.size, -this.movSpeed, this.movSpeed, this.xoffY);

    // this.mirrorXY();

    this.edgeless();
    this.show(this.x, this.y)
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

  mirrorX(){
    let x2;
    let fullSize = width;
    let halfSize = width;
    let remainSize = fullSize-halfSize;

    if (this.x > halfSize){this.x = 0};
    if (this.x < 0){this.x = halfSize};
    if (this.y > height){this.y = 0};
    if (this.y < 0){this.y = height};
    this.show(this.x, this.y);
    x2 = map(this.x, 0, halfSize, fullSize, remainSize);
    this.show(x2, this.y);
  }

  mirrorXY(){
    let x2;
    let fullX = width;
    let halfX = width;
    let remX = halfX-halfX;
    let y2;
    let fullY = height;
    let halfY = height;
    let remY = fullY-halfY;

    if (this.x > halfX){this.x = 0};
    if (this.x < 0){this.x = halfX};
    if (this.y > halfY){this.y = 0};
    if (this.y < 0){this.y = halfY};
    x2 = map(this.x, 0, fullX, halfX, remX);
    y2 = map(this.y, 0, fullY, halfY, remY);

    this.show(this.x, this.y);
    this.show(x2, this.y);
    this.show(this.x, y2);
    this.show(x2, y2);

  }

  //====SHOW===================
  show(_posX, _posY){
    // changeColorRandom();
    // stroke(0, 0, 0);
    noStroke()
    // strokeWeight(0.5);
    // noFill();
    // this.colorShadesNoise();
    // this.alphaShades();
    // this.colorImage();
    fill(this.colH, this.colS, this.colL)

    // var radius_local = map(this.a, 30, 100, 0, 3)
    // this.size = (this.size+radius_local)/2
    // this.size = radius_local;
    ellipse(_posX, _posY, this.size, this.size);
  }


  // alphaShades(){
  //   this.colH = map(noise(this.xoffZ), 0, 1, bubble.alphaMin, bubble.alphaMax);
  // }

  // colorShadesNoise(){
  //   this.colH2 = map(noise(this.xoffX), 0, 1, this.colH-20, this.colH+20);
  //   this.colS2 = map(noise(this.xoffY), 0, 1, this.s-10, this.s+10);
  //   this.colL2 = map(noise(this.xoffZ), 0, 1, this.l-10, this.l+10);
    
  //   if (this.colH2 > 360) this.colH2 = 0;
  //   if (this.colH2 < 0) this.colH2 = 360;

  //   if (this.colS> 100) this.colS= 100;
  //   if (this.colS< 0) this.colS= 0;
    
  //   if (this.colL> 100) this.colL= 100;
  //   if (this.colL< 0) this.colL= 0;
  // }

  // colorShades(){
  //   this.colH += random(-1, 1);
  //   this.colS+= random(-1, 1);
  //   this.colL+= random(-1, 1);
    
  //   if (this.colH > 360) this.colH = 0;
  //   if (this.colH < 0) this.colH = 360;

  //   if (this.colS> 90) this.colS= 90;
  //   if (this.colS< 0) this.colS= 0;
    
  //   if (this.colL> 90) this.colL= 90;
  //   if (this.colL< 15) this.colL= 15;
  // }

  // colorImage(){
  //   var col = img.get(this.x, this.y);
  //   var r = col[0];
  //   var g = col[1];
  //   var b = col[2];
  //   var col2 = (r+g+b)/3
  //   var l_shadeLocal = map(col2, 0, 255, 0, 100)
  //   this.colA= l_shadeLocal;
  // }

}