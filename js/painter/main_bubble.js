class Bubble {
  constructor(_x, _y, _radius, _alphaMin, _alphaMax) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    // this.diameter = this.radius*2;
    this.roundness = bubble.roundness;
    
    this.alphaMin = bubble.alphaMin;
    this.alphaMax = bubble.alphaMax;

    this.strokeWeightMin;
    this.strokeWeightMax;

    //movement
    this.movement = bubble.movement;
    this.xoffRandom = random(0.01, 1000)
    this.xoff1 = random(100);
    this.xoff2 = this.xoff1 + this.xoffRandom;
    this.xoff3 = this.xoff2 + this.xoffRandom;
    this.increment = random(0.005, 0.005)

    //probability
    this.probability = random(1);
    this.variation;
    if (this.probability < 0.5){this.variation = 'A'}
    else if (this.probability < 0.9){this.variation = 'B'}
    else {this.variation = 'C'}

    //color
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
  move(){
    // this.moveDiog();

    this.movePerlinNoise();
    // this.moveStyleA();
    // this.moveDiog();
    this.bounce();
    this.changeRadius();
  }

  moveStyleA(){
    this.x = this.x + random(-this.radius/this.movement, this.radius/this.movement);
    this.y = this.y + random(-this.radius/this.movement, this.radius/this.movement);
  }

  moveStyleB(){
    this.x = this.x + random(-this.movement/this.radius, this.movement/this.radius);
    this.y = this.y + random(-this.movement/this.radius, this.movement/this.radius);
  }

  moveStyleC(){
    this.x = this.x + random(-this.movement/this.radius, this.movement/this.radius)/random(-this.radius/this.movement, this.radius/this.movement);
    this.y = this.y + random(-this.movement/this.radius, this.movement/this.radius)/random(-this.radius/this.movement, this.radius/this.movement);
  }

  moveDiog(){
    // this.x = this.x + 0.5;
    this.y = this.y + 1;
  }

  movePerlinNoise(){
    // this.x = this.x + map(noise(this.xoff1), 0, 1, -width/2, width*1.5);
    // this.y = this.y + map(noise(this.xoff2), 0, 1, -height/2, height*1.5);
    this.x = this.x + map(noise(this.xoff1), 0, 1, -5, 5);
    this.y = this.y + map(noise(this.xoff2), 0, 1, -1, 1);
    // this.x = map(noise(this.xoff1), 0, 1, 0, width);
    // this.y = map(noise(this.xoff2), 0, 1, 0, height);
    this.xoff1 += this.increment;
    this.xoff2 += this.increment;
  };

  changeRadius(){
    let tmp_minSize = bubble.minSize;
    let tmp_maxSize = bubble.maxSize;
    switch(this.variation) {
      case "A":
        tmp_maxSize = tmp_maxSize/2
        break;
      case "B":
        break;
      case "C":
        tmp_maxSize = tmp_maxSize*2
        break;
      default:
      console.log(this.variation + "wrong")
    }
    // this.radius += random(-3, 3);
    this.radius = map(noise(this.xoff3), 0, 1, tmp_minSize, tmp_maxSize);
    this.xoff3 += 0.1
    // console.log(this.radius)
    // if (this.radius > bubble.maxSize) this.radius = bubble.maxSize;
    // if (this.radius < tmp_minSize) this.radius = tmp_minSize;
  }


  show(){
    // this.changeColor();
    // stroke(this.h, this.s, this.l);
    noStroke()
    // strokeWeight(this.strokeWeight);
    // noFill();
    this.colorShadesNoise();
    this.alphaShades();
    this.colorImage();
    fill(this.h_shade, this.s_shade, this.l_shade += random(-2, 2), this.a_shade)
    // fill(255);
    var radius_local = map(this.l_shade, 30, 100, 0, 3)
    this.radius = (this.radius+radius_local)/2
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

  bounce(){
    if (this.x > width){
      this.x = 0;
    };
    if (this.x < 0){
      this.x = width;
    }
    if (this.y > height){
      this.y = 0;
    };
    if (this.y < 0){
      this.y = height;
    }
  }
}