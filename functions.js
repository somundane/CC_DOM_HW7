function makeShape(shape, size, x, y) {
    let r = size;
    //noFill();
    fill(130, 150, 170, 10)
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