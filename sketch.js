let shapeslider;
let sizeslider;
let press = false;

let radio;

let reps = 6;
let angle = 360/reps;

function setup() {
    createCanvas(windowWidth, windowHeight);
    shapeslider = createSlider(1, 15, 6, 0);
    shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
    shapeslider.style('width', '200px');
    
    sizeslider = createSlider(1, 80, 20, 0);
    sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    sizeslider.style('width', '200px');
    
    radio = createRadio();
    radio.option('draw');
    radio.option('drop');
    radio.style('width', '60px');
    radio.position(windowWidth/2 - 100, windowHeight*0.85)
    radio.selected('draw')
}

let x;
let parts = [];
function draw() {
    background(255);
    for(let p of parts)   {
        p.show();
        p.drop();
    }
    let rval = radio.value();
    x = mouseX - width/2;
//    if(press == true && rval == "draw") {
//        translate(width/2, height/2);
//        for(let i = 0; i < reps; i ++) {
//            rotate(radians(angle));
//            let shape = shapeslider.value();
//            let size = sizeslider.value();
//            noFill()
//            stroke(0)
//            //ellipse(mouseX-width/2, mouseY-height/2, 50);
//            makeShape(shape, size, mouseX - width/2, mouseY-height/2, 'draw');
//            push();
//            scale(-1, 1);
//            makeShape(shape, size, mouseX - width/2, mouseY-height/2, 'draw');
//            pop();
//        }
//    }
    //print(val);
}

function makeShape(shape, size, x, y, type) {
    let r = size;
    //noFill();
    fill(130, 150, 170, 20)
    noStroke();
    push();
    //translate(windowWidth/2, windowHeight/2);
    translate(x, y);
    
    if(shape < 2) {
        ellipse(0, 0, r);
    }
    else if(shape < 3) {
        push();
        strokeWeight(5);
        stroke(0, 0, 0, 10);
        line(-r/2, -r/2, +r/2, +r/2);
        pop();
    }
    else {
        beginShape();
        for(let i = 0; i < TWO_PI; i += TWO_PI/shape) {
            let x = r * sin(i);
            let y = r * cos(i);
            vertex(x, y);
            //ellipse(x, y, r);
        }
    endShape(CLOSE);
    }
    pop();
}

class Shape {
    constructor(shape, size, x, y, type) {
        this.shape = shape;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    show(){
        
    }
    drop(){
        
    }
}

class Part {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 4;
    }
    show() {
        fill(0)
        ellipse(this.x, this.y, 20)
    }
    drop() {
        if(this.x > width/2) {
            this.x -= this.s;
        }
        if(this.x < width/2) {
            this.x += this.s;
        }
        if(this.y > height/2) {
            this.y -= this.s;
        }
        if(this.y < height/2) {
            this.y += this.s;
        }
        ellipse(this.x, this.y, 20)

    }
}

function mousePressed() {
    press = true;
    let p = new Part(mouseX, mouseY);
    parts.push(p);
}
function mouseReleased() {
    press = false;
}
function windowResized() {

}
