let shapeslider;
let sizeslider;
let press = false;
function setup() {
    createCanvas(windowWidth, windowHeight);
    shapeslider = createSlider(1, 15, 0, 0);
    shapeslider.position(windowWidth/2 - 100, windowHeight*0.75);
    shapeslider.style('width', '200px');
    
    sizeslider = createSlider(1, 80, 0, 0);
    sizeslider.position(windowWidth/2 - 100, windowHeight*0.80);
    sizeslider.style('width', '200px');
}

function draw() {
    //background(255);
    if(press == true) {
        let shape = shapeslider.value();
        let size = sizeslider.value();
        makeShape(shape, size, mouseX, mouseY);
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
