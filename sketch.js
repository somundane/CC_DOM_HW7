let shapeslider;
let sizeslider;
let press = false;

let reps = 8;
let angle = 360/reps;

function setup() {
    createCanvas(windowWidth, windowHeight);
    shapeslider = createSlider(1, 15, 6, 0);
    shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
    shapeslider.style('width', '200px');
    
    sizeslider = createSlider(1, 80, 40, 0);
    sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    sizeslider.style('width', '200px');
}

function draw() {
    //background(255);
    if(press == true) {
        translate(mouseX, mouseY);
        for(let i = 0; i < reps; i ++) {
            rotate(radians(angle));
            let shape = shapeslider.value();
            let size = sizeslider.value();
            noFill()
            stroke(0)
            ellipse(-50, -50, 200);
            //makeShape(shape, size, 0, 0);
        }
    }
    //print(val);
}
function mousePressed() {
    press = true;
}
function mouseReleased() {
    press = false;
}
function windowResized() {

}
