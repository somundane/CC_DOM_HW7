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
let draws = [];

let shape, size;
function draw() {
    shape = shapeslider.value();
    size = sizeslider.value();
    let rval = radio.value();
    
    if(rval == "drop") {
        if(press==true){
            let p = new Part(shape, size, mouseX, mouseY);
            parts.push(p);
        }
        background(255);
        for(let p of parts)   {
            p.show();
            p.drop();
        }
    }
    else if(rval=="draw") {
        background(255);
        translate(width/2, height/2);
            for(let i = 0; i < reps; i ++) {
                rotate(radians(angle));
                noFill()
                stroke(0)
                for(let d of draws)   {
                    makeShape(d.sp, d.sz, d.x, d.y);
                    push();
                    scale(-1, 1);
                    makeShape(d.sp, d.sz, d.x, d.y);
                    pop();
                }
            }
        if(press == true) {
                //ellipse(mouseX-width/2, mouseY-height/2, 50);
//                let p = new Part(shape, size, mouseX, mouseY);
//                draws.push(p);
//                
//                push();
//                scale(-1, 1);
//                let p2 = new Part(shape, size, mouseX, mouseY);
//                draws.push(p2);
//                pop();
                
                //makeShape(shape, size, mouseX - width/2, mouseY-height/2, 'draw');
                let d = {
                    sp: shape,
                    sz: size,
                    x: mouseX - width/2,
                    y: mouseY - height/2
                }
                draws.push(d);
                
//                push();
//                scale(-1, 1);
//                makeShape(shape, size, mouseX - width/2, mouseY-height/2, 'draw');
//                pop();
        
        }
    }
    
    //x = mouseX - width/2;

    //print(val);
}

function makeShape(shape, size, x, y) {
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
        this.r = size;
        this.shape = shape;
        this.x = x;
        this.y = y;
    }
    show(){
        fill(130, 150, 170, 20)
        noStroke();
        push();
        translate(x, y);
    
        if(this.shape < 2) {
            ellipse(0, 0, this.r);
        }
        else if(this.shape < 3) {
            push();
            strokeWeight(5);
            stroke(0, 0, 0, 10);
            line(-this.r/2, -this.r/2, +this.r/2, +this.r/2);
            pop();
        }
        else {
            beginShape();
            for(let i = 0; i < TWO_PI; i += TWO_PI/this.shape) {
                let x = this.r * sin(i);
                let y = this.r * cos(i);
                vertex(x, y);
            }
        endShape(CLOSE);
        }
        pop();
    }
    drop(){
        if(this.x > width/2) {
            this.x -= this.sx;
        }
        if(this.x < width/2) {
            this.x += this.sx;
        }
        if(this.y > height/2) {
            this.y -= this.sy;
        }
        if(this.y < height/2) {
            this.y += this.sy;
        }
        ellipse(this.x, this.y, 20)
    }
}
let totalr = 0;
class Part {
    constructor(shape, size, x, y) {
        this.shape = shape;
        this.size = size;
        this.x = x;
        this.y = y;
        this.tox = abs(this.x-width/2);
        this.toy = abs(this.y-height/2);
        //time & speed consistency
        if(this.tox > this.toy){
            this.sx = 5;
            this.sy = this.toy/(this.tox/5);
        }
        else if(this.toy > this.tox) {
            this.sy = 5;
            this.sx = this.tox/(this.toy/5);
        }
    }
    show() { 
        fill(130, 150, 170, 20)
        noStroke();
        push();
        translate(width/2, height/2);
        for(let j = 0; j < reps; j ++) {
            rotate(radians(angle));
            fill(130, 150, 170, 20)
            //ellipse(this.x, this.y, this.size)
            if(this.shape < 2) {
                ellipse(this.x, this.y, this.size);
            }
            else if(this.shape < 3) {
                push();
                strokeWeight(5);
                fill(130, 150, 170, 20)
                line(this.x-this.size/2, this.y-this.size/2, this.x+this.size/2, this.y+this.size/2);
                pop();
            }
            else {
                push();
                translate(this.x - width/2, this.y - height/2);
                beginShape();
                for(let i = 0; i < TWO_PI; i += TWO_PI/this.shape) {
                    let x = this.size * sin(i);
                    let y = this.size * cos(i);
                    vertex(x, y);
                }
                endShape(CLOSE);
                pop();
            }
        }
        pop();

    }

    drop() {
        for(let s of parts)   {
            if(dist(this.x, this.y, s.x, s.y) > (this.size *2) + (s.size*2)) {
                print(dist(this.x, this.y, s.x, s.y))
                if(this.x > width/2) {
                    this.x -= this.sx;
                }
                if(this.x < width/2) {
                    this.x += this.sx;
                }
                if(this.y > height/2) {
                    this.y -= this.sy;
                }
                if(this.y < height/2) {
                    this.y += this.sy;
                }
            }
        }
        //ellipse(this.x, this.y, 20)
    }
    
    touching(x, y, size) {
        if(dist(this.x, this.y, x, y) <= this.size + size) {
            return true;
        }
        else {
            return false;
        }
        
    }
}


function mousePressed() {
    press = true;
//    let p = new Part(shape, size, mouseX, mouseY);
//    parts.push(p);
}
function mouseReleased() {
    press = false;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
