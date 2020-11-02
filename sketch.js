let shapeslider;
let sizeslider;
let opacityslider;
let colorpicker;
let radio;

let shapelabel, sizelabel, opacitylabel, colorlabel, radiolabel;
let shapediv, sizediv, odiv, coldiv, raddiv;
let alldiv;

let press = false;

let reps = 6;
let angle = 360/reps;


function setup() {
    createCanvas(windowWidth, windowHeight);
    alldiv = createDiv();
    
    shapelabel = createElement('h5', 'Shape');
    shapeslider = createSlider(1, 15, 6, 0);
    //shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
    shapeslider.style('width', '200px');
    
    shapediv = createDiv();
    shapediv.child(shapelabel);
    shapediv.child(shapeslider);
    //shapediv.position(windowWidth/2 - 100, windowHeight*0.75);
    
    sizelabel = createElement('h5', 'Size');
    sizeslider = createSlider(1, 80, 20, 0);
    //sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    sizeslider.style('width', '200px');
    
    sizediv = createDiv();
    sizediv.child(sizelabel);
    sizediv.child(sizeslider);
    //sizediv.position(windowWidth/2 - 100, windowHeight*0.80);
    
    opacitylabel = createElement('h5', 'Opacity');
    opacityslider = createSlider(1, 255, 20, 0);
    //opacityslider.position(windowWidth/2 - 100, windowHeight*0.85);
    opacityslider.style('width', '200px');
    
    odiv = createDiv();
    odiv.child(opacitylabel);
    odiv.child(opacityslider);
    //odiv.position(windowWidth/2 - 100, windowHeight*0.85);
    
    colorlabel = createElement('h5', 'Color');
    colorpicker = createColorPicker('rgb(130, 150, 170)');
    colorpicker.id('colpick');
    //colorpicker.position(windowWidth/2 - 100, windowHeight*0.90)
    
    coldiv = createDiv();
    coldiv.child(colorlabel);
    coldiv.child(colorpicker);
    //coldiv.position(windowWidth/2 - 100, windowHeight*0.90);
    coldiv.id('coldiv');
    
    radiolabel = createElement('h5', 'Radio');
    createElement('h5', 'Mode');
    radio = createRadio();
    radio.option('draw');
    radio.option('drop');
    radio.style('width', '60px');
    radio.position(windowWidth/2 - 100, windowHeight*0.95)
    radio.selected('draw')
    radio.id('rad');
    
    raddiv = createDiv();
    raddiv.child(radiolabel);
    raddiv.child(radio);
    raddiv.id('raddiv');
    
    alldiv.child(shapediv);
    alldiv.child(sizediv);
    alldiv.child(odiv);
    alldiv.child(coldiv);
    alldiv.child(raddiv);
    alldiv.id('alldiv');
    alldiv.position(windowWidth/2 - 100, windowHeight*0.75)
}

let x;
let parts = [];
let draws = [];

let shape, size, opacity, color;
function draw() {
    shape = shapeslider.value();
    size = sizeslider.value();
    opacity = opacityslider.value();
    color = colorpicker.color();
    //print(color.levels[3]);
    let rval = radio.value();
    
    if(rval == "drop") {
        if(press==true){
            let p = new Part(shape, size, mouseX, mouseY, opacity, color);
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
                    makeShape(d.sp, d.sz, d.x, d.y, d.o, d.c);
                    push();
                    scale(-1, 1);
                    makeShape(d.sp, d.sz, d.x, d.y, d.o, d.c);
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
                    y: mouseY - height/2,
                    o: opacity,
                    c: color
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

function makeShape(shape, size, x, y, o, c) {
    let r = size;
    //noFill();
    fill(c.levels[0], c.levels[1], c.levels[2], o)
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
        stroke(c.levels[0], c.levels[1], c.levels[2], o);
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

//class Shape {
//    constructor(shape, size, x, y, type) {
//        this.r = size;
//        this.shape = shape;
//        this.x = x;
//        this.y = y;
//    }
//    show(){
//        fill(130, 150, 170, 20)
//        noStroke();
//        push();
//        translate(x, y);
//    
//        if(this.shape < 2) {
//            ellipse(0, 0, this.r);
//        }
//        else if(this.shape < 3) {
//            push();
//            strokeWeight(5);
//            stroke(0, 0, 0, 10);
//            line(-this.r/2, -this.r/2, +this.r/2, +this.r/2);
//            pop();
//        }
//        else {
//            beginShape();
//            for(let i = 0; i < TWO_PI; i += TWO_PI/this.shape) {
//                let x = this.r * sin(i);
//                let y = this.r * cos(i);
//                vertex(x, y);
//            }
//        endShape(CLOSE);
//        }
//        pop();
//    }
//    drop(){
//        if(this.x > width/2) {
//            this.x -= this.sx;
//        }
//        if(this.x < width/2) {
//            this.x += this.sx;
//        }
//        if(this.y > height/2) {
//            this.y -= this.sy;
//        }
//        if(this.y < height/2) {
//            this.y += this.sy;
//        }
//        ellipse(this.x, this.y, 20)
//    }
//}
let totalr = 0;
class Part {
    constructor(shape, size, x, y, o, c) {
        this.shape = shape;
        this.size = size;
        this.x = x;
        this.y = y;
        this.o = o;
        this.c = c;
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
        fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.o)
        noStroke();
        push();
        translate(width/2, height/2);
        for(let j = 0; j < reps; j ++) {
            rotate(radians(angle));
            fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.o)
            //ellipse(this.x, this.y, this.size)
            if(this.shape < 2) {
                ellipse(this.x, this.y, this.size);
            }
            else if(this.shape < 3) {
                push();
                strokeWeight(5);
                fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.o)
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
//                print(dist(this.x, this.y, s.x, s.y))
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
    alldiv.position(windowWidth/2 - 100, windowHeight*0.75)
//    shapediv.position(windowWidth/2 - 100, windowHeight*0.75);
//    sizediv.position(windowWidth/2 - 100, windowHeight*0.80);
//    odiv.position(windowWidth/2 - 100, windowHeight*0.85);
//    coldiv.position(windowWidth/2 - 100, windowHeight*0.90);
    //shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
//    sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    //opacityslider.position(windowWidth/2 - 100, windowHeight*0.85);
    //radio.position(windowWidth/2 - 100, windowHeight*0.90)
}
