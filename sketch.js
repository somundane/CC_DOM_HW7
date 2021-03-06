let shapeslider;
let sizeslider;
let opacityslider;
let colorpicker;
let radio;

let shapelabel, sizelabel, opacitylabel, colorlabel, radiolabel;
let shapediv, sizediv, odiv;
let alldiv, randdiv, div;

let randlabel, ccheck, sizecheck;

let press = false;

let reps = 6;
let angle = 360/reps;

let clear, capture, btndiv;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //divs
    alldiv = createDiv();
    randdiv = createDiv();
    btndiv = createDiv();
    
    //buttons
    clear = createButton('Clear');
    capture = createButton('Capture');
    clear.mousePressed(reset);
    capture.mousePressed(saveFile);
    clear.class('buttons');
    capture.class('buttons');
    btndiv.child(clear);
    btndiv.child(capture);
    btndiv.id('btn');
    
    //sliders ++
    shapelabel = createElement('h5', 'Shape');
    shapeslider = createSlider(1, 15, 6, 0);
    shapeslider.style('width', '200px');
    
    shapediv = createDiv();
    shapediv.child(shapelabel);
    shapediv.child(shapeslider);
    
    sizelabel = createElement('h5', 'Size');
    sizeslider = createSlider(1, 80, 20, 0);
    sizeslider.style('width', '200px');
    
    sizediv = createDiv();
    sizediv.child(sizelabel);
    sizediv.child(sizeslider);
    
    opacitylabel = createElement('h5', 'Opacity');
    opacityslider = createSlider(1, 255, 20, 0);
    opacityslider.style('width', '200px');
    
    odiv = createDiv();
    odiv.child(opacitylabel);
    odiv.child(opacityslider);
    
    colorlabel = createElement('h5', 'Color');
    colorpicker = createColorPicker('rgb(130, 150, 170)');
    colorpicker.id('colpick');
    
    //radios
    radiolabel = createElement('h5', 'Mode');
    radio = createRadio();
    radio.option('draw');
    radio.option('drop');
    radio.style('width', '60px');
    radio.selected('draw')
    radio.id('rad');
    
    //checkbox
    randlabel = createElement('h5', 'Random');
    sizecheck = createCheckbox('Size', false);
    ccheck = createCheckbox('Color', false);
    sizecheck.class('chkbox');
    ccheck.class('chkbox');
    
    //div nesting
    randdiv.id('randdiv');
    randdiv.child(sizecheck);
    randdiv.child(ccheck);
    
    alldiv.child(shapediv);
    alldiv.child(sizediv);
    alldiv.child(odiv);
    alldiv.child(colorlabel);
    alldiv.child(colorpicker);
    alldiv.child(radiolabel);
    alldiv.child(radio);
    alldiv.child(randlabel);
    alldiv.child(randdiv);
    alldiv.child(btndiv);
    alldiv.id('alldiv');
    alldiv.position(windowWidth/2 - 100, windowHeight*0.60)
}

let x;
let parts = [];
let draws = [];
let shape, size, opacity, color;

let time = 0;

function reset() {
    parts = []
    draws = []
}
function saveFile() {
    save('kaleidoscope.png');
}
function draw() {
    shape = shapeslider.value();
    size = sizeslider.value();
    opacity = opacityslider.value();

    //print(color.levels[3]);
    let rval = radio.value();
    let indiv = mouseX > windowWidth/2 - 100 &&
    mouseX <  windowWidth/2 + 100 &&
    mouseY < windowHeight &&
    mouseY > windowHeight*0.60;
    
    let inbtn = mouseX > windowWidth/2 - 100 &&
    mouseX <  windowWidth/2 + 100 &&
    mouseY < windowHeight &&
    mouseY > windowHeight*0.90;

    if(press==true && !indiv){
        alldiv.style('visibility', 'hidden');
    }
    else {
         alldiv.style('visibility', 'visible');
    }
    if(rval == "drop") {
        if(press==true && !inbtn){
            if(ccheck.checked()) {
                if(millis() >= 500+time) {
                    color.levels[0] = random(255);
                    color.levels[1] = random(255);
                    color.levels[2] = random(255);
                    time = millis();
                }
                print(color);
            }
            else {
                color = colorpicker.color();
            }
            if(sizecheck.checked()) {
                size = random(50);
            }
            let p = new Part(shape, size, mouseX, mouseY, opacity, color.levels[0], color.levels[1], color.levels[2]);
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
                    makeShape(d.sp, d.sz, d.x, d.y, d.o, d.r, d.g, d.b);
                    push();
                    scale(-1, 1);
                    makeShape(d.sp, d.sz, d.x, d.y, d.o, d.r, d.g, d.b);
                    pop();
                }
            }
        if(press == true && !indiv) {
                if(ccheck.checked()) {
                    if(millis() >= 500+time) {
                        color.levels[0] = random(255);
                        color.levels[1] = random(255);
                        color.levels[2] = random(255);
                        time = millis();
                    }
                    print(color);
                }
                else {
                     color = colorpicker.color();
                }
                if(sizecheck.checked()) {
                    size = random(80);
                }
                let d = {
                    sp: shape,
                    sz: size,
                    x: mouseX - width/2,
                    y: mouseY - height/2,
                    o: opacity,
                    r: color.levels[0],
                    g: color.levels[1],
                    b: color.levels[2]
                }
                draws.push(d);
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
    alldiv.position(windowWidth/2 - 100, windowHeight*0.60)
//    shapediv.position(windowWidth/2 - 100, windowHeight*0.75);
//    sizediv.position(windowWidth/2 - 100, windowHeight*0.80);
//    odiv.position(windowWidth/2 - 100, windowHeight*0.85);
//    coldiv.position(windowWidth/2 - 100, windowHeight*0.90);
    //shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
//    sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    //opacityslider.position(windowWidth/2 - 100, windowHeight*0.85);
    //radio.position(windowWidth/2 - 100, windowHeight*0.90)
}
